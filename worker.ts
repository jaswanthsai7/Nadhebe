export interface Env {
  ASSETS: Fetcher;
  AI: {
    run: (model: string, input: any) => Promise<any>;
  };
}

// Curated Trends for Deterministic Opportunity Radar Matching
const CURATED_TRENDS = [
  {
    id: 'claude-code-mcp',
    topic: 'Claude Code MCP Servers',
    aliases: ['claude code mcp', 'mcp servers claude', 'model context protocol claude', 'claude code skills'],
    category: 'AI Developer Tools',
    source: 'Nadhebe Developer Radar',
    relatedQueries: [
      'How to Connect MCP Servers to Claude Code CLI',
      'Best MCP servers for developer workflows',
      'Building custom MCP plugins for Claude Code'
    ]
  },
  {
    id: 'gemini-3-6-flash',
    topic: 'Gemini 3.6 Flash API & Canvas',
    aliases: ['gemini 3.6 flash', 'gemini 3.6 canvas', 'google gemini 3.6', 'gemini api javascript node'],
    category: 'AI Models & APIs',
    source: 'Nadhebe Developer Radar',
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
    source: 'Nadhebe Developer Radar',
    relatedQueries: [
      'How to Deploy DeepSeek R1 Locally Using vLLM',
      'Fixing vLLM GPU out of memory errors for DeepSeek R1',
      'DeepSeek R1 vs Claude 3.5 Sonnet local benchmark'
    ]
  },
  {
    id: 'google-flow-storyboard-studio',
    topic: 'Google Flow Storyboard Studio',
    aliases: ['google flow storyboard', 'google flow ai video', 'flow studio ai', 'google flow video generator'],
    category: 'AI Video & Visual Tools',
    source: 'Nadhebe Developer Radar',
    relatedQueries: [
      'Google Flow Storyboard Studio Guide',
      'Building pre-production storyboards with Google Flow',
      'Google Flow vs Runway Gen-3 comparison'
    ]
  },
  {
    id: 'kimi-k3-3d-modeling',
    topic: 'Kimi K3 3D Spatial Generation',
    aliases: ['kimi k3 3d', 'kimi k3 spatial ai', 'kimi k3 game development', 'kimi k3 mesh generation'],
    category: '3D & Spatial Computing',
    source: 'Nadhebe Developer Radar',
    relatedQueries: [
      'Kimi K3 3D Generation Guide',
      'Kimi K3 3D modeling workflow for game developers',
      'Exporting Kimi K3 3D assets to Unreal Engine 5'
    ]
  },
  {
    id: 'agentic-youtube-automation',
    topic: 'Multi-Agent YouTube Automation',
    aliases: ['youtube automation agent', 'ai youtube automation', 'multi agent video generator', 'python youtube bot'],
    category: 'Autonomous Agents',
    source: 'Nadhebe Developer Radar',
    relatedQueries: [
      'Build a Multi-Agent YouTube Workflow',
      'Setting up an open-source YouTube automation agent',
      'Automating YouTube Short uploads with AI agents'
    ]
  },
  {
    id: 'instatic-cms-visual-editor',
    topic: 'Instatic CMS Visual Importer',
    aliases: ['instatic cms', 'instatic html importer', 'instatic local vps', 'instatic visual cms'],
    category: 'Web Development & CMS',
    source: 'Nadhebe Developer Radar',
    relatedQueries: [
      'How to import static HTML sites into Instatic CMS',
      'Deploying Instatic Docker on VPS',
      'Instatic enterprise editorial governance guide'
    ]
  },
  {
    id: 'nextjs-15-server-actions',
    topic: 'Next.js 15 Server Actions & PPR',
    aliases: ['next.js 15', 'nextjs 15 ppr', 'partial prerendering nextjs', 'nextjs server actions best practices'],
    category: 'Web Frameworks',
    source: 'Nadhebe Developer Radar',
    relatedQueries: [
      'Next.js 15 Server Actions: Complete Guide',
      'Next.js 15 Partial Prerendering setup guide',
      'Securing Next.js Server Actions in production'
    ]
  },
  {
    id: 'davinci-resolve-vertical-render',
    topic: 'DaVinci Resolve 9:16 Vertical Video Workflows',
    aliases: ['davinci resolve 1080x1350', 'davinci resolve 9:16', 'davinci resolve shorts render', 'davinci resolve aspect ratio'],
    category: 'Social & Creator',
    source: 'Nadhebe Developer Radar',
    relatedQueries: [
      'Best DaVinci Resolve render settings for 1080×1350 and 9:16 Shorts',
      'Auto-cropping 16:9 video to 9:16 vertical in DaVinci Resolve'
    ]
  }
];

// Helper to extract keywords
function extractKeywords(text: string): string[] {
  const stop = new Set(['how', 'to', 'for', 'the', 'and', 'in', 'of', 'a', 'an', 'with', 'on', 'at', 'by', 'is', 'are', 'guide', 'tutorial']);
  return text.toLowerCase().split(/[\s/_\-:,.\s]+/).filter(t => t.length > 1 && !stop.has(t));
}

// Deterministic gap matching engine
interface SiteProfile {
  topics: string[];
  categories: string[];
  existingSlugs: string[];
}

function matchOpportunities(profile: SiteProfile) {
  const siteTopics = new Set(profile.topics.map(t => t.toLowerCase()));
  const siteCategories = new Set(profile.categories.map(c => c.toLowerCase()));
  const siteSlugs = profile.existingSlugs.map(s => s.toLowerCase());

  const results = [];

  for (const trend of CURATED_TRENDS) {
    const trendTokens = Array.from(new Set([...extractKeywords(trend.topic), ...trend.aliases.flatMap(extractKeywords)]));

    let topicHits = 0;
    const matchedTopics: string[] = [];
    for (const token of trendTokens) {
      for (const sTopic of siteTopics) {
        if (sTopic.includes(token) || token.includes(sTopic)) {
          topicHits++;
          if (!matchedTopics.includes(sTopic)) matchedTopics.push(sTopic);
        }
      }
    }

    let catMatch = false;
    for (const cat of siteCategories) {
      if (cat.includes(trend.category.toLowerCase()) || trend.category.toLowerCase().includes(cat)) {
        catMatch = true;
        break;
      }
    }

    let relevance = 40;
    if (trendTokens.length > 0) {
      relevance += Math.round(Math.min(1, topicHits / Math.max(2, trendTokens.length)) * 40);
    }
    if (catMatch) relevance += 20;
    if (matchedTopics.length > 0) relevance += Math.min(20, matchedTopics.length * 5);
    relevance = Math.min(100, Math.max(30, relevance));

    let exactMatches = 0;
    const relatedPages: string[] = [];
    for (const slug of siteSlugs) {
      const slugTokens = extractKeywords(slug);
      const overlap = trendTokens.filter(t => slugTokens.includes(t)).length;
      if (overlap >= Math.min(2, trendTokens.length)) {
        relatedPages.push(slug);
        if (overlap >= Math.min(3, trendTokens.length)) exactMatches++;
      }
    }

    let gapScore = 100;
    let gapStrength = 'High';
    if (exactMatches > 0) {
      gapScore = 15; gapStrength = 'Low';
    } else if (relatedPages.length >= 2) {
      gapScore = 70; gapStrength = 'Medium';
    } else {
      gapScore = 100; gapStrength = 'High';
    }

    const totalScore = Math.round(0.6 * relevance + 0.4 * gapScore);
    const topTopicsStr = matchedTopics.slice(0, 2).join(', ') || 'related topics';

    const why = relatedPages.length > 0
      ? `You cover ${topTopicsStr}, but we couldn't find an article specifically covering ${trend.topic}.`
      : `Missing from your ${trend.category.toLowerCase()} content.`;

    results.push({
      topic: trend.topic,
      category: trend.category,
      relevance,
      gapScore,
      gapStrength,
      totalScore,
      source: trend.source,
      why,
      suggestedWriteTitle: trend.relatedQueries[0] || `Guide to ${trend.topic}`,
      queries: trend.relatedQueries
    });
  }

  return results.sort((a, b) => b.totalScore - a.totalScore).slice(0, 5);
}

// Robust SSRF protection
function isSSRFSafe(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    const host = url.hostname.toLowerCase().trim();

    if (host === 'localhost') return false;

    // Block common private IPv4 ranges
    if (/^127\./.test(host)) return false;
    if (/^10\./.test(host)) return false;
    if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)) return false;
    if (/^192\.168\./.test(host)) return false;
    if (/^169\.254\./.test(host)) return false;
    if (/^0\./.test(host)) return false;

    // Block common private IPv6 patterns
    if (host === '::1' || host.startsWith('fe80:') || host.startsWith('fc00:') || host.startsWith('fd00:')) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// Manual redirect following with SSRF check at every hop
async function fetchWithSafeRedirects(initialUrl: string, maxRedirects = 3): Promise<Response> {
  let currentUrl = initialUrl;
  let redirectCount = 0;

  while (redirectCount <= maxRedirects) {
    if (!isSSRFSafe(currentUrl)) {
      throw new Error(`SSRF Blocked: URL target is not safe.`);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(currentUrl, {
      method: 'GET',
      redirect: 'manual', // Intercept redirects manually
      signal: controller.signal,
      headers: {
        'User-Agent': 'NadhebeOpportunityRadar/1.0'
      }
    });
    clearTimeout(timeoutId);

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) {
        return res;
      }
      
      const absoluteLocation = new URL(location, currentUrl).toString();
      currentUrl = absoluteLocation;
      redirectCount++;
      continue;
    }

    return res;
  }

  throw new Error(`Too many redirects followed (max ${maxRedirects})`);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Route: /api/analyze-site (CONSUMES ZERO AI NEURONS - purely deterministic)
    if (url.pathname === '/api/analyze-site') {
      if (request.method !== 'POST') {
        return Response.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
      }

      try {
        const bodyText = await request.text();
        if (bodyText.length > 1000) { // Capped request body size
          return Response.json({ success: false, error: 'Payload Too Large' }, { status: 413 });
        }

        const { domain } = JSON.parse(bodyText) as { domain?: string };
        if (!domain) {
          return Response.json({ success: false, error: 'Domain is required' }, { status: 400 });
        }

        let origin = domain.trim();
        if (!/^https?:\/\//i.test(origin)) origin = 'https://' + origin;

        if (!isSSRFSafe(origin)) {
          return Response.json({ success: false, error: 'Access to this host is restricted for security reasons.' }, { status: 403 });
        }

        const parsed = new URL(origin);
        const host = parsed.hostname;

        // Fetch sitemap with strict redirects and timeouts
        let sitemapText = '';
        try {
          const sitemapRes = await fetchWithSafeRedirects(`${parsed.origin}/sitemap.xml`);
          if (sitemapRes.ok) sitemapText = await sitemapRes.text();
        } catch {}

        if (!sitemapText) {
          try {
            const sitemap0Res = await fetchWithSafeRedirects(`${parsed.origin}/sitemap-0.xml`);
            if (sitemap0Res.ok) sitemapText = await sitemap0Res.text();
          } catch {}
        }

        const urls: string[] = [];
        const locRegex = /<loc>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/loc>/gi;
        let m;
        while ((m = locRegex.exec(sitemapText)) !== null) {
          if (m[1]) urls.push(m[1].trim());
        }

        const existingSlugs: string[] = [];
        const topicsSet = new Set<string>();
        const categoriesSet = new Set<string>();
        const stopWords = new Set(['index', 'html', 'php', 'page', 'post', 'tag', 'category', 'author', 'archive']);

        const targetUrls = urls.length > 0 ? urls.slice(0, 100) : [];

        for (const uStr of targetUrls) {
          try {
            const u = new URL(uStr);
            const segs = u.pathname.split('/').filter(Boolean);
            if (segs.length > 0) {
              existingSlugs.push(segs[segs.length - 1]);
              if (segs.length > 1 && !stopWords.has(segs[0])) categoriesSet.add(segs[0]);
              for (const seg of segs) {
                for (const p of seg.toLowerCase().split(/[-_.]+/)) {
                  if (p.length > 2 && !stopWords.has(p)) topicsSet.add(p);
                }
              }
            }
          } catch {}
        }

        const profile: SiteProfile = {
          topics: Array.from(topicsSet).slice(0, 50),
          categories: Array.from(categoriesSet).slice(0, 10),
          existingSlugs: existingSlugs.slice(0, 100)
        };

        // Deterministic Opportunity Radar Matching (ZERO AI neurons used!)
        const opportunities = matchOpportunities(profile);

        return Response.json({
          success: true,
          profile: {
            domain: host,
            urlCount: Math.max(targetUrls.length, 1),
            topics: profile.topics,
            categories: profile.categories,
            existingSlugs: profile.existingSlugs,
            analyzedAt: new Date().toISOString()
          },
          opportunities
        });

      } catch (error: any) {
        return Response.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
      }
    }

    // Route: /api/research-topic (Workers AI research endpoint)
    if (url.pathname === '/api/research-topic') {
      if (request.method !== 'POST') {
        return Response.json({ success: false, error: 'Method Not Allowed' }, { status: 405 });
      }

      try {
        const bodyText = await request.text();
        if (bodyText.length > 1000) { // Request body size limit
          return Response.json({ success: false, error: 'Payload Too Large' }, { status: 413 });
        }

        const { topic, category } = JSON.parse(bodyText) as { topic?: string, category?: string };
        
        // Request validation
        if (!topic || typeof topic !== 'string' || topic.trim().length > 100) {
          return Response.json({ success: false, error: 'Valid topic (max 100 chars) is required' }, { status: 400 });
        }
        if (category && (typeof category !== 'string' || category.trim().length > 100)) {
          return Response.json({ success: false, error: 'Valid category (max 100 chars) is required' }, { status: 400 });
        }

        const sanitizedTopic = topic.trim();
        const sanitizedCategory = category ? category.trim() : 'General Technology';

        // Non-client editable system prompt
        const systemPrompt = `You are a Senior Technical Writer and SEO Strategist. 
Generate a detailed content research brief / outline for a blog post or tutorial on the given topic.
Keep the outline structured, professional, and optimized for search intent.
Format the output in clean Markdown. Do not exceed 800 tokens.`;

        const aiResponse = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Create a detailed content research outline for the topic: "${sanitizedTopic}" (Category: "${sanitizedCategory}").` }
          ],
          max_tokens: 800 // Strict output token limit
        });

        let brief = '';
        if (typeof aiResponse === 'object' && aiResponse !== null && 'response' in aiResponse) {
          brief = (aiResponse as any).response;
        } else if (typeof aiResponse === 'string') {
          brief = aiResponse;
        } else {
          brief = JSON.stringify(aiResponse);
        }

        return Response.json({
          success: true,
          topic: sanitizedTopic,
          category: sanitizedCategory,
          brief: brief.trim()
        });

      } catch (error: any) {
        return Response.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
      }
    }

    // Explicitly reject any other /api/* routes to avoid falling through to static pages
    if (url.pathname.startsWith('/api/')) {
      return Response.json({ success: false, error: 'API route not found' }, { status: 404 });
    }

    // Default route: Fallback to Astro static assets
    return env.ASSETS.fetch(request);
  }
};
