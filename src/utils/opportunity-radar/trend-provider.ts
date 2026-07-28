import type { TrendTopic } from '@/types/opportunity-radar';

export const CURATED_TRENDS: TrendTopic[] = [
  // --- AI & DEVELOPER TOOLS ---
  {
    id: 'claude-code-mcp',
    topic: 'Claude Code MCP Servers',
    aliases: ['claude code mcp', 'mcp servers claude', 'model context protocol claude', 'claude code skills'],
    category: 'AI Developer Tools',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    sourceUrl: 'https://nadhebe.com/tutorials/how-to-build-custom-claude-code-skills/',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'How to connect MCP servers to Claude Code CLI',
      'Best MCP servers for developer workflows',
      'Building custom MCP plugins for Claude Code'
    ]
  },
  {
    id: 'gemini-3-6-flash',
    topic: 'Gemini 3.6 Flash API & Canvas',
    aliases: ['gemini 3.6 flash', 'gemini 3.6 canvas', 'google gemini 3.6', 'gemini api javascript node'],
    category: 'AI Models & APIs',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    sourceUrl: 'https://nadhebe.com/tutorials/how-to-use-gemini-canvas/',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'Gemini 3.6 Flash benchmarks and latency',
      'How to use Gemini Canvas for coding',
      'Gemini API Node.js integration tutorial'
    ]
  },
  {
    id: 'deepseek-r1-local-vllm',
    topic: 'Local DeepSeek R1 Deployment with vLLM',
    aliases: ['deepseek r1 vllm', 'deepseek r1 local setup', 'vllm gpu oom fix', 'deepseek r1 ollama'],
    category: 'Local AI & LLMs',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'How to deploy DeepSeek R1 locally using vLLM',
      'Fixing vLLM GPU out of memory errors for DeepSeek R1',
      'DeepSeek R1 vs Claude 3.5 Sonnet local benchmark'
    ]
  },
  {
    id: 'google-flow-storyboard-studio',
    topic: 'Google Flow Storyboard Studio',
    aliases: ['google flow storyboard', 'google flow ai video', 'flow studio ai', 'google flow video generator'],
    category: 'AI Video & Visual Tools',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    sourceUrl: 'https://nadhebe.com/tutorials/building-pre-production-storyboards-google-flow/',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'Building pre-production storyboards with Google Flow',
      'Google Flow AI video generation guide',
      'Google Flow vs Runway Gen-3 comparison'
    ]
  },
  {
    id: 'kimi-k3-3d-modeling',
    topic: 'Kimi K3 3D Spatial Generation',
    aliases: ['kimi k3 3d', 'kimi k3 spatial ai', 'kimi k3 game development', 'kimi k3 mesh generation'],
    category: '3D & Spatial Computing',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'Kimi K3 3D modeling workflow for game developers',
      'Exporting Kimi K3 3D assets to Unreal Engine 5',
      'Kimi K3 spatial mesh generation tutorial'
    ]
  },
  {
    id: 'agentic-youtube-automation',
    topic: 'Multi-Agent YouTube Automation Workflows',
    aliases: ['youtube automation agent', 'ai youtube automation', 'multi agent video generator', 'python youtube bot'],
    category: 'Autonomous Agents',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'Setting up an open-source YouTube automation agent',
      'Python script for multi-agent video rendering',
      'Automating YouTube Short uploads with AI agents'
    ]
  },
  {
    id: 'instatic-cms-visual-editor',
    topic: 'Instatic CMS Visual Importer',
    aliases: ['instatic cms', 'instatic html importer', 'instatic local vps', 'instatic visual cms'],
    category: 'Web Development & CMS',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'How to import static HTML sites into Instatic CMS',
      'Deploying Instatic Docker on VPS',
      'Instatic enterprise editorial governance guide'
    ]
  },
  {
    id: 'claude-desktop-custom-tools',
    topic: 'Claude Desktop CLI & Extensions',
    aliases: ['claude desktop cli', 'claude desktop installation', 'claude code cheat sheet', 'claude desktop windows'],
    category: 'AI Developer Tools',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'Installing Claude Code CLI on Windows',
      'Claude Code cheat sheet commands and shortcuts',
      'Claude Desktop vs Claude Code CLI developer comparison'
    ]
  },
  
  // --- WEB PERFORMANCE & SEO ---
  {
    id: 'nextjs-15-server-actions',
    topic: 'Next.js 15 Server Actions & PPR',
    aliases: ['next.js 15', 'nextjs 15 ppr', 'partial prerendering nextjs', 'nextjs server actions best practices'],
    category: 'Web Frameworks',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'Next.js 15 Partial Prerendering setup guide',
      'Securing Next.js Server Actions in production',
      'Next.js 15 App Router performance optimization'
    ]
  },
  {
    id: 'astro-5-server-islands',
    topic: 'Astro 5 Server Islands & Dynamic Hybrid Rendering',
    aliases: ['astro 5', 'astro server islands', 'astro hybrid static', 'astro pagefind search'],
    category: 'Web Frameworks',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'How to use Astro 5 Server Islands for dynamic widgets',
      'Building ultra-fast documentation sites with Astro 5',
      'Astro 5 vs Next.js 15 static site performance'
    ]
  },
  {
    id: 'programmatic-seo-indexnow',
    topic: 'Programmatic SEO & IndexNow Instant Submission',
    aliases: ['programmatic seo', 'indexnow api', 'bing indexnow', 'auto sitemap submission'],
    category: 'SEO & Webmaster',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'Automating IndexNow URL submissions for programmatic SEO',
      'Building scalable programmatic SEO sites with Astro',
      'Preventing Google indexing delay with IndexNow'
    ]
  },
  {
    id: 'llms-txt-standard',
    topic: 'LLMs.txt Standard for AI Search Engine Crawlers',
    aliases: ['llms.txt', 'llms-full.txt', 'ai search optimization', 'perplexity search seo'],
    category: 'SEO & Webmaster',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'How to generate llms.txt for AI crawlers',
      'Optimizing content for Perplexity AI and ChatGPT Search',
      'LLMs.txt specification and best practices'
    ]
  },

  // --- CREATOR & DESIGN TOOLS ---
  {
    id: 'davinci-resolve-vertical-render',
    topic: 'DaVinci Resolve 9:16 Vertical Video Workflows',
    aliases: ['davinci resolve 1080x1350', 'davinci resolve 9:16', 'davinci resolve shorts render', 'davinci resolve aspect ratio'],
    category: 'Social & Creator',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'Best DaVinci Resolve render settings for 1080×1350 and 9:16 Shorts',
      'Auto-cropping 16:9 video to 9:16 vertical in DaVinci Resolve',
      'DaVinci Resolve GPU export presets for TikTok and Reels'
    ]
  },
  {
    id: 'midjourney-v7-prompts',
    topic: 'Midjourney v7 Web UI & Prompting Techniques',
    aliases: ['midjourney v7', 'midjourney web ui', 'midjourney aspect ratio', 'midjourney parameter cheat sheet'],
    category: 'Design & Visual AI',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'Midjourney v7 prompt engineering parameter guide',
      'Generating consistent characters in Midjourney v7',
      'Midjourney v7 aspect ratio parameters --ar 16:9 vs 9:16'
    ]
  },
  {
    id: 'tailwindcss-v4-theme',
    topic: 'Tailwind CSS v4 CSS-First Configuration',
    aliases: ['tailwindcss v4', 'tailwind v4 theme', 'tailwind css 4 migrate', 'tailwind css variable theme'],
    category: 'CSS & Frontend',
    sourceType: 'curated',
    source: 'Nadhebe Developer Radar',
    observedAt: '2026-07-28',
    methodology: 'Curated AI & Developer Ecosystem Taxonomy',
    relatedQueries: [
      'Migrating from Tailwind CSS v3 to v4',
      'Tailwind v4 CSS @theme configuration guide',
      'Building custom glassmorphism design systems in Tailwind v4'
    ]
  }
];

export function getCuratedTrends(): TrendTopic[] {
  return CURATED_TRENDS;
}
