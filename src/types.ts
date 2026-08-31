export interface FlavorOption {
  id: string;
  name: string;
  colorHex: string;
  accentHex: string;
  bgGradient: string;
  description: string;
  tasteNotes: string[];
  inStock: boolean;
}

export interface WeightOption {
  size: string; // e.g. "1.0 kg (2.2 lbs)", "2.0 kg (4.4 lbs)"
  servings: number;
  priceMultiplier: number;
  badge?: string;
}

export interface NutritionalFact {
  label: string;
  amount: string;
  dailyValue?: string;
  highlight?: boolean;
}

export interface AminoProfile {
  name: string;
  amountPerServing: string; // e.g. "3.1g"
  percentage: number;
  category: 'BCAA' | 'EAA' | 'Non-Essential';
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'isolate' | 'concentrate' | 'plant' | 'casein' | 'clear' | 'mass' | 'creatine';
  categoryLabel: string;
  badge?: string;
  basePrice: number; // In INR ₹
  originalPrice?: number; // In INR ₹
  rating: number;
  reviewCount: number;
  
  // Hero macros
  proteinGrams: number;
  bcaaGrams: number;
  eaasGrams?: number;
  calorieCount: number;
  sugarGrams: number;
  fatGrams: number;
  carbsGrams: number;
  scoopSizeGrams: number;

  // Media
  pinterestImages: string[];
  description: string;
  fullStory: string;
  certifications: string[];
  dietaryTags: string[]; // e.g. "100% Isolate", "Gluten-Free", "Zero Added Sugar", "100% Vegetarian"
  isVeg: boolean;

  // Options
  flavors: FlavorOption[];
  weights: WeightOption[];
  nutritionTable: NutritionalFact[];
  aminoProfile: AminoProfile[];

  // Features
  keyFeatures: {
    title: string;
    desc: string;
    icon: string;
  }[];
}

export interface CartItem {
  id: string; // unique item cart ID (productId + flavorId + weightSize)
  product: Product;
  selectedFlavor: FlavorOption;
  selectedWeight: WeightOption;
  quantity: number;
  unitPrice: number;
  isSubscription?: boolean;
}

export type ActiveFilterCategory = 'all' | 'isolate' | 'concentrate' | 'plant' | 'casein' | 'clear' | 'mass' | 'creatine';
