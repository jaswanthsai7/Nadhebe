export interface AffiliateProgram {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'cloud-gpu' | 'ai-audio' | 'ai-video' | 'seo-analytics' | 'developer-tools' | 'ai-models';
  qualitativeBadge: string;
  trustSignal: string;
  whyRecommend: string;
  pricingSummary: string;
  affiliateUrl: string;
  pros: string[];
  cons: string[];
}

export function buildUtmUrl(baseUrl: string, source = 'nadhebe', medium = 'affiliate_card', campaign = 'article'): string {
  if (!baseUrl) return '';
  try {
    const urlObj = new URL(baseUrl);
    if (!urlObj.searchParams.has('utm_source')) urlObj.searchParams.set('utm_source', source);
    if (!urlObj.searchParams.has('utm_medium')) urlObj.searchParams.set('utm_medium', medium);
    if (!urlObj.searchParams.has('utm_campaign')) urlObj.searchParams.set('utm_campaign', campaign);
    return urlObj.toString();
  } catch (_) {
    return baseUrl;
  }
}

export const AFFILIATE_PROGRAMS: Record<string, AffiliateProgram> = {
  runpod: {
    id: 'runpod',
    name: 'RunPod',
    slug: 'runpod',
    description: 'Cloud GPU platform for AI model training, fine-tuning, and low-latency serverless vLLM inference.',
    category: 'cloud-gpu',
    qualitativeBadge: 'Top Pick for Inference',
    trustSignal: '✓ Tested in this guide with vLLM & DeepSeek R1',
    whyRecommend: 'We use RunPod because it provides instant-launch GPU instances (H100, A100, RTX 4090) for vLLM and Ollama deployments without upfront commitment or long setup times.',
    pricingSummary: 'From $0.22/hr (Community Cloud) to $2.89/hr (Secure Cloud H100)',
    affiliateUrl: 'https://runpod.io?ref=2zzrkr9x',
    pros: [
      'Instant pod creation with pre-built PyTorch, CUDA, and vLLM templates',
      'Serverless endpoint auto-scaling down to 0 replicas',
      'Persistent network volumes across multiple pod restarts',
    ],
    cons: [
      'Spot instances can terminate when GPU demand surges',
      'Network transfer speeds vary depending on region choice',
    ],
  },
  'vast-ai': {
    id: 'vast-ai',
    name: 'Vast.ai',
    slug: 'vast-ai',
    description: 'Peer-to-peer GPU marketplace for ultra low-cost AI model training and batch inference.',
    category: 'cloud-gpu',
    qualitativeBadge: 'Lowest Cost GPU Rental',
    trustSignal: '✓ Verified for batch LLM benchmarks',
    whyRecommend: 'Vast.ai offers the lowest price-per-flop by aggregating unutilized GPU capacity worldwide, ideal for background fine-tuning jobs.',
    pricingSummary: 'From $0.12/hr (RTX 3090) to $1.20/hr (A100 80GB)',
    affiliateUrl: 'https://vast.ai',
    pros: ['Unbeatable hourly pricing for multi-GPU nodes', 'Flexible Docker image configuration', 'P2P marketplace transparency'],
    cons: ['Variable host reliability across unverified providers', 'Requires manual bandwidth testing'],
  },
  lambda: {
    id: 'lambda',
    name: 'Lambda Labs',
    slug: 'lambda',
    description: 'Enterprise GPU cloud engineered specifically for deep learning clusters and LLM training.',
    category: 'cloud-gpu',
    qualitativeBadge: 'Enterprise Deep Learning Cloud',
    trustSignal: '✓ Industry standard for AI research labs',
    whyRecommend: 'Lambda Labs delivers dedicated, high-speed NVLink GPU nodes with guaranteed uptime and zero preemption for heavy fine-tuning.',
    pricingSummary: 'From $0.75/hr (A100) to $2.49/hr (H100 PCIe)',
    affiliateUrl: 'https://lambdalabs.com',
    pros: ['100% dedicated non-preemptible GPU instances', 'Pre-configured NVIDIA CUDA driver stack', 'Fast inter-node bandwidth'],
    cons: ['High demand often leads to limited instance availability', 'Fewer global region options'],
  },
  modal: {
    id: 'modal',
    name: 'Modal',
    slug: 'modal',
    description: 'Serverless Python infrastructure for running AI models, batch jobs, and webhooks in the cloud.',
    category: 'developer-tools',
    qualitativeBadge: 'Best Serverless Python Platform',
    trustSignal: '✓ Native Python code-to-cloud execution',
    whyRecommend: 'Modal allows AI engineers to turn local Python functions into distributed cloud GPU workers in seconds using simple decorators.',
    pricingSummary: 'Pay-per-second compute with $30/mo free tier credits',
    affiliateUrl: 'https://modal.com',
    pros: ['Sub-second container cold starts', 'Native Python container definitions without Dockerfiles', 'Built-in secret management'],
    cons: ['Requires Python-centric architecture', 'Custom runtime limits on execution duration'],
  },
  replicate: {
    id: 'replicate',
    name: 'Replicate',
    slug: 'replicate',
    description: 'Run open-source AI models with a single line of code via scalable serverless REST APIs.',
    category: 'ai-models',
    qualitativeBadge: 'Easiest Model API Platform',
    trustSignal: '✓ One-line API integration for open models',
    whyRecommend: 'Replicate hosts thousands of open-source models (Flux, Llama 3, SDXL) behind clean HTTP APIs so you do not need to manage GPUs.',
    pricingSummary: 'Pay per prediction second ($0.000225/sec for T4 to $0.0014/sec for A100)',
    affiliateUrl: 'https://replicate.com',
    pros: ['Massive library of community-tuned open-source models', 'Zero GPU infrastructure maintenance', 'Automatic REST API generation'],
    cons: ['Per-second API pricing can get expensive at sustained high volume', 'Cold start latency on rare models'],
  },
  cloudflare: {
    id: 'cloudflare',
    name: 'Cloudflare Workers AI',
    slug: 'cloudflare',
    description: 'Global edge network for running serverless AI inference, vector databases (Vectorize), and KV storage.',
    category: 'developer-tools',
    qualitativeBadge: 'Best Edge AI Infrastructure',
    trustSignal: '✓ Sub-50ms global edge latency',
    whyRecommend: 'Cloudflare Workers AI runs LLMs and embedding models directly on Cloudflare edge locations worldwide for minimal round-trip latency.',
    pricingSummary: 'Free tier includes 10,000 neurons/day; paid plans from $5/mo',
    affiliateUrl: 'https://www.cloudflare.com',
    pros: ['Ultra-low latency global distribution', 'Seamless integration with Workers, R2, and Vectorize', 'Generous free daily quota'],
    cons: ['Model context windows are constrained compared to dedicated GPUs', 'Limited to curated edge models'],
  },
  vercel: {
    id: 'vercel',
    name: 'Vercel',
    slug: 'vercel',
    description: 'Frontend cloud platform built for Next.js, Astro, serverless AI streaming, and AI SDK integration.',
    category: 'developer-tools',
    qualitativeBadge: 'Premier Frontend & AI Web Cloud',
    trustSignal: '✓ Powers modern AI web apps & Vercel AI SDK',
    whyRecommend: 'Vercel provides seamless deployment for modern web frameworks with first-class streaming support via the Vercel AI SDK.',
    pricingSummary: 'Free Hobby tier; Pro tier at $20/user/month',
    affiliateUrl: 'https://vercel.com',
    pros: ['Instant Git deployments with automatic preview URLs', 'Vercel AI SDK for UI streaming', 'Global Edge Network'],
    cons: ['Bandwidth and serverless execution costs can scale quickly', 'Vendor lock-in on custom primitives'],
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic Claude',
    slug: 'anthropic',
    description: 'State-of-the-art AI model family (Claude 3.5 Sonnet, Claude 3 Opus) featuring 200k context windows and coding mastery.',
    category: 'ai-models',
    qualitativeBadge: 'Top AI Model for Autonomous Coding',
    trustSignal: '✓ Benchmark leader for SWE-bench & Claude Code',
    whyRecommend: 'Claude 3.5 Sonnet is our primary recommendation for complex system architecture, refactoring, and agentic coding workflows.',
    pricingSummary: '$3.00 / M token input; $15.00 / M token output (Claude 3.5 Sonnet)',
    affiliateUrl: 'https://www.anthropic.com',
    pros: ['Unmatched reasoning and code generation quality', '200,000 token context window', 'Prompt caching reduces costs by up to 90%'],
    cons: ['Rate limits during peak usage on API tiers', 'No official affiliate program currently'],
  },
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    slug: 'openrouter',
    description: 'Unified API routing platform providing access to hundreds of proprietary and open-source LLMs.',
    category: 'ai-models',
    qualitativeBadge: 'Best Unified Model Gateway',
    trustSignal: '✓ Universal OpenAI-compatible API endpoint',
    whyRecommend: 'OpenRouter lets you query Claude, GPT-4o, DeepSeek, and Llama 3 through a single API key with automatic fallback routing.',
    pricingSummary: 'Pay-as-you-go per token with zero markup on key providers',
    affiliateUrl: 'https://openrouter.ai',
    pros: ['One API key for Anthropic, OpenAI, Meta, and Google models', 'Automatic failover and fallback routing', 'Detailed cost tracking per request'],
    cons: ['Aggregated rate limits across shared infrastructure', 'Requires monitoring provider status'],
  },
  elevenlabs: {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    description: 'AI voice generator and speech synthesis platform for realistic voiceovers, voice cloning, and audio content.',
    category: 'ai-audio',
    qualitativeBadge: 'Industry Standard for Audio AI',
    trustSignal: '✓ Used across Nadhebe YouTube production',
    whyRecommend: 'ElevenLabs produces human-grade voice synthesis with precise emotion, cadence control, and zero robotic artifacting.',
    pricingSummary: 'Free tier available; Paid plans start at $5/month',
    affiliateUrl: 'https://try.elevenlabs.io/596tjnxfww6z',
    pros: ['Ultra-realistic emotional inflection and natural pacing', 'Instant voice cloning with 1 minute of reference audio', 'Multi-language voice translation'],
    cons: ['Character usage limits can deplete quickly on video exports', 'Requires strict attribution on free tiers'],
  },
  semrush: {
    id: 'semrush',
    name: 'Semrush',
    slug: 'semrush',
    description: 'SEO, competitor analysis, keyword research, and rank tracking suite for content publications.',
    category: 'seo-analytics',
    qualitativeBadge: 'Best Enterprise SEO Suite',
    trustSignal: '✓ Essential for programmatic topic cluster research',
    whyRecommend: 'Semrush delivers accurate search volume, intent categorization, and backlink data required to scale developer content hubs.',
    pricingSummary: 'Pro plan starts at $139.95/month',
    affiliateUrl: 'https://semrush.com',
    pros: ['Database of over 25 billion keywords', 'Comprehensive backlink and competitor content gap analysis', 'Automated position tracking'],
    cons: ['Premium pricing tier for independent creators', 'Steep learning curve for novice marketers'],
  },
  descript: {
    id: 'descript',
    name: 'Descript',
    slug: 'descript',
    description: 'All-in-one text-based video and podcast editor with automatic transcription and AI Studio Sound.',
    category: 'ai-video',
    qualitativeBadge: 'Best Text-Based Video Editor',
    trustSignal: '✓ Speeds up developer tutorial video editing',
    whyRecommend: 'Descript allows technical creators to edit video by editing text transcripts, removing filler words instantly.',
    pricingSummary: 'Free tier available; Creator plan at $12/user/month',
    affiliateUrl: 'https://descript.com',
    pros: ['Edit video clips by editing text transcriptions', 'AI Studio Sound removes room noise automatically', 'Eye contact correction effect'],
    cons: ['Export processing can slow down on longer 4K videos', 'Timeline multitrack editing has learning curve'],
  },
  synthesia: {
    id: 'synthesia',
    name: 'Synthesia',
    slug: 'synthesia',
    description: 'AI video generator for creating professional avatar-based presentation and tutorial videos from text.',
    category: 'ai-video',
    qualitativeBadge: 'Top AI Video Generator',
    trustSignal: '✓ Ideal for rapid multilingual video documentation',
    whyRecommend: 'Synthesia turns text scripts into video tutorials using studio-quality AI avatars in over 140 languages.',
    pricingSummary: 'Starter plan at $18/month',
    affiliateUrl: 'https://synthesia.io',
    pros: ['140+ AI human avatars and custom avatar creation', 'Instant script-to-video rendering without cameras', 'Multi-language voice synchronization'],
    cons: ['Best for presentation videos rather than raw code captures', 'Avatar movement can feel structured'],
  },
  cursor: {
    id: 'cursor',
    name: 'Cursor Editor',
    slug: 'cursor',
    description: 'AI-first code editor built on VS Code with native codebase indexing, multi-file editing, and Claude 3.5 integration.',
    category: 'developer-tools',
    qualitativeBadge: 'Best AI Code Editor',
    trustSignal: '✓ Primary IDE for Nadhebe engineering workflow',
    whyRecommend: 'Cursor indexes your entire repository to deliver codebase-aware edits, prompt terminal commands, and apply instant multi-file diffs.',
    pricingSummary: 'Free tier available; Pro plan at $20/month',
    affiliateUrl: 'https://cursor.com',
    pros: ['Deep codebase embedding indexing for context-aware edits', 'Native Cmd+K inline edit and terminal prompt execution', 'Supports Claude 3.5 Sonnet and GPT-4o'],
    cons: ['Requires Pro subscription for heavy model usage', 'No public affiliate program currently'],
  },
  digitalocean: {
    id: 'digitalocean',
    name: 'DigitalOcean',
    slug: 'digitalocean',
    description: 'Developer-friendly cloud platform for deploying virtual private servers (Droplets), Kubernetes, and Managed Databases.',
    category: 'developer-tools',
    qualitativeBadge: 'Best Cloud VPS for Developers',
    trustSignal: '✓ Reliable VPS host for self-hosted apps',
    whyRecommend: 'DigitalOcean provides straightforward cloud VPS instances with predictable monthly pricing, ideal for self-hosting tools and CMS instances.',
    pricingSummary: 'Droplets start at $4/month with $200 free credit link',
    affiliateUrl: 'https://www.digitalocean.com',
    pros: ['Simple, transparent pricing with no hidden charges', 'One-click Docker and Ubuntu image deployments', 'Managed PostgreSQL and Redis databases'],
    cons: ['Fewer specialized GPU instance types compared to RunPod', 'Manual scaling configuration on low-tier droplets'],
  },
  vultr: {
    id: 'vultr',
    name: 'Vultr',
    slug: 'vultr',
    description: 'High-performance cloud compute and cloud GPU platform with global datacenters across 32 locations.',
    category: 'cloud-gpu',
    qualitativeBadge: 'Global Cloud Compute & GPU Provider',
    trustSignal: '✓ Low latency global compute deployment',
    whyRecommend: 'Vultr offers worldwide high-frequency cloud compute and NVIDIA HGX H100 GPU instances for global infrastructure.',
    pricingSummary: 'Cloud Compute from $2.50/month; Cloud GPUs from $0.60/hr',
    affiliateUrl: 'https://www.vultr.com',
    pros: ['32 global datacenter locations', 'NVIDIA A100 and H100 Cloud GPU instances', 'Bare metal server options'],
    cons: ['Bandwidth overage fees require monitoring', 'Control panel UI has multiple sub-menus'],
  },
};

export function getAffiliateById(id: string): AffiliateProgram | null {
  return AFFILIATE_PROGRAMS[id] || null;
}

export function getAllAffiliates(): AffiliateProgram[] {
  return Object.values(AFFILIATE_PROGRAMS);
}

export function getAllActiveAffiliates(): AffiliateProgram[] {
  return Object.values(AFFILIATE_PROGRAMS);
}
