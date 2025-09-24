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

---

# ✨ Novo fluxo simples: editar menu.json direto no GitHub

Esta aplicação agora possui um fluxo nativo para ler/escrever `public/data/menu.json` no repositório do GitHub, compatível com Vercel, sem Decap CMS.

## 🔧 Rotas adicionadas

- `GET /api/menu-github` → Carrega o `menu.json` do GitHub (se configurado) ou do filesystem local.
- `PUT /api/menu-github` → Salva o `menu.json` no GitHub (ou localmente). Protegido por `Authorization: Bearer ADMIN_TOKEN`.

## 🖥️ Tina CMS (UI amigável com upload de imagens)

- Rodar local: `npm run dev` (isto já inicia o Tina junto do Next)
- Editor visual: acesse `/tina` no seu site local ou em produção
- Uploads: enviados para `public/images/menu` (URL relativa salva no JSON)

## 🧩 Variáveis de ambiente (Vercel → Settings → Environment Variables)

```env
GITHUB_TOKEN=ghp_xxx_com_escopo_repo
GITHUB_REPO=seu-usuario/seu-repo
GITHUB_BRANCH=main
ADMIN_TOKEN=uma-senha-forte-para-edicao
NEXT_PUBLIC_TINA_CLIENT_ID=seu_client_id_do_tina_cloud
TINA_TOKEN=seu_token_do_tina_cloud
```

Observações:
- `GITHUB_TOKEN` precisa do escopo `repo` para commitar via Contents API.
- Se não definir `GITHUB_*`, o app usa o arquivo local (útil para desenvolvimento).

## ▶️ Como usar (Tina)

1. Abra `/tina`.
2. Entre na coleção “Cardápio Completo” → `menu.json`.
3. Edite categorias/itens com formulários amigáveis; faça upload de imagens.
4. Clique em “Save” para commitar no GitHub.

## 🧪 Teste local

Sem GitHub:
```bash
npm run dev
# GET carrega de public/data/menu.json; PUT salva local (se ADMIN_TOKEN ausente, retorna 401)
```

Com GitHub:
```bash
set GITHUB_TOKEN=ghp_xxx
set GITHUB_REPO=usuario/repo
set GITHUB_BRANCH=main
set ADMIN_TOKEN=senha
npm run dev
```

## ❓ Perguntas comuns

- “Preciso de OAuth GitHub?” → Não. Usamos token de máquina (`GITHUB_TOKEN`) + `ADMIN_TOKEN` simples para proteger escrita.
- “Funciona na Vercel?” → Sim, rotas Serverless e variáveis de ambiente padrão da Vercel.