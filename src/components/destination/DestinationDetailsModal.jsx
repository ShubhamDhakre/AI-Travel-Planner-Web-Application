import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  CheckCircle2,
  Utensils,
  Lightbulb,
  Compass,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { formatCurrency } from '../../utils/formatters';

export const DestinationDetailsModal = ({ destination, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!destination) return null;

  const gallery = destination.gallery && destination.gallery.length > 0
    ? destination.gallery
    : [destination.image];

  const handlePlanNow = () => {
    onClose();
    navigate(`/planner?destination=${encodeURIComponent(`${destination.name}, ${destination.country}`)}`);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${destination.name}, ${destination.country}`} maxWidth="max-w-4xl">
      <div className="space-y-6">
        {/* Gallery Carousel */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
          <img
            src={gallery[activeImageIndex]}
            alt={`${destination.name} photo ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeImageIndex ? 'bg-coral-500 w-4' : 'bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-navy-950 flex items-center gap-1 shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
            {destination.rating || 4.8} ({destination.reviewsCount || 120} reviews)
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Best Time</span>
            <span className="text-xs font-bold text-slate-700">{destination.bestTimeToVisit}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg. Budget</span>
            <span className="text-xs font-bold text-slate-700">
              {formatCurrency(destination.averageBudget?.amount, destination.averageBudget?.currency)} ({destination.averageBudget?.level})
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Continent</span>
            <span className="text-xs font-bold text-slate-700">{destination.continent || 'Global'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Styles</span>
            <span className="text-xs font-bold text-slate-700">{destination.categories?.slice(0, 2).join(', ')}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-bold text-navy-950 uppercase tracking-wider mb-2">Overview</h4>
          <p className="text-sm text-slate-600 leading-relaxed">{destination.description}</p>
        </div>

        {/* Popular Attractions */}
        {destination.attractions && destination.attractions.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-navy-950 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4 text-turquoise-600" />
              Must-Visit Attractions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.attractions.map((att, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-turquoise-500 flex-shrink-0" />
                  <span>{att}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Local Cuisine & Tips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {destination.localCuisine && (
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                Local Cuisine to Savor
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {destination.localCuisine.map((dish, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {dish}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {destination.travelTips && (
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
              <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
                Expert Travel Tips
              </h4>
              <ul className="space-y-1.5 text-xs text-blue-950">
                {destination.travelTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0"></span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-700"
          >
            Close
          </button>

          <button
            onClick={handlePlanNow}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 shadow-lg shadow-coral-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4" />
            Plan Trip to {destination.name} ✨
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DestinationDetailsModal;
