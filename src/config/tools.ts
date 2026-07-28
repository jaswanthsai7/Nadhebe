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
    badge: 'New',
    tags: ['social media', 'image sizes', 'instagram', 'youtube banner', 'x header', 'linkedin'],
  },
];

export function getToolBySlug(slug: string): ToolMetadata | undefined {
  return TOOLS.find((t) => t.slug === slug || t.id === slug);
}

export function getRelatedTools(currentId: string, limit = 4): ToolMetadata[] {
  const current = getToolBySlug(currentId);
  if (!current) return TOOLS.slice(0, limit);

  return TOOLS.filter((t) => t.id !== currentId)
    .sort((a, b) => {
      const sameCategory = a.category === current.category ? 1 : 0;
      const bSameCategory = b.category === current.category ? 1 : 0;
      return bSameCategory - sameCategory;
    })
    .slice(0, limit);
}
