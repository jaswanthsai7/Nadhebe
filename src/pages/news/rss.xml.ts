import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getArticleUrl } from '../../utils/content';
import { SITE } from '../../config';

export async function GET(context: any) {
  const newsEntries = await getCollection('news');
  const sorted = newsEntries
    .filter((n) => !n.data.draft)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const baseUrl = context.site?.origin || SITE.url;

  return rss({
    title: `${SITE.name} — Breaking AI News Feed`,
    description: 'Latest AI breakthroughs, open-source model releases, product announcements, and developer updates.',
    site: baseUrl,
    items: sorted.map((item) => {
      const url = new URL(getArticleUrl(item), baseUrl).toString();
      return {
        title: item.data.title,
        pubDate: item.data.pubDate,
        description: item.data.description,
        link: url,
        categories: item.data.tags || ['news'],
        author: item.data.author?.id || 'Nadhebe Editorial',
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
