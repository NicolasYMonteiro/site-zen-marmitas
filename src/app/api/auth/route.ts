import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get('provider');
  
  console.log('Auth request:', { provider, url: request.url });
  
  if (provider === 'github') {
    const clientId = process.env.GITHUB_CLIENT_ID || 'Ov23liljzYNwHQFsT9p2';
    const siteUrl = process.env.SITE_URL || 'https://marmitashvc.vercel.app';
    
    console.log('GitHub auth config:', { clientId, siteUrl });

    // Construir URL de autorização do GitHub
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', clientId);
    githubAuthUrl.searchParams.set('redirect_uri', `${siteUrl}/admin/index.html`);
    githubAuthUrl.searchParams.set('scope', 'repo');
    githubAuthUrl.searchParams.set('state', 'decap-cms');
    
    console.log('Redirecting to:', githubAuthUrl.toString());
    return NextResponse.redirect(githubAuthUrl.toString());
  }

  return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Aqui você implementaria a lógica para trocar o código de autorização por um token
    // Por simplicidade, vou retornar um token mock
    return NextResponse.json({ 
      token: 'mock-token',
      user: {
        name: 'User',
        email: 'user@example.com'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
