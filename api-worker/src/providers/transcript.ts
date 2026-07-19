import { DomainError } from '../domain/errors';

export interface TranscriptProvider {
  getTranscript(videoId: string): Promise<string>;
}

export class ScraperTranscriptProvider implements TranscriptProvider {
  async getTranscript(videoId: string): Promise<string> {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch YouTube page: ${res.statusText}`);
      }

      const html = await res.text();

      // Find player response configurations
      const responseMatch = html.match(/ytInitialPlayerResponse\s*=\s*({[\s\S]*?});/);
      if (!responseMatch) {
        throw new Error('ytInitialPlayerResponse not found in YouTube page HTML');
      }

      const playerResponse = JSON.parse(responseMatch[1]);
      const captionTracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

      if (!captionTracks || captionTracks.length === 0) {
        throw new Error('No caption tracks found for this video');
      }

      // Prioritize English caption tracks
      const englishTrack = captionTracks.find((t: any) => t.languageCode === 'en') || captionTracks[0];
      const transcriptUrl = englishTrack.baseUrl;

      if (!transcriptUrl) {
        throw new Error('Transcript URL not specified in track metadata');
      }

      // Fetch captions XML
      const xmlRes = await fetch(transcriptUrl);
      if (!xmlRes.ok) {
        throw new Error(`Failed to fetch transcript XML: ${xmlRes.statusText}`);
      }

      const xml = await xmlRes.text();

      // Extract and clean text tags
      const textMatches = xml.match(/<text[^>]*>([\s\S]*?)<\/text>/g);
      if (!textMatches) {
        return '';
      }

      const transcript = textMatches
        .map((tag) => {
          return tag
            .replace(/<[^>]*>/g, '') // remove xml brackets
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&amp;#39;/g, "'")
            .trim();
        })
        .filter((text) => text.length > 0)
        .join(' ');

      return transcript;
    } catch (err: any) {
      console.warn(`ScraperTranscriptProvider failed for video ${videoId}:`, err.message);
      throw err;
    }
  }
}

export class FallbackTranscriptProvider implements TranscriptProvider {
  constructor(private providers: TranscriptProvider[]) {}

  async getTranscript(videoId: string): Promise<string> {
    let lastError: any = null;
    for (const provider of this.providers) {
      try {
        const transcript = await provider.getTranscript(videoId);
        if (transcript) return transcript;
      } catch (err: any) {
        lastError = err;
      }
    }
    throw new DomainError('TRANSCRIPT_RETRIEVAL_FAILED', `All transcript providers failed. Last error: ${lastError?.message || lastError}`);
  }
}
