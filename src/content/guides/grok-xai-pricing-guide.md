---
title: "xAI Grok Pricing Guide: X Subscriptions, SuperGrok, and Grok API Rates (2026)"
description: "A complete guide to xAI Grok pricing. Compare X Premium $8/mo, X Premium+ $16/mo, SuperGrok, and xAI Developer API token costs for Grok 2 and Grok 3."
pubDate: 2026-10-10
updatedDate: 2026-10-10
author: nadhebe-team
category: "Guides"
tags: ["xAI", "Grok", "Pricing", "Grok 2", "Grok API", "SuperGrok", "AI Tool Costs"]
heroImage: "/images/grok-xai-pricing-hero.webp"
heroAlt: "Minimalist vintage editorial illustration of cosmic satellite antenna and neural processor on a warm cream sand background"
estimatedReadingTime: 12
isPillar: true
topic: "AI Tool Costs"
searchIntent: "commercial"
draft: false
faq:
  - question: "How much does Grok cost on X (formerly Twitter)?"
    answer: "Grok is accessible on X via X Premium ($8/month or $84/year) with standard rate limits, and X Premium+ ($16/month or $168/year) with unrestricted access and Think mode reasoning."
  - question: "What is SuperGrok, and how much does it cost?"
    answer: "SuperGrok is xAI's standalone consumer subscription priced at $30/month (or $300/year), offering direct web app access, DeepSearch real-time post synthesis, higher context limits, and Flux-powered image creation."
  - question: "What is the API pricing for Grok 2 on the xAI Developer Console?"
    answer: "The xAI API charges $2.00 per 1M input tokens and $10.00 per 1M output tokens for both Grok 2 and Grok 2 Vision (with a $0.004 fee per image)."
  - question: "Does the xAI API offer free credits for developers?"
    answer: "xAI regularly provides promotional monthly API credits (up to $25/month) for registered developers experimenting on the xAI Console."
sources:
  - label: "xAI Developer Console & Pricing"
    url: "https://x.ai/api"
  - label: "xAI Documentation"
    url: "https://docs.x.ai/docs"
---

# xAI Grok Pricing Guide: X Subscriptions, SuperGrok, and Grok API Rates (2026)

Created by Elon Musk's **xAI**, **Grok** has carved out a unique position in the artificial intelligence landscape. With real-time access to the global firehose of posts on X (formerly Twitter) and frontier reasoning capabilities, Grok offers distinct advantages for real-time news analysis, unfiltered coding, and vision intelligence.

This guide outlines Grok's consumer subscription tiers alongside the pay-as-you-go **xAI API Console** token rates.

---

## 1. Grok Consumer & Pro Subscription Matrix

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      GROK SUBSCRIPTION STRUCTURE                       │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│   X PREMIUM ($8/MO)  │  │ X PREMIUM+ ($16/MO)  │  │ SUPERGROK ($30/MO)   │
├──────────────────────┤  ├──────────────────────┤  ├──────────────────────┤
│ • Basic Grok access  │  │ • Unrestricted Grok  │  │ • Standalone Web App │
│ • Standard rate caps │  │ • Think Reasoning    │  │ • DeepSearch Realtime│
│ • Blue Verification  │  │ • Ad-Free X Feed     │  │ • Max Context Limits │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

| Plan / Tier | Monthly Cost | Annual Cost | Core Capabilities | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **X Premium** | **$8 / month** | **$84 / year** | Standard Grok chat, verification checkmark | General X power users |
| **X Premium+** | **$16 / month** | **$168 / year** | Unrestricted Grok queries, Think mode, zero ads | Daily conversational power users |
| **SuperGrok** | **$30 / month** | **$300 / year** | Standalone web UI, DeepSearch, Flux image gen | AI power researchers & creators |

---

## 2. xAI Developer API Token Pricing Matrix

For engineers integrating Grok into external applications, the **xAI API Console** offers OpenAI-compatible endpoints:

| Model | Context Window | Input Tokens / 1M | Output Tokens / 1M | Vision Fee |
| :--- | :--- | :--- | :--- | :--- |
| **Grok 2** (`grok-2-1212`) | 128,000 Tokens | **$2.00** | **$10.00** | N/A |
| **Grok 2 Vision** (`grok-2-vision-1212`) | 128,000 Tokens | **$2.00** | **$10.00** | $0.004 / image |
| **Grok 3 (Preview)** | 200,000+ Tokens | Frontier rates | Frontier rates | Included |

```python
# Calling Grok 2 via standard OpenAI SDK
from openai import OpenAI

client = OpenAI(
    api_key="your_xai_api_key",
    base_url="https://api.x.ai/v1"
)

response = client.chat.completions.create(
    model="grok-2-1212",
    messages=[
        {"role": "system", "content": "You are Grok, an insightful AI assistant."},
        {"role": "user", "content": "Explain recent breakthroughs in superconductor materials."}
    ]
)
print(response.choices[0].message.content)
```

---

## 3. Cost-to-Performance Comparison

| Model | Input / 1M | Output / 1M | Real-Time Live Web/Social |
| :--- | :--- | :--- | :--- |
| **xAI Grok 2** | **$2.00** | **$10.00** | Native X firehose grounding |
| **OpenAI GPT-4o** | $2.50 | $10.00 | Search add-on via Bing |
| **Anthropic Claude 3.7 Sonnet** | $3.00 | $15.00 | Static training cutoff |
| **DeepSeek-V3** | $0.27 ($0.14 cached) | $1.10 | Static open-weight web |

---

## Related Pricing Guides

- [OpenAI API & ChatGPT Pricing Guide](/guides/openai-chatgpt-pricing-guide)
- [DeepSeek API Pricing Guide](/guides/deepseek-api-pricing-guide)
- [Perplexity AI Pricing Guide](/guides/perplexity-ai-pricing-guide)
- [Claude Code Pricing Guide](/guides/claude-code-pricing-guide)
- [Gemini API Pricing & Rate Limits](/guides/gemini-api-pricing-free-tier-rate-limits)
