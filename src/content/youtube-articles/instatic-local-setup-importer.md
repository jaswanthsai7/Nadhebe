---
title: "Video Walkthrough: Local Setup and HTML Importer Mechanics"
description: "Watch a video setup guide for Instatic CMS, walking through powershell commands, Bun installation, admin dashboards, and importing layout files."
pubDate: 2026-07-10
author: bob-smith
category: "YouTube Articles"
tags: [instatic, youtube, setup, importer]
heroImage: "https://img.youtube.com/vi/DwaLQmPlALI/maxresdefault.jpg"
heroAlt: "Sleek 3D illustration of browser layouts and video timeline panels"
draft: false
topic: "Instatic"
isPillar: false
searchIntent: "Video guide on configuring local settings and site importer in Instatic"
estimatedReadingTime: 5
difficulty: "beginner"
youtubeVideoId: "DwaLQmPlALI"
youtubeVideoUrl: "https://youtu.be/DwaLQmPlALI?si=5UthR89Q95a0i_PU"
videoId: "DwaLQmPlALI"
videoDuration: "06:45"
videoUploadDate: 2026-07-10
faq:
  - question: "Which timestamp shows the Windows Bun installation?"
    answer: "The Bun installation command and execution is demonstrated at timestamp 02:15 in the video walkthrough."
  - question: "How does the video import existing static layouts?"
    answer: "The author drags and drops static HTML/CSS files into the data import panel at timestamp 03:50."
---

In this video review, we walk through the installation process for **Instatic CMS**, demonstrating how to run it locally on Windows using PowerShell, clone the source repository, and import templates.

---

## Watch the Setup Walkthrough

<div class="video-wrapper aspect-video">
  <iframe src="https://www.youtube.com/embed/DwaLQmPlALI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full"></iframe>
</div>

*Video Reference: YouTube Video ID [DwaLQmPlALI](https://youtu.be/DwaLQmPlALI?si=5UthR89Q95a0i_PU)*

---

## Video Segments and Highlights

### 1. Bun Installation on Windows (02:15)
The video details the installation of the Bun runtime on a Windows host using a PowerShell scripts link, bypassing standard shell limitations.

![Bun PowerShell Setup](/images/setup-video-step1.png)
*Figure 1: Copying and running the Windows command in PowerShell.*

### 2. Layout File Overrides (04:12)
If you attempt to import files into an active project twice, the importer checks for conflicts. The tutorial demonstrates clicking the "override all" button to keep layouts in sync.

![Conflict Overrides Panel](/images/setup-video-step2.png)
*Figure 2: Custom conflict dialogue resolution during folder uploads.*

---

## Key Takeaways
- **No Node Bloat**: Local setups run entirely on the high-speed Bun package runtime.
- **Visual Conflict Alerts**: The layout import wizard detects existing layouts to prevent accidental deletions.
- **Client Sandbox Access**: Custom credential levels block editors from accessing styling configurations.
