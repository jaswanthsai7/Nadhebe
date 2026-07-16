# SEO STRATEGY

## Nadhebe Optimization Architecture

SEO is the highest engineering priority at Nadhebe. This document defines the technical rules, structure, metadata fields, and automation requirements that guarantee crawlability and ranking.

---

## 1. Topical Authority & Cluster Architecture

Nadhebe organizes content around structured hubs (Topic Clusters) rather than standalone chronologies.

### Pillar vs. Supporting Content
* **Pillar Page**: A comprehensive overview article for a core technology (e.g., `GPT-5.6` or `Google Flow`). It is flagged with `isPillar: true` in the frontmatter.
* **Supporting Articles**: Specialized detailed posts (e.g., tutorials, comparisons, guides, news, best practices) pointing back to the Pillar Page using the `parentPillar` reference.
* **Internal Linking**: Supporting articles must link back to their parent Pillar Page. The Pillar Page must reference and list its supporting sub-articles.

---

## 2. Meta Tags & Validation Requirements

Every article must contain a unique SEO block:

```yaml
title: "Unique Title — Focus Keyword Included"
description: "Compelling meta description under 160 characters summarizing the article."
pubDate: 2026-07-17
canonicalUrl: "https://nadhebe.com/category/slug"
category: "AI"
tags: ["topic-tag"]
searchIntent: "Identify search intent (informational, transactional, comparison)"
```

* **Zero Cannibalization**: No two articles should target the exact same keyword. Distinct focus topics must be designated.
* **Metadata Checks**: The layout wrapper must automatically inject open graph (`og:image`, `og:title`) and Twitter metadata tags dynamically.

---

## 3. Structured Data & Schema.org Markup

To display rich snippets in search engine result pages (SERPs), specific JSON-LD schemas are automatically injected inside `<head>` depending on the content type:

* **Article Schema**: Injected on all blogs (`ArticleSchema.astro`). Tracks author profiles, dates, titles, and body content.
* **Video Schema**: Automatically injected (`VideoSchema.astro`) if the post contains a YouTube video ID (`videoId` or `youtubeVideoId`). Displays duration, uploads dates, and video thumbnails.
* **Review Schema**: Injected on all `/reviews/` pages (`ReviewSchema.astro`). Displays verdict ratings (0-10), pricing details, pros, and cons.
* **FAQ Schema**: Injected (`FAQSchema.astro`) if the article frontmatter contains a structured list of FAQs (`faq` arrays).

---

## 4. Performance & Crawlability Guidelines

* **Page speed**: Static page generation (SSG) via Astro, keeping client-side JavaScript to an absolute minimum. Target page loads under 1s.
* **Pagefind Search Indexing**: Pagefind index is rebuilt during build-time. Search results must load instantly on static indexes without server queries.
* **Semantic HTML**: Maintain clean document hierarchies.
  - Exactly one `<h1>` per page.
  - Structured headings `<h2>` followed logically by `<h3>`.
  - Accessible link descriptors (never use "click here").

---

## 5. Automated Build Verification

The build pipeline enforces code and content sanity:
* **Verify Links**: Running `scripts/verify-links.ts` parses all generated HTML files in `/dist` to ensure 100% of internal links are valid and active. Build fails if a broken reference is found.
* **Sitemap Generation**: Generates standard sitemaps, image sitemaps (`dist/sitemap-image.xml`), and video sitemaps (`dist/sitemap-video.xml`) during compilation.
