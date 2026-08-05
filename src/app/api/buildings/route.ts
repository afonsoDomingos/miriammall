import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import { serializeDoc } from '../../../utils/models';

// Define Building model inline since it's not in models yet
const Building: any = null; // Will use MongoDB directly

export async function GET() {
  try {
    await dbConnect();
    const mongoose = await dbConnect();
    const buildings = await mongoose.connection.db.collection('buildings').find({}).sort({ order: 1 }).toArray();
    
    return NextResponse.json({
      success: true,
      data: buildings.map(serializeDoc)
    });
  } catch (error: any) {
    console.error('Error fetching buildings:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch buildings' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const mongoose = await dbConnect();
    
    const newBuilding = {
      name: body.name,
      subtitle: body.subtitle,
      description: body.description,
      image: body.image,
      features: body.features || [],
      order: body.order || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await mongoose.connection.db.collection('buildings').insertOne(newBuilding);
    
    return NextResponse.json({
      success: true,
      data: { ...newBuilding, id: result.insertedId.toString() }
    });
  } catch (error: any) {
    console.error('Error creating building:', error);
    return NextResponse.json({ success: false, error: 'Failed to create building' }, { status: 500 });
  }
}
