import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { faqs } from '@/lib/mock-data/faqs';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'FAQ' };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('faq.hero');
  const tFaq = await getTranslations('faq');

  return (
    <>
      <PageHero
        eyebrow={tFaq('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        breadcrumb={[{ href: '/faq', label: t('title') }]}
      />
      <FAQAccordion faqs={faqs} />
    </>
  );
}
