import { defineCollection, reference, z } from 'astro:content';

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string(),
    twitter: z.string().optional(),
    github: z.string().optional(),
  }),
});

const sharedSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: reference('authors'),
  category: z.string(),
  tags: z.array(z.string()),
  heroImage: z.string(),
  heroAlt: z.string().optional(),
  estimatedReadingTime: z.number().optional(),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ).optional(),
  sources: z.array(
    z.object({
      label: z.string(),
      url: z.string().url(),
    })
  ).optional(),
  canonicalUrl: z.string().url().optional(),
  draft: z.boolean().default(false),
  
  // Topic Cluster SEO fields
  isPillar: z.boolean().optional().default(false),
  topic: z.string().optional(),
  searchIntent: z.string().optional(),
  parentPillar: z.string().optional(),
  youtubeVideoId: z.string().optional(),
  youtubeVideoUrl: z.string().url().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  relatedTopics: z.array(z.string()).optional(),
  lastReviewed: z.coerce.date().optional(),
});

const getYoutubeIdFromTopic = (topic?: string): string | undefined => {
  if (!topic) return undefined;
  const t = topic.toLowerCase();
  if (t.includes('gpt-5.6') || t.includes('soul ultra') || t.includes('cost management')) {
    return '7f3ZHPyKiwI';
  }
  if (t.includes('fable-5') || t.includes('fable 5') || t.includes('gpt-5.5')) {
    return 'QmC9v-GEOiQ';
  }
  if (t.includes('google flow') || t.includes('storyboard')) {
    return 'T1rf33ToVIE';
  }
  if (t.includes('youtube automation') || t.includes('sqlite agent') || t.includes('multi-agent state')) {
    return 'EOHodDuJddc';
  }
  return undefined;
};

const withYoutubeImage = (schema: any) => schema.transform((data: any) => {
  const vid = data.videoId || data.youtubeVideoId || getYoutubeIdFromTopic(data.topic);
  if (vid) {
    data.heroImage = `https://i.ytimg.com/vi/${vid}/maxresdefault.jpg`;
  }
  return data;
});

const news = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema),
});

const tutorials = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema),
});

const youtubeArticles = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema.extend({
    videoId: z.string(),
    videoDuration: z.string(),
    videoUploadDate: z.coerce.date(),
  })),
});

const toolReviews = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema.extend({
    rating: z.number().min(0).max(10),
    pricing: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
  })),
});

const prompts = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema),
});

const comparisons = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema.extend({
    itemsCompared: z.array(z.string()),
  })),
});

const bestPractices = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema),
});

const useCases = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema),
});

const tools = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema),
});

const guides = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema),
});

const frameworks = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: withYoutubeImage(sharedSchema),
});

export const collections = {
  authors,
  news,
  tutorials,
  'youtube-articles': youtubeArticles,
  'tool-reviews': toolReviews,
  prompts,
  comparisons,
  'best-practices': bestPractices,
  'use-cases': useCases,
  tools,
  guides,
  frameworks,
  'case-studies': caseStudies,
};
