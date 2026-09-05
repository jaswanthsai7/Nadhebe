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
    concurrency: 8,         // Parallelise page builds for faster CI/deploy
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    build: {
      target: 'es2020',
      minify: 'esbuild',
      // Avoid inlining large assets; threshold in bytes
      assetsInlineLimit: 2048,
      rollupOptions: {
        output: {
          // Keep chunks simple for static Astro (no client routing)
          manualChunks: undefined,
        },
      },
    },
  },
  redirects: {
    '/case-studies': '/guides',
    '/case-studies/webflow-to-instatic-migration-savings': '/guides/webflow-to-instatic-migration-savings',
    '/frameworks': '/guides',
    '/frameworks/instatic-astro-islands-frameworks-integration': '/guides/instatic-astro-islands-frameworks-integration',
    '/frameworks/sqlite-state-sharing-multi-agent-architecture': '/guides/sqlite-state-sharing-multi-agent-architecture',
    '/prompts': '/guides',
    '/prompts/instatic-ai-assisted-design-prompts': '/guides/instatic-ai-assisted-design-prompts',
    '/prompts/kimi-k3-structured-prompt-engineering-framework': '/guides/kimi-k3-structured-prompt-engineering-framework',
    '/use-cases': '/guides',
    '/use-cases/instatic-enterprise-editorial-governance': '/guides/instatic-enterprise-editorial-governance',
    '/use-cases/kimi-k3-game-development-use-cases': '/guides/kimi-k3-game-development-use-cases',
    '/youtube': '/tutorials',
    '/youtube/google-flow-storyboard-studio-guide': '/tutorials/google-flow-storyboard-studio-guide',
    '/youtube/instatic-local-setup-importer': '/tutorials/instatic-local-setup-importer',
    '/youtube/instatic-visual-cms-walkthrough': '/tutorials/instatic-visual-cms-walkthrough',
    '/youtube/fable-5-vs-gpt-5-5-comparison': '/comparisons/fable-5-vs-gpt-5-5-comparison',
    '/youtube/gpt-5-6-autonomous-engine': '/reviews/gpt-5-6-autonomous-engine',
    '/youtube/open-source-youtube-automation-agent': '/reviews/open-source-youtube-automation-agent',
    '/tools/cron-next-run-viewer': '/tools/cron-explainer',
    '/tools/prompt-improver': '/tools/prompt-optimizer',
    '/tools/ai-api-pricing-calculator': '/tools/openai-cost-estimator',
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        if (page.includes('/tag/')) return false;
        if (page.includes('/partners/')) return false;
        if (page.includes('/tools/aspect-ratio/')) return false;
        if (page.includes('/tools/compare/')) return false;
        if (page.includes('/tools/reference/')) return false;
        if (page.includes('/downloads/')) return false;
        if (page.includes('/404') || page.includes('/offline')) return false;
        if (page.includes('nadhebe-team.md')) return false;
        return true;
      },
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
