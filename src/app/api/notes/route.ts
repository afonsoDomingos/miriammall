import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import { Note, serializeDoc } from '../../../utils/models';

export async function GET() {
  try {
    await dbConnect();
    const notes = await Note.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notes.map(serializeDoc) });
  } catch (error: any) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch notes' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const newNote = new Note({
      _id: `note-${Date.now()}`,
      title: body.title,
      content: body.content,
      category: body.category || 'geral',
    });

    await newNote.save();

    return NextResponse.json({ success: true, data: serializeDoc(newNote) });
  } catch (error: any) {
    console.error('Error creating note:', error);
    return NextResponse.json({ success: false, error: 'Failed to create note' }, { status: 500 });
  }
}
