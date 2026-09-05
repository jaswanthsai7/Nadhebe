// UNIFIED TOOL REGISTRY - SINGLE SOURCE OF TRUTH FOR ALL NADHEBE TOOLS
export type ToolStatus = 'implemented' | 'planned' | 'deprecated' | 'draft';

export interface ToolSeo {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface UnifiedTool {
  slug: string;
  title: string;
  component: string;
  status: ToolStatus;
  category: string;
  categorySlug?: string;
  seo: ToolSeo;
  relatedTools: string[];
  // Backwards compatibility properties:
  id: string;
  name: string;
  href: string;
  description: string;
  mode?: 'transform' | 'generator' | 'calculator' | 'analyzer' | 'converter' | 'formatter' | 'tester' | 'linter' | string;
  tags?: string[];
  icon?: string;
  badge?: 'Popular' | 'New' | 'Updated' | string;
  noApi?: boolean;
  faq?: { question: string; answer: string }[];
}

export const UNIFIED_TOOLS_REGISTRY: UnifiedTool[] = [
  {
    "id": "chatgpt-ad-blocker",
    "slug": "chatgpt-ad-blocker",
    "title": "ChatGPT Ad Blocker",
    "name": "ChatGPT Ad Blocker",
    "href": "/tools/chatgpt-ad-blocker/",
    "component": "Standalone",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "generator",
    "badge": "New",
    "description": "Block ChatGPT upgrade banners, upsell promo cards, and partner app ads with a lightweight, privacy-first Manifest V3 Chrome extension.",
    "seo": {
      "title": "ChatGPT Ad Blocker - Remove Upsells, Promos & Partner Ads | Nadhebe",
      "description": "Block ChatGPT Plus/Pro upgrade banners, partner app suggestions, and sponsored ads with a free, private Manifest V3 Chrome extension & custom rule generator.",
      "keywords": [
        "chatgpt ad blocker",
        "chatgpt adblock",
        "block chatgpt ads",
        "chatgpt promo blocker",
        "chatgpt extension",
        "remove chatgpt upgrade banner",
        "manifest v3 chatgpt adblock"
      ]
    },
    "relatedTools": [
      "prompt-optimizer"
    ],
    "tags": [
      "chatgpt",
      "adblocker",
      "extension",
      "privacy",
      "chrome"
    ],
    "icon": "shield-check"
  },
  {
    "id": "developer-1",
    "slug": "json-diff",
    "title": "JSON diff",
    "name": "JSON diff",
    "href": "/tools/json-diff/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "transform",
    "description": "JSON diff. Use this privacy-first json diff directly in your browser.",
    "seo": {
      "title": "JSON diff - Free Browser Tool | Nadhebe",
      "description": "Compare two JSON objects side-by-side and highlight added, removed, and changed keys. Free, private, runs 100% in your browser — no uploads.",
      "keywords": [
        "json diff",
        "compare json online",
        "json compare tool",
        "json difference checker",
        "diff json",
        "json delta viewer"
      ]
    },
    "relatedTools": [
      "text-diff",
      "json-formatter",
      "json-validator",
      "base64-encoder"
    ],
    "tags": [
      "developer",
      "transform",
      "json-diff"
    ],
    "icon": "git-compare"
  },
  {
    "id": "developer-2",
    "slug": "base64-encoder",
    "title": "Base64 encoder",
    "name": "Base64 encoder",
    "href": "/tools/base64-encoder/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "generator",
    "description": "Base64 encoder. Use this privacy-first base64 encoder directly in your browser.",
    "seo": {
      "title": "Base64 encoder - Free Browser Tool | Nadhebe",
      "description": "Encode text to Base64 and decode Base64 strings back to plain text instantly. 100% local processing — your data never leaves the browser.",
      "keywords": [
        "base64 encoder decoder",
        "encode base64 online",
        "base64 decode",
        "base64 converter",
        "text to base64"
      ]
    },
    "relatedTools": [
      "url-parser",
      "json-formatter",
      "uuid-generator",
      "jwt-debugger"
    ],
    "tags": [
      "developer",
      "generator",
      "base64-encoder"
    ],
    "icon": "lock"
  },
  {
    "id": "developer-3",
    "slug": "url-parser",
    "title": "URL parser",
    "name": "URL parser",
    "href": "/tools/url-parser/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "calculator",
    "description": "URL parser. Use this privacy-first url parser directly in your browser.",
    "seo": {
      "title": "URL parser - Free Browser Tool | Nadhebe",
      "description": "Parse any URL into protocol, host, path, query parameters, and hash. Privacy-first URL analyzer — runs locally, no server, no logs.",
      "keywords": [
        "url parser",
        "parse url online",
        "url components analyzer",
        "query string parser",
        "url decoder tool"
      ]
    },
    "relatedTools": [
      "jwt-debugger",
      "meta-tag-analyzer",
      "schema-generator",
      "base64-encoder"
    ],
    "tags": [
      "developer",
      "calculator",
      "url-parser"
    ],
    "icon": "link"
  },
  {
    "id": "developer-4",
    "slug": "jwt-debugger",
    "title": "JWT debugger",
    "name": "JWT debugger",
    "href": "/tools/jwt-debugger/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "analyzer",
    "description": "JWT debugger. Use this privacy-first jwt debugger directly in your browser.",
    "seo": {
      "title": "JWT debugger - Free Browser Tool | Nadhebe",
      "description": "Decode and inspect JWT header and payload without signature validation. Free online JWT debugger — no server, no data uploads, 100% private.",
      "keywords": [
        "jwt debugger",
        "jwt decoder",
        "decode jwt token",
        "json web token debugger",
        "jwt payload decoder"
      ]
    },
    "relatedTools": [
      "jwt-inspector",
      "url-parser",
      "json-validator",
      "base64-encoder"
    ],
    "tags": [
      "developer",
      "analyzer",
      "jwt-debugger"
    ],
    "icon": "shield"
  },
  {
    "id": "developer-5",
    "slug": "uuid-generator",
    "title": "UUID generator",
    "name": "UUID generator",
    "href": "/tools/uuid-generator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "transform",
    "description": "UUID generator. Use this privacy-first uuid generator directly in your browser.",
    "seo": {
      "title": "UUID generator - Free Browser Tool | Nadhebe",
      "description": "Generate cryptographically random UUID v4 IDs in bulk. Uses browser-native crypto.randomUUID() — nothing sent to any server.",
      "keywords": [
        "uuid generator",
        "generate uuid v4",
        "random uuid online",
        "unique id generator",
        "guid generator"
      ]
    },
    "relatedTools": [
      "slug-generator",
      "json-formatter",
      "base64-encoder",
      "json-diff"
    ],
    "tags": [
      "developer",
      "transform",
      "uuid-generator"
    ],
    "icon": "fingerprint"
  },
  {
    "id": "ai-3",
    "slug": "embedding-inspector",
    "title": "Embedding inspector",
    "name": "Embedding inspector",
    "href": "/tools/embedding-inspector/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "calculator",
    "description": "Inspect AI embedding vectors — compute L2 norm, cosine similarity, dot product, and dimension statistics. Runs fully in your browser.",
    "seo": {
      "title": "Embedding Inspector — Analyze AI Vectors in the Browser | Nadhebe",
      "description": "Analyze AI embedding vectors locally. Compute L2 norm, cosine similarity, dot product, min/max values, and normalized vectors. 100% browser-side — no data uploaded.",
      "keywords": [
        "embedding inspector",
        "vector inspector",
        "cosine similarity calculator",
        "ai embedding analyzer",
        "vector norm calculator",
        "dot product calculator",
        "embedding similarity tool",
        "llm vector debugger"
      ]
    },
    "relatedTools": [
      "cosine-similarity-calculator",
      "json-formatter",
      "csv-to-json",
      "uuid-generator"
    ],
    "tags": [
      "ai",
      "calculator",
      "embedding-inspector"
    ],
    "icon": "binary"
  },
  {
    "id": "text-1",
    "slug": "word-counter",
    "title": "Word counter",
    "name": "Word counter",
    "href": "/tools/word-counter/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Text",
    "categorySlug": "text",
    "mode": "transform",
    "description": "Word counter. Use this privacy-first word counter directly in your browser.",
    "seo": {
      "title": "Word counter - Free Browser Tool | Nadhebe",
      "description": "Count words, characters, sentences, and lines for any text. Instant results with zero server uploads — paste and get results immediately.",
      "keywords": [
        "word counter",
        "count words online",
        "character counter",
        "word count tool",
        "text word counter"
      ]
    },
    "relatedTools": [
      "reading-time-calculator",
      "case-converter",
      "duplicate-remover",
      "text-diff"
    ],
    "tags": [
      "text",
      "transform",
      "word-counter"
    ],
    "icon": "type"
  },
  {
    "id": "text-2",
    "slug": "case-converter",
    "title": "Case converter",
    "name": "Case converter",
    "href": "/tools/case-converter/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Text",
    "categorySlug": "text",
    "mode": "generator",
    "description": "Case converter. Use this privacy-first case converter directly in your browser.",
    "seo": {
      "title": "Case converter - Free Browser Tool | Nadhebe",
      "description": "Convert text between lowercase, UPPERCASE, Title Case, camelCase, snake_case and more. Free online case transformer — instant browser-side results.",
      "keywords": [
        "case converter",
        "text case converter",
        "uppercase lowercase converter",
        "camelcase snake case converter",
        "title case generator"
      ]
    },
    "relatedTools": [
      "slug-generator",
      "word-counter",
      "duplicate-remover",
      "text-diff"
    ],
    "tags": [
      "text",
      "generator",
      "case-converter"
    ],
    "icon": "text-cursor-input"
  },
  {
    "id": "text-3",
    "slug": "duplicate-remover",
    "title": "Duplicate remover",
    "name": "Duplicate remover",
    "href": "/tools/duplicate-remover/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Text",
    "categorySlug": "text",
    "mode": "calculator",
    "description": "Duplicate remover. Use this privacy-first duplicate remover directly in your browser.",
    "seo": {
      "title": "Duplicate remover - Free Browser Tool | Nadhebe",
      "description": "Remove duplicate lines from any list or text. Keeps unique entries in original order. Paste, deduplicate, copy — 100% client-side.",
      "keywords": [
        "duplicate remover",
        "remove duplicate lines",
        "deduplicate text",
        "unique lines tool",
        "remove duplicates online"
      ]
    },
    "relatedTools": [
      "word-counter",
      "case-converter",
      "slug-generator",
      "text-diff"
    ],
    "tags": [
      "text",
      "calculator",
      "duplicate-remover"
    ],
    "icon": "list-filter"
  },
  {
    "id": "text-4",
    "slug": "slug-generator",
    "title": "Slug generator",
    "name": "Slug generator",
    "href": "/tools/slug-generator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Text",
    "categorySlug": "text",
    "mode": "analyzer",
    "description": "Slug generator. Use this privacy-first slug generator directly in your browser.",
    "seo": {
      "title": "Slug generator - Free Browser Tool | Nadhebe",
      "description": "Generate clean SEO-friendly URL slugs from any text. Converts spaces and special characters into kebab-case slugs instantly.",
      "keywords": [
        "slug generator",
        "url slug generator",
        "text to slug",
        "generate url slug",
        "seo slug creator"
      ]
    },
    "relatedTools": [
      "case-converter",
      "uuid-generator",
      "duplicate-remover",
      "word-counter"
    ],
    "tags": [
      "text",
      "analyzer",
      "slug-generator"
    ],
    "icon": "link-2"
  },
  {
    "id": "text-5",
    "slug": "text-diff",
    "title": "Text diff",
    "name": "Text diff",
    "href": "/tools/text-diff/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Text",
    "categorySlug": "text",
    "mode": "transform",
    "description": "Text diff. Use this privacy-first text diff directly in your browser.",
    "seo": {
      "title": "Text diff - Free Browser Tool | Nadhebe",
      "description": "Find differences between two text blocks and highlight added and removed lines. Client-side diff tool — nothing is sent to any server.",
      "keywords": [
        "text diff",
        "compare text online",
        "text compare tool",
        "diff text",
        "text difference checker",
        "line diff"
      ]
    },
    "relatedTools": [
      "json-diff",
      "word-counter",
      "duplicate-remover",
      "case-converter"
    ],
    "tags": [
      "text",
      "transform",
      "text-diff"
    ],
    "icon": "git-compare"
  },
  {
    "id": "seo-1",
    "slug": "serp-preview",
    "title": "SERP Preview",
    "name": "SERP Preview",
    "href": "/tools/serp-preview/",
    "component": "src/pages/tools/serp-preview.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "transform",
    "description": "Simulate desktop and mobile Google Search result snippets in real-time.",
    "seo": {
      "title": "Google SERP Snippet Preview Tool | Nadhebe",
      "description": "Simulate exact desktop and mobile Google Search result snippets. Calculate pixel widths, eliminate title truncation, and boost organic CTR.",
      "keywords": [
        "serp preview",
        "google snippet simulator",
        "meta title length checker",
        "title pixel width",
        "serp ctr optimizer"
      ]
    },
    "relatedTools": [
      "meta-tag-analyzer",
      "schema-generator",
      "sitemap-validator",
      "opportunity-radar"
    ],
    "tags": [
      "seo",
      "serp-preview"
    ],
    "icon": "search"
  },
  {
    "id": "seo-2",
    "slug": "robots-tester",
    "title": "Robots Tester",
    "name": "Robots Tester",
    "href": "/tools/robots-tester/",
    "component": "src/pages/tools/robots-tester.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "generator",
    "description": "Test robots.txt directives and Googlebot / AI crawler accessibility.",
    "seo": {
      "title": "Robots.txt Tester & Crawl Directive Auditor | Nadhebe",
      "description": "Test robots.txt directives, audit Googlebot and AI crawler accessibility, and prevent accidental search engine indexing blocks.",
      "keywords": [
        "robots tester",
        "robots.txt validator",
        "googlebot directive checker",
        "ai crawler block",
        "crawl budget optimization"
      ]
    },
    "relatedTools": [
      "sitemap-validator",
      "meta-tag-analyzer",
      "serp-preview",
      "opportunity-radar"
    ],
    "tags": [
      "seo",
      "robots-tester"
    ],
    "icon": "file-text"
  },
  {
    "id": "seo-3",
    "slug": "canonical-checker",
    "title": "Canonical Checker",
    "name": "Canonical Checker",
    "href": "/tools/canonical-checker/",
    "component": "src/pages/tools/canonical-checker.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "calculator",
    "description": "Audit canonical link tags and eliminate duplicate content issues.",
    "seo": {
      "title": "Canonical Tag Checker & Duplicate Content Inspector | Nadhebe",
      "description": "Audit canonical HTML link tags, prevent search engine keyword cannibalization, detect cross-domain duplicate URLs, and enforce clean indexing signals.",
      "keywords": [
        "canonical checker",
        "canonical tag auditor",
        "duplicate content inspector",
        "self referencing canonical",
        "seo link tag"
      ]
    },
    "relatedTools": [
      "meta-tag-analyzer",
      "schema-generator",
      "sitemap-validator",
      "serp-preview"
    ],
    "tags": [
      "seo",
      "canonical-checker"
    ],
    "icon": "link-2"
  },
  {
    "id": "seo-4",
    "slug": "schema-validator",
    "title": "Schema Validator",
    "name": "Schema Validator",
    "href": "/tools/schema-validator/",
    "component": "src/pages/tools/schema-validator.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "analyzer",
    "description": "Validate JSON-LD structured data and Schema.org syntax.",
    "seo": {
      "title": "JSON-LD Schema Validator & Structured Data Auditor | Nadhebe",
      "description": "Validate JSON-LD structured data markup, check Schema.org syntax compliance, verify required properties, and unlock Google Rich Snippets.",
      "keywords": [
        "schema validator",
        "json-ld validator",
        "structured data checker",
        "schema.org syntax audit",
        "rich snippet tester"
      ]
    },
    "relatedTools": [
      "schema-generator",
      "meta-tag-analyzer",
      "sitemap-validator",
      "serp-preview"
    ],
    "tags": [
      "seo",
      "schema-validator"
    ],
    "icon": "braces"
  },
  {
    "id": "seo-5",
    "slug": "redirect-chain-checker",
    "title": "Redirect Chain Checker",
    "name": "Redirect Chain Checker",
    "href": "/tools/redirect-chain-checker/",
    "component": "src/pages/tools/redirect-chain-checker.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "transform",
    "description": "Trace multi-hop 301 and 302 HTTP redirect chains.",
    "seo": {
      "title": "301 Redirect Chain Checker & Link Equity Auditor | Nadhebe",
      "description": "Trace multi-hop 301 and 302 HTTP redirect chains, eliminate crawl budget waste, prevent PageRank link equity dilution, and audit URL migration paths.",
      "keywords": [
        "redirect chain checker",
        "301 redirect tracer",
        "http status code audit",
        "link equity calculator",
        "crawl budget optimization"
      ]
    },
    "relatedTools": [
      "canonical-checker",
      "sitemap-validator",
      "serp-preview",
      "meta-tag-analyzer"
    ],
    "tags": [
      "seo",
      "redirect-chain-checker"
    ],
    "icon": "arrow-right-left"
  },
  {
    "id": "seo-8",
    "slug": "seo-checker",
    "title": "SEO Checker",
    "name": "SEO Checker",
    "href": "/tools/seo-checker/",
    "component": "src/pages/tools/seo-checker.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "analyzer",
    "description": "Audit on-page SEO quality, heading hierarchy, and meta tag completeness.",
    "seo": {
      "title": "On-Page SEO Quality Checker & Audit Tool | Nadhebe",
      "description": "Audit on-page SEO factors: meta title length, meta description, H1-H6 heading hierarchy, image alt text coverage, internal linking, and HTTPS canonicals.",
      "keywords": [
        "seo checker",
        "on-page seo auditor",
        "heading tag inspector",
        "image alt text audit",
        "seo quality score"
      ]
    },
    "relatedTools": [
      "meta-tag-analyzer",
      "serp-preview",
      "schema-generator"
    ],
    "tags": [
      "seo",
      "seo-checker"
    ],
    "icon": "check-circle"
  },
  {
    "id": "marketing-3",
    "slug": "cac-payback",
    "title": "CAC payback",
    "name": "CAC payback",
    "href": "/tools/cac-payback/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "calculator",
    "description": "CAC payback. Use this privacy-first cac payback directly in your browser.",
    "seo": {
      "title": "CAC payback - Free Browser Tool | Nadhebe",
      "description": "CAC payback. Use this privacy-first cac payback directly in your browser.",
      "keywords": [
        "cac payback",
        "marketing",
        "calculator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "marketing",
      "calculator",
      "cac-payback"
    ],
    "icon": "code"
  },
  {
    "id": "youtube-2",
    "slug": "chapter-formatter",
    "title": "Chapter formatter",
    "name": "Chapter formatter",
    "href": "/tools/chapter-formatter/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "generator",
    "description": "Chapter formatter. Use this privacy-first chapter formatter directly in your browser.",
    "seo": {
      "title": "Chapter formatter - Free Browser Tool | Nadhebe",
      "description": "Chapter formatter. Use this privacy-first chapter formatter directly in your browser.",
      "keywords": [
        "chapter formatter",
        "youtube",
        "generator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "youtube",
      "generator",
      "chapter-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "social-media-3",
    "slug": "bio-formatter",
    "title": "Bio formatter",
    "name": "Bio formatter",
    "href": "/tools/bio-formatter/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "calculator",
    "description": "Bio formatter. Use this privacy-first bio formatter directly in your browser.",
    "seo": {
      "title": "Bio formatter - Free Browser Tool | Nadhebe",
      "description": "Bio formatter. Use this privacy-first bio formatter directly in your browser.",
      "keywords": [
        "bio formatter",
        "social media",
        "calculator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "social media",
      "calculator",
      "bio-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "prompt-engineering-3",
    "slug": "eval-rubric-generator",
    "title": "Eval rubric generator",
    "name": "Eval rubric generator",
    "href": "/tools/eval-rubric-generator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "calculator",
    "description": "Eval rubric generator. Use this privacy-first eval rubric generator directly in your browser.",
    "seo": {
      "title": "Eval rubric generator - Free Browser Tool | Nadhebe",
      "description": "Eval rubric generator. Use this privacy-first eval rubric generator directly in your browser.",
      "keywords": [
        "eval rubric generator",
        "prompt engineering",
        "calculator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "prompt engineering",
      "calculator",
      "eval-rubric-generator"
    ],
    "icon": "code"
  },
  {
    "id": "llms-5",
    "slug": "llm-rate-limit-backoff-generator",
    "title": "API Rate Limit & Backoff Planner",
    "name": "Rate Limit Planner",
    "href": "/tools/llm-rate-limit-backoff-generator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "transform",
    "description": "Generate production-ready Exponential Backoff code snippets based on custom RPM and TPM limits.",
    "seo": {
      "title": "LLM Rate Limit Backoff Code Generator | Nadhebe",
      "description": "Calculate TPM and RPM limits and instantly generate copy-pasteable Exponential Backoff code for Python and Node.js.",
      "keywords": [
        "llm rate limit backoff generator",
        "calculate tpm and rpm limits",
        "exponential backoff code snippet openai",
        "handle 429 too many requests llm"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "llms",
      "transform",
      "llm-rate-limit-backoff-generator"
    ],
    "icon": "code"
  },
  {
    "id": "json-1",
    "slug": "json-path-finder",
    "title": "JSON path finder",
    "name": "JSON path finder",
    "href": "/tools/json-path-finder/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "transform",
    "description": "JSON path finder. Use this privacy-first json path finder directly in your browser.",
    "seo": {
      "title": "JSON path finder - Free Browser Tool | Nadhebe",
      "description": "JSON path finder. Use this privacy-first json path finder directly in your browser.",
      "keywords": [
        "json path finder",
        "json",
        "transform"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "json",
      "transform",
      "json-path-finder"
    ],
    "icon": "code"
  },
  {
    "id": "json-3",
    "slug": "json-repair",
    "title": "JSON repair",
    "name": "JSON repair",
    "href": "/tools/json-repair/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "calculator",
    "description": "JSON repair. Use this privacy-first json repair directly in your browser.",
    "seo": {
      "title": "JSON repair - Free Browser Tool | Nadhebe",
      "description": "JSON repair. Use this privacy-first json repair directly in your browser.",
      "keywords": [
        "json repair",
        "json",
        "calculator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "json",
      "calculator",
      "json-repair"
    ],
    "icon": "code"
  },
  {
    "id": "xml-1",
    "slug": "xpath-tester",
    "title": "XPath tester",
    "name": "XPath tester",
    "href": "/tools/xpath-tester/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "transform",
    "description": "XPath tester. Use this privacy-first xpath tester directly in your browser.",
    "seo": {
      "title": "XPath tester - Free Browser Tool | Nadhebe",
      "description": "XPath tester. Use this privacy-first xpath tester directly in your browser.",
      "keywords": [
        "xpath tester",
        "xml",
        "transform"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "xml",
      "transform",
      "xpath-tester"
    ],
    "icon": "code"
  },
  {
    "id": "csv-1",
    "slug": "csv-validator",
    "title": "CSV validator",
    "name": "CSV validator",
    "href": "/tools/csv-validator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "transform",
    "description": "CSV validator. Use this privacy-first csv validator directly in your browser.",
    "seo": {
      "title": "CSV validator - Free Browser Tool | Nadhebe",
      "description": "CSV validator. Use this privacy-first csv validator directly in your browser.",
      "keywords": [
        "csv validator",
        "csv",
        "transform"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "csv",
      "transform",
      "csv-validator"
    ],
    "icon": "code"
  },
  {
    "id": "csv-2",
    "slug": "delimiter-converter",
    "title": "Delimiter converter",
    "name": "Delimiter converter",
    "href": "/tools/delimiter-converter/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "generator",
    "description": "Delimiter converter. Use this privacy-first delimiter converter directly in your browser.",
    "seo": {
      "title": "Delimiter converter - Free Browser Tool | Nadhebe",
      "description": "Delimiter converter. Use this privacy-first delimiter converter directly in your browser.",
      "keywords": [
        "delimiter converter",
        "csv",
        "generator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "csv",
      "generator",
      "delimiter-converter"
    ],
    "icon": "code"
  },
  {
    "id": "csv-4",
    "slug": "column-extractor",
    "title": "Column extractor",
    "name": "Column extractor",
    "href": "/tools/column-extractor/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "analyzer",
    "description": "Column extractor. Use this privacy-first column extractor directly in your browser.",
    "seo": {
      "title": "Column extractor - Free Browser Tool | Nadhebe",
      "description": "Column extractor. Use this privacy-first column extractor directly in your browser.",
      "keywords": [
        "column extractor",
        "csv",
        "analyzer"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "csv",
      "analyzer",
      "column-extractor"
    ],
    "icon": "code"
  },
  {
    "id": "csv-5",
    "slug": "csv-deduper",
    "title": "CSV deduper",
    "name": "CSV deduper",
    "href": "/tools/csv-deduper/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "transform",
    "description": "Remove duplicate rows from CSV files instantly in your browser. Paste your CSV data and get a clean, deduplicated output with a deduplication report.",
    "seo": {
      "title": "CSV Deduper — Remove Duplicate Rows from CSV | Nadhebe",
      "description": "Paste CSV data and remove duplicate rows in one click. Get a deduplicated CSV with a report showing how many rows were removed. 100% local — your data never leaves your browser.",
      "keywords": [
        "csv deduper",
        "remove duplicate csv rows",
        "csv duplicate remover",
        "deduplicate csv online",
        "csv cleaner tool",
        "remove duplicates from csv",
        "csv data cleaning",
        "csv row deduplication"
      ]
    },
    "relatedTools": [
      "csv-to-json",
      "duplicate-remover",
      "json-formatter",
      "xml-formatter"
    ],
    "tags": [
      "csv",
      "transform",
      "csv-deduper"
    ],
    "icon": "filter"
  },
  {
    "id": "regex-3",
    "slug": "escape-helper",
    "title": "Escape helper",
    "name": "Escape helper",
    "href": "/tools/escape-helper/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "calculator",
    "description": "Escape special characters for HTML, JavaScript strings, and URL encoding. Instantly see HTML entity escaping, JS string escaping, and percent-encoding side by side.",
    "seo": {
      "title": "Escape Helper — HTML, JS & URL Escape Tool | Nadhebe",
      "description": "Escape special characters for HTML entities, JavaScript strings, and URL encoding. Free browser tool — paste your string and get all three escape formats instantly, no server.",
      "keywords": [
        "html escape tool",
        "escape special characters",
        "url encode online",
        "javascript string escape",
        "html entity encoder",
        "percent encoding tool",
        "xss escape helper",
        "string escaper online"
      ]
    },
    "relatedTools": [
      "url-parser",
      "base64-encoder",
      "json-formatter",
      "slug-generator"
    ],
    "tags": [
      "regex",
      "calculator",
      "escape-helper"
    ],
    "icon": "shield-alert"
  },
  {
    "id": "security-3",
    "slug": "jwt-inspector",
    "title": "JWT inspector",
    "name": "JWT inspector",
    "href": "/tools/jwt-inspector/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Security",
    "categorySlug": "security",
    "mode": "calculator",
    "description": "JWT inspector. Use this privacy-first jwt inspector directly in your browser.",
    "seo": {
      "title": "JWT inspector - Free Browser Tool | Nadhebe",
      "description": "Inspect JSON Web Token structure: header claims, payload data, expiry. Runs entirely in your browser — zero server uploads.",
      "keywords": [
        "jwt inspector",
        "inspect jwt",
        "jwt token analyzer",
        "jwt header decoder",
        "decode jwt payload"
      ]
    },
    "relatedTools": [
      "jwt-debugger",
      "url-parser",
      "json-validator",
      "base64-encoder"
    ],
    "tags": [
      "security",
      "calculator",
      "jwt-inspector"
    ],
    "icon": "shield-check"
  },
  {
    "id": "devops-1",
    "slug": "dockerfile-linter",
    "title": "Dockerfile linter",
    "name": "Dockerfile linter",
    "href": "/tools/dockerfile-linter/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "transform",
    "description": "Lint your Dockerfile for common mistakes and best-practice violations. Detects missing WORKDIR, untagged base images, absent EXPOSE instructions, and more.",
    "seo": {
      "title": "Dockerfile Linter — Validate & Fix Dockerfiles | Nadhebe",
      "description": "Paste your Dockerfile and catch common issues: missing WORKDIR, :latest tags, absent EXPOSE instructions. Free browser-based linter — your code never leaves the tab.",
      "keywords": [
        "dockerfile linter",
        "dockerfile validator",
        "docker best practices checker",
        "lint dockerfile online",
        "dockerfile static analysis",
        "docker image optimization",
        "dockerfile quality check"
      ]
    },
    "relatedTools": [
      "curl-builder",
      "json-formatter",
      "slug-generator"
    ],
    "tags": [
      "devops",
      "transform",
      "dockerfile-linter"
    ],
    "icon": "package-check"
  },
  {
    "id": "devops-2",
    "slug": "cron-explainer",
    "title": "Cron explainer",
    "name": "Cron explainer",
    "href": "/tools/cron-explainer/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "generator",
    "description": "Cron explainer. Use this privacy-first cron explainer directly in your browser.",
    "seo": {
      "title": "Cron explainer - Free Browser Tool | Nadhebe",
      "description": "Cron explainer. Use this privacy-first cron explainer directly in your browser.",
      "keywords": [
        "cron explainer",
        "devops",
        "generator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "devops",
      "generator",
      "cron-explainer"
    ],
    "icon": "code"
  },
  {
    "id": "devops-3",
    "slug": "env-diff",
    "title": "Env diff",
    "name": "Env diff",
    "href": "/tools/env-diff/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "calculator",
    "description": "Env diff. Use this privacy-first env diff directly in your browser.",
    "seo": {
      "title": "Env diff - Free Browser Tool | Nadhebe",
      "description": "Env diff. Use this privacy-first env diff directly in your browser.",
      "keywords": [
        "env diff",
        "devops",
        "calculator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "devops",
      "calculator",
      "env-diff"
    ],
    "icon": "code"
  },
  {
    "id": "git-5",
    "slug": "changelog-formatter",
    "title": "Changelog formatter",
    "name": "Changelog formatter",
    "href": "/tools/changelog-formatter/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Git",
    "categorySlug": "git",
    "mode": "transform",
    "description": "Changelog formatter. Use this privacy-first changelog formatter directly in your browser.",
    "seo": {
      "title": "Changelog formatter - Free Browser Tool | Nadhebe",
      "description": "Changelog formatter. Use this privacy-first changelog formatter directly in your browser.",
      "keywords": [
        "changelog formatter",
        "git",
        "transform"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "git",
      "transform",
      "changelog-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "finance-4",
    "slug": "compound-interest",
    "title": "Compound interest",
    "name": "Compound interest",
    "href": "/tools/compound-interest/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "analyzer",
    "description": "Compound interest. Use this privacy-first compound interest directly in your browser.",
    "seo": {
      "title": "Compound interest - Free Browser Tool | Nadhebe",
      "description": "Compound interest. Use this privacy-first compound interest directly in your browser.",
      "keywords": [
        "compound interest",
        "finance",
        "analyzer"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "finance",
      "analyzer",
      "compound-interest"
    ],
    "icon": "code"
  },
  {
    "id": "calculators-3",
    "slug": "average-calculator",
    "title": "Average calculator",
    "name": "Average calculator",
    "href": "/tools/average-calculator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "calculator",
    "description": "Average calculator. Use this privacy-first average calculator directly in your browser.",
    "seo": {
      "title": "Average calculator - Free Browser Tool | Nadhebe",
      "description": "Average calculator. Use this privacy-first average calculator directly in your browser.",
      "keywords": [
        "average calculator",
        "calculators",
        "calculator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "calculators",
      "calculator",
      "average-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "date-time-3",
    "slug": "date-difference",
    "title": "Date difference",
    "name": "Date difference",
    "href": "/tools/date-difference/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "calculator",
    "description": "Date difference. Use this privacy-first date difference directly in your browser.",
    "seo": {
      "title": "Date difference - Free Browser Tool | Nadhebe",
      "description": "Date difference. Use this privacy-first date difference directly in your browser.",
      "keywords": [
        "date difference",
        "date & time",
        "calculator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "date & time",
      "calculator",
      "date-difference"
    ],
    "icon": "code"
  },
  {
    "id": "performance-4",
    "slug": "cls-checklist",
    "title": "CLS checklist",
    "name": "CLS checklist",
    "href": "/tools/cls-checklist/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "analyzer",
    "description": "CLS checklist. Use this privacy-first cls checklist directly in your browser.",
    "seo": {
      "title": "CLS checklist - Free Browser Tool | Nadhebe",
      "description": "CLS checklist. Use this privacy-first cls checklist directly in your browser.",
      "keywords": [
        "cls checklist",
        "performance",
        "analyzer"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "performance",
      "analyzer",
      "cls-checklist"
    ],
    "icon": "code"
  },
  {
    "id": "productivity-1",
    "slug": "checklist-builder",
    "title": "Checklist builder",
    "name": "Checklist builder",
    "href": "/tools/checklist-builder/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "transform",
    "description": "Checklist builder. Use this privacy-first checklist builder directly in your browser.",
    "seo": {
      "title": "Checklist builder - Free Browser Tool | Nadhebe",
      "description": "Checklist builder. Use this privacy-first checklist builder directly in your browser.",
      "keywords": [
        "checklist builder",
        "productivity",
        "transform"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "productivity",
      "transform",
      "checklist-builder"
    ],
    "icon": "code"
  },
  {
    "id": "writing-1",
    "slug": "reading-time-calculator",
    "title": "Reading time calculator",
    "name": "Reading time calculator",
    "href": "/tools/reading-time-calculator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Text",
    "categorySlug": "text",
    "mode": "transform",
    "description": "Reading time calculator. Use this privacy-first reading time calculator directly in your browser.",
    "seo": {
      "title": "Reading time calculator - Free Browser Tool | Nadhebe",
      "description": "Estimate article reading time based on average reading speed. Paste your content and get an instant reading time estimate in seconds.",
      "keywords": [
        "reading time calculator",
        "estimate reading time",
        "how long to read",
        "blog reading time",
        "article read time"
      ]
    },
    "relatedTools": [
      "word-counter",
      "case-converter",
      "duplicate-remover",
      "slug-generator"
    ],
    "tags": [
      "text",
      "transform",
      "reading-time-calculator"
    ],
    "icon": "clock"
  },
  {
    "id": "education-3",
    "slug": "citation-formatter",
    "title": "Citation formatter",
    "name": "Citation formatter",
    "href": "/tools/citation-formatter/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Education",
    "categorySlug": "education",
    "mode": "calculator",
    "description": "Citation formatter. Use this privacy-first citation formatter directly in your browser.",
    "seo": {
      "title": "Citation formatter - Free Browser Tool | Nadhebe",
      "description": "Citation formatter. Use this privacy-first citation formatter directly in your browser.",
      "keywords": [
        "citation formatter",
        "education",
        "calculator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "education",
      "calculator",
      "citation-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "data-analysis-1",
    "slug": "column-profiler",
    "title": "Column profiler",
    "name": "Column profiler",
    "href": "/tools/column-profiler/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "transform",
    "description": "Column profiler. Use this privacy-first column profiler directly in your browser.",
    "seo": {
      "title": "Column profiler - Free Browser Tool | Nadhebe",
      "description": "Column profiler. Use this privacy-first column profiler directly in your browser.",
      "keywords": [
        "column profiler",
        "data analysis",
        "transform"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "data analysis",
      "transform",
      "column-profiler"
    ],
    "icon": "code"
  },
  {
    "id": "visualization-3",
    "slug": "color-scale-generator",
    "title": "Color scale generator",
    "name": "Color scale generator",
    "href": "/tools/color-scale-generator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "calculator",
    "description": "Generate a Tailwind-style color palette from any hex color. Enter a base hex value and get a full 10-step shade scale from 50 to 900. Runs in your browser.",
    "seo": {
      "title": "Color Scale Generator — Tailwind Palette from Hex | Nadhebe",
      "description": "Enter a hex color and generate a complete 10-shade Tailwind-compatible color scale. Get shade values from 50 to 900 instantly. Free browser tool — no uploads.",
      "keywords": [
        "color scale generator",
        "tailwind color palette generator",
        "hex color shades",
        "color palette from hex",
        "generate color scale online",
        "design color system tool",
        "color tints and shades"
      ]
    },
    "relatedTools": [
      "color-contrast-checker",
      "css-clamp-calculator",
      "px-to-rem",
      "svg-to-jsx"
    ],
    "tags": [
      "visualization",
      "calculator",
      "color-scale-generator"
    ],
    "icon": "palette"
  },
  {
    "id": "api-3",
    "slug": "curl-builder",
    "title": "cURL builder",
    "name": "cURL builder",
    "href": "/tools/curl-builder/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "API",
    "categorySlug": "api",
    "mode": "calculator",
    "description": "Build a complete cURL command from a human-readable request spec. Paste method, URL, headers, and body — get a ready-to-run curl command. Fully local.",
    "seo": {
      "title": "cURL Builder — Generate curl Commands from HTTP Requests | Nadhebe",
      "description": "Turn a plain HTTP request spec into a ready-to-run curl command. Specify method, URL, headers, and request body and get the correct curl syntax instantly. Free browser tool.",
      "keywords": [
        "curl builder",
        "generate curl command",
        "curl command generator",
        "http request to curl",
        "api curl generator",
        "curl syntax builder",
        "rest api curl tool"
      ]
    },
    "relatedTools": [
      "url-parser",
      "json-formatter",
      "base64-encoder",
      "dockerfile-linter"
    ],
    "tags": [
      "api",
      "calculator",
      "curl-builder"
    ],
    "icon": "terminal"
  },
  {
    "id": "16-9-dimensions-calculator",
    "slug": "16-9-dimensions-calculator",
    "title": "16 9 Dimensions Calculator",
    "name": "16 9 Dimensions Calculator",
    "href": "/tools/16-9-dimensions-calculator/",
    "component": "src/pages/tools/16-9-dimensions-calculator.astro",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Browser native 16 9 Dimensions Calculator utility.",
    "seo": {
      "title": "16 9 Dimensions Calculator | Nadhebe",
      "description": "Find all standard 16:9 resolutions from 480p to 8K. Enter width to get correct 16:9 height, or browse the complete widescreen resolution table.",
      "keywords": [
        "16:9 dimensions",
        "16 9 aspect ratio",
        "16x9 resolutions",
        "widescreen dimensions",
        "1920x1080 ratio chart"
      ]
    },
    "relatedTools": [
      "aspect-ratio-calculator",
      "9-16-dimensions-calculator",
      "resize-dimensions-calculator",
      "youtube-video-size-calculator"
    ],
    "tags": [
      "image",
      "16-9-dimensions-calculator"
    ],
    "icon": "monitor"
  },
  {
    "id": "9-16-dimensions-calculator",
    "slug": "9-16-dimensions-calculator",
    "title": "9 16 Dimensions Calculator",
    "name": "9 16 Dimensions Calculator",
    "href": "/tools/9-16-dimensions-calculator/",
    "component": "src/pages/tools/9-16-dimensions-calculator.astro",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Browser native 9 16 Dimensions Calculator utility.",
    "seo": {
      "title": "9 16 Dimensions Calculator | Nadhebe",
      "description": "Get all standard 9:16 vertical dimensions for TikTok, Instagram Reels, YouTube Shorts. Instant portrait video size reference for content creators.",
      "keywords": [
        "9:16 dimensions",
        "9 16 aspect ratio",
        "vertical video dimensions",
        "portrait video calculator",
        "shorts reels dimensions"
      ]
    },
    "relatedTools": [
      "aspect-ratio-calculator",
      "16-9-dimensions-calculator",
      "social-media-image-sizes",
      "resize-dimensions-calculator"
    ],
    "tags": [
      "image",
      "9-16-dimensions-calculator"
    ],
    "icon": "smartphone"
  },
  {
    "id": "aspect-ratio-calculator",
    "slug": "aspect-ratio-calculator",
    "title": "Aspect Ratio Calculator",
    "name": "Aspect Ratio Calculator",
    "href": "/tools/aspect-ratio-calculator/",
    "component": "src/pages/tools/aspect-ratio-calculator.astro",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Browser native Aspect Ratio Calculator utility.",
    "seo": {
      "title": "Aspect Ratio Calculator | Nadhebe",
      "description": "Calculate aspect ratio from width and height, resize dimensions while preserving ratio, and find equivalent resolutions for common ratios.",
      "keywords": [
        "aspect ratio calculator",
        "calculate aspect ratio",
        "image aspect ratio",
        "video aspect ratio",
        "16:9 ratio calculator"
      ]
    },
    "relatedTools": [
      "resize-dimensions-calculator",
      "16-9-dimensions-calculator",
      "ppi-calculator",
      "dpi-print-size-calculator"
    ],
    "tags": [
      "image",
      "aspect-ratio-calculator"
    ],
    "icon": "crop"
  },
  {
    "id": "color-contrast-checker",
    "slug": "color-contrast-checker",
    "title": "Color Contrast Checker",
    "name": "Color Contrast Checker",
    "href": "/tools/color-contrast-checker/",
    "component": "src/pages/tools/color-contrast-checker.astro",
    "status": "implemented",
    "category": "Design",
    "categorySlug": "design",
    "mode": "transform",
    "description": "Browser native Color Contrast Checker utility.",
    "seo": {
      "title": "Color Contrast Checker | Nadhebe",
      "description": "Check WCAG 2.1 color contrast ratios for AA and AAA accessibility. Paste hex or RGB colors and get instant pass/fail results with contrast ratio.",
      "keywords": [
        "color contrast checker",
        "wcag contrast ratio",
        "accessibility contrast",
        "aa aaa contrast checker",
        "web accessibility color"
      ]
    },
    "relatedTools": [
      "css-clamp-calculator",
      "px-to-rem",
      "schema-generator",
      "meta-tag-analyzer"
    ],
    "tags": [
      "design",
      "color-contrast-checker"
    ],
    "icon": "contrast"
  },
  {
    "id": "css-clamp-calculator",
    "slug": "css-clamp-calculator",
    "title": "Css Clamp Calculator",
    "name": "Css Clamp Calculator",
    "href": "/tools/css-clamp-calculator/",
    "component": "src/pages/tools/css-clamp-calculator.astro",
    "status": "implemented",
    "category": "Design",
    "categorySlug": "design",
    "mode": "transform",
    "description": "Browser native Css Clamp Calculator utility.",
    "seo": {
      "title": "Css Clamp Calculator | Nadhebe",
      "description": "Generate CSS clamp() values for fluid typography and spacing that scales between viewport sizes. Copy the result directly into your stylesheet.",
      "keywords": [
        "css clamp calculator",
        "fluid typography generator",
        "css clamp function",
        "responsive font size calculator"
      ]
    },
    "relatedTools": [
      "px-to-rem",
      "color-contrast-checker",
      "aspect-ratio-calculator",
      "resize-dimensions-calculator"
    ],
    "tags": [
      "design",
      "css-clamp-calculator"
    ],
    "icon": "sliders"
  },
  {
    "id": "csv-to-json",
    "slug": "csv-to-json",
    "title": "Csv To Json",
    "name": "Csv To Json",
    "href": "/tools/csv-to-json/",
    "component": "src/pages/tools/csv-to-json.astro",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "transform",
    "description": "Browser native Csv To Json utility.",
    "seo": {
      "title": "Csv To Json | Nadhebe",
      "description": "Convert CSV to JSON arrays and JSON back to CSV. Supports custom delimiters and drag-and-drop file loading. 100% client-side.",
      "keywords": [
        "csv to json converter",
        "convert csv to json",
        "csv json tool",
        "json to csv converter",
        "csv to json online"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "json-validator",
      "yaml-to-json",
      "xml-formatter"
    ],
    "tags": [
      "csv",
      "csv-to-json"
    ],
    "icon": "table"
  },
  {
    "id": "dpi-print-size-calculator",
    "slug": "dpi-print-size-calculator",
    "title": "Dpi Print Size Calculator",
    "name": "Dpi Print Size Calculator",
    "href": "/tools/dpi-print-size-calculator/",
    "component": "src/pages/tools/dpi-print-size-calculator.astro",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Browser native Dpi Print Size Calculator utility.",
    "seo": {
      "title": "Dpi Print Size Calculator | Nadhebe",
      "description": "Calculate print dimensions from DPI and pixel count. Find required resolution for any print size. Essential tool for designers preparing print files.",
      "keywords": [
        "dpi calculator",
        "print size calculator",
        "dpi to pixels",
        "pixels to print size",
        "print resolution calculator"
      ]
    },
    "relatedTools": [
      "ppi-calculator",
      "pixels-to-megapixels-calculator",
      "megapixels-to-resolution-calculator",
      "resize-dimensions-calculator"
    ],
    "tags": [
      "image",
      "dpi-print-size-calculator"
    ],
    "icon": "printer"
  },
  {
    "id": "json-formatter",
    "slug": "json-formatter",
    "title": "Json Formatter",
    "name": "Json Formatter",
    "href": "/tools/json-formatter/",
    "component": "src/pages/tools/json-formatter.astro",
    "status": "implemented",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "transform",
    "description": "Browser native Json Formatter utility.",
    "seo": {
      "title": "Json Formatter | Nadhebe",
      "description": "Format, beautify, and validate JSON with syntax highlighting and collapsible tree view. Supports conversion to XML, CSV, YAML — 100% client-side.",
      "keywords": [
        "json formatter",
        "json beautifier",
        "format json online",
        "json pretty print",
        "beautify json"
      ]
    },
    "relatedTools": [
      "json-minifier",
      "json-validator",
      "json-to-xml",
      "csv-to-json"
    ],
    "tags": [
      "json",
      "json-formatter"
    ],
    "icon": "braces"
  },
  {
    "id": "json-minifier",
    "slug": "json-minifier",
    "title": "Json Minifier",
    "name": "Json Minifier",
    "href": "/tools/json-minifier/",
    "component": "src/pages/tools/json-minifier.astro",
    "status": "implemented",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "transform",
    "description": "Browser native Json Minifier utility.",
    "seo": {
      "title": "Json Minifier | Nadhebe",
      "description": "Minify and compact JSON by stripping whitespace. Instant browser-side processing with copy and download — no data uploaded.",
      "keywords": [
        "json minifier",
        "minify json online",
        "json compressor",
        "compress json",
        "json uglify"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "json-validator",
      "json-to-xml",
      "yaml-to-json"
    ],
    "tags": [
      "json",
      "json-minifier"
    ],
    "icon": "minimize-2"
  },
  {
    "id": "json-to-typescript",
    "slug": "json-to-typescript",
    "title": "Json To Typescript",
    "name": "Json To Typescript",
    "href": "/tools/json-to-typescript/",
    "component": "src/pages/tools/json-to-typescript.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "transform",
    "description": "Browser native Json To Typescript utility.",
    "seo": {
      "title": "Json To Typescript | Nadhebe",
      "description": "Convert JSON objects to TypeScript interfaces automatically. Paste JSON, get fully typed TypeScript code instantly — 100% local.",
      "keywords": [
        "json to typescript",
        "json to typescript interface",
        "generate typescript interface",
        "json schema to typescript",
        "typescript type generator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "json-validator",
      "json-minifier",
      "svg-to-jsx"
    ],
    "tags": [
      "developer",
      "json-to-typescript"
    ],
    "icon": "file-code"
  },
  {
    "id": "json-to-xml",
    "slug": "json-to-xml",
    "title": "Json To Xml",
    "name": "Json To Xml",
    "href": "/tools/json-to-xml/",
    "component": "src/pages/tools/json-to-xml.astro",
    "status": "implemented",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "transform",
    "description": "Browser native Json To Xml utility.",
    "seo": {
      "title": "Json To Xml | Nadhebe",
      "description": "Convert JSON to formatted XML markup instantly. Handles nested objects and arrays. Free browser converter — no server, no uploads.",
      "keywords": [
        "json to xml converter",
        "convert json to xml",
        "json xml converter",
        "json2xml online",
        "transform json to xml"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "xml-formatter",
      "yaml-to-json",
      "json-validator"
    ],
    "tags": [
      "json",
      "json-to-xml"
    ],
    "icon": "arrow-right-left"
  },
  {
    "id": "json-validator",
    "slug": "json-validator",
    "title": "Json Validator",
    "name": "Json Validator",
    "href": "/tools/json-validator/",
    "component": "src/pages/tools/json-validator.astro",
    "status": "implemented",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "transform",
    "description": "Browser native Json Validator utility.",
    "seo": {
      "title": "Json Validator | Nadhebe",
      "description": "Validate JSON syntax and see errors with exact line numbers. Free JSON checker that runs entirely in your browser — zero data uploads.",
      "keywords": [
        "json validator",
        "validate json online",
        "json syntax checker",
        "json linter",
        "check json valid"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "json-minifier",
      "json-to-typescript",
      "json-to-xml"
    ],
    "tags": [
      "json",
      "json-validator"
    ],
    "icon": "check-circle"
  },
  {
    "id": "megapixels-to-resolution-calculator",
    "slug": "megapixels-to-resolution-calculator",
    "title": "Megapixels To Resolution Calculator",
    "name": "Megapixels To Resolution Calculator",
    "href": "/tools/megapixels-to-resolution-calculator/",
    "component": "src/pages/tools/megapixels-to-resolution-calculator.astro",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Browser native Megapixels To Resolution Calculator utility.",
    "seo": {
      "title": "Megapixels To Resolution Calculator | Nadhebe",
      "description": "Convert megapixels to image resolution dimensions. Find common sensor resolutions for any MP count — perfect for camera comparisons.",
      "keywords": [
        "megapixels to resolution",
        "mp to resolution",
        "camera megapixel converter",
        "image resolution megapixels"
      ]
    },
    "relatedTools": [
      "pixels-to-megapixels-calculator",
      "ppi-calculator",
      "dpi-print-size-calculator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "image",
      "megapixels-to-resolution-calculator"
    ],
    "icon": "camera"
  },
  {
    "id": "meta-tag-analyzer",
    "slug": "meta-tag-analyzer",
    "title": "Meta Tag Analyzer",
    "name": "Meta Tag Analyzer",
    "href": "/tools/meta-tag-analyzer/",
    "component": "src/pages/tools/meta-tag-analyzer.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "transform",
    "description": "Browser native Meta Tag Analyzer utility.",
    "seo": {
      "title": "Meta Tag Analyzer | Nadhebe",
      "description": "Analyze a page's meta tags: title, description, Open Graph, Twitter Cards, and robots directives. Get instant SEO feedback on any URL.",
      "keywords": [
        "meta tag analyzer",
        "meta tag checker",
        "seo meta tags",
        "open graph checker",
        "website meta audit"
      ]
    },
    "relatedTools": [
      "schema-generator",
      "sitemap-validator",
      "opportunity-radar",
      "url-parser"
    ],
    "tags": [
      "seo",
      "meta-tag-analyzer"
    ],
    "icon": "tag"
  },
  {
    "id": "opportunity-radar",
    "slug": "opportunity-radar",
    "title": "Opportunity Radar",
    "name": "Opportunity Radar",
    "href": "/tools/opportunity-radar/",
    "component": "src/pages/tools/opportunity-radar.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "transform",
    "description": "Browser native Opportunity Radar utility.",
    "seo": {
      "title": "Opportunity Radar | Nadhebe",
      "description": "Surface content and keyword opportunities from your existing data. Find quick-win SEO topics and content gaps to grow organic search traffic.",
      "keywords": [
        "seo opportunity finder",
        "content gap analysis",
        "keyword opportunity tool",
        "seo content opportunities"
      ]
    },
    "relatedTools": [
      "meta-tag-analyzer",
      "schema-generator",
      "sitemap-validator",
      "social-media-image-sizes"
    ],
    "tags": [
      "seo",
      "opportunity-radar"
    ],
    "icon": "search"
  },
  {
    "id": "percentage-difference-calculator",
    "slug": "percentage-difference-calculator",
    "title": "Percentage Difference Calculator",
    "name": "Percentage Difference Calculator",
    "href": "/tools/percentage-difference-calculator/",
    "component": "src/pages/tools/percentage-difference-calculator.astro",
    "status": "implemented",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "transform",
    "description": "Browser native Percentage Difference Calculator utility.",
    "seo": {
      "title": "Percentage Difference Calculator | Nadhebe",
      "description": "Calculate percentage difference and percentage change between two numbers. Shows formula, absolute difference, and relative change.",
      "keywords": [
        "percentage difference calculator",
        "percent difference",
        "percentage change calculator",
        "percent change between numbers"
      ]
    },
    "relatedTools": [
      "profit-margin-calculator",
      "ppi-calculator",
      "dpi-print-size-calculator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "calculators",
      "percentage-difference-calculator"
    ],
    "icon": "percent"
  },
  {
    "id": "pixels-to-megapixels-calculator",
    "slug": "pixels-to-megapixels-calculator",
    "title": "Pixels To Megapixels Calculator",
    "name": "Pixels To Megapixels Calculator",
    "href": "/tools/pixels-to-megapixels-calculator/",
    "component": "src/pages/tools/pixels-to-megapixels-calculator.astro",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Browser native Pixels To Megapixels Calculator utility.",
    "seo": {
      "title": "Pixels To Megapixels Calculator | Nadhebe",
      "description": "Calculate megapixel count from image width and height. Understand photo file sizes and compare camera resolutions instantly.",
      "keywords": [
        "pixels to megapixels",
        "pixel to mp converter",
        "image megapixel calculator",
        "resolution to megapixels"
      ]
    },
    "relatedTools": [
      "megapixels-to-resolution-calculator",
      "ppi-calculator",
      "dpi-print-size-calculator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "image",
      "pixels-to-megapixels-calculator"
    ],
    "icon": "camera"
  },
  {
    "id": "ppi-calculator",
    "slug": "ppi-calculator",
    "title": "Ppi Calculator",
    "name": "Ppi Calculator",
    "href": "/tools/ppi-calculator/",
    "component": "src/pages/tools/ppi-calculator.astro",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Browser native Ppi Calculator utility.",
    "seo": {
      "title": "Ppi Calculator | Nadhebe",
      "description": "Calculate pixels per inch (PPI) for any screen from diagonal size and resolution. Compare display sharpness across phones, monitors, and TVs.",
      "keywords": [
        "ppi calculator",
        "pixels per inch",
        "screen ppi",
        "monitor ppi calculator",
        "display pixel density"
      ]
    },
    "relatedTools": [
      "dpi-print-size-calculator",
      "resize-dimensions-calculator",
      "aspect-ratio-calculator",
      "pixels-to-megapixels-calculator"
    ],
    "tags": [
      "image",
      "ppi-calculator"
    ],
    "icon": "monitor"
  },
  {
    "id": "profit-margin-calculator",
    "slug": "profit-margin-calculator",
    "title": "Profit Margin Calculator",
    "name": "Profit Margin Calculator",
    "href": "/tools/profit-margin-calculator/",
    "component": "src/pages/tools/profit-margin-calculator.astro",
    "status": "implemented",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "transform",
    "description": "Browser native Profit Margin Calculator utility.",
    "seo": {
      "title": "Profit Margin Calculator | Nadhebe",
      "description": "Calculate gross profit margin, markup %, and net profit after Shopify, Stripe, and PayPal fees. Built specifically for e-commerce sellers.",
      "keywords": [
        "profit margin calculator",
        "gross margin calculator",
        "markup calculator",
        "ecommerce profit calculator",
        "shopify fee calculator"
      ]
    },
    "relatedTools": [
      "percentage-difference-calculator",
      "ppi-calculator",
      "aspect-ratio-calculator",
      "social-media-image-sizes"
    ],
    "tags": [
      "finance",
      "profit-margin-calculator"
    ],
    "icon": "trending-up"
  },
  {
    "id": "px-to-rem",
    "slug": "px-to-rem",
    "title": "Px To Rem",
    "name": "Px To Rem",
    "href": "/tools/px-to-rem/",
    "component": "src/pages/tools/px-to-rem.astro",
    "status": "implemented",
    "category": "Design",
    "categorySlug": "design",
    "mode": "transform",
    "description": "Browser native Px To Rem utility.",
    "seo": {
      "title": "Px To Rem | Nadhebe",
      "description": "Convert pixel values to rem units and rem to px. Set your base font size and get instant conversion results for accessible CSS layouts.",
      "keywords": [
        "px to rem converter",
        "pixels to rem",
        "rem to px",
        "css unit converter",
        "font size px rem"
      ]
    },
    "relatedTools": [
      "css-clamp-calculator",
      "color-contrast-checker",
      "percentage-difference-calculator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "design",
      "px-to-rem"
    ],
    "icon": "ruler"
  },
  {
    "id": "resize-dimensions-calculator",
    "slug": "resize-dimensions-calculator",
    "title": "Resize Dimensions Calculator",
    "name": "Resize Dimensions Calculator",
    "href": "/tools/resize-dimensions-calculator/",
    "component": "src/pages/tools/resize-dimensions-calculator.astro",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Browser native Resize Dimensions Calculator utility.",
    "seo": {
      "title": "Resize Dimensions Calculator | Nadhebe",
      "description": "Calculate new image dimensions while preserving original aspect ratio. Enter new width or height and get the correct proportional size.",
      "keywords": [
        "resize dimensions calculator",
        "image resize calculator",
        "maintain aspect ratio",
        "scale image dimensions"
      ]
    },
    "relatedTools": [
      "aspect-ratio-calculator",
      "ppi-calculator",
      "16-9-dimensions-calculator",
      "dpi-print-size-calculator"
    ],
    "tags": [
      "image",
      "resize-dimensions-calculator"
    ],
    "icon": "maximize-2"
  },
  {
    "id": "schema-generator",
    "slug": "schema-generator",
    "title": "Schema Generator",
    "name": "Schema Generator",
    "href": "/tools/schema-generator/",
    "component": "src/pages/tools/schema-generator.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "transform",
    "description": "Browser native Schema Generator utility.",
    "seo": {
      "title": "Schema Generator | Nadhebe",
      "description": "Generate JSON-LD structured data for articles, products, FAQs, and organizations. Copy schema.org markup ready to paste directly into your HTML.",
      "keywords": [
        "schema markup generator",
        "json-ld generator",
        "structured data generator",
        "schema.org markup",
        "rich snippet generator"
      ]
    },
    "relatedTools": [
      "meta-tag-analyzer",
      "sitemap-validator",
      "json-formatter",
      "opportunity-radar"
    ],
    "tags": [
      "seo",
      "schema-generator"
    ],
    "icon": "braces"
  },
  {
    "id": "sitemap-validator",
    "slug": "sitemap-validator",
    "title": "Sitemap Validator",
    "name": "Sitemap Validator",
    "href": "/tools/sitemap-validator/",
    "component": "src/pages/tools/sitemap-validator.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "transform",
    "description": "Browser native Sitemap Validator utility.",
    "seo": {
      "title": "Sitemap Validator | Nadhebe",
      "description": "Validate your XML sitemap for structural errors and malformed URLs. Paste sitemap XML and get instant feedback on formatting issues.",
      "keywords": [
        "sitemap validator",
        "xml sitemap checker",
        "validate sitemap",
        "sitemap analyzer",
        "check sitemap errors"
      ]
    },
    "relatedTools": [
      "meta-tag-analyzer",
      "schema-generator",
      "xml-formatter",
      "opportunity-radar"
    ],
    "tags": [
      "seo",
      "sitemap-validator"
    ],
    "icon": "map"
  },
  {
    "id": "social-media-image-sizes",
    "slug": "social-media-image-sizes",
    "title": "Social Media Image Sizes",
    "name": "Social Media Image Sizes",
    "href": "/tools/social-media-image-sizes/",
    "component": "src/pages/tools/social-media-image-sizes.astro",
    "status": "implemented",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "transform",
    "description": "Browser native Social Media Image Sizes utility.",
    "seo": {
      "title": "Social Media Image Sizes | Nadhebe",
      "description": "Complete 2024 reference for every social media image size. Instagram, Facebook, Twitter X, LinkedIn, YouTube — all dimensions in one table.",
      "keywords": [
        "social media image sizes",
        "instagram image dimensions",
        "facebook image size",
        "twitter image size",
        "social media dimensions 2024"
      ]
    },
    "relatedTools": [
      "aspect-ratio-calculator",
      "9-16-dimensions-calculator",
      "resize-dimensions-calculator",
      "youtube-video-size-calculator"
    ],
    "tags": [
      "social-media",
      "social-media-image-sizes"
    ],
    "icon": "share-2"
  },
  {
    "id": "svg-to-jsx",
    "slug": "svg-to-jsx",
    "title": "Svg To Jsx",
    "name": "Svg To Jsx",
    "href": "/tools/svg-to-jsx/",
    "component": "src/pages/tools/svg-to-jsx.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "transform",
    "description": "Browser native Svg To Jsx utility.",
    "seo": {
      "title": "Svg To Jsx | Nadhebe",
      "description": "Convert SVG markup to React JSX with cleaned attributes and camelCase props. Browser-native conversion — no file uploads required.",
      "keywords": [
        "svg to jsx",
        "convert svg to jsx react",
        "svg jsx converter",
        "react svg component",
        "svg to react component"
      ]
    },
    "relatedTools": [
      "json-to-typescript",
      "css-clamp-calculator",
      "px-to-rem",
      "json-formatter"
    ],
    "tags": [
      "developer",
      "svg-to-jsx"
    ],
    "icon": "code-2"
  },
  {
    "id": "xml-formatter",
    "slug": "xml-formatter",
    "title": "Xml Formatter",
    "name": "Xml Formatter",
    "href": "/tools/xml-formatter/",
    "component": "src/pages/tools/xml-formatter.astro",
    "status": "implemented",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "transform",
    "description": "Browser native Xml Formatter utility.",
    "seo": {
      "title": "Xml Formatter | Nadhebe",
      "description": "Format and beautify XML with proper indentation. Validates XML structure and highlights errors. Free, private, browser-native tool.",
      "keywords": [
        "xml formatter",
        "format xml online",
        "xml beautifier",
        "xml pretty print",
        "xml code formatter"
      ]
    },
    "relatedTools": [
      "json-to-xml",
      "yaml-to-json",
      "json-formatter",
      "csv-to-json"
    ],
    "tags": [
      "xml",
      "xml-formatter"
    ],
    "icon": "file-code-2"
  },
  {
    "id": "yaml-to-json",
    "slug": "yaml-to-json",
    "title": "Yaml To Json",
    "name": "Yaml To Json",
    "href": "/tools/yaml-to-json/",
    "component": "src/pages/tools/yaml-to-json.astro",
    "status": "implemented",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "transform",
    "description": "Browser native Yaml To Json utility.",
    "seo": {
      "title": "Yaml To Json | Nadhebe",
      "description": "Convert YAML to JSON and back. Handles nested structures, arrays, and multi-document YAML. 100% browser-side — no server processing.",
      "keywords": [
        "yaml to json",
        "yaml to json converter",
        "convert yaml to json",
        "yaml json converter",
        "parse yaml to json"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "json-validator",
      "json-to-xml",
      "xml-formatter"
    ],
    "tags": [
      "json",
      "yaml-to-json"
    ],
    "icon": "arrow-right-left"
  },
  {
    "id": "youtube-video-size-calculator",
    "slug": "youtube-video-size-calculator",
    "title": "Youtube Video Size Calculator",
    "name": "Youtube Video Size Calculator",
    "href": "/tools/youtube-video-size-calculator/",
    "component": "src/pages/tools/youtube-video-size-calculator.astro",
    "status": "implemented",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "transform",
    "description": "Browser native Youtube Video Size Calculator utility.",
    "seo": {
      "title": "Youtube Video Size Calculator | Nadhebe",
      "description": "Find correct pixel dimensions for YouTube thumbnails, channel art, profile photos, and Shorts. Full YouTube image size guide for 2024.",
      "keywords": [
        "youtube video dimensions",
        "youtube thumbnail size",
        "youtube channel art size",
        "yt image sizes 2024"
      ]
    },
    "relatedTools": [
      "aspect-ratio-calculator",
      "16-9-dimensions-calculator",
      "social-media-image-sizes",
      "resize-dimensions-calculator"
    ],
    "tags": [
      "youtube",
      "youtube-video-size-calculator"
    ],
    "icon": "play-circle"
  },
  {
    "id": "ai-1",
    "slug": "prompt-optimizer",
    "title": "AI Prompt Optimizer",
    "name": "AI Prompt Optimizer",
    "href": "/tools/prompt-optimizer/",
    "component": "src/pages/tools/prompt-optimizer.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "generator",
    "description": "Optimize AI system prompts with explicit roles, context variables, and structured output rules.",
    "seo": {
      "title": "AI Prompt Optimizer & System Prompt Refiner | Nadhebe",
      "description": "Optimize AI prompts for GPT-4o, Claude 3.5, and Gemini 1.5. Add clear roles, constraints, context variables, and structured output rules.",
      "keywords": [
        "prompt optimizer",
        "system prompt refiner",
        "ai prompt engineering",
        "gpt-4o prompt builder",
        "claude system prompt"
      ]
    },
    "relatedTools": [
      "ai-prompt-generator",
      ],
    "tags": [
      "ai",
      "prompt-optimizer"
    ],
    "icon": "sparkles"
  },
  {
    "id": "ai-2",
    "slug": "ai-prompt-generator",
    "title": "Multi-Persona AI Prompt Generator",
    "name": "Multi-Persona AI Prompt Generator",
    "href": "/tools/ai-prompt-generator/",
    "component": "src/pages/tools/ai-prompt-generator.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "generator",
    "description": "Generate structured system prompts across software engineering, SEO, and product management personas.",
    "seo": {
      "title": "Multi-Persona AI Prompt Generator | Nadhebe",
      "description": "Generate structured system prompts for ChatGPT, Claude, and Gemini across Software Engineering, SEO, Product Management, and Content Strategy roles.",
      "keywords": [
        "ai prompt generator",
        "multi persona prompt builder",
        "chatgpt system prompt",
        "claude persona generator",
        "prompt template maker"
      ]
    },
    "relatedTools": [
      "prompt-optimizer",
      ],
    "tags": [
      "ai",
      "ai-prompt-generator"
    ],
    "icon": "user-check"
  },
  {
    "id": "ai-4",
    "slug": "ai-detection-checker",
    "title": "AI Text Perplexity & Burstiness Checker",
    "name": "AI Text Perplexity & Burstiness Checker",
    "href": "/tools/ai-detection-checker/",
    "component": "src/pages/tools/ai-detection-checker.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "analyzer",
    "description": "Audit text for AI generation patterns using sentence burstiness metrics and vocabulary perplexity proxies.",
    "seo": {
      "title": "AI Text Perplexity & Burstiness Checker | Nadhebe",
      "description": "Audit text for AI generation patterns using client-side sentence burstiness metrics, vocabulary perplexity proxies, and common AI buzzword frequency.",
      "keywords": [
        "ai detection checker",
        "text perplexity calculator",
        "sentence burstiness score",
        "ai writing pattern audit",
        "humanize ai text"
      ]
    },
    "relatedTools": [
      "prompt-optimizer",
      "seo-checker"
    ],
    "tags": [
      "ai",
      "ai-detection-checker"
    ],
    "icon": "shield-alert"
  },
  {
    "id": "ai-5",
    "slug": "llm-tokenizer",
    "title": "LLM BPE Tokenizer & Multi-Model Counter",
    "name": "LLM BPE Tokenizer & Multi-Model Counter",
    "href": "/tools/llm-tokenizer/",
    "component": "src/pages/tools/llm-tokenizer.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "calculator",
    "description": "Count tokens across GPT-4o, Claude 3.5 Sonnet, and Llama 3 models.",
    "seo": {
      "title": "LLM BPE Tokenizer & Multi-Model Token Counter | Nadhebe",
      "description": "Count tokens across GPT-4o, Claude 3.5 Sonnet, and Llama 3 models. Inspect BPE subword tokens, estimate API costs, and prevent context window truncation.",
      "keywords": [
        "llm tokenizer",
        "bpe token counter",
        "gpt-4o token calculator",
        "claude token counter",
        "llama 3 tokenizer"
      ]
    },
    "relatedTools": [
      "prompt-optimizer"
    ],
    "tags": [
      "ai",
      "llm-tokenizer"
    ],
    "icon": "binary"
  },
  {
    "id": "ai-6",
    "slug": "rag-evaluator",
    "title": "RAG Retrieval Precision & Recall Evaluator",
    "name": "RAG Retrieval Precision & Recall Evaluator",
    "href": "/tools/rag-evaluator/",
    "component": "src/pages/tools/rag-evaluator.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "calculator",
    "description": "Audit RAG retrieval quality: calculate Precision@K, Recall@K, F1 Score, and Context Noise Ratio.",
    "seo": {
      "title": "RAG Retrieval Precision & Recall Evaluator | Nadhebe",
      "description": "Audit RAG vector retrieval quality: calculate Precision@K, Recall@K, F1 Score, and Context Noise Ratio to optimize vector search pipelines.",
      "keywords": [
        "rag evaluator",
        "vector retrieval precision",
        "recall at k calculator",
        "context noise ratio",
        "rag f1 score"
      ]
    },
    "relatedTools": [
      "llm-tokenizer",
      "prompt-optimizer"
    ],
    "tags": [
      "ai",
      "rag-evaluator"
    ],
    "icon": "database"
  },
  {
    "id": "ai-7",
    "slug": "json-schema-validator",
    "title": "JSON Schema Validator & Output Auditor",
    "name": "JSON Schema Validator & Output Auditor",
    "href": "/tools/json-schema-validator/",
    "component": "src/pages/tools/json-schema-validator.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "analyzer",
    "description": "Validate JSON payloads against JSON Schema Draft 7 and 2020-12 standards.",
    "seo": {
      "title": "JSON Schema Validator & LLM Tool Output Auditor | Nadhebe",
      "description": "Validate JSON payloads against JSON Schema Draft 7 and 2020-12 standards. Audit LLM function calling responses, check required keys, and verify data types.",
      "keywords": [
        "json schema validator",
        "llm function calling schema",
        "tool call validator",
        "draft 7 json schema",
        "json payload audit"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "schema-validator"
    ],
    "tags": [
      "ai",
      "json-schema-validator"
    ],
    "icon": "file-check"
  },
  {
    "id": "ai-8",
    "slug": "openai-cost-estimator",
    "title": "OpenAI GPT-4o & O3-Mini API Cost Estimator",
    "name": "OpenAI GPT-4o & O3-Mini API Cost Estimator",
    "href": "/tools/openai-cost-estimator/",
    "component": "src/pages/tools/openai-cost-estimator.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "calculator",
    "description": "Calculate API pricing for OpenAI GPT-4o, GPT-4o-mini, O3-mini, and O1 models.",
    "seo": {
      "title": "OpenAI GPT-4o & O3-Mini API Cost Estimator | Nadhebe",
      "description": "Calculate API pricing for OpenAI GPT-4o, GPT-4o-mini, O3-mini, and O1 models. Estimate monthly costs based on input tokens, output tokens, and prompt caching.",
      "keywords": [
        "openai cost estimator",
        "gpt-4o api pricing",
        "o3-mini cost calculator",
        "openai prompt caching",
        "llm api budget"
      ]
    },
    "relatedTools": [
      "claude-cost-estimator",
      "gemini-cost-estimator",
      "llm-tokenizer"
    ],
    "tags": [
      "ai",
      "openai-cost-estimator"
    ],
    "icon": "calculator"
  },
  {
    "id": "ai-9",
    "slug": "claude-cost-estimator",
    "title": "Anthropic Claude 3.5 Sonnet Cost Estimator",
    "name": "Anthropic Claude 3.5 Sonnet Cost Estimator",
    "href": "/tools/claude-cost-estimator/",
    "component": "src/pages/tools/claude-cost-estimator.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "calculator",
    "description": "Calculate API pricing for Anthropic Claude 3.5 Sonnet, Haiku, and Opus models.",
    "seo": {
      "title": "Anthropic Claude 3.5 Sonnet & Haiku Cost Estimator | Nadhebe",
      "description": "Calculate API pricing for Anthropic Claude 3.5 Sonnet, Claude 3.5 Haiku, and Claude 3 Opus. Estimate monthly spend based on prompt tokens, completion tokens, and prompt caching.",
      "keywords": [
        "claude cost estimator",
        "claude 3.5 sonnet pricing",
        "anthropic prompt caching",
        "claude haiku cost calculator",
        "llm api budget"
      ]
    },
    "relatedTools": [
      "openai-cost-estimator",
      "gemini-cost-estimator",
      ],
    "tags": [
      "ai",
      "claude-cost-estimator"
    ],
    "icon": "dollar-sign"
  },
  {
    "id": "ai-10",
    "slug": "gemini-cost-estimator",
    "title": "Google Gemini 1.5 Pro & Flash Cost Estimator",
    "name": "Google Gemini 1.5 Pro & Flash Cost Estimator",
    "href": "/tools/gemini-cost-estimator/",
    "component": "src/pages/tools/gemini-cost-estimator.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "calculator",
    "description": "Calculate API pricing for Google Gemini 1.5 Pro, Flash, and 2.0 Flash models.",
    "seo": {
      "title": "Google Gemini 1.5 Pro & Flash API Cost Estimator | Nadhebe",
      "description": "Calculate API pricing for Google Gemini 1.5 Pro, Gemini 1.5 Flash, and Gemini 2.0 Flash. Estimate monthly costs for 1M+ token context windows and multimodal payloads.",
      "keywords": [
        "gemini cost estimator",
        "gemini 1.5 flash pricing",
        "google context caching",
        "gemini 1.5 pro calculator",
        "llm api budget"
      ]
    },
    "relatedTools": [
      "openai-cost-estimator",
      "claude-cost-estimator",
      "llm-tokenizer"
    ],
    "tags": [
      "ai",
      "gemini-cost-estimator"
    ],
    "icon": "coins"
  },
  {
    "id": "sec-1",
    "slug": "csp-header-generator",
    "title": "Content Security Policy (CSP) Header Generator",
    "name": "Content Security Policy (CSP) Header Generator",
    "href": "/tools/csp-header-generator/",
    "component": "src/pages/tools/csp-header-generator.astro",
    "status": "implemented",
    "category": "Security",
    "categorySlug": "security",
    "mode": "generator",
    "description": "Generate Content-Security-Policy HTTP headers to block XSS and unauthorized script execution.",
    "seo": {
      "title": "Content Security Policy (CSP) Header Generator | Nadhebe",
      "description": "Generate secure Content-Security-Policy HTTP headers for Nginx, Apache, Cloudflare, and Vercel. Block XSS, clickjacking, and unauthorized inline scripts.",
      "keywords": [
        "csp header generator",
        "content security policy builder",
        "nginx csp header",
        "xss prevention header",
        "script-src directive"
      ]
    },
    "relatedTools": [
      "hsts-header-generator",
      "x-frame-options-generator",
      "cors-header-generator",
      "jwt-inspector"
    ],
    "tags": [
      "security",
      "csp-header-generator"
    ],
    "icon": "shield-check"
  },
  {
    "id": "sec-2",
    "slug": "hsts-header-generator",
    "title": "HTTP Strict Transport Security (HSTS) Generator",
    "name": "HTTP Strict Transport Security (HSTS) Generator",
    "href": "/tools/hsts-header-generator/",
    "component": "src/pages/tools/hsts-header-generator.astro",
    "status": "implemented",
    "category": "Security",
    "categorySlug": "security",
    "mode": "generator",
    "description": "Generate HTTP Strict-Transport-Security headers and qualify for HSTS preload submission.",
    "seo": {
      "title": "HTTP Strict Transport Security (HSTS) Header Generator | Nadhebe",
      "description": "Generate HTTP Strict-Transport-Security headers for Nginx, Apache, Cloudflare, and Vercel. Enforce HTTPS connections and qualify for HSTS preload submission.",
      "keywords": [
        "hsts header generator",
        "strict-transport-security builder",
        "hsts preload list",
        "nginx hsts header",
        "https enforcement"
      ]
    },
    "relatedTools": [
      "csp-header-generator",
      "x-frame-options-generator",
      "cors-header-generator",
      "meta-tag-analyzer"
    ],
    "tags": [
      "security",
      "hsts-header-generator"
    ],
    "icon": "lock"
  },
  {
    "id": "sec-3",
    "slug": "x-frame-options-generator",
    "title": "X-Frame-Options Clickjacking Protection Generator",
    "name": "X-Frame-Options Clickjacking Protection Generator",
    "href": "/tools/x-frame-options-generator/",
    "component": "src/pages/tools/x-frame-options-generator.astro",
    "status": "implemented",
    "category": "Security",
    "categorySlug": "security",
    "mode": "generator",
    "description": "Generate X-Frame-Options DENY and SAMEORIGIN HTTP headers to prevent clickjacking.",
    "seo": {
      "title": "X-Frame-Options Clickjacking Protection Generator | Nadhebe",
      "description": "Generate X-Frame-Options HTTP headers to prevent iframe clickjacking attacks on Nginx, Apache, Cloudflare, and Vercel.",
      "keywords": [
        "x-frame-options generator",
        "clickjacking protection header",
        "deny iframe header",
        "sameorigin x-frame-options",
        "nginx clickjacking header"
      ]
    },
    "relatedTools": [
      "csp-header-generator",
      "hsts-header-generator",
      "cors-header-generator",
      "jwt-inspector"
    ],
    "tags": [
      "security",
      "x-frame-options-generator"
    ],
    "icon": "layout-grid"
  },
  {
    "id": "sec-4",
    "slug": "cors-header-generator",
    "title": "CORS Access-Control Header Generator",
    "name": "CORS Access-Control Header Generator",
    "href": "/tools/cors-header-generator/",
    "component": "src/pages/tools/cors-header-generator.astro",
    "status": "implemented",
    "category": "Security",
    "categorySlug": "security",
    "mode": "generator",
    "description": "Generate Access-Control-Allow-Origin, Methods, and Headers for API endpoints.",
    "seo": {
      "title": "CORS Access-Control Header Generator | Nadhebe",
      "description": "Generate Cross-Origin Resource Sharing (CORS) HTTP headers for API endpoints. Configure Access-Control-Allow-Origin, Methods, and Headers for Nginx and Express.",
      "keywords": [
        "cors header generator",
        "access-control-allow-origin builder",
        "express cors middleware",
        "nginx cors header",
        "cors preflight options"
      ]
    },
    "relatedTools": [
      "csp-header-generator",
      "hsts-header-generator",
      "x-frame-options-generator",
      "jwt-encoder"
    ],
    "tags": [
      "security",
      "cors-header-generator"
    ],
    "icon": "globe"
  },
  {
    "id": "dev-sec-1",
    "slug": "jwt-encoder",
    "title": "JWT Token Generator & Base64URL Encoder",
    "name": "JWT Token Generator & Base64URL Encoder",
    "href": "/tools/jwt-encoder/",
    "component": "src/pages/tools/jwt-encoder.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "generator",
    "description": "Generate and encode JSON Web Tokens (JWT) with HS256 HMAC signatures client-side.",
    "seo": {
      "title": "JWT Token Generator & Base64URL Encoder | Nadhebe",
      "description": "Generate and encode JSON Web Tokens (JWT) client-side. Configure HS256 header, custom payload claims (sub, iat, exp), secret key signing, and Base64URL strings.",
      "keywords": [
        "jwt encoder",
        "jwt token generator",
        "hs256 jwt signature",
        "base64url jwt encoder",
        "jwt payload builder"
      ]
    },
    "relatedTools": [
      "jwt-debugger",
      "jwt-inspector",
      "uuid-v7-generator",
      "uuid-generator"
    ],
    "tags": [
      "developer",
      "jwt-encoder"
    ],
    "icon": "key"
  },
  {
    "id": "dev-sec-2",
    "slug": "uuid-v7-generator",
    "title": "Time-Ordered UUID v7 Generator",
    "name": "Time-Ordered UUID v7 Generator",
    "href": "/tools/uuid-v7-generator/",
    "component": "src/pages/tools/uuid-v7-generator.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "generator",
    "description": "Generate time-ordered RFC 9562 UUID v7 primary keys for database B-Tree index optimization.",
    "seo": {
      "title": "Time-Ordered UUID v7 Generator | Nadhebe",
      "description": "Generate time-ordered UUID v7 identifiers in bulk. Optimized for database primary keys (PostgreSQL, MySQL, SQLite) to maximize B-Tree index performance.",
      "keywords": [
        "uuid v7 generator",
        "time ordered uuid",
        "rfc 9562 uuid v7",
        "database primary key uuid",
        "b-tree index uuid"
      ]
    },
    "relatedTools": [
      "uuid-generator",
      "jwt-encoder",
      "json-formatter"
    ],
    "tags": [
      "developer",
      "uuid-v7-generator"
    ],
    "icon": "clock"
  },
  {
    "id": "dev-conv-1",
    "slug": "sql-formatter",
    "title": "SQL Query Formatter & Prettifier",
    "name": "SQL Query Formatter & Prettifier",
    "href": "/tools/sql-formatter/",
    "component": "src/pages/tools/sql-formatter.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "formatter",
    "description": "Format and prettify SQL queries for PostgreSQL, MySQL, and BigQuery client-side.",
    "seo": {
      "title": "SQL Query Formatter & Prettifier | Nadhebe",
      "description": "Format and prettify SQL queries for PostgreSQL, MySQL, SQLite, and BigQuery. Uppercase keywords, align JOINs and WHERE clauses client-side.",
      "keywords": [
        "sql formatter",
        "sql query prettifier",
        "format postgresql query",
        "mysql sql formatter",
        "capitalize sql keywords"
      ]
    },
    "relatedTools": [
      "uuid-v7-generator",
      "json-formatter",
      "json-schema-validator",
      "csv-to-json"
    ],
    "tags": [
      "developer",
      "sql-formatter"
    ],
    "icon": "database"
  },
  {
    "id": "dev-conv-2",
    "slug": "html-to-markdown",
    "title": "HTML to Markdown Converter",
    "name": "HTML to Markdown Converter",
    "href": "/tools/html-to-markdown/",
    "component": "src/pages/tools/html-to-markdown.astro",
    "status": "implemented",
    "category": "Converters",
    "categorySlug": "converters",
    "mode": "converter",
    "description": "Convert HTML markup into clean GitHub Flavored Markdown (GFM) text.",
    "seo": {
      "title": "HTML to Markdown Converter | Nadhebe",
      "description": "Convert raw HTML markup into clean Markdown formatted text. Convert headings, lists, tables, code blocks, and links client-side.",
      "keywords": [
        "html to markdown",
        "convert html to md",
        "gfm markdown converter",
        "html table to markdown",
        "astro markdown import"
      ]
    },
    "relatedTools": [
      "markdown-to-html",
      "json-formatter",
      "sql-formatter",
      "json-to-xml"
    ],
    "tags": [
      "converters",
      "html-to-markdown"
    ],
    "icon": "file-text"
  },
  {
    "id": "dev-conv-3",
    "slug": "markdown-to-html",
    "title": "Markdown to HTML Converter",
    "name": "Markdown to HTML Converter",
    "href": "/tools/markdown-to-html/",
    "component": "src/pages/tools/markdown-to-html.astro",
    "status": "implemented",
    "category": "Converters",
    "categorySlug": "converters",
    "mode": "converter",
    "description": "Convert GitHub Flavored Markdown (GFM) text into clean HTML5 markup.",
    "seo": {
      "title": "Markdown to HTML Converter | Nadhebe",
      "description": "Convert GitHub Flavored Markdown (GFM) text into clean HTML markup. Render headers, lists, code blocks, blockquotes, and links client-side.",
      "keywords": [
        "markdown to html",
        "convert md to html",
        "gfm html compiler",
        "markdown parser javascript",
        "cms html generator"
      ]
    },
    "relatedTools": [
      "html-to-markdown",
      "json-formatter",
      "sql-formatter",
      "json-to-xml"
    ],
    "tags": [
      "converters",
      "markdown-to-html"
    ],
    "icon": "code"
  },
  {
    "id": "util-1",
    "slug": "qr-code-generator",
    "title": "HTML5 Canvas QR Code Generator",
    "name": "HTML5 Canvas QR Code Generator",
    "href": "/tools/qr-code-generator/",
    "component": "src/pages/tools/qr-code-generator.astro",
    "status": "implemented",
    "category": "Utility",
    "categorySlug": "utility",
    "mode": "generator",
    "description": "Generate high-resolution QR codes client-side with PNG download.",
    "seo": {
      "title": "HTML5 Canvas QR Code Generator | Nadhebe",
      "description": "Generate high-resolution QR codes directly in your browser. Custom colors, dimensions, and instant PNG download without server tracking.",
      "keywords": [
        "qr code generator",
        "html5 canvas qr code",
        "free qr code download",
        "custom color qr code",
        "browser qr generator"
      ]
    },
    "relatedTools": [
      "social-media-image-sizes",
      "aspect-ratio-calculator",
      "meta-tag-analyzer",
      "serp-preview"
    ],
    "tags": [
      "utility",
      "qr-code-generator"
    ],
    "icon": "qr-code"
  },
  {
    "id": "dev-repair-1",
    "slug": "json-repair",
    "title": "JSON Repair & Malformed Syntax Fixer",
    "name": "JSON Repair & Malformed Syntax Fixer",
    "href": "/tools/json-repair/",
    "component": "src/pages/tools/json-repair.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "formatter",
    "description": "Repair malformed JSON strings, single quotes, trailing commas, and unquoted keys.",
    "seo": {
      "title": "JSON Repair & Malformed Syntax Fixer | Nadhebe",
      "description": "Repair malformed JSON strings automatically client-side. Fix unquoted keys, trailing commas, single quotes, and missing brackets from LLM outputs.",
      "keywords": [
        "json repair",
        "fix malformed json",
        "llm json repair tool",
        "json syntax fixer",
        "trailing comma json fix"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "json-schema-validator",
      "json-path-finder",
      "json-to-typescript"
    ],
    "tags": [
      "developer",
      "json-repair"
    ],
    "icon": "wrench"
  },
  {
    "id": "dev-path-1",
    "slug": "json-path-finder",
    "title": "JSONPath Evaluator & Key Extractor",
    "name": "JSONPath Evaluator & Key Extractor",
    "href": "/tools/json-path-finder/",
    "component": "src/pages/tools/json-path-finder.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "analyzer",
    "description": "Evaluate JSONPath expressions against nested JSON payloads client-side.",
    "seo": {
      "title": "JSONPath Evaluator & Key Extractor | Nadhebe",
      "description": "Evaluate JSONPath expressions against nested JSON payloads. Extract object properties, filter arrays, and query nested JSON trees client-side.",
      "keywords": [
        "jsonpath evaluator",
        "json path tester",
        "query nested json",
        "extract json keys",
        "jsonpath online tool"
      ]
    },
    "relatedTools": [
      "json-repair",
      "json-formatter",
      "json-schema-validator",
      "json-to-typescript"
    ],
    "tags": [
      "developer",
      "json-path-finder"
    ],
    "icon": "search"
  },
  {
    "id": "dev-cron-1",
    "slug": "cron-explainer",
    "title": "Cron Expression Generator & Explainer",
    "name": "Cron Expression Generator & Explainer",
    "href": "/tools/cron-explainer/",
    "component": "src/pages/tools/cron-explainer.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "generator",
    "description": "Translate 5-part cron expressions into plain English and view next run schedules.",
    "seo": {
      "title": "Cron Expression Generator & Explainer | Nadhebe",
      "description": "Generate and translate 5-part cron expressions into plain English. View next execution timestamps for crontab schedules for Linux, Vercel, and AWS.",
      "keywords": [
        "cron expression generator",
        "crontab explainer",
        "cron to human readable",
        "linux cron schedule",
        "vercel cron schedule"
      ]
    },
    "relatedTools": [
      "sql-formatter",
      "uuid-v7-generator",
      "jwt-encoder",
      "json-path-finder"
    ],
    "tags": [
      "developer",
      "cron-explainer"
    ],
    "icon": "clock"
  },
  {
    "id": "dev-b64-1",
    "slug": "base64-encoder",
    "title": "Base64 Text & Data URL Encoder / Decoder",
    "name": "Base64 Text & Data URL Encoder / Decoder",
    "href": "/tools/base64-encoder/",
    "component": "src/pages/tools/base64-encoder.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "converter",
    "description": "Encode and decode text strings and binary file Data URLs to Base64 format.",
    "seo": {
      "title": "Base64 Text & File Data URL Encoder / Decoder | Nadhebe",
      "description": "Encode and decode text strings or binary files to Base64 and Data URL format client-side. Convert images and text payloads without server uploads.",
      "keywords": [
        "base64 encoder",
        "base64 decoder",
        "text to base64",
        "base64 data url generator",
        "utf8 base64 converter"
      ]
    },
    "relatedTools": [
      "jwt-encoder",
      "json-formatter",
      "case-converter",
      "slug-generator"
    ],
    "tags": [
      "developer",
      "base64-encoder"
    ],
    "icon": "binary"
  },
  {
    "id": "dev-case-1",
    "slug": "case-converter",
    "title": "String Case Converter (camelCase, snake_case)",
    "name": "String Case Converter (camelCase, snake_case)",
    "href": "/tools/case-converter/",
    "component": "src/pages/tools/case-converter.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "converter",
    "description": "Convert text strings to camelCase, snake_case, kebab-case, PascalCase, and CONSTANT_CASE.",
    "seo": {
      "title": "String Case Converter (camelCase, snake_case, kebab-case) | Nadhebe",
      "description": "Convert text strings into camelCase, snake_case, kebab-case, PascalCase, and CONSTANT_CASE client-side for software developers.",
      "keywords": [
        "case converter",
        "camelcase converter",
        "snake_case generator",
        "kebab-case converter",
        "pascalcase online"
      ]
    },
    "relatedTools": [
      "slug-generator",
      "base64-encoder",
      "sql-formatter",
      "json-formatter"
    ],
    "tags": [
      "developer",
      "case-converter"
    ],
    "icon": "type"
  },
  {
    "id": "dev-slug-1",
    "slug": "slug-generator",
    "title": "URL-Friendly Slug Generator",
    "name": "URL-Friendly Slug Generator",
    "href": "/tools/slug-generator/",
    "component": "src/pages/tools/slug-generator.astro",
    "status": "implemented",
    "category": "Utility",
    "categorySlug": "utility",
    "mode": "generator",
    "description": "Generate clean, URL-safe slugs for blog titles, products, and landing pages.",
    "seo": {
      "title": "URL-Friendly Slug Generator | Nadhebe",
      "description": "Generate clean, URL-safe slugs for blog posts, products, and landing pages. Strip accents, special characters, and uppercase letters client-side.",
      "keywords": [
        "slug generator",
        "url slug creator",
        "clean url generator",
        "seo url slug",
        "remove accents slug"
      ]
    },
    "relatedTools": [
      "case-converter",
      "meta-tag-analyzer",
      "serp-preview",
      "base64-encoder"
    ],
    "tags": [
      "utility",
      "slug-generator"
    ],
    "icon": "link"
  },
  {
    "id": "dev-xml-1",
    "slug": "xml-to-json",
    "title": "XML to JSON Converter",
    "name": "XML to JSON Converter",
    "href": "/tools/xml-to-json/",
    "component": "src/pages/tools/xml-to-json.astro",
    "status": "implemented",
    "category": "Converters",
    "categorySlug": "converters",
    "mode": "converter",
    "description": "Convert XML documents into clean, structured JSON objects client-side.",
    "seo": {
      "title": "XML to JSON Converter | Nadhebe",
      "description": "Convert XML documents into clean, structured JSON objects. Parse attributes, nested elements, and XML tags client-side with zero server uploads.",
      "keywords": [
        "xml to json",
        "convert xml to json",
        "xml parser online",
        "xml attribute json",
        "soap xml to json"
      ]
    },
    "relatedTools": [
      "json-to-xml",
      "json-formatter",
      "json-schema-validator",
      "html-to-markdown"
    ],
    "tags": [
      "converters",
      "xml-to-json"
    ],
    "icon": "file-code"
  },
  {
    "id": "ai-vram-1",
    "slug": "gpu-vram-calculator",
    "title": "LLM GPU VRAM Memory Requirement Calculator",
    "name": "LLM GPU VRAM Memory Requirement Calculator",
    "href": "/tools/gpu-vram-calculator/",
    "component": "src/pages/tools/gpu-vram-calculator.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "calculator",
    "description": "Calculate GPU VRAM memory requirements for running LLMs locally or in cloud deployments.",
    "seo": {
      "title": "LLM GPU VRAM Memory Requirement Calculator | Nadhebe",
      "description": "Calculate GPU VRAM memory requirements for running LLMs (Llama 3, DeepSeek, Mistral) locally or in cloud deployments (NVIDIA H100, A100, RTX 4090).",
      "keywords": [
        "gpu vram calculator",
        "llm vram requirement",
        "llama 3 vram calculator",
        "vllm memory requirement",
        "cuda oom calculator"
      ]
    },
    "relatedTools": [
      "llm-tokenizer",
      "rag-evaluator",
      "cosine-similarity-calculator"
    ],
    "tags": [
      "ai",
      "gpu-vram-calculator"
    ],
    "icon": "cpu"
  },
  {
    "id": "ai-cos-1",
    "slug": "cosine-similarity-calculator",
    "title": "Vector Embedding Cosine Similarity Calculator",
    "name": "Vector Embedding Cosine Similarity Calculator",
    "href": "/tools/cosine-similarity-calculator/",
    "component": "src/pages/tools/cosine-similarity-calculator.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "calculator",
    "description": "Calculate cosine similarity, dot product, and Euclidean distance between 2 vector embeddings.",
    "seo": {
      "title": "Vector Embedding Cosine Similarity Calculator | Nadhebe",
      "description": "Calculate cosine similarity, dot product, and Euclidean distance between 2 vector embeddings client-side. Test OpenAI text-embedding-3 and Voyage AI vectors.",
      "keywords": [
        "cosine similarity calculator",
        "vector embedding similarity",
        "dot product calculator",
        "rag vector similarity",
        "euclidean distance vectors"
      ]
    },
    "relatedTools": [
      "rag-evaluator",
      "gpu-vram-calculator",
      "llm-tokenizer",
      "prompt-optimizer"
    ],
    "tags": [
      "ai",
      "cosine-similarity-calculator"
    ],
    "icon": "activity"
  },
  {
    "id": "conv-j2c-1",
    "slug": "json-to-csv",
    "title": "JSON to CSV Converter",
    "name": "JSON to CSV Converter",
    "href": "/tools/json-to-csv/",
    "component": "src/pages/tools/json-to-csv.astro",
    "status": "implemented",
    "category": "Converters",
    "categorySlug": "converters",
    "mode": "converter",
    "description": "Convert JSON object arrays into clean CSV spreadsheets client-side.",
    "seo": {
      "title": "JSON to CSV Converter | Nadhebe",
      "description": "Convert JSON object arrays into clean CSV (Comma-Separated Values) spreadsheets client-side. Flatten nested objects and export table data.",
      "keywords": [
        "json to csv",
        "convert json to csv",
        "json array to excel csv",
        "json table converter",
        "export json csv"
      ]
    },
    "relatedTools": [
      "csv-to-json",
      "json-formatter",
      "json-repair",
      "xml-to-json"
    ],
    "tags": [
      "converters",
      "json-to-csv"
    ],
    "icon": "table"
  },
  {
    "id": "dev-yval-1",
    "slug": "yaml-validator",
    "title": "YAML Syntax Validator & Linter",
    "name": "YAML Syntax Validator & Linter",
    "href": "/tools/yaml-validator/",
    "component": "src/pages/tools/yaml-validator.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "analyzer",
    "description": "Validate YAML code syntax, lint space indentation, and detect unescaped strings.",
    "seo": {
      "title": "YAML Syntax Validator & Linter | Nadhebe",
      "description": "Validate YAML code syntax, lint space indentation, detect unescaped strings, and format Kubernetes and Docker Compose manifests client-side.",
      "keywords": [
        "yaml validator",
        "yaml linter",
        "validate yaml online",
        "kubernetes yaml validator",
        "docker compose yaml checker"
      ]
    },
    "relatedTools": [
      "xml-to-json",
      "json-schema-validator",
      "json-repair"
    ],
    "tags": [
      "developer",
      "yaml-validator"
    ],
    "icon": "check-circle"
  },
  {
    "id": "util-dd-1",
    "slug": "date-difference",
    "title": "Date Difference & Business Days Calculator",
    "name": "Date Difference & Business Days Calculator",
    "href": "/tools/date-difference/",
    "component": "src/pages/tools/date-difference.astro",
    "status": "implemented",
    "category": "Utility",
    "categorySlug": "utility",
    "mode": "calculator",
    "description": "Calculate calendar days, weeks, and working business days between two dates.",
    "seo": {
      "title": "Date Difference & Business Days Calculator | Nadhebe",
      "description": "Calculate the exact number of days, weeks, months, and working business days between two calendar dates client-side.",
      "keywords": [
        "date difference calculator",
        "business days calculator",
        "days between two dates",
        "work days calculator",
        "calendar duration online"
      ]
    },
    "relatedTools": [
      "cron-explainer",
      "slug-generator",
      "case-converter",
      "json-repair"
    ],
    "tags": [
      "utility",
      "date-difference"
    ],
    "icon": "calendar"
  },
  {
    "id": "fin-ci-1",
    "slug": "compound-interest",
    "title": "Compound Interest & Investment Growth Calculator",
    "name": "Compound Interest & Investment Growth Calculator",
    "href": "/tools/compound-interest/",
    "component": "src/pages/tools/compound-interest.astro",
    "status": "implemented",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "calculator",
    "description": "Calculate compound interest growth, annual compounding returns, and recurring monthly deposits.",
    "seo": {
      "title": "Compound Interest & Investment Growth Calculator | Nadhebe",
      "description": "Calculate compound interest growth, annual compounding returns, and recurring monthly contributions client-side for financial planning.",
      "keywords": [
        "compound interest calculator",
        "investment growth calculator",
        "monthly deposit compound",
        "future value calculator",
        "apy interest calculator"
      ]
    },
    "relatedTools": [
      "cac-payback",
      "profit-margin-calculator",
      "openai-cost-estimator",
      "date-difference"
    ],
    "tags": [
      "finance",
      "compound-interest"
    ],
    "icon": "trending-up"
  },
  {
    "id": "fin-cac-1",
    "slug": "cac-payback",
    "title": "SaaS CAC Payback Period & LTV Calculator",
    "name": "SaaS CAC Payback Period & LTV Calculator",
    "href": "/tools/cac-payback/",
    "component": "src/pages/tools/cac-payback.astro",
    "status": "implemented",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "calculator",
    "description": "Calculate SaaS Customer Acquisition Cost (CAC) payback period in months and LTV:CAC ratios.",
    "seo": {
      "title": "SaaS CAC Payback Period & LTV Calculator | Nadhebe",
      "description": "Calculate SaaS Customer Acquisition Cost (CAC) payback period in months, LTV to CAC ratio, and Gross Margin Adjusted payback client-side.",
      "keywords": [
        "cac payback calculator",
        "saas ltv cac ratio",
        "gross margin payback",
        "customer acquisition cost",
        "saas unit economics"
      ]
    },
    "relatedTools": [
      "compound-interest",
      "profit-margin-calculator",
      "claude-cost-estimator",
      "gemini-cost-estimator"
    ],
    "tags": [
      "finance",
      "cac-payback"
    ],
    "icon": "pie-chart"
  },
  {
    "id": "conv-delim-1",
    "slug": "delimiter-converter",
    "title": "CSV / TSV / Pipe Delimiter Converter",
    "name": "CSV / TSV / Pipe Delimiter Converter",
    "href": "/tools/delimiter-converter/",
    "component": "src/pages/tools/delimiter-converter.astro",
    "status": "implemented",
    "category": "Converters",
    "categorySlug": "converters",
    "mode": "converter",
    "description": "Convert tabular data between Comma (CSV), Tab (TSV), Pipe (|), and Semicolon (;) delimiters.",
    "seo": {
      "title": "CSV / TSV / Pipe Delimiter Converter | Nadhebe",
      "description": "Convert tabular data between Comma (CSV), Tab (TSV), Pipe (|), and Semicolon (;) delimiters client-side for database import.",
      "keywords": [
        "delimiter converter",
        "csv to tsv",
        "csv to pipe delimited",
        "convert tsv to csv",
        "semicolon csv converter"
      ]
    },
    "relatedTools": [
      "json-to-csv",
      "csv-to-json",
      "sql-formatter",
      "markdown-to-html"
    ],
    "tags": [
      "converters",
      "delimiter-converter"
    ],
    "icon": "columns"
  },
  {
    "id": "conv-ce-1",
    "slug": "column-extractor",
    "title": "CSV Column Extractor & Filter",
    "name": "CSV Column Extractor & Filter",
    "href": "/tools/column-extractor/",
    "component": "src/pages/tools/column-extractor.astro",
    "status": "implemented",
    "category": "Converters",
    "categorySlug": "converters",
    "mode": "converter",
    "description": "Extract specific columns from CSV datasets, reorder fields, and drop unwanted columns client-side.",
    "seo": {
      "title": "CSV Column Extractor & Filter | Nadhebe",
      "description": "Extract specific columns from CSV datasets, reorder table fields, and drop unwanted columns client-side without uploading spreadsheets.",
      "keywords": [
        "csv column extractor",
        "filter csv columns",
        "drop pii columns csv",
        "select csv columns online",
        "csv field isolator"
      ]
    },
    "relatedTools": [
      "delimiter-converter",
      "json-to-csv",
      "csv-to-excel",
      "excel-to-csv"
    ],
    "tags": [
      "converters",
      "column-extractor"
    ],
    "icon": "filter"
  },
  {
    "id": "seo-cls-1",
    "slug": "cls-checklist",
    "title": "Cumulative Layout Shift (CLS) Audit & Fix Checklist",
    "name": "Cumulative Layout Shift (CLS) Audit & Fix Checklist",
    "href": "/tools/cls-checklist/",
    "component": "src/pages/tools/cls-checklist.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "analyzer",
    "description": "Audit Web Vitals Cumulative Layout Shift (CLS) score and apply CSS width/height fixes.",
    "seo": {
      "title": "Cumulative Layout Shift (CLS) Audit & Fix Checklist | Nadhebe",
      "description": "Audit Web Vitals Cumulative Layout Shift (CLS) score, identify layout instability causes, and apply CSS width/height fixes for Google PageSpeed.",
      "keywords": [
        "cls checklist",
        "cumulative layout shift audit",
        "fix cls pagespeed",
        "core web vitals cls",
        "prevent layout shift css"
      ]
    },
    "relatedTools": [
      "serp-preview",
      "seo-checker",
      "meta-tag-analyzer",
      "canonical-checker"
    ],
    "tags": [
      "seo",
      "cls-checklist"
    ],
    "icon": "layout"
  },
  {
    "id": "conv-c2e-1",
    "slug": "csv-to-excel",
    "title": "CSV to Excel XLSX & TSV Converter",
    "name": "CSV to Excel XLSX & TSV Converter",
    "href": "/tools/csv-to-excel/",
    "component": "src/pages/tools/csv-to-excel.astro",
    "status": "implemented",
    "category": "Converters",
    "categorySlug": "converters",
    "mode": "converter",
    "description": "Convert CSV files into Excel-compatible TSV spreadsheets and export table files client-side.",
    "seo": {
      "title": "CSV to Excel XLSX & TSV Converter | Nadhebe",
      "description": "Convert CSV files into Excel-compatible TSV spreadsheets, format column data types, and export table files client-side.",
      "keywords": [
        "csv to excel",
        "csv to tsv excel",
        "convert csv for excel",
        "excel tsv paste",
        "csv leading zero excel"
      ]
    },
    "relatedTools": [
      "excel-to-csv",
      "json-to-csv",
      "column-extractor",
      "delimiter-converter"
    ],
    "tags": [
      "converters",
      "csv-to-excel"
    ],
    "icon": "file-spreadsheet"
  },
  {
    "id": "conv-e2c-1",
    "slug": "excel-to-csv",
    "title": "Excel to CSV Converter",
    "name": "Excel to CSV Converter",
    "href": "/tools/excel-to-csv/",
    "component": "src/pages/tools/excel-to-csv.astro",
    "status": "implemented",
    "category": "Converters",
    "categorySlug": "converters",
    "mode": "converter",
    "description": "Convert Excel TSV clipboard data and spreadsheets into clean, standardized CSV files client-side.",
    "seo": {
      "title": "Excel to CSV Converter | Nadhebe",
      "description": "Convert Excel TSV clipboard data and spreadsheets into clean, standardized CSV files client-side.",
      "keywords": [
        "excel to csv",
        "convert excel to csv",
        "tsv to csv converter",
        "sheets to csv online",
        "clean csv generator"
      ]
    },
    "relatedTools": [
      "csv-to-excel",
      "json-to-csv",
      "column-extractor",
      "delimiter-converter"
    ],
    "tags": [
      "converters",
      "excel-to-csv"
    ],
    "icon": "file-text"
  },
  {
    "id": "sec-evtx-1",
    "slug": "evtx-to-csv",
    "title": "Windows EVTX to CSV / TXT Converter & Log Viewer",
    "name": "Windows EVTX to CSV / TXT Converter & Log Viewer",
    "href": "/tools/evtx-to-csv/",
    "component": "src/pages/tools/evtx-to-csv.astro",
    "status": "implemented",
    "category": "Security",
    "categorySlug": "security",
    "mode": "converter",
    "description": "Parse Windows Event Log (.evtx, .xml, .txt) files client-side and export to CSV, TXT, or JSON.",
    "seo": {
      "title": "Windows EVTX to CSV / TXT Converter & Log Viewer | Nadhebe",
      "description": "Parse Windows Event Log (.evtx, .xml, .txt) files client-side. Inspect Event IDs (4624, 4625, 7045), filter log events, and export to CSV, TXT, or JSON.",
      "keywords": [
        "evtx to csv",
        "evtx log viewer",
        "convert evtx to txt",
        "windows event log parser online",
        "evtx to json converter"
      ]
    },
    "relatedTools": [
      "csp-header-generator",
      "jwt-encoder",
      "sql-formatter",
      "json-to-csv"
    ],
    "tags": [
      "security",
      "evtx-to-csv"
    ],
    "icon": "shield"
  },
  {
    "id": "img-s2p-1",
    "slug": "svg-to-png",
    "title": "SVG to PNG Converter & Vector Exporter",
    "name": "SVG to PNG Converter & Vector Exporter",
    "href": "/tools/svg-to-png/",
    "component": "src/pages/tools/svg-to-png.astro",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "converter",
    "description": "Convert SVG vector graphics and code into high-resolution PNG image files client-side.",
    "seo": {
      "title": "SVG to PNG Converter & Vector Exporter | Nadhebe",
      "description": "Convert SVG vector graphics and code into high-resolution PNG image files client-side. Set custom width, height, and background transparency.",
      "keywords": [
        "svg to png",
        "convert svg to png",
        "svg canvas renderer",
        "retina svg export",
        "transparent png converter"
      ]
    },
    "relatedTools": [
      "webp-to-png",
      "svg-to-jsx",
      "aspect-ratio-calculator",
      "dpi-print-size-calculator"
    ],
    "tags": [
      "image",
      "svg-to-png"
    ],
    "icon": "image"
  },
  {
    "id": "img-w2p-1",
    "slug": "webp-to-png",
    "title": "WebP to PNG Converter",
    "name": "WebP to PNG Converter",
    "href": "/tools/webp-to-png/",
    "component": "src/pages/tools/webp-to-png.astro",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "converter",
    "description": "Convert WebP images into lossless PNG files client-side preserving image transparency.",
    "seo": {
      "title": "WebP to PNG Converter | Nadhebe",
      "description": "Convert WebP images into lossless PNG files client-side. Preserve image transparency and download full-resolution PNG images.",
      "keywords": [
        "webp to png",
        "convert webp to png",
        "webp decoder online",
        "transparent webp converter",
        "lossless png generator"
      ]
    },
    "relatedTools": [
      "svg-to-png",
      "aspect-ratio-calculator",
      "dpi-print-size-calculator",
      "json-to-yaml"
    ],
    "tags": [
      "image",
      "webp-to-png"
    ],
    "icon": "image"
  },
  {
    "id": "conv-j2y-1",
    "slug": "json-to-yaml",
    "title": "JSON to YAML Converter & Config Builder",
    "name": "JSON to YAML Converter & Config Builder",
    "href": "/tools/json-to-yaml/",
    "component": "src/pages/tools/json-to-yaml.astro",
    "status": "implemented",
    "category": "Converters",
    "categorySlug": "converters",
    "mode": "converter",
    "description": "Convert JSON object structures into clean, 2-space indented YAML files client-side.",
    "seo": {
      "title": "JSON to YAML Converter & Config Builder | Nadhebe",
      "description": "Convert JSON object structures into clean, 2-space indented YAML files client-side. Generate Docker Compose and Kubernetes manifests.",
      "keywords": [
        "json to yaml",
        "convert json to yaml",
        "docker compose yaml generator",
        "json to kubernetes manifest",
        "yaml formatter online"
      ]
    },
    "relatedTools": [
      "yaml-to-json",
      "yaml-validator",
      "json-formatter",
      "json-repair"
    ],
    "tags": [
      "converters",
      "json-to-yaml"
    ],
    "icon": "file-code"
  },
  {
    "id": "img-p2w-1",
    "slug": "png-to-webp",
    "title": "PNG to WebP Converter & Image Compressor",
    "name": "PNG to WebP Converter & Image Compressor",
    "href": "/tools/png-to-webp/",
    "component": "src/pages/tools/png-to-webp.astro",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "converter",
    "description": "Convert PNG images into lightweight WebP format client-side with quality sliders.",
    "seo": {
      "title": "PNG to WebP Converter & Image Compressor | Nadhebe",
      "description": "Convert PNG images into lightweight WebP format client-side. Reduce image file size by up to 80% while preserving visual quality and transparency.",
      "keywords": [
        "png to webp",
        "convert png to webp",
        "compress png webp",
        "webp quality converter",
        "lcp webp optimization"
      ]
    },
    "relatedTools": [
      "webp-to-png",
      "svg-to-png",
      "aspect-ratio-calculator",
      "dpi-print-size-calculator"
    ],
    "tags": [
      "image",
      "png-to-webp"
    ],
    "icon": "image"
  },
  {
    "id": "dev-reg-1",
    "slug": "regex-tester",
    "title": "Regex Pattern Tester & Match Explainer",
    "name": "Regex Pattern Tester & Match Explainer",
    "href": "/tools/regex-tester/",
    "component": "src/pages/tools/regex-tester.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "tester",
    "description": "Test Regular Expressions (Regex) against text client-side with match highlighting and capture group tables.",
    "seo": {
      "title": "Regex Pattern Tester & Match Explainer | Nadhebe",
      "description": "Test Regular Expressions (Regex) against sample text client-side. Inspect pattern capture groups, flag toggles (g, i, m, s), and match highlighting.",
      "keywords": [
        "regex tester",
        "regular expression evaluator",
        "regex match highlighter",
        "capture group inspector",
        "regex online tester"
      ]
    },
    "relatedTools": [
      "case-converter",
      "slug-generator",
      "cron-explainer",
      "sql-formatter"
    ],
    "tags": [
      "developer",
      "regex-tester"
    ],
    "icon": "code"
  },
  {
    "id": "dev-mdt-1",
    "slug": "markdown-table-generator",
    "title": "Markdown Table Generator & Prettifier",
    "name": "Markdown Table Generator & Prettifier",
    "href": "/tools/markdown-table-generator/",
    "component": "src/pages/tools/markdown-table-generator.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "generator",
    "description": "Build, format, and align GitHub Flavored Markdown (GFM) tables client-side.",
    "seo": {
      "title": "Markdown Table Generator & Prettifier | Nadhebe",
      "description": "Build, format, and align GitHub Flavored Markdown (GFM) tables client-side. Set column alignments (Left, Center, Right) and export Markdown markup.",
      "keywords": [
        "markdown table generator",
        "gfm table builder",
        "github markdown table creator",
        "format markdown table",
        "markdown table alignment"
      ]
    },
    "relatedTools": [
      "html-to-markdown",
      "markdown-to-html",
      "sql-formatter",
      "json-to-csv"
    ],
    "tags": [
      "developer",
      "markdown-table-generator"
    ],
    "icon": "table"
  },
  {
    "id": "dev-b64i-1",
    "slug": "base64-image-converter",
    "title": "Base64 Image Converter & Data URL Encoder",
    "name": "Base64 Image Converter & Data URL Encoder",
    "href": "/tools/base64-image-converter/",
    "component": "src/pages/tools/base64-image-converter.astro",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "converter",
    "description": "Convert images into Base64 Data URL strings client-side for HTML/CSS embedding.",
    "seo": {
      "title": "Base64 Image Converter & Data URL Encoder | Nadhebe",
      "description": "Convert images (PNG, JPEG, WebP, SVG) into Base64 Data URL strings client-side. Inline images directly into CSS stylesheets or HTML `<img>` src tags.",
      "keywords": [
        "base64 image converter",
        "image to base64 data url",
        "css background base64 image",
        "inline image encoder",
        "base64 img src generator"
      ]
    },
    "relatedTools": [
      "base64-encoder",
      "webp-to-png",
      "svg-to-png",
      "png-to-webp"
    ],
    "tags": [
      "developer",
      "base64-image-converter"
    ],
    "icon": "image"
  },
  {
    "id": "design-flex-1",
    "slug": "css-flexbox-generator",
    "title": "CSS Flexbox Layout Generator & Visual Builder",
    "name": "CSS Flexbox Layout Generator & Visual Builder",
    "href": "/tools/css-flexbox-generator/",
    "component": "src/pages/tools/css-flexbox-generator.astro",
    "status": "implemented",
    "category": "Design",
    "categorySlug": "design",
    "mode": "generator",
    "description": "Build and preview CSS Flexbox layouts interactively with live alignment and gap controls.",
    "seo": {
      "title": "CSS Flexbox Layout Generator & Visual Builder | Nadhebe",
      "description": "Build and preview CSS Flexbox layouts interactively. Configure flex-direction, justify-content, align-items, flex-wrap, and export production CSS code.",
      "keywords": [
        "css flexbox generator",
        "flexbox visual builder",
        "css justify content align items",
        "flex layout maker",
        "responsive flexbox css"
      ]
    },
    "relatedTools": [
      "css-clamp-calculator",
      "color-contrast-checker",
      "px-to-rem",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "design",
      "css-flexbox-generator"
    ],
    "icon": "layout"
  },
  {
    "id": "design-grid-1",
    "slug": "css-grid-generator",
    "title": "CSS Grid Layout Generator & Visual Builder",
    "name": "CSS Grid Layout Generator & Visual Builder",
    "href": "/tools/css-grid-generator/",
    "component": "src/pages/tools/css-grid-generator.astro",
    "status": "implemented",
    "category": "Design",
    "categorySlug": "design",
    "mode": "generator",
    "description": "Build and preview 2D CSS Grid layouts interactively with track size and gap controls.",
    "seo": {
      "title": "CSS Grid Layout Generator & Visual Builder | Nadhebe",
      "description": "Build and preview 2D CSS Grid container layouts interactively. Configure grid-template-columns, grid-template-rows, gap, and export production CSS code.",
      "keywords": [
        "css grid generator",
        "css grid visual builder",
        "grid template columns maker",
        "responsive css grid",
        "2d grid layout"
      ]
    },
    "relatedTools": [
      "css-flexbox-generator",
      "css-clamp-calculator",
      "px-to-rem",
      "color-contrast-checker"
    ],
    "tags": [
      "design",
      "css-grid-generator"
    ],
    "icon": "grid"
  },
  {
    "id": "sec-hhi-1",
    "slug": "http-header-inspector",
    "title": "HTTP Request & Response Header Inspector",
    "name": "HTTP Request & Response Header Inspector",
    "href": "/tools/http-header-inspector/",
    "component": "src/pages/tools/http-header-inspector.astro",
    "status": "implemented",
    "category": "Security",
    "categorySlug": "security",
    "mode": "analyzer",
    "description": "Inspect, parse, and analyze HTTP request and response headers client-side with security header scoring.",
    "seo": {
      "title": "HTTP Request & Response Header Inspector | Nadhebe",
      "description": "Inspect, parse, and analyze HTTP request and response headers client-side. Evaluate security headers (CSP, HSTS, CORS, X-Frame-Options) and cache directives.",
      "keywords": [
        "http header inspector",
        "parse response headers",
        "http security header score",
        "csp hsts header checker",
        "cache control inspector"
      ]
    },
    "relatedTools": [
      "csp-header-generator",
      "hsts-header-generator",
      "cors-header-generator"
    ],
    "tags": [
      "security",
      "http-header-inspector"
    ],
    "icon": "list"
  }
];

export const IMPLEMENTED_TOOLS = UNIFIED_TOOLS_REGISTRY.filter((t) => t.status === 'implemented');
export const PLANNED_TOOLS: UnifiedTool[] = [];

export function getToolBySlug(slug: string): UnifiedTool | undefined {
  return UNIFIED_TOOLS_REGISTRY.find((tool) => tool.slug === slug);
}

export function getRelatedToolsForSlug(slug: string, count = 4): UnifiedTool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return IMPLEMENTED_TOOLS.slice(0, count);
  return UNIFIED_TOOLS_REGISTRY
    .filter((t) => t.slug !== slug && (t.category === tool.category || t.status === 'implemented'))
    .slice(0, count);
}
