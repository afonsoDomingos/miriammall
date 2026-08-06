import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import { Building, serializeDoc } from '../../../utils/models';

export async function GET() {
  try {
    await dbConnect();
    const buildings = await Building.find({}).sort({ order: 1 });
    
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
    
    const newBuilding = new Building({
      _id: `building-${Date.now()}`,
      name: body.name,
      subtitle: body.subtitle,
      description: body.description,
      image: body.image,
      features: body.features || [],
      order: body.order || 0
    });
    
    await newBuilding.save();
    
    return NextResponse.json({
      success: true,
      data: serializeDoc(newBuilding)
    });
  } catch (error: any) {
    console.error('Error creating building:', error);
    return NextResponse.json({ success: false, error: 'Failed to create building' }, { status: 500 });
  }
}

