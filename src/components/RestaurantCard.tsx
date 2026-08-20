import React from 'react';
import { Star, Clock, Percent, Sparkles, MapPin } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
  cartCountFromThisRestaurant?: number;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onClick,
  cartCountFromThisRestaurant = 0,
}) => {
  return (
    <div
      id={`restaurant-card-${restaurant.id}`}
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden border border-[#1A1A1A] hover:shadow-xl transition-all duration-200 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Image container */}
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-gray-100 border-b border-[#1A1A1A]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Featured Offer Banner */}
        {restaurant.featuredOffer && (
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-[#1A1A1A] border border-white/20 text-[#E0FF4F] text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            <Percent className="w-3 h-3 text-[#E0FF4F]" />
            <span>{restaurant.featuredOffer}</span>
          </div>
        )}

        {/* Swiggy One Exclusive Tag */}
        {restaurant.isSwiggyOneExclusive && (
          <div className="absolute top-2.5 left-2.5 bg-[#FC8019] text-white border border-[#1A1A1A] text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>ONE VIP</span>
          </div>
        )}

        {/* Pure Veg Badge */}
        {restaurant.isPureVeg && (
          <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white border border-[#1A1A1A] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Pure Veg</span>
          </div>
        )}

        {/* In Cart Indicator */}
        {cartCountFromThisRestaurant > 0 && (
          <div className="absolute bottom-2.5 right-2.5 bg-[#E0FF4F] text-[#1A1A1A] border border-[#1A1A1A] text-[11px] font-black px-3 py-1 rounded-full shadow-md animate-bounce flex items-center gap-1 uppercase tracking-tight">
            <span>✓ {cartCountFromThisRestaurant} in Cart</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-extrabold text-[#1A1A1A] text-base group-hover:text-[#FC8019] transition-colors line-clamp-1 uppercase tracking-tight">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-[#1A1A1A] text-[#E0FF4F] border border-[#1A1A1A] text-xs font-black px-2 py-0.5 rounded-full shrink-0 shadow-xs">
              <Star className="w-3 h-3 fill-[#E0FF4F]" />
              <span>{restaurant.rating}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 font-medium">
            {restaurant.cuisines.join(', ')}
          </p>
        </div>

        <div className="pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs text-gray-700 font-bold">
          <div className="flex items-center gap-1 text-[#1A1A1A]">
            <Clock className="w-3.5 h-3.5 text-[#FC8019]" />
            <span>{restaurant.deliveryTimeMinutes} mins</span>
          </div>
          <span className="opacity-30">•</span>
          <div className="flex items-center gap-1 text-gray-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>{restaurant.area}</span>
          </div>
          <span className="opacity-30">•</span>
          <span className="text-[#1A1A1A] font-black">₹{restaurant.priceForTwo} for two</span>
        </div>
      </div>
    </div>
  );
};
