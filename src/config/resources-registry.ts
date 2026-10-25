// UNIFIED RESOURCES & DOCUMENT REGISTRY FOR NADHEBE

export interface DownloadableResource {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'Cheat Sheets' | 'Templates' | 'Architecture Diagrams' | 'Guides & PDFs' | 'Code Bundles' | 'Checklists' | 'Diagrams' | 'Documents';
  fileUrl: string;
  fileName: string;
  previewUrl: string;
  fileType: 'PDF';
  fileSize: string;
  pageCount?: string;
  badge?: 'Popular' | 'New' | 'Essential' | 'Updated';
  tags: string[];
  previewType: 'pdf-cheatsheet' | 'code-template' | 'md-checklist' | 'png-diagram' | 'pdf-guide' | 'json-schema' | 'mp4-video';
  videoUrl?: string;
}

export const RESOURCE_CATEGORIES = [
  'Guides & PDFs',
  'Cheat Sheets',
  'Templates',
  'Architecture Diagrams',
  'Code Bundles',
] as const;

export const UNIFIED_RESOURCES_REGISTRY: DownloadableResource[] = [
  {
    id: 'res-1',
    slug: 'google-flow-ai-ads-script-guide',
    title: 'Google Flow AI Video Ads Master Prompt & 3-Scene Continuity Guide',
    description: 'Complete prompt engineering framework and master continuity template for generating 30-second AI influencer video ads across 10-second clips in Google Flow.',
    category: 'Guides & PDFs',
    fileUrl: '/resources/google-flow-ai-ads-script-guide.pdf',
    fileName: 'google-flow-ai-ads-script-guide.pdf',
    previewUrl: '/resources/google-flow-ai-ads-script-guide.md',
    fileType: 'PDF',
    fileSize: '48 KB',
    pageCount: '4 Pages',
    badge: 'Popular',
    tags: ['google-flow', 'ai-video', 'chatgpt', 'prompts', 'video-ads'],
    previewType: 'mp4-video',
    videoUrl: '/resources/Untitled_Scene_08-09_08_50_31_202608092311_2.mp4',
  },
  {
    id: 'res-2',
    slug: 'google-flow-omni-influencer-prompts',
    title: 'Google Flow Omni: AI Influencer Presenter Prompt Pack',
    description: 'Master prompts and video preview for generating continuous long-form YouTube presenter videos using ChatGPT and Google Flow Omni.',
    category: 'Guides & PDFs',
    fileUrl: '/resources/google-flow-omni-influencer-prompts.pdf',
    fileName: 'google-flow-omni-influencer-prompts.pdf',
    previewUrl: '/resources/google-flow-omni-influencer-prompts.md',
    fileType: 'PDF',
    fileSize: '32 KB',
    pageCount: '3 Pages',
    badge: 'New',
    tags: ['google-flow', 'omni', 'ai-influencer', 'youtube'],
    previewType: 'mp4-video',
    videoUrl: '/resources/google-flow-influencer-preview.mp4',
  },
];
