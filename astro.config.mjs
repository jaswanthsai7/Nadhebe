import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const rawSite = process.env.PUBLIC_SITE_URL || 'https://nadhebe.pages.dev';
const site = rawSite.trim().replace(/\/+$/, '');

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',         // Static site — no adapter needed for Cloudflare Pages
  build: {
    assets: '_assets',      // Cloudflare-safe asset directory name
  },
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
