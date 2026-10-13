import { useState, useRef, useCallback, useEffect, type TouchEvent, type MouseEvent } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Plus, X } from 'lucide-react';
import { reviews as seedReviews } from '@/data/content';
import Reveal from '@/components/Reveal';

export interface Review {
  id: number;
  name: string;
  service: string;
  rating: number;
  text: string;
}

const STORAGE_KEY = '440lab_user_reviews';
const SERVICE_OPTIONS = [
  'Registrazione',
  'Mixing',
  'Mastering',
  'Mix & Mastering',
  'Registrazione & Mix',
  'Registrazione & Mastering',
  'Produzione & Consulenza',
];

function loadUserReviews(): Review[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUserReviews(reviews: Review[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    /* ignore */
  }
}

export default function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const hasDragged = useRef(false);

  const [userReviews, setUserReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', service: SERVICE_OPTIONS[0], rating: 5, text: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setUserReviews(loadUserReviews());
  }, []);

  const allReviews: Review[] = [...userReviews, ...seedReviews];

  const scrollByCards = useCallback((dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-card]')?.getBoundingClientRect().width ?? 340;
    const gap = 24;
    el.scrollBy({ left: dir * (cardWidth + gap), behavior: 'smooth' });
  }, []);

  const handleDragStart = (clientX: number) => {
    const el = scrollRef.current;
    if (!el) return;
    startX.current = clientX;
    scrollStart.current = el.scrollLeft;
    hasDragged.current = false;
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const el = scrollRef.current;
    if (!el) return;
    const delta = clientX - startX.current;
    if (Math.abs(delta) > 5) hasDragged.current = true;
    el.scrollLeft = scrollStart.current - delta;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => handleDragMove(e.touches[0].clientX);
  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => handleDragStart(e.clientX);
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => handleDragMove(e.clientX);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      name: form.name.trim(),
      service: form.service,
      rating: form.rating,
      text: form.text.trim(),
    };

    const next = [newReview, ...userReviews];
    setUserReviews(next);
    saveUserReviews(next);

    setSubmitted(true);
    setForm({ name: '', service: SERVICE_OPTIONS[0], rating: 5, text: '' });
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 3000);

    // Scroll to the new review
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTo({ left: 0, behavior: 'smooth' });
    });
  };

  return (
    <section id="recensioni" className="relative py-24 lg:py-32 overflow-hidden bg-black">
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-neon/8 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <Reveal direction="up" className="text-center mb-12">
          <span className="text-neon text-sm font-semibold tracking-[0.2em] uppercase">Commenti & Recensioni</span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Cosa Dicono gli <span className="text-gradient-cyan">Artisti</span>
          </h2>
          <Reveal direction="up" delay={150}>
            <p className="mt-4 text-white/50 max-w-xl mx-auto font-light">
              Le parole di chi ha trasformato il proprio suono nel nostro studio. Scorri, trascina o usa le frecce.
            </p>
          </Reveal>
        </Reveal>

        {/* Write review button / form */}
        <div className="mb-10 flex justify-center">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ink-card border border-neon/30 text-neon font-semibold hover:bg-neon hover:text-black hover:shadow-neon-sm transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Scrivi una recensione
            </button>
          ) : (
            <Reveal direction="up" className="w-full max-w-xl">
              <form
                onSubmit={handleSubmit}
                className="relative p-6 rounded-2xl bg-ink-card border border-neon/30 shadow-neon-sm space-y-5"
              >
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-neon hover:bg-neon/10 transition-colors"
                  aria-label="Chiudi"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="font-display font-bold text-xl text-white pr-8">
                  La tua recensione
                </h3>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-ink-border rounded-xl text-white text-sm placeholder-white/30 focus:border-neon focus:outline-none focus:shadow-neon-sm transition-all"
                    placeholder="Il tuo nome o nome d'arte"
                  />
                </div>

                {/* Service */}
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Servizio utilizzato
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-ink-border rounded-xl text-white text-sm focus:border-neon focus:outline-none focus:shadow-neon-sm transition-all appearance-none"
                  >
                    {SERVICE_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-black">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    Valutazione
                  </label>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const value = idx + 1;
                      const active = (hoverRating || form.rating) >= value;
                      return (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setForm({ ...form, rating: value })}
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 transition-transform hover:scale-110 focus:outline-none"
                          aria-label={`${value} stelle`}
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              active ? 'text-neon fill-neon' : 'text-white/20'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-2 text-sm text-white/50">
                      {form.rating} / 5
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                    La tua esperienza
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-ink-border rounded-xl text-white text-sm placeholder-white/30 focus:border-neon focus:outline-none focus:shadow-neon-sm transition-all resize-none"
                    placeholder="Racconta la tua esperienza in studio..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    submitted
                      ? 'bg-neon/20 text-neon border border-neon/40'
                      : 'bg-neon text-black hover:shadow-neon hover:scale-[1.02]'
                  }`}
                >
                  {submitted ? 'Recensione pubblicata!' : 'Pubblica recensione'}
                </button>
              </form>
            </Reveal>
          )}
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Track */}
          <div
            ref={scrollRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={handleDragEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 -mx-5 px-5 lg:-mx-8 lg:px-8 cursor-grab select-none [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              ...(isDragging ? { cursor: 'grabbing' } : {}),
            }}
          >
            {allReviews.map((review, i) => (
              <Reveal
                key={review.id}
                direction="up"
                delay={Math.min(i * 80, 400)}
                duration={600}
                className="flex-shrink-0 snap-start"
              >
                <article
                  data-card
                  className="group relative w-[300px] sm:w-[360px] lg:w-[400px] rounded-2xl bg-ink-card border border-ink-border hover:border-neon/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Top accent line */}
                  <div className="h-px w-full bg-gradient-to-r from-neon via-neon/40 to-transparent" />

                  <div className="p-6 lg:p-7">
                    {/* Quote icon */}
                    <Quote className="w-8 h-8 text-neon/20 mb-4" fill="currentColor" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4.5 h-4.5 text-neon"
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-sm sm:text-[15px] text-white/70 leading-relaxed font-light min-h-[120px]">
                      {review.text}
                    </p>

                    {/* Divider */}
                    <div className="my-5 h-px bg-ink-border" />

                    {/* Author */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-display font-bold text-white text-sm sm:text-base truncate">
                          {review.name}
                        </div>
                        <div className="text-xs text-neon font-medium mt-0.5 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-neon flex-shrink-0" />
                          {review.service}
                        </div>
                      </div>
                      {/* Avatar circle */}
                      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-neon/10 border border-neon/25 flex items-center justify-center font-display font-bold text-neon text-sm">
                        {review.name.charAt(0)}
                      </div>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-neon/0 group-hover:bg-neon/[0.03] transition-colors duration-500 pointer-events-none" />
                </article>
              </Reveal>
            ))}
          </div>

          {/* Nav arrows */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => scrollByCards(-1)}
              className="w-11 h-11 rounded-full border border-neon/30 text-neon flex items-center justify-center hover:bg-neon hover:text-black hover:shadow-neon-sm transition-all duration-300"
              aria-label="Recensione precedente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              className="w-11 h-11 rounded-full border border-neon/30 text-neon flex items-center justify-center hover:bg-neon hover:text-black hover:shadow-neon-sm transition-all duration-300"
              aria-label="Recensione successiva"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
