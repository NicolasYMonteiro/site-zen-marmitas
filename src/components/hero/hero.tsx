'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbar';
import Image from 'next/image';

export default function Hero() {
  const router = useRouter();

  return (
    <div className="min-h-screen relative">
      <Navbar />
      
      {/* Hero Content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Título principal com gradiente zen */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#e5d689] via-white to-[#e5d689] bg-clip-text text-transparent">
              Zen Marmitas
            </span>
          </h1>
          
          {/* Subtítulo */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-white mb-8 font-light leading-relaxed">
            Sabor autêntico em cada colher
          </p>
          
          {/* Descrição */}
          <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"> 
            Nossas marmitas são preparadas com ingredientes frescos e muito amor, 
            trazendo o sabor caseiro para sua mesa.
          </p>

          <p className="text-lg sm:text-xl text-white font-bold mb-12 max-w-2xl mx-auto leading-relaxed"> 
            Personalize sua marmita com nossos combos e acompanhamentos.
          </p>
          
          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push('/cardapio')}
              className="px-8 py-4 bg-gradient-to-r from-[#5d7b3b] to-[#7a9a4e] text-white text-lg font-medium rounded-xl hover:from-[#4a622f] hover:to-[#5d7b3b] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Ver Cardápio
            </button>
            
            <button
              onClick={() => router.push('/carrinho')}
              className="px-8 py-4 bg-gradient-to-r from-[#e5d689] to-[#f0e4a3] text-[#212121] text-lg font-medium rounded-xl hover:from-[#d4c675] hover:to-[#e5d689] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Fazer Pedido
            </button>
          </div>
          
          {/* Elementos decorativos zen */}
          <div className="mt-16 flex justify-between space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#e5d689] rounded-full"></div>
              <span className="text-white text-lg lg:text-xl">Ingredientes <br /> Frescos</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-white text-lg lg:text-xl">Sabor <br /> Caseiro</span>
              <div className="w-3 h-3 bg-[#e5d689] rounded-full"></div>

            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Image src="/logoMarca.png" alt="Logo Marca" width={120} height={100} />
      </div>
      
      {/* Elementos decorativos flutuantes */}
      <div className="absolute top-1/4 right-10 w-20 h-20 bg-[#e5d689]/40 rounded-full opacity-20 animate-pulse delay-700"></div>
      <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-[#8c2121]/40 rounded-full opacity-20 animate-pulse delay-300"></div>
    </div>
  );
}
