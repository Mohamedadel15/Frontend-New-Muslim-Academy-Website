'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/animations/FadeIn';
import { Link } from '@/lib/navigation';

export function OneStopResource() {
  const t = useTranslations('resource');

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="container-pad">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
              Welcome to NMA
            </p>
            <h2 className="font-display text-display-xl text-balance leading-[1.05] tracking-tight">
              {t('heading')}
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-[60ch]">
              {t('body')}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/register">
                  {t('cta')}
                  <ArrowRight className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative aspect-[4/5] max-w-md mx-auto"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 to-secondary-500/10 blur-2xl" />
                <div className="relative h-full overflow-hidden rounded-3xl border border-accent/20 shadow-elevated">
                  <Image
                    src="/islamic/quran-book.jpg"
                    alt="The Holy Qur'an"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent" />
                </div>
              </motion.div>

              <div className="absolute -left-6 top-12 hidden h-20 w-20 animate-float md:block">
                <div className="h-full w-full rounded-2xl bg-accent/15 backdrop-blur-md border border-accent/30" />
              </div>
              <div
                className="absolute -right-6 bottom-12 hidden h-16 w-16 md:block"
                style={{ animation: 'float 8s ease-in-out infinite' }}
              >
                <div className="h-full w-full rotate-45 rounded-xl bg-secondary-500/15 backdrop-blur-md border border-secondary-500/30" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
