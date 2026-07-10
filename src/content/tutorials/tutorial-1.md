---
title: Building an AI Agent with LangChain and Astro
description: Step-by-step tutorial showing how to build a fully functional local AI agent integrated into your Astro website.
pubDate: 2026-07-02
author: alice-chen
category: Tutorials
tags: [langchain, javascript, agents]
heroImage: /images/tutorial-1.jpg
faq:
  - question: Can I run this with local models?
    answer: Yes, you can use Ollama to run models locally.
topic: "AI Coding Agents"
searchIntent: "tutorial"
parentPillar: "youtube-1"
youtubeVideoId: "dZ8ZgG6bS4Q"
youtubeVideoUrl: "https://www.youtube.com/watch?v=dZ8ZgG6bS4Q"
difficulty: "advanced"
estimatedReadingTime: 10
relatedTopics: [Astro, LangChain, AI Agents]
lastReviewed: 2026-07-09
draft: false
---
In this tutorial, we will write a script to run a local LLM agent and expose it on a web frontend.

## Step 1: Install Dependencies
First, install the LangChain packages:
```bash
npm install langchain @langchain/openai
```

## Step 2: Write the Agent Script
Next, initialize the OpenAI model and set up the agent loop.
