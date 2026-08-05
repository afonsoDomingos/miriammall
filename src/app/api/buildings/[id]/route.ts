import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import { serializeDoc } from '../../../../utils/models';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    const mongoose = await dbConnect();
    
    const updatedBuilding = {
      name: body.name,
      subtitle: body.subtitle,
      description: body.description,
      image: body.image,
      features: body.features || [],
      order: body.order || 0,
      updatedAt: new Date()
    };
    
    const result = await mongoose.connection.db.collection('buildings').updateOne(
      { _id: new (await import('mongodb')).ObjectId(params.id) },
      { $set: updatedBuilding }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Building not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: { ...updatedBuilding, id: params.id }
    });
  } catch (error: any) {
    console.error('Error updating building:', error);
    return NextResponse.json({ success: false, error: 'Failed to update building' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const mongoose = await dbConnect();
    
    const result = await mongoose.connection.db.collection('buildings').deleteOne(
      { _id: new (await import('mongodb')).ObjectId(params.id) }
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
