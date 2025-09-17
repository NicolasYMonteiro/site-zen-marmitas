# Instruções para Deploy na Vercel

## 🚀 Deploy Manual

### 1. **Fazer Deploy**
```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer login na Vercel
vercel login

# Deploy
vercel --prod
```

### 2. **Configurar Variáveis de Ambiente na Vercel**
No painel da Vercel, vá em **Settings > Environment Variables** e adicione:

```env
GITHUB_CLIENT_ID=seu_client_id_real
GITHUB_CLIENT_SECRET=seu_client_secret_real
SITE_URL=https://marmitashvc.vercel.app
```

### 3. **Configurar GitHub OAuth App**
1. Acesse: https://github.com/settings/applications/new
2. Configure:
   - **Application name**: `Zen Marmitas CMS`
   - **Homepage URL**: `https://marmitashvc.vercel.app`
   - **Authorization callback URL**: `https://marmitashvc.vercel.app/api/auth/callback`

### 4. **Testar Deploy**
```bash
# Testar localmente primeiro
npm run test-auth

# Testar em produção (após deploy)
curl -I https://marmitashvc.vercel.app/api/auth?provider=github
```

## 🔧 Arquivos de Configuração Criados

- ✅ `vercel.json` - Configuração do deploy
- ✅ `src/app/api/auth/route.ts` - API corrigida
- ✅ `src/app/api/auth/callback/route.ts` - Callback criado
- ✅ `scripts/test-auth.js` - Script de teste

## 🐛 Problemas Corrigidos

1. **Loop de redirecionamento** - Agora detecta ambiente local vs produção
2. **404 no deploy** - Configuração do Vercel adicionada
3. **URL incorreta** - Detecção automática de host e protocolo

## ✅ Status Atual

- ✅ API funcionando localmente (porta 3002)
- ✅ Redirecionamento para GitHub correto
- ✅ Configuração do Vercel pronta
- ⏳ Aguardando deploy para teste em produção

## 📋 Próximos Passos

1. Fazer deploy na Vercel
2. Configurar variáveis de ambiente
3. Configurar GitHub OAuth App
4. Testar em produção
