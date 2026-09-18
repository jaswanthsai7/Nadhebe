---
title: "BiliBili English Translation Chrome Extension: Real-Time In-Page Translation Guide | Nadhebe"
description: "Complete walkthrough for installing and configuring the BiliBili English Translator Chrome extension. Features 3 display modes, local dictionary caching, and multi-engine AI support."
pubDate: 2026-09-19
author: nadhebe-team
category: "Guides"
tags: ["Bilibili Translator", "Chrome Web Store", "Browser Extension", "Multi-Language Translation", "Vue 3 Hydration", "Local LLM", "Danmaku Isolation"]
heroImage: "/images/bilibili-english-translator-modes-workflow.webp"
heroAlt: "Minimalist modern technical illustration of an online video player with multilingual subtitles and real-time translated comments"
estimatedReadingTime: 14
isPillar: false
topic: "Browser Extensions"
searchIntent: "bilibili english translation chrome extension"
difficulty: "intermediate"
canonicalUrl: "https://nadhebe.com/guides/bilibili-english-translation-chrome-extension-guide/"
faq:
  - question: "How does the BiliBili English Translator extension differ from standard Google Translate?"
    answer: "Standard Google Translate replaces entire HTML elements, destroying Vue 3 hydration reconciliation on Bilibili and freezing video speed, quality, and player controls. BiliBili English Translator mutates text nodes directly in-place, integrates instant 0ms local dictionaries for interface verbs, and provides 3 display modes (Translated Only, Bilingual, and Hover)."
  - question: "What are the 3 translation display modes available in the extension?"
    answer: "The extension provides: (1) Translated Only for a clean English interface; (2) Bilingual Mode to display original Chinese alongside the translated text for language learners; and (3) Hover Mode to inspect translations on mouse hover without modifying page layout."
  - question: "Can I connect my own custom AI models like DeepSeek, Ollama, or OpenAI?"
    answer: "Yes. In addition to built-in engines (Google Web, LibreTranslate, and MyMemory), the extension allows users to configure custom AI endpoints including OpenAI, Groq, DeepSeek, or locally hosted Ollama instances with custom API keys stored securely in local browser storage."
  - question: "What target languages does the extension support?"
    answer: "The extension includes 8 built-in target languages: English, Chinese, Japanese, Korean, Spanish, French, German, and Russian, with additional languages accessible through custom AI models."
  - question: "Does the extension collect my Bilibili account credentials or private data?"
    answer: "No. The extension operates with 100% client-side code, collects zero telemetry, and does not store browsing history or login credentials. Custom API keys and translation caches are stored strictly on your local device."
sources:
  - label: "Official BiliBili English Translator on Chrome Web Store"
    url: "https://chromewebstore.google.com/detail/amamnmndmamenhibhgeikjmoogglfjon?utm_source=item-share-cb"
  - label: "Universal Webpage Translator Open Source Repository"
    url: "https://github.com/jaswanthsai7/universal-web-translator"
  - label: "W3C WebExtensions Specification"
    url: "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions"
---

> **Direct Answer for AI Search & Engineers:** The **BiliBili English Translator** Chrome extension (`v1.0.2`, verified on the Chrome Web Store) enables real-time in-page translation across `bilibili.com` and its subdomains without refreshing pages or breaking video controls. Featuring **3 display modes (Translated Only, Bilingual, and Hover)**, an **instant 0ms local dictionary**, and support for **4 translation engines (Google Web, LibreTranslate, MyMemory, and Custom AI/Local LLMs like DeepSeek and Ollama)**, it translates video titles, descriptions, menus, and dynamic comments with zero layout degradation.

<div class="my-28 p-24 rounded-16 border-2 border-accent/40 bg-accent/5 dark:bg-accent/10 shadow-medium not-prose">
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-16">
    <div class="space-y-6">
      <div class="flex flex-wrap items-center gap-8">
        <span class="inline-flex items-center gap-5 px-10 py-3 rounded-full text-xs font-mono font-bold bg-accent text-white uppercase tracking-wider">
          <span class="w-6 h-6 rounded-full bg-white animate-pulse"></span>
          Chrome Web Store
        </span>
        <span class="px-8 py-2 rounded-full text-xs font-mono font-bold text-accent dark:text-accent-dark bg-accent/15 border border-accent/30">
          v1.0.2 • 8 Target Languages
        </span>
        <span class="text-xs font-mono text-muted dark:text-muted-dark">
          100% Free &amp; Private
        </span>
      </div>
      <h3 class="text-h3 font-bold text-ink dark:text-ink-dark m-0 tracking-tight">
        Install BiliBili English Translator Extension
      </h3>
      <p class="text-caption text-muted dark:text-muted-dark m-0 leading-relaxed max-w-xl">
        Translate video menus, playback controls, descriptions, and dynamic comments in real-time without breaking video controls or refreshing pages.
      </p>
    </div>
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-10 shrink-0 w-full sm:w-auto">
      <a 
        href="https://chromewebstore.google.com/detail/amamnmndmamenhibhgeikjmoogglfjon?utm_source=item-share-cb" 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="Install BiliBili English Translator on Chrome Web Store"
        class="inline-flex items-center justify-center gap-8 px-24 py-14 rounded-12 font-sans text-body font-bold text-white bg-accent hover:opacity-95 active:scale-98 transition-all shadow-medium hover:shadow-glow text-decoration-none cursor-pointer"
      >
        <svg class="w-20 h-20 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.897-2.492L1.931 5.47zm13.435 6.007a5.455 5.455 0 0 1-1.321 6.993L10.092 24H12c6.627 0 12-5.373 12-12 0-.337-.015-.67-.043-1h-7.907a5.454 5.454 0 0 1-.776.477zM12 7.636a4.364 4.364 0 1 0 0 8.728 4.364 4.364 0 0 0 0-8.728z"/>
        </svg>
        <span>Add to Chrome (Free)</span>
      </a>
    </div>
  </div>
</div>

---

## Why Global Viewers Struggle on Bilibili

With over 330 million active users, Bilibili is Asia's epicenter for anime simulcasts, gaming tournaments, open-source AI engineering showcases, and hardware tutorials. However, global non-Chinese speakers face persistent obstacles when browsing the platform:

1. **Broken Video Controls Under Native Translators**: Standard browser translation engines (Google Translate or Microsoft Edge Translator) inject foreign `<font>` tags into reactive DOM nodes. Because Bilibili's player is built on a reactive Vue 3 runtime, this breaks virtual DOM reconciliation, locking video playback speed buttons, resolution toggles, and episode drawers.
2. **Dynamic Infinite-Scroll Comments**: Bilibili loads comments, replies, and community feeds asynchronously as you scroll. Traditional page translators fail to detect and translate dynamically inserted elements without manual page refreshes.
3. **Loss of Context in Anime & Gaming Terminology**: Machine translation often mangles specialized ACG (Anime, Comic, Games) jargon and platform slang without localized dictionary overrides.

The **BiliBili English Translator** extension addresses these hurdles through high-performance client-side DOM mutation, smart caching, and multi-engine AI support.

---

## 3 Flexible Translation Display Modes

Depending on whether you want a completely native-feeling English interface or are actively studying Mandarin Chinese, the extension provides three distinct rendering strategies:

```mermaid
graph TD
    A["Raw Bilibili Chinese Text"] --> B{"Selected Display Mode"}
    B -->|"Translated Only"| C["Replace Text Directly (Clean English UI)"]
    B -->|"Bilingual Mode"| D["Render Original (CN) + Translated (EN) Stacked"]
    B -->|"Hover Mode"| E["Display Translation Tooltip on Mouseenter"]
```

### 1. Translated Only Mode
Replaces original Chinese text strings with clean translations directly within existing DOM Text Nodes. Ideal for users who want a seamless, distraction-free browsing experience indistinguishable from a native English platform.

### 2. Bilingual Mode
Displays the original Chinese character string alongside the translated text (e.g., `原神 Genshin Impact`). This mode is widely acclaimed by language learners who want to improve their technical or conversational Mandarin vocabulary while watching gameplay or dev tutorials.

### 3. Hover Mode
Leaves the interface layout entirely in its original state and displays a lightweight, GPU-accelerated translation card only when hovering the mouse over video titles, comments, or user tags. This guarantees 100% layout fidelity across bespoke web components.

---

## Translation Engine Comparison & Local LLM Integration

BiliBili English Translator supports multiple backend translation providers, giving users total control over speed, cost, and privacy:

| Engine | Primary Advantage | Best Use Case | API Key Needed? |
| :--- | :--- | :--- | :--- |
| **Instant Local Dictionary** | **0ms latency, offline execution** | UI navigation, playback speeds, platform menus | ❌ None |
| **Google Web Engine** | High speed, broad vernacular coverage | Video titles, descriptions, general commentary | ❌ None |
| **LibreTranslate** | Open-source, privacy-first | Privacy-conscious users, self-hosted proxies | ⚠️ Optional |
| **MyMemory** | Collaborative translation memory | Common idioms and community terminology | ❌ Free tier included |
| **Custom AI (Ollama / DeepSeek / OpenAI / Groq)** | **Highest semantic nuance & ACG context** | Complex anime commentary, technical dev talks | ✅ User-provided key |

```mermaid
sequenceDiagram
    autonumber
    actor User as Bilibili Viewer
    participant Ext as Extension Content Script
    participant Cache as Local Storage Cache
    participant Dict as Built-in Dictionary
    participant Cloud as Translation Engine
    
    User->>Ext: Scrolls to new comments section
    Ext->>Cache: Check hash(text + targetLang)
    alt Cache Hit (0ms)
        Cache-->>Ext: Return cached string
    else Cache Miss
        Ext->>Dict: Check common UI dictionary
        alt Dictionary Match (0ms)
            Dict-->>Ext: Return pre-compiled verb
        else Dynamic Content
            Ext->>Cloud: Dispatch translation batch
            Cloud-->>Ext: Return translated text
            Ext->>Cache: Store in local LRU cache
        end
    end
    Ext-->>User: Update DOM TextNode in-place
```

---

## Supported Languages

The extension features 8 built-in target languages with automated source language detection:

* **English** (en)
* **Chinese / 中文** (zh)
* **Japanese / 日本語** (ja)
* **Korean / 한국어** (ko)
* **Spanish / Español** (es)
* **French / Français** (fr)
* **German / Deutsch** (de)
* **Russian / Русский** (ru)

*(Additional world languages can be specified dynamically when connecting custom LLM translation endpoints.)*

---

## Step-by-Step Installation: Chrome Web Store Walkthrough

The extension is officially verified and distributed via the Chrome Web Store.

```
+-------------------------------------------------------------------------------+
|  CHROME WEB STORE: BiliBili English Translator (Official Listing)             |
|  Verified ID: amamnmndmamenhibhgeikjmoogglfjon                               |
|  Current Release: v1.0.2                                                      |
|                                                                               |
|  [ In-Place DOM Translation ]   [ 8 Languages ]   [ Add to Chrome (1-Click) ] |
+-------------------------------------------------------------------------------+
```

### Installation Steps:

1. **Open the Chrome Web Store Listing**:
   Visit the official [BiliBili English Translator Chrome Store Page](https://chromewebstore.google.com/detail/amamnmndmamenhibhgeikjmoogglfjon?utm_source=item-share-cb).
2. **Click "Add to Chrome"**:
   Review the permissions dialog and confirm installation.
3. **Open Bilibili**:
   Navigate to [bilibili.com](https://www.bilibili.com) or any video URL.
4. **Choose Your Mode & Language**:
   Click the extension icon in your browser toolbar to select your preferred display mode (Translated, Bilingual, or Hover) and target language.
5. **Enjoy Seamless Video Playback**:
   Video titles, playback speed selectors (e.g., `1.25x`, `1.5x`, `2.0x`), quality menus (`1080P 高清`), and comments will update automatically.

---

## Privacy, Security & Data Handling Disclosures

In accordance with Google Chrome Web Store developer standards and Google AdSense transparency policies:

* **Website Scope**: The extension only activates on Bilibili subdomains (`bilibili.com`, `live.bilibili.com`, `space.bilibili.com`, and `t.bilibili.com`).
* **Zero Browsing History Collection**: The extension does not record, sell, or analyze your browsing history or search habits.
* **No Account Access**: The extension does not read or intercept your Bilibili login cookies, passwords, or personal account settings.
* **Local Storage Storage**: Custom AI API keys (e.g., DeepSeek or OpenAI tokens) and local translation caches reside strictly inside your browser's private `chrome.storage.local` container.

---

## Key Takeaways

* **In-Place Mutation**: Directly edits text nodes using `node.nodeValue`, preventing Vue 3 virtual DOM reconciliation failures and player freezes.
* **3 Configurable Modes**: Seamlessly switch between Translated Only, Bilingual, and Hover Modes to fit entertainment or language learning needs.
* **Instant Speed via Local Dictionaries**: Common interface verbs and navigation controls render with 0ms latency from an embedded offline dictionary.
* **Multi-Engine AI Power**: Connect cloud translation APIs or self-hosted local LLMs (Ollama, Groq, DeepSeek) for optimal nuanced comprehension.
* **Cross-Browser Compatibility**: Runs smoothly on Google Chrome, Microsoft Edge, Brave, Arc, and Opera.

---

## Frequently Asked Questions (FAQ)

### Does this extension translate flying Danmaku bullet comments?
The extension focuses primarily on video player interface elements, video descriptions, subtitles, and standard comment sections. Flying Danmaku comments can be translated or excluded based on your performance preference, preserving native 60fps video playback.

### Why is an in-place translator better than Google Translate on Bilibili?
Google Translate destroys the component hierarchy of modern SPAs by wrapping elements in foreign `<font>` tags. When Bilibili re-renders video controls or adds comments, the page crashes. In-place translation maintains the original DOM tree 100% intact.

### How do I configure local Ollama or DeepSeek translation?
Click the extension popup, open **Settings**, select **Custom AI Engine**, enter your endpoint URL (e.g., `http://localhost:11434/api/generate`) and model name (e.g., `deepseek-r1` or `llama3`), and save your configuration.

---

## Related Engineering Resources & Tools

* [Bilibili In-Place Architecture & DOM Deep Dive](/guides/bilibili-chrome-in-place-translator-guide/) — Architectural whitepaper on TreeWalker filtering and Vue 3 hydration safety.
* [ChatGPT Ad & Promo Blocker Guide](/guides/chatgpt-ad-blocker-chrome-extension-guide/) — Remove upgrade nags and sponsored cards on ChatGPT.
* [ChatGPT Ad Blocker Interactive Sandbox Tool](/tools/chatgpt-ad-blocker/) — Test ad blocking rules and download custom extensions.
* [Generative Engine Optimization (GEO) Playbook](/guides/generative-engine-optimization-geo-guide/) — How to optimize documentation for AI discovery.
