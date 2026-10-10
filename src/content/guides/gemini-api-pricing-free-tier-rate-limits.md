---
title: "Gemini API Pricing, Free Tier & Rate Limits (2026 Developer Breakdown)"
description: "Detailed breakdown of Google Gemini API pricing rates, free tier RPM/TPM limits, Gemini 2.0 Flash costs, and pay-as-you-go billing architecture."
pubDate: 2026-07-26
updatedDate: 2026-10-10
author: nadhebe-team
category: "Guides"
tags: ["gemini-api", "pricing", "rate-limits", "google-ai", "llm-costs", "gemini-2.0-flash"]
heroImage: "/images/gemini-api-pricing-hero.webp"
heroAlt: "Clean minimalist technical meter gauge illustration of Gemini API pricing"
isPillar: false
rating: 4.8
estimatedReadingTime: 8
topic: "AI Tool Costs"
searchIntent: "commercial"
draft: false
faq:
  - question: "Does Google train on Free Tier API data in Google AI Studio?"
    answer: "Yes. On the Free Tier in Google AI Studio, input prompts and output responses may be reviewed by human annotators to improve Google models. If handling sensitive corporate or PII data, use the Pay-As-You-Go Tier where data is private."
  - question: "How do I increase my Gemini API rate limits?"
    answer: "To increase RPM and TPM limits beyond the free quotas, attach a billing account in Google Cloud Console or enable Pay-As-You-Go billing in Google AI Studio."
  - question: "What is the token cost for Gemini 2.0 Flash?"
    answer: "Gemini 2.0 Flash is billed at $0.10 per 1M input tokens and $0.40 per 1M output tokens for prompts up to 128k context, with context caching available at $0.025 per 1M tokens/hour."
sources:
  - label: "Google AI Studio Pricing"
    url: "https://ai.google.dev/pricing"
  - label: "Google Cloud Vertex AI Pricing"
    url: "https://cloud.google.com/vertex-ai/pricing"
---

# Gemini API Pricing, Free Tier & Rate Limits (2026 Developer Breakdown)

Understanding the **Google Gemini API pricing structure** and rate limit quotas is critical for building cost-effective production applications. Google offers both a **Free Tier** in Google AI Studio for prototyping and a **Pay-As-You-Go Tier** for production enterprise workloads.

---

## Free Tier vs Pay-As-You-Go Model Overview

| Feature | Free Tier (AI Studio) | Pay-As-You-Go Tier |
| :--- | :--- | :--- |
| **Price** | $0.00 | Pay per 1M tokens |
| **Data Privacy** | Prompts used to train models | Prompts **NOT** used to train models |
| **Gemini 2.0 Flash RPM** | 15 RPM | 2,000 RPM |
| **Gemini 1.5 Pro RPM** | 2 RPM | 360 - 1,000 RPM |
| **Daily Request Cap** | 1,500 RPD | Unlimited (based on quota tier) |
| **Max Context Window** | 1,000,000 Tokens | Up to 2,000,000 Tokens |

---

## Token Pricing Breakdown (Pay-As-You-Go)

Google charges based on input tokens (prompt text, audio, images, video) and generated output tokens:

### 1. Gemini 2.0 Flash & Gemini 1.5 Flash (Workhorse Models)
- **Input Tokens (prompts <= 128k):** $0.075 - $0.10 per 1M tokens
- **Input Tokens (prompts > 128k):** $0.15 - $0.20 per 1M tokens
- **Output Tokens:** $0.30 - $0.40 per 1M tokens
- **Context Caching Storage:** $0.01875 - $0.025 per 1M tokens/hour

### 2. Gemini 1.5 Pro (Deep Code & Extended Context)
- **Input Tokens (prompts <= 128k):** $1.25 per 1M tokens
- **Input Tokens (prompts > 128k):** $2.50 per 1M tokens
- **Output Tokens (prompts <= 128k):** $5.00 per 1M tokens
- **Output Tokens (prompts > 128k):** $10.00 per 1M tokens

---

## Gemini Consumer Subscription: Google One AI Premium

For non-API end users, Google offers **Gemini Advanced** through the **Google One AI Premium plan** at **$19.99/month**. This includes:
- Access to 1.5 Pro & 2.0 Flash with extended 1M context in chat
- Gemini integrations in Google Docs, Gmail, and Google Slides
- 2 TB of Google Drive cloud storage

---

## Related Pricing Guides

- [OpenAI API & ChatGPT Pricing Guide](/guides/openai-chatgpt-pricing-guide)
- [DeepSeek API Pricing Guide](/guides/deepseek-api-pricing-guide)
- [Claude Code Pricing Guide](/guides/claude-code-pricing-guide)
- [RunPod GPU Pricing Explained](/guides/runpod-pricing-explained)
