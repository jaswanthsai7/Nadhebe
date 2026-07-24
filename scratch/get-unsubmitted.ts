import fs from 'fs';

const submitted = new Set([
  'https://nadhebe.com/guides/anthropic-claude-certification-developer-guide/',
  'https://nadhebe.com/guides/google-ai-certification-cost-free-vs-paid/',
  'https://nadhebe.com/guides/claude-code-agent-loop-architecture/',
  'https://nadhebe.com/tutorials/how-to-install-claude-code-cli/',
  'https://nadhebe.com/tutorials/installing-claude-code-cli-windows/',
  'https://nadhebe.com/comparisons/instatic-vs-webflow-vs-framer/',
  'https://nadhebe.com/comparisons/kimi-k3-vs-deepseek-r1-comparison/',
  'https://nadhebe.com/comparisons/kimi-k3-vs-claude-fable-5-vs-gpt-5-6-soul/',
  'https://nadhebe.com/comparisons/vllm-vs-ollama-architectural-comparison/',
  'https://nadhebe.com/comparisons/vllm-vs-sglang-vs-tgi-inference-engine-comparison/',
  'https://nadhebe.com/',
  'https://nadhebe.com/sitemap-index.xml'
]);

const sitemap = fs.readFileSync('dist/sitemap-0.xml', 'utf8');
const matches = Array.from(sitemap.matchAll(/<loc>(https:\/\/nadhebe\.com\/[^<]+)<\/loc>/g));
const allSitemapUrls = matches.map(m => m[1]);

// Exclude author pages and tag pages from manual submission
const unsubmitted = allSitemapUrls.filter(url => !submitted.has(url) && !url.includes('/author/') && !url.includes('/search/'));

console.log('REMAINING UNSUBMITTED CONTENT URLS:', unsubmitted.length);
unsubmitted.forEach(u => console.log(u));
