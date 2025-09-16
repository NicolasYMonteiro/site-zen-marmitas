# Configuração do GitHub OAuth para Decap CMS

## Passo 1: Criar GitHub OAuth App

1. Acesse: https://github.com/settings/applications/new
2. Preencha os campos:
   - **Application name**: `Zen Marmitas CMS`
   - **Homepage URL**: `https://your-site.vercel.app` (substitua pelo seu domínio)
   - **Authorization callback URL**: `https://your-site.vercel.app/admin/index.html`

3. Clique em "Register application"
4. Anote o **Client ID** e **Client Secret**

## Passo 2: Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
GITHUB_CLIENT_ID=seu_client_id_aqui
GITHUB_CLIENT_SECRET=seu_client_secret_aqui
GITHUB_REPO_OWNER=seu_usuario_github
GITHUB_REPO_NAME=site-zen-marmitas
GITHUB_BRANCH=main
SITE_URL=https://seu-site.vercel.app
```

## Passo 3: Atualizar config.yml

No arquivo `public/admin/config.yml`, atualize:

```yaml
backend:
  name: github
  repo: seu_usuario/site-zen-marmitas
  branch: main
  site_domain: seu-site.vercel.app

site_url: https://seu-site.vercel.app
display_url: https://seu-site.vercel.app
```

## Passo 4: Configurar Vercel

1. No painel da Vercel, vá em Settings > Environment Variables
2. Adicione as variáveis:
   - `GITHUB_CLIENT_ID`
   - `GITHUB_CLIENT_SECRET`
   - `GITHUB_REPO_OWNER`
   - `GITHUB_REPO_NAME`
   - `GITHUB_BRANCH`
   - `SITE_URL`

## Passo 5: Configurar webhook da Vercel

1. No painel da Vercel, vá em Settings > Git
2. Certifique-se que o repositório está conectado
3. O rebuild automático já estará configurado
