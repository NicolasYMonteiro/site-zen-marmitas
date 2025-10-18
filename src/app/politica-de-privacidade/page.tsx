export const metadata = {
  title: "Política de Privacidade | Zen Marmitas",
  description:
    "Política de Privacidade da Zen Marmitas Fit – saiba como coletamos, usamos e protegemos seus dados pessoais.",
};

export default function PoliticaDePrivacidade() {
  return (
    <main className=" p-6 text-gray-800 leading-relaxed bg-white">
      <h1 className="text-3xl font-bold text-green-700 text-center mb-4">
        📜 Política de Privacidade
      </h1>
      <p className="mb-4">
        <strong>Última atualização:</strong> 18 de outubro de 2025
      </p>

      <p className="mb-6">
        A <strong>Zen Marmitas</strong> valoriza a privacidade e a proteção dos
        dados pessoais de seus clientes, parceiros e visitantes. Esta Política
        de Privacidade explica como coletamos, usamos e protegemos suas
        informações.
      </p>

      <hr className="my-8 border-gray-300" />

      <h2 className="text-xl font-semibold mb-2">📋 1. Coleta de Informações</h2>
      <p className="mb-4">
        Coletamos apenas os dados necessários para realizar nossos serviços,
        tais como:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Nome, telefone e e-mail para contato e entrega;</li>
        <li>Endereço para envio das marmitas;</li>
        <li>
          Informações de pagamento (via plataformas seguras como Pix, cartão ou
          intermediadores);
        </li>
        <li>
          Dados fornecidos voluntariamente em formulários, WhatsApp ou redes
          sociais oficiais da empresa.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">
        🎯 2. Finalidade do Uso dos Dados
      </h2>
      <p className="mb-4">As informações coletadas são utilizadas para:</p>
      <ul className="list-disc list-inside mb-6">
        <li>Processar pedidos e entregas;</li>
        <li>
          Enviar comunicações sobre status de pedidos, promoções e novidades;
        </li>
        <li>Melhorar a experiência do cliente e personalizar o atendimento;</li>
        <li>Cumprir obrigações legais e fiscais.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">🔐 3. Armazenamento e Segurança</h2>
      <p className="mb-6">
        A Zen Marmitas adota medidas técnicas e administrativas adequadas para
        proteger os dados contra acessos não autorizados, perda, alteração ou
        divulgação indevida. Os dados são armazenados de forma segura em
        sistemas de terceiros confiáveis (ex: Google Workspace, WhatsApp
        Business, plataformas de pagamento).
      </p>

      <h2 className="text-xl font-semibold mb-2">🤝 4. Compartilhamento de Dados</h2>
      <p className="mb-4">
        Podemos compartilhar dados com parceiros estritamente necessários à
        operação, tais como:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Empresas de entrega (motoboys);</li>
        <li>Plataformas de pagamento;</li>
        <li>
          Ferramentas de automação e marketing (ex: Meta Ads, Google Ads,
          ManyChat).
        </li>
      </ul>
      <p className="mb-6">
        Em todos os casos, garantimos o cumprimento da{" "}
        <strong>
          Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)
        </strong>
        .
      </p>

      <h2 className="text-xl font-semibold mb-2">⚙️ 5. Direitos do Titular</h2>
      <p className="mb-4">O titular dos dados pode, a qualquer momento:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Solicitar acesso, correção ou exclusão dos seus dados;</li>
        <li>Revogar o consentimento para uso de informações pessoais;</li>
        <li>Pedir informações sobre o tratamento de seus dados.</li>
      </ul>
      <p className="mb-6">
        As solicitações podem ser feitas pelo e-mail:{" "}
        <strong>zencomidasfit@gmail.com</strong>
      </p>

      <h2 className="text-xl font-semibold mb-2">
        🍪 6. Cookies e Tecnologias de Rastreamento
      </h2>
      <p className="mb-6">
        Nosso site e redes sociais podem utilizar cookies e pixels de
        rastreamento para fins estatísticos, de marketing e personalização de
        anúncios. Você pode configurar seu navegador para recusar cookies,
        porém algumas partes do site podem não funcionar corretamente.
      </p>

      <h2 className="text-xl font-semibold mb-2">
        📆 7. Atualizações desta Política
      </h2>
      <p className="mb-6">
        Esta Política poderá ser atualizada periodicamente para refletir
        mudanças nas práticas da empresa ou na legislação vigente. A versão
        mais recente estará sempre disponível em nosso site oficial.
      </p>

      <h2 className="text-xl font-semibold mb-2">📞 8. Contato</h2>
      <p className="mb-6">
        Em caso de dúvidas, entre em contato:
      </p>
      <p className="mb-6">
        <strong>Zen Marmitas Fit – Alimentação Saudável e Prática</strong>
        <br />
        E-mail: <a href="mailto:zencomidasfit@gmail.com" className="text-blue-600 hover:underline">zencomidasfit@gmail.com</a>
        <br />
        WhatsApp: (71) 9 9999-9999
        <br />
        Endereço comercial: Salvador – BA
      </p>

      <footer className="mt-10 text-sm text-gray-600 text-center border-t border-gray-200 pt-4">
        <p>© 2025 Zen Marmitas Fit. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
