import React from 'react';
import {
  Compass,
  TreePine,
  Palmtree,
  Mountain,
  Landmark,
  Utensils,
  ShoppingBag,
  Moon,
  Camera,
  Coffee,
  Sparkles,
} from 'lucide-react';

const preferenceList = [
  { id: 'Adventure', icon: Compass, color: 'text-amber-500' },
  { id: 'Nature', icon: TreePine, color: 'text-emerald-500' },
  { id: 'Beaches', icon: Palmtree, color: 'text-cyan-500' },
  { id: 'Mountains', icon: Mountain, color: 'text-indigo-500' },
  { id: 'Historical places', icon: Landmark, color: 'text-amber-700' },
  { id: 'Culture', icon: Sparkles, color: 'text-purple-500' },
  { id: 'Food', icon: Utensils, color: 'text-red-500' },
  { id: 'Shopping', icon: ShoppingBag, color: 'text-pink-500' },
  { id: 'Nightlife', icon: Moon, color: 'text-violet-500' },
  { id: 'Photography', icon: Camera, color: 'text-blue-500' },
  { id: 'Relaxation', icon: Coffee, color: 'text-teal-500' },
  { id: 'Spiritual places', icon: Landmark, color: 'text-orange-500' },
];

export const Step5Preferences = ({ formData, updateFormData }) => {
  const selected = formData.travelPreferences || ['Culture', 'Food'];

  const togglePreference = (id) => {
    let updated;
    if (selected.includes(id)) {
      updated = selected.filter((p) => p !== id);
    } else {
      updated = [...selected, id];
    }
    updateFormData({ travelPreferences: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-navy-950 font-sans">What are your travel preferences?</h3>
        <p className="text-xs text-slate-500 mt-1">
          Select all that interest you. AI will weave these themes into your daily itinerary.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {preferenceList.map((pref) => {
          const Icon = pref.icon;
          const isSelected = selected.includes(pref.id);
          return (
            <button
              key={pref.id}
              type="button"
              onClick={() => togglePreference(pref.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-coral-500 bg-coral-50/50 shadow-sm ring-1 ring-coral-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                  isSelected ? 'bg-coral-500 text-white' : 'bg-slate-100 ' + pref.color
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-bold ${isSelected ? 'text-navy-950' : 'text-slate-700'}`}>
                {pref.id}
              </span>
            </button>
          );
        })}
      </div>

      <div className="text-xs text-slate-400">
        Selected: <span className="font-semibold text-slate-700">{selected.length} preferences</span>
      </div>
    </div>
  );
};

export default Step5Preferences;
