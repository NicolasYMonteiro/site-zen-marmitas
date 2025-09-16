import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const services = [
  {
    icon: '🥘',
    title: 'Marmitas Tradicionais',
    description: 'Receitas clássicas da culinária brasileira, preparadas de forma artesanal, congeladas com segurança e prontas para o seu dia a dia. Ideal para quem busca o sabor de casa, com mais tempo e menos trabalho.',
    color: 'from-[#5d7b3b] to-[#7a9a4e]'
  },
  {
    icon: '🥦',
    title: 'Marmitas Vegetarianas',
    description: 'Refeições sem carne, ricas em nutrientes, legumes e combinações saborosas. Congeladas para quem quer equilíbrio e praticidade, sem abrir mão do sabor.',
    color: 'from-[#e5d689] to-[#f0e4a3]'
  },
  {
    icon: '💪',
    title: 'Marmitas Fitness',
    description: 'Marmitas com foco em leveza, controle calórico e ingredientes selecionados. Perfeitas para quem cuida da alimentação, mas não tem tempo de cozinhar todo dia.',
    color: 'from-[#e5d689] to-[#f0e4a3]'
  },
  {
    icon: '🌱 ',
    title: 'Marmitas Veganas',
    description: 'Opções 100% vegetais, sem nenhum ingrediente de origem animal. Sabor, respeito e praticidade para todos os estilos de vida.',
    color: 'from-[#e5d689] to-[#f0e4a3]'
  },
  {
    icon: '⭐',
    title: 'Cardápio Personalizado Premium',
    description: 'Você diz o que gosta (ou evita), e nossa equipe monta um cardápio exclusivo com refeições congeladas sob medida. Ideal para quem tem restrições, metas ou prefere variedade controlada.',
    color: 'from-[#e5d689] to-[#8c2121]'
  },
  {
    icon: '📦',
    title: 'Entrega Programada',
    description: 'Monte seu estoque semanal e receba suas marmitas congeladas em casa, com agendamento e logística própria. Mais tempo, mais praticidade, menos preocupação.',
    color: 'from-[#e5d689] to-[#f0e4a3]'
  }
];

export default function Services() {
  const router = useRouter();
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(false);

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
        Descubra as soluções que a Zen oferece pra facilitar sua rotina e cuidar da sua alimentação com praticidade e sabor.
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
              Ganhe tempo comendo bem.
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Refeições artesanais congeladas, feitas sob encomenda, com opções para todos os estilos.
              Prontas pra aquecer, pensadas pra sua rotina e com possibilidade de cardápio personalizado.
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
      <div className="mt-20 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-[#e5d689] overflow-hidden">
        {/* Cabeçalho com botão de toggle */}
        <div 
          className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          onClick={() => setIsInstructionsExpanded(!isInstructionsExpanded)}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#5d7b3b] to-[#8c2121] bg-clip-text text-transparent">
              🍽 Como preparo minha marmita?
            </h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">
                {isInstructionsExpanded ? 'Ocultar' : 'Ver instruções'}
              </span>
              <div className={`transform transition-transform duration-300 ${isInstructionsExpanded ? 'rotate-180' : ''}`}>
                <svg className="w-6 h-6 text-[#5d7b3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo expansível */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isInstructionsExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 pb-6">
            <div className="space-y-6 text-gray-800">
              {/* Preparação inicial */}
              <div className="bg-gradient-to-r from-green-50 to-yellow-50 p-4 rounded-lg border-l-4 border-[#5d7b3b]">
                <p className="text-lg">
                  Retire do freezer com <span className="font-semibold text-[#5d7b3b]">8h de antecedência</span> e deixe na geladeira.<br />
                  Ou aqueça direto do congelador, se preferir praticidade.
                </p>
              </div>

              {/* Formas de aquecimento */}
              <div>
                <h4 className="text-xl font-bold text-[#5d7b3b] mb-4 flex items-center">
                  🔥 Formas de aquecimento recomendadas:
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Micro-ondas */}
                  <div className=" p-4 rounded-lg border border-blue-200">
                    <h5 className="font-semibold text-blue-800 mb-2 flex items-center">
                      🌀 Micro-ondas
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• <span className="font-medium">Descongelada:</span> 3 a 5 minutos</li>
                      <li>• <span className="font-medium">Congelada:</span> 7 a 10 minutos</li>
                    </ul>
                  </div>

                  {/* Banho-maria */}
                  <div className=" p-4 rounded-lg border border-green-200">
                    <h5 className="font-semibold text-green-800 mb-2 flex items-center">
                      💧 Banho-maria
                    </h5>
                    <p className="text-sm">
                      • 15 minutos com a embalagem fechada
                    </p>
                  </div>

                  {/* Forno tradicional */}
                  <div className=" p-4 rounded-lg border border-orange-200">
                    <h5 className="font-semibold text-orange-800 mb-2 flex items-center">
                      🔥 Forno tradicional
                    </h5>
                    <p className="text-sm">
                      • Retire da embalagem e aqueça por 15 a 20 minutos a 180 °C
                    </p>
                  </div>

                  {/* Air Fryer */}
                  <div className=" p-4 rounded-lg border border-purple-200">
                    <h5 className="font-semibold text-purple-800 mb-2 flex items-center">
                      🍟 Air Fryer
                    </h5>
                    <ul className="text-sm space-y-1">
                      <li>• Retire da embalagem e coloque a comida em recipiente próprio para air fryer</li>
                      <li>• Aqueça por 10 a 15 minutos a 160 °C, mexendo na metade do tempo</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Separador */}
              <div className="flex items-center justify-center">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e5d689] to-transparent"></div>
                <span className="px-4 text-[#5d7b3b] font-medium">⸻</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e5d689] to-transparent"></div>
              </div>

              {/* Atenção com embalagens */}
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h4 className="font-bold text-red-800 mb-2 flex items-center">
                  ⚠ Atenção com as embalagens:
                </h4>
                <p className="text-sm text-red-700">
                  Nossas marmitas são fornecidas em embalagens térmicas livres de BPA, seguras para micro-ondas e banho-maria.<br />
                  <span className="font-semibold">Não recomendamos colocar a embalagem diretamente no forno ou air fryer.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
