import { CartItem, CustomerInfo } from '@/contexts/CartContext';
import { INFORMATIONS } from '@/config/informations';

export function generateWhatsAppMessage(
  items: CartItem[],
  customerInfo: CustomerInfo,
  orderNumber: string
): string {
  const deliveryFee = 10.00;
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;
  
  const currentTime = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  let message = `⭐ GOSTOU DE PEDIR NO NOSSO APP? ⭐
Não precisa baixar nada, adicione o nosso restaurante na tela inicial do seu celular e peça com mais agilidade na próxima vez através do link abaixo:
${INFORMATIONS.links.website}
---------------------------------------
Confira o pedido abaixo:
Pedido Zen Delivery #${orderNumber} - Zen Comidas
---------------------------------------

`;

  // Adicionar itens do pedido
  items.forEach(item => {
    const itemTotal = item.price * item.quantity;
    message += `${item.quantity}x ${item.name} R$ ${itemTotal.toFixed(2).replace('.', ',')}`;
    
    if (item.description) {
      message += `\n - ${item.description}`;
    }
    
    message += '\n\n';
  });

  // Adicionar totais
  message += `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}
Taxa de entrega: +R$ ${deliveryFee.toFixed(2).replace('.', ',')}
Total: R$ ${total.toFixed(2).replace('.', ',')}

---------------------------------------

${customerInfo.name}
${customerInfo.phone}

${customerInfo.address}${customerInfo.complement ? ` - ${customerInfo.complement}` : ''}
${customerInfo.neighborhood}, ${customerInfo.city}/Ba
${customerInfo.zipCode}

Pagamento: Pix
Nome da conta Pix: ${INFORMATIONS.contact.pix.name}
Chave Pix: ${INFORMATIONS.contact.pix.key}

Copie a chave e faça o pagamento através do Pix. O restaurante irá conferir o pagamento para liberação do seu pedido.

Pedido gerado pelo Zen Delivery às ${currentTime}`;

  return message;
}

export function generateWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${INFORMATIONS.contact.whatsapp}?text=${encodedMessage}`;
}

export function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');
  
  return `${year}${month}${day}${hour}${minute}${second}`;
}
