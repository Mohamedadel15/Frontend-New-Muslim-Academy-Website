import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn('group flex items-center gap-2.5', className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center">
        <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="logoG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f9d252" />
              <stop offset="100%" stopColor="#a87d12" />
            </linearGradient>
          </defs>
          <polygon
            points="20,4 26,16 38,18 29,27 32,39 20,32 8,39 11,27 2,18 14,16"
            fill="url(#logoG)"
          />
          <circle cx="20" cy="22" r="3" fill="#1a1a2e" />
        </svg>
        <span className="absolute inset-0 rounded-full bg-accent/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-semibold tracking-tight">
            New Muslim <span className="gold-text">Academy</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Day-After-Shahadah
          </span>
        </span>
      )}
    </Link>
  );
}
