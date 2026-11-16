import { getCollection } from 'astro:content';

function assertUnique(values: string[], label: string): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  if (duplicates.size > 0) {
    throw new Error(`Duplikasi ${label}: ${[...duplicates].join(', ')}`);
  }
}

/**
 * Run during static path generation so broken content relationships fail the build,
 * not silently disappear from category or schedule pages.
 */
export async function validateContentRelations(): Promise<void> {
  const [pages, trainings, schedules, articles] = await Promise.all([
    getCollection('pages'),
    getCollection('trainings'),
    getCollection('schedules'),
    getCollection('articles'),
  ]);

  const allEntries = [...pages, ...trainings, ...schedules, ...articles];

  assertUnique(allEntries.map(({ data }) => String(data.id)), 'content id');
  assertUnique(allEntries.map(({ data }) => data.ulid), 'content ulid');
  assertUnique(
    [...pages.filter(({ data }) => data.pageType === 'category').map(({ data }) => data.slug),
      ...trainings.map(({ data }) => data.slug)],
    'slug kategori/program pada /pelatihan/',
  );
  assertUnique(trainings.map(({ data }) => data.trainingId), 'trainingId');
  assertUnique(schedules.map(({ data }) => data.scheduleId), 'scheduleId');

  const categoryIds = new Set(
    pages.filter(({ data }) => data.pageType === 'category').map(({ data }) => data.id),
  );
  for (const training of trainings) {
    for (const categoryId of training.data.categoryIds) {
      if (!categoryIds.has(categoryId)) {
        throw new Error(
          `Training "${training.data.trainingId}" merujuk category id ${categoryId} yang tidak ditemukan.`,
        );
      }
    }
  }

  const trainingIds = new Set(trainings.map(({ data }) => data.trainingId));
  for (const schedule of schedules) {
    if (!trainingIds.has(schedule.data.trainingId)) {
      throw new Error(
        `Schedule "${schedule.data.scheduleId}" merujuk trainingId "${schedule.data.trainingId}" yang tidak ditemukan.`,
      );
    }
  }
}
