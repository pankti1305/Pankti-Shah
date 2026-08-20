import React from 'react';
import { 
  Layers, 
  Sparkles, 
  Plus, 
  Utensils, 
  Clock, 
  Check, 
  ArrowRight,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { Restaurant, CartItem } from '../types';

interface MultiRestaurantHubProps {
  restaurants: Restaurant[];
  cartItems: CartItem[];
  onAddToCart: (item: any, restaurant: Restaurant) => void;
  onOpenCart: () => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
}

export const MultiRestaurantHub: React.FC<MultiRestaurantHubProps> = ({
  restaurants,
  cartItems,
  onAddToCart,
  onOpenCart,
  onSelectRestaurant
}) => {
  // Pre-curated popular multi-restaurant combos (e.g., Main Course from Biryani + Dessert from Ice Cream)
  const curatedCombos = [
    {
      id: 'combo-1',
      title: 'Royal Biryani & Death By Chocolate Feast',
      description: 'Authentic spicy Andhra Biryani from Meghana Foods paired with the legendary DBC Sundae from Corner House.',
      savingsText: 'Save ₹75 with MULTICART coupon',
      tag: 'Most Loved Pair',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      items: [
        {
          restaurantId: 'rest-1',
          restaurantName: 'Meghana Foods',
          menuItem: restaurants.find(r => r.id === 'rest-1')?.menu.find(m => m.id === 'm-101')!
        },
        {
          restaurantId: 'rest-3',
          restaurantName: 'Corner House Ice Cream',
          menuItem: restaurants.find(r => r.id === 'rest-3')?.menu.find(m => m.id === 'm-301')!
        }
      ]
    },
    {
      id: 'combo-2',
      title: 'Bistro Gourmet Burger & Authentic Chai Flask',
      description: 'American Double Cheese Burger from Truffles Bistro washed down with Ginger Cardamom Chai from Chai Point.',
      savingsText: 'Free Delivery Included',
      tag: 'Office Lunch Favorite',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      items: [
        {
          restaurantId: 'rest-2',
          restaurantName: 'Truffles Bistro & Burgers',
          menuItem: restaurants.find(r => r.id === 'rest-2')?.menu.find(m => m.id === 'm-201')!
        },
        {
          restaurantId: 'rest-6',
          restaurantName: 'Chai Point',
          menuItem: restaurants.find(r => r.id === 'rest-6')?.menu.find(m => m.id === 'm-601')!
        }
      ]
    },
    {
      id: 'combo-3',
      title: 'Artisanal Sourdough Pizza & Mango Sundae',
      description: 'Fresh Burrata Pizza from Brik Oven combined with Alphonso Mango Vanilla Cream from Corner House.',
      savingsText: 'Save ₹120 on Duo Checkout',
      tag: 'Weekend Special',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      items: [
        {
          restaurantId: 'rest-5',
          restaurantName: 'Brik Oven Artisanal Pizza',
          menuItem: restaurants.find(r => r.id === 'rest-5')?.menu.find(m => m.id === 'm-501')!
        },
        {
          restaurantId: 'rest-3',
          restaurantName: 'Corner House Ice Cream',
          menuItem: restaurants.find(r => r.id === 'rest-3')?.menu.find(m => m.id === 'm-303')!
        }
      ]
    }
  ];

  const handleAddAllCombo = (comboItems: typeof curatedCombos[0]['items']) => {
    comboItems.forEach(item => {
      const rest = restaurants.find(r => r.id === item.restaurantId);
      if (rest && item.menuItem) {
        onAddToCart(item.menuItem, rest);
      }
    });
  };

  const isComboInCart = (comboItems: typeof curatedCombos[0]['items']) => {
    return comboItems.every(c => cartItems.some(i => i.menuItemId === c.menuItem?.id));
  };

  return (
    <div id="multicart-hub-container" className="space-y-8 animate-fadeIn">
      {/* Hero Explainer Bento Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1A1A1A] text-white p-6 sm:p-8 shadow-xs border border-[#1A1A1A]">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#E0FF4F] text-[11px] font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#E0FF4F]" />
            <span>Problem Solved: Single Restaurant Limit</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
            Order from <span className="text-[#E0FF4F]">Multiple Restaurants</span> in One Single Cart!
          </h1>
          
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-2xl font-medium">
            No more placing 3 separate orders for food, drinks, and desserts! Mix your favorite dishes across different kitchens. One delivery fee, one checkout, and live synced tracking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-2xl">
              <Layers className="w-5 h-5 text-[#E0FF4F] shrink-0" />
              <div className="text-xs">
                <p className="font-black uppercase text-white tracking-tight">Group Carting</p>
                <p className="text-gray-400 text-[11px]">Everyone gets what they crave</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-2xl">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-black uppercase text-white tracking-tight">120s Grace Period</p>
                <p className="text-gray-400 text-[11px]">100% instant wallet refund</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/15 px-4 py-3 rounded-2xl">
              <Clock className="w-5 h-5 text-[#FC8019] shrink-0" />
              <div className="text-xs">
                <p className="font-black uppercase text-white tracking-tight">Smart Dispatch</p>
                <p className="text-gray-400 text-[11px]">Synchronized warm delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curated Cross-Restaurant Combos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-[#1A1A1A] flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#FC8019]" />
              <span>Popular Cross-Restaurant Pairings</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium">1-Click Add curated multi-kitchen matches</p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={onOpenCart}
              className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] bg-white hover:bg-[#E0FF4F] px-4 py-2 rounded-full border border-[#1A1A1A] flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
            >
              <span>View Cart ({cartItems.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {curatedCombos.map((combo) => {
            const added = isComboInCart(combo.items);
            const comboTotal = combo.items.reduce((sum, item) => sum + (item.menuItem?.price || 0), 0);

            return (
              <div
                key={combo.id}
                id={`combo-card-${combo.id}`}
                className="bg-white rounded-3xl border border-[#1A1A1A] shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#1A1A1A] bg-[#1A1A1A] text-[#E0FF4F]">
                      {combo.tag}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {combo.savingsText}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-[#1A1A1A] text-base leading-snug uppercase tracking-tight">{combo.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{combo.description}</p>
                  </div>

                  {/* Visual Pair Breakdown */}
                  <div className="space-y-2.5 pt-2">
                    {combo.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-[#F3F4F1] border border-[#1A1A1A]/20">
                        <img 
                          src={item.menuItem?.image} 
                          alt={item.menuItem?.name} 
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#1A1A1A]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${item.menuItem?.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                            <p className="text-xs font-extrabold text-[#1A1A1A] truncate">{item.menuItem?.name}</p>
                          </div>
                          <p className="text-[11px] text-gray-500 font-bold uppercase tracking-tight truncate">From {item.restaurantName}</p>
                          <p className="text-xs font-black text-[#1A1A1A] mt-0.5">₹{item.menuItem?.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-[#F3F4F1] border-t border-[#1A1A1A] flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Total Pair Price</p>
                    <p className="text-lg font-black text-[#1A1A1A]">₹{comboTotal}</p>
                  </div>

                  <button
                    id={`add-combo-btn-${combo.id}`}
                    onClick={() => handleAddAllCombo(combo.items)}
                    className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer border border-[#1A1A1A] ${
                      added
                        ? 'bg-[#E0FF4F] text-[#1A1A1A] shadow-xs'
                        : 'bg-[#1A1A1A] hover:bg-[#FC8019] text-white shadow-xs'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4 text-[#1A1A1A]" />
                        <span>In Cart</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add Pair</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Build Your Own Multi-Cart Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1A1A1A] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A] flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#FC8019]" />
              <span>Or Build Your Own Multi-Restaurant Mix</span>
            </h3>
            <p className="text-xs text-gray-600 font-medium">
              Browse any restaurant menus and simply click "+ Add". All items will be seamlessly organized in your unified cart.
            </p>
          </div>
          <button
            onClick={() => onSelectRestaurant(restaurants[0])}
            className="px-5 py-3 bg-[#1A1A1A] text-[#E0FF4F] hover:bg-black rounded-full font-black text-xs uppercase tracking-wider transition-colors shadow-xs shrink-0 cursor-pointer border border-[#1A1A1A]"
          >
            Explore All Restaurants →
          </button>
        </div>

        {/* Quick Restaurant Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
          {restaurants.map((rest) => {
            const hasItemInCart = cartItems.some(i => i.restaurantId === rest.id);
            return (
              <button
                key={rest.id}
                onClick={() => onSelectRestaurant(rest)}
                className={`p-3.5 rounded-2xl bg-[#F3F4F1] border text-left transition-all hover:border-[#1A1A1A] hover:bg-white cursor-pointer flex flex-col justify-between gap-2.5 ${
                  hasItemInCart ? 'border-[#1A1A1A] ring-2 ring-[#E0FF4F]' : 'border-[#1A1A1A]/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#1A1A1A] text-[#E0FF4F]">
                    ★ {rest.rating}
                  </span>
                  {hasItemInCart && (
                    <span className="w-2 h-2 rounded-full bg-[#FC8019]" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-black text-[#1A1A1A] uppercase tracking-tight truncate">{rest.name}</p>
                  <p className="text-[10px] text-gray-500 font-medium truncate">{rest.cuisines[0]}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
