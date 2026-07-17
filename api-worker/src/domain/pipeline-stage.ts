import { Job } from './job';

export interface PipelineDiagnostics {
  durationMs: number;
  tokensUsed?: number;
  warnings: string[];
}

export interface PipelineStageResult {
  success: boolean;
  message: string;
  diagnostics?: PipelineDiagnostics;
  updatedJobFields: Partial<Job>;
}

export abstract class PipelineStage {
  abstract name: string;
  abstract description: string;
  maxRetries: number = 3;
  timeoutMs: number = 30000;

  abstract execute(job: Job, env: any): Promise<PipelineStageResult>;
  
  async rollback(job: Job, env: any): Promise<void> {
    // Default rollback action
  }
}
