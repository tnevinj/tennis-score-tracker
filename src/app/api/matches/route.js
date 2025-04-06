import connectDB from '@/lib/connectDB';
import Match from '@/models/Match';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB();
  
  // Fetch all matches
  const matches = await Match.aggregate([
    {
      $addFields: {
        statusOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$status", "in-progress"] }, then: 1 },
              { case: { $eq: ["$status", "completed"] }, then: 2 },
              { case: { $eq: ["$status", "upcoming"] }, then: 3 }
            ],
            default: 4
          }
        }
      }
    },
    { $sort: { statusOrder: 1 } },
    { $project: { statusOrder: 0 } } // Remove the helper field
  ]);

  return NextResponse.json({ matches })
}