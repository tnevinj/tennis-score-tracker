import connectDB from '@/lib/connectDB';
import Match from '@/models/Match';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB();
  
  // Fetch all matches
  const matches = await Match.find({}).sort({ date: -1 });
  
  // Reorder matches to prioritize in-progress ones
  const reorderedMatches = [...matches].sort((a, b) => {
    // First priority: in progress matches come first
    if (a.status === 'in progress' && b.status !== 'in progress') {
      return -1;
    }
    if (a.status !== 'in progress' && b.status === 'in progress') {
      return 1;
    }
    
    // Second priority: completed matches before upcoming ones
    if (a.status === 'completed' && b.status === 'upcoming') {
      return -1;
    }
    if (a.status === 'upcoming' && b.status === 'completed') {
      return 1;
    }
    
    // Third priority: maintain date sort for matches of the same status
    return new Date(b.date) - new Date(a.date);
  });

  return NextResponse.json({ matches: reorderedMatches })
}