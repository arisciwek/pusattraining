import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const identity = {
  id: z.number().int().positive(),
  ulid: z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/, 'ulid harus berupa ULID 26 karakter'),
};

const editorialDates = {
  pubDate: z.string().datetime({ offset: true }),
  updatedDate: z.string().datetime({ offset: true }),
  draft: z.boolean().default(false),
};

function isValidScheduleDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?(Z|[+-]\d{2}:\d{2}))?$/.exec(value);
  if (!match) return false;

  const [, yearText, monthText, dayText, hourText, minuteText, secondText, , offset] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const calendarDate = new Date(0);
  calendarDate.setUTCHours(0, 0, 0, 0);
  calendarDate.setUTCFullYear(year, month - 1, day);

  if (
    calendarDate.getUTCFullYear() !== year ||
    calendarDate.getUTCMonth() !== month - 1 ||
    calendarDate.getUTCDate() !== day
  ) return false;

  if (hourText === undefined) return true;

  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = secondText === undefined ? 0 : Number(secondText);

  if (hour > 23 || minute > 59 || second > 59) return false;

  if (offset && offset !== 'Z') {
    const offsetHours = Number(offset.slice(1, 3));
    const offsetMinutes = Number(offset.slice(4, 6));
    if (offsetHours > 14 || offsetMinutes > 59 || (offsetHours === 14 && offsetMinutes !== 0)) {
      return false;
    }
  }

  return !Number.isNaN(Date.parse(value));
}

function isIanaTimezone(value: string): boolean {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value });
    return true;
  } catch {
    return false;
  }
}

const scheduleDate = z.string().refine(
  isValidScheduleDate,
  'Tanggal schedule harus berupa tanggal kalender ISO 8601 atau datetime dengan zona waktu',
);

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    type: z.literal('page'),
    ...identity,
    pageType: z.enum(['category', 'standard']).default('standard'),
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    image: z.string().optional(),
    ...editorialDates,
    related: z.array(z.number().int().positive()).default([]),
    blocks: z.array(z.discriminatedUnion('type', [
      z.object({ type: z.literal('training-category'), eyebrow: z.string().optional(), sectionTitle: z.string().min(1), sectionDescription: z.string().optional(), emptyMessage: z.string().min(1) }),
      z.object({ type: z.literal('schedule-index'), eyebrow: z.string().optional(), sectionEyebrow: z.string().optional(), latestTitle: z.string().min(1), archiveTitle: z.string().min(1), emptyTitle: z.string().min(1), emptyDescription: z.string().min(1), emptyActionLabel: z.string().min(1) }),
      z.object({ type: z.literal('training-catalog'), eyebrow: z.string().optional(), title: z.string().min(1), description: z.string().min(1), emptyMessage: z.string().optional(), categoryTitle: z.string().min(1), categoryDescription: z.string().optional() }),
      z.object({ type: z.literal('program-grid'), title: z.string().optional(), description: z.string().optional(), programs: z.array(z.object({ title: z.string(), description: z.string(), href: z.string(), category: z.string().optional() })) }),
      z.object({ type: z.literal('benefits'), title: z.string(), description: z.string().optional(), items: z.array(z.object({ title: z.string(), description: z.string(), icon: z.string().optional() })) }),
      z.object({ type: z.literal('reasons'), title: z.string(), description: z.string().optional(), items: z.array(z.object({ title: z.string(), text: z.string() })) }),
      z.object({ type: z.literal('faq'), id: z.string().optional(), title: z.string().optional(), description: z.string().optional(), items: z.array(z.object({ question: z.string(), answer: z.string() })) }),
      z.object({ type: z.literal('gallery'), title: z.string().optional(), description: z.string().optional(), items: z.array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() })) }),
      z.object({ type: z.literal('timeline'), title: z.string().optional(), items: z.array(z.object({ title: z.string(), description: z.string() })) }),
      z.object({ type: z.literal('stats'), items: z.array(z.object({ value: z.string(), label: z.string(), note: z.string().optional() })) }),
      z.object({ type: z.literal('cta'), eyebrow: z.string().optional(), title: z.string(), description: z.string().optional(), actionLabel: z.string(), actionHref: z.string(), secondaryLabel: z.string().optional(), secondaryHref: z.string().optional() }),
      z.object({ type: z.literal('testimonials'), title: z.string().optional(), items: z.array(z.object({ quote: z.string(), name: z.string(), role: z.string().optional(), organization: z.string().optional() })) }),
      z.object({ type: z.literal('home-hero'), eyebrow: z.string().optional(), title: z.string(), description: z.string(), primaryLabel: z.string().optional(), primaryHref: z.string().optional(), secondaryLabel: z.string().optional(), secondaryHref: z.string().optional(), proofPoints: z.array(z.string()).optional() }),
      z.object({ type: z.literal('home-introduction'), eyebrow: z.string().optional(), title: z.string(), description: z.string(), actionLabel: z.string(), actionHref: z.string() }),
      z.object({ type: z.literal('home-category-overview'), eyebrow: z.string().optional(), title: z.string(), description: z.string().optional(), limit: z.number().int().positive().optional() }),
      z.object({ type: z.literal('home-benefits'), title: z.string(), description: z.string().optional(), items: z.array(z.object({ title: z.string(), description: z.string(), icon: z.string().optional() })) }),
      z.object({ type: z.literal('home-upcoming-schedule'), title: z.string().optional(), description: z.string().optional(), allHref: z.string().optional() }),
      z.object({ type: z.literal('home-contact'), eyebrow: z.string().optional(), title: z.string(), description: z.string(), primaryLabel: z.string(), primaryHref: z.string(), secondaryLabel: z.string(), secondaryHref: z.string() }),
    ])).default([]),
  }),
});

const trainings = defineCollection({
  loader: glob({ base: './src/content/trainings', pattern: '**/*.md' }),
  schema: z.object({
    type: z.literal('training'),
    ...identity,
    trainingId: z.string().min(1),
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    categoryIds: z.array(z.number().int().positive()).default([]),
    ...editorialDates,
    image: z.string().optional(),
    related: z.array(z.number().int().positive()).default([]),
    blocks: z.array(z.discriminatedUnion('type', [
      z.object({
        type: z.literal('training-detail-intro'),
        eyebrow: z.string().optional(),
        noticeTitle: z.string().min(1),
        noticeDescription: z.string().min(1),
      }),
      z.object({
        type: z.literal('training-summary'),
        id: z.string().optional(),
        eyebrow: z.string().optional(),
        items: z.array(z.object({
          label: z.string().min(1),
          value: z.string().min(1),
          detail: z.string().optional(),
        })).min(1),
      }),
      z.object({
        type: z.literal('training-content-section'),
        id: z.string().optional(),
        eyebrow: z.string().optional(),
        title: z.string().min(1),
        description: z.string().optional(),
        items: z.array(z.object({
          title: z.string().min(1),
          description: z.string().optional(),
        })).default([]),
      }),
      z.object({
        type: z.literal('training-faq'),
        id: z.string().optional(),
        eyebrow: z.string().optional(),
        title: z.string().min(1),
        description: z.string().optional(),
        items: z.array(z.object({
          question: z.string().min(1),
          answer: z.string().min(1),
        })).min(1),
      }),
      z.object({
        type: z.literal('training-cta'),
        eyebrow: z.string().optional(),
        title: z.string().min(1),
        description: z.string().optional(),
        actionLabel: z.string().min(1),
        actionHref: z.string().min(1),
        secondaryLabel: z.string().optional(),
        secondaryHref: z.string().optional(),
      }),
      z.object({
        type: z.literal('training-schedule-list'),
        id: z.string().optional(),
        eyebrow: z.string().optional(),
        title: z.string().min(1),
        allLabel: z.string().optional(),
        emptyMessage: z.string().min(1),
      }),
    ])).default([]),
  }),
});

const schedules = defineCollection({
  loader: glob({ base: './src/content/schedules', pattern: '**/*.md' }),
  schema: z.object({
    type: z.literal('schedule'),
    ...identity,
    scheduleId: z.string().min(1),
    publisherId: z.string().min(1),
    trainingId: z.string().min(1),
    batchNo: z.string().min(1),
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    startDate: scheduleDate,
    endDate: scheduleDate,
    dateLabel: z.string().min(1),
    timezone: z.string().default('Asia/Jakarta').refine(
      isIanaTimezone,
      'timezone harus berupa nama zona waktu IANA yang valid',
    ),
    ...editorialDates,
    status: z.enum(['scheduled', 'ongoing', 'completed', 'postponed', 'cancelled']),
    registration: z.object({
      status: z.enum(['not-open', 'open', 'closed']),
      deadline: scheduleDate.optional(),
      capacity: z.number().int().positive().optional(),
    }).optional(),
    delivery: z.object({
      mode: z.enum(['offline', 'online', 'blended']),
      attendanceMode: z.enum(['offline', 'online', 'mixed']),
    }).optional(),
    venue: z.object({
      name: z.string().min(1),
      address: z.string().optional(),
      city: z.string().optional(),
      province: z.string().optional(),
      countryCode: z.string().length(2).default('ID'),
    }).optional(),
    completion: z.object({
      completedDate: scheduleDate.optional(),
      participants: z.array(z.object({
        name: z.string().min(1),
        certificateNumber: z.string().optional(),
      })).default([]),
      gallery: z.array(z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
        caption: z.string().optional(),
      })).default([]),
    }).optional(),
    sites: z.record(z.string(), z.object({
      enabled: z.boolean(),
      title: z.string().optional(),
      description: z.string().optional(),
      ctaLabel: z.string().optional(),
      registrationUrl: z.string().url().optional(),
    })).optional(),
  }).refine((data) => Date.parse(data.endDate) >= Date.parse(data.startDate), {
    message: 'endDate tidak boleh lebih awal dari startDate',
    path: ['endDate'],
  }).refine((data) => Date.parse(data.updatedDate) >= Date.parse(data.pubDate), {
    message: 'updatedDate tidak boleh lebih awal dari pubDate',
    path: ['updatedDate'],
  }),
});

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: z.object({
    type: z.literal('article'),
    ...identity,
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    pubDate: z.string().datetime({ offset: true }),
    updatedDate: z.string().datetime({ offset: true }).optional(),
    author: z.string().min(1),
    category: z.string().min(1),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    related: z.array(z.number().int().positive()).default([]),
  }),
});

export const collections = { pages, trainings, schedules, articles };
