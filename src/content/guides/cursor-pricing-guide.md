---
title: "Cursor Pricing Guide: Hobby, Pro, Business, and Custom API Key Usage"
description: "A complete guide to Cursor IDE pricing, comparing Hobby free tiers, Pro $20/month subscriptions, Business SSO features, and custom Anthropic/OpenAI API key options."
pubDate: 2026-08-03
author: nadhebe-team
category: "guides"
tags: ["Cursor", "Pricing", "AI IDE", "Developer Tools", "LLM Costs", "Cursor Pro"]
heroImage: "/images/cursor-pricing-hero.webp"
heroAlt: "Retro editorial illustration comparing Cursor Hobby, Pro, and Business subscription tiers on a warm sand background"
estimatedReadingTime: 12
isPillar: true
topic: "AI Tool Costs"
searchIntent: "commercial"
draft: false
faq:
  - question: "What is included in the Cursor Pro $20/month subscription?"
    answer: "Cursor Pro includes 500 fast premium requests per month (Claude 3.7 Sonnet, GPT-4o), unlimited slow requests, and 100 Cursor Tab completions per day."
  - question: "Can I bring my own OpenAI or Anthropic API key to Cursor?"
    answer: "Yes. You can enter your custom OpenAI, Anthropic, or Google Gemini API keys in Cursor settings to bypass monthly request limits."
  - question: "What happens when you exceed 500 fast requests on Cursor Pro?"
    answer: "You are transitioned to unlimited slow requests (queued behind peak traffic), or you can enable usage-based billing at cost-per-request rates."
sources:
  - label: "Cursor IDE Pricing Page"
    url: "https://www.cursor.com/pricing"
---

# Cursor Pricing Guide: Hobby, Pro, Business, and Custom API Key Usage

**Cursor** has emerged as one of the most widely adopted AI-native code editors, built as a fork of Visual Studio Code. Understanding how Cursor's **Hobby, Pro, and Business plans** structure premium model requests and API key usage is essential for optimizing monthly developer tool budgets.

---

## Cursor Subscription Plans Matrix

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      CURSOR SUBSCRIPTION ARCHITECTURE                  │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│     HOBBY (FREE)     │  │     PRO ($20/MO)     │  │   BUSINESS ($40/MO)  │
├──────────────────────┤  ├──────────────────────┤  ├──────────────────────┤
│ • 50 Fast Requests   │  │ • 500 Fast Requests  │  │ • All Pro Features   │
│ • 2,000 Completions  │  │ • Unlimited Slow Req │  │ • Enforced Zero Data │
│ • Basic AI Chat      │  │ • 10 Fast Claude 3.7 │  │ • Admin SSO & Audit  │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

| Plan Feature | Hobby (Free) | Pro ($20 / month) | Business ($40 / user / mo) |
| :--- | :--- | :--- | :--- |
| **Fast Premium Requests** | 50 trial requests | 500 requests / month | 500 requests / user / month |
| **Slow Premium Requests** | None | Unlimited (queued) | Unlimited (queued) |
| **Cursor Tab Autocomplete**| 2,000 completions | Unlimited | Unlimited |
| **Custom API Keys** | Allowed | Allowed | Allowed |
| **Zero Data Retention** | Opt-in | Opt-in | Mandatory Default |

---

## Premium Fast Requests vs Custom API Keys

1. **Included 500 Fast Requests**: Co-funded by Cursor infrastructure. Offers zero-setup access to Claude 3.7 Sonnet, Claude 3.5 Sonnet, and GPT-4o.
2. **Bringing Your Own API Key**: Enter your own `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` in Cursor Settings (`Ctrl + ,` / `Cmd + ,`). Pay-as-you-go pricing directly through Anthropic or OpenAI Console.
