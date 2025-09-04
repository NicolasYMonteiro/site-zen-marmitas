'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import { useMenu } from '@/hooks/useMenu';
import { useMetaPixel } from '@/hooks/useMetaPixel';

export default function CardapioPage() {
  const { addItem } = useCart();
  const router = useRouter();
  const { trackViewContent, trackAddToCart, trackMenuView } = useMetaPixel();
  const { menuData, loading, error } = useMenu();

  // Obter todos os itens do cardápio das categorias
  const allMenuItems = menuData?.categories.flatMap(category => 
    category.items.map(item => ({
      ...item,
      category: category.name
    }))
  ) || [];

  // Rastrear visualização da página do cardápio
  useEffect(() => {
    trackViewContent('Cardápio - Zen Marmitas', 'menu');
    trackMenuView('Todos os itens');
  }, [trackViewContent, trackMenuView]);

  const handleAddToCart = (item: typeof allMenuItems[0]) => {
    // Adicionar ao carrinho
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image
    });

    // Rastrear evento no Meta Pixel
    trackAddToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });

    // Rastrear visualização de categoria específica
    trackMenuView(item.category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white">
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando cardápio...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fafafa] to-white">
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Erro ao carregar</h2>
              <p className="text-gray-600 mb-4">{error}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
            Nosso Cardápio
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Descubra nossa seleção de marmitas preparadas com ingredientes frescos e muito amor. 
            Cada prato é uma experiência única de sabor e qualidade.
          </p>
        </div>
      </div>

      {/* Lista de itens do cardápio */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="my-8 text-center">
            <div className="bg-gradient-to-br from-[#5d7b3b] via-[#7a9a4e] to-[#e5d689] p-8 rounded-2xl text-white relative overflow-hidden shadow-2xl">
              {/* Elementos decorativos */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">
                  Pronto para experimentar?
                </h3>
                <p className="text-xl mb-6 opacity-90">
                  Adicione seus itens favoritos ao carrinho e faça seu pedido agora!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => router.push('/carrinho')}
                    className="px-8 py-3 bg-white text-[#5d7b3b] rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Ver Carrinho
                  </button>
                  <button 
                    onClick={() => router.push('/carrinho')}
                    className="px-8 py-3 bg-[#8c2121] text-white rounded-xl font-medium hover:bg-[#6b1a1a] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Fazer Pedido
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid de itens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allMenuItems.map((item) => {
              
              return (
                <div 
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 group"
                >
                  {/* Imagem do item */}
                  <div className="relative h-48 overflow-hidden">
                    {item.image ? (
                      <div className="w-full h-full relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#5d7b3b] to-[#7a9a4e] flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-2">🍱</div>
                          <p className="text-lg font-medium">{item.name}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Badge de preço */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg">
                      <span className="text-[#5d7b3b] font-bold text-lg">
                        R$ {Number(item.price).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>

                  {/* Conteúdo do item */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#5d7b3b] transition-colors duration-300">
                      {item.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Botão de adicionar ao carrinho */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.available}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                        item.available
                          ? 'bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] text-white hover:from-[#4a622f] hover:to-[#5d7b3b] shadow-lg hover:shadow-xl'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {item.available ? 'Adicionar ao Carrinho' : 'Indisponível'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
