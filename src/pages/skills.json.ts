import { getCollection } from 'astro:content';
import { SITE } from '../config';

export async function GET(context: any) {
  const allSkills = await getCollection('skills');
  const baseUrl = context.site?.origin || SITE.url;

  const items = allSkills.map((skill) => {
    return {
      slug: skill.slug,
      name: skill.data.name,
      description: skill.data.description,
      category: skill.data.category,
      author: skill.data.author,
      license: skill.data.license,
      version: skill.data.version,
      tested_on: skill.data.tested_on,
      reviewed_on: skill.data.reviewed_on.toISOString().split('T')[0],
      compatibility: skill.data.compatibility,
      tags: skill.data.tags,
      download_url: `${baseUrl}${skill.data.download}`,
      guide_url: `${baseUrl}/skills/${skill.slug}/`,
      source_url: skill.data.source_url || null,
    };
  });

  const payload = {
    schema_version: '1.0.0',
    title: `${SITE.name} Agent Skills & MCP Directory API`,
    description: 'Programmatic metadata feed of hand-vetted AI agent skills, test notes, and download packages.',
    home_page_url: `${baseUrl}/skills/`,
    api_url: `${baseUrl}/skills.json`,
    last_updated: new Date().toISOString(),
    total_skills: items.length,
    skills: items,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
