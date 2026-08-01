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
  return getRelatedToolsForSlug(slug, count);
}

export function getRelatedToolsForComponent(slug: string, count: number = 4): UnifiedTool[] {
  return getRelatedToolsForSlug(slug, count);
}

export { UNIFIED_TOOLS_REGISTRY, IMPLEMENTED_TOOLS, PLANNED_TOOLS };
