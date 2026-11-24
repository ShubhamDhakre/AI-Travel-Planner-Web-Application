import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Wallet,
  Users,
  Copy,
  Trash2,
  ExternalLink,
  Download,
  Share2,
  Sparkles,
  Plus,
  Heart,
  Compass,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTrip } from '../hooks/useTrip';
import { useToast } from '../hooks/useToast';
import { formatCurrency, formatDate, calculateDaysCount } from '../utils/formatters';
import { printItineraryAsPDF } from '../utils/pdfExport';
import DestinationCard from '../components/destination/DestinationCard';
import DestinationDetailsModal from '../components/destination/DestinationDetailsModal';

export const MyTripsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultTab = searchParams.get('tab') || 'all';

  const { isAuthenticated } = useAuth();
  const { trips, favorites, deleteTrip, duplicateTrip, fetchTrips, fetchFavorites, loading, setCurrentTrip } = useTrip();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState(defaultTab); // 'all', 'Upcoming', 'Planning', 'Completed', 'favorites'
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTrips();
      fetchFavorites();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="py-24 px-4 text-center max-w-md mx-auto space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-coral-50 text-coral-500 flex items-center justify-center mx-auto">
          <MapPin className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-navy-950 font-sans">Track & Manage Your Journeys</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Log in or create a free account to view your saved itineraries, modify budgets, duplicate trips, and access favorite destinations.
        </p>
        <div className="pt-2">
          <Link
            to="/auth?mode=login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-coral-500 hover:bg-coral-600 shadow-md transition-all"
          >
            Log In to View My Trips
          </Link>
        </div>
      </div>
    );
  }

  // Filter trips by status
  const filteredTrips = activeTab === 'all'
    ? trips
    : activeTab === 'favorites'
    ? []
    : trips.filter((t) => t.status === activeTab);

  const handleViewTrip = (trip) => {
    setCurrentTrip(trip);
    navigate(`/itinerary/${trip._id}`);
  };

  const handleShare = (tripId) => {
    const url = `${window.location.origin}/itinerary/${tripId}`;
    navigator.clipboard.writeText(url);
    showToast('Shareable trip link copied to clipboard! 📋', 'success');
  };

  const handleExportPDF = (trip) => {
    setCurrentTrip(trip);
    printItineraryAsPDF(trip);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-turquoise-600 block mb-1">
            Personal Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-sans">
            My Travel Itineraries
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your AI-crafted adventures, modify budgets, and download offline PDFs.
          </p>
        </div>

        <Link
          to="/planner"
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-coral-500 hover:bg-coral-600 shadow-md transition-all"
        >
          <Plus className="w-4 h-4" />
          Plan New Trip
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
        {[
          { id: 'all', label: `All Trips (${trips.length})` },
          { id: 'Upcoming', label: 'Upcoming' },
          { id: 'Planning', label: 'Planning' },
          { id: 'Completed', label: 'Completed' },
          { id: 'favorites', label: `Saved Favorites (${favorites.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-navy-950 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'favorites' ? (
        <div>
          {favorites.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-950">No favorite places saved yet</h3>
              <p className="text-xs text-slate-500">
                Browse destinations and click the heart icon on any destination card to bookmark it here!
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-coral-600 bg-coral-50 hover:bg-coral-100 rounded-xl transition-colors"
              >
                Explore Destinations
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((dest) => (
                <DestinationCard
                  key={dest._id}
                  destination={dest}
                  onOpenDetails={(d) => setSelectedFavorite(d)}
                />
              ))}
            </div>
          )}
        </div>
      ) : filteredTrips.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-coral-50 text-coral-500 flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">
            {activeTab === 'all' ? 'No trips created yet' : `No ${activeTab.toLowerCase()} trips`}
          </h3>
          <p className="text-xs text-slate-500">
            Ready for your next getaway? Let AI generate your complete personalized itinerary in seconds.
          </p>
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-coral-500 hover:bg-coral-600 shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Plan Trip with AI
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((tripItem) => {
            const daysCount = calculateDaysCount(tripItem.startDate, tripItem.endDate);
            return (
              <div
                key={tripItem._id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-soft hover:shadow-premium transition-all flex flex-col justify-between"
              >
                {/* Trip image and badge */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-navy-950">
                  <img
                    src={tripItem.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80'}
                    alt={tripItem.destination}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"></div>

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${
                        tripItem.status === 'Completed'
                          ? 'bg-emerald-500/90 text-white'
                          : tripItem.status === 'Upcoming'
                          ? 'bg-blue-500/90 text-white'
                          : 'bg-amber-500/90 text-white'
                      }`}
                    >
                      {tripItem.status || 'Planning'}
                    </span>
                  </div>

                  {/* Destination on image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-bold font-sans drop-shadow-sm truncate">
                      {tripItem.destination}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-coral-500 flex-shrink-0" />
                      <span>
                        {formatDate(tripItem.startDate)} - {formatDate(tripItem.endDate)} ({daysCount} Days)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                      <span>
                        {tripItem.travelers?.adults || 1} Adults, {tripItem.travelers?.children || 0} Kids ({tripItem.travelers?.type || 'Solo'})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Wallet className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="font-bold text-navy-950">
                        {formatCurrency(tripItem.budget?.total, tripItem.budget?.currency)} ({tripItem.budget?.tier || 'Moderate'})
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                    <button
                      onClick={() => handleViewTrip(tripItem)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Itinerary
                    </button>

                    <button
                      onClick={() => duplicateTrip(tripItem._id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition-colors"
                      title="Duplicate Trip"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleShare(tripItem._id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition-colors"
                      title="Share Trip Link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleExportPDF(tripItem)}
                      className="p-2 rounded-xl text-slate-500 hover:text-navy-950 hover:bg-slate-100 transition-colors"
                      title="Export PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => deleteTrip(tripItem._id)}
                      className="p-2 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                      title="Delete Trip"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details modal for favorites */}
      <DestinationDetailsModal
        destination={selectedFavorite}
        isOpen={!!selectedFavorite}
        onClose={() => setSelectedFavorite(null)}
      />
    </div>
  );
};

export default MyTripsPage;
