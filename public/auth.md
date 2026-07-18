# auth.md — Agent Authentication & Integration

Welcome. This service supports agentic registration. This document outlines how agents can authenticate and register with our API.

## 1. Discovery
Agents should discover service metadata by requesting the Protected Resource Metadata:
- **Protected Resource Metadata**: `/.well-known/oauth-protected-resource`
- **Authorization Server Metadata**: `/.well-known/oauth-authorization-server`
- **Linkset Catalog**: `/index.json`

## 2. Supported Flows
We support the following registration paths:
- **Anonymous Access**: No token or client keys are required to query our public sitemaps, index catalog, or article feeds.

## 3. Registration
To register, please follow the protocol defined at our Authorization Server:
- **Authorization Server**: `/.well-known/oauth-authorization-server`
- **Identity Type**: `anonymous`
- **Credential Type**: `none`

## 4. Scopes
Available scopes include:
- `read:public`: Read public content, sitemaps, and indexing data.
