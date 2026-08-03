---
name: blog-generator
description: Generate production-ready technical AI engineering blog posts, guides, and comparisons from topics or notes using vintage editorial artwork specifications.
---

# Nadhebe Technical Blog Generation Engine & Art Style Specification

Use this skill whenever a user provides a topic, article idea, video transcript, or raw notes to generate production-ready, expert-level technical articles for Nadhebe.

---

## 1. Workflow Protocol

1. **Topic Analysis & Keyword Research**:
   - Determine primary keyword, secondary LSI keywords, search intent (informational/tutorial/comparison), target audience (AI engineers, DevOps, technical leads).

2. **Content Collection Selection (Mandatory)**:
   Evaluate the topic and assign it to the most relevant content collection directory:
   - `src/content/tutorials/`: Hands-on step-by-step developer code walkthroughs, CLI setup guides, MCP tools, serverless deployments.
   - `src/content/guides/`: Enterprise architecture breakdowns, CI/CD pipeline automation, context engineering playbooks (`CLAUDE.md`).
   - `src/content/comparisons/`: Head-to-head model/tool benchmark reports (e.g. `vLLM vs Ollama`, `Claude Code vs Cursor`).
   - `src/content/news/`: Major model releases, breaking benchmark announcements.
   - `src/content/reviews/`: In-depth single product/model evaluation reviews.

   *Do not force articles into irrelevant collections.*

3. **Technical Depth & Code Quality**:
   - Minimum 70% original synthesis, code examples, Mermaid diagrams, performance tables, and decision trees.
   - Include complete TypeScript / Python / YAML code blocks with inline comments.

---

## 2. Article Markdown Frontmatter Schema

Every generated Markdown file must conform to the following schema:

```markdown
---
title: "Descriptive SEO Title Target"
description: "Comprehensive 150-160 character meta description containing primary keyword."
pubDate: 2026-08-03
author: nadhebe-team
category: "tutorials" | "guides" | "comparisons" | "news" | "reviews"
tags: ["Keyword1", "Keyword2", "Keyword3"]
heroImage: "/images/<slug>-hero.webp"
heroAlt: "Minimalist vintage editorial illustration representing <topic> on a <color> background"
estimatedReadingTime: 12
isPillar: true
topic: "Topic Cluster Name"
searchIntent: "informational" | "tutorial" | "comparison"
draft: false
itemsCompared: ["Item A", "Item B"] # Optional (only for comparisons)
faq:
  - question: "Technical question?"
    answer: "Clear, direct, authoritative answer."
sources:
  - label: "Official Documentation"
    url: "https://example.com/docs"
---
```

---

## 3. Image Generation Specification & Art Style Guide

### Art Style Name: **Vintage Editorial Mixed-Media Collage**
*(Modern Tech Editorial Illustration / Paper Cutout & Halftone Art)*

Articles without hero images are INCOMPLETE. All hero images generated for Nadhebe blogs must follow this exact aesthetic style:

### Aesthetic Principles:
- **Canvas / Background**: Flat pastel or muted neutral tones. Rotate between curated background palettes:
  - *Sage Green* (`#87A987` / soft muted green)
  - *Soft Olive* (`#A3B18A` / warm olive)
  - *Warm Cream / Sand* (`#F4F1DE` / vintage paper)
  - *Soft Terracotta* (`#E07A5F` / muted warm coral)
  - *Muted Mint* (`#B7E4C7` / pastel mint)
  - *Soft Lavender* (`#D8B4F8` / pastel purple)
- **Visual Subject Cutouts**: High-contrast black-and-white or duotone cutouts of tech/engineering subjects:
  - Retro command-line terminal screens & prompt icons
  - Cloud server racks, network graph nodes, database schemas
  - Acoustic vintage microphones & soundwave curves
  - Code editor canvas frames & diff windows
  - Organic/botanical elements (green plant sprouts, leaves) symbolizing growth & fresh code
- **Geometric Elements**: Concentric circles, solid geometric badges, yellow/orange accent suns (`#F4A261`), and subtle vintage magazine halftone dot textures.
- **Tone & Mood**: High-end corporate editorial illustration similar to *Medium, Wired, New York Times Tech, Stripe Press, and Vercel Blog*.
- **Anti-Patterns (STRICTLY PROHIBITED)**:
  - ❌ ZERO generic 3D neon glowing spheres or glossy AI light beams
  - ❌ ZERO dark, thick, muddy black backgrounds
  - ❌ ZERO text watermarks, logos, or artificial typography inside the image

---

### Standard Image Prompt Template for `generate_image`:

```text
Vintage editorial collage illustration on a [COLOR PALETTE] background. A black and white cutout of [SUBJECT A] and [SUBJECT B], surrounded by warm yellow geometric circles, vintage magazine halftone textures, and subtle green plant leaves. Clean minimal tech art style, 16:9 ratio
```

#### Example Prompts:
- **Claude Code vs Cursor**:
  `Vintage editorial collage illustration on a sage green background. A black and white cutout of a retro terminal keyboard and a coding cursor surrounded by warm yellow geometric circles, halftone textures, and subtle green plant leaves. Clean minimal tech art style, 16:9 ratio`
- **RunPod vs Modal**:
  `Vintage editorial collage illustration on a soft olive green background. Cutout graphics of cloud server nodes and bare metal hardware racks paired with abstract pastel circles, halftone dots, and small botanical sprouts. Clean editorial layout, 16:9 ratio`
- **vLLM vs Ollama**:
  `Vintage editorial collage illustration on a soft terracotta background. Comparing vLLM throughput charts against Ollama local execution graphics with geometric circles and retro paper texture, 16:9 ratio`

---

## 4. Post-Generation Execution & Build Checklist

After creating or updating blog posts:
1. Copy the generated image from artifacts to `public/images/<slug>-hero.webp`.
2. Run `npm run build` to compile the static HTML pages and trigger Pagefind search indexing.
3. Verify that the build-time internal linker script (`scripts/run-internal-linker.ts`) and link auditor (`scripts/verify-links.ts`) pass with **0 broken links**.
4. Run `git add .`, `git commit -m "..."`, and `git push` to deploy to GitHub.
