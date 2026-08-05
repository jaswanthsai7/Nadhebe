const fs = require('fs');
const path = require('path');

const slugMap = {
  'token-estimator': 'llm-token-counter-multi-model',
  'ai-cost-estimator': 'ai-api-pricing-calculator',
  'model-comparison-helper': 'llm-model-comparison-matrix',
  'context-budget-planner': 'rag-context-window-calculator',
  'inference-cost-calculator': 'batch-inference-cost-estimator',
  'chunk-size-planner': 'rag-chunk-size-calculator',
  'rate-limit-planner': 'llm-rate-limit-backoff-generator',
  'mcp-manifest-builder': 'mcp-server-manifest-generator',
  'tool-schema-generator': 'openapi-to-mcp-tool-schema',
  'claude-connector-helper': 'claude-desktop-mcp-config-maker',
  'mcp-inspector': 'mcp-json-rpc-payload-tester',
  'system-prompt-linter': 'system-prompt-linter-best-practices',
  'prompt-template-builder': 'prompt-template-variable-tester',
  'few-shot-formatter': 'few-shot-prompt-formatter',
  'role-prompt-builder': 'ai-persona-prompt-generator',
  'openapi-starter': 'openapi-3-yaml-generator',
  'http-status-reference': 'http-status-codes-cheat-sheet',
  'api-error-formatter': 'rfc-7807-error-json-generator',
  'webhook-tester': 'webhook-payload-signature-generator'
};

const registryPath = path.join(__dirname, '../src/config/tools-registry.ts');
let regContent = fs.readFileSync(registryPath, 'utf-8');

for (const [oldSlug, newSlug] of Object.entries(slugMap)) {
  const rx1 = new RegExp("'" + oldSlug + "'", 'g');
  regContent = regContent.replace(rx1, "'" + newSlug + "'");
  
  const rx2 = new RegExp('"' + oldSlug + '"', 'g');
  regContent = regContent.replace(rx2, '"' + newSlug + '"');
}
fs.writeFileSync(registryPath, regContent);
console.log('Fixed relatedTools in tools-registry.ts');

function processDirectory(directory) {
  if (!fs.existsSync(directory)) return;
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.md') || fullPath.endsWith('.mdx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      let modified = false;
      for (const [oldSlug, newSlug] of Object.entries(slugMap)) {
        const rx = new RegExp('/tools/' + oldSlug + '/?', 'g');
        if (rx.test(content)) {
          content = content.replace(rx, '/tools/' + newSlug + '/');
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed links in ' + fullPath);
      }
    }
  }
}
processDirectory(path.join(__dirname, '../src/content'));
