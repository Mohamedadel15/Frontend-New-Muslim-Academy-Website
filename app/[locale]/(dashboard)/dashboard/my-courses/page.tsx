'use client';

import { useTranslations } from 'next-intl';
import { useProgressStore } from '@/stores/progressStore';
import { CourseCard } from '@/components/courses/CourseCard';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';
import { courses } from '@/lib/mock-data/courses';

export default function MyCoursesPage() {
  const t = useTranslations('dashboard');
  const { enrolledCourses, courseProgress } = useProgressStore();
  const enrolled = courses.filter((c) => enrolledCourses.includes(c.slug));

  return (
    <div className="p-6 lg:p-10">
      <header className="mb-8">
        <h1 className="font-display text-3xl">{t('sidebar.myCourses')}</h1>
        <p className="mt-2 text-muted-foreground">
          Every course you&apos;ve enrolled in, all in one place.
        </p>
      </header>

      {enrolled.length === 0 ? (
        <div className="rounded-3xl border border-border/60 bg-card p-12 text-center">
          <p className="text-muted-foreground">{t('noProgress')}</p>
          <Button asChild className="mt-4">
            <Link href="/courses">{t('exploreCourses')}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {enrolled.map((c) => (
            <CourseCard key={c.slug} course={c} progress={courseProgress[c.slug]} />
          ))}
        </div>
      )}
    </div>
  );
}
