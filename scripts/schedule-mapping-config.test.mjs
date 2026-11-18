import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { matchTraining, parseTrainingFiles } from './generate-schedule-frontmatter.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MAPPING_PATH = resolve(ROOT, 'config/schedule-training-mappings.json');
const TRAININGS_DIR = resolve(ROOT, 'src/content/trainings');

const mappingConfig = JSON.parse(readFileSync(MAPPING_PATH, 'utf8'));
const trainings = parseTrainingFiles(
  readdirSync(TRAININGS_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => ({
      path: `src/content/trainings/${name}`,
      content: readFileSync(resolve(TRAININGS_DIR, name), 'utf8'),
    })),
);

test('parses every master training frontmatter', () => {
  const files = readdirSync(TRAININGS_DIR).filter((name) => name.endsWith('.md'));
  assert.equal(trainings.length, files.length, 'setiap master training harus punya trainingSlug, slug, dan title');
});

test('mapping config only uses the trainingSlug key the generator reads', () => {
  assert.ok(Array.isArray(mappingConfig.mappings) && mappingConfig.mappings.length > 0);
  mappingConfig.mappings.forEach((mapping, index) => {
    assert.ok(
      Object.prototype.hasOwnProperty.call(mapping, 'trainingSlug'),
      `mapping ke-${index + 1} harus memakai key "trainingSlug" (bukan "trainingId") karena begitu yang dibaca matchTraining()`,
    );
    assert.equal(
      Object.prototype.hasOwnProperty.call(mapping, 'trainingId'),
      false,
      `mapping ke-${index + 1} masih memuat key "trainingId" yang tidak pernah dibaca generator`,
    );
  });
});

test('every mapping pattern compiles as a case-insensitive regex', () => {
  mappingConfig.mappings.forEach((mapping, index) => {
    assert.equal(typeof mapping.pattern, 'string', `pattern ke-${index + 1} harus string`);
    assert.doesNotThrow(() => new RegExp(mapping.pattern, 'i'), `pattern ke-${index + 1} tidak valid: ${mapping.pattern}`);
  });
});

test('every mapping target exists as a master training', () => {
  const known = new Set(trainings.map((training) => training.trainingSlug));
  mappingConfig.mappings.forEach((mapping) => {
    assert.ok(
      known.has(mapping.trainingSlug),
      `mapping "${mapping.pattern}" menunjuk "${mapping.trainingSlug}" yang tidak ada di src/content/trainings/`,
    );
  });
});

test('generator resolves each mapping rule against the real config shape', () => {
  mappingConfig.mappings.forEach((mapping) => {
    const candidate = { sourceSlug: mapping.trainingSlug, title: mapping.trainingSlug };
    const result = matchTraining(candidate, [mapping], trainings);
    assert.equal(
      result.reason,
      null,
      `rule "${mapping.pattern}" tidak ter-resolve (${result.reason ?? 'ok'}) -> pastikan key config = key yang dibaca generator`,
    );
    assert.equal(result.training.trainingSlug, mapping.trainingSlug);
  });
});
