import { Job, CreateJobInput } from '../domain/job';
import { PipelineExecutor } from '../pipeline/executor';
import { SourceExtractionStage, ResearchStage, DraftingStage } from '../pipeline/stages';
import { DomainError } from '../domain/errors';

export class JobService {
  private static jobsMap = new Map<string, Job>();

  static createJob(input: CreateJobInput, env: any): Job {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const job: Job = {
      id,
      url: input.url,
      sourceType: input.sourceType,
      status: 'Queued',
      logs: [
        {
          timestamp: now,
          status: 'Queued',
          message: 'Job successfully placed in queue'
        }
      ],
      createdAt: now,
      updatedAt: now
    };

    this.jobsMap.set(id, job);

    // Run the pipeline asynchronously to prevent blocking the HTTP response
    const executor = new PipelineExecutor([
      new SourceExtractionStage(),
      new ResearchStage(),
      new DraftingStage()
    ]);

    executor.executeJob(job, env, (updatedJob) => {
      this.jobsMap.set(id, updatedJob);
    }).catch((err) => {
      console.error(`Job ${id} pipeline failed:`, err);
    });

    return job;
  }

  static getJob(id: string): Job {
    const job = this.jobsMap.get(id);
    if (!job) {
      throw new DomainError('JOB_NOT_FOUND', `No job found with ID: ${id}`);
    }
    return job;
  }
}
