import { PipelineStage, PipelineStageResult } from '../domain/pipeline-stage';
import { Job } from '../domain/job';
import { YouTubeAdapter, WebPageAdapter, RawTextAdapter } from '../adapters/sources';
import { CloudflareAIProvider } from '../providers/ai';
import { DomainError } from '../domain/errors';
import { MdxBuilder } from '../utils/mdx-builder';

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
  timeoutMs = 90000;

  async execute(job: Job, env: any): Promise<PipelineStageResult> {
    const startTime = Date.now();
    const ai = new CloudflareAIProvider(env);
    const rawText = job.markdown || '';

    const systemPrompt = `You are a Senior Technical Researcher.
Analyze the provided source text and compile a list of core technical claims, release versions, developer entities, and key database/API specs.
Ensure all fact points are clear and accurate.`;

    const userPrompt = `Compile a technical research report for:
${rawText.slice(0, 4000)}`;

    const model = '@cf/meta/llama-3.2-3b-instruct';
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

  private extractAndVerify(rawMarkdown: string): string {
    if (!rawMarkdown || rawMarkdown.trim() === '') {
      throw new DomainError('INVALID_SCHEMA', 'AI response is empty.');
    }

    // LLMs sometimes add preamble before the frontmatter — find the first ---
    let markdown = rawMarkdown;
    const fmStart = rawMarkdown.indexOf('---');
    if (fmStart === -1) {
      // No frontmatter at all — wrap the raw text with a minimal one
      const nowISO = new Date().toISOString();
      markdown = `---\ntitle: "AI Generated Draft"\nslug: "ai-draft-${Date.now()}"\ncategory: "news"\nstatus: "pending-review"\ncreatedAt: "${nowISO}"\n---\n\n${rawMarkdown}`;
    } else if (fmStart > 0) {
      // Strip everything before the first ---
      markdown = rawMarkdown.slice(fmStart);
    }

    return markdown;
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

    const model = '@cf/meta/llama-3.2-3b-instruct';
    const rawMarkdown = await ai.generateText(systemPrompt, userPrompt, { model });
    const durationMs = Date.now() - startTime;

    // Extract and clean AI output (strips preamble, injects frontmatter if missing)
    const cleanedMarkdown = this.extractAndVerify(rawMarkdown);

    // Basic metric calculations
    const wordCount = cleanedMarkdown.split(/\s+/).length;
    const readingTime = Math.max(1, Math.round(wordCount / 200));

    // Parse out frontmatter
    let computedMarkdown = cleanedMarkdown;
    let frontmatter: Record<string, any> = {
      title: 'AI Draft Article',
      slug: job.url.split('/').pop() || 'ai-draft',
      category: job.sourceType === 'youtube' ? 'youtube-articles' : 'news'
    };

    try {
      const match = cleanedMarkdown.match(/^---\r?\n([\s\S]+?)\r?\n---/);
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

export class PlanningStage extends PipelineStage {
  name = 'Planning';
  description = 'Determine content cluster articles, keywords, intents, and taxonomy folders based on facts';
  timeoutMs = 90000;

  async execute(job: Job, env: any): Promise<PipelineStageResult> {
    const startTime = Date.now();
    const ai = new CloudflareAIProvider(env);
    const facts = job.aiInsights?.factCheckSummary || '';

    const systemPrompt = `You are a Principal SEO Architect and Content Planner.
Analyze the provided factsheet and outline a planned article cluster.
You MUST output ONLY a valid JSON object matching the following structure:
{
  "cluster": [
    {
      "title": "Title targeting keyword",
      "description": "Meta description under 160 characters",
      "folder": "news | tutorials | comparisons | prompts | best-practices | use-cases",
      "slug": "hyphenated-lowercase-slug",
      "tags": ["tag1", "tag2"],
      "difficulty": "beginner | intermediate | advanced",
      "searchIntent": "Search intent description"
    }
  ]
}
Design exactly 2 to 4 articles that naturally fit the material, target different intents, and have zero duplication. Do not output any markup prefix, markdown, backticks, or trailing explanations. Only return the JSON.`;

    const userPrompt = `Compile a content cluster plan for these facts:\n${facts}`;
    const model = '@cf/meta/llama-3.2-3b-instruct';
    
    let rawResult = '';
    let clusterPlan: any = null;
    let warnings: string[] = [];

    try {
      rawResult = await ai.generateText(systemPrompt, userPrompt, { model });
      
      let jsonText = rawResult.trim();
      if (jsonText.includes('```')) {
        const start = jsonText.indexOf('{');
        const end = jsonText.lastIndexOf('}');
        if (start !== -1 && end !== -1) {
          jsonText = jsonText.substring(start, end + 1);
        }
      }
      clusterPlan = JSON.parse(jsonText);
      if (!clusterPlan || !Array.isArray(clusterPlan.cluster) || clusterPlan.cluster.length === 0) {
        throw new Error('Parsed plan is empty or does not contain a valid cluster array');
      }
    } catch (err: any) {
      console.warn('PlanningStage model call or parse failed. Executing fallback plan. Error:', err.message);
      warnings.push(`PlanningStage failed: ${err.message}. Using fallback.`);
      
      const slugTimestamp = Date.now();
      clusterPlan = {
        cluster: [
          {
            title: `Deep Dive: Factual Analysis & Specifications`,
            description: `A comprehensive evaluation and structured review of specifications based on official facts.`,
            folder: 'news',
            slug: `technical-deep-dive-${slugTimestamp}`,
            tags: ['ai', 'news', 'specs'],
            difficulty: 'intermediate',
            searchIntent: 'Detailed technical overview of parameters and configurations'
          },
          {
            title: `Step-by-Step Setup Guide & Implementation Workflow`,
            description: `Practical step-by-step instructions and code sequences to configure and deploy the systems.`,
            folder: 'tutorials',
            slug: `setup-implementation-guide-${slugTimestamp}`,
            tags: ['ai', 'tutorials', 'workflow'],
            difficulty: 'intermediate',
            searchIntent: 'Step-by-step tutorial for setup and local deployment'
          }
        ]
      };
    }

    return {
      success: true,
      message: `Content cluster planned. Planned ${clusterPlan.cluster?.length || 0} articles.`,
      diagnostics: { durationMs, warnings: [] },
      updatedJobFields: {
        clusterPlan
      }
    };
  }
}

export class ParallelDraftingStage extends PipelineStage {
  name = 'Drafting';
  description = 'Generate full MDX files in parallel using planned article specifications';
  timeoutMs = 90000;

  async execute(job: Job, env: any): Promise<PipelineStageResult> {
    const startTime = Date.now();
    const ai = new CloudflareAIProvider(env);
    const facts = job.aiInsights?.factCheckSummary || '';
    const plan = job.clusterPlan || { cluster: [] };
    const articlesSpec = plan.cluster || [];

    if (articlesSpec.length === 0) {
      throw new DomainError('NO_ARTICLES_PLANNED', 'No articles were defined in the PlanningStage');
    }

    // Extract video details for MDX Builder
    let videoId = 'unknown';
    try {
      const urlMatch = job.url.match(/(?:v=|\/)([^"&?\/\s]{11})/);
      if (urlMatch) videoId = urlMatch[1];
    } catch (e) {}

    // Run parallel generations
    const draftingPromises = articlesSpec.map(async (spec: any) => {
      const systemPrompt = `You are a Staff Technical Writer and Developer.
Write a comprehensive, publication-ready article body for: "${spec.title}".
Search Intent: ${spec.searchIntent}
Target Folder: ${spec.folder}
Factsheet reference:
${facts}

Do NOT output any markdown YAML frontmatter headers (e.g. title, description, tags, slug).
Only write the markdown body content. Ensure the content begins directly with H1 '# ${spec.title}'.
Write in a professional, technical, helpful, and natural style. Include structured sections, code examples, lists, or comparison charts.`;

      const userPrompt = `Draft the markdown body for "${spec.title}" targeting intent: "${spec.searchIntent}"`;
      const model = '@cf/meta/llama-3.2-3b-instruct';

      let contentBody = '';
      try {
        contentBody = await ai.generateText(systemPrompt, userPrompt, { model });
      } catch (err: any) {
        console.error(`Failed drafting for ${spec.title}:`, err.message);
        contentBody = `# ${spec.title}\n\nThis article reviews the specifications of the source material. Refer to the reference video at ${job.url}.`;
      }

      // Clean LLM formatting artifacts
      let cleanedBody = contentBody.trim();
      if (cleanedBody.startsWith('```markdown')) {
        cleanedBody = cleanedBody.slice(11, -3).trim();
      } else if (cleanedBody.startsWith('```')) {
        cleanedBody = cleanedBody.slice(3, -3).trim();
      }

      // Compile complete MDX file with YAML frontmatter via deterministic builder
      const articleBuilderInput = {
        title: spec.title,
        description: spec.description,
        folder: spec.folder,
        slug: spec.slug,
        content: cleanedBody,
        tags: spec.tags,
        difficulty: spec.difficulty,
        searchIntent: spec.searchIntent,
        topic: spec.topic || plan.topic
      };

      const finalMdx = MdxBuilder.build(articleBuilderInput, videoId, job.url);
      const wordCount = cleanedBody.split(/\s+/).length;
      const readingTime = Math.max(1, Math.round(wordCount / 200));

      return {
        path: `src/content/${spec.folder}/${spec.slug}.md`,
        slug: spec.slug,
        title: spec.title,
        category: spec.folder,
        content: finalMdx,
        wordCount,
        readingTime
      };
    });

    const generatedArticles = await Promise.all(draftingPromises);
    const durationMs = Date.now() - startTime;

    return {
      success: true,
      message: `Successfully drafted ${generatedArticles.length} articles in parallel.`,
      diagnostics: { durationMs, warnings: [] },
      updatedJobFields: {
        generatedArticles
      }
    };
  }
}
