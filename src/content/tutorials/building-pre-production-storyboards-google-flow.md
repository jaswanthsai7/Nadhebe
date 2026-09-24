---
title: "How to Use Google Flow Storyboard Studio: Script Uploads, Custom Characters & Scenes"
description: "A step-by-step tutorial on importing scripts, uploading custom character reference images, inserting scenes, and locking visual consistency in Google Flow."
pubDate: 2026-07-17
author: nadhebe-team
category: Tutorials
tags: ["google-flow", "tutorials", "storyboard", "custom-characters", "google-labs"]
heroImage: "/images/storyboard-tutorial-hero.webp"
heroAlt: "Minimalist mockup displaying a sequence of three frames on a clean white user interface screen"
estimatedReadingTime: 8
isPillar: false
topic: "Google Flow Storyboard Tutorial"
searchIntent: "How to use Google Flow Storyboard Studio script upload custom character scene addition"
difficulty: "intermediate"
faq:
  - question: "How do I upload custom character images into Google Flow Storyboard Studio?"
    answer: "Open the Assets tab in Storyboard Studio, click '+ Add Character Profile', and upload reference PNG or JPEG character photos. Tag the profile with an handle like @Hero to lock that facial structure across rendered frames."
  - question: "Can I keep my own character consistent across scenes in Google Flow?"
    answer: "Yes. By pinning custom character photos in the Assets tab and referencing them via character tags in script lines, Storyboard Studio enforces visual continuity for faces, clothing, and art styles."
  - question: "Can I add a new scene into an existing storyboard in Google Flow?"
    answer: "Yes. Hover between any two panel frames on the timeline and click the '+ Insert Scene' button, or add a `[SCENE BREAK]` marker directly into the script editor panel to re-segment the sequence."
  - question: "What is the best script format for Google Flow Storyboard Studio?"
    answer: "Format scripts using standard scene headings (e.g., `EXT. CITY STREET - NIGHT`), clear action lines, and character tags (`@CharacterName`). Plain text (.txt), Markdown (.md), and PDF uploads are supported."
  - question: "How do I adjust or split individual scene frames?"
    answer: "Select any frame in the storyboard editor, click 'Split Frame', and specify the exact sentence or camera cut where the new panel should split."
  - question: "How do I ensure character consistency during complex action sequences?"
    answer: "Use manual character tagging in the frame editor: select the character outline, pick your registered asset profile, and trigger a consistency re-render pass."
sources:
  - label: "Google Flow Tutorials Portal"
    url: "https://creativelab.google/flow-storyboard/tutorials"
---

## Tutorial: Building Pre-Production Storyboards in Google Flow

This tutorial walks through creating a storyboard using Google Flow's **Storyboard Studio** (available in **Google Labs**), from script import and custom character uploads to inserting new scenes and animating via Google Veo.

<div class="my-28 p-24 rounded-16 border-2 border-accent/40 bg-accent/5 dark:bg-accent/10 shadow-medium not-prose">
  <div class="space-y-12">
    <div class="flex flex-wrap items-center justify-between gap-8 border-b border-border/80 dark:border-border-dark/80 pb-12">
      <div class="flex items-center gap-8">
        <span class="inline-flex items-center gap-5 px-10 py-3 rounded-full text-xs font-mono font-bold bg-accent text-white uppercase tracking-wider">
          <span class="w-6 h-6 rounded-full bg-white animate-pulse"></span>
          Creator Toolkit
        </span>
        <span class="text-caption font-bold text-ink dark:text-ink-dark">
          Free Browser Extensions for AI Video Creators
        </span>
      </div>
      <span class="text-xs font-mono text-muted dark:text-muted-dark">
        Chrome Web Store Verified
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 pt-4">
      <!-- Tool 1: ChatGPT Ad Blocker -->
      <div class="p-16 rounded-12 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark flex flex-col justify-between space-y-10 shadow-xs">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">For Script &amp; Prompt Writing</span>
            <span class="text-[11px] font-mono text-muted dark:text-muted-dark">v1.1.0 • 5.0 ★</span>
          </div>
          <h4 class="text-body font-bold text-ink dark:text-ink-dark m-0">ChatGPT Ad &amp; Promo Blocker</h4>
          <p class="text-caption text-muted dark:text-muted-dark m-0">
            Scripting your Storyboard scenes in ChatGPT? Clean up upgrade nags, sponsored partner cards, and promo banners for distraction-free prompting.
          </p>
        </div>
        <a 
          href="https://chromewebstore.google.com/detail/oiopppgakilklffapfngfckonijjkggf?utm_source=item-share-cb"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-8 px-16 py-10 rounded-8 text-caption font-bold text-white bg-accent hover:opacity-90 transition-all text-decoration-none"
        >
          <svg class="w-16 h-16 fill-current" viewBox="0 0 24 24"><path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.897-2.492L1.931 5.47zm13.435 6.007a5.455 5.455 0 0 1-1.321 6.993L10.092 24H12c6.627 0 12-5.373 12-12 0-.337-.015-.67-.043-1h-7.907a5.454 5.454 0 0 1-.776.477zM12 7.636a4.364 4.364 0 1 0 0 8.728 4.364 4.364 0 0 0 0-8.728z"/></svg>
          <span>Install on Chrome (Free)</span>
        </a>
      </div>

      <!-- Tool 2: BiliBili Translator -->
      <div class="p-16 rounded-12 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark flex flex-col justify-between space-y-10 shadow-xs">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold text-accent dark:text-accent-dark">For Visual &amp; Anime Research</span>
            <span class="text-[11px] font-mono text-muted dark:text-muted-dark">v1.0.4</span>
          </div>
          <h4 class="text-body font-bold text-ink dark:text-ink-dark m-0">BiliBili English Translator</h4>
          <p class="text-caption text-muted dark:text-muted-dark m-0">
            Researching animation references, dev masterclasses, or game footage on Bilibili? Translate menus, comments, and player controls in real time.
          </p>
        </div>
        <a 
          href="https://chromewebstore.google.com/detail/amamnmndmamenhibhgeikjmoogglfjon?utm_source=item-share-cb"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-8 px-16 py-10 rounded-8 text-caption font-bold text-white bg-accent hover:opacity-90 transition-all text-decoration-none"
        >
          <svg class="w-16 h-16 fill-current" viewBox="0 0 24 24"><path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.897-2.492L1.931 5.47zm13.435 6.007a5.455 5.455 0 0 1-1.321 6.993L10.092 24H12c6.627 0 12-5.373 12-12 0-.337-.015-.67-.043-1h-7.907a5.454 5.454 0 0 1-.776.477zM12 7.636a4.364 4.364 0 1 0 0 8.728 4.364 4.364 0 0 0 0-8.728z"/></svg>
          <span>Install on Chrome (Free)</span>
        </a>
      </div>
    </div>
  </div>
</div>

## Step-by-Step Workflow

### Step 1: Create a Project and Choose a Style
* Launch Google Flow and open **Storyboard Studio** from the tools panel.
* Select a visual style preset (e.g., *3D Animation*, *Line Art*, or *Photorealistic Cinematic*).

### Step 2: Import and Format the Script
To achieve optimal scene extraction in Google Flow:
* Upload a plain text (`.txt`), Markdown (`.md`), or PDF file into the script pane.
* Structure script lines using clear scene headers (`INT.` / `EXT.`), character tags, and action descriptions.
* Flow will parse the script automatically into locations, actions, and character cues.

```text
[SCENE 1] EXT. NEON CITY STREET - NIGHT
@Maya stands under the glowing rain-slicked overhang, holding a digital tablet.
CAMERA: Close-up on @Maya's face as neon reflections streak across her visor.
```

### Step 3: Custom Character Upload & Consistency Anchoring

> [!TIP]
> To preserve your own original character designs across all storyboard frames, upload reference images directly into the **Assets** catalog before rendering panels.

1. Navigate to the **Assets** tab in the left sidebar.
2. Click **+ Add Asset Profile** and select **Character**.
3. Upload 1 to 3 front-facing reference photos or concept art drawings of your character.
4. Assign a unique tag identifier (e.g., `@Maya` or `@DetectiveJohn`).
5. Set baseline visual parameters (hair style, outfit colors, art style weights).

When panel generation runs, Google Flow's visual encoder pins your uploaded character identity into every scene prompt, eliminating facial drift across camera angles.

### Step 4: How to Add & Split Scenes in the Storyboard Timeline

Creators often need to add new visual beats or split long script paragraphs into dedicated camera panels after the initial script parse.

```
Initial Timeline:  [ Scene 1: Frame A ] ----------> [ Scene 2: Frame B ]
                                            ^
                                     Click (+ Add Scene)
Updated Timeline:  [ Scene 1: Frame A ] -> [ NEW SCENE ] -> [ Scene 2: Frame B ]
```

* **Adding a New Scene**: Hover over the divider between two storyboard panels and click the **+ Insert Scene** icon. You can type a custom prompt or paste a new script excerpt directly into the scene editor.
* **Splitting an Existing Panel**: Click on a panel, select **Split Scene Frame**, and drag the split handle to separate dialogue from action shots.

### Step 5: Fix Drift with Manual Tagging
* Review the generated frames for character drift.
* If a character's face or costume shifts, click the frame editor, highlight the character, and tag it with the registered reference profile from your assets catalog.
* Re-render the frame to lock in visual consistency.

### Step 6: Animate via Google Veo
* For dynamic previews, select target panels and click the **Animate** toggle.
* The system sends the layout coordinates to Google's **Veo** video model to compile short pre-visualization clips.

### Image Metadata
* **Hero Image**:
  - **Prompt**: "Clean minimal UI layout showing three storyboard frame panels with pastel illustrations, white workspace backdrop, daylight"
  - **Filename**: "storyboard-tutorial-hero.jpg"
  - **Alt**: "Storyboard panels UI mockup"
* **Supporting Visual 1**:
  - **Prompt**: "Sleek dropdown menu user interface graphic showing style options, pastel color details"
  - **Filename**: "style-menu-ui.jpg"
  - **Alt**: "Style menu dropdown interface"
* **Supporting Visual 2**:
  - **Prompt**: "Close-up of a designer glass cup and white notepad on a modern clean table with soft shadows"
  - **Filename**: "notepad-detail.jpg"
  - **Alt**: "Designer notepad detail"

## Related Production Guides

* For an overview of pre-production workflow optimization, explore [The Producer's Guide to AI-Assisted Pre-Production Workflows](/guides/ai-storyboarding-pre-production-workflows).
* Compare Storyboard Studio tools in our overview [Google Flow Storyboard Studio: Product Overview](/tutorials/google-flow-storyboard-studio-guide/).

