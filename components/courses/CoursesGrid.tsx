'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseCard } from './CourseCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { COURSE_CATEGORIES } from '@/lib/constants';
import { useProgressStore } from '@/stores/progressStore';
import type { Course } from '@/types/course';

interface CoursesGridProps {
  courses: Course[];
}

export function CoursesGrid({ courses }: CoursesGridProps) {
  const t = useTranslations('courses.filters');
  const [filter, setFilter] = useState<string>('all');
  const courseProgress = useProgressStore((s) => s.courseProgress);

  const filtered = filter === 'all' ? courses : courses.filter((c) => c.category === filter);

  return (
    <section className="container-pad pb-24">
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="mb-12 flex-wrap">
          {COURSE_CATEGORIES.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {t(cat)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <StaggerContainer
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.06}
      >
        {filtered.map((course) => (
          <StaggerItem key={course.slug}>
            <CourseCard course={course} progress={courseProgress[course.slug]} />
          </StaggerItem>
        ))}
      </StaggerContainer>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-muted-foreground">No courses in this category yet.</p>
      )}
    </section>
  );
}
