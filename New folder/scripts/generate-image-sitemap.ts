import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://example.com'; // Fallback site URL

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

function run() {
  console.log('Generating image sitemap...');
  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    console.error('Dist folder not found. Cannot generate image sitemap.');
    return;
  }

  const entries: { loc: string; images: string[] }[] = [];

  walkDir(distDir, (filePath) => {
    if (!filePath.endsWith('.html')) return;

    const html = fs.readFileSync(filePath, 'utf-8');
    
    // Determine the page URL
    const relativePath = filePath
      .replace(distDir, '')
      .replace(/\\/g, '/')
      .replace(/\/index\.html$/, '')
      .replace(/\.html$/, '');

    const pageUrl = `${SITE_URL}${relativePath === '' ? '/' : relativePath}`;

    // Extract all image tags
    const images: string[] = [];
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
      const src = match[1];
      if (src && !src.startsWith('data:')) {
        let fullSrc = src;
        if (src.startsWith('/')) {
          fullSrc = `${SITE_URL}${src}`;
        } else if (!src.startsWith('http')) {
          fullSrc = `${SITE_URL}/${src}`;
        }
        if (!images.includes(fullSrc)) {
          images.push(fullSrc);
        }
      }
    }

    if (images.length > 0) {
      entries.push({ loc: pageUrl, images });
    }
  });

  // Construct XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  entries.forEach(entry => {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    entry.images.forEach(img => {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${img}</image:loc>\n`;
      xml += `    </image:image>\n`;
    });
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  const outputPath = path.join(distDir, 'sitemap-image.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`Image sitemap generated with ${entries.length} URLs at dist/sitemap-image.xml`);
}

run();
