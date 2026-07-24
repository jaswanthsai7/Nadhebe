# Agent Authentication & Registration Specifications (auth.md)

Welcome to Nadhebe. This document defines the protocol for automated agent discovery, client registration, and token consumption.

---

## 1. Discovery Endpoints
Agents must discover authentication metadata by querying the standard RFC 9728 and RFC 8414 endpoints:

* **OAuth Protected Resource Metadata**: `/.well-known/oauth-protected-resource`
* **OAuth Authorization Server Metadata**: `/.well-known/oauth-authorization-server`
* **OpenID Configuration**: `/.well-known/openid-configuration`
* **API Index Catalog**: `/index.json`
* **Agent Skills Directory**: `/.well-known/agent-skills/index.json`

---

## 2. Authentication Modes & Registration

### Anonymous Agent Access (Default)
No registration or API key is required to query Nadhebe's public content feeds:
* **LLM Aggregated Text**: `/llms.txt` and `/llms-full.txt`
* **Markdown Negotiation**: Set header `Accept: text/markdown` on any article endpoint.
* **Sitemaps**: `/sitemap-index.xml` and `/sitemap-0.xml`

### Automated Dynamic Agent Registration
Agents requiring access to background processing endpoints (e.g. `POST /api/v1/jobs` or `POST /api/v1/subscribe`) can register dynamically via the Authorization Server endpoint:

* **Registration URI**: `https://nadhebe.com/api/v1/agent/register`
* **Supported Identity Types**: `developer`, `agent`, `anonymous`
* **Supported Credential Types**: `bearer_token`, `oauth2`, `none`

---

## 3. Scopes & Permissions

| Scope | Description | Access Level |
| :--- | :--- | :--- |
| `read:public` | Read sitemaps, articles, and index catalogs | Public |
| `read:articles` | Extract full-text markdown versions of all published articles | Public |
| `read:tools` | Query tool review metadata and benchmarks | Public |
| `write:jobs` | Submit content cluster generation and background tasks | Authenticated Agent |
| `write:newsletter` | Submit email subscriptions to Beehiiv pipeline | Public / Agent |

---

## 4. Token Revocation & Claim Management

* **Token Revocation Endpoint**: `https://nadhebe.com/oauth/revoke`
* **Claim Verification Endpoint**: `https://nadhebe.com/oauth/claim`
