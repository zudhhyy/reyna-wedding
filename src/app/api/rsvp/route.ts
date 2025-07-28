import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for local development
export const localStorage: Array<{
  id: string;
  name: string;
  attendance: string;
  phone: string;
  message: string;
  timestamp: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, attendance, phone, message } = body;

    // Validate required fields
    if (!name || !attendance || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create RSVP entry with timestamp
    const rsvpEntry = {
      id: Date.now().toString(),
      name,
      attendance,
      phone,
      message: message || '',
      timestamp: new Date().toISOString(),
    };

    // Try to use Vercel KV if available, otherwise use local storage
    try {
      const { kv } = await import('@vercel/kv');
      await kv.lpush('rsvp-submissions', JSON.stringify(rsvpEntry));
    } catch (error) {
      // Fallback to local storage for development
      console.log('Vercel KV not available, using local storage', error);
      localStorage.push(rsvpEntry);
    }

    return NextResponse.json({ success: true, data: rsvpEntry });
  } catch (error) {
    console.error('RSVP submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit RSVP' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Try to use Vercel KV if available, otherwise use local storage
    try {
      const { kv } = await import('@vercel/kv');
      const submissions = await kv.lrange('rsvp-submissions', 0, -1);
      const parsedSubmissions = submissions.map((sub: string) => JSON.parse(sub));
      return NextResponse.json({ submissions: parsedSubmissions });
    } catch (error) {
      // Fallback to local storage for development
      console.log('Vercel KV not available, using local storage', error);
      return NextResponse.json({ submissions: localStorage });
    }
  } catch (error) {
    console.error('Error fetching RSVP submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
} 