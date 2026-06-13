import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';

export default async function LocaleNotFound() {
  const t = await getTranslations('notFound');
  return (
    <main className="min-h-[80vh] grid place-items-center px-4">
      <div className="text-center">
        <p className="font-display text-[120px] leading-none gold-text">404</p>
        <h1 className="font-display text-3xl mt-2">{t('title')}</h1>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">{t('subtitle')}</p>
        <Button asChild className="mt-8">
          <Link href="/">{t('cta')}</Link>
        </Button>
      </div>
    </main>
  );
}
