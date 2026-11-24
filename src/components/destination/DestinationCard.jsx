import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, Calendar, DollarSign, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { useTrip } from '../../hooks/useTrip';

export const DestinationCard = ({ destination, onOpenDetails }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useTrip();
  const favorited = isFavorite(destination._id);

  const handlePlanTrip = (e) => {
    e.stopPropagation();
    navigate(`/planner?destination=${encodeURIComponent(`${destination.name}, ${destination.country}`)}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(destination._id);
  };

  return (
    <div
      onClick={() => onOpenDetails && onOpenDetails(destination)}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            favorited
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-red-500'
          }`}
          title={favorited ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Best time badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-700 flex items-center gap-1 shadow-sm">
          <Calendar className="w-3 h-3 text-turquoise-600" />
          <span>{destination.bestTimeToVisit?.split('(')[0] || destination.bestTimeToVisit}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-turquoise-600 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {destination.country}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{destination.rating || 4.8}</span>
              <span className="text-slate-400 font-normal">({destination.reviewsCount || 100}+)</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-navy-950 font-sans group-hover:text-coral-500 transition-colors">
            {destination.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {destination.description}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {destination.categories?.slice(0, 3).map((cat, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Avg. Budget</span>
            <span className="text-sm font-bold text-navy-950">
              {formatCurrency(destination.averageBudget?.amount, destination.averageBudget?.currency)}
              <span className="text-xs font-normal text-slate-400"> / trip</span>
            </span>
          </div>

          <button
            onClick={handlePlanTrip}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-coral-600 bg-coral-50 hover:bg-coral-500 hover:text-white transition-all shadow-sm"
          >
            <Sparkles className="w-3 h-3" />
            Plan Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
