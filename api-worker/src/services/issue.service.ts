import { SubmitReviewInput } from '../domain/issue';
import { DomainError } from '../domain/errors';

export class IssueService {
  static async createPullRequest(
    input: SubmitReviewInput,
    env: any,
    requestId?: string
  ): Promise<{ prNumber: number; url: string; branchName: string; commitSha: string; requestId: string }> {
    const owner = env.GITHUB_OWNER || 'jaswanthsai7';
    const repo = env.GITHUB_REPO || 'Nadhebe';
    const token = env.GITHUB_TOKEN;
    const baseBranch = env.GITHUB_BRANCH || 'master';
    const reqId = requestId || 'unknown';

    // Sanitize slug and branch name
    const sanitizedSlug = input.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const timestamp = new Date().toISOString()
      .replace(/[-:T]/g, '')
      .slice(0, 12); // e.g. 202607181530
    
    const branchName = `content/${sanitizedSlug}-${timestamp}`;

    // Verify category and resolve directory destination (Path traversal defense)
    const allowedCategories = [
      'news',
      'tutorials',
      'youtube-articles',
      'tool-reviews',
      'prompts',
      'comparisons',
      'best-practices',
      'use-cases',
      'tools',
      'guides',
      'frameworks',
      'case-studies'
    ];
    
    const category = input.category.toLowerCase().trim();
    if (!allowedCategories.includes(category)) {
      throw new DomainError('INVALID_CATEGORY', `The category "${category}" is not in the allowed list`);
    }

    let filePath = `src/content/${category}/${sanitizedSlug}.md`;

    // 1. Mock Mode Check
    if (!token) {
      console.warn('GITHUB_TOKEN environment variable is missing. Simulating mock GitHub PR creation.');
      return {
        prNumber: Math.floor(Math.random() * 1000) + 1,
        url: `https://github.com/${owner}/${repo}/pull/mock`,
        branchName,
        commitSha: 'mock_commit_sha_abcdef1234567890',
        requestId: reqId
      };
    }

    try {
      console.log(`[${reqId}] Starting GitHub PR submission pipeline...`);

      // 2. Check if the file already exists on master to prevent overwrites
      let finalFilePath = filePath;
      let finalSlug = sanitizedSlug;
      let exists = true;
      let suffix = 0;

      while (exists && suffix < 10) {
        const checkPath = suffix === 0 ? filePath : `src/content/${category}/${sanitizedSlug}-${suffix}.md`;
        const checkRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${checkPath}?ref=${baseBranch}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'AI-Editorial-OS/1.0'
          }
        });

        if (checkRes.status === 404) {
          finalFilePath = checkPath;
          finalSlug = suffix === 0 ? sanitizedSlug : `${sanitizedSlug}-${suffix}`;
          exists = false;
        } else {
          suffix++;
        }
      }

      // 3. Get master branch latest commit SHA
      console.log(`[${reqId}] Fetching master branch reference...`);
      const refRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${baseBranch}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'AI-Editorial-OS/1.0'
        }
      });

      if (!refRes.ok) {
        const errText = await refRes.text();
        throw new DomainError('GITHUB_SUBMISSION_FAILED', `Failed to fetch base branch ref: ${errText}`);
      }

      const refData: any = await refRes.json();
      const baseSha = refData.object.sha;

      // 4. Create new Git branch
      console.log(`[${reqId}] Creating new branch "${branchName}"...`);
      const branchRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'AI-Editorial-OS/1.0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ref: `refs/heads/${branchName}`,
          sha: baseSha
        })
      });

      if (!branchRes.ok) {
        const errText = await branchRes.text();
        throw new DomainError('GITHUB_SUBMISSION_FAILED', `Failed to create branch "${branchName}": ${errText}`);
      }

      // 5. Commit markdown file to the branch
      console.log(`[${reqId}] Committing file to path "${finalFilePath}"...`);
      const contentBase64 = btoa(unescape(encodeURIComponent(input.markdown)));

      const commitRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${finalFilePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'AI-Editorial-OS/1.0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `content: add generated draft for ${input.title}`,
          content: contentBase64,
          branch: branchName
        })
      });

      if (!commitRes.ok) {
        const errText = await commitRes.text();
        throw new DomainError('GITHUB_SUBMISSION_FAILED', `Failed to commit markdown file: ${errText}`);
      }

      const commitData: any = await commitRes.json();
      const commitSha = commitData.commit.sha;
      console.log(`[${reqId}] Successfully committed file. SHA: ${commitSha}`);

      // 6. Open Draft Pull Request
      console.log(`[${reqId}] Creating Draft Pull Request...`);
      const prBody = `## 📖 Contributed Article: [${input.title}](${input.sourceUrl})

An AI-generated draft has been successfully submitted and committed to this branch.

### 🛠️ Execution Details
*   **Request ID**: \`${reqId}\`
*   **Source URL**: [View original source](${input.sourceUrl})
*   **Contributor**: **${input.author}**
*   **Generation Time**: \`${new Date().toLocaleString()}\`
*   **AI Model**: \`@cf/meta/llama-3.2-3b-instruct\`

### 📂 Generated Files
*   \`${finalFilePath}\`

### 📊 Validation Results
*   **Word Count**: \`${input.computedMetrics.wordCount}\` words
*   **Reading Time**: \`${input.computedMetrics.readingTime}\` mins
*   **Heading Structure**: \`${input.computedMetrics.headingStructureOk ? 'Valid H1 Present ✓' : 'Invalid ✗'}\`

### 📝 Review Checklist
- [ ] Editorial review
- [ ] SEO review
- [ ] Fact check
- [ ] Images verified
- [ ] Ready to merge`;

      const prRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'AI-Editorial-OS/1.0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `[Content] ${input.title}`,
          body: prBody,
          head: branchName,
          base: baseBranch,
          draft: true
        })
      });

      if (!prRes.ok) {
        const errText = await prRes.text();
        throw new DomainError('GITHUB_SUBMISSION_FAILED', `Failed to create draft Pull Request: ${errText}`);
      }

      const prData: any = await prRes.json();
      const prNumber = prData.number;
      const url = prData.html_url;
      console.log(`[${reqId}] Successfully created Draft Pull Request #${prNumber}. URL: ${url}`);

      return {
        prNumber,
        url,
        branchName,
        commitSha,
        requestId: reqId
      };
    } catch (err: any) {
      if (err instanceof DomainError) throw err;
      throw new DomainError('GITHUB_SUBMISSION_FAILED', `Failed to complete GitHub operations: ${err.message}`, err);
    }
  }
}
