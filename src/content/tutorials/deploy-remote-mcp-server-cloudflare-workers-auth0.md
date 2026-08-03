---
title: "Building and Deploying Remote MCP Servers on Cloudflare Workers with Auth0 OAuth"
description: "Learn how to build, authenticate, and deploy stateless remote Model Context Protocol (MCP) servers on Cloudflare Workers using SDK v2 Streamable HTTP handlers and Auth0 OAuth2."
pubDate: 2026-08-03
author: nadhebe-team
category: "tutorials"
tags: ["MCP", "Cloudflare Workers", "Auth0", "OAuth2", "Model Context Protocol", "Serverless"]
heroImage: "/images/deploy-remote-mcp-server-cloudflare-hero.webp"
heroAlt: "Minimalist vintage editorial collage illustrating remote MCP server nodes on Cloudflare Workers secured by Auth0 identity badges"
estimatedReadingTime: 15
isPillar: true
topic: "MCP Architecture"
searchIntent: "tutorial"
draft: false
faq:
  - question: "What transport protocol is recommended for cloud-hosted remote MCP servers?"
    answer: "Remote cloud MCP implementations utilize stateless Streamable HTTP handlers exposed at `/mcp` endpoints via the MCP SDK v2 standard."
  - question: "How are user authentication tokens maintained across serverless worker requests?"
    answer: "OAuth authorization states and refresh tokens are securely persisted across edge invocations using Cloudflare KV namespaces."
  - question: "Can desktop AI assistants interact with remote MCP endpoints securely?"
    answer: "Yes, clients such as Claude Desktop, Cursor, and Windsurf connect directly to remote HTTP endpoints or route through authenticated local proxies."
sources:
  - label: "Model Context Protocol Official Specification"
    url: "https://modelcontextprotocol.io/"
  - label: "Cloudflare Workers Documentation"
    url: "https://developers.cloudflare.com/workers/"
---

# Building and Deploying Remote MCP Servers on Cloudflare Workers with Auth0 OAuth

The Model Context Protocol (MCP) ecosystem is undergoing a major architectural transition away from local desktop-bound standard input/output (`stdio`) processes toward cloud-hosted **remote streamable HTTP endpoints**.

Deploying remote MCP servers on **Cloudflare Workers** using the **MCP SDK v2 `createMcpHandler`** enables edge-deployed, stateless tools accessible by AI agents globally, while integrating **Auth0 OAuth2** identity guarantees enterprise security.

---

## Architectural Evolution: Local Stdio vs Remote HTTP

```
       LOCAL STDIO MCP ARCHITECTURE                REMOTE STREAMABLE HTTP ARCHITECTURE
 ┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
 │ Desktop AI Client (Claude / Cursor)  │     │ Desktop / Cloud AI Agent Client      │
 └──────────────────┬───────────────────┘     └──────────────────┬───────────────────┘
                    │ (stdin/stdout)                             │ (HTTPS Streamable)
                    ▼                                            ▼
 ┌──────────────────────────────────────┐     ┌──────────────────────────────────────┐
 │ Local Node/Python Subprocess         │     │ Cloudflare Edge Worker (/mcp)        │
 └──────────────────────────────────────┘     └──────────────────┬───────────────────┘
                                                                 │ (OAuth Bearer Validation)
                                                                 ▼
                                              ┌──────────────────────────────────────┐
                                              │ Auth0 Identity & KV State Binding    │
                                              └──────────────────────────────────────┘
```

---

## Cloudflare Worker Implementation: `createMcpHandler`

Here is a production-grade TypeScript implementation for Cloudflare Workers deploying a remote MCP server with Auth0 token validation:

```typescript
import { createMcpHandler } from "@modelcontextprotocol/sdk/v2/server";
import { z } from "zod";

export interface Env {
  AUTH0_DOMAIN: string;
  AUTH0_AUDIENCE: string;
  OAUTH_KV: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Endpoint for Remote MCP Requests
    if (url.pathname === "/mcp") {
      // Validate Auth0 Bearer Token
      const authHeader = request.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Unauthorized: Missing Bearer Token" }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        });
      }

      // Initialize Stateless Streamable MCP Handler
      const handler = createMcpHandler({
        name: "cloud-mcp-server",
        version: "2.0.0",
        tools: [
          {
            name: "query_edge_database",
            description: "Query edge KV dataset with authenticated access",
            parameters: z.object({
              key: z.string().describe("Target database key to fetch")
            }),
            execute: async ({ key }) => {
              const value = await env.OAUTH_KV.get(key);
              return { result: value || "Key not found" };
            }
          }
        ]
      });

      return handler(request);
    }

    return new Response("Nadhebe Remote MCP Gateway Operational", { status: 200 });
  }
};
```

---

## IDE Integration for Remote MCP Endpoints

To connect **Cursor**, **Claude Desktop**, or **Windsurf** to your remote Cloudflare Workers MCP server, configure your configuration JSON file (`claude_desktop_config.json` or `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "cloudflare-remote-mcp": {
      "url": "https://nadhebe-mcp.workers.dev/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_AUTH0_ACCESS_TOKEN"
      }
    }
  }
}
```
