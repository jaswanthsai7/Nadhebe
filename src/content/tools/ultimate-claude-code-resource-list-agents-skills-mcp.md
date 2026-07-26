---
title: "The Ultimate Claude Code Resource List 2026: Top MCP Servers, Skills, Subagents & Plugins"
description: "The definitive curated directory of Claude Code ecosystem resources. Includes top verified MCP servers, custom skills, subagents, VS Code extensions, and CLI tools."
pubDate: 2026-07-25
author: alice-chen
category: Tools
tags: ["claude", "cli", "mcp-servers", "skills", "subagents", "developer-tools", "awesome-list"]
heroImage: "/images/claude-resources-hero.webp"
heroAlt: "Minimalist resource directory map showing connected MCP server nodes and tool extensions"
draft: false
topic: "Claude Resources"
isPillar: true
keywords: ["claude code resource list", "claude code mcp servers", "claude code plugins", "awesome claude code", "claude code agent skills"]
searchIntent: "Comprehensive directory of verified MCP servers custom skills subagents and plugins for Claude Code"
estimatedReadingTime: 15
faq:
  - question: "What is an MCP server in Claude Code?"
    answer: "An MCP (Model Context Protocol) server is an external tool connector that gives Claude Code standard interfaces to query databases, issue trackers, APIs, and external services."
  - question: "How do I install a verified MCP server into Claude Code?"
    answer: "Run 'claude mcp add <name> -- <command>' or add the server definition to your project's '.mcp.json' configuration file."
  - question: "Where can I find open-source skills and subagents for Claude Code?"
    answer: "Explore official Anthropic repositories, GitHub community awesome-lists, and local '.claude/skills/' directory templates."
sources:
  - label: "Official Model Context Protocol Directory"
    url: "https://modelcontextprotocol.io"
  - label: "Anthropic Claude Code Documentation"
    url: "https://docs.anthropic.com"
---

The ecosystem surrounding Anthropic's **Claude Code** CLI is expanding rapidly. Through the **Model Context Protocol (MCP)**, custom skills, subagent personas, and terminal extensions, developers can turn Claude Code into a customized agentic workstation integrated with databases, issue trackers, CI/CD pipelines, and cloud APIs.

This curated resource directory indexes the top verified **MCP Servers**, **Custom Skills**, **Subagent Personas**, and **IDE Integrations** available for Claude Code.

---

## 🔌 1. Top Verified Model Context Protocol (MCP) Servers

MCP servers provide standardized protocols for Claude Code to execute tools and read context from external infrastructure.

```mermaid
flowchart LR
    Claude[Claude Code CLI] <--> MCPBridge[Model Context Protocol]
    MCPBridge <--> GitHub[GitHub MCP]
    MCPBridge <--> Postgres[PostgreSQL MCP]
    MCPBridge <--> Sentry[Sentry Error MCP]
    MCPBridge <--> Redis[Redis Cache MCP]
```

### Developer Infrastructure & Version Control

| MCP Server Name | Transport | Installation Command | Core Functionality |
| :--- | :--- | :--- | :--- |
| **GitHub MCP** | `stdio` | `claude mcp add github -- npx -y @modelcontextprotocol/server-github` | Inspect issues, pull requests, commit histories, and review comments. |
| **GitLab MCP** | `stdio` | `claude mcp add gitlab -- npx -y @modelcontextprotocol/server-gitlab` | Query GitLab merge requests, pipeline logs, and repository files. |
| **Docker MCP** | `stdio` | `claude mcp add docker -- npx -y @modelcontextprotocol/server-docker` | Inspect running containers, tail container logs, and analyze Dockerfiles. |

### Database & Storage Systems

| MCP Server Name | Transport | Installation Command | Core Functionality |
| :--- | :--- | :--- | :--- |
| **PostgreSQL MCP** | `stdio` | `claude mcp add postgres -- npx -y @modelcontextprotocol/server-postgres` | Inspect database schemas, execute parameterized SQL queries, and analyze query performance. |
| **SQLite MCP** | `stdio` | `claude mcp add sqlite -- npx -y @modelcontextprotocol/server-sqlite` | Query local SQLite database files (`.db`/`.sqlite`) directly inside your repository. |
| **Redis MCP** | `stdio` | `claude mcp add redis -- npx -y @modelcontextprotocol/server-redis` | Inspect Redis cache keys, TTL expiration, and data structures. |

### Observability & API Tools

| MCP Server Name | Transport | Installation Command | Core Functionality |
| :--- | :--- | :--- | :--- |
| **Sentry MCP** | `http` | `claude mcp add --transport http sentry https://mcp.sentry.io/query` | Fetch recent exception stack traces, error frequencies, and affected user sessions. |
| **Puppeteer MCP** | `stdio` | `claude mcp add puppeteer -- npx -y @modelcontextprotocol/server-puppeteer` | Headless browser automation: capture screenshots, scrape SPA rendered DOMs, and audit UI flows. |
| **Fetch/Web MCP** | `stdio` | `claude mcp add fetch -- npx -y @modelcontextprotocol/server-fetch` | Fetch and convert web pages into clean markdown context for Claude analysis. |

---

## 🛠️ 2. Essential Custom Skills (`.claude/skills/`)

Custom skills add reusable slash commands to interactive Claude Code sessions.

| Slash Command | File Location | Operational Blueprint Summary |
| :--- | :--- | :--- |
| **`/deploy`** | `.claude/skills/deploy/SKILL.md` | Runs tests, builds bundle, executes deployment script, and verifies health check endpoints. |
| **`/security-audit`** | `.claude/skills/security-audit/SKILL.md` | Audits uncommitted git diff for OWASP Top 10 vulnerabilities and hardcoded secrets. |
| **`/db-migrate`** | `.claude/skills/db-migrate/SKILL.md` | Generates non-breaking database migration scripts and updates ORM schema definitions. |
| **`/generate-docs`** | `.claude/skills/generate-docs/SKILL.md` | Scans exported functions and generates standard TSDoc/JSDoc block comments. |

---

## 🤖 3. Dedicated Custom Subagents (`.claude/agents/`)

Subagents define specialized AI worker personas with restricted toolsets.

| Subagent Name | Invocation Syntax | Specialized Persona Scope |
| :--- | :--- | :--- |
| **`code-reviewer`** | `@code-reviewer` | Senior code reviewer enforcing TypeScript strict mode, error handling, and test coverage. |
| **`qa-engineer`** | `@qa-engineer` | QA automation specialist generating comprehensive unit, integration, and E2E test suites. |
| **`docs-architect`** | `@docs-architect` | Documentation technical writer maintaining `CLAUDE.md`, API specs, and README references. |

---

## 💻 4. IDE Extensions & Shell Integrations

* **VS Code Extension:** Official *Claude Code* extension available on the VS Code Marketplace. Features side-by-side terminal integration, interactive diff previews, and `@editor` context sharing.
* **JetBrains Plugin:** Official plugin for IntelliJ IDEA, PyCharm, WebStorm, and GoLand.
* **Flicker-Free Terminal Config (`CLAUDE_CODE_NO_FLICKER=1`):** Adds smooth streaming line-by-line rendering and mouse scrolling to Zsh and Bash terminals.

---

## Related Guides & Workflows

* For complete command cheat sheets, explore [Claude Code Cheat Sheet](/tutorials/claude-code-cheat-sheet-commands-shortcuts).
* For custom skill authoring walkthroughs, read [How to Build Custom Claude Code Skills](/tutorials/how-to-build-custom-claude-code-skills).
* For desktop app configuration, see [Claude Desktop Download & Setup Guide](/tutorials/claude-desktop-download-installation-guide).
