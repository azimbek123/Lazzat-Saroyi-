import { useState } from 'react';
import { IconX, IconShoppingBag, IconCheck } from './Icons';
import { sendOrderToTelegram } from '../utils/telegram';

export function OrderModal({ dish, lang, t, onClose }) {
  const [customer, setCustomer] = useState({ name: '', phone: '', notes: '', quantity: 1 });
  const [submitted, setSubmitted] = useState(false);

  if (!dish) return null;

  const name = dish.name[lang] || dish.name['uz'] || '';
  const price = dish.price * customer.quantity;
  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(price) + ' ' + t.currency;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send notification to Telegram (fire-and-forget, don't block UI)
    sendOrderToTelegram({
      dish,
      lang,
      customer,
      formattedPrice,
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 animate-modal">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
        >
          <IconX className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <IconCheck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
              {t.orderSuccess}
            </h3>
            <p className="text-xs text-stone-500">
              {name} ({customer.quantity} dona) - {formattedPrice}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
              <img src={dish.image} alt={name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                  {name}
                </h3>
                <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                  {formattedPrice}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                {t.customerName} *
              </label>
              <input
                type="text"
                required
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder="Jasur Alimov"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                {t.customerPhone} *
              </label>
              <input
                type="tel"
                required
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                placeholder="+998 90 123 45 67"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                {t.orderQuantity}
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCustomer({ ...customer, quantity: Math.max(1, customer.quantity - 1) })}
                  className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition cursor-pointer"
                >
                  -
                </button>
                <span className="font-bold text-lg text-stone-900 dark:text-stone-100 min-w-8 text-center">
                  {customer.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setCustomer({ ...customer, quantity: customer.quantity + 1 })}
                  className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                {t.orderNotes}
              </label>
              <textarea
                rows="2"
                value={customer.notes}
                onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                placeholder="Qo'shimcha istaklaringiz..."
                className="w-full px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-sm"
              ></textarea>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              >
                {t.cancelBtn}
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-bold shadow-md shadow-amber-600/30 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <IconShoppingBag className="w-4 h-4" />
                <span>{t.submitOrder}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
