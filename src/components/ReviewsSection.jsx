import { useState } from 'react';
import { IconStar } from './Icons';

export function ReviewsSection({ reviews, onAddReview, t }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onAddReview({
      id: Date.now(),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
    });

    setName('');
    setComment('');
    setRating(5);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };

  return (
    <section className="mt-20 border-t border-stone-200/80 dark:border-stone-800/80 pt-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400">
            {t.brandSubtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-stone-900 dark:text-stone-100">
            {t.reviewsSectionTitle}
          </h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t.reviewsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Reviews List (2 cols) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800/70 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-stone-900 font-bold flex items-center justify-center text-xs shadow-xs">
                        {rev.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                        {rev.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400">
                      {rev.date}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <IconStar
                        key={idx}
                        className="w-3.5 h-3.5"
                        filled={idx < Math.round(rev.rating)}
                      />
                    ))}
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300 ml-1">
                      {rev.rating}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Leave a Review Form (1 col) */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {t.leaveReview}
            </h3>

            {showSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                {t.reviewSuccess}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                  {t.customerName}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jasur"
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                  {t.yourRating}
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-120 transition cursor-pointer"
                    >
                      <IconStar className="w-5 h-5" filled={star <= rating} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300 ml-2">
                    {rating} / 5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                  {t.yourComment}
                </label>
                <textarea
                  rows="3"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Taomlar va xizmat juda yoqdi..."
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-600/20 transition cursor-pointer"
              >
                {t.sendReview}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
