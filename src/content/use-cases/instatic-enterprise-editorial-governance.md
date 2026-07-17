---
title: "Enterprise Editorial Governance and Client Hand-offs with Instatic CMS"
description: "How agency teams use Instatic CMS's built-in role management, audit logging, and layout locking to safely deliver editable websites to clients."
pubDate: 2026-07-10
author: bob-smith
category: "Use Cases"
tags: [instatic, enterprise, user-management, permissions]
heroImage: "/images/use-cases-hero.png"
heroAlt: "Minimalist 3D editorial illustration representing client permissions and user role keys"
draft: false
topic: "Instatic"
isPillar: false
searchIntent: "How to configure team governance and user roles in Instatic CMS"
estimatedReadingTime: 5
difficulty: "advanced"
youtubeVideoId: "O88lL2v3JkA"
youtubeVideoUrl: "https://youtu.be/O88lL2v3JkA?si=INNufrcW-ocyz698"
faq:
  - question: "Can I restrict user edits to specific pages?"
    answer: "Yes, you can configure roles to limit editing privileges to specific folders, pages, or content categories."
  - question: "Does Instatic maintain change logs?"
    answer: "Yes. Instatic features an audit log that records user logins, page updates, asset uploads, and code changes."
sources:
  - label: "Instatic User Management Specs"
    url: "https://github.com/CoreBunch/Instatic"
---

Delivering a visual website design to a client is often a nerve-wracking process. Without strict boundaries, content editors can accidentally modify layout alignments, break typography consistency, or delete page components.

**Instatic CMS**—the MIT licensed open-source visual page builder—addresses this issue with a built-in **user and role management system**. Running on a high-performance **Bun and TypeScript** backend, Instatic saves these security rules to the local database (SQLite by default, or PostgreSQL for teams) and compiles pages into static HTML with **zero builder or hydration bloat**.

This guide explains how agencies use Instatic to lock down page layouts while allowing clients to easily publish content.

---

## The Role Permission Hierarchy

Instatic allows you to create custom roles with specific feature access. Agencies generally use a three-tier permission model:

```mermaid
graph TD
    SuperAdmin[Super Admin: Agency Developer] -->|Full Access| DesignSystem[Layout, Tokens, Code & Plugins]
    Editor[Editor: Client Content Lead] -->|Content Access| TextMedia[Add/Edit Pages, Assets & Text]
    Writer[Writer: Contributor] -->|Draft Access| SaveDrafts[Write Articles, Cannot Publish]
```

---

## Structuring the Client Hand-off

To ensure a smooth, worry-free website delivery, follow this setup:

1. **Restrict Canvas Editing**: Remove permissions to edit CSS classes or design system variables for client roles. This prevents editors from changing colors or spacing.
2. **Lock Structural Layouts**: Allow clients to update placeholder fields (such as headings, body copy, and images) while locking the wrapping container elements.
3. **Configure Audit Logs**: Keep the Audit Log enabled to trace issues back to specific updates if layout inconsistencies arise.

---

## Editor Team Workflows

Watch how team permissions and visual canvas settings are managed inside the editor:

<div class="video-wrapper aspect-video">
  <iframe src="https://www.youtube.com/embed/O88lL2v3JkA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full"></iframe>
</div>

---

## Key Takeaways & Alpha Warnings
- **Safe Hand-offs**: Protect website designs by blocking editor access to style attributes.
- **Traceable Changes**: Use audit logging to see who modified content and when.
- **Independent Roles**: Set custom permissions for external contributors, review teams, and developers.
- **Alpha Warnings**: Given the project's **early alpha status**, test user authentication credentials on a local SQLite instance before deploying container nodes for active client edits.
