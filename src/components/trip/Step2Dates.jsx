import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { calculateDaysCount } from '../../utils/formatters';

export const Step2Dates = ({ formData, updateFormData }) => {
  const today = new Date().toISOString().split('T')[0];

  const handleStartDateChange = (val) => {
    updateFormData({ startDate: val });
    if (formData.endDate && new Date(val) > new Date(formData.endDate)) {
      updateFormData({ startDate: val, endDate: val });
    }
  };

  const daysCount = calculateDaysCount(formData.startDate, formData.endDate);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-navy-950 font-sans">When are you traveling?</h3>
        <p className="text-xs text-slate-500 mt-1">
          Select your departure and return dates. We will automatically calculate the day-by-day duration.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Departure Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-coral-500" />
            <input
              type="date"
              required
              min={today}
              value={formData.startDate || ''}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:border-coral-500 focus:bg-white transition-all font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Return Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-turquoise-600" />
            <input
              type="date"
              required
              min={formData.startDate || today}
              value={formData.endDate || ''}
              onChange={(e) => updateFormData({ endDate: e.target.value })}
              className="w-full pl-11 pr-4 py-3.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:border-coral-500 focus:bg-white transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* Auto-calculated Duration Pill */}
      {formData.startDate && formData.endDate && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-turquoise-50 to-blue-50 border border-turquoise-200/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-turquoise-500 text-white flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-turquoise-900 font-semibold">Total Trip Duration</p>
              <p className="text-lg font-bold text-navy-950 font-sans">
                {daysCount} {daysCount === 1 ? 'Day' : 'Days'} ({daysCount - 1} Nights)
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-white rounded-full text-turquoise-700 shadow-sm border border-turquoise-100">
            Auto-calculated
          </span>
        </div>
      )}
    </div>
  );
};

export default Step2Dates;
