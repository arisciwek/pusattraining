import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getScheduleHref,
  getScheduleMonth,
  getScheduleRouteParams,
  getScheduleSourcePathCandidates,
} from '../src/lib/schedule-utils.ts';

function schedule(startDate, slug = 'batch-21') {
  return {
    data: {
      startDate,
      timezone: 'Asia/Jakarta',
      slug,
    },
  };
}

test('date-only schedule keeps its calendar month', () => {
  assert.equal(getScheduleMonth(schedule('2026-11-17').data), '2026-11');
});

test('datetime schedule derives its month in the declared timezone', () => {
  assert.equal(
    getScheduleMonth({
      startDate: '2026-10-31T17:30:00Z',
      timezone: 'Asia/Jakarta',
    }),
    '2026-11',
  );
});

test('route params and internal href use the same schedule identity', () => {
  const entry = schedule('2026-11-17', 'november-2026-kelas-d-gelombang-21');
  const params = getScheduleRouteParams(entry, 'damkar-kelas-d');

  assert.deepEqual(params, {
    month: '2026-11',
    trainingSlug: 'damkar-kelas-d',
    scheduleSlug: 'november-2026-kelas-d-gelombang-21',
  });
  assert.equal(
    getScheduleHref(entry, 'damkar-kelas-d'),
    '/jadwal/2026-11/damkar-kelas-d/november-2026-kelas-d-gelombang-21/',
  );
});

test('URL segments are encoded and path separators are rejected', () => {
  assert.equal(
    getScheduleHref(schedule('2026-11-17', 'batch 21'), 'kelas d'),
    '/jadwal/2026-11/kelas%20d/batch%2021/',
  );
  assert.throws(
    () => getScheduleRouteParams(schedule('2026-11-17', 'batch/21'), 'kelas-d'),
    /scheduleSlug tidak valid/,
  );
});

test('source path candidates include the training slug and stable training id', () => {
  assert.deepEqual(
    getScheduleSourcePathCandidates(
      '2026-11-17',
      'damkar-kelas-d',
      'damkar-kelas-d',
      'november-2026-kelas-d-gelombang-21',
    ),
    ['2026/damkar-kelas-d/november-2026-kelas-d-gelombang-21'],
  );
  assert.deepEqual(
    getScheduleSourcePathCandidates('2026-11-23', 'training-a', 'stable-id-a', 'same-slug'),
    ['2026/training-a/same-slug', '2026/stable-id-a/same-slug'],
  );
});
