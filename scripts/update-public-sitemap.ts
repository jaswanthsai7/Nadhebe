import fs from 'fs';
import path from 'path';

function updateSitemap() {
  const distSitemap0 = path.join(process.cwd(), 'dist', 'sitemap-0.xml');
  const distSitemapIndex = path.join(process.cwd(), 'dist', 'sitemap-index.xml');
  
  const publicSitemap0 = path.join(process.cwd(), 'public', 'sitemap-0.xml');
  const publicSitemapIndex = path.join(process.cwd(), 'public', 'sitemap-index.xml');

  if (fs.existsSync(distSitemap0)) {
    fs.copyFileSync(distSitemap0, publicSitemap0);
    console.log('Copied dist/sitemap-0.xml to public/sitemap-0.xml');
  }

  if (fs.existsSync(distSitemapIndex)) {
    fs.copyFileSync(distSitemapIndex, publicSitemapIndex);
    console.log('Copied dist/sitemap-index.xml to public/sitemap-index.xml');
  }
}

updateSitemap();
