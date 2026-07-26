---
title: "Gemini API Key Not Working? How to Fix 403, 429 & Quota Errors"
description: "Troubleshooting guide for fixing common Google Gemini API errors including API Key Not Found, 403 Forbidden, 429 Rate Limit, and INVALID_ARGUMENT."
pubDate: 2026-07-26
author: "nadhebe-team"
category: "tutorials"
tags: ["gemini-api", "troubleshooting", "error-handling", "api-key", "developer-guide"]
heroImage: "/images/gemini-api-errors-hero.webp"
heroAlt: "Clean minimalist error shield illustration of Gemini API troubleshooting"
isPillar: false
rating: 4.8
estimatedReadingTime: 7
---

When integrating the Google Gemini API in Node.js, Python, or curl requests, developers often encounter common API authentication or quota errors. This guide outlines the exact causes and step-by-step solutions for resolving each error.

---

## 1. Error: `403 Forbidden` / `API_KEY_INVALID`

### Cause
Your API key string is incorrect, has been deleted in Google AI Studio, or has restrictive HTTP referrer / IP restrictions configured in Google Cloud Console that block your server.

### Fix
1. Open [Google AI Studio](https://aistudio.google.com/) -> **Get API Key**.
2. Confirm the key status is **Active**.
3. If using `.env` files, verify there are no trailing spaces or missing quotes around your key:

```env
# Correct
GEMINI_API_KEY="AIzaSyYourExactKey"

# Incorrect (extra space)
GEMINI_API_KEY= "AIzaSyYourExactKey "
```

---

## 2. Error: `429 RESOURCE_EXHAUSTED` / `Quota Exceeded`

### Cause
You have exceeded your assigned Requests Per Minute (RPM), Tokens Per Minute (TPM), or Requests Per Day (RPD) for the Free Tier.

### Fix
Implement exponential backoff retry logic in your code:

```typescript
import { GoogleGenAI } from '@google/genai';

async function generateWithRetry(prompt: string, maxRetries = 3) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let delay = 1000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
      });
    } catch (err: any) {
      if (err?.status === 429 && i < maxRetries - 1) {
        console.warn(`Rate limited. Retrying in ${delay}ms...`);
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2; // Exponential backoff
      } else {
        throw err;
      }
    }
  }
}
```

---

## 3. Error: `INVALID_ARGUMENT` / Model Not Found

### Cause
Specifying a deprecated model string (e.g. `gemini-pro-vision` or legacy model name) instead of current valid API model aliases.

### Fix
Use modern model string aliases:

```typescript
// Recommended model strings in 2026:
const MODEL_FLASH = 'gemini-2.0-flash';
const MODEL_PRO = 'gemini-1.5-pro';
```
