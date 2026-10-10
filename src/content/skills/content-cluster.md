---
name: "Topical Authority & Content Clustering"
description: "Map topical authority architectures, pillar articles, and supporting cluster pages to build search dominance without keyword cannibalization."
category: "Content Strategy"
author: "Nadhebe Engineering"
license: "MIT"
source_url: "https://github.com/nadhebe/nadhebe-skills"
download: "/skills/content-cluster.zip"
tested_on: "Claude Code 2.x, Python 3.11, Astro 5"
reviewed_on: 2026-10-10
version: "1.0.0"
tags: ["content-cluster", "agent-skills", "claude-code", "mcp", "content strategy"]
compatibility: ["Claude Code", "Cursor", "Antigravity"]
---

## Overview

Map topical authority architectures, pillar articles, and supporting cluster pages to build search dominance without keyword cannibalization.

### Verification & Test Notes
> [!NOTE]
> **Tested & Reviewed on 2026-10-10** for runtime environment **Claude Code 2.x, Python 3.11, Astro 5**.
> 
> Tested across 15+ pillar topics. Enforces parent-child hierarchy and prevents keyword overlap across sub-guides.

---

## Installation & Setup

### Option 1: Direct Skill Download
1. Download [**Topical Authority & Content Clustering (content-cluster.zip)**](/skills/content-cluster.zip).
2. Unpack the zip file into your workspace agent directory:
   * **Antigravity IDE**: `.agents/skills/content-cluster/`
   * **Claude Code**: `~/.claude/skills/content-cluster/` or `.agents/skills/content-cluster/`
   * **Cursor**: `.cursor/rules/content-cluster/` or your project prompt definitions.

### Option 2: CLI Activation
If using Antigravity or compatible agent runners:
```bash
# Load into active workspace
mkdir -p .agents/skills/content-cluster
curl -sL https://nadhebe.com/skills/content-cluster.zip -o /tmp/content-cluster.zip
unzip /tmp/content-cluster.zip -d .agents/skills/content-cluster/
```

---

## Skill Instructions & Reference

### Content Clustering & Topical Authority Architecture

Activate this skill when planning a topical cluster to establish domain authority across a technical niche (e.g., "AI Tool Costs", "Local LLM Serving", "Model Context Protocol").

---

## 1. When to Activate This Skill

- When planning multiple related articles around a core technical discipline.
- When organizing existing content into structured hub-and-spoke hierarchies.
- When preventing keyword cannibalization across similar articles.
- When configuring Nadhebe's topic cluster schema fields (`isPillar`, `topic`, `parentPillar`).

---

## 2. Topic Cluster Architecture in Nadhebe

Nadhebe's content collections use frontmatter fields to link cluster articles automatically in `src/layouts/ArticleLayout.astro`:

```
                       ┌──────────────────────────────┐
                       │         PILLAR GUIDE         │
                       │    (isPillar: true)          │
                       │ topic: "AI Tool Costs"       │
                       └──────────────┬───────────────┘
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│  CLUSTER POST 1  │         │  CLUSTER POST 2  │         │  CLUSTER POST 3  │
│ parentPillar:    │         │ parentPillar:    │         │ parentPillar:    │
│  "claude-code..."│         │  "claude-code..."│         │  "claude-code..."│
└──────────────────┘         └──────────────────┘         └──────────────────┘
```

### 1. The Pillar Page (`isPillar: true`)
- **Role**: Comprehensive, overarching resource covering the whole topic at a broad architectural level.
- **Example**: `claude-code-pricing-guide.md` or `openai-chatgpt-pricing-guide.md`.
- **Word Count**: 2,500 – 4,000 words.
- **Linking Rule**: Links out to all child cluster posts via contextual recommendation cards.

### 2. Supporting Cluster Articles (`parentPillar: "<slug>"`)
- **Role**: Deep-dive focused guides targeting specific sub-queries, setup workflows, or specific model comparisons.
- **Example**: `runpod-pricing-explained.md`, `deepseek-api-pricing-guide.md`.
- **Word Count**: 1,200 – 2,500 words.
- **Linking Rule**: Must include a prominent link back to the parent pillar within the first 300 words.

---

## 3. Step-by-Step Cluster Planning Workflow

1. **Define Core Topic**: Choose an umbrella category (e.g. `GPU Cloud Infrastructure`).
2. **Assign Pillar Post**: Identify or create the authoritative cornerstone piece with `isPillar: true` and `topic: "..."`.
3. **Map 4–8 Supporting Cluster Topics**: Each supporting post must target a distinct search intent:
   - *Cluster Post A*: Implementation / setup guide
   - *Cluster Post B*: Cost optimization / pricing breakdown
   - *Cluster Post C*: Direct head-to-head comparison
   - *Cluster Post D*: Troubleshooting / common failures
4. **Enforce Distinct URL Slugs & Keywords**: Verify that no two pages in the cluster target identical primary search phrases.

---

## 4. Cluster Specification Output Template

```markdown
### Content Cluster Blueprint: [Topic Cluster Name]

- **Topic Cluster**: [Name, e.g. "AI Tool Costs"]
- **Pillar Article**: `src/content/guides/[pillar-slug].md`
  - **Title**: [Comprehensive Pillar Title]
  - **Target Keyword**: [Broad Primary Keyword]
  - **Frontmatter Config**: `isPillar: true`, `topic: "[Cluster Name]"`

#### Supporting Cluster Posts

1. **Article 1**: `src/content/guides/[sub-slug-1].md`
   - **Title**: [Focused Sub-topic Title]
   - **Target Keyword**: [Specific Long-tail Keyword]
   - **Frontmatter Config**: `isPillar: false`, `topic: "[Cluster Name]"`, `parentPillar: "[pillar-slug]"`
   - **Link to Pillar**: [Anchor text and placement]

2. **Article 2**: `src/content/guides/[sub-slug-2].md`
   - **Title**: [Focused Sub-topic Title]
   - **Target Keyword**: [Specific Long-tail Keyword]
   - **Frontmatter Config**: `isPillar: false`, `topic: "[Cluster Name]"`, `parentPillar: "[pillar-slug]"`
```
