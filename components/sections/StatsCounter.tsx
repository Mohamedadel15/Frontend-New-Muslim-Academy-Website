'use client';

import { useTranslations } from 'next-intl';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { AnimatedCounter } from '@/components/animations/AnimatedCounter';
import { STATS } from '@/lib/constants';

export function StatsCounter() {
  const t = useTranslations('about.stats');

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container-pad">
        <StaggerContainer
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12"
          stagger={0.1}
        >
          {STATS.map((stat) => (
            <StaggerItem
              key={stat.key}
              className="text-center"
            >
              <p className="font-display text-4xl md:text-5xl font-bold gold-text">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">
                {t(stat.key)}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
