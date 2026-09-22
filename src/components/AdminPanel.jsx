import { useState } from 'react';
import {
  IconLock,
  IconLogOut,
  IconPlus,
  IconTrash,
  IconEdit,
  IconX,
  IconCheck
} from './Icons';

export function AdminPanel({
  isOpen,
  onClose,
  isLoggedIn,
  onLogin,
  onLogout,
  adminPassword,
  onUpdatePassword,
  dishes,
  onAddDish,
  onUpdateDish,
  onDeleteDish,
  onResetMenu,
  lang,
  t
}) {
  // Login modal states
  const [inputPassword, setInputPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Tab: 'dishes' | 'security'
  const [activeTab, setActiveTab] = useState('dishes');

  // Dish Form State
  const [editingDishId, setEditingDishId] = useState(null); // null = new, id = editing
  const [showDishForm, setShowDishForm] = useState(false);
  const [dishFormData, setDishFormData] = useState({
    nameUz: '',
    nameRu: '',
    nameEn: '',
    price: 45000,
    category: 'national',
    image: '',
    rating: 4.9,
    cookTime: '15-20 daqiqa',
    calories: 550,
    descUz: '',
    descRu: '',
    descEn: '',
    ingredientsUz: '',
    ingredientsRu: '',
    ingredientsEn: '',
    isChefSpecial: false,
  });

  // Password change states
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMessage, setPassMessage] = useState({ type: '', text: '' });

  // Notifications
  const [toastMsg, setToastMsg] = useState('');
  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  if (!isOpen) return null;

  // 1. ADMIN LOGIN VIEW
  if (!isLoggedIn) {
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      if (inputPassword === adminPassword) {
        setLoginError(false);
        setInputPassword('');
        onLogin();
      } else {
        setLoginError(true);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 animate-modal">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
          >
            <IconX className="w-5 h-5" />
          </button>

          <div className="text-center space-y-3 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center ring-4 ring-amber-500/10">
              <IconLock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {t.adminLoginTitle}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {t.adminLoginDesc}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                {t.adminPassword}
              </label>
              <input
                type="password"
                required
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Parolni kiriting..."
                className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
              {loginError && (
                <p className="text-xs font-semibold text-rose-500 mt-1.5">
                  {t.wrongPassword}
                </p>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              >
                {t.cancelBtn}
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-md shadow-amber-600/30 transition cursor-pointer"
              >
                {t.loginBtn}
              </button>
            </div>
          </form>

          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
            <span className="text-[11px] text-stone-400">
              Standart parol: <code className="bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-amber-600 dark:text-amber-400">admin123</code>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2. ADMIN DASHBOARD VIEW
  const handleOpenAddForm = () => {
    setEditingDishId(null);
    setDishFormData({
      nameUz: '',
      nameRu: '',
      nameEn: '',
      price: 45000,
      category: 'national',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      cookTime: '15-20 daqiqa',
      calories: 550,
      descUz: '',
      descRu: '',
      descEn: '',
      ingredientsUz: 'Go\'sht, Piyoz, Ziravorlar',
      ingredientsRu: 'Мясо, Лук, Специи',
      ingredientsEn: 'Meat, Onion, Spices',
      isChefSpecial: false,
    });
    setShowDishForm(true);
  };

  const handleOpenEditForm = (dish) => {
    setEditingDishId(dish.id);
    setDishFormData({
      nameUz: dish.name.uz || '',
      nameRu: dish.name.ru || '',
      nameEn: dish.name.en || '',
      price: dish.price,
      category: dish.category,
      image: dish.image,
      rating: dish.rating || 4.9,
      cookTime: dish.cookTime || '15-20 min',
      calories: dish.calories || 500,
      descUz: dish.description?.uz || '',
      descRu: dish.description?.ru || '',
      descEn: dish.description?.en || '',
      ingredientsUz: (dish.ingredients?.uz || []).join(', '),
      ingredientsRu: (dish.ingredients?.ru || []).join(', '),
      ingredientsEn: (dish.ingredients?.en || []).join(', '),
      isChefSpecial: dish.isChefSpecial || false,
    });
    setShowDishForm(true);
  };

  const handleDishFormSubmit = (e) => {
    e.preventDefault();

    const preparedDish = {
      name: {
        uz: dishFormData.nameUz.trim() || 'Yangi Taom',
        ru: dishFormData.nameRu.trim() || dishFormData.nameUz.trim(),
        en: dishFormData.nameEn.trim() || dishFormData.nameUz.trim(),
      },
      price: Number(dishFormData.price) || 10000,
      category: dishFormData.category,
      image: dishFormData.image.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      rating: Number(dishFormData.rating) || 4.9,
      cookTime: dishFormData.cookTime.trim() || '15-20 min',
      calories: Number(dishFormData.calories) || 450,
      isChefSpecial: dishFormData.isChefSpecial,
      description: {
        uz: dishFormData.descUz.trim() || 'Lazzatli milliy taom.',
        ru: dishFormData.descRu.trim() || 'Вкусное традиционное блюдо.',
        en: dishFormData.descEn.trim() || 'Delicious traditional dish.',
      },
      ingredients: {
        uz: dishFormData.ingredientsUz.split(',').map(s => s.trim()).filter(Boolean),
        ru: dishFormData.ingredientsRu.split(',').map(s => s.trim()).filter(Boolean),
        en: dishFormData.ingredientsEn.split(',').map(s => s.trim()).filter(Boolean),
      }
    };

    if (editingDishId) {
      onUpdateDish(editingDishId, preparedDish);
      triggerToast(t.dishSavedSuccess);
    } else {
      onAddDish({
        id: Date.now(),
        reviewsCount: 1,
        ...preparedDish
      });
      triggerToast(t.dishSavedSuccess);
    }

    setShowDishForm(false);
  };

  const handleDeleteDishClick = (id) => {
    if (window.confirm(t.deleteConfirm)) {
      onDeleteDish(id);
      triggerToast(t.dishDeletedSuccess);
    }
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (currPass !== adminPassword) {
      setPassMessage({ type: 'error', text: t.wrongCurrentPassword });
      return;
    }
    if (newPass.length < 4) {
      setPassMessage({ type: 'error', text: 'Parol kamida 4 belgidan iborat bo\'lishi kerak!' });
      return;
    }
    if (newPass !== confirmPass) {
      setPassMessage({ type: 'error', text: t.passwordMismatch });
      return;
    }

    onUpdatePassword(newPass);
    setCurrPass('');
    setNewPass('');
    setConfirmPass('');
    setPassMessage({ type: 'success', text: t.passwordChanged });
    setTimeout(() => setPassMessage({ type: '', text: '' }), 4000);
  };

  const handleResetClick = () => {
    if (window.confirm(t.resetConfirm)) {
      onResetMenu();
      triggerToast(t.menuResetSuccess);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-hidden">
      <div className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden animate-modal">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 bg-stone-50/70 dark:bg-stone-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-md shadow-amber-600/20">
              <IconLock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                  {t.adminTitle}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 text-[10px] font-extrabold uppercase">
                  {t.adminBadge}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Lazzat Saroyi CRM • {dishes.length} {t.dishesFound}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 text-xs font-bold hover:bg-rose-100 transition cursor-pointer"
              title={t.logoutBtn}
            >
              <IconLogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t.logoutBtn}</span>
            </button>

            {/* Close window */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
            >
              <IconX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 bg-white dark:bg-stone-900">
          <div className="flex space-x-4">
            <button
              onClick={() => {
                setActiveTab('dishes');
                setShowDishForm(false);
              }}
              className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'dishes'
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              Taomlar ({dishes.length})
            </button>

            <button
              onClick={() => {
                setActiveTab('security');
                setShowDishForm(false);
              }}
              className={`py-3.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === 'security'
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              {t.changePassword}
            </button>
          </div>

          {activeTab === 'dishes' && !showDishForm && (
            <div className="flex items-center gap-2 py-2">
              <button
                onClick={handleResetClick}
                className="text-xs text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 font-medium px-2 py-1 cursor-pointer"
                title="Menyuni boshlang'ich 14 taomga qaytarish"
              >
                {t.resetDefaultMenu}
              </button>
              <button
                onClick={handleOpenAddForm}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                <IconPlus className="w-4 h-4" />
                <span>{t.addNewDish}</span>
              </button>
            </div>
          )}
        </div>

        {/* Toast Alert */}
        {toastMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <IconCheck className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: DISHES */}
          {activeTab === 'dishes' && (
            <>
              {/* Form for Add / Edit Dish */}
              {showDishForm ? (
                <div className="bg-stone-50 dark:bg-stone-800/60 p-5 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700">
                    <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                      {editingDishId ? t.editDish : t.addNewDish}
                    </h3>
                    <button
                      onClick={() => setShowDishForm(false)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                    >
                      <IconX className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleDishFormSubmit} className="space-y-4">
                    
                    {/* Names in 3 languages */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                          {t.dishNameUz} *
                        </label>
                        <input
                          type="text"
                          required
                          value={dishFormData.nameUz}
                          onChange={(e) => setDishFormData({ ...dishFormData, nameUz: e.target.value })}
                          placeholder="Mavsumiy Osh"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                          {t.dishNameRu}
                        </label>
                        <input
                          type="text"
                          value={dishFormData.nameRu}
                          onChange={(e) => setDishFormData({ ...dishFormData, nameRu: e.target.value })}
                          placeholder="Сезонный Плов"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                          {t.dishNameEn}
                        </label>
                        <input
                          type="text"
                          value={dishFormData.nameEn}
                          onChange={(e) => setDishFormData({ ...dishFormData, nameEn: e.target.value })}
                          placeholder="Seasonal Pilaf"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                        />
                      </div>
                    </div>

                    {/* Price, Category, Rating */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                          {t.dishPrice} *
                        </label>
                        <input
                          type="number"
                          required
                          min="1000"
                          step="1000"
                          value={dishFormData.price}
                          onChange={(e) => setDishFormData({ ...dishFormData, price: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                          {t.dishCategory}
                        </label>
                        <select
                          value={dishFormData.category}
                          onChange={(e) => setDishFormData({ ...dishFormData, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                        >
                          <option value="national">{t.categories.national}</option>
                          <option value="kebabs">{t.categories.kebabs}</option>
                          <option value="soups">{t.categories.soups}</option>
                          <option value="salads">{t.categories.salads}</option>
                          <option value="bakery">{t.categories.bakery}</option>
                          <option value="desserts">{t.categories.desserts}</option>
                          <option value="drinks">{t.categories.drinks}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                          {t.dishRating}
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={dishFormData.rating}
                          onChange={(e) => setDishFormData({ ...dishFormData, rating: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                        />
                      </div>
                    </div>

                    {/* Image URL with live preview */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                        {t.dishImage} *
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          required
                          value={dishFormData.image}
                          onChange={(e) => setDishFormData({ ...dishFormData, image: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                        />
                        {dishFormData.image && (
                          <img
                            src={dishFormData.image}
                            alt="Preview"
                            className="w-10 h-10 rounded-xl object-cover border border-amber-400"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        )}
                      </div>
                    </div>

                    {/* Cook time & Calories */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                          {t.dishCookTime}
                        </label>
                        <input
                          type="text"
                          value={dishFormData.cookTime}
                          onChange={(e) => setDishFormData({ ...dishFormData, cookTime: e.target.value })}
                          placeholder="15-20 daqiqa"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                          {t.dishCalories}
                        </label>
                        <input
                          type="number"
                          value={dishFormData.calories}
                          onChange={(e) => setDishFormData({ ...dishFormData, calories: e.target.value })}
                          placeholder="550"
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                        />
                      </div>
                    </div>

                    {/* Descriptions */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                        {t.dishDescUz}
                      </label>
                      <textarea
                        rows="2"
                        value={dishFormData.descUz}
                        onChange={(e) => setDishFormData({ ...dishFormData, descUz: e.target.value })}
                        placeholder="Taom haqida batafsil ma'lumot..."
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                      />
                    </div>

                    {/* Ingredients */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                        {t.dishIngredients}
                      </label>
                      <input
                        type="text"
                        value={dishFormData.ingredientsUz}
                        onChange={(e) => setDishFormData({ ...dishFormData, ingredientsUz: e.target.value })}
                        placeholder="Guruch, Go'sht, Sabzi, Zira"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                      />
                    </div>

                    {/* Chef special checkbox */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="chefSpecialCheck"
                        checked={dishFormData.isChefSpecial}
                        onChange={(e) => setDishFormData({ ...dishFormData, isChefSpecial: e.target.checked })}
                        className="w-4 h-4 rounded text-amber-600 accent-amber-500 cursor-pointer"
                      />
                      <label htmlFor="chefSpecialCheck" className="text-xs font-bold text-stone-700 dark:text-stone-300 cursor-pointer">
                        {t.chefSpecial}
                      </label>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end gap-2 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowDishForm(false)}
                        className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                      >
                        {t.cancelBtn}
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md cursor-pointer"
                      >
                        {editingDishId ? t.updateBtn : t.saveBtn}
                      </button>
                    </div>

                  </form>
                </div>
              ) : null}

              {/* Dishes Table */}
              <div className="overflow-x-auto rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
                <table className="w-full text-left text-xs text-stone-700 dark:text-stone-300">
                  <thead className="bg-stone-100 dark:bg-stone-800/80 uppercase font-bold text-stone-500 dark:text-stone-400 text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5">Taom</th>
                      <th className="p-3.5">Toifa</th>
                      <th className="p-3.5">Narxi</th>
                      <th className="p-3.5">Baho</th>
                      <th className="p-3.5 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                    {dishes.map((dish) => {
                      const name = dish.name[lang] || dish.name['uz'] || '';
                      const priceFormatted = new Intl.NumberFormat('uz-UZ').format(dish.price) + ' ' + t.currency;
                      const catLabel = t.categories[dish.category] || dish.category;

                      return (
                        <tr key={dish.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition">
                          <td className="p-3.5 flex items-center gap-3">
                            <img
                              src={dish.image}
                              alt={name}
                              className="w-12 h-12 rounded-xl object-cover shadow-xs"
                            />
                            <div>
                              <p className="font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                                {name}
                              </p>
                              <p className="text-[11px] text-stone-400">
                                ID: #{dish.id}
                              </p>
                            </div>
                          </td>
                          <td className="p-3.5 font-medium">
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[11px] text-stone-600 dark:text-stone-400">
                              {catLabel}
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-amber-600 dark:text-amber-400">
                            {priceFormatted}
                          </td>
                          <td className="p-3.5 font-semibold">
                            ★ {dish.rating?.toFixed(1) || '5.0'}
                          </td>
                          <td className="p-3.5 text-right space-x-1.5">
                            <button
                              onClick={() => handleOpenEditForm(dish)}
                              className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition cursor-pointer"
                              title={t.editDish}
                            >
                              <IconEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDishClick(dish.id)}
                              className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition cursor-pointer"
                              title={t.deleteDish}
                            >
                              <IconTrash className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* TAB 2: SECURITY & PASSWORD */}
          {activeTab === 'security' && (
            <div className="max-w-md mx-auto p-6 bg-stone-50 dark:bg-stone-800/50 rounded-3xl border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
                  {t.changePassword}
                </h3>
                <p className="text-xs text-stone-500">
                  Bu yerda kiritilgan yangi parol brauzeringiz xotirasida (localStorage) doimiy saqlanadi va sahifani yangilaganda ham o'zgarmaydi.
                </p>
              </div>

              {passMessage.text && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    passMessage.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300'
                  }`}
                >
                  {passMessage.text}
                </div>
              )}

              <form onSubmit={handleChangePasswordSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                    {t.currentPassword}
                  </label>
                  <input
                    type="password"
                    required
                    value={currPass}
                    onChange={(e) => setCurrPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                    {t.newPassword}
                  </label>
                  <input
                    type="password"
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Kamida 4 ta belgi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-300 mb-1">
                    {t.confirmNewPassword}
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  {t.saveBtn}
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
