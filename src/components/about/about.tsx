import React from 'react';

export default function About() {
  return (
    <div className="text-center">
      {/* Título da seção */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8">
        <span className="bg-gradient-to-r from-[#5d7b3b] to-[#8c2121] bg-clip-text text-transparent">
          Sobre Nós
        </span>
      </h2>
      
      {/* Subtítulo */}
      <p className="text-lg sm:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Conheça nossa história e filosofia de trabalho
      </p>
      
      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Coluna da esquerda - Texto */}
        <div className="text-left space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#5d7b3b]">
              Nossa Missão
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Proporcionar refeições saudáveis e saborosas, preparadas com ingredientes 
              frescos e muito amor, levando o sabor caseiro para sua mesa todos os dias.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#e5d689]">
              Nossa Filosofia
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Acreditamos que uma boa refeição é essencial para o bem-estar físico e mental. 
              Por isso, dedicamos especial atenção à qualidade dos ingredientes e ao 
              processo de preparação de cada marmita.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#8c2121]">
              Nossos Valores
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#5d7b3b] rounded-full"></div>
                <span>Qualidade e frescor em todos os ingredientes</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e5d689] rounded-full"></div>
                <span>Compromisso com a satisfação do cliente</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#8c2121] rounded-full"></div>
                <span>Responsabilidade social e ambiental</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Coluna da direita - Imagem/Ilustração */}
        <div className="relative">
          <div className="relative">
            {/* Imagem principal */}
            <div className="w-full h-80 bg-gradient-to-br from-[#5d7b3b] to-[#7a9a4e] rounded-2xl shadow-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🍱</div>
                  <p className="text-xl font-medium">Sabor Autêntico</p>
                </div>
              </div>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#e5d689] rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#8c2121] rounded-full opacity-80 animate-pulse delay-500"></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-[#5d7b3b] rounded-full opacity-60 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
      
      {/* Estatísticas */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#5d7b3b] mb-2">500+</div>
          <p className="text-gray-600">Clientes Satisfeitos</p>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-[#8c2121] mb-2">3 dias úteis</div>
          <p className="text-gray-600">Entrega Disponível</p>
        </div>
      </div>

      <div className="border-t border-green-700 mt-12" />

    </div>
  );
}
