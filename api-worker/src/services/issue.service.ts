import { SubmitReviewInput } from '../domain/issue';
import { DomainError } from '../domain/errors';

export class IssueService {
  static async createIssue(input: SubmitReviewInput, env: any): Promise<{ issueNumber: number; url: string }> {
    const owner = env.GITHUB_OWNER || 'jaswanthsai7';
    const repo = env.GITHUB_REPO || 'Nadhebe';
    const token = env.GITHUB_TOKEN;

    // Check if token is missing
    if (!token) {
      console.warn('GITHUB_TOKEN environment variable is missing. Simulating mock GitHub issue creation.');
      return {
        issueNumber: Math.floor(Math.random() * 1000) + 1,
        url: `https://github.com/${owner}/${repo}/issues/mock`
      };
    }

    // Format the issue body with YAML frontmatter + content bundle
    const yamlFrontmatter = `---
version: 1
bundleVersion: 1
title: ${JSON.stringify(input.title)}
slug: ${JSON.stringify(input.slug)}
category: ${JSON.stringify(input.category)}
status: "pending-review"
sourceUrl: ${JSON.stringify(input.sourceUrl)}
author: ${JSON.stringify(input.author)}
createdAt: "${new Date().toISOString()}"
computedMetrics:
  wordCount: ${input.computedMetrics.wordCount}
  readingTime: ${input.computedMetrics.readingTime}
  headingStructureOk: ${input.computedMetrics.headingStructureOk}
aiInsights:
  confidence: ${input.aiInsights.confidence}
  factCheckSummary: ${JSON.stringify(input.aiInsights.factCheckSummary)}
bundle:
  newsletter: ${JSON.stringify(input.bundle?.newsletter || '')}
  twitterThread: ${JSON.stringify(input.bundle?.twitterThread || [])}
  linkedInPost: ${JSON.stringify(input.bundle?.linkedInPost || '')}
---

${input.markdown}`;

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'AI-Editorial-OS/1.0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `Submission: ${input.title}`,
          body: yamlFrontmatter,
          labels: ['pending-review', input.category]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitHub API returned status ${response.status}: ${errorText}`);
      }

      const data: any = await response.json();
      return {
        issueNumber: data.number,
        url: data.html_url
      };
    } catch (err: any) {
      throw new DomainError('GITHUB_SUBMISSION_FAILED', `Failed to create issue on GitHub: ${err.message}`, err);
    }
  }
}
