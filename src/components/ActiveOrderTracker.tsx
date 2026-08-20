import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  ShieldAlert, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Utensils,
  Navigation
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface ActiveOrderTrackerProps {
  order: Order;
  onClose: () => void;
  onCancelOrder: (orderId: string, reason: string) => void;
  onOpenSupportForOrder: (order: Order) => void;
}

export const ActiveOrderTracker: React.FC<ActiveOrderTrackerProps> = ({
  order,
  onClose,
  onCancelOrder,
  onOpenSupportForOrder,
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    const diff = Math.max(0, Math.floor((order.cancellationDeadline - Date.now()) / 1000));
    return diff;
  });
  const [showCancelSurvey, setShowCancelSurvey] = useState(false);
  const [selectedReason, setSelectedReason] = useState('Accidentally placed the order');
  const [activeRestaurantTab, setActiveRestaurantTab] = useState(0);

  // 120-Second Countdown Effect
  useEffect(() => {
    if (order.status === 'cancelled' || order.status === 'delivered') return;

    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.floor((order.cancellationDeadline - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [order.cancellationDeadline, order.status]);

  const canCancel = secondsRemaining > 0 && order.status !== 'cancelled' && order.status !== 'delivered';

  const cancellationReasons = [
    'Accidentally placed the order',
    'Forgot to add items from another restaurant',
    'Applied wrong address / phone number',
    'Delivery time is higher than expected',
    'Changed my mind'
  ];

  const handleConfirmCancellation = () => {
    onCancelOrder(order.id, selectedReason);
    setShowCancelSurvey(false);
  };

  const stages: { key: OrderStatus; label: string; timeText: string }[] = [
    { key: 'placed', label: 'Order Confirmed', timeText: 'Instant' },
    { key: 'cooking', label: 'Kitchen Preparing', timeText: '8 mins' },
    { key: 'picked_up', label: 'Rider Picked Up', timeText: '14 mins' },
    { key: 'out_for_delivery', label: 'On The Way', timeText: `${order.deliveryEtaMinutes} mins` },
    { key: 'delivered', label: 'Delivered', timeText: 'Enjoy food!' },
  ];

  const getStageIndex = (status: OrderStatus) => {
    if (status === 'placed' || status === 'confirmed') return 0;
    if (status === 'cooking') return 1;
    if (status === 'picked_up') return 2;
    if (status === 'out_for_delivery') return 3;
    if (status === 'delivered') return 4;
    return -1;
  };

  const currentStageIndex = getStageIndex(order.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto border border-[#1A1A1A]">
        
        {/* Bento Header */}
        <div className="p-4 sm:px-6 bg-[#1A1A1A] text-white flex items-center justify-between border-b border-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#E0FF4F]">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-black text-base uppercase tracking-tight">Live Order Telemetry</h2>
              <p className="text-xs text-gray-400 font-medium">Order #{order.id.slice(-6)} • {order.items.length} items</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 120-Second Instant Cancellation Banner */}
        {order.status === 'cancelled' ? (
          <div className="bg-red-50 border-b border-[#1A1A1A] p-4 text-red-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div className="text-xs">
                <p className="font-black uppercase">Order Cancelled</p>
                <p className="text-red-700 font-medium">100% Full Refund of ₹{order.pricing.totalAmount} processed to Swiggy Money / UPI.</p>
              </div>
            </div>
            <span className="bg-red-200 text-red-950 border border-red-400 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">REFUNDED</span>
          </div>
        ) : canCancel ? (
          <div className="bg-[#E0FF4F] border-b border-[#1A1A1A] p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#1A1A1A]">
            <div className="flex items-center gap-3 text-xs">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-[#E0FF4F] font-black flex items-center justify-center text-sm shadow-md animate-pulse">
                {secondsRemaining}s
              </div>
              <div>
                <p className="font-black uppercase tracking-tight flex items-center gap-1.5">
                  <span>120-Second Grace Period Active</span>
                  <span className="text-[9px] bg-[#1A1A1A] text-white px-2 py-0.5 rounded-full font-black uppercase">100% REFUND</span>
                </p>
                <p className="text-gray-800 text-[11px] font-medium">You can cancel with 1-click before kitchen starts preparing.</p>
              </div>
            </div>

            <button
              id="instant-cancel-btn"
              onClick={() => setShowCancelSurvey(true)}
              className="px-4 py-2 bg-[#1A1A1A] hover:bg-red-600 text-white rounded-full text-xs font-black uppercase tracking-wider shadow-xs cursor-pointer transition-all whitespace-nowrap border border-[#1A1A1A]"
            >
              Cancel Order Now
            </button>
          </div>
        ) : null}

        {/* Multi-Restaurant Selector Tabs if > 1 Restaurant */}
        {order.restaurantBreakdown.length > 1 && (
          <div className="bg-[#F3F4F1] border-b border-[#1A1A1A] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 overflow-x-auto">
            <div className="flex items-center gap-1.5 text-xs text-[#1A1A1A] font-black uppercase tracking-tight">
              <Sparkles className="w-4 h-4 text-[#FC8019]" />
              <span>Multi-Restaurant Order:</span>
            </div>
            <div className="flex items-center gap-1.5">
              {order.restaurantBreakdown.map((rest, index) => (
                <button
                  key={rest.restaurantId}
                  onClick={() => setActiveRestaurantTab(index)}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeRestaurantTab === index
                      ? 'bg-[#1A1A1A] text-[#E0FF4F] border-[#1A1A1A] shadow-xs'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#1A1A1A]'
                  }`}
                >
                  {rest.restaurantName}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Visual Map Simulator */}
        <div className="relative h-56 bg-[#F3F4F1] overflow-hidden border-b border-[#1A1A1A]">
          <svg className="w-full h-full" viewBox="0 0 600 240" fill="none">
            {/* Map Roads and Terrain */}
            <rect width="600" height="240" fill="#EAECE8" />
            <path d="M0 60 Q 200 80, 400 50 T 600 70" stroke="#D1D5DB" strokeWidth="16" strokeLinecap="round" />
            <path d="M120 0 V 240" stroke="#D1D5DB" strokeWidth="12" />
            <path d="M480 0 V 240" stroke="#D1D5DB" strokeWidth="12" />
            <path d="M80 180 Q 300 210, 520 160" stroke="#D1D5DB" strokeWidth="14" />
            
            {/* Active Delivery Route Line */}
            <path 
              d="M 120 65 Q 260 90, 420 150 T 480 190" 
              stroke="#1A1A1A" 
              strokeWidth="5" 
              strokeDasharray="6 6"
              className="animate-pulse"
            />

            {/* Restaurant Pin */}
            <g transform="translate(110, 45)">
              <circle cx="10" cy="10" r="14" fill="#FC8019" stroke="#1A1A1A" strokeWidth="2" />
              <text x="10" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">🏪</text>
            </g>

            {/* Customer Home Pin */}
            <g transform="translate(470, 170)">
              <circle cx="10" cy="10" r="14" fill="#10B981" stroke="#1A1A1A" strokeWidth="2" />
              <text x="10" y="14" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">🏠</text>
            </g>

            {/* Moving Delivery Partner Marker */}
            {order.status !== 'cancelled' && (
              <g transform="translate(280, 105)">
                <circle cx="12" cy="12" r="18" fill="#1A1A1A" />
                <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12">🛵</text>
                <circle cx="12" cy="12" r="22" stroke="#E0FF4F" strokeWidth="2" fill="none" opacity="0.8" className="animate-ping" />
              </g>
            )}
          </svg>

          {/* Floating ETA Badge */}
          <div className="absolute top-3 left-3 bg-[#1A1A1A] text-white px-4 py-2 rounded-2xl shadow-md border border-[#1A1A1A] flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#E0FF4F]" />
            <div>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Estimated Arrival</p>
              <p className="text-sm font-black text-[#E0FF4F] uppercase tracking-tight">
                {order.status === 'delivered' ? 'Delivered!' : order.status === 'cancelled' ? 'Cancelled' : `${order.deliveryEtaMinutes} Mins`}
              </p>
            </div>
          </div>
        </div>

        {/* Multi-Step Timeline */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-3 h-0.5 bg-gray-200 -z-0" />
            <div 
              className="absolute left-0 top-3 h-0.5 bg-[#1A1A1A] transition-all duration-500 -z-0" 
              style={{ width: `${Math.max(0, (currentStageIndex / (stages.length - 1)) * 100)}%` }}
            />

            {stages.map((st, idx) => {
              const isPassed = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div key={st.key} className="flex flex-col items-center text-center space-y-1 relative z-10">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-[#1A1A1A] text-[#E0FF4F] ring-4 ring-[#E0FF4F] scale-110 shadow-md'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-tight max-w-[70px] leading-tight ${isPassed ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Rider Details Card */}
          {order.status !== 'cancelled' && (
            <div className="bg-[#F3F4F1] rounded-2xl p-4 border border-[#1A1A1A] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={order.rider.photo}
                  alt={order.rider.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#1A1A1A] shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-extrabold text-xs sm:text-sm text-[#1A1A1A] uppercase tracking-tight">{order.rider.name}</p>
                    <span className="text-[10px] font-black bg-[#1A1A1A] text-[#E0FF4F] px-2 py-0.5 rounded-full">
                      ★ {order.rider.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">Delivery Partner • {order.rider.vehicleNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Calling delivery partner ${order.rider.name} at ${order.rider.phone}...`)}
                  className="w-9 h-9 rounded-full bg-[#1A1A1A] hover:bg-black text-white flex items-center justify-center shadow-xs cursor-pointer transition-colors border border-[#1A1A1A]"
                  title="Call Partner"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenSupportForOrder(order)}
                  className="px-3.5 py-2 bg-[#1A1A1A] hover:bg-[#FC8019] text-white rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors shadow-xs border border-[#1A1A1A]"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Support</span>
                </button>
              </div>
            </div>
          )}

          {/* Items Summary in this Order */}
          <div className="border-t border-[#1A1A1A]/10 pt-3 text-xs space-y-2">
            <h4 className="font-black uppercase tracking-tight text-[#1A1A1A]">Order Summary</h4>
            <div className="divide-y divide-[#1A1A1A]/10 max-h-32 overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div key={item.id} className="py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
                    <span className="font-bold text-[#1A1A1A]">{item.quantity}x {item.name}</span>
                    <span className="text-[10px] text-gray-500 font-medium">({item.restaurantName})</span>
                  </div>
                  <span className="font-black text-[#1A1A1A]">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-black uppercase text-[#1A1A1A] pt-2 border-t border-[#1A1A1A]">
              <span>Total Paid ({order.paymentMethod})</span>
              <span>₹{order.pricing.totalAmount}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Cancellation Reason Modal */}
      {showCancelSurvey && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scaleUp border border-[#1A1A1A]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-black uppercase text-[#1A1A1A] text-base">Why are you cancelling?</h3>
                <p className="text-xs text-gray-500 font-medium">100% of ₹{order.pricing.totalAmount} will be refunded instantly.</p>
              </div>
              <button onClick={() => setShowCancelSurvey(false)} className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto">
              {cancellationReasons.map((reason) => (
                <label
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  className={`flex items-center gap-2 p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                    selectedReason === reason
                      ? 'bg-red-50 border-red-500 font-bold text-red-950'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="cancelReason"
                    checked={selectedReason === reason}
                    onChange={() => {}}
                    className="text-red-600 focus:ring-red-500"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowCancelSurvey(false)}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Don't Cancel
              </button>
              <button
                onClick={handleConfirmCancellation}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs font-black uppercase tracking-wider shadow-md cursor-pointer transition-all border border-[#1A1A1A]"
              >
                Confirm Instant Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
