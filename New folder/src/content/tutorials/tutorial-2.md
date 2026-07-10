---
title: Getting Started with Retrieval-Augmented Generation (RAG)
description: Learn the core concepts of RAG and how to implement a basic vector database query pipeline.
pubDate: 2026-07-06
author: bob-smith
category: Tutorials
tags: [rag, vector-db, embeddings]
heroImage: /images/tutorial-2.jpg
draft: false
---
Retrieval-Augmented Generation (RAG) helps enrich your LLM prompts with external data.

## Workflow Overview
1. Parse documents into chunks.
2. Embed the chunks into vectors.
3. Retrieve matching chunks using vector similarity.
4. Supply the retrieved context to the LLM.
