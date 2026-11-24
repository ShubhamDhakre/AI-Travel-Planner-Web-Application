import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

const exampleInstructions = [
  "I want to visit peaceful places with minimal crowds.",
  "Include authentic local street food and food hall tours.",
  "Keep walking distances moderate and include relaxing café stops.",
  "I prefer traveling by scenic trains and public metro.",
  "Focus on sunrise photography spots and scenic viewpoints.",
  "Include romantic sunset dinners and rooftop lounges.",
];

export const Step8Instructions = ({ formData, updateFormData }) => {
  const currentText = formData.additionalNotes || '';

  const addSnippet = (snippet) => {
    if (!currentText.includes(snippet)) {
      const updated = currentText ? `${currentText}\n• ${snippet}` : `• ${snippet}`;
      updateFormData({ additionalNotes: updated });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-navy-950 font-sans">Any special requests for the AI?</h3>
        <p className="text-xs text-slate-500 mt-1">
          Tell AI what kind of trip you want. The more specific you are, the more tailored your itinerary will be.
        </p>
      </div>

      <div>
        <div className="relative">
          <textarea
            rows="5"
            value={currentText}
            onChange={(e) => updateFormData({ additionalNotes: e.target.value })}
            placeholder="Tell AI what kind of trip you want... (e.g. 'I want to visit peaceful places, avoid crowded tourist traps, and experience local artisanal coffee.')"
            className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-coral-500 focus:bg-white transition-all shadow-sm leading-relaxed"
          />
        </div>
      </div>

      {/* Clickable prompt suggestions */}
      <div>
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-coral-500" />
          Click to add custom guidelines:
        </span>
        <div className="flex flex-wrap gap-2">
          {exampleInstructions.map((ex, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => addSnippet(ex)}
              className="text-xs font-medium px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:border-coral-300 hover:bg-coral-50/50 hover:text-coral-700 transition-all text-left"
            >
              + {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step8Instructions;
