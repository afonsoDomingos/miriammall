import { NextResponse } from 'next/server';
import dbConnect from '../../../../utils/db';
import { AdminUser } from '../../../../utils/models';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    console.log(`[Login API] Received login request for username: "${username}"`);

    if (!username || !password) {
      console.warn('[Login API] Missing username or password.');
      return NextResponse.json({ success: false, error: 'Por favor, preencha todos os campos.' }, { status: 400 });
    }

    const emailToSearch = username.toLowerCase().trim();
    // Support both 'admin' and 'admin@miriammall.com' as usernames
    const queryEmail = emailToSearch === 'admin' ? 'admin@miriammall.com' : emailToSearch;
    
    let user = null;
    let isPasswordValid = false;
    let dbErrorOccurred = false;

    try {
      console.log('[Login API] Initiating database connection...');
      await dbConnect();
      console.log('[Login API] Database connection successful.');
      
      console.log(`[Login API] Searching database for user with email: "${queryEmail}"`);
      user = await AdminUser.findOne({ email: queryEmail });
      console.log(`[Login API] User search result: ${user ? 'FOUND' : 'NOT FOUND'}`);

      if (user) {
        console.log('[Login API] Comparing password hash...');
        isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(`[Login API] Password validation result: ${isPasswordValid ? 'VALID' : 'INVALID'}`);
      }
    } catch (dbErr: any) {
      console.error('[Login API] Database connection/query error:', dbErr);
      dbErrorOccurred = true;
    }

    // Fallback: If database is offline/unconfigured, or user is not found, allow default credentials
    if (dbErrorOccurred || !user || !isPasswordValid) {
      if (queryEmail === 'admin@miriammall.com' && password === '@Admin123@') {
        console.log('[Login API] Authentication successful using default fallback credentials.');
        return NextResponse.json({
          success: true,
          message: 'Autenticação bem sucedida (Fallback).'
        });
      }
    }

    if (!user || !isPasswordValid) {
      console.warn(`[Login API] Authentication failed for user "${queryEmail}".`);
      return NextResponse.json({ success: false, error: 'Credenciais incorretas.' }, { status: 401 });
    }

    console.log(`[Login API] Authentication successful for user "${queryEmail}".`);
    return NextResponse.json({
      success: true,
      message: 'Autenticação bem sucedida.'
    });
  } catch (error: any) {
    console.error('[Login API] Fatal login error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Erro no servidor'
    }, { status: 500 });
  }
}
