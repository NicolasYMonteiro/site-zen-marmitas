import React from 'react';

const services = [
  {
    icon: '🍱',
    title: 'Marmitas Tradicionais',
    description: 'Sabores clássicos da culinária brasileira, preparados com ingredientes frescos e muito amor.',
    color: 'from-[#5d7b3b] to-[#7a9a4e]'
  },
  {
    icon: '🥗',
    title: 'Marmitas Fitness',
    description: 'Opções saudáveis e nutritivas para quem busca uma alimentação equilibrada e saborosa.',
    color: 'from-[#e5d689] to-[#f0e4a3]'
  },
  {
    icon: '🌱',
    title: 'Marmitas Vegetarianas',
    description: 'Refeições deliciosas sem carne, ricas em proteínas vegetais e nutrientes essenciais.',
    color: 'from-[#8c2121] to-[#a52a2a]'
  },
  {
    icon: '🚚',
    title: 'Entrega Rápida',
    description: 'Entregamos em até 30 minutos na sua região, garantindo que sua refeição chegue quentinha.',
    color: 'from-[#5d7b3b] to-[#e5d689]'
  },
  {
    icon: '⭐',
    title: 'Qualidade Premium',
    description: 'Ingredientes selecionados e preparação artesanal para uma experiência gastronômica única.',
    color: 'from-[#e5d689] to-[#8c2121]'
  },
  {
    icon: '💚',
    title: 'Compromisso Social',
    description: 'Apoiamos produtores locais e praticamos sustentabilidade em todas as nossas operações.',
    color: 'from-[#8c2121] to-[#5d7b3b]'
  }
];

export default function Services() {
  return (
    <div className="text-center">
      {/* Título da seção */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8">
        <span className="bg-gradient-to-r from-[#5d7b3b] to-[#8c2121] bg-clip-text text-transparent">
          Nossos Serviços
        </span>
      </h2>
      
      {/* Subtítulo */}
      <p className="text-lg sm:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
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
            <p className="text-gray-600 leading-relaxed px-6 pb-6">
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
              <button className="px-8 py-3 bg-white text-[#5d7b3b] rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Ver Cardápio Completo
              </button>
              <button className="px-8 py-3 bg-[#8c2121] text-white rounded-xl font-medium hover:bg-[#6b1a1a] transition-all duration-300 transform hover:scale-105 shadow-lg">
                Fazer Pedido Agora
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefícios adicionais */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#5d7b3b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌿</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">100% Natural</h4>
          <p className="text-sm text-gray-600">Sem conservantes artificiais</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-[#e5d689]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Entrega Rápida</h4>
          <p className="text-sm text-gray-600">Em até 30 minutos</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-[#8c2121]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💳</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Pagamento Seguro</h4>
          <p className="text-sm text-gray-600">Múltiplas formas de pagamento</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-[#5d7b3b]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Satisfação Garantida</h4>
          <p className="text-sm text-gray-600">Ou seu dinheiro de volta</p>
        </div>
      </div>
    </div>
  );
}
