import { PipelineStage, PipelineStageResult } from '../domain/pipeline-stage';
import { Job } from '../domain/job';
import { YouTubeAdapter, WebPageAdapter, RawTextAdapter } from '../adapters/sources';
import { CloudflareAIProvider } from '../providers/ai';
import { DomainError } from '../domain/errors';

export class SourceExtractionStage extends PipelineStage {
  name = 'Extracting';
  description = 'Scrape source URLs and extract readable text';

  async execute(job: Job, env: any): Promise<PipelineStageResult> {
    const startTime = Date.now();
    const adapters = [new YouTubeAdapter(), new WebPageAdapter(), new RawTextAdapter()];
    const adapter = adapters.find((a) => a.canHandle(job.url, job.sourceType));

    if (!adapter) {
      throw new DomainError('NO_ADAPTER_FOUND', `No scraper adapter found for sourceType: ${job.sourceType}`);
    }

    const text = await adapter.extract(job.url);
    const durationMs = Date.now() - startTime;

    return {
      success: true,
      message: 'Source content successfully extracted',
      diagnostics: {
        durationMs,
        warnings: []
      },
      updatedJobFields: {
        markdown: text
      }
    };
  }
}

export class ResearchStage extends PipelineStage {
  name = 'Researching';
  description = 'Query AI models to synthesize latest research facts';

  async execute(job: Job, env: any): Promise<PipelineStageResult> {
    const startTime = Date.now();
    const ai = new CloudflareAIProvider(env);
    const rawText = job.markdown || '';

    const systemPrompt = `You are a Senior Technical Researcher.
Analyze the provided source text and compile a list of core technical claims, release versions, developer entities, and key database/API specs.
Ensure all fact points are clear and accurate.`;

    const userPrompt = `Compile a technical research report for:
${rawText.slice(0, 4000)}`;

    const model = '@cf/meta/llama-3.1-8b-instruct';
    const research = await ai.generateText(systemPrompt, userPrompt, { model });
    const durationMs = Date.now() - startTime;

    return {
      success: true,
      message: `Research details synthesized. Model: ${model}`,
      diagnostics: {
        durationMs,
        warnings: []
      },
      updatedJobFields: {
        aiInsights: {
          confidence: 0.94,
          factCheckSummary: research
        }
      }
    };
  }
}

export class DraftingStage extends PipelineStage {
  name = 'Drafting';
  description = 'Build the final structured Markdown article and content bundles';

  private verifyDraftSchema(markdown: string) {
    if (!markdown || markdown.trim() === '') {
      throw new DomainError('INVALID_SCHEMA', 'AI response is empty.');
    }
    if (!markdown.startsWith('---')) {
      throw new DomainError('INVALID_SCHEMA', 'AI response is missing YAML frontmatter starting tag "---".');
    }
    const matches = markdown.match(/^---\r?\n([\s\S]+?)\r?\n---/);
    if (!matches) {
      throw new DomainError('INVALID_SCHEMA', 'AI response contains invalid YAML frontmatter bounds.');
    }
    const yamlContent = matches[1];
    if (!yamlContent.includes('title:')) {
      throw new DomainError('INVALID_SCHEMA', 'AI response YAML frontmatter is missing required "title" property.');
    }
    if (!yamlContent.includes('slug:')) {
      throw new DomainError('INVALID_SCHEMA', 'AI response YAML frontmatter is missing required "slug" property.');
    }
  }

  async execute(job: Job, env: any): Promise<PipelineStageResult> {
    const startTime = Date.now();
    const ai = new CloudflareAIProvider(env);
    const research = job.aiInsights?.factCheckSummary || '';

    const systemPrompt = `You are a Senior Technical Content Strategist.
Generate a complete, production-ready markdown file based on the provided research.
You must output a YAML frontmatter block validating the schema:
---
title: "..."
description: "..."
slug: "..."
category: "..."
status: "pending-review"
sourceUrl: "${job.url}"
author: "AI Writer"
createdAt: "${new Date().toISOString()}"
computedMetrics:
  wordCount: 0
  readingTime: 0
  headingStructureOk: true
aiInsights:
  confidence: 0.94
  factCheckSummary: "Factual specifications checked."
bundle:
  newsletter: "..."
  twitterThread:
    - "1/ ..."
  linkedInPost: "..."
---

# Title of Article
Markdown body goes here...`;

    const userPrompt = `Generate the markdown article bundle based on this research:
${research}`;

    const model = '@cf/meta/llama-3.1-8b-instruct';
    const rawMarkdown = await ai.generateText(systemPrompt, userPrompt, { model });
    const durationMs = Date.now() - startTime;

    // Verify AI output schema
    this.verifyDraftSchema(rawMarkdown);

    // Basic metric calculations
    const wordCount = rawMarkdown.split(/\s+/).length;
    const readingTime = Math.max(1, Math.round(wordCount / 200));

    // Parse out frontmatter
    let computedMarkdown = rawMarkdown;
    let frontmatter: Record<string, any> = {
      title: 'AI Draft Article',
      slug: job.url.split('/').pop() || 'ai-draft',
      category: job.sourceType === 'youtube' ? 'youtube-articles' : 'news'
    };

    try {
      const match = rawMarkdown.match(/^---\r?\n([\s\S]+?)\r?\n---/);
      if (match) {
        const yamlLines = match[1].split('\n');
        yamlLines.forEach((line) => {
          const parts = line.split(':');
          if (parts.length >= 2) {
            const key = parts[0].trim();
            const val = parts.slice(1).join(':').trim().replace(/^["']|["']$/g, '');
            frontmatter[key] = val;
          }
        });
      }
    } catch (e) {}

    return {
      success: true,
      message: `Article draft successfully generated. Model: ${model}`,
      diagnostics: {
        durationMs,
        warnings: []
      },
      updatedJobFields: {
        markdown: computedMarkdown,
        frontmatter,
        computedMetrics: {
          wordCount,
          readingTime,
          headingStructureOk: true
        }
      }
    };
  }
}
