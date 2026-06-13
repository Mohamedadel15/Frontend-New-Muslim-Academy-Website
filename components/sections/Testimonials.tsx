'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/animations/FadeIn';

interface TestimonialItem {
  quote: string;
  author: string;
  location: string;
}

export function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as TestimonialItem[];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const current = items[index];

  return (
    <section
      className="section-pad relative overflow-hidden bg-gradient-warm text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-arabesque-pattern opacity-30"
      />
      <div
        aria-hidden
        className="absolute top-1/4 -left-32 h-72 w-72 rounded-full bg-accent/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-purple-500/20 blur-[100px]"
      />

      <div className="container-pad relative">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{t('eyebrow')}</p>
          <h2 className="mt-3 font-display text-display-xl">{t('heading')}</h2>
        </FadeIn>

        <div className="mx-auto mt-16 max-w-3xl">
          <Quote className="mx-auto mb-8 size-12 text-accent/40" />

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="font-display text-xl md:text-2xl leading-relaxed text-balance text-white/90">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-8">
                <p className="font-medium text-accent">— {current.author}</p>
                <p className="text-sm text-white/60">{current.location}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
              aria-label="Previous testimonial"
              className="grid size-10 place-items-center rounded-full border border-white/15 text-white/60 transition-all hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="size-4 rtl:rotate-180" />
            </button>

            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="group relative h-1.5 w-8 overflow-hidden rounded-full bg-white/15"
                >
                  {i === index && (
                    <motion.span
                      layoutId="testimonial-dot"
                      className="absolute inset-0 bg-accent"
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIndex((i) => (i + 1) % items.length)}
              aria-label="Next testimonial"
              className={cn(
                'grid size-10 place-items-center rounded-full border border-white/15',
                'text-white/60 transition-all hover:border-accent hover:text-accent'
              )}
            >
              <ChevronRight className="size-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
