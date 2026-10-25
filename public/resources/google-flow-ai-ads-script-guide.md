# Google Flow & ChatGPT AI Influencer Video Ads Master Prompt Guide

A production-ready framework for generating photorealistic 30-second AI character video ads across three continuous 10-second clips using Google Flow and ChatGPT.

## Video Preview
<video src="/resources/Untitled_Scene_08-09_08_50_31_202608092311_2.mp4" controls autoplay loop muted playsinline class="w-full rounded-12 shadow-medium border border-border my-6 bg-black"></video>

---

## 1. Character Generation Master Prompts (ChatGPT / DALL-E 3)

### Baseline Influencer Setup (Prompt 1)

```text
Hey, I'm planning to create an influencer-style video with a female character. I want her to be good-looking, in her 20s with mixed American and Mexican appearance. She would be sitting on a sofa in wide frame with aesthetic, realistic background that feels like a real social media influencer setup but not like a podcast setup. Can you please generate an image for this character?
```

### Photorealistic Texture & Detail Lockdown (Prompt 2)

```text
Create a highly photorealistic young female social media influencer in her mid-20s with a natural mixed American and Mexican appearance.

She has realistic facial proportions, naturally attractive features, expressive eyes, subtle asymmetry, realistic pores, fine skin texture, tiny natural imperfections, faint freckles, peach fuzz, natural lips, individual eyebrow hairs, and realistic hair strands. Avoid overly smooth or plastic-looking skin.

She is sitting casually on a comfortable modern sofa in a stylish but lived-in apartment. The environment should feel like a genuine lifestyle influencer's home rather than a professional studio or podcast setup.

Use a wide, natural camera framing that shows the woman from approximately the waist up while keeping plenty of the surrounding environment visible. She is relaxed and naturally posed, looking toward the camera as if recording a casual social media video.

The apartment has tasteful contemporary decor, a soft neutral color palette, plants, cushions, books, subtle wall art, warm lamps, natural materials, and small everyday details that make the space feel genuinely lived in.

REALISM IS THE PRIORITY:
- physically realistic skin texture
- visible pores and subtle imperfections
- natural facial asymmetry
- realistic hair density and individual strands
- realistic fabric weave and clothing texture
- authentic skin-to-light interaction
- natural shadows and ambient occlusion
- realistic reflections
- detailed eyes with natural moisture and reflections
- subtle under-eye texture
- realistic hands and fingers
- believable body proportions
- no artificial beauty-filter appearance
- no excessive makeup
- no perfect CGI skin
- no waxy or glossy skin
- no exaggerated facial features

Lighting should resemble a real high-end lifestyle photograph taken inside a real apartment: soft window light mixed with warm practical lighting, natural falloff, subtle shadows, realistic exposure and color temperature.

Camera characteristics should resemble a professional full-frame mirrorless camera with a realistic 35mm lens, natural depth of field, subtle background separation, realistic optical characteristics, slight lens imperfections, natural dynamic range, and fine photographic grain.

The final image should look like an authentic photograph of a real person captured for Instagram, TikTok, or YouTube — not an AI-generated character, CGI render, 3D model, beauty advertisement, or studio portrait.

Ultra-detailed, photorealistic, natural skin, realistic textures, cinematic but believable, authentic lifestyle photography, true-to-life colors.
```

---

## 2. Product Ad Direction Prompt (ChatGPT -> Google Flow)

When uploading your reference character photo and target product photo to ChatGPT, use this prompt to generate the 3-scene breakdown:

```text
This is my AI influencer, and I’d like to create a 30-second ad with her for this product. I’ll be generating the video using Flow, which creates 10-second clips, so I’d like you to direct the ad as three separate 10-second scenes.
Please describe what should happen in each 10-second segment, with smooth continuation from one clip to the next. Keep the character, appearance, outfit, environment, camera style, and overall visual style consistent throughout all three clips so they feel like one continuous video.

Make sure you use a script section for voice script so that the same prompt can be reusable.
```

---

## 3. Reusable Google Flow Master Prompt Architecture

```text
MASTER CHARACTER & CONTINUITY
↓
SCENE 1 — HOOK / INTRO (0-10s)
  ├─ VISUAL DIRECTION
  └─ SCRIPT (VOICEOVER)
↓
SCENE 2 — PRODUCT DEMO (10-20s)
  ├─ VISUAL DIRECTION
  └─ SCRIPT (VOICEOVER)
↓
SCENE 3 — RESULT & CTA (20-30s)
  ├─ VISUAL DIRECTION
  └─ SCRIPT (VOICEOVER)
↓
CONTINUITY RULES & STRICT NO-DRIFT LOCKOUT
```

---

## 4. 30-Second Face Cream Ad — Master Flow Prompt Template

### MASTER CHARACTER & CONTINUITY — USE FOR ALL 3 CLIPS

```text
Character:
A highly photorealistic young female social media influencer in her mid-20s. She has a naturally attractive mixed American/Mexican appearance, realistic facial proportions, expressive brown eyes, naturally shaped lips, subtle facial asymmetry, realistic pores and skin texture, faint natural freckles, fine peach fuzz, individual eyebrow hairs and realistic individual hair strands. Her appearance must remain exactly consistent across all three clips. Do not change her face, age, body proportions, hairstyle, skin tone or facial features.

She has long, naturally wavy dark brown hair, parted slightly off-center, falling loosely over her shoulders and down one side of her chest.

Outfit:
White fitted ribbed tank top, light gray relaxed lounge pants, delicate gold necklace with a small pendant and small gold hoop earrings. The outfit remains completely unchanged throughout all three clips.

Environment:
A warm, modern, lived-in apartment. She is seated casually on the same cream-colored fabric sofa shown in the reference image. A large olive-green cushion is positioned to her right and a textured cream-and-black cushion is visible to her left. A soft knitted cream blanket rests on the left side of the sofa.

Behind her is the same open-plan apartment with a warm neutral color palette, large decorative mirror, indoor plant, kitchen island and dark kitchen cabinetry. Warm pendant lights are glowing in the background.

Lighting:
Warm natural daylight mixed with soft warm interior lighting. Soft flattering light on her face. Natural shadows. No dramatic studio lighting. Keep the exact same lighting direction, brightness and color temperature throughout all three clips.

Visual style:
Premium photorealistic lifestyle skincare advertisement. Natural influencer content rather than a traditional commercial. Cinematic but believable. Warm beige, cream, olive and brown color palette. Realistic skin texture. Shallow depth of field. Subtle background bokeh. No artificial beauty filter, no plastic skin, no excessive retouching.

Camera:
Vertical 9:16 social-media advertisement. Photorealistic cinematic camera. Medium shot framing from approximately waist/chest level upward. Camera positioned directly in front of her with a very subtle natural handheld feel. 50mm-style perspective, shallow depth of field. Slow, almost imperceptible camera movement. Keep camera height, lens perspective and overall composition consistent between clips.

Performance:
She behaves like a confident but relaxed beauty/lifestyle influencer speaking naturally to her audience. Friendly eye contact with the camera, subtle facial expressions, natural blinking, realistic breathing and small hand gestures. Avoid exaggerated influencer movements. Her gestures should feel spontaneous and conversational.

Important continuity rule:
The three clips are not separate scenes with different setups. They are three consecutive pieces of the same continuous conversation. Her body position, hairstyle, clothing, environment, lighting, camera position and visual style must remain consistent. The ending pose and hand position of each clip should naturally lead into the beginning of the next clip.
```

---

### SCENE 1 — HOOK / INTRODUCTION (0–10 seconds)

```text
Visual direction:
Begin with the influencer already seated comfortably in the exact position from the reference image.
She looks directly into the camera with a subtle friendly smile. She begins speaking naturally. During the first few seconds, she makes small conversational hand gestures while maintaining eye contact.
Around the middle of the clip, she reaches naturally toward a small face cream jar positioned on the coffee table just in front of her, slightly below camera frame.
She picks up the Natural Glow Face Cream jar and brings it into the frame.
The jar should match the supplied product reference: small round green-and-white cosmetic jar containing white cream, with the same overall packaging appearance and label design.
She holds the jar naturally near chest level while continuing to speak.
At the end of the clip, she is holding the jar in her right hand near her chest, looking at the camera.

Ending continuity position:
Freeze the action naturally with her holding the product near her chest. Do not put the product down.

SCRIPT — VOICE:
"Okay, this has honestly become one of my favorite little parts of my skincare routine. I’ve been using this Natural Glow Face Cream lately, and I really love how simple it feels."

Voice style:
Young female influencer voice, warm, conversational, confident, natural American English. Not overly enthusiastic. No announcer voice. Speak at a comfortable conversational pace.
```

---

### SCENE 2 — PRODUCT / APPLICATION (10–20 seconds)

```text
Continuation from Scene 1:
Begin exactly where Scene 1 ended.
She is still seated on the same sofa, wearing exactly the same outfit, holding the same face cream jar in her right hand at approximately chest level.
Do not reset the scene.
She looks briefly down at the product, smiles, then opens the jar naturally.
She uses her other hand to scoop a very small amount of the white cream onto her fingertip.
She brings the cream toward her face and gently demonstrates applying a small amount to her cheek.
Her movements are slow, natural and elegant. She lightly blends the cream into her cheek using her fingertips while looking between the camera and her reflection/hand.
Keep her facial expression relaxed and genuine.
The camera makes a very subtle slow push-in during the demonstration, maintaining the same perspective and warm cinematic look.
Do not create an extreme skincare close-up. Keep the influencer recognizable throughout the demonstration.
At the end, she lowers her hand slightly and looks directly back into the camera with a soft smile.

Ending continuity position:
She finishes blending the cream, lowers her hand naturally and faces the camera. The product remains visible in her other hand or is placed naturally beside her without changing the environment.

SCRIPT — VOICE:
"I love that it feels lightweight and gives my skin that nice, hydrated feeling without making it feel heavy. And the aloe vera and vitamin E are such a nice touch."
```

---

### SCENE 3 — RESULT / CTA (20–30 seconds)

```text
Continuation from Scene 2:
Begin with the influencer in the exact same seated position and environment.
She looks directly into the camera with a relaxed smile.
She lightly touches her cheek for a moment, then gestures naturally toward the face cream.
She brings the product slightly closer toward the camera for a brief product-focused moment, keeping her face visible in the background.
The camera performs a very subtle push-in as she delivers the final line.
She then brings the product back toward herself and finishes with a natural confident smile directly at the camera.
End on a clean, warm lifestyle-commercial frame with her holding the product near her chest.
No dramatic transition. No change of location. No wardrobe change. No change of lighting.

SCRIPT — VOICE:
"If you’re looking for an easy everyday moisturizer, this is definitely one I’d keep in my routine. Natural Glow Face Cream — simple skincare, beautiful glow."
```

---

## 5. Summary & Workflow Checklist

- [ ] **Step 1**: Run Prompt 1 or Prompt 2 in ChatGPT/Midjourney to render anchor image.
- [ ] **Step 2**: Save reference portrait + product shot.
- [ ] **Step 3**: Pass character image + product image into ChatGPT with the 30-second ad prompt.
- [ ] **Step 4**: Paste Master Character & Continuity block + Scene 1 visual prompt into Google Flow.
- [ ] **Step 5**: Generate 10-second Clip 1.
- [ ] **Step 6**: Generate Clip 2 with Scene 2 visual prompt inheriting the ending keyframe pose.
- [ ] **Step 7**: Generate Clip 3 with Scene 3 visual prompt to complete the CTA.
- [ ] **Step 8**: Stitch 3 clips together in your video editor and attach ElevenLabs or Google TTS audio script.

---
*Created by Nadhebe Content & AI Engineering Team.*
