import type { Article } from './content';

export function getRelatedArticles(current: Article, all: Article[], limit = 3): Article[] {
  return all
    .filter(item => !(item.id === current.id && item.collection === current.collection))
    .map(item => {
      let score = 0;

      // 1. Same topic (+10 points)
      if (
        current.data.topic &&
        item.data.topic &&
        current.data.topic.toLowerCase() === item.data.topic.toLowerCase()
      ) {
        score += 10;
      }

      // 2. Same YouTube video (+8 points)
      if (
        current.data.youtubeVideoId &&
        item.data.youtubeVideoId &&
        current.data.youtubeVideoId === item.data.youtubeVideoId
      ) {
        score += 8;
      }

      // 3. Same AI tool / product matching (+6 points)
      // Check if topic names or tag strings match known tools (or tags overlap directly)
      const currentTags = current.data.tags.map(t => t.toLowerCase());
      const itemTags = item.data.tags.map(t => t.toLowerCase());
      const sharedTags = item.data.tags.filter(t => currentTags.includes(t.toLowerCase()));
      
      const commonTools = ['claude', 'gpt-4o', 'gpt-5', 'notebooklm', 'langchain', 'devin'];
      const currentHasTool = commonTools.some(t => current.data.title.toLowerCase().includes(t) || currentTags.includes(t));
      const itemHasTool = commonTools.some(t => item.data.title.toLowerCase().includes(t) || itemTags.includes(t));
      if (currentHasTool && itemHasTool) {
        const matchingTools = commonTools.filter(t => 
          (current.data.title.toLowerCase().includes(t) || currentTags.includes(t)) &&
          (item.data.title.toLowerCase().includes(t) || itemTags.includes(t))
        );
        if (matchingTools.length > 0) {
          score += 6;
        }
      }

      // 4. Similar search intent (+5 points)
      if (
        current.data.searchIntent &&
        item.data.searchIntent &&
        current.data.searchIntent.toLowerCase() === item.data.searchIntent.toLowerCase()
      ) {
        score += 5;
      }

      // 5. Same category (+4 points)
      if (item.data.category.toLowerCase() === current.data.category.toLowerCase()) {
        score += 4;
      }

      // 6. Shared tags (+2 points per shared tag)
      score += sharedTags.length * 2;

      // 7. Recency difference boost (closer pubDate = higher score, max +3 points)
      const diffTime = Math.abs(item.data.pubDate.getTime() - current.data.pubDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      score += Math.max(0, 3 - diffDays / 30); 

      return { item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || b.item.data.pubDate.getTime() - a.item.data.pubDate.getTime())
    .slice(0, limit)
    .map(x => x.item);
}
