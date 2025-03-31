import connectDB from '@/lib/connectDB';
import Match from '@/models/Match';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  await connectDB();
  const { id } = await params;
  const match = await Match.findOne({ _id: id });

  return NextResponse.json({ match })
}

export async function PUT(req, { params }) {
  const updated_match = await req.json()
  await connectDB();
  const { id } = await params;
  const match = await Match.findOneAndUpdate({ _id: id }, {
    status: updated_match.status,
    game: updated_match.game,
    set1: updated_match.set1,
    set2: updated_match.set2,
    set3: updated_match.set3,
    tiebreak1: updated_match.tiebreak1,
    tiebreak2: updated_match.tiebreak2,
    tiebreak3: updated_match.tiebreak3,
    supertiebreak: updated_match.supertiebreak,
    serving: updated_match.serving
  });

  return NextResponse.json({ match })
}

export async function DELETE(request, { params }) {
  await connectDB();
  const { id } = await params;
  await Match.findOneAndDelete({ _id: id });

  return NextResponse.redirect('/matches/admin')
}
