import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import { serializeDoc } from '../../../../utils/models';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const body = await req.json();
    const mongoose = await dbConnect();
    const { id } = await params;
    
    const updatedNote = {
      title: body.title,
      content: body.content,
      category: body.category || 'geral',
      updatedAt: new Date()
    };
    
    // Always use string id field for notes (not _id ObjectId)
    const result = await mongoose.connection.db.collection('notes').updateOne(
      { id: id },
      { $set: updatedNote }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: { ...updatedNote, id }
    });
  } catch (error: any) {
    console.error('Error updating note:', error);
    return NextResponse.json({ success: false, error: 'Failed to update note' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const mongoose = await dbConnect();
    const { id } = await params;
    
    // Always use string id field for notes (not _id ObjectId)
    const result = await mongoose.connection.db.collection('notes').deleteOne(
      { id: id }
    );
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete note' }, { status: 500 });
  }
}
