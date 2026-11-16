import { getCollection } from 'astro:content';
import { getScheduleMonth } from './schedule-utils';

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
  assertUnique(pages.map(({ data }) => data.slug), 'slug halaman');
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

  const trainingsById = new Map(
    trainings.map((training) => [training.data.trainingId, training]),
  );

  for (const schedule of schedules) {
    const training = trainingsById.get(schedule.data.trainingId);
    if (!training) {
      throw new Error(
        `Schedule "${schedule.data.scheduleId}" merujuk trainingId "${schedule.data.trainingId}" yang tidak ditemukan.`,
      );
    }

    const pathSegments = schedule.id.split('/');
    const [year, trainingSlug, scheduleSlug] = pathSegments;

    if (
      pathSegments.length !== 3 ||
      year !== schedule.data.startDate.slice(0, 4) ||
      trainingSlug !== training.data.slug ||
      scheduleSlug !== schedule.data.slug
    ) {
      throw new Error(
        `Path schedule "${schedule.id}" harus mengikuti schedules/<tahun-startDate>/<training-slug>/<schedule-slug>.md.`,
      );
    }
  }

  const publishedSchedulePaths = schedules
    .filter(({ data }) => !data.draft && data.sites?.main?.enabled === true)
    .map((schedule) => {
      const training = trainingsById.get(schedule.data.trainingId)!;
      return `${getScheduleMonth(schedule.data)}/${training.data.slug}/${schedule.data.slug}`;
    });
  assertUnique(publishedSchedulePaths, 'URL schedule portal');
}
