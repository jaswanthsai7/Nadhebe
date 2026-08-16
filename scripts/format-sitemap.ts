import fs from 'fs';
import path from 'path';

function isHtmlNoindexed(filePath: string): boolean {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    // Check for robots meta with noindex
    const hasRobotsNoindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(content) ||
                             /<meta[^>]+content=["'][^"']*noindex[^"']*["'][^>]+name=["']robots["']/i.test(content);
    return hasRobotsNoindex;
  } catch (e) {
    return false;
  }
}

function getAllIndexableHtmlUrls(dir: string, baseDir: string): string[] {
  const urls: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      urls.push(...getAllIndexableHtmlUrls(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      if (relPath === '404.html' || relPath.endsWith('/404/index.html')) {
        continue;
      }

      // Check if page has noindex meta directive
      if (isHtmlNoindexed(fullPath)) {
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

function urlToDistHtmlPath(url: string, distDir: string): string {
  try {
    const parsed = new URL(url);
    let pathname = parsed.pathname;
    if (pathname.endsWith('/')) {
      pathname += 'index.html';
    } else if (!pathname.endsWith('.html')) {
      pathname += '/index.html';
    }
    return path.join(distDir, pathname.replace(/^\//, ''));
  } catch (e) {
    return '';
  }
}

function run() {
  console.log('Auditing and formatting sitemap XML files (filtering noindex routes)...');
  const distDir = path.join(process.cwd(), 'dist');
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(distDir)) {
    console.error('Dist directory not found.');
    return;
  }

  // 1. Collect only indexable HTML URLs built in dist
  const indexableUrls = getAllIndexableHtmlUrls(distDir, distDir);
  console.log(`Found ${indexableUrls.length} indexable high-value HTML pages in dist (noindex excluded).`);

  // 2. Build or clean sitemap-0.xml
  const sitemap0Path = path.join(distDir, 'sitemap-0.xml');
  const nowISO = new Date().toISOString();

  // Create clean sitemap XML with only indexable pages
  const urlEntries = indexableUrls.map(url => {
    let priority = '0.7';
    let changefreq = 'weekly';
    if (url === 'https://nadhebe.com/') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (url.includes('/tutorials/') || url.includes('/guides/') || url.includes('/news/')) {
      priority = '0.9';
    } else if (url.includes('/tools/')) {
      priority = '0.8';
    }
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${nowISO}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  fs.writeFileSync(sitemap0Path, sitemapXml, 'utf-8');
  console.log(`Successfully generated clean sitemap-0.xml with ${indexableUrls.length} verified indexable URLs.`);

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

  // Ensure index.json in public is copied to dist
  const publicIndexJson = path.join(publicDir, 'index.json');
  const distIndexJson = path.join(distDir, 'index.json');
  if (fs.existsSync(publicIndexJson)) {
    fs.copyFileSync(publicIndexJson, distIndexJson);
  }

  // 5. Ensure sitemap-index.xml references all sitemaps properly
  const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
  if (fs.existsSync(sitemapIndexPath)) {
    let indexXml = fs.readFileSync(sitemapIndexPath, 'utf-8');
    
    const requiredSitemaps = [
      'https://nadhebe.com/sitemap-0.xml',
      'https://nadhebe.com/sitemap-image.xml',
      'https://nadhebe.com/sitemap-video.xml'
    ];

    requiredSitemaps.forEach(sUrl => {
      if (!indexXml.includes(`<loc>${sUrl}</loc>`)) {
        console.log(`Injecting ${sUrl} into sitemap-index.xml...`);
        const entry = `  <sitemap>\n    <loc>${sUrl}</loc>\n    <lastmod>${nowISO}</lastmod>\n  </sitemap>`;
        indexXml = indexXml.replace('</sitemapindex>', `${entry}\n</sitemapindex>`);
      }
    });

    fs.writeFileSync(sitemapIndexPath, indexXml, 'utf-8');
    const publicIndexPath = path.join(publicDir, 'sitemap-index.xml');
    fs.writeFileSync(publicIndexPath, indexXml, 'utf-8');
  }

  console.log('Sitemap formatting complete!');
}

run();
