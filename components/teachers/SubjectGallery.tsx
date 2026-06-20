'use client';

import { motion } from 'framer-motion';
import {
  BookOpen,
  Music2,
  Languages,
  Scale,
  ShieldCheck,
  Sparkles,
  Compass,
  Feather,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/lib/navigation';
import { subjects } from '@/lib/mock-data/subjects';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  'music-2': Music2,
  languages: Languages,
  scale: Scale,
  'shield-check': ShieldCheck,
  sparkles: Sparkles,
  compass: Compass,
  feather: Feather,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function SubjectGallery({ activeSlug }: { activeSlug?: string }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
    >
      {subjects.map((subject) => {
        const Icon = iconMap[subject.icon] ?? BookOpen;
        const active = activeSlug === subject.slug;
        return (
          <motion.div key={subject.slug} variants={item}>
            <Link
              href={`/teachers?subject=${subject.slug}` as never}
              className={cn(
                'group relative block overflow-hidden rounded-3xl border bg-card p-5 transition-all',
                'shadow-subtle hover:-translate-y-1 hover:shadow-elevated',
                active
                  ? 'border-accent ring-2 ring-accent/40'
                  : 'border-border/60 hover:border-accent/60'
              )}
            >
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-90',
                  subject.gradient
                )}
              />
              <div
                aria-hidden
                className="absolute -right-10 -top-10 size-32 rounded-full opacity-20 blur-3xl"
                style={{ background: subject.color }}
              />

              <div className="relative">
                <div
                  className="inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-md"
                  style={{
                    background: `${subject.color}1a`,
                    color: subject.color,
                  }}
                >
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-4 font-display text-lg leading-tight">{subject.name}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{subject.blurb}</p>

                <div className="mt-5 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground/80">
                    {subject.teacherCount} teachers
                  </span>
                  <span className="flex items-center gap-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Browse <ArrowRight className="size-3 rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
