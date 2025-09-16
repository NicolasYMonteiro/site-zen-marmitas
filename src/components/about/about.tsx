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
      <div className="grid grid-cols-1 gap-12 items-center">
        {/* Coluna da esquerda - Texto */}
        <div className="text-left space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#5d7b3b]">
            🧭 Nossa Missão
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Oferecer refeições artesanais congeladas, feitas sob encomenda, com sabor de comida caseira e equilíbrio —
              para que você coma bem, ganhe tempo e tenha mais liberdade no seu dia a dia.

            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#e5d689]">
            🧠 Nossa Filosofia
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Acreditamos que uma boa alimentação deve ser prática, acessível e adaptável à sua rotina.
              Por isso, na Zen, tudo é feito por encomenda, com ingredientes frescos, preparo artesanal e congelamento seguro.
              Você recebe refeições prontas pra aquecer em minutos — e pode escolher entre sabores tradicionais, leves, vegetarianos, veganos ou fit.

            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[#8c2121]">
            🌿 Nossos Diferenciais
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#5d7b3b] rounded-full"></div>
                <span>Refeições artesanais e congeladas, feitas sob demanda
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#e5d689] rounded-full"></div>
                <span>Prontas em minutos — ganhe tempo todos os dias
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#8c2121] rounded-full"></div>
                <span>Serviço exclusivo de cardápio personalizado
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#8c2121] rounded-full"></div>
                <span>Opções variadas para sua rotina: tradicional, leve, vegetariana, vegana e fit
                </span>
              </li>
              <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#5d7b3b] rounded-full"></div>
              <span>Embalagens térmicas, seguras e livres de BPA 
                </span>
              </li>
              <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#e5d689] rounded-full"></div>
              <span>Entregas em bairros selecionados de Salvador
                </span>
              </li>
              <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-[#5d7b3b] rounded-full"></div>
              <span>Atendimento ágil e simplificado via WhatsApp
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Coluna da direita - Imagem da cozinheira */}
        <div className="relative">
          {/* Grid para telas lg+ - imagem e texto lado a lado */}
          <div className="md:grid md:grid-cols-2 md:gap-6 md:items-center">
            {/* Imagem da cozinheira */}
            <div className="relative">
              <div className="w-full h-120 md:h-90 rounded-2xl shadow-2xl overflow-hidden">
                <img 
                  src="/foto-cozinheira.png" 
                  alt="Nossa chef Lucinéia preparando marmitas" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#e5d689] rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#8c2121] rounded-full opacity-80 animate-pulse delay-500"></div>
              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-[#5d7b3b] rounded-full opacity-60 animate-pulse delay-1000"></div>
            </div>
            
            {/* Frase - lado a lado em lg+, abaixo em telas menores */}
            <div className="mt-6 lg:mt-0 text-center lg:text-left">
              <p className="text-lg text-gray-700 italic">
                Nossa chef Lucinéia, prepara cada marmita com técnica e carinho, garantindo sabor, segurança e praticidade na sua mesa.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mt-20">

        <div className="text-center">
          <p className="text-2xl font-bold text-[#8c2121] mb-2">Entrega Rápida</p>
          <div className="text-4xl font-bold text-[#8c2121] mb-2"> 🚚 3 dias úteis</div>
          <p className="text-gray-600">Entrega Disponível</p>
        </div>
      </div>

      <div className="border-t border-green-700 mt-12" />

    </div>
  );
}
