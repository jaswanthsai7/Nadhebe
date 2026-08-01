---
title: "How to Deploy DeepSeek R1 on AWS using vLLM"
description: "A comprehensive infrastructure guide on deploying the DeepSeek R1 open-weight model on AWS using EC2, vLLM, and Docker for high-throughput enterprise inference."
pubDate: 2026-08-01
author: nadhebe-team
category: "tutorials"
tags: ["DeepSeek", "DeepSeek R1", "AWS", "vLLM", "Inference", "Deployment", "LLM Ops"]
heroImage: "/images/deepseek-r1-aws-vllm-hero.png"
heroAlt: "Retro-tech editorial graphic showing cloud infrastructure interacting with an AI data node"
estimatedReadingTime: 22
isPillar: true
topic: "Infrastructure & Deployment"
searchIntent: "informational"
draft: false
faq:
  - question: "Why use vLLM for DeepSeek R1?"
    answer: "vLLM utilizes PagedAttention, which dramatically reduces memory fragmentation and increases batching throughput. It is the industry standard for high-performance open-source LLM inference."
  - question: "What AWS instance type do I need for DeepSeek R1?"
    answer: "DeepSeek R1 is a massive mixture-of-experts (MoE) model. To run the full unquantized FP8/BF16 weights, you will need a multi-GPU node like a p4d.24xlarge (8x A100 80GB) or p5.48xlarge (8x H100)."
  - question: "Can I run it on a smaller instance?"
    answer: "Yes, if you use quantized versions (e.g., AWQ, GPTQ, or GGUF), you can fit the model on smaller multi-GPU setups (like g5.48xlarge with 8x A10G), though reasoning performance may degrade."
sources:
  - label: "vLLM Official Documentation"
    url: "https://docs.vllm.ai/"
  - label: "AWS EC2 Pricing"
    url: "https://aws.amazon.com/ec2/pricing/"
---

# How to Deploy DeepSeek R1 on AWS using vLLM

DeepSeek R1 has disrupted the AI landscape by offering frontier-level reasoning capabilities with fully open weights. For enterprise teams, this means you can deploy an OpenAI O1-equivalent reasoning engine entirely within your own Virtual Private Cloud (VPC), guaranteeing zero data exfiltration.

However, deploying a massive Mixture-of-Experts (MoE) model with 671 billion parameters (with 37B active parameters per token) is a non-trivial infrastructure challenge. 

In this guide, we will deploy the official **DeepSeek R1** model onto an AWS EC2 instance using **vLLM**, the high-throughput, memory-efficient inference engine.

## Step 1: Choosing the Right AWS EC2 Instance

Because of R1's immense size, a single GPU is not enough. You must utilize Tensor Parallelism across a multi-GPU node.

**Hardware Requirements for Full BF16/FP8 Precision:**
You need roughly **650GB to 700GB of VRAM** just to load the weights, plus additional VRAM for the KV cache.
*   **Recommended Instance:** `p4d.24xlarge` (8x NVIDIA A100 80GB GPUs). Total VRAM: 640GB. 
*   *Note: For the full model in BF16, 8x80GB is cutting it extremely close. Using FP8 quantization is highly recommended on this instance to leave ample room for the KV cache.*

If you cannot secure a P4d/P5 instance, you must rely on lower-bit quantization (e.g., INT4 AWQ), which can squeeze the model into a `g5.48xlarge` (8x NVIDIA A10G 24GB).

## Step 2: Instance Provisioning & Environment Setup

Spin up your EC2 instance using the **Deep Learning OSS Nvidia Driver AMI (Ubuntu 22.04)**. This AMI comes pre-installed with the correct NVIDIA drivers, CUDA toolkits, and Docker with NVIDIA Container Toolkit.

Ensure your EBS volume (root storage) is at least **1.5 TB**. The model weights alone are massive, and you need space for Docker images and caching.

Once connected via SSH, verify the GPUs are recognized:
```bash
nvidia-smi
```
You should see all 8 GPUs listed.

## Step 3: Downloading the Model Weights

Because HuggingFace model downloads can be slow and interruptible, we recommend using the `huggingface-cli` with `hf_transfer` enabled to utilize the massive network bandwidth of the P4d instance.

```bash
pip install -U "huggingface_hub[cli]" hf_transfer
export HF_HUB_ENABLE_HF_TRANSFER=1

mkdir -p /mnt/models
huggingface-cli download deepseek-ai/DeepSeek-R1 --local-dir /mnt/models/DeepSeek-R1
```
*(This will download hundreds of gigabytes. Go grab a coffee).*

## Step 4: Running vLLM via Docker

Running vLLM via its official Docker container is the safest and most reproducible deployment method. It sidesteps any host-level dependency conflicts with PyTorch or CUDA versions.

We will use the following vLLM launch command. Let's break down the critical flags:

*   `--tensor-parallel-size 8`: Splits the model layers across all 8 GPUs.
*   `--trust-remote-code`: Required for DeepSeek's custom MoE architecture code.
*   `--max-model-len`: Caps the context window to prevent Out-Of-Memory (OOM) errors.
*   `--enforce-eager`: Sometimes required if CUDA graph capture fails on huge MoE models.

Run the container:

```bash
docker run --runtime nvidia --gpus all \
    -v /mnt/models:/mnt/models \
    -p 8000:8000 \
    --ipc=host \
    vllm/vllm-openai:latest \
    --model /mnt/models/DeepSeek-R1 \
    --tensor-parallel-size 8 \
    --trust-remote-code \
    --max-model-len 32000 \
    --dtype bfloat16 
```

> [!TIP]
> **OOM Errors?** If the container crashes with an Out Of Memory error during weight loading, you may need to reduce the `--gpu-memory-utilization` (default is 0.90). Set it to 0.95 to squeeze out more VRAM, or reduce `--max-model-len` to shrink the KV cache reservation.

## Step 5: Testing the OpenAI-Compatible Endpoint

Once vLLM finishes loading the weights (which can take 5-10 minutes) and reports `Uvicorn running on http://0.0.0.0:8000`, the server is ready. 

vLLM provides a drop-in replacement for the OpenAI API. You can test it locally from the instance:

```bash
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "/mnt/models/DeepSeek-R1",
    "messages": [
      {"role": "system", "content": "You are a logical reasoning assistant."},
      {"role": "user", "content": "How many 'r's are in the word strawberry?"}
    ]
  }'
```

You should see DeepSeek R1's characteristic `<think>` tags in the response output before it delivers the final answer.

## Production Considerations

For a production environment, running a raw Docker command in an SSH session is insufficient. You must:

1.  **Systemd or Kubernetes:** Wrap the vLLM container in a Systemd service or deploy it via a Kubernetes DaemonSet / Deployment for auto-restarts and logging.
2.  **API Gateway / Load Balancer:** Place an AWS Application Load Balancer (ALB) or NGINX reverse proxy in front of the vLLM port to handle TLS termination and API Key authentication. vLLM itself does not natively support complex auth.
3.  **VPC Peering:** Ensure that only internal microservices within your AWS VPC can reach the inference node's port 8000. Do not expose this port directly to the public internet.

## Conclusion

Deploying DeepSeek R1 on AWS gives you an incredibly powerful, private reasoning engine. While the hardware costs for a multi-GPU node are significant, utilizing vLLM's PagedAttention and continuous batching ensures you extract the maximum possible throughput from your investment, making it highly cost-effective at enterprise scale.
