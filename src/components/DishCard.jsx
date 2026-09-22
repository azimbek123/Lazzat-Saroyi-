import { IconHeart, IconStar, IconEye, IconShoppingBag, IconFlame, IconClock } from './Icons';

export function DishCard({
  dish,
  lang,
  t,
  isFavorite,
  onToggleFavorite,
  onOpenDetail,
  onOpenOrder
}) {
  const name = dish.name[lang] || dish.name['uz'] || 'Nomsiz taom';
  const description = dish.description[lang] || dish.description['uz'] || '';
  const categoryLabel = t.categories[dish.category] || dish.category;

  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(dish.price) + ' ' + t.currency;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/80 dark:border-stone-800/80 shadow-xs hover:shadow-xl hover:border-amber-400/40 dark:hover:border-amber-500/40 transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Image Container with Badges */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-stone-100 dark:bg-stone-800 cursor-pointer" onClick={() => onOpenDetail(dish)}>
        <img
          src={dish.image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/20 shadow-xs">
          {categoryLabel}
        </span>

        {/* Chef Special Ribbon */}
        {dish.isChefSpecial && (
          <span className="absolute top-3 right-12 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md flex items-center gap-1">
            <IconFlame className="w-3 h-3 text-white" />
            <span className="hidden xs:inline">{t.chefSpecial}</span>
          </span>
        )}

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(dish.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform duration-200 active:scale-90 cursor-pointer ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
              : 'bg-black/50 text-white/80 hover:text-white hover:bg-black/70'
          }`}
          title={isFavorite ? t.removeFromFavorites : t.addToFavorites}
          aria-label="Toggle favorite"
        >
          <IconHeart className="w-4 h-4" filled={isFavorite} />
        </button>

        {/* Quick details pill overlay at bottom of image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white/90 text-xs pointer-events-none">
          {/* Rating */}
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <IconStar className="w-3.5 h-3.5 text-amber-400" filled />
            <span className="font-bold text-white">{dish.rating?.toFixed(1) || '5.0'}</span>
            <span className="text-white/60 text-[10px]">({dish.reviewsCount || 0})</span>
          </div>

          {/* Cooking Time */}
          {dish.cookTime && (
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg text-white/80">
              <IconClock className="w-3 h-3" />
              <span>{dish.cookTime}</span>
            </div>
          )}
        </div>

      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Dish Title */}
          <h3
            onClick={() => onOpenDetail(dish)}
            className="text-lg font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition line-clamp-1"
            title={name}
          >
            {name}
          </h3>

          {/* Description snippet */}
          <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2">
          
          <div>
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
              {t.currency}
            </span>
            <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
              {formattedPrice}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* View Detail Button */}
            <button
              onClick={() => onOpenDetail(dish)}
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-white transition cursor-pointer"
              title={t.viewDetails}
              aria-label="View dish details"
            >
              <IconEye className="w-4 h-4" />
            </button>

            {/* Order Button */}
            <button
              onClick={() => onOpenOrder(dish)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition shadow-md shadow-amber-600/20 cursor-pointer active:scale-95"
            >
              <IconShoppingBag className="w-3.5 h-3.5" />
              <span>{t.orderNow}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
