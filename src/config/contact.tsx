'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useMetaPixel } from '@/hooks/useMetaPixel';

export default function Contact() {
  const router = useRouter();
  const { trackContact } = useMetaPixel();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rastrear evento de contato
    trackContact('formulario_contato');
    
    // Aqui você pode implementar o envio do formulário
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Limpar formulário
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="text-center">
      {/* Título da seção */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 text-white">
        Entre em Contato
      </h2>
      
      {/* Subtítulo */}
      <p className="text-lg sm:text-xl text-center text-white/90 mb-12 max-w-3xl mx-auto">
        Estamos aqui para atender você da melhor forma possível
      </p>
      
      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Coluna da esquerda - Informações de contato */}
        <div className="text-left space-y-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Informações de Contato
            </h3>
            
            {/* Telefone */}
            <div 
              className="flex items-center space-x-4 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-all duration-300"
              onClick={() => trackContact('telefone')}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">📞</span>
              </div>
              <div>
                <p className="text-white/80 text-sm">Telefone</p>
                <p className="text-white font-semibold">(71) 99206-7664</p>
              </div>
            </div>
            
            {/* WhatsApp */}
            <div 
              className="flex items-center space-x-4 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-all duration-300"
              onClick={() => trackContact('whatsapp')}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <p className="text-white/80 text-sm">WhatsApp</p>
                <p className="text-white font-semibold">(71) 99206-7664</p>
              </div>
            </div>
            
            {/* Email */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">✉️</span>
              </div>
              <div>
                <p className="text-white/80 text-sm">Email</p>
                <p className="text-white font-semibold">contato@zenmarmitas.com</p>
              </div>
            </div>
            
            {/* Endereço */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <p className="text-white/80 text-sm">Endereço</p>
                <p className="text-white font-semibold">Salvador, BA - Brasil</p>
              </div>
            </div>
          </div>
          
          {/* Horário de funcionamento */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Horário de Funcionamento</h4>
            <div className="space-y-2 text-white/90">
              <div className="flex justify-between">
                <span>Segunda a Sexta:</span>
                <span>08:00 - 20:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sábado:</span>
                <span>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo:</span>
                <span>10:00 - 16:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA final */}
      <div className="mt-16 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block">
          <h4 className="text-2xl font-bold text-white mb-4">
            Pronto para experimentar?
          </h4>
          <p className="text-white/90 mb-6">
            Faça seu pedido agora e receba suas marmitas zen em até 30 minutos!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
            onClick={() => router.push('/cardapio')}
            className="px-8 py-3 bg-white text-[#5d7b3b] rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Ver Cardápio
            </button>
            <button 
            onClick={() => router.push('/carrinho')}
            className="px-8 py-3 bg-[#8c2121] text-white rounded-xl font-medium hover:bg-[#6b1a1a] transition-all duration-300 transform hover:scale-105 shadow-lg">
              Fazer Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
