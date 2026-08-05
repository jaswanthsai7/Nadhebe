import type { ToolDefinition } from '../tool-schema';

export const slugGeneratorData: ToolDefinition = {
  id: 'slug-generator',
  slug: 'slug-generator',
  name: 'Slug Generator',
  aliases: ['URL Slug Maker', 'SEO Slug Creator', 'Text to URL Converter'],
  category: 'Text',
  tags: ['seo', 'url', 'slug', 'text', 'string'],
  intent: 'Generator',
  difficulty: 'Beginner',
  estimatedTime: '1 minute',

  inputs: [
    { name: 'text', type: 'string', default: 'This is a Title!' },
    { name: 'lowercase', type: 'boolean', default: true },
    { name: 'separator', type: 'string', default: '-' }
  ],
  outputs: [
    { name: 'slug', type: 'string', formats: ['txt'] }
  ],
  interactivePlayground: true,

  seo: {
    title: 'Free Slug Generator – Convert Text to SEO Friendly URLs',
    description: 'Convert text into SEO-friendly URL slugs instantly. Remove spaces, special characters, emojis and accents. Works completely in your browser.',
    keywords: ['slug generator', 'url slug', 'seo slug', 'string to slug', 'text to url'],
    cluster: 'SEO Formatting'
  },

  content: {
    intro: 'Instantly generate SEO-friendly slugs. Convert any text into a URL-friendly string by removing special characters, converting spaces to dashes, and normalizing accents.',
    useCases: [
      'Creating clean URLs for blog posts and articles',
      'Generating database keys from user input',
      'Normalizing file names before uploading',
      'Creating SEO-friendly ecommerce product links'
    ],
    mistakes: [
      {
        mistake: 'Leaving spaces in URLs (e.g., /my post title)',
        fix: 'Use a slug generator to replace spaces with hyphens (/my-post-title).'
      },
      {
        mistake: 'Using underscores instead of hyphens for SEO',
        fix: 'Google treats hyphens as word separators. Always prefer hyphens for SEO URLs.'
      }
    ],
    examples: [
      {
        input: 'The Best AI Tools in 2026!',
        output: 'the-best-ai-tools-in-2026',
        explanation: 'Converts spaces to dashes, lowers the case, and removes the exclamation mark.'
      },
      {
        input: 'café & restaurant',
        output: 'cafe-restaurant',
        explanation: 'Removes the ampersand and converts the accented é to a standard e.'
      }
    ],
    faq: [
      {
        question: 'What is a URL slug?',
        answer: 'A slug is the part of a URL that identifies a particular page on a website in a readable format.',
        example: 'In "https://example.com/blog/my-first-post", the slug is "my-first-post".'
      },
      {
        question: 'Why should I use URL slugs?',
        answer: 'Slugs are essential for SEO (Search Engine Optimization) and user experience. They make URLs readable for humans and give search engines clear context about what the page contains.'
      },
      {
        question: 'Is my text processed locally?',
        answer: 'Yes! All slug generation happens entirely in your web browser. No text is sent to our servers.'
      }
    ],
    peopleAlsoAsk: [
      'How to create a URL slug?',
      'Why are hyphens better than underscores in URLs?',
      'What characters are allowed in a slug?',
      'How does a slug affect SEO?'
    ]
  },

  ai: {
    summary: 'A fast, local slug generator that converts strings to URL-friendly formats.',
    llmDescription: 'A slug generator converts a title into a URL-safe string. It removes special characters, standardizes accents, and replaces spaces with a chosen separator (typically a hyphen).',
    markdown: 'Available via /tools/slug-generator.md',
    json: 'Available via /tools/slug-generator.json',
    prompt: 'Convert the following text into a URL slug separated by hyphens.',
    examples: ['Input: Hello World -> Output: hello-world'],
    citations: ['https://developers.google.com/search/docs/fundamentals/seo-starter-guide']
  },

  lifecycle: {
    version: '1.0.0',
    created: '2026-08-05T00:00:00Z',
    lastUpdated: '2026-08-05T00:00:00Z',
    deprecated: false,
    changelog: ['Initial release']
  }
};
