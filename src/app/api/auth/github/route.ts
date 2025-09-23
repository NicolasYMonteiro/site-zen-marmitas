import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const redirectUri = process.env.GITHUB_REDIRECT_URI || '';

export async function GET(req: NextRequest) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    // Inicia o fluxo OAuth redirecionando para o GitHub
    const githubAuthUrl =
      `https://github.com/login/oauth/authorize?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=repo`;
    return NextResponse.redirect(githubAuthUrl, 302);
  }

  // Troca o code pelo access_token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenRes.json();
  if (tokenData.error) {
    return NextResponse.json({ error: tokenData.error_description }, { status: 400 });
  }

  return NextResponse.json({ access_token: tokenData.access_token });
}
