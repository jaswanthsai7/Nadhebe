// TOOL RICH CONTENT — Per-tool intro, use cases, how it works, examples, and FAQ
// Used by [slug].astro to render unique content for each PlatformWorkbench tool.
// Add an entry here keyed by slug to override the generic content block.

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export interface ToolExample {
  input: string;
  output: string;
  label?: string;
}

export interface ToolRichContent {
  intro: string;
  useCases: string[];
  howItWorks: string;
  example?: ToolExample;
  faq: ToolFaqItem[];
}

export const TOOL_RICH_CONTENT: Record<string, ToolRichContent> = {

  // ─── Developer Tools ─────────────────────────────────────────────────────────

  'json-diff': {
    intro: 'JSON Diff compares two JSON objects and highlights exactly what changed — added keys, removed keys, and modified values — displayed as a clean, line-by-line diff. Paste two JSON blocks separated by "---" and see the delta instantly, with no server involved.',
    useCases: [
      'Spot the difference between two API responses before and after a deployment',
      'Debug configuration drift between development and production JSON configs',
      'Review changes to package.json, tsconfig.json, or any structured JSON file',
      'Verify that a data transformation preserves all expected fields',
      'Compare webhook payloads to understand what changed between events',
    ],
    howItWorks: 'Paste two JSON objects separated by a line containing "---". The tool normalizes both objects with consistent key ordering, then runs a line-by-line diff. Lines prefixed with "+" are additions; lines prefixed with "-" are removals; unchanged lines appear without a prefix. Both inputs are parsed and validated as JSON before diffing, so malformed JSON is caught immediately.',
    example: {
      input: '{"name":"Nadhebe","version":1,"features":["local","fast"]}\n---\n{"name":"Nadhebe","version":2,"features":["local","fast","private"]}',
      output: '  "name": "Nadhebe",\n- "version": 1,\n+ "version": 2,\n  "features": [\n    "local",\n    "fast",\n+   "private"\n  ]',
      label: 'JSON Diff output',
    },
    faq: [
      {
        question: 'Does JSON Diff validate my JSON before comparing?',
        answer: 'Yes. Both inputs are parsed as JSON before comparison. If either side contains invalid JSON, the tool reports a parse error and identifies which input failed — so you can fix the syntax before diffing.',
      },
      {
        question: 'Does the order of keys matter?',
        answer: 'No. Both objects are normalized with consistent key ordering before diffing, so a purely reordered object with no value changes will show no diff output.',
      },
      {
        question: 'Can I diff nested JSON objects and arrays?',
        answer: 'Yes. The diff operates on the pretty-printed form of both objects, so nested structures, arrays, booleans, numbers, and null values are all compared correctly.',
      },
      {
        question: 'Is there a size limit?',
        answer: 'No server limit — all processing happens locally in your browser. For very large JSON files (several MB), performance depends on your device and browser, but typical API payloads and config files process instantly.',
      },
    ],
  },

  'text-diff': {
    intro: 'Text Diff compares two blocks of plain text line by line and shows exactly what was added, removed, or unchanged. Works with any text — code, prose, configs, logs, lists, or markdown — no JSON structure required.',
    useCases: [
      'Review changes to a configuration file or settings document',
      'Compare two versions of a paragraph or article draft during editing',
      'Find differences between two log file excerpts during debugging',
      'Check if two code snippets are identical or spot subtle line-level differences',
      'Verify a data transformation preserved all expected plain-text lines',
    ],
    howItWorks: 'Paste two text blocks separated by a line containing "---". The tool splits both inputs into individual lines and runs a line-by-line comparison. Lines present only in the left block are prefixed with "-"; lines present only in the right block are prefixed with "+"; lines shared by both appear without a prefix.',
    example: {
      input: 'first line\nshared line\nold ending\n---\nfirst line\nshared line\nnew ending',
      output: '  first line\n  shared line\n- old ending\n+ new ending',
      label: 'Text Diff output',
    },
    faq: [
      {
        question: 'How is Text Diff different from JSON Diff?',
        answer: 'Text Diff compares any plain text line by line without any structural awareness. JSON Diff first parses and normalizes both inputs as JSON, which handles key reordering and produces more semantically meaningful results for structured data. Use Text Diff for prose, logs, and code; use JSON Diff for API responses and config objects.',
      },
      {
        question: 'Is whitespace significant in the comparison?',
        answer: 'Yes. Each line is compared exactly as written, so trailing spaces or tab-vs-space differences appear as changes. If whitespace differences are noise for your use case, trim your input before pasting.',
      },
      {
        question: 'Can I compare code files with Text Diff?',
        answer: 'Yes. Paste any code — JavaScript, Python, CSS, SQL, YAML, or any other language — and the line-by-line diff shows exactly what changed.',
      },
    ],
  },

  'base64-encoder': {
    intro: 'Base64 Encoder instantly encodes plain text to Base64 and decodes Base64 strings back to plain text. Both operations run simultaneously in your browser — no server, no uploads, no request logs. Handles standard Base64 and URL-safe Base64.',
    useCases: [
      'Encode API credentials for HTTP Authorization: Basic headers',
      'Decode a Base64-encoded JWT payload to inspect its contents before using JWT Debugger',
      'Convert text payloads to Base64 for safe embedding in JSON or XML',
      'Debug email MIME attachments or encoded content in network requests',
      'Encode configuration values for environment variables or data URIs',
    ],
    howItWorks: 'Paste any text and click Encode. The tool uses the browser\'s built-in btoa() with UTF-8 encoding via encodeURIComponent to produce standard Base64 output. Decoding uses atob() with URL-safe character normalization (replacing "-" with "+" and "_" with "/") plus RFC 3986 percent-decoding to recover the original string.',
    example: {
      input: 'Nadhebe tools run locally in your browser.',
      output: 'Base64 Encoded:\nTmFkaGViZSB0b29scyBydW4gbG9jYWxseSBpbiB5b3VyIGJyb3dzZXIu',
      label: 'Encoded result',
    },
    faq: [
      {
        question: 'What is Base64 used for?',
        answer: 'Base64 encodes binary data as ASCII text so it can be safely transmitted through text-only protocols. Common uses include HTTP Basic Auth headers (username:password), JWT payload encoding, inline data URIs for images, and MIME email attachments.',
      },
      {
        question: 'Does Base64 encrypt or protect my data?',
        answer: 'No. Base64 is an encoding scheme, not encryption. Anyone with a Base64 decoder can read the original content in seconds. Never rely on Base64 to conceal sensitive data — use proper encryption instead.',
      },
      {
        question: 'What is URL-safe Base64?',
        answer: 'Standard Base64 uses "+" and "/" characters, which have special meaning in URLs. URL-safe Base64 replaces them with "-" and "_". JWTs use URL-safe Base64. This tool handles both — it normalizes URL-safe characters when decoding.',
      },
      {
        question: 'Is there a character or size limit?',
        answer: 'No server limit exists — all encoding and decoding happens locally. Typical credentials, tokens, and short payloads encode instantly. Very large inputs may slow on older devices.',
      },
    ],
  },

  'url-parser': {
    intro: 'URL Parser breaks any URL into its individual components — protocol, hostname, port, path, query parameters, and hash fragment — and displays each part clearly. Useful for debugging API endpoints, OAuth redirects, UTM links, and any complex URL during development.',
    useCases: [
      'Extract and inspect query parameters from a complex redirect URL',
      'Debug API endpoint construction by separating path from query strings',
      'Parse OAuth callback URLs to extract authorization codes and state values',
      'Analyze UTM tracking parameters in marketing links',
      'Verify a URL is correctly formed before using it in code or configuration',
    ],
    howItWorks: 'Your input is passed to the browser\'s built-in URL constructor, which parses it according to the WHATWG URL Standard. Query parameters are extracted using URLSearchParams, producing a key-value listing. Invalid URLs trigger an "Invalid URL" error with a prompt to include the protocol — the most common omission.',
    example: {
      input: 'https://nadhebe.com/tools/json-formatter/?mode=beautify&source=demo#workspace',
      output: 'Protocol: https:\nHost: nadhebe.com\nPath: /tools/json-formatter/\nQuery:\n  mode: beautify\n  source: demo\nHash: #workspace',
      label: 'Parsed URL',
    },
    faq: [
      {
        question: 'Can I parse relative URLs like /tools/json-formatter/?',
        answer: 'No. The tool requires absolute URLs including the protocol (https:// or http://). Relative paths cannot be parsed without a base URL. Add your domain to make it absolute.',
      },
      {
        question: 'Does URL Parser handle percent-encoded characters?',
        answer: 'Yes. The WHATWG URL parser decodes percent-encoded characters (like %20 for space) automatically. Query parameter values are displayed in their decoded form.',
      },
      {
        question: 'Are my URLs stored anywhere?',
        answer: 'No. Parsing is entirely local using your browser\'s built-in URL API. Your URLs are never transmitted to any server.',
      },
      {
        question: 'What happens with malformed URLs?',
        answer: 'The tool returns an "Invalid URL" error. The most common cause is a missing protocol. Fix: add https:// to the beginning of your URL.',
      },
    ],
  },

  'jwt-debugger': {
    intro: 'JWT Debugger decodes any JWT token and displays the header and payload as formatted JSON. Use it to inspect token claims, check expiry, and verify algorithm during development — without sending tokens to a third-party server.',
    useCases: [
      'Inspect claims (sub, iat, exp, roles) inside a token during API development',
      'Verify an authentication token contains the expected user ID and permissions',
      'Check the exp claim to understand why a token is being rejected as expired',
      'Confirm the signing algorithm (alg) matches your security requirements',
      'Decode tokens from OAuth, Auth0, Cognito, Firebase, or any JWT-based auth system',
    ],
    howItWorks: 'A JWT is three Base64URL-encoded segments separated by dots: header.payload.signature. The tool splits on dots, normalizes URL-safe characters (replacing - with + and _ with /), adds RFC 4648 padding, then uses atob() to decode each segment and JSON.parse() to format the result. The signature is shown as Present or Missing but is not cryptographically verified.',
    example: {
      input: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0IiwibmFtZSI6Ik5hZGhlYmUiLCJpYXQiOjE3MTYyMzkwMjJ9.signature',
      output: 'Header\n{\n  "alg": "HS256",\n  "typ": "JWT"\n}\n\nPayload\n{\n  "sub": "1234",\n  "name": "Nadhebe",\n  "iat": 1716239022\n}\n\nSignature\nPresent',
      label: 'Decoded JWT',
    },
    faq: [
      {
        question: 'Is it safe to paste my JWT tokens here?',
        answer: 'JWT Debugger runs 100% in your browser — your token is never transmitted to any server. As a general security practice, avoid using production tokens with sensitive payloads in any browser tool. Use test tokens for debugging when possible.',
      },
      {
        question: 'Does this tool validate the JWT signature?',
        answer: 'No. Signature validation requires the secret key or public key and is intentionally not performed here. This tool reads token contents — not a security validator. Use your authentication library for signature verification.',
      },
      {
        question: 'What do "iat" and "exp" claims mean?',
        answer: '"iat" (Issued At) is a Unix timestamp for when the token was created. "exp" (Expiration) is when the token becomes invalid. Both are seconds since January 1, 1970 UTC. Divide by 1000 and use new Date() in JavaScript to convert to human-readable time.',
      },
      {
        question: 'What is the difference between JWT Debugger and JWT Inspector?',
        answer: 'Both tools decode JWT tokens. JWT Inspector provides additional timestamp analysis, displaying iat, exp, and nbf claims in human-readable UTC datetime format alongside the raw values. Use either for basic inspection.',
      },
    ],
  },

  'uuid-generator': {
    intro: 'UUID Generator creates cryptographically random UUID v4 identifiers using your browser\'s native crypto.randomUUID() API. Generate 8 UUIDs per click — entirely offline, no server, no tracking. The collision probability is effectively zero for any real-world use.',
    useCases: [
      'Generate unique IDs for database records, API resources, or test data fixtures',
      'Create idempotency keys for API requests that must not be processed twice',
      'Generate correlation IDs for distributed system request tracing',
      'Create unique filenames for uploads or temporary cloud storage objects',
      'Seed test databases with deterministic-safe unique primary keys',
    ],
    howItWorks: 'Each click calls crypto.randomUUID() eight times, a browser-native API backed by the operating system\'s cryptographically secure pseudo-random number generator (CSPRNG) — the same source used for TLS. UUID v4 format is xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx where x is random hex and y is one of 8, 9, a, or b. With 122 bits of randomness, the probability of collision is 1 in 5.3×10³⁶.',
    faq: [
      {
        question: 'What is UUID v4?',
        answer: 'UUID (Universally Unique Identifier) version 4 is randomly generated. It contains 122 bits of randomness, producing identifiers so statistically unlikely to collide that they are treated as guaranteed unique in practice.',
      },
      {
        question: 'What is the difference between UUID and GUID?',
        answer: 'GUID (Globally Unique Identifier) is Microsoft\'s name for the same concept. UUIDs and GUIDs are interchangeable — same format (8-4-4-4-12 hex), same length (36 characters), same collision properties.',
      },
      {
        question: 'Are these UUIDs truly random?',
        answer: 'Yes. This tool uses crypto.randomUUID(), which is backed by the OS CSPRNG — the same entropy source used for TLS key generation and cryptographic operations. These are not pseudo-random values.',
      },
      {
        question: 'When should I use a UUID instead of an auto-increment integer?',
        answer: 'UUIDs are better for distributed systems where multiple nodes generate IDs independently (no central counter), for IDs that must be unpredictable (security), or when you need to generate the ID on the client before a server round-trip.',
      },
    ],
  },

  // ─── Text Tools ──────────────────────────────────────────────────────────────

  'word-counter': {
    intro: 'Word Counter instantly counts words, characters, lines, and estimates reading time for any text. Paste a draft, article, or any block of text and get statistics immediately — useful for writers, content creators, students, and developers working against character limits.',
    useCases: [
      'Check word count for blog posts, essays, or articles before publishing',
      'Verify character count meets platform limits for meta descriptions, bios, or ad copy',
      'Estimate reading time for documentation or long-form content pages',
      'Count lines in log output, code snippets, or CSV exports',
      'Measure text length before passing it to an API with token or character limits',
    ],
    howItWorks: 'The tool splits your input on whitespace (spaces, newlines, tabs) to count words, counts every character including spaces for the character total, splits on newlines for line count, and divides word count by 220 (average adult reading speed in words per minute) to estimate reading time, rounding up to the nearest minute.',
    faq: [
      {
        question: 'What reading speed is used for the estimate?',
        answer: '220 words per minute — the established average adult silent reading speed for general content. Technical, academic, or dense content is typically processed at 150–180 wpm. Adjust the estimate based on your audience.',
      },
      {
        question: 'Does the character count include spaces?',
        answer: 'Yes. The total character count includes all spaces, punctuation, and special characters. This matches how most platforms count characters — Twitter, meta description guidelines, and ad copy tools all include spaces.',
      },
      {
        question: 'Does Word Counter work with languages other than English?',
        answer: 'Yes for space-delimited languages (Spanish, French, German, etc.). Word splitting is based on whitespace, which works for any language that uses spaces between words. Languages without word spaces (Chinese, Japanese) will show character count correctly but word count will be 1 for each unbroken block of text.',
      },
    ],
  },

  'reading-time-calculator': {
    intro: 'Reading Time Calculator estimates how long it takes to read any text at an average adult reading speed. Paste an article, blog post, or documentation page and get an immediate time estimate alongside word and character counts.',
    useCases: [
      'Add accurate reading time labels to blog posts and articles before publishing',
      'Check whether a piece of content is the right length for its intended format',
      'Calculate reading time for onboarding documentation or product guides',
      'Estimate if a newsletter issue is appropriately sized for your audience',
      'Calibrate your writing when working against a content length budget',
    ],
    howItWorks: 'The tool counts whitespace-separated words in your text and divides by 220 words per minute (the established average adult reading speed for general content). The result is rounded up to the nearest whole minute. For texts under 220 words, the result shows "1 min" — the practical minimum reading time estimate.',
    faq: [
      {
        question: 'Why 220 words per minute?',
        answer: '220 wpm is the widely accepted average for adult silent reading of general content. Research (Trauzettel-Klosinski & Dietz, 2012) puts the range at 200–250 wpm for most adults. Use 150–180 wpm for technical or scientific content when estimating for specialist audiences.',
      },
      {
        question: 'How do I add reading time to my blog automatically?',
        answer: 'Calculate it programmatically with: Math.ceil(wordCount / 220) + " min read". Count words by splitting on whitespace: text.trim().split(/\\s+/).length. Both operations work in any JavaScript environment.',
      },
      {
        question: 'What is the difference between Reading Time Calculator and Word Counter?',
        answer: 'They share the same underlying logic — both count words and estimate reading time. Reading Time Calculator focuses on the time estimate. Word Counter also shows character count and line count. Use whichever URL you remember more easily.',
      },
    ],
  },

  'case-converter': {
    intro: 'Case Converter transforms text between lowercase, UPPERCASE, Title Case, and camelCase in one click. No copying to a word processor — paste your text, get all four formats instantly, and copy the one you need.',
    useCases: [
      'Convert a headline to Title Case for article titles and heading tags',
      'Transform a phrase to camelCase for JavaScript variable or function names',
      'Normalize imported data by converting all text to consistent lowercase',
      'Produce UPPERCASE labels for constants, enum values, or environment variables',
      'Prepare a display name for a code identifier without manual retyping',
    ],
    howItWorks: 'The tool applies four transformations simultaneously to your input. lowercase: text.toLowerCase(). UPPERCASE: text.toUpperCase(). Title Case: capitalize the first letter of each whitespace-separated token. camelCase: strip non-alphanumeric characters, split on word boundaries, join with the first letter of each subsequent word capitalized, and lowercase the first character of the result.',
    faq: [
      {
        question: 'Does Case Converter support snake_case or kebab-case output?',
        answer: 'Currently the tool outputs lowercase, UPPERCASE, Title Case, and camelCase. For kebab-case, use the Slug Generator tool — it produces clean hyphen-separated lowercase output from any phrase. For snake_case, take camelCase output and insert underscores before uppercase letters.',
      },
      {
        question: 'How does camelCase handle punctuation and numbers?',
        answer: 'Non-alphanumeric characters (punctuation, symbols) are treated as word separators and stripped. Numbers are preserved as part of the surrounding word token. "version 2 release" becomes "version2Release".',
      },
      {
        question: 'Can I use camelCase output directly in code?',
        answer: 'Yes. The camelCase output follows standard JavaScript/TypeScript variable naming conventions. For PascalCase (class names), take the camelCase output and capitalize the first character.',
      },
    ],
  },

  'duplicate-remover': {
    intro: 'Duplicate Remover strips duplicate lines from any text input and returns only unique lines in their original order. Ideal for cleaning lists, deduplicating log entries, removing repeated keywords, or filtering any newline-separated data.',
    useCases: [
      'Remove duplicate entries from a list of email addresses or usernames',
      'Deduplicate repeated log lines when troubleshooting a noisy error stream',
      'Clean a list of tags, keywords, or categories with repeated entries',
      'Remove duplicate package names or file paths from a generated manifest',
      'Deduplicate any newline-separated export from a database query or spreadsheet column',
    ],
    howItWorks: 'The tool splits your input on newlines, then iterates through each line tracking seen values in a Set. The first occurrence of each line is kept; all subsequent occurrences are silently dropped. Empty lines are also removed. The output preserves the original top-to-bottom order of first appearances — no sorting is applied.',
    faq: [
      {
        question: 'Is the comparison case-sensitive?',
        answer: 'Yes. "Apple" and "apple" are treated as different lines. For case-insensitive deduplication, convert your text to lowercase with the Case Converter tool first, then run it through Duplicate Remover.',
      },
      {
        question: 'Does it preserve the original order?',
        answer: 'Yes. The tool always keeps the first occurrence of each duplicate and maintains the original sequence. Lines are never sorted or reordered.',
      },
      {
        question: 'Does it handle Windows line endings (CRLF)?',
        answer: 'Yes. Both Unix (LF) and Windows (CRLF) line endings are normalized correctly. The output uses standard Unix newlines.',
      },
    ],
  },

  'slug-generator': {
    intro: 'Slug Generator converts any title, phrase, or sentence into a clean, URL-safe slug — lowercase, hyphenated, with special characters removed. Essential for developers building CMS platforms, blogs, e-commerce catalogs, or any content with URL-addressable pages.',
    useCases: [
      'Generate a URL slug from an article title before publishing a blog post',
      'Create a clean, consistent filename from a document or page title',
      'Convert a product name to a URL-safe string for an e-commerce catalog',
      'Produce a stable database key from a user-provided label',
      'Transform section headings into anchor IDs for documentation pages',
    ],
    howItWorks: 'The tool lowercases the input, replaces "&" with "and" to preserve meaning, strips all characters that are not lowercase letters, numbers, or spaces, then replaces spaces and consecutive separators with a single hyphen. Leading and trailing hyphens are trimmed. The result is safe for use in any URL path segment.',
    example: {
      input: 'Build 500+ Browser Native Tools',
      output: 'build-500-browser-native-tools',
      label: 'URL slug',
    },
    faq: [
      {
        question: 'What characters does the tool remove?',
        answer: 'All characters except lowercase letters (a–z), numbers (0–9), and spaces are stripped. Spaces become hyphens. "Hello, World! (v2)" becomes "hello-world-v2".',
      },
      {
        question: 'How is Slug Generator different from UUID Generator?',
        answer: 'Slug Generator produces human-readable, SEO-friendly URL segments derived from your input text. UUID Generator produces cryptographically random opaque identifiers. Use slugs for public-facing URLs; use UUIDs for database primary keys and internal references.',
      },
      {
        question: 'Does it handle international or accented characters?',
        answer: 'Currently the tool strips non-ASCII characters entirely. For text with accented characters (é, ñ, ü), transliterate to ASCII first (e.g., é → e) before generating the slug. This is the most widely compatible approach for cross-platform URL safety.',
      },
    ],
  },

  // ─── Security ─────────────────────────────────────────────────────────────────

  'jwt-inspector': {
    intro: 'JWT Inspector decodes JWT tokens and displays the header and payload with additional analysis — including human-readable timestamps for iat, exp, and nbf claims. Useful for security review, token lifecycle debugging, and understanding token structure without exposing tokens to external services.',
    useCases: [
      'Verify token expiry in human-readable UTC datetime instead of Unix timestamps',
      'Inspect all claims in an access, refresh, or ID token during OAuth debugging',
      'Confirm the signing algorithm (HS256, RS256, ES256) matches your security requirements',
      'Audit token payloads for excessive permissions or missing required claims',
      'Debug authentication errors by comparing the exp claim timestamp to current time',
    ],
    howItWorks: 'JWT Inspector decodes the header and payload segments using Base64URL decoding (with padding normalization and URL-safe character substitution), then JSON-parses each section. Timestamp claims — iat (issued at), exp (expiration), and nbf (not before) — are detected and displayed alongside their ISO 8601 UTC datetime equivalents. The signature is not cryptographically verified.',
    faq: [
      {
        question: 'Does JWT Inspector verify the signature?',
        answer: 'No. Signature verification requires the signing secret or public key, which should never be pasted into a browser tool. This tool reads and analyzes token content only. Use your server-side authentication library for signature verification.',
      },
      {
        question: 'What is the difference between JWT Inspector and JWT Debugger?',
        answer: 'Both tools decode JWT tokens and show header and payload. JWT Inspector adds human-readable timestamp display for iat, exp, and nbf claims. If you need to quickly read a timestamp claim without mental Unix timestamp conversion, JWT Inspector is the better choice.',
      },
      {
        question: 'What are the standard JWT claims I should always check?',
        answer: '"sub" (subject — usually the user ID), "iss" (issuer — who created the token), "aud" (audience — intended recipient), "exp" (expiration Unix timestamp), "iat" (issued at Unix timestamp), "nbf" (not before — token is invalid before this time). Any additional claims are application-specific.',
      },
      {
        question: 'Is it safe to paste real JWTs here?',
        answer: 'JWT Inspector runs 100% locally in your browser — tokens are never sent to any server. As a best practice, use test tokens for debugging when possible and avoid pasting production tokens with sensitive claims into any browser tool.',
      },
    ],
  },

  // ─── SEO Tools ─────────────────────────────────────────────────────────────

  'serp-preview': {
    intro: 'SERP Preview simulates how your web page title tag, meta description, and URL breadcrumbs will render in Google Search results on both desktop and mobile screens. It calculates pixel widths in real-time so you can eliminate title truncation and maximize organic click-through rates.',
    useCases: [
      'Calculate title tag pixel width (~580px max on desktop, ~380px on mobile)',
      'Preview desktop vs mobile Google search result snippet layouts',
      'Optimize meta descriptions to prevent awkward text truncation with ellipses (...)',
      'Test breadcrumb structures and URL display formatting',
      'Increase organic search Click-Through Rate (CTR) before publishing articles',
    ],
    howItWorks: 'Input your page title, meta description, URL, and breadcrumbs. The tool uses a HTML5 Canvas element to measure the exact pixel width of your title string rendered in Google\'s standard 18px Arial/Roboto font. A visual status badge indicates whether your title fits within desktop and mobile SERP container boundaries.',
    faq: [
      {
        question: 'Why measure title tag length in pixels instead of characters?',
        answer: 'Google measures title tags in pixels (~580px on desktop) rather than character count. Capital letters like "W" take up more pixel space than "i" or "l", so two 55-character titles can render differently.',
      },
      {
        question: 'What is the maximum pixel width for Google desktop titles?',
        answer: 'Google allocates approximately 580 to 600 pixels on desktop SERPs. Titles exceeding 580px risk truncation.',
      },
    ],
  },

  'robots-tester': {
    intro: 'Robots.txt Tester & Auditor allows you to validate robots.txt directives, test URL accessibility for specific search crawlers (Googlebot, Bingbot, Baiduspider) and AI scrapers (GPTBot, CCBot), and detect sitemap declarations.',
    useCases: [
      'Audit whether Googlebot or Bingbot can access key landing page paths',
      'Verify directives blocking AI web scrapers like GPTBot or CCBot',
      'Check wildcard (*) matching rules against disallow paths',
      'Inspect sitemap location declarations in robots.txt files',
      'Prevent accidental site-wide indexing blocks during site migrations',
    ],
    howItWorks: 'Paste your robots.txt content, select a target user-agent crawler, and enter a test URL path. The tool parses User-agent blocks, Disallow, and Allow directives, matching rules against your path to determine whether the crawler is permitted or forbidden from accessing the URL.',
    faq: [
      {
        question: 'Does Disallow in robots.txt stop Google from indexing a URL?',
        answer: 'No. Disallow stops Googlebot from crawling the page content, but Google can still index the URL if external links point to it. Use a noindex meta tag to prevent indexing.',
      },
      {
        question: 'How do I block AI scrapers like GPTBot in robots.txt?',
        answer: 'Add "User-agent: GPTBot" followed by "Disallow: /" in your robots.txt file.',
      },
    ],
  },

  'canonical-checker': {
    intro: 'Canonical Tag Checker inspects HTML canonical link elements (<link rel="canonical">) to ensure your master page URLs are absolute HTTPS targets, free of tracking parameters, and properly configured to eliminate duplicate content issues.',
    useCases: [
      'Audit canonical tag syntax on single-page applications and CMS sites',
      'Detect relative canonical URLs that should be absolute HTTPS targets',
      'Verify canonical tags strip tracking query strings (?utm_source=)',
      'Inspect self-referencing canonical links across blog posts and tools',
      'Identify cross-domain canonical directives on syndicated articles',
    ],
    howItWorks: 'Input your page URL and canonical HREF target. The checker analyzes protocol specifications, checks query string cleanliness, verifies self-referencing status, and flags cross-domain canonicals.',
    faq: [
      {
        question: 'Why should canonical URLs be absolute instead of relative?',
        answer: 'Absolute URLs (https://example.com/page/) eliminate protocol and domain ambiguity for search engine crawlers.',
      },
      {
        question: 'What is a self-referencing canonical tag?',
        answer: 'A self-referencing canonical points a page to its own exact URL, protecting against URL parameter duplicates.',
      },
    ],
  },

  'schema-validator': {
    intro: 'JSON-LD Schema Validator checks structured data markup for syntax errors, validates Schema.org @context and @type definitions, verifies required properties, and ensures your markup qualifies for Google Rich Results.',
    useCases: [
      'Validate TechArticle, WebApplication, FAQPage, Organization, and Product schemas',
      'Prettify and format minified JSON-LD script blocks',
      'Detect missing required properties before deploying code to production',
      'Troubleshoot invalid JSON-LD syntax errors caused by missing commas or brackets',
      'Ensure compliance with Google Search Essentials structured data rules',
    ],
    howItWorks: 'Paste a JSON-LD payload or raw <script type="application/ld+json"> block. The tool parses the JSON structure, checks for @context and @type declarations, inspects core entity properties, and displays syntax diagnostic reports.',
    faq: [
      {
        question: 'Why is @context: "https://schema.org" required?',
        answer: 'The @context property defines the vocabulary schema dictionary search engines use to interpret entity types.',
      },
      {
        question: 'Do JSON-LD syntax errors prevent Rich Results?',
        answer: 'Yes. Any JSON syntax error causes search engine parsers to reject the entire structured data block.',
      },
    ],
  },

  'redirect-chain-checker': {
    intro: '301 Redirect Chain Checker traces multi-hop HTTP redirect paths (301, 302, 307, 308), estimates latency impact, calculates link equity retention, and helps developers streamline URL migration paths.',
    useCases: [
      'Trace multi-step 301/302 redirect chains during site domain migrations',
      'Identify redirect loops and excessive hops that waste crawl budget',
      'Calculate page load latency penalty caused by intermediate HTTP requests',
      'Ensure 301 permanent redirects pass 100% of link equity',
      'Generate direct 1-hop redirect rule recommendations for Nginx or Apache',
    ],
    howItWorks: 'Enter an initial request URL and simulated redirect steps. The tool parses each hop, tracks status codes, calculates estimated latency and link equity retention percentage, and displays a step-by-step path visualizer.',
    faq: [
      {
        question: 'Why are redirect chains bad for SEO?',
        answer: 'Redirect chains slow down page response time, waste crawl budget, and can cause crawlers to abandon requests after 5 hops.',
      },
      {
        question: 'How do I resolve a redirect chain?',
        answer: 'Update your server rules so the initial URL points directly to the final destination URL in a single 301 hop.',
      },
    ],
  },

  'seo-builder': {
    intro: 'SEO Content Outline Builder generates structured article frameworks (H1, H2, H3) designed around target search intent, primary keywords, and LSI subtopics to streamline content creation.',
    useCases: [
      'Generate structured Markdown article outlines for guides and tutorials',
      'Ensure proper H1 -> H2 -> H3 heading tag hierarchy for search scannability',
      'Map LSI target keywords and subtopics across article sections',
      'Plan target word counts and FAQ sections before writing content',
      'Create standardized content briefs for technical writers and authors',
    ],
    howItWorks: 'Input your article title, target keyword, content type, and word count goal. The builder outputs a structured Markdown outline complete with H1-H3 headings, section briefs, and FAQ placeholders.',
    faq: [
      {
        question: 'Why is logical heading hierarchy important for SEO?',
        answer: 'Heading tags (H1 -> H2 -> H3) help search engine crawlers parse article organization and core subtopics.',
      },
      {
        question: 'Can I export the outline directly to Markdown?',
        answer: 'Yes! The builder generates clean Markdown ready to copy directly into your content editor.',
      },
    ],
  },

  'seo-estimator': {
    intro: 'Organic Traffic & SERP CTR Estimator calculates expected monthly search traffic based on target keyword search volume, expected Google ranking position (#1 to #10), and empirical CTR distribution curves.',
    useCases: [
      'Estimate monthly organic traffic volume for target keyword opportunities',
      'Calculate equivalent monthly paid search ad value (CPC x Organic Visits)',
      'Model annual traffic ROI when moving from position #5 to position #1',
      'Compare traffic benchmarks across top 10 Google search positions',
      'Build revenue projections for content strategy business cases',
    ],
    howItWorks: 'Enter monthly search volume, target Google ranking position, and CPC value. The tool applies Google desktop CTR curves (Position #1 = 27.6%, Position #2 = 15.8%, etc.) to compute monthly visits, daily clicks, and annual traffic value.',
    faq: [
      {
        question: 'What is the average CTR for position #1 in Google?',
        answer: 'Position #1 averages approximately 27.6% CTR for non-branded informational search queries.',
      },
      {
        question: 'How does ranking position impact traffic volume?',
        answer: 'The top 3 Google search results capture over 54% of all clicks. Moving from position #5 to #1 boosts traffic by over 5.7x.',
      },
    ],
  },

  'seo-checker': {
    intro: 'On-Page SEO Quality Checker evaluates structural on-page factors — meta title length, meta description, H1 heading hierarchy, image alt text coverage, and internal link density — providing an actionable health score.',
    useCases: [
      'Audit on-page SEO factors for blog posts, landing pages, and developer tools',
      'Verify image alt text coverage across all inline image elements',
      'Check meta title and description character length bounds',
      'Ensure single H1 tag presence and subheading (H2) scannability',
      'Generate an on-page SEO health scorecard (0–100) before publishing',
    ],
    howItWorks: 'Input your page metadata, heading text, and image counts. The checker evaluates each element against SEO standards, calculates a weighted score (0–100), and highlights passing vs sub-optimal factors.',
    faq: [
      {
        question: 'Why should a page have exactly one H1 tag?',
        answer: 'The H1 tag serves as the primary topic title. Multiple H1 tags create hierarchy confusion for crawlers.',
      },
      {
        question: 'Why is image alt text important for SEO?',
        answer: 'Alt text provides accessibility for screen readers and allows Google Image Search to index visual media.',
      },
    ],
  },

  'seo-planner': {
    intro: 'Topical SEO Cluster & Content Roadmap Planner helps publishers design topical authority clusters, map pillar pages to supporting subtopic articles, and plan internal linking structures.',
    useCases: [
      'Design topical authority content clusters for technical domains',
      'Map pillar pages to supporting subtopic guides and tutorials',
      'Plan bi-directional internal linking structures to distribute PageRank',
      'Calculate Topical Authority Score based on subtopic completeness',
      'Build quarterly editorial content roadmaps for organic search growth',
    ],
    howItWorks: 'Input your main pillar page title, target keyword, and supporting subtopics. The planner generates a visual cluster map, checks subtopic coverage depth, and computes a Topical Authority Score (0–100).',
    faq: [
      {
        question: 'What is a topical SEO content cluster?',
        answer: 'A content cluster consists of 1 main pillar page linked bi-directionally to multiple detailed subtopic articles.',
      },
      {
        question: 'How many subtopic articles should a pillar page have?',
        answer: 'A comprehensive cluster typically features 1 pillar page supported by 5 to 12 subtopic guides.',
      },
    ],
  },

  'seo-inspector': {
    intro: 'Page Metadata & OpenGraph SEO Inspector parses raw HTML head code or page URLs to audit title tags, meta descriptions, canonical links, OpenGraph social cards (og:title, og:image), Twitter cards, and JSON-LD schema.',
    useCases: [
      'Inspect HTML head metadata on live or staging web pages',
      'Simulate social media visual cards (OpenGraph & Twitter Cards)',
      'Detect missing og:image or og:description tags before sharing links',
      'Audit canonical link tags and robots directives in page source code',
      'Verify JSON-LD structured data block presence in HTML head code',
    ],
    howItWorks: 'Paste a page URL or raw HTML <head> snippet. The inspector uses regex pattern matching to extract metadata elements, generates a social media card preview, and reports tag presence status.',
    faq: [
      {
        question: 'What happens if a page is missing og:image?',
        answer: 'Social platforms display a plain text link without a visual card preview, lowering social click-through rates.',
      },
      {
        question: 'What is the recommended size for og:image?',
        answer: 'Use 1200 x 630 pixels (1.91:1 aspect ratio) for crisp, full-width social card previews.',
      },
    ],
  },

  // ─── AI Tools ──────────────────────────────────────────────────────────────

  'prompt-optimizer': {
    intro: 'AI Prompt Optimizer transforms raw task descriptions into structured system prompts with assigned roles, context variables, negative constraints, and output format schemas for GPT-4o, Claude 3.5, and Gemini.',
    useCases: [
      'Build production system prompts with explicit roles and constraints',
      'Prevent LLM hallucinations by injecting negative rules',
      'Specify strict output formats (JSON schema, XML tags, Markdown)',
      'Optimize prompt structure for OpenAI, Anthropic, and Google models',
    ],
    howItWorks: 'Input an assigned role, raw task instruction, and target format. The tool compiles a structured XML system prompt enforcing identity, mission boundaries, rules, and output schemas.',
    faq: [
      {
        question: 'Why are role definitions important in system prompts?',
        answer: 'Assigning a role anchors the model\'s internal attention to domain-specific vocabulary and technical expectations.',
      },
    ],
  },

  'ai-prompt-generator': {
    intro: 'Multi-Persona AI Prompt Generator builds tailored system prompts across Software Engineering, SEO Strategy, Technical Writing, and Product Management roles.',
    useCases: [
      'Generate expert persona system prompts for developers and marketers',
      'Build XML-tagged prompt templates compatible with ChatGPT and Claude',
      'Define clear task goals, constraints, and runtime context variables',
    ],
    howItWorks: 'Select a target persona, input your core goal and rules. The generator outputs an XML-structured system prompt ready to paste into ChatGPT or Claude.',
    faq: [
      {
        question: 'How do I use generated prompts with ChatGPT or Claude?',
        answer: 'Copy the generated prompt and paste it into the System Instructions field in ChatGPT or at the top of your prompt window in Claude.',
      },
    ],
  },

  'prompt-improver': {
    intro: 'Vague AI Prompt Enhancer & Rewriter turns short prompts into high-performance instructions with Chain-of-Thought reasoning (<thinking>) and negative constraints.',
    useCases: [
      'Rewrite short, vague prompts into comprehensive execution briefs',
      'Inject Chain-of-Thought reasoning directives to reduce logic errors',
      'Add anti-hallucination rules and few-shot example placeholders',
    ],
    howItWorks: 'Paste a short prompt and select enhancement toggles. The improver injects thinking instructions, negative constraints, and sample formatting blocks.',
    faq: [
      {
        question: 'What is Chain-of-Thought (CoT) prompting?',
        answer: 'CoT prompting instructs the LLM to write out step-by-step reasoning before outputting final answers, reducing errors.',
      },
    ],
  },

  'ai-detection-checker': {
    intro: 'AI Text Perplexity & Burstiness Checker audits text for AI generation patterns using sentence length variance, vocabulary diversity, and common AI buzzword indicators.',
    useCases: [
      'Analyze sentence length variance (burstiness) in technical articles',
      'Detect overused AI buzzwords ("delve into", "tapestry of")',
      'Measure unique vocabulary diversity ratio across content drafts',
    ],
    howItWorks: 'Paste text into the auditor. The tool calculates standard deviation in sentence character count and flags predictable AI phrases.',
    faq: [
      {
        question: 'What is text Burstiness in AI detection?',
        answer: 'Burstiness measures variation in sentence length. Human writers naturally mix short punchy sentences with long complex ones.',
      },
    ],
  },

  'llm-tokenizer': {
    intro: 'LLM BPE Tokenizer & Multi-Model Counter estimates subword tokens across OpenAI (GPT-4o, O3-Mini), Anthropic (Claude 3.5), and Meta (Llama 3) models.',
    useCases: [
      'Count tokens for prompts, source code, and JSON payloads',
      'Inspect character-to-token efficiency ratios',
      'Prevent context window truncation and calculate API costs',
    ],
    howItWorks: 'Input prompt text or code. The tokenizer applies BPE subword estimation logic and computes character density, context window percentage, and input costs.',
    faq: [
      {
        question: 'Why do code payloads consume more tokens?',
        answer: 'Indentation spaces, JSON brackets, and punctuation require dedicated tokens, making code ~30% denser than prose.',
      },
    ],
  },

  'rag-evaluator': {
    intro: 'RAG Retrieval Precision & Recall Evaluator audits vector retrieval quality by calculating Precision@K, Recall@K, F1 Score, and Context Noise Ratio.',
    useCases: [
      'Audit vector database search precision and recall metrics',
      'Identify context noise chunks polluting LLM prompt windows',
      'Tune top-K retrieval parameters and re-ranking thresholds',
    ],
    howItWorks: 'Input top-K retrieved chunk count, relevant retrieved count, and ground-truth relevant count to calculate precision, recall, F1, and noise ratio.',
    faq: [
      {
        question: 'What is Precision@K in vector retrieval?',
        answer: 'Precision@K measures the percentage of retrieved chunks that are actually relevant (Relevant Retrieved / Total Retrieved).',
      },
    ],
  },

  'json-schema-validator': {
    intro: 'JSON Schema Validator & LLM Output Auditor checks JSON payloads against JSON Schema Draft 7 and 2020-12 standards to prevent runtime API crashes.',
    useCases: [
      'Audit LLM function calling and tool use JSON outputs',
      'Verify required keys, nested objects, and data types',
      'Catch malformed API arguments before sending data to backends',
    ],
    howItWorks: 'Input a JSON Schema and data payload. The validator parses both objects, checks required keys and property types, and reports syntax diagnostic errors.',
    faq: [
      {
        question: 'Why is JSON Schema essential for LLM Tool Calling?',
        answer: 'LLM APIs use JSON Schema to enforce structured outputs, ensuring function arguments match expected types.',
      },
    ],
  },

  'openai-cost-estimator': {
    intro: 'OpenAI API Cost Estimator calculates monthly spend for GPT-4o, GPT-4o-mini, O3-mini, and O1 models with prompt caching discount modeling.',
    useCases: [
      'Estimate monthly API costs based on request volume and token counts',
      'Model 50% prompt caching savings on static prefix prompts',
      'Compare cost differences between GPT-4o and GPT-4o-mini',
    ],
    howItWorks: 'Select a model, enter monthly requests and input/output tokens per request. The calculator applies official OpenAI rates and prompt caching discounts.',
    faq: [
      {
        question: 'What is Prompt Caching in OpenAI APIs?',
        answer: 'Prompt caching provides a 50% discount on input tokens for prompts longer than 1,024 tokens that reuse static prefix contexts.',
      },
    ],
  },

  'claude-cost-estimator': {
    intro: 'Anthropic Claude API Cost Estimator calculates monthly spend for Claude 3.5 Sonnet, Claude 3.5 Haiku, and Claude 3 Opus with prompt cache read discounts.',
    useCases: [
      'Model monthly API spend across Claude 3.5 Sonnet and Haiku',
      'Calculate 90% prompt cache read savings for large codebases',
      'Project annual API budget for autonomous agent systems',
    ],
    howItWorks: 'Select a model and token usage. The estimator applies Anthropic input, cached input, and output rates to report monthly and annual totals.',
    faq: [
      {
        question: 'How does Anthropic Prompt Caching work?',
        answer: 'Prompt caching allows you to cache static context for 5 minutes. Cache reads receive a 90% discount ($0.30 vs $3.00 per 1M input).',
      },
    ],
  },

  'gemini-cost-estimator': {
    intro: 'Google Gemini API Cost Estimator calculates monthly pricing for Gemini 1.5 Flash, Gemini 2.0 Flash, and Gemini 1.5 Pro across small and large context tiers.',
    useCases: [
      'Calculate API costs for 1M+ token context window requests',
      'Model 75% Context Caching discounts for large documents',
      'Compare pricing between Flash and Pro model tiers',
    ],
    howItWorks: 'Select a Gemini model and token payload bounds. The calculator applies Google rates and context caching discounts to report monthly costs.',
    faq: [
      {
        question: 'How does Gemini 1.5 Pro pricing scale for large prompts?',
        answer: 'For prompts >128k tokens up to 2M, input pricing increases to $2.50 per 1M and output to $10.00 per 1M.',
      },
    ],
  },

  // ─── Security & Developer Tools ─────────────────────────────────────────────

  'csp-header-generator': {
    intro: 'Content Security Policy (CSP) Header Generator builds secure Content-Security-Policy HTTP headers to restrict script, style, image, and font sources, blocking Cross-Site Scripting (XSS).',
    useCases: [
      'Generate XSS prevention headers for Nginx, Apache, and Cloudflare',
      'Configure script-src and style-src source directives',
      'Create report-only CSP policies for safe staging environments',
    ],
    howItWorks: 'Select a security preset and customize allowed script and style domains. The tool generates HTTP response headers and Nginx directives.',
    faq: [
      {
        question: 'What does default-src \'self\' mean?',
        answer: 'It restricts un-specified resource types to load exclusively from the exact same origin domain.',
      },
    ],
  },

  'hsts-header-generator': {
    intro: 'HTTP Strict Transport Security (HSTS) Generator builds Strict-Transport-Security response headers to enforce HTTPS and qualify for Google HSTS Preload List submission.',
    useCases: [
      'Enforce HTTPS connections across root domains and subdomains',
      'Generate 1-year max-age directives for HSTS Preload eligibility',
      'Output Nginx and Apache server configuration blocks',
    ],
    howItWorks: 'Select a max-age duration and toggle includeSubDomains and preload flags. The generator outputs header directives and server config snippets.',
    faq: [
      {
        question: 'What is the recommended max-age for HSTS preload?',
        answer: 'To qualify for the HSTS Preload List, max-age must be at least 31536000 seconds (1 year) with includeSubDomains and preload.',
      },
    ],
  },

  'x-frame-options-generator': {
    intro: 'X-Frame-Options Generator builds DENY and SAMEORIGIN HTTP headers to block iframe clickjacking attacks.',
    useCases: [
      'Protect web applications from iframe clickjacking attacks',
      'Generate DENY or SAMEORIGIN X-Frame-Options headers',
      'Export Nginx add_header configuration blocks',
    ],
    howItWorks: 'Select DENY or SAMEORIGIN. The tool formats response headers and Nginx server blocks.',
    faq: [
      {
        question: 'What is the difference between DENY and SAMEORIGIN?',
        answer: 'DENY blocks all framing across any domain. SAMEORIGIN permits framing only if the embedding page shares the exact same origin.',
      },
    ],
  },

  'cors-header-generator': {
    intro: 'CORS Access-Control Header Generator configures Access-Control-Allow-Origin, Methods, and Headers for cross-domain API sharing.',
    useCases: [
      'Generate CORS response headers for REST API endpoints',
      'Configure Access-Control-Allow-Credentials for session tokens',
      'Build Express.js CORS middleware snippets',
    ],
    howItWorks: 'Input allowed origin, methods, and headers. The generator outputs HTTP response headers and Express middleware.',
    faq: [
      {
        question: 'Why is wildcard Access-Control-Allow-Origin * dangerous with credentials?',
        answer: 'Browsers reject wildcard origins when credentials are enabled to prevent exposing user session data.',
      },
    ],
  },

  'jwt-encoder': {
    intro: 'JWT Token Generator & Base64URL Encoder generates JSON Web Tokens (JWT) client-side with HMAC SHA-256 (HS256) signatures.',
    useCases: [
      'Generate signed JWT access tokens for API testing',
      'Configure custom claims (sub, iat, exp, role) client-side',
      'Encode Base64URL header and payload segments',
    ],
    howItWorks: 'Input a secret key and JSON claims. The encoder formats header/payload segments and computes Base64URL token strings.',
    faq: [
      {
        question: 'Is this JWT generator safe to use locally?',
        answer: 'Yes! Token encoding runs 100% client-side in JavaScript without sending keys or payloads to external servers.',
      },
    ],
  },

  'uuid-v7-generator': {
    intro: 'Time-Ordered UUID v7 Generator produces 128-bit RFC 9562 time-ordered unique identifiers optimized for database B-Tree index performance.',
    useCases: [
      'Generate time-ordered UUID v7 primary keys in bulk',
      'Prevent B-Tree database index fragmentation in PostgreSQL & MySQL',
      'Extract creation timestamps from 48-bit time-ordered prefixes',
    ],
    howItWorks: 'Select quantity. The generator embeds current millisecond timestamps into 48-bit hex prefixes followed by cryptographically random bits.',
    faq: [
      {
        question: 'Why is UUID v7 better than UUID v4 for database primary keys?',
        answer: 'Time-ordered UUID v7 enables sequential append-only index insertions, preventing random disk I/O and page splitting.',
      },
    ],
  },

  // ─── Converter & Utility Tools ─────────────────────────────────────────────

  'sql-formatter': {
    intro: 'SQL Query Formatter & Prettifier cleans up raw, minified SQL queries by capitalizing core keywords and aligning JOINs, WHERE clauses, and subqueries.',
    useCases: [
      'Prettify unformatted SQL queries for PostgreSQL, MySQL, and BigQuery',
      'Capitalize SQL keywords (SELECT, FROM, WHERE, GROUP BY)',
      'Indent complex nested subqueries and JOIN conditions',
    ],
    howItWorks: 'Paste raw SQL text. The formatter applies regex pattern matching to capitalize keywords and insert structured line breaks.',
    faq: [
      {
        question: 'Why should SQL keywords be capitalized?',
        answer: 'Capitalizing keywords visually distinguishes structural command logic from table and column names.',
      },
    ],
  },

  'html-to-markdown': {
    intro: 'HTML to Markdown Converter parses raw HTML code snippets into clean GitHub Flavored Markdown (GFM) text.',
    useCases: [
      'Convert legacy HTML articles into Markdown for Astro or Next.js',
      'Transform HTML tables into Markdown pipe tables',
      'Strip unnecessary script and style tags from content drafts',
    ],
    howItWorks: 'Paste HTML code. The converter uses browser DOMParser to traverse nodes and output clean GFM syntax.',
    faq: [
      {
        question: 'Does the converter strip inline style tags?',
        answer: 'Yes! Inline CSS styles and script tags are stripped to produce clean Markdown text.',
      },
    ],
  },

  'markdown-to-html': {
    intro: 'Markdown to HTML Converter compiles GitHub Flavored Markdown (GFM) text into clean HTML5 markup.',
    useCases: [
      'Compile Markdown documentation into HTML for CMS publishing',
      'Render fenced code blocks inside pre and code tags',
      'Convert Markdown links and lists into semantic HTML elements',
    ],
    howItWorks: 'Input Markdown text. The converter parses headers, bold, italics, links, and lists into HTML tags.',
    faq: [
      {
        question: 'Is my Markdown sent to any external server?',
        answer: 'No! Compilation runs 100% locally in your browser.',
      },
    ],
  },

  'qr-code-generator': {
    intro: 'HTML5 Canvas QR Code Generator creates high-resolution QR codes directly in your browser with custom colors and instant PNG image download.',
    useCases: [
      'Generate QR codes for website URLs and Wi-Fi networks',
      'Customize foreground and background colors for high contrast',
      'Download high-res PNG image files for print and web',
    ],
    howItWorks: 'Input a URL or text string and select colors. The generator renders a 2D matrix barcode onto an HTML5 canvas element.',
    faq: [
      {
        question: 'Is my QR code data tracked?',
        answer: 'No! QR codes are generated 100% locally in your browser without tracking or server logs.',
      },
    ],
  },

  'json-repair': {
    intro: 'JSON Repair & Malformed Syntax Fixer automatically cleans up broken JSON outputs from LLMs, single quotes, unquoted object keys, and trailing commas.',
    useCases: [
      'Repair truncated or malformed LLM JSON API outputs',
      'Convert Python single quotes and literals (True, False, None) to JSON',
      'Fix unquoted keys and trailing commas before parsing',
    ],
    howItWorks: 'Input malformed JSON text. The repair engine applies string transformations and balances missing closing brackets to yield valid JSON.',
    faq: [
      {
        question: 'Why do LLMs produce invalid JSON?',
        answer: 'Token truncation, single quotes, and Python keyword substitutions break standard JSON parsers.',
      },
    ],
  },

  'json-path-finder': {
    intro: 'JSONPath Evaluator & Key Extractor queries nested JSON documents using standard JSONPath syntax to extract property lists and filter array items.',
    useCases: [
      'Query nested JSON document structures with JSONPath expressions',
      'Extract property values across array items using wildcard operators',
      'Inspect API payload trees without server processing',
    ],
    howItWorks: 'Input a JSON document and expression (e.g. $.store.book[*].title). The evaluator traverses the object tree and formats matching results.',
    faq: [
      {
        question: 'What does the $ symbol represent in JSONPath?',
        answer: 'The $ symbol represents the root object or array of the JSON document.',
      },
    ],
  },

  'cron-explainer': {
    intro: 'Cron Expression Generator & Explainer translates 5-field crontab schedules into clear, human-readable English and displays upcoming execution times.',
    useCases: [
      'Translate 5-part crontab expressions into plain English explanations',
      'Generate schedules for Linux crontab, Vercel Crons, and AWS CloudWatch',
      'Verify execution intervals using schedule presets',
    ],
    howItWorks: 'Input a 5-field cron expression. The translator parses minute, hour, day, month, and weekday fields to output human explanations.',
    faq: [
      {
        question: 'What does */15 * * * * mean?',
        answer: 'It means the job executes every 15 minutes, every hour, every day of the month and week.',
      },
    ],
  },

  'xml-to-json': {
    intro: 'XML to JSON Converter parses XML documents, tags, and attributes into structured JSON objects client-side.',
    useCases: [
      'Convert legacy XML API payloads and RSS feeds into JSON objects',
      'Map XML element attributes to @attribute JSON keys',
      'Group repeated sibling XML tags into JSON arrays',
    ],
    howItWorks: 'Paste XML code. The converter uses browser DOMParser to traverse nodes and produce clean formatted JSON.',
    faq: [
      {
        question: 'How are XML attributes converted to JSON?',
        answer: 'XML attributes are converted into child object keys prefixed with @ (e.g. "@id": "123").',
      },
    ],
  },

  'gpu-vram-calculator': {
    intro: 'LLM GPU VRAM Memory Requirement Calculator estimates GPU VRAM needed for running open-weights LLMs locally or in cloud cluster deployments.',
    useCases: [
      'Calculate required GPU VRAM across INT4, INT8, FP16, and FP32 quantization levels',
      'Estimate KV cache memory growth for 32k to 128k context windows',
      'Determine recommended GPU hardware configurations (NVIDIA H100, A100, RTX 4090)',
    ],
    howItWorks: 'Input parameter count in billions, quantization precision, and context length. The calculator computes weights, KV cache, and 20% CUDA buffer overhead.',
    faq: [
      {
        question: 'How much VRAM does Llama 3 70B FP16 require?',
        answer: 'Llama 3 70B FP16 requires ~140GB VRAM for model weights alone, plus KV cache overhead.',
      },
    ],
  },

  'cosine-similarity-calculator': {
    intro: 'Vector Embedding Cosine Similarity Calculator computes cosine similarity, dot product, and Euclidean distance between two vector embeddings client-side.',
    useCases: [
      'Compare similarity scores between two vector embedding arrays',
      'Test normalized dot products for vector search engines',
      'Calculate Euclidean L2 distance for vector spatial analysis',
    ],
    howItWorks: 'Paste 2 comma-separated number arrays. The calculator computes dot product, L2 magnitudes, and cosine similarity.',
    faq: [
      {
        question: 'What does a cosine similarity of 1.0 mean?',
        answer: 'A cosine similarity score of 1.0 indicates identical directional orientation in vector space.',
      },
    ],
  },

  'json-to-csv': {
    intro: 'JSON to CSV Converter transforms arrays of JSON objects into clean CSV spreadsheets client-side with RFC 4180 cell escaping.',
    useCases: [
      'Convert JSON API response arrays into Excel-compatible CSV files',
      'Flatten object structures into tabular header columns',
      'Download clean .csv spreadsheets directly to your local computer',
    ],
    howItWorks: 'Paste a JSON array of objects. The converter extracts object keys as CSV column headers and flattens nested values.',
    faq: [
      {
        question: 'How are commas inside string values escaped in CSV?',
        answer: 'Values containing commas or line breaks are automatically wrapped in double quotes according to RFC 4180.',
      },
    ],
  },

  'yaml-validator': {
    intro: 'YAML Syntax Validator & Linter checks space indentation, tab usage, and colon key-value formatting in Kubernetes and Docker Compose manifests.',
    useCases: [
      'Validate YAML syntax and indentation before deploying Kubernetes manifests',
      'Detect illegal TAB characters in YAML files',
      'Lint GitHub Actions and Docker Compose configuration files',
    ],
    howItWorks: 'Paste your YAML code. The linter inspects indentation, colons, and syntax rules line-by-line client-side.',
    faq: [
      {
        question: 'Why are tab characters disallowed in YAML?',
        answer: 'YAML specifies space-only indentation to guarantee consistent visual alignment across text editors.',
      },
    ],
  },

};





