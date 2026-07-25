import fs from 'fs';
import path from 'path';

const contentDir = 'src/content';
const collections = fs.readdirSync(contentDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'authors')
  .map(d => d.name);

let total = 0;
const breakdown: Record<string, number> = {};
const allArticles: any[] = [];

collections.forEach(col => {
  const colPath = path.join(contentDir, col);
  const files = fs.readdirSync(colPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  breakdown[col] = files.length;
  total += files.length;
  
  files.forEach(f => {
    const text = fs.readFileSync(path.join(colPath, f), 'utf8');
    const titleMatch = text.match(/^title:\s*["']?(.+?)["']?\s*$/m);
    const keywordsMatch = text.match(/^keywords:\s*\[([^\]]*)\]/m);
    const canonicalMatch = text.match(/^canonicalUrl:\s*(.+)$/m);
    const faqMatch = text.match(/^faq:/m);
    const sourcesMatch = text.match(/^sources:/m);
    const heroMatch = text.match(/^heroImage:\s*(.+)$/m);
    const draftMatch = /draft:\s*true/i.test(text);
    const descMatch = text.match(/^description:\s*["']?(.+?)["']?\s*$/m);
    const wordCount = text.split(/\s+/).length;
    
    allArticles.push({
      collection: col,
      slug: f.replace(/\.(md|mdx)$/, ''),
      title: titleMatch ? titleMatch[1] : 'MISSING',
      hasKeywords: !!keywordsMatch,
      hasCanonical: !!canonicalMatch,
      hasFaq: !!faqMatch,
      hasSources: !!sourcesMatch,
      hasHero: !!heroMatch,
      isDraft: draftMatch,
      descLength: descMatch ? (descMatch[1] || '').length : 0,
      wordCount,
    });
  });
});

console.log('TOTAL ARTICLES:', total);
console.log('BREAKDOWN:', JSON.stringify(breakdown, null, 2));

const published = allArticles.filter(a => !a.isDraft);
const noKeywords = published.filter(a => !a.hasKeywords);
const noFaq = published.filter(a => !a.hasFaq);
const noSources = published.filter(a => !a.hasSources);
const noHero = published.filter(a => !a.hasHero);
const shortDesc = published.filter(a => a.descLength < 120);
const longDesc = published.filter(a => a.descLength > 160);
const thinContent = published.filter(a => a.wordCount < 800);

console.log('\n=== SEO AUDIT ===');
console.log('Published:', published.length);
console.log('Drafts:', allArticles.filter(a => a.isDraft).length);
console.log('\n--- Content Quality ---');
console.log('Thin content (<800 words):', thinContent.length, thinContent.map(a => a.slug));
console.log('\n--- Frontmatter Completeness ---');
console.log('Missing keywords:', noKeywords.length, noKeywords.slice(0,5).map(a => a.slug));
console.log('Missing FAQ schema:', noFaq.length);
console.log('Missing sources:', noSources.length);
console.log('Missing hero image:', noHero.length, noHero.map(a => a.slug));
console.log('Short meta desc (<120 chars):', shortDesc.length, shortDesc.slice(0,5).map(a => a.slug));
console.log('Long meta desc (>160 chars):', longDesc.length, longDesc.slice(0,5).map(a => a.slug));

// Word count distribution
const avgWords = Math.round(published.reduce((s, a) => s + a.wordCount, 0) / published.length);
const maxWords = Math.max(...published.map(a => a.wordCount));
const minWords = Math.min(...published.map(a => a.wordCount));
console.log('\n--- Word Count Stats ---');
console.log('Average:', avgWords, 'Min:', minWords, 'Max:', maxWords);

// Collection distribution
console.log('\n--- Collection Distribution ---');
Object.entries(breakdown).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
  console.log(`  ${k}: ${v} articles`);
});
