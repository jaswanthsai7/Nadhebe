import fs from 'fs';

const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
const matches = Array.from(sitemap.matchAll(/<loc>(https:\/\/nadhebe\.com\/[^<]+)<\/loc>/g));
const urls = matches.map(m => m[1]);

console.log('TOTAL VALID SITEMAP URLS:', urls.length);
console.log(JSON.stringify(urls, null, 2));
