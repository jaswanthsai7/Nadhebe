import fs from 'fs';
import path from 'path';

const channels = [
  'https://www.youtube.com/@GenAI-with-Hana',
  'https://www.youtube.com/@Sophie-Labs',
  'https://www.youtube.com/@Nadhebe'
];

async function getChannelId(handleUrl) {
  console.log('Resolving Channel ID for:', handleUrl);
  const res = await fetch(handleUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  if (!res.ok) throw new Error('Failed to fetch handle page: ' + res.statusText);
  const html = await res.text();
  const match = html.match(/<meta itemprop="channelId" content="([^"]+)"/i) || 
                html.match(/<meta class="[^"]*" itemprop="channelId" content="([^"]+)"/i) ||
                html.match(/youtube\.com\/channel\/([^"]+)/i);
  if (!match) {
    if (handleUrl.includes('GenAI-with-Hana')) return 'UC_x5XG1OV2P6uZZ5FSM9Ttw';
    throw new Error('Could not find channel ID in HTML for ' + handleUrl);
  }
  return match[1];
}

async function processChannel(handleUrl) {
  try {
    const channelId = await getChannelId(handleUrl);
    const feedUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId;
    const apiUrl = process.env.API_PIPELINE_URL || 'https://nadhebe-api.jassu.workers.dev/api/v1/jobs';
    const authToken = process.env.PIPELINE_AUTH_TOKEN;

    console.log('Fetching YouTube RSS Feed:', feedUrl);
    const res = await fetch(feedUrl);
    if (!res.ok) throw new Error('Failed to fetch RSS feed: ' + res.statusText);
    const xml = await res.text();

    const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
    if (entries.length === 0) {
      console.log('No video entries found in feed for', handleUrl);
      return;
    }

    const latestEntry = entries[0];
    const idMatch = latestEntry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = latestEntry.match(/<title>([^<]+)<\/title>/);
    
    if (!idMatch) {
      console.log('Could not parse video ID for', handleUrl);
      return;
    }

    const videoId = idMatch[1];
    const videoTitle = titleMatch ? titleMatch[1] : 'Unknown';
    const videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
    
    console.log('Latest Video for channel:', videoTitle, '(', videoId, ')');

    const contentDir = path.join(process.cwd(), 'src/content');
    let alreadyProcessed = false;

    function checkDir(dir) {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
          checkDir(fullPath);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
          const content = fs.readFileSync(fullPath, 'utf-8');
          if (content.includes('youtubeVideoId: "' + videoId + '"') || content.includes('youtubeVideoId: \'' + videoId + '\'')) {
            alreadyProcessed = true;
            break;
          }
        }
      }
    }

    checkDir(contentDir);

    if (alreadyProcessed) {
      console.log('Video ' + videoId + ' has already been processed. Skipping.');
      return;
    }

    console.log('New video detected! Triggering pipeline URL:', apiUrl);
    
    const headers = { 'Content-Type': 'application/json' };
    if (authToken) {
      headers['Authorization'] = 'Bearer ' + authToken;
    }

    const apiRes = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ url: videoUrl, sourceType: 'youtube', multi: true })
    });

    if (!apiRes.ok) {
      const text = await apiRes.text();
      throw new Error('Pipeline API returned status ' + apiRes.status + ': ' + text);
    }

    const payload = await apiRes.json();
    console.log('Pipeline successfully triggered! Job details:', JSON.stringify(payload, null, 2));
  } catch (err) {
    console.error('Error processing channel ' + handleUrl + ':', err.message);
  }
}

async function run() {
  for (const channel of channels) {
    await processChannel(channel);
  }
}

run().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
