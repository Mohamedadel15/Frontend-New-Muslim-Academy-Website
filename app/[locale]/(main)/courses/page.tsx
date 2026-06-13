import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { CoursesGrid } from '@/components/courses/CoursesGrid';
import { courses } from '@/lib/mock-data/courses';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Courses' };
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('courses.hero');

  return (
    <>
      <PageHero
        eyebrow="Learn"
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[{ href: '/courses', label: t('breadcrumb') }]}
      />
      <CoursesGrid courses={courses} />
    </>
  );
}
