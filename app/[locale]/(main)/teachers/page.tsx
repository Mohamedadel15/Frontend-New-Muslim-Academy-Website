import { setRequestLocale } from 'next-intl/server';
import { TeacherBrowser } from '@/components/teachers/TeacherBrowser';

export default async function TeachersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ subject?: string }>;
}) {
  const { locale } = await params;
  const { subject } = await searchParams;
  setRequestLocale(locale);
  return <TeacherBrowser initialSubject={subject} />;
}
