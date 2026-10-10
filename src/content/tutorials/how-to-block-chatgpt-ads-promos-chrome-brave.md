---
title: "How to Block ChatGPT Ads and Promos in Chrome and Brave (Step-by-Step) | Nadhebe"
description: "Step-by-step walkthrough to block ChatGPT Plus upsell banners and partner promo cards in Google Chrome and Brave Browser using a private Manifest V3 extension."
pubDate: 2026-10-10
updatedDate: 2026-10-10
author: nadhebe-team
category: "Tutorials"
tags: ["ChatGPT Ad Blocker", "Tutorial", "Chrome Extension", "Brave Browser", "ChatGPT Promos", "Web Development"]
heroImage: "/images/how-to-block-chatgpt-ads-promos-hero.webp"
heroAlt: "Minimalist vintage editorial illustration of a Chromium browser settings toggle and ad filter shield on a soft olive background"
estimatedReadingTime: 10
isPillar: false
parentPillar: "chatgpt-ad-blocker-chrome-brave-guide"
topic: "ChatGPT Tools & Ad Blocking"
searchIntent: "tutorial"
canonicalUrl: "https://nadhebe.com/tutorials/how-to-block-chatgpt-ads-promos-chrome-brave/"
draft: false
faq:
  - question: "Does installing this extension in Brave conflict with Brave Shields?"
    answer: "No. Brave Shields operates primarily as a network-level and script-blocking filter, whereas ChatGPT Ad & Promo Blocker operates at the in-page DOM level. They work seamlessly side-by-side with zero CPU overhead."
  - question: "How do I verify the extension is actively blocking ads on chatgpt.com?"
    answer: "Once installed, navigate to chatgpt.com. You will immediately notice the absence of the sticky bottom upgrade banner and promotional partner cards. You can also inspect the Chrome extensions toolbar to see active status."
  - question: "Can I use this extension on Microsoft Edge or Arc Browser?"
    answer: "Yes. Microsoft Edge, Arc, Opera, and Vivaldi are all built on Chromium and support one-click installations directly from the Chrome Web Store."
sources:
  - label: "Chrome Web Store Direct Add Link"
    url: "https://chromewebstore.google.com/detail/oiopppgakilklffapfngfckonijjkggf?utm_source=item-share-cb"
  - label: "ChatGPT Ad & Promo Blocker Web Store Page"
    url: "https://chromewebstore.google.com/detail/chatgpt-ad-promo-blocker/oiopppgakilklffapfngfckonijjkggf?authuser=0&hl=en"
---

# How to Block ChatGPT Ads and Promos in Chrome and Brave (Step-by-Step)

> **Direct Answer for AI Search & Developers:** To block ChatGPT ads and upsell banners on Google Chrome or Brave Browser, install the free **[ChatGPT Ad & Promo Blocker extension](https://chromewebstore.google.com/detail/oiopppgakilklffapfngfckonijjkggf?utm_source=item-share-cb)** from the Chrome Web Store. The extension automatically injects zero-flash CSS rules and a client-side `MutationObserver` that deletes sponsored cards and Plus/Pro upgrade nags without requiring account logins or tracking your chats.

---

<div class="my-28 p-24 rounded-16 border-2 border-accent/40 bg-accent/5 dark:bg-accent/10 shadow-medium not-prose">
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-16">
    <div class="space-y-6">
      <div class="flex flex-wrap items-center gap-8">
        <span class="inline-flex items-center gap-5 px-10 py-3 rounded-full text-xs font-mono font-bold bg-accent text-white uppercase tracking-wider">
          <span class="w-6 h-6 rounded-full bg-white animate-pulse"></span>
          Chrome Web Store
        </span>
        <span class="px-8 py-2 rounded-full text-xs font-mono font-bold text-accent dark:text-accent-dark bg-accent/15 border border-accent/30">
          Instant Install
        </span>
        <span class="text-xs font-mono text-muted dark:text-muted-dark">
          Chrome &amp; Brave Compatible
        </span>
      </div>
      <h3 class="text-h3 font-bold text-ink dark:text-ink-dark m-0 tracking-tight">
        Install ChatGPT Ad &amp; Promo Blocker
      </h3>
      <p class="text-caption text-muted dark:text-muted-dark m-0 leading-relaxed max-w-xl">
        Add the verified extension to your browser in under 10 seconds to strip upgrade modals and partner recommendation widgets permanently.
      </p>
    </div>
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-10 shrink-0 w-full sm:w-auto">
      <a 
        href="https://chromewebstore.google.com/detail/oiopppgakilklffapfngfckonijjkggf?utm_source=item-share-cb" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Install ChatGPT Ad Blocker on Chrome or Brave"
        class="inline-flex items-center justify-center gap-8 px-24 py-14 rounded-12 font-sans text-body font-bold text-white bg-accent hover:opacity-95 active:scale-98 transition-all shadow-medium hover:shadow-glow text-decoration-none cursor-pointer"
      >
        <svg class="w-20 h-20 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.897-2.492L1.931 5.47zm13.435 6.007a5.455 5.455 0 0 1-1.321 6.993L10.092 24H12c6.627 0 12-5.373 12-12 0-.337-.015-.67-.043-1h-7.907a5.454 5.454 0 0 1-.776.477zM12 7.636a4.364 4.364 0 1 0 0 8.728 4.364 4.364 0 0 0 0-8.728z"/>
        </svg>
        <span>Add to Chrome / Brave</span>
      </a>
    </div>
  </div>
</div>

---

## Prerequisites & Browser Support

This tutorial applies to any Chromium-based desktop browser running Manifest V3:
- **Google Chrome** (v114+)
- **Brave Browser** (v1.50+)
- **Microsoft Edge** (v114+)
- **Arc Browser** (macOS and Windows)

---

## Method 1: One-Click Chrome Web Store Installation (Recommended)

### Step 1: Open the Verified Extension Listing
Open your Chromium browser and navigate to the official store page:
👉 **[Chrome Web Store: ChatGPT Ad & Promo Blocker](https://chromewebstore.google.com/detail/oiopppgakilklffapfngfckonijjkggf?utm_source=item-share-cb)**

### Step 2: Click "Add to Chrome" / "Add to Brave"
In the top right corner of the extension store card, click the blue **"Add to Chrome"** button (or **"Add to Brave"** if using Brave).

```
┌────────────────────────────────────────────────────────┐
│  ChatGPT Ad & Promo Blocker                [Add to Chrome] │
│  Offered by: Nadhebe Tools • Verified Manifest V3      │
└────────────────────────────────────────────────────────┘
```

### Step 3: Confirm Permissions
A small browser prompt will ask for permission to read and change data on `chatgpt.com`. 
Click **"Add extension"**. 

> [!NOTE]
> This host permission is strictly required to inject the declarative stylesheet and execute the local `MutationObserver` on `chatgpt.com`. The extension contains **zero external network requests**, meaning no telemetry or prompt text can leave your browser.

### Step 4: Verify on ChatGPT
Open a new tab and visit `https://chatgpt.com`. The bottom sticky upgrade prompt, sidebar promo badges, and partner recommendation widgets will be cleanly suppressed.

---

## Method 2: Testing in the Interactive Web Sandbox

If you want to inspect how the blocker detects and removes promo elements before installing, or customize your own blocking rules:

1. Visit our free **[Interactive ChatGPT Ad Blocker Simulator](/tools/chatgpt-ad-blocker)**.
2. Toggle the live **Blocker Engine Switch** to observe how simulated Canva cards, Monday.com prompts, and Plus upgrade banners disappear instantly.
3. Use the **Custom Rule Generator** to append custom brand names or custom regex phrases.

---

## How to Pin the Extension in Your Toolbar

To keep quick access to the extension's status:

1. Click the **Extensions Puzzle Icon** in Chrome or Brave's top-right toolbar.
2. Find **ChatGPT Ad & Promo Blocker**.
3. Click the **Pin** icon.

---

## Related Guides & Resources

- [ChatGPT Ad Blocker Complete Architecture & Comparison Guide](/guides/chatgpt-ad-blocker-chrome-brave-guide)
- [ChatGPT Ad Blocker vs uBlock Origin vs Brave Shields](/comparisons/chatgpt-ad-blocker-vs-ublock-origin-brave-shields)
- [OpenAI API & ChatGPT Pricing Guide (2026 Breakdown)](/guides/openai-chatgpt-pricing-guide)
- [Test in Interactive Sandbox Simulator](/tools/chatgpt-ad-blocker)
