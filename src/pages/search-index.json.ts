import { getCollection } from 'astro:content';
import { getScheduleDescription, getScheduleHref, getScheduleTitle, isMainSiteSchedule } from '../lib/schedule-utils';

type SearchRecord = {
  id: string;
  type: 'Artikel' | 'Pelatihan' | 'Jadwal' | 'Layanan' | 'Halaman';
  title: string;
  description: string;
  href: string;
  category?: string;
  date?: string;
  content: string;
};

function collectText(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(collectText);
  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([key]) => !['image', 'imageSrcset', 'imageSizes', 'imageWidth', 'imageHeight', 'registrationUrl', 'ctaHref', 'actionHref'].includes(key))
      .flatMap(([, nested]) => collectText(nested));
  }
  return [];
}

export async function GET() {
  const [articles, trainings, schedules, services, pages] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('trainings', ({ data }) => !data.draft),
    getCollection('schedules', isMainSiteSchedule),
    getCollection('services', ({ data }) => !data.draft),
    getCollection('pages', ({ data }) => !data.draft && data.slug !== 'home'),
  ]);

  const trainingsById = new Map(trainings.map((entry) => [entry.data.trainingSlug, entry]));
  const categoryTitlesById = new Map(pages.filter((entry) => entry.data.pageType === 'category').map((entry) => [entry.data.id, entry.data.title]));
  const records: SearchRecord[] = [
    ...articles.map(({ data }) => ({
      id: `article-${data.id}`,
      type: 'Artikel' as const,
      title: data.title,
      description: data.description,
      href: `/artikel/${data.slug}/`,
      category: data.category,
      date: data.updatedDate ?? data.pubDate,
      content: collectText(data).join(' '),
    })),
    ...trainings.map(({ data }) => ({
      id: `training-${data.id}`,
      type: 'Pelatihan' as const,
      title: data.title,
      description: data.description,
      href: `/pelatihan/${data.slug}/`,
      category: data.categoryIds.map((id) => categoryTitlesById.get(id)).filter(Boolean).join(' · '),
      date: data.updatedDate ?? data.pubDate,
      content: collectText(data).join(' '),
    })),
    ...schedules.flatMap((schedule) => {
      const training = trainingsById.get(schedule.data.trainingSlug);
      if (!training) return [];
      const data = schedule.data;
      return [{
        id: `schedule-${data.id}`,
        type: 'Jadwal' as const,
        title: getScheduleTitle(schedule),
        description: getScheduleDescription(schedule),
        href: getScheduleHref(schedule, training.data.slug),
        category: [training.data.title, data.venue?.city, data.venue?.province, data.venue?.name].filter(Boolean).join(' · '),
        date: data.startDate,
        content: collectText(data).concat(collectText(training.data)).join(' '),
      }];
    }),
    ...services.map(({ data }) => ({
      id: `service-${data.id}`,
      type: 'Layanan' as const,
      title: data.title,
      description: data.description,
      href: `/layanan/${data.slug}/`,
      date: data.updatedDate ?? data.pubDate,
      content: collectText(data).join(' '),
    })),
    ...pages.map(({ data }) => ({
      id: `page-${data.id}`,
      type: 'Halaman' as const,
      title: data.title,
      description: data.description,
      href: data.pageType === 'category' ? `/pelatihan/${data.slug}/` : `/${data.slug}/`,
      date: data.updatedDate ?? data.pubDate,
      content: collectText(data).join(' '),
    })),
  ];

  return new Response(JSON.stringify(records), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
