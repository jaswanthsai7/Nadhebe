---
title: "Importing HTML Websites into Instatic CMS: Importer Mechanics"
description: "A deep dive into Instatic's HTML and site importing engine, showing how raw markup is converted into editable selectors and components."
pubDate: 2026-07-10
author: alice-chen
category: "Tools"
tags: [instatic, HTML-import, site-migration, tools]
heroImage: "/images/tools-hero.png"
draft: false
topic: "Instatic"
isPillar: false
searchIntent: "How to use Instatic website and HTML import tools to migrate existing pages"
estimatedReadingTime: 6
difficulty: "intermediate"
youtubeVideoId: "O88lL2v3JkA"
youtubeVideoUrl: "https://youtu.be/O88lL2v3JkA?si=INNufrcW-ocyz698"
faq:
  - question: "Does the HTML importer capture external CSS?"
    answer: "Yes, when running a full site import, Instatic fetches referenced styles and builds matching class selectors inside the editor."
  - question: "Can I import a single layout section?"
    answer: "Yes. The block importer lets you paste any raw HTML snippet, which the canvas editor instantly converts into editable components."
---

Migrating an existing website into a new content management system often requires rebuilding the layout from scratch. However, **Instatic CMS** simplifies this transition with its built-in website and HTML importing engines.

Rather than just copying raw code into an iframe, Instatic converts incoming markup directly into editable canvas elements, class selectors, and design tokens. This guide explains the mechanics behind the importer and how to manage site migrations.

---

## The Importer AST Pipeline

The importer parses incoming markup through a multi-step pipeline to make the elements visually editable:

```mermaid
graph TD
    RawHTML[Raw HTML Input] -->|Parse DOM| ASTParser[AST Node Parser]
    ASTParser -->|Extract Classes| ClassCompiler[Class Selector Engine]
    ASTParser -->|Extract Assets| AssetDownloader[Media & Font Downloader]
    ClassCompiler -->|Bind Styles| CanvasElements[Editable Canvas Nodes]
    AssetDownloader -->|Register Assets| MediaGallery[Instatic Media Gallery]
```

This translation layer processes standard CSS rules and assets, making the imported page fully compatible with the visual styling panel.

---

## Step-by-Step HTML Section Migration

If you only need to migrate a single section (like a pricing grid or card layout), follow these steps:

1. **Copy the Source Code**: Inspect the source site and copy the wrapper container's outer HTML.
2. **Paste into the Importer**: Open the Instatic canvas, select the target parent node, and open the HTML block importer. Paste your snippet.
3. **Resolve Design Tokens**: Open the **Selector Manager** to merge any imported styling rules with your project's design system tokens.
4. **Optimize Assets**: Replace absolute image URLs with files uploaded to the Instatic media manager for faster loading.

---

## Platform Video Overview

Watch the importer process and convert external layouts into clean, editable visual elements:

<div class="video-wrapper aspect-video">
  <iframe src="https://www.youtube.com/embed/O88lL2v3JkA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full"></iframe>
</div>

---

## Key Takeaways
- **No Rebuilding Required**: Convert raw HTML and CSS into editable canvas elements.
- **Unified Style Rules**: Use the Selector Manager to map imported classes to your design system.
- **Fast Block Imports**: Paste code snippets directly into the canvas to populate layouts instantly.
