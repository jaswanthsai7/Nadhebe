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
  const url = new URL(input.slug.replace(/^\//, ''), input.siteUrl).toString();
  const image = input.image
    ? new URL(input.image, input.siteUrl).toString()
    : new URL('/og-default.png', input.siteUrl).toString(); // Using og-default.png to match workspace

  const title = input.title.length > 60 ? `${input.title.slice(0, 57)}...` : input.title;
  const description =
    input.description.length > 160 ? `${input.description.slice(0, 157)}...` : input.description;

  return {
    title: `${title} · ${input.siteName}`,
    description,
    canonical: url,
    robots: input.noindex ? 'noindex, nofollow' : 'index, follow',
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
