import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import { serializeDoc } from '../../../../utils/models';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const body = await req.json();
    const mongoose = await dbConnect();
    const { id } = await params;
    
    const updatedBuilding = {
      name: body.name,
      subtitle: body.subtitle,
      description: body.description,
      image: body.image,
      features: body.features || [],
      order: body.order || 0,
      updatedAt: new Date()
    };
    
    // Always use string id field for buildings (not _id ObjectId)
    const result = await mongoose.connection.db.collection('buildings').updateOne(
      { id: id },
      { $set: updatedBuilding }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Building not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: { ...updatedBuilding, id }
    });
  } catch (error: any) {
    console.error('Error updating building:', error);
    return NextResponse.json({ success: false, error: 'Failed to update building' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const mongoose = await dbConnect();
    const { id } = await params;
    
    // Always use string id field for buildings (not _id ObjectId)
    const result = await mongoose.connection.db.collection('buildings').deleteOne(
      { id: id }
    );
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Building not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting building:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete building' }, { status: 500 });
  }
}
