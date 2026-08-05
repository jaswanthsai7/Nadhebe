const fs = require('fs');
const path = require('path');

const mcpTesterPath = path.join(__dirname, '../src/pages/tools/mcp-json-rpc-payload-tester.astro');
if (fs.existsSync(mcpTesterPath)) {
  let content = fs.readFileSync(mcpTesterPath, 'utf-8');
  content = content.replace('{ "jsonrpc": "2.0", "id": 1, "method": "ping" }', '');
  fs.writeFileSync(mcpTesterPath, content);
}

const ptTesterPath = path.join(__dirname, '../src/pages/tools/prompt-template-variable-tester.astro');
if (fs.existsSync(ptTesterPath)) {
  let content = fs.readFileSync(ptTesterPath, 'utf-8');
  content = content.replace('{{name}}', '{`{{name}}`}').replace('{{data}}', '{`{{data}}`}');
  fs.writeFileSync(ptTesterPath, content);
}

const webhookPath = path.join(__dirname, '../src/pages/tools/webhook-payload-signature-generator.astro');
if (fs.existsSync(webhookPath)) {
  let content = fs.readFileSync(webhookPath, 'utf-8');
  content = content.replace('{ "id": "evt_123", "type": "payment_intent.succeeded" }', '{"{ \\"id\\": \\"evt_123\\", \\"type\\": \\"payment_intent.succeeded\\" }"}');
  fs.writeFileSync(webhookPath, content);
}
