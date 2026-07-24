import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:/Users/jasva/.gemini/antigravity-ide/brain/42a3c4a9-100f-4100-82ca-c758f76674ca';
const publicImgDir = 'public/images';

const map: Record<string, string> = {
  'claude_windows_hero': 'claude-windows-hero.jpg',
  'claude_agent_hero': 'claude-agent-hero.jpg',
  'google_ai_cert_hero': 'google-ai-cert-hero.jpg',
  'claude_cli_hero': 'claude-cli-hero.jpg',
  'anthropic_cert_hero': 'anthropic-cert-hero.jpg',
};

const files = fs.readdirSync(artifactsDir);
Object.entries(map).forEach(([key, target]) => {
  const match = files.find(f => f.startsWith(key) && f.endsWith('.png'));
  if (match) {
    fs.copyFileSync(path.join(artifactsDir, match), path.join(publicImgDir, target));
    console.log('COPIED:', match, '->', target);
  }
});

// Article 1
const art1 = `---
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
| **Node.js Runtime** | Node.js v18.0.0 or higher | \`node -v\` |
| **Package Manager** | npm v9.0.0 or higher | \`npm install -g @anthropic-ai/claude-code\` |
| **Windows Shell** | PowerShell 7+ or WSL2 Ubuntu | \`claude\` |
| **API Authentication** | Anthropic Console API Key | \`$env:ANTHROPIC_API_KEY="sk-ant-..."\` |

## Prerequisites for Windows Installation

Before running the installation command, verify your environment satisfies these prerequisites:

1. **Install Node.js 18+:** Download the LTS installer from Nodejs.org and ensure \`Add to PATH\` is checked during installation.
2. **Verify Node & npm:** Open a new PowerShell window and run:
   \`\`\`powershell
   node -v
   npm -v
   \`\`\`
3. **Configure Execution Policy:** By default, Windows blocks global npm scripts. Unblock them by executing:
   \`\`\`powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   \`\`\`

## Step 1: Installing Claude Code via Global npm

Open PowerShell (or Windows Terminal) as an administrator or current user and install the global package:

\`\`\`powershell
npm install -g @anthropic-ai/claude-code
\`\`\`

Verify that the CLI binary was linked into your global AppData path:

\`\`\`powershell
claude --version
\`\`\`

## Step 2: Configuring API Key Environment Variables

Claude Code requires an active Anthropic API key. Set the variable permanently in Windows PowerShell:

\`\`\`powershell
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'sk-ant-api03-your-actual-key-here', 'User')
\`\`\`

Restart your terminal window to reload the new environment variable, then verify it:

\`\`\`powershell
$env:ANTHROPIC_API_KEY
\`\`\`

## Step 3: Launching Claude Code in a Windows Workspace

Navigate to your target project folder in PowerShell and launch the agent:

\`\`\`powershell
cd C:\\Users\\yourname\\projects\\my-app
claude
\`\`\`

Upon first launch, Claude Code initializes its workspace index and prompts for interactive permission approvals before editing files or running terminal commands.

## Step 4: Alternative Setup via WSL2 (Recommended for Unix Compatibility)

If your project relies on Linux build scripts or bash tooling, installing inside **WSL2** is recommended:

\`\`\`bash
# Inside WSL2 Ubuntu terminal
sudo apt update && sudo apt install -y nodejs npm
sudo npm install -g @anthropic-ai/claude-code
export ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key-here"
claude
\`\`\`

## Troubleshooting Common Windows Errors

### 1. The term 'claude' is not recognized
This occurs when your npm global binaries directory is missing from your Windows PATH variable. Add \`%AppData%\\npm\` to your User Environment Variables PATH.

### 2. EACCES: permission denied
Run PowerShell as Administrator once to complete global package extraction, or configure an isolated npm prefix:
\`\`\`powershell
npm config set prefix "$env:LOCALAPPDATA\\npm-global"
\`\`\`

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
`;

fs.writeFileSync('src/content/tutorials/installing-claude-code-cli-windows.md', art1, 'utf8');

// Article 2
const art2 = `---
title: "Inside Claude Code Agent: Terminal Loop Architecture, Tool Calling & Permission Controls"
description: "An architectural deep dive into how Anthropic's Claude Code operates as an autonomous agent in your terminal, handling file edits, git workflows, and security prompts."
pubDate: 2026-07-25
author: bob-smith
category: Guides
tags: ["claude", "agent", "architecture", "cli", "anthropic"]
heroImage: "/images/claude-agent-hero.jpg"
heroAlt: "Minimalist architectural diagram showing autonomous agent loops with glowing node paths"
draft: false
topic: "Claude Code"
isPillar: true
searchIntent: "Understanding Claude Code autonomous agent execution loop and file permission architecture"
estimatedReadingTime: 8
faq:
  - question: "How does Claude Code isolate system commands from destructive actions?"
    answer: "Claude Code requires explicit human-in-the-loop permission prompts before executing shell write operations, git commits, or file deletions."
  - question: "Does Claude Code send your entire local codebase to Anthropic servers?"
    answer: "No, Claude Code uses localized file indexers to read and pass only contextually relevant files and snippets into prompt windows."
sources:
  - label: "Anthropic Claude Code Architecture Overview"
    url: "https://docs.anthropic.com"
  - label: "Anthropic GitHub Repository"
    url: "https://github.com/anthropic/claude-code"
---

Anthropic's **Claude Code** represents a paradigm shift from chat-based AI assistants to autonomous terminal agents. Unlike traditional IDE plugins that suggest code snippets, Claude Code operates as an interactive shell agent capable of reading multi-file project structures, executing CLI commands, editing source files, and running test suites.

Understanding the internal execution loop and security permissions of Claude Code is essential for engineering teams deploying AI agents in production environments.

## The Autonomous Terminal Execution Loop

Claude Code follows a stateful **Observe-Plan-Act-Verify** loop operating directly over your local workspace filesystem:

\`\`\`mermaid
flowchart TD
    UserPrompt[User Instruction in CLI] --> AgentParse[Parse Codebase Context]
    AgentParse --> PlanStep[Generate Action Plan]
    PlanStep --> SecurityCheck{Destructive Operation?}
    
    SecurityCheck -->|Read / Search| ExecAction[Execute Tool Call]
    SecurityCheck -->|Write / Bash / Delete| PromptUser[Prompt User Approval]
    
    PromptUser -->|Approved| ExecAction
    PromptUser -->|Rejected| RefinePlan[Refine Action Plan]
    
    ExecAction --> ReadResult[Analyze Terminal / Test Output]
    ReadResult --> Verification{Goal Achieved?}
    
    Verification -->|No| PlanStep
    Verification -->|Yes| Finish[Output Final Answer to Terminal]
\`\`\`

## Architectural Breakdown

### 1. Context Collection & Indexing
When launched in a directory, Claude Code scans \`.gitignore\` files to exclude build artifacts (\`node_modules/\`, \`dist/\`, \`.git/\`). It builds a lightweight local AST and file map to pass structured context into Anthropic's Claude 3.5 / Claude 3.7 Sonnet API endpoints.

### 2. Native Tool Calling System
Claude Code relies on structured JSON tool calling schema including:
* **\`FileRead\` / \`FileWrite\`:** Inspects and writes code files atomically.
* **\`DirectoryList\` / \`GrepSearch\`:** Rapidly navigates unfamiliar repositories.
* **\`BashRun\`:** Executes tests (\`npm test\`, \`pytest\`), linter checks, and git operations.

### 3. Human-in-the-Loop Permission Guardrails
Security is built into the CLI runtime. Read-only operations (\`cat\`, \`ls\`, \`grep\`) run transparently, while state-changing commands (\`git commit\`, \`rm\`, file overwrites) pause execution to display exact diffs for human confirmation.

## Token & Cost Management for Long Sessions

Because autonomous agent loops re-read updated context after every action, token consumption can accumulate rapidly during extended debugging sessions.

| Session Type | Estimated Context Window | Recommended Optimization Strategy |
| :--- | :--- | :--- |
| **Single Function Bugfix** | 10k – 30k tokens | Use targeted prompts targeting specific filenames |
| **Multi-File Refactoring** | 50k – 150k tokens | Compact chat history periodically using \`/compact\` |
| **Full Suite Test Debugging** | 150k – 200k+ tokens | Use explicit file filters to limit context accumulation |

## Image Asset Specifications

* **Hero Visual**:
  - **Prompt**: "Minimalist architectural diagram showing autonomous agent loops with glowing node paths and soft violet accents on light grey canvas"
  - **Filename**: "claude-agent-hero.jpg"
  - **Alt text**: "Minimalist architectural diagram showing autonomous agent loops with glowing node paths"
  - **Placement**: Hero header section

## Related Guides & Workflows

* For installation instructions, read [How to Install and Set Up Claude Code CLI](/tutorials/how-to-install-claude-code-cli).
* For multi-agent state architectures, see [The SQLite State-Sharing Pattern for Multi-Agent Architectures](/frameworks/sqlite-state-sharing-multi-agent-architecture).
* For API token budget strategies, explore [LLM Autonomous Loops: Token and Cost Management](/best-practices/llm-autonomous-loop-cost-management).
`;

fs.writeFileSync('src/content/guides/claude-code-agent-loop-architecture.md', art2, 'utf8');

// Article 3
const art3 = `---
title: "Google AI Certification Costs: Free Skill Badges vs $200 Exam Credentials Explained"
description: "A transparent breakdown of Google Cloud AI certification costs, distinguishing free Google Cloud Skills Boost courses and completion badges from paid $125-$200 proctored exams."
pubDate: 2026-07-25
author: alice-chen
category: Guides
tags: ["google", "ai-certification", "google-cloud", "skills-boost", "machine-learning"]
heroImage: "/images/google-ai-cert-hero.jpg"
heroAlt: "Minimalist vector illustration of Google Cloud certificate badge with clean geometric lines"
draft: false
topic: "AI Certifications"
isPillar: true
searchIntent: "Google AI certification cost breakdown comparing free Cloud Skills Boost badges to paid proctored exams"
estimatedReadingTime: 7
faq:
  - question: "Is the Google Generative AI Certification completely free?"
    answer: "The learning modules and digital skill completion badges on Google Cloud Skills Boost are free, but formal proctored certifications (like Professional ML Engineer) cost $125 to $200."
  - question: "What is the difference between a Google Skill Badge and a Google Cloud Certification?"
    answer: "Skill Badges are free, unproctored digital badges earned by finishing online lab challenges, while Google Cloud Certifications are proctored, industry-recognized credentials with registration fees."
sources:
  - label: "Google Cloud Official Certification Portal"
    url: "https://cloud.google.com/learn/certification"
  - label: "Google Cloud Skills Boost Learning Platform"
    url: "https://cloudskillsboost.google"
---

Navigating Google's AI certification landscape can be confusing. Searches for "Google AI certification cost" often surface conflicting information—some sources claim Google AI courses are 100% free, while others list exam fees up to $200.

The key is understanding the distinction between **Free Learning Content & Skill Badges** versus **Official Proctored Certification Exams**.

## Executive Summary: Google AI Credentials Compared

| Credential Type | Official Name | Registration Fee | Exam Format | Industry Recognition | Official URL |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Free Skill Badge** | Generative AI Fundamentals | **$0** | Unproctored hands-on labs | Entry-Level / Profile Badge | \`cloudskillsboost.google\` |
| **Associate Cert** | Cloud Digital Leader / Associate | **$125 USD** | Proctored multiple choice | Recognized Associate Credential | \`cloud.google.com/learn/certification\` |
| **Professional Cert** | Professional Machine Learning Engineer | **$200 USD** | Proctored 2-hour exam | High Industry Recognition | \`cloud.google.com/learn/certification\` |

## Free Path: Google Cloud Skills Boost & Skill Badges

Google provides an extensive catalog of self-paced courses and labs at no cost through **Google Cloud Skills Boost**:

* **Generative AI Learning Path:** Includes 10 introductory modules covering LLMs, Attention Mechanisms, and Vertex AI.
* **Hands-on Labs:** Interactive Qwiklabs environments where you configure real Google Cloud resources.
* **Digital Skill Badges:** Verified Credly/Google badges awarded automatically upon completing lab challenges ($0 fee).

## Paid Path: Proctored Google Cloud Certifications

For engineers seeking formal, resume-recognized credentials for enterprise consulting, Google offers proctored certification exams administered online or at Kryterion testing centers:

### 1. Google Cloud Professional Machine Learning Engineer ($200 USD)
* **Exam Length:** 2 hours (60 questions).
* **Prerequisites:** Recommended 3+ years of industry experience, including 1+ years building ML models on Google Cloud (Vertex AI, BigQuery ML, TensorFlow).
* **Expiration:** Valid for 2 years before recertification is required.

### 2. Google Cloud Associate Cloud Engineer ($125 USD)
* **Exam Length:** 2 hours.
* **Focus:** Deploying applications, monitoring operations, and managing enterprise cloud security.

## How to Get Free or Discounted Exam Vouchers

While formal proctored exams carry registration fees, Google periodically offers financial assistance and discount vouchers:

1. **Google Cloud Innovators Program:** Joining the free Innovators community (\`cloud.google.com/innovators\`) unlocks periodic 50% discount vouchers and learning credits.
2. **Google Cloud Next & Event Promotions:** Attendees of official virtual and in-person Google events frequently receive free exam vouchers upon completing designated Cloud Skills Challenges.

## Image Asset Specifications

* **Hero Visual**:
  - **Prompt**: "Minimalist vector illustration of Google Cloud certificate badge with clean geometric lines, soft blue and yellow pastel tones on white canvas"
  - **Filename**: "google-ai-cert-hero.jpg"
  - **Alt text**: "Minimalist vector illustration of Google Cloud certificate badge with clean geometric lines"
  - **Placement**: Hero header section

## Related Guides & Workflows

* For Anthropic credentials, see [Anthropic Claude Certification Guide: Exams & Credentials](/guides/anthropic-claude-certification-developer-guide).
* For enterprise AI tools, explore [Google Flow & Storyboard Studio Overview](/tools/google-flow-storyboard-studio-overview).
`;

fs.writeFileSync('src/content/guides/google-ai-certification-cost-free-vs-paid.md', art3, 'utf8');

// Article 4
const art4 = `---
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
| **macOS** | Homebrew or npm | \`npm install -g @anthropic-ai/claude-code\` |
| **Linux (Ubuntu/Debian)** | npm / nvm | \`npm install -g @anthropic-ai/claude-code\` |
| **Windows** | PowerShell / WSL2 | \`npm install -g @anthropic-ai/claude-code\` |

## Step 1: Verify Node.js Environment

Claude Code requires **Node.js 18+**. Verify your installed version:

\`\`\`bash
node -v
\`\`\`

If your version is below \`v18.0.0\`, update Node.js via **nvm** (Node Version Manager):

\`\`\`bash
nvm install 20
nvm use 20
\`\`\`

## Step 2: Global npm Package Installation

Run the global installation command:

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

Confirm successful binary linking by checking the installed CLI version:

\`\`\`bash
claude --version
\`\`\`

## Step 3: API Key Authentication

Authenticate Claude Code by setting your \`ANTHROPIC_API_KEY\` environment variable:

### macOS / Linux (bash or zsh)
Add the key to your \`~/.zshrc\` or \`~/.bashrc\`:

\`\`\`bash
export ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key-here"
source ~/.zshrc
\`\`\`

### Windows (PowerShell)
\`\`\`powershell
$env:ANTHROPIC_API_KEY="sk-ant-api03-your-actual-key-here"
\`\`\`

## Step 4: Launching Your First Claude Code Session

Navigate to any local software repository and initiate Claude Code:

\`\`\`bash
cd ~/projects/my-awesome-app
claude
\`\`\`

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
`;

fs.writeFileSync('src/content/tutorials/how-to-install-claude-code-cli.md', art4, 'utf8');

// Article 5
const art5 = `---
title: "Anthropic Claude Certification Guide: Exams, Credentials & Partner Academy Requirements"
description: "A comprehensive guide to Anthropic's official Claude Certification Program, covering exam tracks, Pearson VUE proctoring, and Credly digital badges."
pubDate: 2026-07-25
author: alice-chen
category: Guides
tags: ["anthropic", "claude", "certification", "pearson-vue", "credly"]
heroImage: "/images/anthropic-cert-hero.jpg"
heroAlt: "Minimalist editorial illustration of Anthropic Claude partner certification credential shield"
draft: false
topic: "AI Certifications"
isPillar: false
searchIntent: "Anthropic Claude Certification program exam tracks credentials and Pearson VUE registration"
estimatedReadingTime: 7
faq:
  - question: "Does Anthropic offer an official Claude Certification?"
    answer: "Yes, Anthropic offers role-based certifications (CCAO-F, CCDV-F, CCAR-F/P) through the Anthropic Partner Academy and Pearson VUE."
  - question: "Are Anthropic certification badges verified on Credly?"
    answer: "Yes, candidates who pass official Pearson VUE proctored exams receive digital certification badges issued via Credly."
sources:
  - label: "Pearson VUE Anthropic Certification Portal"
    url: "https://www.pearsonvue.com/anthropic"
  - label: "Anthropic Claude Official Documentation"
    url: "https://docs.anthropic.com"
---

As enterprise adoption of Anthropic's Claude models accelerates, engineers and technical consultants are seeking official credentials to validate their expertise. Anthropic provides a formal **Claude Certification Program** administered via the **Anthropic Partner Academy** and proctored globally by **Pearson VUE**.

This guide outlines the available certification tracks, exam prerequisites, and registration procedures.

## Official Anthropic Certification Tracks

Anthropic offers four primary role-based certification tracks designed for different technical specialties:

| Exam Code | Certification Title | Target Role | Primary Exam Domains |
| :--- | :--- | :--- | :--- |
| **CCAO-F** | Claude Certified Associate – Foundations | Consultants & Product Leads | Model capabilities, prompt engineering, safety guardrails |
| **CCDV-F** | Claude Certified Developer – Foundations | Software & AI Engineers | Claude API integration, tool calling, JSON schemas |
| **CCAR-F** | Claude Certified Architect – Foundations | System Architects | Enterprise RAG architecture, context management |
| **CCAR-P** | Claude Certified Architect – Professional | Enterprise Solutions Leads | Fine-tuning, compliance, multi-tenant deployment |

## Exam Format & Proctoring Details

1. **Proctoring Partner:** Exams are delivered securely through **Pearson VUE** (either at physical testing centers or via online proctored testing at home).
2. **Identity Verification:** Candidates must present government-issued ID and complete biometric check-in.
3. **Digital Credentials:** Successful candidates receive verifiable digital badges issued directly through **Credly**.

## Preparation & Learning Pathways

Preparation materials are hosted on the **Anthropic Partner Academy**. Key learning domains include:

* **Prompt Engineering & System Directives:** Optimizing Claude 3.5 / 3.7 Sonnet for structured JSON output.
* **Tool Use & Function Calling:** Defining multi-step agent execution workflows.
* **Constitutional AI & Safety:** Managing safety classifiers, system prompts, and data privacy guardrails.

## Image Asset Specifications

* **Hero Visual**:
  - **Prompt**: "Minimalist editorial illustration of Anthropic Claude partner certification credential shield with soft terracotta and ivory tones on light background"
  - **Filename**: "anthropic-cert-hero.jpg"
  - **Alt text**: "Minimalist editorial illustration of Anthropic Claude partner certification credential shield"
  - **Placement**: Hero header section

## Related Guides & Workflows

* For Google AI credentials, see [Google AI Certification Costs: Free Badges vs $200 Exams](/guides/google-ai-certification-cost-free-vs-paid).
* For hands-on developer CLI guides, read [Inside Claude Code Agent: Terminal Loop Architecture](/guides/claude-code-agent-loop-architecture).
`;

fs.writeFileSync('src/content/guides/anthropic-claude-certification-developer-guide.md', art5, 'utf8');

console.log('ALL 5 ARTICLES CREATED SUCCESSFULLY!');
