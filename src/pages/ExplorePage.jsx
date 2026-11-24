import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Compass, Sparkles, AlertCircle } from 'lucide-react';
import destinationService from '../services/destinationService';
import DestinationCard from '../components/destination/DestinationCard';
import DestinationFilters from '../components/destination/DestinationFilters';
import DestinationDetailsModal from '../components/destination/DestinationDetailsModal';
import { CardSkeleton } from '../components/common/Skeleton';

export const ExplorePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || '';

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = [
    'Culture',
    'Historical places',
    'Nature',
    'Mountains',
    'Beaches',
    'Food',
    'Adventure',
    'Shopping',
    'Relaxation',
    'Spiritual places',
    'Nightlife',
  ];

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const filters = {
          search: searchQuery,
          category: selectedCategory,
          budgetLevel: selectedBudget,
          sort: sortBy,
        };
        const res = await destinationService.getDestinations(filters);
        if (res.success && res.data) {
          setDestinations(res.data);
        }
      } catch (err) {
        console.warn('Failed loading destinations:', err.message);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchDestinations();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedBudget, sortBy]);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-turquoise-50 border border-turquoise-200 text-turquoise-700 text-xs font-bold">
          <Compass className="w-3.5 h-3.5" />
          Global Destination Discovery
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-sans tracking-tight">
          Explore Dream Destinations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Search iconic cities, hidden cultural gems, and scenic escapes worldwide. Click any card to view detailed travel tips and cuisine.
        </p>
      </div>

      {/* Filter Component */}
      <DestinationFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />

      {/* Destinations Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : destinations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">No matching destinations found</h3>
          <p className="text-xs text-slate-500">
            Try adjusting your search keyword, category, or budget filters to explore other regions.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('');
              setSelectedBudget('');
              setSortBy('popularity');
            }}
            className="px-4 py-2 text-xs font-bold text-coral-600 bg-coral-50 hover:bg-coral-100 rounded-xl transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <DestinationCard
              key={dest._id}
              destination={dest}
              onOpenDetails={(d) => setSelectedDestination(d)}
            />
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      <DestinationDetailsModal
        destination={selectedDestination}
        isOpen={!!selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </div>
  );
};

export default ExplorePage;
