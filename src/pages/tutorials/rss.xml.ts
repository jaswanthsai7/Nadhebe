import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getArticleUrl } from '../../utils/content';
import { SITE } from '../../config';

export async function GET(context: any) {
  const tutorials = await getCollection('tutorials');
  const sorted = tutorials
    .filter((t) => !t.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const baseUrl = context.site?.origin || SITE.url;

  return rss({
    title: `${SITE.name} — AI Tutorials Feed`,
    description: 'In-depth AI engineering tutorials, vLLM deployment guides, MCP server setups, and Claude Code workflows.',
    site: baseUrl,
    items: sorted.map((item) => {
      const url = new URL(getArticleUrl(item), baseUrl).toString();
      return {
        title: item.data.title,
        pubDate: item.data.pubDate,
        description: item.data.description,
        link: url,
        categories: item.data.tags || ['tutorials'],
        author: item.data.author?.id || 'Nadhebe Editorial',
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
