#!/usr/bin/env node

/**
 * Script para configurar o GitHub OAuth App para o Decap CMS
 * Execute: node scripts/setup-github-oauth.js
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🍽️  Configuração do GitHub OAuth para Zen Marmitas CMS\n');

console.log('📋 INSTRUÇÕES:');
console.log('1. Acesse: https://github.com/settings/applications/new');
console.log('2. Preencha os campos:');
console.log('   - Application name: Zen Marmitas CMS');
console.log('   - Homepage URL: https://seu-site.vercel.app');
console.log('   - Authorization callback URL: https://seu-site.vercel.app/admin/index.html');
console.log('3. Clique em "Register application"');
console.log('4. Anote o Client ID e Client Secret\n');

const questions = [
  {
    key: 'clientId',
    question: 'Digite o Client ID: ',
    required: true
  },
  {
    key: 'clientSecret',
    question: 'Digite o Client Secret: ',
    required: true
  },
  {
    key: 'repoOwner',
    question: 'Digite o nome do usuário/organização do GitHub: ',
    required: true
  },
  {
    key: 'repoName',
    question: 'Digite o nome do repositório: ',
    required: true,
    default: 'site-zen-marmitas'
  },
  {
    key: 'siteUrl',
    question: 'Digite a URL do seu site (ex: https://seu-site.vercel.app): ',
    required: true
  }
];

const config = {};

function askQuestion(index) {
  if (index >= questions.length) {
    generateConfig();
    return;
  }

  const question = questions[index];
  const prompt = question.default ? 
    `${question.question}(padrão: ${question.default}) ` : 
    question.question;

  rl.question(prompt, (answer) => {
    const value = answer.trim() || question.default || '';
    
    if (question.required && !value) {
      console.log('❌ Este campo é obrigatório!\n');
      askQuestion(index);
      return;
    }

    config[question.key] = value;
    askQuestion(index + 1);
  });
}

function generateConfig() {
  console.log('\n🔧 Gerando configurações...\n');

  // Atualizar config.yml
  const configYml = `backend:
  name: github
  repo: ${config.repoOwner}/${config.repoName}
  branch: main

# Configuração de autenticação
publish_mode: editorial_workflow

# Configuração de mídia
media_folder: "public/images/menu"
public_folder: "/images/menu"

# Configurações do site
site_url: ${config.siteUrl}
display_url: ${config.siteUrl}

# Configuração de coleções
collections:
  # Coleção para o cardápio completo
  - name: "menu"
    label: "Cardápio Completo"
    files:
      - label: "Cardápio"
        name: "menu"
        file: "public/data/menu.json"
        fields:
          - label: "Categorias"
            name: "categories"
            widget: "list"
            fields:
              - {label: "ID", name: "id", widget: "number", value_type: "int"}
              - {label: "Nome", name: "name", widget: "string"}
              - label: "Itens"
                name: "items"
                widget: "list"
                fields:
                  - {label: "ID", name: "id", widget: "number", value_type: "int"}
                  - {label: "Nome", name: "name", widget: "string"}
                  - {label: "Descrição", name: "description", widget: "text"}
                  - {label: "Preço", name: "price", widget: "number", value_type: "float", step: 0.01}
                  - {label: "Imagem", name: "image", widget: "image", required: false}
                  - {label: "Disponível", name: "available", widget: "boolean", default: true}
                  - {label: "Calorias", name: "calories", widget: "number", value_type: "int", required: false}
                  - {label: "Proteína", name: "protein", widget: "string", required: false}
                  - {label: "É Combo", name: "isCombo", widget: "boolean", default: false}
                  - {label: "Máximo de Seleções", name: "maxSelections", widget: "number", value_type: "int", required: false}
                  - label: "Sub-itens (para combos)"
                    name: "subItems"
                    widget: "list"
                    required: false
                    fields:
                      - {label: "ID", name: "id", widget: "string"}
                      - {label: "Nome", name: "name", widget: "string"}
                      - {label: "Descrição", name: "description", widget: "text"}`;

  // Gerar arquivo .env.local
  const envContent = `# Configurações do GitHub OAuth App
GITHUB_CLIENT_ID=${config.clientId}
GITHUB_CLIENT_SECRET=${config.clientSecret}

# Configurações do repositório
GITHUB_REPO_OWNER=${config.repoOwner}
GITHUB_REPO_NAME=${config.repoName}
GITHUB_BRANCH=main

# URL do site
SITE_URL=${config.siteUrl}`;

  console.log('📝 CONFIGURAÇÕES GERADAS:\n');
  console.log('1. Atualize o arquivo public/admin/config.yml com:');
  console.log('─'.repeat(50));
  console.log(configYml);
  console.log('─'.repeat(50));
  
  console.log('\n2. Crie o arquivo .env.local na raiz do projeto com:');
  console.log('─'.repeat(50));
  console.log(envContent);
  console.log('─'.repeat(50));

  console.log('\n3. Configure as variáveis de ambiente na Vercel:');
  console.log('   - GITHUB_CLIENT_ID');
  console.log('   - GITHUB_CLIENT_SECRET');
  console.log('   - GITHUB_REPO_OWNER');
  console.log('   - GITHUB_REPO_NAME');
  console.log('   - GITHUB_BRANCH');
  console.log('   - SITE_URL');

  console.log('\n✅ Configuração concluída!');
  console.log('🚀 Faça o deploy e acesse: ' + config.siteUrl + '/admin');
  
  rl.close();
}

// Iniciar o processo
askQuestion(0);
