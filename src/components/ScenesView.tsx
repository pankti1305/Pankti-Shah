import React, { useState } from 'react';
import { Compass, Calendar, MapPin, Ticket, Check, X } from 'lucide-react';
import { SceneEvent } from '../types';

interface ScenesViewProps {
  events: SceneEvent[];
}

export const ScenesView: React.FC<ScenesViewProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<SceneEvent | null>(null);
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      setSelectedEvent(null);
    }, 2500);
  };

  return (
    <div id="scenes-container" className="space-y-6 animate-fadeIn">
      {/* Bento Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1A1A1A] text-white p-6 sm:p-8 shadow-xs border border-[#1A1A1A]">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#E0FF4F] text-[11px] font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#E0FF4F]" />
            <span>SWIGGY SCENES • CURATED FOOD EXPERIENCES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">Food Walks, Masterclasses & <span className="text-[#E0FF4F]">VIP Tasting Tours</span></h1>
          <p className="text-gray-300 text-xs sm:text-sm font-medium">Discover unique culinary events happening across the city with passionate master chefs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-3xl border border-[#1A1A1A] overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-48 overflow-hidden bg-[#F3F4F1] border-b border-[#1A1A1A]">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <span className="absolute top-3 left-3 bg-[#1A1A1A] text-[#E0FF4F] text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#1A1A1A]">{event.category}</span>
                <span className="absolute bottom-3 right-3 bg-[#1A1A1A] text-[#E0FF4F] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-white/20">{event.spotsLeft} spots left</span>
              </div>
              <div className="p-5 space-y-2.5">
                <h3 className="font-black text-[#1A1A1A] text-base uppercase tracking-tight">{event.title}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-2">{event.tagline}</p>
                <div className="space-y-1 text-xs text-gray-600 font-medium pt-2">
                  <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#FC8019]" /><span>{event.date} • {event.time}</span></div>
                  <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#FC8019]" /><span>{event.location}</span></div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#F3F4F1] border-t border-[#1A1A1A] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider">Pass Price</span>
                <p className="text-base font-black text-[#1A1A1A]">₹{event.price}</p>
              </div>
              <button onClick={() => setSelectedEvent(event)} className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#FC8019] text-white rounded-full text-xs font-black uppercase tracking-wider cursor-pointer border border-[#1A1A1A] transition-colors">
                Book Pass →
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-[#1A1A1A]">
            <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            {booked ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-[#1A1A1A] text-[#E0FF4F] rounded-full flex items-center justify-center mx-auto border border-[#1A1A1A]"><Check className="w-7 h-7" /></div>
                <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">Pass Confirmed!</h3>
                <p className="text-xs text-gray-600 font-medium">Ticket sent to your registered email for {selectedEvent.title}.</p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">{selectedEvent.category}</span>
                  <h3 className="text-base font-black uppercase tracking-tight text-[#1A1A1A]">{selectedEvent.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">{selectedEvent.date} • {selectedEvent.time}</p>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed bg-[#F3F4F1] p-3 rounded-2xl border border-[#1A1A1A]/10 font-medium">{selectedEvent.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-black text-[#1A1A1A]">₹{selectedEvent.price}</span>
                  <button onClick={handleBook} className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-black text-[#E0FF4F] rounded-full font-black text-xs uppercase tracking-wider cursor-pointer border border-[#1A1A1A]">
                    Pay & Confirm Ticket
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
