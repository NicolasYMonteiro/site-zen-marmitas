# 🛠️ Sistema de Administração - Zen Marmitas

## ✅ Implementação Completa

Sistema de administração implementado com sucesso para gerenciar o cardápio sem necessidade de API ou banco de dados.

## 🚀 Como Acessar

### URL de Acesso
```
https://seu-dominio.com/admin
```

### Autenticação
- **Método**: CPF
- **CPF de Teste**: `123.456.789-01`
- **Localização**: Não aparece nos menus - acesso direto pela URL

## 🔧 Funcionalidades Implementadas

### 📋 Gerenciamento de Cardápio
- ✅ **Visualizar** todos os itens organizados por categoria
- ✅ **Adicionar** novos itens ao cardápio
- ✅ **Editar** itens existentes
- ✅ **Remover** itens do cardápio
- ✅ **Adicionar** novas categorias
- ✅ **Controle de disponibilidade** (disponível/indisponível)

### 📊 Dados Gerenciados
- **Nome** do item
- **Descrição** detalhada
- **Preço** (com suporte a centavos)
- **Calorias** (opcional)
- **Proteína** (opcional)
- **Imagem** (caminho do arquivo)
- **Status** de disponibilidade

## 📁 Estrutura de Arquivos

### Arquivo de Dados
```
public/data/menu.json
```
- Armazena todos os dados do cardápio
- Formato JSON estruturado
- Atualizado automaticamente

### Hook de Gerenciamento
```
src/hooks/useMenu.ts
```
- Gerencia carregamento e salvamento
- Funções CRUD completas
- Estados de loading e erro

### Página de Admin
```
src/app/admin/page.tsx
```
- Interface de administração
- Autenticação por CPF
- Formulários de edição

## 🎯 Como Usar

### 1. Acessar o Painel
1. Navegue para `/admin`
2. Digite o CPF: `123.456.789-01`
3. Clique em "Acessar"

### 2. Adicionar Novo Item
1. Clique em "**+ Adicionar Item**"
2. Preencha os campos:
   - **Categoria**: Selecione a categoria
   - **Nome**: Nome do prato
   - **Descrição**: Descrição detalhada
   - **Preço**: Valor em reais
   - **Calorias**: (opcional)
   - **Proteína**: (opcional)
   - **Disponível**: Marque se estiver disponível
3. Clique em "**Adicionar**"

### 3. Editar Item Existente
1. Clique no ícone **✏️** no item desejado
2. Modifique os campos necessários
3. Clique em "**Salvar**"

### 4. Remover Item
1. Clique no ícone **🗑️** no item desejado
2. Confirme a remoção

### 5. Adicionar Nova Categoria
1. Clique em "**+ Adicionar Categoria**"
2. Digite o nome da categoria
3. Clique em "**Adicionar**"

## 📊 Estrutura do JSON

```json
{
  "categories": [
    {
      "id": 1,
      "name": "Combos",
      "items": [
        {
          "id": 1,
          "name": "COMBO TRADICIONAL - 7 REFEIÇÕES",
          "description": "Descrição detalhada...",
          "price": 179.97,
          "calories": 2800,
          "protein": "140g",
          "image": "/marmita-tradicional.png",
          "available": true
        }
      ]
    }
  ],
  "lastUpdated": "2024-12-01T12:00:00.000Z"
}
```

## 🔒 Segurança

### Autenticação
- **CPF único** para acesso
- **Validação simples** (pode ser melhorada)
- **Sessão local** (não persiste entre navegadores)

### Recomendações para Produção
1. **Implementar validação real de CPF**
2. **Adicionar senha** além do CPF
3. **Implementar sessão persistente**
4. **Adicionar logs de auditoria**
5. **Backup automático** do arquivo JSON

## 🚀 Integração com o Site

### Cardápio Atualizado Automaticamente
- A página `/cardapio` lê automaticamente do arquivo JSON
- **Sem necessidade de rebuild** do site
- **Atualizações em tempo real**

### Estados de Loading
- **Loading**: Enquanto carrega o cardápio
- **Erro**: Se houver problema no carregamento
- **Sucesso**: Exibe o cardápio completo

## 📱 Responsividade

### Design Adaptativo
- ✅ **Desktop**: Layout completo com todas as funcionalidades
- ✅ **Tablet**: Layout adaptado para telas médias
- ✅ **Mobile**: Interface otimizada para smartphones

### Modais Responsivos
- **Formulários** se adaptam ao tamanho da tela
- **Botões** com tamanho adequado para touch
- **Navegação** intuitiva em dispositivos móveis

## 🔧 Personalização

### Alterar CPF de Acesso
```typescript
// Em src/app/admin/page.tsx
const AUTHORIZED_CPF = '12345678901'; // Altere aqui
```

### Adicionar Novos Campos
1. **Atualizar interface** em `useMenu.ts`
2. **Modificar formulários** em `admin/page.tsx`
3. **Atualizar exibição** em `cardapio/page.tsx`

## ⚠️ Limitações Atuais

### Funcionalidades Não Implementadas
- ❌ **Upload de imagens** (usa caminhos estáticos)
- ❌ **Backup automático** do arquivo JSON
- ❌ **Histórico de alterações**
- ❌ **Múltiplos administradores**
- ❌ **Permissões granulares**

### Melhorias Futuras
- 🔄 **API real** para persistência
- 🔄 **Banco de dados** para dados estruturados
- 🔄 **Sistema de usuários** completo
- 🔄 **Upload de imagens** integrado
- 🔄 **Relatórios** de vendas

## 🎯 Benefícios

### Para o Administrador
- ✅ **Interface simples** e intuitiva
- ✅ **Sem necessidade de conhecimento técnico**
- ✅ **Atualizações instantâneas** no site
- ✅ **Controle total** sobre o cardápio

### Para o Desenvolvedor
- ✅ **Sem necessidade de API** complexa
- ✅ **Arquivo JSON** fácil de gerenciar
- ✅ **Código limpo** e bem estruturado
- ✅ **Fácil manutenção** e extensão

## 🚀 Próximos Passos

1. **Configurar CPF real** do administrador
2. **Testar todas as funcionalidades** CRUD
3. **Fazer backup** do arquivo `menu.json`
4. **Treinar o administrador** no uso do sistema
5. **Monitorar** o uso e performance
