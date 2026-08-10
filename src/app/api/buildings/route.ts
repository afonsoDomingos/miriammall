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
    
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'O nome do edifício é obrigatório.' }, { status: 400 });
    }

    const buildingId = body.id || `building-${Date.now()}`;
    const newBuilding = new Building({
      _id: buildingId,
      name: body.name,
      subtitle: body.subtitle || '',
      description: body.description || '',
      image: body.image || '',
      features: Array.isArray(body.features) ? body.features : [],
      order: typeof body.order === 'number' ? body.order : 0
    });
    
    await newBuilding.save();
    
    return NextResponse.json({
      success: true,
      data: serializeDoc(newBuilding)
    });
  } catch (error: any) {
    console.error('Error creating building:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create building' }, { status: 500 });
  }
}

