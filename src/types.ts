export type ServiceMode = 'food' | 'instamart' | 'dineout' | 'scenes' | 'multicart_hub';

export type FoodType = 'all' | 'veg' | 'non-veg';

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isSpicy?: boolean;
  category: string;
  rating: number;
  votes: number;
  customizations?: {
    name: string;
    options: { name: string; price: number }[];
  }[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  ratingCount: string;
  deliveryTimeMinutes: number;
  distanceKm: number;
  priceForTwo: number;
  image: string;
  address: string;
  area: string;
  featuredOffer?: string;
  isPureVeg?: boolean;
  isSwiggyOneExclusive?: boolean;
  categories: string[];
  menu: MenuItem[];
}

export interface CartItem {
  id: string; // unique item id + options
  menuItemId: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  selectedOptions?: { name: string; price: number }[];
  specialInstruction?: string;
}

export interface InstamartProduct {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  image: string;
  category: string;
  inStock: boolean;
  rating: number;
}

export interface DineoutVenue {
  id: string;
  name: string;
  cuisine: string;
  area: string;
  rating: number;
  reviewsCount: number;
  costForTwo: number;
  offer: string;
  image: string;
  timings: string;
  features: string[];
}

export interface SceneEvent {
  id: string;
  title: string;
  tagline: string;
  date: string;
  time: string;
  location: string;
  price: number;
  image: string;
  category: 'Food Walk' | 'Masterclass' | 'Tasting' | 'Music & Food' | 'Brewery Tour';
  organizer: string;
  spotsLeft: number;
  description: string;
}

export type OrderStatus = 'placed' | 'confirmed' | 'cooking' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  createdAt: number;
  cancellationDeadline: number; // 120s from createdAt
  status: OrderStatus;
  items: CartItem[];
  restaurantBreakdown: {
    restaurantId: string;
    restaurantName: string;
    subtotal: number;
    itemsCount: number;
    prepTime: number;
  }[];
  deliveryAddress: {
    title: string;
    address: string;
    receiverName: string;
    receiverPhone: string;
  };
  pricing: {
    itemsSubtotal: number;
    deliveryFee: number;
    platformFee: number;
    taxes: number;
    couponDiscount: number;
    deliveryTip: number;
    totalAmount: number;
  };
  appliedCoupon?: string;
  paymentMethod: 'UPI / GPay' | 'Credit/Debit Card' | 'Swiggy Money' | 'Cash on Delivery';
  paymentStatus: 'paid' | 'refunded' | 'pending';
  rider: {
    name: string;
    phone: string;
    rating: number;
    photo: string;
    vehicleNumber: string;
    currentLat: number;
    currentLng: number;
  };
  deliveryEtaMinutes: number;
  cancellationReason?: string;
  refundProcessed?: boolean;
}

export interface SupportChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  quickReplies?: string[];
  actionType?: 'cancel_order' | 'call_rider' | 'refund_info' | 'connect_human';
}
