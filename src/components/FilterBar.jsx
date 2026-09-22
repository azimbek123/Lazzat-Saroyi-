import { useState } from 'react';
import { IconSearch, IconX, IconSliders, IconSparkles } from './Icons';

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
  highestDishPrice,
  sortBy,
  setSortBy,
  t,
  totalDishes,
  filteredCount,
  onResetFilters
}) {
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'national', label: t.categories.national },
    { id: 'kebabs', label: t.categories.kebabs },
    { id: 'soups', label: t.categories.soups },
    { id: 'salads', label: t.categories.salads },
    { id: 'bakery', label: t.categories.bakery },
    { id: 'desserts', label: t.categories.desserts },
    { id: 'drinks', label: t.categories.drinks },
  ];

  const formatPrice = (val) => {
    return new Intl.NumberFormat('uz-UZ').format(val) + ' ' + t.currency;
  };

  const isFiltered = searchQuery !== '' || selectedCategory !== 'all' || maxPrice < highestDishPrice || sortBy !== 'popular';

  return (
    <div className="w-full mb-8 space-y-5">
      {/* Top Search Bar & Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search Box */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 dark:text-stone-500">
            <IconSearch className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-10 py-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm md:text-base shadow-xs transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
            >
              <IconX className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Price Filter Toggle Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto appearance-none px-4 py-3.5 pr-9 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-sm font-medium text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-xs cursor-pointer"
            >
              <option value="popular">{t.sortOptions.popular}</option>
              <option value="priceAsc">{t.sortOptions.priceAsc}</option>
              <option value="priceDesc">{t.sortOptions.priceDesc}</option>
              <option value="ratingDesc">{t.sortOptions.ratingDesc}</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-stone-400">
              <span className="text-xs">▼</span>
            </div>
          </div>

          {/* Price Range Filter Button */}
          <button
            onClick={() => setShowFiltersModal(!showFiltersModal)}
            className={`flex items-center gap-2 px-4 py-3.5 rounded-2xl border text-sm font-medium transition shadow-xs cursor-pointer ${
              maxPrice < highestDishPrice
                ? 'bg-amber-500 text-white border-amber-600'
                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
          >
            <IconSliders className="w-4 h-4" />
            <span className="hidden sm:inline">{t.filterPrice}</span>
            {maxPrice < highestDishPrice && (
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                ≤ {formatPrice(maxPrice)}
              </span>
            )}
          </button>

          {/* Reset Filters button if any filter active */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition cursor-pointer"
              title={t.resetFilters}
            >
              <IconX className="w-4 h-4" />
            </button>
          )}

        </div>

      </div>

      {/* Expanded Price Slider Panel */}
      {showFiltersModal && (
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg space-y-4 animate-modal">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {t.filterPrice}
              </span>
              <span className="text-xs text-stone-500">
                (10 000 - {formatPrice(highestDishPrice)})
              </span>
            </div>
            <button
              onClick={() => setShowFiltersModal(false)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
            >
              <IconX className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500 dark:text-stone-400">
                {t.maxPrice}: <strong className="text-amber-600 dark:text-amber-400 font-bold">{formatPrice(maxPrice)}</strong>
              </span>
              <button
                onClick={() => setMaxPrice(highestDishPrice)}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
              >
                {t.allCategories}
              </button>
            </div>
            <input
              type="range"
              min="10000"
              max={highestDishPrice}
              step="2000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-xs text-stone-400">
              <span>10 000 {t.currency}</span>
              <span>{formatPrice(highestDishPrice)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 scale-102 ring-2 ring-amber-400/40'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-amber-400/60 dark:hover:border-amber-500/60 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Results summary bar */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500 dark:text-stone-400 pt-1">
        <div className="flex items-center gap-1.5">
          <IconSparkles className="w-4 h-4 text-amber-500" />
          <span>
            <strong className="text-stone-800 dark:text-stone-200 font-bold">{filteredCount}</strong>
            {totalDishes !== filteredCount && (
              <span className="text-stone-400"> / {totalDishes}</span>
            )}{' '}
            {t.dishesFound}
          </span>
        </div>
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="text-amber-600 dark:text-amber-400 hover:underline font-medium cursor-pointer"
          >
            {t.resetFilters}
          </button>
        )}
      </div>

    </div>
  );
}
