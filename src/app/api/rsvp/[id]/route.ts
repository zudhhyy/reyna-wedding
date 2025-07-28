import { NextRequest, NextResponse } from 'next/server';
import { deleteRSVP } from '@/lib/firebase';
import { localStorage } from '@/lib/storage';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Try to use Firebase if available, otherwise use local storage
    try {
      await deleteRSVP(id);
      return NextResponse.json({ success: true });
    } catch (error) {
      // Fallback to local storage for development
      console.log('Firebase not available, using local storage');
      
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