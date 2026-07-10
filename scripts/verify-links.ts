import * as fs from 'fs';
import * as path from 'path';

// Parse all HTML files in dist/
const DIST_DIR = path.resolve('dist');

function getFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else if (filePath.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

function verifyLinks() {
  console.log('Running internal link audit...');
  const htmlFiles = getFiles(DIST_DIR);
  let hasErrors = false;
  let linksCheckedCount = 0;
  let brokenLinksCount = 0;

  htmlFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const relativeSrc = path.relative(DIST_DIR, file);

    // Extract anchor links href="..."
    const linkRegex = /href=["']([^"']+)["']/g;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const url = match[1];

      // Only check internal links
      if (
        url.startsWith('#') ||
        url.startsWith('mailto:') ||
        url.startsWith('tel:') ||
        url.includes('://') ||
        url.startsWith('javascript:')
      ) {
        continue;
      }

      linksCheckedCount++;

      // Clean hash from link
      const cleanUrl = url.split('#')[0];
      if (!cleanUrl) continue;

      let targetPath = '';

      if (cleanUrl.startsWith('/')) {
        // Absolute internal URL
        targetPath = path.join(DIST_DIR, cleanUrl);
      } else {
        // Relative internal URL
        targetPath = path.join(path.dirname(file), cleanUrl);
      }

      // Check if target is a file or directory with index.html
      const fileExists = fs.existsSync(targetPath);
      let indexExists = false;

      if (!fileExists) {
        // Try appending index.html (standard router mapping)
        const targetIndex = path.join(targetPath, 'index.html');
        indexExists = fs.existsSync(targetIndex);
      }

      if (!fileExists && !indexExists) {
        console.error(`\x1b[31mBroken Link:\x1b[0m in ${relativeSrc} -> points to: "${url}" (Resolved: ${path.relative(DIST_DIR, targetPath)})`);
        hasErrors = true;
        brokenLinksCount++;
      }
    }
  });

  console.log(`\nAudit completed: Checked ${linksCheckedCount} internal links across ${htmlFiles.length} pages.`);
  if (hasErrors) {
    console.error(`\x1b[31mAudit Failed: Found ${brokenLinksCount} broken internal links!\x1b[0m`);
    process.exit(1);
  } else {
    console.log('\x1b[32mAudit Passed: 0 broken links found.\x1b[0m');
  }
}

try {
  verifyLinks();
} catch (err) {
  console.error('Link validation error: ', err);
  process.exit(1);
}
