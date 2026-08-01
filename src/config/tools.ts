import {
  UNIFIED_TOOLS_REGISTRY,
  type UnifiedTool,
  getToolBySlug as getToolBySlugFromRegistry,
  getRelatedToolsForSlug,
  IMPLEMENTED_TOOLS,
  PLANNED_TOOLS,
} from './tools-registry';

export type ToolMetadata = UnifiedTool;

export const TOOLS: UnifiedTool[] = UNIFIED_TOOLS_REGISTRY;

export function getToolBySlug(slug: string): UnifiedTool | undefined {
  return getToolBySlugFromRegistry(slug);
}

export function getRelatedTools(slug: string, count: number = 4): UnifiedTool[] {
  const result = getRelatedToolsForSlug(slug, count);
  return result || [];
}

export function getRelatedToolsForComponent(
  slug: string = '',
  options: { customCategory?: string; customTools?: UnifiedTool[]; limit?: number } = {}
): { categoryName: string; items: UnifiedTool[] } {
  const { customCategory, customTools, limit = 6 } = options;
  if (customTools && customTools.length > 0) {
    return {
      categoryName: customCategory || 'Related Tools',
      items: customTools.slice(0, limit),
    };
  }

  const currentTool = getToolBySlugFromRegistry(slug);
  const categoryName = customCategory || (currentTool ? `More ${currentTool.category} Utilities` : 'Related Tools');
  const items = getRelatedToolsForSlug(slug, limit);

  return {
    categoryName,
    items: items || [],
  };
}

export { UNIFIED_TOOLS_REGISTRY, IMPLEMENTED_TOOLS, PLANNED_TOOLS };
