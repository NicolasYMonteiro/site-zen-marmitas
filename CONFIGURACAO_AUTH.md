# 🔧 Configuração de Autenticação Decap CMS - CORRIGIDO

## ❌ Problema Identificado
O erro "page not found" acontece porque:
1. O `config.yml` estava apontando para o Vercel em vez do localhost
2. As variáveis de ambiente não estão configuradas
3. O GitHub OAuth não está configurado corretamente

## ✅ Correções Aplicadas

### 1. Configuração do config.yml
- Alterado `base_url` de `https://marmitashvc.vercel.app` para `http://localhost:3000`
- Alterado `site_url` e `display_url` para `http://localhost:3000`

### 2. Simplificação das rotas de API
- Removida lógica complexa de detecção de ambiente
- Hardcoded para localhost:3000 durante desenvolvimento
- Melhor tratamento de erros

## 🚀 Como Testar

### Passo 1: Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```bash
GITHUB_CLIENT_ID=seu_client_id_aqui
GITHUB_CLIENT_SECRET=seu_client_secret_aqui
SITE_URL=http://localhost:3000
```

### Passo 2: Configurar GitHub OAuth App
1. Vá para: https://github.com/settings/applications/new
2. Preencha:
   - **Application name**: Zen Marmitas CMS
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback`
3. Copie o Client ID e Client Secret para o `.env.local`

### Passo 3: Iniciar o Servidor
```bash
npm run dev
```

### Passo 4: Testar a Autenticação
1. Acesse: http://localhost:3000/admin/
2. Clique em "Login with GitHub"
3. Deve redirecionar para: `http://localhost:3000/api/auth?provider=github`
4. Em seguida, deve redirecionar para o GitHub OAuth
5. Após autorizar, deve voltar para o admin com token

## 🔍 URLs de Teste

- **Admin**: http://localhost:3000/admin/
- **Auth API**: http://localhost:3000/api/auth?provider=github
- **Callback**: http://localhost:3000/api/auth/callback

## 🐛 Debug

Se ainda não funcionar, verifique:

1. **Console do navegador** - erros JavaScript
2. **Terminal do servidor** - logs da API
3. **Network tab** - requisições HTTP
4. **Variáveis de ambiente** - se estão carregadas

## 📝 Logs Esperados

No terminal do servidor, você deve ver:
```
Auth request: { provider: 'github', url: '...' }
GitHub auth config: { clientId: 'Ov23li...', siteUrl: 'http://localhost:3000' }
Redirecting to GitHub: https://github.com/login/oauth/authorize?...
```

## 🔄 Para Produção

Quando for fazer deploy, altere no `config.yml`:
```yaml
base_url: https://marmitashvc.vercel.app
site_url: https://marmitashvc.vercel.app
display_url: https://marmitashvc.vercel.app
```

E configure as variáveis de ambiente no Vercel com a URL de produção.
