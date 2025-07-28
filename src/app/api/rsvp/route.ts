import { NextRequest, NextResponse } from 'next/server';
import { addRSVP, getRSVPs } from '@/lib/firebase';
import { localStorage } from '@/lib/storage';

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

    // Try to use Firebase if available, otherwise use local storage
    try {
      const result = await addRSVP({
        name,
        attendance,
        phone,
        message: message || ''
      });
      
      const rsvpEntry = {
        id: result.id,
        name,
        attendance,
        phone,
        message: message || '',
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json({ success: true, data: rsvpEntry });
    } catch (error) {
      // Fallback to local storage for development
      console.log('Firebase not available, using local storage');
      
      const rsvpEntry = {
        id: Date.now().toString(),
        name,
        attendance,
        phone,
        message: message || '',
        timestamp: new Date().toISOString(),
      };
      
      localStorage.push(rsvpEntry);
      return NextResponse.json({ success: true, data: rsvpEntry });
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
    // Try to use Firebase if available, otherwise use local storage
    try {
      const submissions = await getRSVPs();
      return NextResponse.json({ submissions });
    } catch (error) {
      // Fallback to local storage for development
      console.log('Firebase not available, using local storage');
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