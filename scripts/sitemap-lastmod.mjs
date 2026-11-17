import { readdir, readFile } from 'node:fs/promises';
import { basename, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

async function markdownFiles(directory) {
  let entries;

  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }

  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return markdownFiles(path);
    return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
  }));

  return nested.flat();
}

function frontmatterOf(source) {
  return /^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source)?.[1] ?? '';
}

function scalar(frontmatter, key) {
  const line = frontmatter.split(/\r?\n/).find((item) => item.startsWith(`${key}:`));
  if (!line) return undefined;

  const raw = line.slice(line.indexOf(':') + 1).trim();
  if (raw.length >= 2 && ((raw.startsWith("'") && raw.endsWith("'")) || (raw.startsWith('"') && raw.endsWith('"')))) {
    return raw.slice(1, -1);
  }

  return raw.replace(/\s+#.*$/, '').trim() || undefined;
}

function mainSiteEnabled(frontmatter) {
  let inSites = false;
  let inMain = false;

  for (const line of frontmatter.split(/\r?\n/)) {
    if (line === 'sites:') {
      inSites = true;
      inMain = false;
      continue;
    }

    if (inSites && line.trim() && !line.startsWith(' ')) {
      inSites = false;
      inMain = false;
    }

    if (!inSites) continue;
    if (/^  main:\s*$/.test(line)) {
      inMain = true;
      continue;
    }
    if (/^  [A-Za-z0-9_-]+:\s*$/.test(line)) {
      inMain = false;
      continue;
    }
    if (inMain && /^    enabled:\s*true\s*$/.test(line)) return true;
  }

  return false;
}

function scheduleMonth(startDate, timezone) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(startDate)) return startDate.slice(0, 7);

  const instant = new Date(startDate);
  if (Number.isNaN(instant.getTime())) return undefined;

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone || 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(instant);
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;

  return year && month ? `${year}-${month}` : undefined;
}

function validDate(value) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function setMax(map, key, date) {
  if (!date) return;
  const previous = map.get(key);
  if (!previous || date > previous) map.set(key, date);
}

/**
 * Build sitemap lastmod values from the same frontmatter records that produce
 * the schedule routes. The content root can be a filesystem path or file URL.
 */
export async function buildScheduleLastmodMap(contentRoot) {
  const root = contentRoot instanceof URL ? fileURLToPath(contentRoot) : contentRoot;
  const trainingFiles = await markdownFiles(join(root, 'trainings'));
  const trainingById = new Map();

  for (const file of trainingFiles) {
    const frontmatter = frontmatterOf(await readFile(file, 'utf8'));
    if (scalar(frontmatter, 'draft') === 'true') continue;

    const trainingId = scalar(frontmatter, 'trainingId');
    const slug = scalar(frontmatter, 'slug');
    if (trainingId && slug) trainingById.set(trainingId, { slug });
  }

  const scheduleRoot = join(root, 'schedules');
  const scheduleFiles = await markdownFiles(scheduleRoot);
  const lastmodByPath = new Map();
  const monthLastmod = new Map();
  let indexLastmod;

  for (const file of scheduleFiles) {
    const relativePath = relative(scheduleRoot, file).split(sep);
    if (relativePath.length !== 3) continue;

    const frontmatter = frontmatterOf(await readFile(file, 'utf8'));
    if (scalar(frontmatter, 'draft') === 'true' || !mainSiteEnabled(frontmatter)) continue;

    const training = trainingById.get(scalar(frontmatter, 'trainingId'));
    const startDate = scalar(frontmatter, 'startDate');
    const timezone = scalar(frontmatter, 'timezone') || 'Asia/Jakarta';
    const scheduleSlug = scalar(frontmatter, 'slug') || basename(file, '.md');
    const lastmod = validDate(scalar(frontmatter, 'updatedDate')) || validDate(scalar(frontmatter, 'pubDate'));
    const month = startDate ? scheduleMonth(startDate, timezone) : undefined;

    if (!training || !startDate || !month || !scheduleSlug || !lastmod) continue;

    const detailPath = `/jadwal/${month}/${training.slug}/${scheduleSlug}/`;
    lastmodByPath.set(detailPath, lastmod);
    setMax(monthLastmod, `/jadwal/${month}/`, lastmod);
    if (!indexLastmod || lastmod > indexLastmod) indexLastmod = lastmod;
  }

  const jadwalPage = join(root, 'pages', 'jadwal.md');
  try {
    const pageFrontmatter = frontmatterOf(await readFile(jadwalPage, 'utf8'));
    const pageLastmod = validDate(scalar(pageFrontmatter, 'updatedDate')) || validDate(scalar(pageFrontmatter, 'pubDate'));
    if (pageLastmod && (!indexLastmod || pageLastmod > indexLastmod)) indexLastmod = pageLastmod;
  } catch (error) {
    if (!(error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT')) throw error;
  }

  for (const [path, date] of monthLastmod) lastmodByPath.set(path, date);
  if (indexLastmod) lastmodByPath.set('/jadwal/', indexLastmod);

  return lastmodByPath;
}
