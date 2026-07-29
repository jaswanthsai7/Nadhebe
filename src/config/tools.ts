export interface ToolMetadata {
  id: string;
  name: string;
  slug: string;
  href: string;
  description: string;
  category: ToolCategory;
  icon: string;
  badge?: 'Popular' | 'New';
  tags: string[];
}

export type ToolCategory =
  | 'Image & Dimensions'
  | 'CSS & Frontend'
  | 'Developer'
  | 'SEO & Webmaster'
  | 'Text & Content'
  | 'Social & Creator';

export const TOOL_CATEGORIES: ToolCategory[] = [
  'Image & Dimensions',
  'CSS & Frontend',
  'Developer',
  'SEO & Webmaster',
  'Text & Content',
  'Social & Creator',
];

export const TOOLS: ToolMetadata[] = [
  // Developer Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    href: '/tools/json-formatter/',
    description: 'Format, beautify, and validate JSON instantly with syntax checking and collapsible tree inspection.',
    category: 'Developer',
    icon: 'code',
    badge: 'Popular',
    tags: ['json', 'formatter', 'beautify', 'pretty print', 'developer tools'],
  },
  {
    id: 'json-validator',
    name: 'JSON Validator',
    slug: 'json-validator',
    href: '/tools/json-validator/',
    description: 'Validate JSON structure and syntax errors with clear line numbers and error diagnostics.',
    category: 'Developer',
    icon: 'check-circle',
    tags: ['json', 'validator', 'syntax check', 'lint', 'developer tools'],
  },
  {
    id: 'json-minifier',
    name: 'JSON Minifier',
    slug: 'json-minifier',
    href: '/tools/json-minifier/',
    description: 'Compress and minify JSON data by stripping whitespace and comments for optimal payload size.',
    category: 'Developer',
    icon: 'minimize-2',
    tags: ['json', 'minifier', 'compress', 'compact json', 'developer tools'],
  },
  {
    id: 'json-to-xml',
    name: 'JSON ↔ XML',
    slug: 'json-to-xml',
    href: '/tools/json-to-xml/',
    description: 'Convert JSON data to formatted XML tags or parse XML structures into clean JSON objects.',
    category: 'Developer',
    icon: 'repeat',
    tags: ['json', 'xml', 'converter', 'transform', 'developer tools'],
  },
  {
    id: 'yaml-to-json',
    name: 'YAML ↔ JSON',
    slug: 'yaml-to-json',
    href: '/tools/yaml-to-json/',
    description: 'Convert YAML configuration files into JSON and vice-versa with schema validation.',
    category: 'Developer',
    icon: 'file-text',
    tags: ['yaml', 'json', 'converter', 'config', 'developer tools'],
  },
  {
    id: 'xml-formatter',
    name: 'XML Formatter',
    slug: 'xml-formatter',
    href: '/tools/xml-formatter/',
    description: 'Format, indent, and sanitize raw XML strings into clean readable hierarchies.',
    category: 'Developer',
    icon: 'file-code',
    tags: ['xml', 'formatter', 'beautify', 'indentation', 'developer tools'],
  },

  // SEO & Webmaster Tools
  {
    id: 'opportunity-radar',
    name: 'Nadhebe Opportunity Radar',
    slug: 'opportunity-radar',
    href: '/tools/opportunity-radar/',
    description: 'Discover emerging topics and content gaps your website should cover next based on sitemap analysis.',
    category: 'SEO & Webmaster',
    icon: 'radar',
    badge: 'New',
    tags: ['opportunity radar', 'content gap', 'trending topics', 'seo tool', 'sitemap analyzer', 'content strategy'],
  },
  {
    id: 'sitemap-validator',
    name: 'Sitemap & Robots Analyzer',
    slug: 'sitemap-validator',
    href: '/tools/sitemap-validator/',
    description: 'Validate sitemap XML markup, check URL accessibility, and inspect robots.txt directive compliance.',
    category: 'SEO & Webmaster',
    icon: 'file-text',
    badge: 'New',
    tags: ['sitemap', 'robots.txt', 'seo analyzer', 'xml sitemap', 'indexing'],
  },
  {
    id: 'meta-tag-analyzer',
    name: 'OpenGraph & Meta Tag Checker',
    slug: 'meta-tag-analyzer',
    href: '/tools/meta-tag-analyzer/',
    description: 'Inspect OpenGraph social preview tags, Twitter cards, meta descriptions, and page title metrics.',
    category: 'SEO & Webmaster',
    icon: 'share-2',
    tags: ['meta tags', 'opengraph', 'social preview', 'twitter card', 'seo checker'],
  },
  {
    id: 'schema-generator',
    name: 'JSON-LD Schema Generator',
    slug: 'schema-generator',
    href: '/tools/schema-generator/',
    description: 'Generate structured JSON-LD schemas for WebPage, Article, Product, FAQ, and LocalBusiness markup.',
    category: 'SEO & Webmaster',
    icon: 'database',
    tags: ['json-ld', 'schema markup', 'structured data', 'rich snippets', 'seo generator'],
  },

  // Image & Dimensions Tools
  {
    id: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    slug: 'aspect-ratio-calculator',
    href: '/tools/aspect-ratio-calculator/',
    description: 'Calculate simplified aspect ratios, decimal ratios, orientation, missing dimensions, and common resolutions.',
    category: 'Image & Dimensions',
    icon: 'aspect-ratio',
    badge: 'Popular',
    tags: ['aspect ratio', 'width height ratio', '16:9', 'resolution', 'resize'],
  },
  {
    id: 'resize-dimensions-calculator',
    name: 'Resize Dimensions Calculator',
    slug: 'resize-dimensions-calculator',
    href: '/tools/resize-dimensions-calculator/',
    description: 'Resize image or canvas dimensions proportionally while maintaining original aspect ratio or using percentage scaling.',
    category: 'Image & Dimensions',
    icon: 'scaling',
    badge: 'Popular',
    tags: ['resize', 'dimensions', 'scale', 'aspect ratio lock', 'percentage resize'],
  },
  {
    id: 'pixels-to-megapixels-calculator',
    name: 'Pixels to Megapixels Calculator',
    slug: 'pixels-to-megapixels-calculator',
    href: '/tools/pixels-to-megapixels-calculator/',
    description: 'Convert width and height pixel dimensions or total raw pixel count into megapixels instantly.',
    category: 'Image & Dimensions',
    icon: 'camera',
    tags: ['pixels', 'megapixels', 'MP', 'resolution', 'camera resolution'],
  },
  {
    id: 'megapixels-to-resolution-calculator',
    name: 'Megapixels to Resolution Calculator',
    slug: 'megapixels-to-resolution-calculator',
    href: '/tools/megapixels-to-resolution-calculator/',
    description: 'Calculate exact pixel width and height resolutions for given megapixels and target aspect ratios.',
    category: 'Image & Dimensions',
    icon: 'grid',
    tags: ['megapixels', 'resolution', 'width height', 'camera sensor', 'aspect ratio'],
  },
  {
    id: 'ppi-calculator',
    name: 'PPI Calculator (Pixels Per Inch)',
    slug: 'ppi-calculator',
    href: '/tools/ppi-calculator/',
    description: 'Calculate screen pixel density (PPI) from resolution dimensions and physical diagonal screen size.',
    category: 'Image & Dimensions',
    icon: 'monitor',
    tags: ['ppi', 'pixels per inch', 'density', 'screen resolution', 'display'],
  },
  {
    id: 'dpi-print-size-calculator',
    name: 'DPI / Print Size Calculator',
    slug: 'dpi-print-size-calculator',
    href: '/tools/dpi-print-size-calculator/',
    description: 'Convert digital pixel dimensions to physical print size in inches, cm, or mm at any DPI resolution.',
    category: 'Image & Dimensions',
    icon: 'printer',
    tags: ['dpi', 'print size', '300 dpi', 'inches', 'centimeters', 'printing'],
  },
  {
    id: '16-9-dimensions-calculator',
    name: '16:9 Dimensions Calculator',
    slug: '16-9-dimensions-calculator',
    href: '/tools/16-9-dimensions-calculator/',
    description: 'Quickly compute missing width or height dimensions specifically for standard widescreen 16:9 videos and displays.',
    category: 'Image & Dimensions',
    icon: 'tv',
    badge: 'Popular',
    tags: ['16:9', 'widescreen', '1080p', '4k', 'video dimensions'],
  },

  // Social & Creator Tools
  {
    id: '9-16-dimensions-calculator',
    name: '9:16 Dimensions Calculator',
    slug: '9-16-dimensions-calculator',
    href: '/tools/9-16-dimensions-calculator/',
    description: 'Calculate 9:16 vertical video dimensions for Shorts, Reels, Stories, and mobile full-screen content.',
    category: 'Social & Creator',
    icon: 'smartphone',
    badge: 'Popular',
    tags: ['9:16', 'vertical video', 'shorts', 'reels', 'tiktok', 'mobile dimensions'],
  },
  {
    id: 'youtube-video-size-calculator',
    name: 'YouTube Video Size & Resolution Calculator',
    slug: 'youtube-video-size-calculator',
    href: '/tools/youtube-video-size-calculator/',
    description: 'Interactive helper for YouTube video resolutions across 16:9 landscape, 9:16 Shorts, and 1:1 square formats.',
    category: 'Social & Creator',
    icon: 'youtube',
    tags: ['youtube', 'video size', 'resolution', 'shorts', 'youtube dimensions'],
  },
  {
    id: 'social-media-image-sizes',
    name: 'Social Media Image Size Helper',
    slug: 'social-media-image-sizes',
    href: '/tools/social-media-image-sizes/',
    description: 'Interactive lookup tool for recommended image and video dimensions across YouTube, X, Instagram, LinkedIn, and Facebook.',
    category: 'Social & Creator',
    icon: 'share-2',
    tags: ['social media', 'image sizes', 'instagram', 'youtube banner', 'x header', 'linkedin'],
  },
];

export function getToolBySlug(slug: string): ToolMetadata | undefined {
  return TOOLS.find((t) => t.slug === slug || t.id === slug);
}

export function getRelatedTools(currentId: string, limit = 4): ToolMetadata[] {
  const current = getToolBySlug(currentId);
  if (!current) return TOOLS.slice(0, limit);

  return TOOLS.filter((t) => t.id !== current.id && t.slug !== current.slug)
    .sort((a, b) => {
      const sameCategory = a.category === current.category ? 1 : 0;
      const bSameCategory = b.category === current.category ? 1 : 0;
      return bSameCategory - sameCategory;
    })
    .slice(0, limit);
}

export interface RelatedToolsResult {
  categoryName: string;
  items: ToolMetadata[];
}

export function getRelatedToolsForComponent(
  currentId: string,
  options: { customCategory?: string; customTools?: ToolMetadata[]; limit?: number } = {}
): RelatedToolsResult {
  const limit = Math.min(Math.max(options.limit || 6, 4), 6);

  if (options.customTools && options.customTools.length > 0) {
    const category = options.customCategory || 'Related Tools';
    return {
      categoryName: category.endsWith('Tools') ? category : `${category} Tools`,
      items: options.customTools.slice(0, limit),
    };
  }

  const current = getToolBySlug(currentId);
  const category = options.customCategory || (current ? current.category : 'Developer');
  const categoryName = category.endsWith('Tools') ? category : `${category} Tools`;

  // Get tools in same category
  const sameCat = TOOLS.filter((t) => t.category === category);

  let selected: ToolMetadata[] = [...sameCat];

  // If current tool exists and is not in selected, prepend it
  if (current && !selected.some((t) => t.id === current.id)) {
    selected.unshift(current);
  }

  // Fill up to limit with other tools if needed
  if (selected.length < limit) {
    const extra = TOOLS.filter((t) => !selected.some((s) => s.id === t.id));
    selected = [...selected, ...extra];
  }

  // Ensure current tool is present in final items if it exists
  let finalItems = selected.slice(0, limit);
  if (current && !finalItems.some((t) => t.id === current.id)) {
    finalItems[finalItems.length - 1] = current;
  }

  return {
    categoryName,
    items: finalItems,
  };
}
