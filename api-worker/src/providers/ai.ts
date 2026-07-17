import { DomainError } from '../domain/errors';

export interface AIRequestOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIProvider {
  generateText(systemPrompt: string, userPrompt: string, options?: AIRequestOptions): Promise<string>;
}

export class CloudflareAIProvider implements AIProvider {
  constructor(private env: any) {}

  async generateText(systemPrompt: string, userPrompt: string, options?: AIRequestOptions): Promise<string> {
    const model = options?.model || '@cf/meta/llama-3.1-8b-instruct';

    if (!this.env.AI || typeof this.env.AI.run !== 'function') {
      throw new DomainError('AI_BINDING_MISSING', 'Cloudflare Workers AI binding "AI" is not configured or missing from the environment.');
    }

    try {
      const response = await this.env.AI.run(model, {
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: options?.temperature || 0.7,
        max_tokens: options?.maxTokens || 2048
      });

      if (!response || (!response.response && typeof response !== 'string')) {
        throw new DomainError('AI_EMPTY_RESPONSE', 'Workers AI returned an empty response.');
      }

      return typeof response === 'string' ? response : response.response;
    } catch (err: any) {
      if (err instanceof DomainError) throw err;
      throw new DomainError('AI_GENERATION_FAILED', `Workers AI execution failed for model ${model}: ${err.message || err}`);
    }
  }
}
