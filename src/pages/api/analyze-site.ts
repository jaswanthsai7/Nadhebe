import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const { domain } = await context.request.json();
    if (!domain) {
      return new Response(JSON.stringify({ success: false, error: 'Domain is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let origin = domain.trim();
    if (!/^https?:\/\//i.test(origin)) origin = 'https://' + origin;
    const parsed = new URL(origin);
    const host = parsed.hostname;

    // Fetch sitemap from the target domain (no CORS limitations since we are running server-side!)
    let sitemapText = '';
    try {
      const sitemapRes = await fetch(`${parsed.origin}/sitemap.xml`);
      if (sitemapRes.ok) sitemapText = await sitemapRes.text();
    } catch {}

    if (!sitemapText) {
      try {
        const sitemap0Res = await fetch(`${parsed.origin}/sitemap-0.xml`);
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

    const targetUrls = urls.length > 0 ? urls.slice(0, 100) : []; // Limit to first 100 to avoid huge payload

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

    // Call Cloudflare Workers AI using Gemma 4 model
    const runtime = context.locals.runtime;
    if (!runtime || !runtime.env || !runtime.env.AI) {
      // Fallback if AI binding is missing (local dev fallback)
      return new Response(JSON.stringify({
        success: false,
        error: 'Cloudflare Workers AI binding (env.AI) is not available.'
      }), { status: 500 });
    }

    const ai = runtime.env.AI;
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

    const response = await ai.run("@cf/google/gemma-4-26b-a4b-it", {
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Analyze the domain: ${host}. Find 5 SEO content opportunities (gaps).` }
      ]
    });

    let rawResponse = '';
    if (typeof response === 'object' && response !== null && 'response' in response) {
      rawResponse = (response as any).response;
    } else if (typeof response === 'string') {
      rawResponse = response;
    } else {
      rawResponse = JSON.stringify(response);
    }

    // Clean up code blocks if the model accidentally wrapped it
    rawResponse = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const opportunities = JSON.parse(rawResponse);

    return new Response(JSON.stringify({
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
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Internal Server Error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
