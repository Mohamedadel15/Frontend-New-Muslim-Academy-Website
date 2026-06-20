'use client';

import { motion } from 'framer-motion';
import { Clock, Eye, FileText, PlayCircle } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Badge } from '@/components/ui/badge';
import type { TeacherContent } from '@/types/teacher';
import { getSubject } from '@/lib/mock-data/subjects';
import { cn } from '@/lib/utils';

interface ContentListProps {
  items: TeacherContent[];
  emptyLabel?: string;
}

export function ContentList({ items, emptyLabel = 'No content yet.' }: ContentListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
        <p className="text-sm text-muted-foreground">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((c, i) => {
        const subj = getSubject(c.subjectSlug);
        const Icon = c.type === 'video' ? PlayCircle : FileText;
        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
          >
            <Link
              href={`/teachers/${c.teacherSlug}/content/${c.id}` as never}
              className={cn(
                'group relative block overflow-hidden rounded-2xl border border-border/60 bg-card transition-all',
                'hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-elevated'
              )}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background:
                      c.type === 'video'
                        ? 'linear-gradient(135deg, #1a1a2e 0%, #2d132c 50%, #1a1a2e 100%)'
                        : `linear-gradient(135deg, ${subj?.color ?? '#d4a017'}33 0%, #1a1a2e 100%)`,
                  }}
                />
                <div className="absolute inset-0 bg-arabesque-pattern opacity-30" />
                <div className="absolute inset-0 grid place-items-center">
                  <Icon className="size-14 text-white/80 transition-transform group-hover:scale-110" />
                </div>
                <div className="absolute left-3 top-3 flex gap-2">
                  {subj && (
                    <Badge
                      className="border-0"
                      style={{ background: `${subj.color}33`, color: subj.color }}
                    >
                      {subj.name}
                    </Badge>
                  )}
                  <Badge variant="outline" className="bg-background/40 capitalize backdrop-blur-sm">
                    {c.type}
                  </Badge>
                </div>
              </div>
              <div className="p-5">
                <h4 className="font-display text-base leading-tight transition-colors group-hover:text-accent">
                  {c.title}
                </h4>
                <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">{c.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {c.durationMin} min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="size-3.5" />
                    {c.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
