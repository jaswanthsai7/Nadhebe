import { INTERNAL_LINK_DICTIONARY, type InternalLinkTarget } from '../config/internalLinks';

interface TargetLink {
  title: string;
  url: string;
}

export function autoLinkArticles(
  html: string,
  customTargets: TargetLink[] = [],
  currentUrl?: string
): string {
  // Normalize current URL if provided
  const normalizedCurrentUrl = currentUrl ? currentUrl.replace(/\/$/, '') : '';

  // Merge dictionary targets with article targets
  const allTargets: TargetLink[] = [
    ...customTargets,
    ...INTERNAL_LINK_DICTIONARY.map((item) => ({ title: item.keyword, url: item.url })),
  ];

  // Filter out self-referencing targets
  const eligibleTargets = allTargets.filter((target) => {
    const targetUrlNorm = target.url.replace(/\/$/, '');
    return !normalizedCurrentUrl || targetUrlNorm !== normalizedCurrentUrl;
  });

  // Sort longest targets first to prevent sub-string collision (e.g. 'Claude Code Hooks' before 'Claude Code')
  const sortedTargets = [...eligibleTargets].sort((a, b) => b.title.length - a.title.length);

  // Split HTML strictly into HTML tags vs text nodes
  const tokens = html.split(/(<[^>]+>)/g);
  const linkedTitles = new Set<string>();

  // Tags whose children content MUST NOT be modified
  const skipContainerTags = new Set([
    'head',
    'script',
    'style',
    'code',
    'pre',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'a',
    'iframe',
    'button',
    'figcaption',
    'svg',
    'textarea',
    'title',
  ]);

  const tagStack: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.startsWith('<')) {
      // Opening or self-closing tag
      const matchStart = token.match(/^<([a-zA-Z0-9]+)/);
      const matchEnd = token.match(/^<\/([a-zA-Z0-9]+)/);

      if (matchEnd) {
        const tagName = matchEnd[1].toLowerCase();
        const lastIdx = tagStack.lastIndexOf(tagName);
        if (lastIdx !== -1) {
          tagStack.splice(lastIdx);
        }
      } else if (matchStart && !token.endsWith('/>')) {
        const tagName = matchStart[1].toLowerCase();
        tagStack.push(tagName);
      }
    } else {
      // Text node execution: check if any skip tag is active in tagStack
      const isInsideSkipTag = tagStack.some((t) => skipContainerTags.has(t));

      if (!isInsideSkipTag && token.trim().length > 0) {
        let text = token;

        for (const target of sortedTargets) {
          if (linkedTitles.has(target.title.toLowerCase())) {
            continue;
          }

          const escapedTitle = target.title.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          // Strict boundaries preventing matches inside slugs, URLs, or hyphens (e.g. aws-vllm or /vllm-guide)
          const regex = new RegExp(`(?<![A-Za-z0-9\\-_/])(${escapedTitle})(?![A-Za-z0-9\\-_/])`, 'i');
          const match = text.match(regex);

          if (match) {
            const matchedText = match[1];
            text = text.replace(
              regex,
              `<a href="${target.url}" class="text-accent dark:text-accent-dark hover:underline font-medium">${matchedText}</a>`
            );
            linkedTitles.add(target.title.toLowerCase());
          }
        }

        tokens[i] = text;
      }
    }
  }

  return tokens.join('');
}
