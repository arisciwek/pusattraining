import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { buildScheduleLastmodMap } from './scripts/sitemap-lastmod.mjs';
import { remarkSiteTokens } from './src/lib/site-tokens.ts';

const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl =
  process.env.SITE_URL ||
  (vercelProductionUrl ? `https://${vercelProductionUrl}` : 'https://pusattrainingk3.com');
const scheduleLastmodByPath = await buildScheduleLastmodMap(new URL('./src/content/', import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    remarkPlugins: [remarkSiteTokens],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404.html'),
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const lastmod = scheduleLastmodByPath.get(pathname);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
