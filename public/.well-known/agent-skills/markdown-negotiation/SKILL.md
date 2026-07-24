---
name: markdown-negotiation
description: Agent skill for requesting text/markdown content responses via HTTP Accept headers.
---

# Markdown Content Negotiation

Agents can request plain markdown versions of any document or article on `nadhebe.com` by providing the standard HTTP `Accept` header:

```http
GET /articles/some-article HTTP/1.1
Host: nadhebe.com
Accept: text/markdown, text/html;q=0.9
```

## Response Protocol

Servers respond with:
* `Content-Type: text/markdown; charset=utf-8`
* `x-markdown-tokens: <approx_token_count>`
* `Vary: Accept`
