---
title: "uBlock Origin Filters to Block ChatGPT Ads & Promos (2026)"
description: "Exact copy-paste uBlock Origin filter rules to hide ChatGPT upgrade popups, sidebar partner promotions, and banner ads cleanly without breaking chats."
pubDate: 2026-11-08
updatedDate: 2026-11-08
author: nadhebe-team
category: "Tutorials"
tags: ["ublock-origin", "chatgpt", "filter-rules", "ad-blocker", "cosmetic-filtering", "privacy"]
heroImage: "/images/ublock-origin-custom-filters-block-chatgpt-ads-hero.webp"
heroAlt: "Vintage editorial collage illustration of uBlock Origin shield icons, CSS element inspector selectors, and clean web application windows on a soft lavender background"
estimatedReadingTime: 10
isPillar: false
topic: "ChatGPT Ad Blocker"
searchIntent: "ublock origin custom filters block chatgpt ads upgrade promos"
difficulty: "beginner"
faq:
  - question: "How do custom filters in uBlock Origin work?"
    answer: "Custom filters use procedural and cosmetic CSS selectors (e.g. `##` or `##:has-text()`) to target and hide specific DOM elements from the web page after loading, without modifying network requests or altering server response data."
  - question: "Where do you paste custom filter rules in uBlock Origin?"
    answer: "Click the uBlock Origin shield icon in your browser toolbar, click the gears icon to open the Dashboard, navigate to the 'My Filters' tab, paste the rules into the text area, and click 'Apply Changes'."
  - question: "Will these filters break ChatGPT's model switcher or voice input?"
    answer: "No. These filters specifically target data attributes and classes used exclusively for marketing containers (e.g., `data-testid='upgrade-plan-button'`). Core controls like model selection dropdowns, microphone buttons, and prompt input boxes remain unaffected."
  - question: "Why do ChatGPT ads sometimes reappear after OpenAI website updates?"
    answer: "OpenAI periodically updates frontend React component class hashes. If a new promo container bypasses previous filters, you can use uBlock Origin's Element Picker tool (eyedropper icon) to select and block the updated DOM element in two clicks."
  - question: "Do these filters work on uBlock Origin Lite (Manifest V3)?"
    answer: "Yes. Basic cosmetic hiding rules (`##element`) are fully supported under Manifest V3 declarative net request standards in uBlock Origin Lite."
sources:
  - label: "uBlock Origin Static Filter Syntax Guide"
    url: "https://github.com/gorhill/uBlock/wiki/Static-filter-syntax"
  - label: "Adguard Extended CSS Selectors Documentation"
    url: "https://adguard.com/kb/general/ad-filtering/create-own-filters/"
---

> **Direct Answer for Power Users:** To **block ChatGPT ads and promo banners with uBlock Origin**, open **uBlock Origin Dashboard > My Filters** and paste these verified cosmetic rules: `chatgpt.com##div[data-testid*="upgrade"]`, `chatgpt.com##div[class*="promotional"]`, and `chatgpt.com##button:has-text("Upgrade to Plus")`. Click **Apply Changes** to strip all marketing banners and subscription popups cleanly while keeping chat streams 100% functional.

As OpenAI tests sponsored partner cards, team subscription alerts, and upgrade promotions inside the free ChatGPT web interface, regular users find their chat window cluttered with persistent marketing overlays.

While generic ad blocker filter lists (like EasyList) catch third-party banner networks, they frequently miss first-party promotional UI elements. 

Here are the **exact, battle-tested uBlock Origin filter rules** you can copy and paste right now to achieve a clean, distraction-free ChatGPT workspace.

---

## 1. The Master Copy-Paste Filter List for ChatGPT

Copy the code block below:

```text
! ============================================================
! Nadhebe Verified uBlock Origin Filters for ChatGPT (2026)
! Removes: Upgrade buttons, partner cards, sponsored promos
! Safe: Does NOT break chat streaming, model pickers, or inputs
! ============================================================

! 1. Hide Sidebar Upgrade & Team Subscription Banners
chatgpt.com##div[data-testid="upgrade-button"]
chatgpt.com##div[data-testid="team-plan-cta"]
chatgpt.com##nav a[href*="/pricing"]:has-text("Upgrade")
chatgpt.com##nav div:has-text("Upgrade plan")

! 2. Remove Bottom Prompt Bar Partner Promo Badges
chatgpt.com##div[class*="promotional-banner"]
chatgpt.com##div[class*="partner-card"]
chatgpt.com##aside div[class*="announcement"]

! 3. Block Modal Popups & "Try Plus" Overlays
chatgpt.com##div[role="dialog"]:has-text("Get unlimited access with Plus")
chatgpt.com##div[role="dialog"]:has-text("Upgrade to Team")
chatgpt.com##div[class*="modal"]:has(button:has-text("Upgrade"))

! 4. Clean Mobile Viewport Header Clutter
chatgpt.com##header a:has-text("Upgrade")
chatgpt.com##div[class*="floating-promo"]
```

[SCREENSHOT: uBlock Origin Dashboard > My Filters tab showing the pasted rules and the green Apply Changes button highlighted]

---

## 2. Step-by-Step Installation: How to Add the Rules

1. Click the red **uBlock Origin shield icon** in your browser toolbar.
2. Click the **Dashboard (Two Crossed Gears)** icon in the bottom right of the popup.
3. In the top navigation tabs, select **My Filters**.
4. Scroll to the bottom of the text box, paste the code block above on a new line.
5. Click **Apply Changes** in the top left corner.
6. Open or refresh `chatgpt.com`. All upgrade banners, promotional partner cards, and subscription nags will disappear instantly.

For multi-browser setup across non-Chrome browsers, review our guide on [how to block ChatGPT ads in Firefox, Edge, and Safari](https://nadhebe.com/tutorials/how-to-block-chatgpt-ads-firefox-edge-safari/).

---

## 3. How to Use the Element Picker for New ChatGPT Layout Changes

If OpenAI pushes a frontend design update that introduces a new promotional element not covered by this list, you can block it yourself in 5 seconds using uBlock Origin's visual **Element Picker**:

[SCREENSHOT: Browser screen showing uBlock Origin's Element Picker red overlay highlighting a newly added ChatGPT promo badge]

1. Right-click the offending promotional banner.
2. Select **Block element...** (or click the uBlock Origin extension icon and select the **Eyedropper** icon).
3. Hover your cursor over the element until the red highlight box covers the promotional container. Click to select it.
4. An inspector dialog will appear in the bottom right showing the detected CSS selector.
5. Click **Create** to permanently save the rule to your personal filter list.

---

## 4. Why Cosmetic Filtering is Safer Than Network Blocking

Many users attempt to block ChatGPT ads by blacklisting network domain names or blocking scripts. This frequently breaks WebSocket connections and corrupts text streaming.

- **Network Blocking:** Intercepts HTTP/WebSocket packets. If a rule accidentally blocks an OpenAI analytics payload that shares an API gateway with model generation, your chat session crashes with `"Network Error"`.
- **Cosmetic Filtering (Our Approach):** Lets the network connection run unimpeded, but applies CSS `display: none !important;` directly in your browser's local rendering engine. Your chat remains 100% reliable, private, and fast.

Bookmark this page to keep your AI development and prompting environment clean, private, and focused on pure productivity.

