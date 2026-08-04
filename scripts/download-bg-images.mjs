import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photos = [
  'photo-1507525428034-b723cf961d3e', // Ocean beach
  'photo-1441974231531-c6227db76b6e', // Forest sun
  'photo-1505118380757-91f5f5632de0', // Calm sea
  'photo-1534067783941-51c9c23ecefd', // Mountains mist
  'photo-1470071459604-3b5ec3a7fe05', // Foggy forest
  'photo-1500382017468-9049fed747ef', // Green meadow
  'photo-1439066615861-d1af74d74000', // Lake reflection
  'photo-1518495973542-4542c06a5843', // Sunlight tree
  'photo-1448375240586-882707db888b', // Pine forest
  'photo-1506973035872-a4ec16b8e8d9', // Blue ocean
  'photo-1544551763-46a013bb70d5', // Waterfall
  'photo-1476514525535-07fb3b4ae5f1'  // Mountain lake
];

const targetDir = path.join(__dirname, '..', 'public', 'images', 'bg');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed status ${res.statusCode} for ${url}`));
      }
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

async function main() {
  console.log(`Downloading ${photos.length} nature background photos to local directory...`);
  
  for (let i = 0; i < photos.length; i++) {
    const photoId = photos[i];
    const unsplashUrl = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1920&q=80&fm=webp`;
    const destPath = path.join(targetDir, `bg-${i + 1}.webp`);
    
    try {
      console.log(`Fetching photo ${i + 1}/${photos.length}: ${photoId}...`);
      const rawBuf = await fetchBuffer(unsplashUrl);
      
      // Compress and resize with sharp for ultra-fast local loading (~150KB per background)
      const optBuf = await sharp(rawBuf)
        .resize(1920, 1080, { fit: 'cover' })
        .webp({ quality: 80, effort: 4 })
        .toBuffer();
        
      fs.writeFileSync(destPath, optBuf);
      console.log(`✅ Saved bg-${i + 1}.webp (${Math.round(optBuf.length / 1024)}KB)`);
    } catch (err) {
      console.error(`❌ Failed bg-${i + 1}.webp:`, err.message);
    }
  }
  console.log('\nAll local background images downloaded and optimized!');
}

main();
