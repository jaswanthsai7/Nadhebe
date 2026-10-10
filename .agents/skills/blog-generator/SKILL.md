---
name: blog-generator
description: Generate production-ready, expert-level technical AI engineering articles, guides, tutorials, and comparisons for Nadhebe. Implements deep research, GEO/AEO direct answer blocks, strict factual verification, vintage editorial artwork, and automated build verification.
---

# Nadhebe Master Technical Blog Generation & Publishing Engine

Use this skill whenever a user provides a topic, article idea, video transcript, or raw notes to generate production-ready, expert-level technical articles for Nadhebe.

---

## 1. End-to-End Blog Writing Workflow

Every article generated for Nadhebe must execute this sequential workflow:

```
┌─────────────────────────┐
│ 1. RESEARCH & INTENT    │ → Identify primary keyword, search intent, AEO queries,
│                         │   and analyze competing SERP pages (via `keyword-research` & `ai-seo`)
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 2. FACT VERIFICATION    │ → Verify technical claims against official vendor docs.
│                         │   Strict zero-fabrication: NO fake stats, fake quotes, or anecdotes.
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 3. COLLECTION SELECTION │ → Assign to most relevant collection: `guides`, `tutorials`,
│                         │   `comparisons`, `news`, `tool-reviews`, or `best-practices`.
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 4. DRAFTING & GEO/AEO   │ → Write with single H1, 2-3 sentence direct answer blocks under H2s,
│                         │   structured comparison tables, code blocks, and Mermaid diagrams.
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 5. HERO ART GENERATION  │ → Generate 16:9 Vintage Editorial Collage artwork via `generate_image`,
│                         │   convert to WebP and save to `public/images/<slug>-hero.webp`.
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│ 6. PRE-PUBLISH AUDIT    │ → Run `content-quality-auditor` checklist, verify internal links,
│                         │   and ensure `npm run build` passes with 0 broken links.
└─────────────────────────┘
```

---

## 2. Content Collection Routing

Assign the article to the exact matching directory under `src/content/`:
- `src/content/tutorials/`: Hands-on step-by-step developer code walkthroughs, CLI setup guides, MCP tools, serverless deployments.
- `src/content/guides/`: Enterprise architecture breakdowns, pricing matrices, CI/CD pipeline automation, context engineering playbooks.
- `src/content/comparisons/`: Head-to-head model/tool benchmark reports (e.g. `vLLM vs Ollama`, `Claude Code vs Cursor`).
- `src/content/news/`: Major model releases, breaking benchmark announcements.
- `src/content/tool-reviews/`: In-depth single product/model evaluation reviews.
- `src/content/best-practices/`: Production engineering patterns, security audits, and latency optimization.

*Do not force articles into irrelevant collections.*

---

## 3. Article Markdown Frontmatter Schema

Every generated Markdown file must strictly conform to Nadhebe's Astro content schema (`src/content/config.ts`):

```markdown
---
title: "Primary Keyword First: Action / Benefit Target | Nadhebe"
description: "Comprehensive 150-160 character meta description containing primary keyword."
pubDate: 2026-10-10
updatedDate: 2026-10-10
author: nadhebe-team
category: "Guides" | "Tutorials" | "Comparisons" | "News" | "Reviews"
tags: ["Keyword1", "Keyword2", "Keyword3"]
heroImage: "/images/<slug>-hero.webp"
heroAlt: "Minimalist vintage editorial illustration representing <topic> on a <color> background"
estimatedReadingTime: 12
isPillar: true | false
topic: "Topic Cluster Name" # e.g. "AI Tool Costs", "Model Serving"
searchIntent: "informational" | "commercial" | "tutorial" | "comparison"
parentPillar: "<parent-slug>" # Optional (only if isPillar is false)
draft: false
itemsCompared: ["Item A", "Item B"] # Optional (only for comparisons)
faq:
  - question: "Direct user query?"
    answer: "Clear, factual, authoritative answer block."
  - question: "Another frequent question?"
    answer: "Concise answer without marketing fluff."
sources:
  - label: "Official Documentation"
    url: "https://example.com/docs"
  - label: "GitHub Repository / Benchmarks"
    url: "https://github.com/..."
---
```

---

## 4. Technical Depth, GEO/AEO & Editorial Standards

- **Strict Factual Accuracy**: Never fabricate statistics, token pricing, benchmarks, or citations. If a number is unknown or estimated, state it explicitly as directional.
- **Zero AI Clichés**: Prohibit empty filler words (*"In today's fast-paced digital world"*, *"delve into"*, *"game changer"*, *"seamlessly"*).
- **Direct Answer Blocks (GEO/AEO)**: Under every H2, write a self-contained 2–3 sentence direct answer block that can be cited in Google AI Overviews or Perplexity.
- **Structured Data Tables**: Format complex pricing, feature matrices, or benchmark results into clean Markdown tables.
- **Originality Threshold**: Minimum 70% original synthesis, code examples, Mermaid diagrams, performance tables, and decision trees.

---

## 5. Hero Artwork Specification (Vintage Editorial Collage)

All hero images generated for Nadhebe blogs must follow the **Vintage Editorial Mixed-Media Collage** style:

### Aesthetic Principles:
- **Canvas / Background**: Flat pastel or muted neutral tones (Sage Green `#87A987`, Soft Olive `#A3B18A`, Warm Sand `#F4F1DE`, Soft Terracotta `#E07A5F`, Muted Mint `#B7E4C7`, Soft Lavender `#D8B4F8`).
- **Visual Subject Cutouts**: High-contrast black-and-white or duotone cutouts of tech subjects (terminals, server racks, network graph nodes, calculators, keyboards) paired with subtle botanical leaves.
- **Geometric Elements**: Concentric circles, solid yellow/orange accent suns (`#F4A261`), and vintage halftone textures.
- **Anti-Patterns**: ❌ ZERO neon 3D glowing spheres, ❌ ZERO muddy black backgrounds, ❌ ZERO artificial text watermarks.

### Image Prompt Template for `generate_image`:
```text
Vintage editorial collage illustration on a [COLOR PALETTE] background. A black and white cutout of [SUBJECT A] and [SUBJECT B], surrounded by warm yellow geometric circles, vintage magazine halftone textures, and subtle green plant leaves. Clean minimal tech art style, 16:9 ratio
```

---

## 6. Post-Generation Execution & Build Verification

After creating or updating blog posts:
1. Convert the generated artifact image to WebP and save to `public/images/<slug>-hero.webp`.
2. Run `npm run build` to compile static HTML pages and trigger Pagefind search indexing.
3. Verify that `scripts/verify-links.ts` passes with **0 broken links**.
4. Run `git add .`, `git commit -m "..."`, and `git push` to deploy to GitHub.
