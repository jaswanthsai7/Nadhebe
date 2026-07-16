export interface ToolItem {
  name: string;
  slug: string;
  description: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
}

export interface ToolCategory {
  name: string;
  slug: string;
  description: string;
  icon: string;
  tools: ToolItem[];
}

export const toolsData: ToolCategory[] = [
  {
    name: 'AI Tools',
    slug: 'ai',
    description: 'Calculators, model cost analyzers, and advanced prompt engineering dashboards.',
    icon: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z',
    tools: [
      {
        name: 'LLM Pricing Calculator',
        slug: 'llm-pricing-calculator',
        description: 'Estimate API hosting and execution costs across OpenAI, Anthropic, and Google Gemini models.',
        keywords: ['llm pricing calculator', 'api cost calculator', 'openai pricing model', 'claude api cost estimator'],
        faqs: [
          {
            question: "How does the LLM Pricing Calculator calculate costs?",
            answer: "It multiplies the number of input (prompt) and output (completion) tokens by the respective model's price per million tokens, returning a clean, aggregate cost estimate."
          },
          {
            question: "Are the API model pricing tiers up to date?",
            answer: "Yes, this calculator includes July 2026 rates, such as the GPT-5.6 Soul/Terra pricing and latest Claude/Gemini API gateway models."
          }
        ]
      }
    ]
  },
  {
    name: 'Developer Tools',
    slug: 'developer',
    description: 'Instant utilities for developers: UUID v4 generators, secure keys, and code text formatters.',
    icon: 'M16 18l6-6-6-6M8 6l-6 6 6 6M12 2l-4 20',
    tools: [
      {
        name: 'UUID Generator',
        slug: 'uuid-generator',
        description: 'Generate secure Version 4 UUIDs (Universally Unique Identifiers) in bulk.',
        keywords: ['uuid generator', 'generate uuid v4', 'online uuid creator', 'bulk uuid generator'],
        faqs: [
          {
            question: "What is a UUID Version 4?",
            answer: "A UUID Version 4 is a universally unique identifier generated using random numbers. It contains 122 bits of entropy, making the probability of a collision practically zero."
          },
          {
            question: "Is this UUID generator secure?",
            answer: "Yes. It uses the browser's crypto.getRandomValues() API, which is a cryptographically strong pseudo-random number generator (CSPRNG), executed fully client-side."
          }
        ]
      },
      {
        name: 'Password Generator',
        slug: 'password-generator',
        description: 'Generate strong, secure passwords with customized length, symbols, numbers, and case rules.',
        keywords: ['password generator', 'secure password generator', 'random password creator', 'generate strength password'],
        faqs: [
          {
            question: "What makes a password cryptographically secure?",
            answer: "Password strength is determined by length and entropy. Combining numbers, symbols, uppercase, and lowercase letters across 16+ characters creates exponential complexity."
          },
          {
            question: "Are generated passwords saved?",
            answer: "No. The generator runs 100% locally in your browser sandbox. No parameters or output values are transmitted to any server."
          }
        ]
      },
      {
        name: 'JSON Formatter',
        slug: 'json-formatter',
        description: 'Beautify, parse, validate, and minify raw JSON string trees with error checks.',
        keywords: ['json formatter', 'json validator', 'beautify json online', 'minify json tree'],
        faqs: [
          {
            question: "How does the JSON validator detect errors?",
            answer: "It parses the input using sandboxed browser JSON engine, catching syntax issues (like missing commas or unquoted keys) and pinpoints the line failure."
          },
          {
            question: "Is my JSON text uploaded?",
            answer: "Never. All data parsing, validation, and layout tree styling are handled completely in-browser."
          }
        ]
      },
      {
        name: 'Base64 Encoder/Decoder',
        slug: 'base64',
        description: 'Convert standard text strings to Base64 encoded format or decode Base64 strings back to text.',
        keywords: ['base64 encoder', 'base64 decoder', 'decode base64 online', 'encode base64 string'],
        faqs: [
          {
            question: "What is Base64 encoding?",
            answer: "Base64 is a binary-to-text encoding scheme that translates binary data into a set of 64 ASCII characters, safely preserving data format during transmission across text-only protocols."
          },
          {
            question: "Does this Base64 decoder support Unicode?",
            answer: "Yes, it encodes and decodes Unicode/UTF-8 strings accurately without raising malformed character warnings."
          }
        ]
      }
    ]
  },
  {
    name: 'Text Tools',
    slug: 'text',
    description: 'Markdown compilers, character counters, word density tools, and reading time calculators.',
    icon: 'M4 7V4h16v3M9 20h6M12 4v16',
    tools: [
      {
        name: 'Word Counter',
        slug: 'word-counter',
        description: 'Calculate real-time reading speed, word count, character totals, and average reading time.',
        keywords: ['word counter', 'character counter online', 'reading time calculator', 'text word checker'],
        faqs: [
          {
            question: "How is reading time computed?",
            answer: "We divide the total word count by an average reading speed of 220 words per minute (WPM), returning a standard minute metric."
          },
          {
            question: "Does it count spaces or punctuation?",
            answer: "The counter displays both characters-including-spaces and characters-excluding-spaces to accommodate different formatting requirements."
          }
        ]
      },
      {
        name: 'Markdown to HTML',
        slug: 'markdown-to-html',
        description: 'Convert raw Markdown syntax strings instantly to clean, validated HTML markup codes.',
        keywords: ['markdown to html', 'convert markdown online', 'markdown compiler', 'html to markdown'],
        faqs: [
          {
            question: "Which Markdown specs are supported?",
            answer: "It supports standard CommonMark styling including headers, bold/italic accents, lists, blockquotes, horizontal rules, links, and inline code."
          },
          {
            question: "Is the output HTML sanitized?",
            answer: "Yes, the HTML compiler runs inside sandboxed DOM structures, ensuring script injection elements are neutralized."
          }
        ]
      }
    ]
  },
  {
    name: 'SEO Tools',
    slug: 'seo',
    description: 'Robots.txt builders, SERP simulation checkers, sitemaps, and metadata generators.',
    icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM9 12l2 2 4-4',
    tools: [
      {
        name: 'Robots.txt Generator',
        slug: 'robots-generator',
        description: 'Generate standardized robots.txt files for search engine crawler crawl limits.',
        keywords: ['robots.txt generator', 'create robots.txt', 'online robots builder', 'seo robots txt'],
        faqs: [
          {
            question: "What is a robots.txt file?",
            answer: "A robots.txt file is a crawler guidance instruction file placed in a site's root directory, outlining which directories search engine spiders (like Googlebot) are allowed to index."
          },
          {
            question: "Does robots.txt protect sensitive files?",
            answer: "No. Robots.txt is public and can be ignored by malicious crawlers. Use server authorization or noindex meta tags for secure data directories."
          }
        ]
      },
      {
        name: 'SEO Meta Generator',
        slug: 'meta-generator',
        description: 'Build fully optimized SEO title and description tags with a live Google search result visual preview.',
        keywords: ['seo meta generator', 'title tag optimizer', 'google serp simulator', 'seo metadata preview'],
        faqs: [
          {
            question: "What are the optimal lengths for SEO titles and descriptions?",
            answer: "Google typically displays titles up to 60 characters and descriptions up to 155-160 characters before truncating them in search results."
          },
          {
            question: "Does the SERP preview match actual Google results?",
            answer: "Yes, it simulates standard pixel widths (600px container for titles, 960px container for descriptions) to reflect true truncation visual limits."
          }
        ]
      }
    ]
  },
  {
    name: 'YouTube Tools',
    slug: 'youtube',
    description: 'Widescreen thumbnail extractors, metadata builders, and tag cleaners.',
    icon: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25a29 29 0 0 0-.46-5.33zM10 15V9l5 3-5 3z',
    tools: [
      {
        name: 'YouTube Thumbnail Downloader',
        slug: 'thumbnail-downloader',
        description: 'Extract and download high-resolution cover image formats directly from a video URL.',
        keywords: ['youtube thumbnail downloader', 'download youtube thumbnail', 'extract video cover image', 'hq youtube thumbnail'],
        faqs: [
          {
            question: "How do I extract a YouTube thumbnail cover?",
            answer: "Simply paste the YouTube video link (or video ID). The tool extracts the ID, maps the CDN thumbnail paths, and presents download links for MaxRes (1080p), High (480p), and Standard formats."
          },
          {
            question: "Where are the cover images stored?",
            answer: "They are hosted directly on YouTube's secure image CDN (img.youtube.com). The downloader maps the URL locally and down-links them without server redirections."
          }
        ]
      }
    ]
  },
  {
    name: 'Image Tools',
    slug: 'image',
    description: 'Lossless compressors, format converters, and markup optimizers.',
    icon: 'M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 9-4.5-6-3.5 4.5-2.5-3L3 19h16.5z',
    tools: []
  },
  {
    name: 'Video Tools',
    slug: 'video',
    description: 'High-speed compressors, frame extractors, and subtitle generators.',
    icon: 'M23 7l-7 5 7 5V7zM1 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1z',
    tools: []
  },
  {
    name: 'Prompt Tools',
    slug: 'prompt',
    description: 'System prompt compiler engines for Claude, ChatGPT, Gemini, and Cursor.',
    icon: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    tools: []
  },
  {
    name: 'Utilities',
    slug: 'utilities',
    description: 'CSV-JSON converters, Cron generators, SQL formatters, and minifiers.',
    icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
    tools: []
  }
];
