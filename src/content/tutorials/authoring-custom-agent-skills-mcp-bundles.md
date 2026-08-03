---
title: "Authoring Custom Agent Skills and Packaging MCP Bundles (.mcpb) for IDE Integration"
description: "A step-by-step tutorial on building custom SKILL.md playbooks and packaging zero-dependency Model Context Protocol Bundles (.mcpb) for AI IDEs."
pubDate: 2026-08-03
author: nadhebe-team
category: "tutorials"
tags: ["MCP", "MCP Bundles", "Agent Skills", "SKILL.md", "IDE Integration", "Developer Tools"]
heroImage: "/images/authoring-custom-agent-skills-hero.webp"
heroAlt: "Retro-tech editorial graphic showing packaged archive bundles and SKILL.md manifests on a soft mint background"
estimatedReadingTime: 13
isPillar: true
topic: "MCP Extension Packaging"
searchIntent: "tutorial"
draft: false
faq:
  - question: "What problem do MCP Bundles (.mcpb) solve for developers?"
    answer: ".mcpb archives package local MCP tools directly with embedded execution runtimes, allowing developers to install tools without manually configuring Node.js or Python environments."
  - question: "How do AI assistants discover custom agent skills?"
    answer: "Assistants inspect repository root folders, `.claude/skills/` directories, or installed plugin registries for valid `SKILL.md` manifests."
  - question: "Are MCP Bundles compatible across different AI IDE platforms?"
    answer: "Yes, standard `.mcpb` archives conform to the open Model Context Protocol specification, running across supporting desktop environments."
sources:
  - label: "Model Context Protocol Bundle Specification"
    url: "https://modelcontextprotocol.io/specification/bundles"
---

# Authoring Custom Agent Skills and Packaging MCP Bundles (.mcpb) for IDE Integration

The standardization of **Agent Skills** alongside **Model Context Protocol Bundles (`.mcpb`)** simplifies how AI engineering capabilities are distributed across development environments.

Historically, installing local MCP tools required end users to manually provision Node.js or Python runtimes and edit hidden JSON configuration files. The `.mcpb` archive specification packages local `stdio` tools together with embedded execution runtimes, enabling **single-click zero-dependency installation**.

---

## Agent Skills (`SKILL.md`) vs MCP Bundles (`.mcpb`)

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                      AGENT TOOLING DISTRIBUTION                        │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌──────────────────────────────┐                    ┌──────────────────────────────┐
│     SKILL.MD PLAYBOOKS       │                    │      MCP BUNDLES (.MCPB)     │
├──────────────────────────────┤                    ├──────────────────────────────┤
│ • Instructions & Prompts     │                    │ • Binary Runtime Archive     │
│ • YAML Frontmatter Metadata  │                    │ • Manifest Definition        │
│ • No Runtime Binary Needed   │                    │ • Single-Click Installation  │
└──────────────────────────────┘                    └──────────────────────────────┘
```

| Layer | Primary Responsibility | File Manifest | Target User Experience |
| :--- | :--- | :--- | :--- |
| **Agent Skill** | Defines multi-step workflows & prompts | `skills/<name>/SKILL.md` | Auto-discovered domain expertise |
| **MCP Bundle** | Distributes executable binary tools | `bundle.json` in `.mcpb` | Zero-dependency 1-click install |

---

## Step 1: Authoring a Custom `SKILL.md` Playbook

Create a skill directory at `.claude/skills/db-migration/SKILL.md`:

```markdown
---
name: database-migration
description: Automated Prisma & PostgreSQL schema migration playbook with rollback checks
---

# Database Migration Skill Playbook

When the user asks to run or generate database migrations, follow these steps:

1. **Schema Check**: Inspect `prisma/schema.prisma` for uncommitted structural changes.
2. **Dry Run**: Execute `npx prisma migrate dev --create-only` to generate sql file without applying.
3. **Audit**: Inspect the generated SQL script for non-reversible drops (`DROP TABLE` / `DROP COLUMN`).
4. **Apply**: Execute `npx prisma migrate deploy` after user confirmation.
```

---

## Step 2: Packaging an MCP Bundle (`.mcpb`)

Build an `.mcpb` package using `build-mcpb`:

```bash
# Install the MCP Bundle CLI Tool
$ npm install -g @modelcontextprotocol/build-mcpb

# Compile the local MCP server into a single portable bundle
$ build-mcpb --input ./my-mcp-server --output db-tools.mcpb
```

Once generated, double-clicking `db-tools.mcpb` opens your desktop AI client and installs the MCP tool bundle instantly with **zero manual JSON editing**.
