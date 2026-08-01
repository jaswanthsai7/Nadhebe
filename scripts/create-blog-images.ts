import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Design 1: Pillar Guide - Inspector & SERP Preview Split
function svgPillar(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f8fafc"/>
        <stop offset="100%" stop-color="#e0e7ff"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg1)"/>
    <rect x="50" y="40" width="1100" height="550" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <path d="M50 40 H1150 V90 H50 Z" fill="#f1f5f9"/>
    <circle cx="80" cy="65" r="6" fill="#ef4444"/><circle cx="100" cy="65" r="6" fill="#f59e0b"/><circle cx="120" cy="65" r="6" fill="#10b981"/>
    <text x="145" y="70" font-family="sans-serif" font-size="13" font-weight="600" fill="#64748b">nadhebe.com/guides/what-is-a-meta-tag-analyzer-guide/</text>
    
    <!-- Title & Subtitle -->
    <rect x="90" y="120" width="160" height="26" rx="13" fill="#4f46e520"/>
    <text x="102" y="137" font-family="sans-serif" font-size="11" font-weight="700" fill="#4f46e5" letter-spacing="1">PILLAR GUIDE 2026</text>
    <text x="90" y="185" font-family="sans-serif" font-size="34" font-weight="800" fill="#0f172a">What Is a Meta Tag Analyzer?</text>
    <text x="90" y="215" font-family="sans-serif" font-size="16" font-weight="500" fill="#64748b">HTML Metadata Inspection, SERP Snippets &amp; Social Previews</text>

    <!-- Visual Architecture Diagram -->
    <g transform="translate(90, 250)">
      <!-- Left Panel: Raw HTML -->
      <rect x="0" y="0" width="460" height="260" rx="12" fill="#0f172a"/>
      <text x="20" y="32" font-family="monospace" font-size="13" fill="#94a3b8">&lt;head&gt; Raw Metadata &amp; OpenGraph Tags</text>
      <text x="20" y="70" font-family="monospace" font-size="12" fill="#38bdf8">&lt;title&gt;<tspan fill="#ffffff">Nadhebe – AI Research &amp; Tools</tspan>&lt;/title&gt;</text>
      <text x="20" y="105" font-family="monospace" font-size="12" fill="#38bdf8">&lt;meta <tspan fill="#a7f3d0">name</tspan>=<tspan fill="#fde047">"description"</tspan> ... /&gt;</text>
      <text x="20" y="140" font-family="monospace" font-size="12" fill="#38bdf8">&lt;link <tspan fill="#a7f3d0">rel</tspan>=<tspan fill="#fde047">"canonical"</tspan> ... /&gt;</text>
      <text x="20" y="175" font-family="monospace" font-size="12" fill="#38bdf8">&lt;meta <tspan fill="#a7f3d0">property</tspan>=<tspan fill="#fde047">"og:image"</tspan> ... /&gt;</text>
      <text x="20" y="210" font-family="monospace" font-size="12" fill="#38bdf8">&lt;meta <tspan fill="#a7f3d0">name</tspan>=<tspan fill="#fde047">"twitter:card"</tspan> ... /&gt;</text>

      <!-- Connecting Arrow -->
      <path d="M480 130 H520" stroke="#4f46e5" stroke-width="3" stroke-dasharray="4 4"/>
      <polygon points="520,125 530,130 520,135" fill="#4f46e5"/>

      <!-- Right Panel: Google SERP Preview Card -->
      <rect x="540" y="0" width="440" height="260" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <rect x="560" y="20" width="400" height="100" rx="8" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="575" y="45" font-family="sans-serif" font-size="11" fill="#15803d">https://nadhebe.com › tools › meta-tag-analyzer</text>
      <text x="575" y="68" font-family="sans-serif" font-size="16" font-weight="700" fill="#1a0dab">Nadhebe – AI Tech Articles &amp; Developer Tools</text>
      <text x="575" y="92" font-family="sans-serif" font-size="12" fill="#4b5563">Production-ready AI research, engineering guides &amp; tools.</text>

      <rect x="560" y="135" width="400" height="105" rx="8" fill="#ffffff" stroke="#e2e8f0"/>
      <text x="575" y="160" font-family="sans-serif" font-size="11" font-weight="700" fill="#6b21a8">SOCIAL CARD (OPENGRAPH / X)</text>
      <text x="575" y="182" font-family="sans-serif" font-size="13" font-weight="700" fill="#1e293b">Nadhebe – AI Tech Articles &amp; Developer Tools</text>
      <text x="575" y="204" font-family="sans-serif" font-size="11" fill="#64748b">1200x630 High Resolution Banner Image Validated</text>
    </g>
  </svg>`;
}

// Design 2: Step-by-Step Tutorial - 4 Step Process Flowchart
function svgTutorial(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f0f9ff"/>
        <stop offset="100%" stop-color="#e0f2fe"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg2)"/>
    <rect x="50" y="40" width="1100" height="550" rx="20" fill="#ffffff" stroke="#bae6fd" stroke-width="1.5"/>
    
    <rect x="90" y="90" width="180" height="26" rx="13" fill="#0284c715"/>
    <text x="102" y="107" font-family="sans-serif" font-size="11" font-weight="700" fill="#0284c7" letter-spacing="1">STEP-BY-STEP TUTORIAL</text>
    <text x="90" y="150" font-family="sans-serif" font-size="34" font-weight="800" fill="#0f172a">How to Analyze Meta Tags for SEO</text>

    <!-- 4 Step Flow Grid -->
    <g transform="translate(90, 200)">
      <!-- Step 1 -->
      <rect x="0" y="0" width="230" height="300" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="40" cy="40" r="18" fill="#0284c7"/>
      <text x="40" y="45" font-family="sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">1</text>
      <text x="20" y="90" font-family="sans-serif" font-size="18" font-weight="700" fill="#0f172a">Title Length</text>
      <text x="20" y="120" font-family="sans-serif" font-size="13" fill="#64748b">Keep title tags under 60 characters or ~600px desktop boundary.</text>
      <rect x="20" y="210" width="190" height="40" rx="8" fill="#e0f2fe"/>
      <text x="115" y="235" font-family="sans-serif" font-size="12" font-weight="700" fill="#0369a1" text-anchor="middle">Optimal: 50-60 Chars</text>

      <!-- Step 2 -->
      <rect x="260" y="0" width="230" height="300" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="300" cy="40" r="18" fill="#0284c7"/>
      <text x="300" y="45" font-family="sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">2</text>
      <text x="280" y="90" font-family="sans-serif" font-size="18" font-weight="700" fill="#0f172a">Description</text>
      <text x="280" y="120" font-family="sans-serif" font-size="13" fill="#64748b">Audit description text between 140–160 characters.</text>
      <rect x="280" y="210" width="190" height="40" rx="8" fill="#e0f2fe"/>
      <text x="375" y="235" font-family="sans-serif" font-size="12" font-weight="700" fill="#0369a1" text-anchor="middle">140-160 Chars</text>

      <!-- Step 3 -->
      <rect x="520" y="0" width="230" height="300" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="560" cy="40" r="18" fill="#0284c7"/>
      <text x="560" y="45" font-family="sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">3</text>
      <text x="540" y="90" font-family="sans-serif" font-size="18" font-weight="700" fill="#0f172a">OpenGraph Image</text>
      <text x="540" y="120" font-family="sans-serif" font-size="13" fill="#64748b">Verify absolute https:// og:image URL (1200x630 px).</text>
      <rect x="540" y="210" width="190" height="40" rx="8" fill="#e0f2fe"/>
      <text x="635" y="235" font-family="sans-serif" font-size="12" font-weight="700" fill="#0369a1" text-anchor="middle">1200x630 Ratio</text>

      <!-- Step 4 -->
      <rect x="780" y="0" width="230" height="300" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="820" cy="40" r="18" fill="#10b981"/>
      <text x="820" y="45" font-family="sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">4</text>
      <text x="800" y="90" font-family="sans-serif" font-size="18" font-weight="700" fill="#0f172a">Copy HTML</text>
      <text x="800" y="120" font-family="sans-serif" font-size="13" fill="#64748b">Copy generated clean metadata directly into your HTML head.</text>
      <rect x="800" y="210" width="190" height="40" rx="8" fill="#d1fae5"/>
      <text x="895" y="235" font-family="sans-serif" font-size="12" font-weight="700" fill="#047857" text-anchor="middle">Deploy Production</text>
    </g>
  </svg>`;
}

// Design 3: Comparison - Side by Side Comparison Cards
function svgComparison(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#faf5ff"/>
        <stop offset="100%" stop-color="#f3e8ff"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg3)"/>
    <rect x="50" y="40" width="1100" height="550" rx="20" fill="#ffffff" stroke="#e9d5ff" stroke-width="1.5"/>
    
    <rect x="90" y="80" width="180" height="26" rx="13" fill="#7c3aed15"/>
    <text x="102" y="97" font-family="sans-serif" font-size="11" font-weight="700" fill="#7c3aed" letter-spacing="1">TECHNICAL COMPARISON</text>
    <text x="90" y="140" font-family="sans-serif" font-size="34" font-weight="800" fill="#0f172a">Meta Tag Analyzer vs Meta Tag Checker</text>

    <!-- Side-by-Side Comparison Grid -->
    <g transform="translate(90, 180)">
      <!-- Left Card: Meta Tag Checker -->
      <rect x="0" y="0" width="480" height="340" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <rect x="20" y="20" width="440" height="40" rx="8" fill="#e2e8f0"/>
      <text x="35" y="45" font-family="sans-serif" font-size="16" font-weight="700" fill="#475569">Meta Tag Checker (Passive Crawler)</text>

      <text x="35" y="100" font-family="sans-serif" font-size="14" fill="#334155">• Scrapes existing live HTTP URLs</text>
      <text x="35" y="135" font-family="sans-serif" font-size="14" fill="#334155">• Binary presence verification (Exists / Missing)</text>
      <text x="35" y="170" font-family="sans-serif" font-size="14" fill="#334155">• Basic plain text readout</text>
      <text x="35" y="205" font-family="sans-serif" font-size="14" fill="#334155">• Cannot test unreleased local draft metadata</text>

      <rect x="35" y="260" width="160" height="36" rx="8" fill="#f1f5f9" stroke="#94a3b8"/>
      <text x="115" y="283" font-family="sans-serif" font-size="12" font-weight="700" fill="#475569" text-anchor="middle">Site-Wide Crawl</text>

      <!-- Right Card: Meta Tag Analyzer -->
      <rect x="520" y="0" width="480" height="340" rx="16" fill="#f8fafc" stroke="#7c3aed" stroke-width="2"/>
      <rect x="540" y="20" width="440" height="40" rx="8" fill="#7c3aed"/>
      <text x="555" y="45" font-family="sans-serif" font-size="16" font-weight="700" fill="#ffffff">Meta Tag Analyzer (Interactive Sandbox)</text>

      <text x="555" y="100" font-family="sans-serif" font-size="14" fill="#1e293b">• Evaluates live URLs AND local draft text</text>
      <text x="555" y="135" font-family="sans-serif" font-size="14" fill="#1e293b">• Pixel-precise Google SERP desktop ruler</text>
      <text x="555" y="170" font-family="sans-serif" font-size="14" fill="#1e293b">• Real-time OpenGraph &amp; Twitter card previews</text>
      <text x="555" y="205" font-family="sans-serif" font-size="14" fill="#1e293b">• Generates clean copy-pasteable HTML head tags</text>

      <rect x="555" y="260" width="200" height="36" rx="8" fill="#7c3aed"/>
      <text x="655" y="283" font-family="sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">Pre-Publish Sandbox</text>
    </g>
  </svg>`;
}

// Design 4: Troubleshooting - Before & After / Error Diagnostic Board
function svgTroubleshoot(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fff1f2"/>
        <stop offset="100%" stop-color="#ffe4e6"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg4)"/>
    <rect x="50" y="40" width="1100" height="550" rx="20" fill="#ffffff" stroke="#fecdd3" stroke-width="1.5"/>
    
    <rect x="90" y="80" width="240" height="26" rx="13" fill="#e11d4815"/>
    <text x="102" y="97" font-family="sans-serif" font-size="11" font-weight="700" fill="#e11d48" letter-spacing="1">TROUBLESHOOTING &amp; FIXES</text>
    <text x="90" y="140" font-family="sans-serif" font-size="34" font-weight="800" fill="#0f172a">How to Fix Common Meta Tag Errors</text>

    <!-- Diagnostic Board -->
    <g transform="translate(90, 180)">
      <!-- Error Column -->
      <rect x="0" y="0" width="480" height="340" rx="16" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
      <text x="25" y="40" font-family="sans-serif" font-size="18" font-weight="800" fill="#991b1b">❌ Common Errors Detected</text>
      
      <rect x="25" y="65" width="430" height="65" rx="8" fill="#ffffff" stroke="#fca5a5"/>
      <text x="40" y="90" font-family="sans-serif" font-size="13" font-weight="700" fill="#991b1b">Title Truncation (> 60 Chars)</text>
      <text x="40" y="112" font-family="monospace" font-size="11" fill="#7f1d1d">Title is too long and gets cut off in Google SERPs...</text>

      <rect x="25" y="145" width="430" height="65" rx="8" fill="#ffffff" stroke="#fca5a5"/>
      <text x="40" y="170" font-family="sans-serif" font-size="13" font-weight="700" fill="#991b1b">Relative og:image Path</text>
      <text x="40" y="192" font-family="monospace" font-size="11" fill="#7f1d1d">&lt;meta property="og:image" content="/img/hero.jpg" /&gt;</text>

      <rect x="25" y="225" width="430" height="65" rx="8" fill="#ffffff" stroke="#fca5a5"/>
      <text x="40" y="250" font-family="sans-serif" font-size="13" font-weight="700" fill="#991b1b">Missing twitter:card Property</text>
      <text x="40" y="272" font-family="monospace" font-size="11" fill="#7f1d1d">Social sharing defaults to a tiny square thumbnail</text>

      <!-- Fixes Column -->
      <rect x="520" y="0" width="480" height="340" rx="16" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>
      <text x="545" y="40" font-family="sans-serif" font-size="18" font-weight="800" fill="#166534">✅ Validated Resolutions</text>
      
      <rect x="545" y="65" width="430" height="65" rx="8" fill="#ffffff" stroke="#86efac"/>
      <text x="560" y="90" font-family="sans-serif" font-size="13" font-weight="700" fill="#166534">Shortened Title (50-60 Chars)</text>
      <text x="560" y="112" font-family="monospace" font-size="11" fill="#14532d">Nadhebe – AI Tech Articles &amp; Developer Tools</text>

      <rect x="545" y="145" width="430" height="65" rx="8" fill="#ffffff" stroke="#86efac"/>
      <text x="560" y="170" font-family="sans-serif" font-size="13" font-weight="700" fill="#166534">Absolute https:// Image URL</text>
      <text x="560" y="192" font-family="monospace" font-size="11" fill="#14532d">https://nadhebe.com/images/hero.webp</text>

      <rect x="545" y="225" width="430" height="65" rx="8" fill="#ffffff" stroke="#86efac"/>
      <text x="560" y="250" font-family="sans-serif" font-size="13" font-weight="700" fill="#166534">Explicit Large Summary Card</text>
      <text x="560" y="272" font-family="monospace" font-size="11" fill="#14532d">&lt;meta name="twitter:card" content="summary_large_image" /&gt;</text>
    </g>
  </svg>`;
}

// Design 5: OpenGraph vs Twitter Card - Platform Social Cards
function svgOpenGraph(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#eff6ff"/>
        <stop offset="100%" stop-color="#dbeafe"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg5)"/>
    <rect x="50" y="40" width="1100" height="550" rx="20" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.5"/>
    
    <rect x="90" y="80" width="220" height="26" rx="13" fill="#2563eb15"/>
    <text x="102" y="97" font-family="sans-serif" font-size="11" font-weight="700" fill="#2563eb" letter-spacing="1">SPECIFICATION COMPARISON</text>
    <text x="90" y="140" font-family="sans-serif" font-size="34" font-weight="800" fill="#0f172a">Open Graph vs Twitter Card Meta Tags</text>

    <!-- Social Card Mockups -->
    <g transform="translate(90, 180)">
      <!-- OpenGraph Card (LinkedIn / Facebook / Discord) -->
      <rect x="0" y="0" width="480" height="340" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="25" y="35" font-family="sans-serif" font-size="16" font-weight="800" fill="#1e40af">OpenGraph Protocol (og:)</text>

      <rect x="25" y="55" width="430" height="150" rx="10" fill="#2563eb"/>
      <text x="240" y="135" font-family="sans-serif" font-size="18" font-weight="700" fill="#ffffff" text-anchor="middle">og:image (1200 x 630 px)</text>

      <rect x="25" y="205" width="430" height="110" rx="0" fill="#ffffff"/>
      <text x="40" y="230" font-family="sans-serif" font-size="11" font-weight="700" fill="#64748b">NADHEBE.COM</text>
      <text x="40" y="255" font-family="sans-serif" font-size="15" font-weight="700" fill="#0f172a">Open Graph vs Twitter Card Meta Tags</text>
      <text x="40" y="280" font-family="sans-serif" font-size="12" fill="#64748b">Compare og: and twitter: property specifications &amp; fallbacks.</text>

      <!-- Twitter Card (X / Twitter) -->
      <rect x="520" y="0" width="480" height="340" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="545" y="35" font-family="sans-serif" font-size="16" font-weight="800" fill="#0284c7">Twitter Card (twitter:)</text>

      <rect x="545" y="55" width="430" height="150" rx="10" fill="#0284c7"/>
      <text x="760" y="135" font-family="sans-serif" font-size="18" font-weight="700" fill="#ffffff" text-anchor="middle">twitter:image (Summary Large)</text>

      <rect x="545" y="205" width="430" height="110" rx="0" fill="#ffffff"/>
      <text x="560" y="230" font-family="sans-serif" font-size="11" font-weight="700" fill="#64748b">NADHEBE.COM</text>
      <text x="560" y="255" font-family="sans-serif" font-size="15" font-weight="700" fill="#0f172a">Open Graph vs Twitter Card Meta Tags</text>
      <text x="560" y="280" font-family="sans-serif" font-size="12" fill="#64748b">Explicit twitter:card="summary_large_image" rendering.</text>
    </g>
  </svg>`;
}

// Design 6: Tools Roundup - Feature Rating Matrix Grid
function svgRoundup(): string {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ecfdf5"/>
        <stop offset="100%" stop-color="#d1fae5"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg6)"/>
    <rect x="50" y="40" width="1100" height="550" rx="20" fill="#ffffff" stroke="#a7f3d0" stroke-width="1.5"/>
    
    <rect x="90" y="80" width="180" height="26" rx="13" fill="#05966915"/>
    <text x="102" y="97" font-family="sans-serif" font-size="11" font-weight="700" fill="#059669" letter-spacing="1">TOOLS ROUNDUP 2026</text>
    <text x="90" y="140" font-family="sans-serif" font-size="34" font-weight="800" fill="#0f172a">7 Best Free Meta Tag Analyzer Tools</text>

    <!-- Leaderboard / Feature Matrix -->
    <g transform="translate(90, 180)">
      <!-- Top Pick Card -->
      <rect x="0" y="0" width="1000" height="90" rx="14" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
      <text x="35" y="42" font-family="sans-serif" font-size="20" font-weight="800" fill="#065f46">#1 Nadhebe Meta Tag Analyzer (Top Pick)</text>
      <text x="35" y="66" font-family="sans-serif" font-size="13" fill="#047857">100% Client-Side Privacy • Simultaneous Google SERP + OpenGraph Social Snippet Previews</text>
      <rect x="850" y="25" width="120" height="40" rx="20" fill="#059669"/>
      <text x="910" y="50" font-family="sans-serif" font-size="15" font-weight="800" fill="#ffffff" text-anchor="middle">9.6 / 10</text>

      <!-- Tool 2 -->
      <rect x="0" y="110" width="1000" height="60" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="35" y="145" font-family="sans-serif" font-size="16" font-weight="700" fill="#334155">#2 MetaTags.io</text>
      <text x="300" y="145" font-family="sans-serif" font-size="13" fill="#64748b">Multi-platform previews (Server dependent)</text>
      <text x="910" y="145" font-family="sans-serif" font-size="14" font-weight="700" fill="#475569" text-anchor="middle">9.0 / 10</text>

      <!-- Tool 3 -->
      <rect x="0" y="185" width="1000" height="60" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="35" y="220" font-family="sans-serif" font-size="16" font-weight="700" fill="#334155">#3 Portent SERP Preview Tool</text>
      <text x="300" y="220" font-family="sans-serif" font-size="13" fill="#64748b">Google SERP Desktop Ruler (No Social Previews)</text>
      <text x="910" y="220" font-family="sans-serif" font-size="14" font-weight="700" fill="#475569" text-anchor="middle">8.4 / 10</text>

      <!-- Tool 4 -->
      <rect x="0" y="260" width="1000" height="60" rx="10" fill="#f8fafc" stroke="#e2e8f0"/>
      <text x="35" y="295" font-family="sans-serif" font-size="16" font-weight="700" fill="#334155">#4 HeyMeta Meta Tag Checker</text>
      <text x="300" y="295" font-family="sans-serif" font-size="13" fill="#64748b">Basic Social Tags Readout</text>
      <text x="910" y="295" font-family="sans-serif" font-size="14" font-weight="700" fill="#475569" text-anchor="middle">8.2 / 10</text>
    </g>
  </svg>`;
}

async function generate() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const tasks = [
    { name: 'what-is-meta-tag-analyzer-hero.webp', fn: svgPillar },
    { name: 'how-to-analyze-meta-tags-hero.webp', fn: svgTutorial },
    { name: 'analyzer-vs-checker-hero.webp', fn: svgComparison },
    { name: 'fix-common-meta-tag-errors-hero.webp', fn: svgTroubleshoot },
    { name: 'open-graph-vs-twitter-card-hero.webp', fn: svgOpenGraph },
    { name: 'best-free-meta-tag-tools-hero.webp', fn: svgRoundup },
  ];

  for (const item of tasks) {
    const svg = item.fn();
    const destPath = path.join(imagesDir, item.name);
    await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(destPath);
    console.log(`Generated custom distinct WebP graphic: ${item.name}`);
  }
}

generate();
