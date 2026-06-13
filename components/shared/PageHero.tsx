'use client';

import { motion } from 'framer-motion';
import { Link } from '@/lib/navigation';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { href: string; label: string }[];
}

export function PageHero({ eyebrow, title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-primary-700/20 via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-accent/10 blur-[100px]"
      />

      <div className="container-pad relative">
        {breadcrumb && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="size-3 rtl:rotate-180" />
                {i === breadcrumb.length - 1 ? (
                  <span className="text-foreground">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-accent">
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.3em] text-accent"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-balance"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
