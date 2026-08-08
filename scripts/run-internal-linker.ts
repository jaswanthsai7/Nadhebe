import fs from 'fs';
import path from 'path';
import { autoLinkArticles } from '../src/utils/internalLinker';

interface ArticleData {
  title: string;
  slug: string;
  url: string;
  topic?: string;
  isPillar: boolean;
  parentPillar?: string;
}

// Simple recursive file walk
function walkDir(dir: string, callback: (filePath: string) => void) {
  if (!fs.existsSync(dir) || dir.includes('pagefind')) return;
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f);
    if (!fs.existsSync(dirPath) || dirPath.includes('pagefind')) return;
    let isDirectory = false;
    try {
      isDirectory = fs.statSync(dirPath).isDirectory();
    } catch (_) {
      return;
    }
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

// Simple YAML frontmatter parser
function parseFrontmatter(filePath: string): any {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (!match) return {};
  const yaml = match[1];
  const obj: any = {};
  yaml.split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (val === 'true') {
        obj[key] = true;
      } else if (val === 'false') {
        obj[key] = false;
      } else {
        obj[key] = val;
      }
    }
  });
  return obj;
}

function getArticles(): ArticleData[] {
  const articles: ArticleData[] = [];
  const contentDir = path.join(process.cwd(), 'src/content');

  const folders = [
    { dir: 'news', urlPrefix: '/news' },
    { dir: 'tutorials', urlPrefix: '/tutorials' },
    { dir: 'youtube-articles', urlPrefix: '/youtube' },
    { dir: 'tool-reviews', urlPrefix: '/reviews' },
    { dir: 'prompts', urlPrefix: '/prompts' },
    { dir: 'comparisons', urlPrefix: '/comparisons' },
    { dir: 'best-practices', urlPrefix: '/best-practices' },
    { dir: 'use-cases', urlPrefix: '/use-cases' },
    { dir: 'tools', urlPrefix: '/tools' },
    { dir: 'guides', urlPrefix: '/guides' },
    { dir: 'frameworks', urlPrefix: '/frameworks' },
    { dir: 'case-studies', urlPrefix: '/case-studies' },
  ];

  folders.forEach(({ dir, urlPrefix }) => {
    const targetDir = path.join(contentDir, dir);
    walkDir(targetDir, (filePath) => {
      if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
        const fm = parseFrontmatter(filePath);
        const fileName = path.basename(filePath, path.extname(filePath));
        const slug = fm.slug || fileName;
        const url = `${urlPrefix}/${slug}`;
        articles.push({
          title: fm.title || slug,
          slug,
          url,
          topic: fm.topic,
          isPillar: !!fm.isPillar,
          parentPillar: fm.parentPillar,
        });
      }
    });
  });

  return articles;
}

function run() {
  console.log('Running build-time internal linker...');
  const articles = getArticles();
  console.log(`Found ${articles.length} articles in content folders.`);

  const targets = articles.map((a) => ({
    title: a.title,
    url: a.url,
  }));

  const distDir = path.join(process.cwd(), 'dist');
  let updatedCount = 0;

  walkDir(distDir, (filePath) => {
    if (filePath.endsWith('.html')) {
      // Derive current URL relative to distDir
      const relativePath = path.relative(distDir, filePath).replace(/\\/g, '/');
      let currentUrl = '/' + relativePath.replace(/\/index\.html$/, '').replace(/\.html$/, '');
      if (currentUrl === '/index') currentUrl = '/';

      try {
        const html = fs.readFileSync(filePath, 'utf-8');
        const linkedHtml = autoLinkArticles(html, targets, currentUrl);

        if (linkedHtml !== html) {
          fs.writeFileSync(filePath, linkedHtml, 'utf-8');
          updatedCount++;
        }
      } catch (_) {}
    }
  });

  console.log(`Internal linker complete. Injected contextual links into ${updatedCount} HTML files.`);
}

run();
