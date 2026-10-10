---
name: schema-generator
description: Generate and validate Schema.org JSON-LD structured data (Article, TechArticle, FAQPage, BreadcrumbList, WebApplication) for Google rich results and AI search engine discovery. Use when configuring structured data, adding FAQ schemas, or validating rich snippet eligibility.
---

# Schema Generator & Structured Data Validator

Activate this skill when generating, auditing, or validating JSON-LD structured data markup for Nadhebe pages.

---

## 1. When to Activate This Skill

- When defining structured data schemas for blog posts, tutorials, and comparison pages.
- When formatting FAQ sections in Markdown frontmatter to trigger Google FAQ rich results.
- When creating structured schemas for interactive tools in `src/pages/tools/`.
- When validating rich snippet eligibility against Google Search Central standards.

---

## 2. Nadhebe Structured Data Architecture

In Nadhebe, structured data is rendered through automated Astro layout components:

### 1. Articles & Guides (`ArticleSchema.astro`)
Automatically rendered in `<head>` using frontmatter:
```json
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "[title]",
  "description": "[description]",
  "image": "https://nadhebe.com[heroImage]",
  "datePublished": "[pubDate ISO]",
  "dateModified": "[updatedDate ISO]",
  "author": {
    "@type": "Organization",
    "name": "Nadhebe Editorial Team",
    "url": "https://nadhebe.com/about"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Nadhebe",
    "url": "https://nadhebe.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://nadhebe.com/logo.webp"
    }
  }
}
```

### 2. FAQ Rich Results (`FAQSchema.astro`)
Rendered automatically whenever the frontmatter contains an `faq` array:
```yaml
faq:
  - question: "Is Claude Code included in Claude Pro?"
    answer: "Yes, Claude Pro includes Claude Code within standard daily token allowances."
  - question: "Does Claude Code support Prompt Caching?"
    answer: "Yes, Anthropic prompt caching is automatically applied, cutting input token fees by 90%."
```

### 3. Web Applications (`src/pages/tools/`)
For interactive tools, inject standard `WebApplication` JSON-LD into the page `<head>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AI API Pricing Calculator",
  "url": "https://nadhebe.com/tools/ai-api-pricing-calculator",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5."
}
</script>
```

---

## 3. Google Eligibility & Rules of Thumb

- **No Promotional / Misleading FAQs**: Answers must be factual, direct, and objectively verifiable.
- **Visible Content Parity**: Every piece of data in the JSON-LD schema must be clearly visible on the rendered web page. Hidden text violates Google spam policies.
- **Dates**: Always preserve ISO 8601 strings (`YYYY-MM-DD` or `YYYY-MM-DDTHH:mm:ssZ`).
