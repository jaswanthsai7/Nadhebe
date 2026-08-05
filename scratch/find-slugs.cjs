const fs = require('fs');
const content = fs.readFileSync('src/config/tools-registry.ts', 'utf-8');

const regex = /"slug":\s*"([^"]+)"/g;
let match;
const matches = [];
while ((match = regex.exec(content)) !== null) {
  matches.push(match[1]);
}

const targets = ['cost', 'model', 'token', 'context', 'prompt', 'mcp', 'openapi', 'http', 'webhook', 'role', 'few-shot', 'chunk', 'rate-limit', 'api'];
const found = matches.filter(s => targets.some(t => s.includes(t)));
console.log(found.join('\n'));
