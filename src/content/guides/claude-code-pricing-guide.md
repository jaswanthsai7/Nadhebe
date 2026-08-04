---
title: "Claude Code Pricing Guide: Token Costs, API Tiers, and Subscription Plans"
description: "A complete breakdown of Anthropic's Claude Code CLI pricing, console API token costs, subscription tiers (Pro vs Team vs Enterprise), and cost optimization strategies."
pubDate: 2026-08-03
author: nadhebe-team
category: "guides"
tags: ["Claude Code", "Pricing", "Anthropic", "LLM Costs", "Token Limits", "API Billing"]
heroImage: "/images/claude-code-pricing-hero.webp"
heroAlt: "Minimalist vintage editorial illustration of Claude Code pricing tiers and API token calculators on a soft olive background"
estimatedReadingTime: 12
isPillar: true
topic: "AI Tool Costs"
searchIntent: "commercial"
draft: false
faq:
  - question: "Is Claude Code included in the standard Claude Pro $20/month subscription?"
    answer: "Yes, Claude Pro users receive access to Claude Code within standard daily token usage caps. High-volume developer teams typically use Anthropic Console API pay-as-you-go keys for unrestricted rate limits."
  - question: "How much does a typical 1-hour Claude Code session cost via the Anthropic API?"
    answer: "Depending on repository size and context compaction frequency, a 1-hour interactive Claude Code session with Claude 3.7 Sonnet averages $1.50 to $4.00 in total API input/output token costs."
  - question: "Does Claude Code support Prompt Caching discounts?"
    answer: "Yes. Claude Code automatically utilizes Anthropic's prompt caching headers, cutting input token costs by up to 90% on repeated codebase queries."
sources:
  - label: "Anthropic Claude API Pricing Page"
    url: "https://www.anthropic.com/pricing"
  - label: "Anthropic Console Documentation"
    url: "https://docs.anthropic.com/"
---

# Claude Code Pricing Guide: Token Costs, API Tiers, and Subscription Plans

Anthropic's **Claude Code CLI** has quickly established itself as the leading terminal-native AI agent for software developers. However, understanding how Claude Code is billed across **Claude Pro/Team subscriptions** versus **Anthropic Console API keys** is crucial for managing monthly engineering expenses.

This guide details token pricing models, tier limits, hidden cost drivers, and practical strategies to reduce Claude Code API spend by up to 80%.

---

## Executive Summary & Plan Comparison

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      CLAUDE CODE ACCESS & BILLING                      │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌──────────────────────────────┐                    ┌──────────────────────────────┐
│  SUBSCRIPTION PLANS (PRO/TEAM)│                    │   CONSOLE API PAY-AS-YOU-GO  │
├──────────────────────────────┤                    ├──────────────────────────────┤
│ • Flat Rate: $20 - $30/mo    │                    │ • Per-Token Billing Model    │
│ • Fixed Hourly Usage Caps    │                    │ • Higher Rate Limit Tiers    │
│ • Best for Individual Devs   │                    │ • Best for CI/CD & Enterprise│
└──────────────────────────────┘                    └──────────────────────────────┘
```

| Tier / Plan | Monthly Cost | Authentication Method | Usage Limits | Best For |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Pro** | $20 / month | OAuth Login (`claude login`) | ~45 messages / 5 hours | Individual developers |
| **Claude Team** | $30 / user / month | Team SSO OAuth | 5x Pro usage allowance | Small engineering teams |
| **Console API (Tier 1-4)**| Pay-as-you-go | API Key (`ANTHROPIC_API_KEY`) | Up to 10M Tokens/min | High-volume & CI/CD agents |

---

## Model Token Rates (Anthropic Console API)

When operating Claude Code via an Anthropic Console API key, token consumption is charged based on the model selected:

| Model | Base Input Tokens | Prompt Cache Write | Prompt Cache Read | Output Tokens |
| :--- | :--- | :--- | :--- | :--- |
| **Claude 3.7 Sonnet** | $3.00 / 1M | $3.75 / 1M | $0.30 / 1M (-90%) | $15.00 / 1M |
| **Claude 3.5 Haiku** | $0.80 / 1M | $1.00 / 1M | $0.08 / 1M (-90%) | $4.00 / 1M |

---

## 3 Strategies to Cut Claude Code API Costs

1. **Keep `CLAUDE.md` Under 200 Lines**: Large system prompt files get sent on every single turn. Trimming prompt bloat saves thousands of input tokens per session.
2. **Leverage Prompt Caching**: Claude Code natively caches repository context headers. Repeated queries against the same workspace cost **90% less** on cached input tokens ($0.30/1M vs $3.00/1M).
3. **Use `/compact` Regularly**: Compacting session memory removes old redundant stdout logs, keeping the active context window lean and cheap.
