import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Compass,
  MapPin,
  Wallet,
  Sparkles,
  Navigation,
  ArrowRight,
  Bookmark,
  Share2,
} from 'lucide-react';
import { useTrip } from '../hooks/useTrip';
import tripService from '../services/tripService';
import TripOverview from '../components/itinerary/TripOverview';
import DayTimeline from '../components/itinerary/DayTimeline';
import MapSection from '../components/itinerary/MapSection';
import WeatherWidget from '../components/itinerary/WeatherWidget';
import ExpenseCalculator from '../components/budget/ExpenseCalculator';
import { ItinerarySkeleton } from '../components/common/Skeleton';

export const ItineraryPage = () => {
  const { id } = useParams();
  const { currentTrip, setCurrentTrip } = useTrip();

  const [trip, setTrip] = useState(currentTrip);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary', 'map', 'budget'

  useEffect(() => {
    const loadTrip = async () => {
      if (id) {
        try {
          setLoading(true);
          const res = await tripService.getTripById(id);
          if (res.success && res.data) {
            setTrip(res.data);
            setCurrentTrip(res.data);
          }
        } catch (err) {
          console.warn('Could not load specific trip by ID:', err.message);
        } finally {
          setLoading(false);
        }
      } else if (currentTrip) {
        setTrip(currentTrip);
      }
    };
    loadTrip();
  }, [id, currentTrip]);

  if (loading) {
    return (
      <div className="py-12 px-4 max-w-5xl mx-auto">
        <ItinerarySkeleton />
      </div>
    );
  }

  // Empty state if no trip generated yet
  if (!trip || !trip.itinerary || trip.itinerary.length === 0) {
    return (
      <div className="py-24 px-4 text-center max-w-lg mx-auto space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-coral-50 text-coral-500 flex items-center justify-center mx-auto shadow-sm">
          <Compass className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-navy-950 font-sans">No Active Itinerary Found</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          You haven't generated or loaded an itinerary yet. Tell our AI where you want to travel, and we'll create a complete day-by-day plan in seconds!
        </p>
        <div>
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-coral-500 hover:bg-coral-600 shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Plan a Trip with AI
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* 1. Trip Overview Ribbon */}
      <TripOverview trip={trip} />

      {/* 2. Tab Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 no-print">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'itinerary'
                ? 'bg-navy-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Daily Itinerary
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'map'
                ? 'bg-navy-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100'
            }`}
          >
            <Navigation className="w-4 h-4" />
            Interactive Route Map
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'budget'
                ? 'bg-navy-950 text-white shadow-sm'
                : 'text-slate-600 hover:text-navy-950 hover:bg-slate-100'
            }`}
          >
            <Wallet className="w-4 h-4" />
            Budget Breakdown & Calculator
          </button>
        </div>

        <span className="hidden md:inline-block text-xs font-semibold text-slate-400">
          Trip Status: <strong className="text-emerald-600 font-bold">{trip.status || 'Planning'}</strong>
        </span>
      </div>

      {/* 3. Tab Contents */}
      {activeTab === 'itinerary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DayTimeline itinerary={trip.itinerary} currency={trip.budget?.currency} />
          </div>

          <div className="space-y-6">
            <WeatherWidget weatherInfo={trip.weatherInfo} destination={trip.destination} />
            <MapSection itinerary={trip.itinerary} destinationName={trip.destination} />
          </div>
        </div>
      )}

      {activeTab === 'map' && (
        <div className="space-y-6">
          <MapSection itinerary={trip.itinerary} destinationName={trip.destination} />
        </div>
      )}

      {activeTab === 'budget' && (
        <div className="space-y-6">
          <ExpenseCalculator trip={trip} />
        </div>
      )}
    </div>
  );
};

export default ItineraryPage;
