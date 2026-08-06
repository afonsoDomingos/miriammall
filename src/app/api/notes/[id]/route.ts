import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import { Note, serializeDoc } from '../../../../utils/models';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id } = await params;

    const doc = await Note.findOneAndUpdate(
      { _id: id },
      {
        title: body.title,
        content: body.content,
        category: body.category || 'geral',
      },
      { new: true }
    );

    if (!doc) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: serializeDoc(doc) });
  } catch (error: any) {
    console.error('Error updating note:', error);
    return NextResponse.json({ success: false, error: 'Failed to update note' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    const result = await Note.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Note not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete note' }, { status: 500 });
  }
}
