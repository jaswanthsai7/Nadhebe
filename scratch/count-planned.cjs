const fs = require('fs');
const content = fs.readFileSync('src/config/tools-registry.ts', 'utf-8');

const regex = /"slug":\s*"([^"]+)",[\s\S]*?"status":\s*"planned"/g;
let count = 0;
let match;
const tools = [];

while ((match = regex.exec(content)) !== null) {
  count++;
  tools.push(match[1]);
}

console.log('Total "planned" (In Development) tools:', count);
console.log('List of tools:');
tools.forEach(t => console.log('- ' + t));
