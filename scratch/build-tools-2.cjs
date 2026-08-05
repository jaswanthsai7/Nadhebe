const fs = require('fs');
const path = require('path');

const tools = {
  // Phase 2
  'batch-inference-cost-estimator': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'batch-inference-cost-estimator');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel p-24 rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95 space-y-16">
    <div class="grid grid-cols-2 gap-16">
      <div class="space-y-8">
        <label class="block text-sm font-bold text-ink dark:text-ink-dark">Total Prompts</label>
        <input type="number" id="b-prompts" class="w-full rounded-8 border border-border bg-surface2 px-12 py-8 dark:border-border-dark dark:bg-surface2-dark text-ink dark:text-ink-dark" value="50000" />
      </div>
      <div class="space-y-8">
        <label class="block text-sm font-bold text-ink dark:text-ink-dark">Model</label>
        <select id="b-model" class="w-full rounded-8 border border-border bg-surface2 px-12 py-8 dark:border-border-dark dark:bg-surface2-dark text-ink dark:text-ink-dark">
          <option value="5,15">GPT-4o ($5 / $15)</option>
          <option value="3,15">Claude 3.5 Sonnet</option>
        </select>
      </div>
    </div>
    <div class="flex justify-between items-center bg-emerald-500/10 p-16 rounded-12 border border-emerald-500/20">
      <div>
        <h3 class="text-emerald-700 dark:text-emerald-400 font-bold">Standard API Cost</h3>
        <p id="b-std" class="font-mono text-2xl font-bold text-emerald-800 dark:text-emerald-300">$0.00</p>
      </div>
      <div class="text-right">
        <h3 class="text-blue-700 dark:text-blue-400 font-bold">Batch API Cost (50% Off)</h3>
        <p id="b-batch" class="font-mono text-3xl font-bold text-blue-800 dark:text-blue-300">$0.00</p>
      </div>
    </div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  function update() {
    const p = parseFloat(document.getElementById('b-prompts').value) || 0;
    const m = document.getElementById('b-model').value.split(',').map(Number);
    // Assume 1k in, 500 out per prompt
    const std = (p * 1000 / 1000000 * m[0]) + (p * 500 / 1000000 * m[1]);
    document.getElementById('b-std').textContent = '$' + std.toFixed(2);
    document.getElementById('b-batch').textContent = '$' + (std / 2).toFixed(2);
  }
  document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', update));
  update();
</script>`,

  'rag-chunk-size-calculator': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'rag-chunk-size-calculator');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel flex flex-col rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95 h-[600px]">
    <div class="p-16 border-b border-border dark:border-border-dark flex justify-between items-center bg-surface2 dark:bg-surface2-dark">
      <h3 class="font-bold text-ink dark:text-ink-dark">Text Chunker</h3>
      <select id="chunk-size" class="rounded-8 border border-border bg-surface px-8 py-4 dark:border-border-dark dark:bg-surface-dark text-ink dark:text-ink-dark">
        <option value="256">256 Chars</option>
        <option value="512" selected>512 Chars</option>
        <option value="1024">1024 Chars</option>
      </select>
    </div>
    <div class="flex-1 flex flex-col md:flex-row overflow-hidden">
      <textarea id="chunk-in" class="flex-1 resize-none p-16 bg-transparent outline-none border-r border-border dark:border-border-dark text-ink dark:text-ink-dark" placeholder="Paste document here..."></textarea>
      <div id="chunk-out" class="flex-1 p-16 overflow-y-auto font-mono text-sm space-y-8 bg-surface2/30 dark:bg-surface2-dark/30"></div>
    </div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  function chunk() {
    const text = document.getElementById('chunk-in').value;
    const size = parseInt(document.getElementById('chunk-size').value);
    const out = document.getElementById('chunk-out');
    
    if (!text) { out.innerHTML = ''; return; }
    
    let html = '';
    for(let i = 0; i < text.length; i += size) {
      html += '<div class="p-8 bg-accent/10 border border-accent/20 rounded-8 text-ink dark:text-ink-dark break-words">' + text.slice(i, i + size).replace(/</g, '&lt;') + '</div>';
    }
    out.innerHTML = html;
  }
  document.getElementById('chunk-in').addEventListener('input', chunk);
  document.getElementById('chunk-size').addEventListener('change', chunk);
  chunk();
</script>`,

  'llm-rate-limit-backoff-generator': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'llm-rate-limit-backoff-generator');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel p-24 rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95">
    <div class="flex flex-col space-y-16">
      <div class="grid grid-cols-2 gap-16">
        <div><label class="font-bold text-ink dark:text-ink-dark">RPM Limit</label><input type="number" id="rl-rpm" value="500" class="w-full mt-4 rounded-8 border border-border bg-surface2 p-8 dark:border-border-dark dark:bg-surface2-dark text-ink dark:text-ink-dark" /></div>
        <div><label class="font-bold text-ink dark:text-ink-dark">Language</label>
        <select id="rl-lang" class="w-full mt-4 rounded-8 border border-border bg-surface2 p-8 dark:border-border-dark dark:bg-surface2-dark text-ink dark:text-ink-dark">
          <option value="python">Python</option>
          <option value="node">Node.js</option>
        </select>
        </div>
      </div>
      <pre id="rl-out" class="p-16 bg-code dark:bg-code-dark text-emerald-400 font-mono text-sm rounded-8 overflow-auto"></pre>
    </div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  function gen() {
    const rpm = parseInt(document.getElementById('rl-rpm').value) || 500;
    const lang = document.getElementById('rl-lang').value;
    const out = document.getElementById('rl-out');
    
    if (lang === 'python') {
      out.textContent = \`import time\\nimport random\\n\\nMAX_RETRIES = 5\\n\\ndef call_api_with_backoff():\\n    for i in range(MAX_RETRIES):\\n        try:\\n            # Make API Call\\n            return api.create_completion()\\n        except RateLimitError:\\n            wait = (2 ** i) + random.uniform(0, 1)\\n            print(f"Rate limited. Waiting {wait:.2f}s")\\n            time.sleep(wait)\\n    raise Exception("Max retries exceeded")\`;
    } else {
      out.textContent = \`const MAX_RETRIES = 5;\\n\\nasync function callApiWithBackoff() {\\n  for (let i = 0; i < MAX_RETRIES; i++) {\\n    try {\\n      return await api.createCompletion();\\n    } catch (error) {\\n      if (error.status === 429) {\\n        const wait = (Math.pow(2, i) + Math.random()) * 1000;\\n        console.log(\\\`Rate limited. Waiting \${wait}ms\\\`);\\n        await new Promise(r => setTimeout(r, wait));\\n      } else throw error;\\n    }\\n  }\\n  throw new Error("Max retries exceeded");\\n}\`;
    }
  }
  document.querySelectorAll('input, select').forEach(e => e.addEventListener('input', gen));
  gen();
</script>`,

  // Phase 3
  'mcp-json-rpc-payload-tester': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'mcp-json-rpc-payload-tester');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel p-24 rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95 space-y-16">
    <textarea id="mcp-payload" class="w-full h-64 font-mono text-sm p-16 border border-border rounded-12 bg-surface2 dark:bg-surface2-dark text-ink dark:text-ink-dark" placeholder="Paste JSON-RPC payload here...">{ "jsonrpc": "2.0", "id": 1, "method": "ping" }</textarea>
    <div id="mcp-res" class="p-16 rounded-8 bg-surface2 dark:bg-surface2-dark border border-border dark:border-border-dark font-mono text-sm text-ink dark:text-ink-dark"></div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  document.getElementById('mcp-payload').addEventListener('input', (e) => {
    const val = e.target.value;
    const res = document.getElementById('mcp-res');
    try {
      const p = JSON.parse(val);
      if (p.jsonrpc !== "2.0") throw new Error('Missing jsonrpc: "2.0"');
      if (!p.method && !p.result && !p.error) throw new Error('Missing method or result');
      res.innerHTML = '<span class="text-emerald-500">Valid MCP JSON-RPC Payload!</span>';
    } catch(err) {
      res.innerHTML = '<span class="text-danger">Invalid: ' + err.message + '</span>';
    }
  });
</script>`,

  // Phase 4
  'prompt-template-variable-tester': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'prompt-template-variable-tester');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel flex flex-col md:flex-row h-[600px] rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95">
    <textarea id="pt-in" class="flex-1 p-16 resize-none outline-none bg-transparent border-b md:border-b-0 md:border-r border-border dark:border-border-dark text-ink dark:text-ink-dark" placeholder="Hello {{name}}, please analyze {{data}}"></textarea>
    <div class="flex-1 flex flex-col">
      <div id="pt-vars" class="p-16 bg-surface2/50 dark:bg-surface2-dark/50 border-b border-border dark:border-border-dark space-y-8"></div>
      <pre id="pt-out" class="flex-1 p-16 font-mono text-sm overflow-auto text-emerald-600 dark:text-emerald-400"></pre>
    </div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  let vars = {};
  function update() {
    const text = document.getElementById('pt-in').value;
    const matches = [...text.matchAll(/{{(.*?)}}/g)].map(m => m[1].trim());
    const unique = [...new Set(matches)];
    
    const varsDiv = document.getElementById('pt-vars');
    varsDiv.innerHTML = unique.length ? '' : '<span class="text-muted text-xs">No {{variables}} found</span>';
    
    unique.forEach(v => {
      if (!(v in vars)) vars[v] = '';
      const lbl = document.createElement('label');
      lbl.className = "flex items-center gap-8 text-xs font-bold text-ink dark:text-ink-dark";
      lbl.innerHTML = \`<span class="w-24 truncate">\${v}</span><input type="text" data-var="\${v}" value="\${vars[v]}" class="flex-1 p-4 rounded bg-surface border border-border dark:bg-surface-dark dark:border-border-dark" />\`;
      varsDiv.appendChild(lbl);
    });
    
    varsDiv.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('input', (e) => {
        vars[e.target.dataset.var] = e.target.value;
        render();
      });
    });
    render();
  }
  
  function render() {
    let text = document.getElementById('pt-in').value;
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(new RegExp(\`{{\\\\s*\${k}\\\\s*}}\`, 'g'), v || \`[[\${k}]]\`);
    }
    document.getElementById('pt-out').textContent = text;
  }
  
  document.getElementById('pt-in').addEventListener('input', update);
  update();
</script>`,

  'few-shot-prompt-formatter': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'few-shot-prompt-formatter');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel p-24 rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95 space-y-16">
    <textarea id="fs-in" class="w-full h-32 p-16 font-mono text-sm border border-border rounded-12 bg-surface2 dark:bg-surface2-dark text-ink dark:text-ink-dark" placeholder="Input,Output\\nHello,Hi there\\nBye,See ya"></textarea>
    <select id="fs-format" class="w-full rounded-8 border border-border bg-surface p-8 dark:border-border-dark dark:bg-surface-dark text-ink dark:text-ink-dark">
      <option value="xml">XML Tags</option>
      <option value="chat">Chat (User/Assistant)</option>
    </select>
    <pre id="fs-out" class="p-16 bg-code dark:bg-code-dark text-emerald-400 font-mono text-sm rounded-12 overflow-auto h-64"></pre>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  function format() {
    const raw = document.getElementById('fs-in').value;
    const type = document.getElementById('fs-format').value;
    const lines = raw.split('\\n').filter(Boolean);
    if(lines.length < 2) { document.getElementById('fs-out').textContent = ''; return; }
    
    let out = '';
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length < 2) continue;
      if (type === 'xml') {
        out += \`<example>\\n  <input>\${parts[0]}</input>\\n  <output>\${parts.slice(1).join(',')}</output>\\n</example>\\n\\n\`;
      } else {
        out += \`User: \${parts[0]}\\nAssistant: \${parts.slice(1).join(',')}\\n\\n\`;
      }
    }
    document.getElementById('fs-out').textContent = out;
  }
  document.getElementById('fs-in').addEventListener('input', format);
  document.getElementById('fs-format').addEventListener('change', format);
</script>`,

  'ai-persona-prompt-generator': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'ai-persona-prompt-generator');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel grid grid-cols-1 md:grid-cols-2 rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95">
    <div class="p-24 space-y-12 border-r border-border dark:border-border-dark">
      <label class="block text-sm font-bold text-ink dark:text-ink-dark">Role/Expertise</label>
      <input type="text" id="pp-role" value="Senior TypeScript Engineer" class="w-full p-8 border border-border rounded-8 bg-surface2 dark:bg-surface2-dark text-ink dark:text-ink-dark" />
      <label class="block text-sm font-bold text-ink dark:text-ink-dark mt-8">Audience</label>
      <input type="text" id="pp-aud" value="Junior Developers" class="w-full p-8 border border-border rounded-8 bg-surface2 dark:bg-surface2-dark text-ink dark:text-ink-dark" />
      <label class="block text-sm font-bold text-ink dark:text-ink-dark mt-8">Tone</label>
      <input type="text" id="pp-tone" value="Direct, Educational, No fluff" class="w-full p-8 border border-border rounded-8 bg-surface2 dark:bg-surface2-dark text-ink dark:text-ink-dark" />
    </div>
    <div class="p-24">
      <pre id="pp-out" class="h-full bg-code dark:bg-code-dark text-emerald-400 font-mono text-sm rounded-12 p-16 whitespace-pre-wrap"></pre>
    </div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  function gen() {
    const role = document.getElementById('pp-role').value;
    const aud = document.getElementById('pp-aud').value;
    const tone = document.getElementById('pp-tone').value;
    
    document.getElementById('pp-out').textContent = \`You are an expert \${role}.
Your primary audience is \${aud}.

TONE AND STYLE:
\${tone}

CONSTRAINTS:
- Answer accurately and concisely.
- Do not apologize or use robotic filler words.
- Use formatting (markdown, code blocks) to structure your response.

When you are ready, acknowledge these instructions and wait for the user's first query.\`;
  }
  document.querySelectorAll('input').forEach(i => i.addEventListener('input', gen));
  gen();
</script>`,

  // Phase 5
  'openapi-3-yaml-generator': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'openapi-3-yaml-generator');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel p-24 rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95 space-y-16">
    <div class="flex gap-16">
      <input type="text" id="oa-title" value="My API" class="flex-1 p-8 border border-border rounded-8 bg-surface2 dark:bg-surface2-dark text-ink dark:text-ink-dark" placeholder="API Title" />
      <input type="text" id="oa-ver" value="1.0.0" class="w-32 p-8 border border-border rounded-8 bg-surface2 dark:bg-surface2-dark text-ink dark:text-ink-dark" placeholder="Version" />
    </div>
    <pre id="oa-out" class="p-16 bg-code dark:bg-code-dark text-emerald-400 font-mono text-sm rounded-12 h-64 overflow-auto whitespace-pre-wrap"></pre>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  function gen() {
    const title = document.getElementById('oa-title').value;
    const ver = document.getElementById('oa-ver').value;
    document.getElementById('oa-out').textContent = \`openapi: 3.1.0
info:
  title: \${title}
  version: \${ver}
paths:
  /ping:
    get:
      summary: Health check endpoint
      responses:
        '200':
          description: OK\`;
  }
  document.querySelectorAll('input').forEach(i => i.addEventListener('input', gen));
  gen();
</script>`,

  'http-status-codes-cheat-sheet': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'http-status-codes-cheat-sheet');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel p-24 rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95 space-y-16">
    <input type="text" id="sc-search" class="w-full p-12 border border-border rounded-8 bg-surface2 dark:bg-surface2-dark text-ink dark:text-ink-dark" placeholder="Search code (e.g. 404, 500, Unauthorized)..." />
    <div id="sc-out" class="space-y-8 max-h-96 overflow-auto"></div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  const codes = [
    { c: 200, n: "OK", d: "Standard response for successful HTTP requests." },
    { c: 201, n: "Created", d: "The request has been fulfilled, resulting in the creation of a new resource." },
    { c: 400, n: "Bad Request", d: "The server cannot process the request due to a client error (e.g., malformed syntax)." },
    { c: 401, n: "Unauthorized", d: "Authentication is required and has failed or has not yet been provided." },
    { c: 403, n: "Forbidden", d: "The client does not have access rights to the content." },
    { c: 404, n: "Not Found", d: "The server can not find the requested resource." },
    { c: 500, n: "Internal Server Error", d: "The server has encountered a situation it doesn't know how to handle." }
  ];
  function search() {
    const term = document.getElementById('sc-search').value.toLowerCase();
    const f = codes.filter(c => c.c.toString().includes(term) || c.n.toLowerCase().includes(term));
    document.getElementById('sc-out').innerHTML = f.map(c => \`<div class="p-12 bg-surface2 dark:bg-surface2-dark border border-border dark:border-border-dark rounded-8"><span class="font-bold text-accent dark:text-accent-dark">\${c.c} \${c.n}</span><p class="text-sm text-ink2 dark:text-ink2-dark">\${c.d}</p></div>\`).join('');
  }
  document.getElementById('sc-search').addEventListener('input', search);
  search();
</script>`,

  'rfc-7807-error-json-generator': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'rfc-7807-error-json-generator');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel grid grid-cols-1 md:grid-cols-2 rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95">
    <div class="p-24 space-y-12 border-r border-border dark:border-border-dark">
      <label class="block text-sm font-bold text-ink dark:text-ink-dark">Type URL</label><input type="text" id="r-type" value="https://example.com/probs/out-of-credit" class="w-full p-8 border rounded-8 bg-surface2" />
      <label class="block text-sm font-bold text-ink dark:text-ink-dark mt-8">Title</label><input type="text" id="r-title" value="You do not have enough credit." class="w-full p-8 border rounded-8 bg-surface2" />
      <label class="block text-sm font-bold text-ink dark:text-ink-dark mt-8">Status</label><input type="number" id="r-status" value="403" class="w-full p-8 border rounded-8 bg-surface2" />
    </div>
    <div class="p-24"><pre id="r-out" class="h-full bg-code text-emerald-400 font-mono text-sm rounded-12 p-16 whitespace-pre-wrap"></pre></div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  function gen() {
    const obj = {
      type: document.getElementById('r-type').value,
      title: document.getElementById('r-title').value,
      status: parseInt(document.getElementById('r-status').value)
    };
    document.getElementById('r-out').textContent = JSON.stringify(obj, null, 2);
  }
  document.querySelectorAll('input').forEach(i => i.addEventListener('input', gen));
  gen();
</script>`,

  'webhook-payload-signature-generator': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'webhook-payload-signature-generator');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel p-24 rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95 space-y-16">
    <div class="flex justify-between items-center bg-surface2 p-16 border border-border rounded-8">
      <span class="font-bold">Provider:</span> 
      <select class="bg-surface border border-border p-4 rounded-4"><option>Stripe</option><option>GitHub</option></select>
    </div>
    <div class="p-16 border border-border rounded-12 bg-code">
      <h3 class="text-emerald-500 mb-8 font-bold text-sm">Header</h3>
      <code class="text-ink dark:text-ink-dark text-xs block break-all">Stripe-Signature: t=1612345678,v1=a1b2c3d4e5f6g7h8...</code>
    </div>
    <div class="p-16 border border-border rounded-12 bg-code">
      <h3 class="text-emerald-500 mb-8 font-bold text-sm">Payload</h3>
      <code class="text-ink dark:text-ink-dark text-xs block whitespace-pre">{ "id": "evt_123", "type": "payment_intent.succeeded" }</code>
    </div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>`
};

const pagesDir = path.join(__dirname, '../src/pages/tools');
for (const [slug, content] of Object.entries(tools)) {
  fs.writeFileSync(path.join(pagesDir, slug + '.astro'), content);
  console.log('Built ' + slug);
}
