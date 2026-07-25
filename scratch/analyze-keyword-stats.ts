import fs from 'fs';
import path from 'path';

const contentDir = 'src/content';
const statsCsvPath = 'C:\\Users\\jasva\\Downloads\\KeywordStats_7_25_2026.csv';

const statsContent = fs.readFileSync(statsCsvPath, 'utf-8');
const lines = statsContent.split('\n').filter(l => l.trim());
const keywords: { keyword: string; impressions: number }[] = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(p => p.replace(/^"|"$/g, '').trim());
  if (parts.length >= 3) {
    const kw = parts[0];
    const imp = parseInt(parts[2] || '0', 10);
    if (kw && !isNaN(imp)) {
      keywords.push({ keyword: kw, impressions: imp });
    }
  }
}

// Find all MD files in src/content
function getMdFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'authors') {
        results = results.concat(getMdFiles(fullPath));
      }
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

const mdFiles = getMdFiles(contentDir);

// Filter non-English & generic queries
const filteredKws = keywords.filter(k => {
  const kw = k.keyword.toLowerCase();
  // Filter CJK / Russian / Arabic non-latin characters
  if (/[\u4e00-\u9fa5\u3040-\u30ff\u0400-\u04FF\u0600-\u06FF]/.test(kw)) return false;
  if (kw.length < 3) return false;
  return true;
});

console.log(`=== KEYWORD STATS ANALYZER ===`);
console.log(`Total High-Volume Keywords: ${filteredKws.length}`);

// Map against existing content
const mapped: { keyword: string; impressions: number; file: string }[] = [];
const unmapped: { keyword: string; impressions: number }[] = [];

filteredKws.forEach(k => {
  let found = false;
  const kwLower = k.keyword.toLowerCase();

  for (const file of mdFiles) {
    const content = fs.readFileSync(file, 'utf-8').toLowerCase();
    if (content.includes(kwLower)) {
      mapped.push({ keyword: k.keyword, impressions: k.impressions, file: path.basename(file) });
      found = true;
      break;
    }
  }

  if (!found) {
    unmapped.push(k);
  }
});

console.log(`\n--- MAPPED KEYWORDS (${mapped.length}) ---`);
mapped.slice(0, 15).forEach(m => console.log(`✓ "${m.keyword}" (${m.impressions.toLocaleString()} imp) -> ${m.file}`));

console.log(`\n--- TOP UNMAPPED HIGH-VOLUME KEYWORDS (${unmapped.length}) ---`);
unmapped.sort((a, b) => b.impressions - a.impressions);
unmapped.forEach(u => console.log(`★ "${u.keyword}" (${u.impressions.toLocaleString()} impressions)`));
