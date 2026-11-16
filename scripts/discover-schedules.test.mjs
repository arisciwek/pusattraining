import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDateFromSlug, parseXmlEntries, titleFromSlug } from './discover-schedules.mjs';

test('parses Indonesian same-month date ranges', () => {
  assert.deepEqual(
    parseDateFromSlug('pelatihan-damkar-kelas-dcba-13-25-nopember-2017-jakarta'),
    {
      startDate: '2017-11-13',
      endDate: '2017-11-25',
      matchedText: '13-25-nopember-2017',
    },
  );
});

test('parses abbreviated month names and sd separators', () => {
  assert.deepEqual(
    parseDateFromSlug('pelatihan-teknisi-k3-listrik-27-sd-31-agustus-2018'),
    {
      startDate: '2018-08-27',
      endDate: '2018-08-31',
      matchedText: '27-sd-31-agustus-2018',
    },
  );
});

test('parses date ranges across months', () => {
  assert.deepEqual(
    parseDateFromSlug('pelatihan-14-nop-10-des-2018-jakarta'),
    {
      startDate: '2018-11-14',
      endDate: '2018-12-10',
      matchedText: '14-nop-10-des-2018',
    },
  );
});

test('rejects impossible calendar dates', () => {
  assert.equal(parseDateFromSlug('pelatihan-31-februari-2018'), null);
});

test('removes parsed date from the working title', () => {
  assert.equal(
    titleFromSlug('pelatihan-ahli-k3-umum-12-17-feb-2018-jakarta', '12-17-feb-2018'),
    'Pelatihan Ahli K3 Umum Jakarta',
  );
});

test('reads sitemap URL and lastmod values', () => {
  const xml = '<urlset><url><loc>https://example.test/jadwal/</loc><lastmod>2026-11-01T00:00:00Z</lastmod></url></urlset>';
  assert.deepEqual(parseXmlEntries(xml), [
    { loc: 'https://example.test/jadwal/', lastmod: '2026-11-01T00:00:00Z' },
  ]);
});
