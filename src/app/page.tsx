'use client';

import React, { useEffect } from 'react';
import Hero from '@/components/hero/hero';
import About from '@/components/about/about';
import Services from '@/components/services/services';
import Contact from '@/config/contact';
import Footer from '@/components/footer/footer';
import { useMetaPixel } from '@/hooks/useMetaPixel';
import { section } from 'framer-motion/client';

export default function HomePage() {
  const { trackViewContent } = useMetaPixel();

  // Rastrear visualização da página inicial
  useEffect(() => {
    trackViewContent('Homepage - Zen Marmitas', 'website');
  }, [trackViewContent]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5d7b3b] via-[#7a9a4e] to-[#4a622f] opacity-90"></div>
        <div className="relative z-10">
          <Hero />
        </div>
        {/* Elementos decorativos zen */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#e5d689]/60 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#8c2121]/60 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#e5d689]/60 rounded-full opacity-30 animate-pulse delay-500"></div>
      </section>

      {/* About Section */}
      <section 
      id='about'
      className="py-20 bg-gradient-to-b from-white to-[#fafafa]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <About />
        </div>
      </section>

      {/* Services Section */}
      <section 
      id='services'
      className="pb-20 pt-8 bg-gradient-to-b from-[#fafafa] to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Services />
        </div>
      </section>

      {/* Contact Section */}
      <section 
      id='contact'
      className="py-20 bg-gradient-to-br from-[#5d7b3b] via-[#7a9a4e] to-[#4a622f] relative overflow-hidden"
      >
        {/* Elementos decorativos zen */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-20 w-40 h-40 bg-[#e5d689] rounded-full opacity-10"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 bg-[#8c2121] rounded-full opacity-10"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#e5d689] rounded-full opacity-10 animate-pulse"></div>
        </div>
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Contact />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
