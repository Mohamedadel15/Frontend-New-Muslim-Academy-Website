'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { GeometricStar } from '@/components/animations/MorphingShape';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import { Link } from '@/lib/navigation';

export function FreeShowcase() {
  const t = useTranslations('free');

  const items = [
    t('items.consultation'),
    t('items.mentorship'),
    t('items.quran'),
    t('items.fatiha'),
    t('items.certificates'),
  ];

  return (
    <section className="section-pad relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-background via-primary-700/5 to-background"
      />
      <div className="container-pad relative">
        <FadeIn className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {t('eyebrow')}
          </p>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.02]">
            <span className="gold-text">{t('heading')}</span>
          </h2>
        </FadeIn>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr]">
            <StaggerContainer
              className="grid gap-4 lg:justify-items-end lg:text-end"
              stagger={0.08}
            >
              {items.slice(0, 3).map((label) => (
                <StaggerItem key={label} className="flex items-center gap-3 lg:flex-row-reverse">
                  <span className="grid size-9 place-items-center rounded-full border border-success/30 bg-success/10 text-success">
                    <Check className="size-4" />
                  </span>
                  <p className="text-base font-medium">{label}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative mx-auto"
            >
              <div className="absolute inset-0 rounded-full bg-accent/30 blur-[60px]" />
              <div className="relative grid place-items-center">
                <GeometricStar className="text-accent" size={360} />
                <div className="absolute inset-0 grid place-items-center px-12 text-center">
                  <div className="max-w-[200px] space-y-3">
                    <p className="font-display text-xl text-accent">{t('badgeTitle')}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {t('badgeText')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <StaggerContainer className="grid gap-4" stagger={0.08}>
              {items.slice(3).map((label) => (
                <StaggerItem key={label} className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full border border-success/30 bg-success/10 text-success">
                    <Check className="size-4" />
                  </span>
                  <p className="text-base font-medium">{label}</p>
                </StaggerItem>
              ))}
              <StaggerItem className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-full border border-success/30 bg-success/10 text-success">
                  <Check className="size-4" />
                </span>
                <p className="text-base font-medium">Community Forum Access</p>
              </StaggerItem>
            </StaggerContainer>
          </div>

          <FadeIn className="mt-16 flex justify-center" delay={0.3}>
            <MagneticButton>
              <Button asChild size="xl" className="animate-pulse-glow">
                <Link href="/register">{t('cta')}</Link>
              </Button>
            </MagneticButton>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
