import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import { Promotion, serializeDoc } from '../../../../utils/models';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const doc = await Promotion.findByIdAndUpdate(id, body, { new: true });
    if (!doc) {
      return NextResponse.json({ success: false, error: 'Promotion not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: serializeDoc(doc) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const doc = await Promotion.findByIdAndDelete(id);
    if (!doc) {
      return NextResponse.json({ success: false, error: 'Promotion not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: serializeDoc(doc) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
