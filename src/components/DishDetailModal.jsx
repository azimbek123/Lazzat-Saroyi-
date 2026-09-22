import { useEffect } from 'react';
import { IconX, IconStar, IconHeart, IconClock, IconFlame, IconShoppingBag, IconCheck } from './Icons';

export function DishDetailModal({
  dish,
  lang,
  t,
  isFavorite,
  onToggleFavorite,
  onClose,
  onOpenOrder
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!dish) return null;

  const name = dish.name[lang] || dish.name['uz'] || '';
  const description = dish.description[lang] || dish.description['uz'] || '';
  const ingredients = dish.ingredients?.[lang] || dish.ingredients?.['uz'] || [];
  const categoryLabel = t.categories[dish.category] || dish.category;
  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(dish.price) + ' ' + t.currency;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
      {/* Modal Card */}
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 animate-modal my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition cursor-pointer"
          aria-label="Close modal"
        >
          <IconX className="w-5 h-5" />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite(dish.id)}
          className={`absolute top-4 left-4 z-20 p-2.5 rounded-full backdrop-blur-md transition cursor-pointer ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-lg'
              : 'bg-black/60 hover:bg-black/80 text-white'
          }`}
          title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
          aria-label="Toggle favorite"
        >
          <IconHeart className="w-5 h-5" filled={isFavorite} />
        </button>

        {/* Big Food Image */}
        <div className="relative w-full h-72 sm:h-80 bg-stone-100 dark:bg-stone-800">
          <img
            src={dish.image}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-amber-500 text-white mb-2 shadow-sm">
                {categoryLabel}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-white leading-tight drop-shadow-md">
                {name}
              </h2>
            </div>
            
            <div className="text-right">
              <span className="text-xs text-amber-200 block uppercase font-bold tracking-wider">
                {t.currency}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                {formattedPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Metrics bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800">
            {/* Rating */}
            <div className="flex flex-col items-center justify-center text-center p-1">
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                {t.rating}
              </span>
              <div className="flex items-center gap-1 mt-0.5 text-amber-500 font-bold text-sm sm:text-base">
                <IconStar className="w-4 h-4" filled />
                <span>{dish.rating?.toFixed(1) || '5.0'}</span>
              </div>
            </div>

            {/* Preparation time */}
            <div className="flex flex-col items-center justify-center text-center p-1 border-x border-stone-200 dark:border-stone-700/60">
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                {t.cookTime}
              </span>
              <div className="flex items-center gap-1 mt-0.5 text-stone-800 dark:text-stone-200 font-bold text-xs sm:text-sm">
                <IconClock className="w-3.5 h-3.5 text-amber-500" />
                <span>{dish.cookTime || '15-20 min'}</span>
              </div>
            </div>

            {/* Calories */}
            <div className="flex flex-col items-center justify-center text-center p-1">
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                {t.calories}
              </span>
              <div className="flex items-center gap-1 mt-0.5 text-stone-800 dark:text-stone-200 font-bold text-xs sm:text-sm">
                <IconFlame className="w-3.5 h-3.5 text-orange-500" />
                <span>{dish.calories ? `${dish.calories} kcal` : '450 kcal'}</span>
              </div>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-stone-400 dark:text-stone-500 mb-2">
              {t.viewDetails}
            </h4>
            <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          </div>

          {/* Ingredients list */}
          {ingredients.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-stone-400 dark:text-stone-500 mb-2.5">
                {t.ingredients}
              </h4>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200/70 dark:border-amber-900/60 text-xs font-semibold"
                  >
                    <IconCheck className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA Button */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
            >
              {t.close}
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenOrder(dish);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold shadow-lg shadow-amber-600/30 transition cursor-pointer active:scale-95"
            >
              <IconShoppingBag className="w-4 h-4" />
              <span>{t.orderNow}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
