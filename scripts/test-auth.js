#!/usr/bin/env node

/**
 * Script para testar a API de autenticação do Decap CMS
 */

const https = require('https');
const http = require('http');

const SITE_URL = process.env.SITE_URL || 'https://marmitashvc.vercel.app';
const LOCAL_URL = 'http://localhost:3002';

async function testAuthEndpoint(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const authUrl = `${url}/api/auth?provider=github`;
    console.log(`\n🔍 Testando: ${authUrl}`);
    
    const req = client.get(authUrl, (res) => {
      console.log(`📊 Status: ${res.statusCode}`);
      console.log(`📍 Location: ${res.headers.location || 'N/A'}`);
      
      if ((res.statusCode === 302 || res.statusCode === 307) && res.headers.location) {
        const location = res.headers.location;
        if (location.includes('github.com/login/oauth/authorize')) {
          console.log('✅ Redirecionamento para GitHub OK');
          resolve(true);
        } else {
          console.log('❌ Redirecionamento incorreto');
          resolve(false);
        }
      } else {
        console.log('❌ Status ou redirecionamento incorreto');
        resolve(false);
      }
    });
    
    req.on('error', (error) => {
      console.log(`❌ Erro: ${error.message}`);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      console.log('❌ Timeout');
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  console.log('🧪 Testando API de Autenticação do Decap CMS\n');
  
  // Testar localmente primeiro
  console.log('🏠 Testando localmente...');
  const localResult = await testAuthEndpoint(LOCAL_URL);
  
  // Testar em produção
  console.log('\n🌐 Testando em produção...');
  const prodResult = await testAuthEndpoint(SITE_URL);
  
  console.log('\n📋 Resumo dos Testes:');
  console.log(`Local: ${localResult ? '✅ OK' : '❌ FALHOU'}`);
  console.log(`Produção: ${prodResult ? '✅ OK' : '❌ FALHOU'}`);
  
  if (localResult && prodResult) {
    console.log('\n🎉 Todos os testes passaram! A API está funcionando corretamente.');
  } else {
    console.log('\n⚠️  Alguns testes falharam. Verifique a configuração.');
  }
}

main().catch(console.error);
