---
title: "Running Flux.1 Local Image Generation on Consumer GPUs"
description: "Developer tutorial to run Flux.1 open diffusion models locally on consumer GPUs using ComfyUI. Covers Schnell vs Dev, NF4 quantization, 8GB VRAM offloading, and LoRA setup."
pubDate: 2026-08-06
author: nadhebe-team
category: "tutorials"
tags: ["Flux.1", "ComfyUI", "Local AI", "Consumer GPU", "Image Generation", "NF4 Quantization", "Diffusion Models"]
heroImage: "/images/run-flux-1-locally-consumer-gpu-hero.webp"
heroAlt: "Vintage editorial collage illustration showing open diffusion generation nodes and graphics pipelines"
estimatedReadingTime: 15
isPillar: false
topic: "Generative Image Synthesis & Local Flux"
searchIntent: "tutorial"
draft: false
canonicalUrl: "https://nadhebe.com/tutorials/run-flux-1-locally-consumer-gpu"
faq:
  - question: "What is the difference between Flux.1 Schnell and Flux.1 Dev?"
    answer: "Flux.1 Schnell is a distilled 4-step ultra-fast open-weights model released under the Apache 2.0 license, optimized for rapid local prototyping and game asset generation. Flux.1 Dev is a 12-billion parameter non-commercial guidance-distilled model designed for maximum prompt adherence, fine detail generation, and complex typography composition (typically requiring 20 to 50 sampling steps)."
  - question: "How does NF4 quantization allow Flux.1 to run on 8GB VRAM GPUs?"
    answer: "Unquantized FP16 Flux.1 requires over 24 GB of VRAM just to load model weights. Normal Float 4 (NF4) quantization compresses weight precision down to 4 bits per weight with negligible quality degradation, reducing model memory footprint to ~6.8 GB. When combined with ComfyUI's dynamic CPU offloading, Flux.1 runs comfortably on 8GB consumer GPUs like the RTX 4060 and RTX 3070."
  - question: "Can I use custom LoRA models with Flux.1 in ComfyUI?"
    answer: "Yes, ComfyUI supports Flux.1 LoRA loading via specialized dual-clip text encoder nodes. You can layer multiple LoRAs (such as custom product style or character LoRAs) at dynamic weight strengths ranging from 0.1 to 1.0."
sources:
  - label: "Black Forest Labs Official Flux.1 Model Repository"
    url: "https://github.com/black-forest-labs/flux"
  - label: "ComfyUI Official Open Diffusion Workflow Examples"
    url: "https://github.com/comfyanonymous/ComfyUI"
---

# Running Flux.1 Local Image Generation on Consumer GPUs

Local visual generation reached a major milestone with the release of **Flux.1** by Black Forest Labs (the original creators of Stable Diffusion). Featuring 12 billion parameters, flow matching architecture, and superior prompt adherence, Flux.1 produces photorealistic images, precise text typography, and intricate hands without proprietary cloud subscriptions like Midjourney.

However, unquantized FP16 Flux.1 model weights require over **24 GB of VRAM**, posing a barrier for developers operating standard consumer GPUs.

In this tutorial, you will learn how to deploy Flux.1 locally using **ComfyUI**, leverage **NF4 (Normal Float 4) quantization**, optimize 8GB VRAM CPU offloading, and configure production image generation workflows.

---

## Flux.1 Model Variants & Architectural Comparison

Flux.1 utilizes a hybrid Transfusion architecture combining a multimodal transformer (MMDiT) with flow matching sampling:

```mermaid
flowchart TD
    UserPrompt[Text Prompt + T5 Text Encoder] --> DualCLIP[Dual CLIP-L & T5XXL Text Encoders]
    DualCLIP --> FlowMatcher[Flux.1 MMDiT 12B Flow Matching Transformer]
    FlowMatcher --> NF4Quant{VRAM Headroom Check}
    
    NF4Quant -- 8GB GPU --> CPUOffload[NF4 Quantized Weights + ComfyUI CPU Offload]
    NF4Quant -- 24GB GPU --> NativeVRAM[Native FP16 VRAM Execution]
    
    CPUOffload --> VAE[Flux VAE Decoder]
    NativeVRAM --> VAE
    VAE --> ImageOutput[Final 1024x1024 Output Image]
```

### Model Matrix: Schnell vs. Dev vs. Pro

| Parameter Vector | Flux.1 Schnell | Flux.1 Dev | Flux.1 Pro |
|---|---|---|---|
| **Target Audience** | Local Prototyping / Game Dev | High-Detail Creators | Enterprise Cloud API |
| **Open Weights License** | Apache 2.0 (Commercial OK) | Non-Commercial Research | Proprietary API Only |
| **Sampling Steps Required** | **4 steps** | 20 – 50 steps | 25 – 50 steps |
| **NF4 Quantized Size** | ~6.2 GB | ~6.8 GB | N/A (Cloud Hosted) |
| **Generation Speed (RTX 4060)** | **~3.2 seconds / image** | ~28 seconds / image | Cloud Dependent |

---

## Step-by-Step Installation in ComfyUI

### Step 1: Install ComfyUI and Update Extensions

Clone the official ComfyUI repository and install Python requirements:

```bash
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
```

Ensure your CUDA PyTorch runtime is updated to support `bitsandbytes` NF4 quantization:

```bash
pip install bitsandbytes accelerate --upgrade
```

### Step 2: Download Flux.1 Quantized Weights and Encoders

Place the following model files into their respective ComfyUI subdirectories:

1. **UNET / Diffusion Weights** (`ComfyUI/models/unet/`):
   - `flux1-schnell-bnbs-nf4.safetensors` (NF4 Quantized Schnell)
   - `flux1-dev-bnbs-nf4.safetensors` (NF4 Quantized Dev)
2. **Text Encoders** (`ComfyUI/models/clip/`):
   - `clip_l.safetensors` (Standard OpenAI CLIP-L)
   - `t5xxl_fp8_e4m3fn.safetensors` (FP8 Quantized T5 Text Encoder)
3. **VAE Decoder** (`ComfyUI/models/vae/`):
   - `ae.safetensors` (Official Flux VAE)

---

## Building an 8GB VRAM Optimized ComfyUI Workflow

To run Flux.1 on 8GB VRAM consumer GPUs (such as RTX 4060, RTX 3070, or Apple Silicon Macs), use the node layout pattern below:

```json
{
  "1": {
    "inputs": {
      "unet_name": "flux1-schnell-bnbs-nf4.safetensors",
      "weight_dtype": "fp8_e4m3fn"
    },
    "class_type": "UNETLoader"
  },
  "2": {
    "inputs": {
      "clip_name1": "clip_l.safetensors",
      "clip_name2": "t5xxl_fp8_e4m3fn.safetensors",
      "type": "flux"
    },
    "class_type": "DualCLIPLoader"
  },
  "3": {
    "inputs": {
      "vae_name": "ae.safetensors"
    },
    "class_type": "VAELoader"
  },
  "4": {
    "inputs": {
      "text": "A vintage editorial collage illustration of a developer working on a laptop, muted sage green background, halftone dot texture, minimal tech art style",
      "clip": ["2", 0]
    },
    "class_type": "CLIPTextEncode"
  },
  "5": {
    "inputs": {
      "seed": 42,
      "steps": 4,
      "cfg": 1.0,
      "sampler_name": "euler",
      "scheduler": "simple",
      "denoise": 1.0,
      "model": ["1", 0],
      "positive": ["4", 0],
      "negative": ["4", 0],
      "latent_image": ["6", 0]
    },
    "class_type": "KSampler"
  },
  "6": {
    "inputs": {
      "width": 1024,
      "height": 576,
      "batch_size": 1
    },
    "class_type": "EmptyLatentImage"
  }
}
```

---

## Advanced Optimization Commands for Low VRAM Execution

Launch ComfyUI with low-VRAM memory flags to enable dynamic layer offloading:

```bash
# For 8GB VRAM GPUs (RTX 4060 / 3070)
python main.py --lowvram --fp16-vae

# For 6GB VRAM GPUs (GTX 1660 / RTX 3050)
python main.py --novram --fp16-vae
```

> **Performance Note**: The `--lowvram` flag keeps non-active transformer layers stored in System RAM, swapping weight blocks into VRAM only during active forward passes. This prevents Out-Of-Memory (OOM) crashes during high-resolution 1024x1024 generation.

---

## Summary & Key Takeaways

- **Schnell for Speed**: Use `flux1-schnell` (4 steps) for rapid 3-second iteration.
- **NF4 Quantization**: Standardize on `bnbs-nf4` weights to reduce VRAM memory overhead by over 70%.
- **Text Encoder FP8**: Pair CLIP-L with `t5xxl_fp8` to keep total text encoding memory under 4.5 GB.
