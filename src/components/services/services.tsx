import React from 'react';
import { useRouter } from 'next/navigation';

const services = [
  {
    icon: '🍱',
    title: 'Marmitas Tradicionais',
    description: 'Sabores clássicos da culinária brasileira, preparados com ingredientes frescos e muito amor.',
    color: 'from-[#5d7b3b] to-[#7a9a4e]'
  },
  {
    icon: '🥗',
    title: 'Marmitas Vegetarianas',
    description: 'Opções vegetarianas e nutritivas para quem busca uma alimentação equilibrada e saborosa.',
    color: 'from-[#e5d689] to-[#f0e4a3]'
  },
  {
    icon: '🥗',
    title: 'Marmitas Fitness',
    description: 'Opções saudáveis e nutritivas para quem busca uma alimentação equilibrada e saborosa.',
    color: 'from-[#e5d689] to-[#f0e4a3]'
  },
  {
    icon: '⭐',
    title: 'Qualidade e Personalização Premium',
    description: 'Ingredientes selecionados e preparação artesanal para uma experiência gastronômica única.',
    color: 'from-[#e5d689] to-[#8c2121]'
  }
];

export default function Services() {
  const router = useRouter();

  return (
    <div className="text-center">
      {/* Título da seção */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8">
        <span className="bg-gradient-to-r from-[#5d7b3b] to-[#8c2121] bg-clip-text text-transparent">
          Nossos Serviços
        </span>
      </h2>
      
      {/* Subtítulo */}
      <p className="text-lg sm:text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
        Descubra todas as opções que temos para você
      </p>
      
      {/* Grid de serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group border border-gray-100"
          >
            {/* Ícone com gradiente */}
            <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 shadow-lg mt-6`}>
              <span>{service.icon}</span>
            </div>
            
            {/* Título */}
            <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-[#5d7b3b] transition-colors duration-300 px-6">
              {service.title}
            </h3>
            
            {/* Descrição */}
            <p className="text-gray-700 leading-relaxed px-6 pb-6">
              {service.description}
            </p>
            
            {/* Elemento decorativo */}
            <div className="w-12 h-1 bg-gradient-to-r from-[#5d7b3b] to-[#e5d689] rounded-full mx-auto mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
      
      {/* Seção de destaque */}
      <div className="mt-20">
        <div className="bg-gradient-to-br from-[#5d7b3b] via-[#7a9a4e] to-[#e5d689] p-8 rounded-2xl text-white relative overflow-hidden shadow-2xl">
          {/* Elementos decorativos de fundo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative text-center">
            <h3 className="text-3xl font-bold mb-4">
              Experimente a Diferença Zen
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Cada marmita é preparada com ingredientes frescos e muito amor, 
              garantindo uma experiência gastronômica única e memorável.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
              onClick={() => router.push('/cardapio')}

              className="px-8 py-3 bg-white text-[#5d7b3b] rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Ver Cardápio Completo
              </button>
              <button 
              onClick={() => router.push('/carrinho')}
              className="px-8 py-3 bg-[#8c2121] text-white rounded-xl font-medium hover:bg-[#6b1a1a] transition-all duration-300 transform hover:scale-105 shadow-lg">
                Fazer Pedido Agora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instruções de uso das marmitas congeladas */}
      <div className="mt-20 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-[#e5d689]">
        <div className="flex items-center justify-center mb-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-[#5d7b3b] to-[#8c2121] bg-clip-text text-transparent">
            Como usar suas MARMITAS CONGELADAS
          </h3>
        </div>
        <ul className="space-y-4 text-start text-gray-800 text-lg">
          <li>
            <span className="font-semibold">📦 Armazenamento:</span><br />
            Guarde no freezer, em posição reta.<br />
            <span className="italic text-gray-600">Validade: até 90 dias congelada.</span>
          </li>
          <li>
            <span className="font-semibold">🕘 Descongelamento ideal:</span><br />
            Tire do freezer e coloque na geladeira por <span className="font-semibold">8 horas</span> (ex: à noite para o almoço do dia seguinte).
          </li>
          <li>
            <span className="font-semibold">🔥 Aquecimento:</span><br />
            Você pode aquecer descongelada ou direto do congelador:
            <ul className="ml-6 mt-2 list-disc space-y-1 text-base">
              <li>
                <span className="font-semibold">Micro-ondas:</span><br />
                <span className="ml-2">• Descongelada: <span className="font-semibold">3 a 5 min</span></span><br />
                <span className="ml-2">• Congelada: <span className="font-semibold">7 a 10 min</span> <span className="text-gray-600">(parando no meio pra mexer)</span></span>
              </li>
              <li>
                <span className="font-semibold">Banho-maria (na panela):</span><br />
                <span className="ml-2">• Com a embalagem fechada, aqueça por <span className="font-semibold">15 min</span> em água quente</span>
              </li>
              <li>
                <span className="font-semibold">Forno convencional:</span><br />
                <span className="ml-2">• Retire da embalagem e aqueça por <span className="font-semibold">15 a 20 min</span> a 180°C</span>
              </li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-[#8c2121]">⚠️ Dicas importantes:</span>
            <ul className="ml-6 mt-1 list-disc text-base">
              <li>Não recongele depois de descongelar</li>
              <li>Evite deixar fora da geladeira por mais de 2 horas</li>
            </ul>
          </li>
        </ul>
      </div>
      
    </div>
  );
}
