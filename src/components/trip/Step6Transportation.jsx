import React from 'react';
import { Plane, Train, Bus, Car, Key } from 'lucide-react';

const transportOptions = [
  { id: 'Flight', label: 'Commercial Flight', icon: Plane, desc: 'Fastest for long distances and international trips' },
  { id: 'Train', label: 'Scenic Train / Rail', icon: Train, desc: 'Eco-friendly, comfortable & panoramic views' },
  { id: 'Bus', label: 'Express Coach / Bus', icon: Bus, desc: 'Budget-friendly intercity connections' },
  { id: 'Car', label: 'Personal Car / Road Trip', icon: Car, desc: 'Freedom of the open road at your own pace' },
  { id: 'Rental vehicle', label: 'Rental Vehicle', icon: Key, desc: 'Pick up at airport/station for local flexibility' },
];

export const Step6Transportation = ({ formData, updateFormData }) => {
  const current = formData.transportation || 'Flight';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-navy-950 font-sans">Primary Transportation</h3>
        <p className="text-xs text-slate-500 mt-1">
          How do you prefer getting to and between key destinations?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {transportOptions.map((opt) => {
          const Icon = opt.icon;
          const isSelected = current === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => updateFormData({ transportation: opt.id })}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-coral-500 bg-coral-50/40 shadow-sm ring-1 ring-coral-500'
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
                  <h4 className="text-sm font-bold text-navy-950">{opt.label}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug">{opt.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Step6Transportation;
