import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Update this to your Cloudflare Pages domain once deployed
  // e.g. https://nadhebe.pages.dev  or your custom domain
  site: 'https://nadhebe.pages.dev',
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
