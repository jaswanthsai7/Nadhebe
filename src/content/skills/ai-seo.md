---
name: "Generative Engine Optimization (GEO)"
description: "Optimize technical content for AI search engines, GEO, and LLM citations across Google AI Overviews, Perplexity, ChatGPT Search, Claude, and Gemini."
category: "AI Search"
author: "Nadhebe Engineering"
license: "MIT"
source_url: "https://github.com/nadhebe/nadhebe-skills"
download: "/skills/ai-seo.zip"
tested_on: "Perplexity Pro, ChatGPT Search, Gemini 3.8"
reviewed_on: 2026-10-10
version: "1.0.0"
tags: ["ai-seo", "agent-skills", "claude-code", "mcp", "ai search"]
compatibility: ["Claude Code", "Cursor", "Antigravity"]
---

## Overview

Optimize technical content for AI search engines, GEO, and LLM citations across Google AI Overviews, Perplexity, ChatGPT Search, Claude, and Gemini.

### Verification & Test Notes
> [!NOTE]
> **Tested & Reviewed on 2026-10-10** for runtime environment **Perplexity Pro, ChatGPT Search, Gemini 3.8**.
> 
> Extracts concise 2-3 sentence answer blocks. Tested for high LLM citation probability and machine-readable data tables.

---

## Installation & Setup

### Option 1: Direct Skill Download
1. Download [**Generative Engine Optimization (GEO) (ai-seo.zip)**](/skills/ai-seo.zip).
2. Unpack the zip file into your workspace agent directory:
   * **Antigravity IDE**: `.agents/skills/ai-seo/`
   * **Claude Code**: `~/.claude/skills/ai-seo/` or `.agents/skills/ai-seo/`
   * **Cursor**: `.cursor/rules/ai-seo/` or your project prompt definitions.

### Option 2: CLI Activation
If using Antigravity or compatible agent runners:
```bash
# Load into active workspace
mkdir -p .agents/skills/ai-seo
curl -sL https://nadhebe.com/skills/ai-seo.zip -o /tmp/ai-seo.zip
unzip /tmp/ai-seo.zip -d .agents/skills/ai-seo/
```

---

## Skill Instructions & Reference

### AI SEO & Generative Engine Optimization (GEO/AEO)

You are an expert in AI Search Optimization (GEO/AEO) — the practice of making technical content discoverable, extractable, and citable by AI systems including Google AI Overviews, ChatGPT Search, Perplexity, Claude, and Gemini.

---

## 1. When to Activate This Skill

- When designing or reviewing content to be cited as an authoritative source in AI responses.
- When structuring definition blocks, comparisons, FAQs, and data tables for LLM information extraction.
- When auditing robots.txt and server headers for AI crawlers (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`).
- When optimizing content for answer engine queries ("What is X", "X vs Y", "How much does X cost").

---

## 2. Core Differences: Traditional SEO vs AI Search (GEO)

| Dimension | Traditional SEO | Generative Engine Optimization (GEO/AEO) |
| :--- | :--- | :--- |
| **Primary Goal** | Rank on Google SERP Page 1 | Be cited as an authoritative source in AI answers |
| **User Flow** | Click on link in search results | Read synthesized answer directly, with optional citation click |
| **Ranking Position** | Top 3 positions take 60%+ clicks | Pages ranking on page 2 or 3 can be cited if extractable |
| **Content Structure**| Keyword density, long dwell time | Self-contained answer blocks, clear entity definitions |
| **Data Anchors** | Generic body text | Structured tables, benchmarks, exact numbers, code blocks |

---

## 3. High-Citation Content Patterns (GEO Rules)

To maximize citation frequency in Google AI Overviews and Perplexity:

### Rule 1: The Direct-Answer Block (Under H2/H3)
Directly beneath every core heading, provide a **2–3 sentence direct answer block**. This block must be self-contained so an LLM can quote it without needing surrounding context.

```markdown
## What is Prompt Caching in Anthropic Claude?

Prompt caching is an optimization feature in the Anthropic Claude API that stores repeated prompt prefixes—such as codebase context, system instructions, or long documents—in memory. On subsequent API calls matching the cached prefix within a 5-minute time-to-live window, input token costs are reduced by 90% ($0.30/1M vs $3.00/1M on Claude 3.7 Sonnet).
```

### Rule 2: Structured Comparison Matrices
AI engines favor markdown and HTML tables for multi-entity comparison queries ("X vs Y"). Include explicit columns for Pricing, Token Limits, Architecture, and Key Tradeoffs.

### Rule 3: Exact Entity Definitions
Avoid vague pronouns ("it works well"). Always use the full entity name ("Claude Code CLI executes shell tests...") in the topic sentence of every section to assist NLP entity extraction.

### Rule 4: Data Point Sourcing
LLMs prioritize verifiable claims. Whenever citing costs, benchmarks, or throughput, include exact values and link to the primary official documentation.

---

## 4. AI Crawler Configuration (`robots.txt`)

Ensure your domain permits AI search engines while managing training scrapers:

```text
# Allow AI Search & Citation Engines
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

# Block aggressive non-search training scrapers if desired
User-agent: CCBot
Disallow: /
```

---

## 5. Verification Checklist

Before publishing, verify:
- [ ] Every H2 has a direct 2-3 sentence summary or definition block immediately underneath.
- [ ] Key numerical claims cite official documentation or verified benchmarks.
- [ ] Comparison sections use structured markdown tables.
- [ ] The page includes an FAQ section with direct, authoritative answers.
- [ ] Full entity names are used in topic sentences rather than ambiguous pronouns.
