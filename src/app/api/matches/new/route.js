import connectDB from '@/lib/connectDB';
import Match from '@/models/Match';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function POST(req) {
    const data = await req.json();
    await connectDB();
    
    // Check if the request contains an array of matches or a single match
    if (Array.isArray(data)) {
        // Handle multiple matches
        try {
            // Create all matches in a single database operation
            const matches = await Match.insertMany(data);
            return NextResponse.json({ 
                success: true, 
                count: matches.length,
                matches 
            });
        } catch (error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }
    } else {
        // Handle single match (existing functionality)
        try {
            const match = await Match.create(data);
            return NextResponse.json(match);
        } catch (error) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }
    }
}