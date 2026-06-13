'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/stores/progressStore';
import { courses } from '@/lib/mock-data/courses';

export default function ProgressPage() {
  const t = useTranslations('dashboard.sidebar');
  const { enrolledCourses, courseProgress, completedLessons } = useProgressStore();

  const enrolled = courses.filter((c) => enrolledCourses.includes(c.slug));
  const avg =
    enrolled.length === 0
      ? 0
      : Math.round(
          enrolled.reduce((sum, c) => sum + (courseProgress[c.slug] ?? 0), 0) / enrolled.length
        );

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header>
        <h1 className="font-display text-3xl">{t('progress')}</h1>
        <p className="mt-2 text-muted-foreground">Where you are on the journey.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Average progress
            </p>
            <p className="mt-2 font-display text-4xl">{avg}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Lessons completed
            </p>
            <p className="mt-2 font-display text-4xl">{completedLessons.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Active courses
            </p>
            <p className="mt-2 font-display text-4xl">{enrolled.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="font-display text-xl mb-6">Course-by-course</h2>
          <div className="space-y-5">
            {enrolled.map((c) => (
              <div key={c.slug}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <p className="font-medium">{c.title}</p>
                  <p className="text-muted-foreground">{courseProgress[c.slug] ?? 0}%</p>
                </div>
                <Progress value={courseProgress[c.slug] ?? 0} />
              </div>
            ))}
            {enrolled.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Enroll in a course to start tracking progress.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
