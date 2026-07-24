---
title: "How to Install and Run Claude Code CLI on Windows (PowerShell & WSL2 Guide)"
description: "A complete step-by-step tutorial for developers to install, configure, and troubleshoot Anthropic's Claude Code CLI tool on Windows using PowerShell and WSL2."
pubDate: 2026-07-25
author: alice-chen
category: Tutorials
tags: ["claude", "cli", "windows", "wsl2", "anthropic"]
heroImage: "/images/claude-windows-hero.jpg"
heroAlt: "Minimalist technical diagram showing terminal execution of Claude Code on Windows"
draft: false
topic: "Claude Code"
isPillar: false
searchIntent: "How to install and configure Claude Code CLI on Windows PowerShell and WSL2"
estimatedReadingTime: 7
faq:
  - question: "Does Claude Code CLI work natively on Windows PowerShell?"
    answer: "Yes, Claude Code CLI runs natively under Node.js on Windows PowerShell 7+, as well as inside Ubuntu WSL2 environments."
  - question: "How do I fix PowerShell script execution policy errors when installing Claude Code?"
    answer: "Run Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser in PowerShell before running npm global install scripts."
sources:
  - label: "Anthropic Claude Code CLI Documentation"
    url: "https://docs.anthropic.com"
  - label: "Anthropic Claude Code GitHub Repository"
    url: "https://github.com/anthropic/claude-code"
---

Anthropic's **Claude Code** CLI brings autonomous coding agent capabilities directly into your terminal. While installation on macOS and Linux is straightforward, running Claude Code on **Windows** requires specific configuration for Node.js environment paths, PowerShell execution policies, and environment variables.

This guide provides verified step-by-step instructions for running Claude Code natively on **Windows PowerShell** and within **WSL2 (Windows Subsystem for Linux)**.

## Executive Summary & Quick Start

| Component | Minimum Requirement | Verified Command |
| :--- | :--- | :--- |
| **Node.js Runtime** | Node.js v18.0.0 or higher | `node -v` |
| **Package Manager** | npm v9.0.0 or higher | `npm install -g @anthropic-ai/claude-code` |
| **Windows Shell** | PowerShell 7+ or WSL2 Ubuntu | `claude` |
| **API Authentication** | Anthropic Console API Key | `$env:ANTHROPIC_API_KEY="sk-ant-..."` |

## Prerequisites for Windows Installation

Before running the installation command, verify your environment satisfies these prerequisites:

1. **Install Node.js 18+:** Download the LTS installer from Nodejs.org and ensure `Add to PATH` is checked during installation.
2. **Verify Node & npm:** Open a new PowerShell window and run:
   ```powershell
   node -v
   npm -v
   ```
3. **Configure Execution Policy:** By default, Windows blocks global npm scripts. Unblock them by executing:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

## Step 1: Installing Claude Code via Global npm

Open PowerShell (or Windows Terminal) as an administrator or current user and install the global package:

```powershell
npm install -g @anthropic-ai/claude-code
```

Verify that the CLI binary was linked into your global AppData path:

```powershell
claude --version
```

## Step 2: Configuring API Key Environment Variables

Claude Code requires an active Anthropic API key. Set the variable permanently in Windows PowerShell:

```powershell
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'sk-ant-api03-your-actual-key-here', 'User')
```

Restart your terminal window to reload the new environment variable, then verify it:

```powershell
$env:ANTHROPIC_API_KEY
```

## Step 3: Launching Claude Code in a Windows Workspace

Navigate to your target project folder in PowerShell and launch the agent:

```powershell
cd C:\Users\yourname\projects\my-app
claude
```

Upon first launch, Claude Code initializes its workspace index and prompts for interactive permission approvals before editing files or running terminal commands.

## Step 4: Alternative Setup via WSL2 (Recommended for Unix Compatibility)

If your project relies on Linux build scripts or bash tooling, installing inside **WSL2** is recommended:

```bash
# Inside WSL2 Ubuntu terminal
sudo apt update && sudo apt install -y nodejs npm
sudo npm install -g @anthropic-ai/claude-code
export ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key-here"
claude
```

## Troubleshooting Common Windows Errors

### 1. The term 'claude' is not recognized
This occurs when your npm global binaries directory is missing from your Windows PATH variable. Add `%AppData%\npm` to your User Environment Variables PATH.

### 2. EACCES: permission denied
Run PowerShell as Administrator once to complete global package extraction, or configure an isolated npm prefix:
```powershell
npm config set prefix "$env:LOCALAPPDATA\npm-global"
```

## Image Asset Specifications

* **Hero Visual**:
  - **Prompt**: "Minimalist technical illustration of terminal shell window with pastel blue and dark grey code lines on clean white background, developer tools editorial style"
  - **Filename**: "claude-windows-hero.jpg"
  - **Alt text**: "Minimalist technical diagram showing terminal execution of Claude Code on Windows"
  - **Placement**: Hero header section

## Related Guides & Workflows

* For general cross-platform installation steps, see [How to Install and Set Up Claude Code CLI](/tutorials/how-to-install-claude-code-cli).
* For agent loop mechanics and security permissions, read [Inside Claude Code Agent: Terminal Loop Architecture](/guides/claude-code-agent-loop-architecture).
* For GPU inference engine alternatives, see [vLLM vs SGLang vs TGI Inference Engine Comparison](/comparisons/vllm-vs-sglang-vs-tgi-inference-engine-comparison).
