const fs = require('fs');

const registryPath = 'c:/Users/jasva/Nadhebe/src/config/tools-registry.ts';
const content = fs.readFileSync(registryPath, 'utf-8');

// Use a simple JSON-like parsing regex since it's a JS array of objects
// But the file contains `export const UNIFIED_TOOLS_REGISTRY: UnifiedTool[] = [ ... ];`
// We can parse the array directly using Function or eval, after stripping the export

const startIdx = content.indexOf('[');
const endIdx = content.lastIndexOf(']');
const arrayStr = content.substring(startIdx, endIdx + 1);

// We'll use a regex approach to be safer and avoid eval on a massive file
const tools = [];
const blocks = content.split('  {');

for (const block of blocks) {
  if (block.includes('"status": "planned"')) {
    const slugMatch = block.match(/"slug":\s*"([^"]+)"/);
    const categoryMatch = block.match(/"category":\s*"([^"]+)"/);
    if (slugMatch) {
      tools.push({
        slug: slugMatch[1],
        category: categoryMatch ? categoryMatch[1] : 'Unknown'
      });
    }
  }
}

const artifactPath = 'C:/Users/jasva/.gemini/antigravity-ide/brain/fb760a3a-6bc0-48c4-8d17-2b157d97a0c4/in_development_tools.md';
let md = fs.readFileSync(artifactPath, 'utf-8');

md += tools.map(t => `| ${t.slug} | ${t.category} |`).join('\n');
md += `\n\n**Total In Development Tools:** ${tools.length}\n`;

fs.writeFileSync(artifactPath, md);
console.log(`Successfully extracted ${tools.length} planned tools.`);
