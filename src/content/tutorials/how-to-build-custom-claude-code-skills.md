---
title: "How to Build Custom Claude Code Skills & Subagents (Developer Guide)"
description: "A step-by-step tutorial on authoring custom skills, slash commands, and subagents for Claude Code CLI using SKILL.md, AGENT.md, and the Claude Agent SDK."
pubDate: 2026-07-25
author: bob-smith
category: Tutorials
tags: ["claude", "cli", "custom-skills", "subagents", "claude-agent-sdk", "anthropic"]
heroImage: "/images/claude-skills-hero.png"
heroAlt: "Minimalist technical diagram showing custom skill directory structure and slash command routing"
draft: false
topic: "Claude Code"
isPillar: true
keywords: ["claude code skills", "claude skills", "claude agent sdk", "claude code custom slash commands", "authoring claude subagents"]
searchIntent: "Step by step developer guide to authoring custom skills slash commands and subagents for Claude Code"
estimatedReadingTime: 12
faq:
  - question: "Where are custom Claude Code skills stored?"
    answer: "Project-level skills are stored in '.claude/skills/<skill-name>/SKILL.md', while personal user-level skills reside in '~/.claude/skills/<skill-name>/SKILL.md'."
  - question: "What is the difference between a Custom Skill and a Custom Subagent?"
    answer: "A Skill defines a reusable prompt workflow triggered via a custom slash command (e.g. '/deploy'), while a Subagent is a specialized AI persona with dedicated model settings and tool restrictions."
  - question: "How do dynamic argument variables work in SKILL.md files?"
    answer: "Dynamic arguments passed in slash commands are accessed via '$0', '$1', '$2' placeholders inside the SKILL.md prompt body."
sources:
  - label: "Official Claude Code Skills & Custom Commands Specification"
    url: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview"
  - label: "Anthropic Claude Agent SDK Documentation"
    url: "https://github.com/anthropic/claude-code"
---

Anthropic's **Claude Code** CLI allows developers to extend its agentic capabilities through **Custom Skills** (reusable slash commands) and **Custom Subagents** (specialized AI personas). Instead of typing long, complex prompts repeatedly, you can package prompt engineering templates, multi-step workflows, and tool execution boundaries into structured markdown files (`SKILL.md` and `AGENT.md`).

This step-by-step developer tutorial covers how to author, test, register, and share custom skills and subagents using local directory conventions and the **Claude Agent SDK**.

---

## Directory Hierarchy & Scope Resolution

Claude Code resolves custom skills and subagents across two primary scopes:

```text
Directory Structure:
├── .claude/                             # Project Level (Committed to Git - Team Shared)
│   ├── skills/                          # Custom Slash Commands
│   │   ├── deploy/
│   │   │   └── SKILL.md                 # Triggers via /deploy
│   │   └── refactor-db/
│   │       └── SKILL.md                 # Triggers via /refactor-db
│   └── agents/                          # Custom Subagent Personas
│       └── security-auditor/
│           └── AGENT.md                 # Invoked via @security-auditor or --agent
└── ~/.claude/                           # Global User Level (Personal - All Projects)
    ├── skills/
    └── agents/
```

---

## Step 1: Authoring a Custom Skill (`SKILL.md`)

A Custom Skill defines a structured prompt template that registers as a slash command inside interactive Claude Code sessions.

### Creating Your First Skill File

Create `.claude/skills/code-audit/SKILL.md` in your repository:

```bash
mkdir -p .claude/skills/code-audit
```

Add the skill specification:

```markdown
---
name: code-audit
description: Audits modified files for performance bottlenecks, TypeScript errors, and OWASP security risks
argument-hint: "[target-directory]"
user-invocable: true
---

Execute a comprehensive technical code audit on $0 (default: `src/`).

### Inspection Steps:
1. **Type & Lint Validation:** Run `npm run typecheck` and inspect stdout for strict mode errors.
2. **Security Audit:** Scan all files in $0 for unauthenticated endpoints, SQL injection vectors, and hardcoded API keys.
3. **Performance Optimization:** Check for N+1 query patterns and unindexed database queries.
4. **Summary Report:** Output a structured markdown table categorizing findings into Critical, Warning, and Info tiers.
```

### Argument Variable Parsing (`$0`, `$1`, `$2`)

Inside `SKILL.md` prompt bodies, argument placeholders dynamically capture parameters passed by the user:

* **`$0`**: Captures the entire raw argument string passed after the command.
* **`$1`**, **`$2`**: Captures whitespace-delimited individual parameters.

### Invoking Your Custom Skill

Launch Claude Code in your project root and invoke the new command:

```bash
claude
/code-audit src/api/v1/
```

---

## Step 2: Authoring a Custom Subagent (`AGENT.md`)

Custom Subagents are specialized AI worker personas configured with specific model targets (`sonnet` vs `opus`), custom system directives, and restricted toolsets.

### Creating a Custom Subagent File

Create `.claude/agents/reviewer/AGENT.md`:

```bash
mkdir -p .claude/agents/reviewer
```

Add the subagent configuration:

```markdown
---
name: reviewer
description: Senior Code Reviewer Subagent. Audits pull requests and git diffs.
tools: Read, Grep, Glob, Bash
model: sonnet
---

You are a Senior Technical Code Reviewer. When reviewing changes:
- Focus exclusively on correctness, edge case handling, and unit test coverage.
- Enforce strict adherence to conventions defined in the root `CLAUDE.md`.
- Flag any missing error handling wrappers in async functions.
```

### Invoking Subagents Programmatically

```bash
# Invoke interactively in terminal
@reviewer Audit the uncommitted git diff in src/auth/

# Select agent for headless CI/CD execution
claude --agent reviewer -p "Review latest commit"
```

---

## Step 3: Programmatic Automation via Claude Agent SDK

For advanced workflows, developers can control Claude Code agents programmatically using the **Claude Agent SDK** in TypeScript or Python.

### TypeScript SDK Example

Install the SDK:

```bash
npm install @anthropic-ai/claude-agent-sdk
```

Create `scripts/run-agent-review.ts`:

```typescript
import { ClaudeAgent } from '@anthropic-ai/claude-agent-sdk';

async function executeAutomatedReview() {
  const agent = new ClaudeAgent({
    model: 'claude-3-7-sonnet-20250219',
    workingDirectory: process.cwd(),
    allowedTools: ['Read', 'Grep', 'Glob', 'Bash(npm test)'],
    maxTurns: 5
  });

  const response = await agent.execute({
    prompt: 'Run unit tests and analyze any failing assertions in tests/auth.test.ts'
  });

  console.log('Agent Execution Summary:', response.output);
}

executeAutomatedReview();
```

---

## Related Guides & Workflows

* For complete CLI cheat sheets, read [Claude Code Cheat Sheet](/tutorials/claude-code-cheat-sheet-commands-shortcuts).
* For desktop agentic setup, see [Claude Desktop Download & Setup Guide](/tutorials/claude-desktop-download-installation-guide).
* For architecture analysis, explore [Inside Claude Code Agent Loop Architecture](/guides/claude-code-agent-loop-architecture).
