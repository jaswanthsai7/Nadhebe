interface Env {}

// Strict SSRF IP Validation
function isPrivateHost(hostname: string): boolean {
  const cleanHost = hostname.toLowerCase().trim();
  
  if (
    cleanHost === 'localhost' ||
    cleanHost === '127.0.0.1' ||
    cleanHost === '0.0.0.0' ||
    cleanHost === '::1' ||
    cleanHost.endsWith('.local') ||
    cleanHost.endsWith('.internal') ||
    cleanHost.endsWith('.lan')
  ) {
    return true;
  }

  // Check IPv4 ranges
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const match = cleanHost.match(ipv4Regex);
  if (match) {
    const [, a, b, c, d] = match.map(Number);
    if (a === 10) return true;                                  // 10.0.0.0/8
    if (a === 172 && b >= 16 && b <= 31) return true;           // 172.16.0.0/12
    if (a === 192 && b === 168) return true;                    // 192.168.0.0/16
    if (a === 127) return true;                                 // 127.0.0.0/8
    if (a === 169 && b === 254) return true;                    // 169.254.169.254 (Cloud metadata)
    if (a === 0) return true;
  }

  return false;
}

function normalizeUrl(input: string): string | null {
  try {
    let urlString = input.trim();
    if (!/^https?:\/\//i.test(urlString)) {
      urlString = 'https://' + urlString;
    }
    const parsed = new URL(urlString);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    if (isPrivateHost(parsed.hostname)) {
      return null;
    }
    return parsed.origin;
  } catch {
    return null;
  }
}

async function fetchWithTimeout(url: string, timeoutMs = 5000): Promise<Response | null> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'NadhebeOpportunityRadar/1.0 (+https://nadhebe.com/tools/opportunity-radar/)'
      }
    });
    clearTimeout(id);
    return res.ok ? res : null;
  } catch {
    clearTimeout(id);
    return null;
  }
}

function extractUrlsFromXml(xmlText: string): string[] {
  const urls: string[] = [];
  const locRegex = /<loc>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/loc>/gi;
  let match: RegExpExecArray | null;

  while ((match = locRegex.exec(xmlText)) !== null) {
    if (match[1]) {
      const u = match[1].trim();
      if (/^https?:\/\//i.test(u)) {
        urls.push(u);
      }
    }
  }

  return urls;
}

function isSitemapIndex(xmlText: string): boolean {
  return /<sitemapindex/i.test(xmlText);
}

export const onRequestPost: EventContext<Env, any, any>['next'] = async (context) => {
  try {
    const body = await context.request.json<{ domain?: string }>();
    const rawDomain = body?.domain;

    if (!rawDomain || typeof rawDomain !== 'string') {
      return new Response(JSON.stringify({
        success: false,
        error: 'INVALID_INPUT',
        message: 'Please provide a valid website domain or URL.'
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const normalizedOrigin = normalizeUrl(rawDomain);
    if (!normalizedOrigin) {
      return new Response(JSON.stringify({
        success: false,
        error: 'INVALID_HOST',
        message: 'Security Block: Private IP addresses, localhost, and non-HTTP protocols are restricted.'
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const host = new URL(normalizedOrigin).hostname;
    let subrequestCount = 0;
    const maxSubrequests = 8;
    const maxUrls = 200;

    // Step 1: Check robots.txt for Sitemap declaration
    let sitemapUrlsToFetch: string[] = [];
    subrequestCount++;
    const robotsRes = await fetchWithTimeout(`${normalizedOrigin}/robots.txt`);
    if (robotsRes) {
      const robotsText = await robotsRes.text();
      const sitemapMatches = robotsText.matchAll(/^Sitemap:\s*(https?:\/\/[^\s]+)/gim);
      for (const m of sitemapMatches) {
        if (m[1]) sitemapUrlsToFetch.push(m[1].trim());
      }
    }

    // Default fallback sitemap URLs
    if (sitemapUrlsToFetch.length === 0) {
      sitemapUrlsToFetch.push(`${normalizedOrigin}/sitemap.xml`);
      sitemapUrlsToFetch.push(`${normalizedOrigin}/sitemap_index.xml`);
    }

    const collectedContentUrls: string[] = [];
    const visitedSitemaps = new Set<string>();
    let usedSitemapUrl: string | undefined;

    // Step 2: Fetch and process sitemap XMLs up to 8 subrequests or 200 unique content URLs
    while (sitemapUrlsToFetch.length > 0 && subrequestCount < maxSubrequests && collectedContentUrls.length < maxUrls) {
      const targetSitemap = sitemapUrlsToFetch.shift()!;
      if (visitedSitemaps.has(targetSitemap)) continue;
      visitedSitemaps.add(targetSitemap);

      subrequestCount++;
      const sitemapRes = await fetchWithTimeout(targetSitemap);
      if (!sitemapRes) continue;

      const xmlText = await sitemapRes.text();
      if (!xmlText || xmlText.length > 2 * 1024 * 1024) continue; // 2MB size cap

      if (!usedSitemapUrl) usedSitemapUrl = targetSitemap;

      const extracted = extractUrlsFromXml(xmlText);

      if (isSitemapIndex(xmlText)) {
        // Child sitemaps list
        for (const childUrl of extracted) {
          if (!visitedSitemaps.has(childUrl) && sitemapUrlsToFetch.length < maxSubrequests) {
            sitemapUrlsToFetch.push(childUrl);
          }
        }
      } else {
        // Content URLs list
        for (const contentUrl of extracted) {
          if (!collectedContentUrls.includes(contentUrl)) {
            collectedContentUrls.push(contentUrl);
            if (collectedContentUrls.length >= maxUrls) break;
          }
        }
      }
    }

    if (collectedContentUrls.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'UNABLE_TO_LOCATE_SITEMAP',
        message: `We couldn't locate a public XML sitemap for ${host}. Ensure your site has an active /sitemap.xml or robots.txt directive.`
      }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    // Step 3: Extract topics, categories, and slugs from collected content URLs
    const existingSlugs: string[] = [];
    const extractedTopicsSet = new Set<string>();
    const extractedCategoriesSet = new Set<string>();

    const stopWords = new Set(['index', 'html', 'php', 'page', 'post', 'tag', 'category', 'author', 'archive', '2024', '2025', '2026', 'v1', 'v2']);

    for (const urlStr of collectedContentUrls) {
      try {
        const u = new URL(urlStr);
        const pathSegments = u.pathname.split('/').filter(Boolean);
        if (pathSegments.length === 0) continue;

        const slug = pathSegments[pathSegments.length - 1];
        if (slug) existingSlugs.push(slug);

        if (pathSegments.length > 1) {
          const category = pathSegments[0].toLowerCase();
          if (!stopWords.has(category)) {
            extractedCategoriesSet.add(category);
          }
        }

        for (const seg of pathSegments) {
          const parts = seg.toLowerCase().split(/[-_.]+/);
          for (const p of parts) {
            if (p.length > 2 && !stopWords.has(p) && !/^\d+$/.test(p)) {
              extractedTopicsSet.add(p);
            }
          }
        }
      } catch {
        // Skip invalid URL string
      }
    }

    const profile = {
      domain: host,
      normalizedUrl: normalizedOrigin,
      sitemapUrl: usedSitemapUrl,
      urlCount: collectedContentUrls.length,
      topics: Array.from(extractedTopicsSet).slice(0, 100),
      categories: Array.from(extractedCategoriesSet).slice(0, 20),
      existingSlugs: existingSlugs.slice(0, maxUrls),
      analyzedAt: new Date().toISOString()
    };

    return new Response(JSON.stringify({
      success: true,
      profile
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({
      success: false,
      error: 'SERVER_ERROR',
      message: 'An error occurred while analyzing the website sitemap.'
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
