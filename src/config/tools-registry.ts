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
  mode?: 'transform' | 'generator' | 'calculator' | 'analyzer';
  tags?: string[];
  icon?: string;
  badge?: 'Popular' | 'New';
  noApi?: boolean;
  faq?: { question: string; answer: string }[];
}

export const UNIFIED_TOOLS_REGISTRY: UnifiedTool[] = [
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
    "id": "developer-6",
    "slug": "developer-builder",
    "title": "Developer Builder",
    "name": "Developer Builder",
    "href": "/tools/developer-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Developer Builder locally in your browser.",
    "seo": {
      "title": "Developer Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Developer Builder locally in your browser.",
      "keywords": [
        "developer builder",
        "developer",
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
      "developer",
      "generator",
      "developer-builder"
    ],
    "icon": "code"
  },
  {
    "id": "developer-7",
    "slug": "developer-estimator",
    "title": "Developer Estimator",
    "name": "Developer Estimator",
    "href": "/tools/developer-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Developer Estimator locally in your browser.",
    "seo": {
      "title": "Developer Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Developer Estimator locally in your browser.",
      "keywords": [
        "developer estimator",
        "developer",
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
      "developer",
      "calculator",
      "developer-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "developer-8",
    "slug": "developer-checker",
    "title": "Developer Checker",
    "name": "Developer Checker",
    "href": "/tools/developer-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Developer Checker locally in your browser.",
    "seo": {
      "title": "Developer Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Developer Checker locally in your browser.",
      "keywords": [
        "developer checker",
        "developer",
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
      "developer",
      "analyzer",
      "developer-checker"
    ],
    "icon": "code"
  },
  {
    "id": "developer-9",
    "slug": "developer-cleaner",
    "title": "Developer Cleaner",
    "name": "Developer Cleaner",
    "href": "/tools/developer-cleaner/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Developer Cleaner locally in your browser.",
    "seo": {
      "title": "Developer Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Developer Cleaner locally in your browser.",
      "keywords": [
        "developer cleaner",
        "developer",
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
      "developer",
      "transform",
      "developer-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "developer-10",
    "slug": "developer-template-maker",
    "title": "Developer Template Maker",
    "name": "Developer Template Maker",
    "href": "/tools/developer-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Developer Template Maker locally in your browser.",
    "seo": {
      "title": "Developer Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Developer Template Maker locally in your browser.",
      "keywords": [
        "developer template maker",
        "developer",
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
      "developer",
      "generator",
      "developer-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "developer-11",
    "slug": "developer-planner",
    "title": "Developer Planner",
    "name": "Developer Planner",
    "href": "/tools/developer-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Developer Planner locally in your browser.",
    "seo": {
      "title": "Developer Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Developer Planner locally in your browser.",
      "keywords": [
        "developer planner",
        "developer",
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
      "developer",
      "calculator",
      "developer-planner"
    ],
    "icon": "code"
  },
  {
    "id": "developer-12",
    "slug": "developer-inspector",
    "title": "Developer Inspector",
    "name": "Developer Inspector",
    "href": "/tools/developer-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Developer Inspector locally in your browser.",
    "seo": {
      "title": "Developer Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Developer Inspector locally in your browser.",
      "keywords": [
        "developer inspector",
        "developer",
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
      "developer",
      "analyzer",
      "developer-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "developer-13",
    "slug": "developer-formatter",
    "title": "Developer Formatter",
    "name": "Developer Formatter",
    "href": "/tools/developer-formatter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Developer Formatter locally in your browser.",
    "seo": {
      "title": "Developer Formatter - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Developer Formatter locally in your browser.",
      "keywords": [
        "developer formatter",
        "developer",
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
      "developer",
      "transform",
      "developer-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "developer-14",
    "slug": "developer-generator",
    "title": "Developer Generator",
    "name": "Developer Generator",
    "href": "/tools/developer-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Developer Generator locally in your browser.",
    "seo": {
      "title": "Developer Generator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Developer Generator locally in your browser.",
      "keywords": [
        "developer generator",
        "developer",
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
      "developer",
      "generator",
      "developer-generator"
    ],
    "icon": "code"
  },
  {
    "id": "developer-15",
    "slug": "developer-calculator",
    "title": "Developer Calculator",
    "name": "Developer Calculator",
    "href": "/tools/developer-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Developer",
    "categorySlug": "developer",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Developer Calculator locally in your browser.",
    "seo": {
      "title": "Developer Calculator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Developer Calculator locally in your browser.",
      "keywords": [
        "developer calculator",
        "developer",
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
      "developer",
      "calculator",
      "developer-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "ai-1",
    "slug": "prompt-grader",
    "title": "Prompt grader",
    "name": "Prompt grader",
    "href": "/tools/prompt-grader/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "transform",
    "description": "Prompt grader. Use this privacy-first prompt grader directly in your browser.",
    "seo": {
      "title": "Prompt grader - Free Browser Tool | Nadhebe",
      "description": "Prompt grader. Use this privacy-first prompt grader directly in your browser.",
      "keywords": [
        "prompt grader",
        "ai",
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
      "ai",
      "transform",
      "prompt-grader"
    ],
    "icon": "code"
  },
  {
    "id": "ai-2",
    "slug": "llm-model-comparison-matrix",
    "title": "LLM Provider Arbitrage Matrix",
    "name": "LLM Model Arbitrage",
    "href": "/tools/llm-model-comparison-matrix/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "generator",
    "description": "Dynamically sort and compare LLMs by Intelligence per Dollar (MMLU) and Speed per Dollar (Tokens/sec).",
    "seo": {
      "title": "LLM Provider Arbitrage Matrix & Price Comparison | Nadhebe",
      "description": "Compare the cheapest and smartest LLM APIs. Sort by intelligence per dollar, context window, and inference speed.",
      "keywords": [
        "llm model comparison matrix",
        "cheapest llm api pricing table",
        "compare llm costs",
        "best llm api for production"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "ai",
      "generator",
      "llm-model-comparison-matrix"
    ],
    "icon": "code"
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
    "id": "ai-4",
    "slug": "ai-api-pricing-calculator",
    "title": "AI API Cost & ROI Simulator",
    "name": "AI API Cost Simulator",
    "href": "/tools/ai-api-pricing-calculator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "analyzer",
    "description": "Estimate LLM API monthly costs with our multi-agent workflow simulator. Project monthly server bills and break-even points.",
    "seo": {
      "title": "AI API Cost & ROI Simulator | Nadhebe",
      "description": "Calculate advanced LLM API costs for multi-agent workflows. Compare GPT-4o, Claude 3.5, and Gemini pricing for production deployments.",
      "keywords": [
        "ai api pricing calculator",
        "estimate llm api monthly costs",
        "llm cost simulator",
        "gpt-4 api cost calculator",
        "claude api pricing estimator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "ai",
      "analyzer",
      "ai-api-pricing-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "ai-5",
    "slug": "system-prompt-linter-best-practices",
    "title": "System Prompt Linter & Guardrail Checker",
    "name": "System Prompt Linter",
    "href": "/tools/system-prompt-linter-best-practices/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "transform",
    "description": "Analyze prompts against strict engineering rubrics to flag injection vulnerabilities and weak constraints.",
    "seo": {
      "title": "System Prompt Linter & Best Practices Checker | Nadhebe",
      "description": "Grade and lint your LLM system prompts. Check for security vulnerabilities, XML tag pairing, and weak formatting directives.",
      "keywords": [
        "system prompt linter best practices",
        "evaluate system prompt security",
        "llm prompt guardrail checker"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "ai",
      "transform",
      "system-prompt-linter-best-practices"
    ],
    "icon": "code"
  },
  {
    "id": "ai-6",
    "slug": "ai-builder",
    "title": "AI Builder",
    "name": "AI Builder",
    "href": "/tools/ai-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "generator",
    "description": "Clean, normalize, and calculate AI Builder locally in your browser.",
    "seo": {
      "title": "AI Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate AI Builder locally in your browser.",
      "keywords": [
        "ai builder",
        "ai",
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
      "ai",
      "generator",
      "ai-builder"
    ],
    "icon": "code"
  },
  {
    "id": "ai-7",
    "slug": "ai-estimator",
    "title": "AI Estimator",
    "name": "AI Estimator",
    "href": "/tools/ai-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate AI Estimator locally in your browser.",
    "seo": {
      "title": "AI Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate AI Estimator locally in your browser.",
      "keywords": [
        "ai estimator",
        "ai",
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
      "ai",
      "calculator",
      "ai-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "ai-8",
    "slug": "ai-checker",
    "title": "AI Checker",
    "name": "AI Checker",
    "href": "/tools/ai-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate AI Checker locally in your browser.",
    "seo": {
      "title": "AI Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate AI Checker locally in your browser.",
      "keywords": [
        "ai checker",
        "ai",
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
      "ai",
      "analyzer",
      "ai-checker"
    ],
    "icon": "code"
  },
  {
    "id": "ai-9",
    "slug": "ai-cleaner",
    "title": "AI Cleaner",
    "name": "AI Cleaner",
    "href": "/tools/ai-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "transform",
    "description": "Clean, normalize, and calculate AI Cleaner locally in your browser.",
    "seo": {
      "title": "AI Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate AI Cleaner locally in your browser.",
      "keywords": [
        "ai cleaner",
        "ai",
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
      "ai",
      "transform",
      "ai-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "ai-10",
    "slug": "ai-template-maker",
    "title": "AI Template Maker",
    "name": "AI Template Maker",
    "href": "/tools/ai-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "generator",
    "description": "Clean, normalize, and calculate AI Template Maker locally in your browser.",
    "seo": {
      "title": "AI Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate AI Template Maker locally in your browser.",
      "keywords": [
        "ai template maker",
        "ai",
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
      "ai",
      "generator",
      "ai-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "ai-11",
    "slug": "ai-planner",
    "title": "AI Planner",
    "name": "AI Planner",
    "href": "/tools/ai-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate AI Planner locally in your browser.",
    "seo": {
      "title": "AI Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate AI Planner locally in your browser.",
      "keywords": [
        "ai planner",
        "ai",
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
      "ai",
      "calculator",
      "ai-planner"
    ],
    "icon": "code"
  },
  {
    "id": "ai-12",
    "slug": "ai-inspector",
    "title": "AI Inspector",
    "name": "AI Inspector",
    "href": "/tools/ai-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate AI Inspector locally in your browser.",
    "seo": {
      "title": "AI Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate AI Inspector locally in your browser.",
      "keywords": [
        "ai inspector",
        "ai",
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
      "ai",
      "analyzer",
      "ai-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "ai-13",
    "slug": "ai-formatter",
    "title": "AI Formatter",
    "name": "AI Formatter",
    "href": "/tools/ai-formatter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "transform",
    "description": "Clean, normalize, and calculate AI Formatter locally in your browser.",
    "seo": {
      "title": "AI Formatter - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate AI Formatter locally in your browser.",
      "keywords": [
        "ai formatter",
        "ai",
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
      "ai",
      "transform",
      "ai-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "ai-14",
    "slug": "ai-generator",
    "title": "AI Generator",
    "name": "AI Generator",
    "href": "/tools/ai-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "generator",
    "description": "Clean, normalize, and calculate AI Generator locally in your browser.",
    "seo": {
      "title": "AI Generator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate AI Generator locally in your browser.",
      "keywords": [
        "ai generator",
        "ai",
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
      "ai",
      "generator",
      "ai-generator"
    ],
    "icon": "code"
  },
  {
    "id": "ai-15",
    "slug": "ai-calculator",
    "title": "AI Calculator",
    "name": "AI Calculator",
    "href": "/tools/ai-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate AI Calculator locally in your browser.",
    "seo": {
      "title": "AI Calculator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate AI Calculator locally in your browser.",
      "keywords": [
        "ai calculator",
        "ai",
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
      "ai",
      "calculator",
      "ai-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "image-1",
    "slug": "image-compressor",
    "title": "Image compressor",
    "name": "Image compressor",
    "href": "/tools/image-compressor/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Image compressor. Use this privacy-first image compressor directly in your browser.",
    "seo": {
      "title": "Image compressor - Free Browser Tool | Nadhebe",
      "description": "Image compressor. Use this privacy-first image compressor directly in your browser.",
      "keywords": [
        "image compressor",
        "image",
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
      "image",
      "transform",
      "image-compressor"
    ],
    "icon": "code"
  },
  {
    "id": "image-2",
    "slug": "exif-remover",
    "title": "EXIF remover",
    "name": "EXIF remover",
    "href": "/tools/exif-remover/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "generator",
    "description": "EXIF remover. Use this privacy-first exif remover directly in your browser.",
    "seo": {
      "title": "EXIF remover - Free Browser Tool | Nadhebe",
      "description": "EXIF remover. Use this privacy-first exif remover directly in your browser.",
      "keywords": [
        "exif remover",
        "image",
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
      "image",
      "generator",
      "exif-remover"
    ],
    "icon": "code"
  },
  {
    "id": "image-3",
    "slug": "webp-converter",
    "title": "WebP converter",
    "name": "WebP converter",
    "href": "/tools/webp-converter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "calculator",
    "description": "WebP converter. Use this privacy-first webp converter directly in your browser.",
    "seo": {
      "title": "WebP converter - Free Browser Tool | Nadhebe",
      "description": "WebP converter. Use this privacy-first webp converter directly in your browser.",
      "keywords": [
        "webp converter",
        "image",
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
      "image",
      "calculator",
      "webp-converter"
    ],
    "icon": "code"
  },
  {
    "id": "image-4",
    "slug": "favicon-generator",
    "title": "Favicon generator",
    "name": "Favicon generator",
    "href": "/tools/favicon-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "analyzer",
    "description": "Favicon generator. Use this privacy-first favicon generator directly in your browser.",
    "seo": {
      "title": "Favicon generator - Free Browser Tool | Nadhebe",
      "description": "Favicon generator. Use this privacy-first favicon generator directly in your browser.",
      "keywords": [
        "favicon generator",
        "image",
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
      "image",
      "analyzer",
      "favicon-generator"
    ],
    "icon": "code"
  },
  {
    "id": "image-5",
    "slug": "background-remover",
    "title": "Background remover",
    "name": "Background remover",
    "href": "/tools/background-remover/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Background remover. Use this privacy-first background remover directly in your browser.",
    "seo": {
      "title": "Background remover - Free Browser Tool | Nadhebe",
      "description": "Background remover. Use this privacy-first background remover directly in your browser.",
      "keywords": [
        "background remover",
        "image",
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
      "image",
      "transform",
      "background-remover"
    ],
    "icon": "code"
  },
  {
    "id": "image-6",
    "slug": "image-builder",
    "title": "Image Builder",
    "name": "Image Builder",
    "href": "/tools/image-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Image Builder locally in your browser.",
    "seo": {
      "title": "Image Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Image Builder locally in your browser.",
      "keywords": [
        "image builder",
        "image",
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
      "image",
      "generator",
      "image-builder"
    ],
    "icon": "code"
  },
  {
    "id": "image-7",
    "slug": "image-estimator",
    "title": "Image Estimator",
    "name": "Image Estimator",
    "href": "/tools/image-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Image Estimator locally in your browser.",
    "seo": {
      "title": "Image Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Image Estimator locally in your browser.",
      "keywords": [
        "image estimator",
        "image",
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
      "image",
      "calculator",
      "image-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "image-8",
    "slug": "image-checker",
    "title": "Image Checker",
    "name": "Image Checker",
    "href": "/tools/image-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Image Checker locally in your browser.",
    "seo": {
      "title": "Image Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Image Checker locally in your browser.",
      "keywords": [
        "image checker",
        "image",
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
      "image",
      "analyzer",
      "image-checker"
    ],
    "icon": "code"
  },
  {
    "id": "image-9",
    "slug": "image-cleaner",
    "title": "Image Cleaner",
    "name": "Image Cleaner",
    "href": "/tools/image-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Image Cleaner locally in your browser.",
    "seo": {
      "title": "Image Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Image Cleaner locally in your browser.",
      "keywords": [
        "image cleaner",
        "image",
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
      "image",
      "transform",
      "image-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "image-10",
    "slug": "image-template-maker",
    "title": "Image Template Maker",
    "name": "Image Template Maker",
    "href": "/tools/image-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Image Template Maker locally in your browser.",
    "seo": {
      "title": "Image Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Image Template Maker locally in your browser.",
      "keywords": [
        "image template maker",
        "image",
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
      "image",
      "generator",
      "image-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "image-11",
    "slug": "image-planner",
    "title": "Image Planner",
    "name": "Image Planner",
    "href": "/tools/image-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Image Planner locally in your browser.",
    "seo": {
      "title": "Image Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Image Planner locally in your browser.",
      "keywords": [
        "image planner",
        "image",
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
      "image",
      "calculator",
      "image-planner"
    ],
    "icon": "code"
  },
  {
    "id": "image-12",
    "slug": "image-inspector",
    "title": "Image Inspector",
    "name": "Image Inspector",
    "href": "/tools/image-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Image Inspector locally in your browser.",
    "seo": {
      "title": "Image Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Image Inspector locally in your browser.",
      "keywords": [
        "image inspector",
        "image",
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
      "image",
      "analyzer",
      "image-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "image-13",
    "slug": "image-formatter",
    "title": "Image Formatter",
    "name": "Image Formatter",
    "href": "/tools/image-formatter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Image",
    "categorySlug": "image",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Image Formatter locally in your browser.",
    "seo": {
      "title": "Image Formatter - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Image Formatter locally in your browser.",
      "keywords": [
        "image formatter",
        "image",
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
      "image",
      "transform",
      "image-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "video-1",
    "slug": "bitrate-calculator",
    "title": "Bitrate calculator",
    "name": "Bitrate calculator",
    "href": "/tools/bitrate-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "transform",
    "description": "Bitrate calculator. Use this privacy-first bitrate calculator directly in your browser.",
    "seo": {
      "title": "Bitrate calculator - Free Browser Tool | Nadhebe",
      "description": "Bitrate calculator. Use this privacy-first bitrate calculator directly in your browser.",
      "keywords": [
        "bitrate calculator",
        "video",
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
      "video",
      "transform",
      "bitrate-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "video-2",
    "slug": "thumbnail-checker",
    "title": "Thumbnail checker",
    "name": "Thumbnail checker",
    "href": "/tools/thumbnail-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "generator",
    "description": "Thumbnail checker. Use this privacy-first thumbnail checker directly in your browser.",
    "seo": {
      "title": "Thumbnail checker - Free Browser Tool | Nadhebe",
      "description": "Thumbnail checker. Use this privacy-first thumbnail checker directly in your browser.",
      "keywords": [
        "thumbnail checker",
        "video",
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
      "video",
      "generator",
      "thumbnail-checker"
    ],
    "icon": "code"
  },
  {
    "id": "video-3",
    "slug": "shorts-crop-planner",
    "title": "Shorts crop planner",
    "name": "Shorts crop planner",
    "href": "/tools/shorts-crop-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "calculator",
    "description": "Shorts crop planner. Use this privacy-first shorts crop planner directly in your browser.",
    "seo": {
      "title": "Shorts crop planner - Free Browser Tool | Nadhebe",
      "description": "Shorts crop planner. Use this privacy-first shorts crop planner directly in your browser.",
      "keywords": [
        "shorts crop planner",
        "video",
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
      "video",
      "calculator",
      "shorts-crop-planner"
    ],
    "icon": "code"
  },
  {
    "id": "video-4",
    "slug": "frame-extractor",
    "title": "Frame extractor",
    "name": "Frame extractor",
    "href": "/tools/frame-extractor/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "analyzer",
    "description": "Frame extractor. Use this privacy-first frame extractor directly in your browser.",
    "seo": {
      "title": "Frame extractor - Free Browser Tool | Nadhebe",
      "description": "Frame extractor. Use this privacy-first frame extractor directly in your browser.",
      "keywords": [
        "frame extractor",
        "video",
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
      "video",
      "analyzer",
      "frame-extractor"
    ],
    "icon": "code"
  },
  {
    "id": "video-5",
    "slug": "subtitle-converter",
    "title": "Subtitle converter",
    "name": "Subtitle converter",
    "href": "/tools/subtitle-converter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "transform",
    "description": "Subtitle converter. Use this privacy-first subtitle converter directly in your browser.",
    "seo": {
      "title": "Subtitle converter - Free Browser Tool | Nadhebe",
      "description": "Subtitle converter. Use this privacy-first subtitle converter directly in your browser.",
      "keywords": [
        "subtitle converter",
        "video",
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
      "video",
      "transform",
      "subtitle-converter"
    ],
    "icon": "code"
  },
  {
    "id": "video-6",
    "slug": "video-builder",
    "title": "Video Builder",
    "name": "Video Builder",
    "href": "/tools/video-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Video Builder locally in your browser.",
    "seo": {
      "title": "Video Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Video Builder locally in your browser.",
      "keywords": [
        "video builder",
        "video",
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
      "video",
      "generator",
      "video-builder"
    ],
    "icon": "code"
  },
  {
    "id": "video-7",
    "slug": "video-estimator",
    "title": "Video Estimator",
    "name": "Video Estimator",
    "href": "/tools/video-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Video Estimator locally in your browser.",
    "seo": {
      "title": "Video Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Video Estimator locally in your browser.",
      "keywords": [
        "video estimator",
        "video",
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
      "video",
      "calculator",
      "video-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "video-8",
    "slug": "video-checker",
    "title": "Video Checker",
    "name": "Video Checker",
    "href": "/tools/video-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Video Checker locally in your browser.",
    "seo": {
      "title": "Video Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Video Checker locally in your browser.",
      "keywords": [
        "video checker",
        "video",
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
      "video",
      "analyzer",
      "video-checker"
    ],
    "icon": "code"
  },
  {
    "id": "video-9",
    "slug": "video-cleaner",
    "title": "Video Cleaner",
    "name": "Video Cleaner",
    "href": "/tools/video-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Video Cleaner locally in your browser.",
    "seo": {
      "title": "Video Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Video Cleaner locally in your browser.",
      "keywords": [
        "video cleaner",
        "video",
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
      "video",
      "transform",
      "video-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "video-10",
    "slug": "video-template-maker",
    "title": "Video Template Maker",
    "name": "Video Template Maker",
    "href": "/tools/video-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Video Template Maker locally in your browser.",
    "seo": {
      "title": "Video Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Video Template Maker locally in your browser.",
      "keywords": [
        "video template maker",
        "video",
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
      "video",
      "generator",
      "video-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "video-11",
    "slug": "video-planner",
    "title": "Video Planner",
    "name": "Video Planner",
    "href": "/tools/video-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Video Planner locally in your browser.",
    "seo": {
      "title": "Video Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Video Planner locally in your browser.",
      "keywords": [
        "video planner",
        "video",
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
      "video",
      "calculator",
      "video-planner"
    ],
    "icon": "code"
  },
  {
    "id": "video-12",
    "slug": "video-inspector",
    "title": "Video Inspector",
    "name": "Video Inspector",
    "href": "/tools/video-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Video",
    "categorySlug": "video",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Video Inspector locally in your browser.",
    "seo": {
      "title": "Video Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Video Inspector locally in your browser.",
      "keywords": [
        "video inspector",
        "video",
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
      "video",
      "analyzer",
      "video-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "audio-1",
    "slug": "lufs-calculator",
    "title": "LUFS calculator",
    "name": "LUFS calculator",
    "href": "/tools/lufs-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "transform",
    "description": "LUFS calculator. Use this privacy-first lufs calculator directly in your browser.",
    "seo": {
      "title": "LUFS calculator - Free Browser Tool | Nadhebe",
      "description": "LUFS calculator. Use this privacy-first lufs calculator directly in your browser.",
      "keywords": [
        "lufs calculator",
        "audio",
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
      "audio",
      "transform",
      "lufs-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "audio-2",
    "slug": "bpm-tapper",
    "title": "BPM tapper",
    "name": "BPM tapper",
    "href": "/tools/bpm-tapper/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "generator",
    "description": "BPM tapper. Use this privacy-first bpm tapper directly in your browser.",
    "seo": {
      "title": "BPM tapper - Free Browser Tool | Nadhebe",
      "description": "BPM tapper. Use this privacy-first bpm tapper directly in your browser.",
      "keywords": [
        "bpm tapper",
        "audio",
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
      "audio",
      "generator",
      "bpm-tapper"
    ],
    "icon": "code"
  },
  {
    "id": "audio-3",
    "slug": "waveform-preview",
    "title": "Waveform preview",
    "name": "Waveform preview",
    "href": "/tools/waveform-preview/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "calculator",
    "description": "Waveform preview. Use this privacy-first waveform preview directly in your browser.",
    "seo": {
      "title": "Waveform preview - Free Browser Tool | Nadhebe",
      "description": "Waveform preview. Use this privacy-first waveform preview directly in your browser.",
      "keywords": [
        "waveform preview",
        "audio",
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
      "audio",
      "calculator",
      "waveform-preview"
    ],
    "icon": "code"
  },
  {
    "id": "audio-4",
    "slug": "audio-trimmer",
    "title": "Audio trimmer",
    "name": "Audio trimmer",
    "href": "/tools/audio-trimmer/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "analyzer",
    "description": "Audio trimmer. Use this privacy-first audio trimmer directly in your browser.",
    "seo": {
      "title": "Audio trimmer - Free Browser Tool | Nadhebe",
      "description": "Audio trimmer. Use this privacy-first audio trimmer directly in your browser.",
      "keywords": [
        "audio trimmer",
        "audio",
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
      "audio",
      "analyzer",
      "audio-trimmer"
    ],
    "icon": "code"
  },
  {
    "id": "audio-5",
    "slug": "podcast-chapter-formatter",
    "title": "Podcast chapter formatter",
    "name": "Podcast chapter formatter",
    "href": "/tools/podcast-chapter-formatter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "transform",
    "description": "Podcast chapter formatter. Use this privacy-first podcast chapter formatter directly in your browser.",
    "seo": {
      "title": "Podcast chapter formatter - Free Browser Tool | Nadhebe",
      "description": "Podcast chapter formatter. Use this privacy-first podcast chapter formatter directly in your browser.",
      "keywords": [
        "podcast chapter formatter",
        "audio",
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
      "audio",
      "transform",
      "podcast-chapter-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "audio-6",
    "slug": "audio-builder",
    "title": "Audio Builder",
    "name": "Audio Builder",
    "href": "/tools/audio-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Audio Builder locally in your browser.",
    "seo": {
      "title": "Audio Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Audio Builder locally in your browser.",
      "keywords": [
        "audio builder",
        "audio",
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
      "audio",
      "generator",
      "audio-builder"
    ],
    "icon": "code"
  },
  {
    "id": "audio-7",
    "slug": "audio-estimator",
    "title": "Audio Estimator",
    "name": "Audio Estimator",
    "href": "/tools/audio-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Audio Estimator locally in your browser.",
    "seo": {
      "title": "Audio Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Audio Estimator locally in your browser.",
      "keywords": [
        "audio estimator",
        "audio",
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
      "audio",
      "calculator",
      "audio-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "audio-8",
    "slug": "audio-checker",
    "title": "Audio Checker",
    "name": "Audio Checker",
    "href": "/tools/audio-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Audio Checker locally in your browser.",
    "seo": {
      "title": "Audio Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Audio Checker locally in your browser.",
      "keywords": [
        "audio checker",
        "audio",
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
      "audio",
      "analyzer",
      "audio-checker"
    ],
    "icon": "code"
  },
  {
    "id": "audio-9",
    "slug": "audio-cleaner",
    "title": "Audio Cleaner",
    "name": "Audio Cleaner",
    "href": "/tools/audio-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Audio Cleaner locally in your browser.",
    "seo": {
      "title": "Audio Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Audio Cleaner locally in your browser.",
      "keywords": [
        "audio cleaner",
        "audio",
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
      "audio",
      "transform",
      "audio-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "audio-10",
    "slug": "audio-template-maker",
    "title": "Audio Template Maker",
    "name": "Audio Template Maker",
    "href": "/tools/audio-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Audio Template Maker locally in your browser.",
    "seo": {
      "title": "Audio Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Audio Template Maker locally in your browser.",
      "keywords": [
        "audio template maker",
        "audio",
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
      "audio",
      "generator",
      "audio-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "audio-11",
    "slug": "audio-planner",
    "title": "Audio Planner",
    "name": "Audio Planner",
    "href": "/tools/audio-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Audio Planner locally in your browser.",
    "seo": {
      "title": "Audio Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Audio Planner locally in your browser.",
      "keywords": [
        "audio planner",
        "audio",
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
      "audio",
      "calculator",
      "audio-planner"
    ],
    "icon": "code"
  },
  {
    "id": "audio-12",
    "slug": "audio-inspector",
    "title": "Audio Inspector",
    "name": "Audio Inspector",
    "href": "/tools/audio-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Audio",
    "categorySlug": "audio",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Audio Inspector locally in your browser.",
    "seo": {
      "title": "Audio Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Audio Inspector locally in your browser.",
      "keywords": [
        "audio inspector",
        "audio",
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
      "audio",
      "analyzer",
      "audio-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-1",
    "slug": "pdf-merge",
    "title": "PDF merge",
    "name": "PDF merge",
    "href": "/tools/pdf-merge/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "transform",
    "description": "PDF merge. Use this privacy-first pdf merge directly in your browser.",
    "seo": {
      "title": "PDF merge - Free Browser Tool | Nadhebe",
      "description": "PDF merge. Use this privacy-first pdf merge directly in your browser.",
      "keywords": [
        "pdf merge",
        "pdf",
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
      "pdf",
      "transform",
      "pdf-merge"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-2",
    "slug": "pdf-split",
    "title": "PDF split",
    "name": "PDF split",
    "href": "/tools/pdf-split/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "generator",
    "description": "PDF split. Use this privacy-first pdf split directly in your browser.",
    "seo": {
      "title": "PDF split - Free Browser Tool | Nadhebe",
      "description": "PDF split. Use this privacy-first pdf split directly in your browser.",
      "keywords": [
        "pdf split",
        "pdf",
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
      "pdf",
      "generator",
      "pdf-split"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-3",
    "slug": "page-counter",
    "title": "Page counter",
    "name": "Page counter",
    "href": "/tools/page-counter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "calculator",
    "description": "Page counter. Use this privacy-first page counter directly in your browser.",
    "seo": {
      "title": "Page counter - Free Browser Tool | Nadhebe",
      "description": "Page counter. Use this privacy-first page counter directly in your browser.",
      "keywords": [
        "page counter",
        "pdf",
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
      "pdf",
      "calculator",
      "page-counter"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-4",
    "slug": "metadata-remover",
    "title": "Metadata remover",
    "name": "Metadata remover",
    "href": "/tools/metadata-remover/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "analyzer",
    "description": "Metadata remover. Use this privacy-first metadata remover directly in your browser.",
    "seo": {
      "title": "Metadata remover - Free Browser Tool | Nadhebe",
      "description": "Metadata remover. Use this privacy-first metadata remover directly in your browser.",
      "keywords": [
        "metadata remover",
        "pdf",
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
      "pdf",
      "analyzer",
      "metadata-remover"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-5",
    "slug": "pdf-to-images",
    "title": "PDF to images",
    "name": "PDF to images",
    "href": "/tools/pdf-to-images/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "transform",
    "description": "PDF to images. Use this privacy-first pdf to images directly in your browser.",
    "seo": {
      "title": "PDF to images - Free Browser Tool | Nadhebe",
      "description": "PDF to images. Use this privacy-first pdf to images directly in your browser.",
      "keywords": [
        "pdf to images",
        "pdf",
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
      "pdf",
      "transform",
      "pdf-to-images"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-6",
    "slug": "pdf-builder",
    "title": "PDF Builder",
    "name": "PDF Builder",
    "href": "/tools/pdf-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "generator",
    "description": "Clean, normalize, and calculate PDF Builder locally in your browser.",
    "seo": {
      "title": "PDF Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate PDF Builder locally in your browser.",
      "keywords": [
        "pdf builder",
        "pdf",
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
      "pdf",
      "generator",
      "pdf-builder"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-7",
    "slug": "pdf-estimator",
    "title": "PDF Estimator",
    "name": "PDF Estimator",
    "href": "/tools/pdf-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate PDF Estimator locally in your browser.",
    "seo": {
      "title": "PDF Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate PDF Estimator locally in your browser.",
      "keywords": [
        "pdf estimator",
        "pdf",
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
      "pdf",
      "calculator",
      "pdf-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-8",
    "slug": "pdf-checker",
    "title": "PDF Checker",
    "name": "PDF Checker",
    "href": "/tools/pdf-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate PDF Checker locally in your browser.",
    "seo": {
      "title": "PDF Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate PDF Checker locally in your browser.",
      "keywords": [
        "pdf checker",
        "pdf",
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
      "pdf",
      "analyzer",
      "pdf-checker"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-9",
    "slug": "pdf-cleaner",
    "title": "PDF Cleaner",
    "name": "PDF Cleaner",
    "href": "/tools/pdf-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "transform",
    "description": "Clean, normalize, and calculate PDF Cleaner locally in your browser.",
    "seo": {
      "title": "PDF Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate PDF Cleaner locally in your browser.",
      "keywords": [
        "pdf cleaner",
        "pdf",
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
      "pdf",
      "transform",
      "pdf-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-10",
    "slug": "pdf-template-maker",
    "title": "PDF Template Maker",
    "name": "PDF Template Maker",
    "href": "/tools/pdf-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "generator",
    "description": "Clean, normalize, and calculate PDF Template Maker locally in your browser.",
    "seo": {
      "title": "PDF Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate PDF Template Maker locally in your browser.",
      "keywords": [
        "pdf template maker",
        "pdf",
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
      "pdf",
      "generator",
      "pdf-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-11",
    "slug": "pdf-planner",
    "title": "PDF Planner",
    "name": "PDF Planner",
    "href": "/tools/pdf-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate PDF Planner locally in your browser.",
    "seo": {
      "title": "PDF Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate PDF Planner locally in your browser.",
      "keywords": [
        "pdf planner",
        "pdf",
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
      "pdf",
      "calculator",
      "pdf-planner"
    ],
    "icon": "code"
  },
  {
    "id": "pdf-12",
    "slug": "pdf-inspector",
    "title": "PDF Inspector",
    "name": "PDF Inspector",
    "href": "/tools/pdf-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "PDF",
    "categorySlug": "pdf",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate PDF Inspector locally in your browser.",
    "seo": {
      "title": "PDF Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate PDF Inspector locally in your browser.",
      "keywords": [
        "pdf inspector",
        "pdf",
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
      "pdf",
      "analyzer",
      "pdf-inspector"
    ],
    "icon": "code"
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
    "id": "text-6",
    "slug": "text-builder",
    "title": "Text Builder",
    "name": "Text Builder",
    "href": "/tools/text-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Text",
    "categorySlug": "text",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Text Builder locally in your browser.",
    "seo": {
      "title": "Text Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Text Builder locally in your browser.",
      "keywords": [
        "text builder",
        "text",
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
      "text",
      "generator",
      "text-builder"
    ],
    "icon": "code"
  },
  {
    "id": "text-7",
    "slug": "text-estimator",
    "title": "Text Estimator",
    "name": "Text Estimator",
    "href": "/tools/text-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Text",
    "categorySlug": "text",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Text Estimator locally in your browser.",
    "seo": {
      "title": "Text Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Text Estimator locally in your browser.",
      "keywords": [
        "text estimator",
        "text",
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
      "text",
      "calculator",
      "text-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "text-8",
    "slug": "text-checker",
    "title": "Text Checker",
    "name": "Text Checker",
    "href": "/tools/text-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Text",
    "categorySlug": "text",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Text Checker locally in your browser.",
    "seo": {
      "title": "Text Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Text Checker locally in your browser.",
      "keywords": [
        "text checker",
        "text",
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
      "text",
      "analyzer",
      "text-checker"
    ],
    "icon": "code"
  },
  {
    "id": "text-9",
    "slug": "text-cleaner",
    "title": "Text Cleaner",
    "name": "Text Cleaner",
    "href": "/tools/text-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Text",
    "categorySlug": "text",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Text Cleaner locally in your browser.",
    "seo": {
      "title": "Text Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Text Cleaner locally in your browser.",
      "keywords": [
        "text cleaner",
        "text",
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
      "text",
      "transform",
      "text-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "text-10",
    "slug": "text-template-maker",
    "title": "Text Template Maker",
    "name": "Text Template Maker",
    "href": "/tools/text-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Text",
    "categorySlug": "text",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Text Template Maker locally in your browser.",
    "seo": {
      "title": "Text Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Text Template Maker locally in your browser.",
      "keywords": [
        "text template maker",
        "text",
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
      "text",
      "generator",
      "text-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "text-11",
    "slug": "text-planner",
    "title": "Text Planner",
    "name": "Text Planner",
    "href": "/tools/text-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Text",
    "categorySlug": "text",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Text Planner locally in your browser.",
    "seo": {
      "title": "Text Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Text Planner locally in your browser.",
      "keywords": [
        "text planner",
        "text",
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
      "text",
      "calculator",
      "text-planner"
    ],
    "icon": "code"
  },
  {
    "id": "text-12",
    "slug": "text-inspector",
    "title": "Text Inspector",
    "name": "Text Inspector",
    "href": "/tools/text-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Text",
    "categorySlug": "text",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Text Inspector locally in your browser.",
    "seo": {
      "title": "Text Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Text Inspector locally in your browser.",
      "keywords": [
        "text inspector",
        "text",
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
      "text",
      "analyzer",
      "text-inspector"
    ],
    "icon": "code"
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
    "id": "seo-6",
    "slug": "seo-builder",
    "title": "SEO Builder",
    "name": "SEO Builder",
    "href": "/tools/seo-builder/",
    "component": "src/pages/tools/seo-builder.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "generator",
    "description": "Build SEO content outlines, heading structures, and article frameworks.",
    "seo": {
      "title": "SEO Content Outline & Heading Structure Builder | Nadhebe",
      "description": "Build SEO-optimized article outlines, map H1-H3 heading hierarchies, incorporate LSI keywords, and design high-ranking content structures.",
      "keywords": [
        "seo builder",
        "seo outline generator",
        "heading structure maker",
        "content outline builder",
        "article framework"
      ]
    },
    "relatedTools": [
      "seo-planner",
      "seo-checker",
      "serp-preview",
      "opportunity-radar"
    ],
    "tags": [
      "seo",
      "seo-builder"
    ],
    "icon": "list-tree"
  },
  {
    "id": "seo-7",
    "slug": "seo-estimator",
    "title": "SEO Estimator",
    "name": "SEO Estimator",
    "href": "/tools/seo-estimator/",
    "component": "src/pages/tools/seo-estimator.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "calculator",
    "description": "Estimate organic search traffic from search volume and SERP CTR curves.",
    "seo": {
      "title": "Organic Traffic & SERP CTR Estimator | Nadhebe",
      "description": "Estimate monthly organic search traffic based on target keyword search volume, expected ranking position (#1 to #10), and Industry CTR curves.",
      "keywords": [
        "seo traffic estimator",
        "organic search calculator",
        "serp ctr curve model",
        "keyword traffic calculator",
        "search traffic roi"
      ]
    },
    "relatedTools": [
      "serp-preview",
      "opportunity-radar",
      "seo-planner",
      "seo-checker"
    ],
    "tags": [
      "seo",
      "seo-estimator"
    ],
    "icon": "trending-up"
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
      "seo-inspector",
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
    "id": "seo-9",
    "slug": "seo-cleaner",
    "title": "SEO Cleaner",
    "name": "SEO Cleaner",
    "href": "/tools/seo-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "transform",
    "description": "Clean, normalize, and calculate SEO Cleaner locally in your browser.",
    "seo": {
      "title": "SEO Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate SEO Cleaner locally in your browser.",
      "keywords": [
        "seo cleaner",
        "seo",
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
      "seo",
      "transform",
      "seo-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "seo-10",
    "slug": "seo-template-maker",
    "title": "SEO Template Maker",
    "name": "SEO Template Maker",
    "href": "/tools/seo-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "generator",
    "description": "Clean, normalize, and calculate SEO Template Maker locally in your browser.",
    "seo": {
      "title": "SEO Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate SEO Template Maker locally in your browser.",
      "keywords": [
        "seo template maker",
        "seo",
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
      "seo",
      "generator",
      "seo-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "seo-11",
    "slug": "seo-planner",
    "title": "SEO Planner",
    "name": "SEO Planner",
    "href": "/tools/seo-planner/",
    "component": "src/pages/tools/seo-planner.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "calculator",
    "description": "Plan topical content clusters, map pillar pages, and design internal linking.",
    "seo": {
      "title": "Topical SEO Cluster & Content Roadmap Planner | Nadhebe",
      "description": "Plan topical authority clusters, map pillar pages and subtopic articles, design contextual internal linking structures, and build SEO editorial calendars.",
      "keywords": [
        "seo planner",
        "topical authority cluster",
        "content cluster mapper",
        "pillar page planner",
        "internal link strategy"
      ]
    },
    "relatedTools": [
      "opportunity-radar",
      "seo-builder",
      "seo-estimator",
      "serp-preview"
    ],
    "tags": [
      "seo",
      "seo-planner"
    ],
    "icon": "git-pull-request"
  },
  {
    "id": "seo-12",
    "slug": "seo-inspector",
    "title": "SEO Inspector",
    "name": "SEO Inspector",
    "href": "/tools/seo-inspector/",
    "component": "src/pages/tools/seo-inspector.astro",
    "status": "implemented",
    "category": "SEO",
    "categorySlug": "seo",
    "mode": "analyzer",
    "description": "Inspect live page metadata, OpenGraph tags, Twitter cards, and JSON-LD.",
    "seo": {
      "title": "Page Metadata & OpenGraph SEO Inspector | Nadhebe",
      "description": "Inspect live meta tags, OpenGraph social cards, Twitter previews, canonical links, robots directives, and JSON-LD structured data.",
      "keywords": [
        "seo inspector",
        "metadata inspector",
        "opengraph social card audit",
        "twitter card validator",
        "page head inspector"
      ]
    },
    "relatedTools": [
      "meta-tag-analyzer",
      "seo-checker",
      "schema-validator",
      "serp-preview"
    ],
    "tags": [
      "seo",
      "seo-inspector"
    ],
    "icon": "eye"
  },
  {
    "id": "marketing-1",
    "slug": "utm-builder",
    "title": "UTM builder",
    "name": "UTM builder",
    "href": "/tools/utm-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "transform",
    "description": "UTM builder. Use this privacy-first utm builder directly in your browser.",
    "seo": {
      "title": "UTM builder - Free Browser Tool | Nadhebe",
      "description": "UTM builder. Use this privacy-first utm builder directly in your browser.",
      "keywords": [
        "utm builder",
        "marketing",
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
      "marketing",
      "transform",
      "utm-builder"
    ],
    "icon": "code"
  },
  {
    "id": "marketing-2",
    "slug": "roas-calculator",
    "title": "ROAS calculator",
    "name": "ROAS calculator",
    "href": "/tools/roas-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "generator",
    "description": "ROAS calculator. Use this privacy-first roas calculator directly in your browser.",
    "seo": {
      "title": "ROAS calculator - Free Browser Tool | Nadhebe",
      "description": "ROAS calculator. Use this privacy-first roas calculator directly in your browser.",
      "keywords": [
        "roas calculator",
        "marketing",
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
      "marketing",
      "generator",
      "roas-calculator"
    ],
    "icon": "code"
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
    "id": "marketing-4",
    "slug": "headline-variants",
    "title": "Headline variants",
    "name": "Headline variants",
    "href": "/tools/headline-variants/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "analyzer",
    "description": "Headline variants. Use this privacy-first headline variants directly in your browser.",
    "seo": {
      "title": "Headline variants - Free Browser Tool | Nadhebe",
      "description": "Headline variants. Use this privacy-first headline variants directly in your browser.",
      "keywords": [
        "headline variants",
        "marketing",
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
      "marketing",
      "analyzer",
      "headline-variants"
    ],
    "icon": "code"
  },
  {
    "id": "marketing-5",
    "slug": "campaign-url-qa",
    "title": "Campaign URL QA",
    "name": "Campaign URL QA",
    "href": "/tools/campaign-url-qa/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "transform",
    "description": "Campaign URL QA. Use this privacy-first campaign url qa directly in your browser.",
    "seo": {
      "title": "Campaign URL QA - Free Browser Tool | Nadhebe",
      "description": "Campaign URL QA. Use this privacy-first campaign url qa directly in your browser.",
      "keywords": [
        "campaign url qa",
        "marketing",
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
      "marketing",
      "transform",
      "campaign-url-qa"
    ],
    "icon": "code"
  },
  {
    "id": "marketing-6",
    "slug": "marketing-builder",
    "title": "Marketing Builder",
    "name": "Marketing Builder",
    "href": "/tools/marketing-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Marketing Builder locally in your browser.",
    "seo": {
      "title": "Marketing Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Marketing Builder locally in your browser.",
      "keywords": [
        "marketing builder",
        "marketing",
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
      "marketing",
      "generator",
      "marketing-builder"
    ],
    "icon": "code"
  },
  {
    "id": "marketing-7",
    "slug": "marketing-estimator",
    "title": "Marketing Estimator",
    "name": "Marketing Estimator",
    "href": "/tools/marketing-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Marketing Estimator locally in your browser.",
    "seo": {
      "title": "Marketing Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Marketing Estimator locally in your browser.",
      "keywords": [
        "marketing estimator",
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
      "marketing-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "marketing-8",
    "slug": "marketing-checker",
    "title": "Marketing Checker",
    "name": "Marketing Checker",
    "href": "/tools/marketing-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Marketing Checker locally in your browser.",
    "seo": {
      "title": "Marketing Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Marketing Checker locally in your browser.",
      "keywords": [
        "marketing checker",
        "marketing",
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
      "marketing",
      "analyzer",
      "marketing-checker"
    ],
    "icon": "code"
  },
  {
    "id": "marketing-9",
    "slug": "marketing-cleaner",
    "title": "Marketing Cleaner",
    "name": "Marketing Cleaner",
    "href": "/tools/marketing-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Marketing Cleaner locally in your browser.",
    "seo": {
      "title": "Marketing Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Marketing Cleaner locally in your browser.",
      "keywords": [
        "marketing cleaner",
        "marketing",
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
      "marketing",
      "transform",
      "marketing-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "marketing-10",
    "slug": "marketing-template-maker",
    "title": "Marketing Template Maker",
    "name": "Marketing Template Maker",
    "href": "/tools/marketing-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Marketing Template Maker locally in your browser.",
    "seo": {
      "title": "Marketing Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Marketing Template Maker locally in your browser.",
      "keywords": [
        "marketing template maker",
        "marketing",
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
      "marketing",
      "generator",
      "marketing-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "marketing-11",
    "slug": "marketing-planner",
    "title": "Marketing Planner",
    "name": "Marketing Planner",
    "href": "/tools/marketing-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Marketing Planner locally in your browser.",
    "seo": {
      "title": "Marketing Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Marketing Planner locally in your browser.",
      "keywords": [
        "marketing planner",
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
      "marketing-planner"
    ],
    "icon": "code"
  },
  {
    "id": "marketing-12",
    "slug": "marketing-inspector",
    "title": "Marketing Inspector",
    "name": "Marketing Inspector",
    "href": "/tools/marketing-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Marketing",
    "categorySlug": "marketing",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Marketing Inspector locally in your browser.",
    "seo": {
      "title": "Marketing Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Marketing Inspector locally in your browser.",
      "keywords": [
        "marketing inspector",
        "marketing",
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
      "marketing",
      "analyzer",
      "marketing-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "youtube-1",
    "slug": "title-length-checker",
    "title": "Title length checker",
    "name": "Title length checker",
    "href": "/tools/title-length-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "transform",
    "description": "Title length checker. Use this privacy-first title length checker directly in your browser.",
    "seo": {
      "title": "Title length checker - Free Browser Tool | Nadhebe",
      "description": "Title length checker. Use this privacy-first title length checker directly in your browser.",
      "keywords": [
        "title length checker",
        "youtube",
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
      "youtube",
      "transform",
      "title-length-checker"
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
    "id": "youtube-3",
    "slug": "thumbnail-safe-area",
    "title": "Thumbnail safe area",
    "name": "Thumbnail safe area",
    "href": "/tools/thumbnail-safe-area/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "calculator",
    "description": "Thumbnail safe area. Use this privacy-first thumbnail safe area directly in your browser.",
    "seo": {
      "title": "Thumbnail safe area - Free Browser Tool | Nadhebe",
      "description": "Thumbnail safe area. Use this privacy-first thumbnail safe area directly in your browser.",
      "keywords": [
        "thumbnail safe area",
        "youtube",
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
      "youtube",
      "calculator",
      "thumbnail-safe-area"
    ],
    "icon": "code"
  },
  {
    "id": "youtube-4",
    "slug": "description-template",
    "title": "Description template",
    "name": "Description template",
    "href": "/tools/description-template/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "analyzer",
    "description": "Description template. Use this privacy-first description template directly in your browser.",
    "seo": {
      "title": "Description template - Free Browser Tool | Nadhebe",
      "description": "Description template. Use this privacy-first description template directly in your browser.",
      "keywords": [
        "description template",
        "youtube",
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
      "youtube",
      "analyzer",
      "description-template"
    ],
    "icon": "code"
  },
  {
    "id": "youtube-5",
    "slug": "tag-extractor",
    "title": "Tag extractor",
    "name": "Tag extractor",
    "href": "/tools/tag-extractor/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "transform",
    "description": "Tag extractor. Use this privacy-first tag extractor directly in your browser.",
    "seo": {
      "title": "Tag extractor - Free Browser Tool | Nadhebe",
      "description": "Tag extractor. Use this privacy-first tag extractor directly in your browser.",
      "keywords": [
        "tag extractor",
        "youtube",
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
      "youtube",
      "transform",
      "tag-extractor"
    ],
    "icon": "code"
  },
  {
    "id": "youtube-6",
    "slug": "youtube-builder",
    "title": "YouTube Builder",
    "name": "YouTube Builder",
    "href": "/tools/youtube-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "generator",
    "description": "Clean, normalize, and calculate YouTube Builder locally in your browser.",
    "seo": {
      "title": "YouTube Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate YouTube Builder locally in your browser.",
      "keywords": [
        "youtube builder",
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
      "youtube-builder"
    ],
    "icon": "code"
  },
  {
    "id": "youtube-7",
    "slug": "youtube-estimator",
    "title": "YouTube Estimator",
    "name": "YouTube Estimator",
    "href": "/tools/youtube-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate YouTube Estimator locally in your browser.",
    "seo": {
      "title": "YouTube Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate YouTube Estimator locally in your browser.",
      "keywords": [
        "youtube estimator",
        "youtube",
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
      "youtube",
      "calculator",
      "youtube-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "youtube-8",
    "slug": "youtube-checker",
    "title": "YouTube Checker",
    "name": "YouTube Checker",
    "href": "/tools/youtube-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate YouTube Checker locally in your browser.",
    "seo": {
      "title": "YouTube Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate YouTube Checker locally in your browser.",
      "keywords": [
        "youtube checker",
        "youtube",
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
      "youtube",
      "analyzer",
      "youtube-checker"
    ],
    "icon": "code"
  },
  {
    "id": "youtube-9",
    "slug": "youtube-cleaner",
    "title": "YouTube Cleaner",
    "name": "YouTube Cleaner",
    "href": "/tools/youtube-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "transform",
    "description": "Clean, normalize, and calculate YouTube Cleaner locally in your browser.",
    "seo": {
      "title": "YouTube Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate YouTube Cleaner locally in your browser.",
      "keywords": [
        "youtube cleaner",
        "youtube",
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
      "youtube",
      "transform",
      "youtube-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "youtube-10",
    "slug": "youtube-template-maker",
    "title": "YouTube Template Maker",
    "name": "YouTube Template Maker",
    "href": "/tools/youtube-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "generator",
    "description": "Clean, normalize, and calculate YouTube Template Maker locally in your browser.",
    "seo": {
      "title": "YouTube Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate YouTube Template Maker locally in your browser.",
      "keywords": [
        "youtube template maker",
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
      "youtube-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "youtube-11",
    "slug": "youtube-planner",
    "title": "YouTube Planner",
    "name": "YouTube Planner",
    "href": "/tools/youtube-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate YouTube Planner locally in your browser.",
    "seo": {
      "title": "YouTube Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate YouTube Planner locally in your browser.",
      "keywords": [
        "youtube planner",
        "youtube",
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
      "youtube",
      "calculator",
      "youtube-planner"
    ],
    "icon": "code"
  },
  {
    "id": "youtube-12",
    "slug": "youtube-inspector",
    "title": "YouTube Inspector",
    "name": "YouTube Inspector",
    "href": "/tools/youtube-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "YouTube",
    "categorySlug": "youtube",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate YouTube Inspector locally in your browser.",
    "seo": {
      "title": "YouTube Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate YouTube Inspector locally in your browser.",
      "keywords": [
        "youtube inspector",
        "youtube",
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
      "youtube",
      "analyzer",
      "youtube-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "social-media-1",
    "slug": "linkedin-post-preview",
    "title": "LinkedIn post preview",
    "name": "LinkedIn post preview",
    "href": "/tools/linkedin-post-preview/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "transform",
    "description": "LinkedIn post preview. Use this privacy-first linkedin post preview directly in your browser.",
    "seo": {
      "title": "LinkedIn post preview - Free Browser Tool | Nadhebe",
      "description": "LinkedIn post preview. Use this privacy-first linkedin post preview directly in your browser.",
      "keywords": [
        "linkedin post preview",
        "social media",
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
      "social media",
      "transform",
      "linkedin-post-preview"
    ],
    "icon": "code"
  },
  {
    "id": "social-media-2",
    "slug": "hashtag-counter",
    "title": "Hashtag counter",
    "name": "Hashtag counter",
    "href": "/tools/hashtag-counter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "generator",
    "description": "Hashtag counter. Use this privacy-first hashtag counter directly in your browser.",
    "seo": {
      "title": "Hashtag counter - Free Browser Tool | Nadhebe",
      "description": "Hashtag counter. Use this privacy-first hashtag counter directly in your browser.",
      "keywords": [
        "hashtag counter",
        "social media",
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
      "social media",
      "generator",
      "hashtag-counter"
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
    "id": "social-media-4",
    "slug": "carousel-size-helper",
    "title": "Carousel size helper",
    "name": "Carousel size helper",
    "href": "/tools/carousel-size-helper/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "analyzer",
    "description": "Carousel size helper. Use this privacy-first carousel size helper directly in your browser.",
    "seo": {
      "title": "Carousel size helper - Free Browser Tool | Nadhebe",
      "description": "Carousel size helper. Use this privacy-first carousel size helper directly in your browser.",
      "keywords": [
        "carousel size helper",
        "social media",
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
      "social media",
      "analyzer",
      "carousel-size-helper"
    ],
    "icon": "code"
  },
  {
    "id": "social-media-5",
    "slug": "x-card-preview",
    "title": "X card preview",
    "name": "X card preview",
    "href": "/tools/x-card-preview/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "transform",
    "description": "X card preview. Use this privacy-first x card preview directly in your browser.",
    "seo": {
      "title": "X card preview - Free Browser Tool | Nadhebe",
      "description": "X card preview. Use this privacy-first x card preview directly in your browser.",
      "keywords": [
        "x card preview",
        "social media",
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
      "social media",
      "transform",
      "x-card-preview"
    ],
    "icon": "code"
  },
  {
    "id": "social-media-6",
    "slug": "social-media-builder",
    "title": "Social Media Builder",
    "name": "Social Media Builder",
    "href": "/tools/social-media-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Social Media Builder locally in your browser.",
    "seo": {
      "title": "Social Media Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Social Media Builder locally in your browser.",
      "keywords": [
        "social media builder",
        "social media",
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
      "social media",
      "generator",
      "social-media-builder"
    ],
    "icon": "code"
  },
  {
    "id": "social-media-7",
    "slug": "social-media-estimator",
    "title": "Social Media Estimator",
    "name": "Social Media Estimator",
    "href": "/tools/social-media-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Social Media Estimator locally in your browser.",
    "seo": {
      "title": "Social Media Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Social Media Estimator locally in your browser.",
      "keywords": [
        "social media estimator",
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
      "social-media-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "social-media-8",
    "slug": "social-media-checker",
    "title": "Social Media Checker",
    "name": "Social Media Checker",
    "href": "/tools/social-media-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Social Media Checker locally in your browser.",
    "seo": {
      "title": "Social Media Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Social Media Checker locally in your browser.",
      "keywords": [
        "social media checker",
        "social media",
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
      "social media",
      "analyzer",
      "social-media-checker"
    ],
    "icon": "code"
  },
  {
    "id": "social-media-9",
    "slug": "social-media-cleaner",
    "title": "Social Media Cleaner",
    "name": "Social Media Cleaner",
    "href": "/tools/social-media-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Social Media Cleaner locally in your browser.",
    "seo": {
      "title": "Social Media Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Social Media Cleaner locally in your browser.",
      "keywords": [
        "social media cleaner",
        "social media",
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
      "social media",
      "transform",
      "social-media-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "social-media-10",
    "slug": "social-media-template-maker",
    "title": "Social Media Template Maker",
    "name": "Social Media Template Maker",
    "href": "/tools/social-media-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Social Media Template Maker locally in your browser.",
    "seo": {
      "title": "Social Media Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Social Media Template Maker locally in your browser.",
      "keywords": [
        "social media template maker",
        "social media",
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
      "social media",
      "generator",
      "social-media-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "social-media-11",
    "slug": "social-media-planner",
    "title": "Social Media Planner",
    "name": "Social Media Planner",
    "href": "/tools/social-media-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Social Media Planner locally in your browser.",
    "seo": {
      "title": "Social Media Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Social Media Planner locally in your browser.",
      "keywords": [
        "social media planner",
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
      "social-media-planner"
    ],
    "icon": "code"
  },
  {
    "id": "social-media-12",
    "slug": "social-media-inspector",
    "title": "Social Media Inspector",
    "name": "Social Media Inspector",
    "href": "/tools/social-media-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Social Media",
    "categorySlug": "social-media",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Social Media Inspector locally in your browser.",
    "seo": {
      "title": "Social Media Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Social Media Inspector locally in your browser.",
      "keywords": [
        "social media inspector",
        "social media",
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
      "social media",
      "analyzer",
      "social-media-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "prompt-engineering-1",
    "slug": "prompt-template-variable-tester",
    "title": "Dynamic Prompt Template Builder",
    "name": "Prompt Template Builder",
    "href": "/tools/prompt-template-variable-tester/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "transform",
    "description": "Visually highlight {{variables}} and inject test data to preview compiled prompts instantly.",
    "seo": {
      "title": "Prompt Template Variable Tester | Nadhebe",
      "description": "Build complex prompts with Handlebars/Jinja syntax. Inject test variables to preview the final compiled prompt output.",
      "keywords": [
        "prompt template variable tester",
        "jinja handlebars prompt tester",
        "dynamic prompt compiler online"
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
      "transform",
      "prompt-template-variable-tester"
    ],
    "icon": "code"
  },
  {
    "id": "prompt-engineering-2",
    "slug": "prompt-variable-checker",
    "title": "Prompt variable checker",
    "name": "Prompt variable checker",
    "href": "/tools/prompt-variable-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "generator",
    "description": "Prompt variable checker. Use this privacy-first prompt variable checker directly in your browser.",
    "seo": {
      "title": "Prompt variable checker - Free Browser Tool | Nadhebe",
      "description": "Prompt variable checker. Use this privacy-first prompt variable checker directly in your browser.",
      "keywords": [
        "prompt variable checker",
        "prompt engineering",
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
      "prompt engineering",
      "generator",
      "prompt-variable-checker"
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
    "id": "prompt-engineering-4",
    "slug": "ai-persona-prompt-generator",
    "title": "Expert Persona Generator",
    "name": "Persona Prompt Generator",
    "href": "/tools/ai-persona-prompt-generator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "analyzer",
    "description": "A step-by-step wizard to generate robust, production-ready system persona prompts with constraints and formatting.",
    "seo": {
      "title": "AI Persona & Role Prompt Generator | Nadhebe",
      "description": "Generate massive, production-ready system prompts by defining persona depth, audience, constraints, and tone.",
      "keywords": [
        "ai persona prompt generator",
        "create expert ai system prompt",
        "role prompting tool"
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
      "analyzer",
      "ai-persona-prompt-generator"
    ],
    "icon": "code"
  },
  {
    "id": "prompt-engineering-5",
    "slug": "few-shot-prompt-formatter",
    "title": "Few-Shot Dataset Formatter",
    "name": "Few-Shot Formatter",
    "href": "/tools/few-shot-prompt-formatter/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "transform",
    "description": "Convert CSV/JSON tables into perfectly formatted User/Assistant dialogue trees or XML examples.",
    "seo": {
      "title": "Few-Shot Prompt Formatter from CSV | Nadhebe",
      "description": "Easily build few-shot prompting examples by converting CSV or JSON arrays into structured dialogue trees or XML blocks.",
      "keywords": [
        "few shot prompt formatter",
        "convert csv to few shot prompt",
        "generate llm examples from table"
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
      "transform",
      "few-shot-prompt-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "prompt-engineering-6",
    "slug": "prompt-engineering-builder",
    "title": "Prompt Engineering Builder",
    "name": "Prompt Engineering Builder",
    "href": "/tools/prompt-engineering-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Prompt Engineering Builder locally in your browser.",
    "seo": {
      "title": "Prompt Engineering Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Prompt Engineering Builder locally in your browser.",
      "keywords": [
        "prompt engineering builder",
        "prompt engineering",
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
      "prompt engineering",
      "generator",
      "prompt-engineering-builder"
    ],
    "icon": "code"
  },
  {
    "id": "prompt-engineering-7",
    "slug": "prompt-engineering-estimator",
    "title": "Prompt Engineering Estimator",
    "name": "Prompt Engineering Estimator",
    "href": "/tools/prompt-engineering-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Prompt Engineering Estimator locally in your browser.",
    "seo": {
      "title": "Prompt Engineering Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Prompt Engineering Estimator locally in your browser.",
      "keywords": [
        "prompt engineering estimator",
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
      "prompt-engineering-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "prompt-engineering-8",
    "slug": "prompt-engineering-checker",
    "title": "Prompt Engineering Checker",
    "name": "Prompt Engineering Checker",
    "href": "/tools/prompt-engineering-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Prompt Engineering Checker locally in your browser.",
    "seo": {
      "title": "Prompt Engineering Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Prompt Engineering Checker locally in your browser.",
      "keywords": [
        "prompt engineering checker",
        "prompt engineering",
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
      "prompt engineering",
      "analyzer",
      "prompt-engineering-checker"
    ],
    "icon": "code"
  },
  {
    "id": "prompt-engineering-9",
    "slug": "prompt-engineering-cleaner",
    "title": "Prompt Engineering Cleaner",
    "name": "Prompt Engineering Cleaner",
    "href": "/tools/prompt-engineering-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Prompt Engineering Cleaner locally in your browser.",
    "seo": {
      "title": "Prompt Engineering Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Prompt Engineering Cleaner locally in your browser.",
      "keywords": [
        "prompt engineering cleaner",
        "prompt engineering",
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
      "prompt engineering",
      "transform",
      "prompt-engineering-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "prompt-engineering-10",
    "slug": "prompt-engineering-template-maker",
    "title": "Prompt Engineering Template Maker",
    "name": "Prompt Engineering Template Maker",
    "href": "/tools/prompt-engineering-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Prompt Engineering Template Maker locally in your browser.",
    "seo": {
      "title": "Prompt Engineering Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Prompt Engineering Template Maker locally in your browser.",
      "keywords": [
        "prompt engineering template maker",
        "prompt engineering",
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
      "prompt engineering",
      "generator",
      "prompt-engineering-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "prompt-engineering-11",
    "slug": "prompt-engineering-planner",
    "title": "Prompt Engineering Planner",
    "name": "Prompt Engineering Planner",
    "href": "/tools/prompt-engineering-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Prompt Engineering Planner locally in your browser.",
    "seo": {
      "title": "Prompt Engineering Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Prompt Engineering Planner locally in your browser.",
      "keywords": [
        "prompt engineering planner",
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
      "prompt-engineering-planner"
    ],
    "icon": "code"
  },
  {
    "id": "prompt-engineering-12",
    "slug": "prompt-engineering-inspector",
    "title": "Prompt Engineering Inspector",
    "name": "Prompt Engineering Inspector",
    "href": "/tools/prompt-engineering-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Prompt Engineering",
    "categorySlug": "prompt-engineering",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Prompt Engineering Inspector locally in your browser.",
    "seo": {
      "title": "Prompt Engineering Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Prompt Engineering Inspector locally in your browser.",
      "keywords": [
        "prompt engineering inspector",
        "prompt engineering",
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
      "prompt engineering",
      "analyzer",
      "prompt-engineering-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "llms-1",
    "slug": "llm-token-counter-multi-model",
    "title": "LLM Token Calculator & Multi-Model Visualizer",
    "name": "LLM Token Calculator",
    "href": "/tools/llm-token-counter-multi-model/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "transform",
    "description": "Compare GPT-4 vs Claude token counts in real-time. Visualize exactly how text is chunked by different models.",
    "seo": {
      "title": "LLM Token Calculator & Multi-Model Visualizer | Nadhebe",
      "description": "Compare token counts across OpenAI, Anthropic, and Llama tokenizers simultaneously. Real-time visual tokenizer highlighting.",
      "keywords": [
        "llm token counter multi model",
        "compare gpt-4 vs claude token counts",
        "tokenizer visualizer",
        "tiktoken counter online",
        "sentencepiece tokenizer tool"
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
      "llm-token-counter-multi-model"
    ],
    "icon": "code"
  },
  {
    "id": "llms-2",
    "slug": "rag-context-window-calculator",
    "title": "RAG Context Window Optimizer",
    "name": "Context Window Optimizer",
    "href": "/tools/rag-context-window-calculator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "generator",
    "description": "Visually allocate percentage limits for System Prompts, RAG context, and Completion buffers.",
    "seo": {
      "title": "RAG Context Window Calculator & Optimizer | Nadhebe",
      "description": "Optimize your LLM context window. Visually plan context sizes for RAG retrieval, system instructions, and generation buffers.",
      "keywords": [
        "rag context window calculator",
        "how to optimize llm context limits",
        "llm context window visualizer",
        "rag prompt token planner"
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
      "generator",
      "rag-context-window-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "llms-3",
    "slug": "batch-inference-cost-estimator",
    "title": "Batch Inference Cost Calculator",
    "name": "Batch Cost Estimator",
    "href": "/tools/batch-inference-cost-estimator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "calculator",
    "description": "Calculate 50% discount savings using asynchronous Batch APIs. Upload a CSV to estimate total run cost.",
    "seo": {
      "title": "Batch Inference Cost Calculator for LLM APIs | Nadhebe",
      "description": "Calculate the exact savings of using the OpenAI or Anthropic Batch APIs for asynchronous inference. Upload bulk prompts to estimate costs.",
      "keywords": [
        "batch inference cost estimator",
        "calculate openai batch api discount",
        "llm batch pricing calculator"
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
      "calculator",
      "batch-inference-cost-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "llms-4",
    "slug": "rag-chunk-size-calculator",
    "title": "Semantic Chunk Size Planner",
    "name": "RAG Chunk Planner",
    "href": "/tools/rag-chunk-size-calculator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "analyzer",
    "description": "Paste documents and visually slice them by token limits (256, 512, 1024) to optimize vector embeddings.",
    "seo": {
      "title": "RAG Chunk Size Calculator & Visualizer | Nadhebe",
      "description": "Optimize your vector database chunks. Visually slice long documents by token limits to find the perfect semantic chunk size for RAG.",
      "keywords": [
        "rag chunk size calculator",
        "best chunk size for vector embeddings",
        "text chunking visualizer",
        "token limits for rag"
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
      "analyzer",
      "rag-chunk-size-calculator"
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
    "id": "llms-6",
    "slug": "llms-builder",
    "title": "LLMs Builder",
    "name": "LLMs Builder",
    "href": "/tools/llms-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "generator",
    "description": "Clean, normalize, and calculate LLMs Builder locally in your browser.",
    "seo": {
      "title": "LLMs Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate LLMs Builder locally in your browser.",
      "keywords": [
        "llms builder",
        "llms",
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
      "llms",
      "generator",
      "llms-builder"
    ],
    "icon": "code"
  },
  {
    "id": "llms-7",
    "slug": "llms-estimator",
    "title": "LLMs Estimator",
    "name": "LLMs Estimator",
    "href": "/tools/llms-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate LLMs Estimator locally in your browser.",
    "seo": {
      "title": "LLMs Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate LLMs Estimator locally in your browser.",
      "keywords": [
        "llms estimator",
        "llms",
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
      "llms",
      "calculator",
      "llms-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "llms-8",
    "slug": "llms-checker",
    "title": "LLMs Checker",
    "name": "LLMs Checker",
    "href": "/tools/llms-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate LLMs Checker locally in your browser.",
    "seo": {
      "title": "LLMs Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate LLMs Checker locally in your browser.",
      "keywords": [
        "llms checker",
        "llms",
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
      "llms",
      "analyzer",
      "llms-checker"
    ],
    "icon": "code"
  },
  {
    "id": "llms-9",
    "slug": "llms-cleaner",
    "title": "LLMs Cleaner",
    "name": "LLMs Cleaner",
    "href": "/tools/llms-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "transform",
    "description": "Clean, normalize, and calculate LLMs Cleaner locally in your browser.",
    "seo": {
      "title": "LLMs Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate LLMs Cleaner locally in your browser.",
      "keywords": [
        "llms cleaner",
        "llms",
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
      "llms",
      "transform",
      "llms-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "llms-10",
    "slug": "llms-template-maker",
    "title": "LLMs Template Maker",
    "name": "LLMs Template Maker",
    "href": "/tools/llms-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "generator",
    "description": "Clean, normalize, and calculate LLMs Template Maker locally in your browser.",
    "seo": {
      "title": "LLMs Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate LLMs Template Maker locally in your browser.",
      "keywords": [
        "llms template maker",
        "llms",
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
      "llms",
      "generator",
      "llms-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "llms-11",
    "slug": "llms-planner",
    "title": "LLMs Planner",
    "name": "LLMs Planner",
    "href": "/tools/llms-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate LLMs Planner locally in your browser.",
    "seo": {
      "title": "LLMs Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate LLMs Planner locally in your browser.",
      "keywords": [
        "llms planner",
        "llms",
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
      "llms",
      "calculator",
      "llms-planner"
    ],
    "icon": "code"
  },
  {
    "id": "llms-12",
    "slug": "llms-inspector",
    "title": "LLMs Inspector",
    "name": "LLMs Inspector",
    "href": "/tools/llms-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "LLMs",
    "categorySlug": "llms",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate LLMs Inspector locally in your browser.",
    "seo": {
      "title": "LLMs Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate LLMs Inspector locally in your browser.",
      "keywords": [
        "llms inspector",
        "llms",
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
      "llms",
      "analyzer",
      "llms-inspector"
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
    "id": "json-2",
    "slug": "json-schema-generator",
    "title": "JSON schema generator",
    "name": "JSON schema generator",
    "href": "/tools/json-schema-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "generator",
    "description": "JSON schema generator. Use this privacy-first json schema generator directly in your browser.",
    "seo": {
      "title": "JSON schema generator - Free Browser Tool | Nadhebe",
      "description": "JSON schema generator. Use this privacy-first json schema generator directly in your browser.",
      "keywords": [
        "json schema generator",
        "json",
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
      "json",
      "generator",
      "json-schema-generator"
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
    "id": "json-4",
    "slug": "json-sorter",
    "title": "JSON sorter",
    "name": "JSON sorter",
    "href": "/tools/json-sorter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "analyzer",
    "description": "JSON sorter. Use this privacy-first json sorter directly in your browser.",
    "seo": {
      "title": "JSON sorter - Free Browser Tool | Nadhebe",
      "description": "JSON sorter. Use this privacy-first json sorter directly in your browser.",
      "keywords": [
        "json sorter",
        "json",
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
      "json",
      "analyzer",
      "json-sorter"
    ],
    "icon": "code"
  },
  {
    "id": "json-5",
    "slug": "json-flatten",
    "title": "JSON flatten",
    "name": "JSON flatten",
    "href": "/tools/json-flatten/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "transform",
    "description": "JSON flatten. Use this privacy-first json flatten directly in your browser.",
    "seo": {
      "title": "JSON flatten - Free Browser Tool | Nadhebe",
      "description": "JSON flatten. Use this privacy-first json flatten directly in your browser.",
      "keywords": [
        "json flatten",
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
      "json-flatten"
    ],
    "icon": "code"
  },
  {
    "id": "json-6",
    "slug": "json-builder",
    "title": "JSON Builder",
    "name": "JSON Builder",
    "href": "/tools/json-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "generator",
    "description": "Clean, normalize, and calculate JSON Builder locally in your browser.",
    "seo": {
      "title": "JSON Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate JSON Builder locally in your browser.",
      "keywords": [
        "json builder",
        "json",
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
      "json",
      "generator",
      "json-builder"
    ],
    "icon": "code"
  },
  {
    "id": "json-7",
    "slug": "json-estimator",
    "title": "JSON Estimator",
    "name": "JSON Estimator",
    "href": "/tools/json-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate JSON Estimator locally in your browser.",
    "seo": {
      "title": "JSON Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate JSON Estimator locally in your browser.",
      "keywords": [
        "json estimator",
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
      "json-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "json-8",
    "slug": "json-checker",
    "title": "JSON Checker",
    "name": "JSON Checker",
    "href": "/tools/json-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate JSON Checker locally in your browser.",
    "seo": {
      "title": "JSON Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate JSON Checker locally in your browser.",
      "keywords": [
        "json checker",
        "json",
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
      "json",
      "analyzer",
      "json-checker"
    ],
    "icon": "code"
  },
  {
    "id": "json-9",
    "slug": "json-cleaner",
    "title": "JSON Cleaner",
    "name": "JSON Cleaner",
    "href": "/tools/json-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "transform",
    "description": "Clean, normalize, and calculate JSON Cleaner locally in your browser.",
    "seo": {
      "title": "JSON Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate JSON Cleaner locally in your browser.",
      "keywords": [
        "json cleaner",
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
      "json-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "json-10",
    "slug": "json-template-maker",
    "title": "JSON Template Maker",
    "name": "JSON Template Maker",
    "href": "/tools/json-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "generator",
    "description": "Clean, normalize, and calculate JSON Template Maker locally in your browser.",
    "seo": {
      "title": "JSON Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate JSON Template Maker locally in your browser.",
      "keywords": [
        "json template maker",
        "json",
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
      "json",
      "generator",
      "json-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "json-11",
    "slug": "json-planner",
    "title": "JSON Planner",
    "name": "JSON Planner",
    "href": "/tools/json-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate JSON Planner locally in your browser.",
    "seo": {
      "title": "JSON Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate JSON Planner locally in your browser.",
      "keywords": [
        "json planner",
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
      "json-planner"
    ],
    "icon": "code"
  },
  {
    "id": "json-12",
    "slug": "json-inspector",
    "title": "JSON Inspector",
    "name": "JSON Inspector",
    "href": "/tools/json-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "JSON",
    "categorySlug": "json",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate JSON Inspector locally in your browser.",
    "seo": {
      "title": "JSON Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate JSON Inspector locally in your browser.",
      "keywords": [
        "json inspector",
        "json",
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
      "json",
      "analyzer",
      "json-inspector"
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
    "id": "xml-2",
    "slug": "xml-validator",
    "title": "XML validator",
    "name": "XML validator",
    "href": "/tools/xml-validator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "generator",
    "description": "XML validator. Use this privacy-first xml validator directly in your browser.",
    "seo": {
      "title": "XML validator - Free Browser Tool | Nadhebe",
      "description": "XML validator. Use this privacy-first xml validator directly in your browser.",
      "keywords": [
        "xml validator",
        "xml",
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
      "xml",
      "generator",
      "xml-validator"
    ],
    "icon": "code"
  },
  {
    "id": "xml-3",
    "slug": "rss-checker",
    "title": "RSS checker",
    "name": "RSS checker",
    "href": "/tools/rss-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "calculator",
    "description": "RSS checker. Use this privacy-first rss checker directly in your browser.",
    "seo": {
      "title": "RSS checker - Free Browser Tool | Nadhebe",
      "description": "RSS checker. Use this privacy-first rss checker directly in your browser.",
      "keywords": [
        "rss checker",
        "xml",
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
      "xml",
      "calculator",
      "rss-checker"
    ],
    "icon": "code"
  },
  {
    "id": "xml-4",
    "slug": "xml-minifier",
    "title": "XML minifier",
    "name": "XML minifier",
    "href": "/tools/xml-minifier/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "analyzer",
    "description": "XML minifier. Use this privacy-first xml minifier directly in your browser.",
    "seo": {
      "title": "XML minifier - Free Browser Tool | Nadhebe",
      "description": "XML minifier. Use this privacy-first xml minifier directly in your browser.",
      "keywords": [
        "xml minifier",
        "xml",
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
      "xml",
      "analyzer",
      "xml-minifier"
    ],
    "icon": "code"
  },
  {
    "id": "xml-5",
    "slug": "xml-to-csv",
    "title": "XML to CSV",
    "name": "XML to CSV",
    "href": "/tools/xml-to-csv/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "transform",
    "description": "XML to CSV. Use this privacy-first xml to csv directly in your browser.",
    "seo": {
      "title": "XML to CSV - Free Browser Tool | Nadhebe",
      "description": "XML to CSV. Use this privacy-first xml to csv directly in your browser.",
      "keywords": [
        "xml to csv",
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
      "xml-to-csv"
    ],
    "icon": "code"
  },
  {
    "id": "xml-6",
    "slug": "xml-builder",
    "title": "XML Builder",
    "name": "XML Builder",
    "href": "/tools/xml-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "generator",
    "description": "Clean, normalize, and calculate XML Builder locally in your browser.",
    "seo": {
      "title": "XML Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate XML Builder locally in your browser.",
      "keywords": [
        "xml builder",
        "xml",
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
      "xml",
      "generator",
      "xml-builder"
    ],
    "icon": "code"
  },
  {
    "id": "xml-7",
    "slug": "xml-estimator",
    "title": "XML Estimator",
    "name": "XML Estimator",
    "href": "/tools/xml-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate XML Estimator locally in your browser.",
    "seo": {
      "title": "XML Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate XML Estimator locally in your browser.",
      "keywords": [
        "xml estimator",
        "xml",
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
      "xml",
      "calculator",
      "xml-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "xml-8",
    "slug": "xml-checker",
    "title": "XML Checker",
    "name": "XML Checker",
    "href": "/tools/xml-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate XML Checker locally in your browser.",
    "seo": {
      "title": "XML Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate XML Checker locally in your browser.",
      "keywords": [
        "xml checker",
        "xml",
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
      "xml",
      "analyzer",
      "xml-checker"
    ],
    "icon": "code"
  },
  {
    "id": "xml-9",
    "slug": "xml-cleaner",
    "title": "XML Cleaner",
    "name": "XML Cleaner",
    "href": "/tools/xml-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "transform",
    "description": "Clean, normalize, and calculate XML Cleaner locally in your browser.",
    "seo": {
      "title": "XML Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate XML Cleaner locally in your browser.",
      "keywords": [
        "xml cleaner",
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
      "xml-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "xml-10",
    "slug": "xml-template-maker",
    "title": "XML Template Maker",
    "name": "XML Template Maker",
    "href": "/tools/xml-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "generator",
    "description": "Clean, normalize, and calculate XML Template Maker locally in your browser.",
    "seo": {
      "title": "XML Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate XML Template Maker locally in your browser.",
      "keywords": [
        "xml template maker",
        "xml",
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
      "xml",
      "generator",
      "xml-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "xml-11",
    "slug": "xml-planner",
    "title": "XML Planner",
    "name": "XML Planner",
    "href": "/tools/xml-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate XML Planner locally in your browser.",
    "seo": {
      "title": "XML Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate XML Planner locally in your browser.",
      "keywords": [
        "xml planner",
        "xml",
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
      "xml",
      "calculator",
      "xml-planner"
    ],
    "icon": "code"
  },
  {
    "id": "xml-12",
    "slug": "xml-inspector",
    "title": "XML Inspector",
    "name": "XML Inspector",
    "href": "/tools/xml-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "XML",
    "categorySlug": "xml",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate XML Inspector locally in your browser.",
    "seo": {
      "title": "XML Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate XML Inspector locally in your browser.",
      "keywords": [
        "xml inspector",
        "xml",
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
      "xml",
      "analyzer",
      "xml-inspector"
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
    "id": "csv-3",
    "slug": "csv-preview",
    "title": "CSV preview",
    "name": "CSV preview",
    "href": "/tools/csv-preview/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "calculator",
    "description": "CSV preview. Use this privacy-first csv preview directly in your browser.",
    "seo": {
      "title": "CSV preview - Free Browser Tool | Nadhebe",
      "description": "CSV preview. Use this privacy-first csv preview directly in your browser.",
      "keywords": [
        "csv preview",
        "csv",
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
      "csv",
      "calculator",
      "csv-preview"
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
    "id": "csv-6",
    "slug": "csv-builder",
    "title": "CSV Builder",
    "name": "CSV Builder",
    "href": "/tools/csv-builder/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "generator",
    "description": "Clean, normalize, and calculate CSV Builder locally in your browser.",
    "seo": {
      "title": "CSV Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate CSV Builder locally in your browser.",
      "keywords": [
        "csv builder",
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
      "csv-builder"
    ],
    "icon": "code"
  },
  {
    "id": "csv-7",
    "slug": "csv-estimator",
    "title": "CSV Estimator",
    "name": "CSV Estimator",
    "href": "/tools/csv-estimator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate CSV Estimator locally in your browser.",
    "seo": {
      "title": "CSV Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate CSV Estimator locally in your browser.",
      "keywords": [
        "csv estimator",
        "csv",
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
      "csv",
      "calculator",
      "csv-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "csv-8",
    "slug": "csv-checker",
    "title": "CSV Checker",
    "name": "CSV Checker",
    "href": "/tools/csv-checker/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate CSV Checker locally in your browser.",
    "seo": {
      "title": "CSV Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate CSV Checker locally in your browser.",
      "keywords": [
        "csv checker",
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
      "csv-checker"
    ],
    "icon": "code"
  },
  {
    "id": "csv-9",
    "slug": "csv-cleaner",
    "title": "CSV Cleaner",
    "name": "CSV Cleaner",
    "href": "/tools/csv-cleaner/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "transform",
    "description": "Clean, normalize, and calculate CSV Cleaner locally in your browser.",
    "seo": {
      "title": "CSV Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate CSV Cleaner locally in your browser.",
      "keywords": [
        "csv cleaner",
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
      "csv-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "csv-10",
    "slug": "csv-template-maker",
    "title": "CSV Template Maker",
    "name": "CSV Template Maker",
    "href": "/tools/csv-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "generator",
    "description": "Clean, normalize, and calculate CSV Template Maker locally in your browser.",
    "seo": {
      "title": "CSV Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate CSV Template Maker locally in your browser.",
      "keywords": [
        "csv template maker",
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
      "csv-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "csv-11",
    "slug": "csv-planner",
    "title": "CSV Planner",
    "name": "CSV Planner",
    "href": "/tools/csv-planner/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate CSV Planner locally in your browser.",
    "seo": {
      "title": "CSV Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate CSV Planner locally in your browser.",
      "keywords": [
        "csv planner",
        "csv",
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
      "csv",
      "calculator",
      "csv-planner"
    ],
    "icon": "code"
  },
  {
    "id": "csv-12",
    "slug": "csv-inspector",
    "title": "CSV Inspector",
    "name": "CSV Inspector",
    "href": "/tools/csv-inspector/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "CSV",
    "categorySlug": "csv",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate CSV Inspector locally in your browser.",
    "seo": {
      "title": "CSV Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate CSV Inspector locally in your browser.",
      "keywords": [
        "csv inspector",
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
      "csv-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "regex-1",
    "slug": "regex-tester",
    "title": "Regex tester",
    "name": "Regex tester",
    "href": "/tools/regex-tester/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "transform",
    "description": "Regex tester. Use this privacy-first regex tester directly in your browser.",
    "seo": {
      "title": "Regex tester - Free Browser Tool | Nadhebe",
      "description": "Regex tester. Use this privacy-first regex tester directly in your browser.",
      "keywords": [
        "regex tester",
        "regex",
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
      "regex",
      "transform",
      "regex-tester"
    ],
    "icon": "code"
  },
  {
    "id": "regex-2",
    "slug": "regex-explainer",
    "title": "Regex explainer",
    "name": "Regex explainer",
    "href": "/tools/regex-explainer/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "generator",
    "description": "Regex explainer. Use this privacy-first regex explainer directly in your browser.",
    "seo": {
      "title": "Regex explainer - Free Browser Tool | Nadhebe",
      "description": "Regex explainer. Use this privacy-first regex explainer directly in your browser.",
      "keywords": [
        "regex explainer",
        "regex",
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
      "regex",
      "generator",
      "regex-explainer"
    ],
    "icon": "code"
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
    "id": "regex-4",
    "slug": "named-group-checker",
    "title": "Named group checker",
    "name": "Named group checker",
    "href": "/tools/named-group-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "analyzer",
    "description": "Named group checker. Use this privacy-first named group checker directly in your browser.",
    "seo": {
      "title": "Named group checker - Free Browser Tool | Nadhebe",
      "description": "Named group checker. Use this privacy-first named group checker directly in your browser.",
      "keywords": [
        "named group checker",
        "regex",
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
      "regex",
      "analyzer",
      "named-group-checker"
    ],
    "icon": "code"
  },
  {
    "id": "regex-5",
    "slug": "find-and-replace-lab",
    "title": "Find and replace lab",
    "name": "Find and replace lab",
    "href": "/tools/find-and-replace-lab/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "transform",
    "description": "Find and replace lab. Use this privacy-first find and replace lab directly in your browser.",
    "seo": {
      "title": "Find and replace lab - Free Browser Tool | Nadhebe",
      "description": "Find and replace lab. Use this privacy-first find and replace lab directly in your browser.",
      "keywords": [
        "find and replace lab",
        "regex",
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
      "regex",
      "transform",
      "find-and-replace-lab"
    ],
    "icon": "code"
  },
  {
    "id": "regex-6",
    "slug": "regex-builder",
    "title": "Regex Builder",
    "name": "Regex Builder",
    "href": "/tools/regex-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Regex Builder locally in your browser.",
    "seo": {
      "title": "Regex Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Regex Builder locally in your browser.",
      "keywords": [
        "regex builder",
        "regex",
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
      "regex",
      "generator",
      "regex-builder"
    ],
    "icon": "code"
  },
  {
    "id": "regex-7",
    "slug": "regex-estimator",
    "title": "Regex Estimator",
    "name": "Regex Estimator",
    "href": "/tools/regex-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Regex Estimator locally in your browser.",
    "seo": {
      "title": "Regex Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Regex Estimator locally in your browser.",
      "keywords": [
        "regex estimator",
        "regex",
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
      "regex",
      "calculator",
      "regex-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "regex-8",
    "slug": "regex-checker",
    "title": "Regex Checker",
    "name": "Regex Checker",
    "href": "/tools/regex-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Regex Checker locally in your browser.",
    "seo": {
      "title": "Regex Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Regex Checker locally in your browser.",
      "keywords": [
        "regex checker",
        "regex",
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
      "regex",
      "analyzer",
      "regex-checker"
    ],
    "icon": "code"
  },
  {
    "id": "regex-9",
    "slug": "regex-cleaner",
    "title": "Regex Cleaner",
    "name": "Regex Cleaner",
    "href": "/tools/regex-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Regex Cleaner locally in your browser.",
    "seo": {
      "title": "Regex Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Regex Cleaner locally in your browser.",
      "keywords": [
        "regex cleaner",
        "regex",
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
      "regex",
      "transform",
      "regex-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "regex-10",
    "slug": "regex-template-maker",
    "title": "Regex Template Maker",
    "name": "Regex Template Maker",
    "href": "/tools/regex-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Regex Template Maker locally in your browser.",
    "seo": {
      "title": "Regex Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Regex Template Maker locally in your browser.",
      "keywords": [
        "regex template maker",
        "regex",
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
      "regex",
      "generator",
      "regex-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "regex-11",
    "slug": "regex-planner",
    "title": "Regex Planner",
    "name": "Regex Planner",
    "href": "/tools/regex-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Regex Planner locally in your browser.",
    "seo": {
      "title": "Regex Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Regex Planner locally in your browser.",
      "keywords": [
        "regex planner",
        "regex",
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
      "regex",
      "calculator",
      "regex-planner"
    ],
    "icon": "code"
  },
  {
    "id": "regex-12",
    "slug": "regex-inspector",
    "title": "Regex Inspector",
    "name": "Regex Inspector",
    "href": "/tools/regex-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Regex",
    "categorySlug": "regex",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Regex Inspector locally in your browser.",
    "seo": {
      "title": "Regex Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Regex Inspector locally in your browser.",
      "keywords": [
        "regex inspector",
        "regex",
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
      "regex",
      "analyzer",
      "regex-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "hash-1",
    "slug": "sha-256-hash",
    "title": "SHA-256 hash",
    "name": "SHA-256 hash",
    "href": "/tools/sha-256-hash/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "transform",
    "description": "SHA-256 hash. Use this privacy-first sha-256 hash directly in your browser.",
    "seo": {
      "title": "SHA-256 hash - Free Browser Tool | Nadhebe",
      "description": "SHA-256 hash. Use this privacy-first sha-256 hash directly in your browser.",
      "keywords": [
        "sha 256 hash",
        "hash",
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
      "hash",
      "transform",
      "sha-256-hash"
    ],
    "icon": "code"
  },
  {
    "id": "hash-2",
    "slug": "md5-checksum",
    "title": "MD5 checksum",
    "name": "MD5 checksum",
    "href": "/tools/md5-checksum/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "generator",
    "description": "MD5 checksum. Use this privacy-first md5 checksum directly in your browser.",
    "seo": {
      "title": "MD5 checksum - Free Browser Tool | Nadhebe",
      "description": "MD5 checksum. Use this privacy-first md5 checksum directly in your browser.",
      "keywords": [
        "md5 checksum",
        "hash",
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
      "hash",
      "generator",
      "md5-checksum"
    ],
    "icon": "code"
  },
  {
    "id": "hash-3",
    "slug": "hmac-generator",
    "title": "HMAC generator",
    "name": "HMAC generator",
    "href": "/tools/hmac-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "calculator",
    "description": "HMAC generator. Use this privacy-first hmac generator directly in your browser.",
    "seo": {
      "title": "HMAC generator - Free Browser Tool | Nadhebe",
      "description": "HMAC generator. Use this privacy-first hmac generator directly in your browser.",
      "keywords": [
        "hmac generator",
        "hash",
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
      "hash",
      "calculator",
      "hmac-generator"
    ],
    "icon": "code"
  },
  {
    "id": "hash-4",
    "slug": "file-hash-verifier",
    "title": "File hash verifier",
    "name": "File hash verifier",
    "href": "/tools/file-hash-verifier/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "analyzer",
    "description": "File hash verifier. Use this privacy-first file hash verifier directly in your browser.",
    "seo": {
      "title": "File hash verifier - Free Browser Tool | Nadhebe",
      "description": "File hash verifier. Use this privacy-first file hash verifier directly in your browser.",
      "keywords": [
        "file hash verifier",
        "hash",
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
      "hash",
      "analyzer",
      "file-hash-verifier"
    ],
    "icon": "code"
  },
  {
    "id": "hash-5",
    "slug": "bcrypt-checker",
    "title": "bcrypt checker",
    "name": "bcrypt checker",
    "href": "/tools/bcrypt-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "transform",
    "description": "bcrypt checker. Use this privacy-first bcrypt checker directly in your browser.",
    "seo": {
      "title": "bcrypt checker - Free Browser Tool | Nadhebe",
      "description": "bcrypt checker. Use this privacy-first bcrypt checker directly in your browser.",
      "keywords": [
        "bcrypt checker",
        "hash",
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
      "hash",
      "transform",
      "bcrypt-checker"
    ],
    "icon": "code"
  },
  {
    "id": "hash-6",
    "slug": "hash-builder",
    "title": "Hash Builder",
    "name": "Hash Builder",
    "href": "/tools/hash-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Hash Builder locally in your browser.",
    "seo": {
      "title": "Hash Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Hash Builder locally in your browser.",
      "keywords": [
        "hash builder",
        "hash",
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
      "hash",
      "generator",
      "hash-builder"
    ],
    "icon": "code"
  },
  {
    "id": "hash-7",
    "slug": "hash-estimator",
    "title": "Hash Estimator",
    "name": "Hash Estimator",
    "href": "/tools/hash-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Hash Estimator locally in your browser.",
    "seo": {
      "title": "Hash Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Hash Estimator locally in your browser.",
      "keywords": [
        "hash estimator",
        "hash",
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
      "hash",
      "calculator",
      "hash-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "hash-8",
    "slug": "hash-checker",
    "title": "Hash Checker",
    "name": "Hash Checker",
    "href": "/tools/hash-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Hash Checker locally in your browser.",
    "seo": {
      "title": "Hash Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Hash Checker locally in your browser.",
      "keywords": [
        "hash checker",
        "hash",
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
      "hash",
      "analyzer",
      "hash-checker"
    ],
    "icon": "code"
  },
  {
    "id": "hash-9",
    "slug": "hash-cleaner",
    "title": "Hash Cleaner",
    "name": "Hash Cleaner",
    "href": "/tools/hash-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Hash Cleaner locally in your browser.",
    "seo": {
      "title": "Hash Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Hash Cleaner locally in your browser.",
      "keywords": [
        "hash cleaner",
        "hash",
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
      "hash",
      "transform",
      "hash-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "hash-10",
    "slug": "hash-template-maker",
    "title": "Hash Template Maker",
    "name": "Hash Template Maker",
    "href": "/tools/hash-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Hash Template Maker locally in your browser.",
    "seo": {
      "title": "Hash Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Hash Template Maker locally in your browser.",
      "keywords": [
        "hash template maker",
        "hash",
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
      "hash",
      "generator",
      "hash-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "hash-11",
    "slug": "hash-planner",
    "title": "Hash Planner",
    "name": "Hash Planner",
    "href": "/tools/hash-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Hash Planner locally in your browser.",
    "seo": {
      "title": "Hash Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Hash Planner locally in your browser.",
      "keywords": [
        "hash planner",
        "hash",
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
      "hash",
      "calculator",
      "hash-planner"
    ],
    "icon": "code"
  },
  {
    "id": "hash-12",
    "slug": "hash-inspector",
    "title": "Hash Inspector",
    "name": "Hash Inspector",
    "href": "/tools/hash-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Hash",
    "categorySlug": "hash",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Hash Inspector locally in your browser.",
    "seo": {
      "title": "Hash Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Hash Inspector locally in your browser.",
      "keywords": [
        "hash inspector",
        "hash",
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
      "hash",
      "analyzer",
      "hash-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "security-1",
    "slug": "csp-builder",
    "title": "CSP builder",
    "name": "CSP builder",
    "href": "/tools/csp-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Security",
    "categorySlug": "security",
    "mode": "transform",
    "description": "CSP builder. Use this privacy-first csp builder directly in your browser.",
    "seo": {
      "title": "CSP builder - Free Browser Tool | Nadhebe",
      "description": "CSP builder. Use this privacy-first csp builder directly in your browser.",
      "keywords": [
        "csp builder",
        "security",
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
      "security",
      "transform",
      "csp-builder"
    ],
    "icon": "code"
  },
  {
    "id": "security-2",
    "slug": "password-generator",
    "title": "Password generator",
    "name": "Password generator",
    "href": "/tools/password-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Security",
    "categorySlug": "security",
    "mode": "generator",
    "description": "Password generator. Use this privacy-first password generator directly in your browser.",
    "seo": {
      "title": "Password generator - Free Browser Tool | Nadhebe",
      "description": "Password generator. Use this privacy-first password generator directly in your browser.",
      "keywords": [
        "password generator",
        "security",
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
      "security",
      "generator",
      "password-generator"
    ],
    "icon": "code"
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
    "id": "security-4",
    "slug": "tls-checker",
    "title": "TLS checker",
    "name": "TLS checker",
    "href": "/tools/tls-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Security",
    "categorySlug": "security",
    "mode": "analyzer",
    "description": "TLS checker. Use this privacy-first tls checker directly in your browser.",
    "seo": {
      "title": "TLS checker - Free Browser Tool | Nadhebe",
      "description": "TLS checker. Use this privacy-first tls checker directly in your browser.",
      "keywords": [
        "tls checker",
        "security",
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
      "security",
      "analyzer",
      "tls-checker"
    ],
    "icon": "code"
  },
  {
    "id": "security-5",
    "slug": "secret-redactor",
    "title": "Secret redactor",
    "name": "Secret redactor",
    "href": "/tools/secret-redactor/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Security",
    "categorySlug": "security",
    "mode": "transform",
    "description": "Secret redactor. Use this privacy-first secret redactor directly in your browser.",
    "seo": {
      "title": "Secret redactor - Free Browser Tool | Nadhebe",
      "description": "Secret redactor. Use this privacy-first secret redactor directly in your browser.",
      "keywords": [
        "secret redactor",
        "security",
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
      "security",
      "transform",
      "secret-redactor"
    ],
    "icon": "code"
  },
  {
    "id": "security-6",
    "slug": "security-builder",
    "title": "Security Builder",
    "name": "Security Builder",
    "href": "/tools/security-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Security",
    "categorySlug": "security",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Security Builder locally in your browser.",
    "seo": {
      "title": "Security Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Security Builder locally in your browser.",
      "keywords": [
        "security builder",
        "security",
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
      "security",
      "generator",
      "security-builder"
    ],
    "icon": "code"
  },
  {
    "id": "security-7",
    "slug": "security-estimator",
    "title": "Security Estimator",
    "name": "Security Estimator",
    "href": "/tools/security-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Security",
    "categorySlug": "security",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Security Estimator locally in your browser.",
    "seo": {
      "title": "Security Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Security Estimator locally in your browser.",
      "keywords": [
        "security estimator",
        "security",
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
      "security",
      "calculator",
      "security-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "security-8",
    "slug": "security-checker",
    "title": "Security Checker",
    "name": "Security Checker",
    "href": "/tools/security-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Security",
    "categorySlug": "security",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Security Checker locally in your browser.",
    "seo": {
      "title": "Security Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Security Checker locally in your browser.",
      "keywords": [
        "security checker",
        "security",
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
      "security",
      "analyzer",
      "security-checker"
    ],
    "icon": "code"
  },
  {
    "id": "security-9",
    "slug": "security-cleaner",
    "title": "Security Cleaner",
    "name": "Security Cleaner",
    "href": "/tools/security-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Security",
    "categorySlug": "security",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Security Cleaner locally in your browser.",
    "seo": {
      "title": "Security Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Security Cleaner locally in your browser.",
      "keywords": [
        "security cleaner",
        "security",
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
      "security",
      "transform",
      "security-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "security-10",
    "slug": "security-template-maker",
    "title": "Security Template Maker",
    "name": "Security Template Maker",
    "href": "/tools/security-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Security",
    "categorySlug": "security",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Security Template Maker locally in your browser.",
    "seo": {
      "title": "Security Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Security Template Maker locally in your browser.",
      "keywords": [
        "security template maker",
        "security",
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
      "security",
      "generator",
      "security-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "security-11",
    "slug": "security-planner",
    "title": "Security Planner",
    "name": "Security Planner",
    "href": "/tools/security-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Security",
    "categorySlug": "security",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Security Planner locally in your browser.",
    "seo": {
      "title": "Security Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Security Planner locally in your browser.",
      "keywords": [
        "security planner",
        "security",
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
      "security",
      "calculator",
      "security-planner"
    ],
    "icon": "code"
  },
  {
    "id": "security-12",
    "slug": "security-inspector",
    "title": "Security Inspector",
    "name": "Security Inspector",
    "href": "/tools/security-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Security",
    "categorySlug": "security",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Security Inspector locally in your browser.",
    "seo": {
      "title": "Security Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Security Inspector locally in your browser.",
      "keywords": [
        "security inspector",
        "security",
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
      "security",
      "analyzer",
      "security-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "networking-1",
    "slug": "cidr-calculator",
    "title": "CIDR calculator",
    "name": "CIDR calculator",
    "href": "/tools/cidr-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "transform",
    "description": "CIDR calculator. Use this privacy-first cidr calculator directly in your browser.",
    "seo": {
      "title": "CIDR calculator - Free Browser Tool | Nadhebe",
      "description": "CIDR calculator. Use this privacy-first cidr calculator directly in your browser.",
      "keywords": [
        "cidr calculator",
        "networking",
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
      "networking",
      "transform",
      "cidr-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "networking-2",
    "slug": "dns-lookup-helper",
    "title": "DNS lookup helper",
    "name": "DNS lookup helper",
    "href": "/tools/dns-lookup-helper/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "generator",
    "description": "DNS lookup helper. Use this privacy-first dns lookup helper directly in your browser.",
    "seo": {
      "title": "DNS lookup helper - Free Browser Tool | Nadhebe",
      "description": "DNS lookup helper. Use this privacy-first dns lookup helper directly in your browser.",
      "keywords": [
        "dns lookup helper",
        "networking",
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
      "networking",
      "generator",
      "dns-lookup-helper"
    ],
    "icon": "code"
  },
  {
    "id": "networking-3",
    "slug": "http-header-parser",
    "title": "HTTP header parser",
    "name": "HTTP header parser",
    "href": "/tools/http-header-parser/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "calculator",
    "description": "HTTP header parser. Use this privacy-first http header parser directly in your browser.",
    "seo": {
      "title": "HTTP header parser - Free Browser Tool | Nadhebe",
      "description": "HTTP header parser. Use this privacy-first http header parser directly in your browser.",
      "keywords": [
        "http header parser",
        "networking",
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
      "networking",
      "calculator",
      "http-header-parser"
    ],
    "icon": "code"
  },
  {
    "id": "networking-4",
    "slug": "port-reference",
    "title": "Port reference",
    "name": "Port reference",
    "href": "/tools/port-reference/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "analyzer",
    "description": "Port reference. Use this privacy-first port reference directly in your browser.",
    "seo": {
      "title": "Port reference - Free Browser Tool | Nadhebe",
      "description": "Port reference. Use this privacy-first port reference directly in your browser.",
      "keywords": [
        "port reference",
        "networking",
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
      "networking",
      "analyzer",
      "port-reference"
    ],
    "icon": "code"
  },
  {
    "id": "networking-5",
    "slug": "ip-range-planner",
    "title": "IP range planner",
    "name": "IP range planner",
    "href": "/tools/ip-range-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "transform",
    "description": "IP range planner. Use this privacy-first ip range planner directly in your browser.",
    "seo": {
      "title": "IP range planner - Free Browser Tool | Nadhebe",
      "description": "IP range planner. Use this privacy-first ip range planner directly in your browser.",
      "keywords": [
        "ip range planner",
        "networking",
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
      "networking",
      "transform",
      "ip-range-planner"
    ],
    "icon": "code"
  },
  {
    "id": "networking-6",
    "slug": "networking-builder",
    "title": "Networking Builder",
    "name": "Networking Builder",
    "href": "/tools/networking-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Networking Builder locally in your browser.",
    "seo": {
      "title": "Networking Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Networking Builder locally in your browser.",
      "keywords": [
        "networking builder",
        "networking",
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
      "networking",
      "generator",
      "networking-builder"
    ],
    "icon": "code"
  },
  {
    "id": "networking-7",
    "slug": "networking-estimator",
    "title": "Networking Estimator",
    "name": "Networking Estimator",
    "href": "/tools/networking-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Networking Estimator locally in your browser.",
    "seo": {
      "title": "Networking Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Networking Estimator locally in your browser.",
      "keywords": [
        "networking estimator",
        "networking",
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
      "networking",
      "calculator",
      "networking-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "networking-8",
    "slug": "networking-checker",
    "title": "Networking Checker",
    "name": "Networking Checker",
    "href": "/tools/networking-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Networking Checker locally in your browser.",
    "seo": {
      "title": "Networking Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Networking Checker locally in your browser.",
      "keywords": [
        "networking checker",
        "networking",
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
      "networking",
      "analyzer",
      "networking-checker"
    ],
    "icon": "code"
  },
  {
    "id": "networking-9",
    "slug": "networking-cleaner",
    "title": "Networking Cleaner",
    "name": "Networking Cleaner",
    "href": "/tools/networking-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Networking Cleaner locally in your browser.",
    "seo": {
      "title": "Networking Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Networking Cleaner locally in your browser.",
      "keywords": [
        "networking cleaner",
        "networking",
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
      "networking",
      "transform",
      "networking-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "networking-10",
    "slug": "networking-template-maker",
    "title": "Networking Template Maker",
    "name": "Networking Template Maker",
    "href": "/tools/networking-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Networking Template Maker locally in your browser.",
    "seo": {
      "title": "Networking Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Networking Template Maker locally in your browser.",
      "keywords": [
        "networking template maker",
        "networking",
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
      "networking",
      "generator",
      "networking-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "networking-11",
    "slug": "networking-planner",
    "title": "Networking Planner",
    "name": "Networking Planner",
    "href": "/tools/networking-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Networking Planner locally in your browser.",
    "seo": {
      "title": "Networking Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Networking Planner locally in your browser.",
      "keywords": [
        "networking planner",
        "networking",
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
      "networking",
      "calculator",
      "networking-planner"
    ],
    "icon": "code"
  },
  {
    "id": "networking-12",
    "slug": "networking-inspector",
    "title": "Networking Inspector",
    "name": "Networking Inspector",
    "href": "/tools/networking-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Networking",
    "categorySlug": "networking",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Networking Inspector locally in your browser.",
    "seo": {
      "title": "Networking Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Networking Inspector locally in your browser.",
      "keywords": [
        "networking inspector",
        "networking",
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
      "networking",
      "analyzer",
      "networking-inspector"
    ],
    "icon": "code"
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
      "cron-next-run-viewer",
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
    "id": "devops-4",
    "slug": "kubernetes-resource-calculator",
    "title": "Kubernetes resource calculator",
    "name": "Kubernetes resource calculator",
    "href": "/tools/kubernetes-resource-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "analyzer",
    "description": "Kubernetes resource calculator. Use this privacy-first kubernetes resource calculator directly in your browser.",
    "seo": {
      "title": "Kubernetes resource calculator - Free Browser Tool | Nadhebe",
      "description": "Kubernetes resource calculator. Use this privacy-first kubernetes resource calculator directly in your browser.",
      "keywords": [
        "kubernetes resource calculator",
        "devops",
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
      "devops",
      "analyzer",
      "kubernetes-resource-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "devops-5",
    "slug": "log-formatter",
    "title": "Log formatter",
    "name": "Log formatter",
    "href": "/tools/log-formatter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "transform",
    "description": "Log formatter. Use this privacy-first log formatter directly in your browser.",
    "seo": {
      "title": "Log formatter - Free Browser Tool | Nadhebe",
      "description": "Log formatter. Use this privacy-first log formatter directly in your browser.",
      "keywords": [
        "log formatter",
        "devops",
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
      "devops",
      "transform",
      "log-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "devops-6",
    "slug": "devops-builder",
    "title": "DevOps Builder",
    "name": "DevOps Builder",
    "href": "/tools/devops-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "generator",
    "description": "Clean, normalize, and calculate DevOps Builder locally in your browser.",
    "seo": {
      "title": "DevOps Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate DevOps Builder locally in your browser.",
      "keywords": [
        "devops builder",
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
      "devops-builder"
    ],
    "icon": "code"
  },
  {
    "id": "devops-7",
    "slug": "devops-estimator",
    "title": "DevOps Estimator",
    "name": "DevOps Estimator",
    "href": "/tools/devops-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate DevOps Estimator locally in your browser.",
    "seo": {
      "title": "DevOps Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate DevOps Estimator locally in your browser.",
      "keywords": [
        "devops estimator",
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
      "devops-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "devops-8",
    "slug": "devops-checker",
    "title": "DevOps Checker",
    "name": "DevOps Checker",
    "href": "/tools/devops-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate DevOps Checker locally in your browser.",
    "seo": {
      "title": "DevOps Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate DevOps Checker locally in your browser.",
      "keywords": [
        "devops checker",
        "devops",
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
      "devops",
      "analyzer",
      "devops-checker"
    ],
    "icon": "code"
  },
  {
    "id": "devops-9",
    "slug": "devops-cleaner",
    "title": "DevOps Cleaner",
    "name": "DevOps Cleaner",
    "href": "/tools/devops-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "transform",
    "description": "Clean, normalize, and calculate DevOps Cleaner locally in your browser.",
    "seo": {
      "title": "DevOps Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate DevOps Cleaner locally in your browser.",
      "keywords": [
        "devops cleaner",
        "devops",
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
      "devops",
      "transform",
      "devops-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "devops-10",
    "slug": "devops-template-maker",
    "title": "DevOps Template Maker",
    "name": "DevOps Template Maker",
    "href": "/tools/devops-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "generator",
    "description": "Clean, normalize, and calculate DevOps Template Maker locally in your browser.",
    "seo": {
      "title": "DevOps Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate DevOps Template Maker locally in your browser.",
      "keywords": [
        "devops template maker",
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
      "devops-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "devops-11",
    "slug": "devops-planner",
    "title": "DevOps Planner",
    "name": "DevOps Planner",
    "href": "/tools/devops-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate DevOps Planner locally in your browser.",
    "seo": {
      "title": "DevOps Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate DevOps Planner locally in your browser.",
      "keywords": [
        "devops planner",
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
      "devops-planner"
    ],
    "icon": "code"
  },
  {
    "id": "devops-12",
    "slug": "devops-inspector",
    "title": "DevOps Inspector",
    "name": "DevOps Inspector",
    "href": "/tools/devops-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "DevOps",
    "categorySlug": "devops",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate DevOps Inspector locally in your browser.",
    "seo": {
      "title": "DevOps Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate DevOps Inspector locally in your browser.",
      "keywords": [
        "devops inspector",
        "devops",
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
      "devops",
      "analyzer",
      "devops-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-1",
    "slug": "bandwidth-cost-estimator",
    "title": "Bandwidth cost estimator",
    "name": "Bandwidth cost estimator",
    "href": "/tools/bandwidth-cost-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "transform",
    "description": "Bandwidth cost estimator. Use this privacy-first bandwidth cost estimator directly in your browser.",
    "seo": {
      "title": "Bandwidth cost estimator - Free Browser Tool | Nadhebe",
      "description": "Bandwidth cost estimator. Use this privacy-first bandwidth cost estimator directly in your browser.",
      "keywords": [
        "bandwidth cost estimator",
        "cloud",
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
      "cloud",
      "transform",
      "bandwidth-cost-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-2",
    "slug": "s3-policy-helper",
    "title": "S3 policy helper",
    "name": "S3 policy helper",
    "href": "/tools/s3-policy-helper/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "generator",
    "description": "S3 policy helper. Use this privacy-first s3 policy helper directly in your browser.",
    "seo": {
      "title": "S3 policy helper - Free Browser Tool | Nadhebe",
      "description": "S3 policy helper. Use this privacy-first s3 policy helper directly in your browser.",
      "keywords": [
        "s3 policy helper",
        "cloud",
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
      "cloud",
      "generator",
      "s3-policy-helper"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-3",
    "slug": "region-latency-planner",
    "title": "Region latency planner",
    "name": "Region latency planner",
    "href": "/tools/region-latency-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "calculator",
    "description": "Region latency planner. Use this privacy-first region latency planner directly in your browser.",
    "seo": {
      "title": "Region latency planner - Free Browser Tool | Nadhebe",
      "description": "Region latency planner. Use this privacy-first region latency planner directly in your browser.",
      "keywords": [
        "region latency planner",
        "cloud",
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
      "cloud",
      "calculator",
      "region-latency-planner"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-4",
    "slug": "instance-comparer",
    "title": "Instance comparer",
    "name": "Instance comparer",
    "href": "/tools/instance-comparer/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "analyzer",
    "description": "Instance comparer. Use this privacy-first instance comparer directly in your browser.",
    "seo": {
      "title": "Instance comparer - Free Browser Tool | Nadhebe",
      "description": "Instance comparer. Use this privacy-first instance comparer directly in your browser.",
      "keywords": [
        "instance comparer",
        "cloud",
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
      "cloud",
      "analyzer",
      "instance-comparer"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-5",
    "slug": "cloud-egress-calculator",
    "title": "Cloud egress calculator",
    "name": "Cloud egress calculator",
    "href": "/tools/cloud-egress-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "transform",
    "description": "Cloud egress calculator. Use this privacy-first cloud egress calculator directly in your browser.",
    "seo": {
      "title": "Cloud egress calculator - Free Browser Tool | Nadhebe",
      "description": "Cloud egress calculator. Use this privacy-first cloud egress calculator directly in your browser.",
      "keywords": [
        "cloud egress calculator",
        "cloud",
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
      "cloud",
      "transform",
      "cloud-egress-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-6",
    "slug": "cloud-builder",
    "title": "Cloud Builder",
    "name": "Cloud Builder",
    "href": "/tools/cloud-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Cloud Builder locally in your browser.",
    "seo": {
      "title": "Cloud Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Cloud Builder locally in your browser.",
      "keywords": [
        "cloud builder",
        "cloud",
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
      "cloud",
      "generator",
      "cloud-builder"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-7",
    "slug": "cloud-estimator",
    "title": "Cloud Estimator",
    "name": "Cloud Estimator",
    "href": "/tools/cloud-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Cloud Estimator locally in your browser.",
    "seo": {
      "title": "Cloud Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Cloud Estimator locally in your browser.",
      "keywords": [
        "cloud estimator",
        "cloud",
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
      "cloud",
      "calculator",
      "cloud-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-8",
    "slug": "cloud-checker",
    "title": "Cloud Checker",
    "name": "Cloud Checker",
    "href": "/tools/cloud-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Cloud Checker locally in your browser.",
    "seo": {
      "title": "Cloud Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Cloud Checker locally in your browser.",
      "keywords": [
        "cloud checker",
        "cloud",
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
      "cloud",
      "analyzer",
      "cloud-checker"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-9",
    "slug": "cloud-cleaner",
    "title": "Cloud Cleaner",
    "name": "Cloud Cleaner",
    "href": "/tools/cloud-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Cloud Cleaner locally in your browser.",
    "seo": {
      "title": "Cloud Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Cloud Cleaner locally in your browser.",
      "keywords": [
        "cloud cleaner",
        "cloud",
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
      "cloud",
      "transform",
      "cloud-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-10",
    "slug": "cloud-template-maker",
    "title": "Cloud Template Maker",
    "name": "Cloud Template Maker",
    "href": "/tools/cloud-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Cloud Template Maker locally in your browser.",
    "seo": {
      "title": "Cloud Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Cloud Template Maker locally in your browser.",
      "keywords": [
        "cloud template maker",
        "cloud",
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
      "cloud",
      "generator",
      "cloud-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-11",
    "slug": "cloud-planner",
    "title": "Cloud Planner",
    "name": "Cloud Planner",
    "href": "/tools/cloud-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Cloud Planner locally in your browser.",
    "seo": {
      "title": "Cloud Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Cloud Planner locally in your browser.",
      "keywords": [
        "cloud planner",
        "cloud",
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
      "cloud",
      "calculator",
      "cloud-planner"
    ],
    "icon": "code"
  },
  {
    "id": "cloud-12",
    "slug": "cloud-inspector",
    "title": "Cloud Inspector",
    "name": "Cloud Inspector",
    "href": "/tools/cloud-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Cloud",
    "categorySlug": "cloud",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Cloud Inspector locally in your browser.",
    "seo": {
      "title": "Cloud Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Cloud Inspector locally in your browser.",
      "keywords": [
        "cloud inspector",
        "cloud",
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
      "cloud",
      "analyzer",
      "cloud-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "git-1",
    "slug": "commit-message-builder",
    "title": "Commit message builder",
    "name": "Commit message builder",
    "href": "/tools/commit-message-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Git",
    "categorySlug": "git",
    "mode": "transform",
    "description": "Commit message builder. Use this privacy-first commit message builder directly in your browser.",
    "seo": {
      "title": "Commit message builder - Free Browser Tool | Nadhebe",
      "description": "Commit message builder. Use this privacy-first commit message builder directly in your browser.",
      "keywords": [
        "commit message builder",
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
      "commit-message-builder"
    ],
    "icon": "code"
  },
  {
    "id": "git-2",
    "slug": "patch-viewer",
    "title": "Patch viewer",
    "name": "Patch viewer",
    "href": "/tools/patch-viewer/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Git",
    "categorySlug": "git",
    "mode": "generator",
    "description": "Patch viewer. Use this privacy-first patch viewer directly in your browser.",
    "seo": {
      "title": "Patch viewer - Free Browser Tool | Nadhebe",
      "description": "Patch viewer. Use this privacy-first patch viewer directly in your browser.",
      "keywords": [
        "patch viewer",
        "git",
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
      "git",
      "generator",
      "patch-viewer"
    ],
    "icon": "code"
  },
  {
    "id": "git-3",
    "slug": "gitignore-generator",
    "title": "Gitignore generator",
    "name": "Gitignore generator",
    "href": "/tools/gitignore-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Git",
    "categorySlug": "git",
    "mode": "calculator",
    "description": "Gitignore generator. Use this privacy-first gitignore generator directly in your browser.",
    "seo": {
      "title": "Gitignore generator - Free Browser Tool | Nadhebe",
      "description": "Gitignore generator. Use this privacy-first gitignore generator directly in your browser.",
      "keywords": [
        "gitignore generator",
        "git",
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
      "git",
      "calculator",
      "gitignore-generator"
    ],
    "icon": "code"
  },
  {
    "id": "git-4",
    "slug": "semver-helper",
    "title": "Semver helper",
    "name": "Semver helper",
    "href": "/tools/semver-helper/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Git",
    "categorySlug": "git",
    "mode": "analyzer",
    "description": "Semver helper. Use this privacy-first semver helper directly in your browser.",
    "seo": {
      "title": "Semver helper - Free Browser Tool | Nadhebe",
      "description": "Semver helper. Use this privacy-first semver helper directly in your browser.",
      "keywords": [
        "semver helper",
        "git",
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
      "git",
      "analyzer",
      "semver-helper"
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
    "id": "git-6",
    "slug": "git-builder",
    "title": "Git Builder",
    "name": "Git Builder",
    "href": "/tools/git-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Git",
    "categorySlug": "git",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Git Builder locally in your browser.",
    "seo": {
      "title": "Git Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Git Builder locally in your browser.",
      "keywords": [
        "git builder",
        "git",
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
      "git",
      "generator",
      "git-builder"
    ],
    "icon": "code"
  },
  {
    "id": "git-7",
    "slug": "git-estimator",
    "title": "Git Estimator",
    "name": "Git Estimator",
    "href": "/tools/git-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Git",
    "categorySlug": "git",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Git Estimator locally in your browser.",
    "seo": {
      "title": "Git Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Git Estimator locally in your browser.",
      "keywords": [
        "git estimator",
        "git",
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
      "git",
      "calculator",
      "git-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "git-8",
    "slug": "git-checker",
    "title": "Git Checker",
    "name": "Git Checker",
    "href": "/tools/git-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Git",
    "categorySlug": "git",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Git Checker locally in your browser.",
    "seo": {
      "title": "Git Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Git Checker locally in your browser.",
      "keywords": [
        "git checker",
        "git",
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
      "git",
      "analyzer",
      "git-checker"
    ],
    "icon": "code"
  },
  {
    "id": "git-9",
    "slug": "git-cleaner",
    "title": "Git Cleaner",
    "name": "Git Cleaner",
    "href": "/tools/git-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Git",
    "categorySlug": "git",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Git Cleaner locally in your browser.",
    "seo": {
      "title": "Git Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Git Cleaner locally in your browser.",
      "keywords": [
        "git cleaner",
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
      "git-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "git-10",
    "slug": "git-template-maker",
    "title": "Git Template Maker",
    "name": "Git Template Maker",
    "href": "/tools/git-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Git",
    "categorySlug": "git",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Git Template Maker locally in your browser.",
    "seo": {
      "title": "Git Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Git Template Maker locally in your browser.",
      "keywords": [
        "git template maker",
        "git",
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
      "git",
      "generator",
      "git-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "git-11",
    "slug": "git-planner",
    "title": "Git Planner",
    "name": "Git Planner",
    "href": "/tools/git-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Git",
    "categorySlug": "git",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Git Planner locally in your browser.",
    "seo": {
      "title": "Git Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Git Planner locally in your browser.",
      "keywords": [
        "git planner",
        "git",
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
      "git",
      "calculator",
      "git-planner"
    ],
    "icon": "code"
  },
  {
    "id": "git-12",
    "slug": "git-inspector",
    "title": "Git Inspector",
    "name": "Git Inspector",
    "href": "/tools/git-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Git",
    "categorySlug": "git",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Git Inspector locally in your browser.",
    "seo": {
      "title": "Git Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Git Inspector locally in your browser.",
      "keywords": [
        "git inspector",
        "git",
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
      "git",
      "analyzer",
      "git-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "database-1",
    "slug": "sql-formatter",
    "title": "SQL formatter",
    "name": "SQL formatter",
    "href": "/tools/sql-formatter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "transform",
    "description": "SQL formatter. Use this privacy-first sql formatter directly in your browser.",
    "seo": {
      "title": "SQL formatter - Free Browser Tool | Nadhebe",
      "description": "SQL formatter. Use this privacy-first sql formatter directly in your browser.",
      "keywords": [
        "sql formatter",
        "database",
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
      "database",
      "transform",
      "sql-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "database-2",
    "slug": "index-planner",
    "title": "Index planner",
    "name": "Index planner",
    "href": "/tools/index-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "generator",
    "description": "Index planner. Use this privacy-first index planner directly in your browser.",
    "seo": {
      "title": "Index planner - Free Browser Tool | Nadhebe",
      "description": "Index planner. Use this privacy-first index planner directly in your browser.",
      "keywords": [
        "index planner",
        "database",
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
      "database",
      "generator",
      "index-planner"
    ],
    "icon": "code"
  },
  {
    "id": "database-3",
    "slug": "erd-helper",
    "title": "ERD helper",
    "name": "ERD helper",
    "href": "/tools/erd-helper/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "calculator",
    "description": "ERD helper. Use this privacy-first erd helper directly in your browser.",
    "seo": {
      "title": "ERD helper - Free Browser Tool | Nadhebe",
      "description": "ERD helper. Use this privacy-first erd helper directly in your browser.",
      "keywords": [
        "erd helper",
        "database",
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
      "database",
      "calculator",
      "erd-helper"
    ],
    "icon": "code"
  },
  {
    "id": "database-4",
    "slug": "migration-diff",
    "title": "Migration diff",
    "name": "Migration diff",
    "href": "/tools/migration-diff/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "analyzer",
    "description": "Migration diff. Use this privacy-first migration diff directly in your browser.",
    "seo": {
      "title": "Migration diff - Free Browser Tool | Nadhebe",
      "description": "Migration diff. Use this privacy-first migration diff directly in your browser.",
      "keywords": [
        "migration diff",
        "database",
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
      "database",
      "analyzer",
      "migration-diff"
    ],
    "icon": "code"
  },
  {
    "id": "database-5",
    "slug": "query-parameterizer",
    "title": "Query parameterizer",
    "name": "Query parameterizer",
    "href": "/tools/query-parameterizer/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "transform",
    "description": "Query parameterizer. Use this privacy-first query parameterizer directly in your browser.",
    "seo": {
      "title": "Query parameterizer - Free Browser Tool | Nadhebe",
      "description": "Query parameterizer. Use this privacy-first query parameterizer directly in your browser.",
      "keywords": [
        "query parameterizer",
        "database",
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
      "database",
      "transform",
      "query-parameterizer"
    ],
    "icon": "code"
  },
  {
    "id": "database-6",
    "slug": "database-builder",
    "title": "Database Builder",
    "name": "Database Builder",
    "href": "/tools/database-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Database Builder locally in your browser.",
    "seo": {
      "title": "Database Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Database Builder locally in your browser.",
      "keywords": [
        "database builder",
        "database",
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
      "database",
      "generator",
      "database-builder"
    ],
    "icon": "code"
  },
  {
    "id": "database-7",
    "slug": "database-estimator",
    "title": "Database Estimator",
    "name": "Database Estimator",
    "href": "/tools/database-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Database Estimator locally in your browser.",
    "seo": {
      "title": "Database Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Database Estimator locally in your browser.",
      "keywords": [
        "database estimator",
        "database",
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
      "database",
      "calculator",
      "database-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "database-8",
    "slug": "database-checker",
    "title": "Database Checker",
    "name": "Database Checker",
    "href": "/tools/database-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Database Checker locally in your browser.",
    "seo": {
      "title": "Database Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Database Checker locally in your browser.",
      "keywords": [
        "database checker",
        "database",
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
      "database",
      "analyzer",
      "database-checker"
    ],
    "icon": "code"
  },
  {
    "id": "database-9",
    "slug": "database-cleaner",
    "title": "Database Cleaner",
    "name": "Database Cleaner",
    "href": "/tools/database-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Database Cleaner locally in your browser.",
    "seo": {
      "title": "Database Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Database Cleaner locally in your browser.",
      "keywords": [
        "database cleaner",
        "database",
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
      "database",
      "transform",
      "database-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "database-10",
    "slug": "database-template-maker",
    "title": "Database Template Maker",
    "name": "Database Template Maker",
    "href": "/tools/database-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Database Template Maker locally in your browser.",
    "seo": {
      "title": "Database Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Database Template Maker locally in your browser.",
      "keywords": [
        "database template maker",
        "database",
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
      "database",
      "generator",
      "database-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "database-11",
    "slug": "database-planner",
    "title": "Database Planner",
    "name": "Database Planner",
    "href": "/tools/database-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Database Planner locally in your browser.",
    "seo": {
      "title": "Database Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Database Planner locally in your browser.",
      "keywords": [
        "database planner",
        "database",
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
      "database",
      "calculator",
      "database-planner"
    ],
    "icon": "code"
  },
  {
    "id": "database-12",
    "slug": "database-inspector",
    "title": "Database Inspector",
    "name": "Database Inspector",
    "href": "/tools/database-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Database",
    "categorySlug": "database",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Database Inspector locally in your browser.",
    "seo": {
      "title": "Database Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Database Inspector locally in your browser.",
      "keywords": [
        "database inspector",
        "database",
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
      "database",
      "analyzer",
      "database-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "finance-1",
    "slug": "mrr-calculator",
    "title": "MRR calculator",
    "name": "MRR calculator",
    "href": "/tools/mrr-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "transform",
    "description": "MRR calculator. Use this privacy-first mrr calculator directly in your browser.",
    "seo": {
      "title": "MRR calculator - Free Browser Tool | Nadhebe",
      "description": "MRR calculator. Use this privacy-first mrr calculator directly in your browser.",
      "keywords": [
        "mrr calculator",
        "finance",
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
      "finance",
      "transform",
      "mrr-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "finance-2",
    "slug": "ltv-calculator",
    "title": "LTV calculator",
    "name": "LTV calculator",
    "href": "/tools/ltv-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "generator",
    "description": "LTV calculator. Use this privacy-first ltv calculator directly in your browser.",
    "seo": {
      "title": "LTV calculator - Free Browser Tool | Nadhebe",
      "description": "LTV calculator. Use this privacy-first ltv calculator directly in your browser.",
      "keywords": [
        "ltv calculator",
        "finance",
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
      "finance",
      "generator",
      "ltv-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "finance-3",
    "slug": "fee-calculator",
    "title": "Fee calculator",
    "name": "Fee calculator",
    "href": "/tools/fee-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "calculator",
    "description": "Fee calculator. Use this privacy-first fee calculator directly in your browser.",
    "seo": {
      "title": "Fee calculator - Free Browser Tool | Nadhebe",
      "description": "Fee calculator. Use this privacy-first fee calculator directly in your browser.",
      "keywords": [
        "fee calculator",
        "finance",
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
      "finance",
      "calculator",
      "fee-calculator"
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
    "id": "finance-5",
    "slug": "break-even-planner",
    "title": "Break-even planner",
    "name": "Break-even planner",
    "href": "/tools/break-even-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "transform",
    "description": "Break-even planner. Use this privacy-first break-even planner directly in your browser.",
    "seo": {
      "title": "Break-even planner - Free Browser Tool | Nadhebe",
      "description": "Break-even planner. Use this privacy-first break-even planner directly in your browser.",
      "keywords": [
        "break even planner",
        "finance",
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
      "finance",
      "transform",
      "break-even-planner"
    ],
    "icon": "code"
  },
  {
    "id": "finance-6",
    "slug": "finance-builder",
    "title": "Finance Builder",
    "name": "Finance Builder",
    "href": "/tools/finance-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Finance Builder locally in your browser.",
    "seo": {
      "title": "Finance Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Finance Builder locally in your browser.",
      "keywords": [
        "finance builder",
        "finance",
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
      "finance",
      "generator",
      "finance-builder"
    ],
    "icon": "code"
  },
  {
    "id": "finance-7",
    "slug": "finance-estimator",
    "title": "Finance Estimator",
    "name": "Finance Estimator",
    "href": "/tools/finance-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Finance Estimator locally in your browser.",
    "seo": {
      "title": "Finance Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Finance Estimator locally in your browser.",
      "keywords": [
        "finance estimator",
        "finance",
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
      "finance",
      "calculator",
      "finance-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "finance-8",
    "slug": "finance-checker",
    "title": "Finance Checker",
    "name": "Finance Checker",
    "href": "/tools/finance-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Finance Checker locally in your browser.",
    "seo": {
      "title": "Finance Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Finance Checker locally in your browser.",
      "keywords": [
        "finance checker",
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
      "finance-checker"
    ],
    "icon": "code"
  },
  {
    "id": "finance-9",
    "slug": "finance-cleaner",
    "title": "Finance Cleaner",
    "name": "Finance Cleaner",
    "href": "/tools/finance-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Finance Cleaner locally in your browser.",
    "seo": {
      "title": "Finance Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Finance Cleaner locally in your browser.",
      "keywords": [
        "finance cleaner",
        "finance",
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
      "finance",
      "transform",
      "finance-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "finance-10",
    "slug": "finance-template-maker",
    "title": "Finance Template Maker",
    "name": "Finance Template Maker",
    "href": "/tools/finance-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Finance Template Maker locally in your browser.",
    "seo": {
      "title": "Finance Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Finance Template Maker locally in your browser.",
      "keywords": [
        "finance template maker",
        "finance",
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
      "finance",
      "generator",
      "finance-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "finance-11",
    "slug": "finance-planner",
    "title": "Finance Planner",
    "name": "Finance Planner",
    "href": "/tools/finance-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Finance Planner locally in your browser.",
    "seo": {
      "title": "Finance Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Finance Planner locally in your browser.",
      "keywords": [
        "finance planner",
        "finance",
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
      "finance",
      "calculator",
      "finance-planner"
    ],
    "icon": "code"
  },
  {
    "id": "finance-12",
    "slug": "finance-inspector",
    "title": "Finance Inspector",
    "name": "Finance Inspector",
    "href": "/tools/finance-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Finance",
    "categorySlug": "finance",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Finance Inspector locally in your browser.",
    "seo": {
      "title": "Finance Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Finance Inspector locally in your browser.",
      "keywords": [
        "finance inspector",
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
      "finance-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "calculators-1",
    "slug": "percentage-change",
    "title": "Percentage change",
    "name": "Percentage change",
    "href": "/tools/percentage-change/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "transform",
    "description": "Percentage change. Use this privacy-first percentage change directly in your browser.",
    "seo": {
      "title": "Percentage change - Free Browser Tool | Nadhebe",
      "description": "Percentage change. Use this privacy-first percentage change directly in your browser.",
      "keywords": [
        "percentage change",
        "calculators",
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
      "calculators",
      "transform",
      "percentage-change"
    ],
    "icon": "code"
  },
  {
    "id": "calculators-2",
    "slug": "ratio-simplifier",
    "title": "Ratio simplifier",
    "name": "Ratio simplifier",
    "href": "/tools/ratio-simplifier/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "generator",
    "description": "Ratio simplifier. Use this privacy-first ratio simplifier directly in your browser.",
    "seo": {
      "title": "Ratio simplifier - Free Browser Tool | Nadhebe",
      "description": "Ratio simplifier. Use this privacy-first ratio simplifier directly in your browser.",
      "keywords": [
        "ratio simplifier",
        "calculators",
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
      "calculators",
      "generator",
      "ratio-simplifier"
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
    "id": "calculators-4",
    "slug": "triangle-solver",
    "title": "Triangle solver",
    "name": "Triangle solver",
    "href": "/tools/triangle-solver/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "analyzer",
    "description": "Triangle solver. Use this privacy-first triangle solver directly in your browser.",
    "seo": {
      "title": "Triangle solver - Free Browser Tool | Nadhebe",
      "description": "Triangle solver. Use this privacy-first triangle solver directly in your browser.",
      "keywords": [
        "triangle solver",
        "calculators",
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
      "calculators",
      "analyzer",
      "triangle-solver"
    ],
    "icon": "code"
  },
  {
    "id": "calculators-5",
    "slug": "rule-of-three",
    "title": "Rule of three",
    "name": "Rule of three",
    "href": "/tools/rule-of-three/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "transform",
    "description": "Rule of three. Use this privacy-first rule of three directly in your browser.",
    "seo": {
      "title": "Rule of three - Free Browser Tool | Nadhebe",
      "description": "Rule of three. Use this privacy-first rule of three directly in your browser.",
      "keywords": [
        "rule of three",
        "calculators",
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
      "calculators",
      "transform",
      "rule-of-three"
    ],
    "icon": "code"
  },
  {
    "id": "calculators-6",
    "slug": "calculators-builder",
    "title": "Calculators Builder",
    "name": "Calculators Builder",
    "href": "/tools/calculators-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Calculators Builder locally in your browser.",
    "seo": {
      "title": "Calculators Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Calculators Builder locally in your browser.",
      "keywords": [
        "calculators builder",
        "calculators",
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
      "calculators",
      "generator",
      "calculators-builder"
    ],
    "icon": "code"
  },
  {
    "id": "calculators-7",
    "slug": "calculators-estimator",
    "title": "Calculators Estimator",
    "name": "Calculators Estimator",
    "href": "/tools/calculators-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Calculators Estimator locally in your browser.",
    "seo": {
      "title": "Calculators Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Calculators Estimator locally in your browser.",
      "keywords": [
        "calculators estimator",
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
      "calculators-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "calculators-8",
    "slug": "calculators-checker",
    "title": "Calculators Checker",
    "name": "Calculators Checker",
    "href": "/tools/calculators-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Calculators Checker locally in your browser.",
    "seo": {
      "title": "Calculators Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Calculators Checker locally in your browser.",
      "keywords": [
        "calculators checker",
        "calculators",
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
      "calculators",
      "analyzer",
      "calculators-checker"
    ],
    "icon": "code"
  },
  {
    "id": "calculators-9",
    "slug": "calculators-cleaner",
    "title": "Calculators Cleaner",
    "name": "Calculators Cleaner",
    "href": "/tools/calculators-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Calculators Cleaner locally in your browser.",
    "seo": {
      "title": "Calculators Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Calculators Cleaner locally in your browser.",
      "keywords": [
        "calculators cleaner",
        "calculators",
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
      "calculators",
      "transform",
      "calculators-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "calculators-10",
    "slug": "calculators-template-maker",
    "title": "Calculators Template Maker",
    "name": "Calculators Template Maker",
    "href": "/tools/calculators-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Calculators Template Maker locally in your browser.",
    "seo": {
      "title": "Calculators Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Calculators Template Maker locally in your browser.",
      "keywords": [
        "calculators template maker",
        "calculators",
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
      "calculators",
      "generator",
      "calculators-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "calculators-11",
    "slug": "calculators-planner",
    "title": "Calculators Planner",
    "name": "Calculators Planner",
    "href": "/tools/calculators-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Calculators Planner locally in your browser.",
    "seo": {
      "title": "Calculators Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Calculators Planner locally in your browser.",
      "keywords": [
        "calculators planner",
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
      "calculators-planner"
    ],
    "icon": "code"
  },
  {
    "id": "calculators-12",
    "slug": "calculators-inspector",
    "title": "Calculators Inspector",
    "name": "Calculators Inspector",
    "href": "/tools/calculators-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Calculators",
    "categorySlug": "calculators",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Calculators Inspector locally in your browser.",
    "seo": {
      "title": "Calculators Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Calculators Inspector locally in your browser.",
      "keywords": [
        "calculators inspector",
        "calculators",
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
      "calculators",
      "analyzer",
      "calculators-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-1",
    "slug": "length-converter",
    "title": "Length converter",
    "name": "Length converter",
    "href": "/tools/length-converter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "transform",
    "description": "Length converter. Use this privacy-first length converter directly in your browser.",
    "seo": {
      "title": "Length converter - Free Browser Tool | Nadhebe",
      "description": "Length converter. Use this privacy-first length converter directly in your browser.",
      "keywords": [
        "length converter",
        "unit conversion",
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
      "unit conversion",
      "transform",
      "length-converter"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-2",
    "slug": "temperature-converter",
    "title": "Temperature converter",
    "name": "Temperature converter",
    "href": "/tools/temperature-converter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "generator",
    "description": "Temperature converter. Use this privacy-first temperature converter directly in your browser.",
    "seo": {
      "title": "Temperature converter - Free Browser Tool | Nadhebe",
      "description": "Temperature converter. Use this privacy-first temperature converter directly in your browser.",
      "keywords": [
        "temperature converter",
        "unit conversion",
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
      "unit conversion",
      "generator",
      "temperature-converter"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-3",
    "slug": "area-converter",
    "title": "Area converter",
    "name": "Area converter",
    "href": "/tools/area-converter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "calculator",
    "description": "Area converter. Use this privacy-first area converter directly in your browser.",
    "seo": {
      "title": "Area converter - Free Browser Tool | Nadhebe",
      "description": "Area converter. Use this privacy-first area converter directly in your browser.",
      "keywords": [
        "area converter",
        "unit conversion",
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
      "unit conversion",
      "calculator",
      "area-converter"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-4",
    "slug": "speed-converter",
    "title": "Speed converter",
    "name": "Speed converter",
    "href": "/tools/speed-converter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "analyzer",
    "description": "Speed converter. Use this privacy-first speed converter directly in your browser.",
    "seo": {
      "title": "Speed converter - Free Browser Tool | Nadhebe",
      "description": "Speed converter. Use this privacy-first speed converter directly in your browser.",
      "keywords": [
        "speed converter",
        "unit conversion",
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
      "unit conversion",
      "analyzer",
      "speed-converter"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-5",
    "slug": "energy-converter",
    "title": "Energy converter",
    "name": "Energy converter",
    "href": "/tools/energy-converter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "transform",
    "description": "Energy converter. Use this privacy-first energy converter directly in your browser.",
    "seo": {
      "title": "Energy converter - Free Browser Tool | Nadhebe",
      "description": "Energy converter. Use this privacy-first energy converter directly in your browser.",
      "keywords": [
        "energy converter",
        "unit conversion",
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
      "unit conversion",
      "transform",
      "energy-converter"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-6",
    "slug": "unit-conversion-builder",
    "title": "Unit Conversion Builder",
    "name": "Unit Conversion Builder",
    "href": "/tools/unit-conversion-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Unit Conversion Builder locally in your browser.",
    "seo": {
      "title": "Unit Conversion Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Unit Conversion Builder locally in your browser.",
      "keywords": [
        "unit conversion builder",
        "unit conversion",
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
      "unit conversion",
      "generator",
      "unit-conversion-builder"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-7",
    "slug": "unit-conversion-estimator",
    "title": "Unit Conversion Estimator",
    "name": "Unit Conversion Estimator",
    "href": "/tools/unit-conversion-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Unit Conversion Estimator locally in your browser.",
    "seo": {
      "title": "Unit Conversion Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Unit Conversion Estimator locally in your browser.",
      "keywords": [
        "unit conversion estimator",
        "unit conversion",
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
      "unit conversion",
      "calculator",
      "unit-conversion-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-8",
    "slug": "unit-conversion-checker",
    "title": "Unit Conversion Checker",
    "name": "Unit Conversion Checker",
    "href": "/tools/unit-conversion-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Unit Conversion Checker locally in your browser.",
    "seo": {
      "title": "Unit Conversion Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Unit Conversion Checker locally in your browser.",
      "keywords": [
        "unit conversion checker",
        "unit conversion",
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
      "unit conversion",
      "analyzer",
      "unit-conversion-checker"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-9",
    "slug": "unit-conversion-cleaner",
    "title": "Unit Conversion Cleaner",
    "name": "Unit Conversion Cleaner",
    "href": "/tools/unit-conversion-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Unit Conversion Cleaner locally in your browser.",
    "seo": {
      "title": "Unit Conversion Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Unit Conversion Cleaner locally in your browser.",
      "keywords": [
        "unit conversion cleaner",
        "unit conversion",
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
      "unit conversion",
      "transform",
      "unit-conversion-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-10",
    "slug": "unit-conversion-template-maker",
    "title": "Unit Conversion Template Maker",
    "name": "Unit Conversion Template Maker",
    "href": "/tools/unit-conversion-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Unit Conversion Template Maker locally in your browser.",
    "seo": {
      "title": "Unit Conversion Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Unit Conversion Template Maker locally in your browser.",
      "keywords": [
        "unit conversion template maker",
        "unit conversion",
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
      "unit conversion",
      "generator",
      "unit-conversion-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-11",
    "slug": "unit-conversion-planner",
    "title": "Unit Conversion Planner",
    "name": "Unit Conversion Planner",
    "href": "/tools/unit-conversion-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Unit Conversion Planner locally in your browser.",
    "seo": {
      "title": "Unit Conversion Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Unit Conversion Planner locally in your browser.",
      "keywords": [
        "unit conversion planner",
        "unit conversion",
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
      "unit conversion",
      "calculator",
      "unit-conversion-planner"
    ],
    "icon": "code"
  },
  {
    "id": "unit-conversion-12",
    "slug": "unit-conversion-inspector",
    "title": "Unit Conversion Inspector",
    "name": "Unit Conversion Inspector",
    "href": "/tools/unit-conversion-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Unit Conversion",
    "categorySlug": "unit-conversion",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Unit Conversion Inspector locally in your browser.",
    "seo": {
      "title": "Unit Conversion Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Unit Conversion Inspector locally in your browser.",
      "keywords": [
        "unit conversion inspector",
        "unit conversion",
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
      "unit conversion",
      "analyzer",
      "unit-conversion-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "date-time-1",
    "slug": "unix-timestamp-converter",
    "title": "Unix timestamp converter",
    "name": "Unix timestamp converter",
    "href": "/tools/unix-timestamp-converter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "transform",
    "description": "Unix timestamp converter. Use this privacy-first unix timestamp converter directly in your browser.",
    "seo": {
      "title": "Unix timestamp converter - Free Browser Tool | Nadhebe",
      "description": "Unix timestamp converter. Use this privacy-first unix timestamp converter directly in your browser.",
      "keywords": [
        "unix timestamp converter",
        "date & time",
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
      "date & time",
      "transform",
      "unix-timestamp-converter"
    ],
    "icon": "code"
  },
  {
    "id": "date-time-2",
    "slug": "timezone-planner",
    "title": "Timezone planner",
    "name": "Timezone planner",
    "href": "/tools/timezone-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "generator",
    "description": "Timezone planner. Use this privacy-first timezone planner directly in your browser.",
    "seo": {
      "title": "Timezone planner - Free Browser Tool | Nadhebe",
      "description": "Timezone planner. Use this privacy-first timezone planner directly in your browser.",
      "keywords": [
        "timezone planner",
        "date & time",
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
      "date & time",
      "generator",
      "timezone-planner"
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
    "id": "date-time-4",
    "slug": "cron-next-run-viewer",
    "title": "Cron next-run viewer",
    "name": "Cron next-run viewer",
    "href": "/tools/cron-next-run-viewer/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "analyzer",
    "description": "Parse a cron expression and preview its next scheduled run times. Shows a plain-English schedule summary and the next 5 execution times. Runs locally in your browser.",
    "seo": {
      "title": "Cron Next-Run Viewer — Preview Cron Schedule Times | Nadhebe",
      "description": "Paste a cron expression and instantly see a human-readable schedule summary plus the next 5 run times. Free browser tool — no server, no data sent anywhere.",
      "keywords": [
        "cron next run viewer",
        "cron expression parser",
        "cron schedule preview",
        "next cron execution time",
        "cron human readable",
        "cron job scheduler tool",
        "parse cron expression online"
      ]
    },
    "relatedTools": [
      "dockerfile-linter",
      "url-parser",
      "slug-generator",
      "json-formatter"
    ],
    "tags": [
      "date & time",
      "analyzer",
      "cron-next-run-viewer"
    ],
    "icon": "calendar-clock"
  },
  {
    "id": "date-time-5",
    "slug": "iso-date-formatter",
    "title": "ISO date formatter",
    "name": "ISO date formatter",
    "href": "/tools/iso-date-formatter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "transform",
    "description": "ISO date formatter. Use this privacy-first iso date formatter directly in your browser.",
    "seo": {
      "title": "ISO date formatter - Free Browser Tool | Nadhebe",
      "description": "ISO date formatter. Use this privacy-first iso date formatter directly in your browser.",
      "keywords": [
        "iso date formatter",
        "date & time",
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
      "date & time",
      "transform",
      "iso-date-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "date-time-6",
    "slug": "date-and-time-builder",
    "title": "Date and Time Builder",
    "name": "Date and Time Builder",
    "href": "/tools/date-and-time-builder/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Date and Time Builder locally in your browser.",
    "seo": {
      "title": "Date and Time Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Date and Time Builder locally in your browser.",
      "keywords": [
        "date and time builder",
        "date & time",
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
      "date & time",
      "generator",
      "date-and-time-builder"
    ],
    "icon": "code"
  },
  {
    "id": "date-time-7",
    "slug": "date-and-time-estimator",
    "title": "Date and Time Estimator",
    "name": "Date and Time Estimator",
    "href": "/tools/date-and-time-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Date and Time Estimator locally in your browser.",
    "seo": {
      "title": "Date and Time Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Date and Time Estimator locally in your browser.",
      "keywords": [
        "date and time estimator",
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
      "date-and-time-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "date-time-8",
    "slug": "date-and-time-checker",
    "title": "Date and Time Checker",
    "name": "Date and Time Checker",
    "href": "/tools/date-and-time-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Date and Time Checker locally in your browser.",
    "seo": {
      "title": "Date and Time Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Date and Time Checker locally in your browser.",
      "keywords": [
        "date and time checker",
        "date & time",
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
      "date & time",
      "analyzer",
      "date-and-time-checker"
    ],
    "icon": "code"
  },
  {
    "id": "date-time-9",
    "slug": "date-and-time-cleaner",
    "title": "Date and Time Cleaner",
    "name": "Date and Time Cleaner",
    "href": "/tools/date-and-time-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Date and Time Cleaner locally in your browser.",
    "seo": {
      "title": "Date and Time Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Date and Time Cleaner locally in your browser.",
      "keywords": [
        "date and time cleaner",
        "date & time",
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
      "date & time",
      "transform",
      "date-and-time-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "date-time-10",
    "slug": "date-and-time-template-maker",
    "title": "Date and Time Template Maker",
    "name": "Date and Time Template Maker",
    "href": "/tools/date-and-time-template-maker/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Date and Time Template Maker locally in your browser.",
    "seo": {
      "title": "Date and Time Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Date and Time Template Maker locally in your browser.",
      "keywords": [
        "date and time template maker",
        "date & time",
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
      "date & time",
      "generator",
      "date-and-time-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "date-time-11",
    "slug": "date-and-time-planner",
    "title": "Date and Time Planner",
    "name": "Date and Time Planner",
    "href": "/tools/date-and-time-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Date and Time Planner locally in your browser.",
    "seo": {
      "title": "Date and Time Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Date and Time Planner locally in your browser.",
      "keywords": [
        "date and time planner",
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
      "date-and-time-planner"
    ],
    "icon": "code"
  },
  {
    "id": "date-time-12",
    "slug": "date-and-time-inspector",
    "title": "Date and Time Inspector",
    "name": "Date and Time Inspector",
    "href": "/tools/date-and-time-inspector/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Date & Time",
    "categorySlug": "date-time",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Date and Time Inspector locally in your browser.",
    "seo": {
      "title": "Date and Time Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Date and Time Inspector locally in your browser.",
      "keywords": [
        "date and time inspector",
        "date & time",
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
      "date & time",
      "analyzer",
      "date-and-time-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "color-1",
    "slug": "hex-to-rgb",
    "title": "HEX to RGB",
    "name": "HEX to RGB",
    "href": "/tools/hex-to-rgb/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "transform",
    "description": "HEX to RGB. Use this privacy-first hex to rgb directly in your browser.",
    "seo": {
      "title": "HEX to RGB - Free Browser Tool | Nadhebe",
      "description": "HEX to RGB. Use this privacy-first hex to rgb directly in your browser.",
      "keywords": [
        "hex to rgb",
        "color",
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
      "color",
      "transform",
      "hex-to-rgb"
    ],
    "icon": "code"
  },
  {
    "id": "color-2",
    "slug": "palette-generator",
    "title": "Palette generator",
    "name": "Palette generator",
    "href": "/tools/palette-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "generator",
    "description": "Palette generator. Use this privacy-first palette generator directly in your browser.",
    "seo": {
      "title": "Palette generator - Free Browser Tool | Nadhebe",
      "description": "Palette generator. Use this privacy-first palette generator directly in your browser.",
      "keywords": [
        "palette generator",
        "color",
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
      "color",
      "generator",
      "palette-generator"
    ],
    "icon": "code"
  },
  {
    "id": "color-3",
    "slug": "gradient-builder",
    "title": "Gradient builder",
    "name": "Gradient builder",
    "href": "/tools/gradient-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "calculator",
    "description": "Gradient builder. Use this privacy-first gradient builder directly in your browser.",
    "seo": {
      "title": "Gradient builder - Free Browser Tool | Nadhebe",
      "description": "Gradient builder. Use this privacy-first gradient builder directly in your browser.",
      "keywords": [
        "gradient builder",
        "color",
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
      "color",
      "calculator",
      "gradient-builder"
    ],
    "icon": "code"
  },
  {
    "id": "color-4",
    "slug": "contrast-checker",
    "title": "Contrast checker",
    "name": "Contrast checker",
    "href": "/tools/contrast-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "analyzer",
    "description": "Contrast checker. Use this privacy-first contrast checker directly in your browser.",
    "seo": {
      "title": "Contrast checker - Free Browser Tool | Nadhebe",
      "description": "Contrast checker. Use this privacy-first contrast checker directly in your browser.",
      "keywords": [
        "contrast checker",
        "color",
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
      "color",
      "analyzer",
      "contrast-checker"
    ],
    "icon": "code"
  },
  {
    "id": "color-5",
    "slug": "color-blindness-simulator",
    "title": "Color blindness simulator",
    "name": "Color blindness simulator",
    "href": "/tools/color-blindness-simulator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "transform",
    "description": "Color blindness simulator. Use this privacy-first color blindness simulator directly in your browser.",
    "seo": {
      "title": "Color blindness simulator - Free Browser Tool | Nadhebe",
      "description": "Color blindness simulator. Use this privacy-first color blindness simulator directly in your browser.",
      "keywords": [
        "color blindness simulator",
        "color",
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
      "color",
      "transform",
      "color-blindness-simulator"
    ],
    "icon": "code"
  },
  {
    "id": "color-6",
    "slug": "color-builder",
    "title": "Color Builder",
    "name": "Color Builder",
    "href": "/tools/color-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Color Builder locally in your browser.",
    "seo": {
      "title": "Color Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Color Builder locally in your browser.",
      "keywords": [
        "color builder",
        "color",
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
      "color",
      "generator",
      "color-builder"
    ],
    "icon": "code"
  },
  {
    "id": "color-7",
    "slug": "color-estimator",
    "title": "Color Estimator",
    "name": "Color Estimator",
    "href": "/tools/color-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Color Estimator locally in your browser.",
    "seo": {
      "title": "Color Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Color Estimator locally in your browser.",
      "keywords": [
        "color estimator",
        "color",
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
      "color",
      "calculator",
      "color-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "color-8",
    "slug": "color-checker",
    "title": "Color Checker",
    "name": "Color Checker",
    "href": "/tools/color-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Color Checker locally in your browser.",
    "seo": {
      "title": "Color Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Color Checker locally in your browser.",
      "keywords": [
        "color checker",
        "color",
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
      "color",
      "analyzer",
      "color-checker"
    ],
    "icon": "code"
  },
  {
    "id": "color-9",
    "slug": "color-cleaner",
    "title": "Color Cleaner",
    "name": "Color Cleaner",
    "href": "/tools/color-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Color Cleaner locally in your browser.",
    "seo": {
      "title": "Color Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Color Cleaner locally in your browser.",
      "keywords": [
        "color cleaner",
        "color",
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
      "color",
      "transform",
      "color-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "color-10",
    "slug": "color-template-maker",
    "title": "Color Template Maker",
    "name": "Color Template Maker",
    "href": "/tools/color-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Color Template Maker locally in your browser.",
    "seo": {
      "title": "Color Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Color Template Maker locally in your browser.",
      "keywords": [
        "color template maker",
        "color",
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
      "color",
      "generator",
      "color-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "color-11",
    "slug": "color-planner",
    "title": "Color Planner",
    "name": "Color Planner",
    "href": "/tools/color-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Color Planner locally in your browser.",
    "seo": {
      "title": "Color Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Color Planner locally in your browser.",
      "keywords": [
        "color planner",
        "color",
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
      "color",
      "calculator",
      "color-planner"
    ],
    "icon": "code"
  },
  {
    "id": "color-12",
    "slug": "color-inspector",
    "title": "Color Inspector",
    "name": "Color Inspector",
    "href": "/tools/color-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Color",
    "categorySlug": "color",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Color Inspector locally in your browser.",
    "seo": {
      "title": "Color Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Color Inspector locally in your browser.",
      "keywords": [
        "color inspector",
        "color",
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
      "color",
      "analyzer",
      "color-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "design-1",
    "slug": "grid-calculator",
    "title": "Grid calculator",
    "name": "Grid calculator",
    "href": "/tools/grid-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "transform",
    "description": "Grid calculator. Use this privacy-first grid calculator directly in your browser.",
    "seo": {
      "title": "Grid calculator - Free Browser Tool | Nadhebe",
      "description": "Grid calculator. Use this privacy-first grid calculator directly in your browser.",
      "keywords": [
        "grid calculator",
        "design",
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
      "design",
      "transform",
      "grid-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "design-2",
    "slug": "spacing-scale-generator",
    "title": "Spacing scale generator",
    "name": "Spacing scale generator",
    "href": "/tools/spacing-scale-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "generator",
    "description": "Spacing scale generator. Use this privacy-first spacing scale generator directly in your browser.",
    "seo": {
      "title": "Spacing scale generator - Free Browser Tool | Nadhebe",
      "description": "Spacing scale generator. Use this privacy-first spacing scale generator directly in your browser.",
      "keywords": [
        "spacing scale generator",
        "design",
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
      "design",
      "generator",
      "spacing-scale-generator"
    ],
    "icon": "code"
  },
  {
    "id": "design-3",
    "slug": "icon-resizer",
    "title": "Icon resizer",
    "name": "Icon resizer",
    "href": "/tools/icon-resizer/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "calculator",
    "description": "Icon resizer. Use this privacy-first icon resizer directly in your browser.",
    "seo": {
      "title": "Icon resizer - Free Browser Tool | Nadhebe",
      "description": "Icon resizer. Use this privacy-first icon resizer directly in your browser.",
      "keywords": [
        "icon resizer",
        "design",
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
      "design",
      "calculator",
      "icon-resizer"
    ],
    "icon": "code"
  },
  {
    "id": "design-4",
    "slug": "safe-area-helper",
    "title": "Safe area helper",
    "name": "Safe area helper",
    "href": "/tools/safe-area-helper/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "analyzer",
    "description": "Safe area helper. Use this privacy-first safe area helper directly in your browser.",
    "seo": {
      "title": "Safe area helper - Free Browser Tool | Nadhebe",
      "description": "Safe area helper. Use this privacy-first safe area helper directly in your browser.",
      "keywords": [
        "safe area helper",
        "design",
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
      "design",
      "analyzer",
      "safe-area-helper"
    ],
    "icon": "code"
  },
  {
    "id": "design-5",
    "slug": "design-token-mapper",
    "title": "Design token mapper",
    "name": "Design token mapper",
    "href": "/tools/design-token-mapper/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "transform",
    "description": "Design token mapper. Use this privacy-first design token mapper directly in your browser.",
    "seo": {
      "title": "Design token mapper - Free Browser Tool | Nadhebe",
      "description": "Design token mapper. Use this privacy-first design token mapper directly in your browser.",
      "keywords": [
        "design token mapper",
        "design",
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
      "design",
      "transform",
      "design-token-mapper"
    ],
    "icon": "code"
  },
  {
    "id": "design-6",
    "slug": "design-builder",
    "title": "Design Builder",
    "name": "Design Builder",
    "href": "/tools/design-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Design Builder locally in your browser.",
    "seo": {
      "title": "Design Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Design Builder locally in your browser.",
      "keywords": [
        "design builder",
        "design",
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
      "design",
      "generator",
      "design-builder"
    ],
    "icon": "code"
  },
  {
    "id": "design-7",
    "slug": "design-estimator",
    "title": "Design Estimator",
    "name": "Design Estimator",
    "href": "/tools/design-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Design Estimator locally in your browser.",
    "seo": {
      "title": "Design Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Design Estimator locally in your browser.",
      "keywords": [
        "design estimator",
        "design",
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
      "design",
      "calculator",
      "design-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "design-8",
    "slug": "design-checker",
    "title": "Design Checker",
    "name": "Design Checker",
    "href": "/tools/design-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Design Checker locally in your browser.",
    "seo": {
      "title": "Design Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Design Checker locally in your browser.",
      "keywords": [
        "design checker",
        "design",
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
      "design",
      "analyzer",
      "design-checker"
    ],
    "icon": "code"
  },
  {
    "id": "design-9",
    "slug": "design-cleaner",
    "title": "Design Cleaner",
    "name": "Design Cleaner",
    "href": "/tools/design-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Design Cleaner locally in your browser.",
    "seo": {
      "title": "Design Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Design Cleaner locally in your browser.",
      "keywords": [
        "design cleaner",
        "design",
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
      "design",
      "transform",
      "design-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "design-10",
    "slug": "design-template-maker",
    "title": "Design Template Maker",
    "name": "Design Template Maker",
    "href": "/tools/design-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Design Template Maker locally in your browser.",
    "seo": {
      "title": "Design Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Design Template Maker locally in your browser.",
      "keywords": [
        "design template maker",
        "design",
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
      "design",
      "generator",
      "design-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "design-11",
    "slug": "design-planner",
    "title": "Design Planner",
    "name": "Design Planner",
    "href": "/tools/design-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Design Planner locally in your browser.",
    "seo": {
      "title": "Design Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Design Planner locally in your browser.",
      "keywords": [
        "design planner",
        "design",
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
      "design",
      "calculator",
      "design-planner"
    ],
    "icon": "code"
  },
  {
    "id": "design-12",
    "slug": "design-inspector",
    "title": "Design Inspector",
    "name": "Design Inspector",
    "href": "/tools/design-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Design",
    "categorySlug": "design",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Design Inspector locally in your browser.",
    "seo": {
      "title": "Design Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Design Inspector locally in your browser.",
      "keywords": [
        "design inspector",
        "design",
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
      "design",
      "analyzer",
      "design-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "typography-1",
    "slug": "type-scale-generator",
    "title": "Type scale generator",
    "name": "Type scale generator",
    "href": "/tools/type-scale-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "transform",
    "description": "Type scale generator. Use this privacy-first type scale generator directly in your browser.",
    "seo": {
      "title": "Type scale generator - Free Browser Tool | Nadhebe",
      "description": "Type scale generator. Use this privacy-first type scale generator directly in your browser.",
      "keywords": [
        "type scale generator",
        "typography",
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
      "typography",
      "transform",
      "type-scale-generator"
    ],
    "icon": "code"
  },
  {
    "id": "typography-2",
    "slug": "line-height-calculator",
    "title": "Line-height calculator",
    "name": "Line-height calculator",
    "href": "/tools/line-height-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "generator",
    "description": "Line-height calculator. Use this privacy-first line-height calculator directly in your browser.",
    "seo": {
      "title": "Line-height calculator - Free Browser Tool | Nadhebe",
      "description": "Line-height calculator. Use this privacy-first line-height calculator directly in your browser.",
      "keywords": [
        "line height calculator",
        "typography",
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
      "typography",
      "generator",
      "line-height-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "typography-3",
    "slug": "fluid-type-builder",
    "title": "Fluid type builder",
    "name": "Fluid type builder",
    "href": "/tools/fluid-type-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "calculator",
    "description": "Fluid type builder. Use this privacy-first fluid type builder directly in your browser.",
    "seo": {
      "title": "Fluid type builder - Free Browser Tool | Nadhebe",
      "description": "Fluid type builder. Use this privacy-first fluid type builder directly in your browser.",
      "keywords": [
        "fluid type builder",
        "typography",
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
      "typography",
      "calculator",
      "fluid-type-builder"
    ],
    "icon": "code"
  },
  {
    "id": "typography-4",
    "slug": "readability-checker",
    "title": "Readability checker",
    "name": "Readability checker",
    "href": "/tools/readability-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "analyzer",
    "description": "Readability checker. Use this privacy-first readability checker directly in your browser.",
    "seo": {
      "title": "Readability checker - Free Browser Tool | Nadhebe",
      "description": "Readability checker. Use this privacy-first readability checker directly in your browser.",
      "keywords": [
        "readability checker",
        "typography",
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
      "typography",
      "analyzer",
      "readability-checker"
    ],
    "icon": "code"
  },
  {
    "id": "typography-5",
    "slug": "font-fallback-stack",
    "title": "Font fallback stack",
    "name": "Font fallback stack",
    "href": "/tools/font-fallback-stack/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "transform",
    "description": "Font fallback stack. Use this privacy-first font fallback stack directly in your browser.",
    "seo": {
      "title": "Font fallback stack - Free Browser Tool | Nadhebe",
      "description": "Font fallback stack. Use this privacy-first font fallback stack directly in your browser.",
      "keywords": [
        "font fallback stack",
        "typography",
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
      "typography",
      "transform",
      "font-fallback-stack"
    ],
    "icon": "code"
  },
  {
    "id": "typography-6",
    "slug": "typography-builder",
    "title": "Typography Builder",
    "name": "Typography Builder",
    "href": "/tools/typography-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Typography Builder locally in your browser.",
    "seo": {
      "title": "Typography Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Typography Builder locally in your browser.",
      "keywords": [
        "typography builder",
        "typography",
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
      "typography",
      "generator",
      "typography-builder"
    ],
    "icon": "code"
  },
  {
    "id": "typography-7",
    "slug": "typography-estimator",
    "title": "Typography Estimator",
    "name": "Typography Estimator",
    "href": "/tools/typography-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Typography Estimator locally in your browser.",
    "seo": {
      "title": "Typography Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Typography Estimator locally in your browser.",
      "keywords": [
        "typography estimator",
        "typography",
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
      "typography",
      "calculator",
      "typography-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "typography-8",
    "slug": "typography-checker",
    "title": "Typography Checker",
    "name": "Typography Checker",
    "href": "/tools/typography-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Typography Checker locally in your browser.",
    "seo": {
      "title": "Typography Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Typography Checker locally in your browser.",
      "keywords": [
        "typography checker",
        "typography",
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
      "typography",
      "analyzer",
      "typography-checker"
    ],
    "icon": "code"
  },
  {
    "id": "typography-9",
    "slug": "typography-cleaner",
    "title": "Typography Cleaner",
    "name": "Typography Cleaner",
    "href": "/tools/typography-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Typography Cleaner locally in your browser.",
    "seo": {
      "title": "Typography Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Typography Cleaner locally in your browser.",
      "keywords": [
        "typography cleaner",
        "typography",
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
      "typography",
      "transform",
      "typography-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "typography-10",
    "slug": "typography-template-maker",
    "title": "Typography Template Maker",
    "name": "Typography Template Maker",
    "href": "/tools/typography-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Typography Template Maker locally in your browser.",
    "seo": {
      "title": "Typography Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Typography Template Maker locally in your browser.",
      "keywords": [
        "typography template maker",
        "typography",
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
      "typography",
      "generator",
      "typography-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "typography-11",
    "slug": "typography-planner",
    "title": "Typography Planner",
    "name": "Typography Planner",
    "href": "/tools/typography-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Typography Planner locally in your browser.",
    "seo": {
      "title": "Typography Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Typography Planner locally in your browser.",
      "keywords": [
        "typography planner",
        "typography",
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
      "typography",
      "calculator",
      "typography-planner"
    ],
    "icon": "code"
  },
  {
    "id": "typography-12",
    "slug": "typography-inspector",
    "title": "Typography Inspector",
    "name": "Typography Inspector",
    "href": "/tools/typography-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Typography",
    "categorySlug": "typography",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Typography Inspector locally in your browser.",
    "seo": {
      "title": "Typography Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Typography Inspector locally in your browser.",
      "keywords": [
        "typography inspector",
        "typography",
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
      "typography",
      "analyzer",
      "typography-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-1",
    "slug": "aria-role-helper",
    "title": "ARIA role helper",
    "name": "ARIA role helper",
    "href": "/tools/aria-role-helper/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "transform",
    "description": "ARIA role helper. Use this privacy-first aria role helper directly in your browser.",
    "seo": {
      "title": "ARIA role helper - Free Browser Tool | Nadhebe",
      "description": "ARIA role helper. Use this privacy-first aria role helper directly in your browser.",
      "keywords": [
        "aria role helper",
        "accessibility",
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
      "accessibility",
      "transform",
      "aria-role-helper"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-2",
    "slug": "alt-text-checker",
    "title": "Alt text checker",
    "name": "Alt text checker",
    "href": "/tools/alt-text-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "generator",
    "description": "Alt text checker. Use this privacy-first alt text checker directly in your browser.",
    "seo": {
      "title": "Alt text checker - Free Browser Tool | Nadhebe",
      "description": "Alt text checker. Use this privacy-first alt text checker directly in your browser.",
      "keywords": [
        "alt text checker",
        "accessibility",
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
      "accessibility",
      "generator",
      "alt-text-checker"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-3",
    "slug": "focus-order-planner",
    "title": "Focus order planner",
    "name": "Focus order planner",
    "href": "/tools/focus-order-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "calculator",
    "description": "Focus order planner. Use this privacy-first focus order planner directly in your browser.",
    "seo": {
      "title": "Focus order planner - Free Browser Tool | Nadhebe",
      "description": "Focus order planner. Use this privacy-first focus order planner directly in your browser.",
      "keywords": [
        "focus order planner",
        "accessibility",
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
      "accessibility",
      "calculator",
      "focus-order-planner"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-4",
    "slug": "contrast-matrix",
    "title": "Contrast matrix",
    "name": "Contrast matrix",
    "href": "/tools/contrast-matrix/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "analyzer",
    "description": "Contrast matrix. Use this privacy-first contrast matrix directly in your browser.",
    "seo": {
      "title": "Contrast matrix - Free Browser Tool | Nadhebe",
      "description": "Contrast matrix. Use this privacy-first contrast matrix directly in your browser.",
      "keywords": [
        "contrast matrix",
        "accessibility",
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
      "accessibility",
      "analyzer",
      "contrast-matrix"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-5",
    "slug": "tap-target-checker",
    "title": "Tap target checker",
    "name": "Tap target checker",
    "href": "/tools/tap-target-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "transform",
    "description": "Tap target checker. Use this privacy-first tap target checker directly in your browser.",
    "seo": {
      "title": "Tap target checker - Free Browser Tool | Nadhebe",
      "description": "Tap target checker. Use this privacy-first tap target checker directly in your browser.",
      "keywords": [
        "tap target checker",
        "accessibility",
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
      "accessibility",
      "transform",
      "tap-target-checker"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-6",
    "slug": "accessibility-builder",
    "title": "Accessibility Builder",
    "name": "Accessibility Builder",
    "href": "/tools/accessibility-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Accessibility Builder locally in your browser.",
    "seo": {
      "title": "Accessibility Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Accessibility Builder locally in your browser.",
      "keywords": [
        "accessibility builder",
        "accessibility",
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
      "accessibility",
      "generator",
      "accessibility-builder"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-7",
    "slug": "accessibility-estimator",
    "title": "Accessibility Estimator",
    "name": "Accessibility Estimator",
    "href": "/tools/accessibility-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Accessibility Estimator locally in your browser.",
    "seo": {
      "title": "Accessibility Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Accessibility Estimator locally in your browser.",
      "keywords": [
        "accessibility estimator",
        "accessibility",
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
      "accessibility",
      "calculator",
      "accessibility-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-8",
    "slug": "accessibility-checker",
    "title": "Accessibility Checker",
    "name": "Accessibility Checker",
    "href": "/tools/accessibility-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Accessibility Checker locally in your browser.",
    "seo": {
      "title": "Accessibility Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Accessibility Checker locally in your browser.",
      "keywords": [
        "accessibility checker",
        "accessibility",
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
      "accessibility",
      "analyzer",
      "accessibility-checker"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-9",
    "slug": "accessibility-cleaner",
    "title": "Accessibility Cleaner",
    "name": "Accessibility Cleaner",
    "href": "/tools/accessibility-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Accessibility Cleaner locally in your browser.",
    "seo": {
      "title": "Accessibility Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Accessibility Cleaner locally in your browser.",
      "keywords": [
        "accessibility cleaner",
        "accessibility",
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
      "accessibility",
      "transform",
      "accessibility-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-10",
    "slug": "accessibility-template-maker",
    "title": "Accessibility Template Maker",
    "name": "Accessibility Template Maker",
    "href": "/tools/accessibility-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Accessibility Template Maker locally in your browser.",
    "seo": {
      "title": "Accessibility Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Accessibility Template Maker locally in your browser.",
      "keywords": [
        "accessibility template maker",
        "accessibility",
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
      "accessibility",
      "generator",
      "accessibility-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-11",
    "slug": "accessibility-planner",
    "title": "Accessibility Planner",
    "name": "Accessibility Planner",
    "href": "/tools/accessibility-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Accessibility Planner locally in your browser.",
    "seo": {
      "title": "Accessibility Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Accessibility Planner locally in your browser.",
      "keywords": [
        "accessibility planner",
        "accessibility",
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
      "accessibility",
      "calculator",
      "accessibility-planner"
    ],
    "icon": "code"
  },
  {
    "id": "accessibility-12",
    "slug": "accessibility-inspector",
    "title": "Accessibility Inspector",
    "name": "Accessibility Inspector",
    "href": "/tools/accessibility-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Accessibility",
    "categorySlug": "accessibility",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Accessibility Inspector locally in your browser.",
    "seo": {
      "title": "Accessibility Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Accessibility Inspector locally in your browser.",
      "keywords": [
        "accessibility inspector",
        "accessibility",
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
      "accessibility",
      "analyzer",
      "accessibility-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "browser-1",
    "slug": "user-agent-parser",
    "title": "User-agent parser",
    "name": "User-agent parser",
    "href": "/tools/user-agent-parser/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "transform",
    "description": "User-agent parser. Use this privacy-first user-agent parser directly in your browser.",
    "seo": {
      "title": "User-agent parser - Free Browser Tool | Nadhebe",
      "description": "User-agent parser. Use this privacy-first user-agent parser directly in your browser.",
      "keywords": [
        "user agent parser",
        "browser",
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
      "browser",
      "transform",
      "user-agent-parser"
    ],
    "icon": "code"
  },
  {
    "id": "browser-2",
    "slug": "viewport-tester",
    "title": "Viewport tester",
    "name": "Viewport tester",
    "href": "/tools/viewport-tester/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "generator",
    "description": "Viewport tester. Use this privacy-first viewport tester directly in your browser.",
    "seo": {
      "title": "Viewport tester - Free Browser Tool | Nadhebe",
      "description": "Viewport tester. Use this privacy-first viewport tester directly in your browser.",
      "keywords": [
        "viewport tester",
        "browser",
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
      "browser",
      "generator",
      "viewport-tester"
    ],
    "icon": "code"
  },
  {
    "id": "browser-3",
    "slug": "cookie-decoder",
    "title": "Cookie decoder",
    "name": "Cookie decoder",
    "href": "/tools/cookie-decoder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "calculator",
    "description": "Cookie decoder. Use this privacy-first cookie decoder directly in your browser.",
    "seo": {
      "title": "Cookie decoder - Free Browser Tool | Nadhebe",
      "description": "Cookie decoder. Use this privacy-first cookie decoder directly in your browser.",
      "keywords": [
        "cookie decoder",
        "browser",
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
      "browser",
      "calculator",
      "cookie-decoder"
    ],
    "icon": "code"
  },
  {
    "id": "browser-4",
    "slug": "localstorage-inspector",
    "title": "LocalStorage inspector",
    "name": "LocalStorage inspector",
    "href": "/tools/localstorage-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "analyzer",
    "description": "LocalStorage inspector. Use this privacy-first localstorage inspector directly in your browser.",
    "seo": {
      "title": "LocalStorage inspector - Free Browser Tool | Nadhebe",
      "description": "LocalStorage inspector. Use this privacy-first localstorage inspector directly in your browser.",
      "keywords": [
        "localstorage inspector",
        "browser",
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
      "browser",
      "analyzer",
      "localstorage-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "browser-5",
    "slug": "feature-support-checker",
    "title": "Feature support checker",
    "name": "Feature support checker",
    "href": "/tools/feature-support-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "transform",
    "description": "Feature support checker. Use this privacy-first feature support checker directly in your browser.",
    "seo": {
      "title": "Feature support checker - Free Browser Tool | Nadhebe",
      "description": "Feature support checker. Use this privacy-first feature support checker directly in your browser.",
      "keywords": [
        "feature support checker",
        "browser",
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
      "browser",
      "transform",
      "feature-support-checker"
    ],
    "icon": "code"
  },
  {
    "id": "browser-6",
    "slug": "browser-builder",
    "title": "Browser Builder",
    "name": "Browser Builder",
    "href": "/tools/browser-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Browser Builder locally in your browser.",
    "seo": {
      "title": "Browser Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Browser Builder locally in your browser.",
      "keywords": [
        "browser builder",
        "browser",
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
      "browser",
      "generator",
      "browser-builder"
    ],
    "icon": "code"
  },
  {
    "id": "browser-7",
    "slug": "browser-estimator",
    "title": "Browser Estimator",
    "name": "Browser Estimator",
    "href": "/tools/browser-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Browser Estimator locally in your browser.",
    "seo": {
      "title": "Browser Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Browser Estimator locally in your browser.",
      "keywords": [
        "browser estimator",
        "browser",
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
      "browser",
      "calculator",
      "browser-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "browser-8",
    "slug": "browser-checker",
    "title": "Browser Checker",
    "name": "Browser Checker",
    "href": "/tools/browser-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Browser Checker locally in your browser.",
    "seo": {
      "title": "Browser Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Browser Checker locally in your browser.",
      "keywords": [
        "browser checker",
        "browser",
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
      "browser",
      "analyzer",
      "browser-checker"
    ],
    "icon": "code"
  },
  {
    "id": "browser-9",
    "slug": "browser-cleaner",
    "title": "Browser Cleaner",
    "name": "Browser Cleaner",
    "href": "/tools/browser-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Browser Cleaner locally in your browser.",
    "seo": {
      "title": "Browser Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Browser Cleaner locally in your browser.",
      "keywords": [
        "browser cleaner",
        "browser",
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
      "browser",
      "transform",
      "browser-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "browser-10",
    "slug": "browser-template-maker",
    "title": "Browser Template Maker",
    "name": "Browser Template Maker",
    "href": "/tools/browser-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Browser Template Maker locally in your browser.",
    "seo": {
      "title": "Browser Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Browser Template Maker locally in your browser.",
      "keywords": [
        "browser template maker",
        "browser",
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
      "browser",
      "generator",
      "browser-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "browser-11",
    "slug": "browser-planner",
    "title": "Browser Planner",
    "name": "Browser Planner",
    "href": "/tools/browser-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Browser Planner locally in your browser.",
    "seo": {
      "title": "Browser Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Browser Planner locally in your browser.",
      "keywords": [
        "browser planner",
        "browser",
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
      "browser",
      "calculator",
      "browser-planner"
    ],
    "icon": "code"
  },
  {
    "id": "browser-12",
    "slug": "browser-inspector",
    "title": "Browser Inspector",
    "name": "Browser Inspector",
    "href": "/tools/browser-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Browser",
    "categorySlug": "browser",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Browser Inspector locally in your browser.",
    "seo": {
      "title": "Browser Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Browser Inspector locally in your browser.",
      "keywords": [
        "browser inspector",
        "browser",
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
      "browser",
      "analyzer",
      "browser-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "performance-1",
    "slug": "performance-budget-planner",
    "title": "Performance budget planner",
    "name": "Performance budget planner",
    "href": "/tools/performance-budget-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "transform",
    "description": "Performance budget planner. Use this privacy-first performance budget planner directly in your browser.",
    "seo": {
      "title": "Performance budget planner - Free Browser Tool | Nadhebe",
      "description": "Performance budget planner. Use this privacy-first performance budget planner directly in your browser.",
      "keywords": [
        "performance budget planner",
        "performance",
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
      "performance",
      "transform",
      "performance-budget-planner"
    ],
    "icon": "code"
  },
  {
    "id": "performance-2",
    "slug": "lcp-image-estimator",
    "title": "LCP image estimator",
    "name": "LCP image estimator",
    "href": "/tools/lcp-image-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "generator",
    "description": "LCP image estimator. Use this privacy-first lcp image estimator directly in your browser.",
    "seo": {
      "title": "LCP image estimator - Free Browser Tool | Nadhebe",
      "description": "LCP image estimator. Use this privacy-first lcp image estimator directly in your browser.",
      "keywords": [
        "lcp image estimator",
        "performance",
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
      "performance",
      "generator",
      "lcp-image-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "performance-3",
    "slug": "bundle-size-calculator",
    "title": "Bundle size calculator",
    "name": "Bundle size calculator",
    "href": "/tools/bundle-size-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "calculator",
    "description": "Bundle size calculator. Use this privacy-first bundle size calculator directly in your browser.",
    "seo": {
      "title": "Bundle size calculator - Free Browser Tool | Nadhebe",
      "description": "Bundle size calculator. Use this privacy-first bundle size calculator directly in your browser.",
      "keywords": [
        "bundle size calculator",
        "performance",
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
      "performance",
      "calculator",
      "bundle-size-calculator"
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
    "id": "performance-5",
    "slug": "latency-simulator",
    "title": "Latency simulator",
    "name": "Latency simulator",
    "href": "/tools/latency-simulator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "transform",
    "description": "Latency simulator. Use this privacy-first latency simulator directly in your browser.",
    "seo": {
      "title": "Latency simulator - Free Browser Tool | Nadhebe",
      "description": "Latency simulator. Use this privacy-first latency simulator directly in your browser.",
      "keywords": [
        "latency simulator",
        "performance",
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
      "performance",
      "transform",
      "latency-simulator"
    ],
    "icon": "code"
  },
  {
    "id": "performance-6",
    "slug": "performance-builder",
    "title": "Performance Builder",
    "name": "Performance Builder",
    "href": "/tools/performance-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Performance Builder locally in your browser.",
    "seo": {
      "title": "Performance Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Performance Builder locally in your browser.",
      "keywords": [
        "performance builder",
        "performance",
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
      "performance",
      "generator",
      "performance-builder"
    ],
    "icon": "code"
  },
  {
    "id": "performance-7",
    "slug": "performance-estimator",
    "title": "Performance Estimator",
    "name": "Performance Estimator",
    "href": "/tools/performance-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Performance Estimator locally in your browser.",
    "seo": {
      "title": "Performance Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Performance Estimator locally in your browser.",
      "keywords": [
        "performance estimator",
        "performance",
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
      "performance",
      "calculator",
      "performance-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "performance-8",
    "slug": "performance-checker",
    "title": "Performance Checker",
    "name": "Performance Checker",
    "href": "/tools/performance-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Performance Checker locally in your browser.",
    "seo": {
      "title": "Performance Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Performance Checker locally in your browser.",
      "keywords": [
        "performance checker",
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
      "performance-checker"
    ],
    "icon": "code"
  },
  {
    "id": "performance-9",
    "slug": "performance-cleaner",
    "title": "Performance Cleaner",
    "name": "Performance Cleaner",
    "href": "/tools/performance-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Performance Cleaner locally in your browser.",
    "seo": {
      "title": "Performance Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Performance Cleaner locally in your browser.",
      "keywords": [
        "performance cleaner",
        "performance",
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
      "performance",
      "transform",
      "performance-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "performance-10",
    "slug": "performance-template-maker",
    "title": "Performance Template Maker",
    "name": "Performance Template Maker",
    "href": "/tools/performance-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Performance Template Maker locally in your browser.",
    "seo": {
      "title": "Performance Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Performance Template Maker locally in your browser.",
      "keywords": [
        "performance template maker",
        "performance",
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
      "performance",
      "generator",
      "performance-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "performance-11",
    "slug": "performance-planner",
    "title": "Performance Planner",
    "name": "Performance Planner",
    "href": "/tools/performance-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Performance Planner locally in your browser.",
    "seo": {
      "title": "Performance Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Performance Planner locally in your browser.",
      "keywords": [
        "performance planner",
        "performance",
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
      "performance",
      "calculator",
      "performance-planner"
    ],
    "icon": "code"
  },
  {
    "id": "performance-12",
    "slug": "performance-inspector",
    "title": "Performance Inspector",
    "name": "Performance Inspector",
    "href": "/tools/performance-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Performance",
    "categorySlug": "performance",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Performance Inspector locally in your browser.",
    "seo": {
      "title": "Performance Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Performance Inspector locally in your browser.",
      "keywords": [
        "performance inspector",
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
      "performance-inspector"
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
    "id": "productivity-2",
    "slug": "decision-matrix",
    "title": "Decision matrix",
    "name": "Decision matrix",
    "href": "/tools/decision-matrix/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "generator",
    "description": "Decision matrix. Use this privacy-first decision matrix directly in your browser.",
    "seo": {
      "title": "Decision matrix - Free Browser Tool | Nadhebe",
      "description": "Decision matrix. Use this privacy-first decision matrix directly in your browser.",
      "keywords": [
        "decision matrix",
        "productivity",
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
      "productivity",
      "generator",
      "decision-matrix"
    ],
    "icon": "code"
  },
  {
    "id": "productivity-3",
    "slug": "pomodoro-planner",
    "title": "Pomodoro planner",
    "name": "Pomodoro planner",
    "href": "/tools/pomodoro-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "calculator",
    "description": "Pomodoro planner. Use this privacy-first pomodoro planner directly in your browser.",
    "seo": {
      "title": "Pomodoro planner - Free Browser Tool | Nadhebe",
      "description": "Pomodoro planner. Use this privacy-first pomodoro planner directly in your browser.",
      "keywords": [
        "pomodoro planner",
        "productivity",
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
      "productivity",
      "calculator",
      "pomodoro-planner"
    ],
    "icon": "code"
  },
  {
    "id": "productivity-4",
    "slug": "meeting-notes-formatter",
    "title": "Meeting notes formatter",
    "name": "Meeting notes formatter",
    "href": "/tools/meeting-notes-formatter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "analyzer",
    "description": "Meeting notes formatter. Use this privacy-first meeting notes formatter directly in your browser.",
    "seo": {
      "title": "Meeting notes formatter - Free Browser Tool | Nadhebe",
      "description": "Meeting notes formatter. Use this privacy-first meeting notes formatter directly in your browser.",
      "keywords": [
        "meeting notes formatter",
        "productivity",
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
      "productivity",
      "analyzer",
      "meeting-notes-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "productivity-5",
    "slug": "csv-task-importer",
    "title": "CSV task importer",
    "name": "CSV task importer",
    "href": "/tools/csv-task-importer/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "transform",
    "description": "CSV task importer. Use this privacy-first csv task importer directly in your browser.",
    "seo": {
      "title": "CSV task importer - Free Browser Tool | Nadhebe",
      "description": "CSV task importer. Use this privacy-first csv task importer directly in your browser.",
      "keywords": [
        "csv task importer",
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
      "csv-task-importer"
    ],
    "icon": "code"
  },
  {
    "id": "productivity-6",
    "slug": "productivity-builder",
    "title": "Productivity Builder",
    "name": "Productivity Builder",
    "href": "/tools/productivity-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Productivity Builder locally in your browser.",
    "seo": {
      "title": "Productivity Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Productivity Builder locally in your browser.",
      "keywords": [
        "productivity builder",
        "productivity",
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
      "productivity",
      "generator",
      "productivity-builder"
    ],
    "icon": "code"
  },
  {
    "id": "productivity-7",
    "slug": "productivity-estimator",
    "title": "Productivity Estimator",
    "name": "Productivity Estimator",
    "href": "/tools/productivity-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Productivity Estimator locally in your browser.",
    "seo": {
      "title": "Productivity Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Productivity Estimator locally in your browser.",
      "keywords": [
        "productivity estimator",
        "productivity",
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
      "productivity",
      "calculator",
      "productivity-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "productivity-8",
    "slug": "productivity-checker",
    "title": "Productivity Checker",
    "name": "Productivity Checker",
    "href": "/tools/productivity-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Productivity Checker locally in your browser.",
    "seo": {
      "title": "Productivity Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Productivity Checker locally in your browser.",
      "keywords": [
        "productivity checker",
        "productivity",
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
      "productivity",
      "analyzer",
      "productivity-checker"
    ],
    "icon": "code"
  },
  {
    "id": "productivity-9",
    "slug": "productivity-cleaner",
    "title": "Productivity Cleaner",
    "name": "Productivity Cleaner",
    "href": "/tools/productivity-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Productivity Cleaner locally in your browser.",
    "seo": {
      "title": "Productivity Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Productivity Cleaner locally in your browser.",
      "keywords": [
        "productivity cleaner",
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
      "productivity-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "productivity-10",
    "slug": "productivity-template-maker",
    "title": "Productivity Template Maker",
    "name": "Productivity Template Maker",
    "href": "/tools/productivity-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Productivity Template Maker locally in your browser.",
    "seo": {
      "title": "Productivity Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Productivity Template Maker locally in your browser.",
      "keywords": [
        "productivity template maker",
        "productivity",
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
      "productivity",
      "generator",
      "productivity-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "productivity-11",
    "slug": "productivity-planner",
    "title": "Productivity Planner",
    "name": "Productivity Planner",
    "href": "/tools/productivity-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Productivity Planner locally in your browser.",
    "seo": {
      "title": "Productivity Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Productivity Planner locally in your browser.",
      "keywords": [
        "productivity planner",
        "productivity",
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
      "productivity",
      "calculator",
      "productivity-planner"
    ],
    "icon": "code"
  },
  {
    "id": "productivity-12",
    "slug": "productivity-inspector",
    "title": "Productivity Inspector",
    "name": "Productivity Inspector",
    "href": "/tools/productivity-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Productivity",
    "categorySlug": "productivity",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Productivity Inspector locally in your browser.",
    "seo": {
      "title": "Productivity Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Productivity Inspector locally in your browser.",
      "keywords": [
        "productivity inspector",
        "productivity",
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
      "productivity",
      "analyzer",
      "productivity-inspector"
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
    "id": "writing-2",
    "slug": "headline-analyzer",
    "title": "Headline analyzer",
    "name": "Headline analyzer",
    "href": "/tools/headline-analyzer/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Writing",
    "categorySlug": "writing",
    "mode": "generator",
    "description": "Headline analyzer. Use this privacy-first headline analyzer directly in your browser.",
    "seo": {
      "title": "Headline analyzer - Free Browser Tool | Nadhebe",
      "description": "Headline analyzer. Use this privacy-first headline analyzer directly in your browser.",
      "keywords": [
        "headline analyzer",
        "writing",
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
      "writing",
      "generator",
      "headline-analyzer"
    ],
    "icon": "code"
  },
  {
    "id": "writing-3",
    "slug": "outline-builder",
    "title": "Outline builder",
    "name": "Outline builder",
    "href": "/tools/outline-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Writing",
    "categorySlug": "writing",
    "mode": "calculator",
    "description": "Outline builder. Use this privacy-first outline builder directly in your browser.",
    "seo": {
      "title": "Outline builder - Free Browser Tool | Nadhebe",
      "description": "Outline builder. Use this privacy-first outline builder directly in your browser.",
      "keywords": [
        "outline builder",
        "writing",
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
      "writing",
      "calculator",
      "outline-builder"
    ],
    "icon": "code"
  },
  {
    "id": "writing-4",
    "slug": "tone-checker",
    "title": "Tone checker",
    "name": "Tone checker",
    "href": "/tools/tone-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Writing",
    "categorySlug": "writing",
    "mode": "analyzer",
    "description": "Tone checker. Use this privacy-first tone checker directly in your browser.",
    "seo": {
      "title": "Tone checker - Free Browser Tool | Nadhebe",
      "description": "Tone checker. Use this privacy-first tone checker directly in your browser.",
      "keywords": [
        "tone checker",
        "writing",
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
      "writing",
      "analyzer",
      "tone-checker"
    ],
    "icon": "code"
  },
  {
    "id": "writing-5",
    "slug": "summary-length-planner",
    "title": "Summary length planner",
    "name": "Summary length planner",
    "href": "/tools/summary-length-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Writing",
    "categorySlug": "writing",
    "mode": "transform",
    "description": "Summary length planner. Use this privacy-first summary length planner directly in your browser.",
    "seo": {
      "title": "Summary length planner - Free Browser Tool | Nadhebe",
      "description": "Summary length planner. Use this privacy-first summary length planner directly in your browser.",
      "keywords": [
        "summary length planner",
        "writing",
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
      "writing",
      "transform",
      "summary-length-planner"
    ],
    "icon": "code"
  },
  {
    "id": "writing-6",
    "slug": "writing-builder",
    "title": "Writing Builder",
    "name": "Writing Builder",
    "href": "/tools/writing-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Writing",
    "categorySlug": "writing",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Writing Builder locally in your browser.",
    "seo": {
      "title": "Writing Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Writing Builder locally in your browser.",
      "keywords": [
        "writing builder",
        "writing",
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
      "writing",
      "generator",
      "writing-builder"
    ],
    "icon": "code"
  },
  {
    "id": "writing-7",
    "slug": "writing-estimator",
    "title": "Writing Estimator",
    "name": "Writing Estimator",
    "href": "/tools/writing-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Writing",
    "categorySlug": "writing",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Writing Estimator locally in your browser.",
    "seo": {
      "title": "Writing Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Writing Estimator locally in your browser.",
      "keywords": [
        "writing estimator",
        "writing",
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
      "writing",
      "calculator",
      "writing-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "writing-8",
    "slug": "writing-checker",
    "title": "Writing Checker",
    "name": "Writing Checker",
    "href": "/tools/writing-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Writing",
    "categorySlug": "writing",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Writing Checker locally in your browser.",
    "seo": {
      "title": "Writing Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Writing Checker locally in your browser.",
      "keywords": [
        "writing checker",
        "writing",
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
      "writing",
      "analyzer",
      "writing-checker"
    ],
    "icon": "code"
  },
  {
    "id": "writing-9",
    "slug": "writing-cleaner",
    "title": "Writing Cleaner",
    "name": "Writing Cleaner",
    "href": "/tools/writing-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Writing",
    "categorySlug": "writing",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Writing Cleaner locally in your browser.",
    "seo": {
      "title": "Writing Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Writing Cleaner locally in your browser.",
      "keywords": [
        "writing cleaner",
        "writing",
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
      "writing",
      "transform",
      "writing-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "writing-10",
    "slug": "writing-template-maker",
    "title": "Writing Template Maker",
    "name": "Writing Template Maker",
    "href": "/tools/writing-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Writing",
    "categorySlug": "writing",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Writing Template Maker locally in your browser.",
    "seo": {
      "title": "Writing Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Writing Template Maker locally in your browser.",
      "keywords": [
        "writing template maker",
        "writing",
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
      "writing",
      "generator",
      "writing-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "writing-11",
    "slug": "writing-planner",
    "title": "Writing Planner",
    "name": "Writing Planner",
    "href": "/tools/writing-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Writing",
    "categorySlug": "writing",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Writing Planner locally in your browser.",
    "seo": {
      "title": "Writing Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Writing Planner locally in your browser.",
      "keywords": [
        "writing planner",
        "writing",
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
      "writing",
      "calculator",
      "writing-planner"
    ],
    "icon": "code"
  },
  {
    "id": "writing-12",
    "slug": "writing-inspector",
    "title": "Writing Inspector",
    "name": "Writing Inspector",
    "href": "/tools/writing-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Writing",
    "categorySlug": "writing",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Writing Inspector locally in your browser.",
    "seo": {
      "title": "Writing Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Writing Inspector locally in your browser.",
      "keywords": [
        "writing inspector",
        "writing",
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
      "writing",
      "analyzer",
      "writing-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "education-1",
    "slug": "gpa-calculator",
    "title": "GPA calculator",
    "name": "GPA calculator",
    "href": "/tools/gpa-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Education",
    "categorySlug": "education",
    "mode": "transform",
    "description": "GPA calculator. Use this privacy-first gpa calculator directly in your browser.",
    "seo": {
      "title": "GPA calculator - Free Browser Tool | Nadhebe",
      "description": "GPA calculator. Use this privacy-first gpa calculator directly in your browser.",
      "keywords": [
        "gpa calculator",
        "education",
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
      "education",
      "transform",
      "gpa-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "education-2",
    "slug": "flashcard-generator",
    "title": "Flashcard generator",
    "name": "Flashcard generator",
    "href": "/tools/flashcard-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Education",
    "categorySlug": "education",
    "mode": "generator",
    "description": "Flashcard generator. Use this privacy-first flashcard generator directly in your browser.",
    "seo": {
      "title": "Flashcard generator - Free Browser Tool | Nadhebe",
      "description": "Flashcard generator. Use this privacy-first flashcard generator directly in your browser.",
      "keywords": [
        "flashcard generator",
        "education",
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
      "education",
      "generator",
      "flashcard-generator"
    ],
    "icon": "code"
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
    "id": "education-4",
    "slug": "quiz-builder",
    "title": "Quiz builder",
    "name": "Quiz builder",
    "href": "/tools/quiz-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Education",
    "categorySlug": "education",
    "mode": "analyzer",
    "description": "Quiz builder. Use this privacy-first quiz builder directly in your browser.",
    "seo": {
      "title": "Quiz builder - Free Browser Tool | Nadhebe",
      "description": "Quiz builder. Use this privacy-first quiz builder directly in your browser.",
      "keywords": [
        "quiz builder",
        "education",
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
      "education",
      "analyzer",
      "quiz-builder"
    ],
    "icon": "code"
  },
  {
    "id": "education-5",
    "slug": "study-schedule-planner",
    "title": "Study schedule planner",
    "name": "Study schedule planner",
    "href": "/tools/study-schedule-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Education",
    "categorySlug": "education",
    "mode": "transform",
    "description": "Study schedule planner. Use this privacy-first study schedule planner directly in your browser.",
    "seo": {
      "title": "Study schedule planner - Free Browser Tool | Nadhebe",
      "description": "Study schedule planner. Use this privacy-first study schedule planner directly in your browser.",
      "keywords": [
        "study schedule planner",
        "education",
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
      "education",
      "transform",
      "study-schedule-planner"
    ],
    "icon": "code"
  },
  {
    "id": "education-6",
    "slug": "education-builder",
    "title": "Education Builder",
    "name": "Education Builder",
    "href": "/tools/education-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Education",
    "categorySlug": "education",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Education Builder locally in your browser.",
    "seo": {
      "title": "Education Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Education Builder locally in your browser.",
      "keywords": [
        "education builder",
        "education",
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
      "education",
      "generator",
      "education-builder"
    ],
    "icon": "code"
  },
  {
    "id": "education-7",
    "slug": "education-estimator",
    "title": "Education Estimator",
    "name": "Education Estimator",
    "href": "/tools/education-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Education",
    "categorySlug": "education",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Education Estimator locally in your browser.",
    "seo": {
      "title": "Education Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Education Estimator locally in your browser.",
      "keywords": [
        "education estimator",
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
      "education-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "education-8",
    "slug": "education-checker",
    "title": "Education Checker",
    "name": "Education Checker",
    "href": "/tools/education-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Education",
    "categorySlug": "education",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Education Checker locally in your browser.",
    "seo": {
      "title": "Education Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Education Checker locally in your browser.",
      "keywords": [
        "education checker",
        "education",
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
      "education",
      "analyzer",
      "education-checker"
    ],
    "icon": "code"
  },
  {
    "id": "education-9",
    "slug": "education-cleaner",
    "title": "Education Cleaner",
    "name": "Education Cleaner",
    "href": "/tools/education-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Education",
    "categorySlug": "education",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Education Cleaner locally in your browser.",
    "seo": {
      "title": "Education Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Education Cleaner locally in your browser.",
      "keywords": [
        "education cleaner",
        "education",
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
      "education",
      "transform",
      "education-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "education-10",
    "slug": "education-template-maker",
    "title": "Education Template Maker",
    "name": "Education Template Maker",
    "href": "/tools/education-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Education",
    "categorySlug": "education",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Education Template Maker locally in your browser.",
    "seo": {
      "title": "Education Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Education Template Maker locally in your browser.",
      "keywords": [
        "education template maker",
        "education",
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
      "education",
      "generator",
      "education-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "education-11",
    "slug": "education-planner",
    "title": "Education Planner",
    "name": "Education Planner",
    "href": "/tools/education-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Education",
    "categorySlug": "education",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Education Planner locally in your browser.",
    "seo": {
      "title": "Education Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Education Planner locally in your browser.",
      "keywords": [
        "education planner",
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
      "education-planner"
    ],
    "icon": "code"
  },
  {
    "id": "education-12",
    "slug": "education-inspector",
    "title": "Education Inspector",
    "name": "Education Inspector",
    "href": "/tools/education-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Education",
    "categorySlug": "education",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Education Inspector locally in your browser.",
    "seo": {
      "title": "Education Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Education Inspector locally in your browser.",
      "keywords": [
        "education inspector",
        "education",
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
      "education",
      "analyzer",
      "education-inspector"
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
    "id": "data-analysis-2",
    "slug": "outlier-detector",
    "title": "Outlier detector",
    "name": "Outlier detector",
    "href": "/tools/outlier-detector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "generator",
    "description": "Outlier detector. Use this privacy-first outlier detector directly in your browser.",
    "seo": {
      "title": "Outlier detector - Free Browser Tool | Nadhebe",
      "description": "Outlier detector. Use this privacy-first outlier detector directly in your browser.",
      "keywords": [
        "outlier detector",
        "data analysis",
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
      "data analysis",
      "generator",
      "outlier-detector"
    ],
    "icon": "code"
  },
  {
    "id": "data-analysis-3",
    "slug": "sample-size-calculator",
    "title": "Sample size calculator",
    "name": "Sample size calculator",
    "href": "/tools/sample-size-calculator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "calculator",
    "description": "Sample size calculator. Use this privacy-first sample size calculator directly in your browser.",
    "seo": {
      "title": "Sample size calculator - Free Browser Tool | Nadhebe",
      "description": "Sample size calculator. Use this privacy-first sample size calculator directly in your browser.",
      "keywords": [
        "sample size calculator",
        "data analysis",
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
      "data analysis",
      "calculator",
      "sample-size-calculator"
    ],
    "icon": "code"
  },
  {
    "id": "data-analysis-4",
    "slug": "correlation-helper",
    "title": "Correlation helper",
    "name": "Correlation helper",
    "href": "/tools/correlation-helper/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "analyzer",
    "description": "Correlation helper. Use this privacy-first correlation helper directly in your browser.",
    "seo": {
      "title": "Correlation helper - Free Browser Tool | Nadhebe",
      "description": "Correlation helper. Use this privacy-first correlation helper directly in your browser.",
      "keywords": [
        "correlation helper",
        "data analysis",
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
      "data analysis",
      "analyzer",
      "correlation-helper"
    ],
    "icon": "code"
  },
  {
    "id": "data-analysis-5",
    "slug": "data-type-detector",
    "title": "Data type detector",
    "name": "Data type detector",
    "href": "/tools/data-type-detector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "transform",
    "description": "Data type detector. Use this privacy-first data type detector directly in your browser.",
    "seo": {
      "title": "Data type detector - Free Browser Tool | Nadhebe",
      "description": "Data type detector. Use this privacy-first data type detector directly in your browser.",
      "keywords": [
        "data type detector",
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
      "data-type-detector"
    ],
    "icon": "code"
  },
  {
    "id": "data-analysis-6",
    "slug": "data-analysis-builder",
    "title": "Data Analysis Builder",
    "name": "Data Analysis Builder",
    "href": "/tools/data-analysis-builder/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Data Analysis Builder locally in your browser.",
    "seo": {
      "title": "Data Analysis Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Data Analysis Builder locally in your browser.",
      "keywords": [
        "data analysis builder",
        "data analysis",
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
      "data analysis",
      "generator",
      "data-analysis-builder"
    ],
    "icon": "code"
  },
  {
    "id": "data-analysis-7",
    "slug": "data-analysis-estimator",
    "title": "Data Analysis Estimator",
    "name": "Data Analysis Estimator",
    "href": "/tools/data-analysis-estimator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Data Analysis Estimator locally in your browser.",
    "seo": {
      "title": "Data Analysis Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Data Analysis Estimator locally in your browser.",
      "keywords": [
        "data analysis estimator",
        "data analysis",
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
      "data analysis",
      "calculator",
      "data-analysis-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "data-analysis-8",
    "slug": "data-analysis-checker",
    "title": "Data Analysis Checker",
    "name": "Data Analysis Checker",
    "href": "/tools/data-analysis-checker/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Data Analysis Checker locally in your browser.",
    "seo": {
      "title": "Data Analysis Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Data Analysis Checker locally in your browser.",
      "keywords": [
        "data analysis checker",
        "data analysis",
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
      "data analysis",
      "analyzer",
      "data-analysis-checker"
    ],
    "icon": "code"
  },
  {
    "id": "data-analysis-9",
    "slug": "data-analysis-cleaner",
    "title": "Data Analysis Cleaner",
    "name": "Data Analysis Cleaner",
    "href": "/tools/data-analysis-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Data Analysis Cleaner locally in your browser.",
    "seo": {
      "title": "Data Analysis Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Data Analysis Cleaner locally in your browser.",
      "keywords": [
        "data analysis cleaner",
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
      "data-analysis-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "data-analysis-10",
    "slug": "data-analysis-template-maker",
    "title": "Data Analysis Template Maker",
    "name": "Data Analysis Template Maker",
    "href": "/tools/data-analysis-template-maker/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Data Analysis Template Maker locally in your browser.",
    "seo": {
      "title": "Data Analysis Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Data Analysis Template Maker locally in your browser.",
      "keywords": [
        "data analysis template maker",
        "data analysis",
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
      "data analysis",
      "generator",
      "data-analysis-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "data-analysis-11",
    "slug": "data-analysis-planner",
    "title": "Data Analysis Planner",
    "name": "Data Analysis Planner",
    "href": "/tools/data-analysis-planner/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Data Analysis Planner locally in your browser.",
    "seo": {
      "title": "Data Analysis Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Data Analysis Planner locally in your browser.",
      "keywords": [
        "data analysis planner",
        "data analysis",
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
      "data analysis",
      "calculator",
      "data-analysis-planner"
    ],
    "icon": "code"
  },
  {
    "id": "data-analysis-12",
    "slug": "data-analysis-inspector",
    "title": "Data Analysis Inspector",
    "name": "Data Analysis Inspector",
    "href": "/tools/data-analysis-inspector/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "Data Analysis",
    "categorySlug": "data-analysis",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Data Analysis Inspector locally in your browser.",
    "seo": {
      "title": "Data Analysis Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Data Analysis Inspector locally in your browser.",
      "keywords": [
        "data analysis inspector",
        "data analysis",
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
      "data analysis",
      "analyzer",
      "data-analysis-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "visualization-1",
    "slug": "chart-chooser",
    "title": "Chart chooser",
    "name": "Chart chooser",
    "href": "/tools/chart-chooser/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "transform",
    "description": "Chart chooser. Use this privacy-first chart chooser directly in your browser.",
    "seo": {
      "title": "Chart chooser - Free Browser Tool | Nadhebe",
      "description": "Chart chooser. Use this privacy-first chart chooser directly in your browser.",
      "keywords": [
        "chart chooser",
        "visualization",
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
      "visualization",
      "transform",
      "chart-chooser"
    ],
    "icon": "code"
  },
  {
    "id": "visualization-2",
    "slug": "mermaid-preview",
    "title": "Mermaid preview",
    "name": "Mermaid preview",
    "href": "/tools/mermaid-preview/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "generator",
    "description": "Mermaid preview. Use this privacy-first mermaid preview directly in your browser.",
    "seo": {
      "title": "Mermaid preview - Free Browser Tool | Nadhebe",
      "description": "Mermaid preview. Use this privacy-first mermaid preview directly in your browser.",
      "keywords": [
        "mermaid preview",
        "visualization",
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
      "visualization",
      "generator",
      "mermaid-preview"
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
    "id": "visualization-4",
    "slug": "svg-chart-builder",
    "title": "SVG chart builder",
    "name": "SVG chart builder",
    "href": "/tools/svg-chart-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "analyzer",
    "description": "SVG chart builder. Use this privacy-first svg chart builder directly in your browser.",
    "seo": {
      "title": "SVG chart builder - Free Browser Tool | Nadhebe",
      "description": "SVG chart builder. Use this privacy-first svg chart builder directly in your browser.",
      "keywords": [
        "svg chart builder",
        "visualization",
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
      "visualization",
      "analyzer",
      "svg-chart-builder"
    ],
    "icon": "code"
  },
  {
    "id": "visualization-5",
    "slug": "sparkline-generator",
    "title": "Sparkline generator",
    "name": "Sparkline generator",
    "href": "/tools/sparkline-generator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "transform",
    "description": "Sparkline generator. Use this privacy-first sparkline generator directly in your browser.",
    "seo": {
      "title": "Sparkline generator - Free Browser Tool | Nadhebe",
      "description": "Sparkline generator. Use this privacy-first sparkline generator directly in your browser.",
      "keywords": [
        "sparkline generator",
        "visualization",
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
      "visualization",
      "transform",
      "sparkline-generator"
    ],
    "icon": "code"
  },
  {
    "id": "visualization-6",
    "slug": "visualization-builder",
    "title": "Visualization Builder",
    "name": "Visualization Builder",
    "href": "/tools/visualization-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Visualization Builder locally in your browser.",
    "seo": {
      "title": "Visualization Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Visualization Builder locally in your browser.",
      "keywords": [
        "visualization builder",
        "visualization",
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
      "visualization",
      "generator",
      "visualization-builder"
    ],
    "icon": "code"
  },
  {
    "id": "visualization-7",
    "slug": "visualization-estimator",
    "title": "Visualization Estimator",
    "name": "Visualization Estimator",
    "href": "/tools/visualization-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Visualization Estimator locally in your browser.",
    "seo": {
      "title": "Visualization Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Visualization Estimator locally in your browser.",
      "keywords": [
        "visualization estimator",
        "visualization",
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
      "visualization",
      "calculator",
      "visualization-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "visualization-8",
    "slug": "visualization-checker",
    "title": "Visualization Checker",
    "name": "Visualization Checker",
    "href": "/tools/visualization-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Visualization Checker locally in your browser.",
    "seo": {
      "title": "Visualization Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Visualization Checker locally in your browser.",
      "keywords": [
        "visualization checker",
        "visualization",
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
      "visualization",
      "analyzer",
      "visualization-checker"
    ],
    "icon": "code"
  },
  {
    "id": "visualization-9",
    "slug": "visualization-cleaner",
    "title": "Visualization Cleaner",
    "name": "Visualization Cleaner",
    "href": "/tools/visualization-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Visualization Cleaner locally in your browser.",
    "seo": {
      "title": "Visualization Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Visualization Cleaner locally in your browser.",
      "keywords": [
        "visualization cleaner",
        "visualization",
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
      "visualization",
      "transform",
      "visualization-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "visualization-10",
    "slug": "visualization-template-maker",
    "title": "Visualization Template Maker",
    "name": "Visualization Template Maker",
    "href": "/tools/visualization-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Visualization Template Maker locally in your browser.",
    "seo": {
      "title": "Visualization Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Visualization Template Maker locally in your browser.",
      "keywords": [
        "visualization template maker",
        "visualization",
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
      "visualization",
      "generator",
      "visualization-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "visualization-11",
    "slug": "visualization-planner",
    "title": "Visualization Planner",
    "name": "Visualization Planner",
    "href": "/tools/visualization-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Visualization Planner locally in your browser.",
    "seo": {
      "title": "Visualization Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Visualization Planner locally in your browser.",
      "keywords": [
        "visualization planner",
        "visualization",
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
      "visualization",
      "calculator",
      "visualization-planner"
    ],
    "icon": "code"
  },
  {
    "id": "visualization-12",
    "slug": "visualization-inspector",
    "title": "Visualization Inspector",
    "name": "Visualization Inspector",
    "href": "/tools/visualization-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Visualization",
    "categorySlug": "visualization",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Visualization Inspector locally in your browser.",
    "seo": {
      "title": "Visualization Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Visualization Inspector locally in your browser.",
      "keywords": [
        "visualization inspector",
        "visualization",
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
      "visualization",
      "analyzer",
      "visualization-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "api-1",
    "slug": "openapi-3-yaml-generator",
    "title": "OpenAPI Boilerplate Generator",
    "name": "OpenAPI Generator",
    "href": "/tools/openapi-3-yaml-generator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "API",
    "categorySlug": "api",
    "mode": "transform",
    "description": "Scaffold OpenAPI 3.1 specs rapidly. Generate interactive Swagger-like previews as you type.",
    "seo": {
      "title": "OpenAPI 3.1 YAML Generator & Previewer | Nadhebe",
      "description": "Create OpenAPI specifications with a visual UI. Get instant YAML outputs and Swagger-like interactive previews.",
      "keywords": [
        "openapi 3 yaml generator",
        "scaffold openapi yaml spec",
        "visual openapi builder online"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "api",
      "transform",
      "openapi-3-yaml-generator"
    ],
    "icon": "code"
  },
  {
    "id": "api-2",
    "slug": "webhook-payload-signature-generator",
    "title": "Webhook Payload & Signature Tester",
    "name": "Webhook Signature Generator",
    "href": "/tools/webhook-payload-signature-generator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "API",
    "categorySlug": "api",
    "mode": "generator",
    "description": "Generate massive JSON payloads and cryptographic HMAC headers for testing Stripe, GitHub, and Shopify webhooks.",
    "seo": {
      "title": "Webhook Payload & HMAC Signature Generator | Nadhebe",
      "description": "Simulate webhooks locally. Generate payloads and cryptographic signatures (Stripe-Signature, GitHub) to test your endpoints.",
      "keywords": [
        "webhook payload signature generator",
        "simulate stripe github webhook",
        "test hmac webhook locally"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "api",
      "generator",
      "webhook-payload-signature-generator"
    ],
    "icon": "code"
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
    "id": "api-4",
    "slug": "http-status-codes-cheat-sheet",
    "title": "Interactive HTTP Status Explorer",
    "name": "HTTP Status Cheat Sheet",
    "href": "/tools/http-status-codes-cheat-sheet/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "API",
    "categorySlug": "api",
    "mode": "analyzer",
    "description": "A searchable index of HTTP status codes, complete with code snippets for Express and FastAPI.",
    "seo": {
      "title": "HTTP Status Codes Cheat Sheet & Flowchart | Nadhebe",
      "description": "Quickly find the right HTTP status code. Includes decision flowcharts and copy-pasteable error handling snippets.",
      "keywords": [
        "http status codes cheat sheet",
        "what does http 422 mean",
        "http error codes flowchart"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "api",
      "analyzer",
      "http-status-codes-cheat-sheet"
    ],
    "icon": "code"
  },
  {
    "id": "api-5",
    "slug": "rfc-7807-error-json-generator",
    "title": "RFC 7807 Problem Details Formatter",
    "name": "RFC 7807 Error Formatter",
    "href": "/tools/rfc-7807-error-json-generator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "API",
    "categorySlug": "api",
    "mode": "transform",
    "description": "Generate standardized API error blocks enforcing strict RFC 7807 schema structures.",
    "seo": {
      "title": "RFC 7807 Error JSON Generator | Nadhebe",
      "description": "Format your API error responses using the strict RFC 7807 Problem Details specification. Instant JSON preview.",
      "keywords": [
        "rfc 7807 error json generator",
        "standard api error json format",
        "problem details for http apis tool"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "api",
      "transform",
      "rfc-7807-error-json-generator"
    ],
    "icon": "code"
  },
  {
    "id": "api-6",
    "slug": "api-builder",
    "title": "API Builder",
    "name": "API Builder",
    "href": "/tools/api-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "API",
    "categorySlug": "api",
    "mode": "generator",
    "description": "Clean, normalize, and calculate API Builder locally in your browser.",
    "seo": {
      "title": "API Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate API Builder locally in your browser.",
      "keywords": [
        "api builder",
        "api",
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
      "api",
      "generator",
      "api-builder"
    ],
    "icon": "code"
  },
  {
    "id": "api-7",
    "slug": "api-estimator",
    "title": "API Estimator",
    "name": "API Estimator",
    "href": "/tools/api-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "API",
    "categorySlug": "api",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate API Estimator locally in your browser.",
    "seo": {
      "title": "API Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate API Estimator locally in your browser.",
      "keywords": [
        "api estimator",
        "api",
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
      "api",
      "calculator",
      "api-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "api-8",
    "slug": "api-checker",
    "title": "API Checker",
    "name": "API Checker",
    "href": "/tools/api-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "API",
    "categorySlug": "api",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate API Checker locally in your browser.",
    "seo": {
      "title": "API Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate API Checker locally in your browser.",
      "keywords": [
        "api checker",
        "api",
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
      "api",
      "analyzer",
      "api-checker"
    ],
    "icon": "code"
  },
  {
    "id": "api-9",
    "slug": "api-cleaner",
    "title": "API Cleaner",
    "name": "API Cleaner",
    "href": "/tools/api-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "API",
    "categorySlug": "api",
    "mode": "transform",
    "description": "Clean, normalize, and calculate API Cleaner locally in your browser.",
    "seo": {
      "title": "API Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate API Cleaner locally in your browser.",
      "keywords": [
        "api cleaner",
        "api",
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
      "api",
      "transform",
      "api-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "api-10",
    "slug": "api-template-maker",
    "title": "API Template Maker",
    "name": "API Template Maker",
    "href": "/tools/api-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "API",
    "categorySlug": "api",
    "mode": "generator",
    "description": "Clean, normalize, and calculate API Template Maker locally in your browser.",
    "seo": {
      "title": "API Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate API Template Maker locally in your browser.",
      "keywords": [
        "api template maker",
        "api",
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
      "api",
      "generator",
      "api-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "api-11",
    "slug": "api-planner",
    "title": "API Planner",
    "name": "API Planner",
    "href": "/tools/api-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "API",
    "categorySlug": "api",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate API Planner locally in your browser.",
    "seo": {
      "title": "API Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate API Planner locally in your browser.",
      "keywords": [
        "api planner",
        "api",
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
      "api",
      "calculator",
      "api-planner"
    ],
    "icon": "code"
  },
  {
    "id": "api-12",
    "slug": "api-inspector",
    "title": "API Inspector",
    "name": "API Inspector",
    "href": "/tools/api-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "API",
    "categorySlug": "api",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate API Inspector locally in your browser.",
    "seo": {
      "title": "API Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate API Inspector locally in your browser.",
      "keywords": [
        "api inspector",
        "api",
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
      "api",
      "analyzer",
      "api-inspector"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-1",
    "slug": "mcp-server-manifest-generator",
    "title": "MCP Server Manifest Generator",
    "name": "MCP Manifest Builder",
    "href": "/tools/mcp-server-manifest-generator/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "transform",
    "description": "Generate valid mcp.json configurations tailored for specific hosts like Cursor or Claude Desktop.",
    "seo": {
      "title": "MCP Server Manifest Generator | Model Context Protocol Tools",
      "description": "Create valid configuration files for your Model Context Protocol (MCP) servers. Supports profiles for Claude Desktop and Cursor.",
      "keywords": [
        "mcp server manifest generator",
        "how to create mcp.json",
        "model context protocol config builder"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "mcp",
      "transform",
      "mcp-server-manifest-generator"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-2",
    "slug": "openapi-to-mcp-tool-schema",
    "title": "OpenAPI to MCP Schema Converter",
    "name": "MCP Schema Converter",
    "href": "/tools/openapi-to-mcp-tool-schema/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "generator",
    "description": "Convert standard REST OpenAPI endpoints into strict JSON Schemas required for MCP Tools.",
    "seo": {
      "title": "OpenAPI to MCP Tool Schema Converter | Nadhebe",
      "description": "Instantly convert OpenAPI YAML or JSON endpoints into valid Model Context Protocol tool schemas.",
      "keywords": [
        "openapi to mcp tool schema",
        "convert rest api to mcp tools",
        "mcp json schema generator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "mcp",
      "generator",
      "openapi-to-mcp-tool-schema"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-3",
    "slug": "resource-template-planner",
    "title": "Resource template planner",
    "name": "Resource template planner",
    "href": "/tools/resource-template-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "calculator",
    "description": "Resource template planner. Use this privacy-first resource template planner directly in your browser.",
    "seo": {
      "title": "Resource template planner - Free Browser Tool | Nadhebe",
      "description": "Resource template planner. Use this privacy-first resource template planner directly in your browser.",
      "keywords": [
        "resource template planner",
        "mcp",
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
      "mcp",
      "calculator",
      "resource-template-planner"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-4",
    "slug": "server-checklist",
    "title": "Server checklist",
    "name": "Server checklist",
    "href": "/tools/server-checklist/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "analyzer",
    "description": "Server checklist. Use this privacy-first server checklist directly in your browser.",
    "seo": {
      "title": "Server checklist - Free Browser Tool | Nadhebe",
      "description": "Server checklist. Use this privacy-first server checklist directly in your browser.",
      "keywords": [
        "server checklist",
        "mcp",
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
      "mcp",
      "analyzer",
      "server-checklist"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-5",
    "slug": "claude-desktop-mcp-config-maker",
    "title": "Claude Desktop MCP Configurator",
    "name": "Claude MCP Configurator",
    "href": "/tools/claude-desktop-mcp-config-maker/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "transform",
    "description": "Generate the exact claude_desktop_config.json configuration and environment variables for local MCP servers.",
    "seo": {
      "title": "Claude Desktop MCP Config Maker & Generator | Nadhebe",
      "description": "Easily connect local MCP servers to Claude Desktop. Generates absolute paths and env vars for Mac and Windows.",
      "keywords": [
        "claude desktop mcp config maker",
        "add mcp to claude desktop config",
        "claude_desktop_config.json generator"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "mcp",
      "transform",
      "claude-desktop-mcp-config-maker"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-6",
    "slug": "mcp-builder",
    "title": "MCP Builder",
    "name": "MCP Builder",
    "href": "/tools/mcp-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "generator",
    "description": "Clean, normalize, and calculate MCP Builder locally in your browser.",
    "seo": {
      "title": "MCP Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate MCP Builder locally in your browser.",
      "keywords": [
        "mcp builder",
        "mcp",
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
      "mcp",
      "generator",
      "mcp-builder"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-7",
    "slug": "mcp-estimator",
    "title": "MCP Estimator",
    "name": "MCP Estimator",
    "href": "/tools/mcp-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate MCP Estimator locally in your browser.",
    "seo": {
      "title": "MCP Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate MCP Estimator locally in your browser.",
      "keywords": [
        "mcp estimator",
        "mcp",
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
      "mcp",
      "calculator",
      "mcp-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-8",
    "slug": "mcp-checker",
    "title": "MCP Checker",
    "name": "MCP Checker",
    "href": "/tools/mcp-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate MCP Checker locally in your browser.",
    "seo": {
      "title": "MCP Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate MCP Checker locally in your browser.",
      "keywords": [
        "mcp checker",
        "mcp",
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
      "mcp",
      "analyzer",
      "mcp-checker"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-9",
    "slug": "mcp-cleaner",
    "title": "MCP Cleaner",
    "name": "MCP Cleaner",
    "href": "/tools/mcp-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "transform",
    "description": "Clean, normalize, and calculate MCP Cleaner locally in your browser.",
    "seo": {
      "title": "MCP Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate MCP Cleaner locally in your browser.",
      "keywords": [
        "mcp cleaner",
        "mcp",
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
      "mcp",
      "transform",
      "mcp-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-10",
    "slug": "mcp-template-maker",
    "title": "MCP Template Maker",
    "name": "MCP Template Maker",
    "href": "/tools/mcp-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "generator",
    "description": "Clean, normalize, and calculate MCP Template Maker locally in your browser.",
    "seo": {
      "title": "MCP Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate MCP Template Maker locally in your browser.",
      "keywords": [
        "mcp template maker",
        "mcp",
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
      "mcp",
      "generator",
      "mcp-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-11",
    "slug": "mcp-planner",
    "title": "MCP Planner",
    "name": "MCP Planner",
    "href": "/tools/mcp-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate MCP Planner locally in your browser.",
    "seo": {
      "title": "MCP Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate MCP Planner locally in your browser.",
      "keywords": [
        "mcp planner",
        "mcp",
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
      "mcp",
      "calculator",
      "mcp-planner"
    ],
    "icon": "code"
  },
  {
    "id": "mcp-12",
    "slug": "mcp-json-rpc-payload-tester",
    "title": "MCP Payload Simulator & Validator",
    "name": "MCP Payload Validator",
    "href": "/tools/mcp-json-rpc-payload-tester/",
    "component": "PlatformWorkbench",
    "status": "implemented",
    "category": "MCP",
    "categorySlug": "mcp",
    "mode": "analyzer",
    "description": "Mock MCP clients by validating raw JSON-RPC responses against the official Model Context Protocol spec.",
    "seo": {
      "title": "MCP JSON-RPC Payload Tester & Validator | Nadhebe",
      "description": "Debug your MCP server. Paste raw JSON-RPC payloads to validate them against strict Model Context Protocol schemas.",
      "keywords": [
        "mcp json rpc payload tester",
        "debug mcp server json rpc",
        "validate mcp json response"
      ]
    },
    "relatedTools": [
      "json-formatter",
      "csv-to-json",
      "uuid-generator",
      "aspect-ratio-calculator"
    ],
    "tags": [
      "mcp",
      "analyzer",
      "mcp-json-rpc-payload-tester"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-1",
    "slug": "agent-task-graph-builder",
    "title": "Agent task graph builder",
    "name": "Agent task graph builder",
    "href": "/tools/agent-task-graph-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "transform",
    "description": "Agent task graph builder. Use this privacy-first agent task graph builder directly in your browser.",
    "seo": {
      "title": "Agent task graph builder - Free Browser Tool | Nadhebe",
      "description": "Agent task graph builder. Use this privacy-first agent task graph builder directly in your browser.",
      "keywords": [
        "agent task graph builder",
        "automation & agents",
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
      "automation & agents",
      "transform",
      "agent-task-graph-builder"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-2",
    "slug": "n8n-workflow-planner",
    "title": "n8n workflow planner",
    "name": "n8n workflow planner",
    "href": "/tools/n8n-workflow-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "generator",
    "description": "n8n workflow planner. Use this privacy-first n8n workflow planner directly in your browser.",
    "seo": {
      "title": "n8n workflow planner - Free Browser Tool | Nadhebe",
      "description": "n8n workflow planner. Use this privacy-first n8n workflow planner directly in your browser.",
      "keywords": [
        "n8n workflow planner",
        "automation & agents",
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
      "automation & agents",
      "generator",
      "n8n-workflow-planner"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-3",
    "slug": "zapier-formatter",
    "title": "Zapier formatter",
    "name": "Zapier formatter",
    "href": "/tools/zapier-formatter/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "calculator",
    "description": "Zapier formatter. Use this privacy-first zapier formatter directly in your browser.",
    "seo": {
      "title": "Zapier formatter - Free Browser Tool | Nadhebe",
      "description": "Zapier formatter. Use this privacy-first zapier formatter directly in your browser.",
      "keywords": [
        "zapier formatter",
        "automation & agents",
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
      "automation & agents",
      "calculator",
      "zapier-formatter"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-4",
    "slug": "comfyui-prompt-helper",
    "title": "ComfyUI prompt helper",
    "name": "ComfyUI prompt helper",
    "href": "/tools/comfyui-prompt-helper/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "analyzer",
    "description": "ComfyUI prompt helper. Use this privacy-first comfyui prompt helper directly in your browser.",
    "seo": {
      "title": "ComfyUI prompt helper - Free Browser Tool | Nadhebe",
      "description": "ComfyUI prompt helper. Use this privacy-first comfyui prompt helper directly in your browser.",
      "keywords": [
        "comfyui prompt helper",
        "automation & agents",
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
      "automation & agents",
      "analyzer",
      "comfyui-prompt-helper"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-5",
    "slug": "handoff-checklist",
    "title": "Handoff checklist",
    "name": "Handoff checklist",
    "href": "/tools/handoff-checklist/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "transform",
    "description": "Handoff checklist. Use this privacy-first handoff checklist directly in your browser.",
    "seo": {
      "title": "Handoff checklist - Free Browser Tool | Nadhebe",
      "description": "Handoff checklist. Use this privacy-first handoff checklist directly in your browser.",
      "keywords": [
        "handoff checklist",
        "automation & agents",
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
      "automation & agents",
      "transform",
      "handoff-checklist"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-6",
    "slug": "automation-and-agents-builder",
    "title": "Automation and Agents Builder",
    "name": "Automation and Agents Builder",
    "href": "/tools/automation-and-agents-builder/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Automation and Agents Builder locally in your browser.",
    "seo": {
      "title": "Automation and Agents Builder - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Automation and Agents Builder locally in your browser.",
      "keywords": [
        "automation and agents builder",
        "automation & agents",
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
      "automation & agents",
      "generator",
      "automation-and-agents-builder"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-7",
    "slug": "automation-and-agents-estimator",
    "title": "Automation and Agents Estimator",
    "name": "Automation and Agents Estimator",
    "href": "/tools/automation-and-agents-estimator/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Automation and Agents Estimator locally in your browser.",
    "seo": {
      "title": "Automation and Agents Estimator - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Automation and Agents Estimator locally in your browser.",
      "keywords": [
        "automation and agents estimator",
        "automation & agents",
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
      "automation & agents",
      "calculator",
      "automation-and-agents-estimator"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-8",
    "slug": "automation-and-agents-checker",
    "title": "Automation and Agents Checker",
    "name": "Automation and Agents Checker",
    "href": "/tools/automation-and-agents-checker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Automation and Agents Checker locally in your browser.",
    "seo": {
      "title": "Automation and Agents Checker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Automation and Agents Checker locally in your browser.",
      "keywords": [
        "automation and agents checker",
        "automation & agents",
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
      "automation & agents",
      "analyzer",
      "automation-and-agents-checker"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-9",
    "slug": "automation-and-agents-cleaner",
    "title": "Automation and Agents Cleaner",
    "name": "Automation and Agents Cleaner",
    "href": "/tools/automation-and-agents-cleaner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "transform",
    "description": "Clean, normalize, and calculate Automation and Agents Cleaner locally in your browser.",
    "seo": {
      "title": "Automation and Agents Cleaner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Automation and Agents Cleaner locally in your browser.",
      "keywords": [
        "automation and agents cleaner",
        "automation & agents",
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
      "automation & agents",
      "transform",
      "automation-and-agents-cleaner"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-10",
    "slug": "automation-and-agents-template-maker",
    "title": "Automation and Agents Template Maker",
    "name": "Automation and Agents Template Maker",
    "href": "/tools/automation-and-agents-template-maker/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "generator",
    "description": "Clean, normalize, and calculate Automation and Agents Template Maker locally in your browser.",
    "seo": {
      "title": "Automation and Agents Template Maker - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Automation and Agents Template Maker locally in your browser.",
      "keywords": [
        "automation and agents template maker",
        "automation & agents",
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
      "automation & agents",
      "generator",
      "automation-and-agents-template-maker"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-11",
    "slug": "automation-and-agents-planner",
    "title": "Automation and Agents Planner",
    "name": "Automation and Agents Planner",
    "href": "/tools/automation-and-agents-planner/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "calculator",
    "description": "Clean, normalize, and calculate Automation and Agents Planner locally in your browser.",
    "seo": {
      "title": "Automation and Agents Planner - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Automation and Agents Planner locally in your browser.",
      "keywords": [
        "automation and agents planner",
        "automation & agents",
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
      "automation & agents",
      "calculator",
      "automation-and-agents-planner"
    ],
    "icon": "code"
  },
  {
    "id": "automation-agents-12",
    "slug": "automation-and-agents-inspector",
    "title": "Automation and Agents Inspector",
    "name": "Automation and Agents Inspector",
    "href": "/tools/automation-and-agents-inspector/",
    "component": "PlatformWorkbench",
    "status": "planned",
    "category": "Automation & Agents",
    "categorySlug": "automation-agents",
    "mode": "analyzer",
    "description": "Clean, normalize, and calculate Automation and Agents Inspector locally in your browser.",
    "seo": {
      "title": "Automation and Agents Inspector - Free Browser Tool | Nadhebe",
      "description": "Clean, normalize, and calculate Automation and Agents Inspector locally in your browser.",
      "keywords": [
        "automation and agents inspector",
        "automation & agents",
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
      "automation & agents",
      "analyzer",
      "automation-and-agents-inspector"
    ],
    "icon": "code"
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
      "prompt-improver",
      "llm-token-counter-multi-model",
      "ai-api-pricing-calculator"
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
      "prompt-improver",
      "ai-persona-prompt-generator",
      "llm-token-counter-multi-model"
    ],
    "tags": [
      "ai",
      "ai-prompt-generator"
    ],
    "icon": "user-check"
  },
  {
    "id": "ai-3",
    "slug": "prompt-improver",
    "title": "Vague AI Prompt Enhancer & Rewriter",
    "name": "Vague AI Prompt Enhancer & Rewriter",
    "href": "/tools/prompt-improver/",
    "component": "src/pages/tools/prompt-improver.astro",
    "status": "implemented",
    "category": "AI",
    "categorySlug": "ai",
    "mode": "generator",
    "description": "Transform short, vague AI prompts into high-performance system instructions with Chain-of-Thought reasoning.",
    "seo": {
      "title": "Vague AI Prompt Enhancer & Rewriter | Nadhebe",
      "description": "Transform short, vague AI prompts into detailed, high-performance system instructions with Chain-of-Thought reasoning and negative constraints.",
      "keywords": [
        "prompt improver",
        "ai prompt rewriter",
        "vague prompt enhancer",
        "chain-of-thought prompt",
        "prompt engineering"
      ]
    },
    "relatedTools": [
      "prompt-optimizer",
      "ai-prompt-generator",
      "ai-detection-checker",
      "llm-token-counter-multi-model"
    ],
    "tags": [
      "ai",
      "prompt-improver"
    ],
    "icon": "wand-2"
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
      "prompt-improver",
      "prompt-optimizer",
      "llm-token-counter-multi-model",
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
      "llm-token-counter-multi-model",
      "ai-api-pricing-calculator",
      "rag-context-window-calculator",
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
      "rag-chunk-size-calculator",
      "rag-context-window-calculator",
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
      "openapi-to-mcp-tool-schema",
      "json-formatter",
      "schema-validator",
      "mcp-json-rpc-payload-tester"
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
      "ai-api-pricing-calculator",
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
      "ai-api-pricing-calculator",
      "claude-desktop-mcp-config-maker"
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
      "ai-api-pricing-calculator",
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
      "json-formatter",
      "epoch-converter"
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
      "ai-api-pricing-calculator",
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
  }
];

export const IMPLEMENTED_TOOLS = UNIFIED_TOOLS_REGISTRY.filter((t) => t.status === 'implemented');
export const PLANNED_TOOLS = UNIFIED_TOOLS_REGISTRY.filter((t) => t.status === 'planned');

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
