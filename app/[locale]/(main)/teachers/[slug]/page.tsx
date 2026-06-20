import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { TeacherProfile } from '@/components/teachers/TeacherProfile';
import { contentByTeacher, getTeacher } from '@/lib/mock-data/teachers';

export default async function TeacherPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const teacher = getTeacher(slug);
  if (!teacher) notFound();
  const content = contentByTeacher(slug);
  return <TeacherProfile teacher={teacher} content={content} />;
}
