export interface AffiliateProgram {
  id: string;
  name: string;
  url: string;
  disclosure: string;
  active: boolean;
}

/**
 * Affiliate Program Registry (Days 1-7 Infrastructure)
 * Maintains structured partner details without premature tracking bloat.
 */
export const AFFILIATE_PROGRAMS: Record<string, AffiliateProgram> = {
  webflow: {
    id: 'webflow',
    name: 'Webflow',
    url: '', // Populated upon program approval
    disclosure: 'We may earn a commission if you sign up via our partner link.',
    active: false,
  },
  framer: {
    id: 'framer',
    name: 'Framer',
    url: '', // Populated upon program approval
    disclosure: 'We may earn a commission if you sign up via our partner link.',
    active: false,
  },
  instatic: {
    id: 'instatic',
    name: 'Instatic',
    url: '', // Populated upon program approval
    disclosure: 'We may earn a commission if you sign up via our partner link.',
    active: false,
  },
};
