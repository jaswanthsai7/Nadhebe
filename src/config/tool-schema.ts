export interface ToolDefinition {
  // Identity & Navigation
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  category: string;
  tags: string[];         // e.g., ["seo", "url", "slug"] - powers the Related Content Engine
  intent: 'Informational' | 'Transactional' | 'Navigational' | 'Developer' | 'Calculator' | 'Generator' | 'Checker' | 'Linter';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;  // e.g., "2 minutes"

  // Tool Engine & Playground
  inputs: { name: string; type: string; default?: any }[];
  outputs: { name: string; type: string; formats: string[] }[]; // e.g., ['txt', 'json', 'yaml', 'md']
  interactivePlayground: boolean; // Enables real-time Live Output

  // Automated SEO & Content Strategy
  seo: {
    // Can be auto-generated from metadata if omitted
    title?: string;
    description?: string;
    keywords: string[];
    cluster: string;      // Enables Topical Authority (e.g., 'SEO Formatting')
  };
  
  content: {
    intro: string;
    useCases: string[];
    mistakes: { mistake: string; fix: string }[];
    examples: { input: string; output: string; explanation: string }[];
    comparisons?: { feature: string; values: Record<string, string> }[]; // Renders as Comparison Tables
    peopleAlsoAsk: string[];
  };

  // AI Discoverability & Readability
  ai: {
    summary: string;
    llmDescription: string;
    markdown: string;
    json: string;
    prompt: string;
    examples: string[];
    citations: string[];
  };

  // Performance & Benchmarks (Crucial for AI tools)
  benchmarks?: {
    estimatedLatency?: string;
    memory?: string;
    cost?: string;
    accuracy?: string;
    contextUsage?: string;
  };

  // Trust, Maintenance & Versioning
  lifecycle: {
    version: string;
    created: string; // ISO date string
    lastUpdated: string; // ISO date string
    deprecated: boolean;
    changelog: string[];
  };
}
