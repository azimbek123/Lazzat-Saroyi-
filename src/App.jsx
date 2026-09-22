import { useState, useEffect, useMemo } from 'react';
import { INITIAL_MENU, INITIAL_REVIEWS } from './data/initialMenu';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { DishCard } from './components/DishCard';
import { DishDetailModal } from './components/DishDetailModal';
import { OrderModal } from './components/OrderModal';
import { FavoritesModal } from './components/FavoritesModal';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { IconSparkles } from './components/Icons';

function App() {
  // 1. Language State (uz, ru, en) - persistent
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('app_lang') || 'uz';
  });

  useEffect(() => {
    localStorage.setItem('app_lang', lang);
  }, [lang]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.uz;

  // 2. Theme State (light, dark) - persistent
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // 3. Menu Dishes State - persistent
  const [dishes, setDishes] = useState(() => {
    try {
      const saved = localStorage.getItem('restaurant_dishes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MENU;
  });

  useEffect(() => {
    try {
      localStorage.setItem('restaurant_dishes', JSON.stringify(dishes));
    } catch (e) {
      console.error(e);
    }
  }, [dishes]);

  // 4. Admin Authentication & Password State - persistent
  // "va parol yagilaganda ozgarmasin va jiqish knopkaasi bolsin adminda"
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('admin_password') || 'admin123';
  });

  useEffect(() => {
    localStorage.setItem('admin_password', adminPassword);
  }, [adminPassword]);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('admin_logged_in') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('admin_logged_in', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // 5. Favorites State - persistent
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('dish_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('dish_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  // 6. Reviews State - persistent
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('dish_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  useEffect(() => {
    localStorage.setItem('dish_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  // 7. Filtering and Search States
  const highestPriceInMenu = useMemo(() => {
    return Math.max(...dishes.map((d) => d.price), 100000);
  }, [dishes]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userMaxPrice, setUserMaxPrice] = useState(null);
  const [sortBy, setSortBy] = useState('popular');

  const maxPrice = userMaxPrice !== null ? userMaxPrice : highestPriceInMenu;
  const setMaxPrice = (val) => setUserMaxPrice(val);

  // Modals States
  const [selectedDetailDish, setSelectedDetailDish] = useState(null);
  const [selectedOrderDish, setSelectedOrderDish] = useState(null);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Admin CRUD functions
  const handleAddDish = (newDish) => {
    setDishes((prev) => [newDish, ...prev]);
  };

  const handleUpdateDish = (id, updatedFields) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updatedFields } : d))
    );
  };

  const handleDeleteDish = (id) => {
    setDishes((prev) => prev.filter((d) => d.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  const handleResetMenu = () => {
    setDishes(INITIAL_MENU);
  };

  const handleUpdatePassword = (newPass) => {
    setAdminPassword(newPass);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminModalOpen(false);
  };

  // Filtered & Sorted Dishes
  const filteredDishes = useMemo(() => {
    return dishes
      .filter((dish) => {
        // Category Filter
        if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
          return false;
        }

        // Price Filter
        if (dish.price > maxPrice) {
          return false;
        }

        // Search Query Filter across languages
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const nameUz = (dish.name.uz || '').toLowerCase();
          const nameRu = (dish.name.ru || '').toLowerCase();
          const nameEn = (dish.name.en || '').toLowerCase();
          const descUz = (dish.description?.uz || '').toLowerCase();
          return (
            nameUz.includes(q) ||
            nameRu.includes(q) ||
            nameEn.includes(q) ||
            descUz.includes(q)
          );
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priceAsc') return a.price - b.price;
        if (sortBy === 'priceDesc') return b.price - a.price;
        if (sortBy === 'ratingDesc') return (b.rating || 0) - (a.rating || 0);
        return (b.isChefSpecial ? 1 : 0) - (a.isChefSpecial ? 1 : 0);
      });
  }, [dishes, selectedCategory, maxPrice, searchQuery, sortBy]);

  const favoriteDishesList = useMemo(() => {
    return dishes.filter((d) => favorites.includes(d.id));
  }, [dishes, favorites]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setUserMaxPrice(null);
    setSortBy('popular');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      theme === 'dark' ? 'dark bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'
    }`}>
      
      {/* 1. Header Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesModalOpen(true)}
        t={t}
      />

      {/* 2. Hero Presentation Banner */}
      <section className={`relative overflow-hidden pt-8 pb-12 sm:pb-16 transition-colors duration-200 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-amber-950/20 via-transparent to-transparent'
          : 'bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300/50 dark:border-amber-700/50 text-amber-900 dark:text-amber-300 text-xs font-bold tracking-wide shadow-xs">
            <IconSparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{t.brandSubtitle}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-title font-extrabold tracking-tight text-stone-900 dark:text-stone-100 max-w-3xl mx-auto leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

        </div>
      </section>

      {/* 3. Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Search, Categories, Price Range Filters */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          highestDishPrice={highestPriceInMenu}
          sortBy={sortBy}
          setSortBy={setSortBy}
          t={t}
          totalDishes={dishes.length}
          filteredCount={filteredDishes.length}
          onResetFilters={handleResetFilters}
        />

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                lang={lang}
                t={t}
                isFavorite={favorites.includes(dish.id)}
                onToggleFavorite={toggleFavorite}
                onOpenDetail={(d) => setSelectedDetailDish(d)}
                onOpenOrder={(d) => setSelectedOrderDish(d)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center text-3xl shadow-xs">
              🔍
            </div>
            <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">
              {t.noDishesFound}
            </h3>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-md hover:bg-amber-500 transition cursor-pointer"
            >
              {t.resetFilters}
            </button>
          </div>
        )}

        {/* Customer Reviews & Feedback Section */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={addReview}
          t={t}
        />

      </main>

      {/* 4. Footer with Dark Mode Secret Admin Access */}
      <Footer
        theme={theme}
        onOpenAdminLogin={() => setIsAdminModalOpen(true)}
        t={t}
      />

      {/* 5. Modals */}
      
      {/* Dish Detail View Modal */}
      {selectedDetailDish && (
        <DishDetailModal
          dish={selectedDetailDish}
          lang={lang}
          t={t}
          isFavorite={favorites.includes(selectedDetailDish.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedDetailDish(null)}
          onOpenOrder={(d) => {
            setSelectedDetailDish(null);
            setSelectedOrderDish(d);
          }}
        />
      )}

      {/* Order Placement Modal */}
      {selectedOrderDish && (
        <OrderModal
          dish={selectedOrderDish}
          lang={lang}
          t={t}
          onClose={() => setSelectedOrderDish(null)}
        />
      )}

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        favoriteDishes={favoriteDishesList}
        lang={lang}
        t={t}
        onRemoveFavorite={removeFavorite}
        onClearFavorites={clearFavorites}
        onOpenDetail={(d) => setSelectedDetailDish(d)}
        onOpenOrder={(d) => setSelectedOrderDish(d)}
      />

      {/* Admin Panel Modal (Login gate + Dashboard) */}
      <AdminPanel
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isLoggedIn={isAdminLoggedIn}
        onLogin={() => setIsAdminLoggedIn(true)}
        onLogout={handleAdminLogout}
        adminPassword={adminPassword}
        onUpdatePassword={handleUpdatePassword}
        dishes={dishes}
        onAddDish={handleAddDish}
        onUpdateDish={handleUpdateDish}
        onDeleteDish={handleDeleteDish}
        onResetMenu={handleResetMenu}
        lang={lang}
        t={t}
      />

    </div>
  );
}

export default App;