import { NextRequest, NextResponse } from 'next/server';
import { localStorage } from '@/lib/storage';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try to use Vercel KV if available, otherwise use local storage
    try {
      const { kv } = await import('@vercel/kv');
      
      // Get all submissions
      const submissions = await kv.lrange('rsvp-submissions', 0, -1);
      
      // Filter out the submission to delete
      const filteredSubmissions = submissions.filter((sub: string) => {
        const submission = JSON.parse(sub);
        return submission.id !== id;
      });

      // Clear the list and re-add filtered submissions
      await kv.del('rsvp-submissions');
      if (filteredSubmissions.length > 0) {
        await kv.lpush('rsvp-submissions', ...filteredSubmissions);
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      // Fallback to local storage for development
      console.log('Vercel KV not available, using local storage', error);
      
      // Remove from local storage
      const index = localStorage.findIndex(sub => sub.id === id);
      if (index !== -1) {
        localStorage.splice(index, 1);
      }
      
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting RSVP submission:', error);
    return NextResponse.json(
      { error: 'Failed to delete submission' },
      { status: 500 }
    );
  }
} 