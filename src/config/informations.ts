// 📋 Configuração centralizada de informações
// Dados da profissional e conteúdo do site

export const INFORMATIONS = {
  // Informações da empresa
  company: {
    name: 'Zen Comidas',
    tagline: 'Marmitas saudáveis, práticas e congeladas entregues na sua casa',
    description: 'Especialistas em alimentação saudável e prática, oferecendo marmitas fitness congeladas de alta qualidade, preparadas com ingredientes frescos e selecionados.',
    founded: '2023',
    mission: 'Promover saúde e bem-estar através de refeições práticas, nutritivas e deliciosas.',
    vision: 'Ser referência em alimentação congelada, facilitando a vida de quem busca uma alimentação saudável sem abrir mão da praticidade.',
  },

  // Dados de contato
  contact: {
    phone: '(71) 99206-7664',
    whatsapp: '5571992067664',
    email: 'contato@zencomidasfit.com.br',
    instagram: '@zencomidasfit',
    instagramUrl: 'https://www.instagram.com/zencomidasfit',
    address: {
      street: 'Rua Clínio de Jesus, 344',
      neighborhood: 'Barbalho',
      city: 'Salvador',
      state: 'BA',
      cep: '40301-200',
      full: 'Rua Clínio de Jesus, 344 - Barbalho, Salvador - BA, 40301-200'
    },
    hours: {
      weekdays: 'Segunda a Sexta: 8h às 18h',
      weekends: 'Sábado: 8h às 14h',
      sunday: 'Domingo: Fechado'
    },
    pix: {
      name: 'ZEN COMIDAS FIT',
      key: '34.073.075/0001-14'
    }
  },

  // Links externos
  links: {
    goomer: 'https://www.goomer.app/zencomidasfit',
    facebook: 'https://www.facebook.com/zencomidasfit',
    tiktok: 'https://www.tiktok.com/@zencomidasfit',
    website: 'https://zen-comidas-natural.com.br'
  },

  // Cardápio
  menu: {
    categories: [
      {
        name: 'Combos',
        items: [
          {
            id: 1,
            name: 'COMBO TRADICIONAL - 7 REFEIÇÕES',
            description: 'Frango assado + Espaguete no alho e óleo + mix de legumes, Carne de panela + arroz branco + legumes assado, Estrogonoffe de frango + arroz branco + batata palha, Frango cremoso assado + Espaguete no alho e óleo + legumes assado, Bife acebolado + arroz branco + feijão de caldo, Escondidinho de frango com purê de abóbora (2x)',
            price: 179.97,
            calories: 2800,
            protein: '140g',
            image: '/marmita-tradicional.png',
            available: true
          }
        ]
      },
      {
        name: 'Pratos Principais',
        items: [
          {
            id: 2,
            name: 'Filé de Frango Grelhado ao Molho',
            description: 'Filé de frango grelhado com molho especial',
            price: 25.70,
            calories: 350,
            protein: '32g',
            image: '/marmita-fitness.png',
            available: true
          },
          {
            id: 3,
            name: 'Yakisoba com Frango',
            description: 'Macarrão yakisoba com frango e legumes',
            price: 26.00,
            calories: 380,
            protein: '28g',
            image: '/marmita-executiva.png',
            available: true
          },
          {
            id: 4,
            name: 'Quiabada',
            description: 'Quiabada tradicional com carne',
            price: 25.50,
            calories: 320,
            protein: '25g',
            image: '/marmita-tradicional.png',
            available: true
          },
          {
            id: 5,
            name: 'Tirinhas de Carne com Molho Rosa',
            description: 'Tirinhas de carne com molho rosa especial',
            price: 26.00,
            calories: 340,
            protein: '30g',
            image: '/marmita-executiva.png',
            available: true
          },
          {
            id: 6,
            name: 'Moqueca de Filé de Tilápia',
            description: 'Moqueca de tilápia com farofa de manteiga',
            price: 29.90,
            calories: 400,
            protein: '35g',
            image: '/marmita-fitness.png',
            available: true
          }
        ]
      },
      {
        name: 'Acompanhamentos',
        items: [
          {
            id: 7,
            name: 'Arroz Branco',
            description: 'Arroz branco temperado',
            price: 0.50,
            calories: 80,
            protein: '2g',
            image: '/marmita-tradicional.png',
            available: true
          },
          {
            id: 8,
            name: 'Feijão de Caldo',
            description: 'Feijão de caldo temperado',
            price: 0.70,
            calories: 60,
            protein: '3g',
            image: '/marmita-tradicional.png',
            available: true
          },
          {
            id: 9,
            name: 'Molho Agridoce',
            description: 'Molho agridoce especial',
            price: 1.50,
            calories: 20,
            protein: '0g',
            image: '/marmita-fitness.png',
            available: true
          },
          {
            id: 10,
            name: 'Purê de Batata',
            description: 'Purê de batata cremoso',
            price: 0.50,
            calories: 90,
            protein: '2g',
            image: '/marmita-tradicional.png',
            available: true
          },
          {
            id: 11,
            name: 'Farofa de Manteiga',
            description: 'Farofa de manteiga temperada',
            price: 0.00,
            calories: 50,
            protein: '1g',
            image: '/marmita-tradicional.png',
            available: true
          }
        ]
      },
      {
        name: 'Bebidas',
        items: [
          {
            id: 12,
            name: 'Refrigerante',
            description: 'Refrigerante gelado',
            price: 4.50,
            calories: 140,
            protein: '0g',
            image: '/refrigerante.png',
            available: true
          },
          {
            id: 13,
            name: 'Suco Natural',
            description: 'Suco natural de frutas',
            price: 5.00,
            calories: 80,
            protein: '1g',
            image: '/suco-natural.png',
            available: true
          }
        ]
      }
    ]
  },

  // Benefícios/Diferenciais
  benefits: [
    {
      icon: '🍽️',
      title: 'Praticidade',
      description: 'Marmitas prontas e congeladas, basta aquecer e comer'
    },
    {
      icon: '🥗',
      title: 'Saúde',
      description: 'Ingredientes frescos e selecionados, sem conservantes'
    },
    {
      icon: '🚚',
      title: 'Entrega Rápida',
      description: 'Entrega em até 3 dias úteis'
    },
    {
      icon: '♻️',
      title: 'Zero Desperdício',
      description: 'Porções controladas e embalagens sustentáveis'
    }
  ],

  // Depoimentos
  testimonials: [
    {
      id: 1,
      name: 'Maria Silva',
      role: 'Personal Trainer',
      content: 'As marmitas da Zen são perfeitas para meus clientes! Práticas, saborosas e muito nutritivas.',
      rating: 5
    },
    {
      id: 2,
      name: 'João Santos',
      role: 'Executivo',
      content: 'Finalmente encontrei uma solução para comer bem durante a semana. As marmitas são deliciosas!',
      rating: 5
    },
    {
      id: 3,
      name: 'Ana Costa',
      role: 'Mãe de 2 filhos',
      content: 'Praticidade total! Meus filhos adoram e eu fico tranquila sabendo que estão comendo bem.',
      rating: 5
    }
  ],

  // SEO e Meta
  seo: {
    title: 'Zen Comidas - Marmitas Congeladas | Salvador, BA',
    description: 'Marmitas saudáveis, práticas e congeladas entregues na sua casa. Alimentação fitness de qualidade com ingredientes frescos e selecionados.',
    keywords: 'marmitas fitness, comida congelada, alimentação saudável, delivery, Salvador',
    ogImage: '/og-image.png',
    canonical: 'https://zencomidasfit.com.br'
  }
} as const;

// Tipos para TypeScript
export type InformationKey = keyof typeof INFORMATIONS;
