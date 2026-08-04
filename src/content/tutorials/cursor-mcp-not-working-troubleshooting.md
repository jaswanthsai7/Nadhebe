---
title: "Cursor MCP Not Working: Troubleshooting Connection, Path, and JSON Configuration Errors"
description: "Fix Cursor Model Context Protocol (MCP) server issues, including failed connection statuses, missing node environment paths, and JSON syntax errors."
pubDate: 2026-08-03
author: nadhebe-team
category: "tutorials"
tags: ["Cursor", "MCP", "Troubleshooting", "Developer Tools", "Node.js", "AI IDE"]
heroImage: "/images/cursor-mcp-not-working-hero.webp"
heroAlt: "Minimalist vintage editorial collage showing Cursor settings red indicator lights and JSON syntax resolution on a warm cream background"
estimatedReadingTime: 12
isPillar: true
topic: "MCP Ecosystem"
searchIntent: "tutorial"
draft: false
faq:
  - question: "Why does my Cursor MCP server show 'Disconnected' red status?"
    answer: "Disconnected statuses are usually caused by absolute PATH environment mismatches (e.g. `npx` not found in GUI apps) or invalid JSON syntax inside `.cursor/mcp.json`."
  - question: "Where is the global Cursor MCP configuration file located?"
    answer: "The global configuration file is stored at `~/.cursor/mcp.json` on macOS/Linux or `%USERPROFILE%\\.cursor\\mcp.json` on Windows."
sources:
  - label: "Cursor MCP Server Troubleshooting"
    url: "https://docs.cursor.com/context/mcp"
---

# Cursor MCP Not Working: Troubleshooting Connection, Path, and JSON Configuration Errors

Connecting external Model Context Protocol (MCP) servers to **Cursor** extends the IDE's capabilities with custom database schemas, API connectors, and terminal tools.

However, developers frequently run into **red "Disconnected" status indicators**, **silent tool failures**, or **environment path errors**. This guide details how to diagnose and fix Cursor MCP integration issues quickly.

---

## Cursor MCP Error Diagnostics Matrix

```
 ┌────────────────────────────────────────────────────────────────────────┐
 │                   CURSOR MCP CONNECTION DIAGNOSTICS                    │
 └───────────────────────────────────┬────────────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│  RED DISCONNECTED    │  │  MISSING PATH / NPX  │  │  JSON SYNTAX ERROR   │
├──────────────────────┤  ├──────────────────────┤  ├──────────────────────┤
│ • Check process logs │  │ • Use absolute paths │  │ • Validate JSON schema│
│ • Restart Cursor IDE │  │ • `/usr/local/bin`   │  │ • Fix trailing commas│
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

| Symptom | Primary Cause | Recommended Fix |
| :--- | :--- | :--- |
| **Red "Disconnected" dot** | Server crashed on launch | Inspect logs via `Cursor -> Output -> MCP Logs` |
| **`spawn npx ENOENT`** | GUI app missing shell `$PATH` | Replace `npx` with absolute path `/usr/local/bin/npx` |
| **Tools list empty** | Server response protocol mismatch | Update `@modelcontextprotocol/sdk` to latest v2 |
| **JSON Parse Error** | Trailing comma in `.cursor/mcp.json` | Validate JSON using an online linter |

---

## 1. Fix: Replacing Relative Commands with Absolute Paths

When GUI applications like Cursor launch on macOS or Windows, they do not inherit interactive terminal shell `$PATH` variables. Update your `.cursor/mcp.json` file to use full executable paths:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "/usr/local/bin/node",
      "args": [
        "/Users/username/.nvm/versions/node/v20.10.0/bin/mcp-server-postgres",
        "postgresql://localhost/mydb"
      ]
    }
  }
}
```

---

## 2. Inspecting Cursor MCP Logs

1. Open Cursor Settings (`Cmd + ,` or `Ctrl + ,`).
2. Navigate to **Features -> MCP**.
3. Click **View Logs** next to the failing server to view full `stderr` stack traces.
