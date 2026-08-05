import type { ToolDefinition } from '@/config/tool-schema';

export interface SeoInput {
  title: string;
  description: string;
  slug: string;
  siteUrl: string;
  siteName: string;
  image?: string;
  imageAlt?: string;
  publishedDate?: Date;
  updatedDate?: Date;
  author?: string;
  keywords?: string[];
  noindex?: boolean;
  locale?: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  ogImageAlt: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  locale: string;
}

/** Builds a complete, deduplicated set of SEO tags from frontmatter + site config. */
export function buildSeo(input: SeoInput): SeoMeta {
  const cleanSiteUrl = input.siteUrl.trim();
  const baseUrl = cleanSiteUrl.endsWith('/') ? cleanSiteUrl : `${cleanSiteUrl}/`;
  const cleanPath = input.slug.replace(/^\//, '');
  const pathWithSlash = cleanPath && !cleanPath.endsWith('/') && !/\.[a-z0-9]+$/i.test(cleanPath)
    ? `${cleanPath}/`
    : cleanPath;
  const url = new URL(pathWithSlash, baseUrl).toString();
  const image = input.image
    ? (input.image.startsWith('http') ? input.image : new URL(input.image.replace(/^\//, ''), baseUrl).toString())
    : new URL('og-default.png', baseUrl).toString();

  const title = input.title; // Do not aggressively truncate title here, wait for rendering
  const description =
    input.description.length > 160 ? `${input.description.slice(0, 157)}...` : input.description;

  return {
    title: `${title} · ${input.siteName}`,
    description,
    canonical: url,
    robots: input.noindex ? 'noindex, follow' : 'index, follow',
    keywords: (input.keywords ?? []).join(', '),
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: image,
    ogImageAlt: input.imageAlt ?? title,
    ogType: input.publishedDate ? 'article' : 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    author: input.author,
    publishedTime: input.publishedDate?.toISOString(),
    modifiedTime: (input.updatedDate ?? input.publishedDate)?.toISOString(),
    locale: input.locale ?? 'en_US',
  };
}

/** Generates a complete array of JSON-LD schemas for a ToolDefinition */
export function generateToolJsonLd(tool: ToolDefinition, siteUrl: string): Record<string, any>[] {
  const currentUrl = `${siteUrl.replace(/\/$/, '')}/tools/${tool.slug}/`;
  
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.seo.title || tool.name,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    url: currentUrl,
    description: tool.seo.description || tool.content.intro,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    softwareVersion: tool.lifecycle.version,
    datePublished: tool.lifecycle.created,
    dateModified: tool.lifecycle.lastUpdated,
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    operatingSystem: 'All',
    applicationCategory: 'DeveloperApplication',
    url: currentUrl,
    description: tool.seo.description || tool.content.intro,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    }
  };

  const faqSchema = tool.content.faq && tool.content.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.content.faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.example ? `${item.answer}\\n\\nExample:\\n${item.example}` : item.answer,
      },
    })),
  } : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: `${siteUrl.replace(/\/$/, '')}/tools/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: currentUrl,
      }
    ]
  };

  const howToSchema = tool.content.examples && tool.content.examples.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${tool.name}`,
    description: tool.content.intro,
    step: tool.content.examples.map((ex, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Example: ${ex.explanation.slice(0, 30)}...`,
      text: ex.explanation,
      itemListElement: [
        {
          '@type': 'HowToDirection',
          text: `Input: ${ex.input}`
        },
        {
          '@type': 'HowToDirection',
          text: `Output: ${ex.output}`
        }
      ]
    }))
  } : null;

  const schemas = [webAppSchema, softwareSchema, breadcrumbSchema];
  if (faqSchema) schemas.push(faqSchema);
  if (howToSchema) schemas.push(howToSchema);

  return schemas;
}
