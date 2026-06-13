import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Mail, Phone, Clock, MessageCircle } from 'lucide-react';
import { PageHero } from '@/components/shared/PageHero';
import { ContactForm } from '@/components/contact/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/animations/FadeIn';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Contact' };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      <PageHero
        eyebrow="Reach out"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ href: '/contact', label: 'Contact' }]}
      />

      <section className="container-pad pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <FadeIn>
            <Card>
              <CardContent className="p-8">
                <h2 className="font-display text-2xl mb-6">Send us a message</h2>
                <ContactForm />
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn delay={0.1} className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-accent/15 text-accent">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${t('info.email')}`}
                      className="text-sm font-medium hover:text-accent break-all"
                    >
                      {t('info.email')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-accent/15 text-accent">
                    <Phone className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{t('info.phone')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-accent/15 text-accent">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hours</p>
                    <p className="text-sm font-medium">{t('info.hours')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/10 border-accent/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="size-5 text-accent" />
                  <p className="font-medium">Need quick answers?</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Check our FAQ first — most questions are answered there in seconds.
                </p>
                <a
                  href="/faq"
                  className="mt-3 inline-block text-sm font-medium text-accent hover:underline"
                >
                  Browse FAQ →
                </a>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
