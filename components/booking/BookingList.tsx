'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarX, CheckCircle2, Clock4, Sparkles } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/stores/bookingStore';
import type { Booking } from '@/types/teacher';
import { BookingCard } from './BookingCard';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'pending' | 'confirmed' | 'past';

interface BookingListProps {
  perspective: 'learner' | 'teacher';
  filterByTeacherSlug?: string;
}

export function BookingList({ perspective, filterByTeacherSlug }: BookingListProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const bookings = useBookingStore((s) => s.bookings);

  let list = bookings;
  if (filterByTeacherSlug) {
    list = list.filter((b) => b.teacherSlug === filterByTeacherSlug);
  }

  const counts = {
    all: list.length,
    pending: list.filter((b) => b.status === 'pending').length,
    confirmed: list.filter((b) => b.status === 'confirmed').length,
    past: list.filter((b) => ['completed', 'cancelled', 'declined'].includes(b.status)).length,
  };

  const filtered = applyFilter(list, filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            { k: 'all', icon: Sparkles, label: 'All' },
            { k: 'pending', icon: Clock4, label: 'Pending' },
            { k: 'confirmed', icon: CheckCircle2, label: 'Confirmed' },
            { k: 'past', icon: CalendarX, label: 'Past' },
          ] as { k: Filter; icon: typeof Sparkles; label: string }[]
        ).map(({ k, icon: Icon, label }) => {
          const active = filter === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setFilter(k)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all',
                active
                  ? 'border-accent bg-accent/15 text-accent shadow-gold-glow'
                  : 'border-border/60 bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground'
              )}
            >
              <Icon className="size-3.5" />
              {label}
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                  active ? 'bg-accent/30' : 'bg-secondary'
                )}
              >
                {counts[k]}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key={`empty-${filter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-3xl border border-dashed border-border/60 bg-card/40 p-12 text-center"
          >
            <p className="font-display text-xl">
              {perspective === 'teacher'
                ? 'No requests in this view yet.'
                : 'No sessions in this view yet.'}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {perspective === 'teacher'
                ? 'Learners will appear here as soon as they request a session.'
                : 'Find a teacher and book your first session — it’s free.'}
            </p>
            {perspective === 'learner' && (
              <Button asChild className="mt-5">
                <Link href="/teachers">Browse teachers</Link>
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={`grid-${filter}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {filtered.map((b) => (
              <BookingCard key={b.id} booking={b} perspective={perspective} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function applyFilter(list: Booking[], filter: Filter): Booking[] {
  if (filter === 'all') return list;
  if (filter === 'past') {
    return list.filter((b) => ['completed', 'cancelled', 'declined'].includes(b.status));
  }
  return list.filter((b) => b.status === filter);
}
