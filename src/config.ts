const rawSiteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://nadhebe.pages.dev';
export const SITE_URL = rawSiteUrl.trim().replace(/\/+$/, '');

export const SITE = {
  name: 'Nadhebe',
  description: 'Expert tutorials, tools comparisons, system prompts, and AI tool reviews structured in SEO topic clusters.',
  url: SITE_URL,
  logo: '/logo.svg',
  ogDefault: '/og-default.png',
  twitterHandle: '@nadhebe',
  locale: 'en_US',
};

