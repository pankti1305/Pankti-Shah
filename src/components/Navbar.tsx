import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  ShoppingBag, 
  User, 
  Headphones, 
  Clock, 
  Sparkles, 
  UtensilsCrossed, 
  Store, 
  Compass, 
  Layers,
  ChevronDown,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { ServiceMode, CartItem, Order } from '../types';

interface NavbarProps {
  activeService: ServiceMode;
  onSelectService: (service: ServiceMode) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenSupport: () => void;
  onOpenProfile: () => void;
  activeOrders: Order[];
  onSelectActiveOrder: (order: Order) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  pureVegOnly: boolean;
  onTogglePureVeg: () => void;
  selectedAddress: string;
  onOpenAddressSelector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeService,
  onSelectService,
  cartItems,
  onOpenCart,
  onOpenSupport,
  onOpenProfile,
  activeOrders,
  onSelectActiveOrder,
  searchQuery,
  onSearchChange,
  pureVegOnly,
  onTogglePureVeg,
  selectedAddress,
  onOpenAddressSelector
}) => {
  // Count unique restaurants in cart
  const uniqueRestaurants = Array.from(new Set(cartItems.map(i => i.restaurantName)));
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const liveOrder = activeOrders.find(o => o.status !== 'delivered' && o.status !== 'cancelled');

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#1A1A1A] shadow-xs transition-all">
      {/* Top Banner / Bento Announcement */}
      <div className="bg-[#1A1A1A] text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-[#1A1A1A]">
        <span className="w-2 h-2 rounded-full bg-[#E0FF4F] animate-ping" />
        <span className="font-bold text-[#E0FF4F] uppercase tracking-wider text-[11px]">Bento Release:</span>
        <span className="text-gray-200">Multi-Restaurant Cart is live! Order from multiple spots in 1 checkout + 120s Grace Period.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Location */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              id="swiggy-brand-logo"
              onClick={() => onSelectService('food')}
              className="flex items-center gap-2.5 group cursor-pointer focus:outline-hidden"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#FC8019] border border-[#1A1A1A] flex items-center justify-center shadow-xs group-hover:bg-[#1A1A1A] transition-all">
                <svg className="w-5 h-5 text-white group-hover:text-[#E0FF4F] transition-colors" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 15 C32 15 22 28 22 42 C22 62 48 78 50 88 C52 78 78 62 78 42 C78 28 68 15 50 15 Z" fill="currentColor"/>
                  <path d="M44 38 C44 33 56 33 56 38 C56 46 42 46 42 54 C42 60 58 60 58 54" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none"/>
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-black text-xl tracking-tighter text-[#1A1A1A] uppercase leading-none">SWIGGY</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Multi-Cart BENTO</span>
              </div>
            </button>

            {/* Address Selector */}
            <button
              id="location-picker-btn"
              onClick={onOpenAddressSelector}
              className="hidden md:flex items-center gap-2 text-left px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors border border-[#1A1A1A]/20 hover:border-[#1A1A1A] cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#E0FF4F]">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="max-w-[180px] text-xs">
                <div className="font-bold text-[#1A1A1A] flex items-center gap-1">
                  <span>Home</span>
                  <ChevronDown className="w-3 h-3 text-gray-700" />
                </div>
                <p className="text-gray-500 truncate text-[11px]">{selectedAddress}</p>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search Biryani, Burgers, Desserts, Milk, Pizza..."
                className="w-full pl-10 pr-10 py-2 text-xs font-medium bg-[#F3F4F1] border border-[#1A1A1A] rounded-full focus:bg-white focus:ring-2 focus:ring-[#1A1A1A] focus:outline-hidden transition-all placeholder:text-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-black px-1"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Active Order Indicator */}
            {liveOrder && (
              <button
                id="live-order-tracker-btn"
                onClick={() => onSelectActiveOrder(liveOrder)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1A1A1A] text-[#E0FF4F] border border-[#1A1A1A] rounded-full text-xs font-bold hover:bg-black transition-all cursor-pointer shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#E0FF4F] animate-ping" />
                <Clock className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Track Live ({liveOrder.deliveryEtaMinutes}m)</span>
                <span className="md:hidden">Track ({liveOrder.deliveryEtaMinutes}m)</span>
              </button>
            )}

            {/* Pure Veg Toggle */}
            <button
              id="veg-mode-toggle"
              onClick={onTogglePureVeg}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-[#1A1A1A] transition-colors cursor-pointer ${
                pureVegOnly
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-[#1A1A1A] hover:bg-emerald-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${pureVegOnly ? 'bg-white' : 'bg-emerald-600'}`} />
              <span className="uppercase text-[11px] tracking-wider">Veg</span>
            </button>

            {/* Direct Human Support Button */}
            <button
              id="nav-support-btn"
              onClick={onOpenSupport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#1A1A1A] hover:bg-[#F3F4F1] border border-transparent hover:border-[#1A1A1A] rounded-full transition-colors cursor-pointer"
              title="Fast Support & 1-Tap Human Agent Escalation"
            >
              <Headphones className="w-4 h-4 text-[#FC8019]" />
              <span className="hidden md:inline uppercase text-[11px] tracking-wider">Help</span>
            </button>

            {/* Profile Button */}
            <button
              id="nav-profile-btn"
              onClick={onOpenProfile}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#1A1A1A] hover:bg-[#F3F4F1] border border-transparent hover:border-[#1A1A1A] rounded-full transition-colors cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline uppercase text-[11px] tracking-wider">Pankti</span>
            </button>

            {/* Multi-Restaurant Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white border border-[#1A1A1A] rounded-full font-bold text-xs shadow-xs hover:bg-[#FC8019] hover:text-white transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#E0FF4F]" />
              <span className="uppercase tracking-wider">Cart</span>
              {totalCartCount > 0 ? (
                <span className="w-5 h-5 rounded-full bg-[#E0FF4F] text-[#1A1A1A] font-black text-[11px] flex items-center justify-center">
                  {totalCartCount}
                </span>
              ) : (
                <span className="text-gray-400 text-[11px]">(0)</span>
              )}
              {uniqueRestaurants.length > 1 && (
                <span className="hidden xl:inline bg-white/20 text-[#E0FF4F] text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase">
                  {uniqueRestaurants.length} Rest
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Bento Service Switcher Tabs */}
        <div className="flex items-center justify-between border-t border-[#1A1A1A]/10 py-2.5 overflow-x-auto no-scrollbar gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            <button
              id="service-tab-food"
              onClick={() => onSelectService('food')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                activeService === 'food'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Food Delivery</span>
            </button>

            <button
              id="service-tab-multicart"
              onClick={() => onSelectService('multicart_hub')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                activeService === 'multicart_hub'
                  ? 'bg-[#E0FF4F] text-[#1A1A1A] border-[#1A1A1A] shadow-xs font-black'
                  : 'bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#E0FF4F]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Multi-Cart Hub</span>
              <span className="bg-[#1A1A1A] text-[#E0FF4F] text-[9px] px-2 py-0.2 rounded-full font-black uppercase">
                ★ 2+ Rest.
              </span>
            </button>

            <button
              id="service-tab-instamart"
              onClick={() => onSelectService('instamart')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                activeService === 'instamart'
                  ? 'bg-emerald-600 text-white border-[#1A1A1A] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#1A1A1A] hover:text-emerald-700'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Instamart (10m)</span>
            </button>

            <button
              id="service-tab-dineout"
              onClick={() => onSelectService('dineout')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                activeService === 'dineout'
                  ? 'bg-rose-600 text-white border-[#1A1A1A] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#1A1A1A] hover:text-rose-700'
              }`}
            >
              <Percent className="w-3.5 h-3.5" />
              <span>Dineout (Save 25%)</span>
            </button>

            <button
              id="service-tab-scenes"
              onClick={() => onSelectService('scenes')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                activeService === 'scenes'
                  ? 'bg-indigo-700 text-white border-[#1A1A1A] shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#1A1A1A] hover:text-indigo-700'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Scenes & Events</span>
            </button>

          </div>

          {/* Quick Grace Period Badge Notice */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#1A1A1A] bg-white border border-[#1A1A1A] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>120s Instant Cancel Guarantee</span>
          </div>
        </div>

      </div>
    </header>
  );
};
