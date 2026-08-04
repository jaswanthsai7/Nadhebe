---
title: "Claude Code Hooks Mastery: Automating PreToolUse, Guardrails, and Lifecycle Events"
description: "A complete guide to configuring synchronous shell hooks in settings.json, enforcing exit code 2 guardrails, and intercepting dangerous tool calls in Claude Code."
pubDate: 2026-08-03
author: nadhebe-team
category: "tutorials"
tags: ["Claude Code", "Hooks", "PreToolUse", "Guardrails", "settings.json", "Anthropic"]
heroImage: "/images/claude-code-hooks-mastery-hero.webp"
heroAlt: "Minimalist vintage editorial illustration showing synchronous shell hooks intercepting dangerous tool calls on soft sage green"
estimatedReadingTime: 14
isPillar: false
topic: "Claude Code Hooks"
searchIntent: "tutorial"
draft: false
faq:
  - question: "What is the primary difference between a prompt rule and a Claude Code hook?"
    answer: "Prompt rules guide model decision-making probabilistically inside the context window, whereas hooks execute synchronous shell scripts deterministically outside the context window."
  - question: "How does a PreToolUse hook halt execution when a dangerous command is detected?"
    answer: "A script assigned to `PreToolUse` inspects incoming operation payload JSON via stdin and exits with code 2, forcing Claude Code to cancel the tool call and re-evaluate."
  - question: "How do global settings.json configurations interact with project-level hooks?"
    answer: "Global hooks stored in user home directories are implicitly trusted, whereas repository-level settings require explicit developer approval upon initial session launch."
sources:
  - label: "Anthropic Claude Code Hooks Guide"
    url: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code"
---

# Claude Code Hooks Mastery: Automating PreToolUse, Guardrails, and Lifecycle Events

Anthropic's introduction of **deterministic execution hooks** within Claude Code has redefined how software engineering teams enforce security governance over autonomous coding agents.

While prompt instructions inside `CLAUDE.md` shape model behavior probabilistically, enterprise safety requires guaranteed mechanics. Lifecycle hooks operate **synchronously outside the language model's context window**, allowing engineers to execute local shell scripts at specific lifecycle events (`SessionStart`, `PreToolUse`, `PostToolUse`, and `Stop`).

---

## The Lifecycle Pipeline: Deterministic Hooks vs Context Guidance

```
                    CLAUDE CODE TOOL EXECUTION PIPELINE
 ┌─────────────────────────────┐           ┌─────────────────────────────┐
 │ Agent Proposes Tool Call    │           │ PreToolUse Synchronous Hook │
 │ (e.g. `Bash(rm -rf /)`)     │ ────────► │ (Inspects Stdin Payload JSON)│
 └─────────────────────────────┘           └──────────────┬──────────────┘
                                                          │
                                ┌─────────────────────────┴─────────────────────────┐
                                ▼                                                   ▼
                     [Exit Code 0: APPROVED]                             [Exit Code 2: BLOCKED]
                                │                                                   │
                                ▼                                                   ▼
                    ┌───────────────────────┐                           ┌───────────────────────┐
                    │ Executes Tool Action  │                           │ Halts Operation       │
                    │ & Runs `PostToolUse`  │                           │ & Notifies Agent      │
                    └───────────────────────┘                           └───────────────────────┘
```

---

## 1. Configuring `PreToolUse` Hooks in `settings.json`

Define project-level or global lifecycle hooks inside `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "node .claude/hooks/guardrail-bash.js"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "FileWrite",
        "command": "npx prettier --write \"$CLAUDE_FILE_PATH\""
      }
    ]
  }
}
```

---

## 2. Enforcing Exit Code 2 Guardrails (`guardrail-bash.js`)

Here is a production-grade Node.js guardrail script (`.claude/hooks/guardrail-bash.js`) that reads incoming tool call JSON via `stdin` and **exits with code 2** to block destructive operations:

```javascript
#!/usr/bin/env node
const fs = require('fs');

// Read Tool Operation Payload from stdin
const inputJson = fs.readFileSync(0, 'utf-8');

try {
  const payload = JSON.parse(inputJson);
  const command = payload.tool_input?.command || '';

  // Dangerous Commands Blacklist
  const dangerousPatterns = [
    /rm\s+-rf/,
    /git\s+push\s+--force/,
    /DROP\s+TABLE/i,
    /env|process\.env/
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(command)) {
      console.error(`❌ BLOCKED BY GUARDRAIL: Destructive command detected -> "${command}"`);
      // Exit Code 2 halts Claude Code tool execution deterministically
      process.exit(2);
    }
  }

  // Approved
  process.exit(0);
} catch (err) {
  process.exit(0);
}
```

---

## Summary & Enterprise Recommendations

1. **Use Exit Code 2**: Always exit with status code `2` in `PreToolUse` hook scripts to signal a hard security block to Claude Code.
2. **Auto-Format on `PostToolUse`**: Trigger linters (`eslint`, `prettier`) in `PostToolUse` after file writes to keep codebase formatting perfectly synchronized.
