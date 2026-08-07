# Nadhebe Technical SEO, Search Appearance & Engineering Specification

This master specification synthesizes **Google Search Central's Official SEO Fundamentals, Ranking & Search Appearance Standards, Developer Guidelines, and Helpful Content Systems** into a mandatory engineering blueprint for the Nadhebe platform.

---

## 1. Technical SEO & Architecture (Google Developer's Guide to Search)

### A. Rendering & Indexability
* **Static Site Generation (SSG)**: Every tool, article, comparison matrix, and programmatic route MUST pre-render to clean static HTML at build time (`dist/`).
* **Canonical URLs**: Every page MUST define an absolute `<link rel="canonical" href="https://nadhebe.com/path/">` tag with a trailing slash to prevent duplicate content indexing.
* **Semantic HTML Hierarchy**:
  * Exactly **one `<h1>` tag** per page.
  * Proper heading sequence (`<h1>` → `<h2>` → `<h3>`).
  * Use HTML5 semantic elements (`<header>`, `<main>`, `<article>`, `<aside>`, `<footer>`, `<nav>`).
* **Interactive Element Accessibility**: All buttons, inputs, selects, and textareas MUST have unique `id`, `name`, `for`, and `aria-label` attributes for accessibility and automated link/E2E testing.

### B. Structured Data (JSON-LD Schemas)
Every page MUST output valid JSON-LD script blocks in the `<head>`:
1. **WebSite & Brand Identity**: `WebSite` schema (`name: "Nadhebe"`, `alternateName: ["Nadhebe Dev Tools", "Nadhebe AI"]`, `url: "https://nadhebe.com"`).
2. **Developer Tools**: `WebApplication` schema (`name`, `applicationCategory`, `operatingSystem`, `offers`).
3. **Educational Content**: `FAQPage` schema mapping all Accordion Q&A pairs.
4. **Articles & Guides**: `TechArticle` / `BlogPosting` schema (`headline`, `author`, `datePublished`, `dateModified`, `image`).
5. **Media Content**: `VideoObject` and `ImageObject` schemas for embedded videos and visuals.
6. **Navigation**: `BreadcrumbList` schema outlining exact hierarchical pathing (`Home` → `Category` → `Tool`).

### C. Web Vitals & Hydration Lifecycle
* **Client-Side Script Isolation**: Inline tool scripts MUST use named initialization functions guarded against null elements.
* **Astro View Transitions Compatibility**: All client-side scripts MUST register with `document.addEventListener('astro:page-load', initFn)` to execute properly on both direct page loads and SPA routing.
* **Zero Layout Shift (CLS < 0.1)**: Interactive elements, previews, and icons must specify fixed dimensions or relative overlays to prevent layout shifts during interaction or hydration.

---

## 2. Ranking & Search Appearance (Google Search Central Guidelines)

### A. Title Links, Meta Snippets & Robots Meta
* **Title Tag Formula**: Primary Keyword First + Action / Benefit + ` | Nadhebe` (e.g. `CSS Grid Layout Generator & Visual Builder | Nadhebe`).
* **Meta Descriptions**: 140–155 character compelling summary matching explicit search intent.
* **Robots Meta Tag**: `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />`.
* **Site Names & Favicons**: Standardized SVG and PNG favicons (`favicon.svg`, `apple-touch-icon.png`) to ensure brand logo rendering in Google Search Results.

### B. Generative Engine Optimization (GEO) & AI Overviews
* **Direct Answer Blocks**: Articles must feature concise 2-3 sentence summaries under H2/H3 headers for Google AI Overviews, Perplexity, and ChatGPT Search.
* **LLM Knowledge Endpoints**: Maintain automated `llms.txt` and `llms-full.txt` endpoints for AI crawler discovery.
* **Factual Tables & Comparison Matrices**: Standardized markdown and HTML comparison tables for LLM data extraction.

### C. Image & Video Search Optimization
* **Image Assets**: High-resolution WebP/SVG images with explicit `width` and `height` attributes to prevent CLS.
* **Alt Text & Captions**: Descriptive, non-stuffed alt text for every visual element.
* **Media Sitemaps**: Automated build-time generation of `sitemap-image.xml` and `sitemap-video.xml`.

### D. Google Discover & Page Experience
* **Hero Image Resolution**: Every long-form article MUST include a hero image at least 1,200px wide.
* **Core Web Vitals Target**: LCP < 1.2s, INP < 100ms, CLS < 0.1.

---

## 3. Google Helpful Content & E-E-A-T Guidelines

### A. People-First Content (E-E-A-T: Experience, Expertise, Authoritativeness, Trust)
* **Original Synthesis**: Articles and guides MUST provide at least 70% original technical research, benchmark data, architectural diagrams, and implementation analysis.
* **No Thin Content**: Every tool page MUST include comprehensive documentation (minimum 1,500+ words) covering use cases, step-by-step guides, property reference tables, and FAQs.
* **Generative AI Quality Standards**: Content must satisfy explicit search intent. Auto-generated text must be expert-reviewed, technical, accurate, and actionable.

### B. Anti-Cannibalization & Keyword Targeting
* **1:1 Keyword Scoping**: Every standalone page and programmatic route MUST target a unique primary long-tail developer keyword.
* **Programmatic SEO Routing**: Sub-routes (e.g. `/tools/sql-formatter/postgresql/`, `/tools/llm-tokenizer/gpt-4o/`) must provide dialect-specific code examples, benchmarks, and custom descriptions, never copied boilerplate.

---

## 4. UI/UX & Interactive Workbench Specifications

### A. Element Scoping & Component Isolation
* **1:1 Slug to ToolID Mapping**: The Astro filename (e.g. `css-grid-generator.astro`) MUST match `toolId="css-grid-generator"` and `src/config/tools-registry.ts` slug exactly.
* **Isolated Workbench Element IDs**: Input, output, preview, and button IDs must be unique to the tool (e.g. `grid-cols`, `flex-dir`, `b64i-file-input`) to prevent cross-workbench collision.

### B. Micro-Interactions & Copy Button Standards
* **Clipboard Interaction Pattern**:
  * Copy buttons MUST attempt text extraction in order: `data-copy-val` → `data-copy-target` ID → `textarea` / `code` / `pre` / `table` inside the card → fallback element text.
  * Table content MUST format cleanly into structured text (`Key: Value`).
* **Visual Confirmation Animation**:
  * Clipboard icon scales down (`transform: scale(0); opacity: 0`).
  * Checkmark tick icon (✓) scales up (`transform: scale(1); opacity: 1`).
  * Button border & text highlight in `emerald-500` green for 2,000ms before returning to resting state.

---

## 5. Continuous Build Verification & Link Integrity

Before declaring any feature complete or pushing code to remote:
1. **Production Compilation**: Execute `npm run build` cleanly.
2. **Postbuild Link Audit**: Verify 0 broken links across all HTML pages.
3. **Sitemap Synchronization**: Ensure `sitemap-0.xml`, `sitemap-image.xml`, `sitemap-video.xml`, and `sitemap-index.xml` are updated and formatted.
