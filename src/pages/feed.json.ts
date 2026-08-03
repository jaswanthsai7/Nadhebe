import { getAllArticles, getArticleUrl } from '../utils/content';
import { SITE } from '../config';

export async function GET(context: any) {
  const articles = await getAllArticles();
  const baseUrl = context.site?.origin || SITE.url;

  const items = articles.map((article) => {
    const url = new URL(getArticleUrl(article), baseUrl).toString();
    const heroImage = article.data.heroImage
      ? new URL(article.data.heroImage, baseUrl).toString()
      : undefined;

    return {
      id: url,
      url: url,
      title: article.data.title,
      summary: article.data.description,
      content_html: `<p>${article.data.description}</p><p><a href="${url}">Read full article on Nadhebe</a></p>`,
      date_published: article.data.pubDate.toISOString(),
      date_modified: article.data.updatedDate ? article.data.updatedDate.toISOString() : undefined,
      image: heroImage,
      banner_image: heroImage,
      tags: article.data.tags || [article.collection],
      authors: article.data.author
        ? [{ name: article.data.author.id }]
        : [{ name: SITE.name }],
    };
  });

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: `${SITE.name} — AI Engineering Feed`,
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/feed.json`,
    description: SITE.description,
    icon: `${baseUrl}/favicon.png`,
    favicon: `${baseUrl}/favicon.png`,
    language: 'en-US',
    items,
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
