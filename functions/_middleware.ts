interface PagesContext {
  request: Request;
  next: () => Promise<Response>;
}

export const onRequest = async (context: PagesContext) => {
  let response: Response | null = null;
  try {
    const request = context.request;
    const url = new URL(request.url);
    const origin = `${url.protocol}//${url.host}`;

    // Redirect www.nadhebe.com to nadhebe.com (301 Permanent Redirect)
    if (url.hostname === 'www.nadhebe.com') {
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `https://nadhebe.com${url.pathname}${url.search}`,
          'Cache-Control': 'public, max-age=31536000'
        }
      });
    }

    // Serve IndexNow Verification Key File
    if (url.pathname === '/4d98a2f7c03e4b1a8d562f790c1e8a9f.txt') {
      return new Response('4d98a2f7c03e4b1a8d562f790c1e8a9f', {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Serve OAuth Protected Resource Metadata (RFC 9728)
    if (url.pathname.replace(/\/$/, '') === '/.well-known/oauth-protected-resource') {
      const resourceMetadata = {
        resource: origin,
        authorization_servers: [origin],
        scopes_supported: ['read:public', 'read:articles', 'read:tools', 'write:jobs'],
        bearer_methods_supported: ['header'],
        resource_documentation: `${origin}/auth.md`
      };
      return new Response(JSON.stringify(resourceMetadata, null, 2), {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, must-revalidate',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Serve OAuth/OIDC Discovery Metadata with Agent Auth block
    if (url.pathname.replace(/\/$/, '') === '/.well-known/openid-configuration' || 
        url.pathname.replace(/\/$/, '') === '/.well-known/oauth-authorization-server') {
      const oidcDiscovery = {
        issuer: origin,
        authorization_endpoint: `${origin}/oauth/authorize`,
        token_endpoint: `${origin}/oauth/token`,
        jwks_uri: `${origin}/.well-known/jwks.json`,
        response_types_supported: ['code', 'token', 'id_token'],
        grant_types_supported: ['authorization_code', 'client_credentials'],
        subject_types_supported: ['public'],
        id_token_signing_alg_values_supported: ['RS256'],
        agent_auth: {
          skill: "https://isitagentready.com/.well-known/agent-skills/auth-md/SKILL.md",
          register_uri: `${origin}/auth.md`,
          supported_identity_types: ["developer", "agent", "anonymous"],
          supported_credential_types: ["bearer_token", "oauth2", "none"],
          claim_uri: `${origin}/auth.md`,
          revocation_endpoint: `${origin}/oauth/revoke`
        }
      };
      return new Response(JSON.stringify(oidcDiscovery, null, 2), {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=86400, must-revalidate',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Call context.next() to fetch response
    response = await context.next();

    const accept = (request.headers.get('Accept') || request.headers.get('accept') || '').toLowerCase();
    const contentType = response.headers.get('content-type') || response.headers.get('Content-Type') || '';
    const isHtml = contentType.includes('text/html') || url.pathname.endsWith('/') || !url.pathname.includes('.') || url.pathname.endsWith('.html');
    const isMarkdownRequest = accept.includes('text/markdown') || accept.includes('text/x-markdown') || url.pathname.endsWith('.md');

    // Handle Markdown Content Negotiation for Agents (Accept: text/markdown or .md extension)
    if (isMarkdownRequest && isHtml && response.status === 200) {
      const html = await response.clone().text();
      const markdown = convertHtmlToMarkdown(html);

      const tokenCount = Math.round(markdown.length / 4);
      const originalTokenCount = Math.round(html.length / 4);

      return new Response(markdown, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'x-markdown-tokens': String(tokenCount),
          'x-original-tokens': String(originalTokenCount),
          'Vary': 'Accept',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          'Link': `<${url.pathname}>; rel="canonical", </llms.txt>; rel="describedby"; type="text/markdown", </sitemap-index.xml>; rel="sitemap"; type="application/xml"`
        },
      });
    }

    // Standard HTML responses: attach Link headers (including alternate text/markdown) & Vary: Accept
    if (isHtml && response.status === 200) {
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Vary', 'Accept');
      newHeaders.set('Link', `<${url.pathname}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"; type="text/plain", </sitemap-index.xml>; rel="sitemap"; type="application/xml"`);
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }

    return response;
  } catch (err) {
    console.error('Pages Functions Middleware Error:', err);
    if (response) {
      return response;
    }
    return context.next();
  }
};

function convertHtmlToMarkdown(html: string): string {
  // 1. Extract Meta/Frontmatter fields
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i) || html.match(/<meta\s+name="title"\s+content="([^"]*)"/i) || html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
  const imgMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i);

  const title = titleMatch ? titleMatch[1].trim() : '';
  const description = descMatch ? descMatch[1].trim() : '';
  const image = imgMatch ? imgMatch[1].trim() : '';

  let frontmatter = '';
  if (title || description || image) {
    frontmatter = '---\n';
    if (title) frontmatter += `title: ${title}\n`;
    if (description) frontmatter += `description: ${description}\n`;
    if (image) frontmatter += `image: ${image}\n`;
    frontmatter += '---\n\n';
  }

  // 2. Extract JSON-LD scripts
  const jsonLdBlocks: string[] = [];
  const jsonLdRegex = /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = jsonLdRegex.exec(html)) !== null) {
    jsonLdBlocks.push(match[1].trim());
  }

  // 3. Extract Main content
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) || html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let content = mainMatch ? mainMatch[1] : html;

  // Clean layout elements
  content = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '');

  // Convert HTML elements to Markdown
  let bodyMarkdown = content
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n')
    .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '\n```\n$1\n```\n')
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '\n```\n$1\n```\n')
    .replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '*$2*')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    .replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/\n\s+\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n');

  // Decode standard HTML entities
  bodyMarkdown = bodyMarkdown
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');

  let output = frontmatter + bodyMarkdown.trim();

  if (jsonLdBlocks.length > 0) {
    output += '\n\n```json\n' + jsonLdBlocks.join('\n') + '\n```';
  }

  return output.trim();
}
