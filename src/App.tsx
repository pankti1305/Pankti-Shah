import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Navbar 
} from './components/Navbar';
import { 
  MultiRestaurantHub 
} from './components/MultiRestaurantHub';
import { 
  RestaurantCard 
} from './components/RestaurantCard';
import { 
  RestaurantDetailModal 
} from './components/RestaurantDetailModal';
import { 
  InstamartView 
} from './components/InstamartView';
import { 
  DineoutView 
} from './components/DineoutView';
import { 
  ScenesView 
} from './components/ScenesView';
import { 
  MultiCartDrawer 
} from './components/MultiCartDrawer';
import { 
  ActiveOrderTracker 
} from './components/ActiveOrderTracker';
import { 
  HumanSupportModal 
} from './components/HumanSupportModal';
import { 
  UserProfileModal 
} from './components/UserProfileModal';
import { 
  AddressSelectorModal 
} from './components/AddressSelectorModal';

import { 
  ServiceMode, 
  Restaurant, 
  MenuItem, 
  CartItem, 
  Order, 
  InstamartProduct 
} from './types';

import { 
  RESTAURANTS, 
  INSTAMART_PRODUCTS, 
  DINEOUT_VENUES, 
  SCENE_EVENTS, 
  INITIAL_USER_ADDRESSES 
} from './data/mockData';

import { 
  Sparkles, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Percent, 
  SlidersHorizontal,
  ArrowRight,
  Layers,
  Heart
} from 'lucide-react';

export default function App() {
  // Service mode state
  const [activeService, setActiveService] = useState<ServiceMode>('food');
  
  // Data state
  const [restaurants] = useState<Restaurant[]>(RESTAURANTS);
  const [instamartProducts] = useState<InstamartProduct[]>(INSTAMART_PRODUCTS);
  const [dineoutVenues] = useState(DINEOUT_VENUES);
  const [sceneEvents] = useState(SCENE_EVENTS);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [pureVegOnly, setPureVegOnly] = useState(false);
  const [selectedCuisineFilter, setSelectedCuisineFilter] = useState('All');
  const [selectedSort, setSelectedSort] = useState<'rating' | 'time' | 'cost'>('rating');

  // Address
  const [selectedAddress, setSelectedAddress] = useState(INITIAL_USER_ADDRESSES[0].address);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Cart & Orders State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<Order | null>(null);
  
  // Wallet Balance (updated on refund)
  const [walletBalance, setWalletBalance] = useState<number>(350);

  // Modals
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add Item to Multi-Restaurant Cart
  const handleAddToCart = (
    item: MenuItem, 
    restaurant: Restaurant, 
    selectedOptions?: { name: string; price: number }[]
  ) => {
    const extraPrice = selectedOptions ? selectedOptions.reduce((sum, o) => sum + o.price, 0) : 0;
    const finalPrice = item.price + extraPrice;
    const cartItemId = `${item.id}-${selectedOptions?.map(o => o.name).join('-') || 'default'}`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) => i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItemId: item.id,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          restaurantImage: restaurant.image,
          name: item.name,
          price: finalPrice,
          quantity: 1,
          isVeg: item.isVeg,
          selectedOptions,
        }
      ];
    });

    showToast(`Added "${item.name}" from ${restaurant.name} to Multi-Cart!`);
  };

  // Add Grocery to Cart
  const handleAddGroceryToCart = (product: InstamartProduct) => {
    const cartItemId = `instamart-${product.id}`;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) => i.id === cartItemId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [
        ...prev,
        {
          id: cartItemId,
          menuItemId: product.id,
          restaurantId: 'instamart-hub',
          restaurantName: 'Swiggy Instamart (10m)',
          restaurantImage: product.image,
          name: product.name,
          price: product.price,
          quantity: 1,
          isVeg: true,
        }
      ];
    });

    showToast(`Added "${product.name}" to your cart!`);
  };

  // Update Item Quantity
  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== cartItemId));
    } else {
      setCartItems((prev) => prev.map((i) => i.id === cartItemId ? { ...i, quantity: newQty } : i));
    }
  };

  // Clear Cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Place Order (With 120s Grace Period)
  const handlePlaceOrder = (orderData: Partial<Order>) => {
    const newOrder: Order = {
      id: `SWG-${Date.now().toString().slice(-6)}`,
      createdAt: Date.now(),
      cancellationDeadline: Date.now() + 120 * 1000, // 120 seconds grace window
      status: 'placed',
      items: orderData.items || [],
      restaurantBreakdown: orderData.restaurantBreakdown || [],
      deliveryAddress: orderData.deliveryAddress || {
        title: 'Home',
        address: selectedAddress,
        receiverName: 'Pankti S.',
        receiverPhone: '+91 98765 43210'
      },
      pricing: orderData.pricing || {
        itemsSubtotal: 0,
        deliveryFee: 0,
        platformFee: 6,
        taxes: 0,
        couponDiscount: 0,
        deliveryTip: 30,
        totalAmount: 0
      },
      appliedCoupon: orderData.appliedCoupon,
      paymentMethod: orderData.paymentMethod || 'UPI / GPay',
      paymentStatus: 'paid',
      rider: {
        name: 'Ramesh Kumar',
        phone: '+91 98450 11234',
        rating: 4.9,
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        vehicleNumber: 'KA 01 EK 4920',
        currentLat: 12.9352,
        currentLng: 77.6245
      },
      deliveryEtaMinutes: 22
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    setSelectedOrderForTracking(newOrder);

    // Fire celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    showToast('🎉 Order placed successfully! 120s Grace Period is active.');
  };

  // Instant 120s Cancellation handler (Research solution)
  const handleCancelOrder = (orderId: string, reason: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    const refundAmount = targetOrder?.pricing.totalAmount || 0;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'cancelled', cancellationReason: reason, paymentStatus: 'refunded', refundProcessed: true }
          : o
      )
    );

    if (selectedOrderForTracking?.id === orderId) {
      setSelectedOrderForTracking((prev) =>
        prev ? { ...prev, status: 'cancelled', cancellationReason: reason, paymentStatus: 'refunded', refundProcessed: true } : null
      );
    }

    // Auto credit to Swiggy Money wallet
    setWalletBalance((prev) => prev + refundAmount);

    showToast(`✓ Order cancelled within grace window. 100% (₹${refundAmount}) refunded to Swiggy Money!`);
  };

  // Simulate Order Status Progress
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((ord) => {
          if (ord.status === 'cancelled' || ord.status === 'delivered') return ord;
          const ageMs = Date.now() - ord.createdAt;
          
          if (ageMs > 45000 && ord.status === 'out_for_delivery') {
            return { ...ord, status: 'delivered', deliveryEtaMinutes: 0 };
          }
          if (ageMs > 30000 && ord.status === 'picked_up') {
            return { ...ord, status: 'out_for_delivery', deliveryEtaMinutes: Math.max(5, ord.deliveryEtaMinutes - 5) };
          }
          if (ageMs > 18000 && ord.status === 'cooking') {
            return { ...ord, status: 'picked_up' };
          }
          if (ageMs > 8000 && (ord.status === 'placed' || ord.status === 'confirmed')) {
            return { ...ord, status: 'cooking' };
          }
          return ord;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update selected order tracking instance when orders array changes
  useEffect(() => {
    if (selectedOrderForTracking) {
      const updated = orders.find(o => o.id === selectedOrderForTracking.id);
      if (updated) setSelectedOrderForTracking(updated);
    }
  }, [orders]);

  // Filter restaurants
  const filteredRestaurants = restaurants.filter((rest) => {
    if (pureVegOnly && !rest.isPureVeg) return false;
    if (selectedCuisineFilter !== 'All' && !rest.cuisines.includes(selectedCuisineFilter)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = rest.name.toLowerCase().includes(q);
      const matchCuisine = rest.cuisines.some(c => c.toLowerCase().includes(q));
      const matchDish = rest.menu.some(m => m.name.toLowerCase().includes(q));
      if (!matchName && !matchCuisine && !matchDish) return false;
    }
    return true;
  }).sort((a, b) => {
    if (selectedSort === 'rating') return b.rating - a.rating;
    if (selectedSort === 'time') return a.deliveryTimeMinutes - b.deliveryTimeMinutes;
    if (selectedSort === 'cost') return a.priceForTwo - b.priceForTwo;
    return 0;
  });

  const allCuisines = ['All', 'Biryani', 'Burgers', 'Desserts', 'South Indian', 'Italian', 'Tea'];

  return (
    <div className="min-h-screen bg-[#F3F4F1] text-[#1A1A1A] flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#1A1A1A] text-[#E0FF4F] px-5 py-3 rounded-full shadow-2xl border border-[#1A1A1A] text-xs font-black flex items-center gap-2 animate-slideDown">
          <span className="w-2 h-2 rounded-full bg-[#E0FF4F] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Header */}
      <Navbar
        activeService={activeService}
        onSelectService={setActiveService}
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        activeOrders={orders}
        onSelectActiveOrder={(ord) => setSelectedOrderForTracking(ord)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        pureVegOnly={pureVegOnly}
        onTogglePureVeg={() => setPureVegOnly(!pureVegOnly)}
        selectedAddress={selectedAddress}
        onOpenAddressSelector={() => setIsAddressModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-8">
        
        {/* Service Views Switcher */}
        {activeService === 'multicart_hub' ? (
          <MultiRestaurantHub
            restaurants={restaurants}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            onSelectRestaurant={(r) => setSelectedRestaurant(r)}
          />
        ) : activeService === 'instamart' ? (
          <InstamartView
            products={instamartProducts}
            cartItems={cartItems}
            onAddGroceryToCart={handleAddGroceryToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onOpenCart={() => setIsCartOpen(true)}
          />
        ) : activeService === 'dineout' ? (
          <DineoutView venues={dineoutVenues} />
        ) : activeService === 'scenes' ? (
          <ScenesView events={sceneEvents} />
        ) : (
          /* Standard Food Delivery Flow with Bento Grid Experience */
          <div className="space-y-8 animate-fadeIn">
            
            {/* Bento Grid Header Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Primary Bento Hero Tile (8 cols) */}
              <div className="lg:col-span-8 bg-white border border-[#1A1A1A] rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xs">
                <div className="z-10 max-w-xl space-y-3">
                  <span className="px-3.5 py-1 bg-[#1A1A1A] text-[#E0FF4F] text-[10px] uppercase font-black tracking-widest rounded-full inline-flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#E0FF4F]" />
                    <span>Multi-Restaurant Bento Engine</span>
                  </span>

                  <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-[#1A1A1A] leading-none pt-2">
                    Craving Biryani + <br className="hidden sm:inline" />
                    Burgers + Dessert?
                  </h1>

                  <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed max-w-md pt-1">
                    Mix dishes across 2+ kitchens in a single cart. Unified delivery fees, synced tracking, and 120s instant refund guarantee.
                  </p>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      id="hero-multicart-btn"
                      onClick={() => setActiveService('multicart_hub')}
                      className="px-6 py-3.5 bg-[#1A1A1A] text-white hover:bg-[#E0FF4F] hover:text-[#1A1A1A] hover:border-[#1A1A1A] border border-[#1A1A1A] rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer flex items-center gap-2"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Open Multi-Cart Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setSelectedCuisineFilter('Biryani')}
                      className="px-4 py-3 bg-white text-[#1A1A1A] border border-[#1A1A1A] hover:bg-gray-100 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Explore Biryani Pairings
                    </button>
                  </div>
                </div>

                {/* Decorative Geometric Bento Corner */}
                <div className="absolute right-0 bottom-0 w-1/3 h-full bg-[#F3F4F1] border-l border-[#1A1A1A] rounded-tl-[80px] hidden sm:flex items-center justify-center pointer-events-none opacity-40">
                  <div className="w-32 h-32 border-8 border-[#1A1A1A] rounded-full" />
                </div>
              </div>

              {/* Side Bento Tile 1: 120s Instant Cancellation (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                
                <div className="bg-[#1A1A1A] border border-[#1A1A1A] rounded-3xl p-6 text-white flex flex-col justify-between shadow-xs">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-widest text-[#E0FF4F] font-black">Feature Guarantee</span>
                    <span className="text-xl font-black text-[#E0FF4F]">120s</span>
                  </div>
                  <div className="my-2">
                    <h3 className="text-xl font-black uppercase tracking-tight">Zero-Fee Grace Period</h3>
                    <p className="text-xs text-gray-300 mt-1">100% instant refund auto-credited to Swiggy Money if cancelled within 2 minutes.</p>
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-gray-800 pt-2 flex items-center justify-between">
                    <span>Instant Credit</span>
                    <span className="text-emerald-400">● Live Protection</span>
                  </div>
                </div>

                {/* Side Bento Tile 2: Instamart Quick Groceries (4 cols) */}
                <div className="bg-[#E0FF4F] border border-[#1A1A1A] rounded-3xl p-6 text-[#1A1A1A] flex flex-col justify-between shadow-xs">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-black tracking-widest">Flash Groceries</span>
                    <span className="font-black text-sm uppercase px-2 py-0.5 bg-[#1A1A1A] text-white rounded-full">10 Mins</span>
                  </div>
                  <div className="my-1">
                    <h3 className="text-xl font-black uppercase leading-tight tracking-tight">Swiggy Instamart</h3>
                    <p className="text-xs font-semibold text-gray-800 mt-0.5">Need ice creams, chips or drinks right now?</p>
                  </div>
                  <button
                    onClick={() => setActiveService('instamart')}
                    className="w-full py-2 bg-[#1A1A1A] text-white hover:bg-black rounded-full text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
                  >
                    Shop 10m Groceries →
                  </button>
                </div>

              </div>

            </div>

            {/* Filter and Sort Bento Toolbar */}
            <div className="bg-white border border-[#1A1A1A] rounded-3xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              
              {/* Cuisine chips */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-xs font-black uppercase tracking-wider text-gray-400 pl-2">Filter:</span>
                {allCuisines.map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => setSelectedCuisineFilter(cuisine)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                      selectedCuisineFilter === cuisine
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-xs'
                        : 'bg-[#F3F4F1] text-gray-700 border-transparent hover:border-[#1A1A1A]'
                    }`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  <span>Sort:</span>
                </span>
                <div className="flex items-center gap-1 bg-[#F3F4F1] border border-[#1A1A1A] p-1 rounded-full">
                  {(['rating', 'time', 'cost'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSort(s)}
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedSort === s ? 'bg-[#1A1A1A] text-[#E0FF4F] shadow-xs' : 'text-gray-700 hover:text-black'
                      }`}
                    >
                      {s === 'rating' ? 'Rating' : s === 'time' ? 'Speed' : 'Cost'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Restaurant List Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A] flex items-center gap-2">
                  <span>Top Bengaluru Kitchens</span>
                  <span className="text-xs font-bold text-gray-500 lowercase bg-white border border-[#1A1A1A] px-2.5 py-0.5 rounded-full">({filteredRestaurants.length} active)</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map((restaurant) => {
                  const itemsInCartForRest = cartItems.filter(i => i.restaurantId === restaurant.id);
                  const count = itemsInCartForRest.reduce((s, i) => s + i.quantity, 0);

                  return (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      cartCountFromThisRestaurant={count}
                      onClick={() => setSelectedRestaurant(restaurant)}
                    />
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Restaurant Detail Modal */}
      {selectedRestaurant && (
        <RestaurantDetailModal
          restaurant={selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      {/* Multi-Restaurant Cart Drawer */}
      <MultiCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        selectedAddress={selectedAddress}
      />

      {/* Active Order Live Tracker (with 120s cancellation) */}
      {selectedOrderForTracking && (
        <ActiveOrderTracker
          order={selectedOrderForTracking}
          onClose={() => setSelectedOrderForTracking(null)}
          onCancelOrder={handleCancelOrder}
          onOpenSupportForOrder={(ord) => {
            setSelectedOrderForTracking(null);
            setIsSupportOpen(true);
          }}
        />
      )}

      {/* Human Support Chat Modal (with 1-Tap Human Agent Escalation) */}
      <HumanSupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        orders={orders}
        activeOrder={orders.find(o => o.status !== 'delivered' && o.status !== 'cancelled')}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        orders={orders}
        walletBalance={walletBalance}
        onSelectOrder={(ord) => {
          setIsProfileOpen(false);
          setSelectedOrderForTracking(ord);
        }}
        selectedAddress={selectedAddress}
      />

      {/* Address Selector Modal */}
      <AddressSelectorModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        selectedAddress={selectedAddress}
        onSelectAddress={setSelectedAddress}
      />

      {/* Bento Styled Footer */}
      <footer className="bg-[#1A1A1A] text-white mt-12 border-t border-[#1A1A1A] text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#FC8019] border border-white/20 flex items-center justify-center font-black text-white text-xs">
              S
            </div>
            <span className="font-black text-white uppercase tracking-wider">SWIGGY BENTO</span>
            <span>• Redesign Project by Dharmi & Pankti</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold uppercase tracking-wider">
            <span className="px-2.5 py-1 rounded-full border border-gray-700 bg-gray-800/50">Multi-Restaurant Cart</span>
            <span className="px-2.5 py-1 rounded-full border border-gray-700 bg-gray-800/50">120s Grace Refund</span>
            <span className="px-2.5 py-1 rounded-full border border-gray-700 bg-gray-800/50">Direct Human Support</span>
            <span className="px-2.5 py-1 rounded-full border border-gray-700 bg-gray-800/50">Instamart 10m</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
