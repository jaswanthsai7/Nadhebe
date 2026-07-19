import { z } from 'zod';

export const JobStatusSchema = z.enum([
  'Queued',
  'Extracting',
  'Researching',
  'Drafting',
  'Reviewing',
  'Completed',
  'Failed',
  'Cancelled'
]);

export type JobStatus = z.infer<typeof JobStatusSchema>;

export interface JobLog {
  timestamp: string;
  status: JobStatus;
  message: string;
}

export interface Job {
  id: string;
  requestId?: string;
  url: string;
  sourceType: 'youtube' | 'github' | 'website' | 'raw';
  status: JobStatus;
  logs: JobLog[];
  markdown?: string;
  frontmatter?: Record<string, any>;
  computedMetrics?: {
    wordCount: number;
    readingTime: number;
    headingStructureOk: boolean;
  };
  aiInsights?: {
    confidence: number;
    factCheckSummary: string;
  };
  bundle?: {
    newsletter: string;
    twitterThread: string[];
    linkedInPost: string;
  };
  clusterPlan?: any;
  generatedArticles?: {
    path: string;
    slug: string;
    title: string;
    category: string;
    content: string;
    wordCount: number;
    readingTime: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export const CreateJobSchema = z.object({
  url: z.string().url(),
  sourceType: z.enum(['youtube', 'github', 'website', 'raw']),
  multi: z.boolean().optional()
});

export type CreateJobInput = z.infer<typeof CreateJobSchema>;
