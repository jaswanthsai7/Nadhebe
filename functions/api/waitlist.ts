interface WaitlistRequest {
  email: string;
  platform?: 'windows' | 'ios' | 'both';
  name?: string;
  source?: string;
}

export async function onRequestPost(context: { request: Request; env: any }): Promise<Response> {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
  };

  try {
    let body: WaitlistRequest;
    try {
      body = await context.request.json<WaitlistRequest>();
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid JSON request payload.',
        }),
        { status: 400, headers }
      );
    }

    const email = (body.email || '').trim().toLowerCase();
    const platform = body.platform || 'windows';
    const name = (body.name || '').trim().slice(0, 80);
    const source = (body.source || 'perch_landing').trim().slice(0, 40);

    // Strict email format validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!email || !emailRegex.test(email) || email.length > 254) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Please provide a valid email address.',
        }),
        { status: 422, headers }
      );
    }

    const validPlatforms = ['windows', 'ios', 'both'];
    const chosenPlatform = validPlatforms.includes(platform) ? platform : 'windows';

    const timestamp = new Date().toISOString();
    const entry = {
      email,
      platform: chosenPlatform,
      name,
      source,
      timestamp,
      ip: context.request.headers.get('cf-connecting-ip') || 'unknown',
      userAgent: context.request.headers.get('user-agent') || 'unknown',
    };

    // If Cloudflare KV or D1 database is attached in production, persist it
    if (context.env?.WAITLIST_KV) {
      try {
        await context.env.WAITLIST_KV.put(
          `perch:${email}`,
          JSON.stringify(entry)
        );
      } catch (kvErr) {
        console.error('Failed to write waitlist to KV:', kvErr);
      }
    }

    if (context.env?.DB) {
      try {
        await context.env.DB.prepare(
          'INSERT OR REPLACE INTO perch_waitlist (email, platform, name, source, created_at) VALUES (?, ?, ?, ?, ?)'
        ).bind(email, chosenPlatform, name, source, timestamp).run();
      } catch (dbErr) {
        console.error('Failed to write waitlist to D1:', dbErr);
      }
    }

    // Log structured entry for edge log processing
    console.log('[PERCHBOARD_WAITLIST_SIGNUP]', JSON.stringify(entry));

    return new Response(
      JSON.stringify({
        success: true,
        message: "You're on the list. We'll be in touch when Perchboard is ready.",
        data: {
          email,
          platform: chosenPlatform,
          name: name || undefined,
        },
      }),
      { status: 200, headers }
    );
  } catch (err: any) {
    console.error('Waitlist submission internal error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Unable to process waitlist signup at this time. Please try again.',
      }),
      { status: 500, headers }
    );
  }
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
