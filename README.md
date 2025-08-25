# Zen Comidas Fit - Site de Marmitas Fitness

Um site moderno e responsivo para o negócio de marmitas fitness congeladas **Zen Comidas Fit**, desenvolvido com Next.js 14, Tailwind CSS v4 e TypeScript.

## 🍽️ Sobre o Projeto

O site foi desenvolvido com foco em conversão de vendas, apresentando um design oriental zen que transmite **praticidade, saúde e confiança**. O objetivo é facilitar o processo de pedidos das marmitas fitness congeladas.

### Características Principais

- ✅ **Design Oriental Zen** - Paleta de cores verde, branco e cinza claro
- ✅ **Layout Responsivo** - Otimizado para desktop e mobile
- ✅ **SEO Otimizado** - Meta tags, sitemap, robots.txt
- ✅ **Performance** - Next.js App Router, otimizações de imagem
- ✅ **Conversão** - CTAs estratégicos para WhatsApp e Goomer
- ✅ **Acessibilidade** - Semântica HTML e navegação por teclado
- ✅ **PWA Ready** - Manifest e configurações para Progressive Web App

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **Tailwind CSS v4** - Framework CSS utility-first
- **TypeScript** - Tipagem estática
- **React** - Biblioteca de interface
- **PostCSS** - Processamento CSS

## 📁 Estrutura do Projeto

```
zen-marmitas/
├── public/                 # Arquivos estáticos
│   ├── manifest.json      # PWA manifest
│   ├── robots.txt         # SEO robots
│   ├── sitemap.xml        # SEO sitemap
│   └── favicon.png        # Favicon
├── src/
│   ├── app/               # App Router (Next.js 14)
│   │   ├── globals.css    # Estilos globais
│   │   ├── layout.tsx     # Layout principal
│   │   └── page.tsx       # Página inicial
│   ├── components/        # Componentes React
│   │   ├── navbar/        # Navegação
│   │   ├── hero/          # Seção principal
│   │   ├── about/         # Sobre nós
│   │   ├── services/      # Cardápio
│   │   ├── contact/       # Contato
│   │   └── footer/        # Rodapé
│   └── config/            # Configurações
│       ├── colors.ts      # Paleta de cores
│       └── informations.ts # Dados do negócio
└── package.json           # Dependências
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/zen-marmitas.git
   cd zen-marmitas
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   # Google Maps API Key (opcional)
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_aqui
   
   # Meta Pixel ID (opcional)
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=seu_pixel_id
   
   # Google Analytics ID (opcional)
   NEXT_PUBLIC_GA_ID=seu_ga_id
   ```

4. **Execute o projeto em desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse o site**
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## ⚙️ Configurações

### Personalização de Dados

Edite o arquivo `src/config/informations.ts` para personalizar:

- **Dados da empresa** (nome, descrição, missão)
- **Informações de contato** (telefone, WhatsApp, email, endereço)
- **Cardápio** (produtos, preços, descrições)
- **Redes sociais** (Instagram, Facebook)
- **Links externos** (Goomer, outros)

### Personalização de Cores

Edite o arquivo `src/config/colors.ts` para ajustar a paleta de cores:

- Cores primárias (verde)
- Cores neutras (cinza)
- Cores de destaque
- Gradientes

### SEO e Meta Tags

As configurações de SEO estão no arquivo `src/app/layout.tsx`:

- Título da página
- Meta descrição
- Open Graph tags
- Twitter Cards
- Canonical URLs

## 📱 Seções do Site

### 1. **Navbar Fixa**
- Logo da empresa
- Links de navegação
- Botão CTA para WhatsApp

### 2. **Hero Section**
- Headline impactante
- Descrição do negócio
- CTAs principais (WhatsApp e Cardápio)
- Indicadores de confiança

### 3. **Sobre Nós**
- História da empresa
- Missão e visão
- Estatísticas
- Valores e diferenciais

### 4. **Cardápio**
- Categorias de produtos
- Cards com imagens, preços e descrições
- Botões para Goomer
- Informações nutricionais

### 5. **Contato**
- WhatsApp CTA destacado
- Informações de contato
- Google Maps embed
- Horário de funcionamento
- Redes sociais

### 6. **Footer**
- Informações da empresa
- Links rápidos
- CTAs para pedidos
- Copyright e links legais

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run start

# Linting
npm run lint

# Type checking
npm run type-check
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

O projeto é compatível com qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📊 Analytics e Tracking

### Meta Pixel (Facebook)

Para configurar o Meta Pixel:

1. Obtenha seu Pixel ID no Facebook Business Manager
2. Adicione no `.env.local`:
   ```env
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=seu_pixel_id
   ```
3. O pixel será carregado automaticamente

### Google Analytics

Para configurar o Google Analytics:

1. Crie uma propriedade no GA4
2. Adicione no `.env.local`:
   ```env
   NEXT_PUBLIC_GA_ID=seu_ga_id
   ```
3. O tracking será carregado automaticamente

### Google Maps

Para o mapa funcional:

1. Obtenha uma API Key no Google Cloud Console
2. Adicione no `.env.local`:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_aqui
   ```

## 🎨 Design System

### Cores Principais

- **Verde Primário**: `#22c55e` (green-500)
- **Verde Escuro**: `#16a34a` (green-600)
- **Verde Claro**: `#dcfce7` (green-100)
- **Cinza Neutro**: `#737373` (neutral-500)
- **Branco**: `#ffffff`

### Tipografia

- **Fonte Principal**: Geist Sans
- **Fonte Secundária**: Roboto
- **Fonte Monospace**: Geist Mono

### Componentes

Todos os componentes seguem o design system com:
- Bordas arredondadas
- Sombras suaves
- Gradientes sutis
- Animações fluidas
- Estados hover

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔍 SEO

### Otimizações Implementadas

- Meta tags completas
- Open Graph tags
- Twitter Cards
- Sitemap XML
- Robots.txt
- Schema markup
- URLs semânticas
- Imagens otimizadas

### Performance

- Lazy loading de imagens
- Preconnect para recursos externos
- Otimização de fontes
- Bundle splitting automático

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte ou dúvidas:

- **Email**: contato@zencomidasfit.com.br
- **WhatsApp**: +55 11 99999-9999
- **Instagram**: @zencomidasfit

---

**Desenvolvido com ❤️ para o Zen Comidas Fit**
