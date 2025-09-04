'use client';

import { useEffect } from 'react';

// Declaração global do fbq
declare global {
  interface Window {
    fbq: (action: string, eventName: string, parameters?: Record<string, unknown>) => void;
  }
}

export const useMetaPixel = () => {
  useEffect(() => {
    // Verificar se o fbq está disponível
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      // Pixel já foi inicializado no layout
      console.log('Meta Pixel carregado');
    }
  }, []);

  // Função para rastrear eventos personalizados
  const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', eventName, parameters);
      console.log(`Meta Pixel Event: ${eventName}`, parameters);
    }
  };

  // Função para rastrear eventos de conversão
  const trackCustomEvent = (eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('trackCustom', eventName, parameters);
      console.log(`Meta Pixel Custom Event: ${eventName}`, parameters);
    }
  };

  // Eventos específicos do e-commerce
  const trackAddToCart = (item: { id: number; name: string; price: number; quantity: number }) => {
    trackEvent('AddToCart', {
      content_ids: [item.id.toString()],
      content_name: item.name,
      content_type: 'product',
      value: item.price * item.quantity,
      currency: 'BRL',
      num_items: item.quantity
    });
  };

  const trackInitiateCheckout = (items: Array<{ id: number; name: string; price: number; quantity: number }>, totalValue: number) => {
    const contentIds = items.map(item => item.id.toString());
    const contentNames = items.map(item => item.name);
    
    trackEvent('InitiateCheckout', {
      content_ids: contentIds,
      content_name: contentNames,
      content_type: 'product',
      value: totalValue,
      currency: 'BRL',
      num_items: items.reduce((total, item) => total + item.quantity, 0)
    });
  };

  const trackPurchase = (orderId: string, items: Array<{ id: number; name: string; price: number; quantity: number }>, totalValue: number, customerInfo: Record<string, unknown>) => {
    const contentIds = items.map(item => item.id.toString());
    const contentNames = items.map(item => item.name);
    
    trackEvent('Purchase', {
      content_ids: contentIds,
      content_name: contentNames,
      content_type: 'product',
      value: totalValue,
      currency: 'BRL',
      num_items: items.reduce((total, item) => total + item.quantity, 0),
      order_id: orderId
    });

    // Evento customizado para pedido via WhatsApp
    trackCustomEvent('WhatsAppOrder', {
      order_id: orderId,
      total_value: totalValue,
      customer_name: customerInfo.name,
      customer_phone: customerInfo.phone,
      delivery_address: customerInfo.address,
      num_items: items.reduce((total, item) => total + item.quantity, 0)
    });
  };

  const trackViewContent = (contentName: string, contentType: string = 'page') => {
    trackEvent('ViewContent', {
      content_name: contentName,
      content_type: contentType
    });
  };

  const trackPageView = (pageName: string) => {
    trackEvent('PageView', {
      page_name: pageName
    });
  };

  const trackContact = (contactMethod: string) => {
    trackCustomEvent('Contact', {
      contact_method: contactMethod
    });
  };

  const trackMenuView = (category: string) => {
    trackCustomEvent('MenuView', {
      category: category
    });
  };

  return {
    trackEvent,
    trackCustomEvent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
    trackViewContent,
    trackPageView,
    trackContact,
    trackMenuView
  };
};
