import { IconLock, IconKey } from './Icons';

export function Footer({ theme, onOpenAdminLogin, t }) {
  const isDarkMode = theme === 'dark';

  return (
    <footer className="mt-24 border-t border-stone-200/80 dark:border-stone-800/80 bg-stone-100/70 dark:bg-stone-950/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍽️</span>
              <span className="font-serif-title text-2xl font-bold text-stone-900 dark:text-stone-100">
                {t.brandName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-md leading-relaxed">
              {t.footerAboutDesc}
            </p>
          </div>

          {/* Working Hours */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-stone-400 dark:text-stone-500">
              {t.workHours}
            </h4>
            <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
              {t.workHoursVal}
            </p>
            <p className="text-xs text-stone-500">
              Dam olish kunlarisiz, buyurtmalar tezkor qabul qilinadi
            </p>
          </div>

          {/* Contact & Location */}
          <div className="space-y-2">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-stone-400 dark:text-stone-500">
              {t.address}
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300">
              {t.addressVal}
            </p>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
              Tel: +998 (71) 200-11-22
            </p>
          </div>

        </div>

        {/* Bottom Bar with Darkmode Secret Admin Button */}
        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <p className="text-xs text-stone-500 dark:text-stone-500 text-center sm:text-left">
            © {new Date().getFullYear()} {t.brandName}. {t.allRightsReserved}
          </p>

          {/* SECRET ADMIN BUTTON: ONLY VISIBLE IN DARK MODE */}
          {/* "futer da bita knopka bolsin va uni darkmot qilganda korinsin va uyerda admin panelga kirish bolsin" */}
          {isDarkMode ? (
            <div className="animate-fadeInScale transition-all duration-300">
              <button
                onClick={onOpenAdminLogin}
                className="group relative flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-amber-950/80 text-amber-400 hover:text-amber-300 border border-amber-500/40 hover:border-amber-400 shadow-lg shadow-amber-950/30 text-xs font-bold transition-all duration-200 cursor-pointer"
                title={t.adminSecretTooltip}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <IconLock className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>{t.adminSecretBtn}</span>
                <IconKey className="w-3.5 h-3.5 text-amber-500/70" />
              </button>
            </div>
          ) : (
            /* In Light mode, this space is completely hidden */
            <div className="hidden"></div>
          )}

        </div>

      </div>
    </footer>
  );
}
