#!/usr/bin/env node
import sharp from 'sharp';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imagesDir = join(__dirname, '..', 'public', 'images');
const TARGET_KB = 140;
const QUALITY = 70;
const MAX_WIDTH = 768;

async function processImages() {
  const files = readdirSync(imagesDir);
  const webps = files.filter(f => extname(f).toLowerCase() === '.webp');

  let saved = 0;
  let count = 0;

  for (const file of webps) {
    const full = join(imagesDir, file);
    const s = statSync(full);
    const sizeKB = s.size / 1024;

    if (sizeKB <= TARGET_KB) continue;

    try {
      // Read entire file to memory buffer so file handle is closed
      const inputBuffer = readFileSync(full);
      const meta = await sharp(inputBuffer).metadata();
      const origW = meta.width ?? 0;
      const resizeOpts = origW > MAX_WIDTH ? { width: MAX_WIDTH, withoutEnlargement: true } : undefined;

      const outputBuffer = await sharp(inputBuffer)
        .resize(resizeOpts)
        .webp({ quality: QUALITY, effort: 5 })
        .toBuffer();

      const newSizeKB = outputBuffer.length / 1024;

      if (newSizeKB < sizeKB) {
        writeFileSync(full, outputBuffer);
        console.log(`✅ ${file}: ${Math.round(sizeKB)}KB → ${Math.round(newSizeKB)}KB (saved ${Math.round(sizeKB - newSizeKB)}KB)`);
        saved += sizeKB - newSizeKB;
        count++;
      }
    } catch (err) {
      console.warn(`⚠ error ${file}:`, err.message || err);
    }
  }

  console.log(`\n✅ Done: ${count} hero images optimized, ~${Math.round(saved)}KB (${(saved/1024).toFixed(1)}MB) saved.`);
}

processImages().catch(console.error);
