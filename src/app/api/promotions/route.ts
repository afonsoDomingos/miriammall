import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import { Promotion, serializeDoc } from '../../../utils/models';

export async function GET() {
  try {
    await dbConnect();
    const items = await Promotion.find({});
    return NextResponse.json({ success: true, data: items.map(serializeDoc) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const _id = body.id || `promo-${Date.now()}`;
    const doc = new Promotion({ ...body, _id });
    await doc.save();
    return NextResponse.json({ success: true, data: serializeDoc(doc) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
