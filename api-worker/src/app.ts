import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { CreateJobSchema } from './domain/job';
import { SubmitReviewSchema } from './domain/issue';
import { JobService } from './services/job.service';
import { IssueService } from './services/issue.service';
import { DomainError } from './domain/errors';

export const app = new Hono<{ Bindings: any; Variables: any }>();

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
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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

// POST /api/v1/jobs & /jobs — Create a generation job
const handleCreateJob = async (c: any) => {
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
};

app.post('/api/v1/jobs', handleCreateJob);
app.post('/jobs', handleCreateJob);

// GET /api/v1/jobs/:id & /jobs/:id — Check job status & output
const handleGetJob = async (c: any) => {
  const id = c.req.param('id');
  const job = JobService.getJob(id);
  return envelope(c, true, job);
};

app.get('/api/v1/jobs/:id', handleGetJob);
app.get('/jobs/:id', handleGetJob);

// POST /api/v1/issues & /issues — Submit article to GitHub Pull Request
const handleSubmitIssue = async (c: any) => {
  const body = await c.req.json();
  const result = SubmitReviewSchema.safeParse(body);
  if (!result.success) {
    throw new DomainError('VALIDATION_FAILED', 'Invalid input parameters for submitting pull request', result.error.format());
  }

  const requestId = c.get('requestId');
  const submission = await IssueService.createPullRequest(result.data, c.env, requestId);
  return envelope(c, true, submission, null, 201);
};

app.post('/api/v1/issues', handleSubmitIssue);
app.post('/issues', handleSubmitIssue);

// POST /api/v1/subscribe & /subscribe — Subscribe email to Beehiiv
const handleSubscribe = async (c: any) => {
  const body = await c.req.json();
  const { email } = body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new DomainError('VALIDATION_FAILED', 'Invalid email address format');
  }

  const pubId = c.env.PUBLIC_BEEHIIV_PUBLICATION_ID;
  const apiKey = c.env.BEEHIIV_API_KEY;

  if (!pubId || !apiKey) {
    throw new DomainError('CONFIG_MISSING', 'Beehiiv configuration is missing in the environment');
  }

  try {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, reactivate_existing: true })
    });

    const data: any = await res.json();
    if (!res.ok) {
      const errMsg = data.errors?.[0]?.message || `Beehiiv API returned status ${res.status}`;
      throw new Error(errMsg);
    }

    return envelope(c, true, { subscription: data.data }, null, 201);
  } catch (err: any) {
    throw new DomainError('SUBSCRIBE_FAILED', `Failed to subscribe: ${err.message}`, err);
  }
};

app.post('/api/v1/subscribe', handleSubscribe);
app.post('/subscribe', handleSubscribe);

