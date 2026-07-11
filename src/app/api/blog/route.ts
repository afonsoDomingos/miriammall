import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import { BlogPost, serializeDoc } from '../../../utils/models';

export async function GET() {
  try {
    await dbConnect();
    // Sort blog posts by createdAt descending
    const items = await BlogPost.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: items.map(serializeDoc) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const _id = body.id || `post-${Date.now()}`;
    const doc = new BlogPost({ ...body, _id });
    await doc.save();
    return NextResponse.json({ success: true, data: serializeDoc(doc) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
