'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Clock, PlayCircle, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { Course } from '@/types/course';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const t = useTranslations('courses.card');
  const tFilter = useTranslations('courses.filters');
  const isAr = useLocale() === 'ar';

  const title = isAr && course.titleAr ? course.titleAr : course.title;
  const description = isAr && course.descriptionAr ? course.descriptionAr : course.description;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-subtle transition-shadow hover:shadow-elevated"
    >
      <Link href={`/courses/${course.slug}` as never}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={course.thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/40 to-transparent" />
          <div className="absolute left-4 top-4 flex gap-2">
            <Badge variant="default">{tFilter(course.category)}</Badge>
            <Badge variant="outline" className="bg-background/40 backdrop-blur-sm">
              {t(`level${course.level.charAt(0).toUpperCase()}${course.level.slice(1)}` as any)}
            </Badge>
          </div>
          <div className="absolute right-4 top-4">
            <Badge variant="success">{t('free')}</Badge>
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-display text-xl leading-tight tracking-tight group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>

          <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <PlayCircle className="size-4" />
              {t('lessons', { count: course.lessonCount })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {t('duration', { hours: course.durationHours })}
            </span>
          </div>

          {progress !== undefined && progress > 0 && (
            <div className="mt-4">
              <Progress value={progress} />
              <p className="mt-1.5 text-xs text-muted-foreground">{progress}% complete</p>
            </div>
          )}

          <div
            className={cn(
              'mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent',
              'transition-transform duration-300 group-hover:gap-3'
            )}
          >
            {progress && progress > 0 ? t('continue') : t('startLearning')}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
