import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/shared/PageHero';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatsCounter } from '@/components/sections/StatsCounter';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { ArabesqueDivider } from '@/components/animations/MorphingShape';
import { Link } from '@/lib/navigation';
import { instructors } from '@/lib/mock-data/instructors';

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'About' };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const team = Object.values(instructors);

  return (
    <>
      <PageHero
        eyebrow="About"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ href: '/about', label: 'About' }]}
      />

      <section className="container-pad pb-24">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-display-lg">{t('story.title')}</h2>
          <ArabesqueDivider className="mx-auto my-8 h-3 w-32" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
            {t('story.body')}
          </p>
        </FadeIn>
      </section>

      <StatsCounter />

      <section className="container-pad py-24">
        <FadeIn className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">
            Our People
          </p>
          <h2 className="font-display text-display-lg">{t('team')}</h2>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {team.map((member) => (
            <StaggerItem key={member.id}>
              <Card className="overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display text-xl">{member.name}</h3>
                  <p className="text-sm text-accent mt-1">{member.title}</p>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.specializations.slice(0, 2).map((s) => (
                      <Badge key={s} variant="outline" className="text-[10px]">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="container-pad py-24">
        <FadeIn>
          <div className="rounded-3xl border border-accent/20 bg-gradient-warm p-12 text-center text-white">
            <h2 className="font-display text-3xl md:text-4xl">{t('joinTeam')}</h2>
            <p className="mt-4 max-w-xl mx-auto text-white/70">
              Are you a scholar, mentor, or volunteer who wants to support new Muslims? We&apos;d love to hear from you.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
