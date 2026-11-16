import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://pusattrainingk3.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
