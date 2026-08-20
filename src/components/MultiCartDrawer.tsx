import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Percent, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  CreditCard, 
  Check, 
  Layers
} from 'lucide-react';
import { CartItem, Order } from '../types';
import { AVAILABLE_COUPONS } from '../data/mockData';

interface MultiCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (orderData: Partial<Order>) => void;
  selectedAddress: string;
}

export const MultiCartDrawer: React.FC<MultiCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onPlaceOrder,
  selectedAddress,
}) => {
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [tipAmount, setTipAmount] = useState<number>(30);
  const [paymentMethod, setPaymentMethod] = useState<'UPI / GPay' | 'Credit/Debit Card' | 'Swiggy Money' | 'Cash on Delivery'>('UPI / GPay');

  if (!isOpen) return null;

  // Group items by restaurant cleanly
  type RestaurantGroup = { name: string; image: string; items: CartItem[] };
  const groupedByRestaurant: Record<string, RestaurantGroup> = {};

  cartItems.forEach((item) => {
    if (!groupedByRestaurant[item.restaurantId]) {
      groupedByRestaurant[item.restaurantId] = {
        name: item.restaurantName,
        image: item.restaurantImage,
        items: []
      };
    }
    groupedByRestaurant[item.restaurantId].items.push(item);
  });

  const restaurantCount = Object.keys(groupedByRestaurant).length;
  const itemsSubtotal = cartItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  
  // Single consolidated delivery fee (or free with coupon / Swiggy One)
  let deliveryFee = itemsSubtotal > 499 ? 0 : 35;
  const platformFee = 6;
  const taxes = Math.round(itemsSubtotal * 0.05);

  let discount = 0;
  if (appliedCoupon === 'SWIGGYIT') discount = Math.min(100, Math.round(itemsSubtotal * 0.5));
  if (appliedCoupon === 'MULTICART') discount = restaurantCount > 1 ? 75 : 40;
  if (appliedCoupon === 'FREEDEL') { deliveryFee = 0; discount = 35; }
  if (appliedCoupon === 'FEAST150' && itemsSubtotal >= 599) discount = 150;

  const totalAmount = Math.max(0, itemsSubtotal + deliveryFee + platformFee + taxes + tipAmount - discount);

  const handleCheckout = () => {
    const restaurantBreakdown = Object.entries(groupedByRestaurant).map(([rId, data]) => ({
      restaurantId: rId,
      restaurantName: data.name,
      subtotal: data.items.reduce((s, i) => s + (i.price * i.quantity), 0),
      itemsCount: data.items.reduce((s, i) => s + i.quantity, 0),
      prepTime: 18 + Math.floor(Math.random() * 8)
    }));

    onPlaceOrder({
      items: [...cartItems],
      restaurantBreakdown,
      pricing: {
        itemsSubtotal,
        deliveryFee,
        platformFee,
        taxes,
        couponDiscount: discount,
        deliveryTip: tipAmount,
        totalAmount
      },
      appliedCoupon: appliedCoupon || undefined,
      paymentMethod,
      deliveryAddress: {
        title: 'Home',
        address: selectedAddress,
        receiverName: 'Pankti S.',
        receiverPhone: '+91 98765 43210'
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-[#F3F4F1] w-full max-w-lg h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#1A1A1A]">
        
        {/* Bento Header */}
        <div className="p-4 sm:px-6 border-b border-[#1A1A1A] flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1A1A1A] flex items-center justify-center text-[#E0FF4F]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-base uppercase tracking-tight text-[#1A1A1A] flex items-center gap-2">
                <span>Multi-Restaurant Cart</span>
                {restaurantCount > 1 && (
                  <span className="bg-[#1A1A1A] text-[#E0FF4F] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#1A1A1A]">
                    {restaurantCount} Kitchens
                  </span>
                )}
              </h2>
              <p className="text-xs text-gray-500 font-medium">{cartItems.length} unique items</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button 
                onClick={onClearCart} 
                className="text-xs text-red-600 hover:text-red-700 font-black uppercase tracking-wider px-3 py-1 hover:bg-red-50 rounded-full border border-red-200 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
            <button 
              id="close-cart-btn"
              onClick={onClose} 
              className="p-2 text-gray-700 hover:text-black hover:bg-[#F3F4F1] rounded-full transition-colors cursor-pointer border border-[#1A1A1A]/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Content */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-20 h-20 bg-white border border-[#1A1A1A] rounded-3xl flex items-center justify-center text-[#1A1A1A] shadow-xs">
              <ShoppingBag className="w-10 h-10 text-[#FC8019]" />
            </div>
            <div>
              <h3 className="font-black uppercase tracking-tight text-[#1A1A1A] text-lg">Your Cart is Empty</h3>
              <p className="text-xs text-gray-600 mt-1 max-w-xs font-medium">
                Explore food restaurants or Instamart groceries. You can add items from multiple outlets into this single cart!
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#1A1A1A] text-[#E0FF4F] hover:bg-black text-xs font-black uppercase tracking-wider rounded-full shadow-xs cursor-pointer border border-[#1A1A1A]"
            >
              Start Ordering →
            </button>
          </div>
        ) : (
          <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-y-auto">
            
            {/* 120s Grace Period Notice Box */}
            <div className="bg-[#E0FF4F] border border-[#1A1A1A] rounded-3xl p-4 flex items-start gap-3 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#1A1A1A] shrink-0 mt-0.5" />
              <div className="text-xs text-[#1A1A1A]">
                <p className="font-black uppercase tracking-tight">120-Second Instant Refund Window</p>
                <p className="text-gray-800 text-[11px] leading-relaxed mt-0.5 font-medium">
                  Need to change mind or fix an accidental click? You can cancel within 2 mins after checkout for 100% instant refund!
                </p>
              </div>
            </div>

            {/* Grouped Items per Restaurant */}
            <div className="space-y-4">
              {Object.entries(groupedByRestaurant).map(([restaurantId, restData]) => (
                <div key={restaurantId} className="bg-white rounded-3xl p-5 border border-[#1A1A1A] space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FC8019]" />
                      <h3 className="font-black uppercase tracking-tight text-sm text-[#1A1A1A]">{restData.name}</h3>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#F3F4F1] border border-[#1A1A1A]/20 text-gray-700">
                      {restData.items.length} items
                    </span>
                  </div>

                  <div className="divide-y divide-[#1A1A1A]/10">
                    {restData.items.map((item) => (
                      <div key={item.id} className="py-3 first:pt-1 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                          <div className="truncate">
                            <p className="font-extrabold text-[#1A1A1A] truncate uppercase tracking-tight">{item.name}</p>
                            {item.selectedOptions && item.selectedOptions.length > 0 && (
                              <p className="text-[10px] text-gray-500 truncate">
                                {item.selectedOptions.map(o => o.name).join(', ')}
                              </p>
                            )}
                            <p className="text-[#1A1A1A] font-black mt-0.5">₹{item.price * item.quantity}</p>
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 bg-[#F3F4F1] border border-[#1A1A1A] rounded-full px-2.5 py-1 font-black text-[#1A1A1A] shadow-2xs shrink-0">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="hover:text-red-600 p-0.5 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-1 text-xs">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="hover:text-emerald-600 p-0.5 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupons Section */}
            <div className="bg-white p-5 rounded-3xl border border-[#1A1A1A] space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-[#FC8019]" />
                  <span>Apply Coupon</span>
                </span>
                {appliedCoupon && (
                  <button onClick={() => setAppliedCoupon('')} className="text-xs text-red-600 font-bold hover:underline cursor-pointer">
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {AVAILABLE_COUPONS.map((c) => {
                  const isApplied = appliedCoupon === c.code;
                  return (
                    <button
                      key={c.code}
                      onClick={() => setAppliedCoupon(isApplied ? '' : c.code)}
                      className={`p-3 rounded-2xl border text-left text-xs transition-all cursor-pointer ${
                        isApplied 
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#E0FF4F] font-bold shadow-xs' 
                          : 'border-[#1A1A1A]/20 bg-[#F3F4F1] hover:border-[#1A1A1A]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-black uppercase tracking-wider ${isApplied ? 'text-[#E0FF4F]' : 'text-[#1A1A1A]'}`}>
                          {c.code}
                        </span>
                        {isApplied && <Check className="w-3.5 h-3.5 text-[#E0FF4F]" />}
                      </div>
                      <p className={`text-[10px] mt-0.5 ${isApplied ? 'text-gray-300' : 'text-gray-500'}`}>{c.discount}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delivery Tip */}
            <div className="bg-white p-5 rounded-3xl border border-[#1A1A1A] space-y-3 shadow-xs">
              <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] block">Tip Your Delivery Partner</span>
              <div className="flex items-center gap-2">
                {[20, 30, 50, 100].map((tip) => (
                  <button
                    key={tip}
                    onClick={() => setTipAmount(tip === tipAmount ? 0 : tip)}
                    className={`flex-1 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-all cursor-pointer ${
                      tipAmount === tip 
                        ? 'bg-[#1A1A1A] text-[#E0FF4F] border-[#1A1A1A]' 
                        : 'bg-[#F3F4F1] text-[#1A1A1A] border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                    }`}
                  >
                    ₹{tip}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white p-5 rounded-3xl border border-[#1A1A1A] space-y-3 shadow-xs">
              <span className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] block">Select Payment Method</span>
              <div className="grid grid-cols-2 gap-2.5">
                {(['UPI / GPay', 'Credit/Debit Card', 'Swiggy Money', 'Cash on Delivery'] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`p-3 rounded-2xl border text-xs font-bold uppercase tracking-tight text-left transition-all cursor-pointer ${
                      paymentMethod === method 
                        ? 'bg-[#1A1A1A] border-[#1A1A1A] text-[#E0FF4F]' 
                        : 'border-[#1A1A1A]/20 bg-[#F3F4F1] hover:border-[#1A1A1A] text-[#1A1A1A]'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Bill Summary */}
            <div className="bg-white p-5 rounded-3xl border border-[#1A1A1A] space-y-2.5 text-xs shadow-xs">
              <h4 className="font-black text-[#1A1A1A] uppercase tracking-wider text-[11px]">Bill Details</h4>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Items Subtotal</span>
                <span>₹{itemsSubtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Consolidated Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700 font-black">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Platform & Packaging Fee</span>
                <span>₹{platformFee}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Taxes & GST (5%)</span>
                <span>₹{taxes}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-black">
                  <span>Coupon Savings ({appliedCoupon})</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              {tipAmount > 0 && (
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Rider Tip</span>
                  <span>₹{tipAmount}</span>
                </div>
              )}
              <div className="border-t border-[#1A1A1A] pt-3 flex justify-between font-black text-base text-[#1A1A1A] uppercase tracking-tight">
                <span>To Pay</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

          </div>
        )}

        {/* Footer Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-[#1A1A1A] bg-white sticky bottom-0 z-10 shadow-lg space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-gray-600 font-bold truncate max-w-[240px]">
                <MapPin className="w-4 h-4 text-[#FC8019] shrink-0" />
                <span className="truncate">{selectedAddress}</span>
              </div>
              <span className="font-black text-lg text-[#1A1A1A]">₹{totalAmount}</span>
            </div>

            <button
              id="confirm-checkout-btn"
              onClick={handleCheckout}
              className="w-full py-4 bg-[#1A1A1A] hover:bg-black text-[#E0FF4F] rounded-full font-black text-sm uppercase tracking-wider shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 border border-[#1A1A1A]"
            >
              <span>Place Order & Pay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
