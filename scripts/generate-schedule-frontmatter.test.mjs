import test from 'node:test';
import assert from 'node:assert/strict';
import { assignBatchNumbers, hasIdentityCollision, matchTraining, parseTrainingFiles, renderSchedule, stableIdentity } from './generate-schedule-frontmatter.mjs';

const trainings = [
  { trainingId: 'ahli-k3-umum', slug: 'ahli-k3-umum', title: 'Ahli K3 Umum' },
  { trainingId: 'pemadam-kebakaran-kelas-a', slug: 'pemadam-kebakaran-kelas-a', title: 'Pemadam Kebakaran Kelas A' },
];

const candidate = {
  publisherId: 'pusattrainingk3',
  sourceUrl: 'https://example.test/pelatihan-ahli-k3-umum-12-17-feb-2018/',
  sourceSlug: 'pelatihan-ahli-k3-umum-12-17-feb-2018',
  slug: 'pelatihan-ahli-k3-umum-12-17-feb-2018',
  title: 'Pelatihan Ahli K3 Umum',
  startDate: '2018-02-12',
  endDate: '2018-02-17',
  dateLabel: '12–17 Februari 2018',
  timezone: 'Asia/Jakarta',
};

test('maps only one explicit matching training rule', () => {
  assert.equal(matchTraining(candidate, [{ pattern: 'ahli[- ]?k3[- ]?umum', trainingId: 'ahli-k3-umum' }], trainings).training.trainingId, 'ahli-k3-umum');
  assert.equal(matchTraining(candidate, [], trainings).reason, 'no-mapping-rule');
  assert.equal(matchTraining(candidate, [
    { pattern: 'ahli', trainingId: 'ahli-k3-umum' },
    { pattern: 'pelatihan', trainingId: 'pemadam-kebakaran-kelas-a' },
  ], trainings).reason, 'multiple-mapping-rules');
});

test('detects both numeric id and string scheduleId collisions', () => {
  const identity = { id: 123456789, scheduleId: 'pusattrainingk3_ABCDEF' };
  assert.equal(hasIdentityCollision(identity, new Set([identity.id])), true);
  assert.equal(hasIdentityCollision(identity, new Set([identity.scheduleId])), true);
  assert.equal(hasIdentityCollision(identity, new Set([987654321, 'another_schedule'])), false);
});

test('parses master training metadata from frontmatter', () => {
  const parsed = parseTrainingFiles([{ path: 'training.md', content: '---\ntype: training\ntrainingId: ahli-k3-umum\nslug: ahli-k3-umum\ntitle: "Ahli K3 Umum"\n---' }]);
  assert.deepEqual(parsed[0], { path: 'training.md', trainingId: 'ahli-k3-umum', slug: 'ahli-k3-umum', title: 'Ahli K3 Umum' });
});

test('creates deterministic valid identity values', () => {
  const first = stableIdentity(candidate);
  assert.deepEqual(first, stableIdentity(candidate));
  assert.match(first.ulid, /^[0-9A-HJKMNP-TV-Z]{26}$/);
  assert.ok(first.id > 0);
  assert.ok(first.scheduleId.startsWith('pusattrainingk3_'));
});

test('assigns batch numbers in training date order', () => {
  const later = { candidate: { ...candidate, startDate: '2019-02-12', sourceUrl: 'https://example.test/later' }, training: trainings[0] };
  const earlier = { candidate, training: trainings[0] };
  assignBatchNumbers([later, earlier]);
  assert.equal(earlier.batchNo, '01');
  assert.equal(later.batchNo, '02');
});

test('renders schema-shaped unpublished draft frontmatter', () => {
  const rendered = renderSchedule(candidate, trainings[0], '01', '2026-11-16T00:00:00.000Z');
  assert.match(rendered.content, /draft: true/);
  assert.match(rendered.content, /status: scheduled/);
  assert.match(rendered.content, /enabled: false/);
  assert.match(rendered.content, /trainingId: "ahli-k3-umum"/);
  assert.doesNotMatch(rendered.content, /registration:|delivery:|venue:/);
});
