---
title: "Mistral AI Pricing Guide: Le Chat Pro, API Token Rates, and Open Weights (2026)"
description: "A complete guide to Mistral AI pricing. Compare Le Chat Pro $9.99/mo, La Plateforme API token costs for Mistral Large 2, Codestral, and open-weight models."
pubDate: 2026-10-10
updatedDate: 2026-10-10
author: nadhebe-team
category: "Guides"
tags: ["Mistral AI", "Pricing", "Codestral", "Mistral Large", "Le Chat Pro", "API Billing", "Open Weights"]
heroImage: "/images/mistral-ai-pricing-hero.webp"
heroAlt: "Vintage editorial collage illustration of Arc de Triomphe and neural network diagram on a soft terracotta background"
estimatedReadingTime: 12
isPillar: true
topic: "AI Tool Costs"
searchIntent: "commercial"
draft: false
faq:
  - question: "How much does Mistral Le Chat Pro cost?"
    answer: "Mistral Le Chat Pro costs $9.99 per month (or €9.99/month), offering priority access to Mistral Large 2, Codestral, extended file understanding, and Canvas workspace editing."
  - question: "What is the API pricing for Codestral?"
    answer: "Codestral 2501 is priced at $0.30 per 1M input tokens and $0.90 per 1M output tokens, with an expansive 256k token context window specifically optimized for code generation and FIM (Fill-in-the-Middle) tasks."
  - question: "How does Mistral Large 2 pricing compare to OpenAI GPT-4o?"
    answer: "Mistral Large 2 costs $2.00 per 1M input and $6.00 per 1M output, which is 20% cheaper on input and 40% cheaper on output compared to GPT-4o ($2.50 / $10.00)."
  - question: "Does Mistral AI offer a Batch API discount?"
    answer: "Yes. Mistral AI's Batch API on La Plateforme provides an automatic 50% discount on all model token prices for non-urgent requests processed within 24 hours."
sources:
  - label: "Mistral AI Official Pricing"
    url: "https://mistral.ai/technology/#pricing"
  - label: "Mistral La Plateforme Documentation"
    url: "https://docs.mistral.ai/api/"
---

# Mistral AI Pricing Guide: Le Chat Pro, API Token Rates, and Open Weights (2026)

Headquartered in Paris, **Mistral AI** is the pioneer of high-performance European artificial intelligence. By combining openly downloadable model weights with commercial enterprise APIs on **La Plateforme**, Mistral provides engineering teams with complete deployment sovereignty.

Whether choosing between the consumer **Le Chat Pro** subscription or deploying **Codestral** and **Mistral Large 2** via managed APIs, this guide breaks down all pricing structures and cost optimization pathways.

---

## 1. Mistral Le Chat Consumer Plans

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      MISTRAL LE CHAT ACCESS TIERS                      │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌──────────────────────────────┐                    ┌──────────────────────────────┐
│        LE CHAT FREE          │                    │     LE CHAT PRO ($9.99/MO)   │
├──────────────────────────────┤                    ├──────────────────────────────┤
│ • Mistral Large & Small      │                    │ • Priority High-Speed Queue  │
│ • Live Web Search            │                    │ • Unlimited Canvas Workspace │
│ • Document Analysis          │                    │ • Flux Image Generation      │
└──────────────────────────────┘                    └──────────────────────────────┘
```

| Plan | Monthly Cost | Model Access | Key Features | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Le Chat Free** | **$0.00** | Mistral Large, Mistral Small | Web search, basic Canvas, doc analysis | Daily questions & testing |
| **Le Chat Pro** | **$9.99 / mo** | Mistral Large 2, Codestral | Zero queue delays, high-res Flux images | Technical power users & writers |

---

## 2. La Plateforme API Token Pricing Matrix

For production backends, IDE plugins, and agent systems, Mistral charges per 1 million tokens processed:

| Model | Focus / Capability | Context Window | Input Tokens / 1M | Output Tokens / 1M |
| :--- | :--- | :--- | :--- | :--- |
| **Mistral Large 2** | Frontier Reasoning & Multilingual | 128,000 | **$2.00** | **$6.00** |
| **Codestral 2501** | Specialized Software Engineering | 256,000 | **$0.30** | **$0.90** |
| **Mistral Small 3** | Fast High-Throughput Routing | 32,000 | **$0.20** | **$0.60** |
| **Pixtral Large** | High-Res Vision & OCR | 128,000 | **$2.00** | **$6.00** |
| **Mistral Embed** | Semantic Text Embeddings | 8,000 | **$0.10** | N/A |

> [!TIP]
> **50% Batch API Discount**: Submitting background jobs via the Mistral Batch API cuts token rates in half across all models (e.g. Codestral drops to **$0.15 / 1M input** and **$0.45 / 1M output**).

---

## 3. Commercial API vs Open-Weight Self-Hosting

One of Mistral's greatest strengths is licensing flexibility:

- **Open Weights (Apache 2.0)**: Models such as **Mistral NeMo 12B** and **Mistral 7B** are 100% open-source under the Apache 2.0 license, allowing free commercial deployment on cloud providers like [RunPod](/guides/runpod-pricing-explained).
- **Mistral Research License (MRL)**: Available for free non-commercial research, or accessible commercially via La Plateforme API or Microsoft Azure / AWS Bedrock endpoints.

---

## Related Pricing Guides

- [OpenAI API & ChatGPT Pricing Guide](/guides/openai-chatgpt-pricing-guide)
- [DeepSeek API Pricing Guide](/guides/deepseek-api-pricing-guide)
- [Claude Code Pricing Guide](/guides/claude-code-pricing-guide)
- [Gemini API Pricing & Rate Limits](/guides/gemini-api-pricing-free-tier-rate-limits)
- [RunPod GPU Pricing Explained](/guides/runpod-pricing-explained)
- [Cursor Pricing Guide](/guides/cursor-pricing-guide)
