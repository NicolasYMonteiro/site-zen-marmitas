import { handler } from "decap-cms-backend-github";

export default async function authHandler(request) {
  const { searchParams } = new URL(request.url);
  const method = request.method;
  
  // Configuração do backend
  const config = {
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    repo: "NicolasYMonteiro/site-zen-marmitas",
    branch: "main",
  };

  // Criar um objeto request compatível com a API antiga
  const compatRequest = {
    method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
    body: method === 'POST' ? await request.text() : undefined,
  };

  // Criar um objeto response compatível
  let responseBody = '';
  let statusCode = 200;
  let headers = {};

  const compatResponse = {
    status: (code) => {
      statusCode = code;
      return compatResponse;
    },
    setHeader: (name, value) => {
      headers[name] = value;
      return compatResponse;
    },
    send: (body) => {
      responseBody = body;
      return compatResponse;
    },
    json: (obj) => {
      responseBody = JSON.stringify(obj);
      headers['Content-Type'] = 'application/json';
      return compatResponse;
    },
    redirect: (url) => {
      statusCode = 302;
      headers['Location'] = url;
      return compatResponse;
    }
  };

  try {
    await handler(compatRequest, compatResponse, config);
    
    return new Response(responseBody, {
      status: statusCode,
      headers: headers,
    });
  } catch (error) {
    console.error('Auth handler error:', error);
    return new Response(JSON.stringify({ error: 'Authentication failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const GET = authHandler;
export const POST = authHandler;
