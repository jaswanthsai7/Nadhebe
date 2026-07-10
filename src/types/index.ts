export interface Author {
  name: string;
  role?: string;
  avatar?: string;
  bio?: string;
  twitter?: string;
  url?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReferenceItem {
  title: string;
  url: string;
  publisher?: string;
}

export interface RelatedPostRef {
  slug: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  category: string;
  // note: `slug` is reserved by Astro content collections and is generated automatically
  tags: string[];
  author: string;
  publishedDate: string;
  updatedDate?: string;
  featuredImage: string;
  featuredImageAlt: string;
  canonical?: string;
  keywords?: string[];
  draft?: boolean;
  featured?: boolean;
  reviewedBy?: string;
  relatedPosts?: string[];
  faq?: FAQItem[];
  references?: ReferenceItem[];
}

export interface TocItem {
  depth: number;
  slug: string;
  text: string;
}
