import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Heart, Mail, CheckCircle2, Globe2, ShieldCheck, ArrowRight } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-900">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-turquoise-500 to-coral-500 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                Trip<span className="text-coral-500">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your next adventure, planned by AI. We craft tailored, hyper-personalized travel itineraries matching your exact budget, interests, and style in seconds.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-900 text-turquoise-400 border border-navy-800">
                <Sparkles className="w-3.5 h-3.5" /> Powered by Gemini
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-900 text-slate-300 border border-navy-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Places
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/planner" className="hover:text-coral-400 transition-colors">
                  AI Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-coral-400 transition-colors">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link to="/my-trips" className="hover:text-coral-400 transition-colors">
                  My Trips Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-coral-400 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Travel Styles</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/explore?category=Culture" className="hover:text-coral-400 transition-colors">
                  Heritage & Culture
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Adventure" className="hover:text-coral-400 transition-colors">
                  Nature & Adventures
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Beaches" className="hover:text-coral-400 transition-colors">
                  Tropical Coastal
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Mountains" className="hover:text-coral-400 transition-colors">
                  Alpine & Mountains
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Stay Inspired</h4>
            <p className="text-xs text-slate-400">
              Get weekly AI-curated travel guides and secret flight deals.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                You're on the list! Welcome aboard.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3.5 py-2.5 text-xs bg-navy-900 border border-navy-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-coral-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 bg-coral-500 hover:bg-coral-600 text-white rounded-lg transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TripAI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
