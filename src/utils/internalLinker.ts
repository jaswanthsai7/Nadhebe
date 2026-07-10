interface TargetLink {
  title: string;
  url: string;
}

export function autoLinkArticles(html: string, targets: TargetLink[]): string {
  const sortedTargets = [...targets].sort((a, b) => b.title.length - a.title.length);
  const tokens = html.split(/(<[^>]+>)/g);
  const linkedTitles = new Set<string>();

  let skipContent = false;
  const skipTags = ['code', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'script', 'style', 'iframe'];
  let activeSkipTag: string | null = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.startsWith('<')) {
      const matchStart = token.match(/^<([a-zA-Z0-9]+)/);
      const matchEnd = token.match(/^<\/([a-zA-Z0-9]+)/);

      if (matchStart) {
        const tagName = matchStart[1].toLowerCase();
        if (skipTags.includes(tagName)) {
          skipContent = true;
          activeSkipTag = tagName;
        }
      }
      if (matchEnd) {
        const tagName = matchEnd[1].toLowerCase();
        if (activeSkipTag === tagName) {
          skipContent = false;
          activeSkipTag = null;
        }
      }
    } else {
      if (!skipContent && token.trim().length > 0) {
        let text = token;
        for (const target of sortedTargets) {
          if (linkedTitles.has(target.title.toLowerCase())) {
            continue;
          }

          const escapedTitle = target.title.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const regex = new RegExp(`\\b(${escapedTitle})\\b`, 'i');
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
