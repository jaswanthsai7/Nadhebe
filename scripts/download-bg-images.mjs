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
  'photo-1476514525535-07fb3b4ae5f1', // Mountain lake
  'photo-1472214103451-9374bd1c798e', // Majestic mountains
  'photo-1447752875215-b2761acb3c5d', // Nature landscape
  'photo-1464822759023-fed622ff2c3b', // Snowy peaks
  'photo-1426604966848-d7adac402bff', // Forest trail
  'photo-1511884642898-4c92249e20b6', // Sunset water
  'photo-1475924156734-496f6cac6ec1', // Mountains dawn
  'photo-1433838552652-f9a46b332c40', // Balloon mountains
  'photo-1501785888041-af3ef285b470'  // Mountains dusk
];

const targetDir = path.join(__dirname, '..', 'public', 'images', 'bg');
const mobileDir = path.join(targetDir, 'mobile');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(mobileDir)) fs.mkdirSync(mobileDir, { recursive: true });

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
  console.log(`Downloading ${photos.length} desktop & mobile nature background photos in ULTRA 4K quality...`);
  
  for (let i = 0; i < photos.length; i++) {
    const photoId = photos[i];
    // Fetch as high-quality JPG to avoid double WebP compression artifacts
    const unsplashUrl = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=3840&q=100&fm=jpg`;
    const destPath = path.join(targetDir, `bg-${i + 1}.webp`);
    const mobPath = path.join(mobileDir, `bg-${i + 1}.webp`);
    
    try {
      console.log(`Fetching photo ${i + 1}/${photos.length}: ${photoId}...`);
      const rawBuf = await fetchBuffer(unsplashUrl);
      
      // Desktop background (4K: 3840x2160) - Maximize Realism
      const optBuf = await sharp(rawBuf)
        .resize(3840, 2160, { fit: 'cover' })
        .sharpen() // Crisp up details for 4K displays
        .webp({ quality: 95, effort: 6 }) // Near-lossless WebP
        .toBuffer();
      fs.writeFileSync(destPath, optBuf);

      // Mobile background (640x1138)
      const mobBuf = await sharp(rawBuf)
        .resize(640, 1138, { fit: 'cover' })
        .sharpen()
        .webp({ quality: 85, effort: 6 })
        .toBuffer();
      fs.writeFileSync(mobPath, mobBuf);

      console.log(`✅ Saved bg-${i + 1}.webp (Desktop: ${Math.round(optBuf.length / 1024)}KB | Mobile: ${Math.round(mobBuf.length / 1024)}KB)`);
    } catch (err) {
      console.error(`❌ Failed bg-${i + 1}.webp:`, err.message);
    }
  }
  console.log('\nAll local background images (desktop + mobile) generated successfully!');
}

main();
