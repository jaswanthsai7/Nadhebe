const fs = require('fs');
const path = require('path');

const tools = {
  'ai-api-pricing-calculator': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'ai-api-pricing-calculator');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel flex flex-col overflow-hidden rounded-16 border border-border bg-surface/95 shadow-medium dark:border-border-dark dark:bg-surface-dark/95 p-24 gap-16">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
      <div class="space-y-12">
        <label class="block font-sans text-sm font-bold text-ink dark:text-ink-dark">Select Model</label>
        <select id="model-select" class="w-full rounded-8 border border-border bg-surface2 px-12 py-8 font-sans text-sm text-ink outline-none dark:border-border-dark dark:bg-surface2-dark dark:text-ink-dark">
          <option value="gpt-4o">GPT-4o ($5.00 / $15.00)</option>
          <option value="claude-3-5-sonnet">Claude 3.5 Sonnet ($3.00 / $15.00)</option>
          <option value="gemini-1-5-pro">Gemini 1.5 Pro ($3.50 / $10.50)</option>
          <option value="llama-3-70b">Llama 3 70B ($0.50 / $0.50)</option>
        </select>
        <label class="block font-sans text-sm font-bold text-ink dark:text-ink-dark mt-12">Daily API Calls</label>
        <input type="number" id="daily-calls" class="w-full rounded-8 border border-border bg-surface2 px-12 py-8 font-sans text-sm text-ink outline-none dark:border-border-dark dark:bg-surface2-dark dark:text-ink-dark" value="1000" />
      </div>
      <div class="space-y-12">
        <label class="block font-sans text-sm font-bold text-ink dark:text-ink-dark">Avg Input Tokens / Call</label>
        <input type="number" id="input-tokens" class="w-full rounded-8 border border-border bg-surface2 px-12 py-8 font-sans text-sm text-ink outline-none dark:border-border-dark dark:bg-surface2-dark dark:text-ink-dark" value="2000" />
        <label class="block font-sans text-sm font-bold text-ink dark:text-ink-dark mt-12">Avg Output Tokens / Call</label>
        <input type="number" id="output-tokens" class="w-full rounded-8 border border-border bg-surface2 px-12 py-8 font-sans text-sm text-ink outline-none dark:border-border-dark dark:bg-surface2-dark dark:text-ink-dark" value="500" />
      </div>
    </div>
    <div class="mt-16 border-t border-border/80 pt-16 flex justify-between items-center dark:border-border-dark/80">
      <span class="font-sans text-lg font-bold text-ink dark:text-ink-dark">Estimated Monthly Cost:</span>
      <span id="monthly-cost" class="font-mono text-3xl font-bold text-emerald-600 dark:text-emerald-400">$0.00</span>
    </div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  const prices = {
    'gpt-4o': { in: 5, out: 15 },
    'claude-3-5-sonnet': { in: 3, out: 15 },
    'gemini-1-5-pro': { in: 3.5, out: 10.5 },
    'llama-3-70b': { in: 0.5, out: 0.5 }
  };
  function calculate() {
    const model = document.getElementById('model-select').value;
    const calls = parseFloat(document.getElementById('daily-calls').value) || 0;
    const inTok = parseFloat(document.getElementById('input-tokens').value) || 0;
    const outTok = parseFloat(document.getElementById('output-tokens').value) || 0;
    
    const dailyIn = (calls * inTok) / 1000000;
    const dailyOut = (calls * outTok) / 1000000;
    
    const dailyCost = (dailyIn * prices[model].in) + (dailyOut * prices[model].out);
    const monthlyCost = dailyCost * 30;
    
    document.getElementById('monthly-cost').textContent = '$' + monthlyCost.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
  }
  document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', calculate));
  calculate();
</script>`,

  'llm-model-comparison-matrix': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'llm-model-comparison-matrix');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel overflow-x-auto rounded-16 border border-border bg-surface/95 shadow-medium dark:border-border-dark dark:bg-surface-dark/95">
    <table class="w-full text-left font-sans text-sm text-ink dark:text-ink-dark">
      <thead class="bg-surface2 dark:bg-surface2-dark font-bold">
        <tr>
          <th class="p-12 border-b border-border dark:border-border-dark">Model</th>
          <th class="p-12 border-b border-border dark:border-border-dark">Input Cost (1M)</th>
          <th class="p-12 border-b border-border dark:border-border-dark">Output Cost (1M)</th>
          <th class="p-12 border-b border-border dark:border-border-dark">Context Window</th>
          <th class="p-12 border-b border-border dark:border-border-dark">MMLU Score</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-border dark:divide-border-dark font-mono">
        <tr class="hover:bg-surface2/50 dark:hover:bg-surface2-dark/50">
          <td class="p-12 font-bold font-sans">GPT-4o</td><td>$5.00</td><td>$15.00</td><td>128k</td><td>88.7</td>
        </tr>
        <tr class="hover:bg-surface2/50 dark:hover:bg-surface2-dark/50">
          <td class="p-12 font-bold font-sans">Claude 3.5 Sonnet</td><td>$3.00</td><td>$15.00</td><td>200k</td><td>88.3</td>
        </tr>
        <tr class="hover:bg-surface2/50 dark:hover:bg-surface2-dark/50">
          <td class="p-12 font-bold font-sans">Gemini 1.5 Pro</td><td>$3.50</td><td>$10.50</td><td>2M</td><td>85.9</td>
        </tr>
        <tr class="hover:bg-surface2/50 dark:hover:bg-surface2-dark/50">
          <td class="p-12 font-bold font-sans">Llama 3 70B</td><td>$0.50</td><td>$0.50</td><td>8k</td><td>82.0</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>`,

  'rag-context-window-calculator': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'rag-context-window-calculator');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel rounded-16 border border-border bg-surface/95 shadow-medium dark:border-border-dark dark:bg-surface-dark/95 p-24">
    <div class="space-y-16">
      <div class="flex justify-between items-center">
        <span class="font-bold text-ink dark:text-ink-dark">Total Context Limit</span>
        <select id="ctx-limit" class="rounded-8 border border-border bg-surface2 px-12 py-8 outline-none dark:border-border-dark dark:bg-surface2-dark text-ink dark:text-ink-dark">
          <option value="8192">8k (Llama 3)</option>
          <option value="128000" selected>128k (GPT-4o)</option>
          <option value="200000">200k (Claude 3)</option>
        </select>
      </div>
      
      <div class="w-full h-24 flex rounded-pill overflow-hidden">
        <div id="bar-sys" class="h-full bg-blue-500 transition-all duration-300" style="width: 5%"></div>
        <div id="bar-rag" class="h-full bg-emerald-500 transition-all duration-300" style="width: 75%"></div>
        <div id="bar-gen" class="h-full bg-purple-500 transition-all duration-300" style="width: 20%"></div>
      </div>
      
      <div class="grid grid-cols-3 gap-12 pt-16">
        <div class="space-y-4">
          <label class="text-xs font-bold text-blue-500 uppercase">System Prompt (%)</label>
          <input type="range" id="slider-sys" min="1" max="98" value="5" class="w-full" />
          <span id="val-sys" class="block font-mono text-xs text-muted dark:text-muted-dark text-center">6,400 Tokens</span>
        </div>
        <div class="space-y-4">
          <label class="text-xs font-bold text-emerald-500 uppercase">RAG Docs (%)</label>
          <input type="range" id="slider-rag" min="1" max="98" value="75" class="w-full" />
          <span id="val-rag" class="block font-mono text-xs text-muted dark:text-muted-dark text-center">96,000 Tokens</span>
        </div>
        <div class="space-y-4">
          <label class="text-xs font-bold text-purple-500 uppercase">Generation (%)</label>
          <input type="range" id="slider-gen" min="1" max="98" value="20" class="w-full" disabled />
          <span id="val-gen" class="block font-mono text-xs text-muted dark:text-muted-dark text-center">25,600 Tokens</span>
        </div>
      </div>
    </div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  function update() {
    const total = parseInt(document.getElementById('ctx-limit').value);
    let sys = parseInt(document.getElementById('slider-sys').value);
    let rag = parseInt(document.getElementById('slider-rag').value);
    
    if (sys + rag >= 100) {
      rag = 99 - sys;
      document.getElementById('slider-rag').value = rag;
    }
    const gen = 100 - sys - rag;
    
    document.getElementById('bar-sys').style.width = sys + '%';
    document.getElementById('bar-rag').style.width = rag + '%';
    document.getElementById('bar-gen').style.width = gen + '%';
    
    document.getElementById('val-sys').textContent = Math.floor((total * sys) / 100).toLocaleString() + ' Tokens';
    document.getElementById('val-rag').textContent = Math.floor((total * rag) / 100).toLocaleString() + ' Tokens';
    document.getElementById('val-gen').textContent = Math.floor((total * gen) / 100).toLocaleString() + ' Tokens';
  }
  document.querySelectorAll('input, select').forEach(el => el.addEventListener('input', update));
  update();
</script>`,

  'mcp-server-manifest-generator': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'mcp-server-manifest-generator');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="grid grid-cols-1 lg:grid-cols-2 gap-16">
    <div class="glass-panel p-24 rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95 space-y-12">
      <label class="block text-sm font-bold text-ink dark:text-ink-dark">Server Name</label>
      <input type="text" id="mcp-name" class="w-full rounded-8 border border-border bg-surface2 px-12 py-8 dark:border-border-dark dark:bg-surface2-dark text-ink dark:text-ink-dark" value="my-mcp-server" />
      <label class="block text-sm font-bold text-ink dark:text-ink-dark mt-12">Command (e.g. node, python, npx)</label>
      <input type="text" id="mcp-cmd" class="w-full rounded-8 border border-border bg-surface2 px-12 py-8 dark:border-border-dark dark:bg-surface2-dark text-ink dark:text-ink-dark" value="npx" />
      <label class="block text-sm font-bold text-ink dark:text-ink-dark mt-12">Arguments (Comma separated)</label>
      <input type="text" id="mcp-args" class="w-full rounded-8 border border-border bg-surface2 px-12 py-8 dark:border-border-dark dark:bg-surface2-dark text-ink dark:text-ink-dark" value="-y,@modelcontextprotocol/server-postgres,postgresql://localhost/mydb" />
    </div>
    <div class="glass-panel flex flex-col overflow-hidden rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95">
      <div class="bg-surface2 dark:bg-surface2-dark p-12 border-b border-border dark:border-border-dark font-bold text-sm text-ink dark:text-ink-dark">mcp.json Preview</div>
      <pre id="mcp-out" class="p-16 flex-1 bg-code dark:bg-code-dark text-emerald-600 dark:text-emerald-400 font-mono text-sm overflow-auto"></pre>
    </div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  function update() {
    const name = document.getElementById('mcp-name').value || 'server';
    const cmd = document.getElementById('mcp-cmd').value || 'node';
    const args = document.getElementById('mcp-args').value.split(',').map(s => s.trim()).filter(Boolean);
    
    const obj = {
      mcpServers: {
        [name]: {
          command: cmd,
          args: args
        }
      }
    };
    document.getElementById('mcp-out').textContent = JSON.stringify(obj, null, 2);
  }
  document.querySelectorAll('input').forEach(el => el.addEventListener('input', update));
  update();
</script>`,

  'claude-desktop-mcp-config-maker': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'claude-desktop-mcp-config-maker');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel p-24 rounded-16 border border-border bg-surface/95 dark:border-border-dark dark:bg-surface-dark/95 text-center space-y-16">
    <h2 class="text-xl font-bold text-ink dark:text-ink-dark">Claude Desktop MCP Paths</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
      <div class="border border-border dark:border-border-dark p-16 rounded-12 bg-surface2 dark:bg-surface2-dark text-left">
        <h3 class="font-bold text-ink dark:text-ink-dark">MacOS</h3>
        <code class="block mt-8 bg-surface dark:bg-surface-dark p-8 rounded-8 text-xs text-accent break-all">~/Library/Application Support/Claude/claude_desktop_config.json</code>
      </div>
      <div class="border border-border dark:border-border-dark p-16 rounded-12 bg-surface2 dark:bg-surface2-dark text-left">
        <h3 class="font-bold text-ink dark:text-ink-dark">Windows</h3>
        <code class="block mt-8 bg-surface dark:bg-surface-dark p-8 rounded-8 text-xs text-accent break-all">%APPDATA%\\Claude\\claude_desktop_config.json</code>
      </div>
    </div>
    <p class="text-ink2 dark:text-ink2-dark text-sm">Create the file at the location above and paste the JSON generated by the MCP Manifest Builder.</p>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>`,

  'system-prompt-linter-best-practices': `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';

const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === 'system-prompt-linter-best-practices');
if (!platformTool) throw new Error('Tool not found');
---
<ToolLayout toolId={platformTool.slug} title={platformTool.seo?.title || platformTool.title} h1={platformTool.name} description={platformTool.seo?.description || platformTool.description} hideHeader={true} relatedCategory={platformTool.category} relatedTools={[]}>
  <div slot="calculator" class="glass-panel flex flex-col lg:flex-row overflow-hidden rounded-16 border border-border bg-surface/95 shadow-medium dark:border-border-dark dark:bg-surface-dark/95">
    <div class="flex-1 p-16 border-r border-border dark:border-border-dark flex flex-col">
      <textarea id="prompt-in" class="flex-1 min-h-[400px] resize-none border-none bg-transparent font-sans text-sm text-ink outline-none dark:text-ink-dark" placeholder="Paste your system prompt here..."></textarea>
    </div>
    <div class="w-full lg:w-1/3 bg-surface2 dark:bg-surface2-dark p-16 overflow-y-auto min-h-[400px]">
      <h3 class="font-bold text-ink dark:text-ink-dark mb-12">Linter Warnings</h3>
      <ul id="lint-out" class="space-y-8 text-sm"></ul>
    </div>
  </div>
  <div slot="content"><h2>About</h2><p>{platformTool.description}</p></div>
</ToolLayout>
<script>
  function lint() {
    const txt = document.getElementById('prompt-in').value.toLowerCase();
    const out = document.getElementById('lint-out');
    out.innerHTML = '';
    
    if (!txt) { out.innerHTML = '<li class="text-muted">Type something to lint</li>'; return; }
    
    const issues = [];
    if (txt.includes('try your best') || txt.includes('if possible')) {
      issues.push('<li class="text-danger p-8 bg-danger/10 rounded-8"><strong>Weak phrasing:</strong> Replace "try your best" with strict directives like "You MUST".</li>');
    }
    if (txt.includes('do not') || txt.includes('don\\'t')) {
      issues.push('<li class="text-amber-600 p-8 bg-amber-500/10 rounded-8"><strong>Negative Constraint:</strong> Models struggle with "do not". Try phrasing it positively (e.g., "Only output JSON").</li>');
    }
    if (txt.length < 50) {
      issues.push('<li class="text-blue-500 p-8 bg-blue-500/10 rounded-8"><strong>Too Short:</strong> Effective system prompts usually define a persona, context, and output format.</li>');
    }
    if (!txt.includes('<') && !txt.includes('---')) {
       issues.push('<li class="text-blue-500 p-8 bg-blue-500/10 rounded-8"><strong>Formatting:</strong> Consider using XML tags or markdown delimiters to structure instructions.</li>');
    }
    
    out.innerHTML = issues.length ? issues.join('') : '<li class="text-emerald-500 p-8 bg-emerald-500/10 rounded-8">Looks good! No issues found.</li>';
  }
  document.getElementById('prompt-in').addEventListener('input', lint);
  lint();
</script>`
};

const pagesDir = path.join(__dirname, '../src/pages/tools');

for (const [slug, content] of Object.entries(tools)) {
  fs.writeFileSync(path.join(pagesDir, slug + '.astro'), content);
  console.log('Built ' + slug);
}
