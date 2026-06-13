'use client';

import { useTranslations } from 'next-intl';
import { Video, UserCircle, MessagesSquare, type LucideIcon } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { TiltCard } from '@/components/animations/TiltCard';
import { FadeIn } from '@/components/animations/FadeIn';

interface FeatureCardData {
  Icon: LucideIcon;
  title: string;
  body: string;
  color: string;
}

export function FeatureCards() {
  const t = useTranslations('features');

  const cards: FeatureCardData[] = [
    {
      Icon: Video,
      title: t('card1.title'),
      body: t('card1.body'),
      color: 'from-accent/30 to-accent/5',
    },
    {
      Icon: UserCircle,
      title: t('card2.title'),
      body: t('card2.body'),
      color: 'from-secondary-500/30 to-secondary-500/5',
    },
    {
      Icon: MessagesSquare,
      title: t('card3.title'),
      body: t('card3.body'),
      color: 'from-purple-500/30 to-purple-500/5',
    },
  ];

  return (
    <section className="section-pad relative">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,160,23,0.06),transparent_50%)]"
      />
      <div className="container-pad relative">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
            {t('eyebrow')}
          </p>
          <h2 className="font-display text-display-xl text-balance leading-[1.1]">
            {t('heading')}
          </h2>
          <p className="mt-4 text-muted-foreground">{t('subheading')}</p>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {cards.map((card, i) => (
            <StaggerItem key={i}>
              <TiltCard className="group h-full">
                <div className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-subtle transition-all duration-500 group-hover:-translate-y-2 group-hover:border-accent/40 group-hover:shadow-elevated">
                  <div
                    aria-hidden
                    className={`absolute -top-32 right-0 h-64 w-64 rounded-full bg-gradient-to-br ${card.color} blur-3xl opacity-60`}
                  />
                  <div className="relative">
                    <div className="grid size-14 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <card.Icon className="size-7" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl tracking-tight">{card.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
