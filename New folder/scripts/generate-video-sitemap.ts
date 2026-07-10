import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://example.com';

// Simple YAML frontmatter parser
function parseFrontmatter(filePath: string): any {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (!match) return {};
  const yaml = match[1];
  const obj: any = {};
  yaml.split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      // clean quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (val === 'true') {
        obj[key] = true;
      } else if (val === 'false') {
        obj[key] = false;
      } else {
        obj[key] = val;
      }
    }
  });
  return obj;
}

function parseDurationToSeconds(duration: string): number {
  if (!duration) return 600; // default 10 minutes
  
  // Parse ISO 8601 duration format (e.g., PT15M42S, PT1H2M3S)
  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);
  if (!matches) {
    const parsed = parseInt(duration);
    return isNaN(parsed) ? 600 : parsed;
  }

  const hours = parseInt(matches[1] || '0');
  const minutes = parseInt(matches[2] || '0');
  const seconds = parseInt(matches[3] || '0');

  return hours * 3600 + minutes * 60 + seconds;
}

function run() {
  console.log('Generating video sitemap...');
  const contentDir = path.join(process.cwd(), 'src/content');
  const distDir = path.join(process.cwd(), 'dist');

  if (!fs.existsSync(distDir)) {
    console.error('Dist folder not found. Cannot generate video sitemap.');
    return;
  }

  const folders = [
    { dir: 'news', urlPrefix: '/news' },
    { dir: 'tutorials', urlPrefix: '/tutorials' },
    { dir: 'youtube-articles', urlPrefix: '/youtube' },
    { dir: 'tool-reviews', urlPrefix: '/reviews' },
    { dir: 'prompts', urlPrefix: '/prompts' },
    { dir: 'comparisons', urlPrefix: '/comparisons' },
  ];

  const videoEntries: any[] = [];

  folders.forEach(({ dir, urlPrefix }) => {
    const folderPath = path.join(contentDir, dir);
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach(file => {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const filePath = path.join(folderPath, file);
          const meta = parseFrontmatter(filePath);
          const slug = file.replace(/\.(md|mdx)$/, '');
          
          // Check for video details
          // YouTube articles use videoId, but other collections might use youtubeVideoId
          const videoId = meta.youtubeVideoId || meta.videoId;
          
          if (videoId && meta.title) {
            const pageUrl = `${SITE_URL}${urlPrefix}/${slug}`;
            const uploadDateStr = meta.videoUploadDate || meta.pubDate || new Date().toISOString();
            const uploadDate = new Date(uploadDateStr).toISOString();
            
            // Format video duration
            const rawDuration = meta.videoDuration || 'PT10M00S';
            const durationInSeconds = parseDurationToSeconds(rawDuration);

            videoEntries.push({
              loc: pageUrl,
              title: meta.title,
              description: meta.description || meta.title,
              videoId: videoId,
              uploadDate: uploadDate,
              duration: durationInSeconds
            });
          }
        }
      });
    }
  });

  if (videoEntries.length === 0) {
    console.log('No video posts found. Skipping video sitemap generation.');
    return;
  }

  // Construct XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n`;

  videoEntries.forEach(entry => {
    const thumbnailUrl = `https://img.youtube.com/vi/${entry.videoId}/maxresdefault.jpg`;
    const contentUrl = `https://www.youtube.com/watch?v=${entry.videoId}`;
    const embedUrl = `https://www.youtube.com/embed/${entry.videoId}`;

    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    xml += `    <video:video>\n`;
    xml += `      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>\n`;
    xml += `      <video:title><![CDATA[${entry.title}]]></video:title>\n`;
    xml += `      <video:description><![CDATA[${entry.description}]]></video:description>\n`;
    xml += `      <video:content_loc>${contentUrl}</video:content_loc>\n`;
    xml += `      <video:embed_loc>${embedUrl}</video:embed_loc>\n`;
    xml += `      <video:publication_date>${entry.uploadDate}</video:publication_date>\n`;
    xml += `      <video:duration>${entry.duration}</video:duration>\n`;
    xml += `    </video:video>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  const outputPath = path.join(distDir, 'sitemap-video.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`Video sitemap generated with ${videoEntries.length} entries at dist/sitemap-video.xml`);
}

run();
