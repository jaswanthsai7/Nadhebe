interface PagesContext {
  request: Request;
  next: () => Promise<Response>;
}

export const onRequest = async (context: PagesContext) => {
  const request = context.request;
  const url = new URL(request.url);

  // Serve OAuth Protected Resource Metadata
  if (url.pathname.replace(/\/$/, '') === '/.well-known/oauth-protected-resource') {
    const resourceMetadata = {
      resource: `${url.protocol}//${url.host}`,
      authorization_servers: [
        'https://github.com/login/oauth/authorize'
      ],
      scopes_supported: ['read', 'write', 'repo']
    };
    return new Response(JSON.stringify(resourceMetadata, null, 2), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // Serve OAuth/OIDC Discovery Metadata
  if (url.pathname.replace(/\/$/, '') === '/.well-known/openid-configuration' || 
      url.pathname.replace(/\/$/, '') === '/.well-known/oauth-authorization-server') {
    const oidcDiscovery = {
      issuer: `${url.protocol}//${url.host}`,
      authorization_endpoint: `${url.protocol}//${url.host}/oauth/authorize`,
      token_endpoint: `${url.protocol}//${url.host}/oauth/token`,
      jwks_uri: `${url.protocol}//${url.host}/.well-known/jwks.json`,
      response_types_supported: ['code', 'token', 'id_token'],
      grant_types_supported: ['authorization_code', 'client_credentials'],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['RS256']
    };
    return new Response(JSON.stringify(oidcDiscovery, null, 2), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  const accept = request.headers.get('Accept') || '';

  if (accept.includes('text/markdown')) {
    const response = await context.next();
    const contentType = response.headers.get('Content-Type') || '';

    if (contentType.includes('text/html')) {
      const html = await response.text();
      const markdown = convertHtmlToMarkdown(html);

      const tokenCount = Math.round(markdown.length / 4);
      const originalTokenCount = Math.round(html.length / 4);

      return new Response(markdown, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'x-markdown-tokens': String(tokenCount),
          'x-original-tokens': String(originalTokenCount),
          'Cache-Control': response.headers.get('Cache-Control') || 'public, max-age=0, must-revalidate',
          'Link': '</index.json>; rel="api-catalog", </llms.txt>; rel="service-doc", </llms-full.txt>; rel="describedby"'
        },
      });
    }
  }

  const response = await context.next();
  const contentType = response.headers.get('Content-Type') || '';
  if (contentType.includes('text/html')) {
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Link', '</index.json>; rel="api-catalog", </llms.txt>; rel="service-doc", </llms-full.txt>; rel="describedby"');
    return newResponse;
  }

  return response;
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

  // Clean elements
  content = content
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '');

  // Convert layout tags to Markdown
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
