---
name: content-quality-auditor
description: Audit technical articles, Markdown files, or whole collections for Google Helpful Content guidelines, technical SEO, GEO/AEO answer extractability, factual accuracy, and publishing readiness. Use when reviewing drafts, scoring content quality, or auditing before git commit.
---

# Content Quality & SEO/AEO Auditor

Activate this skill to audit, score, and verify technical articles prior to publishing.

---

## 1. When to Activate This Skill

- Before publishing a newly drafted article or guide.
- When evaluating existing content for Google Helpful Content and EEAT compliance.
- When auditing markdown files for formatting errors, broken links, or frontmatter schema violations.
- When checking answer extractability for Google AI Overviews, Perplexity, and ChatGPT.

---

## 2. Five Audit Pillars

### Pillar 1: Factual Integrity & Zero Fabrication (Strict)
- **Zero Hallucinated Citations**: Every URL cited in `sources` must be live and official.
- **No Fabricated Benchmarks**: Model numbers, token limits, and prices must reflect official documentation.
- **No Fake Quotes / Experiences**: Avoid fabricated anecdotes ("In my 10 years using Claude Code..."). Frame advice through objective engineering principles.
- **Zero AI Clichés**: Ban filler words like *"In today's fast-paced digital landscape"*, *"delve into"*, *"testament to"*, *"game changer"*, *"seamlessly"*.

### Pillar 2: Technical SEO & Heading Hierarchy
- **Single H1**: Exactly one `# Title` per article.
- **Strict Hierarchy**: H1 → H2 → H3. Never skip levels (no H1 → H3).
- **Title Formula**: Primary Keyword First + Benefit + ` | Nadhebe`.
- **Meta Description**: 150–160 characters, containing the primary keyword.

### Pillar 3: GEO / AEO Answer Extractability
- **Direct Answer Blocks**: 2–3 sentence direct answer immediately below each H2 heading.
- **Data Tables**: Comparisons must use structured markdown tables, not bulleted paragraphs.
- **Self-Contained Definitions**: Sections must be extractable by an LLM without reading the entire page.

### Pillar 4: Astro Schema & Frontmatter Validation
Verify all required frontmatter fields for `src/content/config.ts`:
- `title`, `description`, `pubDate`, `author: nadhebe-team`, `category`, `tags`
- `heroImage` (must exist in `/public/images/<slug>-hero.webp`)
- `topic`, `isPillar`, `searchIntent`
- `faq`: minimum 3-4 structured Q&A pairs
- `sources`: minimum 2 authoritative links

### Pillar 5: Link Integrity & Build Safety
- All internal markdown links must point to valid routes (e.g. `[Text](/guides/slug)`).
- Must verify that `npm run build` compiles with 0 broken links.

---

## 3. Audit Scoring Template

```markdown
# Content Quality Audit Report: [Article Title]

| Dimension | Score (1-100) | Status | Key Findings |
| :--- | :--- | :--- | :--- |
| **Factual Integrity & EEAT** | [Score] | ✅ Pass / ❌ Fail | [Details] |
| **Technical SEO & Structure**| [Score] | ✅ Pass / ❌ Fail | [Details] |
| **GEO / AEO Extractability** | [Score] | ✅ Pass / ⚠️ Warn | [Details] |
| **Frontmatter & Schema** | [Score] | ✅ Pass / ❌ Fail | [Details] |
| **Link Integrity & Assets** | [Score] | ✅ Pass / ❌ Fail | [Details] |

### Summary & Verdict
- **Overall Quality Score**: [Score] / 100
- **Publish Readiness**: [Ready to Publish / Revisions Needed]

### Actionable Fixes (if any)
1. **[Fix 1]**: [Exact modification required]
2. **[Fix 2]**: [Exact modification required]
```
