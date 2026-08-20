import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Search, 
  Plus, 
  Minus, 
  Star, 
  Percent, 
  ShoppingBag,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { InstamartProduct, CartItem } from '../types';

interface InstamartViewProps {
  products: InstamartProduct[];
  cartItems: CartItem[];
  onAddGroceryToCart: (product: InstamartProduct) => void;
  onUpdateCartQuantity: (cartItemId: string, newQty: number) => void;
  onOpenCart: () => void;
}

export const InstamartView: React.FC<InstamartViewProps> = ({
  products,
  cartItems,
  onAddGroceryToCart,
  onUpdateCartQuantity,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories = ['all', 'Dairy & Bread', 'Fresh Fruits & Veggies', 'Snacks & Munchies', 'Instant Food & Noodles', 'Cold Drinks & Juices', 'Breakfast & Spreads'];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchFilter && !p.name.toLowerCase().includes(searchFilter.toLowerCase())) return false;
    return true;
  });

  const getProductQty = (productId: string) => {
    const item = cartItems.find((i) => i.menuItemId === productId);
    return item ? item.quantity : 0;
  };

  const getCartItemId = (productId: string) => {
    const item = cartItems.find((i) => i.menuItemId === productId);
    return item ? item.id : '';
  };

  return (
    <div id="instamart-container" className="space-y-6 animate-fadeIn">
      {/* Bento Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1A1A1A] text-white p-6 sm:p-8 shadow-xs border border-[#1A1A1A]">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#E0FF4F] text-[11px] font-black uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[#E0FF4F] fill-[#E0FF4F]" />
            <span>SWIGGY INSTAMART • 10 MINS DELIVERY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
            Fresh Groceries, Snacks & Essentials Delivered in <span className="text-[#E0FF4F]">10 Mins!</span>
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm font-medium">
            Dairy, farm-fresh fruits, ice-cold drinks & instant snacks right at your doorstep. Combine with multi-restaurant food delivery in one single cart!
          </p>

          <div className="flex items-center gap-4 text-xs font-bold text-gray-300 pt-2 uppercase tracking-wide">
            <span className="flex items-center gap-1.5 text-[#E0FF4F]">
              <Clock className="w-4 h-4 text-[#E0FF4F]" />
              Average ETA: 9-12 mins
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Quality Guaranteed
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#1A1A1A] text-[#E0FF4F] border-[#1A1A1A] shadow-xs'
                  : 'bg-white text-gray-700 border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
              }`}
            >
              {cat === 'all' ? 'All Groceries' : cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search groceries..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#1A1A1A]/20 rounded-full text-xs font-medium text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#1A1A1A] focus:outline-hidden"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredProducts.map((prod) => {
          const qty = getProductQty(prod.id);
          const cartId = getCartItemId(prod.id);

          return (
            <div
              key={prod.id}
              id={`instamart-item-${prod.id}`}
              className="bg-white rounded-3xl border border-[#1A1A1A] p-4 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all group"
            >
              <div className="space-y-3">
                <div className="relative h-32 sm:h-36 rounded-2xl overflow-hidden bg-[#F3F4F1] border border-[#1A1A1A]/20 flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  {prod.discountPercentage > 0 && (
                    <span className="absolute top-2 left-2 bg-[#1A1A1A] text-[#E0FF4F] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#1A1A1A]">
                      {prod.discountPercentage}% OFF
                    </span>
                  )}
                  <span className="absolute bottom-2 left-2 bg-[#1A1A1A] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                    <Clock className="w-2.5 h-2.5 text-[#E0FF4F]" />
                    10m
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">{prod.weight}</span>
                  <h4 className="font-extrabold text-[#1A1A1A] text-xs sm:text-sm line-clamp-2 leading-snug uppercase tracking-tight mt-0.5">
                    {prod.name}
                  </h4>
                </div>
              </div>

              {/* Price & Add Button */}
              <div className="pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between mt-3">
                <div>
                  <p className="font-black text-[#1A1A1A] text-sm">₹{prod.price}</p>
                  {prod.originalPrice > prod.price && (
                    <p className="text-[10px] text-gray-400 font-bold line-through">₹{prod.originalPrice}</p>
                  )}
                </div>

                {qty > 0 ? (
                  <div className="flex items-center gap-1.5 bg-[#1A1A1A] text-[#E0FF4F] font-black rounded-full px-2.5 py-1 text-xs border border-[#1A1A1A] shadow-xs">
                    <button
                      onClick={() => onUpdateCartQuantity(cartId, qty - 1)}
                      className="hover:text-red-400 p-0.5 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-1">{qty}</span>
                    <button
                      onClick={() => onUpdateCartQuantity(cartId, qty + 1)}
                      className="hover:text-white p-0.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onAddGroceryToCart(prod)}
                    className="bg-[#1A1A1A] hover:bg-[#FC8019] text-white font-black px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer border border-[#1A1A1A]"
                  >
                    + ADD
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
