export type UserRole = 'admin' | 'reseller' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'pending' | 'rejected'; // New field
  phone?: string;
  referralCode?: string; // For resellers (their own code)
  usedReferralCode?: string; // Code they used to register
  walletBalance?: number; // For resellers
  uplineId?: string;
}

export type Kelvin = number & { readonly __brand: unique symbol };
export type BacteriaCount = number & { readonly __brand: unique symbol };

export interface MolecularComposition {
  protein_helix_integrity: number;
  lipid_oxidation_rate: number;
  water_crystal_lattice: 'CUBIC' | 'HEXAGONAL' | 'AMORPHOUS';
}

export interface Product {
  id: string;
  sku: string; // New
  name: string;
  category: string;
  description: string;
  price: number; // Harga ecer
  resellerPrice: number; // Harga reseller
  image: string;
  stock: number;
  weight: number; // in grams
  minOrder: number;

  // Scientific Data
  thermodynamics: {
    melting_point: Kelvin;
    specific_heat_capacity: number;
    thermal_conductivity: number;
  };
  bio_metrics: {
    initial_bacterial_load: BacteriaCount;
    spoilage_vector: number[];
  };
  composition: MolecularComposition;
  stock_tensor: number[][];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'packing' | 'shipping' | 'completed' | 'cancelled';
  date: string;
  shippingAddress: string;
  paymentMethod: string;
}

export const CATEGORIES = [
  "Semua",
  "Nugget & Tempura",
  "Bakso & Sosis",
  "Dimsum",
  "Cireng & Snack",
  "Daging Olahan"
];