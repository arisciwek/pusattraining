#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MONTHS = new Map([
  ['jan', 1], ['januari', 1], ['feb', 2], ['februari', 2],
  ['mar', 3], ['maret', 3], ['apr', 4], ['april', 4],
  ['mei', 5], ['jun', 6], ['juni', 6], ['jul', 7], ['juli', 7],
  ['agu', 8], ['agustus', 8], ['sep', 9], ['september', 9],
  ['okt', 10], ['oktober', 10], ['nov', 11], ['nop', 11],
  ['november', 11], ['des', 12], ['desember', 12],
]);

function decodeXml(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&apos;', "'");
}

function parseXmlEntries(xml) {
  const entries = [];
  for (const match of xml.matchAll(/<(url|sitemap)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const body = match[2];
    const loc = body.match(/<loc\b[^>]*>([\s\S]*?)<\/loc>/i)?.[1]?.trim();
    const lastmod = body.match(/<lastmod\b[^>]*>([\s\S]*?)<\/lastmod>/i)?.[1]?.trim();
    if (loc) entries.push({ loc: decodeXml(loc), lastmod: lastmod ? decodeXml(lastmod) : null });
  }
  return entries;
}

function validDate(year, month, day) {
  const date = new Date(Date.UTC(year, month - 1, day));
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null;
  return date.toISOString().slice(0, 10);
}

function parseDateFromSlug(slug) {
  const value = slug.toLowerCase();
  let match = value.match(/(?:^|[-/])(\d{1,2})-(jan(?:uari)?|feb(?:ruari)?|mar(?:et)?|apr(?:il)?|mei|jun(?:i)?|jul(?:i)?|agu(?:stus)?|sep(?:tember)?|okt(?:ober)?|nov(?:ember)?|nop|des(?:ember)?)-(\d{1,2})-(jan(?:uari)?|feb(?:ruari)?|mar(?:et)?|apr(?:il)?|mei|jun(?:i)?|jul(?:i)?|agu(?:stus)?|sep(?:tember)?|okt(?:ober)?|nov(?:ember)?|nop|des(?:ember)?)-(\d{4})(?:[-/]|$)/);
  if (match) {
    const [, firstDay, firstMonth, lastDay, lastMonth, yearText] = match;
    const year = Number(yearText);
    const startDate = validDate(year, MONTHS.get(firstMonth), Number(firstDay));
    const endDate = validDate(year, MONTHS.get(lastMonth), Number(lastDay));
    if (startDate && endDate && endDate >= startDate) return { startDate, endDate, matchedText: match[0].replace(/^[-/]|[-/]$/g, '') };
  }

  match = value.match(/(?:^|[-/])(\d{1,2})-(?:(?:sd|sampai)-)?(\d{1,2})-(jan(?:uari)?|feb(?:ruari)?|mar(?:et)?|apr(?:il)?|mei|jun(?:i)?|jul(?:i)?|agu(?:stus)?|sep(?:tember)?|okt(?:ober)?|nov(?:ember)?|nop|des(?:ember)?)-(\d{4})(?:[-/]|$)/);
  if (match) {
    const [, firstDay, lastDay, monthName, yearText] = match;
    const year = Number(yearText);
    const month = MONTHS.get(monthName);
    const startDate = validDate(year, month, Number(firstDay));
    const endDate = validDate(year, month, Number(lastDay));
    if (startDate && endDate && endDate >= startDate) return { startDate, endDate, matchedText: match[0].replace(/^[-/]|[-/]$/g, '') };
  }

  match = value.match(/(?:^|[-/])(\d{1,2})-(jan(?:uari)?|feb(?:ruari)?|mar(?:et)?|apr(?:il)?|mei|jun(?:i)?|jul(?:i)?|agu(?:stus)?|sep(?:tember)?|okt(?:ober)?|nov(?:ember)?|nop|des(?:ember)?)-(\d{4})(?:[-/]|$)/);
  if (match) {
    const [, day, monthName, yearText] = match;
    const startDate = validDate(Number(yearText), MONTHS.get(monthName), Number(day));
    if (startDate) return { startDate, endDate: startDate, matchedText: match[0].replace(/^[-/]|[-/]$/g, '') };
  }

  return null;
}

function titleFromSlug(slug, matchedText) {
  const cleaned = slug.replace(matchedText ?? '\u0000', '').replace(/--+/g, '-').replace(/^-|-$/g, '');
  return cleaned.split('-').filter(Boolean).map((word) => {
    const upper = word.toUpperCase();
    if (['K3', 'ERP', 'POP', 'H2S', 'BNSP', 'SIO'].includes(upper)) return upper;
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ') || slug.split('-').join(' ');
}

function makeCandidate(source, item) {
  const url = new URL(item.loc);
  const slug = url.pathname.split('/').filter(Boolean).at(-1) ?? '';
  const dates = parseDateFromSlug(slug);
  if (!dates) return null;
  const digest = createHash('sha256').update(item.loc).digest('hex').slice(0, 20).toUpperCase();
  const title = titleFromSlug(slug, dates.matchedText);
  const dateLabel = dates.startDate === dates.endDate
    ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${dates.startDate}T12:00:00Z`))
    : new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${dates.startDate}T12:00:00Z`)) + ' – ' +
      new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${dates.endDate}T12:00:00Z`));
  return {
    discoveryId: `${source.publisherId}_${digest}`,
    publisherId: source.publisherId,
    sourceUrl: item.loc,
    sourceLastmod: item.lastmod,
    sourceSlug: slug,
    scheduleId: `${source.publisherId}_${digest}`,
    slug,
    title,
    startDate: dates.startDate,
    endDate: dates.endDate,
    dateLabel,
    timezone: source.timezone ?? 'Asia/Jakarta',
    trainingId: null,
    batchNo: null,
    status: 'needs-review',
    confidence: { title: 'slug-derived', dates: 'slug-derived', training: 'unmatched' },
    reviewRequired: true,
  };
}

async function fetchSitemap(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(25000), headers: { 'user-agent': 'PusattrainingScheduleDiscovery/1.0' } });
  if (!response.ok) throw new Error(`Sitemap request failed (${response.status}): ${url}`);
  return response.text();
}

async function collectUrls(sitemapUrl, depth = 0, visited = new Set()) {
  if (depth > 5) throw new Error('Sitemap index melebihi batas kedalaman 5.');
  const normalized = new URL(sitemapUrl).toString();
  if (visited.has(normalized)) return [];
  visited.add(normalized);
  const xml = await fetchSitemap(normalized);
  const entries = parseXmlEntries(xml);
  if (/<sitemapindex\b/i.test(xml)) {
    const nested = await Promise.all(entries.map((entry) => collectUrls(entry.loc, depth + 1, visited)));
    return nested.flat();
  }
  return entries;
}

async function main() {
  const args = process.argv.slice(2);
  const configArg = args.find((arg) => arg.startsWith('--config='))?.slice(9);
  const outputArg = args.find((arg) => arg.startsWith('--output='))?.slice(9);
  const configPath = resolve(ROOT, configArg ?? 'config/schedule-discovery-sources.json');
  const outputPath = resolve(ROOT, outputArg ?? 'var/schedule-discovery/registry.json');
  const config = JSON.parse(await readFile(configPath, 'utf8'));
  const discoveredAt = new Date().toISOString();
  const candidates = [];
  const sourceResults = [];

  for (const source of config.sources ?? []) {
    const urls = await collectUrls(source.sitemapUrl);
    const allowedHost = new URL(source.sitemapUrl).hostname;
    const filtered = urls.filter((item) => {
      try {
        const url = new URL(item.loc);
        return url.hostname === allowedHost && (source.includePathRegex ? new RegExp(source.includePathRegex, 'i').test(url.pathname) : true);
      } catch { return false; }
    });
    const sourceCandidates = filtered.map((item) => makeCandidate(source, item)).filter(Boolean);
    candidates.push(...sourceCandidates);
    sourceResults.push({ publisherId: source.publisherId, sitemapUrl: source.sitemapUrl, urlsFound: urls.length, urlsFiltered: filtered.length, datedCandidates: sourceCandidates.length });
  }

  const unique = [...new Map(candidates.map((candidate) => [candidate.sourceUrl, candidate])).values()];
  const registry = { version: 1, discoveredAt, sourceResults, candidateCount: unique.length, candidates: unique };
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(registry, null, 2) + '\n');
  console.log(`Sitemap discovery selesai: ${unique.length} kandidat jadwal dari ${sourceResults.length} sumber.`);
  for (const source of sourceResults) console.log(`- ${source.publisherId}: ${source.urlsFound} URL, ${source.datedCandidates} kandidat bertanggal`);
  console.log(`Registry: ${outputPath}`);
  console.log('Semua kandidat berstatus needs-review; belum dibuat sebagai schedule publik.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}

export { parseDateFromSlug, parseXmlEntries, titleFromSlug };
