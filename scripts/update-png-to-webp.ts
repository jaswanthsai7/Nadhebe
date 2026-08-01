import fs from 'fs';
import path from 'path';

function replaceInDir(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      replaceInDir(fullPath);
    } else if (entry.isFile() && (fullPath.endsWith('.md') || fullPath.endsWith('.astro') || fullPath.endsWith('.ts'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('.png')) {
        const updated = content.replace(/\/images\/([^"'\s)]+)\.png/g, '/images/$1.webp');
        if (updated !== content) {
          fs.writeFileSync(fullPath, updated, 'utf8');
          console.log(`Updated PNG -> WebP in: ${path.relative(process.cwd(), fullPath)}`);
        }
      }
    }
  }
}

replaceInDir(path.join(process.cwd(), 'src'));
