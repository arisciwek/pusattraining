import type { CollectionEntry } from 'astro:content';

export type ScheduleEntry = CollectionEntry<'schedules'>;

export function isMainSiteSchedule(schedule: ScheduleEntry): boolean {
  return !schedule.data.draft && schedule.data.sites?.main?.enabled === true;
}

/** Derive the archive month in the schedule's own timezone, not the server timezone. */
export function getScheduleMonth(schedule: Pick<ScheduleEntry['data'], 'startDate' | 'timezone'>): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(schedule.startDate)) {
    return schedule.startDate.slice(0, 7);
  }

  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: schedule.timezone,
    year: 'numeric',
    month: '2-digit',
  }).formatToParts(new Date(schedule.startDate));
  const year = parts.find((part) => part.type === 'year')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;

  if (!year || !month) {
    throw new Error(`Tidak dapat menentukan bulan schedule dari tanggal: ${schedule.startDate}`);
  }

  return `${year}-${month}`;
}

function parseScheduleDate(value: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day, 12));
  }

  return new Date(value);
}

export function formatScheduleDate(value: string, timezone: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: /^\d{4}-\d{2}-\d{2}$/.test(value) ? 'UTC' : timezone,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parseScheduleDate(value));
}

export function formatScheduleRange(startDate: string, endDate: string, timezone: string): string {
  if (startDate === endDate) return formatScheduleDate(startDate, timezone);
  return `${formatScheduleDate(startDate, timezone)} – ${formatScheduleDate(endDate, timezone)}`;
}

export function getScheduleTitle(schedule: ScheduleEntry): string {
  return schedule.data.sites?.main?.title ?? schedule.data.title;
}

export function getScheduleDescription(schedule: ScheduleEntry): string {
  return schedule.data.sites?.main?.description ?? schedule.data.description;
}

export function getScheduleHref(schedule: ScheduleEntry, trainingSlug: string): string {
  return `/jadwal/${getScheduleMonth(schedule.data)}/${trainingSlug}/${schedule.data.slug}/`;
}

export function getScheduleStatusLabel(status: ScheduleEntry['data']['status']): string {
  const labels: Record<ScheduleEntry['data']['status'], string> = {
    scheduled: 'Akan datang',
    ongoing: 'Sedang berlangsung',
    completed: 'Selesai',
    postponed: 'Ditunda',
    cancelled: 'Dibatalkan',
  };

  return labels[status];
}

export function getRegistrationStatusLabel(status: NonNullable<ScheduleEntry['data']['registration']>['status']): string {
  const labels = {
    'not-open': 'Belum dibuka',
    open: 'Pendaftaran dibuka',
    closed: 'Pendaftaran ditutup',
  };

  return labels[status];
}
