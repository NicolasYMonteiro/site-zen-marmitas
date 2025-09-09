'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { IoCartOutline } from "react-icons/io5";
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`w-13 h-13 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isScrolled ? 'bg-white/10' : 'bg-white/20'
            }`}>
              <Image src="/logoMarca.png" alt="Logo Marca" width={100} height={100} />
              
            </div>
            <span className={`text-xl lg:text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-[#5d7b3b]' : 'text-white'
            }`}>
              Zen Marmitas
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`font-medium transition-colors duration-200 hover:text-[#5d7b3b] ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Início
            </Link>
            <Link 
              href="/cardapio" 
              className={`font-medium transition-colors duration-200 hover:text-[#5d7b3b] ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Cardápio
            </Link>
            <Link 
              href="/#about" 
              className={`font-medium transition-colors duration-200 hover:text-[#5d7b3b] ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Sobre
            </Link>
            <Link 
              href="/#contact" 
              className={`font-medium transition-colors duration-200 hover:text-[#5d7b3b] ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Contato
            </Link>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Carrinho */}
            <Link 
              href="/carrinho" 
              className={`relative p-2 rounded-lg transition-all duration-200 hover:bg-[#5d7b3b]/10 ${
                isScrolled ? 'text-[#5d7b3b]' : 'text-white'
              }`}
            >
              <IoCartOutline className="w-6 h-7" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8c2121] text-white text-xs rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
              isScrolled ? 'text-[#5d7b3b]' : 'text-white'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-xl mt-2 p-4 shadow-xl border border-gray-100">
            <div className="space-y-4">
              <Link 
                href="/" 
                className="block font-medium text-gray-700 hover:text-[#5d7b3b] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                href="/cardapio" 
                className="block font-medium text-gray-700 hover:text-[#5d7b3b] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cardápio
              </Link>
              <Link 
                href="/#about" 
                className="block font-medium text-gray-700 hover:text-[#5d7b3b] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                href="/#contact" 
                className="block font-medium text-gray-700 hover:text-[#5d7b3b] transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contato
              </Link>
              
              <div className="border-t border-gray-200 pt-4">
                <Link 
                  href="/carrinho" 
                  className="flex items-center space-x-2 text-gray-700 hover:text-[#5d7b3b] transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IoCartOutline className="w-6 h-7" />
                  <span>Carrinho ({totalItems})</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}