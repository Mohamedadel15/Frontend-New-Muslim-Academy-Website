'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import { useTransition } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/lib/navigation';

export function LanguageSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function change(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next as 'en' | 'ar' });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t('switchLanguage')}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 text-xs font-medium uppercase tracking-wide transition-colors hover:border-accent/40 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        disabled={isPending}
      >
        <Globe className="size-3.5" />
        {locale}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={locale} onValueChange={change}>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="ar">العربية</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
