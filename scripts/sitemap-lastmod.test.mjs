import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import test from 'node:test';

import { buildScheduleLastmodMap } from './sitemap-lastmod.mjs';

async function writeMarkdown(root, relativePath, content) {
  const path = join(root, relativePath);
  await mkdir(join(path, '..'), { recursive: true });
  await writeFile(path, content, 'utf8');
}

test('sitemap lastmod follows published schedule updates for detail, month, and index', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'pusattraining-sitemap-'));
  t.after(() => rm(root, { recursive: true, force: true }));

  await writeMarkdown(root, 'trainings/training-a.md', `---
type: training
trainingSlug: training-a
slug: kelas-a
draft: false
---
`);

  await writeMarkdown(root, 'pages/jadwal.md', `---
type: page
slug: jadwal
pubDate: '2026-11-01T00:00:00Z'
updatedDate: '2026-11-17T00:00:00Z'
draft: false
---
`);

  await writeMarkdown(root, 'schedules/2026/training-a/batch-1.md', `---
type: schedule
trainingSlug: training-a
slug: batch-1
startDate: '2026-11-23'
timezone: Asia/Jakarta
pubDate: '2026-11-10T00:00:00Z'
updatedDate: '2026-11-18T00:00:00Z'
draft: false
sites:
  main:
    enabled: true
---
`);

  await writeMarkdown(root, 'schedules/2026/training-a/batch-2.md', `---
type: schedule
trainingSlug: training-a
slug: batch-2
startDate: '2026-11-24'
timezone: Asia/Jakarta
pubDate: '2026-11-10T00:00:00Z'
updatedDate: '2026-11-19T00:00:00Z'
draft: false
sites:
  main:
    enabled: true
---
`);

  await writeMarkdown(root, 'schedules/2026/training-a/hidden.md', `---
type: schedule
trainingSlug: training-a
slug: hidden
startDate: '2026-11-25'
timezone: Asia/Jakarta
pubDate: '2026-11-10T00:00:00Z'
updatedDate: '2026-11-20T00:00:00Z'
draft: false
sites:
  main:
    enabled: false
---
`);

  const lastmod = await buildScheduleLastmodMap(root);
  assert.equal(lastmod.get('/jadwal/2026-11/kelas-a/batch-1/').toISOString(), '2026-11-18T00:00:00.000Z');
  assert.equal(lastmod.get('/jadwal/2026-11/kelas-a/batch-2/').toISOString(), '2026-11-19T00:00:00.000Z');
  assert.equal(lastmod.get('/jadwal/2026-11/').toISOString(), '2026-11-19T00:00:00.000Z');
  assert.equal(lastmod.get('/jadwal/').toISOString(), '2026-11-19T00:00:00.000Z');
  assert.equal(lastmod.has('/jadwal/2026-11/kelas-a/hidden/'), false);
});

test('datetime schedule month is resolved in its IANA timezone', async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'pusattraining-sitemap-zone-'));
  t.after(() => rm(root, { recursive: true, force: true }));

  await writeMarkdown(root, 'trainings/training-a.md', `---
trainingSlug: training-a
slug: kelas-a
draft: false
---
`);
  await writeMarkdown(root, 'schedules/2026/training-a/cross-month.md', `---
trainingSlug: training-a
slug: cross-month
startDate: '2026-10-31T17:30:00Z'
timezone: Asia/Jakarta
pubDate: '2026-10-01T00:00:00Z'
updatedDate: '2026-10-02T00:00:00Z'
draft: false
sites:
  main:
    enabled: true
---
`);

  const lastmod = await buildScheduleLastmodMap(root);
  assert.equal(lastmod.has('/jadwal/2026-11/kelas-a/cross-month/'), true);
  assert.equal(lastmod.has('/jadwal/2026-10/kelas-a/cross-month/'), false);
});
