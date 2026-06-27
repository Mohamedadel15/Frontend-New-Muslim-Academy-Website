'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Play, ChevronDown, BookOpen, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextReveal, TextRevealLine } from '@/components/animations/TextReveal';
import { Link } from '@/lib/navigation';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';

const ParticleField = dynamic(
  () => import('@/components/animations/ParticleField').then((m) => m.ParticleField),
  { ssr: false, loading: () => null }
);

export function Hero() {
  const t = useTranslations('hero');

  const steps = [
    { Icon: BookOpen, label: t('step1') },
    { Icon: Users, label: t('step2') },
    { Icon: Award, label: t('step3') },
  ];

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-gradient-warm">
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
      />
      <div
        aria-hidden
        className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-secondary-500/10 blur-[120px]"
      />

      <div className="container-pad relative flex min-h-screen flex-col justify-center pt-32 pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {t('badge')}
            </motion.div>

            <h1 className="font-display text-balance text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[1.02] tracking-tight text-white">
              <span className="block text-sm font-semibold uppercase tracking-[0.4em] text-accent mb-4">
                <TextRevealLine>{t('eyebrow')}</TextRevealLine>
              </span>
              <TextRevealLine delay={0.1}>
                <span className="italic gold-text">"{t('headline1')}"</span>
              </TextRevealLine>
              <br />
              <TextRevealLine delay={0.25}>
                <span className="text-white/90 font-light">{t('headline2')}</span>
              </TextRevealLine>
              <br />
              <TextRevealLine delay={0.4}>
                <span className="text-white">{t('headline3')}</span>
              </TextRevealLine>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="max-w-xl text-base md:text-lg text-white/70"
            >
              {t('description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Button asChild size="xl" className="shadow-gold-glow">
                  <Link href="/register">{t('cta')}</Link>
                </Button>
              </MagneticButton>

              <Dialog>
                <DialogTrigger asChild>
                  <button className="group inline-flex items-center gap-3 text-white/80 transition-colors hover:text-white">
                    <span className="relative grid size-12 place-items-center rounded-full border border-white/20 bg-white/5 transition-all group-hover:border-accent group-hover:bg-accent/10">
                      <Play className="size-4 translate-x-px fill-current" />
                    </span>
                    <span className="text-sm font-medium">{t('watchVideo')}</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-0 overflow-hidden">
                  <DialogTitle className="sr-only">Intro video</DialogTitle>
                  <div className="aspect-video bg-primary-900">
                    <iframe
                      src="https://www.youtube.com/embed/nWymIx74gYc?rel=0"
                      title="Da'wah & Guidance Society"
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                      allowFullScreen
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-accent/20 shadow-elevated">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-primary-700 to-primary-900" />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(/islamic/mosque-dome.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: 0.85,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-transparent to-transparent" />

              <div className="absolute inset-x-6 bottom-6">
                <div className="glass-card rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
                    {t('cardEyebrow')}
                  </p>
                  <p className="text-sm text-white">{t('cardText')}</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 h-24 w-24 animate-spin-slow rounded-full border-2 border-dashed border-accent/40" />
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-accent/20 blur-2xl" />
          </motion.div>
        </div>

        <motion.ul
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mx-auto mt-16 grid w-full max-w-4xl grid-cols-1 gap-6 md:mt-24 md:grid-cols-3"
        >
          {steps.map(({ Icon, label }, i) => (
            <li key={i} className="flex flex-col items-center text-center group">
              <span className="relative mb-3 grid size-14 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-all group-hover:scale-110 group-hover:border-accent group-hover:shadow-gold-glow">
                <Icon className="size-6" />
                {i < 2 && (
                  <span className="absolute left-full top-1/2 hidden h-px w-full -translate-y-1/2 border-t border-dashed border-accent/30 md:block" />
                )}
              </span>
              <p className="text-sm text-white/70 md:max-w-[14ch]">{label}</p>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute inset-x-0 bottom-6 mx-auto flex justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-[10px] uppercase tracking-[0.3em]">{t('scrollHint')}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="size-4" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
