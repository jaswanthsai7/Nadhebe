export interface SocialMediaPreset {
  id: string;
  platform: 'YouTube' | 'Instagram' | 'X (Twitter)' | 'LinkedIn' | 'Facebook' | 'TikTok';
  format: string;
  width: number;
  height: number;
  aspectRatio: string;
  orientation: 'Landscape' | 'Portrait' | 'Square';
  notes: string;
  safeZone?: string;
}

export const SOCIAL_MEDIA_PRESETS: SocialMediaPreset[] = [
  // YouTube
  {
    id: 'yt-banner',
    platform: 'YouTube',
    format: 'Channel Banner / Header',
    width: 2560,
    height: 1440,
    aspectRatio: '16:9',
    orientation: 'Landscape',
    notes: 'Safe area for text and logos on all devices is 1235 × 338 px (centered).',
    safeZone: '1235 × 338 px',
  },
  {
    id: 'yt-thumb',
    platform: 'YouTube',
    format: 'Video Thumbnail',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    orientation: 'Landscape',
    notes: 'Minimum width is 640 px. File size under 2MB (JPG, PNG, GIF).',
  },
  {
    id: 'yt-shorts',
    platform: 'YouTube',
    format: 'YouTube Shorts Video',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
    orientation: 'Portrait',
    notes: 'Vertical mobile video format. Up to 60 seconds duration.',
  },
  {
    id: 'yt-avatar',
    platform: 'YouTube',
    format: 'Channel Profile Picture',
    width: 800,
    height: 800,
    aspectRatio: '1:1',
    orientation: 'Square',
    notes: 'Rendered as a circle in YouTube UI.',
  },

  // Instagram
  {
    id: 'ig-portrait',
    platform: 'Instagram',
    format: 'Portrait Feed Post',
    width: 1080,
    height: 1350,
    aspectRatio: '4:5',
    orientation: 'Portrait',
    notes: 'Takes up maximum vertical screen real estate in mobile feed.',
  },
  {
    id: 'ig-square',
    platform: 'Instagram',
    format: 'Square Feed Post',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1',
    orientation: 'Square',
    notes: 'Classic square grid post format.',
  },
  {
    id: 'ig-reels',
    platform: 'Instagram',
    format: 'Reels & Stories Video',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
    orientation: 'Portrait',
    notes: 'Keep important captions away from top header and bottom captions overlay.',
  },

  // X (Twitter)
  {
    id: 'x-header',
    platform: 'X (Twitter)',
    format: 'Profile Header Banner',
    width: 1500,
    height: 500,
    aspectRatio: '3:1',
    orientation: 'Landscape',
    notes: 'Profile avatar overlaps bottom-left corner of header by ~133px.',
  },
  {
    id: 'x-post',
    platform: 'X (Twitter)',
    format: 'In-Feed Image Post',
    width: 1600,
    height: 900,
    aspectRatio: '16:9',
    orientation: 'Landscape',
    notes: 'Single image post aspect ratio ideal for feed preview.',
  },

  // LinkedIn
  {
    id: 'li-banner',
    platform: 'LinkedIn',
    format: 'Profile Cover Banner',
    width: 1584,
    height: 396,
    aspectRatio: '4:1',
    orientation: 'Landscape',
    notes: 'Personal profile background image.',
  },
  {
    id: 'li-company-banner',
    platform: 'LinkedIn',
    format: 'Company Page Cover',
    width: 1128,
    height: 191,
    aspectRatio: '5.9:1',
    orientation: 'Landscape',
    notes: 'Company brand page cover banner.',
  },
  {
    id: 'li-post',
    platform: 'LinkedIn',
    format: 'In-Feed Image / Carousel',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    orientation: 'Landscape',
    notes: '1:1 (1080×1080) and 4:5 (1080×1350) also supported for documents/PDF carousels.',
  },

  // TikTok
  {
    id: 'tt-video',
    platform: 'TikTok',
    format: 'Vertical Video Post',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
    orientation: 'Portrait',
    notes: 'Full screen vertical format. Leave right margin clear for like/share buttons.',
  },
];
