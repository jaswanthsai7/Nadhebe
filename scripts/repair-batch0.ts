/**
 * Batch 0 Repair Script — Nadhebe Tools Platform
 * 
 * Fixes for all 40 implemented tools in tools-registry.ts:
 *   1. Category corrections (30 tools)
 *   2. Related tools -> semantic cross-links (40 tools)
 *   3. SEO keywords -> 5-6 per tool (40 tools)
 *   4. SEO description -> unique meta description (40 tools)
 *   5. Icons -> category-appropriate (40 tools)
 * 
 * NEVER changes: slug, href, id, title, name, status, mode, component, faq
 * NO noindex added (194 planned tool URLs already submitted to Bing)
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const registryPath = path.resolve(__dirname, '../src/config/tools-registry.ts');

console.log('Reading registry...');
let content = fs.readFileSync(registryPath, 'utf-8');
const hadCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

const ARRAY_DECL = 'export const UNIFIED_TOOLS_REGISTRY: UnifiedTool[] = ';
const declIdx = content.indexOf(ARRAY_DECL);
if (declIdx === -1) { console.error('Cannot find UNIFIED_TOOLS_REGISTRY'); process.exit(1); }
const arrayStart = declIdx + ARRAY_DECL.length;
const END_MARKER = ';\n\nexport const IMPLEMENTED_TOOLS';
const endIdx = content.indexOf(END_MARKER, arrayStart);
if (endIdx === -1) { console.error('Cannot find end of array'); process.exit(1); }

const before = content.substring(0, arrayStart);
const arrayText = content.substring(arrayStart, endIdx);
const after = content.substring(endIdx);

let registry: any[];
try {
  registry = JSON.parse(arrayText);
  console.log(`Parsed ${registry.length} tools`);
} catch (e) {
  console.error('JSON parse failed:', e);
  process.exit(1);
}

const categoryFix: Record<string, { category: string; categorySlug: string }> = {
  'aspect-ratio-calculator':             { category: 'Image',        categorySlug: 'image' },
  '16-9-dimensions-calculator':          { category: 'Image',        categorySlug: 'image' },
  '9-16-dimensions-calculator':          { category: 'Image',        categorySlug: 'image' },
  'dpi-print-size-calculator':           { category: 'Image',        categorySlug: 'image' },
  'megapixels-to-resolution-calculator': { category: 'Image',        categorySlug: 'image' },
  'pixels-to-megapixels-calculator':     { category: 'Image',        categorySlug: 'image' },
  'ppi-calculator':                      { category: 'Image',        categorySlug: 'image' },
  'resize-dimensions-calculator':        { category: 'Image',        categorySlug: 'image' },
  'color-contrast-checker':             { category: 'Design',        categorySlug: 'design' },
  'css-clamp-calculator':               { category: 'Design',        categorySlug: 'design' },
  'px-to-rem':                          { category: 'Design',        categorySlug: 'design' },
  'json-formatter':                     { category: 'JSON',          categorySlug: 'json' },
  'json-minifier':                      { category: 'JSON',          categorySlug: 'json' },
  'json-to-xml':                        { category: 'JSON',          categorySlug: 'json' },
  'json-validator':                     { category: 'JSON',          categorySlug: 'json' },
  'yaml-to-json':                       { category: 'JSON',          categorySlug: 'json' },
  'csv-to-json':                        { category: 'CSV',           categorySlug: 'csv' },
  'xml-formatter':                      { category: 'XML',           categorySlug: 'xml' },
  'meta-tag-analyzer':                  { category: 'SEO',           categorySlug: 'seo' },
  'opportunity-radar':                  { category: 'SEO',           categorySlug: 'seo' },
  'schema-generator':                   { category: 'SEO',           categorySlug: 'seo' },
  'sitemap-validator':                  { category: 'SEO',           categorySlug: 'seo' },
  'social-media-image-sizes':           { category: 'Social Media',  categorySlug: 'social-media' },
  'youtube-video-size-calculator':      { category: 'YouTube',       categorySlug: 'youtube' },
  'profit-margin-calculator':           { category: 'Finance',       categorySlug: 'finance' },
  'percentage-difference-calculator':   { category: 'Calculators',   categorySlug: 'calculators' },
  'word-counter':                       { category: 'Text',          categorySlug: 'text' },
  'reading-time-calculator':            { category: 'Text',          categorySlug: 'text' },
  'case-converter':                     { category: 'Text',          categorySlug: 'text' },
  'duplicate-remover':                  { category: 'Text',          categorySlug: 'text' },
  'slug-generator':                     { category: 'Text',          categorySlug: 'text' },
};

const validSlugs = new Set(registry.map((t: any) => t.slug));

const relatedToolsFix: Record<string, string[]> = {
  'json-diff':              ['text-diff', 'json-formatter', 'json-validator', 'base64-encoder'],
  'text-diff':              ['json-diff', 'word-counter', 'duplicate-remover', 'case-converter'],
  'base64-encoder':         ['url-parser', 'json-formatter', 'uuid-generator', 'jwt-debugger'],
  'url-parser':             ['jwt-debugger', 'meta-tag-analyzer', 'schema-generator', 'base64-encoder'],
  'jwt-debugger':           ['jwt-inspector', 'url-parser', 'json-validator', 'base64-encoder'],
  'jwt-inspector':          ['jwt-debugger', 'url-parser', 'json-validator', 'base64-encoder'],
  'uuid-generator':         ['slug-generator', 'json-formatter', 'base64-encoder', 'json-diff'],
  'json-to-typescript':     ['json-formatter', 'json-validator', 'json-minifier', 'svg-to-jsx'],
  'svg-to-jsx':             ['json-to-typescript', 'css-clamp-calculator', 'px-to-rem', 'json-formatter'],
  'word-counter':           ['reading-time-calculator', 'case-converter', 'duplicate-remover', 'text-diff'],
  'reading-time-calculator':['word-counter', 'case-converter', 'duplicate-remover', 'slug-generator'],
  'case-converter':         ['slug-generator', 'word-counter', 'duplicate-remover', 'text-diff'],
  'duplicate-remover':      ['word-counter', 'case-converter', 'slug-generator', 'text-diff'],
  'slug-generator':         ['case-converter', 'uuid-generator', 'duplicate-remover', 'word-counter'],
  'json-formatter':         ['json-minifier', 'json-validator', 'json-to-xml', 'csv-to-json'],
  'json-minifier':          ['json-formatter', 'json-validator', 'json-to-xml', 'yaml-to-json'],
  'json-validator':         ['json-formatter', 'json-minifier', 'json-to-typescript', 'json-to-xml'],
  'json-to-xml':            ['json-formatter', 'xml-formatter', 'yaml-to-json', 'json-validator'],
  'yaml-to-json':           ['json-formatter', 'json-validator', 'json-to-xml', 'xml-formatter'],
  'csv-to-json':            ['json-formatter', 'json-validator', 'yaml-to-json', 'xml-formatter'],
  'xml-formatter':          ['json-to-xml', 'yaml-to-json', 'json-formatter', 'csv-to-json'],
  'aspect-ratio-calculator':             ['resize-dimensions-calculator', '16-9-dimensions-calculator', 'ppi-calculator', 'dpi-print-size-calculator'],
  '16-9-dimensions-calculator':          ['aspect-ratio-calculator', '9-16-dimensions-calculator', 'resize-dimensions-calculator', 'youtube-video-size-calculator'],
  '9-16-dimensions-calculator':          ['aspect-ratio-calculator', '16-9-dimensions-calculator', 'social-media-image-sizes', 'resize-dimensions-calculator'],
  'dpi-print-size-calculator':           ['ppi-calculator', 'pixels-to-megapixels-calculator', 'megapixels-to-resolution-calculator', 'resize-dimensions-calculator'],
  'megapixels-to-resolution-calculator': ['pixels-to-megapixels-calculator', 'ppi-calculator', 'dpi-print-size-calculator', 'aspect-ratio-calculator'],
  'pixels-to-megapixels-calculator':     ['megapixels-to-resolution-calculator', 'ppi-calculator', 'dpi-print-size-calculator', 'aspect-ratio-calculator'],
  'ppi-calculator':                      ['dpi-print-size-calculator', 'resize-dimensions-calculator', 'aspect-ratio-calculator', 'pixels-to-megapixels-calculator'],
  'resize-dimensions-calculator':        ['aspect-ratio-calculator', 'ppi-calculator', '16-9-dimensions-calculator', 'dpi-print-size-calculator'],
  'social-media-image-sizes':            ['aspect-ratio-calculator', '9-16-dimensions-calculator', 'resize-dimensions-calculator', 'youtube-video-size-calculator'],
  'youtube-video-size-calculator':       ['aspect-ratio-calculator', '16-9-dimensions-calculator', 'social-media-image-sizes', 'resize-dimensions-calculator'],
  'meta-tag-analyzer':  ['schema-generator', 'sitemap-validator', 'opportunity-radar', 'url-parser'],
  'schema-generator':   ['meta-tag-analyzer', 'sitemap-validator', 'json-formatter', 'opportunity-radar'],
  'sitemap-validator':  ['meta-tag-analyzer', 'schema-generator', 'xml-formatter', 'opportunity-radar'],
  'opportunity-radar':  ['meta-tag-analyzer', 'schema-generator', 'sitemap-validator', 'social-media-image-sizes'],
  'color-contrast-checker': ['css-clamp-calculator', 'px-to-rem', 'schema-generator', 'meta-tag-analyzer'],
  'css-clamp-calculator':   ['px-to-rem', 'color-contrast-checker', 'aspect-ratio-calculator', 'resize-dimensions-calculator'],
  'px-to-rem':              ['css-clamp-calculator', 'color-contrast-checker', 'percentage-difference-calculator', 'aspect-ratio-calculator'],
  'profit-margin-calculator':         ['percentage-difference-calculator', 'ppi-calculator', 'aspect-ratio-calculator', 'social-media-image-sizes'],
  'percentage-difference-calculator': ['profit-margin-calculator', 'ppi-calculator', 'dpi-print-size-calculator', 'aspect-ratio-calculator'],
};

const seoKeywordsFix: Record<string, string[]> = {
  'json-diff':           ['json diff', 'compare json online', 'json compare tool', 'json difference checker', 'diff json', 'json delta viewer'],
  'text-diff':           ['text diff', 'compare text online', 'text compare tool', 'diff text', 'text difference checker', 'line diff'],
  'base64-encoder':      ['base64 encoder decoder', 'encode base64 online', 'base64 decode', 'base64 converter', 'text to base64'],
  'url-parser':          ['url parser', 'parse url online', 'url components analyzer', 'query string parser', 'url decoder tool'],
  'jwt-debugger':        ['jwt debugger', 'jwt decoder', 'decode jwt token', 'json web token debugger', 'jwt payload decoder'],
  'jwt-inspector':       ['jwt inspector', 'inspect jwt', 'jwt token analyzer', 'jwt header decoder', 'decode jwt payload'],
  'uuid-generator':      ['uuid generator', 'generate uuid v4', 'random uuid online', 'unique id generator', 'guid generator'],
  'json-to-typescript':  ['json to typescript', 'json to typescript interface', 'generate typescript interface', 'json schema to typescript', 'typescript type generator'],
  'svg-to-jsx':          ['svg to jsx', 'convert svg to jsx react', 'svg jsx converter', 'react svg component', 'svg to react component'],
  'word-counter':        ['word counter', 'count words online', 'character counter', 'word count tool', 'text word counter'],
  'reading-time-calculator': ['reading time calculator', 'estimate reading time', 'how long to read', 'blog reading time', 'article read time'],
  'case-converter':      ['case converter', 'text case converter', 'uppercase lowercase converter', 'camelcase snake case converter', 'title case generator'],
  'duplicate-remover':   ['duplicate remover', 'remove duplicate lines', 'deduplicate text', 'unique lines tool', 'remove duplicates online'],
  'slug-generator':      ['slug generator', 'url slug generator', 'text to slug', 'generate url slug', 'seo slug creator'],
  'json-formatter':      ['json formatter', 'json beautifier', 'format json online', 'json pretty print', 'beautify json'],
  'json-minifier':       ['json minifier', 'minify json online', 'json compressor', 'compress json', 'json uglify'],
  'json-validator':      ['json validator', 'validate json online', 'json syntax checker', 'json linter', 'check json valid'],
  'json-to-xml':         ['json to xml converter', 'convert json to xml', 'json xml converter', 'json2xml online', 'transform json to xml'],
  'yaml-to-json':        ['yaml to json', 'yaml to json converter', 'convert yaml to json', 'yaml json converter', 'parse yaml to json'],
  'csv-to-json':         ['csv to json converter', 'convert csv to json', 'csv json tool', 'json to csv converter', 'csv to json online'],
  'xml-formatter':       ['xml formatter', 'format xml online', 'xml beautifier', 'xml pretty print', 'xml code formatter'],
  'aspect-ratio-calculator': ['aspect ratio calculator', 'calculate aspect ratio', 'image aspect ratio', 'video aspect ratio', '16:9 ratio calculator'],
  '16-9-dimensions-calculator': ['16:9 dimensions', '16 9 aspect ratio', '16x9 resolutions', 'widescreen dimensions', '1920x1080 ratio chart'],
  '9-16-dimensions-calculator': ['9:16 dimensions', '9 16 aspect ratio', 'vertical video dimensions', 'portrait video calculator', 'shorts reels dimensions'],
  'dpi-print-size-calculator':  ['dpi calculator', 'print size calculator', 'dpi to pixels', 'pixels to print size', 'print resolution calculator'],
  'megapixels-to-resolution-calculator': ['megapixels to resolution', 'mp to resolution', 'camera megapixel converter', 'image resolution megapixels'],
  'pixels-to-megapixels-calculator': ['pixels to megapixels', 'pixel to mp converter', 'image megapixel calculator', 'resolution to megapixels'],
  'ppi-calculator':      ['ppi calculator', 'pixels per inch', 'screen ppi', 'monitor ppi calculator', 'display pixel density'],
  'resize-dimensions-calculator': ['resize dimensions calculator', 'image resize calculator', 'maintain aspect ratio', 'scale image dimensions'],
  'social-media-image-sizes': ['social media image sizes', 'instagram image dimensions', 'facebook image size', 'twitter image size', 'social media dimensions 2024'],
  'youtube-video-size-calculator': ['youtube video dimensions', 'youtube thumbnail size', 'youtube channel art size', 'yt image sizes 2024'],
  'color-contrast-checker': ['color contrast checker', 'wcag contrast ratio', 'accessibility contrast', 'aa aaa contrast checker', 'web accessibility color'],
  'css-clamp-calculator': ['css clamp calculator', 'fluid typography generator', 'css clamp function', 'responsive font size calculator'],
  'px-to-rem':           ['px to rem converter', 'pixels to rem', 'rem to px', 'css unit converter', 'font size px rem'],
  'meta-tag-analyzer':   ['meta tag analyzer', 'meta tag checker', 'seo meta tags', 'open graph checker', 'website meta audit'],
  'schema-generator':    ['schema markup generator', 'json-ld generator', 'structured data generator', 'schema.org markup', 'rich snippet generator'],
  'sitemap-validator':   ['sitemap validator', 'xml sitemap checker', 'validate sitemap', 'sitemap analyzer', 'check sitemap errors'],
  'opportunity-radar':   ['seo opportunity finder', 'content gap analysis', 'keyword opportunity tool', 'seo content opportunities'],
  'profit-margin-calculator': ['profit margin calculator', 'gross margin calculator', 'markup calculator', 'ecommerce profit calculator', 'shopify fee calculator'],
  'percentage-difference-calculator': ['percentage difference calculator', 'percent difference', 'percentage change calculator', 'percent change between numbers'],
};

const seoDescFix: Record<string, string> = {
  'json-diff':           'Compare two JSON objects side-by-side and highlight added, removed, and changed keys. Free, private, runs 100% in your browser — no uploads.',
  'text-diff':           'Find differences between two text blocks and highlight added and removed lines. Client-side diff tool — nothing is sent to any server.',
  'base64-encoder':      'Encode text to Base64 and decode Base64 strings back to plain text instantly. 100% local processing — your data never leaves the browser.',
  'url-parser':          'Parse any URL into protocol, host, path, query parameters, and hash. Privacy-first URL analyzer — runs locally, no server, no logs.',
  'jwt-debugger':        'Decode and inspect JWT header and payload without signature validation. Free online JWT debugger — no server, no data uploads, 100% private.',
  'jwt-inspector':       'Inspect JSON Web Token structure: header claims, payload data, expiry. Runs entirely in your browser — zero server uploads.',
  'uuid-generator':      'Generate cryptographically random UUID v4 IDs in bulk. Uses browser-native crypto.randomUUID() — nothing sent to any server.',
  'json-to-typescript':  'Convert JSON objects to TypeScript interfaces automatically. Paste JSON, get fully typed TypeScript code instantly — 100% local.',
  'svg-to-jsx':          'Convert SVG markup to React JSX with cleaned attributes and camelCase props. Browser-native conversion — no file uploads required.',
  'word-counter':        'Count words, characters, sentences, and lines for any text. Instant results with zero server uploads — paste and get results immediately.',
  'reading-time-calculator': 'Estimate article reading time based on average reading speed. Paste your content and get an instant reading time estimate in seconds.',
  'case-converter':      'Convert text between lowercase, UPPERCASE, Title Case, camelCase, snake_case and more. Free online case transformer — instant browser-side results.',
  'duplicate-remover':   'Remove duplicate lines from any list or text. Keeps unique entries in original order. Paste, deduplicate, copy — 100% client-side.',
  'slug-generator':      'Generate clean SEO-friendly URL slugs from any text. Converts spaces and special characters into kebab-case slugs instantly.',
  'json-formatter':      'Format, beautify, and validate JSON with syntax highlighting and collapsible tree view. Supports conversion to XML, CSV, YAML — 100% client-side.',
  'json-minifier':       'Minify and compact JSON by stripping whitespace. Instant browser-side processing with copy and download — no data uploaded.',
  'json-validator':      'Validate JSON syntax and see errors with exact line numbers. Free JSON checker that runs entirely in your browser — zero data uploads.',
  'json-to-xml':         'Convert JSON to formatted XML markup instantly. Handles nested objects and arrays. Free browser converter — no server, no uploads.',
  'yaml-to-json':        'Convert YAML to JSON and back. Handles nested structures, arrays, and multi-document YAML. 100% browser-side — no server processing.',
  'csv-to-json':         'Convert CSV to JSON arrays and JSON back to CSV. Supports custom delimiters and drag-and-drop file loading. 100% client-side.',
  'xml-formatter':       'Format and beautify XML with proper indentation. Validates XML structure and highlights errors. Free, private, browser-native tool.',
  'aspect-ratio-calculator': 'Calculate aspect ratio from width and height, resize dimensions while preserving ratio, and find equivalent resolutions for common ratios.',
  '16-9-dimensions-calculator': 'Find all standard 16:9 resolutions from 480p to 8K. Enter width to get correct 16:9 height, or browse the complete widescreen resolution table.',
  '9-16-dimensions-calculator': 'Get all standard 9:16 vertical dimensions for TikTok, Instagram Reels, YouTube Shorts. Instant portrait video size reference for content creators.',
  'dpi-print-size-calculator':  'Calculate print dimensions from DPI and pixel count. Find required resolution for any print size. Essential tool for designers preparing print files.',
  'megapixels-to-resolution-calculator': 'Convert megapixels to image resolution dimensions. Find common sensor resolutions for any MP count — perfect for camera comparisons.',
  'pixels-to-megapixels-calculator': 'Calculate megapixel count from image width and height. Understand photo file sizes and compare camera resolutions instantly.',
  'ppi-calculator':      'Calculate pixels per inch (PPI) for any screen from diagonal size and resolution. Compare display sharpness across phones, monitors, and TVs.',
  'resize-dimensions-calculator': 'Calculate new image dimensions while preserving original aspect ratio. Enter new width or height and get the correct proportional size.',
  'social-media-image-sizes': 'Complete 2024 reference for every social media image size. Instagram, Facebook, Twitter X, LinkedIn, YouTube — all dimensions in one table.',
  'youtube-video-size-calculator': 'Find correct pixel dimensions for YouTube thumbnails, channel art, profile photos, and Shorts. Full YouTube image size guide for 2024.',
  'color-contrast-checker': 'Check WCAG 2.1 color contrast ratios for AA and AAA accessibility. Paste hex or RGB colors and get instant pass/fail results with contrast ratio.',
  'css-clamp-calculator': 'Generate CSS clamp() values for fluid typography and spacing that scales between viewport sizes. Copy the result directly into your stylesheet.',
  'px-to-rem':           'Convert pixel values to rem units and rem to px. Set your base font size and get instant conversion results for accessible CSS layouts.',
  'meta-tag-analyzer':   "Analyze a page's meta tags: title, description, Open Graph, Twitter Cards, and robots directives. Get instant SEO feedback on any URL.",
  'schema-generator':    'Generate JSON-LD structured data for articles, products, FAQs, and organizations. Copy schema.org markup ready to paste directly into your HTML.',
  'sitemap-validator':   'Validate your XML sitemap for structural errors and malformed URLs. Paste sitemap XML and get instant feedback on formatting issues.',
  'opportunity-radar':   'Surface content and keyword opportunities from your existing data. Find quick-win SEO topics and content gaps to grow organic search traffic.',
  'profit-margin-calculator': 'Calculate gross profit margin, markup %, and net profit after Shopify, Stripe, and PayPal fees. Built specifically for e-commerce sellers.',
  'percentage-difference-calculator': 'Calculate percentage difference and percentage change between two numbers. Shows formula, absolute difference, and relative change.',
};

const iconFix: Record<string, string> = {
  'json-diff': 'git-compare', 'text-diff': 'git-compare',
  'base64-encoder': 'lock', 'url-parser': 'link',
  'jwt-debugger': 'shield', 'jwt-inspector': 'shield-check',
  'uuid-generator': 'fingerprint', 'json-to-typescript': 'file-code', 'svg-to-jsx': 'code-2',
  'word-counter': 'type', 'reading-time-calculator': 'clock',
  'case-converter': 'text-cursor-input', 'duplicate-remover': 'list-filter', 'slug-generator': 'link-2',
  'json-formatter': 'braces', 'json-minifier': 'minimize-2', 'json-validator': 'check-circle',
  'json-to-xml': 'arrow-right-left', 'yaml-to-json': 'arrow-right-left',
  'csv-to-json': 'table', 'xml-formatter': 'file-code-2',
  'aspect-ratio-calculator': 'crop', '16-9-dimensions-calculator': 'monitor',
  '9-16-dimensions-calculator': 'smartphone', 'dpi-print-size-calculator': 'printer',
  'megapixels-to-resolution-calculator': 'camera', 'pixels-to-megapixels-calculator': 'camera',
  'ppi-calculator': 'monitor', 'resize-dimensions-calculator': 'maximize-2',
  'social-media-image-sizes': 'share-2', 'youtube-video-size-calculator': 'play-circle',
  'meta-tag-analyzer': 'tag', 'schema-generator': 'braces', 'sitemap-validator': 'map',
  'opportunity-radar': 'search',
  'color-contrast-checker': 'contrast', 'css-clamp-calculator': 'sliders', 'px-to-rem': 'ruler',
  'profit-margin-calculator': 'trending-up', 'percentage-difference-calculator': 'percent',
};

let cats = 0, related = 0, keywords = 0, descs = 0, icons = 0;

const corrected = registry.map((tool: any) => {
  const updated = { ...tool };

  if (categoryFix[tool.slug]) {
    const fix = categoryFix[tool.slug];
    updated.category = fix.category;
    updated.categorySlug = fix.categorySlug;
    if (Array.isArray(updated.tags)) {
      updated.tags = updated.tags.map((tag: string) =>
        tag === tool.categorySlug ? fix.categorySlug : tag
      );
    }
    cats++;
  }

  if (relatedToolsFix[tool.slug]) {
    updated.relatedTools = relatedToolsFix[tool.slug].filter((s: string) => validSlugs.has(s));
    related++;
  }

  if (seoKeywordsFix[tool.slug]) {
    updated.seo = { ...updated.seo, keywords: seoKeywordsFix[tool.slug] };
    keywords++;
  }

  if (seoDescFix[tool.slug]) {
    updated.seo = { ...updated.seo, description: seoDescFix[tool.slug] };
    descs++;
  }

  if (iconFix[tool.slug]) {
    updated.icon = iconFix[tool.slug];
    icons++;
  }

  return updated;
});

console.log('\n=== Corrections Applied ===');
console.log(`Categories fixed:    ${cats}`);
console.log(`Related tools fixed: ${related}`);
console.log(`SEO keywords fixed:  ${keywords}`);
console.log(`SEO descriptions:    ${descs}`);
console.log(`Icons updated:       ${icons}`);

const newArrayText = JSON.stringify(corrected, null, 2);
let newContent = before + newArrayText + after;
if (hadCRLF) newContent = newContent.replace(/\n/g, '\r\n');

const backupPath = registryPath + '.batch0.backup';
fs.copyFileSync(registryPath, backupPath);
console.log(`\nBackup saved: ${backupPath}`);

fs.writeFileSync(registryPath, newContent, 'utf-8');
console.log(`Registry updated! Size: ${(fs.statSync(registryPath).size / 1024).toFixed(1)}KB`);
