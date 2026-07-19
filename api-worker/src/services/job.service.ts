import { Job, CreateJobInput } from '../domain/job';
import { PipelineExecutor } from '../pipeline/executor';
import { SourceExtractionStage, ResearchStage, DraftingStage, PlanningStage, ParallelDraftingStage } from '../pipeline/stages';
import { IssueService } from './issue.service';
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

  static async runAutoPipeline(input: CreateJobInput, env: any, requestId?: string): Promise<any> {
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const reqId = requestId || 'unknown';

    const job: Job = {
      id,
      requestId: reqId,
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
            requestId: reqId,
            timestamp: now,
            message: 'Auto-pipeline job successfully placed in queue'
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
      new PlanningStage(),
      new ParallelDraftingStage()
    ]);

    let completedJob: Job;
    try {
      completedJob = await executor.executeJob(job, env, (updatedJob) => {
        this.jobsMap.set(id, updatedJob);
      });
    } catch (err: any) {
      console.error(`Auto-pipeline execution failed:`, err.message);
      throw new DomainError('PIPELINE_FAILED', `Auto-generation pipeline failed: ${err.message}`, err);
    }

    if (completedJob.status === 'Completed' && completedJob.generatedArticles && completedJob.generatedArticles.length > 0) {
      try {
        const prDetails = await IssueService.createMultiPullRequest(
          completedJob.generatedArticles,
          completedJob.url,
          env,
          reqId
        );
        return {
          jobId: id,
          status: completedJob.status,
          prDetails
        };
      } catch (prErr: any) {
        console.error(`Auto-pipeline Pull Request creation failed:`, prErr.message);
        throw new DomainError('PR_SUBMISSION_FAILED', `Generated articles succeeded but Git submission failed: ${prErr.message}`, prErr);
      }
    } else {
      throw new DomainError('PIPELINE_FAILED', 'Generation completed but no articles were compiled.');
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
