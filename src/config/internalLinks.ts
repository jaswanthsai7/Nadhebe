export interface InternalLinkTarget {
  keyword: string;
  url: string;
  category?: string;
}

/**
 * Single source of truth for keyword entity linking dictionary.
 * Maps high-value developer keywords to their authoritative pillar guides, partner pages, and tools.
 */
export const INTERNAL_LINK_DICTIONARY: InternalLinkTarget[] = [
  { keyword: 'Claude Code Hooks', url: '/tutorials/claude-code-hooks-guide', category: 'tutorials' },
  { keyword: 'Claude Code', url: '/tutorials/how-to-build-custom-claude-code-skills', category: 'tutorials' },
  { keyword: 'Model Context Protocol', url: '/tutorials/build-custom-mcp-server-typescript', category: 'tutorials' },
  { keyword: 'MCP Server', url: '/tutorials/build-custom-mcp-server-typescript', category: 'tutorials' },
  { keyword: 'MCP', url: '/tutorials/mcp-with-claude-desktop', category: 'tutorials' },
  { keyword: 'DeepSeek R1', url: '/tutorials/deploy-deepseek-r1-aws-vllm', category: 'tutorials' },
  { keyword: 'vLLM', url: '/tutorials/vllm-guide', category: 'tutorials' },
  { keyword: 'Gemini CLI', url: '/tutorials/how-to-install-and-use-gemini-cli', category: 'tutorials' },
  { keyword: 'Gemini Canvas', url: '/tutorials/how-to-use-gemini-canvas', category: 'tutorials' },
  { keyword: 'Gemini Notebook', url: '/tutorials/how-to-use-gemini-notebook', category: 'tutorials' },
  { keyword: 'Gemini API', url: '/tutorials/gemini-api-guide', category: 'tutorials' },
  { keyword: 'Cursor Rules', url: '/tutorials/mcp-server-vscode-cursor', category: 'tutorials' },

  // AI Starter Kit
  { keyword: 'AI Engineering Starter Kit', url: '/newsletter', category: 'newsletter' },
];
