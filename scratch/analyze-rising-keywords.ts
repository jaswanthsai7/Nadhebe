import fs from 'fs';
import path from 'path';

const contentDir = 'src/content';
const csvPath = 'C:\\Users\\jasva\\Downloads\\searched_with_rising-searches_US_20250725-1155_20260725-1155.csv';

// Read CSV
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n').filter(l => l.trim());
const queries: { query: string; interest: string; increase: string }[] = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(p => p.replace(/^"|"$/g, '').trim());
  if (parts.length >= 3) {
    queries.push({ query: parts[0], interest: parts[1], increase: parts[2] });
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

console.log(`=== RISING SEARCH ANALYZER ===`);
console.log(`Total Rising Queries: ${queries.length}`);
console.log(`Total Existing Content Files: ${mdFiles.length}`);

// Map queries against existing content titles, slugs, and keywords
const matches: { query: string; increase: string; matchedFile?: string; matchType?: string }[] = [];
const unmapped: typeof queries = [];

queries.forEach(q => {
  let found = false;
  const qLower = q.query.toLowerCase();
  
  // Skip non-relevant non-tech queries if any (e.g. claude lemieux)
  if (qLower.includes('lemieux') || qLower.includes('guillemot')) return;

  for (const file of mdFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const fileName = path.basename(file, '.md');
    
    if (fileName.toLowerCase().includes(qLower.replace(/\s+/g, '-')) || content.toLowerCase().includes(qLower)) {
      matches.push({ query: q.query, increase: q.increase, matchedFile: file, matchType: 'content/title' });
      found = true;
      break;
    }
  }

  if (!found) {
    unmapped.push(q);
  }
});

console.log(`\n--- MAPPED QUERIES (${matches.length}) ---`);
matches.forEach(m => console.log(`✓ "${m.query}" (${m.increase}) -> ${path.basename(m.matchedFile || '')}`));

console.log(`\n--- UNMAPPED RISING OPPORTUNITIES (${unmapped.length}) ---`);
unmapped.forEach(u => console.log(`★ "${u.query}" (Interest: ${u.interest}, Growth: ${u.increase})`));
