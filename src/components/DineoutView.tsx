import React, { useState } from 'react';
import { 
  Percent, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  Check, 
  Sparkles,
  UtensilsCrossed,
  X
} from 'lucide-react';
import { DineoutVenue } from '../types';

interface DineoutViewProps {
  venues: DineoutVenue[];
}

export const DineoutView: React.FC<DineoutViewProps> = ({ venues }) => {
  const [selectedVenue, setSelectedVenue] = useState<DineoutVenue | null>(null);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [bookingTime, setBookingTime] = useState<string>('8:00 PM');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const handleBookTable = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedVenue(null);
    }, 2800);
  };

  return (
    <div id="dineout-container" className="space-y-6 animate-fadeIn">
      {/* Bento Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1A1A1A] text-white p-6 sm:p-8 shadow-xs border border-[#1A1A1A]">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#E0FF4F] text-[11px] font-black uppercase tracking-wider">
            <Percent className="w-3.5 h-3.5 text-[#E0FF4F]" />
            <span>SWIGGY DINEOUT • EXCLUSIVE DINING OFFERS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
            Book Tables & Save up to <span className="text-[#E0FF4F]">30% OFF</span> Total Bills!
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm font-medium">
            Instant confirmed table reservations at top-rated breweries, rooftop lounges, and gourmet bistros across the city.
          </p>
        </div>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            id={`dineout-venue-${venue.id}`}
            className="bg-white rounded-3xl border border-[#1A1A1A] overflow-hidden shadow-xs hover:shadow-xl transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-[#F3F4F1] border-b border-[#1A1A1A]">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-3 right-3 bg-[#1A1A1A] text-[#E0FF4F] text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#1A1A1A]">
                  <Star className="w-3.5 h-3.5 fill-[#E0FF4F]" />
                  <span>{venue.rating}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="bg-[#1A1A1A] text-[#E0FF4F] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1 border border-white/20">
                    <Percent className="w-3.5 h-3.5 text-[#E0FF4F]" />
                    <span>{venue.offer}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <h3 className="font-black text-[#1A1A1A] text-base uppercase tracking-tight">{venue.name}</h3>
                <p className="text-xs text-gray-500 font-medium line-clamp-1">{venue.cuisine}</p>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="flex items-center gap-1 text-gray-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#FC8019]" />
                    {venue.area}
                  </span>
                  <span className="font-black text-[#1A1A1A]">₹{venue.costForTwo} for two</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {venue.features.slice(0, 3).map((f) => (
                    <span key={f} className="text-[10px] bg-[#F3F4F1] border border-[#1A1A1A]/10 text-[#1A1A1A] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-tight">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#F3F4F1] border-t border-[#1A1A1A] flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">{venue.timings}</span>
              <button
                onClick={() => setSelectedVenue(venue)}
                className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#FC8019] text-white rounded-full text-xs font-black uppercase tracking-wider shadow-xs cursor-pointer transition-colors border border-[#1A1A1A]"
              >
                Book Table →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedVenue && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scaleUp relative border border-[#1A1A1A]">
            <button
              onClick={() => setSelectedVenue(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 bg-[#1A1A1A] text-[#E0FF4F] rounded-full flex items-center justify-center mx-auto border border-[#1A1A1A] animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-[#1A1A1A]">Table Confirmed!</h3>
                <p className="text-xs text-gray-600 font-medium">
                  Reserved for <strong>{guestCount} Guests</strong> at <strong>{selectedVenue.name}</strong> today at <strong>{bookingTime}</strong>.
                </p>
                <div className="bg-[#E0FF4F] border border-[#1A1A1A] text-[#1A1A1A] text-xs font-black uppercase tracking-wider p-3 rounded-2xl">
                  {selectedVenue.offer} applied to your bill!
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Table Reservation</span>
                  <h3 className="text-lg font-black uppercase tracking-tight text-[#1A1A1A]">{selectedVenue.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">{selectedVenue.area} • {selectedVenue.offer}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] block mb-1.5">Number of Guests</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 4, 6, 8].map((count) => (
                        <button
                          key={count}
                          onClick={() => setGuestCount(count)}
                          className={`flex-1 py-2 rounded-full text-xs font-black uppercase tracking-wider border transition-all cursor-pointer ${
                            guestCount === count
                              ? 'bg-[#1A1A1A] text-[#E0FF4F] border-[#1A1A1A]'
                              : 'bg-[#F3F4F1] text-gray-700 border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                          }`}
                        >
                          {count} {count === 1 ? 'Guest' : 'Guests'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] block mb-1.5">Select Time Slot (Today)</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setBookingTime(slot)}
                          className={`py-2 rounded-full text-xs font-bold uppercase tracking-tight border transition-all cursor-pointer ${
                            bookingTime === slot
                              ? 'bg-[#1A1A1A] text-[#E0FF4F] border-[#1A1A1A]'
                              : 'bg-[#F3F4F1] text-gray-700 border-[#1A1A1A]/20 hover:border-[#1A1A1A]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBookTable}
                  className="w-full py-3.5 bg-[#1A1A1A] hover:bg-black text-[#E0FF4F] rounded-full font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer mt-4 border border-[#1A1A1A]"
                >
                  Confirm Free Reservation
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
