'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Check,
  Compass,
  Feather,
  Languages,
  Music2,
  Save,
  Scale,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import { getTeacher } from '@/lib/mock-data/teachers';
import { subjects } from '@/lib/mock-data/subjects';
import { cn } from '@/lib/utils';
import type { SubjectSlug } from '@/types/teacher';

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

export function TeacherSubjects() {
  const teacherSlug = useAuthStore((s) => s.user?.teacherSlug ?? 'sh-yusuf-bilal');
  const teacher = getTeacher(teacherSlug);

  const [selected, setSelected] = useState<SubjectSlug[]>(teacher?.subjects ?? []);
  const [saved, setSaved] = useState(false);

  const toggle = (s: SubjectSlug) => {
    setSaved(false);
    setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  };

  const stats = useMemo(
    () => ({
      selected: selected.length,
      total: subjects.length,
    }),
    [selected]
  );

  return (
    <div className="p-6 lg:p-10 space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <GraduationCap className="size-3.5" /> Subjects I teach
          </div>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">Choose your specialisations</h1>
          <p className="mt-2 text-muted-foreground">
            Learners filter by subject — only the ones you select will see you in their search.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-5 py-3">
          <span className="text-sm text-muted-foreground">Selected</span>
          <span className="font-display text-2xl text-accent">{stats.selected}</span>
          <span className="text-sm text-muted-foreground">/ {stats.total}</span>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {subjects.map((s, i) => {
          const Icon = iconMap[s.icon] ?? BookOpen;
          const active = selected.includes(s.slug);
          return (
            <motion.button
              key={s.slug}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              onClick={() => toggle(s.slug)}
              className={cn(
                'group relative overflow-hidden rounded-3xl border bg-card p-5 text-left transition-all',
                'hover:-translate-y-1 hover:shadow-elevated',
                active ? 'border-accent shadow-gold-glow' : 'border-border/60 hover:border-accent/60'
              )}
            >
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-br transition-opacity',
                  s.gradient,
                  active ? 'opacity-90' : 'opacity-30 group-hover:opacity-60'
                )}
              />
              <div
                aria-hidden
                className="absolute -right-12 -top-12 size-32 rounded-full opacity-30 blur-3xl"
                style={{ background: s.color }}
              />

              <div className="relative flex items-start justify-between">
                <div
                  className="grid size-12 place-items-center rounded-2xl border border-white/10 backdrop-blur-md"
                  style={{ background: `${s.color}1a`, color: s.color }}
                >
                  <Icon className="size-5" />
                </div>
                <div
                  className={cn(
                    'grid size-7 place-items-center rounded-full border transition-all',
                    active
                      ? 'border-accent bg-accent text-primary-foreground'
                      : 'border-border/60 bg-card/40'
                  )}
                >
                  {active && <Check className="size-3.5" />}
                </div>
              </div>

              <h3 className="relative mt-4 font-display text-lg leading-tight">{s.name}</h3>
              <p className="relative mt-1 text-xs text-muted-foreground line-clamp-2">{s.blurb}</p>

              <div className="relative mt-4 flex items-center justify-between">
                <Badge variant="secondary" className="text-[10px]">
                  {s.teacherCount} teachers
                </Badge>
                <span className="text-[10px] font-mono text-muted-foreground">{s.nameAr}</span>
              </div>
            </motion.button>
          );
        })}
      </section>

      <div className="flex items-center justify-end gap-3">
        {saved && (
          <span className="inline-flex items-center gap-1.5 text-sm text-success">
            <Check className="size-4" /> Subjects saved
          </span>
        )}
        <Button
          onClick={() => {
            setSaved(true);
          }}
        >
          <Save className="size-4" /> Save selection
        </Button>
      </div>
    </div>
  );
}
