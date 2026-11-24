import React from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';

export const DestinationFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBudget,
  setSelectedBudget,
  sortBy,
  setSortBy,
  categories = [],
}) => {
  const hasActiveFilters = searchQuery || selectedCategory || selectedBudget || sortBy !== 'popularity';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedBudget('');
    setSortBy('popularity');
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft mb-8 space-y-4">
      {/* Top search & sorting bar */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by city, country, or attractions..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-coral-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Budget filters */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Budget Level selector */}
          <select
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-coral-500 cursor-pointer"
          >
            <option value="">All Budgets</option>
            <option value="Budget">Budget Friendly ($)</option>
            <option value="Moderate">Moderate ($$)</option>
            <option value="Luxury">Luxury ($$$)</option>
          </select>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2.5 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 focus:outline-none focus:border-coral-500 cursor-pointer"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="cost-asc">Cost: Low to High</option>
              <option value="cost-desc">Cost: High to Low</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-xs font-medium text-coral-600 hover:text-coral-700 hover:bg-coral-50 rounded-xl transition-colors whitespace-nowrap"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === ''
              ? 'bg-navy-950 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Styles
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-coral-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DestinationFilters;
