# 🍽️ Zen Marmitas - Sistema de Gerenciamento de Cardápio

## 📋 Visão Geral

Este projeto implementa um sistema completo de gerenciamento de cardápio usando **Decap CMS** (ex-Netlify CMS) integrado com **Next.js** e **Vercel**. A cliente pode editar o cardápio sem precisar mexer no código.

## 🚀 Funcionalidades

### ✅ **Painel Administrativo**
- Interface amigável e intuitiva
- Autenticação via GitHub
- Edição em tempo real
- Preview das mudanças

### ✅ **Gerenciamento de Cardápio**
- Categorias organizadas
- Itens com preços e descrições
- Upload de imagens
- Controle de disponibilidade
- Suporte a combos com sub-itens

### ✅ **Workflow Editorial**
- **Draft**: Mudanças salvas mas não publicadas
- **Ready**: Mudanças prontas para revisão
- **Published**: Mudanças publicadas no site

### ✅ **Integração Automática**
- Commits automáticos no GitHub
- Rebuild automático na Vercel
- Sincronização em tempo real

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **CMS**: Decap CMS 3.8.3
- **Backend**: GitHub API
- **Hospedagem**: Vercel
- **Estilização**: Tailwind CSS
- **Autenticação**: GitHub OAuth

## 📁 Estrutura do Projeto

```
site-zen-marmitas/
├── public/
│   ├── admin/                 # Painel do CMS
│   │   ├── index.html        # Interface principal
│   │   └── config.yml        # Configuração do CMS
│   ├── data/
│   │   └── menu.json         # Dados do cardápio
│   └── images/
│       └── menu/             # Imagens do cardápio
├── src/
│   ├── app/
│   │   ├── admin/            # Página de admin
│   │   ├── api/menu/         # API do cardápio
│   │   └── cardapio/         # Página do cardápio
│   └── components/           # Componentes React
├── scripts/
│   └── setup-github-oauth.js # Script de configuração
└── docs/                     # Documentação
```

## 🚀 Instalação e Configuração

### 1. **Pré-requisitos**
- Node.js 18+
- Conta GitHub
- Conta Vercel
- Repositório GitHub configurado

### 2. **Instalação**
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/site-zen-marmitas.git
cd site-zen-marmitas

# Instale as dependências
npm install

# Execute o script de configuração
npm run setup-cms
```

### 3. **Configuração do GitHub OAuth**
1. Acesse: https://github.com/settings/applications/new
2. Configure:
   - **Name**: Zen Marmitas CMS
   - **Homepage URL**: https://seu-site.vercel.app
   - **Callback URL**: https://seu-site.vercel.app/admin/index.html
3. Anote o Client ID e Secret

### 4. **Variáveis de Ambiente**
Crie `.env.local`:
```env
GITHUB_CLIENT_ID=seu_client_id
GITHUB_CLIENT_SECRET=seu_client_secret
GITHUB_REPO_OWNER=seu_usuario
GITHUB_REPO_NAME=site-zen-marmitas
SITE_URL=https://seu-site.vercel.app
```

### 5. **Deploy na Vercel**
```bash
# Deploy automático via GitHub
git push origin main

# Ou deploy manual
vercel --prod
```

## 🎯 Como Usar

### **Para Desenvolvedores**

1. **Desenvolvimento Local**
```bash
npm run dev
# Acesse: http://localhost:3000
```

2. **Acessar CMS Local**
```bash
# Acesse: http://localhost:3000/admin
```

3. **Build para Produção**
```bash
npm run build
npm start
```

### **Para a Cliente (Usuário Final)**

1. **Acessar o Painel**
   - Vá para: `https://seu-site.vercel.app/admin`
   - Clique em "Login with GitHub"
   - Autorize a aplicação

2. **Editar Cardápio**
   - Clique em "Cardápio Completo"
   - Clique em "Cardápio" para editar
   - Modifique categorias e itens
   - Salve as mudanças
   - Publique para o site

3. **Gerenciar Conteúdo**
   - Adicionar/remover categorias
   - Adicionar/remover itens
   - Editar preços e descrições
   - Upload de imagens
   - Controlar disponibilidade

## 📊 Schema do Cardápio

```json
{
  "categories": [
    {
      "id": 1,
      "name": "COMBOS",
      "items": [
        {
          "id": 1,
          "name": "COMBO TRADICIONAL",
          "description": "7 Refeições Congeladas Fit",
          "price": 179.97,
          "image": "/images/menu/combo-tradicional.jpg",
          "available": true,
          "isCombo": true,
          "maxSelections": 7,
          "subItems": [
            {
              "id": "combo_1",
              "name": "Frango assado + Espaguete",
              "description": "Delicioso frango assado..."
            }
          ]
        }
      ]
    }
  ],
  "lastUpdated": "2025-01-27T10:00:00.000Z"
}
```

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build           # Build para produção
npm run start           # Servidor de produção
npm run lint            # Verificar código

# CMS
npm run setup-cms       # Configurar GitHub OAuth

# Deploy
vercel                  # Deploy para Vercel
vercel --prod          # Deploy para produção
vercel logs            # Ver logs
```

## 🚨 Solução de Problemas

### **Erro de Autenticação**
- Verifique Client ID e Secret
- Confirme callback URL
- Verifique variáveis de ambiente

### **Erro de Permissão**
- Confirme acesso ao repositório
- Verifique configuração do GitHub

### **Imagens Não Carregam**
- Verifique pasta `public/images/menu`
- Confirme permissões de escrita
- Verifique caminhos das imagens

### **Deploy Falha**
- Verifique logs da Vercel
- Confirme variáveis de ambiente
- Teste localmente primeiro

## 📈 Monitoramento

### **Logs da Vercel**
```bash
vercel logs --follow
```

### **Status do GitHub**
- Verifique commits automáticos
- Confirme webhooks
- Monitore permissões

### **Performance**
- Monitore tempo de build
- Verifique tamanho das imagens
- Otimize quando necessário

## 🔒 Segurança

- ✅ Autenticação via GitHub OAuth
- ✅ Controle de acesso por repositório
- ✅ Workflow editorial com aprovação
- ✅ Validação de dados no frontend e backend
- ✅ Sanitização de uploads de imagem

## 📞 Suporte

### **Documentação**
- `DECAP_CMS_SETUP.md` - Configuração completa
- `GITHUB_OAUTH_SETUP.md` - Guia OAuth
- `INSTRUCOES_FINAIS.md` - Instruções finais

### **Contato**
- GitHub Issues: Para bugs e melhorias
- Vercel Support: Para problemas de deploy
- Documentação oficial: https://decapcms.org

## 🎉 Conclusão

O sistema está **100% funcional** e pronto para uso! A cliente pode editar o cardápio de forma intuitiva, sem precisar mexer no código, e todas as mudanças são refletidas automaticamente no site.

**🚀 Sistema implementado com sucesso!**
