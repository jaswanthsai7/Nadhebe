---
title: "How to Deploy Instatic CMS on a VPS Using Docker Compose"
description: "Learn step-by-step how to deploy the open-source self-hosted Instatic CMS on a Virtual Private Server (VPS) using Docker Compose and SQLite."
pubDate: 2026-07-10
author: bob-smith
category: "Tutorials"
tags: [instatic, docker, vps, deployment]
heroImage: "/images/tutorials-hero.png"
heroAlt: "Minimalist 3D editorial illustration representing Docker container VPS deployment configurations"
draft: false
topic: "Instatic"
isPillar: false
searchIntent: "Practical tutorial on deploying Instatic self-hosted CMS using Docker"
estimatedReadingTime: 8
difficulty: "intermediate"
youtubeVideoId: "O88lL2v3JkA"
youtubeVideoUrl: "https://youtu.be/O88lL2v3JkA?si=INNufrcW-ocyz698"
faq:
  - question: "Can I use PostgreSQL instead of SQLite for Instatic?"
    answer: "Yes, Instatic officially supports both SQLite and PostgreSQL. You can specify PostgreSQL connection credentials inside your environment variables."
  - question: "Is Bun required on the host server to run Instatic via Docker?"
    answer: "No. The Docker image packages Bun internally, so your host server only needs Docker and Docker Compose installed."
sources:
  - label: "Instatic Docker Deployments"
    url: "https://github.com/CoreBunch/Instatic#docker-deployment"
---

Deploying content management systems should not involve complex server configurations or heavy database provisioning. **Instatic**, an open-source, self-hosted visual CMS built on Bun and TypeScript, offers a lightweight, high-performance editor that outputs clean static files with **zero hydration bloat**.

In this tutorial, you will learn how to configure and deploy Instatic CMS on a Virtual Private Server (VPS) using Docker and Docker Compose. We will set it up with SQLite for local, server-contained storage, which is ideal for small-to-medium marketing sites.

---

## Prerequisites

Before starting, ensure you have:
1. A VPS running a modern Linux distribution (e.g., Ubuntu 22.04 LTS).
2. A domain name pointed to your VPS IP address (e.g., `cms.example.com`).
3. Docker and Docker Compose installed on the host.

---

## 1. Directory Structure Setup

Log into your VPS via SSH and create a dedicated directory for your Instatic deployment:

```bash
mkdir -p ~/instatic-cms/data
cd ~/instatic-cms
```

The `./data` directory will be mounted as a volume inside the container to persist the SQLite database and uploaded media assets.

---

## 2. Docker Compose Configuration

Create a `docker-compose.yml` file using your preferred text editor:

```yaml
version: '3.8'

services:
  instatic:
    image: corebunch/instatic:latest
    container_name: instatic-cms
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - PORT=3000
      - DATABASE_URL=file:/app/data/instatic.db
      - JWT_SECRET=change-this-to-a-secure-random-string
      - NODE_ENV=production
```

> [!IMPORTANT]
> Make sure to replace `change-this-to-a-secure-random-string` with a long, randomly generated secret to secure user logins. If you choose to scale, you can configure PostgreSQL credentials here.

---

## 3. Deployment and Startup

To pull the latest image and launch the container in the background (detached mode), run:

```bash
docker compose up -d
```

Verify that the service is running and listening on port 3000:

```bash
docker compose ps
```

---

## 4. Configuring Reverse Proxy with Caddy

For production environments, you must run Instatic behind a reverse proxy to secure client sessions with HTTPS. We recommend **Caddy** because it automatically requests and renews Let's Encrypt certificates.

Create a `Caddyfile` in your setup folder:

```caddyfile
cms.example.com {
    reverse_proxy localhost:3000
}
```

Start Caddy, and your Instatic editor will be secure and accessible at `https://cms.example.com`.

---

## Video Walkthrough

For a visual demonstration of the editor's responsive canvas, CSS variables token management, and plugin architecture, watch the walkthrough below:

<div class="video-wrapper aspect-video">
  <iframe src="https://www.youtube.com/embed/O88lL2v3JkA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full"></iframe>
</div>

---

## Key Takeaways & Alpha Warnings
- **Self-Hosted Control**: Instatic combines a visual builder with Bun/TypeScript execution in a single container.
- **SQLite Storage**: Eliminates database overhead for solo projects or marketing sites.
- **Clean Static Output**: Deploys server-contained visual styling rules as static HTML, CSS, and JS.
- **Alpha Warnings**: Given the **early alpha/pre-1.0 status** of the project, make sure to set up regular backups of your SQLite volume database to prevent data loss.
