import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function optimizeImages() {
  console.log('Starting high-clarity image optimization...');

  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const bgDir = path.join(imagesDir, 'bg');
  const mobileBgDir = path.join(bgDir, 'mobile');

  let totalBefore = 0;
  let totalAfter = 0;

  // 1. Optimize Hero Images in public/images/
  const heroFiles = fs.readdirSync(imagesDir).filter(f => {
    const p = path.join(imagesDir, f);
    return fs.statSync(p).isFile() && (f.endsWith('.webp') || f.endsWith('.png'));
  });

  for (const file of heroFiles) {
    const filePath = path.join(imagesDir, file);
    const statBefore = fs.statSync(filePath);
    const sizeBefore = statBefore.size;
    totalBefore += sizeBefore;

    if (sizeBefore > 200 * 1024) {
      try {
        const inputBuf = fs.readFileSync(filePath);
        const buffer = await sharp(inputBuf)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 82, effort: 6 })
          .toBuffer();

        if (buffer.length < sizeBefore) {
          const targetPath = filePath.endsWith('.png') ? filePath.replace(/\.png$/, '.webp') : filePath;
          fs.writeFileSync(targetPath, buffer);
          if (filePath.endsWith('.png') && targetPath !== filePath) {
            try { fs.unlinkSync(filePath); } catch (e) {}
          }
          totalAfter += buffer.length;
          console.log(`Optimized ${file}: ${(sizeBefore / 1024).toFixed(1)} KB -> ${(buffer.length / 1024).toFixed(1)} KB`);
        } else {
          totalAfter += sizeBefore;
        }
      } catch (err: any) {
        console.error(`Error processing ${file}:`, err.message);
        totalAfter += sizeBefore;
      }
    } else {
      totalAfter += sizeBefore;
    }
  }

  // 2. Optimize Desktop Background Images in public/images/bg/
  if (fs.existsSync(bgDir)) {
    const bgFiles = fs.readdirSync(bgDir).filter(f => f.endsWith('.webp'));
    for (const file of bgFiles) {
      const filePath = path.join(bgDir, file);
      const statBefore = fs.statSync(filePath);
      const sizeBefore = statBefore.size;
      totalBefore += sizeBefore;

      if (sizeBefore > 200 * 1024) {
        try {
          const inputBuf = fs.readFileSync(filePath);
          const buffer = await sharp(inputBuf)
            .resize({ width: 1920, withoutEnlargement: true })
            .webp({ quality: 80, effort: 6 })
            .toBuffer();

          fs.writeFileSync(filePath, buffer);
          totalAfter += buffer.length;
          console.log(`Optimized desktop BG ${file}: ${(sizeBefore / 1024 / 1024).toFixed(2)} MB -> ${(buffer.length / 1024).toFixed(1)} KB`);
        } catch (err: any) {
          console.error(`Error processing BG ${file}:`, err.message);
          totalAfter += sizeBefore;
        }
      } else {
        totalAfter += sizeBefore;
      }
    }
  }

  // 3. Optimize Mobile Background Images in public/images/bg/mobile/
  if (fs.existsSync(mobileBgDir)) {
    const mobileFiles = fs.readdirSync(mobileBgDir).filter(f => f.endsWith('.webp'));
    for (const file of mobileFiles) {
      const filePath = path.join(mobileBgDir, file);
      const statBefore = fs.statSync(filePath);
      const sizeBefore = statBefore.size;
      totalBefore += sizeBefore;

      if (sizeBefore > 100 * 1024) {
        try {
          const inputBuf = fs.readFileSync(filePath);
          const buffer = await sharp(inputBuf)
            .resize({ width: 800, withoutEnlargement: true })
            .webp({ quality: 78, effort: 6 })
            .toBuffer();

          fs.writeFileSync(filePath, buffer);
          totalAfter += buffer.length;
          console.log(`Optimized mobile BG ${file}: ${(sizeBefore / 1024).toFixed(1)} KB -> ${(buffer.length / 1024).toFixed(1)} KB`);
        } catch (err: any) {
          console.error(`Error processing mobile BG ${file}:`, err.message);
          totalAfter += sizeBefore;
        }
      } else {
        totalAfter += sizeBefore;
      }
    }
  }

  console.log('--- Image Optimization Summary ---');
  console.log(`Total Before: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total After:  ${(totalAfter / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}% reduction)`);
}

optimizeImages();
