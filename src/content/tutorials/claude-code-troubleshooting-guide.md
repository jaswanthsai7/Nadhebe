---
title: "Claude Code Troubleshooting Guide: Fixing OAuth Errors, Exit Code 2, and Rate Limits"
description: "A comprehensive troubleshooting guide resolving Claude Code CLI errors, including OAuth token refresh loops, exit code 2 script failures, and API rate limit freezes."
pubDate: 2026-08-03
author: nadhebe-team
category: "tutorials"
tags: ["Claude Code", "Troubleshooting", "Anthropic", "CLI Errors", "OAuth", "Hooks"]
heroImage: "/images/claude-code-troubleshooting-hero.webp"
heroAlt: "Vintage editorial illustration of terminal error logs, red alert badges, and fix checklists on a soft terracotta background"
estimatedReadingTime: 13
isPillar: true
topic: "Claude Code Deep Dives"
searchIntent: "tutorial"
draft: false
faq:
  - question: "Why does Claude Code return 'Exit Code 2' during tool execution?"
    answer: "Exit code 2 indicates that a synchronous PreToolUse hook script intercepted and blocked a dangerous or unapproved terminal command."
  - question: "How do I fix the 'Invalid OAuth Token' error in Claude Code CLI?"
    answer: "Run `claude logout` followed by `claude login` to clear cached tokens stored in `~/.claude/session.json`."
sources:
  - label: "Claude Code CLI Documentation"
    url: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code"
---

# Claude Code Troubleshooting Guide: Fixing OAuth Errors, Exit Code 2, and Rate Limits

Operating **Claude Code** inside complex development environments occasionally triggers runtime failures, API rate limits, or unexpected process freezes.

This guide provides tested, step-by-step solutions for resolving the **5 most common Claude Code CLI errors**.

---

## Troubleshooting Quick Reference Matrix

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                   CLAUDE CODE ERROR RESOLUTION FLOW                    │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  OAUTH / AUTH ERROR  │  │  EXIT CODE 2 HOOK    │  │  RATE LIMIT (429)    │
├──────────────────────┤  ├──────────────────────┤  ├──────────────────────┤
│ • Run `claude logout`│  │ • PreToolUse blocked │  │ • Compact session    │
│ • Clear session JSON │  │ • Inspect hook log   │  │ • Switch to API key  │
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

| Error Message | Root Cause | Immediate Fix |
| :--- | :--- | :--- |
| `Authentication failed: Invalid token` | Expired OAuth session token | Run `claude logout && claude login` |
| `Tool execution cancelled (Exit Code 2)`| PreToolUse guardrail blocked command | Check `.claude/settings.json` hook rules |
| `API Error 429: Rate Limit Exceeded` | Reached hourly Pro/Team request cap | Run `/compact` or set `ANTHROPIC_API_KEY` |
| `ENOSPC: System limit reached` | File watcher limit exceeded | Increase `fs.inotify.max_user_watches` |
| `Process hangs on git diff` | Giant lockfile diff (e.g., `package-lock.json`) | Add lockfiles to `.claudeignore` |

---

## 1. Resolving OAuth Token Expiration Loops

If the CLI continually prompts you to log in via browser:

```bash
# 1. Terminate active Claude processes
$ killall claude

# 2. Clear stored credentials file
$ rm -rf ~/.claude/session.json

# 3. Re-authenticate
$ claude login
```

---

## 2. Preventing Workspace Freezes with `.claudeignore`

Prevent Claude Code from attempting to parse giant minified assets or lockfiles by creating a root `.claudeignore` file:

```gitignore
node_modules/
dist/
.git/
package-lock.json
pnpm-lock.yaml
*.log
```
