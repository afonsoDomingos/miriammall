import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import { Banner, serializeDoc } from '../../../utils/models';

export async function GET() {
  try {
    await dbConnect();
    const items = await Banner.find({});
    return NextResponse.json({ success: true, data: items.map(serializeDoc) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const _id = body.id || `banner-${Date.now()}`;
    // Set isActive to true by default if not provided
    const bannerData = { ...body, _id, isActive: body.isActive !== undefined ? body.isActive : true };
    const doc = new Banner(bannerData);
    await doc.save();
    return NextResponse.json({ success: true, data: serializeDoc(doc) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
