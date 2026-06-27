'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { BadgeCheck, GraduationCap, Star, Users } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Badge } from '@/components/ui/badge';
import type { Teacher } from '@/types/teacher';
import { getSubject } from '@/lib/mock-data/subjects';

interface TeacherCardProps {
  teacher: Teacher;
}

export function TeacherCard({ teacher }: TeacherCardProps) {
  const t = useTranslations('teachers');
  const isAr = useLocale() === 'ar';
  const displayName = isAr && teacher.nameAr ? teacher.nameAr : teacher.name;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-subtle transition-shadow hover:shadow-elevated"
    >
      <Link href={`/teachers/${teacher.slug}` as never} className="block">
        <div className="relative h-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-warm" />
          <div className="absolute inset-0 bg-arabesque-pattern opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/0 to-transparent" />
        </div>

        <div className="px-6 pb-6 -mt-12">
          <div className="relative flex items-end justify-between gap-4">
            <div className="relative">
              <div className="size-20 overflow-hidden rounded-2xl border-4 border-card bg-white ring-1 ring-accent/30">
                <Image
                  src={teacher.avatar}
                  alt={displayName}
                  width={80}
                  height={80}
                  className="size-full object-cover"
                />
              </div>
              {teacher.verified && (
                <BadgeCheck className="absolute -right-1 -bottom-1 size-5 rounded-full bg-card text-accent" />
              )}
            </div>

            <div className="mt-12 flex items-center gap-1 rounded-full border border-border/60 bg-card/80 px-2 py-1 text-xs backdrop-blur">
              <Star className="size-3 fill-accent text-accent" />
              <span className="font-medium">{teacher.rating}</span>
              <span className="text-muted-foreground">({teacher.reviewCount})</span>
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-display text-lg leading-tight group-hover:text-accent transition-colors">
              {displayName}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {isAr && teacher.communityAr ? teacher.communityAr : teacher.title}
            </p>
          </div>

          <p className="mt-3 line-clamp-2 text-sm text-foreground/80">
            {isAr && teacher.bioAr ? teacher.bioAr : teacher.bio}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {teacher.subjects.slice(0, 3).map((s) => {
              const subj = getSubject(s);
              return (
                <Badge key={s} variant="secondary" className="text-[10px]">
                  {isAr && subj?.nameAr ? subj.nameAr : subj?.name ?? s}
                </Badge>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border/60 pt-4 text-xs">
            <div className="flex flex-col items-center gap-0.5">
              <Users className="size-3.5 text-accent" />
              <span className="font-medium">{teacher.studentCount}+</span>
              <span className="text-[10px] text-muted-foreground">{t('students')}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 border-x border-border/60">
              <GraduationCap className="size-3.5 text-accent" />
              <span className="font-medium">{teacher.yearsTeaching}y</span>
              <span className="text-[10px] text-muted-foreground">{t('teaching')}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-accent font-display text-base">{t('free')}</span>
              <span className="text-[10px] text-muted-foreground">{t('perSession')}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
