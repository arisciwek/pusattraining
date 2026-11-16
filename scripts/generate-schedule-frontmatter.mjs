#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function slugify(value) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function parseTrainingFiles(contents) {
  return contents.map(({ path, content }) => {
    const field = (name) => content.match(new RegExp('^' + name + ':\\s*(.+)$', 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '');
    const trainingId = field('trainingId');
    const slug = field('slug');
    const title = field('title');
    if (!trainingId || !slug || !title) return null;
    return { trainingId, slug, title, path };
  }).filter(Boolean);
}

function matchTraining(candidate, mappings, trainings) {
  const text = `${candidate.sourceSlug} ${candidate.title}`.toLowerCase();
  const matches = mappings.filter((mapping) => new RegExp(mapping.pattern, 'i').test(text));
  if (matches.length !== 1) return { training: null, reason: matches.length ? 'multiple-mapping-rules' : 'no-mapping-rule' };
  const training = trainings.find((item) => item.trainingId === matches[0].trainingId);
  return training ? { training, reason: null } : { training: null, reason: 'mapped-training-not-found' };
}

function encodeUlid(timestamp, digest) {
  const time = BigInt(Math.max(0, Math.min(Number(timestamp), 281474976710655)));
  const randomness = BigInt('0x' + digest.slice(0, 20));
  let value = (time << 80n) | randomness;
  const alphabet = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  let result = '';
  for (let index = 0; index < 26; index += 1) {
    result = alphabet[Number(value & 31n)] + result;
    value >>= 5n;
  }
  return result;
}

function hasIdentityCollision(identity, usedIds) {
  return usedIds.has(identity.id) || usedIds.has(identity.scheduleId);
}

function stableIdentity(candidate) {
  const digest = createHash('sha256').update(candidate.sourceUrl).digest('hex').toUpperCase();
  const scheduleId = `${candidate.publisherId}_${digest.slice(0, 20)}`;
  const id = 100000000 + (Number.parseInt(digest.slice(20, 28), 16) % 900000000);
  const timestamp = Date.parse(`${candidate.startDate}T00:00:00Z`);
  return { scheduleId, id, ulid: encodeUlid(timestamp, digest) };
}

function assignBatchNumbers(candidates) {
  const sorted = [...candidates].sort((a, b) =>
    a.training.trainingId.localeCompare(b.training.trainingId) ||
    a.candidate.startDate.localeCompare(b.candidate.startDate) ||
    a.candidate.sourceUrl.localeCompare(b.candidate.sourceUrl));
  const counts = new Map();
  for (const item of sorted) {
    const key = item.training.trainingId;
    const next = (counts.get(key) ?? 0) + 1;
    counts.set(key, next);
    item.batchNo = String(next).padStart(2, '0');
  }
  return sorted;
}

function renderSchedule(candidate, training, batchNo, now) {
  const identity = stableIdentity(candidate);
  const slug = slugify(candidate.slug || candidate.sourceSlug);
  const description = `Jadwal ${candidate.title} pada ${candidate.dateLabel}. Informasi ini disusun dari halaman sumber dan menunggu verifikasi penyelenggara.`;
  const fields = [
    '---',
    'type: schedule',
    `id: ${identity.id}`,
    `ulid: ${identity.ulid}`,
    `scheduleId: ${yamlString(identity.scheduleId)}`,
    `publisherId: ${yamlString(candidate.publisherId)}`,
    `trainingId: ${yamlString(training.trainingId)}`,
    `batchNo: ${yamlString(batchNo)}`,
    `slug: ${yamlString(slug)}`,
    `title: ${yamlString(candidate.title)}`,
    `description: ${yamlString(description)}`,
    `startDate: '${candidate.startDate}'`,
    `endDate: '${candidate.endDate}'`,
    `dateLabel: ${yamlString(candidate.dateLabel)}`,
    `timezone: ${yamlString(candidate.timezone || 'Asia/Jakarta')}`,
    `pubDate: '${now}'`,
    `updatedDate: '${now}'`,
    'draft: true',
    'status: scheduled',
    'sites:',
    '  main:',
    '    enabled: false',
    '---',
    '',
  ];
  return { ...identity, slug, content: fields.join('\n'), description };
}

async function listMarkdownFiles(directory) {
  let entries;
  try { entries = await readdir(directory, { withFileTypes: true }); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listMarkdownFiles(path));
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

async function main() {
  const args = process.argv.slice(2);
  const option = (name, fallback) => args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
  const registryPath = resolve(ROOT, option('registry', 'var/schedule-discovery/registry.json'));
  const mappingPath = resolve(ROOT, option('mapping', 'config/schedule-training-mappings.json'));
  const outputPath = resolve(ROOT, option('output', 'var/schedule-discovery/frontmatter'));
  const [registry, mappingConfig] = await Promise.all([
    readFile(registryPath, 'utf8').then(JSON.parse),
    readFile(mappingPath, 'utf8').then(JSON.parse),
  ]);
  const trainingPaths = await listMarkdownFiles(resolve(ROOT, 'src/content/trainings'));
  const trainings = parseTrainingFiles(await Promise.all(trainingPaths.map(async (path) => ({
    path: path.replace(ROOT + '/', ''),
    content: await readFile(path, 'utf8'),
  }))));
  const prepared = [];
  const review = [];
  for (const candidate of registry.candidates ?? []) {
    const result = matchTraining(candidate, mappingConfig.mappings ?? [], trainings);
    if (!result.training) {
      review.push({ sourceUrl: candidate.sourceUrl, title: candidate.title, reason: result.reason });
      continue;
    }
    prepared.push({ candidate, training: result.training });
  }

  assignBatchNumbers(prepared);
  const now = new Date().toISOString();
  const existingPaths = await listMarkdownFiles(resolve(ROOT, 'src/content'));
  const existingIds = new Set();
  for (const path of existingPaths) {
    const content = await readFile(path, 'utf8');
    const id = content.match(/^id:\s*(\d+)/m)?.[1];
    const scheduleId = content.match(/^scheduleId:\\s*(.+)$/m)?.[1]?.replace(/^["']|["']$/g, '');
    if (id) existingIds.add(Number(id));
    if (scheduleId) existingIds.add(scheduleId);
  }

  const generated = [];
  const usedIds = new Set(existingIds);
  for (const item of prepared) {
    const rendered = renderSchedule(item.candidate, item.training, item.batchNo, now);
    if (hasIdentityCollision(rendered, usedIds)) {
      review.push({ sourceUrl: item.candidate.sourceUrl, title: item.candidate.title, reason: 'identity-collision' });
      continue;
    }
    usedIds.add(rendered.id);
    usedIds.add(rendered.scheduleId);
    const relativePath = join(item.candidate.startDate.slice(0, 4), item.training.slug, `${rendered.slug}.md`);
    const target = resolve(outputPath, relativePath);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, rendered.content, { flag: 'wx' }).catch((error) => {
      if (error.code === 'EEXIST') throw new Error(`Output sudah ada, tidak ditimpa: ${target}`);
      throw error;
    });
    generated.push({ path: target.replace(ROOT + '/', ''), sourceUrl: item.candidate.sourceUrl, sourceLastmod: item.candidate.sourceLastmod, title: item.candidate.title, trainingId: item.training.trainingId, batchNo: item.batchNo });
  }

  const report = { generatedAt: now, registryPath: registryPath.replace(ROOT + '/', ''), generatedCount: generated.length, reviewCount: review.length, generated, review };
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(join(dirname(outputPath), 'generation-report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`Frontmatter draft dibuat: ${generated.length}; perlu review/pemetaan: ${review.length}.`);
  console.log(`Output: ${outputPath}`);
  console.log(`Laporan: ${join(dirname(outputPath), 'generation-report.json')}`);
  console.log('Semua file draft dan tidak ditempatkan ke src/content/schedules secara otomatis.');
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}

export { assignBatchNumbers, hasIdentityCollision, matchTraining, parseTrainingFiles, renderSchedule, stableIdentity };
