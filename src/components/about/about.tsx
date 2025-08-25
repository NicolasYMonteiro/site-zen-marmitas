'use client';

import { INFORMATIONS } from '@/config/informations';

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            {/* Section Header */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">Z</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Nossa História
                </h2>
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
            </div>

            {/* Story */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                A <span className="font-semibold text-green-600">{INFORMATIONS.company.name}</span> nasceu da paixão por alimentação saudável e da necessidade de oferecer soluções práticas para quem busca uma vida mais equilibrada.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Fundada em {INFORMATIONS.company.founded}, nossa missão é promover saúde e bem-estar através de refeições práticas, nutritivas e deliciosas, facilitando a vida de quem busca uma alimentação saudável sem abrir mão da praticidade.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Cada marmita é preparada com ingredientes frescos e selecionados, seguindo princípios de nutrição balanceada e sabor autêntico, sempre pensando no seu bem-estar e na praticidade do seu dia a dia.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Nossa Missão</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {INFORMATIONS.company.mission}
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">🌟</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Nossa Visão</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {INFORMATIONS.company.vision}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Clientes Satisfeitos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-sm text-gray-600">Opções no Cardápio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">2h</div>
                <div className="text-sm text-gray-600">Entrega Média</div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative z-10">
              <div className="aspect-square bg-gradient-to-br from-green-400 to-green-600 rounded-3xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-cover bg-center" style={{
                  backgroundImage: `url('/image copy.png')`
                }}>
                  {/* Overlay */}
                  <div className="w-full h-full bg-gradient-to-t from-black/30 to-transparent flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-2xl font-bold mb-2">Qualidade Zen</h3>
                      <p className="text-green-100">Cada refeição é preparada com carinho e dedicação</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-green-200 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-300 rounded-full opacity-40 animate-pulse delay-1000"></div>
            
            {/* Decorative Pattern */}
            <div className="absolute inset-0 -z-10">
              <div className="w-full h-full opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2322c55e' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Nossos Valores</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Princípios que guiam nossa jornada e garantem a qualidade de cada refeição
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {INFORMATIONS.benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                  <span>{benefit.icon}</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h4>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
