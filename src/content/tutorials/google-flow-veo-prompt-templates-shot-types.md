---
title: "25 Google Flow & Veo Prompt Templates for Every Shot (2026)"
description: "25 copy-paste Google Flow and Veo prompt templates for cinematic wide shots, close-ups, drone pans, tracking shots, POV, and slow-motion video."
pubDate: 2026-11-08
updatedDate: 2026-11-08
author: nadhebe-team
category: "Tutorials"
tags: ["google-flow", "veo", "prompt-engineering", "cinematography", "ai-video", "storyboarding"]
heroImage: "/images/google-flow-veo-prompt-templates-shot-types-hero.webp"
heroAlt: "Vintage editorial collage illustration of 35mm film cameras, storyboard shot frames, and lens aperture charts on a soft terracotta background"
estimatedReadingTime: 14
isPillar: false
topic: "Google Flow Storyboard Studio"
searchIntent: "google flow veo prompt templates camera shot types"
difficulty: "beginner"
faq:
  - question: "How do you control camera movement in Google Veo prompts?"
    answer: "Specify the exact camera rig and motion vector in the first five tokens of your prompt. Terms like 'Slow dolly forward', 'Steadicam tracking shot', or 'High crane boom down' signal the video diffusion model to prioritize spatial camera movement over erratic subject morphing."
  - question: "What is the best prompt structure for Google Flow video generation?"
    answer: "The optimal structure is: [Camera Movement & Rig] + [Subject & Action] + [Framing & Lens Type] + [Lighting & Atmospheric Mood] + [Film Stock & Render Fidelity]."
  - question: "Can Google Veo generate slow-motion video natively?"
    answer: "Yes. Adding technical frame rate descriptors such as 'High-speed 120fps slow-motion capture', 'Phantom Flex camera', or 'Fluid fluid-motion slow playback' instructs Veo to synthesize high-temporal-frequency frames without stuttering."
  - question: "How do you avoid motion distortion and warping in Veo shots?"
    answer: "Limit competing motion vectors in a single prompt. For example, avoid pairing 'Fast 360 camera spin' with 'Car speeding and tumbling'. Keep camera movement calm and linear while letting subjects execute one natural action."
  - question: "Which lens descriptors work best in Google Flow?"
    answer: "Use industry-standard focal lengths: 24mm for wide landscapes, 35mm for environmental portraits, 50mm for eye-level naturalism, 85mm for intimate dialogue close-ups, and 100mm macro for fine texture inserts."
sources:
  - label: "Google DeepMind Veo Technical Architecture"
    url: "https://deepmind.google/technologies/veo/"
  - label: "American Society of Cinematographers Camera Lexicon"
    url: "https://theasc.com/"
---

> **Direct Answer for Creators:** To achieve cinematic camera control in **Google Flow and Google Veo**, structure your prompts using the **Cinematic Token Formula**: `[Camera Rig & Motion] + [Subject & Blocking] + [Lens Focal Length & Shot Size] + [Lighting Atmosphere]`. Always place technical camera descriptors at the very start of the prompt to ensure Veo's video transformer commits to smooth camera vectors rather than introducing chaotic subject morphing.

Generating high-end video in Google Flow Storyboard Studio and Google Veo requires speaking the language of a Hollywood director of photography. Vague prompts like *"cinematic video of a car driving fast"* yield generic, jittery AI clips. By contrast, specifying exact camera rigs, focal lengths, shutter angles, and lighting setups produces broadcast-quality previz footage.

Here are **25 tested, copy-paste prompt templates** organized across seven foundational camera shot types for your Google Flow projects.

---

## The Cinematic Prompt Formula for Google Veo

```
[Camera Rig + Exact Vector Movement] 
+ [Primary Character Anchor & Action] 
+ [Framing / Lens Focal Length / Aperture] 
+ [Lighting Direction & Environmental Atmosphere] 
+ [Film Stock Texture / 35mm Aesthetic]
```

[SCREENSHOT: Comparison grid showing the visual difference between a generic prompt and a prompt using the Cinematic Token Formula]

---

## Category 1: Establishing & Extreme Wide Shots (EWS)

Establishing shots set geography, scale, and emotional tone before characters interact.

### 1. Vast Cyberpunk Cityscape Establishing
```text
Slow forward aerial drone push-in. A sprawling neo-Tokyo metropolis at twilight, towering monolithic skyscrapers connected by illuminated skybridges, endless streams of glowing crimson and cyan traffic flowing below. Extreme wide shot, 21mm anamorphic lens, deep focus f/8. Heavy humid atmosphere with low-hanging misty fog, wet reflective asphalt. Cinematic 35mm film grain, 4K resolution.
```

### 2. Desert Wasteland Horizon
```text
Slow panoramic camera pan from left to right. An endless red sand desert dune landscape under a blinding midday sun, heat waves shimmering across the horizon. A lone dilapidated radio tower stands in the far distance. Extreme wide landscape shot, 24mm cinematic lens, sharp horizon line, high contrast harsh desert daylight, photorealistic.
```

### 3. Ancient Nordic Fjord
```text
High crane shot slowly descending through low cloud cover. Deep glacial fjord surrounded by sheer granite sea cliffs, black sand beach below with turquoise ocean waves gently crashing. Extreme wide shot, 18mm wide-angle lens, cold overcast diffuse daylight, soft natural mist, National Geographic documentary aesthetic.
```

### 4. Midnight Cathedral Exterior
```text
Slow upward tilt from cobblestone courtyard to towering Gothic spires. A weathered medieval stone cathedral illuminated by brilliant full moonlight, rain-slicked statues casting dramatic long shadows. Extreme wide angle, 24mm lens, deep shadows, cinematic blue rim lighting, atmospheric volumetric rain streaks.
```

---

## Category 2: Medium Shots & Two-Shots (Dialogue Coverage)

Medium shots establish physical relationships and let characters deliver lines naturally. Always incorporate your character consistency tags as detailed in our [Google Flow character consistency guide](https://nadhebe.com/tutorials/how-to-keep-characters-consistent-in-google-flow/).

[SCREENSHOT: Storyboard panel showing a balanced medium two-shot with shallow depth of field]

### 5. Intimate Coffee Shop Two-Shot
```text
Static eye-level medium two-shot. Two colleagues seated across a polished mahogany cafe table engaged in serious whispered conversation. Medium shot framed from the waist up, 50mm portrait lens, shallow depth of field with warm golden bokeh lights in the blurred background. Soft afternoon window light striking faces naturally.
```

### 6. Police Interrogation Room
```text
Slow creeping push-in on an industrial interrogation table. A stern detective leans forward on both hands, facing an unbothered suspect seated opposite. Medium two-shot, 35mm anamorphic lens, stark single overhead fluorescent lamp casting hard downward facial shadows, cold desaturated green color grade.
```

### 7. Street Corner Walk-and-Talk
```text
Smooth backward Steadicam tracking shot keeping pace with two characters walking briskly down a busy London sidewalk in Autumn. Medium shot, 45mm lens, natural handheld stabilization, golden hour sunlight filtering through turning chestnut tree leaves, gentle lens flares.
```

---

## Category 3: Close-Ups & Extreme Close-Ups (ECU)

Close-ups convey raw subtext, fear, determination, and subtle micro-expressions.

### 8. Emotional Dramatic Close-Up
```text
Slow microscopic push-in on a young woman's face, her hazel eyes glistening with held-back tears, subtle muscle twitch in her jaw. Tight close-up shot, 85mm portrait prime lens, wide open aperture f/1.4, razor-thin depth of field with only the irises in tack-sharp focus. Soft warm directional Rembrandt lighting.
```

### 9. Sweat and Determination Sports Close-Up
```text
Handheld camera with slight organic micro-jitter. An exhausted marathon runner looking up toward the finish line, heavy sweat dripping from his temple, laboured deep breathing. Tight close-up, 85mm lens, harsh stadium floodlights backlighting droplets of moisture, gritty high-contrast sports documentary aesthetic.
```

### 10. Intense Eye Macro (Extreme Close-Up)
```text
Dead-center macro shot of a dilated human eye. In the reflection of the dark pupil, a countdown timer or neon sign is clearly visible. Extreme close-up shot, 100mm macro prime lens, crisp iris muscle textures, ring light catchlight in the pupil, hyper-detailed photorealistic.
```

### 11. Locked Vault Keypad Insert
```text
Top-down macro insert shot. Gloved trembling fingertips entering a six-digit code into a weathered glowing mechanical keypad, yellow LED indicators illuminating worn steel numbers. Extreme close-up insert, 90mm macro lens, shallow focus, tense suspense thriller atmosphere.
```

---

## Category 4: Tracking & Steadicam Movement Shots

Tracking shots create momentum and place the audience directly inside the action.

[SCREENSHOT: Visual diagram showing the movement vectors of Steadicam tracking vs low-angle vehicle mounts]

### 12. Foot Chase Alleyway Tracking
```text
Low-angle forward Steadicam tracking shot rushing behind a protagonist sprinting at full speed down a winding cobblestone alleyway. Fast-moving camera, 28mm wide lens capturing motion blur along peripheral walls, sharp focus on the running figure. Flickering amber lantern light, puddle water splashing violently into camera lens.
```

### 13. Hospital Hallway Gurney Rush
```text
High-energy backward tracking shot leading a team of doctors rushing an emergency patient down a long white hospital corridor. Fluid camera movement, 24mm lens, overhead fluorescent ceiling lights rushing past in rhythmic succession, natural motion blur, authentic medical drama pacing.
```

### 14. Luxury Vehicle Side Profile Tracking
```text
Car-to-car low-slung tracking shot running parallel to a vintage silver sports car cruising along a winding coastal highway at sunset. Smooth camera stabilization, 35mm lens, orange sun reflecting off sculpted chrome bumpers, asphalt rushing beneath the chassis in sharp motion blur.
```

---

## Category 5: Point-of-View (POV) & Subjective Camera

POV shots force viewers to experience events directly through the protagonist's eyes.

### 15. Astronaut Spacewalk POV
```text
First-person astronaut helmet POV looking down at Earth spinning silently below. The curved glass visor of the helmet reflects control gauges and the blinding white sun, realistic condensation breathing fog on the edge of the visor. Wide-angle 16mm fish-eye perspective, deep infinite space blackness, zero-gravity slow drifting motion.
```

### 16. Night Vision Military Infiltration POV
```text
First-person subjective POV looking down the iron sights of a tactical carbine rifle moving through a darkened warehouse. Authentic monochrome green night-vision phosphor display with glowing digital reticle, IR illuminator beam cutting through ambient dust motes, subtle digital grain.
```

### 17. Waking Up Groggy POV
```text
First-person subjective POV lying on a wooden cabin floor, eyes opening and closing with heavy blinking eyelids. Everything is heavily blurred and slowly pulls into sharp focus, revealing sunlight streaming through timber rafters. 35mm lens, simulated pupil adjustment, dreamlike hazy lighting.
```

---

## Category 6: Drone & Aerial Crane Shots

Aerials communicate omniscient scale, luxury, isolation, and spatial transitions.

### 18. Vertical Bird's-Eye Top-Down Spiral
```text
90-degree straight-down top-down drone shot slowly ascending and spiraling clockwise over a solitary classic sailboat moored in crystal-clear emerald ocean water. Clean geometric composition, ripple patterns radiating outward, brilliant midday sun penetrating coral reefs below. High-altitude 4K aerial photography.
```

### 19. Mountain Ridgeline Reveal
```text
Fast-moving FPV drone swooping over a jagged snow-covered alpine ridge, suddenly diving downward to reveal a vast green valley and glacial river below. Dynamic 20mm wide lens, exhilarating downward velocity, bright crisp mountain sunlight, zero motion artifacts.
```

### 20. Architectural Skyscraper Fly-By
```text
Smooth sweeping crane arc moving horizontally past the floor-to-ceiling glass penthouse windows of a futuristic skyscraper at blue hour. Inside, silhouette figures dine against a background of twinkling city lights. 35mm cinematic lens, soft architectural reflections on double-glazed glass.
```

---

## Category 7: Slow-Motion & High-Speed Stylized Shots

Slow motion emphasizes kinetic physics, micro-moments, and emotional climax.

[SCREENSHOT: High-speed video frame demonstrating crystal-clear water droplet splashes without temporal blurring]

### 21. Exploding Water Balloon High-Speed
```text
Phantom Flex high-speed 1,000fps slow-motion capture. A water balloon burst by a needle in mid-air, the balloon skin peeling back as a perfect spherical mass of water begins to disintegrate into thousands of suspended droplets. Clean black studio backdrop, high-intensity strobe rim lighting, ultra-sharp macro clarity.
```

### 22. Raindrop Impact on Car Windshield
```text
Slow-motion 240fps macro shot. Heavy rain droplets impacting a slanted car windshield, bursting into tiny geometric liquid shockwaves running down treated hydrophobic glass. Shallow focus, 100mm lens, blurry neon city streetlights reflecting in every droplet.
```

### 23. Boxer Punch Impact
```text
Ultra slow-motion 500fps capture of a boxing glove impacting an opponent's jaw. Sweat and water droplets explode outward from the impact, skin ripples in shockwave physics, mouthguard shifts. Harsh overhead boxing ring spotlight, high-contrast black background, gritty sports realism.
```

### 24. Campfire Spark Embers Drifting
```text
Slow-motion 120fps capture of golden glowing campfire sparks and embers swirling upward into a starry pitch-black night sky. Shallow depth of field, 50mm f/1.2 lens, sparks drifting into soft out-of-focus bokeh discs, warm crackling firelight illuminating timber logs below.
```

### 25. Cyberpunk Bullet-Time Matrix Orbit
```text
Bullet-time virtual 360-degree camera orbit frozen in time around a protagonist dodging backward in mid-air, rain droplets frozen completely motionless in 3D space around them. Wide-angle 24mm lens, vibrant magenta and teal rim lighting, hyper-sharp VFX composite aesthetic.
```

---

## How to Customize These Templates in Google Flow

To adapt any of these 25 templates for your own production:
1. **Swap the Character Anchor:** Replace the generic subject tokens with your pre-defined character anchor string.
2. **Match the Lighting Key:** Ensure consecutive shots share the same lighting tokens (e.g., *"golden hour"* vs *"midnight fluorescent"*) to maintain color harmony.
3. **Queue Generations in Storyboard Studio:** Paste the tailored text directly into Step 3 panel prompts, as shown in our [Google Flow Storyboard Studio master guide](https://nadhebe.com/tutorials/google-flow-storyboard-studio-guide/).

With these 25 cinematography formulas, your Google Flow storyboards will move beyond generic generative video into intentional, director-grade cinematic storytelling.

