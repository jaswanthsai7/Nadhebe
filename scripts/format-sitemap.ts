import fs from 'fs';
import path from 'path';

function run() {
  console.log('Formatting sitemap XML files with XSL stylesheet...');
  const distDir = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory not found.');
    return;
  }

  // Ensure public/sitemap.xsl is copied to dist/sitemap.xsl
  const publicXsl = path.join(process.cwd(), 'public', 'sitemap.xsl');
  const distXsl = path.join(distDir, 'sitemap.xsl');
  if (fs.existsSync(publicXsl)) {
    fs.copyFileSync(publicXsl, distXsl);
  }

  const sitemapFiles = fs.readdirSync(distDir).filter(f => f.startsWith('sitemap') && f.endsWith('.xml'));

  sitemapFiles.forEach(file => {
    const filePath = path.join(distDir, file);
    let xml = fs.readFileSync(filePath, 'utf-8');

    // Inject stylesheet reference if missing
    if (!xml.includes('xml-stylesheet')) {
      xml = xml.replace('<?xml version="1.0" encoding="UTF-8"?>', '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>');
    }

    // Format tags with newlines for human readability & proper XML structure
    xml = xml.replace(/><url>/g, '>\n<url>').replace(/><sitemap>/g, '>\n<sitemap>').replace(/><\/urlset>/g, '>\n</urlset>').replace(/><\/sitemapindex>/g, '>\n</sitemapindex>');

    fs.writeFileSync(filePath, xml, 'utf-8');
    console.log(`Formatted ${file}`);
  });

  console.log('Sitemap formatting complete!');
}

run();
