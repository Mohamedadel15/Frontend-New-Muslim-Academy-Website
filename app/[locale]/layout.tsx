import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { locales } from '@/lib/i18n';
import { SITE } from '@/lib/constants';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ScrollProgress } from '@/components/animations/ScrollProgress';
import { CursorGlow } from '@/components/animations/CursorGlow';
import { SplashGate } from '@/components/shared/SplashGate';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${SITE.url}/${locale}`,
      languages: {
        en: `${SITE.url}/en`,
        ar: `${SITE.url}/ar`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA',
      url: `${SITE.url}/${locale}`,
      siteName: SITE.name,
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/og-default.png',
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@NewMuslimAcademy',
      title: t('title'),
      description: t('description'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    sameAs: Object.values(SITE.social),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div lang={locale} dir={dir} className="dark">
      <Script
        id="ld-json"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider>
          <QueryProvider>
            <SplashGate />
            <ScrollProgress />
            <CursorGlow />
            {children}
          </QueryProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    </div>
  );
}
