import React from 'react';
import { MapPin, Globe, Sparkles } from 'lucide-react';

const popularDestinations = [
  { city: 'Kyoto', country: 'Japan' },
  { city: 'Paris', country: 'France' },
  { city: 'Bali', country: 'Indonesia' },
  { city: 'Rome', country: 'Italy' },
  { city: 'Santorini', country: 'Greece' },
  { city: 'Swiss Alps', country: 'Switzerland' },
  { city: 'Jaipur', country: 'India' },
  { city: 'Dubai', country: 'UAE' },
  { city: 'Banff', country: 'Canada' },
];

export const Step1Destination = ({ formData, updateFormData }) => {
  const handleQuickSelect = (item) => {
    updateFormData({
      destination: `${item.city}, ${item.country}`,
      country: item.country,
      city: item.city,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-navy-950 font-sans">Where do you want to go?</h3>
        <p className="text-xs text-slate-500 mt-1">
          Enter a city, region, or select from trending destinations worldwide.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Destination City or Region *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-coral-500" />
            <input
              type="text"
              required
              value={formData.destination || ''}
              onChange={(e) => updateFormData({ destination: e.target.value })}
              placeholder="e.g. Kyoto, Japan or Amalfi Coast, Italy"
              className="w-full pl-11 pr-4 py-3.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-coral-500 focus:bg-white transition-all shadow-sm font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Departure City (Optional)
          </label>
          <div className="relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={formData.departureCity || ''}
              onChange={(e) => updateFormData({ departureCity: e.target.value })}
              placeholder="e.g. New York, London, Mumbai"
              className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-coral-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Quick Select Chips */}
      <div>
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-turquoise-500" />
          Trending suggestions
        </span>
        <div className="flex flex-wrap gap-2">
          {popularDestinations.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickSelect(item)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                formData.destination?.includes(item.city)
                  ? 'bg-coral-500 border-coral-500 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-coral-300 hover:bg-coral-50/50'
              }`}
            >
              {item.city}, {item.country}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step1Destination;
