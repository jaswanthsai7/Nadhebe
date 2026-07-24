import fs from 'fs';
import path from 'path';

const contentDir = 'src/content';
const publicDir = 'public';

function checkDir(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'authors') {
      checkDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const match = content.match(/heroImage:\s*["']?([^"'\r\n]+)["']?/);
      if (match) {
        const imgPath = match[1].trim();
        if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
          console.log('REMOTE:', entry.name, '->', imgPath);
        } else {
          const localFile = path.join(publicDir, imgPath.replace(/^\//, ''));
          if (!fs.existsSync(localFile)) {
            console.log('MISSING:', entry.name, '->', imgPath);
          } else {
            console.log('OK:', entry.name, '->', imgPath);
          }
        }
      } else {
        console.log('NO HERO:', entry.name);
      }
    }
  }
}

checkDir(contentDir);
