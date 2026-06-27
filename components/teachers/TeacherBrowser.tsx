'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { teachers } from '@/lib/mock-data/teachers';
import { subjects, getSubject } from '@/lib/mock-data/subjects';
import { SubjectGallery } from './SubjectGallery';
import { TeacherCard } from './TeacherCard';
import { cn } from '@/lib/utils';

type SortKey = 'top' | 'students' | 'recent';

interface TeacherBrowserProps {
  initialSubject?: string;
}

export function TeacherBrowser({ initialSubject }: TeacherBrowserProps) {
  const t = useTranslations('teachers');
  const isAr = useLocale() === 'ar';
  const [activeSubject, setActiveSubject] = useState<string | undefined>(initialSubject);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('top');

  const filtered = useMemo(() => {
    let list = teachers;
    if (activeSubject) {
      list = list.filter((tc) => tc.subjects.includes(activeSubject as never));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (tc) =>
          tc.name.toLowerCase().includes(q) ||
          (tc.nameAr ?? '').includes(query) ||
          tc.title.toLowerCase().includes(q) ||
          (tc.community ?? '').toLowerCase().includes(q) ||
          (tc.communityAr ?? '').includes(query) ||
          tc.bio.toLowerCase().includes(q) ||
          (tc.bioAr ?? '').includes(query)
      );
    }
    if (sort === 'top') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'students') list = [...list].sort((a, b) => b.studentCount - a.studentCount);
    if (sort === 'recent') list = [...list].sort((a, b) => b.sessionsCompleted - a.sessionsCompleted);
    return list;
  }, [activeSubject, query, sort]);

  const activeMeta = activeSubject ? getSubject(activeSubject) : undefined;

  return (
    <div className="container-pad section-pad space-y-12">
      <header className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
          <Sparkles className="size-3.5" />
          {t('browserBadge')}
        </div>
        <h1 className="mt-6 font-display text-display-lg text-balance">
          {t('browserTitle')} <span className="gold-text">{t('browserTitleAccent')}</span>
        </h1>
        <p className="mt-4 text-muted-foreground">{t('browserSubtitle')}</p>
      </header>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-xl">{t('pickSubject')}</h2>
          {activeSubject && (
            <button
              type="button"
              onClick={() => setActiveSubject(undefined)}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
            >
              <X className="size-3.5" /> {t('clearFilter')}
            </button>
          )}
        </div>
        <SubjectGallery activeSlug={activeSubject} />
      </section>

      <section>
        <div className="rounded-3xl border border-border/60 bg-card/60 backdrop-blur p-5 lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              {activeMeta ? (
                <>
                  <Badge
                    className="border-0 px-3 py-1.5 text-sm"
                    style={{
                      background: `${activeMeta.color}1a`,
                      color: activeMeta.color,
                    }}
                  >
                    {isAr && activeMeta.nameAr ? activeMeta.nameAr : activeMeta.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {t('available', { count: filtered.length })}
                  </span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {t('showingAll', { count: filtered.length })}
                </span>
              )}
            </div>

            <div className="flex flex-1 items-center gap-2 lg:max-w-md">
              <div className="relative flex-1">
                <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="pl-9 rtl:pl-3 rtl:pr-9"
                />
              </div>
              <div className="hidden md:flex items-center gap-1 rounded-full border border-border/60 bg-background px-1 py-1 text-xs">
                {(
                  [
                    { k: 'top', label: t('sortTop') },
                    { k: 'students', label: t('sortStudents') },
                    { k: 'recent', label: t('sortActive') },
                  ] as { k: SortKey; label: string }[]
                ).map(({ k, label }) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setSort(k)}
                    className={cn(
                      'rounded-full px-3 py-1.5 transition-colors',
                      sort === k
                        ? 'bg-accent text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Filters">
                <SlidersHorizontal className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-dashed border-border/60 bg-card/40 p-16 text-center"
            >
              <p className="font-display text-xl">{t('noMatches')}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t('noMatchesBody')}</p>
              <Button
                className="mt-6"
                onClick={() => {
                  setActiveSubject(undefined);
                  setQuery('');
                }}
              >
                {t('resetFilters')}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((t) => (
                <TeacherCard key={t.slug} teacher={t} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="grid gap-4 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card p-8 sm:grid-cols-3">
        {[
          { n: '8', label: t('statSubjects'), sub: t('statSubjectsSub') },
          { n: subjects.reduce((a, s) => a + s.teacherCount, 0).toString(), label: t('statTeachers'), sub: t('statTeachersSub') },
          { n: '100%', label: t('statFree'), sub: t('statFreeSub') },
        ].map(({ n, label, sub }) => (
          <div key={label} className="text-center sm:border-r sm:border-border/60 sm:last:border-0">
            <p className="gold-text font-display text-3xl md:text-4xl">{n}</p>
            <p className="mt-1 font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">{sub}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
