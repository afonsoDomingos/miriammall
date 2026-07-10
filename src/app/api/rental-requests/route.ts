import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import { RentalRequest, serializeDoc } from '../../../utils/models';

export async function GET() {
  try {
    await dbConnect();
    const items = await RentalRequest.find({}).sort({ date: -1 });
    return NextResponse.json({ success: true, data: items.map(serializeDoc) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const _id = body.id || `req-${Date.now()}`;
    const date = body.date || new Date().toISOString();
    const doc = new RentalRequest({ ...body, _id, date });
    await doc.save();
    return NextResponse.json({ success: true, data: serializeDoc(doc) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
