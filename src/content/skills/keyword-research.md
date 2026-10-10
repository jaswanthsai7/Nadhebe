---
name: "Technical Keyword Research & Intent Mapping"
description: "Perform developer-focused keyword research, search intent mapping, and conversational AEO query discovery."
category: "SEO"
author: "Nadhebe Engineering"
license: "MIT"
source_url: "https://github.com/nadhebe/nadhebe-skills"
download: "/skills/keyword-research.zip"
tested_on: "Claude Code 2.x, Cursor, Perplexity API"
reviewed_on: 2026-10-10
version: "1.0.0"
tags: ["keyword-research", "agent-skills", "claude-code", "mcp", "seo"]
compatibility: ["Claude Code", "Cursor", "Antigravity"]
---

## Overview

Perform developer-focused keyword research, search intent mapping, and conversational AEO query discovery.

### Verification & Test Notes
> [!NOTE]
> **Tested & Reviewed on 2026-10-10** for runtime environment **Claude Code 2.x, Cursor, Perplexity API**.
> 
> Verified against technical developer queries. Accurately maps head-terms, long-tail CLI error phrases, and natural language questions. Prompt latency under 1.2s on Claude 3.5 Sonnet.

---

## Installation & Setup

### Option 1: Direct Skill Download
1. Download [**Technical Keyword Research & Intent Mapping (keyword-research.zip)**](/skills/keyword-research.zip).
2. Unpack the zip file into your workspace agent directory:
   * **Antigravity IDE**: `.agents/skills/keyword-research/`
   * **Claude Code**: `~/.claude/skills/keyword-research/` or `.agents/skills/keyword-research/`
   * **Cursor**: `.cursor/rules/keyword-research/` or your project prompt definitions.

### Option 2: CLI Activation
If using Antigravity or compatible agent runners:
```bash
# Load into active workspace
mkdir -p .agents/skills/keyword-research
curl -sL https://nadhebe.com/skills/keyword-research.zip -o /tmp/keyword-research.zip
unzip /tmp/keyword-research.zip -d .agents/skills/keyword-research/
```

---

## Skill Instructions & Reference

### Technical Keyword Research & Search Intent Mapping

Activate this skill when researching, identifying, or prioritizing keywords for technical AI guides, tutorials, tool reviews, and comparisons.

---

## 1. When to Activate This Skill

- When planning a new technical article or comparing tools.
- When determining the primary target keyword vs secondary LSI keywords.
- When evaluating search intent (informational, commercial investigation, tutorial/code, navigational).
- When discovering natural-language conversational queries asked in Perplexity, ChatGPT, and Google.

---

## 2. Research Workflow

### Step 1: Query Discovery & Intent Classification
Classify the dominant search intent for the target topic:

| Intent Category | Query Patterns | Expected Page Format in Nadhebe |
| :--- | :--- | :--- |
| **Tutorial / Code** | "How to deploy vLLM on AWS", "Setup MCP server" | `src/content/tutorials/` (hands-on code walkthrough) |
| **Commercial / Costs**| "Claude Code pricing", "Cursor vs Windsurf costs" | `src/content/guides/` (cost matrices, ROI analysis) |
| **Comparison** | "vLLM vs Ollama", "DeepSeek R1 vs OpenAI o1" | `src/content/comparisons/` (head-to-head benchmarks) |
| **Review / Evaluation**| "Instatic CMS review", "Best cloud GPU 2026" | `src/content/tool-reviews/` (in-depth hands-on review) |
| **News / Release** | "Kimi K3 release", "Gemini 3.6 Flash announcement"| `src/content/news/` (architectural analysis) |

### Step 2: Semantic Variation & AEO Query Expansion
For every primary topic, extract:
1. **Primary Seed Keyword**: Highest relevance developer search query (e.g., `claude code pricing`).
2. **Secondary LSI Keywords**: Exact technical terms and commands (e.g., `claude token limits`, `anthropic console api rate limits`, `prompt caching discounts`).
3. **Conversational AEO Queries**: Natural questions asked to AI search engines (e.g., `how much does a 1 hour claude code session cost`).

### Step 3: Competitive SERP Analysis
Analyze existing ranking pages to identify:
- **Content Gaps**: Missing code examples, outdated 2024/2025 pricing, omitted prompt caching details, or lack of architecture diagrams.
- **Format Requirements**: Do the top results feature tables, bash commands, or mermaid flowcharts?
- **Domain Authority Expectations**: Differentiate achievable niche technical keywords from broad uncompetitive terms.

---

## 3. Output Format

When generating keyword research output, present results in this clean markdown matrix:

```markdown
### Keyword Research Summary

- **Topic**: [Subject Area]
- **Primary Keyword**: [Target Keyword]
- **Search Intent**: informational | commercial | tutorial | comparison
- **Target Audience**: AI Engineers | DevOps | Technical Leads | Solopreneurs
- **Recommended Nadhebe Collection**: `guides` | `tutorials` | `comparisons` | `tool-reviews` | `news`

| Keyword Variant | Search Intent | Est. Competition | Recommended Section / Heading |
| :--- | :--- | :--- | :--- |
| [Primary Keyword] | [Intent] | Low / Med / High | H1 / Title Tag / First 100 words |
| [Secondary Keyword 1] | [Intent] | Low / Med | H2: Overview & Rates |
| [Secondary Keyword 2] | [Intent] | Low / Med | H2: Cost Optimization |

#### Conversational AEO Queries (FAQ Targets)
1. "Question 1?" -> Direct answer targeting FAQ schema
2. "Question 2?" -> Direct answer targeting FAQ schema
```
