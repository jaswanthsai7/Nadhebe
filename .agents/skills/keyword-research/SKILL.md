---
name: keyword-research
description: Perform comprehensive SEO keyword research, search intent mapping, SERP competitive analysis, and AEO query discovery for technical AI engineering topics. Use when identifying target keywords, search intent, long-tail query variations, or evaluating ranking competition.
---

# Technical Keyword Research & Search Intent Mapping

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
