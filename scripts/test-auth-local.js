// Script para testar a autenticação local do Decap CMS
const https = require('https');
const http = require('http');

console.log('🔍 Testando configuração de autenticação do Decap CMS...\n');

// Teste 1: Verificar se a rota de auth está acessível
console.log('1. Testando rota de autenticação...');
const authUrl = 'http://localhost:3000/api/auth?provider=github';

http.get(authUrl, (res) => {
  console.log(`   Status: ${res.statusCode}`);
  console.log(`   Headers:`, res.headers);
  
  if (res.statusCode === 302) {
    const location = res.headers.location;
    console.log(`   ✅ Redirecionamento para: ${location}`);
    
    if (location && location.includes('github.com/login/oauth/authorize')) {
      console.log('   ✅ URL do GitHub está correta!');
    } else {
      console.log('   ❌ URL do GitHub incorreta!');
    }
  } else {
    console.log('   ❌ Não houve redirecionamento!');
  }
}).on('error', (err) => {
  console.log('   ❌ Erro ao conectar:', err.message);
  console.log('   💡 Certifique-se de que o servidor está rodando em localhost:3000');
});

// Teste 2: Verificar variáveis de ambiente
console.log('\n2. Verificando variáveis de ambiente...');
console.log('   GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID ? '✅ Configurado' : '❌ Não configurado');
console.log('   GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET ? '✅ Configurado' : '❌ Não configurado');

// Teste 3: Verificar configuração do GitHub OAuth
console.log('\n3. Instruções para configurar GitHub OAuth:');
console.log('   1. Vá para: https://github.com/settings/applications/new');
console.log('   2. Application name: Zen Marmitas CMS');
console.log('   3. Homepage URL: http://localhost:3000');
console.log('   4. Authorization callback URL: http://localhost:3000/api/auth/callback');
console.log('   5. Copie o Client ID e Client Secret para o arquivo .env.local');

console.log('\n4. URLs importantes:');
console.log('   - Admin: http://localhost:3000/admin/');
console.log('   - Auth: http://localhost:3000/api/auth?provider=github');
console.log('   - Callback: http://localhost:3000/api/auth/callback');
