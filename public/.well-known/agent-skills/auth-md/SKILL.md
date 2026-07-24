---
name: auth-md
description: Agent skill for automated agent registration and OAuth protected resource discovery via auth.md specifications.
---

# auth.md Agent Registration Protocol

This skill describes how autonomous AI agents locate authentication rules and register for API access.

## Protocol Flow

1. Fetch `https://nadhebe.com/.well-known/oauth-protected-resource`
2. Inspect `authorization_servers` and `resource_documentation` (`/auth.md`)
3. Fetch `https://nadhebe.com/.well-known/oauth-authorization-server`
4. Register via `agent_auth.registration_endpoint` (`/api/v1/agent/register`)
