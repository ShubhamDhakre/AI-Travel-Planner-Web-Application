import React, { useState } from 'react';
import {
  Wallet,
  TrendingDown,
  Edit3,
  Users,
  Calendar,
  Sparkles,
  Check,
  RotateCcw,
  Plus,
} from 'lucide-react';
import ExpenseChart from './ExpenseChart';
import { formatCurrency, calculateDaysCount } from '../../utils/formatters';
import { useTrip } from '../../hooks/useTrip';
import { useToast } from '../../hooks/useToast';
import aiService from '../../services/aiService';

export const ExpenseCalculator = ({ trip }) => {
  const { updateExpenses } = useTrip();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  const currency = trip.budget?.currency || 'USD';
  const targetBudget = Number(trip.budget?.total) || 1800;
  const daysCount = calculateDaysCount(trip.startDate, trip.endDate);
  const travelersCount = (trip.travelers?.adults || 1) + (trip.travelers?.children || 0);

  const initialExpenses = trip.expenses || {
    transportation: 450,
    accommodation: 650,
    food: 360,
    activities: 220,
    shopping: 100,
    miscellaneous: 60,
  };

  const [editValues, setEditValues] = useState(initialExpenses);

  const currentExpenses = isEditing ? editValues : initialExpenses;
  const totalCost = Object.entries(currentExpenses)
    .filter(([k]) => k !== 'customItems')
    .reduce((sum, [, v]) => sum + (Number(v) || 0), 0);

  const perPersonCost = Math.round(totalCost / Math.max(1, travelersCount));
  const dailyAverageCost = Math.round(totalCost / Math.max(1, daysCount));
  const budgetRemaining = targetBudget - totalCost;

  const handleInputChange = (field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: Math.max(0, Number(value) || 0),
    }));
  };

  const handleSaveExpenses = () => {
    updateExpenses(editValues);
    setIsEditing(false);
    showToast('Updated expenses successfully.', 'success');
  };

  const handleAiOptimize = async () => {
    try {
      setOptimizing(true);
      const res = await aiService.optimizeBudget(trip, 15);
      if (res.success && res.data) {
        setAiSuggestions(res.data);
        showToast('AI Budget Optimization ready! Review suggestions below.', 'success');
      }
    } catch (err) {
      showToast('Could not optimize budget.', 'error');
    } finally {
      setOptimizing(false);
    }
  };

  const applyOptimizedExpenses = () => {
    if (aiSuggestions?.optimizedExpenses) {
      updateExpenses(aiSuggestions.optimizedExpenses);
      setEditValues(aiSuggestions.optimizedExpenses);
      setAiSuggestions(null);
      showToast('Applied AI optimized budget! 🎉', 'success');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-soft space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-navy-950 font-sans flex items-center gap-2">
            <Wallet className="w-6 h-6 text-coral-500" />
            Travel Expense Calculator & Budget Breakdown
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Real-time cost breakdown by category. Adjust figures or optimize with AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAiOptimize}
            disabled={optimizing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-turquoise-700 bg-turquoise-50 hover:bg-turquoise-100 transition-all border border-turquoise-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-turquoise-600" />
            {optimizing ? 'Optimizing...' : 'AI Budget Saver'}
          </button>

          {!isEditing ? (
            <button
              onClick={() => {
                setEditValues(initialExpenses);
                setIsEditing(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-600" />
              Modify Costs
            </button>
          ) : (
            <button
              onClick={handleSaveExpenses}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Est. Cost</span>
          <span className="text-xl font-extrabold text-navy-950 mt-1 block">
            {formatCurrency(totalCost, currency)}
          </span>
          <span className="text-[10px] text-slate-400">Target: {formatCurrency(targetBudget, currency)}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Per Person</span>
          <span className="text-xl font-extrabold text-navy-950 mt-1 block">
            {formatCurrency(perPersonCost, currency)}
          </span>
          <span className="text-[10px] text-slate-400">Based on {travelersCount} travelers</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Daily Average</span>
          <span className="text-xl font-extrabold text-navy-950 mt-1 block">
            {formatCurrency(dailyAverageCost, currency)}
          </span>
          <span className="text-[10px] text-slate-400">Across {daysCount} days</span>
        </div>

        <div
          className={`p-4 rounded-2xl border ${
            budgetRemaining >= 0
              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
              : 'bg-red-50/60 border-red-200 text-red-950'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Budget Remaining</span>
          <span
            className={`text-xl font-extrabold mt-1 block ${
              budgetRemaining >= 0 ? 'text-emerald-700' : 'text-red-600'
            }`}
          >
            {budgetRemaining >= 0 ? '+' : ''}
            {formatCurrency(budgetRemaining, currency)}
          </span>
          <span className="text-[10px] text-slate-500">
            {budgetRemaining >= 0 ? 'Within target budget' : 'Over estimated budget'}
          </span>
        </div>
      </div>

      {/* Interactive Chart */}
      <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          Category-Wise Allocation
        </h4>
        <ExpenseChart expenses={currentExpenses} currency={currency} targetBudget={targetBudget} />
      </div>

      {/* Category Adjustment Inputs */}
      {isEditing && (
        <div className="p-6 rounded-2xl bg-coral-50/40 border border-coral-200 space-y-4 animate-scale-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-coral-800">
              Manual Category Expense Adjustment
            </h4>
            <span className="text-xs text-slate-500">Enter amounts in {currency}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {['transportation', 'accommodation', 'food', 'activities', 'shopping', 'miscellaneous'].map(
              (cat) => (
                <div key={cat} className="bg-white p-3 rounded-xl border border-coral-100 shadow-sm">
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    {cat}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={editValues[cat] || 0}
                    onChange={(e) => handleInputChange(cat, e.target.value)}
                    className="w-full px-2.5 py-1.5 text-sm font-bold text-navy-950 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-coral-500"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* AI Budget Optimization Banner */}
      {aiSuggestions && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-turquoise-50 to-blue-50 border border-turquoise-200 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-turquoise-600" />
              <h4 className="text-sm font-bold text-navy-950">
                AI Budget Optimization Result: Save {formatCurrency(aiSuggestions.savingsAmount, currency)} ({aiSuggestions.savingsPercent}%)
              </h4>
            </div>
            <button
              onClick={applyOptimizedExpenses}
              className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-turquoise-600 hover:bg-turquoise-700 shadow-sm transition-all"
            >
              Apply AI Optimized Figures
            </button>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-700">
            {aiSuggestions.suggestions?.map((sugg, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-turquoise-600 mt-1.5 flex-shrink-0" />
                <span>{sugg}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExpenseCalculator;
