import rss from '@astrojs/rss';
import { getAllArticles, getArticleUrl } from '../utils/content';
import { SITE } from '../config';

export async function GET(context: any) {
  const articles = await getAllArticles();
  const baseUrl = context.site?.origin || SITE.url;

  return rss({
    title: `${SITE.name} — Global AI Engineering Feed`,
    description: SITE.description,
    site: baseUrl,
    items: articles.map((article) => {
      const url = new URL(getArticleUrl(article), baseUrl).toString();
      const heroImage = article.data.heroImage
        ? new URL(article.data.heroImage, baseUrl).toString()
        : undefined;

      return {
        title: article.data.title,
        pubDate: article.data.pubDate,
        description: article.data.description,
        link: url,
        categories: article.data.tags || [article.collection],
        author: article.data.author?.id || 'Nadhebe Editorial',
        ...(heroImage ? { enclosure: { url: heroImage, length: 0, type: 'image/jpeg' } } : {}),
      };
    }),
    customData: `<language>en-us</language><ttl>60</ttl>`,
  });
}
