import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  
  console.log('GitHub callback:', { code: !!code, state, error });
  
  if (error) {
    console.error('GitHub auth error:', error);
    const siteUrl = process.env.SITE_URL || 'https://marmitasvhc.vercel.app';
    return NextResponse.redirect(`${siteUrl}/admin/?error=` + encodeURIComponent(error));
  }
  
  if (!code || state !== 'decap-cms') {
    console.error('Invalid callback parameters');
    const siteUrl = process.env.SITE_URL || 'https://marmitasvhc.vercel.app';
    return NextResponse.redirect(`${siteUrl}/admin/?error=invalid_callback`);
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
        client_id: process.env.GITHUB_CLIENT_ID || 'Ov23liljzYNwHQFsT9p2',
        client_secret: process.env.GITHUB_CLIENT_SECRET || '5220babcf2487c7ab9b5021c27c60c0ea7152866',
        code: code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      console.error('Token exchange error:', tokenData);
      const siteUrl = process.env.SITE_URL || 'https://marmitasvhc.vercel.app';
      return NextResponse.redirect(`${siteUrl}/admin/?error=token_exchange_failed`);
    }
    
    console.log('Token exchange successful');
    
    // Redirecionar de volta para o admin com o token
    const siteUrl = process.env.SITE_URL || 'https://marmitasvhc.vercel.app';
    const adminUrl = `${siteUrl}/admin/?access_token=` + encodeURIComponent(tokenData.access_token);
    
    return NextResponse.redirect(adminUrl);
    
  } catch (error) {
    console.error('Callback error:', error);
    const siteUrl = process.env.SITE_URL || 'https://marmitasvhc.vercel.app';
    return NextResponse.redirect(`${siteUrl}/admin/?error=callback_failed`);
  }
}
