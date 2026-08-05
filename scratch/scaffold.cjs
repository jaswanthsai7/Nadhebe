const fs = require('fs');
const path = require('path');

const slugs = [
  'llm-token-counter-multi-model',
  'ai-api-pricing-calculator',
  'llm-model-comparison-matrix',
  'rag-context-window-calculator',
  'batch-inference-cost-estimator',
  'rag-chunk-size-calculator',
  'llm-rate-limit-backoff-generator',
  
  'mcp-server-manifest-generator',
  'openapi-to-mcp-tool-schema',
  'claude-desktop-mcp-config-maker',
  'mcp-json-rpc-payload-tester',
  
  'system-prompt-linter-best-practices',
  'prompt-template-variable-tester',
  'few-shot-prompt-formatter',
  'ai-persona-prompt-generator',
  
  'openapi-3-yaml-generator',
  'http-status-codes-cheat-sheet',
  'rfc-7807-error-json-generator',
  'webhook-payload-signature-generator'
];

const pagesDir = path.join(__dirname, '../src/pages/tools');

slugs.forEach(slug => {
  const content = `---
import ToolLayout from '@/components/tools/ToolLayout.astro';
import { UNIFIED_TOOLS_REGISTRY } from '@/config/tools-registry';
import type { ToolMetadata } from '@/config/tools';

const toolSlug = '${slug}';
const platformTool = UNIFIED_TOOLS_REGISTRY.find(t => t.slug === toolSlug);

if (!platformTool) {
  throw new Error('Tool not found in registry: ' + toolSlug);
}

// Build related tools
const platformRelatedTools = UNIFIED_TOOLS_REGISTRY
  .filter((tool) => (platformTool.relatedTools || []).includes(tool.slug))
  .map((tool) => ({
    id: tool.id,
    name: tool.name || tool.title,
    slug: tool.slug,
    href: tool.href,
    description: tool.description,
    category: tool.category,
    icon: tool.icon || 'code',
    badge: tool.badge,
    tags: tool.tags,
    noApi: true,
  })) as ToolMetadata[];

const toolFaq = [
  { question: \`Is \${platformTool.name} free?\`, answer: 'Yes, it is 100% free and runs locally.' }
];
---

<ToolLayout
  toolId={platformTool.slug}
  title={platformTool.seo?.title || platformTool.title}
  h1={platformTool.name}
  description={platformTool.seo?.description || platformTool.description}
  hideHeader={true}
  relatedCategory={platformTool.category}
  relatedTools={platformRelatedTools}
  faq={toolFaq}
>
  <div slot="calculator" class="min-h-[500px] flex items-center justify-center rounded-16 border border-border bg-surface/95 shadow-medium">
    <div class="text-center space-y-8 p-24">
      <h2 class="text-2xl font-bold text-ink">🚧 Development in Progress</h2>
      <p class="text-ink2">This 10x tool feature is currently being scaffolded.</p>
    </div>
  </div>
  <div slot="content">
    <h2>About {platformTool.name}</h2>
    <p>{platformTool.description}</p>
  </div>
</ToolLayout>
`;
  const p = path.join(pagesDir, `${slug}.astro`);
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, content);
    console.log(`Created ${slug}.astro`);
  }
});

// Update [slug].astro
const slugAstroPath = path.join(pagesDir, '[slug].astro');
let slugAstroContent = fs.readFileSync(slugAstroPath, 'utf-8');

const regex = /(const standaloneAstroSlugs = new Set\(\[)([\s\S]*?)(\]\);)/;
slugAstroContent = slugAstroContent.replace(regex, (match, p1, p2, p3) => {
  let existingItems = p2.split(',').map(s => s.trim().replace(/['"]/g, '')).filter(s => s.length > 0);
  const newItems = Array.from(new Set([...existingItems, ...slugs])).sort();
  const newString = newItems.map(s => `\n    '${s}'`).join(',') + '\n  ';
  return p1 + newString + p3;
});

fs.writeFileSync(slugAstroPath, slugAstroContent);
console.log('Updated [slug].astro');

// Update tools-registry.ts to mark them implemented
const registryPath = path.join(__dirname, '../src/config/tools-registry.ts');
let regContent = fs.readFileSync(registryPath, 'utf-8');

slugs.forEach(slug => {
  const blockRegex = new RegExp(`(\\"slug\\"\\s*:\\s*\\"${slug}\\"[\\s\\S]*?\\"status\\"\\s*:\\s*\\")planned(\\")`, 'g');
  regContent = regContent.replace(blockRegex, `$1implemented$2`);
});
fs.writeFileSync(registryPath, regContent);
console.log('Updated tools-registry.ts status');
