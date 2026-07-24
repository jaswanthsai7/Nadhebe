import fs from 'fs';
import path from 'path';

const csvPath = 'C:\\Users\\jasva\\Downloads\\KeywordStats_7_24_2026.csv';
const contentDir = 'src/content';

// Read all existing articles
const collections = fs.readdirSync(contentDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'authors')
  .map(d => d.name);

interface Article {
  file: string;
  collection: string;
  slug: string;
  url: string;
  title: string;
  topic: string;
  tags: string[];
}

const existingArticles: Article[] = [];
collections.forEach(col => {
  const colPath = path.join(contentDir, col);
  const files = fs.readdirSync(colPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  files.forEach(f => {
    const raw = fs.readFileSync(path.join(colPath, f), 'utf8');
    if (/draft:\s*true/i.test(raw)) return;
    const titleMatch = raw.match(/title:\s*["']?([^"'\r\n]+)["']?/);
    const topicMatch = raw.match(/topic:\s*["']?([^"'\r\n]+)["']?/);
    const tagsMatch = raw.match(/tags:\s*\[([^\]]+)\]/);
    const slug = f.replace(/\.(md|mdx)$/, '');

    let url = `/${col}/${slug}/`;
    if (col === 'youtube-articles') url = `/youtube/${slug}/`;
    if (col === 'tool-reviews') url = `/reviews/${slug}/`;
    if (col === 'best-practices') url = `/best-practices/${slug}/`;
    if (col === 'use-cases') url = `/use-cases/${slug}/`;
    if (col === 'case-studies') url = `/case-studies/${slug}/`;

    existingArticles.push({
      file: `${col}/${f}`,
      collection: col,
      slug,
      url,
      title: titleMatch ? titleMatch[1].trim() : slug,
      topic: topicMatch ? topicMatch[1].trim() : '',
      tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')) : []
    });
  });
});

// Read and parse CSV
const csvRaw = fs.readFileSync(csvPath, 'utf8');
const lines = csvRaw.split(/\r?\n/).filter(l => l.trim().length > 0);
const header = lines[0];

interface CsvRow {
  keyword: string;
  trends: number[];
  impressions: number;
  intentCategory: string;
  trendClassification: string;
  coverage: string;
  matchedArticle?: string;
  opportunityScore: number;
}

const rows: CsvRow[] = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  // Parse CSV line with quotes: "keyword","[trends]","impressions"
  const match = line.match(/^"([^"]+)","\[([^\]]*)\]","(\d+)"$/);
  if (!match) continue;

  const keyword = match[1].trim().toLowerCase();
  const trendsStr = match[2];
  const impressions = parseInt(match[3], 10);
  const trends = trendsStr ? trendsStr.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n)) : [];

  // Trend classification based on trend array
  let trendClass = '→ STABLE';
  if (trends.length >= 2) {
    const firstHalf = trends.slice(0, Math.floor(trends.length / 2));
    const secondHalf = trends.slice(Math.floor(trends.length / 2));
    const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / (firstHalf.length || 1);
    const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / (secondHalf.length || 1);
    
    const lastPoint = trends[trends.length - 1];
    const prevPoint = trends[trends.length - 2] || lastPoint;

    if (lastPoint > prevPoint * 1.4 && avgSecond > avgFirst * 1.3) {
      trendClass = '🔥 BREAKOUT';
    } else if (avgSecond > avgFirst * 1.15) {
      trendClass = '↑ RISING';
    } else if (avgFirst > avgSecond * 1.15) {
      trendClass = '↓ DECLINING';
    } else if (Math.max(...trends) > avgFirst * 3) {
      trendClass = '⚡ TEMPORARY SPIKE';
    }
  }

  // Intent classification
  let intentCategory = 'INFORMATIONAL';
  if (/login|sign in|log in|entrar|ログイン|клод|gratis|logo|singing|singer|science|corps|halmos|down|app$/i.test(keyword)) {
    intentCategory = 'NAVIGATIONAL / IRRELEVANT';
  } else if (/download|descargar|下载|install|安装/i.test(keyword)) {
    intentCategory = 'DOWNLOAD / INSTALL';
  } else if (/pricing|plans|subscription|free|pro|enterprise/i.test(keyword)) {
    intentCategory = 'PLANS / PRICING';
  } else if (/vs|fable|sonnet|opus|haiku|comparison/i.test(keyword)) {
    intentCategory = 'COMPARISON';
  } else if (/code|agent|cowork|skills|api|console|extension|desktop/i.test(keyword)) {
    intentCategory = 'API / DEVELOPER / AGENT';
  } else if (/how|what is|certification|tutorial|guide/i.test(keyword)) {
    intentCategory = 'TUTORIAL / GUIDE';
  }

  // Existing coverage check
  let coverage = 'NOT COVERED';
  let matchedArticle: string | undefined = undefined;

  for (const art of existingArticles) {
    const artText = `${art.title} ${art.topic} ${art.slug} ${art.tags.join(' ')}`.toLowerCase();
    const kwTokens = keyword.split(/\s+/);
    const allMatch = kwTokens.every(tok => artText.includes(tok));
    if (allMatch) {
      coverage = 'ALREADY TARGETED WELL';
      matchedArticle = art.url;
      break;
    } else if (kwTokens.filter(tok => artText.includes(tok)).length >= Math.ceil(kwTokens.length * 0.6)) {
      coverage = 'PARTIALLY COVERED';
      matchedArticle = art.url;
    }
  }

  // Opportunity Score calculation (out of 100)
  // 25% Impressions, 20% Trend, 20% SERP winnability, 15% Intent, 10% Nadhebe relevance, 10% Info gain
  let score = 0;
  
  // Impressions score (capped at 25)
  if (impressions > 50000) score += 25;
  else if (impressions > 20000) score += 20;
  else if (impressions > 10000) score += 15;
  else score += 10;

  // Trend score
  if (trendClass === '🔥 BREAKOUT') score += 20;
  else if (trendClass === '↑ RISING') score += 18;
  else if (trendClass === '→ STABLE') score += 15;
  else if (trendClass === '⚡ TEMPORARY SPIKE') score += 10;
  else score += 5;

  // Intent score
  if (intentCategory === 'API / DEVELOPER / AGENT' || intentCategory === 'TUTORIAL / GUIDE') score += 15;
  else if (intentCategory === 'DOWNLOAD / INSTALL' || intentCategory === 'COMPARISON' || intentCategory === 'PLANS / PRICING') score += 12;
  else score += 0;

  // Relevance & Info Gain (penalty for non-technical navigational)
  if (intentCategory === 'NAVIGATIONAL / IRRELEVANT') {
    score = Math.floor(score * 0.2); // Heavy penalty
  } else {
    score += 20; // High relevance & info gain for technical developer terms
  }

  rows.push({
    keyword,
    trends,
    impressions,
    intentCategory,
    trendClassification: trendClass,
    coverage,
    matchedArticle,
    opportunityScore: Math.min(100, score)
  });
}

// Sort by Opportunity Score descending
rows.sort((a, b) => b.opportunityScore - a.opportunityScore);

console.log('TOTAL ROWS PARSED:', rows.length);
console.log('TOP 20 SCORE ROWS:', JSON.stringify(rows.slice(0, 20), null, 2));
