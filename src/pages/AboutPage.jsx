import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-50 border border-coral-200 text-coral-600 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          The TripAI Story
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 font-sans tracking-tight">
          Reinventing Travel Planning with AI
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          TripAI was built to replace weeks of fragmented research with instant, tailored travel schedules, live weather integration, dynamic budgeting, and geolocation maps.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-coral-50 text-coral-500 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">Gemini AI Integration</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Our multi-layer AI service leverages Google Gemini to synthesize realistic, culturally rich, and logistically sound day-by-day itineraries.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-turquoise-50 text-turquoise-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">Intelligent Fallback Architecture</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Even when external API limits are reached, our built-in heuristic synthesizer generates authentic itineraries and climate estimates without downtime.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-navy-950">Production-Ready Full-Stack</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Built with React 18, Vite, Tailwind CSS, Leaflet, Node.js, Express, and resilient MongoDB data persistence with JWT security.
          </p>
        </div>
      </div>

      {/* Tech Stack Specs */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-soft space-y-6">
        <h3 className="text-lg font-bold text-navy-950 font-sans">Technology Stack Breakdown</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-coral-600 block mb-1">Frontend Engineering</span>
            <ul className="space-y-1 text-slate-600">
              <li>• React 18 (Vite Bundler, ES6+)</li>
              <li>• Tailwind CSS Custom Theme & Glassmorphism</li>
              <li>• React Router DOM v6 with dynamic routing</li>
              <li>• Lucide React icon library</li>
              <li>• Leaflet & React-Leaflet interactive maps</li>
              <li>• Context API (Auth, Trip, Toast state)</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-turquoise-600 block mb-1">Backend & AI Core</span>
            <ul className="space-y-1 text-slate-600">
              <li>• Node.js & Express.js REST API</li>
              <li>• Google Gemini 1.5 Flash API service layer</li>
              <li>• MongoDB & Mongoose schemas with fallback store</li>
              <li>• JWT token-based authentication with bcrypt</li>
              <li>• OpenWeather API climate integration</li>
              <li>• Unsplash photography catalog integration</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center p-10 rounded-3xl bg-gradient-to-r from-navy-950 to-navy-900 text-white space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold font-sans">Ready to Plan Your Next Journey?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Start with our AI wizard or browse curated destinations across six continents.
        </p>
        <div>
          <Link
            to="/planner"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-navy-950 bg-white hover:bg-slate-100 shadow-md transition-all"
          >
            Launch AI Planner
            <ArrowRight className="w-4 h-4 text-coral-500" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
