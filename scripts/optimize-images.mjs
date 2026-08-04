#!/usr/bin/env node
/**
 * Batch re-compress oversized hero WebP images using sharp.
 * Writes to a temp file then renames to avoid in-use file errors on Windows.
 */
import sharp from 'sharp';
import { readdir, stat, writeFile, rename, unlink } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imagesDir = join(__dirname, '..', 'public', 'images');
const TARGET_KB = 600;
const QUALITY = 76;
const MAX_WIDTH = 1200;

async function processImages() {
  const files = await readdir(imagesDir);
  const webps = files.filter(f => extname(f).toLowerCase() === '.webp');

  let saved = 0;
  let count = 0;

  for (const file of webps) {
    const full = join(imagesDir, file);
    const s = await stat(full);
    const sizeKB = s.size / 1024;

    if (sizeKB <= TARGET_KB) {
      console.log(`✓ skip  ${file} (${Math.round(sizeKB)}KB)`);
      continue;
    }

    const tmp = full + '.tmp.webp';

    try {
      const meta = await sharp(full).metadata();
      const origW = meta.width ?? 0;
      const resizeOpts = origW > MAX_WIDTH ? { width: MAX_WIDTH, withoutEnlargement: true } : undefined;

      const buf = await sharp(full)
        .resize(resizeOpts)
        .webp({ quality: QUALITY, effort: 5 })
        .toBuffer();

      const newSizeKB = buf.length / 1024;

      if (newSizeKB < sizeKB) {
        // Write to temp, then rename over original
        await writeFile(tmp, buf);
        try {
          await unlink(full);
        } catch {}
        await rename(tmp, full);
        console.log(`✅ ${file}: ${Math.round(sizeKB)}KB → ${Math.round(newSizeKB)}KB (saved ${Math.round(sizeKB - newSizeKB)}KB)`);
        saved += sizeKB - newSizeKB;
        count++;
      } else {
        if (existsSync(tmp)) await unlink(tmp);
        console.log(`⚡ ${file}: skip — re-encode would be larger`);
      }
    } catch (err) {
      if (existsSync(tmp)) await unlink(tmp).catch(() => {});
      console.warn(`⚠ error ${file}:`, err.message || err);
    }
  }

  console.log(`\n✅ Done: ${count} images optimized, ~${Math.round(saved)}KB (${(saved/1024).toFixed(1)}MB) saved.`);
}

processImages().catch(console.error);
