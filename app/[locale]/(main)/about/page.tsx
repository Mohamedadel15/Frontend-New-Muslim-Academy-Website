import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { CalendarDays, ShieldCheck, MapPin, Compass, Target } from 'lucide-react';
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
import { SITE } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('eyebrow'), description: t('hero.subtitle') };
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

  const facts = [
    { Icon: CalendarDays, label: t('facts.founded'), value: t('facts.foundedValue') },
    { Icon: ShieldCheck, label: t('facts.registration'), value: SITE.registration },
    { Icon: MapPin, label: t('facts.location'), value: t('facts.locationValue') },
  ];

  const pillars = [
    { Icon: Compass, title: t('vision.title'), body: t('vision.body') },
    { Icon: Target, title: t('mission.title'), body: t('mission.body') },
  ];

  return (
    <>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        breadcrumb={[{ href: '/about', label: t('eyebrow') }]}
      />

      <section className="container-pad pb-16 pt-4">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-display-lg">{t('story.title')}</h2>
          <ArabesqueDivider className="mx-auto my-8 h-3 w-32" />
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-balance">
            {t('story.body')}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-12 max-w-3xl">
          <div className="grid gap-4 rounded-3xl border border-border/60 bg-card/60 p-6 sm:grid-cols-3">
            {facts.map(({ Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="size-5 text-accent" />
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
                <p className="font-display text-lg">
                  <bdi>{value}</bdi>
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="container-pad pb-8">
        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map(({ Icon, title, body }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <Card className="h-full border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card">
                <CardContent className="flex h-full flex-col gap-4 p-8">
                  <span className="grid size-12 place-items-center rounded-2xl bg-accent/15 text-accent">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="font-display text-2xl">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{body}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <StatsCounter />

      <section className="container-pad py-24">
        <FadeIn className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-3">{t('teamEyebrow')}</p>
          <h2 className="font-display text-display-lg">{t('team')}</h2>
        </FadeIn>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {team.map((member) => (
            <StaggerItem key={member.id}>
              <Card className="overflow-hidden group">
                <div className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
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

      <section className="container-pad pb-24">
        <FadeIn>
          <div className="rounded-3xl border border-accent/20 bg-gradient-warm p-12 text-center text-white">
            <h2 className="font-display text-3xl md:text-4xl">{t('joinTeam')}</h2>
            <p className="mt-4 max-w-xl mx-auto text-white/70">{t('joinTeamBody')}</p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">{t('joinTeamCta')}</Link>
            </Button>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
