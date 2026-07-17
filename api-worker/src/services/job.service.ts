import { Job, CreateJobInput } from '../domain/job';
import { PipelineExecutor } from '../pipeline/executor';
import { SourceExtractionStage, ResearchStage, DraftingStage } from '../pipeline/stages';
import { DomainError } from '../domain/errors';

export class JobService {
  private static jobsMap = new Map<string, Job>();

  static async createJob(input: CreateJobInput, env: any, requestId?: string): Promise<Job> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const job: Job = {
      id,
      requestId,
      url: input.url,
      sourceType: input.sourceType,
      status: 'Queued',
      logs: [
        {
          timestamp: now,
          status: 'Queued',
          message: JSON.stringify({
            stage: 'worker',
            status: 'queued',
            requestId,
            timestamp: now,
            message: 'Job successfully placed in queue'
          })
        }
      ],
      createdAt: now,
      updatedAt: now
    };

    this.jobsMap.set(id, job);

    const executor = new PipelineExecutor([
      new SourceExtractionStage(),
      new ResearchStage(),
      new DraftingStage()
    ]);

    try {
      const completedJob = await executor.executeJob(job, env, (updatedJob) => {
        this.jobsMap.set(id, updatedJob);
      });
      return completedJob;
    } catch (err) {
      console.error(`Job ${id} pipeline failed:`, err);
      return this.jobsMap.get(id) || job;
    }
  }

  static getJob(id: string): Job {
    const job = this.jobsMap.get(id);
    if (!job) {
      throw new DomainError('JOB_NOT_FOUND', `No job found with ID: ${id}`);
    }
    return job;
  }
}
