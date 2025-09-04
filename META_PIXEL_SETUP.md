# 🎯 Meta Pixel - Zen Marmitas

## ✅ Implementação Completa

O Meta Pixel foi implementado com sucesso no site Zen Marmitas para rastrear a eficácia da publicidade e as ações dos usuários.

## 🚀 Como Configurar

### 1. Obter o Pixel ID
1. Acesse o [Facebook Business Manager](https://business.facebook.com/)
2. Vá para "Gerenciador de Eventos" > "Pixels"
3. Crie um novo pixel ou use um existente
4. Copie o Pixel ID (formato: 123456789012345)

### 2. Configurar variável de ambiente
Crie um arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_META_PIXEL_ID=seu_pixel_id_aqui
```

## 📊 Eventos Implementados

### 🔄 Eventos Automáticos
- **PageView**: Visualização de páginas
- **ViewContent**: Visualização de conteúdo específico

### 🛒 Eventos de E-commerce
- **AddToCart**: Adicionar item ao carrinho
- **InitiateCheckout**: Iniciar processo de checkout  
- **Purchase**: Finalizar pedido via WhatsApp

### 🎯 Eventos Customizados
- **WhatsAppOrder**: Pedido enviado via WhatsApp
- **Contact**: Contato com a empresa (telefone, WhatsApp, formulário)
- **MenuView**: Visualização de categorias do menu

## 📍 Onde os Eventos São Disparados

### 🏠 Página Inicial (`/`)
- `ViewContent`: "Homepage - Zen Marmitas"

### 📋 Página do Cardápio (`/cardapio`)
- `ViewContent`: "Cardápio - Zen Marmitas"
- `MenuView`: Categoria visualizada
- `AddToCart`: Item adicionado ao carrinho

### 🛒 Página do Carrinho (`/carrinho`)
- `ViewContent`: "Carrinho - Zen Marmitas"
- `InitiateCheckout`: Quando há itens no carrinho
- `Purchase`: Pedido finalizado via WhatsApp
- `WhatsAppOrder`: Evento customizado com dados do cliente

### 📞 Seção de Contato
- `Contact`: Clique em telefone, WhatsApp ou envio de formulário

## 🔍 Como Verificar o Funcionamento

### 1. Console do Navegador
1. Abra o DevTools (F12)
2. Vá para a aba "Console"
3. Navegue pelo site e realize ações
4. Você verá logs como:
   ```
   Meta Pixel Event: AddToCart {content_ids: ["1"], content_name: "COMBO TRADICIONAL", ...}
   Meta Pixel Custom Event: WhatsAppOrder {order_id: "241201123456", ...}
   ```

### 2. Facebook Pixel Helper
1. Instale a extensão [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Navegue pelo site
3. Veja os eventos sendo disparados em tempo real

### 3. Gerenciador de Eventos do Facebook
1. Acesse "Gerenciador de Eventos" > "Testar Eventos"
2. Digite a URL do seu site
3. Veja os eventos sendo recebidos

## 💡 Dados Rastreados

### 📦 AddToCart
```javascript
{
  content_ids: ["1"],
  content_name: "COMBO TRADICIONAL - 7 REFEIÇÕES",
  content_type: "product",
  value: 179.97,
  currency: "BRL",
  num_items: 1
}
```

### 🛒 InitiateCheckout
```javascript
{
  content_ids: ["1", "2"],
  content_name: ["COMBO TRADICIONAL", "Filé de Frango"],
  content_type: "product",
  value: 205.67,
  currency: "BRL",
  num_items: 2
}
```

### 💰 Purchase
```javascript
{
  content_ids: ["1", "2"],
  content_name: ["COMBO TRADICIONAL", "Filé de Frango"],
  content_type: "product",
  value: 215.67, // Inclui taxa de entrega
  currency: "BRL",
  num_items: 2,
  order_id: "241201123456"
}
```

### 📱 WhatsAppOrder (Customizado)
```javascript
{
  order_id: "241201123456",
  total_value: 215.67,
  customer_name: "João Silva",
  customer_phone: "(71) 99999-9999",
  delivery_address: "Rua das Flores, 123",
  num_items: 2
}
```

## 🎯 Benefícios para Publicidade

### 📈 Otimização de Campanhas
- **Lookalike Audiences**: Criar audiências similares aos compradores
- **Retargeting**: Reengajar usuários que adicionaram ao carrinho
- **Conversão**: Otimizar campanhas para o evento Purchase

### 📊 Métricas Importantes
- **Taxa de Conversão**: Purchase / PageView
- **Abandono de Carrinho**: InitiateCheckout - Purchase
- **Engajamento**: AddToCart / ViewContent
- **ROI**: Valor das vendas / Investimento em anúncios

## 🔧 Hook Personalizado

```typescript
import { useMetaPixel } from '@/hooks/useMetaPixel';

const { 
  trackAddToCart, 
  trackInitiateCheckout, 
  trackPurchase,
  trackViewContent,
  trackContact,
  trackMenuView
} = useMetaPixel();
```

## ⚠️ Importante

- **LGPD**: O site coleta dados apenas para funcionalidade do carrinho
- **Consentimento**: Considere implementar banner de cookies se necessário
- **Teste**: Sempre teste os eventos antes de fazer campanhas pagas
- **Monitoramento**: Acompanhe regularmente os dados no Facebook Ads Manager

## 🚀 Próximos Passos

1. **Configurar o Pixel ID** no arquivo `.env.local`
2. **Testar todos os eventos** usando o Pixel Helper
3. **Criar audiências personalizadas** no Facebook Ads
4. **Configurar campanhas de conversão** otimizadas para Purchase
5. **Monitorar performance** e ajustar estratégias
