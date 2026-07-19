export interface GeneratedArticle {
  title: string;
  description: string;
  folder: string;
  slug: string;
  content: string;
  tags?: string[];
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  searchIntent?: string;
  topic?: string;
  faq?: { question: string; answer: string }[];
  sources?: { label: string; url: string }[];
}

export class MdxBuilder {
  static build(
    article: GeneratedArticle,
    videoId: string,
    videoUrl: string
  ): string {
    const title = article.title.trim().replace(/"/g, '\\"');
    const description = article.description.trim().replace(/"/g, '\\"');
    const slug = article.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    const folder = article.folder.trim().toLowerCase();
    
    // Resolve Astro-compliant category
    const categoryMapping: Record<string, string> = {
      'news': 'News',
      'tutorials': 'Tutorials',
      'youtube-articles': 'YouTube Articles',
      'tool-reviews': 'Tool Reviews',
      'prompts': 'Prompts',
      'comparisons': 'Comparisons',
      'best-practices': 'Best Practices',
      'use-cases': 'Use Cases',
      'tools': 'Tools',
      'guides': 'Guides',
      'frameworks': 'Frameworks',
      'case-studies': 'Case Studies'
    };
    const category = article.category || categoryMapping[folder] || 'General';

    // Format FAQ block
    const faq = article.faq || [
      {
        question: `What is the main focus of this ${category}?`,
        answer: article.description
      }
    ];

    // Format Sources block
    const sources = article.sources || [
      {
        label: 'Source Reference Video',
        url: videoUrl
      }
    ];

    const tags = article.tags || ['ai', folder];
    const difficulty = article.difficulty || 'intermediate';
    const searchIntent = article.searchIntent || `${category} details for ${title}`;
    const topic = article.topic || category;

    // Use high-res maxresdefault as primary, fallback to standard img.youtube.com url if needed
    const heroImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    // Construct frontmatter lines cleanly
    let yaml = '---\n';
    yaml += `title: "${title}"\n`;
    yaml += `description: "${description}"\n`;
    yaml += `pubDate: ${new Date().toISOString().split('T')[0]}\n`;
    yaml += `author: bob-smith\n`;
    yaml += `category: "${category}"\n`;
    yaml += `tags: [${tags.map(t => `"${t.replace(/"/g, '\\"')}"`).join(', ')}]\n`;
    yaml += `heroImage: "${heroImage}"\n`;
    yaml += `heroAlt: "Dynamic video preview for ${title}"\n`;
    yaml += `draft: false\n`;
    yaml += `topic: "${topic.replace(/"/g, '\\"')}"\n`;
    yaml += `isPillar: false\n`;
    yaml += `searchIntent: "${searchIntent.replace(/"/g, '\\"')}"\n`;
    yaml += `difficulty: "${difficulty}"\n`;
    yaml += `youtubeVideoId: "${videoId}"\n`;
    yaml += `youtubeVideoUrl: "${videoUrl}"\n`;
    
    // Append structured FAQ array
    yaml += 'faq:\n';
    faq.forEach(item => {
      yaml += `  - question: "${item.question.replace(/"/g, '\\"')}"\n`;
      yaml += `    answer: "${item.answer.replace(/"/g, '\\"')}"\n`;
    });

    // Append sources array
    yaml += 'sources:\n';
    sources.forEach(item => {
      yaml += `  - label: "${item.label.replace(/"/g, '\\"')}"\n`;
      yaml += `    url: "${item.url}"\n`;
    });

    yaml += '---\n\n';

    // Append markdown content body
    let body = article.content.trim();
    if (!body.startsWith('# ')) {
      body = `# ${article.title}\n\n${body}`;
    }

    return `${yaml}${body}\n`;
  }
}
