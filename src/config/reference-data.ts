export interface SourceMetadata {
  source: string;
  sourceUrl: string;
  lastVerified: string;
  type: 'official' | 'recommended';
}

export interface PrintSizeSpec {
  name: string;
  category: 'ISO Standard' | 'Photo Print' | 'Poster & Art' | 'Commercial';
  inchesWidth: number;
  inchesHeight: number;
  cmWidth: number;
  cmHeight: number;
  px300DpiWidth: number;
  px300DpiHeight: number;
  px150DpiWidth: number;
  px150DpiHeight: number;
  px72DpiWidth: number;
  px72DpiHeight: number;
  usageNote: string;
}

export interface WidescreenResolutionSpec {
  name: string;
  standardLabel: string;
  width: number;
  height: number;
  totalPixels: number;
  megapixels: string;
  aspectRatio: string;
  commonDevices: string;
}

export interface PlatformDimensionSpec {
  id: string;
  platform: 'YouTube' | 'Instagram' | 'TikTok' | 'X (Twitter)' | 'LinkedIn' | 'Facebook';
  assetType: string;
  recommendedWidth: number;
  recommendedHeight: number;
  aspectRatio: string;
  orientation: 'Landscape' | 'Portrait' | 'Square';
  notes: string;
  sourceMeta: SourceMetadata;
}

export interface SafeZoneSpec {
  platform: 'YouTube Shorts' | 'Instagram Reels' | 'TikTok';
  aspectRatio: '9:16';
  baseWidth: number;
  baseHeight: number;
  topHeaderMarginPercent: number;
  bottomCaptionMarginPercent: number;
  rightActionMarginPercent: number;
  guidanceText: string;
  sourceMeta: SourceMetadata;
}

export interface ToolReferenceMeta {
  id: string;
  name: string;
  slug: string;
  href: string;
  description: string;
  targetKeyword: string;
  category: string;
  icon: string;
}

export interface RatioResourceMeta {
  id: string;
  name: string;
  slug: string;
  href: string;
  description: string;
  targetKeyword: string;
  ratio: string;
  dimensions?: string;
  icon: string;
}

export interface ToolGuideMeta {
  id: string;
  name: string;
  slug: string;
  href: string;
  description: string;
  targetKeyword: string;
  software: string;
  icon: string;
}

export const KEYWORD_OWNERSHIP_MAP: Record<string, string> = {
  'aspect ratio calculator': '/tools/aspect-ratio-calculator/',
  'resize dimensions calculator': '/tools/resize-dimensions-calculator/',
  'pixels to megapixels calculator': '/tools/pixels-to-megapixels-calculator/',
  'megapixels to resolution calculator': '/tools/megapixels-to-resolution-calculator/',
  'ppi calculator': '/tools/ppi-calculator/',
  'dpi print size calculator': '/tools/dpi-print-size-calculator/',
  '16:9 dimensions calculator': '/tools/16-9-dimensions-calculator/',
  '9:16 dimensions calculator': '/tools/9-16-dimensions-calculator/',
  'youtube video size calculator': '/tools/youtube-video-size-calculator/',
  'social media image sizes': '/tools/social-media-image-sizes/',
  '300 dpi print size chart': '/tools/reference/300-dpi-print-size-chart/',
  '16:9 resolution chart': '/tools/reference/16-9-resolution-chart/',
  '1080x1350 aspect ratio': '/tools/aspect-ratio/1080x1350/',
  '4:5 aspect ratio': '/tools/aspect-ratio/4-5/',
  'davinci resolve 1080x1350 render guide': '/tools/guides/davinci-resolve-1080x1350-render-guide/',
};

export const PRINT_SIZES_300_DPI: PrintSizeSpec[] = [
  {
    name: 'A4 Paper',
    category: 'ISO Standard',
    inchesWidth: 8.27,
    inchesHeight: 11.69,
    cmWidth: 21.0,
    cmHeight: 29.7,
    px300DpiWidth: 2480,
    px300DpiHeight: 3508,
    px150DpiWidth: 1240,
    px150DpiHeight: 1754,
    px72DpiWidth: 595,
    px72DpiHeight: 842,
    usageNote: 'Standard global document & brochure print format',
  },
  {
    name: 'A3 Paper',
    category: 'ISO Standard',
    inchesWidth: 11.69,
    inchesHeight: 16.54,
    cmWidth: 29.7,
    cmHeight: 42.0,
    px300DpiWidth: 3508,
    px300DpiHeight: 4961,
    px150DpiWidth: 1754,
    px150DpiHeight: 2480,
    px72DpiWidth: 842,
    px72DpiHeight: 1191,
    usageNote: 'Posters, diagrams, presentation sheets',
  },
  {
    name: 'A2 Paper',
    category: 'ISO Standard',
    inchesWidth: 16.54,
    inchesHeight: 23.39,
    cmWidth: 42.0,
    cmHeight: 59.4,
    px300DpiWidth: 4961,
    px300DpiHeight: 7016,
    px150DpiWidth: 2480,
    px150DpiHeight: 3508,
    px72DpiWidth: 1191,
    px72DpiHeight: 1684,
    usageNote: 'Medium format art prints and architectural plans',
  },
  {
    name: 'A1 Paper',
    category: 'ISO Standard',
    inchesWidth: 23.39,
    inchesHeight: 33.11,
    cmWidth: 59.4,
    cmHeight: 84.1,
    px300DpiWidth: 7016,
    px300DpiHeight: 9933,
    px150DpiWidth: 3508,
    px150DpiHeight: 4966,
    px72DpiWidth: 1684,
    px72DpiHeight: 2384,
    usageNote: 'Large exhibition banners and poster prints',
  },
  {
    name: '4 × 6 Photo',
    category: 'Photo Print',
    inchesWidth: 4.0,
    inchesHeight: 6.0,
    cmWidth: 10.16,
    cmHeight: 15.24,
    px300DpiWidth: 1200,
    px300DpiHeight: 1800,
    px150DpiWidth: 600,
    px150DpiHeight: 900,
    px72DpiWidth: 288,
    px72DpiHeight: 432,
    usageNote: 'Standard postcard / album print',
  },
  {
    name: '5 × 7 Photo',
    category: 'Photo Print',
    inchesWidth: 5.0,
    inchesHeight: 7.0,
    cmWidth: 12.7,
    cmHeight: 17.78,
    px300DpiWidth: 1500,
    px300DpiHeight: 2100,
    px150DpiWidth: 750,
    px150DpiHeight: 1050,
    px72DpiWidth: 360,
    px72DpiHeight: 504,
    usageNote: 'Portrait and framed greeting photo',
  },
  {
    name: '8 × 10 Photo',
    category: 'Photo Print',
    inchesWidth: 8.0,
    inchesHeight: 10.0,
    cmWidth: 20.32,
    cmHeight: 25.4,
    px300DpiWidth: 2400,
    px300DpiHeight: 3000,
    px150DpiWidth: 1200,
    px150DpiHeight: 1500,
    px72DpiWidth: 576,
    px72DpiHeight: 720,
    usageNote: 'Standard framed portrait format (4:5 ratio)',
  },
  {
    name: '11 × 14 Fine Art',
    category: 'Poster & Art',
    inchesWidth: 11.0,
    inchesHeight: 14.0,
    cmWidth: 27.94,
    cmHeight: 35.56,
    px300DpiWidth: 3300,
    px300DpiHeight: 4200,
    px150DpiWidth: 1650,
    px150DpiHeight: 2100,
    px72DpiWidth: 792,
    px72DpiHeight: 1008,
    usageNote: 'Medium gallery wall print',
  },
  {
    name: '16 × 20 Gallery Poster',
    category: 'Poster & Art',
    inchesWidth: 16.0,
    inchesHeight: 20.0,
    cmWidth: 40.64,
    cmHeight: 50.8,
    px300DpiWidth: 4800,
    px300DpiHeight: 6000,
    px150DpiWidth: 2400,
    px150DpiHeight: 3000,
    px72DpiWidth: 1152,
    px72DpiHeight: 1440,
    usageNote: 'Large wall art print (4:5 ratio)',
  },
  {
    name: '24 × 36 Movie Poster',
    category: 'Poster & Art',
    inchesWidth: 24.0,
    inchesHeight: 36.0,
    cmWidth: 60.96,
    cmHeight: 91.44,
    px300DpiWidth: 7200,
    px300DpiHeight: 10800,
    px150DpiWidth: 3600,
    px150DpiHeight: 5400,
    px72DpiWidth: 1728,
    px72DpiHeight: 2592,
    usageNote: 'Archival theatrical movie poster size',
  },
];

export const RESOLUTION_CHART_16_9: WidescreenResolutionSpec[] = [
  {
    name: 'nHD 360p',
    standardLabel: 'Standard Definition (SD)',
    width: 640,
    height: 360,
    totalPixels: 230400,
    megapixels: '0.23',
    aspectRatio: '16:9',
    commonDevices: 'Legacy mobile, low-bandwidth video streams',
  },
  {
    name: 'qHD 540p',
    standardLabel: 'Quarter High Definition',
    width: 960,
    height: 540,
    totalPixels: 518400,
    megapixels: '0.52',
    aspectRatio: '16:9',
    commonDevices: 'Older smartphones, portable media players',
  },
  {
    name: 'HD 720p',
    standardLabel: 'High Definition',
    width: 1280,
    height: 720,
    totalPixels: 921600,
    megapixels: '0.92',
    aspectRatio: '16:9',
    commonDevices: 'Broadcast HD, Web video standard minimum',
  },
  {
    name: 'Full HD 1080p',
    standardLabel: 'Full High Definition (FHD)',
    width: 1920,
    height: 1080,
    totalPixels: 2073600,
    megapixels: '2.07',
    aspectRatio: '16:9',
    commonDevices: 'Global video standard, HDTV, laptops, web',
  },
  {
    name: 'QHD 1440p',
    standardLabel: 'Quad High Definition (2K)',
    width: 2560,
    height: 1440,
    totalPixels: 3686400,
    megapixels: '3.69',
    aspectRatio: '16:9',
    commonDevices: 'Desktop gaming monitors, high-end laptops',
  },
  {
    name: '4K UHD 2160p',
    standardLabel: 'Ultra High Definition (4K)',
    width: 3840,
    height: 2160,
    totalPixels: 8294400,
    megapixels: '8.29',
    aspectRatio: '16:9',
    commonDevices: '4K Smart TVs, cinema, YouTube 4K uploads',
  },
  {
    name: '5K UHD 2880p',
    standardLabel: '5K Display Standard',
    width: 5120,
    height: 2880,
    totalPixels: 14745600,
    megapixels: '14.75',
    aspectRatio: '16:9',
    commonDevices: 'Apple iMac 27-inch, Studio Displays',
  },
  {
    name: '8K UHD 4320p',
    standardLabel: 'Super Hi-Vision (8K)',
    width: 7680,
    height: 4320,
    totalPixels: 33177600,
    megapixels: '33.18',
    aspectRatio: '16:9',
    commonDevices: 'Flagship 8K TVs, professional cinematography',
  },
];

export const SAFE_ZONE_SPECS: Record<string, SafeZoneSpec> = {
  'youtube-shorts': {
    platform: 'YouTube Shorts',
    aspectRatio: '9:16',
    baseWidth: 1080,
    baseHeight: 1920,
    topHeaderMarginPercent: 12,
    bottomCaptionMarginPercent: 20,
    rightActionMarginPercent: 16,
    guidanceText: 'Avoid top 12% (channel/search UI) and bottom 20% (title & sound link). Keep key text centered.',
    sourceMeta: {
      source: 'YouTube Creator Help Documentation',
      sourceUrl: 'https://support.google.com/youtube/answer/10059070',
      lastVerified: '2026-07-28',
      type: 'official',
    },
  },
  'instagram-reels': {
    platform: 'Instagram Reels',
    aspectRatio: '9:16',
    baseWidth: 1080,
    baseHeight: 1920,
    topHeaderMarginPercent: 14,
    bottomCaptionMarginPercent: 22,
    rightActionMarginPercent: 18,
    guidanceText: 'Keep essential text and subject within the central 1080x1350 vertical safe zone to prevent overlap with audio & caption UI.',
    sourceMeta: {
      source: 'Instagram Business Guidelines',
      sourceUrl: 'https://help.instagram.com/1038071037000574',
      lastVerified: '2026-07-28',
      type: 'official',
    },
  },
  'tiktok-video': {
    platform: 'TikTok',
    aspectRatio: '9:16',
    baseWidth: 1080,
    baseHeight: 1920,
    topHeaderMarginPercent: 10,
    bottomCaptionMarginPercent: 24,
    rightActionMarginPercent: 18,
    guidanceText: 'Avoid right side (like/comment/share icons) and bottom 24% (username & caption lines).',
    sourceMeta: {
      source: 'TikTok Business Help Center',
      sourceUrl: 'https://ads.tiktok.com/help/article/image-ad-specifications',
      lastVerified: '2026-07-28',
      type: 'official',
    },
  },
};

export const TOOL_REFERENCES: ToolReferenceMeta[] = [
  {
    id: '300-dpi-print-size-chart',
    name: '300 DPI Print Size Reference Chart',
    slug: '300-dpi-print-size-chart',
    href: '/tools/reference/300-dpi-print-size-chart/',
    description: 'Complete pixel to physical print dimensions lookup chart for 300 DPI, 150 DPI, and 72 DPI across ISO A-series and standard photo sizes.',
    targetKeyword: '300 dpi print size chart',
    category: 'Reference Utility',
    icon: 'printer',
  },
  {
    id: '16-9-resolution-chart',
    name: '16:9 Widescreen Resolution Reference Chart',
    slug: '16-9-resolution-chart',
    href: '/tools/reference/16-9-resolution-chart/',
    description: 'Comprehensive 16:9 resolution matrix detailing exact pixel dimensions, total pixel counts, megapixels, and display standards from 360p to 8K.',
    targetKeyword: '16:9 resolution chart',
    category: 'Reference Utility',
    icon: 'tv',
  },
];

export const RATIO_RESOURCES: RatioResourceMeta[] = [
  {
    id: '1080x1350',
    name: '1080×1350 Aspect Ratio & Pixel Guide',
    slug: '1080x1350',
    href: '/tools/aspect-ratio/1080x1350/',
    description: 'Detailed breakdown of 1080×1350 portrait resolution, 4:5 ratio math, total pixels (1.458 MP), CSS snippets, and scaling presets.',
    targetKeyword: '1080x1350 aspect ratio',
    ratio: '4:5',
    dimensions: '1080×1350',
    icon: 'instagram',
  },
  {
    id: '4-5',
    name: '4:5 Aspect Ratio Guide & Scaler',
    slug: '4-5',
    href: '/tools/aspect-ratio/4-5/',
    description: 'Dedicated 4:5 aspect ratio scaling guide, decimal ratio (0.8), orientation rules, common resolutions, and CSS code snippets.',
    targetKeyword: '4:5 aspect ratio',
    ratio: '4:5',
    icon: 'layout',
  },
];

export const TOOL_GUIDES: ToolGuideMeta[] = [
  {
    id: 'davinci-resolve-1080x1350-render-guide',
    name: 'DaVinci Resolve 1080×1350 Vertical Video Render Guide',
    slug: 'davinci-resolve-1080x1350-render-guide',
    href: '/tools/guides/davinci-resolve-1080x1350-render-guide/',
    description: 'Step-by-step workflow guide to set timeline resolution, image scaling, and export settings for 1080×1350 vertical video in DaVinci Resolve without black bars.',
    targetKeyword: 'davinci resolve 1080x1350 render guide',
    software: 'DaVinci Resolve 18 / 19',
    icon: 'video',
  },
];
