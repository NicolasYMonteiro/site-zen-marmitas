import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID!;
  const siteUrl = process.env.SITE_URL || 'https://marmitasvhc.vercel.app';

  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', clientId);
  githubAuthUrl.searchParams.set('redirect_uri', `${siteUrl}/api/auth/callback`);
  githubAuthUrl.searchParams.set('scope', 'repo');
  githubAuthUrl.searchParams.set('state', 'decap-cms');

  return NextResponse.redirect(githubAuthUrl.toString());
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, state } = body;
    
    if (!code || state !== 'decap-cms') {
      return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 });
    }
    
    // Trocar o código por um token de acesso
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID || 'Ov23liljzYNwHQFsT9p2',
        client_secret: process.env.GITHUB_CLIENT_SECRET || '5220babcf2487c7ab9b5021c27c60c0ea7152866',
        code: code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      console.error('Token exchange error:', tokenData);
      return NextResponse.json({ error: 'Falha na troca de token' }, { status: 400 });
    }
    
    // Buscar informações do usuário
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${tokenData.access_token}`,
        'Accept': 'application/json',
      },
    });
    
    const userData = await userResponse.json();
    
    return NextResponse.json({ 
      token: tokenData.access_token,
      user: {
        name: userData.name || userData.login,
        email: userData.email,
        login: userData.login
      }
    });
  } catch (error) {
    console.error('POST auth error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
