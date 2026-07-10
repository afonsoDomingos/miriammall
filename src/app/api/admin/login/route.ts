import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import { AdminUser } from '../../../../utils/models';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'Por favor, preencha todos os campos.' }, { status: 400 });
    }

    const emailToSearch = username.toLowerCase().trim();
    // Support both 'admin' and 'admin@miriammall.com' as usernames
    const queryEmail = emailToSearch === 'admin' ? 'admin@miriammall.com' : emailToSearch;
    
    // Find the user by email
    const user = await AdminUser.findOne({ email: queryEmail });

    if (!user) {
      return NextResponse.json({ success: false, error: 'Credenciais incorretas.' }, { status: 401 });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: 'Credenciais incorretas.' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: 'Autenticação bem sucedida.'
    });
  } catch (error: any) {
    console.error('Admin login error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Erro no servidor'
    }, { status: 500 });
  }
}
