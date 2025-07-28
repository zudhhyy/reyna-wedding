import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

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

    // Store in Vercel KV
    await kv.lpush('rsvp-submissions', JSON.stringify(rsvpEntry));

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
    // Retrieve all RSVP submissions
    const submissions = await kv.lrange('rsvp-submissions', 0, -1);
    const parsedSubmissions = submissions.map(sub => JSON.parse(sub));
    
    return NextResponse.json({ submissions: parsedSubmissions });
  } catch (error) {
    console.error('Error fetching RSVP submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
} 