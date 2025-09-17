import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get('provider');
  const siteId = searchParams.get('site_id');
  
  console.log('Auth request:', { provider, siteId, url: request.url });
  
  if (provider === 'github') {
    const clientId = process.env.GITHUB_CLIENT_ID || 'Ov23liljzYNwHQFsT9p2';
    
    // Detectar o domínio correto baseado no site_id ou usar o padrão
    let siteUrl = process.env.SITE_URL || 'https://marmitashvc.vercel.app';
    
    if (siteId) {
      // Se o site_id contém "marmitasvhc", usar o domínio correto
      if (siteId.includes('marmitasvhc')) {
        siteUrl = 'https://marmitashvc.vercel.app';
      }
    }
    
    console.log('GitHub auth config:', { clientId, siteUrl, siteId });

    // Construir URL de autorização do GitHub
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', clientId);
    githubAuthUrl.searchParams.set('redirect_uri', `${siteUrl}/admin/index.html`);
    githubAuthUrl.searchParams.set('scope', 'repo');
    githubAuthUrl.searchParams.set('state', 'decap-cms');
    
    console.log('Redirecting to:', githubAuthUrl.toString());
    
    // Criar resposta de redirecionamento mais explícita
    const response = NextResponse.redirect(githubAuthUrl.toString());
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    
    return response;
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
