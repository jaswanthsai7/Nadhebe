export interface Env {
  ASSETS: Fetcher;
  AI: {
    run: (model: string, input: any) => Promise<any>;
  };
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

// Clean up code blocks if the model wrapped output in markdown
function cleanJsonResponse(raw: string): string {
  return raw
    .replace(/```json/gi, '')
    .replace(/```/gi, '')
    .trim();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Route: /api/analyze-site
    if (url.pathname === '/api/analyze-site' && request.method === 'POST') {
      try {
        const { domain } = await request.json() as { domain?: string };
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

        // Fetch sitemap with strict timeout
        let sitemapText = '';
        const fetchController = new AbortController();
        const timeoutId = setTimeout(() => fetchController.abort(), 6000);

        try {
          const sitemapRes = await fetch(`${parsed.origin}/sitemap.xml`, { signal: fetchController.signal });
          if (sitemapRes.ok) sitemapText = await sitemapRes.text();
        } catch {}

        if (!sitemapText) {
          try {
            const sitemap0Res = await fetch(`${parsed.origin}/sitemap-0.xml`, { signal: fetchController.signal });
            if (sitemap0Res.ok) sitemapText = await sitemap0Res.text();
          } catch {}
        }
        clearTimeout(timeoutId);

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

        const topics = Array.from(topicsSet).slice(0, 30).join(', ');
        const categories = Array.from(categoriesSet).slice(0, 10).join(', ');

        const systemPrompt = `You are a professional SEO Content Strategist and Topic Cluster Architect.
Your task is to analyze a website profile and identify 5 high-impact content opportunities (gaps).
Analyze the site's categories and topics:
Categories: ${categories || 'general tech'}
Topics: ${topics || 'software engineering, web development'}

Generate 5 distinct content opportunities. Each opportunity must have:
1. topic: A short, trending technology topic name.
2. category: General niche category (e.g. AI Developer Tools, Web Frameworks, Local AI).
3. relevance: A percentage score (30 to 100) based on how relevant this is to the site's profile.
4. gapStrength: "High", "Medium", or "Low" (use "High" if the site definitely doesn't cover this trending topic).
5. totalScore: An aggregate score (30 to 100) reflecting high relevance and high gap strength.
6. source: An authoritative signal source (e.g., Google Trends, GitHub Trending, Vercel Radar).
7. why: A detailed 1-sentence explanation of why the site needs this topic (e.g., "You cover next.js, but we couldn't find an article specifically covering Next.js 15 Server Actions").
8. suggestedWriteTitle: A highly clickable, SEO-friendly article title.
9. queries: An array of 3 specific heading suggestions or sub-topics to cover.

You MUST return the output ONLY as a raw JSON array of 5 objects, with exactly this schema:
[
  {
    "topic": "Topic Name",
    "category": "Category Name",
    "relevance": 85,
    "gapStrength": "High",
    "totalScore": 88,
    "source": "GitHub Trending",
    "why": "Explanation goes here.",
    "suggestedWriteTitle": "Clickable Title Guide",
    "queries": ["Heading 1", "Heading 2", "Heading 3"]
  }
]
Do not wrap your response in markdown code blocks like \`\`\`json. Return only raw JSON.`;

        const aiResponse = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Analyze the domain: ${host}. Find 5 SEO content opportunities (gaps).` }
          ]
        });

        let rawResponse = '';
        if (typeof aiResponse === 'object' && aiResponse !== null && 'response' in aiResponse) {
          rawResponse = (aiResponse as any).response;
        } else if (typeof aiResponse === 'string') {
          rawResponse = aiResponse;
        } else {
          rawResponse = JSON.stringify(aiResponse);
        }

        const opportunities = JSON.parse(cleanJsonResponse(rawResponse));

        return Response.json({
          success: true,
          profile: {
            domain: host,
            urlCount: Math.max(targetUrls.length, 1),
            topics: Array.from(topicsSet).slice(0, 50),
            categories: Array.from(categoriesSet).slice(0, 10),
            existingSlugs: existingSlugs.slice(0, 100),
            analyzedAt: new Date().toISOString()
          },
          opportunities
        });

      } catch (error: any) {
        return Response.json({ success: false, error: error.message || 'Internal Server Error' }, { status: 500 });
      }
    }

    // Route: /api/research-topic
    if (url.pathname === '/api/research-topic' && request.method === 'POST') {
      try {
        const { topic, category } = await request.json() as { topic?: string, category?: string };
        
        // Request validation
        if (!topic || typeof topic !== 'string' || topic.trim().length > 100) {
          return Response.json({ success: false, error: 'Valid topic (max 100 chars) is required' }, { status: 400 });
        }
        if (category && (typeof category !== 'string' || category.trim().length > 100)) {
          return Response.json({ success: false, error: 'Valid category (max 100 chars) is required' }, { status: 400 });
        }

        const sanitizedTopic = topic.trim();
        const sanitizedCategory = category ? category.trim() : 'General Technology';

        const systemPrompt = `You are a Senior Technical Writer and SEO Strategist. 
Generate a detailed content research brief / outline for a blog post or tutorial on the given topic.
Keep the outline structured, professional, and optimized for search intent.
Format the output in clean Markdown. Do not exceed 800 tokens.`;

        const aiResponse = await env.AI.run("@cf/google/gemma-4-26b-a4b-it", {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Create a detailed content research outline for the topic: "${sanitizedTopic}" (Category: "${sanitizedCategory}").` }
          ],
          max_tokens: 800 // Limit token counts to prevent abuse
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

    // Default route: Fallback to Astro static assets
    return env.ASSETS.fetch(request);
  }
};
