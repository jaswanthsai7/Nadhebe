export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const cleanContent = content.replace(/<\/?[^>]+(>|$)/g, ''); // Strip HTML tags
  const words = cleanContent.trim().split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export const estimateReadingTime = getReadingTime;

