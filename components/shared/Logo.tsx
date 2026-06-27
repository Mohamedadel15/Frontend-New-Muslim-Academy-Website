'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/constants';

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  const isAr = useLocale() === 'ar';

  return (
    <Link href="/" className={cn('group flex items-center gap-2.5', className)}>
      <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-accent/40 transition-shadow duration-500 group-hover:shadow-gold-glow">
        <Image
          src="/brand/society-emblem.png"
          alt={isAr ? SITE.nameAr : SITE.name}
          width={40}
          height={40}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className="font-display text-sm font-semibold tracking-tight">
            {isAr ? (
              <>
                جمعية <span className="gold-text">الدعوة والإرشاد</span>
              </>
            ) : (
              <>
                Da&apos;wah &amp; <span className="gold-text">Guidance</span>
              </>
            )}
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {isAr ? 'بمكة المكرمة' : 'Makkah Al-Mukarramah'}
          </span>
        </span>
      )}
    </Link>
  );
}
