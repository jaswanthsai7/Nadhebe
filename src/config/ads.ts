export const ADSENSE_PUBLISHER_ID = 'ca-pub-3435887725966321';

export type AdType = 'article' | 'sidebar' | 'footer' | 'tool' | 'banner';
export type AdPosition = 'top' | 'middle' | 'bottom' | 'sticky';

export interface AdSlotConfig {
  slotId: string;
  format: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  label: string;
  minHeightClass: string;
}

/**
 * Centralized AdSlot Configuration Registry
 * Single source of truth for all AdSense slot IDs, formats, heights, and labels.
 */
export const AD_SLOT_REGISTRY: Record<string, AdSlotConfig> = {
  'article-middle': {
    slotId: import.meta.env.PUBLIC_ADSENSE_SLOT_ARTICLE_MIDDLE || import.meta.env.PUBLIC_ADSENSE_SLOT_ARTICLE || '',
    format: 'auto',
    label: 'Advertisement',
    minHeightClass: 'min-h-[250px]',
  },
  'article-bottom': {
    slotId: import.meta.env.PUBLIC_ADSENSE_SLOT_ARTICLE_BOTTOM || '',
    format: 'horizontal',
    label: 'Advertisement',
    minHeightClass: 'min-h-[90px]',
  },
  'sidebar-sticky': {
    slotId: import.meta.env.PUBLIC_ADSENSE_SLOT_SIDEBAR || '',
    format: 'rectangle',
    label: 'Sidebar Advertisement',
    minHeightClass: 'min-h-[250px]',
  },
  'footer-bottom': {
    slotId: import.meta.env.PUBLIC_ADSENSE_SLOT_FOOTER || '',
    format: 'horizontal',
    label: 'Advertisement',
    minHeightClass: 'min-h-[90px]',
  },
  'tool-bottom': {
    slotId: import.meta.env.PUBLIC_ADSENSE_SLOT_TOOL || '',
    format: 'auto',
    label: 'Advertisement',
    minHeightClass: 'min-h-[250px]',
  },
};

/**
 * Resolves AdSlot configuration based on type and position.
 */
export function getAdSlotConfig(type: AdType = 'article', position: AdPosition = 'middle'): AdSlotConfig {
  const key = `${type}-${position}`;
  if (AD_SLOT_REGISTRY[key]) {
    return AD_SLOT_REGISTRY[key];
  }

  // Fallback defaults per type
  switch (type) {
    case 'sidebar':
      return {
        slotId: import.meta.env.PUBLIC_ADSENSE_SLOT_SIDEBAR || '',
        format: 'rectangle',
        label: 'Sidebar Advertisement',
        minHeightClass: 'min-h-[250px]',
      };
    case 'footer':
      return {
        slotId: import.meta.env.PUBLIC_ADSENSE_SLOT_FOOTER || '',
        format: 'horizontal',
        label: 'Advertisement',
        minHeightClass: 'min-h-[90px]',
      };
    case 'tool':
      return {
        slotId: import.meta.env.PUBLIC_ADSENSE_SLOT_TOOL || '',
        format: 'auto',
        label: 'Advertisement',
        minHeightClass: 'min-h-[250px]',
      };
    case 'banner':
      return {
        slotId: '',
        format: 'horizontal',
        label: 'Advertisement',
        minHeightClass: 'min-h-[90px]',
      };
    case 'article':
    default:
      return {
        slotId: import.meta.env.PUBLIC_ADSENSE_SLOT_ARTICLE || '',
        format: 'auto',
        label: 'Advertisement',
        minHeightClass: 'min-h-[250px]',
      };
  }
}
