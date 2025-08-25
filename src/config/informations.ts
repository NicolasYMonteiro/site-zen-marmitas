// 📋 Configuração centralizada de informações
// Dados da profissional e conteúdo do site

export const INFORMATIONS = {
  // Informações da empresa
  company: {
    name: 'Zen Comidas Fit',
    tagline: 'Marmitas saudáveis, práticas e congeladas entregues na sua casa',
    description: 'Especialistas em alimentação saudável e prática, oferecendo marmitas fitness congeladas de alta qualidade, preparadas com ingredientes frescos e selecionados.',
    founded: '2023',
    mission: 'Promover saúde e bem-estar através de refeições práticas, nutritivas e deliciosas.',
    vision: 'Ser referência em alimentação fitness congelada, facilitando a vida de quem busca uma alimentação saudável sem abrir mão da praticidade.',
  },

  // Dados de contato
  contact: {
    phone: '+55 11 99999-9999',
    whatsapp: '+5511999999999',
    email: 'contato@zencomidasfit.com.br',
    instagram: '@zencomidasfit',
    instagramUrl: 'https://www.instagram.com/zencomidasfit',
    address: {
      street: 'Rua das Flores, 123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      cep: '01234-567',
      full: 'Rua das Flores, 123 - Centro, São Paulo - SP, 01234-567'
    },
    hours: {
      weekdays: 'Segunda a Sexta: 8h às 18h',
      weekends: 'Sábado: 8h às 14h',
      sunday: 'Domingo: Fechado'
    }
  },

  // Links externos
  links: {
    goomer: 'https://www.goomer.app/zencomidasfit',
    facebook: 'https://www.facebook.com/zencomidasfit',
    tiktok: 'https://www.tiktok.com/@zencomidasfit',
    website: 'https://zencomidasfit.com.br'
  },

  // Cardápio
  menu: {
    categories: [
      {
        name: 'Marmitas Fitness',
        items: [
          {
            id: 1,
            name: 'Frango Grelhado com Quinoa',
            description: 'Peito de frango grelhado, quinoa, brócolis e cenoura',
            price: 18.90,
            calories: 320,
            protein: '28g',
            image: '/menu/frango-quinoa.jpg',
            available: true
          },
          {
            id: 2,
            name: 'Salmão com Batata Doce',
            description: 'Salmão grelhado, batata doce, aspargos e arroz integral',
            price: 24.90,
            calories: 380,
            protein: '32g',
            image: '/menu/salmao-batata.jpg',
            available: true
          },
          {
            id: 3,
            name: 'Carne Magra com Abóbora',
            description: 'Carne bovina magra, abóbora, couve-flor e arroz integral',
            price: 22.90,
            calories: 350,
            protein: '30g',
            image: '/menu/carne-abobora.jpg',
            available: true
          },
          {
            id: 4,
            name: 'Frango Teriyaki',
            description: 'Frango em molho teriyaki, arroz integral e legumes',
            price: 20.90,
            calories: 340,
            protein: '26g',
            image: '/menu/frango-teriyaki.jpg',
            available: true
          }
        ]
      },
      {
        name: 'Marmitas Vegetarianas',
        items: [
          {
            id: 5,
            name: 'Quinoa com Legumes',
            description: 'Quinoa, brócolis, cenoura, abobrinha e molho de ervas',
            price: 16.90,
            calories: 280,
            protein: '12g',
            image: '/menu/quinoa-legumes.jpg',
            available: true
          },
          {
            id: 6,
            name: 'Lentilha com Arroz Integral',
            description: 'Lentilha, arroz integral, espinafre e tomate',
            price: 15.90,
            calories: 260,
            protein: '14g',
            image: '/menu/lentilha-arroz.jpg',
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
      description: 'Entrega em até 2 horas na sua região'
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
    title: 'Zen Comidas Fit - Marmitas Fitness Congeladas | São Paulo',
    description: 'Marmitas saudáveis, práticas e congeladas entregues na sua casa. Alimentação fitness de qualidade com ingredientes frescos e selecionados.',
    keywords: 'marmitas fitness, comida congelada, alimentação saudável, delivery, São Paulo',
    ogImage: '/og-image.png',
    canonical: 'https://zencomidasfit.com.br'
  }
} as const;

// Tipos para TypeScript
export type InformationKey = keyof typeof INFORMATIONS;
