import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/PageHero';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventCard } from '@/components/events/EventCard';
import { upcomingEvents, pastEvents } from '@/lib/mock-data/events';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Live Events' };
}

export default async function LiveEventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('events');

  const upcoming = upcomingEvents();
  const past = pastEvents();

  return (
    <>
      <PageHero
        eyebrow="Live"
        title={t('hero.title')}
        subtitle={t('hero.subtitle', { count: upcoming.length })}
        breadcrumb={[{ href: '/live-events', label: 'Live Events' }]}
      />

      <section className="container-pad pb-24">
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-8">
            <TabsTrigger value="upcoming">{t('tabs.upcoming')}</TabsTrigger>
            <TabsTrigger value="past">{t('tabs.past')}</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            <div className="grid gap-6 md:grid-cols-2">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {upcoming.length === 0 && (
              <p className="text-center text-muted-foreground py-16">
                No upcoming events. Check back soon.
              </p>
            )}
          </TabsContent>
          <TabsContent value="past">
            <div className="grid gap-6 md:grid-cols-2">
              {past.map((event) => (
                <EventCard key={event.id} event={event} past />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
