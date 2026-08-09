// UNIFIED RESOURCES & DOCUMENT REGISTRY FOR NADHEBE

export interface DownloadableResource {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'Cheat Sheets' | 'Templates' | 'Architecture Diagrams' | 'Guides & PDFs' | 'Code Bundles' | 'Checklists' | 'Diagrams' | 'Documents';
  fileUrl: string;
  fileName: string;
  fileType: 'PDF' | 'ZIP' | 'JSON' | 'MD' | 'PNG';
  fileSize: string;
  pageCount?: string;
  badge?: 'Popular' | 'New' | 'Essential' | 'Updated';
  tags: string[];
  previewType: 'pdf-cheatsheet' | 'code-template' | 'md-checklist' | 'png-diagram' | 'pdf-guide' | 'json-schema';
}

export const RESOURCE_CATEGORIES = [
  'Cheat Sheets',
  'Templates',
  'Architecture Diagrams',
  'Guides & PDFs',
  'Code Bundles',
] as const;

export const UNIFIED_RESOURCES_REGISTRY: DownloadableResource[] = [
  {
    id: 'res-1',
    slug: 'claude-code-cli-cheatsheet',
    title: 'Claude Code CLI Command & Shortcut Cheat Sheet',
    description: 'Complete one-page reference guide covering all essential Claude Code CLI commands, keyboard shortcuts, permission flags, and usage examples.',
    category: 'Cheat Sheets',
    fileUrl: '/resources/claude-code-cli-cheatsheet.pdf',
    fileName: 'claude-code-cli-cheatsheet.pdf',
    fileType: 'PDF',
    fileSize: '1.2 MB',
    pageCount: '24 Pages',
    badge: 'Popular',
    tags: ['claude-code', 'cli', 'cheatsheet'],
    previewType: 'pdf-cheatsheet',
  },
  {
    id: 'res-2',
    slug: 'mcp-server-typescript-template',
    title: 'Production Model Context Protocol (MCP) Starter Template',
    description: 'Ready-to-use TypeScript repository template with stdio and SSE transport mechanisms, tooling, and examples.',
    category: 'Templates',
    fileUrl: '/resources/mcp-server-typescript-template.zip',
    fileName: 'mcp-server-typescript-template.zip',
    fileType: 'ZIP',
    fileSize: '2.4 MB',
    badge: 'Essential',
    tags: ['mcp', 'typescript', 'template'],
    previewType: 'code-template',
  },
  {
    id: 'res-3',
    slug: 'llm-system-prompt-security-checklist',
    title: 'LLM System Risk & Guardrail Audit Checklist',
    description: 'Comprehensive 25-point security & formatting rubric for evaluating LLM system prompts against best practices.',
    category: 'Guides & PDFs',
    fileUrl: '/resources/llm-system-prompt-security-checklist.md',
    fileName: 'llm-system-prompt-security-checklist.md',
    fileType: 'MD',
    fileSize: '34 KB',
    badge: 'New',
    tags: ['prompts', 'security', 'guardrails'],
    previewType: 'md-checklist',
  },
  {
    id: 'res-4',
    slug: 'agentic-rag-workflow-architecture-diagram',
    title: 'Multi-Agent RAG & Router Architecture Reference Diagram',
    description: 'High-resolution vector architecture map illustrating stateful multi-agent workflows, vector retrieval, and data flow.',
    category: 'Architecture Diagrams',
    fileUrl: '/resources/agentic-rag-workflow-architecture-diagram.png',
    fileName: 'agentic-rag-workflow-architecture-diagram.png',
    fileType: 'PNG',
    fileSize: '3.8 MB',
    badge: 'Popular',
    tags: ['rag', 'architecture', 'diagram'],
    previewType: 'png-diagram',
  },
  {
    id: 'res-5',
    slug: 'deepseek-vllm-deployment-blueprint',
    title: 'DeepSeek-R1 Local & Cloud vLLM Deployment Guide PDF',
    description: 'Step-by-step production blueprint covering GPU memory estimation, KV cache quantization, and vLLM deployment.',
    category: 'Guides & PDFs',
    fileUrl: '/resources/deepseek-vllm-deployment-blueprint.pdf',
    fileName: 'deepseek-vllm-deployment-blueprint.pdf',
    fileType: 'PDF',
    fileSize: '4.1 MB',
    pageCount: '36 Pages',
    badge: 'Updated',
    tags: ['deepseek', 'vllm', 'gpu'],
    previewType: 'pdf-guide',
  },
  {
    id: 'res-6',
    slug: 'structured-json-prompt-schema-bundle',
    title: 'Structured Output JSON Schema & Pydantic Templates',
    description: 'Collection of pre-validated JSON Schemas and Pydantic data models for guaranteed structured outputs.',
    category: 'Templates',
    fileUrl: '/resources/structured-json-prompt-schema-bundle.json',
    fileName: 'structured-json-prompt-schema-bundle.json',
    fileType: 'JSON',
    fileSize: '112 KB',
    badge: 'Essential',
    tags: ['json-schema', 'pydantic', 'openai'],
    previewType: 'json-schema',
  },
];
