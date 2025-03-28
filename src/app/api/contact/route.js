import connectDB from '@/lib/connectDB';
import Message from '@/models/Message';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function POST(req, res) {
    const msg = await req.json()
    await connectDB();
    const message = await Message.create(msg)

    return NextResponse.json(message)
}