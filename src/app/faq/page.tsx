'use client';

import Navbar from '@/components/navbar/navbar';
import React from 'react';
import { FaQuestionCircle, FaArrowRight } from 'react-icons/fa';

export default function FAQPage() {
  const faqs = [
    {
      question: "A comida é fresca ou congelada?",
      answer: "As marmitas ZEN são 100% congeladas, preparadas com ingredientes frescos e embaladas logo após o preparo. Preservam sabor, qualidade e segurança alimentar — prontas pra ir direto pro seu freezer."
    },
    {
      question: "Quanto tempo dura?",
      answer: "Validade de até 90 dias congeladas. Após descongelar, consuma em até 48 horas. ⚠️ Não recongele após descongelar."
    },
    {
      question: "Posso montar meu combo?",
      answer: "Sim! Você escolhe os sabores ou solicita um cardápio personalizado com base no seu gosto, rotina e restrições alimentares. Nosso time monta tudo pra você com equilíbrio e praticidade."
    },
    {
      question: "Como faço para consumir as marmitas?",
      answer: (
        <div>
          <p className="mb-3">Retire do freezer com 8h de antecedência e deixe na geladeira, ou aqueça direto do congelador.</p>
          <p className="mb-2 font-semibold">Formas de aquecimento:</p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <div>
                <span className="font-medium">Micro-ondas:</span>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• 3 a 5 min (descongelada)</li>
                  <li>• 7 a 10 min (congelada)</li>
                </ul>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <div>
                <span className="font-medium">Banho-maria:</span>
                <ul className="ml-4 mt-1">
                  <li>• 15 min com a embalagem fechada</li>
                </ul>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <div>
                <span className="font-medium">Forno:</span>
                <ul className="ml-4 mt-1">
                  <li>• Retire da embalagem e aqueça por 15 a 20 min a 180 °C</li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      )
    },
    {
      question: "Entregam em quais bairros?",
      answer: "Sim! Entregamos em bairros selecionados de Salvador. Consulte a disponibilidade da sua região pelo WhatsApp."
    },
    {
      question: "Como funciona o pagamento?",
      answer: "O pagamento é feito adiantado, no momento da confirmação do pedido. Você pode pagar o valor total ou adiantar 50% para garantir a produção. Aceitamos: PIX, transferência, dinheiro, débito e crédito."
    },
    {
      question: "As marmitas são feitas na hora ou já estão prontas?",
      answer: "Todas as nossas marmitas são feitas por encomenda, de forma artesanal e cuidadosa. Após a confirmação do pedido e pagamento, entregamos em até 3 dias úteis."
    },
    {
      question: "O que significa “embalagem livre de BPA”? Por que isso é importante?",
      answer: (
        <div>
          <p>BPA é uma substância química usada em alguns plásticos que, quando aquecida, pode liberar toxinas prejudiciais à saúde.</p>
          <p>Nossas marmitas são embaladas em recipientes térmicos livres de BPA, garantindo mais segurança para você e sua família — mesmo ao aquecer no micro-ondas ou banho-maria.</p>
          <p>✔ Mais saúde</p>
          <p>✔ Mais segurança alimentar</p>
          <p>✔ Mais confiança no seu dia a dia</p>
        </div>
      )
    }

  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5d7b3b] via-[#7a9a4e] to-[#4a622f] pt-20">
        <Navbar />

        {/* Header da página */}
        <div className="pt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 bg-">
          <div className="flex items-center justify-center mb-6">
            <FaQuestionCircle className="text-6xl text-white mr-4" />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Perguntas Frequentes
            </h1>
          </div>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossas marmitas, entrega, pagamento e muito mais!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6 lg:p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-[#5d7b3b] rounded-full flex items-center justify-center">
                      <FaArrowRight className="text-white text-sm" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#5d7b3b] mb-4 leading-tight">
                      {faq.question}
                    </h3>
                    <div className="text-gray-700 leading-relaxed">
                      {typeof faq.answer === 'string' ? (
                        <p>{faq.answer}</p>
                      ) : (
                        faq.answer
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Separator */}
              {index < faqs.length - 1 && (
                <div className="px-6 lg:px-8 pb-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-[#5d7b3b]/20 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-[#5d7b3b] mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco pelo WhatsApp e tire todas as suas dúvidas!
            </p>
            <a
              href="whatsapp://send?phone=5571981635808"
              className="inline-flex items-center px-8 py-4 bg-[#5d7b3b] text-white font-semibold rounded-xl hover:bg-[#4a622f] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
