---
title: "How to Install and Set Up Claude Code CLI (Step-by-Step Developer Guide)"
description: "The definitive cross-platform guide to installing, configuring, and authenticating Anthropic's Claude Code CLI tool across macOS, Linux, and Windows."
pubDate: 2026-07-25
author: bob-smith
category: Tutorials
tags: ["claude", "cli", "installation", "npm", "anthropic"]
heroImage: "/images/claude-cli-hero.jpg"
heroAlt: "Minimalist terminal installer schematic showing package manager nodes and clean CLI interface"
draft: false
topic: "Claude Code"
isPillar: true
searchIntent: "Step by step guide to install and configure Claude Code CLI on macOS Linux and Windows"
estimatedReadingTime: 6
faq:
  - question: "What command installs Claude Code CLI globally via npm?"
    answer: "Run npm install -g @anthropic-ai/claude-code in your terminal."
  - question: "Which Node.js versions are supported by Claude Code CLI?"
    answer: "Node.js v18.0.0 or higher is required."
sources:
  - label: "Official Claude Code CLI Documentation"
    url: "https://docs.anthropic.com"
  - label: "Anthropic Claude Code npm Package"
    url: "https://github.com/anthropic/claude-code"
---

Anthropic's **Claude Code** CLI brings conversational AI coding capabilities directly into your terminal workflow. This guide provides a clean, cross-platform installation walkthrough for macOS, Linux, and Windows developers.

## Installation Matrix

| Operating System | Recommended Package Manager | Verified Install Command |
| :--- | :--- | :--- |
| **macOS** | Homebrew or npm | `npm install -g @anthropic-ai/claude-code` |
| **Linux (Ubuntu/Debian)** | npm / nvm | `npm install -g @anthropic-ai/claude-code` |
| **Windows** | PowerShell / WSL2 | `npm install -g @anthropic-ai/claude-code` |

## Step 1: Verify Node.js Environment

Claude Code requires **Node.js 18+**. Verify your installed version:

```bash
node -v
```

If your version is below `v18.0.0`, update Node.js via **nvm** (Node Version Manager):

```bash
nvm install 20
nvm use 20
```

## Step 2: Global npm Package Installation

Run the global installation command:

```bash
npm install -g @anthropic-ai/claude-code
```

Confirm successful binary linking by checking the installed CLI version:

```bash
claude --version
```

## Step 3: API Key Authentication

Authenticate Claude Code by setting your `ANTHROPIC_API_KEY` environment variable:

### macOS / Linux (bash or zsh)
Add the key to your `~/.zshrc` or `~/.bashrc`:

```bash
export ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key-here"
source ~/.zshrc
```

### Windows (PowerShell)
```powershell
$env:ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key-here"
```

## Step 4: Launching Your First Claude Code Session

Navigate to any local software repository and initiate Claude Code:

```bash
cd ~/projects/my-awesome-app
claude
```

Upon initial launch, Claude Code indexes local workspace files and prompts for interactive permission approvals before running local shell commands.

## Image Asset Specifications

* **Hero Visual**:
  - **Prompt**: "Minimalist terminal installer schematic showing package manager nodes and clean CLI interface illustration, modern tech documentation style"
  - **Filename**: "claude-cli-hero.jpg"
  - **Alt text**: "Minimalist terminal installer schematic showing package manager nodes and clean CLI interface"
  - **Placement**: Hero header section

## Related Guides & Workflows

* For Windows-specific setup troubleshooting, see [How to Install and Run Claude Code CLI on Windows](/tutorials/installing-claude-code-cli-windows).
* For agent loop mechanics, read [Inside Claude Code Agent: Terminal Loop Architecture](/guides/claude-code-agent-loop-architecture).
