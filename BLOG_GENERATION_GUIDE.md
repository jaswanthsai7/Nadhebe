# Nadhebe Technical Blog Blueprint & Art Style Specification

This document defines the complete technical workflow, article structure, and image generation specifications used to create production-grade blog posts on **Nadhebe**.

Whenever you provide a topic, video link, or transcript, the AI agent reads this guide and executes the exact same end-to-end publishing pipeline.

---

## 1. Editorial Architecture & Content Collections

Nadhebe organizes content into 5 core collections:

| Collection | Path | Topic Scope | Primary Search Intent |
| :--- | :--- | :--- | :--- |
| **Tutorials** | `src/content/tutorials/` | Step-by-step developer code walkthroughs, CLI setup, MCP tools, serverless deployments | Tutorial / How-To |
| **Guides** | `src/content/guides/` | Enterprise architecture, CI/CD pipeline automation, context engineering (`CLAUDE.md`) | Informational / Architectural |
| **Comparisons** | `src/content/comparisons/` | Head-to-head benchmarks (`vLLM vs Ollama`, `Claude Code vs Cursor`, `RunPod vs Modal`) | Commercial / Comparison |
| **News** | `src/content/news/` | Breaking model releases, major benchmark updates | Informational / News |
| **Reviews** | `src/content/reviews/` | Single product/model deep-dive evaluations | Commercial / Review |

---

## 2. Mandatory Article Requirements

Every generated article includes:
- **Comprehensive Frontmatter**: Title, description, `pubDate`, `author`, `category`, `tags`, `heroImage`, `heroAlt`, `estimatedReadingTime`, `isPillar`, `topic`, `searchIntent`, `faq`, `sources`.
- **Key Takeaways Box**: Executive summary at the top of the article.
- **Technical Architecture**: Code snippets (TypeScript / Python / YAML), Mermaid flow diagrams, performance benchmark tables, and decision trees.
- **EEAT Compliance**: Why, How, Tradeoffs, Limitations, Best Practices, Security, and Scalability.
- **SEO & Internal Linking**: Unique keywords, no cannibalization, automatic contextual link injection via `scripts/run-internal-linker.ts`.

---

## 3. Image Generation Specification (Art Style Details)

### Art Style: **Vintage Editorial Mixed-Media Collage**
*(Modern Developer Editorial / Paper Cutout & Halftone Tech Art)*

All hero illustrations for Nadhebe blog posts use this distinct, premium visual language:

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                 VINTAGE EDITORIAL COLLAGE ARTWORK                      │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│   PASTEL BACKGROUND  │  │  BLACK&WHITE CUTOUTS │  │ GEOMETRIC & HALFTONE │
├──────────────────────┤  ├──────────────────────┤  ├──────────────────────┤
│ • Sage Green         │  │ • Retro Terminals    │  │ • Concentric Circles │
│ • Soft Olive         │  │ • Cloud Server Racks │  │ • Geometric Badges   │
│ • Warm Cream / Sand  │  │ • Network Graph Nodes│  │ • Halftone Dot Grain │
│ • Soft Terracotta    │  │ • Acoustic Microphones│ │ • Botanical Sprouts  │
│ • Muted Mint         │  │ • Code Canvas Diffs  │  │ • Mustard Yellow Suns│
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

### Key Visual Specs:
1. **Background Color Palette**:
   - *Sage Green* (`#87A987`)
   - *Soft Olive* (`#A3B18A`)
   - *Warm Cream / Sand* (`#F4F1DE`)
   - *Soft Terracotta* (`#E07A5F`)
   - *Muted Mint* (`#B7E4C7`)
   - *Soft Lavender* (`#D8B4F8`)
2. **Subject Cutouts**: Vintage black-and-white or high-contrast monochrome cutouts of technical hardware, code interfaces, terminal prompts, combined with subtle organic green plant sprouts.
3. **Geometric & Texture Overlays**: Concentric circles, solid yellow/orange accent suns (`#F4A261`), and halftone magazine paper grain.
4. **Tone**: High-end corporate editorial art similar to *Medium, Wired, New York Times Tech, Stripe Press, and Vercel Blog*.
5. **Anti-Patterns (Prohibited)**: No generic 3D neon glowing spheres, no dark thick muddy backgrounds, no watermarks.

---

### Image Prompt Blueprint for `generate_image`

When generating hero artwork for a new article, use this prompt structure:

```text
Vintage editorial collage illustration on a [COLOR PALETTE] background. A black and white cutout of [SUBJECT A] and [SUBJECT B], surrounded by warm yellow geometric circles, vintage magazine halftone textures, and subtle green plant leaves. Clean minimal tech art style, 16:9 ratio
```

---

## 4. How to Generate a New Blog Post

Simply prompt the agent:
> *"Generate a new blog post on [TOPIC / URL / TRANSCRIPT] following `BLOG_GENERATION_GUIDE.md`."*

The agent will automatically:
1. Research and write the production-ready Markdown article.
2. Select the correct content folder (`tutorials`, `guides`, `comparisons`, etc.).
3. Generate the matching vintage editorial collage hero image.
4. Place the image at `public/images/<slug>-hero.webp`.
5. Run `npm run build` to verify 0 broken links and update sitemaps.
6. Commit and push the code directly to GitHub.
