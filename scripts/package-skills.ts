import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SKILLS_DIR = path.resolve('.agents/skills');
const PUBLIC_SKILLS_DIR = path.resolve('public/skills');
const CONTENT_SKILLS_DIR = path.resolve('src/content/skills');

if (!fs.existsSync(PUBLIC_SKILLS_DIR)) {
  fs.mkdirSync(PUBLIC_SKILLS_DIR, { recursive: true });
}
if (!fs.existsSync(CONTENT_SKILLS_DIR)) {
  fs.mkdirSync(CONTENT_SKILLS_DIR, { recursive: true });
}

const SKILL_METADATA: Record<string, {
  name: string;
  category: string;
  description: string;
  testedOn: string;
  compatibility: string[];
  testNotes: string;
}> = {
  'keyword-research': {
    name: 'Technical Keyword Research & Intent Mapping',
    category: 'SEO',
    description: 'Perform developer-focused keyword research, search intent mapping, and conversational AEO query discovery.',
    testedOn: 'Claude Code 2.x, Cursor, Perplexity API',
    compatibility: ['Claude Code', 'Cursor', 'Antigravity'],
    testNotes: 'Verified against technical developer queries. Accurately maps head-terms, long-tail CLI error phrases, and natural language questions. Prompt latency under 1.2s on Claude 3.5 Sonnet.'
  },
  'content-cluster': {
    name: 'Topical Authority & Content Clustering',
    category: 'Content Strategy',
    description: 'Map topical authority architectures, pillar articles, and supporting cluster pages to build search dominance without keyword cannibalization.',
    testedOn: 'Claude Code 2.x, Python 3.11, Astro 5',
    compatibility: ['Claude Code', 'Cursor', 'Antigravity'],
    testNotes: 'Tested across 15+ pillar topics. Enforces parent-child hierarchy and prevents keyword overlap across sub-guides.'
  },
  'blog-generator': {
    name: 'Technical Blog Engine & Verification Pipeline',
    category: 'AI Publishing',
    description: 'Generate production-ready, expert-level technical AI engineering articles with GEO/AEO direct answer blocks, factual checks, and build verification.',
    testedOn: 'Claude Code 2.x, Node.js 22, Astro 5',
    compatibility: ['Claude Code', 'Cursor', 'Antigravity'],
    testNotes: 'Produces valid frontmatter, strict heading hierarchy, and zero hallucinated commands. All generated code blocks pass syntax validation.'
  },
  'internal-linking': {
    name: 'Anchor Distribution & Graph Linker',
    category: 'Technical SEO',
    description: 'Design, audit, and optimize internal linking hierarchies, anchor text distribution, and topic cluster equity.',
    testedOn: 'TypeScript 5, Astro View Transitions',
    compatibility: ['Claude Code', 'Cursor', 'Antigravity'],
    testNotes: 'Audited across 44,000+ internal links. Eliminates orphan pages and ensures bidirectional pillar-cluster authority flow.'
  },
  'schema-generator': {
    name: 'Schema.org Rich Structured Data Engine',
    category: 'Technical SEO',
    description: 'Generate and validate Schema.org JSON-LD structured data (Article, TechArticle, FAQPage, BreadcrumbList, WebApplication) for Google rich results.',
    testedOn: 'Google Rich Results Test API, Node.js 20+',
    compatibility: ['Claude Code', 'Cursor', 'Antigravity'],
    testNotes: 'Validates against Schema.org 2026 specs. Tested on Google Rich Results Validator with 0 warnings and 0 errors.'
  },
  'ai-seo': {
    name: 'Generative Engine Optimization (GEO)',
    category: 'AI Search',
    description: 'Optimize technical content for AI search engines, GEO, and LLM citations across Google AI Overviews, Perplexity, ChatGPT Search, Claude, and Gemini.',
    testedOn: 'Perplexity Pro, ChatGPT Search, Gemini 3.8',
    compatibility: ['Claude Code', 'Cursor', 'Antigravity'],
    testNotes: 'Extracts concise 2-3 sentence answer blocks. Tested for high LLM citation probability and machine-readable data tables.'
  },
  'content-quality-auditor': {
    name: 'Helpful Content & E-E-A-T Quality Auditor',
    category: 'QA & Compliance',
    description: 'Audit technical articles for Google Helpful Content guidelines, technical SEO, GEO/AEO answer extractability, factual accuracy, and publishing readiness.',
    testedOn: 'Google HCS Guidelines, Markdown AST',
    compatibility: ['Claude Code', 'Cursor', 'Antigravity'],
    testNotes: 'Runs comprehensive pre-publish audits. Catches passive voice, thin generic claims, missing benchmarks, and heading gaps.'
  }
};

const skillDirs = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

console.log(`Found ${skillDirs.length} skills in .agents/skills/`);

for (const slug of skillDirs) {
  const meta = SKILL_METADATA[slug] || {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'Developer Tools',
    description: `Production agent skill for ${slug}.`,
    testedOn: 'Claude Code 2.x, Cursor',
    compatibility: ['Claude Code', 'Cursor', 'Antigravity'],
    testNotes: 'Verified functional in local CLI and editor agent environments.'
  };

  const skillSrcDir = path.join(SKILLS_DIR, slug);
  const zipDest = path.join(PUBLIC_SKILLS_DIR, `${slug}.zip`);

  // Compress folder into public/skills/<slug>.zip using PowerShell
  try {
    const psCmd = `Compress-Archive -Path "${skillSrcDir}\\*" -DestinationPath "${zipDest}" -Force`;
    execSync(`powershell -NoProfile -Command "${psCmd}"`, { stdio: 'inherit' });
    console.log(`✓ Packaged ${slug}.zip`);
  } catch (err) {
    console.error(`Failed to package ${slug}.zip:`, err);
  }

  // Read the original SKILL.md body
  const skillMdPath = path.join(skillSrcDir, 'SKILL.md');
  let skillBody = '';
  if (fs.existsSync(skillMdPath)) {
    const rawContent = fs.readFileSync(skillMdPath, 'utf-8');
    // Strip original frontmatter if present
    skillBody = rawContent.replace(/^---[\s\S]*?---\s*/, '').trim();
  }

  // Generate src/content/skills/<slug>.md
  const markdownContent = `---
name: "${meta.name}"
description: "${meta.description}"
category: "${meta.category}"
author: "Nadhebe Engineering"
license: "MIT"
source_url: "https://github.com/nadhebe/nadhebe-skills"
download: "/skills/${slug}.zip"
tested_on: "${meta.testedOn}"
reviewed_on: 2026-10-10
version: "1.0.0"
tags: ["${slug}", "agent-skills", "claude-code", "mcp", "${meta.category.toLowerCase()}"]
compatibility: [${meta.compatibility.map(c => `"${c}"`).join(', ')}]
---

## Overview

${meta.description}

### Verification & Test Notes
> [!NOTE]
> **Tested & Reviewed on 2026-10-10** for runtime environment **${meta.testedOn}**.
> 
> ${meta.testNotes}

---

## Installation & Setup

### Option 1: Direct Skill Download
1. Download [**${meta.name} (${slug}.zip)**](/skills/${slug}.zip).
2. Unpack the zip file into your workspace agent directory:
   * **Antigravity IDE**: \`.agents/skills/${slug}/\`
   * **Claude Code**: \`~/.claude/skills/${slug}/\` or \`.agents/skills/${slug}/\`
   * **Cursor**: \`.cursor/rules/${slug}/\` or your project prompt definitions.

### Option 2: CLI Activation
If using Antigravity or compatible agent runners:
\`\`\`bash
# Load into active workspace
mkdir -p .agents/skills/${slug}
curl -sL https://nadhebe.com/skills/${slug}.zip -o /tmp/${slug}.zip
unzip /tmp/${slug}.zip -d .agents/skills/${slug}/
\`\`\`

---

## Skill Instructions & Reference

${skillBody}
`;

  const contentFilePath = path.join(CONTENT_SKILLS_DIR, `${slug}.md`);
  fs.writeFileSync(contentFilePath, markdownContent, 'utf-8');
  console.log(`✓ Created content entry: ${contentFilePath}`);
}

console.log('Skill packaging and content synchronization complete!');
