import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://nadhebe.pages.dev';

interface ArticleInfo {
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  pubDate: string;
  content: string;
}

function parseFrontmatter(content: string): { data: any; body: string } {
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (!match) return { data: {}, body: content };
  const yaml = match[1];
  const body = content.slice(match[0].length).trim();
  const data: any = {};
  
  yaml.split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      // clean quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (val === 'true') {
        data[key] = true;
      } else if (val === 'false') {
        data[key] = false;
      } else {
        data[key] = val;
      }
    }
  });
  return { data, body };
}

const folders = [
  { dir: 'news', urlPrefix: '/news', category: 'News' },
  { dir: 'tutorials', urlPrefix: '/tutorials', category: 'Tutorials' },
  { dir: 'youtube-articles', urlPrefix: '/youtube', category: 'YouTube Articles' },
  { dir: 'tool-reviews', urlPrefix: '/reviews', category: 'Tool Reviews' },
  { dir: 'prompts', urlPrefix: '/prompts', category: 'Prompts' },
  { dir: 'comparisons', urlPrefix: '/comparisons', category: 'Comparisons' },
  { dir: 'best-practices', urlPrefix: '/best-practices', category: 'Best Practices' },
  { dir: 'use-cases', urlPrefix: '/use-cases', category: 'Use Cases' },
  { dir: 'tools', urlPrefix: '/tools', category: 'Tools' },
  { dir: 'guides', urlPrefix: '/guides', category: 'Guides' },
  { dir: 'frameworks', urlPrefix: '/frameworks', category: 'Frameworks' },
  { dir: 'case-studies', urlPrefix: '/case-studies', category: 'Case Studies' },
];

function run() {
  console.log('Generating llms.txt, llms-full.txt, and index.json...');
  const contentDir = path.join(process.cwd(), 'src/content');
  const distDir = path.join(process.cwd(), 'dist');
  const publicDir = path.join(process.cwd(), 'public');

  const articles: ArticleInfo[] = [];

  folders.forEach(({ dir, urlPrefix, category }) => {
    const folderPath = path.join(contentDir, dir);
    if (!fs.existsSync(folderPath)) return;

    fs.readdirSync(folderPath).forEach(file => {
      if (file.endsWith('.md') || file.endsWith('.mdx')) {
        const filePath = path.join(folderPath, file);
        const rawContent = fs.readFileSync(filePath, 'utf-8');
        const { data, body } = parseFrontmatter(rawContent);
        const slug = file.replace(/\.(md|mdx)$/, '');

        if (data.title) {
          articles.push({
            title: data.title,
            description: data.description || '',
            url: `${SITE_URL}${urlPrefix}/${slug}`,
            category: category,
            tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
            pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : new Date().toISOString(),
            content: body,
          });
        }
      }
    });
  });

  // Sort articles by publication date descending
  articles.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  // 1. Generate llms.txt
  let llmsTxt = `# Nadhebe — AI Engineering Publication\n\n`;
  llmsTxt += `> Expert tutorials, in-depth reviews, system prompts, and technical comparisons for AI engineers and developers.\n\n`;
  llmsTxt += `## Content Directory\n\n`;

  // Group by category
  const categories = [...new Set(articles.map(a => a.category))];
  categories.forEach(cat => {
    llmsTxt += `### ${cat}\n\n`;
    const catArticles = articles.filter(a => a.category === cat);
    catArticles.forEach(art => {
      llmsTxt += `- [${art.title}](${art.url}): ${art.description}\n`;
    });
    llmsTxt += `\n`;
  });

  // 2. Generate llms-full.txt
  let llmsFullTxt = `# Nadhebe — AI Engineering Publication (Full Content)\n\n`;
  llmsFullTxt += `This document contains the complete content of all published articles on Nadhebe.\n\n`;
  llmsFullTxt += `---\n\n`;

  articles.forEach(art => {
    llmsFullTxt += `# [${art.title}](${art.url})\n\n`;
    if (art.description) {
      llmsFullTxt += `> ${art.description}\n\n`;
    }
    llmsFullTxt += `Category: ${art.category} | Tags: ${art.tags.join(', ')}\n\n`;
    llmsFullTxt += `${art.content}\n\n`;
    llmsFullTxt += `---\n\n`;
  });

  // 3. Generate index.json
  const indexJson = JSON.stringify(
    articles.map(({ title, description, url, category, tags, pubDate }) => ({
      title,
      description,
      url,
      category,
      tags,
      pubDate,
    })),
    null,
    2
  );

  // Write outputs to public/ (so they compile in future builds)
  if (fs.existsSync(publicDir)) {
    fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt, 'utf-8');
    fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
    fs.writeFileSync(path.join(publicDir, 'index.json'), indexJson, 'utf-8');
  }

  // Write outputs directly to dist/ (for immediate postbuild availability)
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'llms.txt'), llmsTxt, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'llms-full.txt'), llmsFullTxt, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'index.json'), indexJson, 'utf-8');
  }

  console.log('llms.txt, llms-full.txt, and index.json generated successfully!');
}

run();
