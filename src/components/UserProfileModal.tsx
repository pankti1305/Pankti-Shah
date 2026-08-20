import React from 'react';
import { 
  User, 
  Wallet, 
  MapPin, 
  Clock, 
  Sparkles, 
  X, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Order } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  walletBalance: number;
  onSelectOrder: (order: Order) => void;
  selectedAddress: string;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  orders,
  walletBalance,
  onSelectOrder,
  selectedAddress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#1A1A1A]">
        
        {/* Header */}
        <div className="p-6 bg-[#1A1A1A] text-white space-y-4 border-b border-[#1A1A1A]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-[#E0FF4F] uppercase tracking-widest">My Account</span>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-full cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-3xl bg-[#E0FF4F] border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] text-xl font-black shadow-lg">
              P
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg uppercase tracking-tight">Pankti Shah</h3>
                <span className="bg-white/10 border border-white/20 text-[#E0FF4F] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  ONE VIP
                </span>
              </div>
              <p className="text-xs text-gray-400 font-medium">+91 98765 43210 • pankti1305@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto bg-[#F3F4F1]">
          
          {/* Swiggy Money Wallet (Receives Instant Refunds) */}
          <div className="bg-[#1A1A1A] border border-[#1A1A1A] rounded-3xl p-5 text-white shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black flex items-center gap-1.5 uppercase tracking-wider text-[#E0FF4F]">
                <Wallet className="w-4 h-4" />
                <span>Swiggy Money Balance</span>
              </span>
              <span className="text-[9px] bg-white/10 text-white border border-white/20 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">Instant Refund Ready</span>
            </div>
            <div className="flex items-baseline justify-between pt-1">
              <span className="text-3xl font-black text-white">₹{walletBalance}</span>
              <span className="text-xs text-gray-400 font-medium">Auto-credited on cancellations</span>
            </div>
          </div>

          {/* Active / Past Orders History */}
          <div className="space-y-3">
            <h4 className="font-black text-[#1A1A1A] text-sm uppercase tracking-tight flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#FC8019]" />
              <span>My Orders ({orders.length})</span>
            </h4>

            {orders.length === 0 ? (
              <p className="text-xs text-gray-500 font-medium py-4 text-center">No orders placed yet.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => onSelectOrder(ord)}
                    className="p-4 rounded-3xl border border-[#1A1A1A] hover:shadow-md transition-all cursor-pointer bg-white space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-[#1A1A1A] uppercase">Order #{ord.id.slice(-6)}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        ord.status === 'delivered' 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                          : ord.status === 'cancelled' 
                          ? 'bg-red-100 text-red-800 border-red-300' 
                          : 'bg-[#E0FF4F] text-[#1A1A1A] border-[#1A1A1A] animate-pulse'
                      }`}>
                        {ord.status.toUpperCase().replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 font-medium truncate">
                      {ord.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1A1A1A]/10 text-xs">
                      <span className="text-gray-500 font-bold">₹{ord.pricing.totalAmount} • {ord.paymentMethod}</span>
                      <span className="text-[#1A1A1A] font-black uppercase tracking-tight flex items-center gap-0.5">
                        <span>Track / Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delivery Address */}
          <div className="bg-white rounded-3xl p-4 border border-[#1A1A1A] space-y-2 text-xs">
            <h4 className="font-black uppercase tracking-tight text-[#1A1A1A] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#FC8019]" />
              <span>Primary Address</span>
            </h4>
            <p className="text-gray-600 font-medium leading-relaxed">{selectedAddress}</p>
          </div>

        </div>
      </div>
    </div>
  );
};
