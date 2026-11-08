import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// SVG 1: Topic 13 - Best Local LLMs for 16GB VRAM GPUs
function svg16Gb(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots13" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#4a5568" opacity="0.12"/>
      </pattern>
      <linearGradient id="bg13" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fdfbf7"/>
        <stop offset="100%" stop-color="#e9d5ff"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg13)"/>
    <rect width="1200" height="630" fill="url(#dots13)"/>
    
    <!-- Geometric Accents -->
    <circle cx="1050" cy="120" r="180" fill="#f6ad55" opacity="0.35"/>
    <circle cx="1100" cy="90" r="110" fill="#ed8936" opacity="0.25"/>
    <circle cx="150" cy="540" r="140" fill="#805ad5" opacity="0.15"/>

    <!-- Main Editorial Card Frame -->
    <rect x="70" y="60" width="1060" height="510" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M70 60 H1130 V110 H70 Z" fill="#f8fafc" rx="20"/>
    <circle cx="105" cy="85" r="7" fill="#ef4444"/><circle cx="130" cy="85" r="7" fill="#f59e0b"/><circle cx="155" cy="85" r="7" fill="#10b981"/>
    <text x="185" y="90" font-family="monospace" font-size="13" font-weight="600" fill="#64748b">nadhebe.com/guides/best-local-llms-16gb-vram-gpus/</text>

    <!-- Header Badge & Title -->
    <rect x="110" y="140" width="180" height="28" rx="14" fill="#805ad520"/>
    <text x="125" y="159" font-family="sans-serif" font-size="12" font-weight="800" fill="#6b46c1" letter-spacing="1">HARDWARE GUIDE 2026</text>
    <text x="110" y="210" font-family="sans-serif" font-size="36" font-weight="800" fill="#0f172a">Best Local LLMs for 16GB VRAM GPUs</text>
    <text x="110" y="245" font-family="sans-serif" font-size="18" font-weight="500" fill="#475569">RTX 4080 &amp; Apple Silicon • 14B Q8 Precision vs 32B Reasoning • 32K Context</text>

    <!-- Technical Cutout Panels -->
    <g transform="translate(110, 280)">
      <!-- Panel 1: 14B Class -->
      <rect x="0" y="0" width="290" height="230" rx="14" fill="#0f172a"/>
      <rect x="15" y="15" width="70" height="22" rx="6" fill="#38bdf825"/>
      <text x="50" y="30" font-family="monospace" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="middle">14B CLASS</text>
      <text x="20" y="70" font-family="sans-serif" font-size="20" font-weight="800" fill="#ffffff">Qwen 2.5 14B</text>
      <text x="20" y="95" font-family="monospace" font-size="13" fill="#a7f3d0">Quant: Q6_K / Q8_0</text>
      <text x="20" y="125" font-family="sans-serif" font-size="13" fill="#94a3b8">VRAM: 12.4 GB • Speed: 52 tok/s</text>
      <text x="20" y="155" font-family="sans-serif" font-size="13" fill="#94a3b8">Context: 32,768 Tokens Native</text>
      <rect x="20" y="180" width="250" height="32" rx="8" fill="#1e293b"/>
      <text x="145" y="201" font-family="sans-serif" font-size="12" font-weight="700" fill="#38bdf8" text-anchor="middle">Near-Lossless Daily Driver</text>

      <!-- Panel 2: 32B Class -->
      <rect x="320" y="0" width="290" height="230" rx="14" fill="#0f172a"/>
      <rect x="335" y="15" width="70" height="22" rx="6" fill="#f59e0b25"/>
      <text x="370" y="30" font-family="monospace" font-size="11" font-weight="700" fill="#f59e0b" text-anchor="middle">32B CLASS</text>
      <text x="340" y="70" font-family="sans-serif" font-size="20" font-weight="800" fill="#ffffff">Qwen 2.5 32B</text>
      <text x="340" y="95" font-family="monospace" font-size="13" fill="#fde047">Quant: Q3_K_M</text>
      <text x="340" y="125" font-family="sans-serif" font-size="13" fill="#94a3b8">VRAM: 14.4 GB • Speed: 22 tok/s</text>
      <text x="340" y="155" font-family="sans-serif" font-size="13" fill="#94a3b8">Deep Multi-Step Analytical Logic</text>
      <rect x="340" y="180" width="250" height="32" rx="8" fill="#1e293b"/>
      <text x="465" y="201" font-family="sans-serif" font-size="12" font-weight="700" fill="#f59e0b" text-anchor="middle">Frontier Reasoning Class</text>

      <!-- Panel 3: Coding & R1 -->
      <rect x="640" y="0" width="280" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect x="655" y="15" width="80" height="22" rx="6" fill="#10b98125"/>
      <text x="695" y="30" font-family="monospace" font-size="11" font-weight="700" fill="#059669" text-anchor="middle">REASONING</text>
      <text x="660" y="70" font-family="sans-serif" font-size="20" font-weight="800" fill="#0f172a">DeepSeek R1 14B</text>
      <text x="660" y="95" font-family="monospace" font-size="13" fill="#0284c7">Chain-of-Thought &lt;think&gt;</text>
      <text x="660" y="125" font-family="sans-serif" font-size="13" fill="#64748b">VRAM: 12.6 GB • Speed: 44 tok/s</text>
      <text x="660" y="155" font-family="sans-serif" font-size="13" fill="#64748b">Ollama / vLLM / Continue</text>
      <rect x="660" y="180" width="240" height="32" rx="8" fill="#e0f2fe"/>
      <text x="780" y="201" font-family="sans-serif" font-size="12" font-weight="700" fill="#0369a1" text-anchor="middle">Math &amp; Complex Algorithms</text>
    </g>
  </svg>`;
}

// SVG 2: Topic 14 - NVFP4 vs INT8 vs FP8
function svgQuantComparison(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots14" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#4a5568" opacity="0.12"/>
      </pattern>
      <linearGradient id="bg14" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fdfbf7"/>
        <stop offset="100%" stop-color="#dcfce7"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg14)"/>
    <rect width="1200" height="630" fill="url(#dots14)"/>
    <circle cx="1060" cy="130" r="160" fill="#84cc16" opacity="0.3"/>
    <circle cx="160" cy="520" r="140" fill="#10b981" opacity="0.2"/>

    <rect x="70" y="60" width="1060" height="510" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M70 60 H1130 V110 H70 Z" fill="#f8fafc" rx="20"/>
    <circle cx="105" cy="85" r="7" fill="#ef4444"/><circle cx="130" cy="85" r="7" fill="#f59e0b"/><circle cx="155" cy="85" r="7" fill="#10b981"/>
    <text x="185" y="90" font-family="monospace" font-size="13" font-weight="600" fill="#64748b">nadhebe.com/guides/nvfp4-vs-int8-vs-fp8-quantization-comparison/</text>

    <rect x="110" y="140" width="180" height="28" rx="14" fill="#16a34a20"/>
    <text x="125" y="159" font-family="sans-serif" font-size="12" font-weight="800" fill="#15803d" letter-spacing="1">QUANTIZATION MATRIX</text>
    <text x="110" y="210" font-family="sans-serif" font-size="36" font-weight="800" fill="#0f172a">NVFP4 vs INT8 vs FP8 Quantization</text>
    <text x="110" y="245" font-family="sans-serif" font-size="18" font-weight="500" fill="#475569">Memory Reduction, Perplexity Degradation, and Hardware Support Explained</text>

    <!-- 3 Tier Matrix -->
    <g transform="translate(110, 280)">
      <rect x="0" y="0" width="290" height="230" rx="14" fill="#0f172a"/>
      <text x="25" y="40" font-family="sans-serif" font-size="22" font-weight="800" fill="#38bdf8">NVFP4 (4-Bit)</text>
      <text x="25" y="70" font-family="monospace" font-size="13" fill="#fde047">NVIDIA Blackwell (B200/RTX 50)</text>
      <text x="25" y="105" font-family="sans-serif" font-size="13" fill="#cbd5e1">• 75% Memory Reduction (4x)</text>
      <text x="25" y="135" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Micro-scaled dynamic block tensor</text>
      <text x="25" y="165" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Lossless 70B inference on desktop</text>
      <rect x="25" y="185" width="240" height="30" rx="6" fill="#38bdf820"/>
      <text x="145" y="205" font-family="sans-serif" font-size="12" font-weight="700" fill="#38bdf8" text-anchor="middle">Next-Gen Frontier Standard</text>

      <rect x="320" y="0" width="290" height="230" rx="14" fill="#0f172a"/>
      <text x="345" y="40" font-family="sans-serif" font-size="22" font-weight="800" fill="#4ade80">FP8 (8-Bit)</text>
      <text x="345" y="70" font-family="monospace" font-size="13" fill="#fde047">Ada Lovelace (RTX 40) / Hopper</text>
      <text x="345" y="105" font-family="sans-serif" font-size="13" fill="#cbd5e1">• 50% Memory Reduction (2x)</text>
      <text x="345" y="135" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Preserves outlier weight spikes</text>
      <text x="345" y="165" font-family="sans-serif" font-size="13" fill="#cbd5e1">• &lt; 0.2% HumanEval perplexity drop</text>
      <rect x="345" y="185" width="240" height="30" rx="6" fill="#4ade8020"/>
      <text x="465" y="205" font-family="sans-serif" font-size="12" font-weight="700" fill="#4ade80" text-anchor="middle">Current Production Sweet Spot</text>

      <rect x="640" y="0" width="280" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="665" y="40" font-family="sans-serif" font-size="22" font-weight="800" fill="#64748b">INT8 (Integer)</text>
      <text x="665" y="70" font-family="monospace" font-size="13" fill="#0284c7">Ampere (RTX 30) / Legacy CPU</text>
      <text x="665" y="105" font-family="sans-serif" font-size="13" fill="#64748b">• 50% Memory Reduction</text>
      <text x="665" y="135" font-family="sans-serif" font-size="13" fill="#64748b">• Uniform linear rounding grids</text>
      <text x="665" y="165" font-family="sans-serif" font-size="13" fill="#64748b">• Prone to outlier clipping errors</text>
      <rect x="665" y="185" width="230" height="30" rx="6" fill="#f1f5f9"/>
      <text x="780" y="205" font-family="sans-serif" font-size="12" font-weight="700" fill="#64748b" text-anchor="middle">Legacy Architecture Role</text>
    </g>
  </svg>`;
}

// SVG 3: Topic 15 - GGUF Quantization Explained
function svgGguf(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots15" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#4a5568" opacity="0.12"/>
      </pattern>
      <linearGradient id="bg15" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fffbeb"/>
        <stop offset="100%" stop-color="#fef3c7"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg15)"/>
    <rect width="1200" height="630" fill="url(#dots15)"/>
    <circle cx="1070" cy="110" r="170" fill="#f59e0b" opacity="0.3"/>
    <circle cx="130" cy="540" r="130" fill="#d97706" opacity="0.2"/>

    <rect x="70" y="60" width="1060" height="510" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M70 60 H1130 V110 H70 Z" fill="#f8fafc" rx="20"/>
    <circle cx="105" cy="85" r="7" fill="#ef4444"/><circle cx="130" cy="85" r="7" fill="#f59e0b"/><circle cx="155" cy="85" r="7" fill="#10b981"/>
    <text x="185" y="90" font-family="monospace" font-size="13" font-weight="600" fill="#64748b">nadhebe.com/guides/gguf-quantization-explained-q4-k-m-q5-k-m-q8-0/</text>

    <rect x="110" y="140" width="180" height="28" rx="14" fill="#d9770620"/>
    <text x="125" y="159" font-family="sans-serif" font-size="12" font-weight="800" fill="#b45309" letter-spacing="1">GGUF DECODER GUIDE</text>
    <text x="110" y="210" font-family="sans-serif" font-size="36" font-weight="800" fill="#0f172a">GGUF Quantization Explained: Q4 vs Q5 vs Q8</text>
    <text x="110" y="245" font-family="sans-serif" font-size="18" font-weight="500" fill="#475569">Decoding K-Quants, Perplexity Loss Benchmarks, and VRAM Sizing</text>

    <!-- 3 Cards -->
    <g transform="translate(110, 280)">
      <rect x="0" y="0" width="290" height="230" rx="14" fill="#0f172a"/>
      <text x="25" y="40" font-family="sans-serif" font-size="24" font-weight="800" fill="#f59e0b">Q4_K_M</text>
      <text x="25" y="68" font-family="monospace" font-size="12" fill="#a7f3d0">4.5 bits/weight • Balanced</text>
      <text x="25" y="105" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Squeezes 14B models on 12GB GPUs</text>
      <text x="25" y="135" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Leaves headroom for 16K context</text>
      <text x="25" y="165" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Minimal perplexity penalty (+0.12)</text>
      <rect x="25" y="185" width="240" height="30" rx="6" fill="#f59e0b20"/>
      <text x="145" y="205" font-family="sans-serif" font-size="12" font-weight="700" fill="#f59e0b" text-anchor="middle">Best for VRAM Constraints</text>

      <rect x="320" y="0" width="290" height="230" rx="14" fill="#0f172a"/>
      <text x="345" y="40" font-family="sans-serif" font-size="24" font-weight="800" fill="#10b981">Q5_K_M ★</text>
      <text x="345" y="68" font-family="monospace" font-size="12" fill="#a7f3d0">5.5 bits/weight • High Quality</text>
      <text x="345" y="105" font-family="sans-serif" font-size="13" fill="#cbd5e1">• 60% less perplexity loss than Q4</text>
      <text x="345" y="135" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Flawless structured JSON &amp; code</text>
      <text x="345" y="165" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Only ~15% larger file size</text>
      <rect x="345" y="185" width="240" height="30" rx="6" fill="#10b98125"/>
      <text x="465" y="205" font-family="sans-serif" font-size="12" font-weight="700" fill="#10b981" text-anchor="middle">#1 Recommended Overall</text>

      <rect x="640" y="0" width="280" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="665" y="40" font-family="sans-serif" font-size="24" font-weight="800" fill="#3b82f6">Q8_0</text>
      <text x="665" y="68" font-family="monospace" font-size="12" fill="#0284c7">8.0 bits/weight • Uncompressed</text>
      <text x="665" y="105" font-family="sans-serif" font-size="13" fill="#64748b">• 100% matches FP16 model baseline</text>
      <text x="665" y="135" font-family="sans-serif" font-size="13" fill="#64748b">• Requires 16GB / 24GB VRAM</text>
      <text x="665" y="165" font-family="sans-serif" font-size="13" fill="#64748b">• Zero quantization loss</text>
      <rect x="665" y="185" width="230" height="30" rx="6" fill="#e0f2fe"/>
      <text x="780" y="205" font-family="sans-serif" font-size="12" font-weight="700" fill="#0369a1" text-anchor="middle">Maximum Accuracy Mode</text>
    </g>
  </svg>`;
}

// SVG 4: Topic 16 - Run DeepSeek R1 Locally with Ollama
function svgDeepSeekR1(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots16" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#4a5568" opacity="0.12"/>
      </pattern>
      <linearGradient id="bg16" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff1f2"/>
        <stop offset="100%" stop-color="#ffe4e6"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg16)"/>
    <rect width="1200" height="630" fill="url(#dots16)"/>
    <circle cx="1060" cy="120" r="170" fill="#f43f5e" opacity="0.25"/>
    <circle cx="150" cy="520" r="140" fill="#e11d48" opacity="0.15"/>

    <rect x="70" y="60" width="1060" height="510" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M70 60 H1130 V110 H70 Z" fill="#f8fafc" rx="20"/>
    <circle cx="105" cy="85" r="7" fill="#ef4444"/><circle cx="130" cy="85" r="7" fill="#f59e0b"/><circle cx="155" cy="85" r="7" fill="#10b981"/>
    <text x="185" y="90" font-family="monospace" font-size="13" font-weight="600" fill="#64748b">nadhebe.com/tutorials/how-to-run-deepseek-r1-locally-ollama-gpu/</text>

    <rect x="110" y="140" width="180" height="28" rx="14" fill="#e11d4820"/>
    <text x="125" y="159" font-family="sans-serif" font-size="12" font-weight="800" fill="#be123c" letter-spacing="1">TUTORIAL GUIDE 2026</text>
    <text x="110" y="210" font-family="sans-serif" font-size="36" font-weight="800" fill="#0f172a">How to Run DeepSeek R1 Locally with Ollama</text>
    <text x="110" y="245" font-family="sans-serif" font-size="18" font-weight="500" fill="#475569">Sizing Guide for 8GB, 12GB &amp; 24GB GPUs • Chain-of-Thought &lt;think&gt; Setup</text>

    <!-- Terminal Mockup -->
    <g transform="translate(110, 280)">
      <rect x="0" y="0" width="920" height="230" rx="14" fill="#0f172a"/>
      <text x="30" y="45" font-family="monospace" font-size="15" fill="#38bdf8">$ ollama run deepseek-r1:14b</text>
      <text x="30" y="85" font-family="monospace" font-size="13" fill="#94a3b8">&gt;&gt;&gt; Solve this logic puzzle...</text>
      <text x="30" y="125" font-family="monospace" font-size="13" fill="#a7f3d0">&lt;think&gt;</text>
      <text x="30" y="155" font-family="monospace" font-size="13" fill="#94a3b8">Breaking down constraint set: evaluating variables X, Y, Z in parallel...</text>
      <text x="30" y="185" font-family="monospace" font-size="13" fill="#a7f3d0">&lt;/think&gt;</text>
      <text x="30" y="215" font-family="monospace" font-size="13" fill="#fde047">The verified solution is: [X = 42, Y = 18]</text>
    </g>
  </svg>`;
}

// SVG 5: Topic 17 - RunPod vs Vast.ai
function svgRunPodVast(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots17" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#4a5568" opacity="0.12"/>
      </pattern>
      <linearGradient id="bg17" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fdfbf7"/>
        <stop offset="100%" stop-color="#fed7aa"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg17)"/>
    <rect width="1200" height="630" fill="url(#dots17)"/>
    <circle cx="1060" cy="110" r="160" fill="#f97316" opacity="0.3"/>
    <circle cx="140" cy="530" r="130" fill="#ea580c" opacity="0.2"/>

    <rect x="70" y="60" width="1060" height="510" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M70 60 H1130 V110 H70 Z" fill="#f8fafc" rx="20"/>
    <circle cx="105" cy="85" r="7" fill="#ef4444"/><circle cx="130" cy="85" r="7" fill="#f59e0b"/><circle cx="155" cy="85" r="7" fill="#10b981"/>
    <text x="185" y="90" font-family="monospace" font-size="13" font-weight="600" fill="#64748b">nadhebe.com/comparisons/runpod-vs-vastai-cloud-gpu-for-running-llms/</text>

    <rect x="110" y="140" width="180" height="28" rx="14" fill="#ea580c20"/>
    <text x="125" y="159" font-family="sans-serif" font-size="12" font-weight="800" fill="#c2410c" letter-spacing="1">CLOUD GPU BENCHMARK</text>
    <text x="110" y="210" font-family="sans-serif" font-size="36" font-weight="800" fill="#0f172a">RunPod vs Vast.ai: Best Cloud GPU for LLMs?</text>
    <text x="110" y="245" font-family="sans-serif" font-size="18" font-weight="500" fill="#475569">Spot Pricing, Storage Persistence, Uptime Reliability &amp; vLLM Deployment</text>

    <g transform="translate(110, 280)">
      <rect x="0" y="0" width="440" height="230" rx="14" fill="#0f172a"/>
      <text x="30" y="45" font-family="sans-serif" font-size="24" font-weight="800" fill="#38bdf8">RunPod (Managed)</text>
      <text x="30" y="80" font-family="sans-serif" font-size="14" fill="#cbd5e1">• Centralized Tier 3/4 Datacenters</text>
      <text x="30" y="110" font-family="sans-serif" font-size="14" fill="#cbd5e1">• Persistent Network Volumes (Keep 70B weights)</text>
      <text x="30" y="140" font-family="sans-serif" font-size="14" fill="#cbd5e1">• 1-Click vLLM, Ollama, ComfyUI templates</text>
      <rect x="30" y="175" width="380" height="35" rx="8" fill="#38bdf820"/>
      <text x="220" y="198" font-family="sans-serif" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">Best for Production &amp; API Serving ($0.39/hr)</text>

      <rect x="480" y="0" width="440" height="230" rx="14" fill="#0f172a"/>
      <text x="510" y="45" font-family="sans-serif" font-size="24" font-weight="800" fill="#fb923c">Vast.ai (Decentralized)</text>
      <text x="510" y="80" font-family="sans-serif" font-size="14" fill="#cbd5e1">• 100% Peer-to-Peer GPU Marketplace</text>
      <text x="510" y="110" font-family="sans-serif" font-size="14" fill="#cbd5e1">• Absolute lowest hourly prices ($0.22/hr RTX 4090)</text>
      <text x="510" y="140" font-family="sans-serif" font-size="14" fill="#cbd5e1">• Interruptible spot bids with risk of eviction</text>
      <rect x="510" y="175" width="380" height="35" rx="8" fill="#fb923c20"/>
      <text x="700" y="198" font-family="sans-serif" font-size="13" font-weight="700" fill="#fb923c" text-anchor="middle">Best for Budget Batch Training &amp; Fine-Tuning</text>
    </g>
  </svg>`;
}

// SVG 6: Topic 18 - How to Block ChatGPT Ads in Firefox, Edge & Safari
function svgBlockAdsBrowsers(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots18" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#4a5568" opacity="0.12"/>
      </pattern>
      <linearGradient id="bg18" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#eff6ff"/>
        <stop offset="100%" stop-color="#dbeafe"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg18)"/>
    <rect width="1200" height="630" fill="url(#dots18)"/>
    <circle cx="1060" cy="120" r="160" fill="#3b82f6" opacity="0.25"/>
    <circle cx="140" cy="520" r="140" fill="#1d4ed8" opacity="0.15"/>

    <rect x="70" y="60" width="1060" height="510" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M70 60 H1130 V110 H70 Z" fill="#f8fafc" rx="20"/>
    <circle cx="105" cy="85" r="7" fill="#ef4444"/><circle cx="130" cy="85" r="7" fill="#f59e0b"/><circle cx="155" cy="85" r="7" fill="#10b981"/>
    <text x="185" y="90" font-family="monospace" font-size="13" font-weight="600" fill="#64748b">nadhebe.com/tutorials/how-to-block-chatgpt-ads-firefox-edge-safari/</text>

    <rect x="110" y="140" width="180" height="28" rx="14" fill="#2563eb20"/>
    <text x="125" y="159" font-family="sans-serif" font-size="12" font-weight="800" fill="#1d4ed8" letter-spacing="1">PRIVACY TUTORIAL</text>
    <text x="110" y="210" font-family="sans-serif" font-size="36" font-weight="800" fill="#0f172a">Block ChatGPT Ads in Firefox, Edge &amp; Safari</text>
    <text x="110" y="245" font-family="sans-serif" font-size="18" font-weight="500" fill="#475569">Browser-by-Browser Setup • uBlock Origin &amp; AdGuard Content Filters</text>

    <g transform="translate(110, 280)">
      <rect x="0" y="0" width="290" height="230" rx="14" fill="#0f172a"/>
      <text x="25" y="45" font-family="sans-serif" font-size="22" font-weight="800" fill="#f97316">Firefox (MV2)</text>
      <text x="25" y="80" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Unthrottled Manifest V2 engine</text>
      <text x="25" y="110" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Full uBlock Origin support</text>
      <text x="25" y="140" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Zero ad telemetry leakage</text>
      <rect x="25" y="180" width="240" height="32" rx="6" fill="#f9731620"/>
      <text x="145" y="201" font-family="sans-serif" font-size="12" font-weight="700" fill="#f97316" text-anchor="middle">#1 Best Privacy Browser</text>

      <rect x="320" y="0" width="290" height="230" rx="14" fill="#0f172a"/>
      <text x="345" y="45" font-family="sans-serif" font-size="22" font-weight="800" fill="#38bdf8">Microsoft Edge</text>
      <text x="345" y="80" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Chrome Web Store extension bridge</text>
      <text x="345" y="110" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Blocks sidebar upgrade CTA pills</text>
      <text x="345" y="140" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Clean enterprise workspace view</text>
      <rect x="345" y="180" width="240" height="32" rx="6" fill="#38bdf820"/>
      <text x="465" y="201" font-family="sans-serif" font-size="12" font-weight="700" fill="#38bdf8" text-anchor="middle">Enterprise Workstations</text>

      <rect x="640" y="0" width="280" height="230" rx="14" fill="#0f172a"/>
      <text x="665" y="45" font-family="sans-serif" font-size="22" font-weight="800" fill="#a78bfa">Apple Safari</text>
      <text x="665" y="80" font-family="sans-serif" font-size="13" fill="#cbd5e1">• AdGuard Content Blocker</text>
      <text x="665" y="110" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Native macOS / iOS integration</text>
      <text x="665" y="140" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Zero battery drain overhead</text>
      <rect x="665" y="180" width="230" height="32" rx="6" fill="#a78bfa20"/>
      <text x="780" y="201" font-family="sans-serif" font-size="12" font-weight="700" fill="#a78bfa" text-anchor="middle">macOS &amp; iOS Mobile</text>
    </g>
  </svg>`;
}

// SVG 7: Topic 19 - uBlock Origin Custom Filters
function svgUblockFilters(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots19" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#4a5568" opacity="0.12"/>
      </pattern>
      <linearGradient id="bg19" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fdf4ff"/>
        <stop offset="100%" stop-color="#fae8ff"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg19)"/>
    <rect width="1200" height="630" fill="url(#dots19)"/>
    <circle cx="1060" cy="120" r="160" fill="#c026d3" opacity="0.2"/>
    <circle cx="140" cy="520" r="140" fill="#a21caf" opacity="0.15"/>

    <rect x="70" y="60" width="1060" height="510" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M70 60 H1130 V110 H70 Z" fill="#f8fafc" rx="20"/>
    <circle cx="105" cy="85" r="7" fill="#ef4444"/><circle cx="130" cy="85" r="7" fill="#f59e0b"/><circle cx="155" cy="85" r="7" fill="#10b981"/>
    <text x="185" y="90" font-family="monospace" font-size="13" font-weight="600" fill="#64748b">nadhebe.com/tutorials/ublock-origin-custom-filters-block-chatgpt-ads/</text>

    <rect x="110" y="140" width="180" height="28" rx="14" fill="#c026d320"/>
    <text x="125" y="159" font-family="sans-serif" font-size="12" font-weight="800" fill="#a21caf" letter-spacing="1">FILTER RULE CHEAT SHEET</text>
    <text x="110" y="210" font-family="sans-serif" font-size="36" font-weight="800" fill="#0f172a">uBlock Origin Filters to Block ChatGPT Promos</text>
    <text x="110" y="245" font-family="sans-serif" font-size="18" font-weight="500" fill="#475569">Copy-Paste Cosmetic Selectors • Removes Upgrade Nags Without Breaking Streaming</text>

    <g transform="translate(110, 280)">
      <rect x="0" y="0" width="920" height="230" rx="14" fill="#0f172a"/>
      <text x="30" y="45" font-family="monospace" font-size="14" fill="#38bdf8">! --- Verified ChatGPT Cosmetic Hiding Selectors ---</text>
      <text x="30" y="80" font-family="monospace" font-size="13" fill="#fde047">chatgpt.com##div[data-testid*="upgrade-banner"]</text>
      <text x="30" y="115" font-family="monospace" font-size="13" fill="#fde047">chatgpt.com##div[class*="promotional-banner"]</text>
      <text x="30" y="150" font-family="monospace" font-size="13" fill="#fde047">chatgpt.com##button:has-text("Upgrade to Plus")</text>
      <text x="30" y="185" font-family="monospace" font-size="13" fill="#a7f3d0">! Result: Zero Upgrade Nags • Uninterrupted Chat Streaming</text>
    </g>
  </svg>`;
}

// SVG 8: Topic 20 - Gemini Canvas: 10 Practical Projects
function svgGeminiCanvas(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots20" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#4a5568" opacity="0.12"/>
      </pattern>
      <linearGradient id="bg20" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f0fdf4"/>
        <stop offset="100%" stop-color="#dcfce7"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg20)"/>
    <rect width="1200" height="630" fill="url(#dots20)"/>
    <circle cx="1060" cy="120" r="160" fill="#16a34a" opacity="0.25"/>
    <circle cx="140" cy="520" r="140" fill="#15803d" opacity="0.15"/>

    <rect x="70" y="60" width="1060" height="510" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <path d="M70 60 H1130 V110 H70 Z" fill="#f8fafc" rx="20"/>
    <circle cx="105" cy="85" r="7" fill="#ef4444"/><circle cx="130" cy="85" r="7" fill="#f59e0b"/><circle cx="155" cy="85" r="7" fill="#10b981"/>
    <text x="185" y="90" font-family="monospace" font-size="13" font-weight="600" fill="#64748b">nadhebe.com/tutorials/gemini-canvas-10-practical-projects-to-build/</text>

    <rect x="110" y="140" width="180" height="28" rx="14" fill="#16a34a20"/>
    <text x="125" y="159" font-family="sans-serif" font-size="12" font-weight="800" fill="#15803d" letter-spacing="1">PROJECT PLAYBOOK</text>
    <text x="110" y="210" font-family="sans-serif" font-size="36" font-weight="800" fill="#0f172a">Gemini Canvas: 10 Practical Things to Build</text>
    <text x="110" y="245" font-family="sans-serif" font-size="18" font-weight="500" fill="#475569">Interactive Web Calculators, Live HTML Previews, Documentation &amp; Storyboards</text>

    <g transform="translate(110, 280)">
      <rect x="0" y="0" width="440" height="230" rx="14" fill="#0f172a"/>
      <text x="30" y="40" font-family="sans-serif" font-size="20" font-weight="800" fill="#38bdf8">1. Interactive Web Apps</text>
      <text x="30" y="70" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Single-File SaaS ROI Calculators</text>
      <text x="30" y="98" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Interactive Regex Parsers &amp; Testers</text>
      <text x="30" y="126" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Live HTML/CSS/JS execution sandbox</text>
      <rect x="30" y="165" width="380" height="35" rx="8" fill="#38bdf820"/>
      <text x="220" y="188" font-family="sans-serif" font-size="13" font-weight="700" fill="#38bdf8" text-anchor="middle">Click 'Preview' to Run Live Apps</text>

      <rect x="480" y="0" width="440" height="230" rx="14" fill="#0f172a"/>
      <text x="510" y="40" font-family="sans-serif" font-size="20" font-weight="800" fill="#4ade80">2. Living Documentation</text>
      <text x="510" y="70" font-family="sans-serif" font-size="13" fill="#cbd5e1">• REST API Specs with Mock JSON Data</text>
      <text x="510" y="98" font-family="sans-serif" font-size="13" fill="#cbd5e1">• Film Previz Storyboard Decks (Fountain)</text>
      <text x="510" y="126" font-family="sans-serif" font-size="13" fill="#cbd5e1">• WCAG AAA Accessible Design Tokens</text>
      <rect x="510" y="165" width="380" height="35" rx="8" fill="#4ade8020"/>
      <text x="700" y="188" font-family="sans-serif" font-size="13" font-weight="700" fill="#4ade80" text-anchor="middle">Inline Surgical Paragraph Refactoring</text>
    </g>
  </svg>`;
}

async function run() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const items = [
    { name: 'best-local-llms-16gb-vram-gpus-hero.webp', fn: svg16Gb },
    { name: 'nvfp4-vs-int8-vs-fp8-quantization-comparison-hero.webp', fn: svgQuantComparison },
    { name: 'gguf-quantization-explained-q4-k-m-q5-k-m-q8-0-hero.webp', fn: svgGguf },
    { name: 'how-to-run-deepseek-r1-locally-ollama-gpu-hero.webp', fn: svgDeepSeekR1 },
    { name: 'runpod-vs-vastai-cloud-gpu-for-running-llms-hero.webp', fn: svgRunPodVast },
    { name: 'how-to-block-chatgpt-ads-firefox-edge-safari-hero.webp', fn: svgBlockAdsBrowsers },
    { name: 'ublock-origin-custom-filters-block-chatgpt-ads-hero.webp', fn: svgUblockFilters },
    { name: 'gemini-canvas-10-practical-projects-to-build-hero.webp', fn: svgGeminiCanvas },
  ];

  for (const item of items) {
    const svg = item.fn();
    const dest = path.join(imagesDir, item.name);
    await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(dest);
    console.log(`Generated and converted: ${item.name}`);
  }
}

run();

