interface OrgInfo {
  name: string;
  url: string;
  logo: string;
}

export function organizationJsonLd(org: OrgInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
  };
}

export function websiteJsonLd(org: OrgInfo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: org.name,
    url: org.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${org.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

interface BlogPostingInput {
  headline: string;
  description: string;
  url: string;
  image: string;
  authorName: string;
  publishedDate: string;
  modifiedDate?: string;
  orgName: string;
  orgLogo: string;
}

export function blogPostingJsonLd(input: BlogPostingInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.headline,
    description: input.description,
    image: input.image,
    author: {
      '@type': 'Person',
      name: input.authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: input.orgName,
      logo: {
        '@type': 'ImageObject',
        url: input.orgLogo,
      },
    },
    datePublished: input.publishedDate,
    dateModified: input.modifiedDate ?? input.publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
    },
  };
}
