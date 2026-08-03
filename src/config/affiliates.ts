export interface AffiliateProgram {
  id: string;
  name: string;
  category: string;
  badge: string;
  whyRecommend: string;
  trustSignal: string;
  pitch: string;
  pricingSummary: string;
  features: string[];
  pros: string[];
  cons: string[];
  url: string;
  disclosure: string;
  active: boolean;
  targetTopics: string[];
  buttonLabel?: string;
  faq?: { question: string; answer: string }[];
}

/**
 * Lean, High-Intent Affiliate Registry (5 Core Launch Partners)
 * Uses real partner referral URLs and explicit frontmatter control.
 */
export const AFFILIATE_PROGRAMS: Record<string, AffiliateProgram> = {
  runpod: {
    id: 'runpod',
    name: 'RunPod',
    category: 'Cloud GPU & Inference',
    badge: 'Top Pick for Inference',
    whyRecommend: 'We use RunPod for vLLM and DeepSeek deployment guides because it provides instant, ready-to-use GPU pods without hyperscaler setup overhead or long wait times.',
    trustSignal: '✓ Tested in this guide with vLLM & DeepSeek',
    pitch: 'Rent cloud GPUs or deploy serverless vLLM inference endpoints at a fraction of hyperscaler costs.',
    pricingSummary: 'Starting from $0.22/hr',
    features: [
      'Secure Cloud & Community Cloud GPU instances',
      'One-click Docker templates for vLLM & DeepSeek',
      'Instant global serverless GPU endpoints',
      'On-demand H100, A100, and L40S availability',
    ],
    pros: [
      'Significantly cheaper than AWS EC2 GPU instances',
      'Fast container boots (< 10 seconds for warm pods)',
      'Built-in WebTerminal and Jupyter Lab',
    ],
    cons: [
      'Spot instances can be interrupted on Community Cloud',
      'Manual setup required for custom auto-scaling',
    ],
    url: 'https://runpod.io?ref=2zzrkr9x',
    disclosure: 'Nadhebe is reader-supported. We may earn a commission if you sign up via our partner link.',
    active: true,
    targetTopics: ['vllm', 'runpod', 'gpu', 'deepseek', 'cuda', 'inference', 'model-deployment'],
    buttonLabel: 'Deploy on RunPod',
    faq: [
      {
        question: 'Why choose RunPod over AWS or GCP for AI inference?',
        answer: 'RunPod provides pre-configured Docker templates for vLLM and DeepSeek with zero quota request wait times and up to 70% lower hourly GPU rates.',
      },
      {
        question: 'Does RunPod support serverless auto-scaling?',
        answer: 'Yes, RunPod Serverless allows you to deploy custom container endpoints that scale to zero when idle.',
      },
    ],
  },
  elevenlabs: {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    category: 'AI Voice & Audio',
    badge: 'Best Voice Quality',
    whyRecommend: 'Produces the highest quality emotional text-to-speech with ultra-low latency APIs for voice automation workflows.',
    trustSignal: '✓ Recommended for voice AI applications',
    pitch: 'Industry-leading AI voice generator for hyper-realistic text-to-speech, voice cloning, and audio localization.',
    pricingSummary: 'Free tier · Paid from $5/mo',
    features: [
      'Human-like emotional expression and cadence',
      'Custom voice cloning from 1-minute audio clips',
      'Streaming API with sub-300ms latency',
      'Multi-lingual support across 29 languages',
    ],
    pros: [
      'Indistinguishable from professional human voice actors',
      'Powerful API for dynamic application integration',
      'Robust dubbing and translation tools',
    ],
    cons: [
      'Character quota limits on lower pricing tiers',
      'Strict voice cloning verification requirements',
    ],
    url: 'https://elevenlabs.io',
    disclosure: 'Nadhebe is reader-supported. We may earn a commission if you subscribe via our partner link.',
    active: true,
    targetTopics: ['elevenlabs', 'voice-ai', 'tts', 'audio-gen', 'synthesia'],
    buttonLabel: 'Try ElevenLabs Free',
    faq: [
      {
        question: 'Can I use ElevenLabs voice output commercially?',
        answer: 'Yes, commercial license rights are included with all paid tiers.',
      },
    ],
  },
  semrush: {
    id: 'semrush',
    name: 'Semrush',
    category: 'SEO & Content Intelligence',
    badge: 'Industry Standard',
    whyRecommend: 'Essential suite for tracking topical authority keywords, backlink profiles, and SERP competitive analysis for developer publications.',
    trustSignal: '✓ Recommended for technical SEO audits',
    pitch: 'All-in-one suite for keyword research, backlink analysis, topical authority mapping, and rank tracking.',
    pricingSummary: '7-day trial · Pro from $139.95/mo',
    features: [
      '25B+ keyword database with precise search volume',
      'Topical cluster & competitor content gap maps',
      'Site audit engine with technical SEO checklists',
      'AI-assisted SEO writing assistant',
    ],
    pros: [
      'Most comprehensive keyword & backlink database',
      'Actionable recommendations for topical authority',
      'Accurate intent and SERP feature tracking',
    ],
    cons: [
      'Higher price point for solo developers',
      'Dense interface with many sub-tools',
    ],
    url: 'https://www.semrush.com',
    disclosure: 'Nadhebe is reader-supported. We may earn a commission if you start a trial via our partner link.',
    active: true,
    targetTopics: ['semrush', 'seo', 'keyword-research', 'backlinks', 'topical-authority'],
    buttonLabel: 'Start Semrush Free Trial',
    faq: [
      {
        question: 'Is Semrush worth it for independent AI publications?',
        answer: 'Semrush is the gold standard for discovering underserved developer search queries and mapping topical clusters.',
      },
    ],
  },
  synthesia: {
    id: 'synthesia',
    name: 'Synthesia',
    category: 'AI Video Generation',
    badge: 'Best for Video Docs',
    whyRecommend: 'Transform written technical guides and product updates into realistic AI video walkthroughs without camera equipment.',
    trustSignal: '✓ Recommended for video documentation',
    pitch: 'Create professional AI avatar videos from text scripts in over 140 languages.',
    pricingSummary: 'Free plan · Starter from $22/mo',
    features: [
      '230+ hyper-realistic studio AI avatars',
      '140+ supported languages and accents',
      'Screen recorder & video editing interface',
      'Custom avatar creation for brand identity',
    ],
    pros: [
      'Saves hours of filming and editing time',
      'Easy video updates when documentation changes',
      'Clean Web browser interface',
    ],
    cons: [
      'Enterprise avatars require custom pricing',
      'Requires script refinement for natural pacing',
    ],
    url: 'https://www.synthesia.io',
    disclosure: 'Nadhebe is reader-supported. We may earn a commission if you subscribe via our partner link.',
    active: true,
    targetTopics: ['synthesia', 'ai-video', 'video-generation', 'video-docs'],
    buttonLabel: 'Create Video with Synthesia',
    faq: [
      {
        question: 'How fast can Synthesia generate an AI video?',
        answer: 'Most short video scripts render in under 5 minutes.',
      },
    ],
  },
  descript: {
    id: 'descript',
    name: 'Descript',
    category: 'AI Audio & Video Editing',
    badge: 'Best for Content Creators',
    whyRecommend: 'Edit podcast and YouTube video transcripts like a doc with AI filler word removal and instant studio sound enhancement.',
    trustSignal: '✓ Recommended for YouTube repurposing',
    pitch: 'All-in-one AI audio and video editor that works like a text document.',
    pricingSummary: 'Free plan · Hobbyist from $12/mo',
    features: [
      'Text-based transcript video & audio editing',
      'One-click Studio Sound noise cancellation',
      'Automatic filler word removal ("um", "uh")',
      'AI Overdub voice replacement for script edits',
    ],
    pros: [
      'Dramatically accelerates video editing workflows',
      'Studio Sound makes budget mics sound professional',
      'Seamless YouTube and transcript export',
    ],
    cons: [
      'Requires desktop app download for best performance',
      'Transcription accuracy varies with heavy accents',
    ],
    url: 'https://www.descript.com',
    disclosure: 'Nadhebe is reader-supported. We may earn a commission if you subscribe via our partner link.',
    active: true,
    targetTopics: ['descript', 'video-editing', 'audio-editing', 'youtube-automation'],
    buttonLabel: 'Try Descript Free',
    faq: [
      {
        question: 'Can Descript remove background noise automatically?',
        answer: 'Yes, Studio Sound uses AI to eliminate room echo and background noise instantly.',
      },
    ],
  },
};

/**
 * Builds a UTM-tagged partner URL for tracking clicks accurately in GA4 and partner dashboards.
 */
export function buildUtmUrl(
  baseUrl: string,
  campaignSlug: string = 'nadhebe',
  medium: string = 'affiliate',
  source: string = 'nadhebe'
): string {
  if (!baseUrl) return '#';
  try {
    const u = new URL(baseUrl);
    u.searchParams.set('utm_source', source);
    u.searchParams.set('utm_medium', medium);
    u.searchParams.set('utm_campaign', campaignSlug.replace(/^\/|\/$/g, '') || 'general');
    return u.toString();
  } catch {
    const sep = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${sep}utm_source=${source}&utm_medium=${medium}&utm_campaign=${encodeURIComponent(
      campaignSlug
    )}`;
  }
}

/**
 * Retrieves a specific affiliate program by ID.
 */
export function getAffiliateById(id: string): AffiliateProgram | null {
  return AFFILIATE_PROGRAMS[id.toLowerCase()] || null;
}

/**
 * Returns all active affiliate programs as an array.
 */
export function getAllActiveAffiliates(): AffiliateProgram[] {
  return Object.values(AFFILIATE_PROGRAMS).filter((p) => p.active);
}
