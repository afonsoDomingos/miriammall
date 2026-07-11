import { NextResponse } from 'next/server';
import dbConnect from '../../../utils/db';
import { NewsletterEmail } from '../../../utils/models';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, error: 'Por favor, introduza um e-mail válido.' }, { status: 400 });
    }

    const emailTrimmed = email.toLowerCase().trim();
    
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      return NextResponse.json({ success: false, error: 'O formato do e-mail introduzido é inválido.' }, { status: 400 });
    }

    // Check if duplicate
    const exists = await NewsletterEmail.findOne({ email: emailTrimmed });
    if (exists) {
      return NextResponse.json({
        success: false,
        error: 'Este e-mail já se encontra registado no nosso boletim.'
      }, { status: 400 });
    }

    // Create entry
    const newSubscription = new NewsletterEmail({ email: emailTrimmed });
    await newSubscription.save();

    return NextResponse.json({
      success: true,
      message: 'O seu e-mail foi registado com sucesso! Obrigado por subscrever.'
    });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Ocorreu um erro no servidor. Tente novamente mais tarde.'
    }, { status: 500 });
  }
}
