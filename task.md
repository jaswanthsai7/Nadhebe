# Nadhebe Platform Repair — Task Tracker

## Phase 5 — FAQ Subtitle Fix ✅
- [x] Fix generic aspect-ratio FAQ subtitle in `ToolLayout.astro` line 130
  - Changed: "Common questions regarding dimensions, aspect ratios, and resolution calculations."
  - Now: "Common questions about this tool."

## Phase 1 — Registry Metadata (47 Implemented Tools) ✅
All categories, icons, descriptions, keywords, relatedTools verified and fixed.

### Category Status (all correct)
- [x] Developer tools (json-diff, base64-encoder, url-parser, jwt-debugger, uuid-generator, text-diff, json-to-typescript, svg-to-jsx) → `Developer`
- [x] Text tools (word-counter, case-converter, duplicate-remover, slug-generator, reading-time-calculator) → `Text`
- [x] Image tools (aspect-ratio-calculator, 16-9, 9-16, dpi, megapixels, pixels, ppi, resize) → `Image`
- [x] YouTube (youtube-video-size-calculator) → `YouTube`
- [x] SEO tools (meta-tag-analyzer, schema-generator, sitemap-validator, opportunity-radar) → `SEO`
- [x] Social Media (social-media-image-sizes) → `Social Media`
- [x] Design tools (color-contrast-checker, css-clamp-calculator, px-to-rem) → `Design`
- [x] Finance (profit-margin-calculator) → `Finance`
- [x] Calculators (percentage-difference-calculator) → `Calculators`
- [x] JSON tools (json-formatter, json-minifier, json-to-xml, json-validator, yaml-to-json) → `JSON`
- [x] CSV tools (csv-to-json, csv-deduper) → `CSV`
- [x] XML tools (xml-formatter) → `XML`
- [x] Security (jwt-inspector) → `Security`
- [x] AI (embedding-inspector) → `AI`
- [x] Regex (escape-helper) → `Regex`
- [x] DevOps (dockerfile-linter) → `DevOps`
- [x] Date & Time (cron-next-run-viewer) → `Date & Time`
- [x] Visualization (color-scale-generator) → `Visualization`
- [x] API (curl-builder) → `API`

### Icon Fixes (was "code" → now semantic)
- [x] `embedding-inspector` → `binary`
- [x] `csv-deduper` → `filter`
- [x] `escape-helper` → `shield-alert`
- [x] `dockerfile-linter` → `package-check`
- [x] `cron-next-run-viewer` → `calendar-clock`
- [x] `color-scale-generator` → `palette`
- [x] `curl-builder` → `terminal`

### Description / SEO Fixes
- [x] All 7 tools above: unique `description`, unique `seo.description`, 7–8 targeted `seo.keywords`
- [x] `relatedTools` updated to semantically related tools (not generic json-formatter + csv-to-json + uuid-generator + aspect-ratio-calculator)
- [x] Zero implemented tools left with generic "Use this privacy-first X" description
- [x] Zero implemented tools left with `"icon": "code"`

### Validation
- [x] Pre-existing TS errors confirmed to be in `api-worker/`, `functions/`, `worker.ts` — NOT from our changes
- [x] Astro dev server running normally (npm run dev)

---

## Phase 2 — Tool Content (40 Implemented Tools) ✅ Batch A Done

### Architecture
- [x] Created `src/config/tool-content.ts` — per-tool rich content map (ToolRichContent interface)
- [x] Updated `src/pages/tools/[slug].astro` to:
  - Import TOOL_RICH_CONTENT
  - Render unique intro, use-cases list, how-it-works, worked example, privacy section
  - Build tool-specific FAQ (tool questions + 2 universal privacy/free questions)
  - Falls back gracefully to generic content for tools not yet in the map

### Batch A — Developer/Text PlatformWorkbench tools (12 tools) ✅

- [x] json-diff — intro, 5 use cases, how it works, worked example (JSON objects), 4 FAQs
- [x] text-diff — intro, 5 use cases, how it works, worked example (plain text), 3 FAQs
- [x] base64-encoder — intro, 5 use cases, how it works, encode example, 4 FAQs
- [x] url-parser — intro, 5 use cases, how it works, URL parse example, 4 FAQs
- [x] jwt-debugger — intro, 5 use cases, how it works, JWT decode example, 4 FAQs
- [x] uuid-generator — intro, 5 use cases, how it works (crypto.randomUUID), 4 FAQs
- [x] word-counter — intro, 5 use cases, how it works, 3 FAQs
- [x] reading-time-calculator — intro, 5 use cases, how it works, 3 FAQs
- [x] case-converter — intro, 5 use cases, how it works, 3 FAQs
- [x] duplicate-remover — intro, 5 use cases, how it works, 3 FAQs
- [x] slug-generator — intro, 5 use cases, how it works, slug example, 3 FAQs
- [x] jwt-inspector — intro, 5 use cases, how it works, 4 FAQs

### Batch B — Image tools (9 standalone .astro pages) ✅
- [x] aspect-ratio-calculator — intro/formula/table, 5 use cases, 5 FAQs, internal links
- [x] 16-9-dimensions-calculator — intro/formula, 5 use cases, resolution tiers, 5 FAQs, internal links
- [x] 9-16-dimensions-calculator — intro/formula, safe zones guide, 5 use cases, 5 FAQs, internal links
- [x] dpi-print-size-calculator — intro/formula, 5 use cases, quality tiers, 5 FAQs, internal links
- [x] megapixels-to-resolution-calculator — intro/formula, 5 use cases, camera MP reference, 5 FAQs, internal links
- [x] pixels-to-megapixels-calculator — intro/formula, 5 use cases, classification guide, 5 FAQs, internal links
- [x] ppi-calculator — intro/formula, 5 use cases, PPI benchmarks, 5 FAQs, internal links
- [x] resize-dimensions-calculator — intro/formula, 5 use cases, scale percentage table, 5 FAQs, internal links
- [x] youtube-video-size-calculator — intro/table, 5 use cases, best practices, 5 FAQs, internal links

### Batch C — SEO & Social tools (5 tools) ✅
- [x] meta-tag-analyzer — guide, essential tags checklist, 5 FAQs, internal links
- [x] schema-generator — guide, supported schema types reference, 5 FAQs, internal links
- [x] sitemap-validator — guide, common sitemap pitfalls, 5 FAQs, internal links
- [x] opportunity-radar — guide, feature comparison table, 5 FAQs, internal links
- [x] social-media-image-sizes — guide, platform breakdown, 5 FAQs, internal links

### Batch D — Design tools (3 tools) ✅
- [x] color-contrast-checker — guide, compliance levels table, 5 FAQs, internal links
- [x] css-clamp-calculator — guide, slope formula, 5 FAQs, internal links
- [x] px-to-rem — guide, conversion formula, 5 FAQs, internal links

### Batch E — Finance/Math (2 tools) ✅
- [x] profit-margin-calculator — guide, unit economics formulas, 5 FAQs, internal links
- [x] percentage-difference-calculator — guide, change vs difference formulas, 5 FAQs, internal links

### Batch F — Data format tools via DeveloperWorkbench (9 tools) ✅
- [x] json-formatter — guide, 5 use cases, 5 FAQs, internal links
- [x] json-minifier — guide, payload reduction benchmark, 5 FAQs, internal links
- [x] json-validator — guide, error diagnostics, 5 FAQs, internal links
- [x] json-to-xml — guide, structural mapping rules, 5 FAQs, internal links
- [x] json-to-typescript — guide, 5 use cases, 5 FAQs, internal links
- [x] csv-to-json — guide, delimiter options, 5 FAQs, internal links
- [x] xml-formatter — guide, formatting features, 5 FAQs, internal links
- [x] yaml-to-json — guide, 5 use cases, 5 FAQs, internal links
- [x] svg-to-jsx — guide, AST transformations, 5 FAQs, internal links

---

## Phase 3 — Related Tools & Internal Linking
- [ ] Verify all `relatedTools` slugs exist in registry (no dead links)
- [ ] Add internal links within content sections for standalone pages

## Phase 4 — PlatformWorkbench Verification
- [ ] Confirm `isImplemented` prop flow works for all 12 PlatformWorkbench tools
- [ ] Visit all 12 PlatformWorkbench tool URLs in dev server
- [ ] Confirm planned tools show Coming Soon UI

## Phase 6 — QA Checklist (40 Implemented Tools)
- [ ] Run full per-tool checklist after Phase 2 content is done

## Phase 7 — Deployment
- [ ] npm run build (zero errors)
- [ ] Deploy to Cloudflare Pages
- [ ] Spot-check 10 URLs in production
- [ ] Submit updated sitemap
