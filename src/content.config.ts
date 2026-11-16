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

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    type: z.literal('page'),
    ...identity,
    pageType: z.enum(['category', 'standard']).default('standard'),
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
    ...editorialDates,
    related: z.array(z.number().int().positive()).default([]),
    blocks: z.array(z.record(z.string(), z.unknown())).default([]),
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
  }),
});

const scheduleDate = z.string().refine((value) => !Number.isNaN(Date.parse(value)), 'Tanggal schedule harus berupa tanggal ISO 8601 yang valid');

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
    timezone: z.string().default('Asia/Jakarta'),
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
      name: z.string().min(1).optional(),
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
