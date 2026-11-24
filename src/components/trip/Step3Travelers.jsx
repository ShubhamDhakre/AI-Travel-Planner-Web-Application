import React from 'react';
import { User, Users, Heart, Baby } from 'lucide-react';

const travelerTypes = [
  { id: 'Solo', label: 'Solo Traveler', icon: User, desc: 'Exploring the world independently' },
  { id: 'Couple', label: 'Couple / Duo', icon: Heart, desc: 'Two travelers sharing memories' },
  { id: 'Family', label: 'Family Vacation', icon: Users, desc: 'Traveling with kids & loved ones' },
  { id: 'Friends', label: 'Friends Group', icon: Users, desc: 'Squad getaway or celebration' },
];

export const Step3Travelers = ({ formData, updateFormData }) => {
  const travelers = formData.travelers || { adults: 1, children: 0, type: 'Solo' };

  const handleTypeSelect = (typeId) => {
    let adults = travelers.adults;
    if (typeId === 'Solo') adults = 1;
    if (typeId === 'Couple' && adults < 2) adults = 2;
    updateFormData({
      travelers: {
        ...travelers,
        type: typeId,
        adults,
      },
    });
  };

  const updateCounts = (field, delta) => {
    const current = travelers[field] || 0;
    const updated = Math.max(field === 'adults' ? 1 : 0, current + delta);
    updateFormData({
      travelers: {
        ...travelers,
        [field]: updated,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-navy-950 font-sans">Who is traveling?</h3>
        <p className="text-xs text-slate-500 mt-1">
          Choose your travel group style so AI can optimize activities and room arrangements.
        </p>
      </div>

      {/* Traveler Type Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {travelerTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = travelers.type === type.id;
          return (
            <div
              key={type.id}
              onClick={() => handleTypeSelect(type.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-coral-500 bg-coral-50/40 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-coral-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950">{type.label}</h4>
                  <p className="text-xs text-slate-400">{type.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-slate-700 block">Adults</span>
            <span className="text-xs text-slate-400">Age 13+</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-sm">
            <button
              type="button"
              onClick={() => updateCounts('adults', -1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
            >
              -
            </button>
            <span className="text-sm font-bold w-4 text-center">{travelers.adults}</span>
            <button
              type="button"
              onClick={() => updateCounts('adults', 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-bold text-slate-700 block">Children</span>
            <span className="text-xs text-slate-400">Ages 0 - 12</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-sm">
            <button
              type="button"
              onClick={() => updateCounts('children', -1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
            >
              -
            </button>
            <span className="text-sm font-bold w-4 text-center">{travelers.children || 0}</span>
            <button
              type="button"
              onClick={() => updateCounts('children', 1)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Travelers;
