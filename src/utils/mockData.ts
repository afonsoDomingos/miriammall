export interface Space {
  id: string;
  number: string;
  buildingId: string;
  floor: number;
  area: number;
  status: 'disponivel' | 'reservado' | 'ocupado' | 'indisponivel' | 'em_preparacao' | 'em_construcao';
  price: string;
  description: string;
  spaceType: 'loja' | 'restaurante' | 'escritorio' | 'quarto' | 'armazem' | 'ferragem' | 'salao' | 'sala_reunioes' | 'refeitorio' | 'outro';
  amenities: string[];
  image: string;
  blueprint: string;
  conditions?: string;
}

export interface Building {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  order: number;
  floor1Images?: string[];
  floor2Images?: string[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'geral' | 'importante' | 'urgente' | 'lembrete';
  createdAt: string;
  updatedAt: string;
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

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  image: string;
  date: string;
  author: string;
}

export const initialSpaces: Space[] = [
  // EDIFÍCIO 1 — SHOPPING (Centro Comercial)
  // 1º Piso — Lojas e Padaria
  {
    id: 'space-shopping-1-1',
    number: 'Loja 1',
    buildingId: 'building-1',
    floor: 1,
    area: 123.21,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Loja comercial no 1º piso do edifício principal.',
    spaceType: 'loja',
    amenities: ['Montra envidraçada', 'Iluminação LED', 'Segurança 24h'],
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-1-2',
    number: 'Loja 2',
    buildingId: 'building-1',
    floor: 1,
    area: 30.00,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Loja comercial compacta no 1º piso.',
    spaceType: 'loja',
    amenities: ['Iluminação LED', 'Segurança 24h'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-1-3',
    number: 'Loja 3',
    buildingId: 'building-1',
    floor: 1,
    area: 30.00,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Loja comercial compacta no 1º piso.',
    spaceType: 'loja',
    amenities: ['Iluminação LED', 'Segurança 24h'],
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-1-4',
    number: 'Loja 4',
    buildingId: 'building-1',
    floor: 1,
    area: 30.00,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Loja comercial compacta no 1º piso.',
    spaceType: 'loja',
    amenities: ['Iluminação LED', 'Segurança 24h'],
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-1-5',
    number: 'Loja 5',
    buildingId: 'building-1',
    floor: 1,
    area: 41.40,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Loja comercial de tamanho médio no 1º piso.',
    spaceType: 'loja',
    amenities: ['Iluminação LED', 'Segurança 24h', 'Ar condicionado'],
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-1-6',
    number: 'Loja 6',
    buildingId: 'building-1',
    floor: 1,
    area: 50.85,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Loja comercial espaçosa no 1º piso.',
    spaceType: 'loja',
    amenities: ['Iluminação LED', 'Segurança 24h', 'Ar condicionado'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-1-7',
    number: 'Padaria',
    buildingId: 'building-1',
    floor: 1,
    area: 55.00,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Espaço para padaria no 1º piso.',
    spaceType: 'loja',
    amenities: ['Iluminação LED', 'Segurança 24h', 'Ar condicionado', 'Ventilação'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  // 2º Piso — Restaurante, Lojas e Áreas Administrativas
  {
    id: 'space-shopping-2-1',
    number: 'Restaurante',
    buildingId: 'building-1',
    floor: 2,
    area: 166.74,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Restaurante com balcão, cozinha e arrumos no 2º piso.',
    spaceType: 'restaurante',
    amenities: ['Cozinha equipada', 'Balcão', 'Ar condicionado', 'Ventilação', 'Segurança 24h'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-2-2',
    number: 'Loja 7',
    buildingId: 'building-1',
    floor: 2,
    area: 30.00,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Loja comercial no 2º piso.',
    spaceType: 'loja',
    amenities: ['Iluminação LED', 'Segurança 24h'],
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-2-3',
    number: 'Loja 8',
    buildingId: 'building-1',
    floor: 2,
    area: 30.00,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Loja comercial no 2º piso.',
    spaceType: 'loja',
    amenities: ['Iluminação LED', 'Segurança 24h'],
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-2-4',
    number: 'Loja 9',
    buildingId: 'building-1',
    floor: 2,
    area: 30.00,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Loja comercial no 2º piso.',
    spaceType: 'loja',
    amenities: ['Iluminação LED', 'Segurança 24h'],
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-2-5',
    number: 'Loja 10',
    buildingId: 'building-1',
    floor: 2,
    area: 29.04,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Loja comercial no 2º piso.',
    spaceType: 'loja',
    amenities: ['Iluminação LED', 'Segurança 24h'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-2-6',
    number: 'Sala de reuniões',
    buildingId: 'building-1',
    floor: 2,
    area: 50.85,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Sala de reuniões no 2º piso.',
    spaceType: 'sala_reunioes',
    amenities: ['Ar condicionado', 'Iluminação LED', 'Segurança 24h', 'Acesso à internet'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-shopping-2-7',
    number: 'Área staff e secretaria',
    buildingId: 'building-1',
    floor: 2,
    area: 0,
    status: 'em_preparacao',
    price: 'A confirmar',
    description: 'Área para staff e secretaria no 2º piso. Área a confirmar.',
    spaceType: 'outro',
    amenities: [],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  // 3º Piso — Em Construção
  {
    id: 'space-shopping-3-1',
    number: '3º Piso',
    buildingId: 'building-1',
    floor: 3,
    area: 0,
    status: 'em_construcao',
    price: 'A definir',
    description: '3º piso em construção. Espaços disponíveis brevemente.',
    spaceType: 'outro',
    amenities: [],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },

  // EDIFÍCIO 2 — HOSPEDAGEM
  // 1º Piso — Espaços Comerciais e de Serviços
  {
    id: 'space-hospedagem-1-1',
    number: 'Ferragem 1',
    buildingId: 'building-2',
    floor: 1,
    area: 27.00,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Espaço para ferragem no 1º piso do edifício de hospedagem.',
    spaceType: 'ferragem',
    amenities: ['Segurança 24h', 'Iluminação LED'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-1-2',
    number: 'Armazém 1',
    buildingId: 'building-2',
    floor: 1,
    area: 36.03,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Armazém no 1º piso do edifício de hospedagem.',
    spaceType: 'armazem',
    amenities: ['Segurança 24h', 'Iluminação LED', 'Pé-direito alto'],
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-1-3',
    number: 'Ferragem 2',
    buildingId: 'building-2',
    floor: 1,
    area: 23.01,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Espaço para ferragem no 1º piso do edifício de hospedagem.',
    spaceType: 'ferragem',
    amenities: ['Segurança 24h', 'Iluminação LED'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-1-4',
    number: 'Armazém 2',
    buildingId: 'building-2',
    floor: 1,
    area: 25.20,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Armazém no 1º piso do edifício de hospedagem.',
    spaceType: 'armazem',
    amenities: ['Segurança 24h', 'Iluminação LED', 'Pé-direito alto'],
    image: 'https://images.unsplash.com/photo-1565793979168-49fff08c85ab?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-1-5',
    number: 'Ferragem 3',
    buildingId: 'building-2',
    floor: 1,
    area: 24.06,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Espaço para ferragem no 1º piso do edifício de hospedagem.',
    spaceType: 'ferragem',
    amenities: ['Segurança 24h', 'Iluminação LED'],
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-1-6',
    number: 'Armazém 3',
    buildingId: 'building-2',
    floor: 1,
    area: 22.08,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Armazém no 1º piso do edifício de hospedagem.',
    spaceType: 'armazem',
    amenities: ['Segurança 24h', 'Iluminação LED', 'Pé-direito alto'],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-1-7',
    number: 'Salão de cabeleireiro',
    buildingId: 'building-2',
    floor: 1,
    area: 19.98,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Salão de cabeleireiro no 1º piso do edifício de hospedagem.',
    spaceType: 'salao',
    amenities: ['Iluminação LED', 'Segurança 24h', 'Ar condicionado'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-1-8',
    number: 'Salão de corte',
    buildingId: 'building-2',
    floor: 1,
    area: 15.53,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Salão de corte no 1º piso do edifício de hospedagem.',
    spaceType: 'salao',
    amenities: ['Iluminação LED', 'Segurança 24h', 'Ar condicionado'],
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  // 2º Piso — Escritório, Quartos e Refeitório
  {
    id: 'space-hospedagem-2-1',
    number: 'Escritório',
    buildingId: 'building-2',
    floor: 2,
    area: 40.10,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Escritório no 2º piso do edifício de hospedagem.',
    spaceType: 'escritorio',
    amenities: ['Ar condicionado', 'Iluminação LED', 'Segurança 24h', 'Acesso à internet'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-2-2',
    number: 'Quarto Suíte 1',
    buildingId: 'building-2',
    floor: 2,
    area: 21.83,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Quarto suíte no 2º piso do edifício de hospedagem.',
    spaceType: 'quarto',
    amenities: ['Ar condicionado', 'Iluminação LED', 'Segurança 24h', 'Casa de banho privativa'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-2-3',
    number: 'Quarto Suíte 2',
    buildingId: 'building-2',
    floor: 2,
    area: 21.83,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Quarto suíte no 2º piso do edifício de hospedagem.',
    spaceType: 'quarto',
    amenities: ['Ar condicionado', 'Iluminação LED', 'Segurança 24h', 'Casa de banho privativa'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-2-4',
    number: 'Quarto Suíte 3',
    buildingId: 'building-2',
    floor: 2,
    area: 21.83,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Quarto suíte no 2º piso do edifício de hospedagem.',
    spaceType: 'quarto',
    amenities: ['Ar condicionado', 'Iluminação LED', 'Segurança 24h', 'Casa de banho privativa'],
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-2-5',
    number: 'Quarto Suíte 4',
    buildingId: 'building-2',
    floor: 2,
    area: 21.83,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Quarto suíte no 2º piso do edifício de hospedagem.',
    spaceType: 'quarto',
    amenities: ['Ar condicionado', 'Iluminação LED', 'Segurança 24h', 'Casa de banho privativa'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-2-6',
    number: 'Quarto Suíte 5',
    buildingId: 'building-2',
    floor: 2,
    area: 21.83,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Quarto suíte no 2º piso do edifício de hospedagem.',
    spaceType: 'quarto',
    amenities: ['Ar condicionado', 'Iluminação LED', 'Segurança 24h', 'Casa de banho privativa'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-hospedagem-2-7',
    number: 'Refeitório',
    buildingId: 'building-2',
    floor: 2,
    area: 72.01,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Refeitório com arrumos, cozinha, balcão e área de serviços no 2º piso.',
    spaceType: 'refeitorio',
    amenities: ['Cozinha equipada', 'Balcão', 'Ar condicionado', 'Ventilação', 'Segurança 24h'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },

  // EDIFÍCIO 3 — BLOCO DE ARMAZÉNS
  // Único Piso
  {
    id: 'space-armazens-1-1',
    number: 'Armazém 1',
    buildingId: 'building-3',
    floor: 1,
    area: 32.68,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Armazém no bloco de armazéns.',
    spaceType: 'armazem',
    amenities: ['Segurança 24h', 'Iluminação LED', 'Pé-direito alto', 'Acesso facilitado'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-armazens-1-2',
    number: 'Armazém 2',
    buildingId: 'building-3',
    floor: 1,
    area: 32.68,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Armazém no bloco de armazéns.',
    spaceType: 'armazem',
    amenities: ['Segurança 24h', 'Iluminação LED', 'Pé-direito alto', 'Acesso facilitado'],
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-armazens-1-3',
    number: 'Armazém 3',
    buildingId: 'building-3',
    floor: 1,
    area: 25.08,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Armazém no bloco de armazéns.',
    spaceType: 'armazem',
    amenities: ['Segurança 24h', 'Iluminação LED', 'Pé-direito alto', 'Acesso facilitado'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-armazens-1-4',
    number: 'Armazém 4',
    buildingId: 'building-3',
    floor: 1,
    area: 41.42,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Armazém no bloco de armazéns.',
    spaceType: 'armazem',
    amenities: ['Segurança 24h', 'Iluminação LED', 'Pé-direito alto', 'Acesso facilitado'],
    image: 'https://images.unsplash.com/photo-1565793979168-49fff08c85ab?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  }
];
export const initialStores: Store[] = [];
export const initialRestaurants: Restaurant[] = [];
export const initialEvents: MallEvent[] = [];
export const initialPromotions: Promotion[] = [];
export const initialRentalRequests: RentalRequest[] = [];
export const initialBanners: Banner[] = [
  {
    id: 'banner-1',
    title: 'Shopping Miriam Mall',
    subtitle: 'A abrir em breve',
    image: 'https://res.cloudinary.com/dnvnftvky/image/upload/v1784284817/miriam_mall/ssakfoiyoj4sxvg26ce5.jpg',
    buttonText1: 'Apreciar',
    buttonLink1: '/sobre',
    buttonText2: 'Arrendar',
    buttonLink2: '/espacos',
    isActive: true
  }
];
export const initialBlogPosts: BlogPost[] = [];
export const initialBuildings: Building[] = [
  {
    id: 'building-1',
    name: 'Edifício Principal — Shopping',
    subtitle: 'Centro Comercial',
    description: 'Edifício principal do complexo destinado a lojas comerciais, restaurantes e serviços. 3 pisos com espaços variados para arrendamento.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
    features: ['Lojas comerciais', 'Restaurante', 'Áreas administrativas', '3 pisos'],
    order: 1,
    floor1Images: [],
    floor2Images: []
  },
  {
    id: 'building-2',
    name: 'Edifício de Hospedagem',
    subtitle: 'Serviços, Escritórios & Alojamento',
    description: 'Edifício multifuncional com espaços comerciais, escritórios, quartos e refeitório. Ideal para serviços e alojamento.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    features: ['Ferragens e armazéns', 'Escritórios', 'Quartos suíte', 'Refeitório'],
    order: 2,
    floor1Images: [],
    floor2Images: []
  },
  {
    id: 'building-3',
    name: 'Bloco de Armazéns',
    subtitle: 'Armazenamento Logístico',
    description: 'Bloco dedicado ao armazenamento com 4 espaços de diferentes dimensões. Estrutura reforçada para carga e descarga.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    features: ['4 armazéns', 'Pé-direito alto', 'Acesso facilitado', 'Segurança 24h'],
    order: 3,
    floor1Images: [],
    floor2Images: []
  }
];
export const initialNotes: Note[] = [];
