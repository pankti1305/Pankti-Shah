import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  Percent, 
  MapPin, 
  Plus, 
  Minus, 
  Flame, 
  Sparkles, 
  Info, 
  ShoppingBag,
  Check
} from 'lucide-react';
import { Restaurant, MenuItem, CartItem } from '../types';

interface RestaurantDetailModalProps {
  restaurant: Restaurant;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem, restaurant: Restaurant, selectedOptions?: { name: string; price: number }[]) => void;
  onUpdateCartQuantity: (cartItemId: string, newQty: number) => void;
  onOpenCart: () => void;
}

export const RestaurantDetailModal: React.FC<RestaurantDetailModalProps> = ({
  restaurant,
  onClose,
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [vegFilterOnly, setVegFilterOnly] = useState<boolean>(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [groupName: string]: { name: string; price: number } }>({});

  // Filtered menu
  const filteredMenu = restaurant.menu.filter((item) => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (vegFilterOnly && !item.isVeg) return false;
    return true;
  });

  const getCartQuantity = (menuItemId: string) => {
    return cartItems
      .filter((i) => i.menuItemId === menuItemId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  const getCartItemInstance = (menuItemId: string) => {
    return cartItems.find((i) => i.menuItemId === menuItemId);
  };

  const handleAddItemClick = (item: MenuItem) => {
    if (item.customizations && item.customizations.length > 0) {
      // Open customization modal
      setCustomizingItem(item);
      const initialSelection: { [groupName: string]: { name: string; price: number } } = {};
      item.customizations.forEach((group) => {
        initialSelection[group.name] = group.options[0];
      });
      setSelectedOptions(initialSelection);
    } else {
      onAddToCart(item, restaurant);
    }
  };

  const handleConfirmCustomization = () => {
    if (!customizingItem) return;
    const optionsArray = Object.values(selectedOptions);
    onAddToCart(customizingItem, restaurant, optionsArray);
    setCustomizingItem(null);
  };

  const itemsInCartForThisRest = cartItems.filter(i => i.restaurantId === restaurant.id);
  const totalThisRestCount = itemsInCartForThisRest.reduce((sum, i) => sum + i.quantity, 0);
  const totalThisRestSubtotal = itemsInCartForThisRest.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] relative my-auto border border-[#1A1A1A]">
        
        {/* Header Bar */}
        <div className="relative h-48 sm:h-60 bg-[#1A1A1A] shrink-0 border-b border-[#1A1A1A]">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-black/40 to-transparent" />

          {/* Close button */}
          <button
            id="close-restaurant-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1A1A1A]/80 hover:bg-[#1A1A1A] text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer z-10 border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Restaurant Header Meta */}
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 text-white space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">{restaurant.name}</h1>
              <div className="flex items-center gap-1 bg-[#1A1A1A] text-[#E0FF4F] text-xs font-black px-2.5 py-0.5 rounded-full border border-white/20 shadow-xs">
                <Star className="w-3.5 h-3.5 fill-[#E0FF4F]" />
                <span>{restaurant.rating}</span>
                <span className="text-[10px] text-gray-300">({restaurant.ratingCount})</span>
              </div>
            </div>

            <p className="text-xs text-gray-300 font-medium">{restaurant.cuisines.join(', ')}</p>

            <div className="flex items-center gap-4 text-xs font-bold text-gray-300 pt-1 uppercase tracking-wide">
              <span className="flex items-center gap-1 text-[#E0FF4F]">
                <Clock className="w-3.5 h-3.5 text-[#E0FF4F]" />
                {restaurant.deliveryTimeMinutes} mins ETA
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-[#FC8019]" />
                {restaurant.address}
              </span>
            </div>
          </div>
        </div>

        {/* Offer & Multi-Cart Banner */}
        <div className="bg-[#F3F4F1] border-b border-[#1A1A1A]/10 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-tight text-[#1A1A1A]">
            <Percent className="w-4 h-4 text-[#FC8019] shrink-0" />
            <span>{restaurant.featuredOffer || 'Special Swiggy One offers available'}</span>
          </div>
          <div className="text-[10px] text-[#1A1A1A] bg-[#E0FF4F] border border-[#1A1A1A] px-3 py-1 rounded-full font-black uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#1A1A1A]" />
            <span>Multi-Restaurant Cart enabled</span>
          </div>
        </div>

        {/* Filters and Categories Navigation */}
        <div className="p-4 sm:px-6 border-b border-[#1A1A1A]/10 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar shrink-0 bg-white">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                activeCategory === 'all'
                  ? 'bg-[#1A1A1A] text-[#E0FF4F] border-[#1A1A1A]'
                  : 'bg-[#F3F4F1] text-gray-700 border-[#1A1A1A]/10 hover:border-[#1A1A1A]'
              }`}
            >
              All Items ({restaurant.menu.length})
            </button>
            {restaurant.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-[#1A1A1A] text-[#E0FF4F] border-[#1A1A1A]'
                    : 'bg-[#F3F4F1] text-gray-700 border-[#1A1A1A]/10 hover:border-[#1A1A1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Veg Only Toggle */}
          <button
            onClick={() => setVegFilterOnly(!vegFilterOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap border transition-all cursor-pointer shrink-0 ${
              vegFilterOnly
                ? 'bg-[#1A1A1A] text-[#E0FF4F] border-[#1A1A1A]'
                : 'bg-white text-gray-700 border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${vegFilterOnly ? 'bg-[#E0FF4F]' : 'bg-emerald-600'}`} />
            <span>Veg Only</span>
          </button>
        </div>

        {/* Menu Items List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 divide-y divide-[#1A1A1A]/10 space-y-4">
          {filteredMenu.length === 0 ? (
            <div className="text-center py-12 text-gray-500 space-y-2">
              <p className="text-sm font-bold uppercase tracking-wide">No items match your filter criteria.</p>
              <button
                onClick={() => { setActiveCategory('all'); setVegFilterOnly(false); }}
                className="text-xs text-[#FC8019] font-black uppercase hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredMenu.map((item) => {
              const qty = getCartQuantity(item.id);
              const cartItem = getCartItemInstance(item.id);

              return (
                <div
                  key={item.id}
                  id={`menu-item-${item.id}`}
                  className="pt-4 first:pt-0 flex items-start justify-between gap-4 group"
                >
                  {/* Item Info */}
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3.5 h-3.5 rounded-xs border p-0.5 flex items-center justify-center shrink-0 ${
                          item.isVeg ? 'border-emerald-600' : 'border-red-600'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                      </span>

                      {item.isBestseller && (
                        <span className="text-[9px] font-black text-[#1A1A1A] bg-[#E0FF4F] border border-[#1A1A1A] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Bestseller
                        </span>
                      )}

                      {item.isSpicy && (
                        <span className="text-[9px] font-black text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-0.5 uppercase">
                          <Flame className="w-2.5 h-2.5 text-rose-500" />
                          Spicy
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-[#1A1A1A] text-sm sm:text-base leading-snug uppercase tracking-tight">{item.name}</h4>

                    <div className="flex items-center gap-2">
                      <span className="font-black text-[#1A1A1A] text-sm">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-gray-400 font-bold line-through">₹{item.originalPrice}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500">
                      <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                      <span className="font-black text-emerald-700">{item.rating}</span>
                      <span>({item.votes})</span>
                    </div>

                    <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed max-w-md">
                      {item.description}
                    </p>

                    {item.customizations && item.customizations.length > 0 && (
                      <span className="inline-block text-[10px] font-black uppercase text-[#1A1A1A] bg-[#F3F4F1] border border-[#1A1A1A]/10 px-2.5 py-0.5 rounded-full">
                        Customisable Options
                      </span>
                    )}
                  </div>

                  {/* Image & Add Button */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className="w-28 h-24 sm:w-32 sm:h-28 rounded-3xl overflow-hidden bg-[#F3F4F1] border border-[#1A1A1A]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Add / Quantity Button */}
                    <div className="absolute -bottom-3 w-24">
                      {qty > 0 ? (
                        <div className="flex items-center justify-between bg-[#1A1A1A] text-[#E0FF4F] font-black rounded-full border border-[#1A1A1A] shadow-md py-1 px-2 text-xs">
                          <button
                            id={`decrease-qty-${item.id}`}
                            onClick={() => {
                              if (cartItem) onUpdateCartQuantity(cartItem.id, qty - 1);
                            }}
                            className="w-5 h-5 flex items-center justify-center hover:text-red-400 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span>{qty}</span>
                          <button
                            id={`increase-qty-${item.id}`}
                            onClick={() => {
                              if (cartItem) onUpdateCartQuantity(cartItem.id, qty + 1);
                            }}
                            className="w-5 h-5 flex items-center justify-center hover:text-white cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          id={`add-item-${item.id}`}
                          onClick={() => handleAddItemClick(item)}
                          className="w-full bg-[#1A1A1A] hover:bg-[#FC8019] text-white font-black rounded-full border border-[#1A1A1A] shadow-md py-1 px-3 text-xs uppercase tracking-wider transition-all cursor-pointer"
                        >
                          + ADD
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Bar showing Cart summary for this kitchen and multi-cart */}
        {totalThisRestCount > 0 && (
          <div className="bg-[#1A1A1A] text-white p-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 border-t border-[#1A1A1A]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E0FF4F] text-[#1A1A1A] border border-[#1A1A1A] flex items-center justify-center font-black text-xs">
                {totalThisRestCount}
              </div>
              <div className="text-xs">
                <p className="font-black uppercase tracking-tight">{totalThisRestCount} items from {restaurant.name}</p>
                <p className="text-gray-400 font-medium">Subtotal: ₹{totalThisRestSubtotal}</p>
              </div>
            </div>

            <button
              id="view-cart-from-modal-btn"
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#E0FF4F] hover:bg-white text-[#1A1A1A] rounded-full font-black text-xs uppercase tracking-wider transition-colors border border-[#1A1A1A] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Go to Multi-Cart</span>
            </button>
          </div>
        )}
      </div>

      {/* Item Customization Sub-Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scaleUp border border-[#1A1A1A]">
            <div className="flex items-start justify-between border-b border-[#1A1A1A]/10 pb-3">
              <div>
                <h3 className="font-black uppercase tracking-tight text-[#1A1A1A] text-base">{customizingItem.name}</h3>
                <p className="text-xs text-gray-500 font-medium">Select your preferences</p>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
              {customizingItem.customizations?.map((group) => (
                <div key={group.name} className="space-y-2">
                  <h4 className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider">{group.name}</h4>
                  <div className="space-y-1.5">
                    {group.options.map((opt) => {
                      const isSelected = selectedOptions[group.name]?.name === opt.name;
                      return (
                        <label
                          key={opt.name}
                          onClick={() => setSelectedOptions(prev => ({ ...prev, [group.name]: opt }))}
                          className={`flex items-center justify-between p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                            isSelected ? 'bg-[#1A1A1A] border-[#1A1A1A] font-black text-[#E0FF4F]' : 'bg-[#F3F4F1] border-[#1A1A1A]/10 hover:border-[#1A1A1A] text-gray-700 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={group.name}
                              checked={isSelected}
                              onChange={() => {}}
                              className="text-[#1A1A1A] focus:ring-[#1A1A1A]"
                            />
                            <span>{opt.name}</span>
                          </div>
                          {opt.price > 0 && <span className="font-black">+₹{opt.price}</span>}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Total Item Price</p>
                <p className="text-base font-black text-[#1A1A1A]">
                  ₹{customizingItem.price + (Object.values(selectedOptions) as { name: string; price: number }[]).reduce((sum, opt) => sum + opt.price, 0)}
                </p>
              </div>

              <button
                id="confirm-customization-btn"
                onClick={handleConfirmCustomization}
                className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-[#E0FF4F] rounded-full font-black text-xs uppercase tracking-wider shadow-md cursor-pointer border border-[#1A1A1A]"
              >
                Add Customised Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
