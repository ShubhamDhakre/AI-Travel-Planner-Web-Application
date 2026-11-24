import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Calendar,
  Wallet,
  Users,
  Compass,
  ArrowRight,
  Star,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Globe2,
  Heart,
  Plane,
} from 'lucide-react';
import { useTrip } from '../hooks/useTrip';
import destinationService from '../services/destinationService';
import DestinationCard from '../components/destination/DestinationCard';
import DestinationDetailsModal from '../components/destination/DestinationDetailsModal';
import { CardSkeleton } from '../components/common/Skeleton';

export const HomePage = () => {
  const navigate = useNavigate();
  const { generateTrip, isGenerating } = useTrip();

  const [destinations, setDestinations] = useState([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState(null);

  // Quick planner search form state
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0];

  const [quickForm, setQuickForm] = useState({
    destination: 'Kyoto, Japan',
    departureCity: 'New York',
    startDate: tomorrow,
    endDate: nextWeek,
    travelers: { adults: 2, children: 0, type: 'Couple' },
    budget: { tier: 'Moderate', total: 2200, currency: 'USD' },
    travelPreferences: ['Culture', 'Food', 'Historical places'],
    transportation: 'Flight',
    accommodationPreferences: { type: 'Hotel', tier: 'Moderate' },
  });

  useEffect(() => {
    const loadCuratedDestinations = async () => {
      try {
        setLoadingDestinations(true);
        const res = await destinationService.getDestinations({ limit: 6 });
        if (res.success && res.data) {
          setDestinations(res.data.slice(0, 6));
        }
      } catch (err) {
        console.warn('Failed loading homepage destinations:', err.message);
      } finally {
        setLoadingDestinations(false);
      }
    };
    loadCuratedDestinations();
  }, []);

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    try {
      await generateTrip(quickForm);
      navigate('/itinerary');
    } catch {
      // Handled in context
    }
  };

  return (
    <div className="space-y-24">
      {/* 1. Cinematic Hero Section */}
      <section className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-turquoise-200/40 via-coral-200/30 to-blue-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-4 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs font-bold text-navy-950">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-ping"></span>
            <Sparkles className="w-3.5 h-3.5 text-coral-500" />
            Next-Gen Travel Intelligence
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-navy-950 font-sans leading-tight">
            Your next adventure, <br />
            <span className="bg-gradient-to-r from-coral-500 via-coral-600 to-turquoise-600 bg-clip-text text-transparent">
              planned by AI.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Discover incredible destinations and create personalized travel experiences tailored to your budget, interests, and travel style in seconds.
          </p>
        </div>

        {/* Interactive Travel Planning Search Form (Card) */}
        <div className="mt-12 max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-premium relative z-10">
          <form onSubmit={handleQuickSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Destination */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Destination *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coral-500" />
                  <input
                    type="text"
                    required
                    value={quickForm.destination}
                    onChange={(e) => setQuickForm({ ...quickForm, destination: e.target.value })}
                    placeholder="Where to? (e.g. Kyoto, Paris)"
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-coral-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Dates */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Travel Dates *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-turquoise-600" />
                  <input
                    type="date"
                    required
                    min={tomorrow}
                    value={quickForm.startDate}
                    onChange={(e) => setQuickForm({ ...quickForm, startDate: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-coral-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Budget Style
                </label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                  <select
                    value={quickForm.budget.tier}
                    onChange={(e) => {
                      const tier = e.target.value;
                      const total = tier === 'Budget' ? 1000 : tier === 'Luxury' ? 3800 : 2000;
                      setQuickForm({
                        ...quickForm,
                        budget: { ...quickForm.budget, tier, total },
                      });
                    }}
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-coral-500 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Budget">Budget ($1,000)</option>
                    <option value="Moderate">Moderate ($2,000)</option>
                    <option value="Luxury">Luxury ($3,800)</option>
                  </select>
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Travelers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                  <select
                    value={quickForm.travelers.type}
                    onChange={(e) => {
                      const type = e.target.value;
                      const adults = type === 'Solo' ? 1 : type === 'Couple' ? 2 : 4;
                      setQuickForm({
                        ...quickForm,
                        travelers: { ...quickForm.travelers, type, adults },
                      });
                    }}
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-coral-500 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="Solo">Solo Traveler (1)</option>
                    <option value="Couple">Couple / Duo (2)</option>
                    <option value="Family">Family Trip (4)</option>
                    <option value="Friends">Friends Group (4+)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bottom action row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar text-xs text-slate-500">
                <span className="font-semibold text-slate-400">Popular:</span>
                {['Kyoto', 'Paris', 'Bali', 'Santorini', 'Swiss Alps'].map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setQuickForm({ ...quickForm, destination: `${city}` })}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-coral-500 via-coral-600 to-orange-500 hover:from-coral-600 hover:to-orange-600 shadow-lg shadow-coral-500/25 transition-all transform hover:-translate-y-0.5 whitespace-nowrap disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Compass className="w-4 h-4 animate-spin" />
                    Generating Itinerary...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Plan My Trip ✨
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Floating preview cards decoration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
          <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-soft flex items-center gap-4 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-coral-50 text-coral-500 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy-950 font-sans">Instant Day-by-Day Plans</h4>
              <p className="text-xs text-slate-500 mt-0.5">Morning, afternoon, and evening timelines in under 3 seconds.</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-soft flex items-center gap-4 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-turquoise-50 text-turquoise-600 flex items-center justify-center flex-shrink-0">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy-950 font-sans">Real-Time Cost Optimizer</h4>
              <p className="text-xs text-slate-500 mt-0.5">Categorized expense charts, per-person costs, and budget alerts.</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-100 shadow-soft flex items-center gap-4 hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy-950 font-sans">Interactive Map Routes</h4>
              <p className="text-xs text-slate-500 mt-0.5">Geolocated attraction stops with Leaflet visualization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trending Destinations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-turquoise-600 block mb-1">
              Curated Wonders
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-sans">
              Trending Global Destinations
            </h2>
          </div>

          <Link
            to="/explore"
            className="flex items-center gap-1.5 text-xs font-bold text-coral-600 hover:text-coral-700 hover:underline"
          >
            Explore all 10+ destinations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loadingDestinations ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
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
      </section>

      {/* 3. Travel Styles Showcase */}
      <section className="bg-beige-50/60 py-20 border-y border-beige-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-coral-600">
              Tailored Experiences
            </span>
            <h2 className="text-3xl font-extrabold text-navy-950 font-sans">
              Travel Any Way You Imagine
            </h2>
            <p className="text-sm text-slate-500">
              Whether you crave alpine summits, secluded turquoise lagoons, or ancient cultural alleys.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Culture', icon: '🏛️', count: '140+ Sites' },
              { name: 'Beaches', icon: '🏖️', count: '85+ Coasts' },
              { name: 'Mountains', icon: '🏔️', count: '62+ Summits' },
              { name: 'Food', icon: '🍜', count: '320+ Eateries' },
              { name: 'Adventure', icon: '🎒', count: '90+ Treks' },
              { name: 'Relaxation', icon: '✨', count: '110+ Spas' },
            ].map((style, idx) => (
              <Link
                key={idx}
                to={`/explore?category=${encodeURIComponent(style.name)}`}
                className="bg-white rounded-3xl p-5 border border-slate-200/70 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all text-center group cursor-pointer"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {style.icon}
                </div>
                <h4 className="text-sm font-bold text-navy-950 font-sans group-hover:text-coral-500 transition-colors">
                  {style.name}
                </h4>
                <span className="text-[10px] text-slate-400 font-medium block mt-1">
                  {style.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why TripAI Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-turquoise-600">
              Built for Modern Travelers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950 font-sans leading-tight">
              Designed to eliminate travel stress before your bags are even packed.
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional trip planning takes 15+ tabs, conflicting blog reviews, and messy spreadsheets. TripAI consolidates flight preferences, weather predictions, local dining tips, and realistic budget calculations in one place.
            </p>

            <div className="space-y-3.5 pt-2">
              {[
                { title: 'Personalized to Your Exact Budget', desc: 'No cookie-cutter packages. Every meal and ticket aligns with your budget tier.' },
                { title: 'Interactive Route Map Visualization', desc: 'See stops connected day-by-day so you never waste hours zigzagging across town.' },
                { title: 'AI Concierge with Trip Memory', desc: 'Ask about packing, rainy day alternatives, or hidden gems with context retention.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-950">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/planner"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold text-white bg-navy-950 hover:bg-navy-900 shadow-md transition-all"
              >
                Start Multi-Step Planner
                <ArrowRight className="w-4 h-4 text-coral-500" />
              </Link>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
                alt="Scenic travel destination"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent"></div>

              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/50 shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase text-coral-600">Sample Day 2 Plan</span>
                  <span className="text-xs font-extrabold text-navy-950">$85 est.</span>
                </div>
                <h5 className="text-sm font-bold text-navy-950">Sunrise Lake Cruise & Alpine Fondue</h5>
                <p className="text-xs text-slate-500 mt-1">
                  Morning photography at Lake Brienz, followed by cogwheel rail to alpine heights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Destination Details Modal */}
      <DestinationDetailsModal
        destination={selectedDestination}
        isOpen={!!selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </div>
  );
};

export default HomePage;
