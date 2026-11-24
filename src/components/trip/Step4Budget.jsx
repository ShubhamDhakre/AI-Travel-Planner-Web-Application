import React from 'react';
import { Wallet, Sparkles, Gem } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const budgetTiers = [
  {
    tier: 'Budget',
    label: 'Economy / Budget',
    icon: Wallet,
    defaultAmount: 900,
    desc: 'Cost-conscious stays, public transit, street food & free attractions',
  },
  {
    tier: 'Moderate',
    label: 'Moderate / Balanced',
    icon: Sparkles,
    defaultAmount: 1800,
    desc: 'Boutique hotels, great local bistros, guided activities & taxis',
  },
  {
    tier: 'Luxury',
    label: 'Luxury / Premium',
    icon: Gem,
    defaultAmount: 3800,
    desc: '4-5 star resorts, fine dining, private drivers & VIP experiences',
  },
];

const currencies = ['USD', 'INR', 'EUR', 'GBP', 'AUD', 'CAD', 'AED', 'JPY'];

export const Step4Budget = ({ formData, updateFormData }) => {
  const currentBudget = formData.budget || {
    tier: 'Moderate',
    total: 1800,
    currency: 'USD',
  };

  const handleTierSelect = (tierItem) => {
    updateFormData({
      budget: {
        ...currentBudget,
        tier: tierItem.tier,
        total: tierItem.defaultAmount,
      },
    });
  };

  const handleCurrencyChange = (curr) => {
    updateFormData({
      budget: {
        ...currentBudget,
        currency: curr,
      },
    });
  };

  const handleCustomAmountChange = (amt) => {
    updateFormData({
      budget: {
        ...currentBudget,
        total: Math.max(100, Number(amt) || 0),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-navy-950 font-sans">What is your budget?</h3>
        <p className="text-xs text-slate-500 mt-1">
          Select a budget tier or enter your exact target expense in your preferred currency.
        </p>
      </div>

      {/* Currency Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Currency:</span>
        <div className="flex flex-wrap gap-1.5">
          {currencies.map((curr) => (
            <button
              key={curr}
              type="button"
              onClick={() => handleCurrencyChange(curr)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                currentBudget.currency === curr
                  ? 'bg-navy-950 text-white border-navy-950 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Tiers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {budgetTiers.map((b) => {
          const Icon = b.icon;
          const isSelected = currentBudget.tier === b.tier;
          return (
            <div
              key={b.tier}
              onClick={() => handleTierSelect(b)}
              className={`p-4 rounded-2xl border cursor-pointer flex flex-col justify-between transition-all ${
                isSelected
                  ? 'border-coral-500 bg-coral-50/40 shadow-sm ring-1 ring-coral-500'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isSelected ? 'bg-coral-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-navy-950">{b.label}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{b.desc}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 font-bold text-xs text-coral-600">
                ~ {formatCurrency(b.defaultAmount, currentBudget.currency)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Budget Amount */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
          Custom Estimated Total Budget ({currentBudget.currency})
        </label>
        <div className="relative">
          <input
            type="number"
            min="100"
            step="50"
            value={currentBudget.total || ''}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            className="w-full px-4 py-3 text-base font-bold bg-white border border-slate-200 rounded-xl text-navy-950 focus:outline-none focus:border-coral-500 shadow-sm"
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5">
          AI will allocate this across transport, hotels, dining, and attraction tickets.
        </p>
      </div>
    </div>
  );
};

export default Step4Budget;
