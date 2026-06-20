import { setRequestLocale } from 'next-intl/server';
import { TeacherContentManager } from '@/components/dashboard/TeacherContentManager';

export default async function TeacherContentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TeacherContentManager />;
}
