import { getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { RouteTransition } from '@/components/shared/RouteTransition';

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('common');

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-full bg-accent px-4 py-2 text-sm font-medium text-primary-foreground shadow-gold-glow focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {t('skipToContent')}
      </a>
      <Navbar />
      <main id="main" className="relative">
        <RouteTransition>{children}</RouteTransition>
      </main>
      <Footer />
    </>
  );
}
