import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const mappings = [
  {
    src: 'C:\\Users\\jasva\\.gemini\\antigravity-ide\\brain\\9c76ecf5-1366-4252-9744-c92afb7584c0\\what_is_meta_tag_analyzer_hero_1785602230891.png',
    dest: 'what-is-meta-tag-analyzer-hero.webp',
  },
  {
    src: 'C:\\Users\\jasva\\.gemini\\antigravity-ide\\brain\\9c76ecf5-1366-4252-9744-c92afb7584c0\\how_to_analyze_meta_tags_hero_1785602245054.png',
    dest: 'how-to-analyze-meta-tags-hero.webp',
  },
  {
    src: 'C:\\Users\\jasva\\.gemini\\antigravity-ide\\brain\\9c76ecf5-1366-4252-9744-c92afb7584c0\\analyzer_vs_checker_hero_1785602261979.png',
    dest: 'analyzer-vs-checker-hero.webp',
  },
  {
    src: 'C:\\Users\\jasva\\.gemini\\antigravity-ide\\brain\\9c76ecf5-1366-4252-9744-c92afb7584c0\\fix_common_meta_tag_errors_hero_1785602276156.png',
    dest: 'fix-common-meta-tag-errors-hero.webp',
  },
  {
    src: 'C:\\Users\\jasva\\.gemini\\antigravity-ide\\brain\\9c76ecf5-1366-4252-9744-c92afb7584c0\\open_graph_vs_twitter_card_hero_1785602289706.png',
    dest: 'open-graph-vs-twitter-card-hero.webp',
  },
  {
    src: 'C:\\Users\\jasva\\.gemini\\antigravity-ide\\brain\\9c76ecf5-1366-4252-9744-c92afb7584c0\\best_free_meta_tag_tools_hero_1785602304445.png',
    dest: 'best-free-meta-tag-tools-hero.webp',
  },
];

async function convert() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  for (const m of mappings) {
    const destPath = path.join(imagesDir, m.dest);
    await sharp(m.src).webp({ quality: 85 }).toFile(destPath);
    console.log(`Converted and saved: ${m.dest}`);
  }
}

convert();
