import fs from 'fs';
import path from 'path';

const contentDir = 'src/content';

const linkUpdates: Record<string, string> = {
  'news/kimi-k3-moonshot-ai-release.md': `

## Related Reading & Workflows

* For long-context engineering guidelines, read our guide on [Maximizing Kimi K3: Best Practices for 1M Token Context Windows](/best-practices/kimi-k3-context-window-best-practices).
* For a head-to-head performance breakdown against proprietary models, see [Kimi K3 vs Claude Fable 5 vs GPT-5.6](/comparisons/kimi-k3-vs-claude-fable-5-vs-gpt-5-6-soul).
`,

  'news/instatic-open-source-release.md': `

## Related Guides & Comparisons

* Compare visual builder architectures in our deep dive [Instatic vs Webflow vs Framer](/comparisons/instatic-vs-webflow-vs-framer).
* Follow the step-by-step developer tutorial on [How to Install and Set Up Instatic CMS Locally](/tutorials/installing-instatic-cms-locally).
`,

  'news/openai-gpt-5-6-release-soul-ultra.md': `

## Autonomous Agent Resources

* Learn how to structure agent execution loops in our guide on [GPT-5.6 Autonomous Agent Orchestration](/guides/gpt-5-6-autonomous-agent-orchestration).
* Prevent bill shock during continuous execution with [LLM Autonomous Loops: Best Practices for Token and Cost Management](/best-practices/llm-autonomous-loop-cost-management).
`,

  'tutorials/building-pre-production-storyboards-google-flow.md': `

## Related Production Guides

* For an overview of pre-production workflow optimization, explore [The Producer's Guide to AI-Assisted Pre-Production Workflows](/guides/ai-storyboarding-pre-production-workflows).
* Compare Storyboard Studio tools in our overview [Google Flow Storyboard Studio: Product Overview](/tools/google-flow-storyboard-studio-overview).
`,

  'tutorials/setting-up-youtube-automation-agent.md': `

## Architecture & State Sharing

* Understand the backend database mechanics in [The SQLite State-Sharing Pattern for Multi-Agent Architectures](/frameworks/sqlite-state-sharing-multi-agent-architecture).
* Explore multi-agent system features in [The YouTube Automation Agent: Multi-Agent Feature Guide](/tools/youtube-automation-agent-multi-agent-system).
`,

  'tutorials/kimi-k3-3d-modeling-tutorial.md': `

## Kimi K3 Developer Resources

* Master large prompt context structures with [Maximizing Kimi K3: Best Practices for 1M Token Context Windows](/best-practices/kimi-k3-context-window-best-practices).
* Explore game design and procedural generation in [Kimi K3 Use Cases in Modern Game Design](/use-cases/kimi-k3-game-development-use-cases).
`,

  'guides/instatic-cms-architecture-ultimate-guide.md': `

## Integration & Scaling Resources

* Learn how to connect Astro components in [Integrating Instatic CMS with Astro Islands and Modern Frameworks](/frameworks/instatic-astro-islands-frameworks-integration).
* Structure your CSS system cleanly with [Best Practices for Scaling Design Tokens in Instatic CMS](/best-practices/instatic-design-tokens-scaling).
`,

  'guides/gpt-5-6-autonomous-agent-orchestration.md': `

## Agent Design & Database Patterns

* Implement reliable state coordination using [The SQLite State-Sharing Pattern for Multi-Agent Architectures](/frameworks/sqlite-state-sharing-multi-agent-architecture).
* Prevent runaway execution loops with [LLM Autonomous Loops: Best Practices for Token and Cost Management](/best-practices/llm-autonomous-loop-cost-management).
`,

  'guides/ai-storyboarding-pre-production-workflows.md': `

## Step-by-Step Storyboard Guides

* Learn the exact panel creation steps in [Step-by-Step Tutorial: Building Pre-Production Storyboards in Google Flow](/tutorials/building-pre-production-storyboards-google-flow).
* Review tool features in [Google Flow Storyboard Studio: Product Overview and Toolset](/tools/google-flow-storyboard-studio-overview).
`,

  'best-practices/instatic-design-tokens-scaling.md': `

## Instatic CMS Architecture Guides

* Review the underlying Bun and compiler architecture in [The Ultimate Architectural Guide to Instatic CMS](/guides/instatic-cms-architecture-ultimate-guide).
* Compare visual builders in [Instatic vs Webflow vs Framer: Which Visual Builder Should You Choose?](/comparisons/instatic-vs-webflow-vs-framer).
`,

  'best-practices/multi-agent-state-isolation-design.md': `

## Multi-Agent Architecture Resources

* Implement SQLite transaction boundaries using [The SQLite State-Sharing Pattern for Multi-Agent Architectures](/frameworks/sqlite-state-sharing-multi-agent-architecture).
* Manage autonomous execution costs in [LLM Autonomous Loops: Best Practices for Token and Cost Management](/best-practices/llm-autonomous-loop-cost-management).
`,

  'frameworks/instatic-astro-islands-frameworks-integration.md': `

## Instatic CMS System Guides

* Understand the Bun compiler and database architecture in [The Ultimate Architectural Guide to Instatic CMS](/guides/instatic-cms-architecture-ultimate-guide).
* Learn how agencies handle client hand-offs in [Enterprise Editorial Governance with Instatic CMS](/use-cases/instatic-enterprise-editorial-governance).
`,

  'case-studies/webflow-to-instatic-migration-savings.md': `

## Self-Hosted CMS Deployment Guides

* Deploy self-hosted instances using Docker in [How to Deploy Instatic CMS on a VPS Using Docker Compose](/tutorials/deploying-instatic-docker-vps).
* Set up team permissions and client locks in [Enterprise Editorial Governance and Client Hand-offs with Instatic CMS](/use-cases/instatic-enterprise-editorial-governance).
`,

  'tool-reviews/instatic-visual-cms-review.md': `

## Instatic Case Studies & Benchmarks

* Read about real client migrations in [Case Study: Migrating 25 Client Sites from Webflow to Self-Hosted Instatic](/case-studies/webflow-to-instatic-migration-savings).
* Compare visual engine specs in [Instatic vs Webflow vs Framer](/comparisons/instatic-vs-webflow-vs-framer).
`,

  'tool-reviews/fable-5-ai-model-review.md': `

## Frontier LLM Benchmark Comparisons

* Compare Claude Fable 5 against OpenAI flagships in [Claude Fable 5 vs GPT-5.5: Detailed Benchmarks](/comparisons/fable-5-vs-gpt-5-5-detailed-benchmarks).
* Compare open weights vs proprietary models in [Kimi K3 vs Claude Fable 5 vs GPT-5.6 Soul](/comparisons/kimi-k3-vs-claude-fable-5-vs-gpt-5-6-soul).
`,

  'tools/google-flow-storyboard-studio-overview.md': `

## Pre-Production Tutorials & Guides

* Walk through step-by-step panel creation in [Building Pre-Production Storyboards in Google Flow](/tutorials/building-pre-production-storyboards-google-flow).
* Read producer workflows in [The Producer's Guide to AI-Assisted Pre-Production Workflows](/guides/ai-storyboarding-pre-production-workflows).
`,

  'tools/youtube-automation-agent-multi-agent-system.md': `

## System Setup & Database Patterns

* Follow the step-by-step setup tutorial in [Setting Up the YouTube Automation Agent](/tutorials/setting-up-youtube-automation-agent).
* Learn about SQLite state coordination in [The SQLite State-Sharing Pattern for Multi-Agent Architectures](/frameworks/sqlite-state-sharing-multi-agent-architecture).
`,

  'use-cases/instatic-enterprise-editorial-governance.md': `

## Instatic Deployment & Migration Resources

* See agency migration cost breakdowns in [Case Study: Migrating 25 Client Sites from Webflow to Instatic](/case-studies/webflow-to-instatic-migration-savings).
* Learn self-hosted VPS installation steps in [How to Deploy Instatic CMS on a VPS Using Docker Compose](/tutorials/deploying-instatic-docker-vps).
`,

  'use-cases/kimi-k3-game-development-use-cases.md': `

## Kimi K3 Developer Resources

* Learn 3D model generation steps in [Generating Support-Free 3D Models with Kimi K3](/tutorials/kimi-k3-3d-modeling-tutorial).
* Master 1M context windows in [Maximizing Kimi K3: Best Practices for 1M Token Context Windows](/best-practices/kimi-k3-context-window-best-practices).
`,

  'youtube-articles/fable-5-vs-gpt-5-5-comparison.md': `

## Model Benchmarks & Reviews

* Read detailed benchmark metrics in [Claude Fable 5 vs GPT-5.5: Detailed Benchmarks](/comparisons/fable-5-vs-gpt-5-5-detailed-benchmarks).
* Read our complete review of Anthropic's model in [Claude Fable 5 AI Model Review](/reviews/fable-5-ai-model-review).
`,

  'youtube-articles/google-flow-storyboard-studio-guide.md': `

## Storyboard Studio Resources

* Follow the complete hands-on guide in [Step-by-Step Tutorial: Building Pre-Production Storyboards in Google Flow](/tutorials/building-pre-production-storyboards-google-flow).
* Explore tool features in [Google Flow Storyboard Studio: Product Overview](/tools/google-flow-storyboard-studio-overview).
`,

  'youtube-articles/gpt-5-6-autonomous-engine.md': `

## Agent Orchestration & Cost Control

* Learn how to structure autonomous execution loops in [GPT-5.6 Autonomous Agent Orchestration](/guides/gpt-5-6-autonomous-agent-orchestration).
* Control token costs in [LLM Autonomous Loops: Best Practices for Token and Cost Management](/best-practices/llm-autonomous-loop-cost-management).
`,

  'youtube-articles/open-source-youtube-automation-agent.md': `

## YouTube Agent Installation & Features

* Follow the repository installation tutorial in [Setting Up the YouTube Automation Agent](/tutorials/setting-up-youtube-automation-agent).
* Review multi-agent architecture details in [The YouTube Automation Agent: Multi-Agent Feature Guide](/tools/youtube-automation-agent-multi-agent-system).
`
};

for (const [relPath, linkSection] of Object.entries(linkUpdates)) {
  const fullPath = path.join(contentDir, relPath);
  if (fs.existsSync(fullPath)) {
    let text = fs.readFileSync(fullPath, 'utf8');
    if (!text.includes('## Related')) {
      text = text.trim() + '\n' + linkSection;
      fs.writeFileSync(fullPath, text, 'utf8');
      console.log('UPDATED LINKS:', relPath);
    }
  }
}
