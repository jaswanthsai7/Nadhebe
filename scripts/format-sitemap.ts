import fs from 'fs';
import path from 'path';

function getAllHtmlUrls(dir: string, baseDir: string): string[] {
  const urls: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      urls.push(...getAllHtmlUrls(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      if (relPath === '404.html' || relPath.endsWith('/404/index.html')) {
        continue;
      }
      let url = 'https://nadhebe.com/';
      if (relPath !== 'index.html') {
        if (relPath.endsWith('/index.html')) {
          url = `https://nadhebe.com/${relPath.slice(0, -11)}/`;
        } else {
          url = `https://nadhebe.com/${relPath.slice(0, -5)}/`;
        }
      }
      urls.push(url);
    }
  }
  return urls;
}

function run() {
  console.log('Auditing and formatting sitemap XML files...');
  const distDir = path.join(process.cwd(), 'dist');
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory not found.');
    return;
  }

  // 1. Collect all HTML URLs built in dist
  const allSiteUrls = getAllHtmlUrls(distDir, distDir);
  console.log(`Found ${allSiteUrls.length} total HTML pages in dist.`);

  // 2. Ensure all URLs are present in sitemap-0.xml
  const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
  if (fs.existsSync(sitemap0Path)) {
    let sitemapXml = fs.readFileSync(sitemap0Path, 'utf-8');
    
    const existingLocs = new Set<string>();
    const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
    let match;
    while ((match = locRegex.exec(sitemapXml)) !== null) {
      existingLocs.add(match[1].trim());
    }

    const missingUrls = allSiteUrls.filter(url => !existingLocs.has(url));
    if (missingUrls.length > 0) {
      console.log(`Injecting ${missingUrls.length} missing URLs into sitemap-0.xml...`);
      const nowISO = new Date().toISOString();
      const newEntries = missingUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${nowISO}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

      sitemapXml = sitemapXml.replace('</urlset>', `${newEntries}\n</urlset>`);
      fs.writeFileSync(sitemap0Path, sitemapXml, 'utf-8');
      console.log(`Successfully added all ${missingUrls.length} missing URLs to sitemap-0.xml!`);
    }
  }

  // 3. Ensure public/sitemap.xsl is copied to dist/sitemap.xsl
  const publicXsl = path.join(process.cwd(), 'public', 'sitemap.xsl');
  const distXsl = path.join(distDir, 'sitemap.xsl');
  if (fs.existsSync(publicXsl)) {
    fs.copyFileSync(publicXsl, distXsl);
  }

  // 4. Format all sitemap XML files
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
