# 🚀 Deploy na Vercel - Instruções

## 📋 Checklist de Deploy

### 1. Verificar Arquivos Locais
✅ Certifique-se que estes arquivos estão corretos:
- `src/app/api/auth/route.ts` - Endpoint de autenticação
- `public/admin/config.yml` - Configuração do CMS
- `public/admin/index.html` - Interface do CMS

### 2. Fazer Commit e Push
```bash
git add .
git commit -m "Fix Decap CMS auth endpoint for Vercel deployment"
git push origin main
```

### 3. Verificar Deploy na Vercel
1. Acesse: https://vercel.com/dashboard
2. Encontre o projeto "site-zen-marmitas"
3. Verifique se o último deploy foi bem-sucedido
4. Se necessário, force um novo deploy

### 4. Configurar Variáveis de Ambiente
**IMPORTANTE**: Configure estas variáveis na Vercel:

1. Vá em: **Settings > Environment Variables**
2. Adicione:
   - `GITHUB_CLIENT_ID`: `Ov23liljzYNwHQFsT9p2`
   - `GITHUB_CLIENT_SECRET`: [Seu Client Secret]
   - `SITE_URL`: `https://marmitashvc.vercel.app`

### 5. Testar o Endpoint
Após o deploy, teste:
- `https://marmitashvc.vercel.app/api/auth?provider=github`
- Deve redirecionar para o GitHub OAuth

### 6. Testar o CMS
- Acesse: `https://marmitashvc.vercel.app/admin`
- Clique em "Login with GitHub"
- Deve funcionar sem erro 404

## 🔧 Solução de Problemas

### Se o endpoint ainda retornar 404:
1. **Force um novo deploy** na Vercel
2. **Limpe o cache** do browser
3. **Verifique os logs** da Vercel em Functions

### Se houver erro de autenticação:
1. **Verifique as variáveis de ambiente** na Vercel
2. **Confirme o GitHub OAuth App** está configurado corretamente
3. **Verifique o Client ID e Secret**

## 📞 Próximos Passos

Após o deploy bem-sucedido:
1. ✅ Teste o endpoint `/api/auth`
2. ✅ Teste o acesso ao `/admin`
3. ✅ Configure o GitHub OAuth App com domínio correto
4. ✅ Teste o login completo

---

**⚠️ LEMBRE-SE**: Após fazer push, aguarde alguns minutos para o deploy ser concluído na Vercel.
