import type { ToolDefinition } from '../tool-schema';

export const dockerfileLinterData: ToolDefinition = {
  id: 'dockerfile-linter',
  slug: 'dockerfile-linter',
  name: 'Dockerfile Linter',
  aliases: ['Docker Optimizer', 'Docker Validator', 'Dockerfile Checker'],
  category: 'DevOps',
  tags: ['docker', 'devops', 'linter', 'container', 'validator'],
  intent: 'Linter',
  difficulty: 'Intermediate',
  estimatedTime: '2 minutes',

  inputs: [
    { name: 'dockerfile', type: 'string' }
  ],
  outputs: [
    { name: 'report', type: 'string', formats: ['txt', 'json'] }
  ],
  interactivePlayground: true,

  seo: {
    title: 'Free Dockerfile Linter – Optimize & Secure Containers',
    description: 'Instantly lint your Dockerfile to find security risks, caching issues, and optimization opportunities. Works completely in your browser.',
    keywords: ['dockerfile linter', 'docker optimizer', 'docker validator', 'lint dockerfile', 'secure container'],
    cluster: 'DevOps Validation'
  },

  content: {
    intro: 'Secure and optimize your Docker builds. A poorly written Dockerfile can lead to massive image sizes, broken build caches, and severe security vulnerabilities. This linter instantly analyzes your Dockerfile and provides actionable optimization suggestions based on industry best practices.',
    useCases: [
      'Before committing Dockerfile changes to version control',
      'During CI/CD pipelines to ensure Docker best practices',
      'When trying to reduce the size of bloated Docker images',
      'Before publishing containers to a public registry'
    ],
    mistakes: [
      {
        mistake: 'Using the "latest" tag in FROM instructions',
        fix: 'Always pin your base images to a specific version (e.g., node:18.16.0) to ensure reproducible builds.'
      },
      {
        mistake: 'Not cleaning up package managers after install',
        fix: 'Run `rm -rf /var/lib/apt/lists/*` in the same RUN layer as `apt-get install` to reduce image size.'
      }
    ],
    examples: [
      {
        input: 'FROM ubuntu:latest\\nRUN apt-get update\\nRUN apt-get install curl',
        output: 'Found 3 issues:\\n1. Avoid using "latest" tag.\\n2. Combine RUN instructions with &&.\\n3. Missing apt-get cleanup.',
        explanation: 'The linter caught the unpinned version, uncombined RUN layers which bloat the image, and the missing package cache cleanup.'
      }
    ],
    faq: [
      {
        question: 'Why should I lint my Dockerfiles?',
        answer: 'Linting helps catch common mistakes, optimizes build caching, prevents image bloat, and flags security risks (like running as root or using outdated base images).'
      },
      {
        question: 'What rules are checked by this linter?',
        answer: 'We check for latest tags, missing WORKDIR, improper ADD/COPY usage, multiple CMDs, un-chained RUN commands, missing EXPOSE, and missing cache cleanups after package installs.'
      },
      {
        question: 'Is my Dockerfile uploaded to a server?',
        answer: 'No. The entire analysis runs locally in your web browser for complete privacy.'
      }
    ],
    peopleAlsoAsk: [
      'How do I reduce my Docker image size?',
      'What are Dockerfile best practices?',
      'Why is my Docker build so slow?',
      'Should I use ADD or COPY in Docker?'
    ]
  },

  ai: {
    summary: 'A local linter that analyzes Dockerfiles for best practices and security.',
    llmDescription: 'The Dockerfile Linter takes raw Dockerfile text and analyzes it against best practices. It checks for pinned versions, proper layer caching, layer reduction, and security issues like running as root.',
    markdown: 'Available via /tools/dockerfile-linter.md',
    json: 'Available via /tools/dockerfile-linter.json',
    prompt: 'Lint the following Dockerfile and provide a list of optimization suggestions.',
    examples: ['Input: FROM node:latest -> Output: Warning: Avoid latest tag.'],
    citations: ['https://docs.docker.com/develop/develop-images/dockerfile_best-practices/']
  },

  lifecycle: {
    version: '1.0.0',
    created: '2026-08-05T00:00:00Z',
    lastUpdated: '2026-08-05T00:00:00Z',
    deprecated: false,
    changelog: ['Initial release']
  }
};
