---
title: "vLLM CUDA Out of Memory (OOM): Fixes for max_model_len, gpu_memory_utilization, and PagedAttention"
description: "Resolve vLLM CUDA Out of Memory errors when serving DeepSeek R1 and Llama models using VRAM allocation flags, KV cache quantization, and tensor parallelism."
pubDate: 2026-08-03
author: nadhebe-team
category: "tutorials"
tags: ["vLLM", "CUDA OOM", "Troubleshooting", "GPU VRAM", "DeepSeek R1", "PagedAttention"]
heroImage: "/images/vllm-cuda-out-of-memory-hero.webp"
heroAlt: "Vintage editorial illustration comparing VRAM block allocation charts and CUDA memory management on a soft sage green background"
estimatedReadingTime: 13
isPillar: true
topic: "Inference Engines"
searchIntent: "tutorial"
draft: false
faq:
  - question: "Why does vLLM throw CUDA OOM before processing a single inference request?"
    answer: "By default, vLLM pre-allocates up to 90% of available GPU VRAM (`gpu_memory_utilization=0.90`) for KV cache blocks. If PyTorch overhead or small GPU memory buffers exceed the remaining 10%, CUDA crashes."
  - question: "What is the optimal `gpu_memory_utilization` setting for vLLM on single 24GB GPUs?"
    answer: "Set `--gpu-memory-utilization 0.85` or `--gpu-memory-utilization 0.80` to leave sufficient VRAM headroom for PyTorch initialization."
sources:
  - label: "vLLM Memory Management Guide"
    url: "https://docs.vllm.ai/en/latest/models/engine_args.html"
---

# vLLM CUDA Out of Memory (OOM): Fixes for max_model_len, gpu_memory_utilization, and PagedAttention

Serving large language models like **DeepSeek R1 70B** or **Llama 3** with **vLLM** provides high token throughput. However, engineers frequently encounter `torch.cuda.OutOfMemoryError` failures during engine startup or peak concurrent user traffic.

This tutorial provides tested configuration flags and memory allocation strategies to eliminate vLLM CUDA OOM crashes permanently.

---

## Memory Allocation Architecture

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                    VLLM GPU VRAM ALLOCATION MATRIX                     │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
 ┌──────────────────────────┐        │        ┌──────────────────────────┐
 │ MODEL WEIGHTS (FP16/FP8) ├────────┼───────►│ PAGEDATTENTION KV CACHE  │
 │ • Static Model Memory    │        │        │ • Dynamic Request Blocks │
 └──────────────────────────┘        │        └──────────────────────────┘
 ┌──────────────────────────┐        │
 │ PYTORCH & CUDA OVERHEAD  ├────────┘
 │ • Reserved Buffer (10%)  │
 └──────────────────────────┘
```

---

## 3 Core Configuration Fixes

### Fix 1: Adjust `--gpu-memory-utilization`
If vLLM crashes during engine initialization before serving any requests, reduce the reserved KV cache threshold from `0.90` to `0.82`:

```bash
python3 -m vllm.entrypoints.openai.api_server \
    --model deepseek-ai/DeepSeek-R1-Distill-Llama-70B \
    --gpu-memory-utilization 0.82 \
    --tensor-parallel-size 4
```

### Fix 2: Cap Context Window (`--max-model-len`)
Large models defaulting to 128k context windows require massive KV cache memory. Restrict maximum sequence length to match actual application requirements:

```bash
--max-model-len 8192
```

### Fix 3: Enable FP8 / INT4 KV Cache Quantization
Reduce KV cache VRAM footprint by 50% without retraining:

```bash
--kv-cache-dtype fp8
```
