import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.join(process.cwd(), 'public', 'images');

async function processImages() {
  const files = fs.readdirSync(imagesDir);
  console.log(`Analyzing ${files.length} image files in public/images...`);

  let convertedCount = 0;
  let savedBytes = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(imagesDir, file);

    if (!fs.existsSync(filePath)) continue;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) continue;

    // Process heavy WebP files larger than 150KB
    if (ext === '.webp' && stat.size > 150000) {
      try {
        const fileBuffer = fs.readFileSync(filePath);
        const metadata = await sharp(fileBuffer).metadata();
        let pipeline = sharp(fileBuffer);

        // Resize max width to 1000px if larger
        if (metadata.width && metadata.width > 1000) {
          pipeline = pipeline.resize({ width: 1000, withoutEnlargement: true });
        }

        // Compress as WebP quality 75
        const buffer = await pipeline.webp({ quality: 75, effort: 6 }).toBuffer();

        const oldSize = stat.size;
        const newSize = buffer.length;

        if (newSize < oldSize) {
          fs.writeFileSync(filePath, buffer);
          convertedCount++;
          const saved = oldSize - newSize;
          savedBytes += Math.max(0, saved);
          console.log(`Optimized ${file}: ${(oldSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB (Saved ${((saved / oldSize) * 100).toFixed(1)}%)`);
        }
      } catch (err: any) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
  }

  console.log(`\n🎉 Completed WebP optimization! Optimized ${convertedCount} WebP images, saved ${(savedBytes / 1024 / 1024).toFixed(2)} MB total!`);
}

processImages();
