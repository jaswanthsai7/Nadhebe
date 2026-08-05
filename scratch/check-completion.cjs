const fs = require('fs');
const path = require('path');

// Extract slugs from the user's URLs
const urls = `
https://nadhebe.com/tools/csv-to-json/
https://nadhebe.com/tools/developer-calculator/
https://nadhebe.com/tools/database-checker/
https://nadhebe.com/tools/csv-deduper/
https://nadhebe.com/tools/database-builder/
https://nadhebe.com/tools/csv-checker/
https://nadhebe.com/tools/database-estimator/
https://nadhebe.com/tools/color-template-maker/
https://nadhebe.com/tools/dockerfile-linter/
https://nadhebe.com/tools/cron-next-run-viewer/
https://nadhebe.com/tools/embedding-inspector/
https://nadhebe.com/tools/design-inspector/
https://nadhebe.com/tools/developer-estimator/
https://nadhebe.com/tools/csv-planner/
https://nadhebe.com/tools/context-budget-planner/
https://nadhebe.com/tools/developer-inspector/
https://nadhebe.com/tools/database-cleaner/
https://nadhebe.com/tools/data-analysis-cleaner/
https://nadhebe.com/tools/database-template-maker/
https://nadhebe.com/tools/curl-builder/
https://nadhebe.com/tools/database-planner/
https://nadhebe.com/tools/csv-preview/
https://nadhebe.com/tools/env-diff/
https://nadhebe.com/tools/dpi-print-size-calculator/
https://nadhebe.com/tools/developer-builder/
https://nadhebe.com/tools/developer-template-maker/
https://nadhebe.com/tools/date-and-time-cleaner/
https://nadhebe.com/tools/education-cleaner/
https://nadhebe.com/tools/duplicate-remover/
https://nadhebe.com/tools/color-scale-generator/
https://nadhebe.com/tools/education-builder/
https://nadhebe.com/tools/erd-helper/
https://nadhebe.com/tools/csp-builder/
https://nadhebe.com/tools/design-planner/
https://nadhebe.com/tools/csv-task-importer/
https://nadhebe.com/tools/color-estimator/
https://nadhebe.com/tools/design-cleaner/
https://nadhebe.com/tools/devops-inspector/
https://nadhebe.com/tools/cookie-decoder/
https://nadhebe.com/tools/developer-generator/
https://nadhebe.com/tools/education-estimator/
https://nadhebe.com/tools/date-and-time-planner/
https://nadhebe.com/tools/education-inspector/
https://nadhebe.com/tools/column-profiler/
https://nadhebe.com/tools/css-clamp-calculator/
https://nadhebe.com/tools/csv-validator/
https://nadhebe.com/tools/database-inspector/
https://nadhebe.com/tools/design-builder/
https://nadhebe.com/tools/contrast-checker/
https://nadhebe.com/tools/developer-cleaner/
https://nadhebe.com/tools/column-extractor/
https://nadhebe.com/tools/csv-inspector/
https://nadhebe.com/tools/design-estimator/
https://nadhebe.com/tools/devops-planner/
https://nadhebe.com/tools/devops-checker/
https://nadhebe.com/tools/data-analysis-builder/
https://nadhebe.com/tools/commit-message-builder/
https://nadhebe.com/tools/csv-template-maker/
https://nadhebe.com/tools/compound-interest/
https://nadhebe.com/tools/devops-builder/
https://nadhebe.com/tools/contrast-matrix/
https://nadhebe.com/tools/data-analysis-template-maker/
https://nadhebe.com/tools/date-and-time-estimator/
https://nadhebe.com/tools/date-and-time-inspector/
https://nadhebe.com/tools/developer-planner/
https://nadhebe.com/tools/date-and-time-template-maker/
https://nadhebe.com/tools/data-analysis-checker/
https://nadhebe.com/tools/data-analysis-planner/
https://nadhebe.com/tools/design-token-mapper/
https://nadhebe.com/tools/design-checker/
https://nadhebe.com/tools/decision-matrix/
https://nadhebe.com/tools/csv-builder/
https://nadhebe.com/tools/escape-helper/
https://nadhebe.com/tools/energy-converter/
https://nadhebe.com/tools/date-difference/
https://nadhebe.com/tools/devops-estimator/
https://nadhebe.com/tools/date-and-time-checker/
https://nadhebe.com/tools/color-planner/
https://nadhebe.com/tools/data-analysis-inspector/
https://nadhebe.com/tools/date-and-time-builder/
https://nadhebe.com/tools/education-planner/
https://nadhebe.com/tools/csv-cleaner/
https://nadhebe.com/tools/education-template-maker/
https://nadhebe.com/tools/comfyui-prompt-helper/
https://nadhebe.com/tools/design-template-maker/
https://nadhebe.com/tools/dns-lookup-helper/
https://nadhebe.com/tools/developer-checker/
https://nadhebe.com/tools/devops-cleaner/
https://nadhebe.com/tools/color-inspector/
https://nadhebe.com/tools/data-analysis-estimator/
https://nadhebe.com/tools/education-checker/
https://nadhebe.com/tools/correlation-helper/
https://nadhebe.com/tools/description-template/
https://nadhebe.com/tools/data-type-detector/
https://nadhebe.com/tools/delimiter-converter/
https://nadhebe.com/tools/cron-explainer/
https://nadhebe.com/tools/csv-estimator/
https://nadhebe.com/tools/developer-formatter/
https://nadhebe.com/tools/devops-template-maker/
https://nadhebe.com/tools/eval-rubric-generator/
https://nadhebe.com/tools/automation-and-agents-inspector/
https://nadhebe.com/tools/automation-and-agents-checker/
https://nadhebe.com/tools/case-converter/
https://nadhebe.com/tools/api-planner/
https://nadhebe.com/tools/bpm-tapper/
https://nadhebe.com/tools/accessibility-cleaner/
https://nadhebe.com/tools/cloud-builder/
https://nadhebe.com/tools/average-calculator/
https://nadhebe.com/tools/campaign-url-qa/
https://nadhebe.com/tools/automation-and-agents-cleaner/
https://nadhebe.com/tools/ai-planner/
https://nadhebe.com/tools/chapter-formatter/
https://nadhebe.com/tools/automation-and-agents-estimator/
https://nadhebe.com/tools/cloud-checker/
https://nadhebe.com/tools/ai-inspector/
https://nadhebe.com/tools/ai-formatter/
https://nadhebe.com/tools/automation-and-agents-builder/
https://nadhebe.com/tools/api-builder/
https://nadhebe.com/tools/accessibility-builder/
https://nadhebe.com/tools/bandwidth-cost-estimator/
https://nadhebe.com/tools/accessibility-template-maker/
https://nadhebe.com/tools/break-even-planner/
https://nadhebe.com/tools/cloud-inspector/
https://nadhebe.com/tools/9-16-dimensions-calculator/
https://nadhebe.com/tools/automation-and-agents-planner/
https://nadhebe.com/tools/cloud-template-maker/
https://nadhebe.com/tools/accessibility-checker/
https://nadhebe.com/tools/ai-cleaner/
https://nadhebe.com/tools/background-remover/
https://nadhebe.com/tools/bio-formatter/
https://nadhebe.com/tools/calculators-template-maker/
https://nadhebe.com/tools/changelog-formatter/
https://nadhebe.com/tools/ai-checker/
https://nadhebe.com/tools/browser-cleaner/
https://nadhebe.com/tools/audio-estimator/
https://nadhebe.com/tools/base64-encoder/
https://nadhebe.com/tools/16-9-dimensions-calculator/
https://nadhebe.com/tools/api-cleaner/
https://nadhebe.com/tools/audio-cleaner/
https://nadhebe.com/tools/color-checker/
https://nadhebe.com/tools/accessibility-estimator/
https://nadhebe.com/tools/checklist-builder/
https://nadhebe.com/tools/audio-planner/
https://nadhebe.com/tools/color-builder/
https://nadhebe.com/tools/cloud-cleaner/
https://nadhebe.com/tools/api-inspector/
https://nadhebe.com/tools/audio-template-maker/
https://nadhebe.com/tools/ai-estimator/
https://nadhebe.com/tools/audio-trimmer/
https://nadhebe.com/tools/carousel-size-helper/
https://nadhebe.com/tools/ai-builder/
https://nadhebe.com/tools/cloud-egress-calculator/
https://nadhebe.com/tools/ai-cost-estimator/
https://nadhebe.com/tools/chunk-size-planner/
https://nadhebe.com/tools/color-cleaner/
https://nadhebe.com/tools/calculators-estimator/
https://nadhebe.com/tools/cloud-planner/
https://nadhebe.com/tools/accessibility-inspector/
https://nadhebe.com/tools/browser-template-maker/
https://nadhebe.com/tools/cls-checklist/
https://nadhebe.com/tools/ai-generator/
https://nadhebe.com/tools/api-error-formatter/
https://nadhebe.com/tools/canonical-checker/
https://nadhebe.com/tools/api-estimator/
https://nadhebe.com/tools/chart-chooser/
https://nadhebe.com/tools/automation-and-agents-template-maker/
https://nadhebe.com/tools/ai-template-maker/
https://nadhebe.com/tools/browser-inspector/
https://nadhebe.com/tools/ai-calculator/
https://nadhebe.com/tools/cidr-calculator/
https://nadhebe.com/tools/audio-builder/
https://nadhebe.com/tools/api-template-maker/
https://nadhebe.com/tools/bcrypt-checker/
https://nadhebe.com/tools/browser-estimator/
https://nadhebe.com/tools/citation-formatter/
https://nadhebe.com/tools/calculators-cleaner/
https://nadhebe.com/tools/claude-connector-helper/
https://nadhebe.com/tools/aspect-ratio-calculator/
https://nadhebe.com/tools/area-converter/
https://nadhebe.com/tools/audio-inspector/
https://nadhebe.com/tools/browser-builder/
https://nadhebe.com/tools/browser-planner/
https://nadhebe.com/tools/audio-checker/
https://nadhebe.com/tools/cloud-estimator/
https://nadhebe.com/tools/agent-task-graph-builder/
https://nadhebe.com/tools/aspect-ratio/4-5/
https://nadhebe.com/tools/color-blindness-simulator/
https://nadhebe.com/tools/browser-checker/
https://nadhebe.com/tools/calculators-inspector/
https://nadhebe.com/tools/calculators-planner/
https://nadhebe.com/tools/bitrate-calculator/
https://nadhebe.com/tools/cac-payback/
https://nadhebe.com/tools/calculators-checker/
https://nadhebe.com/tools/accessibility-planner/
https://nadhebe.com/tools/api-checker/
https://nadhebe.com/tools/aria-role-helper/
https://nadhebe.com/tools/aspect-ratio/1080x1350/
https://nadhebe.com/tools/alt-text-checker/
https://nadhebe.com/tools/bundle-size-calculator/
https://nadhebe.com/tools/calculators-builder/
https://nadhebe.com/tools/color-contrast-checker/
https://nadhebe.com/tools/svg-to-jsx/
https://nadhebe.com/tools/profit-margin-calculator/
https://nadhebe.com/tools/percentage-difference-calculator/
https://nadhebe.com/tools/json-to-typescript/
https://nadhebe.com/tools/px-to-rem/
https://nadhebe.com/tools/json-formatter/
https://nadhebe.com/tools/sitemap-validator/
https://nadhebe.com/tools/json-to-xml/
https://nadhebe.com/tools/meta-tag-analyzer/
https://nadhebe.com/tools/yaml-to-json/
https://nadhebe.com/tools/xml-formatter/
https://nadhebe.com/tools/json-validator/
https://nadhebe.com/tools/schema-generator/
https://nadhebe.com/tools/json-minifier/
https://nadhebe.com/tools/opportunity-radar/
https://nadhebe.com/comparisons/gemini-vs-chatgpt-comparison-2026/
https://nadhebe.com/news/gemini-3-6-flash-everything-we-know/
https://nadhebe.com/tools/
https://nadhebe.com/tools/youtube-video-size-calculator/
https://nadhebe.com/tutorials/gemini-api-javascript-node-examples/
https://nadhebe.com/tools/pixels-to-megapixels-calculator/
https://nadhebe.com/tools/social-media-image-sizes/
https://nadhebe.com/tools/megapixels-to-resolution-calculator/
https://nadhebe.com/tools/resize-dimensions-calculator/
https://nadhebe.com/tools/ppi-calculator/
`;

const slugList = urls.split('\n')
  .filter(line => line.includes('nadhebe.com/tools/'))
  .map(line => {
    const parts = line.split('nadhebe.com/tools/');
    if (parts.length > 1) {
      let sl = parts[1];
      if (sl.endsWith('/')) sl = sl.slice(0, -1);
      return sl;
    }
    return null;
  })
  .filter(Boolean);

// We need to parse UNIFIED_TOOLS_REGISTRY to check their status
const registryContent = fs.readFileSync(path.join(__dirname, '../src/config/tools-registry.ts'), 'utf-8');

// The scaffolded ones which we marked implemented but are still in dev:
const scaffolded = [
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

const notCompleted = [];

for (const slug of slugList) {
  // If the URL matches one of our scaffolded (in-progress) tools, or their old slugs which might still be mapped somehow (like context-budget-planner)
  
  // Find it in registry using a regex
  const regex = new RegExp(`"slug"\\s*:\\s*"${slug}"[\\s\\S]*?"status"\\s*:\\s*"([^"]+)"`);
  const match = registryContent.match(regex);
  if (match) {
    const status = match[1];
    if (status === 'planned') {
      notCompleted.push({ slug, reason: 'Status is "planned" in registry' });
    } else if (scaffolded.includes(slug)) {
      notCompleted.push({ slug, reason: 'Scaffolded but UI not built yet' });
    }
  } else {
    // Some slugs the user provided might have been renamed or don't exist.
    // If they were renamed, let's check if the old name is the one they provided.
    // E.g. 'ai-cost-estimator'
    const originalNames = [
      'context-budget-planner',
      'api-error-formatter',
      'ai-cost-estimator',
      'chunk-size-planner',
      'claude-connector-helper'
    ];
    if (originalNames.includes(slug)) {
       notCompleted.push({ slug, reason: 'Renamed for SEO and currently being built' });
    } else if (slug !== '') {
       // Let's assume if it's not in the registry at all, it's a 404 or incomplete placeholder URL.
       notCompleted.push({ slug, reason: 'Does not exist in registry (Likely 404)' });
    }
  }
}

console.log('Total URLs requested:', slugList.length);
console.log('Total Not Completed:', notCompleted.length);
console.log(JSON.stringify(notCompleted.slice(0, 15), null, 2) + '\\n...and ' + (notCompleted.length - 15) + ' more.');
