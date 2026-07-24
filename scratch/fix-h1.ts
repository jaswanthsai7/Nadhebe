import fs from 'fs';
import path from 'path';

const contentDir = 'src/content';
const collections = fs.readdirSync(contentDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'authors')
  .map(d => d.name);

const filesFixed: string[] = [];

collections.forEach(col => {
  const colPath = path.join(contentDir, col);
  const files = fs.readdirSync(colPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  files.forEach(f => {
    const filePath = path.join(colPath, f);
    let raw = fs.readFileSync(filePath, 'utf8');
    const parts = raw.split(/^---$/m);
    if (parts.length >= 3) {
      let frontmatter = parts[1];
      let body = parts.slice(2).join('---');

      // Check if body starts with or contains an # H1 heading
      if (/^#\s+/m.test(body)) {
        // Convert top-level # headings to ## H2 headings, or remove if it duplicates title
        body = body.replace(/^#\s+([^\r\n]+)/gm, (match, title) => {
          return `## ${title}`;
        });
        const newRaw = `---${frontmatter}---${body}`;
        fs.writeFileSync(filePath, newRaw, 'utf8');
        filesFixed.push(`${col}/${f}`);
      }
    }
  });
});

console.log('FILES FIXED (REMOVED DUPLICATE H1 IN BODY):', filesFixed.length, filesFixed);
