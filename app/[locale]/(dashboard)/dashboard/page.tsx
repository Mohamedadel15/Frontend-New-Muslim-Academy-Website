import { setRequestLocale } from 'next-intl/server';
import { DashboardHome } from '@/components/dashboard/DashboardHome';

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DashboardHome />;
}
