import React from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, Compass, ShieldCheck, Zap } from 'lucide-react';
import MultiStepPlanner from '../components/trip/MultiStepPlanner';

export const PlannerPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const prefilledDestination = searchParams.get('destination') || '';

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-50 border border-coral-200 text-coral-600 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          AI Travel Planner Wizard
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 font-sans tracking-tight">
          Craft Your Perfect Itinerary
        </h1>

        <p className="text-sm text-slate-500 leading-relaxed">
          Follow our 8-step journey planner. We analyze seasonality, local activities, transit times, and dining recommendations tailored to your budget.
        </p>
      </div>

      {/* Feature Highlights Pills */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          Powered by Gemini AI
        </span>
        <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Smart Budget Calculation
        </span>
        <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200/60 shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-turquoise-500" />
          Day-by-Day Geolocation Routes
        </span>
      </div>

      {/* Multi-step Form Component */}
      <MultiStepPlanner initialDestination={prefilledDestination} />
    </div>
  );
};

export default PlannerPage;
