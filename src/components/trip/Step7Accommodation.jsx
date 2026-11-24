import React from 'react';
import { Building2, Bed, Home, Castle, Wallet, Sparkles } from 'lucide-react';

const accommodations = [
  { id: 'Hotel', label: 'Hotel', icon: Building2, desc: 'Full-service hotels with daily housekeeping' },
  { id: 'Hostel', label: 'Hostel', icon: Bed, desc: 'Social vibe, dorms & private budget rooms' },
  { id: 'Resort', label: 'Resort', icon: Sparkles, desc: 'All-inclusive wellness, pools & spa amenities' },
  { id: 'Airbnb', label: 'Airbnb / Vacation Home', icon: Home, desc: 'Local apartment or villa with kitchen' },
  { id: 'Budget accommodation', label: 'Budget Stay', icon: Wallet, desc: 'Clean, simple guesthouses & motels' },
  { id: 'Luxury accommodation', label: '5-Star Luxury', icon: Castle, desc: 'Ultra-luxurious suites & concierge' },
];

export const Step7Accommodation = ({ formData, updateFormData }) => {
  const current = formData.accommodationPreferences?.type || 'Hotel';

  const handleSelect = (typeId) => {
    updateFormData({
      accommodationPreferences: {
        type: typeId,
        tier: formData.budget?.tier || 'Moderate',
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-navy-950 font-sans">Where do you prefer to stay?</h3>
        <p className="text-xs text-slate-500 mt-1">
          Select your accommodation style so daily itinerary routes and evening dinners can start near your stay.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {accommodations.map((acc) => {
          const Icon = acc.icon;
          const isSelected = current === acc.id;
          return (
            <div
              key={acc.id}
              onClick={() => handleSelect(acc.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-coral-500 bg-coral-50/40 shadow-sm ring-1 ring-coral-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                    isSelected ? 'bg-coral-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-navy-950">{acc.label}</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">{acc.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Step7Accommodation;
