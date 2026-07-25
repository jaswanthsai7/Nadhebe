import fs from 'fs';
import path from 'path';

function run() {
  console.log('Formatting sitemap XML files with XSL stylesheet...');
  const distDir = path.join(process.cwd(), 'dist');
  const publicDir = path.join(process.cwd(), 'public');
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
    
    // Copy formatted sitemaps to public folder as well
    const publicFilePath = path.join(process.cwd(), 'public', file);
    fs.writeFileSync(publicFilePath, xml, 'utf-8');
    
    console.log(`Formatted and synced ${file}`);
  });

  // Ensure all root .txt files in public are copied to dist
  const publicTxtFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.txt'));
  publicTxtFiles.forEach(file => {
    const src = path.join(publicDir, file);
    const dest = path.join(distDir, file);
    fs.copyFileSync(src, dest);
  });

  // Inject image and video sitemaps into sitemap-index.xml
  const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
  if (fs.existsSync(sitemapIndexPath)) {
    let indexXml = fs.readFileSync(sitemapIndexPath, 'utf-8');
    const extraSitemaps: string[] = [];
    if (!indexXml.includes('sitemap-image.xml')) {
      extraSitemaps.push('<sitemap><loc>https://nadhebe.com/sitemap-image.xml</loc></sitemap>');
    }
    if (!indexXml.includes('sitemap-video.xml')) {
      extraSitemaps.push('<sitemap><loc>https://nadhebe.com/sitemap-video.xml</loc></sitemap>');
    }
    if (extraSitemaps.length > 0) {
      indexXml = indexXml.replace('</sitemapindex>', extraSitemaps.join('\n') + '\n</sitemapindex>');
      fs.writeFileSync(sitemapIndexPath, indexXml, 'utf-8');
      const publicIndexPath = path.join(process.cwd(), 'public', 'sitemap-index.xml');
      fs.writeFileSync(publicIndexPath, indexXml, 'utf-8');
      console.log('Injected image and video sitemaps into sitemap-index.xml');
    }
  }

  console.log('Sitemap formatting complete!');
}

run();
