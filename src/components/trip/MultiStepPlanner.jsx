import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Compass,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Heart,
  Plane,
  Home,
  MessageSquare,
} from 'lucide-react';
import Step1Destination from './Step1Destination';
import Step2Dates from './Step2Dates';
import Step3Travelers from './Step3Travelers';
import Step4Budget from './Step4Budget';
import Step5Preferences from './Step5Preferences';
import Step6Transportation from './Step6Transportation';
import Step7Accommodation from './Step7Accommodation';
import Step8Instructions from './Step8Instructions';
import { useTrip } from '../../hooks/useTrip';
import { useToast } from '../../hooks/useToast';

const steps = [
  { id: 1, title: 'Destination', icon: MapPin },
  { id: 2, title: 'Dates', icon: Calendar },
  { id: 3, title: 'Travelers', icon: Users },
  { id: 4, title: 'Budget', icon: Wallet },
  { id: 5, title: 'Preferences', icon: Heart },
  { id: 6, title: 'Transport', icon: Plane },
  { id: 7, title: 'Stays', icon: Home },
  { id: 8, title: 'AI Notes', icon: MessageSquare },
];

export const MultiStepPlanner = ({ initialDestination = '' }) => {
  const navigate = useNavigate();
  const { generateTrip, isGenerating } = useTrip();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);

  // Default dates: tomorrow + 5 days
  const defaultStart = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const defaultEnd = new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    destination: initialDestination || 'Kyoto, Japan',
    departureCity: '',
    startDate: defaultStart,
    endDate: defaultEnd,
    travelers: { adults: 1, children: 0, type: 'Solo' },
    budget: { tier: 'Moderate', total: 1800, currency: 'USD' },
    travelPreferences: ['Culture', 'Food', 'Historical places', 'Photography'],
    transportation: 'Flight',
    accommodationPreferences: { type: 'Hotel', tier: 'Moderate' },
    additionalNotes: 'I want to experience local authentic food and hidden cultural gems.',
  });

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const validateStep = (step) => {
    if (step === 1 && !formData.destination?.trim()) {
      showToast('Please enter or select a destination.', 'warning');
      return false;
    }
    if (step === 2 && (!formData.startDate || !formData.endDate)) {
      showToast('Please select departure and return dates.', 'warning');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(steps.length, prev + 1));
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) return;

    try {
      await generateTrip(formData);
      navigate('/itinerary');
    } catch {
      // Error handled in context
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-premium p-6 sm:p-10 max-w-3xl mx-auto">
      {/* Progress Stepper Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 overflow-x-auto pb-2 no-scrollbar">
          {steps.map((s) => {
            const isCompleted = currentStep > s.id;
            const isCurrent = currentStep === s.id;
            return (
              <div
                key={s.id}
                onClick={() => isCompleted && setCurrentStep(s.id)}
                className={`flex items-center gap-1.5 cursor-pointer whitespace-nowrap text-xs font-semibold px-2 py-1 rounded-lg transition-colors ${
                  isCurrent
                    ? 'text-coral-600 bg-coral-50'
                    : isCompleted
                    ? 'text-navy-900 hover:bg-slate-50'
                    : 'text-slate-300 pointer-events-none'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-coral-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.id}
                </span>
                <span className="hidden md:inline">{s.title}</span>
              </div>
            );
          })}
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-turquoise-500 to-coral-500 h-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Dynamic Step Content */}
      <div className="min-h-[360px] flex flex-col justify-between">
        <div>
          {currentStep === 1 && <Step1Destination formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && <Step2Dates formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <Step3Travelers formData={formData} updateFormData={updateFormData} />}
          {currentStep === 4 && <Step4Budget formData={formData} updateFormData={updateFormData} />}
          {currentStep === 5 && <Step5Preferences formData={formData} updateFormData={updateFormData} />}
          {currentStep === 6 && <Step6Transportation formData={formData} updateFormData={updateFormData} />}
          {currentStep === 7 && <Step7Accommodation formData={formData} updateFormData={updateFormData} />}
          {currentStep === 8 && <Step8Instructions formData={formData} updateFormData={updateFormData} />}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            disabled={currentStep === 1 || isGenerating}
            onClick={handleBack}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 transition-all ${
              currentStep === 1
                ? 'opacity-0 pointer-events-none'
                : 'hover:bg-slate-100 hover:text-navy-950'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-navy-950 hover:bg-navy-900 shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-coral-500 via-coral-600 to-orange-500 hover:from-coral-600 hover:to-orange-600 shadow-lg shadow-coral-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Compass className="w-5 h-5 animate-spin" />
                  Generating Itinerary with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Plan My Trip ✨
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepPlanner;
