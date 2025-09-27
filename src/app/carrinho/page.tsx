'use client';

import React, { useState, useEffect } from 'react';
import { useCart, CustomerInfo } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { generateWhatsAppMessage, generateWhatsAppUrl, generateOrderNumber } from '@/lib/whatsapp';
import { useMetaPixel } from '@/hooks/useMetaPixel';
import toast, { Toaster } from 'react-hot-toast';

export default function CarrinhoPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { trackViewContent, trackInitiateCheckout, trackPurchase } = useMetaPixel();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    neighborhood: '',
    city: '',
    zipCode: '',
    complement: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Rastrear visualização da página do carrinho
  useEffect(() => {
    trackViewContent('Carrinho - Zen Marmitas', 'cart');

    // Se há itens no carrinho, rastrear como início de checkout
    if (items.length > 0) {
      trackInitiateCheckout(items, totalPrice);
    }
  }, [trackViewContent, trackInitiateCheckout, items, totalPrice]);

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev: CustomerInfo) => ({
      ...prev,
      [field]: value
    }));
  };

  const validateCustomerInfo = (info: CustomerInfo): boolean => {
    return !!(info.name && info.phone && info.address && info.neighborhood && info.city && info.zipCode);
  };

  const validateMinimumSelection = (): boolean => {
    const normalItems = items.filter(item => !item.isCombo);
    const comboItems = items.filter(item => item.isCombo);
    
    // Se tem combo, pode finalizar com pelo menos 1 item
    if (comboItems.length > 0) {
      return true;
    }
    
    // Se não tem combo, precisa de pelo menos 5 itens normais
    const totalNormalQuantity = normalItems.reduce((total, item) => total + item.quantity, 0);
    return totalNormalQuantity >= 5;
  };

  const handleCheckout = () => {
    if (!validateCustomerInfo(customerInfo)) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (!validateMinimumSelection()) {
      toast.error('Selecione pelo menos 5 itens normais ou 1 combo para finalizar o pedido');
      return;
    }

    if (items.length === 0) {
      toast.error('Adicione itens ao carrinho antes de fazer o pedido');
      return;
    }

    setIsProcessing(true);

    try {
      const orderNumber = generateOrderNumber();
      const message = generateWhatsAppMessage(items, customerInfo, orderNumber);
      const whatsappUrl = generateWhatsAppUrl(message);

      // Rastrear evento de compra no Meta Pixel
      trackPurchase(orderNumber, items, totalPrice + 10, customerInfo as unknown as Record<string, unknown>);

      // Abrir WhatsApp em nova aba
      window.open(whatsappUrl, '_blank');

      // Feedback de sucesso
      toast.success('Pedido enviado com sucesso! Redirecionando...');

      // Limpar carrinho após envio
      clearCart();

      // Redirecionar para página inicial após um pequeno delay
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch {
      toast.error('Erro ao processar pedido. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white text-gray-800">
      <Navbar />

      {/* Header da página */}
      <div className="pt-32 pb-16 bg-gradient-to-br from-[#5d7b3b] via-[#7a9a4e] to-[#4a622f] relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Seu Carrinho
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Revise seus itens e complete seu pedido com tranquilidade
          </p>
          <p className="text-xl font-bold text-white max-w-3xl mx-auto leading-relaxed">
            Entregamos em até 3 dias úteis
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            // Carrinho vazio
            <div className="text-center">
              <div className="w-32 h-32 bg-[#e5d689]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <span className="text-6xl">🛒</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Seu carrinho está vazio</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Adicione alguns itens deliciosos do nosso cardápio para começar!
              </p>
              <button
                onClick={() => router.push('/cardapio')}
                className="px-8 py-4 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] text-white rounded-xl font-medium hover:from-[#4a622f] hover:to-[#5d7b3b] transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Ver Cardápio
              </button>
            </div>
          ) : (
            // Conteúdo do carrinho
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Lista de itens */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Itens do Carrinho</h2>

                  <div className="space-y-4">
                    {items.map((item) => {
                      return (
                        <div key={item.id} className="flex items-center space-x-1 sm:space-x-4 p-4 bg-gray-50 rounded-xl">
                          {/* Imagem do item */}
                          <div className="w-16 h-16 bg-gradient-to-br from-[#5d7b3b] to-[#7a9a4e] rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">🍱</span>
                          </div>

                          {/* Informações do item */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                            <p className="text-lg font-bold text-[#5d7b3b]">
                              R$ {item.price.toFixed(2).replace('.', ',')}
                            </p>
                            
                            {/* Mostrar itens selecionados do combo */}
                            {item.isCombo && item.comboSelections && item.comboSelections.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium text-gray-700 mb-1">Itens selecionados:</p>
                                <div className="space-y-1">
                                  {item.comboSelections.map((selection, index) => (
                                    selection.quantity > 0 && (
                                      <p key={index} className="text-xs text-gray-600">
                                        • {selection.quantity}x {selection.subItemName}
                                      </p>
                                    )
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Controles de quantidade */}
                          <div className="flex flex-col sm:flex-row items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 bg-[#5d7b3b] text-white rounded-lg flex items-center justify-center hover:bg-[#4a622f] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              -
                            </button>

                            <span className="w-12 text-center font-medium text-gray-900">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-[#5d7b3b] text-white rounded-lg flex items-center justify-center hover:bg-[#4a622f] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              +
                            </button>
                          </div>

                          {/* Botão remover */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors duration-200"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Resumo e checkout */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-32">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>

                  {/* Resumo dos itens */}
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{item.name} x{item.quantity}</span>
                        <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Subtotal</span>
                      <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Taxa de entrega</span>
                      <span>+R$ 10,00</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2">
                      <span>Total</span>
                      <span>R$ {(totalPrice + 10).toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>

                  {/* Formulário de dados do cliente */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Seus Dados</h3>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Nome completo *"
                          value={customerInfo.name}
                          onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20 transition-all duration-300"
                        />
                        <input
                          type="tel"
                          placeholder="Telefone/WhatsApp *"
                          value={customerInfo.phone}
                          onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20 transition-all duration-300"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Endereço completo *"
                        value={customerInfo.address}
                        onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20 transition-all duration-300"
                      />

                      <input
                        type="text"
                        placeholder="Complemento (opcional)"
                        value={customerInfo.complement}
                        onChange={(e) => handleCustomerInfoChange('complement', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20 transition-all duration-300"
                      />

                      <input
                        type="text"
                        placeholder="Bairro *"
                        value={customerInfo.neighborhood}
                        onChange={(e) => handleCustomerInfoChange('neighborhood', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20 transition-all duration-300"
                      />

                      <input
                        type="text"
                        placeholder="Cidade *"
                        value={customerInfo.city}
                        onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20 transition-all duration-300"
                      />

                      <input
                        type="text"
                        placeholder="CEP *"
                        value={customerInfo.zipCode}
                        onChange={(e) => handleCustomerInfoChange('zipCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#5d7b3b] focus:ring-2 focus:ring-[#5d7b3b]/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Informação sobre seleção mínima */}
                  {!validateMinimumSelection() && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-amber-800">
                            {items.some(item => item.isCombo) 
                              ? 'Adicione pelo menos 1 combo para finalizar o pedido'
                              : `Selecione pelo menos 5 itens normais para finalizar o pedido (atual: ${items.filter(item => !item.isCombo).reduce((total, item) => total + item.quantity, 0)})`
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botão de checkout */}
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing || items.length === 0 || !validateMinimumSelection()}
                    className="w-full py-4 px-6 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] text-white font-bold rounded-xl hover:from-[#4a622f] hover:to-[#5d7b3b] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isProcessing ? 'Processando...' : 'Enviar Pedido via WhatsApp'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      
      {/* Toaster para feedback visual */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#5d7b3b',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}
