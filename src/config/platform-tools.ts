import { ROADMAP_CATEGORIES, type ToolRoadmapCategory } from './tools-roadmap';

export type PlatformToolMode = 'transform' | 'generator' | 'calculator' | 'analyzer';

export interface PlatformTool {
  id: string;
  name: string;
  slug: string;
  href: string;
  description: string;
  category: string;
  categorySlug: string;
  mode: PlatformToolMode;
  badge?: 'Popular' | 'New';
  tags: string[];
}

const toolPatterns: Record<PlatformToolMode, { suffix: string; description: string }[]> = {
  transform: [
    { suffix: 'Formatter', description: 'Clean, normalize, and format your input instantly in the browser.' },
    { suffix: 'Converter', description: 'Convert common formats quickly without uploading your data.' },
    { suffix: 'Cleaner', description: 'Remove noise and standardize content with local processing.' },
  ],
  generator: [
    { suffix: 'Generator', description: 'Generate a ready-to-use result with adjustable local options.' },
    { suffix: 'Builder', description: 'Build a reusable starting point and copy the result immediately.' },
    { suffix: 'Template Maker', description: 'Create a consistent template for your next workflow.' },
  ],
  calculator: [
    { suffix: 'Calculator', description: 'Calculate a useful estimate from your inputs with transparent math.' },
    { suffix: 'Estimator', description: 'Estimate the key metric for your workflow in seconds.' },
    { suffix: 'Planner', description: 'Plan the right target values before you start.' },
  ],
  analyzer: [
    { suffix: 'Analyzer', description: 'Inspect pasted content locally and surface useful signals.' },
    { suffix: 'Checker', description: 'Check your input for common issues before you ship.' },
    { suffix: 'Inspector', description: 'Review structured input and get a clear, local summary.' },
  ],
};

const modeCycle: PlatformToolMode[] = ['transform', 'generator', 'calculator', 'analyzer'];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function toTitle(value: string) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function modeForName(name: string, index: number): PlatformToolMode {
  const text = name.toLowerCase();
  if (/(calculator|estimator|planner|budget|cost|size|ratio|converter)/.test(text)) return 'calculator';
  if (/(generator|builder|formatter|template|scaffolding)/.test(text)) return 'generator';
  if (/(checker|validator|analyzer|inspector|linter|tester|detector)/.test(text)) return 'analyzer';
  return modeCycle[index % modeCycle.length];
}

function buildCategoryTools(category: ToolRoadmapCategory): PlatformTool[] {
  const seedNames = category.examples.map(toTitle);
  const categoryName = category.name.replace(' & ', ' and ');
  const items: PlatformTool[] = [];

  for (let index = 0; index < category.plannedCount; index += 1) {
    const seed = seedNames[index];
    const provisionalMode = modeCycle[index % modeCycle.length];
    const pattern = toolPatterns[provisionalMode][Math.floor(index / modeCycle.length) % toolPatterns[provisionalMode].length];
    const name = seed || `${categoryName} ${pattern.suffix}`;
    const mode = modeForName(name, index);
    const slug = slugify(name);

    items.push({
      id: `${category.slug}-${index + 1}`,
      name,
      slug,
      href: `/tools/${slug}/`,
      description: seed
        ? `${category.description.split('. ')[0].replace(/\.$/, '')}. Use this privacy-first ${name.toLowerCase()} directly in your browser.`
        : pattern.description,
      category: category.name,
      categorySlug: category.slug,
      mode,
      badge: index === 0 ? 'Popular' : index === 1 ? 'New' : undefined,
      tags: [category.name.toLowerCase(), mode, ...name.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)],
    });
  }

  return items;
}

export const PLATFORM_TOOLS: PlatformTool[] = ROADMAP_CATEGORIES.flatMap(buildCategoryTools);
export const PLATFORM_CATEGORIES = ROADMAP_CATEGORIES.map((category) => category.name);
export const PLATFORM_TOOL_TOTAL = PLATFORM_TOOLS.length;

export function getPlatformToolBySlug(slug: string): PlatformTool | undefined {
  return PLATFORM_TOOLS.find((tool) => tool.slug === slug);
}
