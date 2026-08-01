# Nadhebe Tools Platform — Complete Architectural Analysis & Implementation Plan

> **Analysis Date:** 2026-08-01
> **Platform:** Astro 5 (Static Output) + Tailwind CSS + TypeScript
> **Total Tools in Registry:** 539
> **Status:** 40 Implemented · 499 Planned
> **Severity:** CRITICAL — Registry, category, metadata, and routing defects affect every tool on the platform.

---

## Executive Summary

The Nadhebe platform has a working foundation but was scaled with automated generation that introduced systematic defects across the entire registry. These defects are not random — they follow predictable patterns that can be identified, catalogued, and corrected methodically.

**What works:** The routing architecture (Astro static paths + standalone `.astro` pages) is structurally sound. The `DeveloperWorkbench` and `PlatformWorkbench` components function correctly. Standalone tool pages (JSON Formatter, Aspect Ratio Calculator, etc.) deliver working functionality.

**What is broken:** The registry (`tools-registry.ts`) that is the single source of truth for every tool has been mass-generated with incorrect categories, generic descriptions, generic related-tool lists, generic icons, and missing SEO keywords. 25 of 40 implemented tools have wrong category assignments. 511 of 539 tools share an identical `relatedTools` array. 40 of 40 tools have generic `icon: "code"`. 301 of 499 planned tools have copy-pasted placeholder descriptions.

---

## HARD CONSTRAINT — URL Immutability

> [!CAUTION]
> **All tool URLs are permanent and immutable. No slug, `href`, file path, or route may ever be renamed, redirected, or restructured during this repair project.**

Every tool URL is locked in this format forever:
```
https://nadhebe.com/tools/[slug]/
```

Examples that must never change:
```
https://nadhebe.com/tools/json-formatter/
https://nadhebe.com/tools/aspect-ratio-calculator/
https://nadhebe.com/tools/n8n-workflow-planner/
https://nadhebe.com/tools/profit-margin-calculator/
```

**What this means in practice:**
- The `slug` field in `tools-registry.ts` is read-only — never modified.
- The `href` field in `tools-registry.ts` is read-only — never modified.
- Standalone `.astro` filenames under `src/pages/tools/` are read-only — never renamed.
- The `toolId` prop passed to `ToolLayout.astro` is read-only — it always equals the original slug.
- Category fixes, metadata fixes, and SEO fixes affect **only** the `category`, `categorySlug`, `seo`, `relatedTools`, `icon`, and `description` fields — nothing that touches routing.
- No redirects will be added. No URL rewrites will be introduced.

> [!CAUTION]
> **BING INDEXING CONSTRAINT (Added 2026-08-01):** 194 planned tool pages are **already submitted to Bing Webmaster Tools** (July 30-31, 2026). These URLs have active indexing signals. **NEVER add noindex to any page.** Doing so would instruct Bing to de-index URLs that were deliberately submitted, causing ranking loss.

**Revised noindex strategy — ZERO pages will be noindexed:**
- All 539 tool pages remain fully indexable.
- Instead, we improve planned tool page quality: unique descriptions, correct categories, meaningful related tools, expanded keywords — so Bing finds genuinely useful content on every page.
- 31 implemented tools already in Bing get full functional pages with rich content.
- 194 planned tools already in Bing get improved metadata so they rank for their intended keywords.

**What changes when we fix categories:**
- Which tab a tool appears under on `/tools/` (display only)
- Which related tools appear in the sidebar (metadata only)
- The `categorySlug` field in JSON-LD schema (metadata only)
- The category badge displayed on the tool page (display only)

**What does NOT change:**
- The URL itself
- The file serving the page
- The `toolId` / slug identifier
- The canonical URL (already built from the unchanged `toolId`)

---

## DELIVERABLE 1 — Root Cause Analysis

### Architecture Overview

```
[tools-registry.ts]   <- SINGLE SOURCE OF TRUTH (18,264 lines, 523KB)
       |
[tools.ts]            <- Re-exports from registry (thin wrapper)
       |
[platform-tools.ts]   <- Generates planned tool stubs from tools-roadmap.ts
       |
[pages/tools/[slug].astro]  <- Dynamic router for all PlatformWorkbench tools
       |
[pages/tools/*.astro]       <- 28 standalone pages for custom-built tools
       |
[components/tools/PlatformWorkbench.astro]  <- Generic workbench for platform tools
[components/tools/DeveloperWorkbench.astro] <- Code-editor workbench (JSON, CSV, XML)
[components/tools/ToolLayout.astro]         <- Shared layout shell
```

### Root Cause 1 — Mass-Generated Registry with Template Pollution

The registry was generated in bulk using a script. This script applied copy-paste templates without per-tool customization:

- **301 planned tools** have the description: `"Clean, normalize, and calculate [Tool Name] locally in your browser."` — copied verbatim regardless of what the tool actually does.
- **511 of 539 tools** share the identical `relatedTools` array: `["json-formatter", "csv-to-json", "uuid-generator", "aspect-ratio-calculator"]` — meaningless cross-links for tools like `audio-lufs-calculator` or `pdf-metadata-remover`.
- **All 539 tools** use `"icon": "code"` — a single generic icon for every tool category including Finance, Audio, PDF, Typography, etc.
- **131 planned tools** have generic names like `"AI Estimator"`, `"Developer Checker"`, `"Audio Formatter"` — these are pattern fills, not real tools.

### Root Cause 2 — Category Misassignment (25 Implemented Tools)

The registry assigns every standalone Astro page tool to `"category": "Developer"` regardless of actual domain. The `tools-roadmap.ts` defines 42 distinct categories, but automated generation pushed all standalone tools into `Developer`:

| Tool | Registry Category | Correct Category |
|------|------------------|-----------------|
| `aspect-ratio-calculator` | Developer | Image |
| `16-9-dimensions-calculator` | Developer | Image |
| `9-16-dimensions-calculator` | Developer | Image |
| `dpi-print-size-calculator` | Developer | Image |
| `megapixels-to-resolution-calculator` | Developer | Image |
| `pixels-to-megapixels-calculator` | Developer | Image |
| `ppi-calculator` | Developer | Image |
| `resize-dimensions-calculator` | Developer | Image |
| `social-media-image-sizes` | Developer | Social Media |
| `youtube-video-size-calculator` | Developer | YouTube |
| `color-contrast-checker` | Developer | Design |
| `css-clamp-calculator` | Developer | Design |
| `px-to-rem` | Developer | Design |
| `json-formatter` | Developer | JSON |
| `json-minifier` | Developer | JSON |
| `json-to-xml` | Developer | JSON |
| `json-validator` | Developer | JSON |
| `csv-to-json` | Developer | CSV |
| `xml-formatter` | Developer | XML |
| `meta-tag-analyzer` | Developer | SEO |
| `opportunity-radar` | Developer | SEO |
| `schema-generator` | Developer | SEO |
| `sitemap-validator` | Developer | SEO |
| `profit-margin-calculator` | Developer | Finance |
| `percentage-difference-calculator` | Developer | Calculators |

**Impact:** Category filter on `/tools/` page shows wrong categories. `relatedTools` logic uses category matching, so wrong categories produce wrong cross-links. SEO signals for category pages are diluted.

### Root Cause 3 — Two-Tier Implementation Architecture (Routing Conflict Risk)

There are two distinct implementation paths for tools:

**Path A — Standalone Astro Page** (28 tools): Each tool has its own `.astro` file at `pages/tools/[tool-slug].astro`. These are excluded from the `[slug].astro` dynamic router via a hardcoded `standaloneAstroSlugs` Set.

**Path B — Dynamic PlatformWorkbench** (12 tools): Registry entries with `"component": "PlatformWorkbench"` are served by `[slug].astro` which renders `PlatformWorkbench.astro`.

**The conflict:** The `standaloneAstroSlugs` exclusion set in `[slug].astro` and the file system must be kept perfectly synchronized manually. Adding a new standalone page without updating the Set causes Astro to generate two conflicting static paths for the same slug.

### Root Cause 4 — PlatformWorkbench Slug-Based Dispatch (Two-Source-of-Truth)

`PlatformWorkbench.astro` uses a hardcoded keyword list to decide if a tool gets the functional workbench or the "Coming Soon" placeholder:

```javascript
const IMPLEMENTED_KEYWORDS = [
  'uuid-generator', 'json-diff', 'text-diff', 'base64',
  'url-parser', 'jwt', 'word-counter', 'reading-time',
  'case-converter', 'duplicate-remover', 'slug-generator',
];
const isImplemented = IMPLEMENTED_KEYWORDS.some((kw) => tool.slug.includes(kw));
```

**Critical defects:**
1. The registry `status: "implemented"` field is NOT consulted — the component has its own truth.
2. `jwt` matches both `jwt-debugger` AND `jwt-inspector` — fragile substring matching.
3. Any new tool requires updating this hardcoded list — maintenance trap.
4. Tools marked `status: "implemented"` in registry whose slug doesn't match will silently show "Coming Soon".

### Root Cause 5 — PlatformWorkbench Single-Function Dispatch

All 12 PlatformWorkbench tools share the same `runSpecialTool()` function in a single `<script is:inline>` block with if/else slug matching. This means:
- A typo in a slug check silently breaks that tool's functionality.
- Adding Tool #13 requires editing a 481-line component.
- The script block is re-emitted on every page (Astro `is:inline` is not deduplicated).

### Root Cause 6 — SEO Metadata Quality Deficiencies

All 539 tools share these metadata deficiencies:
- **THIN_KEYWORDS:** Every tool has only 3 keywords (slug, category, mode). Industry standard is 8-15 per page.
- **GENERIC_ICON:** Every tool uses `"icon": "code"` regardless of domain.
- **GENERIC_SEO_DESCRIPTION:** Many tools use the same description in both the tool `description` field and `seo.description` — no unique meta description.
- **NO canonicalUrl in registry:** The `seo.canonicalUrl` field is defined in the type but `undefined` for all tools.
- **FAQ content is generic:** The dynamic FAQs in `[slug].astro` for PlatformWorkbench tools use two hardcoded generic questions not specific to any tool.

### Root Cause 7 — Related Tools Logic Uses Wrong Categories

The `getRelatedToolsForSlug()` function filters by `t.category === tool.category`. Since 25 tools have `"Developer"` as their category regardless of actual domain, the related tools panel for `aspect-ratio-calculator` may show `json-diff` or `url-parser` — completely unrelated tools.

### Root Cause 8 — Planned Tools Publicly Accessible Without Noindex

All 499 planned tools generate static pages via `[slug].astro`. They render the `PlatformWorkbench` "Coming Soon" UI. However:
- 131 tools have generic names (`AI Estimator`, `Developer Checker`) that will harm SEO if indexed.
- 301 tools have the identical description pattern with only the tool name substituted.
- These pages are not noindexed or excluded from sitemap.

### Root Cause 9 — Duplicate Registry Sources

Two partially overlapping tool systems:
1. `tools-registry.ts` — The canonical registry (539 tools, used by `[slug].astro`)
2. `platform-tools.ts` — A separate generator reading from `tools-roadmap.ts` creating `PLATFORM_TOOLS`

The `tools/index.astro` page uses `PLATFORM_TOOLS` for display counts and category filters. The `[slug].astro` uses `UNIFIED_TOOLS_REGISTRY` for routing. These two systems can diverge silently.

---

## DELIVERABLE 2 — Architecture Problems Summary

| # | Problem | Severity | Tools Affected |
|---|---------|----------|---------------|
| 1 | Category misassignment in registry | HIGH | 25 implemented |
| 2 | Generic `relatedTools` array | HIGH | 511 of 539 |
| 3 | Generic `icon: "code"` | MEDIUM | 539 of 539 |
| 4 | Thin SEO keywords (3 per tool) | MEDIUM | 539 of 539 |
| 5 | PlatformWorkbench hardcoded slug list | HIGH | 12 implemented |
| 6 | Registry status vs component keyword mismatch | HIGH | 12 implemented |
| 7 | Planned tools with placeholder descriptions | MEDIUM | 301 planned |
| 8 | Generic FAQ subtitle hard-coded in ToolLayout | LOW | All tools |
| 9 | Dual tool systems divergence risk | HIGH | 539 |
| 10 | Exclusion set in `[slug].astro` manually maintained | HIGH | 28 standalone |
| 11 | No noindex for planned/stub tools | MEDIUM | 499 planned |
| 12 | Category filter uses `PLATFORM_TOOLS`, routing uses `UNIFIED_TOOLS_REGISTRY` | HIGH | All |

---

## DELIVERABLE 2 — Complete Repair Strategy (8 Phases)

### Phase 1 — Architecture Cleanup & Foundation

**Objective:** Eliminate dual-system confusion. Establish a single source of truth. Create scaffolding for safe batch repairs.

**Files Involved:**
- `src/config/tools-registry.ts`
- `src/config/platform-tools.ts`
- `src/config/tools.ts`
- `src/pages/tools/[slug].astro`

**Changes:**
1. Add `noindex?: boolean` to the `UnifiedTool` type. Set `true` for all `status: "planned"` tools with generic names.
2. Add a build-time helper to `tools-registry.ts` that validates the exclusion set matches standalone `.astro` files.
3. Audit `platform-tools.ts` vs `tools-registry.ts` — confirm they serve different consumers and document the division.
4. Add a migration script to identify category misassignments programmatically.

**Estimated Effort:** 1-2 days
**Risk:** Low — no user-visible changes
**Validation:** TypeScript compilation passes; no new routing conflicts; both systems return consistent counts.

---

### Phase 2 — Registry Consolidation

**Objective:** Fix all 25 category misassignments for implemented tools. Fix generic `relatedTools`. Fix thin SEO keywords. Assign correct icons.

**Files Involved:**
- `src/config/tools-registry.ts`

**Changes:**
1. Correct `category` and `categorySlug` for all 25 misassigned tools.
2. Replace generic `relatedTools` arrays with semantically correct cross-links.
3. Expand `seo.keywords` from 3 to 8-15 per tool.
4. Replace `"icon": "code"` with semantically appropriate icon names per category.
5. Ensure `seo.description` is unique from `description` field.

**Estimated Effort:** 3-4 days
**Risk:** Low — metadata-only changes; no functional impact
**Validation:** Run audit script; zero generic arrays remain; verify category filters on `/tools/`.

---

### Phase 3 — Routing Verification

**Objective:** Ensure every implemented tool routes to the correct page. Eliminate routing conflict risk.

**Files Involved:**
- `src/pages/tools/[slug].astro`
- `src/pages/tools/*.astro` (28 standalone files)

**Changes:**
1. Replace the hardcoded `standaloneAstroSlugs` Set with a programmatic scan of `pages/tools/*.astro` files.
2. Add build-time assertion: if a slug exists in both standalone file system and registry as `PlatformWorkbench`, throw a build error.
3. Verify all 28 standalone page `toolId` props match the slug in `tools-registry.ts`.

**Estimated Effort:** 1 day
**Risk:** Medium — build configuration change; test build before merging
**Validation:** `npm run build` completes without errors; spot-check 10 URLs; no 404s.

---

### Phase 4 — Component Verification

**Objective:** Fix the `PlatformWorkbench` two-source-of-truth problem. Make it data-driven from registry `status` field.

**Files Involved:**
- `src/components/tools/PlatformWorkbench.astro`
- `src/pages/tools/[slug].astro`

**Changes:**
1. Pass an `isImplemented: boolean` prop from `[slug].astro` to `PlatformWorkbench` (parent knows the registry `status`).
2. Remove the hardcoded `IMPLEMENTED_KEYWORDS` array from `PlatformWorkbench.astro`.
3. Verify every PlatformWorkbench tool whose `status === "implemented"` correctly renders the functional workbench.

**Estimated Effort:** 1 day
**Risk:** Medium — component logic change; requires testing all 12 PlatformWorkbench tools
**Validation:** Visit all 12 PlatformWorkbench tool URLs; confirm functional UI; confirm "Coming Soon" shows for planned tools.

---

### Phase 5 — Functionality Verification (Batch by Batch)

**Objective:** Verify each implemented tool performs its stated function correctly.

**Files Involved:**
- All `src/pages/tools/*.astro` standalone files
- `src/components/tools/DeveloperWorkbench.astro`
- `src/components/tools/PlatformWorkbench.astro`
- `src/utils/tools-math.ts`

**Batch Order:**
1. PlatformWorkbench text tools (12 tools)
2. JSON/CSV/XML converter tools via DeveloperWorkbench (9 tools)
3. Image calculator tools (9 tools)
4. SEO/Web tools (5 tools)
5. Design/CSS tools (3 tools)
6. Finance/Math tools (2 tools)

**Estimated Effort:** 3-5 days
**Risk:** High — functional regressions are possible
**Validation:** Each tool's output manually verified against known correct results.

---

### Phase 6 — SEO Verification

**Objective:** Ensure every implemented tool has correct canonical URLs, schema markup, breadcrumbs, and meta content.

**Files Involved:**
- `src/components/tools/ToolLayout.astro`
- `src/layouts/BaseLayout.astro`
- All 28 standalone `src/pages/tools/*.astro` files
- `src/config/tools-registry.ts`

**Specific issues to fix:**
- Remove generic `"Common questions regarding dimensions, aspect ratios..."` FAQ subtitle from `ToolLayout.astro` — hard-coded for aspect ratio context but shows on every tool page.
- Add tool-specific FAQ items to all PlatformWorkbench tools (currently using two generic questions).

**Estimated Effort:** 2-3 days
**Risk:** Low
**Validation:** HTML validation; meta tags verified in browser; JSON-LD validated.

---

### Phase 7 — Testing

**Objective:** Confirm all changes have not regressed any working functionality.

**Test Scope:**
1. **Build test:** `npm run build` must complete without errors.
2. **Route test:** Every implemented tool URL must return HTTP 200 with the correct title.
3. **Functionality test:** All 40 implemented tools pass the Deliverable 4 checklist.
4. **Regression test:** JSON Formatter, Aspect Ratio Calculator, and Profit Margin Calculator must produce correct output.
5. **SEO test:** 10 random tool pages pass the SEO checklist.
6. **Mobile test:** All 40 tools render correctly on 375px viewport.

**Estimated Effort:** 2 days
**Risk:** Low
**Validation:** Zero failing checklist items; zero console errors on target pages.

---

### Phase 8 — Deployment

**Objective:** Deploy verified changes to production.

**Steps:**
1. Run `npm run build` to generate static site.
2. Deploy to Cloudflare Pages (per `wrangler.toml`).
3. Verify key tool URLs return correct content in production.
4. Submit updated sitemap to Google Search Console.
5. Monitor for 404 errors and Core Web Vitals changes.

**Estimated Effort:** 0.5 days
**Risk:** Low if all previous phases pass
**Validation:** Production spot-check of 10 tool URLs; sitemap submitted.

---

## DELIVERABLE 3 — Batch Implementation Strategy

### Batch 0 — Infrastructure (Pre-Batch) [DO FIRST]

**Scope:** Architecture and registry foundation changes. No functional tool changes.

**Items:**
1. Fix 25 category misassignments in registry
2. Fix generic `relatedTools` arrays for all 40 implemented tools
3. Fix thin SEO keywords for all 40 implemented tools
4. Add `isImplemented` prop to `PlatformWorkbench` component
5. Remove hardcoded `IMPLEMENTED_KEYWORDS` from PlatformWorkbench
6. Fix generic FAQ subtitle in `ToolLayout.astro`
7. Add tool-specific FAQs for 12 PlatformWorkbench tools

**Files:** `tools-registry.ts`, `PlatformWorkbench.astro`, `ToolLayout.astro`
**Estimated Effort:** 2 days

---

### Batch 1 — PlatformWorkbench Text & Developer Tools (12 tools)

| Tool | Category | Mode |
|------|----------|------|
| json-diff | Developer | transform |
| text-diff | Developer | transform |
| base64-encoder | Developer | generator |
| url-parser | Developer | calculator |
| jwt-debugger | Developer | analyzer |
| jwt-inspector | Developer | analyzer |
| uuid-generator | Developer | generator |
| word-counter | Text | calculator |
| reading-time-calculator | Text | calculator |
| case-converter | Text | transform |
| duplicate-remover | Text | transform |
| slug-generator | Text | generator |

---

### Batch 2 — JSON/Data Format Tools via DeveloperWorkbench (9 tools)

| Tool | Category | Primary Function |
|------|----------|-----------------|
| json-formatter | JSON | Format/beautify JSON |
| json-minifier | JSON | Minify JSON |
| json-validator | JSON | Validate JSON |
| json-to-xml | JSON | Convert JSON to XML |
| json-to-typescript | Developer | Generate TypeScript interfaces |
| csv-to-json | CSV | Convert CSV and JSON |
| xml-formatter | XML | Format XML |
| yaml-to-json | Developer | Convert YAML to JSON |
| svg-to-jsx | Developer | Convert SVG to JSX |

---

### Batch 3 — Image Calculator Tools (9 tools)

| Tool | Category | Primary Function |
|------|----------|-----------------|
| aspect-ratio-calculator | Image | Ratio from W x H; resize dimensions |
| 16-9-dimensions-calculator | Image | 16:9 dimension lookup table |
| 9-16-dimensions-calculator | Image | 9:16 dimension lookup table |
| dpi-print-size-calculator | Image | DPI x print size to pixel size |
| megapixels-to-resolution-calculator | Image | MP to resolution pairs |
| pixels-to-megapixels-calculator | Image | Pixel W x H to MP |
| ppi-calculator | Image | PPI from screen size + resolution |
| resize-dimensions-calculator | Image | New dimensions preserving ratio |
| youtube-video-size-calculator | YouTube | YT thumbnail/video dimensions |

---

### Batch 4 — SEO & Web Tools (5 tools)

| Tool | Category | Primary Function |
|------|----------|-----------------|
| meta-tag-analyzer | SEO | Analyze URL meta tags |
| schema-generator | SEO | Generate JSON-LD schema |
| sitemap-validator | SEO | Validate XML sitemap |
| opportunity-radar | SEO | Keyword opportunity analysis |
| social-media-image-sizes | Social Media | Reference table for image specs |

---

### Batch 5 — Design & CSS Tools (3 tools)

| Tool | Category | Primary Function |
|------|----------|-----------------|
| color-contrast-checker | Design | WCAG contrast ratio check |
| css-clamp-calculator | Design | Generate CSS clamp() values |
| px-to-rem | Design | px to rem conversion |

---

### Batch 6 — Finance & Math Tools (2 tools)

| Tool | Category | Primary Function |
|------|----------|-----------------|
| profit-margin-calculator | Finance | Gross margin + markup + fees |
| percentage-difference-calculator | Calculators | Percentage difference between values |

---

## DELIVERABLE 4 — Per-Tool Verification Checklist

For every tool in every batch, verify all of the following:

```
Routing
  [ ] Correct route           (URL matches /tools/[slug]/)
  [ ] Correct slug            (slug in registry matches file/route)

Metadata
  [ ] Correct title           (unique, descriptive, contains keyword)
  [ ] Correct description     (unique, 140-160 chars, matches actual function)
  [ ] Correct category        (matches actual domain, not "Developer" for non-dev tools)
  [ ] Correct registry entry  (status, component, categorySlug are accurate)
  [ ] Correct metadata        (title, description, keywords in registry)
  [ ] Correct canonical       (canonical URL constructed correctly)
  [ ] Correct schema          (WebApplication + FAQPage JSON-LD present)
  [ ] Correct breadcrumbs     (Home > Tools > [Tool Name])

Component
  [ ] Correct component       (PlatformWorkbench vs DeveloperWorkbench vs custom)
  [ ] Correct imports         (no unused or missing imports in .astro file)
  [ ] Correct layout          (ToolLayout with correct toolId prop)

UI / Inputs
  [ ] Correct UI              (inputs match intended function)
  [ ] Correct inputs          (labels, types, defaults, placeholders accurate)
  [ ] Correct buttons         (Format/Calculate/Analyze/Generate as appropriate)

Functionality
  [ ] Correct calculations    (math verified against known values)
  [ ] Correct parser          (handles valid and invalid input correctly)
  [ ] Correct formatter       (output is formatted correctly)
  [ ] Correct validator       (validation logic is accurate)
  [ ] Correct generator       (generated output matches spec)
  [ ] Correct analyzer        (analysis results are accurate)
  [ ] Correct planner         (planned output is logical)
  [ ] Correct output          (output panel shows result clearly)
  [ ] Correct download        (file downloads with correct content and extension)
  [ ] Correct copy            (clipboard receives correct text)

Cross-Linking
  [ ] Correct related tools   (semantically related, correct category)
  [ ] Correct internal links  (links in content section are valid URLs)

Quality
  [ ] Mobile responsive       (375px viewport renders without overflow)
  [ ] Accessible              (labels for inputs, sr-only H1 when header hidden)
  [ ] No console errors       (clean browser console on load and interaction)
  [ ] No broken functionality (all interactive elements respond correctly)
```

---

## DELIVERABLE 5 — Functionality Determination Protocol

When functionality is unclear, use this hierarchy:

1. **Slug** — The URL slug is the most reliable intent signal. `ppi-calculator` must calculate PPI.
2. **Title** — The display title confirms intent. "Profit Margin & Fee Calculator" is unambiguous.
3. **Description** — The description field adds context.
4. **Existing Implementation** — If there is working code, preserve it exactly.
5. **Category** — The category narrows the domain.
6. **Related tools** — Adjacent tools suggest the tool's place in a workflow.

**If functionality CANNOT be confidently determined:**
- Mark the tool as `status: "draft"` in the registry.
- Do NOT write placeholder code.
- Document the ambiguity in the QA report.
- Recommend a specification before implementation.

**Never:**
- Guess functionality and implement it.
- Copy another tool's logic without confirming intent.
- Use generic calculator templates that don't match the tool's purpose.

---

## DELIVERABLE 6 — Implementation Rules

0. **NEVER change a URL.** Tool slugs, `href` fields, `.astro` filenames, and `toolId` props are permanently locked. Any fix that would require changing a URL is out of scope and must be rejected. URLs of the form `https://nadhebe.com/tools/[slug]/` are immutable for the entire lifetime of the platform.
1. **Never replace working tools.** If a tool has a working standalone `.astro` page, preserve it. Only fix metadata in the registry.
2. **Never overwrite working functionality.** If `DeveloperWorkbench.astro` correctly formats JSON, do not touch that code while fixing category metadata.
3. **Never introduce placeholder code.** If a planned tool needs to become implemented, it must receive a full, functional implementation.
4. **Never use generic calculator templates.** Each tool must have its own purpose-built UI and logic.
5. **Never reuse another tool's implementation** unless tools are genuinely equivalent and intentionally share a component.
6. **Every fix must be followed by verification.** Run the checklist before marking it complete.

---

## DELIVERABLE 7 — QA Report Template (per batch)

```
# QA Report — Batch [N]: [Batch Name]
Date: [DATE]

## Summary
| Metric                                | Count |
|---------------------------------------|-------|
| Tools audited                         |       |
| Tools passed (no changes needed)      |       |
| Tools fixed                           |       |
| Tools deferred (complexity/ambiguity) |       |
| High-risk findings                    |       |

## Tools Audited
| Slug | Issues Found | Resolution |
|------|-------------|------------|

## Fixes Applied
[List of specific changes per file]

## High-Risk Findings
[Findings that could affect other tools or require architectural discussion]

## Architectural Improvements
[Systemic improvements made during this batch]

## Files Modified
[List of files changed with a brief description of each change]

## Regression Testing
[Confirm existing working tools still pass their checklists]

## Pass/Fail Summary
| Tool | Result | Notes |
|------|--------|-------|
| [slug] | PASS   |       |
| [slug] | FIXED  | Category corrected |
| [slug] | DEFER  | Ambiguous intended calculation |
```

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Accidentally modifying a slug or href | Low | Critical | All slug/href fields are read-only; enforce via code review checklist |
| Category fix breaks filter UI | Medium | High | Test filter after Phase 2 before Phase 5 |
| PlatformWorkbench prop change breaks 12 tools | Medium | High | Run all 12 tools in dev before committing |
| Slug exclusion set diverges from file system | Low | Critical | Automate exclusion set generation in Phase 3 |
| Build fails after registry changes | Low | High | TypeScript compilation check after each batch |
| Related tools links point to non-existent slugs | Medium | Medium | Script to validate all relatedTools slugs exist in registry |
| Planned tool pages harm SEO (indexed stubs) | High | Medium | Add noindex meta for planned tools in Phase 6 |
| DeveloperWorkbench `toolMode` prop mismatch | Low | High | Verify all 9 DeveloperWorkbench pages pass correct mode |

---

## Success Criteria

The project is complete only when all of the following are true:

- [ ] **Zero URL changes have been made.** Every tool URL is identical to its original form. No slugs renamed, no files renamed, no redirects added.
- [ ] Every implemented tool has been individually audited via the Deliverable 4 checklist.
- [ ] Every implemented tool loads its correct component (no cross-loading).
- [ ] Every implemented tool performs its intended function without errors.
- [ ] No implemented tool displays another tool's UI.
- [ ] No placeholder implementations remain in any `status: "implemented"` tool.
- [ ] No routing mismatches remain (every slug serves its intended page — without renaming anything).
- [ ] No registry mismatches remain (category, description, relatedTools are all tool-specific).
- [ ] No broken calculations remain (all formulas verified against known values).
- [ ] No broken metadata remains (title, description, canonical, schema are all correct).
- [ ] No duplicate functionality remains (no two tools serve the same purpose unintentionally).
- [ ] Every `status: "planned"` tool is clearly marked and excluded from indexing until implemented.
- [ ] The registry is the single source of truth for all tool metadata.

---

## Open Questions (Require Your Decision Before Execution)

> [!IMPORTANT]
> **Q1 — Category for `json-to-typescript` and `yaml-to-json`:** These tools currently have `category: Developer` which is arguably correct (developer-specific transformations). Should they remain in `Developer` or be moved to `JSON`/`Developer` subcategories?

> [!IMPORTANT]
> **Q2 — Noindex strategy: RESOLVED — NO PAGES WILL BE NOINDEXED**
>
> **Finding:** 194 planned tool pages are already submitted to Bing (July 30-31, 2026). 31 implemented pages are also in Bing. Adding noindex to submitted URLs would cause Bing to remove pages with active indexing signals — a ranking regression.
>
> **Decision:** Zero pages will be noindexed. All 539 tool pages remain fully indexable. Planned tool pages are improved through metadata quality (description, category, related tools, keywords) rather than hidden.

> [!IMPORTANT]
> **Q3 — `platform-tools.ts` deprecation:** The `PLATFORM_TOOLS` export from `platform-tools.ts` is used by `tools/index.astro` for category counts and display. Should this be migrated to use `UNIFIED_TOOLS_REGISTRY` directly, or kept as a separate display layer?

> [!WARNING]
> **Q4 — Text category tools:** `word-counter`, `reading-time-calculator`, `case-converter`, `duplicate-remover`, and `slug-generator` are currently listed under `category: Developer` in the registry. Should all 5 be moved to `category: Text`? The roadmap defines `Text` as a separate category.

> [!CAUTION]
> **Q5 — `opportunity-radar` category:** This tool has its own custom implementation (`OpportunityRadarCard.astro`) and appears to be an SEO content opportunity finder. Is the correct category `SEO` or `Marketing`? This affects which related tools it links to.
