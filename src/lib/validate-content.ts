import { getCollection } from 'astro:content';
import { getScheduleMonth, getScheduleRouteParams, getScheduleSourcePathCandidates } from './schedule-utils';

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

const scheduleFilePaths = Object.keys(import.meta.glob('/src/content/schedules/**/*.md', { eager: false }))
  .map((p) => p.replace(/^.*\/src\/content\/schedules\//, '').replace(/\.md$/, ''));

const scheduleFilePathSet = new Set(scheduleFilePaths);

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

  // HeroTraining renders this value inside p.hero-training__summary.
  // Keep the official training name visible in every rendered hero summary.
  for (const training of trainings) {
    if (!training.data.hero) continue;

    const summary = (training.data.hero.description ?? training.data.description)
      .normalize('NFKC')
      .replace(/\s+/g, ' ')
      .trim();
    const trainingName = training.data.title
      .normalize('NFKC')
      .replace(/\s+/g, ' ')
      .trim();
    const openingSentence = summary.split(/[.!?](?:\s|$)/, 1)[0] ?? '';
    const normalizedOpening = openingSentence.toLocaleLowerCase('id-ID');
    const normalizedName = trainingName.toLocaleLowerCase('id-ID');
    const namePosition = normalizedOpening.indexOf(normalizedName);
    const adalahPosition = normalizedOpening.search(/\badalah\b/);

    if (namePosition === -1 || adalahPosition < namePosition + normalizedName.length) {
      throw new Error(
        `Hero summary untuk training "${training.data.trainingId}" harus memuat nama lengkap "${trainingName}" sebelum kata "adalah" pada kalimat pembuka. Gunakan pola "Pelatihan [nama lengkap] adalah ...".`,
      );
    }
  }

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

    getScheduleRouteParams(schedule, training.data.slug);

    const expectedSourcePaths = getScheduleSourcePathCandidates(
      schedule.data.startDate,
      training.data.slug,
      training.data.trainingId,
      schedule.data.slug,
    );

    if (!expectedSourcePaths.some((path) => scheduleFilePathSet.has(path))) {
      throw new Error(
        `Path schedule "${schedule.data.scheduleId}" harus cocok dengan salah satu lokasi berikut: ${expectedSourcePaths.join(' atau ')}. Path file harus mengikuti schedules/<tahun-startDate>/<training-slug>/<schedule-slug>.md.`,
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
