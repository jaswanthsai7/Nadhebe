import type { SiteProfile, TrendTopic, Opportunity, OpportunityScore } from '@/types/opportunity-radar';
import { getCuratedTrends } from './trend-provider';

function normalizeToken(token: string): string {
  return token.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'how', 'to', 'for', 'the', 'and', 'in', 'of', 'a', 'an', 'with', 'on', 'at', 'by',
    'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'about',
    'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
    'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further',
    'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both',
    'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
    'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'don', 'should', 'now',
    'guide', 'tutorial', 'overview', 'cheat', 'sheet', 'examples', 'best', 'top', 'list'
  ]);

  return text
    .toLowerCase()
    .split(/[\s/_\-:,.\s]+/)
    .map(normalizeToken)
    .filter(t => t.length > 1 && !stopWords.has(t));
}

export function findOpportunities(profile: SiteProfile, trends = getCuratedTrends()): Opportunity[] {
  const siteTopicsSet = new Set(profile.topics.map(t => t.toLowerCase()));
  const siteCategoriesSet = new Set(profile.categories.map(c => c.toLowerCase()));
  const siteSlugs = profile.existingSlugs.map(s => s.toLowerCase());

  const opportunities: Opportunity[] = [];

  for (const trend of trends) {
    const trendKeywords = extractKeywords(trend.topic);
    const aliasKeywords = trend.aliases.flatMap(extractKeywords);
    const allTrendTokens = Array.from(new Set([...trendKeywords, ...aliasKeywords]));

    // 1. Calculate Website Relevance
    let matchedTopicHits = 0;
    const matchedTopicsList: string[] = [];

    for (const token of allTrendTokens) {
      for (const siteTopic of siteTopicsSet) {
        if (siteTopic.includes(token) || token.includes(siteTopic)) {
          matchedTopicHits++;
          if (!matchedTopicsList.includes(siteTopic)) {
            matchedTopicsList.push(siteTopic);
          }
        }
      }
    }

    let categoryMatch = false;
    for (const cat of siteCategoriesSet) {
      if (cat.includes(trend.category.toLowerCase()) || trend.category.toLowerCase().includes(cat)) {
        categoryMatch = true;
        break;
      }
    }

    // Base relevance score
    let relevanceScore = 0;
    if (allTrendTokens.length > 0) {
      const matchRatio = Math.min(1, matchedTopicHits / Math.max(2, allTrendTokens.length));
      relevanceScore = Math.round(matchRatio * 75);
    }

    if (categoryMatch) relevanceScore += 25;
    if (matchedTopicsList.length > 0 && relevanceScore < 40) {
      relevanceScore = 40 + Math.min(40, matchedTopicsList.length * 10);
    }
    relevanceScore = Math.min(100, relevanceScore);

    // If website has zero overlap or relevance is very low, skip
    if (relevanceScore < 25) {
      continue;
    }

    // 2. Calculate Content Gap Strength
    // Check if target website already has a page dedicated to this exact trend topic
    const matchedPages: string[] = [];
    let exactCoverageCount = 0;

    for (const slug of siteSlugs) {
      const slugTokens = extractKeywords(slug);
      const overlapCount = allTrendTokens.filter(t => slugTokens.includes(t)).length;

      if (overlapCount >= Math.min(2, allTrendTokens.length)) {
        matchedPages.push(slug);
        if (overlapCount >= Math.min(3, allTrendTokens.length)) {
          exactCoverageCount++;
        }
      }
    }

    let gapScore = 100;
    let gapStrength: 'High' | 'Medium' | 'Low' = 'High';

    if (exactCoverageCount > 0) {
      gapScore = 15;
      gapStrength = 'Low';
    } else if (matchedPages.length >= 2) {
      gapScore = 65;
      gapStrength = 'Medium';
    } else if (matchedPages.length === 1) {
      gapScore = 85;
      gapStrength = 'High';
    } else {
      gapScore = 100;
      gapStrength = 'High';
    }

    // If exact page already exists with 0 gap, skip as an opportunity
    if (gapScore < 20) {
      continue;
    }

    // 3. Compute Transparent Opportunity Score (60% Relevance + 40% Gap)
    const totalScore = Math.round(0.6 * relevanceScore + 0.4 * gapScore);

    // 4. Construct Human-Readable Rationale
    let whyRelevant = '';
    if (matchedTopicsList.length > 0) {
      const topTopics = matchedTopicsList.slice(0, 3).join(', ');
      if (matchedPages.length > 0) {
        whyRelevant = `Your website has ${profile.urlCount} pages covering related topics (${topTopics}), but lacks content specifically targeting ${trend.topic}.`;
      } else {
        whyRelevant = `Your site actively covers ${topTopics}, making ${trend.topic} a highly relevant missing topic for your audience.`;
      }
    } else {
      whyRelevant = `Matches your site's ${trend.category} focus, representing an uncovered high-intent topic gap.`;
    }

    const score: OpportunityScore = {
      relevanceScore,
      gapScore,
      totalScore,
      gapStrength
    };

    opportunities.push({
      id: trend.id,
      topic: trend.topic,
      category: trend.category,
      score,
      signalType: trend.sourceType,
      signalSource: trend.source,
      whyRelevant,
      suggestedTitles: trend.relatedQueries,
      relatedIdeas: trend.aliases,
      matchedExistingTopics: matchedTopicsList,
      matchedExistingPages: matchedPages
    });
  }

  // Sort by Total Opportunity Score descending & return Top 5
  return opportunities
    .sort((a, b) => b.score.totalScore - a.score.totalScore)
    .slice(0, 5);
}
