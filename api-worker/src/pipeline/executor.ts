import { Job, JobStatus } from '../domain/job';
import { PipelineStage } from '../domain/pipeline-stage';
import { DomainError } from '../domain/errors';

function formatStructuredLog(
  stage: string,
  status: 'queued' | 'running' | 'success' | 'failed',
  requestId: string | undefined,
  message: string,
  extra: Record<string, any> = {}
): string {
  return JSON.stringify({
    stage,
    status,
    requestId: requestId || 'unknown',
    timestamp: new Date().toISOString(),
    message,
    ...extra
  });
}

export class PipelineExecutor {
  constructor(private stages: PipelineStage[]) {}

  async executeJob(job: Job, env: any, onUpdate: (updatedJob: Job) => void): Promise<Job> {
    let currentJob = { ...job };

    for (const stage of this.stages) {
      const stageKey = stage.name.toLowerCase();

      // Update job state before running stage
      currentJob.status = stage.name as JobStatus;
      currentJob.logs.push({
        timestamp: new Date().toISOString(),
        status: currentJob.status,
        message: formatStructuredLog(
          stageKey,
          'running',
          currentJob.requestId,
          `Starting stage: ${stage.description}`
        )
      });
      currentJob.updatedAt = new Date().toISOString();
      onUpdate(currentJob);

      let success = false;
      let attempt = 0;
      let lastError: any = null;

      while (attempt < stage.maxRetries && !success) {
        attempt++;
        try {
          const result = await Promise.race([
            stage.execute(currentJob, env),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('Stage timeout exceeded')), stage.timeoutMs)
            )
          ]);

          if (result.success) {
            currentJob = {
              ...currentJob,
              ...result.updatedJobFields,
              logs: [
                ...currentJob.logs,
                {
                  timestamp: new Date().toISOString(),
                  status: currentJob.status,
                  message: formatStructuredLog(
                    stageKey,
                    'success',
                    currentJob.requestId,
                    result.message,
                    result.diagnostics ? { diagnostics: result.diagnostics } : {}
                  )
                }
              ]
            };
            success = true;
          } else {
            throw new Error(result.message);
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`Stage ${stage.name} attempt ${attempt} failed:`, err.message);
          await stage.rollback(currentJob, env);
        }
      }

      if (!success) {
        currentJob.status = 'Failed';
        currentJob.logs.push({
          timestamp: new Date().toISOString(),
          status: 'Failed',
          message: formatStructuredLog(
            stageKey,
            'failed',
            currentJob.requestId,
            `Stage ${stage.name} failed after ${stage.maxRetries} attempts. Error: ${lastError?.message || 'Unknown'}`
          )
        });
        currentJob.updatedAt = new Date().toISOString();
        onUpdate(currentJob);
        throw new DomainError('PIPELINE_FAILED', `Generation pipeline failed at stage: ${stage.name}`, lastError);
      }
    }

    currentJob.status = 'Completed';
    currentJob.logs.push({
      timestamp: new Date().toISOString(),
      status: 'Completed',
      message: formatStructuredLog(
        'completed',
        'success',
        currentJob.requestId,
        'AI Article Generation successfully completed'
      )
    });
    currentJob.updatedAt = new Date().toISOString();
    onUpdate(currentJob);

    return currentJob;
  }
}
