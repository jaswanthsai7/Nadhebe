---
title: "Perplexity AI Pricing Guide: Free vs Pro, Enterprise, and Sonar API Costs (2026)"
description: "A complete guide to Perplexity AI pricing. Compare Perplexity Free, Pro $20/mo, Enterprise Pro, and Sonar API search token costs with live web grounding."
pubDate: 2026-10-10
updatedDate: 2026-10-10
author: nadhebe-team
category: "Guides"
tags: ["Perplexity AI", "Pricing", "Perplexity Pro", "Sonar API", "Search LLMs", "AI Tool Costs"]
heroImage: "/images/perplexity-ai-pricing-hero.webp"
heroAlt: "Minimalist vintage editorial illustration of internet search radar and academic catalog on a soft lavender pastel background"
estimatedReadingTime: 12
isPillar: true
topic: "AI Tool Costs"
searchIntent: "commercial"
draft: false
faq:
  - question: "Is Perplexity Pro worth the $20/month subscription?"
    answer: "Yes, for researchers and developers. Perplexity Pro provides 300+ Pro searches daily, access to frontier model switchers (Claude 3.7 Sonnet, GPT-4o, DeepSeek R1), unlimited file uploads, and a recurring $5 monthly Sonar API credit."
  - question: "How does Perplexity Sonar API billing work?"
    answer: "Perplexity Sonar API uses a two-part billing model: a flat search fee ($1 to $5 per 1,000 search queries) plus standard token consumption ($1.00 to $15.00 per 1M tokens depending on model size)."
  - question: "Can I use DeepSeek R1 or Claude 3.7 Sonnet inside Perplexity Pro?"
    answer: "Yes. In Perplexity Pro settings, users can select their preferred default reasoning engine, switching between Sonar, Claude 3.7 Sonnet, GPT-4o, and DeepSeek R1 for deep search tasks."
  - question: "What privacy protections are included in Perplexity Enterprise Pro?"
    answer: "Perplexity Enterprise Pro ($40/user/mo) guarantees zero retention for model training, enterprise SSO (Okta/Azure AD), centralized billing, and SOC 2 Type II compliance."
sources:
  - label: "Perplexity AI Pricing Page"
    url: "https://www.perplexity.ai/pro"
  - label: "Perplexity API Documentation"
    url: "https://docs.perplexity.ai/guides/pricing"
---

# Perplexity AI Pricing Guide: Free vs Pro, Enterprise, and Sonar API Costs (2026)

**Perplexity AI** has established itself as the leading conversational search engine and research platform. By fusing real-time web index retrieval with frontier LLMs, Perplexity provides direct, cited answers that bypass traditional search engine advertising.

Whether evaluating **Perplexity Pro** for daily technical research or integrating the **Sonar API** into automated workflows, this guide outlines all plans, tier limits, and API billing rates.

---

## 1. Perplexity Subscription Plans Comparison

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      PERPLEXITY SUBSCRIPTION MATRIX                    │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│     FREE TIER        │  │     PRO ($20/MO)     │  │ ENTERPRISE ($40/MO)  │
├──────────────────────┤  ├──────────────────────┤  ├──────────────────────┤
│ • Quick Search       │  │ • 300+ Pro Searches  │  │ • All Pro Features   │
│ • 5 Pro searches/day │  │ • Claude 3.7 & GPT-4o│  │ • Zero Data Retention│
│ • Standard Index     │  │ • $5/mo Sonar Credit │  │ • SOC 2 & Admin SSO  │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

| Plan Feature | Free | Pro ($20 / month or $200 / yr) | Enterprise Pro ($40 / seat / mo) |
| :--- | :--- | :--- | :--- |
| **Quick Searches** | Unlimited | Unlimited | Unlimited |
| **Pro Searches (Deep Retrieval)**| 5 per day | **300+ per day** | Unlimited / High quota |
| **Model Selection** | Default Sonar | Claude 3.7, GPT-4o, DeepSeek R1 | Claude 3.7, GPT-4o, DeepSeek R1 |
| **File Analysis (PDF, CSV, Code)**| 3 files / day | Unlimited file uploads | Unlimited workspace files |
| **API Developer Credits** | None | **$5.00 / month included** | Available via org billing |
| **Data Privacy & Governance** | Data may improve models | Opt-out available | **Mandatory Zero Data Retention** |
| **SSO & Team Workspaces** | No | No | SAML / Okta / Azure AD |

---

## 2. Perplexity Sonar API Pricing Matrix

The **Perplexity Sonar API** enables developers to build apps with live, grounded web citations. Sonar API billing consists of two components:
1. **Search Request Fee**: A flat rate per 1,000 requests to cover real-time search index queries.
2. **Token Usage Fee**: Per 1M input and output tokens processed.

| API Model | Search Request Fee | Input Tokens / 1M | Output Tokens / 1M | Context Window |
| :--- | :--- | :--- | :--- | :--- |
| **Sonar (8B)** | $1.00 / 1,000 queries | $1.00 | $1.00 | 128,000 |
| **Sonar Pro (70B)** | $5.00 / 1,000 queries | $3.00 | $15.00 | 128,000 |
| **Sonar Reasoning Pro** | $5.00 / 1,000 queries | $2.00 | $8.00 | 128,000 |

```bash
# Calling the Perplexity Sonar API with Live Search Citations
curl https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar-pro",
    "messages": [
      {"role": "user", "content": "What are the latest benchmarks for DeepSeek R1 vs OpenAI o1?"}
    ]
  }'
```

---

## 3. Which Plan Should You Choose?

- **Choose Perplexity Free**: If your usage consists primarily of everyday quick lookups and standard fact-checking.
- **Choose Perplexity Pro ($20/mo)**: If you conduct in-depth engineering research, need access to multiple frontier models (Claude 3.7 Sonnet, DeepSeek R1, GPT-4o) under one subscription, or analyze large codebases and PDFs daily.
- **Choose Sonar API**: If you are developing customer-facing AI agents, market research bots, or financial intelligence pipelines that require verifiable URL sources.

---

## Related Pricing Guides

- [OpenAI API & ChatGPT Pricing Guide](/guides/openai-chatgpt-pricing-guide)
- [DeepSeek API Pricing Guide](/guides/deepseek-api-pricing-guide)
- [Claude Code Pricing Guide](/guides/claude-code-pricing-guide)
- [Cursor Pricing Guide](/guides/cursor-pricing-guide)
- [GitHub Copilot Pricing Guide](/guides/github-copilot-pricing-guide)
