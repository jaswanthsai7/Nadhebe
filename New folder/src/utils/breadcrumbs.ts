export interface Breadcrumb {
  label: string;
  url: string;
}

export function getBreadcrumbs(pathname: string): Breadcrumb[] {
  const parts = pathname.split('/').filter(Boolean);
  const breadcrumbs: Breadcrumb[] = [{ label: 'Home', url: '/' }];

  let currentUrl = '';
  for (const part of parts) {
    currentUrl += `/${part}`;
    
    let label = part
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());

    if (label.toLowerCase() === 'rss') label = 'RSS';
    if (label.toLowerCase() === 'gpt 5') label = 'GPT-5';
    if (label.toLowerCase() === 'gpt 4o') label = 'GPT-4o';
    if (label.toLowerCase() === 'rag') label = 'RAG';
    
    breadcrumbs.push({ label, url: currentUrl });
  }

  return breadcrumbs;
}
