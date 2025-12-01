export type UserRole = 'admin' | 'reseller' | 'customer';

export interface ResellerTier {
  level: 'pemula' | 'silver' | 'gold';
  minSpending: number;
  discountPercentage: number;
}

export interface CommissionLog {
  id: string;
  sourceUserId: string; // Downline yang belanja
  sourceOrderIds: string;
  amount: number;
  type: 'referral_bonus' | 'sales_commission' | 'target_reward';
  level: 1 | 2; // Level kedalaman downline
  date: string;
  status: 'pending' | 'available' | 'withdrawn';
}

export interface ResellerTarget {
  currentSpending: number;
  targetAmount: number;
  rewardName: string; // e.g., "Freezer 100L"
  deadline: string;
}

export interface DownlineNode {
  id: string;
  name: string;
  joinDate: string;
  totalSales: number;
  level: 1 | 2;
  commissionGenerated: number;
  children?: DownlineNode[]; // Struktur Rekursif untuk Tree View
}

export interface PromoMaterial {
  id: string;
  title: string;
  type: 'image' | 'video' | 'copywriting';
  url: string;
  thumbnail: string;
}

export interface DashboardStat {
  label: string;
  value: string | number;
  change?: number; // Persentase kenaikan/penurunan
  icon: 'dollar' | 'cart' | 'users' | 'box';
  color: string;
}

export interface ActivityLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details?: string;
}

// --- MEMBER SYSTEM TYPES ---

export interface Address {
  id: string;
  label: 'Rumah' | 'Kantor' | 'Toko' | 'Gudang';
  recipientName: string;
  phone: string;
  fullAddress: string;
  city: string;
  province: string;
  zipCode: string;
  isPrimary: boolean;
  coordinates?: { lat: number; lng: number }; // For geospatial features
}

export interface Review {
  id: string;
  productId: string;
  orderId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  images?: string[];
  createdAt: string;
  isEditable: boolean; // True if within 7 days
}

export interface RewardTransaction {
  id: string;
  type: 'earn' | 'redeem' | 'expire' | 'adjustment';
  amount: number;
  description: string;
  date: string;
  balanceAfter: number;
}

export interface MemberTier {
  name: 'Regular' | 'Prioritas' | 'VIP';
  minSpending: number;
  benefits: string[];
  nextTierProgress: number; // 0-100
}

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

  // Enterprise Fields
  tier?: 'pemula' | 'silver' | 'gold';
  joinDate?: string;
  totalSpent?: number;

  // Member Fields
  addresses?: Address[];
  wishlist?: string[]; // Product IDs
  rewardPoints?: number;
  memberTier?: MemberTier;
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

// --- LOYALTY SYSTEM TYPES ---

export type RewardType = 'voucher_discount' | 'voucher_shipping' | 'product' | 'physical_item';

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  type: RewardType;
  value?: number; // Nilai rupiah (untuk voucher)
  stock: number; // Untuk hadiah fisik
  image: string;
  isActive: boolean;
  minTier?: 'regular' | 'silver' | 'gold' | 'platinum'; // Syarat tier
}

export interface PointTransaction {
  id: string;
  userId: string;
  type: 'earn' | 'redeem' | 'expire' | 'adjustment' | 'bonus';
  amount: number; // Positif untuk earn, negatif untuk redeem
  description: string;
  date: string; // ISO String
  referenceId?: string; // Order ID atau Referral User ID
  expiryDate?: string; // Kapan poin ini hangus (khusus earn)
}

export interface LoyaltyRule {
  earnRate: number; // Poin per 100.000
  registrationBonus: number;
  reviewBonus: number;
  referralBonus: number;
  birthdayBonus: number;
  pointExpiryMonths: number;
  isDoublePointActive: boolean; // Flash Event Switch
}