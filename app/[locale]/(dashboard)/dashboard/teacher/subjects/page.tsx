import { setRequestLocale } from 'next-intl/server';
import { TeacherSubjects } from '@/components/dashboard/TeacherSubjects';

export default async function TeacherSubjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TeacherSubjects />;
}
