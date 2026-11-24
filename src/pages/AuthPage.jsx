import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Compass, Sparkles, Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import authService from '../services/authService';
import Modal from '../components/common/Modal';

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  const { login, register } = useAuth();
  const { showToast } = useToast();

  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Forgot password state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'register') {
        if (!name.trim()) {
          showToast('Please provide your name', 'warning');
          setLoading(false);
          return;
        }
        await register(name, email, password);
        showToast('Welcome to TripAI! Account created successfully. ✨', 'success');
      } else {
        await login(email, password);
        showToast('Welcome back to TripAI!', 'success');
      }

      navigate('/my-trips');
    } catch (err) {
      showToast(err.message || 'Authentication failed. Please check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    try {
      await authService.forgotPassword(forgotEmail);
      setForgotSent(true);
      showToast(`Reset email sent to ${forgotEmail}`, 'success');
    } catch (err) {
      showToast(err.message || 'Could not send reset email', 'error');
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-premium">
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-navy-950 via-navy-800 to-turquoise-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Compass className="w-6 h-6 text-turquoise-300" />
          </div>
          <h2 className="text-2xl font-bold text-navy-950 font-sans">
            {mode === 'login' ? 'Sign in to TripAI' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'login'
              ? 'Access your saved trips, customized itineraries, and AI assistant.'
              : 'Join thousands of travelers creating AI-tailored journeys worldwide.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-500 hover:text-navy-950'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-500 hover:text-navy-950'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-coral-500 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-coral-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Password *
              </label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs text-coral-600 hover:underline font-semibold"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-coral-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-coral-500 hover:bg-coral-600 shadow-md shadow-coral-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              'Authenticating...'
            ) : mode === 'login' ? (
              <>
                Sign In to Account
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Create Free Account
                <Sparkles className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo credentials hint for testing */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400">
            Tip: Register any email to create your private account with instant session persistence!
          </p>
        </div>
      </div>

      {/* Forgot password modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => {
          setForgotModalOpen(false);
          setForgotSent(false);
        }}
        title="Reset Your Password"
        maxWidth="max-w-md"
      >
        {forgotSent ? (
          <div className="text-center py-4 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-navy-950">Instructions Sent</h4>
            <p className="text-xs text-slate-500">
              We've sent password reset instructions to <strong>{forgotEmail}</strong>. Please check your inbox.
            </p>
            <button
              onClick={() => setForgotModalOpen(false)}
              className="mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <p className="text-xs text-slate-500">
              Enter the email associated with your account and we'll send password recovery steps.
            </p>
            <input
              type="email"
              required
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-coral-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-xl text-xs font-bold"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AuthPage;
