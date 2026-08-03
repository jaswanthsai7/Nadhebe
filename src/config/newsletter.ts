export interface StarterKitItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface NewsletterIssue {
  slug: string;
  issueNumber: number;
  title: string;
  pubDate: string;
  summary: string;
  takeaways: string[];
  topics: string[];
  relatedTutorialSlugs?: string[];
}

export const STARTER_KIT_ITEMS: StarterKitItem[] = [
  {
    id: 'claude-prompts',
    title: 'Claude Code Prompt Pack',
    description: 'Production-ready system prompts for refactoring, test generation, and autonomous coding loops.',
    icon: '⚡',
  },
  {
    id: 'mcp-configs',
    title: 'MCP Server Config Pack',
    description: '15 battle-tested Model Context Protocol server configurations for PostgreSQL, Git, and Docker.',
    icon: '🔌',
  },
  {
    id: 'cursor-rules',
    title: 'Cursor Rules Templates',
    description: 'Custom .cursorrules files tuned for Astro, TypeScript, vLLM, and Next.js projects.',
    icon: '🎯',
  },
  {
    id: 'gemini-cheatsheet',
    title: 'Gemini CLI Cheat Sheet',
    description: 'Command line reference for multimodal prompts, video analysis, and token budget management.',
    icon: '💎',
  },
  {
    id: 'engineering-checklist',
    title: 'AI Engineering Checklist',
    description: '25-point verification checklist for deploying local LLMs and agentic loops into production.',
    icon: '📋',
  },
  {
    id: 'developer-resources',
    title: '100 AI Developer Resources',
    description: 'Curated directory of open-source models, evaluation frameworks, benchmark suites, and GPU providers.',
    icon: '🚀',
  },
];

export const INTEREST_TOPICS = [
  { id: 'claude', label: 'Claude & MCP' },
  { id: 'gemini', label: 'Gemini API & CLI' },
  { id: 'cursor', label: 'Cursor & AI Editors' },
  { id: 'vllm', label: 'vLLM & Local Inference' },
  { id: 'open-source', label: 'Open Source Models' },
  { id: 'news', label: 'Weekly AI News' },
];

export const ARCHIVED_ISSUES: NewsletterIssue[] = [
  {
    slug: 'issue-12-claude-code-hooks-vllm-deepseek',
    issueNumber: 12,
    title: 'Brief #12: Claude Code Hooks, vLLM DeepSeek R1 Benchmarks, and Custom MCP Servers',
    pubDate: '2026-07-28',
    summary: 'An in-depth breakdown of Claude Code hook automation, self-hosting DeepSeek R1 on RunPod vLLM, and building TypeScript MCP servers.',
    takeaways: [
      'How to isolate state in multi-agent autonomous coding loops.',
      'Benchmarking vLLM throughput (tok/s) on single H100 vs 4x RTX 3090s.',
      'Setting up token cache limits for Claude 3.5 Sonnet API.',
    ],
    topics: ['Claude', 'vLLM', 'MCP', 'DeepSeek'],
    relatedTutorialSlugs: ['deploy-deepseek-r1-aws-vllm', 'build-custom-mcp-server-typescript'],
  },
  {
    slug: 'issue-11-gemini-cli-multimodal-context',
    issueNumber: 11,
    title: 'Brief #11: Gemini CLI Multimodal Pipelining and High-Throughput Vector Search',
    pubDate: '2026-07-21',
    summary: 'Exploring Gemini CLI video processing, high-density vector chunking strategies, and production prompt caching.',
    takeaways: [
      'Command line syntax for streaming 1-hour video clips through Gemini API.',
      'Optimal chunk size selection for Qdrant vs pgvector.',
      'Reducing latency by 40% with pre-warmed context caches.',
    ],
    topics: ['Gemini', 'Vector Search', 'CLI'],
    relatedTutorialSlugs: ['how-to-install-and-use-gemini-cli', 'embeddings-vector-databases'],
  },
  {
    slug: 'issue-10-cursor-rules-vs-claude-code-skills',
    issueNumber: 10,
    title: 'Brief #10: Cursor Rules vs. Custom Claude Code Skills',
    pubDate: '2026-07-14',
    summary: 'A direct comparison of workspace rule definitions in Cursor versus agent skill extensions in Claude Code.',
    takeaways: [
      'Structuring repository-specific instructions without cluttering context.',
      'Creating reusable TypeScript skill handlers for shell automation.',
    ],
    topics: ['Cursor', 'Claude', 'Agent Skills'],
    relatedTutorialSlugs: ['how-to-build-custom-claude-code-skills', 'mcp-server-vscode-cursor'],
  },
];
