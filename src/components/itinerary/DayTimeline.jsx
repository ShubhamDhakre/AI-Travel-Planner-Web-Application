import React, { useState } from 'react';
import {
  Sun,
  Sunset,
  Moon,
  Clock,
  Compass,
  Utensils,
  ChevronDown,
  ChevronUp,
  MapPin,
  DollarSign,
  Car,
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const DayTimeline = ({ itinerary = [], currency = 'USD' }) => {
  // All days expanded by default for full visibility
  const [expandedDays, setExpandedDays] = useState(() =>
    itinerary.reduce((acc, curr) => ({ ...acc, [curr.day]: true }), {})
  );

  const toggleDay = (dayNum) => {
    setExpandedDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum],
    }));
  };

  const expandAll = () => {
    const all = {};
    itinerary.forEach((d) => (all[d.day] = true));
    setExpandedDays(all);
  };

  const collapseAll = () => {
    setExpandedDays({});
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-navy-950 font-sans flex items-center gap-2">
          <Compass className="w-5 h-5 text-coral-500" />
          Daily Schedule & Activities
        </h3>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <button onClick={expandAll} className="hover:text-navy-950 px-2 py-1 rounded-md hover:bg-slate-100">
            Expand All
          </button>
          <span>•</span>
          <button onClick={collapseAll} className="hover:text-navy-950 px-2 py-1 rounded-md hover:bg-slate-100">
            Collapse All
          </button>
        </div>
      </div>

      {/* Days Stack */}
      <div className="space-y-4">
        {itinerary.map((dayItem) => {
          const isOpen = !!expandedDays[dayItem.day];
          return (
            <div
              key={dayItem.day}
              className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden transition-all duration-300"
            >
              {/* Day Header Accordion Trigger */}
              <div
                onClick={() => toggleDay(dayItem.day)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-navy-950 to-navy-800 text-white flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-turquoise-400">Day</span>
                    <span className="text-lg font-extrabold leading-none">{dayItem.day}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">{dayItem.date}</span>
                      {dayItem.theme && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-turquoise-50 text-turquoise-700">
                          {dayItem.theme}
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-navy-950 font-sans mt-0.5">{dayItem.title}</h4>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Daily Cost</span>
                    <span className="text-xs font-bold text-navy-950">
                      ~ {formatCurrency(dayItem.dailyEstimatedBudget, currency)}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Day Content */}
              {isOpen && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-4 animate-fade-in">
                  <p className="text-xs text-slate-500 italic mb-3">{dayItem.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Morning */}
                    <div className="bg-amber-50/40 rounded-2xl p-4 border border-amber-100 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                            <Sun className="w-3.5 h-3.5 text-amber-500" />
                            Morning
                          </span>
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full">
                            {formatCurrency(dayItem.morning?.estimatedCost || 20, currency)}
                          </span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {dayItem.morning?.activities?.map((act, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {dayItem.morning?.places && (
                        <div className="mt-3 pt-2 border-t border-amber-200/50 text-[11px] font-medium text-amber-900 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-600 flex-shrink-0" />
                          <span>{dayItem.morning.places.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {/* Afternoon */}
                    <div className="bg-blue-50/40 rounded-2xl p-4 border border-blue-100 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                            <Sunset className="w-3.5 h-3.5 text-blue-500" />
                            Afternoon
                          </span>
                          <span className="text-[10px] font-bold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded-full">
                            {formatCurrency(dayItem.afternoon?.estimatedCost || 35, currency)}
                          </span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {dayItem.afternoon?.activities?.map((act, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {dayItem.afternoon?.lunchRecommendation && (
                        <div className="mt-3 pt-2 border-t border-blue-200/50 text-[11px] font-medium text-blue-900 flex items-center gap-1">
                          <Utensils className="w-3 h-3 text-blue-600 flex-shrink-0" />
                          <span className="truncate">Lunch: {dayItem.afternoon.lunchRecommendation}</span>
                        </div>
                      )}
                    </div>

                    {/* Evening */}
                    <div className="bg-purple-50/40 rounded-2xl p-4 border border-purple-100 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5">
                            <Moon className="w-3.5 h-3.5 text-purple-500" />
                            Evening
                          </span>
                          <span className="text-[10px] font-bold text-purple-800 bg-purple-100/70 px-2 py-0.5 rounded-full">
                            {formatCurrency(dayItem.evening?.estimatedCost || 45, currency)}
                          </span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {dayItem.evening?.activities?.map((act, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {dayItem.evening?.dinnerRecommendation && (
                        <div className="mt-3 pt-2 border-t border-purple-200/50 text-[11px] font-medium text-purple-900 flex items-center gap-1">
                          <Utensils className="w-3 h-3 text-purple-600 flex-shrink-0" />
                          <span className="truncate">Dinner: {dayItem.evening.dinnerRecommendation}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Day Footer Transit */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Car className="w-3.5 h-3.5 text-slate-400" />
                      <span>Transit: {dayItem.transportation || 'Metro & walking'}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{dayItem.travelTime || '35 mins transit'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayTimeline;
