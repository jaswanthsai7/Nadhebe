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
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
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
  ];

  folders.forEach(({ dir, urlPrefix }) => {
    const folderPath = path.join(contentDir, dir);
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach(file => {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const filePath = path.join(folderPath, file);
          const meta = parseFrontmatter(filePath);
          const slug = file.replace(/\.(md|mdx)$/, '');
          
          if (meta.title) {
            articles.push({
              title: meta.title,
              slug: slug,
              url: `${urlPrefix}/${slug}`,
              topic: meta.topic,
              isPillar: meta.isPillar === true,
              parentPillar: meta.parentPillar,
            });
          }
        }
      });
    }
  });

  return articles;
}

function run() {
  console.log('Running build-time internal linker...');
  const articles = getArticles();
  console.log(`Found ${articles.length} articles in content folders.`);

  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory does not exist! Please run npm run build first.');
    return;
  }

  let filesLinked = 0;

  walkDir(distDir, (filePath) => {
    if (!filePath.endsWith('.html')) return;

    let html = fs.readFileSync(filePath, 'utf-8');
    
    // Find the main content area (e.g. within `<article>` tag)
    const articleRegex = /<article([^>]*)>([\s\S]+?)<\/article>/;
    const match = html.match(articleRegex);
    if (!match) return;

    const attributes = match[1];
    const originalContent = match[2];

    // Determine current article from filename/path
    const relativeUrl = filePath
      .replace(distDir, '')
      .replace(/\\/g, '/')
      .replace(/\/index\.html$/, '')
      .replace(/\.html$/, '');

    const currentArticle = articles.find(a => a.url === relativeUrl);

    // Build list of target articles for linking
    // Only link to articles in the same topic/cluster, excluding the current article itself
    let targets = articles.filter(a => a.url !== relativeUrl);
    if (currentArticle && currentArticle.topic) {
      // Prioritize same topic articles
      targets = targets.filter(a => a.topic?.toLowerCase() === currentArticle.topic?.toLowerCase());
    } else {
      // If not in a topic, don't auto-link to restrict keyword cannibalization
      return;
    }

    if (targets.length === 0) return;

    // Run auto-linking on article body content
    const linkTargets = targets.map(t => ({ title: t.title, url: t.url }));
    const linkedContent = autoLinkArticles(originalContent, linkTargets);

    if (linkedContent !== originalContent) {
      html = html.replace(articleRegex, `<article${attributes}>${linkedContent}</article>`);
      fs.writeFileSync(filePath, html, 'utf-8');
      filesLinked++;
    }
  });

  console.log(`Internal linker complete. Injected contextual links into ${filesLinked} HTML files.`);
}

run();
