#!/usr/bin/env node

/**
 * Crawl legacy URLs from docs/MASTER-LEGACY-URL-MAPPING.csv.
 *
 * Uses only Node.js built-ins. The source mapping is never modified.
 * Results are written to a separate CSV and checkpointed for safe resume.
 */

import { readFile, mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const DEFAULT_INPUT = 'docs/MASTER-LEGACY-URL-MAPPING.csv';
const DEFAULT_OUTPUT = 'docs/LEGACY-URL-CRAWL-RESULTS.csv';
const DEFAULT_USER_AGENT = 'PusatTrainingK3-LegacyAudit/1.0 (+https://pusattrainingk3.com/)';

function parseArgs(argv) {
  const options = {
    input: DEFAULT_INPUT,
    output: DEFAULT_OUTPUT,
    concurrency: 3,
    timeout: 15000,
    delayMs: 500,
    limit: 0,
    retryErrors: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === '--input' && next) options.input = next, i += 1;
    else if (arg === '--output' && next) options.output = next, i += 1;
    else if (arg === '--concurrency' && next) options.concurrency = Number(next), i += 1;
    else if (arg === '--timeout' && next) options.timeout = Number(next), i += 1;
    else if (arg === '--delay-ms' && next) options.delayMs = Number(next), i += 1;
    else if (arg === '--limit' && next) options.limit = Number(next), i += 1;
    else if (arg === '--retry-errors') options.retryErrors = true;
    else if (arg === '--help' || arg === '-h') {
      console.log(`Usage: node scripts/crawl-legacy-urls.mjs [options]

Options:
  --input PATH         Master mapping CSV (default: ${DEFAULT_INPUT})
  --output PATH        Crawl result CSV (default: ${DEFAULT_OUTPUT})
  --concurrency N      Parallel requests, 1-8 (default: 3)
  --timeout MS         Per-request timeout (default: 15000)
  --delay-ms MS        Delay between requests per worker (default: 500)
  --limit N            Crawl only the first N pending records (default: all)
  --retry-errors       Retry rows that previously ended with a network error
  --help               Show this help

The crawler follows redirects manually, records each hop, and resumes from
an existing output file. It does not edit the master mapping or decide redirects.`);
      process.exit(0);
    } else {
      throw new Error(`Unknown or incomplete option: ${arg}`);
    }
  }

  if (!Number.isInteger(options.concurrency) || options.concurrency < 1 || options.concurrency > 8) {
    throw new Error('--concurrency must be an integer from 1 to 8');
  }
  for (const key of ['timeout', 'delayMs', 'limit']) {
    if (!Number.isFinite(options[key]) || options[key] < 0 || (key !== 'limit' && options[key] === 0)) {
      throw new Error(`--${key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)} has an invalid value`);
    }
  }
  return options;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"' && field.length === 0) {
      quoted = true;
    } else if (char === ',') {
      row.push(field);
      field = '';
    } else if (char === '\n') {
      row.push(field.replace(/\r$/, ''));
      if (row.some((value) => value !== '')) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  if (field.length || row.length) {
    row.push(field.replace(/\r$/, ''));
    if (row.some((value) => value !== '')) rows.push(row);
  }
  if (quoted) throw new Error('Input CSV contains an unterminated quoted field');

  const [headers, ...data] = rows;
  if (!headers?.length) throw new Error('Input CSV is empty');
  return data.map((values) => Object.fromEntries(
    headers.map((header, index) => [header, values[index] ?? '']),
  ));
}

function csvCell(value) {
  const text = value == null ? '' : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows, headers) {
  return [
    headers.map(csvCell).join(','),
    ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(',')),
  ].join('\n') + '\n';
}

function decodeEntities(value = '') {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function attributes(tag) {
  const result = {};
  const pattern = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  for (const match of tag.matchAll(pattern)) {
    result[match[1].toLowerCase()] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return result;
}

function firstTagText(html, tagName) {
  const match = html.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}\\s*>`, 'i'));
  return match ? decodeEntities(match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()) : '';
}

function findMeta(html, key, value) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const attrs = attributes(tag);
    if ((attrs[key] ?? '').toLowerCase() === value.toLowerCase()) return attrs.content ?? '';
  }
  return '';
}

function findCanonical(html, baseUrl) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const attrs = attributes(tag);
    const rel = (attrs.rel ?? '').toLowerCase().split(/\s+/);
    if (rel.includes('canonical') && attrs.href) {
      try { return new URL(attrs.href, baseUrl).href; } catch { return attrs.href; }
    }
  }
  return '';
}

function extractPage(html, finalUrl) {
  const title = firstTagText(html, 'title');
  const h1 = firstTagText(html, 'h1');
  const description = findMeta(html, 'name', 'description');
  const robots = findMeta(html, 'name', 'robots') || findMeta(html, 'name', 'googlebot');
  const canonical = findCanonical(html, finalUrl);

  const body = (html.match(/<body\b[^>]*>([\\s\\S]*?)<\\/body\\s*>/i)?.[1] ?? html)
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg|nav|footer|header|form)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:nbsp|amp|quot|lt|gt);|&#(?:\\d+|x[\\da-f]+);/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = body ? body.split(/\s+/).length : 0;

  return {
    title,
    h1,
    meta_description: description,
    canonical,
    meta_robots: robots,
    word_count: words,
    content_excerpt: body.slice(0, 600),
  };
}

const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const RESULT_HEADERS = [
  'old_url',
  'requested_url',
  'final_url',
  'http_status',
  'content_type',
  'title',
  'h1',
  'meta_description',
  'canonical',
  'meta_robots',
  'word_count',
  'content_excerpt',
  'redirect_chain',
  'crawl_error',
  'crawled_at',
];

async function crawl(url, timeout, userAgent) {
  const startedAt = new Date().toISOString();
  const chain = [];
  let currentUrl = url;

  try {
    for (let hop = 0; hop <= 10; hop += 1) {
      const response = await fetch(currentUrl, {
        method: 'GET',
        redirect: 'manual',
        headers: {
          'user-agent': userAgent,
          accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        },
        signal: AbortSignal.timeout(timeout),
      });

      const location = response.headers.get('location');
      if (REDIRECT_STATUSES.has(response.status) && location) {
        const nextUrl = new URL(location, currentUrl).href;
        chain.push(`${response.status} ${currentUrl} -> ${nextUrl}`);
        await response.body?.cancel();
        if (hop === 10) throw new Error('Redirect limit exceeded (more than 10 hops)');
        currentUrl = nextUrl;
        continue;
      }

      const contentType = response.headers.get('content-type') ?? '';
      let page = {};
      if (/text\/html|application\/xhtml\+xml/i.test(contentType)) {
        const html = (await response.text()).slice(0, 5_000_000);
        page = extractPage(html, currentUrl);
      } else {
        await response.body?.cancel();
      }

      return {
        requested_url: url,
        final_url: currentUrl,
        http_status: response.status,
        content_type: contentType,
        ...page,
        redirect_chain: JSON.stringify(chain),
        crawl_error: '',
        crawled_at: startedAt,
      };
    }
    throw new Error('Redirect limit exceeded');
  } catch (error) {
    return {
      requested_url: url,
      final_url: currentUrl,
      http_status: '',
      content_type: '',
      title: '',
      h1: '',
      meta_description: '',
      canonical: '',
      meta_robots: '',
      word_count: '',
      content_excerpt: '',
      redirect_chain: JSON.stringify(chain),
      crawl_error: error?.name === 'TimeoutError' ? 'Request timeout' : (error?.message ?? String(error)),
      crawled_at: startedAt,
    };
  }
}

async function readExisting(path) {
  try {
    return parseCsv(await readFile(path, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function saveCheckpoint(path, rows) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.tmp`;
  await writeFile(temporary, toCsv(rows, RESULT_HEADERS), 'utf8');
  await rename(temporary, path);
}

const options = parseArgs(process.argv.slice(2));
const inputPath = resolve(options.input);
const outputPath = resolve(options.output);
const sourceRows = parseCsv(await readFile(inputPath, 'utf8'));

const seen = new Map();
for (const row of await readExisting(outputPath)) {
  if (row.old_url) seen.set(row.old_url, row);
}

const pending = sourceRows
  .filter((row) => row.old_url && (
    !seen.has(row.old_url) ||
    (options.retryErrors && seen.get(row.old_url).crawl_error)
  ))
  .slice(0, options.limit || undefined);

if (!pending.length) {
  console.log(`No pending URLs. Existing results: ${seen.size}; source records: ${sourceRows.length}.`);
  process.exit(0);
}

console.log(`Crawling ${pending.length} URL(s); concurrency=${options.concurrency}; timeout=${options.timeout}ms.`);

let nextIndex = 0;
let completed = 0;

async function worker() {
  while (true) {
    const index = nextIndex++;
    if (index >= pending.length) return;

    const source = pending[index];
    const result = await crawl(source.old_url, options.timeout, DEFAULT_USER_AGENT);
    seen.set(source.old_url, { old_url: source.old_url, ...result });
    completed += 1;

    console.log(
      `[${completed}/${pending.length}] ${result.http_status || 'ERROR'} ${source.old_url}` +
      (result.title ? ` — ${result.title}` : ''),
    );

    if (completed % 10 === 0 || completed === pending.length) {
      const ordered = sourceRows
        .filter((row) => seen.has(row.old_url))
        .map((row) => seen.get(row.old_url));
      await saveCheckpoint(outputPath, ordered);
      console.log(`Checkpoint saved: ${ordered.length}/${sourceRows.length}.`);
    }

    if (options.delayMs) await new Promise((resolveDelay) => setTimeout(resolveDelay, options.delayMs));
  }
}

await Promise.all(Array.from({ length: options.concurrency }, () => worker()));

const finalRows = sourceRows
  .filter((row) => seen.has(row.old_url))
  .map((row) => seen.get(row.old_url));
await saveCheckpoint(outputPath, finalRows);

const statusCounts = finalRows.reduce((counts, row) => {
  const key = row.crawl_error ? 'ERROR' : String(row.http_status || 'NO_STATUS');
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});

console.log(`Finished. Saved ${finalRows.length}/${sourceRows.length} rows to ${outputPath}.`);
console.log('HTTP status summary:', statusCounts);
