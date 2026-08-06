import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import { Building, serializeDoc } from '../../../../utils/models';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id } = await params;

    const doc = await Building.findOneAndUpdate(
      { _id: id },
      {
        name: body.name,
        subtitle: body.subtitle,
        description: body.description,
        image: body.image,
        features: body.features || [],
        order: body.order || 0,
      },
      { new: true }
    );

    if (!doc) {
      return NextResponse.json({ success: false, error: 'Building not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: serializeDoc(doc) });
  } catch (error: any) {
    console.error('Error updating building:', error);
    return NextResponse.json({ success: false, error: 'Failed to update building' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    const result = await Building.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Building not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting building:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete building' }, { status: 500 });
  }
}
