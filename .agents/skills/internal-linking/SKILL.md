---
name: internal-linking
description: Design, audit, and optimize internal linking hierarchies, anchor text distribution, and topic cluster equity. Use when planning internal link networks, fixing orphan pages, or integrating with Nadhebe's automated build-time linker.
---

# Strategic Internal Linking & Link Equity Architecture

Activate this skill when planning, auditing, or optimizing internal link structures across Nadhebe's technical content.

---

## 1. When to Activate This Skill

- When linking a newly written article to existing pillar and cluster guides.
- When selecting natural, descriptive anchor text that prevents keyword stuffing.
- When preventing orphan pages and optimizing search crawler pageRank distribution.
- When troubleshooting or configuring `scripts/run-internal-linker.ts` and `scripts/verify-links.ts`.

---

## 2. Link Hierarchy Rules in Nadhebe

Nadhebe follows a strict 4-way internal linking topology:

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      INTERNAL LINKING TOPOLOGY                         │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  PILLAR → CLUSTER    │  │  CLUSTER → PILLAR    │  │  CLUSTER ↔ CLUSTER   │
├──────────────────────┤  ├──────────────────────┤  ├──────────────────────┤
│ • Authority push     │  │ • Equity consolidation│ • Semantic depth      │
│ • "Related Guides"   │  │ • Link in first 300w │  │ • Contextual mention │
│ • Broad to specific  │  │ • Mandatory link back│  │ • Complementary tech │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

### 1. Pillar → Cluster (Downward Equity)
Pillar articles must link out to their child cluster posts within the body text or dedicated "Related Pricing Guides" / "Related Architectures" sections.

### 2. Cluster → Pillar (Upward Consolidation — Mandatory)
Every supporting cluster post **MUST link back to its parent pillar guide** within the opening 300 words. For example, in `deepseek-api-pricing-guide.md`:
> *"For high-volume developers, comparing token rates against our [OpenAI API & ChatGPT Pricing Guide](/guides/openai-chatgpt-pricing-guide) highlights key cost differences..."*

### 3. Cluster ↔ Cluster (Cross-Cluster Semantic Links)
Articles sharing technical dependencies should link horizontally:
- A guide deploying vLLM links to `RunPod GPU Pricing Explained`
- A guide configuring Claude Code links to `Cursor Pricing Guide`

---

## 3. Anchor Text Best Practices

| Anchor Text Style | Example | Status | Reason |
| :--- | :--- | :--- | :--- |
| **Descriptive Phrase** | `[OpenAI API & ChatGPT Pricing Guide](/guides/openai-chatgpt-pricing-guide)` | ✅ Recommended | Clear context for both readers and search crawlers |
| **Natural Sentence Flow** | `review our [deep-dive on prompt caching token rates](/guides/claude-code-pricing-guide)` | ✅ Recommended | Reads organically without feeling forced |
| **Generic Link** | `Read more [here](/guides/...)` | ❌ Prohibited | Provides zero semantic context to search engines |
| **Over-Optimized Exact Match**| `best ai pricing best ai pricing best ai pricing` | ❌ Prohibited | Triggers Google spam and over-optimization penalties |

---

## 4. Automated Build Integration

Nadhebe utilizes an automated build-time pipeline:
- `scripts/run-internal-linker.ts`: Automatically injects contextual links for existing articles across compiled HTML files based on title keyword matching.
- `scripts/verify-links.ts`: Automatically tests every internal link during `npm run build` to ensure **0 broken links**.

Always format markdown links with absolute project paths:
`[Link Text](/guides/slug-name)` or `[Link Text](/tutorials/slug-name)`
Never use relative paths like `../guides/slug.md` in markdown content.
