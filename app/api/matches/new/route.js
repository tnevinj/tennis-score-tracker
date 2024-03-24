import connectDB from '@/lib/connectDB';
import Match from '@/models/Match';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function POST(req, res) {
    const matchData = await req.json()
    await connectDB();
    const match = await Match.create(matchData)

    return NextResponse.redirect('/matches')
}