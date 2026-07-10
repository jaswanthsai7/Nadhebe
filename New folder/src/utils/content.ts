import { getCollection } from 'astro:content';

export interface Article {
  id: string;
  slug: string;
  body: string;
  collection: 'news' | 'tutorials' | 'youtube-articles' | 'tool-reviews' | 'prompts' | 'comparisons';
  data: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    author: {
      id: string;
      collection: 'authors';
    };
    category: string;
    tags: string[];
    heroImage: string;
    faq?: { question: string; answer: string; }[];
    sources?: { label: string; url: string; }[];
    canonicalUrl?: string;
    draft: boolean;

    // Topic Cluster SEO fields
    isPillar?: boolean;
    topic?: string;
    searchIntent?: string;
    parentPillar?: string;
    youtubeVideoId?: string;
    youtubeVideoUrl?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    estimatedReadingTime?: number;
    relatedTopics?: string[];
    lastReviewed?: Date;

    // Tool Review fields
    rating?: number;
    pricing?: string;
    pros?: string[];
    cons?: string[];

    // Comparison fields
    itemsCompared?: string[];
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const [news, tutorials, youtube, reviews, prompts, comparisons] = await Promise.all([
    getCollection('news'),
    getCollection('tutorials'),
    getCollection('youtube-articles'),
    getCollection('tool-reviews'),
    getCollection('prompts'),
    getCollection('comparisons'),
  ]);

  const all = [
    ...news.map(p => ({ ...p, collection: 'news' as const })),
    ...tutorials.map(p => ({ ...p, collection: 'tutorials' as const })),
    ...youtube.map(p => ({ ...p, collection: 'youtube-articles' as const })),
    ...reviews.map(p => ({ ...p, collection: 'tool-reviews' as const })),
    ...prompts.map(p => ({ ...p, collection: 'prompts' as const })),
    ...comparisons.map(p => ({ ...p, collection: 'comparisons' as const })),
  ];

  // Filter out drafts and sort by date descending
  return all
    .filter(p => !p.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()) as unknown as Article[];
}

export function getArticleUrl(article: { collection: string; slug: string }): string {
  switch (article.collection) {
    case 'news':
      return `/news/${article.slug}`;
    case 'tutorials':
      return `/tutorials/${article.slug}`;
    case 'youtube-articles':
      return `/youtube/${article.slug}`;
    case 'tool-reviews':
      return `/reviews/${article.slug}`;
    case 'prompts':
      return `/prompts/${article.slug}`;
    case 'comparisons':
      return `/comparisons/${article.slug}`;
    default:
      return `/`;
  }
}

export async function getCluster(topicName: string) {
  const articles = await getAllArticles();
  const clusterArticles = articles.filter(
    a => a.data.topic?.toLowerCase() === topicName.toLowerCase()
  );

  const pillar = clusterArticles.find(a => a.data.isPillar === true);
  const supporting = clusterArticles.filter(a => !a.data.isPillar);

  return {
    pillar,
    supporting,
    all: clusterArticles,
  };
}
