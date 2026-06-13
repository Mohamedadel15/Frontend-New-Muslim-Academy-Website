import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { OneStopResource } from '@/components/sections/OneStopResource';
import { FeatureCards } from '@/components/sections/FeatureCards';
import { FreeShowcase } from '@/components/sections/FreeShowcase';
import { Testimonials } from '@/components/sections/Testimonials';
import { StatsCounter } from '@/components/sections/StatsCounter';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <OneStopResource />
      <FeatureCards />
      <StatsCounter />
      <FreeShowcase />
      <Testimonials />
    </>
  );
}
