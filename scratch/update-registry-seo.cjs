const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '../src/config/tools-registry.ts');
let content = fs.readFileSync(registryPath, 'utf-8');

const updates = {
  // Phase 2
  'token-estimator': {
    slug: 'llm-token-counter-multi-model',
    title: 'LLM Token Calculator & Multi-Model Visualizer',
    name: 'LLM Token Calculator',
    description: 'Compare GPT-4 vs Claude token counts in real-time. Visualize exactly how text is chunked by different models.',
    seoTitle: 'LLM Token Calculator & Multi-Model Visualizer | Nadhebe',
    seoDesc: 'Compare token counts across OpenAI, Anthropic, and Llama tokenizers simultaneously. Real-time visual tokenizer highlighting.',
    seoKeywords: '["llm token counter multi model", "compare gpt-4 vs claude token counts", "tokenizer visualizer", "tiktoken counter online", "sentencepiece tokenizer tool"]'
  },
  'ai-cost-estimator': {
    slug: 'ai-api-pricing-calculator',
    title: 'AI API Cost & ROI Simulator',
    name: 'AI API Cost Simulator',
    description: 'Estimate LLM API monthly costs with our multi-agent workflow simulator. Project monthly server bills and break-even points.',
    seoTitle: 'AI API Cost & ROI Simulator | Nadhebe',
    seoDesc: 'Calculate advanced LLM API costs for multi-agent workflows. Compare GPT-4o, Claude 3.5, and Gemini pricing for production deployments.',
    seoKeywords: '["ai api pricing calculator", "estimate llm api monthly costs", "llm cost simulator", "gpt-4 api cost calculator", "claude api pricing estimator"]'
  },
  'model-comparison-helper': {
    slug: 'llm-model-comparison-matrix',
    title: 'LLM Provider Arbitrage Matrix',
    name: 'LLM Model Arbitrage',
    description: 'Dynamically sort and compare LLMs by Intelligence per Dollar (MMLU) and Speed per Dollar (Tokens/sec).',
    seoTitle: 'LLM Provider Arbitrage Matrix & Price Comparison | Nadhebe',
    seoDesc: 'Compare the cheapest and smartest LLM APIs. Sort by intelligence per dollar, context window, and inference speed.',
    seoKeywords: '["llm model comparison matrix", "cheapest llm api pricing table", "compare llm costs", "best llm api for production"]'
  },
  'context-budget-planner': {
    slug: 'rag-context-window-calculator',
    title: 'RAG Context Window Optimizer',
    name: 'Context Window Optimizer',
    description: 'Visually allocate percentage limits for System Prompts, RAG context, and Completion buffers.',
    seoTitle: 'RAG Context Window Calculator & Optimizer | Nadhebe',
    seoDesc: 'Optimize your LLM context window. Visually plan context sizes for RAG retrieval, system instructions, and generation buffers.',
    seoKeywords: '["rag context window calculator", "how to optimize llm context limits", "llm context window visualizer", "rag prompt token planner"]'
  },
  'inference-cost-calculator': {
    slug: 'batch-inference-cost-estimator',
    title: 'Batch Inference Cost Calculator',
    name: 'Batch Cost Estimator',
    description: 'Calculate 50% discount savings using asynchronous Batch APIs. Upload a CSV to estimate total run cost.',
    seoTitle: 'Batch Inference Cost Calculator for LLM APIs | Nadhebe',
    seoDesc: 'Calculate the exact savings of using the OpenAI or Anthropic Batch APIs for asynchronous inference. Upload bulk prompts to estimate costs.',
    seoKeywords: '["batch inference cost estimator", "calculate openai batch api discount", "llm batch pricing calculator"]'
  },
  'chunk-size-planner': {
    slug: 'rag-chunk-size-calculator',
    title: 'Semantic Chunk Size Planner',
    name: 'RAG Chunk Planner',
    description: 'Paste documents and visually slice them by token limits (256, 512, 1024) to optimize vector embeddings.',
    seoTitle: 'RAG Chunk Size Calculator & Visualizer | Nadhebe',
    seoDesc: 'Optimize your vector database chunks. Visually slice long documents by token limits to find the perfect semantic chunk size for RAG.',
    seoKeywords: '["rag chunk size calculator", "best chunk size for vector embeddings", "text chunking visualizer", "token limits for rag"]'
  },
  'rate-limit-planner': {
    slug: 'llm-rate-limit-backoff-generator',
    title: 'API Rate Limit & Backoff Planner',
    name: 'Rate Limit Planner',
    description: 'Generate production-ready Exponential Backoff code snippets based on custom RPM and TPM limits.',
    seoTitle: 'LLM Rate Limit Backoff Code Generator | Nadhebe',
    seoDesc: 'Calculate TPM and RPM limits and instantly generate copy-pasteable Exponential Backoff code for Python and Node.js.',
    seoKeywords: '["llm rate limit backoff generator", "calculate tpm and rpm limits", "exponential backoff code snippet openai", "handle 429 too many requests llm"]'
  },
  
  // Phase 3 MCP
  'mcp-manifest-builder': {
    slug: 'mcp-server-manifest-generator',
    title: 'MCP Server Manifest Generator',
    name: 'MCP Manifest Builder',
    description: 'Generate valid mcp.json configurations tailored for specific hosts like Cursor or Claude Desktop.',
    seoTitle: 'MCP Server Manifest Generator | Model Context Protocol Tools',
    seoDesc: 'Create valid configuration files for your Model Context Protocol (MCP) servers. Supports profiles for Claude Desktop and Cursor.',
    seoKeywords: '["mcp server manifest generator", "how to create mcp.json", "model context protocol config builder"]'
  },
  'tool-schema-generator': {
    slug: 'openapi-to-mcp-tool-schema',
    title: 'OpenAPI to MCP Schema Converter',
    name: 'MCP Schema Converter',
    description: 'Convert standard REST OpenAPI endpoints into strict JSON Schemas required for MCP Tools.',
    seoTitle: 'OpenAPI to MCP Tool Schema Converter | Nadhebe',
    seoDesc: 'Instantly convert OpenAPI YAML or JSON endpoints into valid Model Context Protocol tool schemas.',
    seoKeywords: '["openapi to mcp tool schema", "convert rest api to mcp tools", "mcp json schema generator"]'
  },
  'claude-connector-helper': {
    slug: 'claude-desktop-mcp-config-maker',
    title: 'Claude Desktop MCP Configurator',
    name: 'Claude MCP Configurator',
    description: 'Generate the exact claude_desktop_config.json configuration and environment variables for local MCP servers.',
    seoTitle: 'Claude Desktop MCP Config Maker & Generator | Nadhebe',
    seoDesc: 'Easily connect local MCP servers to Claude Desktop. Generates absolute paths and env vars for Mac and Windows.',
    seoKeywords: '["claude desktop mcp config maker", "add mcp to claude desktop config", "claude_desktop_config.json generator"]'
  },
  'mcp-inspector': {
    slug: 'mcp-json-rpc-payload-tester',
    title: 'MCP Payload Simulator & Validator',
    name: 'MCP Payload Validator',
    description: 'Mock MCP clients by validating raw JSON-RPC responses against the official Model Context Protocol spec.',
    seoTitle: 'MCP JSON-RPC Payload Tester & Validator | Nadhebe',
    seoDesc: 'Debug your MCP server. Paste raw JSON-RPC payloads to validate them against strict Model Context Protocol schemas.',
    seoKeywords: '["mcp json rpc payload tester", "debug mcp server json rpc", "validate mcp json response"]'
  },

  // Phase 4
  'system-prompt-linter': {
    slug: 'system-prompt-linter-best-practices',
    title: 'System Prompt Linter & Guardrail Checker',
    name: 'System Prompt Linter',
    description: 'Analyze prompts against strict engineering rubrics to flag injection vulnerabilities and weak constraints.',
    seoTitle: 'System Prompt Linter & Best Practices Checker | Nadhebe',
    seoDesc: 'Grade and lint your LLM system prompts. Check for security vulnerabilities, XML tag pairing, and weak formatting directives.',
    seoKeywords: '["system prompt linter best practices", "evaluate system prompt security", "llm prompt guardrail checker"]'
  },
  'prompt-template-builder': {
    slug: 'prompt-template-variable-tester',
    title: 'Dynamic Prompt Template Builder',
    name: 'Prompt Template Builder',
    description: 'Visually highlight {{variables}} and inject test data to preview compiled prompts instantly.',
    seoTitle: 'Prompt Template Variable Tester | Nadhebe',
    seoDesc: 'Build complex prompts with Handlebars/Jinja syntax. Inject test variables to preview the final compiled prompt output.',
    seoKeywords: '["prompt template variable tester", "jinja handlebars prompt tester", "dynamic prompt compiler online"]'
  },
  'few-shot-formatter': {
    slug: 'few-shot-prompt-formatter',
    title: 'Few-Shot Dataset Formatter',
    name: 'Few-Shot Formatter',
    description: 'Convert CSV/JSON tables into perfectly formatted User/Assistant dialogue trees or XML examples.',
    seoTitle: 'Few-Shot Prompt Formatter from CSV | Nadhebe',
    seoDesc: 'Easily build few-shot prompting examples by converting CSV or JSON arrays into structured dialogue trees or XML blocks.',
    seoKeywords: '["few shot prompt formatter", "convert csv to few shot prompt", "generate llm examples from table"]'
  },
  'role-prompt-builder': {
    slug: 'ai-persona-prompt-generator',
    title: 'Expert Persona Generator',
    name: 'Persona Prompt Generator',
    description: 'A step-by-step wizard to generate robust, production-ready system persona prompts with constraints and formatting.',
    seoTitle: 'AI Persona & Role Prompt Generator | Nadhebe',
    seoDesc: 'Generate massive, production-ready system prompts by defining persona depth, audience, constraints, and tone.',
    seoKeywords: '["ai persona prompt generator", "create expert ai system prompt", "role prompting tool"]'
  },

  // Phase 5
  'openapi-starter': {
    slug: 'openapi-3-yaml-generator',
    title: 'OpenAPI Boilerplate Generator',
    name: 'OpenAPI Generator',
    description: 'Scaffold OpenAPI 3.1 specs rapidly. Generate interactive Swagger-like previews as you type.',
    seoTitle: 'OpenAPI 3.1 YAML Generator & Previewer | Nadhebe',
    seoDesc: 'Create OpenAPI specifications with a visual UI. Get instant YAML outputs and Swagger-like interactive previews.',
    seoKeywords: '["openapi 3 yaml generator", "scaffold openapi yaml spec", "visual openapi builder online"]'
  },
  'http-status-reference': { // Note: Might be missing in array, we'll try to find or create
    slug: 'http-status-codes-cheat-sheet',
    title: 'Interactive HTTP Status Explorer',
    name: 'HTTP Status Cheat Sheet',
    description: 'A searchable index of HTTP status codes, complete with code snippets for Express and FastAPI.',
    seoTitle: 'HTTP Status Codes Cheat Sheet & Flowchart | Nadhebe',
    seoDesc: 'Quickly find the right HTTP status code. Includes decision flowcharts and copy-pasteable error handling snippets.',
    seoKeywords: '["http status codes cheat sheet", "what does http 422 mean", "http error codes flowchart"]'
  },
  'api-error-formatter': {
    slug: 'rfc-7807-error-json-generator',
    title: 'RFC 7807 Problem Details Formatter',
    name: 'RFC 7807 Error Formatter',
    description: 'Generate standardized API error blocks enforcing strict RFC 7807 schema structures.',
    seoTitle: 'RFC 7807 Error JSON Generator | Nadhebe',
    seoDesc: 'Format your API error responses using the strict RFC 7807 Problem Details specification. Instant JSON preview.',
    seoKeywords: '["rfc 7807 error json generator", "standard api error json format", "problem details for http apis tool"]'
  },
  'webhook-tester': {
    slug: 'webhook-payload-signature-generator',
    title: 'Webhook Payload & Signature Tester',
    name: 'Webhook Signature Generator',
    description: 'Generate massive JSON payloads and cryptographic HMAC headers for testing Stripe, GitHub, and Shopify webhooks.',
    seoTitle: 'Webhook Payload & HMAC Signature Generator | Nadhebe',
    seoDesc: 'Simulate webhooks locally. Generate payloads and cryptographic signatures (Stripe-Signature, GitHub) to test your endpoints.',
    seoKeywords: '["webhook payload signature generator", "simulate stripe github webhook", "test hmac webhook locally"]'
  }
};

let modifiedCount = 0;

for (const [oldSlug, details] of Object.entries(updates)) {
  const blockRegex = new RegExp(`(\\"slug\\"\\s*:\\s*\\"${oldSlug}\\"[\\s\\S]*?\\})`, 'g');
  
  content = content.replace(blockRegex, (match) => {
    // Modify the block
    let newBlock = match;
    newBlock = newBlock.replace(/"slug":\s*"[^"]+"/, `"slug": "${details.slug}"`);
    newBlock = newBlock.replace(/"title":\s*"[^"]+"/, `"title": "${details.title}"`);
    newBlock = newBlock.replace(/"name":\s*"[^"]+"/, `"name": "${details.name}"`);
    newBlock = newBlock.replace(/"description":\s*"[^"]+"/, `"description": "${details.description}"`);
    newBlock = newBlock.replace(/"href":\s*"[^"]+"/, `"href": "/tools/${details.slug}/"`);
    
    // SEO block replacement (simple)
    newBlock = newBlock.replace(/"seo":\s*\{[\s\S]*?\}/, `"seo": {
      "title": "${details.seoTitle}",
      "description": "${details.seoDesc}",
      "keywords": ${details.seoKeywords}
    }`);

    // If changing to 'implemented', wait, the user instructions say 'scaffolding' so we might want to change it so we can test the new slugs. But for now, let's keep them 'planned' until we implement the UI, or change to 'implemented' as we go? Let's just do 'implemented' so the app routes them.
    // ACTUALLY, if we change to implemented, it will look for the component. We should keep it 'planned' for now or we will break the registry if the component file doesn't exist.
    // We will leave status alone here, we'll change it as we implement each.

    modifiedCount++;
    return newBlock;
  });
}

fs.writeFileSync(registryPath, content);
console.log(`Updated ${modifiedCount} tools in registry.`);
