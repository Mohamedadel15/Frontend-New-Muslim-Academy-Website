'use client';

import { useTranslations } from 'next-intl';
import { Calendar, Trophy, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from '@/lib/navigation';
import { CourseCard } from '@/components/courses/CourseCard';
import { useAuthStore } from '@/stores/authStore';
import { useProgressStore } from '@/stores/progressStore';
import { courses } from '@/lib/mock-data/courses';
import { upcomingEvents } from '@/lib/mock-data/events';
import { formatDate } from '@/lib/utils';
import { useLocale } from 'next-intl';

export function DashboardHome() {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const { user } = useAuthStore();
  const { enrolledCourses, courseProgress } = useProgressStore();

  const enrolled = courses.filter((c) => enrolledCourses.includes(c.slug));
  const upcoming = upcomingEvents().slice(0, 3);

  const weeklyGoal = 5;
  const completedThisWeek = Math.min(weeklyGoal, enrolled.length * 2);
  const goalPercent = (completedThisWeek / weeklyGoal) * 100;

  return (
    <div className="p-6 lg:p-10 space-y-10">
      <header>
        <h1 className="font-display text-3xl md:text-4xl">
          {t('welcome', { name: user?.name ?? 'friend' })}
        </h1>
        <p className="mt-2 text-muted-foreground">{t('subtitle')}</p>
      </header>

      <section>
        <div className="flex items-end justify-between mb-5">
          <h2 className="font-display text-xl">{t('continueLearning')}</h2>
          <Link
            href="/courses"
            className="text-sm text-accent hover:underline flex items-center gap-1"
          >
            {t('exploreCourses')}
            <ArrowRight className="size-3.5 rtl:rotate-180" />
          </Link>
        </div>
        {enrolled.length === 0 ? (
          <Card>
            <CardContent className="p-10 text-center">
              <p className="text-muted-foreground">{t('noProgress')}</p>
              <Button asChild className="mt-4">
                <Link href="/courses">{t('exploreCourses')}</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolled.slice(0, 3).map((c) => (
              <CourseCard key={c.slug} course={c} progress={courseProgress[c.slug]} />
            ))}
          </div>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-accent" />
                <h2 className="font-display text-xl">{t('todaysSchedule')}</h2>
              </div>
            </div>
            <ul className="space-y-3">
              {upcoming.map((event) => (
                <li
                  key={event.id}
                  className="flex items-center justify-between rounded-xl bg-secondary/40 p-4"
                >
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(event.startsAt, locale, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Register
                  </Button>
                </li>
              ))}
              {upcoming.length === 0 && (
                <li className="text-sm text-muted-foreground text-center py-8">
                  No upcoming events
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="size-5 text-accent" />
              <h2 className="font-display text-xl">{t('weeklyGoal')}</h2>
            </div>
            <div className="text-center">
              <div className="relative mx-auto size-32">
                <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                  <circle cx="50" cy="50" r="45" stroke="hsl(var(--secondary))" strokeWidth="8" fill="none" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#d4a017"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(goalPercent / 100) * 283} 283`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div>
                    <p className="font-display text-2xl">
                      {completedThisWeek}/{weeklyGoal}
                    </p>
                    <p className="text-xs text-muted-foreground">lessons</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Keep going. Steady wins.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <Trophy className="size-6 text-accent mb-3" />
            <h3 className="font-display text-lg">{t('achievements')}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You&apos;ve unlocked {Math.max(0, enrolled.length - 1)} achievements.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Users className="size-6 text-accent mb-3" />
            <h3 className="font-display text-lg">{t('community')}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              3 new replies in your threads this week.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <TrendingUp className="size-6 text-accent mb-3" />
            <h3 className="font-display text-lg">Streak</h3>
            <p className="mt-2 text-sm text-muted-foreground">7 days in a row. Don&apos;t break it.</p>
            <Progress value={70} className="mt-3" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
