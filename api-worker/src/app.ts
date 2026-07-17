import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { CreateJobSchema } from './domain/job';
import { SubmitReviewSchema } from './domain/issue';
import { JobService } from './services/job.service';
import { IssueService } from './services/issue.service';
import { DomainError } from './domain/errors';

export const app = new Hono();

// Enable CORS to allow the frontend Astro static pages to communicate
app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Inject Request ID for tracing
app.use('*', async (c, next) => {
  c.set('requestId', crypto.randomUUID());
  await next();
});

// Standard Envelope helper
const envelope = (c: any, success: boolean, data: any, error: any = null, status = 200) => {
  return c.json({
    success,
    data,
    error,
    meta: {
      requestId: c.get('requestId'),
      timestamp: new Date().toISOString(),
      version: 'v1'
    }
  }, status);
};

// Global Error Handler
app.onError((err, c) => {
  console.error('API Worker Error:', err);
  if (err instanceof DomainError) {
    return envelope(c, false, null, {
      code: err.code,
      message: err.message,
      details: err.details
    }, 400);
  }
  return envelope(c, false, null, {
    code: 'INTERNAL_SERVER_ERROR',
    message: err.message || 'An unexpected server error occurred'
  }, 500);
});

// POST /api/v1/jobs — Create a generation job
app.post('/api/v1/jobs', async (c) => {
  const body = await c.req.json();
  const result = CreateJobSchema.safeParse(body);
  if (!result.success) {
    throw new DomainError('VALIDATION_FAILED', 'Invalid input parameters for creating a job', result.error.format());
  }

  const requestId = c.get('requestId');
  const job = await JobService.createJob(result.data, c.env, requestId);
  
  if (job.status === 'Failed') {
    const lastErrorLog = job.logs[job.logs.length - 1];
    let errorMessage = lastErrorLog?.message || 'Unknown pipeline failure';
    try {
      if (errorMessage.startsWith('{')) {
        const parsed = JSON.parse(errorMessage);
        errorMessage = parsed.message || errorMessage;
      }
    } catch (e) {}
    throw new DomainError('PIPELINE_FAILED', `Generation pipeline failed: ${errorMessage}`);
  }

  return envelope(c, true, job, null, 200);
});

// GET /api/v1/jobs/:id — Check job status & output
app.get('/api/v1/jobs/:id', async (c) => {
  const id = c.req.param('id');
  const job = JobService.getJob(id);
  return envelope(c, true, job);
});

// POST /api/v1/issues — Submit article to GitHub Issues
app.post('/api/v1/issues', async (c) => {
  const body = await c.req.json();
  const result = SubmitReviewSchema.safeParse(body);
  if (!result.success) {
    throw new DomainError('VALIDATION_FAILED', 'Invalid input parameters for submitting issue', result.error.format());
  }

  const submission = await IssueService.createIssue(result.data, c.env);
  return envelope(c, true, submission, null, 201);
});
