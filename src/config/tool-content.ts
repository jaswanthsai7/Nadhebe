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

};
