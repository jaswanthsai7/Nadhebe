export type SignalType = 'curated' | 'measured';

export interface TrendTopic {
  id: string;
  topic: string;
  aliases: string[];
  category: string;
  sourceType: SignalType;
  source: string;              // e.g. "Nadhebe Developer Radar"
  sourceUrl?: string;
  observedAt: string;          // ISO Date
  methodology: string;         // e.g. "Curated AI & Web Development taxonomy"
  momentum?: number;           // Only set if measured data exists
  growthRate?: string;         // e.g. "+140% 7d" (only if measured)
  relatedQueries: string[];
}

export interface SiteProfile {
  domain: string;
  normalizedUrl: string;
  sitemapUrl?: string;
  urlCount: number;
  topics: string[];
  categories: string[];
  existingSlugs: string[];
  analyzedAt: string;
}

export interface OpportunityScore {
  relevanceScore: number;     // 0-100
  gapScore: number;           // 0-100 (100 = completely missing, high opportunity)
  totalScore: number;         // 0-100 (60% relevance + 40% gap)
  gapStrength: 'High' | 'Medium' | 'Low';
}

export interface Opportunity {
  id: string;
  topic: string;
  category: string;
  score: OpportunityScore;
  signalType: SignalType;
  signalSource: string;
  whyRelevant: string;
  suggestedTitles: string[];
  relatedIdeas: string[];
  matchedExistingTopics: string[];
  matchedExistingPages: string[];
}

export interface AnalysisResponse {
  success: boolean;
  profile?: SiteProfile;
  error?: string;
  message?: string;
}
