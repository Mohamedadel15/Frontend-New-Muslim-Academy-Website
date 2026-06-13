import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display, Amiri } from 'next/font/google';
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
    default: `${SITE.name} | New Muslim Classes Online`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'education',
  keywords: [
    'new muslim',
    'islamic courses',
    'online islamic learning',
    'shahadah',
    'convert to islam',
    'islam education',
    'free islamic classes',
    'quran for beginners',
  ],
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${amiri.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
