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

  // Partner Infrastructure & AI Tools (16 Partners)
  { keyword: 'RunPod', url: '/partners/runpod', category: 'partners' },
  { keyword: 'Vast.ai', url: '/partners/vast-ai', category: 'partners' },
  { keyword: 'Lambda Labs', url: '/partners/lambda', category: 'partners' },
  { keyword: 'Modal', url: '/partners/modal', category: 'partners' },
  { keyword: 'Replicate', url: '/partners/replicate', category: 'partners' },
  { keyword: 'Cloudflare Workers AI', url: '/partners/cloudflare', category: 'partners' },
  { keyword: 'Cloudflare', url: '/partners/cloudflare', category: 'partners' },
  { keyword: 'Vercel', url: '/partners/vercel', category: 'partners' },
  { keyword: 'Anthropic', url: '/partners/anthropic', category: 'partners' },
  { keyword: 'Claude 3.5 Sonnet', url: '/partners/anthropic', category: 'partners' },
  { keyword: 'OpenRouter', url: '/partners/openrouter', category: 'partners' },
  { keyword: 'ElevenLabs', url: '/partners/elevenlabs', category: 'partners' },
  { keyword: 'Semrush', url: '/partners/semrush', category: 'partners' },
  { keyword: 'Descript', url: '/partners/descript', category: 'partners' },
  { keyword: 'Synthesia', url: '/partners/synthesia', category: 'partners' },
  { keyword: 'Cursor', url: '/partners/cursor', category: 'partners' },
  { keyword: 'DigitalOcean', url: '/partners/digitalocean', category: 'partners' },
  { keyword: 'Vultr', url: '/partners/vultr', category: 'partners' },

  { keyword: 'AI Engineering Starter Kit', url: '/newsletter', category: 'newsletter' },
];
