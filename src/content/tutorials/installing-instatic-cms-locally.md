---
title: "How to Install and Set Up Instatic CMS Locally"
description: "A complete step-by-step developer's guide to cloning, installing Bun, and running Instatic CMS locally on Windows, macOS, or Linux."
pubDate: 2026-07-10
author: alice-chen
category: "Tutorials"
tags: [instatic, setup, local-development, bun]
heroImage: "https://img.youtube.com/vi/DwaLQmPlALI/maxresdefault.jpg"
heroAlt: "Sleek 3D illustration of terminal commands and database server setups"
draft: false
topic: "Instatic"
isPillar: false
searchIntent: "Developer instructions to run Instatic CMS locally"
estimatedReadingTime: 6
difficulty: "beginner"
youtubeVideoId: "DwaLQmPlALI"
youtubeVideoUrl: "https://youtu.be/DwaLQmPlALI?si=5UthR89Q95a0i_PU"
faq:
  - question: "Why does Instatic require Bun instead of npm/Node?"
    answer: "Bun acts as an incredibly fast native TypeScript compiler and package manager, reducing local install times and launching the dev server in milliseconds."
  - question: "How do I fix installation errors on Windows PowerShell?"
    answer: "Ensure your execution policy allows script runs by executing `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` before running the Bun installer."
---

Deploying a local visual CMS makes template customization faster and keeps database files secure on your host machine. In this tutorial, we will walk you through the complete setup of **Instatic CMS** on your local machine using the **Bun** runtime.

---

## Technical Architecture Overview

Before starting the installation, it helps to understand the local runtime stack of Instatic:

![Instatic Local Runtime Architecture](/images/install-step1.png)
*Figure 1: Core interaction model between Bun, VS Code terminal, and the SQLite local database file.*

---

## Step-by-Step Local Setup

### 1. Clone the Repository
Open your terminal or Visual Studio Code, select your target workspace folder, and clone the official repository:

```bash
git clone https://github.com/CoreBunch/Instatic.git
```

### 2. Install the Bun Runtime
Instatic is designed around Bun's high-speed bundler. Depending on your operating system, execute the following command:

#### macOS & Linux
```bash
curl -fsSL https://bun.sh/install | bash
```

#### Windows PowerShell
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Once installed, verify that the environment variables are active by checking the version tag:

```bash
bun -v
```

---

## Initializing the Local Server

Navigate into your cloned folder and run the package installer:

```bash
cd Instatic
bun install
```

Once the dependencies load, start the local development server:

```bash
bun run dev
```

![Running Local Server Console](/images/install-step2.png)
*Figure 2: Console output upon successfully booting the local server.*

Open your web browser and navigate to the address shown in the terminal (usually `http://localhost:3000`). Follow the setup wizard to configure your site name, administrator email, and master password.

---

## Key Takeaways
- **Ultra-fast setup**: Bun dependency resolving takes seconds compared to standard npm configurations.
- **SQLite Defaults**: Database tables compile automatically inside a local DB file upon initialization.
- **Cross-platform**: Native script installers support Windows PowerShell alongside standard UNIX environments.
