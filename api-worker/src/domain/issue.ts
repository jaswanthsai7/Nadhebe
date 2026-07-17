import { z } from 'zod';

export const SubmitReviewSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  category: z.enum([
    'news',
    'tutorials',
    'youtube-articles',
    'tool-reviews',
    'prompts',
    'comparisons',
    'best-practices',
    'use-cases',
    'tools',
    'guides',
    'frameworks',
    'case-studies'
  ]),
  author: z.string().min(2),
  sourceUrl: z.string().url(),
  markdown: z.string().min(50),
  computedMetrics: z.object({
    wordCount: z.number().int().nonnegative(),
    readingTime: z.number().int().nonnegative(),
    headingStructureOk: z.boolean()
  }),
  aiInsights: z.object({
    confidence: z.number().min(0).max(1),
    factCheckSummary: z.string()
  }),
  bundle: z.object({
    newsletter: z.string().optional(),
    twitterThread: z.array(z.string()).optional(),
    linkedInPost: z.string().optional()
  }).optional()
});

export type SubmitReviewInput = z.infer<typeof SubmitReviewSchema>;
