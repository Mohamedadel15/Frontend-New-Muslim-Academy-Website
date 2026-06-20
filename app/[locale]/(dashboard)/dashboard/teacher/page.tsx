import { setRequestLocale } from 'next-intl/server';
import { TeacherOverview } from '@/components/dashboard/TeacherOverview';

export default async function TeacherDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TeacherOverview />;
}
