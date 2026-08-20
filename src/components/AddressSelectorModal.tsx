import React from 'react';
import { MapPin, X, Check, Plus, Home, Briefcase } from 'lucide-react';
import { INITIAL_USER_ADDRESSES } from '../data/mockData';

interface AddressSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAddress: string;
  onSelectAddress: (address: string) => void;
}

export const AddressSelectorModal: React.FC<AddressSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedAddress,
  onSelectAddress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-[#1A1A1A]">
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#FC8019]" />
            <h3 className="font-black uppercase tracking-tight text-[#1A1A1A] text-base">Select Delivery Location</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-[#1A1A1A] p-1 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {INITIAL_USER_ADDRESSES.map((addr) => {
            const isSelected = selectedAddress === addr.address;
            return (
              <div
                key={addr.id}
                onClick={() => {
                  onSelectAddress(addr.address);
                  onClose();
                }}
                className={`p-4 rounded-3xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isSelected ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-sm' : 'border-[#1A1A1A]/10 bg-[#F3F4F1] hover:border-[#1A1A1A]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                    isSelected ? 'bg-[#E0FF4F] text-[#1A1A1A] border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/20'
                  }`}>
                    {addr.tag === 'Home' ? <Home className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className={`font-black uppercase tracking-tight text-xs sm:text-sm ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>{addr.title}</h4>
                    <p className={`text-xs leading-snug mt-0.5 font-medium ${isSelected ? 'text-gray-300' : 'text-gray-600'}`}>{addr.address}</p>
                    <p className={`text-[11px] mt-1 font-bold ${isSelected ? 'text-[#E0FF4F]' : 'text-gray-400'}`}>{addr.receiverName} • {addr.receiverPhone}</p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#E0FF4F] text-[#1A1A1A] border border-[#1A1A1A] flex items-center justify-center shrink-0 font-black">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
