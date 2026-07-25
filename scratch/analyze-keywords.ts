import fs from 'fs';
import path from 'path';

// 1. Read CSV
const csvPath = 'C:\\Users\\jasva\\Downloads\\KeywordStats_7_24_2026.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split('\n').map(l => l.trim()).filter(Boolean);

const keywordsData: { keyword: string; impressions: number; trends: number[] }[] = [];
// Skip header
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  // Simple CSV parser that handles quotes and brackets
  // Format: "Keyword","Trends","Impressions"
  const match = line.match(/^"(.+?)","\[(.*?)\]","(\d+)"$/);
  if (match) {
    const keyword = match[1].toLowerCase().trim();
    const trends = match[2].split(',').map(Number);
    const impressions = Number(match[3]);
    keywordsData.push({ keyword, impressions, trends });
  } else {
    // try fallback for other structures
    const parts = line.split(',');
    if (parts.length >= 3) {
      const keyword = parts[0].replace(/"/g, '').toLowerCase().trim();
      const impressions = Number(parts[parts.length - 1].replace(/"/g, ''));
      keywordsData.push({ keyword, impressions, trends: [] });
    }
  }
}

// Sort by impressions descending
keywordsData.sort((a, b) => b.impressions - a.impressions);

// 2. Load all articles
const contentDir = 'src/content';
const collections = fs.readdirSync(contentDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'authors')
  .map(d => d.name);

const articles: {
  collection: string;
  slug: string;
  title: string;
  content: string;
  filePath: string;
}[] = [];

collections.forEach(col => {
  const colPath = path.join(contentDir, col);
  const files = fs.readdirSync(colPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  files.forEach(f => {
    const filePath = path.join(colPath, f);
    const text = fs.readFileSync(filePath, 'utf8');
    const titleMatch = text.match(/^title:\s*["']?(.+?)["']?\s*$/m);
    articles.push({
      collection: col,
      slug: f.replace(/\.(md|mdx)$/, ''),
      title: (titleMatch ? titleMatch[1] : f).toLowerCase(),
      content: text.toLowerCase(),
      filePath,
    });
  });
});

// 3. Map Keywords to Articles
console.log(`Loaded ${keywordsData.length} keywords and ${articles.length} articles.`);

const mapping: Record<string, {
  keyword: string;
  impressions: number;
  matchingArticles: { slug: string; inTitle: boolean; occurrences: number }[];
}> = {};

keywordsData.forEach(kw => {
  mapping[kw.keyword] = {
    keyword: kw.keyword,
    impressions: kw.impressions,
    matchingArticles: [],
  };

  articles.forEach(art => {
    const inTitle = art.title.includes(kw.keyword) || art.slug.replace(/-/g, ' ').includes(kw.keyword);
    // count occurrences
    const regex = new RegExp(kw.keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
    const occurrences = (art.content.match(regex) || []).length;

    if (inTitle || occurrences > 0) {
      mapping[kw.keyword].matchingArticles.push({
        slug: `${art.collection}/${art.slug}`,
        inTitle,
        occurrences,
      });
    }
  });

  // Sort matching articles by relevance (title match first, then occurrences)
  mapping[kw.keyword].matchingArticles.sort((a, b) => {
    if (a.inTitle && !b.inTitle) return -1;
    if (!a.inTitle && b.inTitle) return 1;
    return b.occurrences - a.occurrences;
  });
});

// 4. Output complete list of keywords
console.log('=== ALL BING KEYWORDS SORTED BY IMPRESSIONS ===');
keywordsData.forEach((k, idx) => {
  console.log(`${idx + 1}. "${k.keyword}" (Impressions: ${k.impressions})`);
});

