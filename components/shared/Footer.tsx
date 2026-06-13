'use client';

import { useTranslations } from 'next-intl';
import { Twitter, Facebook, Youtube, Instagram, Send } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Logo } from './Logo';
import { ArabesqueDivider } from '@/components/animations/MorphingShape';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  const socials = [
    { Icon: Twitter, href: SITE.social.twitter, label: 'Twitter' },
    { Icon: Facebook, href: SITE.social.facebook, label: 'Facebook' },
    { Icon: Youtube, href: SITE.social.youtube, label: 'YouTube' },
    { Icon: Instagram, href: SITE.social.instagram, label: 'Instagram' },
  ];

  return (
    <footer className="relative mt-32 overflow-hidden bg-primary-500 text-white">
      <div className="absolute inset-0 bg-arabesque-pattern opacity-30" aria-hidden />
      <div className="absolute inset-x-0 top-0">
        <ArabesqueDivider className="h-4 w-full" />
      </div>

      <div className="container-pad relative pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm text-white/70">{t('tagline')}</p>
            <div className="mt-5 flex gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-all hover:border-accent hover:text-accent hover:shadow-gold-glow"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">
              {t('quickLinks')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ['/courses', tNav('courses')],
                ['/live-events', tNav('liveEvents')],
                ['/blog', tNav('blog')],
                ['/faq', tNav('faq')],
                ['/about', tNav('about')],
                ['/contact', tNav('contact')],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-white/70 transition-colors hover:text-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">
              {t('resources')}
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ['/contact', t('helpDesk')],
                ['#', t('navGuide')],
                ['#', t('studentForum')],
                ['#', t('privacy')],
                ['#', t('terms')],
              ].map(([href, label], i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className="text-white/70 transition-colors hover:text-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">
              {t('newsletter.title')}
            </h3>
            <p className="mt-5 text-sm text-white/70">{t('newsletter.body')}</p>
            <form className="mt-4 flex gap-2">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="h-10 border-white/15 bg-white/5 text-white placeholder:text-white/40"
                aria-label={t('newsletter.placeholder')}
              />
              <Button type="submit" size="icon" aria-label={t('newsletter.cta')}>
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row">
          <p>{t('copyright', { year })}</p>
          <p className="flex items-center gap-1.5">
            {t('madeWith')} <span className="text-accent">•</span> NMA
          </p>
        </div>
      </div>
    </footer>
  );
}
