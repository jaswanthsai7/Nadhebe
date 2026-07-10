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
  estimatedReadingTime: z.number().optional(),
  relatedTopics: z.array(z.string()).optional(),
  lastReviewed: z.coerce.date().optional(),
});

const news = defineCollection({
  type: 'content',
  schema: sharedSchema,
});

const tutorials = defineCollection({
  type: 'content',
  schema: sharedSchema,
});

const youtubeArticles = defineCollection({
  type: 'content',
  schema: sharedSchema.extend({
    videoId: z.string(),
    videoDuration: z.string(),
    videoUploadDate: z.coerce.date(),
  }),
});

const toolReviews = defineCollection({
  type: 'content',
  schema: sharedSchema.extend({
    rating: z.number().min(0).max(10),
    pricing: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
  }),
});

const prompts = defineCollection({
  type: 'content',
  schema: sharedSchema,
});

const comparisons = defineCollection({
  type: 'content',
  schema: sharedSchema.extend({
    itemsCompared: z.array(z.string()),
  }),
});

export const collections = {
  authors,
  news,
  tutorials,
  'youtube-articles': youtubeArticles,
  'tool-reviews': toolReviews,
  prompts,
  comparisons,
};
