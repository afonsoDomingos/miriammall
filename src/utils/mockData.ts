export interface Space {
  id: string;
  number: string;
  floor: number;
  area: number;
  status: 'disponivel' | 'reservado' | 'ocupado';
  price: string;
  description: string;
  amenities: string[];
  image: string;
  blueprint: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText1: string;
  buttonLink1: string;
  buttonText2: string;
  buttonLink2: string;
  isActive: boolean;
}


export interface Store {
  id: string;
  name: string;
  logo: string;
  category: string;
  floor: number;
  schedule: string;
  description: string;
  contact: string;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  schedule: string;
  image: string;
  menuLink: string;
  menuItems: { name: string; price: string; description?: string }[];
}

export interface MallEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  image: string;
}

export interface Promotion {
  id: string;
  title: string;
  validity: string;
  description: string;
  storeName: string;
  image: string;
}

export interface RentalRequest {
  id: string;
  date: string;
  companyName: string;
  contactName: string;
  phone: string;
  whatsapp: string;
  email: string;
  businessType: string;
  requestedArea: string;
  message: string;
  status: 'novo' | 'respondido' | 'arquivado';
}

export const initialSpaces: Space[] = [
  {
    id: 'space-101',
    number: 'Loja 101',
    floor: 0,
    area: 45,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Espaço comercial moderno no piso térreo, ideal para boutiques, farmácias ou escritórios de atendimento ao público. Excelente visibilidade frontal.',
    amenities: ['Água corrente', 'Climatização pré-instalada', 'Segurança 24h', 'Instalação elétrica trifásica'],
    image: 'https://images.unsplash.com/photo-1567401893930-7cb7138e319d?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/floor0-101.png'
  },
  {
    id: 'space-102',
    number: 'Loja 102',
    floor: 0,
    area: 60,
    status: 'ocupado',
    price: 'Sob Consulta',
    description: 'Espaço ocupado pela Vodacom. Excelente ponto de assistência técnica e vendas no piso 0.',
    amenities: ['Banda larga fibra', 'Climatização', 'Segurança 24h', 'Montra em vidro duplo'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/floor0-102.png'
  },
  {
    id: 'space-103',
    number: 'Loja 103',
    floor: 0,
    area: 150,
    status: 'ocupado',
    price: 'Sob Consulta',
    description: 'Espaço âncora ocupado pelo Supermercado Recheio. Grande fluxo de circulação diária.',
    amenities: ['Carga/Descarga independente', 'Armazém interno', 'Sistema anti-incêndio', 'Câmara de frio pré-instalada'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/floor0-103.png'
  },
  {
    id: 'space-104',
    number: 'Loja 104',
    floor: 0,
    area: 55,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Espaço amplo com pé-direito alto próximo à entrada principal do Mirriam Mall. Perfeito para sapatarias ou lojas de cosméticos.',
    amenities: ['Segurança 24h', 'Ar condicionado instalado', 'Luzes LED embutidas'],
    image: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/floor0-104.png'
  },
  {
    id: 'space-105',
    number: 'Loja 105',
    floor: 0,
    area: 40,
    status: 'reservado',
    price: 'Sob Consulta',
    description: 'Espaço sob reserva de locação. Excelente localização junto aos terminais bancários.',
    amenities: ['Segurança 24h', 'Sensores de fumo', 'Piso cerâmico premium'],
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/floor0-105.png'
  },
  {
    id: 'space-201',
    number: 'Loja 201',
    floor: 1,
    area: 75,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Excelente espaço no primeiro andar, perto da praça de alimentação. Indicado para lojas de vestuário, salão de cabeleireiro de luxo ou tecnologia.',
    amenities: ['Segurança 24h', 'Acesso por escadas rolantes e elevador', 'Pontos de água integrados'],
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/floor1-201.png'
  },
  {
    id: 'space-202',
    number: 'Loja 202',
    floor: 1,
    area: 90,
    status: 'reservado',
    price: 'Sob Consulta',
    description: 'Espaço amplo com iluminação natural abundante. Ideal para agências de serviços ou clínicas privadas.',
    amenities: ['Divisórias flexíveis', 'Climatização central', 'Janelas amplas'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/floor1-202.png'
  },
  {
    id: 'space-203',
    number: 'Loja 203',
    floor: 1,
    area: 120,
    status: 'ocupado',
    price: 'Sob Consulta',
    description: 'Espaço ocupado pelo restaurante Sabores de Inhambane. Vista deslumbrante para a praça principal.',
    amenities: ['Extração de fumos industrial', 'Gás canalizado', 'Cozinha equipada', 'Esplanada privativa'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/floor1-203.png'
  },
  {
    id: 'space-204',
    number: 'Loja 204',
    floor: 1,
    area: 65,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Espaço no primeiro andar com layout em open-space. Excelente opção para papelarias ou lojas de desporto.',
    amenities: ['Luminárias instaladas', 'Tomadas elétricas abundantes', 'Segurança 24h'],
    image: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/floor1-204.png'
  }
];

export const initialStores: Store[] = [
  {
    id: 'store-pep',
    name: 'PEP Moçambique',
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=150&h=150&q=80',
    category: 'Moda',
    floor: 0,
    schedule: '09:00 - 18:30',
    description: 'Líder em vestuário de baixo custo, calçado, artigos para o lar e tecnologia acessível para toda a família.',
    contact: '+258 84 123 4567'
  },
  {
    id: 'store-vodacom',
    name: 'Vodacom Homoíne',
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=150&h=150&q=80',
    category: 'Tecnologia',
    floor: 0,
    schedule: '08:30 - 17:30',
    description: 'A maior rede móvel de Moçambique. Adquira smartphones, planos de dados, efetue depósitos M-Pesa e tenha suporte ao cliente.',
    contact: '+258 84 900 1111'
  },
  {
    id: 'store-recheio',
    name: 'Supermercado Recheio',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&h=150&q=80',
    category: 'Alimentação',
    floor: 0,
    schedule: '08:00 - 21:00',
    description: 'Frescos todos os dias, mercearia fina, padaria e talho próprio. A sua melhor opção de compras diárias em Homoíne.',
    contact: '+258 82 456 7890'
  },
  {
    id: 'store-bci',
    name: 'BCI - Banco Comercial e de Investimentos',
    logo: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=150&h=150&q=80',
    category: 'Bancos',
    floor: 0,
    schedule: '08:00 - 15:30',
    description: 'Serviços financeiros completos, abertura de contas, crédito, depósitos e caixas eletrónicas 24h.',
    contact: '+258 21 000 0000'
  },
  {
    id: 'store-farmacia-central',
    name: 'Farmácia Central de Homoíne',
    logo: 'https://images.unsplash.com/photo-1607619056574-7b8d304f3b24?auto=format&fit=crop&w=150&h=150&q=80',
    category: 'Farmácia',
    floor: 0,
    schedule: '08:00 - 20:00',
    description: 'Medicamentos essenciais, suplementos, cosméticos e aconselhamento farmacêutico qualificado.',
    contact: '+258 84 777 8888'
  },
  {
    id: 'store-standard-bank',
    name: 'Standard Bank Moçambique',
    logo: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=150&h=150&q=80',
    category: 'Bancos',
    floor: 0,
    schedule: '08:00 - 15:30',
    description: 'Conectando o seu negócio ao mundo. Serviços financeiros corporativos e pessoais com excelência.',
    contact: '+258 21 345 678'
  },
  {
    id: 'store-beleza-real',
    name: 'Salão Beleza Real',
    logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=150&h=150&q=80',
    category: 'Beleza',
    floor: 1,
    schedule: '09:00 - 19:00',
    description: 'Corte de cabelo unissexo, manicure, pedicure, maquilhagem profissional e tratamentos estéticos premium.',
    contact: '+258 87 222 3333'
  },
  {
    id: 'store-kids-world',
    name: 'Kids World',
    logo: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=150&h=150&q=80',
    category: 'Crianças',
    floor: 1,
    schedule: '09:00 - 19:00',
    description: 'Brinquedos educativos, roupas de bebé e criança e acessórios para o bem-estar dos mais pequenos.',
    contact: '+258 84 333 4444'
  }
];

export const initialRestaurants: Restaurant[] = [
  {
    id: 'rest-cafe-homoine',
    name: 'Café Homoíne',
    category: 'Cafetaria',
    schedule: '07:30 - 20:00',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
    menuLink: '#',
    menuItems: [
      { name: 'Café Expresso', price: '60 MT', description: 'Café torrado local de alta qualidade.' },
      { name: 'Pastel de Nata', price: '80 MT', description: 'Pastelaria tradicional portuguesa, fresca e estaladiça.' },
      { name: 'Samosa de Carne/Frango', price: '70 MT', description: 'Tradicional chamuça recheada de especiarias locais (unidade).' },
      { name: 'Tosta Mista Especial', price: '200 MT', description: 'Tosta em pão rústico com fiambre, queijo e manteiga de alho.' }
    ]
  },
  {
    id: 'rest-sabores-inhambane',
    name: 'Sabores de Inhambane',
    category: 'Mariscos & Grelhados',
    schedule: '11:30 - 22:00',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    menuLink: '#',
    menuItems: [
      { name: 'Matapa com Caranguejo', price: '450 MT', description: 'Prato típico moçambicano feito com folhas de mandioca, leite de coco, amendoim e caranguejo fresco, acompanhado de arroz.' },
      { name: 'Camarão Grelhado à Inhambane', price: '850 MT', description: 'Camarões nacionais grandes com molho de limão e piripíri, batata frita e salada.' },
      { name: 'Peixe do Dia na Grelha', price: '650 MT', description: 'Peixe fresco capturado na costa de Inhambane, grelhado no carvão com vegetais.' },
      { name: 'Caril de Lulas', price: '500 MT', description: 'Lulas tenras em molho de caril de coco rico e aromático.' }
    ]
  },
  {
    id: 'rest-pizza-burguer',
    name: 'Pizza & Burguer Mall',
    category: 'Fast Food',
    schedule: '10:00 - 22:00',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    menuLink: '#',
    menuItems: [
      { name: 'Pizza Mirriam Especial', price: '550 MT', description: 'Molho de tomate caseiro, queijo mozzarella, bacon crocante, cogumelos e azeitonas.' },
      { name: 'Hambúrguer Gourmet Double', price: '400 MT', description: 'Duas carnes de novilho 120g, queijo cheddar derretido, alface, tomate e molho da casa, em pão brioche.' },
      { name: 'Combo Asas de Frango Picantes', price: '380 MT', description: '8 asas de frango marinadas em molho picante com batata frita e bebida.' }
    ]
  }
];

export const initialEvents: MallEvent[] = [
  {
    id: 'event-1',
    title: 'Grande Abertura do Mirriam Mall',
    date: '10 de Outubro de 2026',
    description: 'A inauguração oficial do shopping que trará uma nova era comercial a Homoíne. Concerto ao vivo de artistas moçambicanos consagrados, atividades infantis e super descontos em todas as lojas.',
    location: 'Praça Central do Shopping',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'event-2',
    title: 'Feira Gastronómica e Artesanato de Inhambane',
    date: '15 de Novembro de 2026',
    description: 'Uma mostra rica da cultura e sabores locais da província. Pratos de peixe, mariscos, doces tradicionais e artesanato em madeira e palha produzido por artistas locais.',
    location: 'Parque de Estacionamento Exterior e Praça de Alimentação',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'event-3',
    title: 'Natal Solidário e Festa de Crianças',
    date: '19 de Dezembro de 2026',
    description: 'Chegada do Pai Natal com distribuição de brindes, pinturas faciais, insufláveis e coral natalício ao vivo para celebrar a quadra festiva com a família.',
    location: 'Piso 1 - Área Kids World',
    image: 'https://images.unsplash.com/photo-1544928147-79a2bec1638f?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialPromotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Super Saldos de Inauguração Vodacom',
    validity: 'Válido de 10 a 20 de Outubro de 2026',
    description: '15% de desconto direto na compra de smartphones da marca Vodafone/Xiaomi. Visite a nossa nova loja e ative a sua oferta.',
    storeName: 'Vodacom Homoíne',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'promo-2',
    title: 'Menu Executivo Sabores de Inhambane',
    validity: 'Disponível de Segunda a Sexta, das 12:00 às 15:00',
    description: 'Delicioso prato de Matapa com Caranguejo ou Peixe Grelhado + sumo natural + café por apenas 500 MT.',
    storeName: 'Sabores de Inhambane',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'promo-3',
    title: 'Campanha Poupança Recheio',
    validity: 'Válido todas as Quartas-Feiras do mês de Outubro',
    description: 'Descontos de até 20% em artigos básicos de mercearia como arroz, óleo, farinha e açúcar.',
    storeName: 'Supermercado Recheio',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialRentalRequests: RentalRequest[] = [
  {
    id: 'req-1',
    date: '2026-07-09T14:30:00Z',
    companyName: 'Moda Jovem Lda',
    contactName: 'Albertina Mondlane',
    phone: '+258 84 222 5555',
    whatsapp: '+258 84 222 5555',
    email: 'albertina@modajovem.co.mz',
    businessType: 'Moda / Vestuário',
    requestedArea: 'Loja 201 (75m²)',
    message: 'Gostaria de agendar uma visita para ver as condições do espaço. Pretendo abrir uma boutique de vestuário feminino.',
    status: 'novo'
  },
  {
    id: 'req-2',
    date: '2026-07-08T09:15:00Z',
    companyName: 'Moçambique Celular (MCEL)',
    contactName: 'Carlos Tembe',
    phone: '+258 82 333 7777',
    whatsapp: '+258 82 333 7777',
    email: 'carlos.tembe@tmcel.mz',
    businessType: 'Tecnologia',
    requestedArea: 'Loja 101 (45m²)',
    message: 'Pretendemos instalar uma nova loja de atendimento Tmcel no Homoíne. Solicitamos as condições financeiras para o arrendamento da loja 101.',
    status: 'respondido'
  }
];

export const initialBanners: Banner[] = [
  {
    id: 'banner-1',
    title: 'Mirriam Mall',
    subtitle: 'O novo destino de compras, negócios, lazer e investimento no Distrito de Homoíne.',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80',
    buttonText1: 'Explorar o Shopping',
    buttonLink1: '/lojas',
    buttonText2: 'Arrendar um Espaço',
    buttonLink2: '/espacos',
    isActive: true
  }
];
