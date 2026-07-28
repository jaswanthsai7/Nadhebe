import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import path from 'path';

const rawSite = process.env.PUBLIC_SITE_URL || 'https://nadhebe.com';
const site = rawSite.trim().replace(/\/+$/, '');

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  build: {
    assets: '_assets',      // Cloudflare-safe asset directory name
    inlineStylesheets: 'always',
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/tag/'),
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
