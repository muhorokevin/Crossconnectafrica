
export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  category: 'spiritual' | 'physical' | 'social' | 'leisure';
  description: string;
}

export interface GeneratedItinerary {
  title: string;
  items: ItineraryItem[];
  theme: string;
  estimatedCost: number;
}

export type ClientType = 'school' | 'corporate';

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  basePrice: number;
  features: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO date
  month: string; // Display Month
  location: string;
  price: number;
  seatsAvailable: number;
  image: string;
  description: string;
  gift: string; // The "Free" gift
  includes: string[];
  addons: { name: string; price: number }[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  valueProp: string;
  image: string;
  isBundle?: boolean;
  impactLabel?: string; // e.g., "Supports Children's Home Outreach"
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum ViewState {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  ADVENTURE_BUILDER = 'ADVENTURE_BUILDER',
  CALCULATOR = 'CALCULATOR',
  EVENTS = 'EVENTS',
  SHOP = 'SHOP',
  CONTACT = 'CONTACT',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  TERMS_OF_SERVICE = 'TERMS_OF_SERVICE',
  LIABILITY_WAIVER = 'LIABILITY_WAIVER'
}
