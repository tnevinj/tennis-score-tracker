import connectDB from '@/lib/connectDB';
import Match from '@/models/Match';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB();
  const matches = await Match.find({}).sort({ date: -1 });

  return NextResponse.json({ matches })
}