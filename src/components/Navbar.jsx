import { IconSun, IconMoon, IconHeart, IconGlobe } from './Icons';

export function Navbar({
  lang,
  setLang,
  theme,
  setTheme,
  favoritesCount,
  onOpenFavorites,
  t
}) {
  const languages = [
    { code: 'uz', label: "O'zbekcha", short: 'UZ' },
    { code: 'ru', label: 'Русский', short: 'RU' },
    { code: 'en', label: 'English', short: 'EN' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-stone-200/80 dark:border-stone-800/80 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3 cursor-pointer select-none">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/30">
            <span className="text-2xl">🍽️</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-title text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
                {t.brandName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400 border border-amber-300/40 dark:border-amber-700/40">
                Halal
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 hidden sm:block">
              {t.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Language Switcher */}
          <div className="flex items-center bg-stone-100 dark:bg-stone-900 p-1 rounded-xl border border-stone-200 dark:border-stone-800">
            <div className="px-2 text-stone-400 dark:text-stone-500 hidden md:block">
              <IconGlobe className="w-4 h-4" />
            </div>
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                  lang === l.code
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                }`}
                title={l.label}
              >
                {l.short}
              </button>
            ))}
          </div>

          {/* Theme Toggle (Dark/Light) */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-200 border border-stone-200 dark:border-stone-800 hover:bg-stone-200 dark:hover:bg-stone-800 transition shadow-xs cursor-pointer"
            title={t.themeToggle}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <IconSun className="w-5 h-5 text-amber-400" />
            ) : (
              <IconMoon className="w-5 h-5 text-stone-700" />
            )}
          </button>

          {/* Favorites Button with Counter */}
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition font-medium text-sm shadow-xs cursor-pointer"
            title={t.favoriteDishes}
          >
            <IconHeart className="w-5 h-5 text-amber-600 dark:text-amber-400" filled={favoritesCount > 0} />
            <span className="hidden sm:inline font-semibold">{t.favoriteDishes}</span>
            {favoritesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                {favoritesCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
