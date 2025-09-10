import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#5d7b3b] via-[#4a622f] to-[#8c2121] text-white relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Conteúdo principal do footer */}
          <div className="py-8">

            <div className="border-t border-white/20 pt-2 pb-2" />

            {/* Logo e descrição */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <Image src="/logoMarca.png" alt="Logo Marca" width={80} height={20} />
                <span className="text-2xl font-bold">Zen Marmitas</span>
              </div>

              <p className="text-white/90 mb-6 leading-relaxed max-w-md">
                Experimente nossas marmitas e traga o sabor perfeito para sua mesa.
              </p>
              <p className="text-white/90 mb-6 leading-relaxed max-w-md">
                CNPJ: 34.073.075/0001-14
              </p>

              {/* Redes sociais */}
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/zen.ifba/" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                  <FaInstagram className="text-white w-5 h-5" />
                </a>
                <a href="whatsapp://send?phone=5571981635808" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110">
                  <FaWhatsapp className="text-white w-5 h-5" />
                </a>
              </div>

            </div>
          </div>

          {/* Linha inferior */}
          <div className="border-t border-white/20 pt-4 pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-white/80 text-sm">
                © {currentYear} Zen Marmitas. Todos os direitos reservados.
              </div>

              <div className="flex text-sm">
                <h1>Feito por Nícolas Monteiro - nicolasmonteiro0123@gmail.com</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elemento decorativo flutuante */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 translate-y-16"></div>
    </footer>
  );
}
