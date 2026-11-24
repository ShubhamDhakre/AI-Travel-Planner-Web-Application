import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Wallet,
  Compass,
  CloudSun,
  Share2,
  Download,
  Bookmark,
  Check,
  Sparkles,
} from 'lucide-react';
import { formatCurrency, formatDate, calculateDaysCount } from '../../utils/formatters';
import { useTrip } from '../../hooks/useTrip';
import { useToast } from '../../hooks/useToast';
import { printItineraryAsPDF } from '../../utils/pdfExport';

export const TripOverview = ({ trip }) => {
  const { saveTrip, currentTrip } = useTrip();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!trip) return null;

  const daysCount = calculateDaysCount(trip.startDate, trip.endDate);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    showToast('Trip link copied to clipboard! Share it with your travel buddies.', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    await saveTrip(trip);
    setSaving(false);
  };

  const handleDownload = () => {
    printItineraryAsPDF(trip);
    showToast('Preparing printable itinerary...', 'info');
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-premium mb-8">
      {/* Cinematic Banner */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-navy-950">
        <img
          src={trip.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80'}
          alt={trip.destination}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>

        {/* Top Badges */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-navy-950 shadow-sm flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-coral-500" />
              {trip.aiProvider || 'TripAI Generator'}
            </span>
            {trip.vibe && (
              <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-semibold bg-turquoise-500/90 backdrop-blur-md text-white shadow-sm">
                {trip.vibe}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-navy-950 text-xs font-bold shadow-md backdrop-blur-md transition-all"
              title="Share Trip"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-navy-950 text-xs font-bold shadow-md backdrop-blur-md transition-all"
              title="Download / Print Itinerary"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold shadow-md transition-all"
            >
              <Bookmark className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Trip'}</span>
            </button>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <span className="text-xs font-bold uppercase tracking-widest text-turquoise-400 block mb-1">
            Personalized Travel Plan
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans drop-shadow-sm">
            {trip.destination}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-2xl line-clamp-2 leading-relaxed">
            {trip.summary || `A tailored ${daysCount}-day discovery designed around your personal travel style.`}
          </p>
        </div>
      </div>

      {/* Trip Meta Ribbon */}
      <div className="p-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-coral-50 text-coral-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Dates</span>
            <span className="text-xs font-bold text-navy-950">
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-turquoise-50 text-turquoise-600 flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
            <span className="text-xs font-bold text-navy-950">
              {daysCount} Days ({daysCount - 1} Nights)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Travelers</span>
            <span className="text-xs font-bold text-navy-950">
              {trip.travelers?.adults || 1} Adults, {trip.travelers?.children || 0} Kids
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Budget</span>
            <span className="text-xs font-bold text-navy-950">
              {formatCurrency(trip.budget?.total, trip.budget?.currency)}
            </span>
          </div>
        </div>

        {/* Weather Info */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200/60 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <CloudSun className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold text-navy-950">{trip.weatherInfo?.temperature || '22°C'}</span>
              <span className="text-[10px] text-slate-500 truncate">{trip.weatherInfo?.condition || 'Pleasant'}</span>
            </div>
            <span className="text-[9px] text-slate-400 block truncate">
              {trip.weatherInfo?.source || 'Seasonal Climate Estimation'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripOverview;
