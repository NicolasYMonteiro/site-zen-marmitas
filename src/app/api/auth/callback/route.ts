import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  
  console.log('GitHub callback:', { code: !!code, state, error });
  
  if (error) {
    console.error('GitHub auth error:', error);
    return NextResponse.redirect('http://localhost:3000/admin/?error=' + encodeURIComponent(error));
  }
  
  if (!code || state !== 'decap-cms') {
    console.error('Invalid callback parameters');
    return NextResponse.redirect('http://localhost:3000/admin/?error=invalid_callback');
  }
  
  try {
    // Trocar o código por um token de acesso
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      console.error('Token exchange error:', tokenData);
      return NextResponse.redirect('http://localhost:3000/admin/?error=token_exchange_failed');
    }
    
    console.log('Token exchange successful');
    
    // Redirecionar de volta para o admin com o token
    const adminUrl = 'http://localhost:3000/admin/?access_token=' + encodeURIComponent(tokenData.access_token);
    
    return NextResponse.redirect(adminUrl);
    
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect('http://localhost:3000/admin/?error=callback_failed');
  }
}
