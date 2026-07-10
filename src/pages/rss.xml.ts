import rss from '@astrojs/rss';
import { getAllArticles, getArticleUrl } from '../utils/content';

export async function GET(context: any) {
  const articles = await getAllArticles();
  
  return rss({
    title: 'Nadhebe Content Hub',
    description: 'In-depth tutorials, comparison reviews, optimized system prompts, and AI tool reviews.',
    site: context.site || 'https://example.com',
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.pubDate,
      description: article.data.description,
      link: getArticleUrl(article),
    })),
    customData: `<language>en-us</language>`,
  });
}
