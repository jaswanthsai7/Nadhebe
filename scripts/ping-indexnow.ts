import fs from 'fs';
import path from 'path';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '4d98a2f7c03e4b1a8d562f790c1e8a9f';
const HOST = 'nadhebe.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

async function run() {
  console.log('Running IndexNow notification script...');
  const sitemapPath = path.join(process.cwd(), 'dist', 'sitemap-0.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.log('sitemap-0.xml not found. Skipping IndexNow ping.');
    return;
  }

  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const locRegex = /<loc>(https:\/\/nadhebe\.com\/[^<]+)<\/loc>/g;
  const urls: string[] = [];
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }

  if (urls.length === 0) {
    console.log('No URLs found in sitemap for IndexNow.');
    return;
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls.slice(0, 10000) // IndexNow max limit per request
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 200 || res.status === 202) {
      console.log(`IndexNow ping successful (Status: ${res.status})! Submitted ${urls.length} URLs.`);
    } else {
      console.warn(`IndexNow ping returned status ${res.status}: ${await res.text()}`);
    }
  } catch (err) {
    console.error('IndexNow ping error (non-fatal):', err);
  }
}

run();
