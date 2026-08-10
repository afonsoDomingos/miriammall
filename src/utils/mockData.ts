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

export interface Building {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  order: number;
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

export const initialSpaces: Space[] = [];
export const initialStores: Store[] = [];
export const initialRestaurants: Restaurant[] = [];
export const initialEvents: MallEvent[] = [];
export const initialPromotions: Promotion[] = [];
export const initialRentalRequests: RentalRequest[] = [];
export const initialBanners: Banner[] = [];
export const initialBlogPosts: BlogPost[] = [];
export const initialBuildings: Building[] = [];
export const initialNotes: Note[] = [];
