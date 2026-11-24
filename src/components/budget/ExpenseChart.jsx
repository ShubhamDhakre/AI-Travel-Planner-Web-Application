import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const categoryColors = {
  transportation: '#06B6D4', // turquoise
  accommodation: '#0F243E', // navy
  food: '#FF5A36',         // coral
  activities: '#8B5CF6',   // purple
  shopping: '#EC4899',     // pink
  miscellaneous: '#64748B' // slate
};

export const ExpenseChart = ({ expenses = {}, currency = 'USD', targetBudget = 0 }) => {
  const categories = [
    { key: 'transportation', label: 'Transit', amount: expenses.transportation || 0, color: categoryColors.transportation },
    { key: 'accommodation', label: 'Stay', amount: expenses.accommodation || 0, color: categoryColors.accommodation },
    { key: 'food', label: 'Food & Dining', amount: expenses.food || 0, color: categoryColors.food },
    { key: 'activities', label: 'Activities', amount: expenses.activities || 0, color: categoryColors.activities },
    { key: 'shopping', label: 'Shopping', amount: expenses.shopping || 0, color: categoryColors.shopping },
    { key: 'miscellaneous', label: 'Misc', amount: expenses.miscellaneous || 0, color: categoryColors.miscellaneous },
  ];

  const total = categories.reduce((sum, c) => sum + Number(c.amount || 0), 0);

  // Calculate SVG Donut parameters
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
      {/* SVG Donut */}
      <div className="relative w-44 h-44 flex items-center justify-center flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke="#F1F5F9"
            strokeWidth="20"
          />
          {total > 0 &&
            categories.map((cat) => {
              const percent = (cat.amount / total);
              const strokeDasharray = `${percent * circumference} ${circumference}`;
              const strokeDashoffset = -accumulatedPercent * circumference;
              accumulatedPercent += percent;

              return (
                <circle
                  key={cat.key}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="transparent"
                  stroke={cat.color}
                  strokeWidth="20"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-500 hover:opacity-80"
                />
              );
            })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total</span>
          <span className="text-sm font-extrabold text-navy-950 font-sans">
            {formatCurrency(total, currency)}
          </span>
        </div>
      </div>

      {/* Legend & Percentages */}
      <div className="flex-1 w-full grid grid-cols-2 gap-2.5">
        {categories.map((cat) => {
          const pct = total > 0 ? Math.round((cat.amount / total) * 100) : 0;
          return (
            <div
              key={cat.key}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-xs font-semibold text-slate-700 truncate max-w-[80px] sm:max-w-none">
                  {cat.label}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-navy-950 block">
                  {formatCurrency(cat.amount, currency)}
                </span>
                <span className="text-[10px] text-slate-400 block">{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseChart;
