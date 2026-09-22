import { IconX, IconHeart, IconTrash, IconEye, IconShoppingBag } from './Icons';

export function FavoritesModal({
  isOpen,
  onClose,
  favoriteDishes,
  lang,
  t,
  onRemoveFavorite,
  onClearFavorites,
  onOpenDetail,
  onOpenOrder
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 animate-modal max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-500">
              <IconHeart className="w-5 h-5" filled />
            </div>
            <div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                {t.favoriteDishes}
              </h3>
              <span className="text-xs text-stone-500">
                {favoriteDishes.length} {t.dishesFound}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {favoriteDishes.length > 0 && (
              <button
                onClick={onClearFavorites}
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <IconTrash className="w-3.5 h-3.5" />
                <span>{t.clearFavorites}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {favoriteDishes.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-300 dark:text-stone-600 mx-auto flex items-center justify-center">
                <IconHeart className="w-8 h-8" />
              </div>
              <p className="text-sm text-stone-500 max-w-xs mx-auto">
                {t.noFavorites}
              </p>
            </div>
          ) : (
            favoriteDishes.map((dish) => {
              const name = dish.name[lang] || dish.name['uz'] || '';
              const formattedPrice = new Intl.NumberFormat('uz-UZ').format(dish.price) + ' ' + t.currency;

              return (
                <div
                  key={dish.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 hover:border-amber-400/40 transition gap-3"
                >
                  <img
                    src={dish.image}
                    alt={name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                      {name}
                    </h4>
                    <p className="text-xs font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
                      {formattedPrice}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenDetail(dish);
                      }}
                      className="p-2 rounded-lg bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-amber-500 hover:text-white transition cursor-pointer"
                      title={t.viewDetails}
                    >
                      <IconEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenOrder(dish);
                      }}
                      className="p-2 rounded-lg bg-amber-600 text-white hover:bg-amber-500 transition cursor-pointer"
                      title={t.orderNow}
                    >
                      <IconShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveFavorite(dish.id)}
                      className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-200 transition cursor-pointer"
                      title={t.removeFromFavorites}
                    >
                      <IconTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium text-xs hover:bg-stone-200 dark:hover:bg-stone-700 transition cursor-pointer"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
}
