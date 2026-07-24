import fs from 'fs';
import path from 'path';

const contentDir = 'src/content';
const collections = fs.readdirSync(contentDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'authors')
  .map(d => d.name);

const articles: any[] = [];

collections.forEach(col => {
  const colPath = path.join(contentDir, col);
  const files = fs.readdirSync(colPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  files.forEach(f => {
    const filePath = path.join(colPath, f);
    const raw = fs.readFileSync(filePath, 'utf8');
    if (/draft:\s*true/i.test(raw)) return;

    const titleMatch = raw.match(/title:\s*["']?([^"'\r\n]+)["']?/);
    const dateMatch = raw.match(/pubDate:\s*([^\r\n]+)/);
    const updatedMatch = raw.match(/updatedDate:\s*([^\r\n]+)/);
    const authorMatch = raw.match(/author:\s*([^\r\n]+)/);
    const topicMatch = raw.match(/topic:\s*["']?([^"'\r\n]+)["']?/);
    const intentMatch = raw.match(/searchIntent:\s*["']?([^"'\r\n]+)["']?/);
    const sourcesMatch = /sources:/i.test(raw);
    const heroImageMatch = raw.match(/heroImage:\s*["']?([^"'\r\n]+)["']?/);

    const slug = f.replace(/\.(md|mdx)$/, '');
    let url = `/${col}/${slug}`;
    if (col === 'youtube-articles') url = `/youtube/${slug}`;
    if (col === 'tool-reviews') url = `/reviews/${slug}`;
    if (col === 'best-practices') url = `/best-practices/${slug}`;
    if (col === 'use-cases') url = `/use-cases/${slug}`;
    if (col === 'case-studies') url = `/case-studies/${slug}`;

    const body = raw.replace(/^---[\s\S]*?---/, '').trim();
    const wordCount = body.split(/\s+/).filter(Boolean).length;

    const linkMatches = Array.from(body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g));
    const linksOut = linkMatches
      .map(m => m[2])
      .filter(l => l.startsWith('/') || l.includes('nadhebe.com'));

    articles.push({
      file: `${col}/${f}`,
      collection: col,
      slug,
      url,
      title: titleMatch ? titleMatch[1].trim() : slug,
      pubDate: dateMatch ? dateMatch[1].trim() : 'N/A',
      updatedDate: updatedMatch ? updatedMatch[1].trim() : undefined,
      author: authorMatch ? authorMatch[1].trim() : 'None',
      wordCount,
      topic: topicMatch ? topicMatch[1].trim() : 'General',
      intent: intentMatch ? intentMatch[1].trim() : 'Informational',
      hasSources: sourcesMatch ? 'YES' : 'NO',
      hasAuthor: !!authorMatch ? 'YES' : 'NO',
      hasImages: !!heroImageMatch ? 'YES' : 'NO',
      linksOut: linksOut.length,
      linksInCount: 0
    });
  });
});

articles.forEach(target => {
  let count = 0;
  articles.forEach(src => {
    if (src.url === target.url) return;
    if (src.linksOut > 0) {
      const raw = fs.readFileSync(path.join(contentDir, src.file), 'utf8');
      const body = raw.replace(/^---[\s\S]*?---/, '').trim();
      const linkMatches = Array.from(body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g));
      const links = linkMatches.map(m => m[2]);
      if (links.some(l => l === target.url || l.replace(/\/$/, '') === target.url.replace(/\/$/, ''))) {
        count++;
      }
    }
  });
  target.linksInCount = count;
});

console.log(JSON.stringify(articles, null, 2));
