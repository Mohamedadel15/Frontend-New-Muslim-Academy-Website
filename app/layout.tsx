import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Amiri } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import '@/styles/globals.css';
import { SITE } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: `%s | ${SITE.name}`,
    default: `${SITE.name} | Guiding New Muslims in Makkah`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.nameLong }],
  creator: SITE.nameLong,
  publisher: SITE.nameLong,
  category: 'education',
  keywords: [
    'new muslim',
    'dawah',
    'da’wah and guidance',
    'Makkah',
    'expatriate communities',
    'islamic courses',
    'shahadah',
    'convert to islam',
    'free islamic classes',
    'quran for beginners',
    'جمعية الدعوة والإرشاد',
    'الدعوة والإرشاد بمكة',
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Resolve the active locale at the root so <html lang/dir> is correct for
  // SEO and assistive tech. The nested [locale] layout still carries dir on
  // its own wrapper, so RTL keeps working even when this resolves to default.
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${amiri.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
