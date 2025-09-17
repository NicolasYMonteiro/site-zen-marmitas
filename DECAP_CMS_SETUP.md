# 🍽️ Configuração do Decap CMS para Zen Marmitas

Este guia explica como configurar o Decap CMS (ex-Netlify CMS) para permitir que sua cliente edite o cardápio sem precisar mexer no código.

## 📋 Pré-requisitos

- Repositório GitHub configurado
- Site hospedado na Vercel
- Acesso administrativo ao GitHub e Vercel

## 🚀 Passo a Passo

### 1. Configurar GitHub OAuth App

1. **Acesse**: https://github.com/settings/applications/new
2. **Preencha os campos**:
   - **Application name**: `Zen Marmitas CMS`
   - **Homepage URL**: `https://seu-site.vercel.app` (substitua pelo seu domínio)
   - **Authorization callback URL**: `https://seu-site.vercel.app/admin/index.html`
3. **Clique em "Register application"**
4. **Anote o Client ID e Client Secret**

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
GITHUB_CLIENT_ID=seu_client_id_aqui
GITHUB_CLIENT_SECRET=seu_client_secret_aqui
GITHUB_REPO_OWNER=seu_usuario_github
GITHUB_REPO_NAME=site-zen-marmitas
GITHUB_BRANCH=main
SITE_URL=https://seu-site.vercel.app
```

### 3. Atualizar Configuração do CMS

No arquivo `public/admin/config.yml`, atualize:

```yaml
backend:
  name: github
  repo: seu_usuario/site-zen-marmitas
  branch: main

# Configuração de autenticação
publish_mode: editorial_workflow

# Configuração de mídia
media_folder: "public/images/menu"
public_folder: "/images/menu"

# Configurações do site
site_url: https://seu-site.vercel.app
display_url: https://seu-site.vercel.app

# Configuração de coleções
collections:
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
                      - {label: "Descrição", name: "description", widget: "text"}
```

### 4. Configurar Vercel

1. **No painel da Vercel**, vá em **Settings > Environment Variables**
2. **Adicione as variáveis**:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `GITHUB_REPO_OWNER`
   - `GITHUB_REPO_NAME`
   - `GITHUB_BRANCH`
   - `SITE_URL`

### 4.1. Configurações Importantes para Next.js 15

O projeto foi atualizado para funcionar corretamente com Next.js 15:

- **Endpoint de autenticação**: Implementado como `/api/auth/route.ts` com redirecionamento direto para GitHub OAuth
- **Middleware**: Configurado para permitir requisições do Decap CMS
- **Configuração corrigida**: `auth_endpoint` configurado como caminho relativo (`api/auth`) para evitar duplicação de URL

### 5. Fazer Deploy

1. **Commit e push** das alterações
2. **A Vercel fará rebuild automático**
3. **Teste o acesso** em: `https://seu-site.vercel.app/admin`

## 🎯 Como a Cliente Usará

### Primeiro Acesso

1. **Acesse**: `https://seu-site.vercel.app/admin`
2. **Clique em "Login with GitHub"**
3. **Autorize a aplicação**
4. **Pronto!** O painel estará disponível

### Editando o Cardápio

1. **No painel**, clique em **"Cardápio Completo"**
2. **Clique em "Cardápio"** para editar
3. **Modifique as categorias e itens** conforme necessário
4. **Clique em "Save"** para salvar
5. **Clique em "Publish"** para publicar as mudanças

### Workflow Editorial

- **Draft**: Mudanças salvas mas não publicadas
- **Ready**: Mudanças prontas para revisão
- **Published**: Mudanças publicadas no site

## 🔧 Testando Localmente

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis

Crie `.env.local` com suas configurações.

### 3. Executar Localmente

```bash
npm run dev
```

### 4. Acessar CMS

Vá para: `http://localhost:3000/admin`

## 📁 Estrutura de Arquivos

```
public/
├── admin/
│   ├── index.html          # Interface do CMS
│   └── config.yml          # Configuração do CMS
├── data/
│   └── menu.json           # Dados do cardápio
└── images/
    └── menu/               # Imagens do cardápio
```

## 🚨 Solução de Problemas

### Erro 404 no Endpoint /api/auth

Se você receber um erro 404 ao tentar acessar `/api/auth`, siga estes passos:

1. **Verifique se o endpoint está funcionando**:
   - Acesse: `https://seu-site.vercel.app/api/debug`
   - Deve retornar informações sobre as variáveis de ambiente

2. **Teste o endpoint de autenticação**:
   - Acesse: `https://seu-site.vercel.app/api/test-auth`
   - Deve retornar uma mensagem de sucesso

3. **Verifique as variáveis de ambiente na Vercel**:
   - No painel da Vercel, vá em Settings > Environment Variables
   - Confirme que `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET` estão definidas
   - Faça redeploy após adicionar as variáveis

### Erro de Autenticação

- Verifique se o Client ID e Secret estão corretos
- Confirme se a callback URL está configurada corretamente
- Verifique se as variáveis de ambiente estão definidas na Vercel

### Erro de Permissão

- Certifique-se de que o usuário tem acesso de escrita ao repositório
- Verifique se o repositório está configurado corretamente

### Imagens Não Carregam

- Verifique se a pasta `public/images/menu` existe
- Confirme se as permissões de escrita estão corretas
- Verifique se o caminho das imagens está correto

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs da Vercel
2. Confirme se todas as configurações estão corretas
3. Teste localmente primeiro
4. Verifique se o repositório GitHub está acessível

## 🎉 Pronto!

Após seguir todos os passos, sua cliente poderá:

- ✅ Editar o cardápio sem mexer no código
- ✅ Adicionar/remover itens e categorias
- ✅ Fazer upload de imagens
- ✅ Gerenciar preços e descrições
- ✅ Controlar disponibilidade dos itens
- ✅ Ver as mudanças refletidas automaticamente no site

O sistema está configurado para fazer rebuild automático na Vercel sempre que houver mudanças no repositório GitHub.
