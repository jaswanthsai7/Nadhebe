# Nadhebe Pre-Publish SEO & AEO Quality Audit Checklist

Use this checklist during every editorial and technical review before merging content into `src/content/`.

---

## 1. Technical SEO & Metadata
- [ ] **Exact Single H1**: The document begins with a single `# Heading` that contains the primary keyword.
- [ ] **Heading Order**: All subsequent subheadings follow `## (H2)` and `### (H3)`. No header levels are skipped.
- [ ] **Title Length**: Title is 50–65 characters and front-loads the primary target phrase.
- [ ] **Meta Description**: 140–160 characters, actively summarizes content, and includes the target keyword naturally.
- [ ] **URL Slug**: Lowercase, kebab-case, without stop words or dates (e.g. `claude-code-pricing-guide`).
- [ ] **Canonical URL**: Rendered automatically by `ArticleLayout.astro` via `getArticleUrl(post)`.

---

## 2. Generative Engine Optimization (GEO/AEO)
- [ ] **Direct Answer Block**: Every major H2 section starts with a 2–3 sentence direct, objective explanation.
- [ ] **Structured Tables**: Complex specifications, pricing tiers, benchmarks, and comparison matrices are formatted as Markdown tables.
- [ ] **FAQ Section**: Frontmatter contains at least 3–4 high-intent user questions with direct, authoritative answers.
- [ ] **Entity Precision**: Full product and technology names (e.g. "Claude 3.7 Sonnet") are used in topic sentences rather than ambiguous pronouns ("it").

---

## 3. Factual Accuracy & EEAT Standards
- [ ] **No Hallucinated URLs**: Every URL in `sources` is verified against official vendor documentation.
- [ ] **Zero Fabricated Statistics**: All token rates, pricing numbers, benchmarks, and memory usage figures represent verified metrics.
- [ ] **Originality Threshold**: Content provides 70%+ original synthesis, architectural diagrams, implementation advice, or code blocks.
- [ ] **No Fluff or Clichés**: Prohibit empty transition phrases ("In this comprehensive guide, we delve into...").

---

## 4. Assets & Internal Links
- [ ] **Hero Graphic**: WebP image exists in `/public/images/<slug>-hero.webp` adhering to the *Vintage Editorial Mixed-Media Collage* style.
- [ ] **Alt Text**: Descriptive alt text explaining the visual collage elements and background tone.
- [ ] **Internal Links**: Minimum 3–5 contextual links to related Nadhebe articles (`/guides/...`, `/tutorials/...`, `/comparisons/...`).
- [ ] **Build Validation**: Passes `npm run build` and `scripts/verify-links.ts` with 0 broken links.
