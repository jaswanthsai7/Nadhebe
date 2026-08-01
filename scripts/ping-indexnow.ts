import fs from 'fs';
import path from 'path';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '4d98a2f7c03e4b1a8d562f790c1e8a9f';
const HOST = 'nadhebe.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const BING_API_KEY = process.env.BING_API_KEY;

async function verifyKeyFile(): Promise<boolean> {
  try {
    const res = await fetch(KEY_LOCATION, { method: 'GET' });
    if (res.ok) {
      const text = await res.text();
      if (text.trim() === INDEXNOW_KEY) {
        console.log('IndexNow key file verified at live domain.');
        return true;
      }
      console.warn(`IndexNow key file mismatch. Expected "${INDEXNOW_KEY}", got "${text.trim()}"`);
    } else {
      console.warn(`IndexNow key file not reachable (HTTP ${res.status}). Skipping submission — deploy the site first.`);
    }
  } catch (err) {
    console.warn('IndexNow key file fetch failed (network error). Skipping submission.');
  }
  return false;
}

async function run() {
  console.log('Running IndexNow & Bing URL submission script...');
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

  // Verify key is accessible at the live domain before submitting
  const keyVerified = await verifyKeyFile();
  if (!keyVerified) {
    console.log(`Skipped IndexNow submission. Re-run "npx tsx scripts/ping-indexnow.ts" after deployment is live.`);
    return;
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow & Bing...`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls.slice(0, 10000)
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 200 || res.status === 202) {
        console.log(`Successfully submitted to ${endpoint} (Status: ${res.status})!`);
      } else {
        const errText = await res.text();
        console.warn(`Submission to ${endpoint} returned status ${res.status}: ${errText}`);
      }
    } catch (err) {
      console.error(`Error pinging ${endpoint}:`, err);
    }
  }

  if (BING_API_KEY) {
    try {
      const bingRes = await fetch(`https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${BING_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          siteUrl: `https://${HOST}`,
          urlList: urls.slice(0, 500)
        })
      });
      if (bingRes.ok) {
        console.log(`Bing Webmaster Submission API successful (Status: ${bingRes.status})!`);
      } else {
        console.warn(`Bing Webmaster Submission API returned status ${bingRes.status}: ${await bingRes.text()}`);
      }
    } catch (err) {
      console.error('Bing Webmaster Submission API error:', err);
    }
  }
}

run();


async function run() {
  console.log('Running IndexNow & Bing URL submission script...');
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

  console.log(`Submitting ${urls.length} URLs to IndexNow & Bing...`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls.slice(0, 10000)
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      if (res.status === 200 || res.status === 202) {
        console.log(`Successfully submitted to ${endpoint} (Status: ${res.status})!`);
      } else {
        const errText = await res.text();
        console.warn(`Submission to ${endpoint} returned status ${res.status}: ${errText}`);
      }
    } catch (err) {
      console.error(`Error pinging ${endpoint}:`, err);
    }
  }

  if (BING_API_KEY) {
    try {
      const bingRes = await fetch(`https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${BING_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          siteUrl: `https://${HOST}`,
          urlList: urls.slice(0, 500)
        })
      });
      if (bingRes.ok) {
        console.log(`Bing Webmaster Submission API successful (Status: ${bingRes.status})!`);
      } else {
        console.warn(`Bing Webmaster Submission API returned status ${bingRes.status}: ${await bingRes.text()}`);
      }
    } catch (err) {
      console.error('Bing Webmaster Submission API error:', err);
    }
  }
}

run();
