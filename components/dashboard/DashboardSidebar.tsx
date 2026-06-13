'use client';

import { useTranslations } from 'next-intl';
import { LayoutGrid, BookOpen, TrendingUp, Award, Settings, LogOut } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/lib/navigation';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

const items = [
  { href: '/dashboard', key: 'overview', Icon: LayoutGrid, end: true },
  { href: '/dashboard/my-courses', key: 'myCourses', Icon: BookOpen, end: false },
  { href: '/dashboard/progress', key: 'progress', Icon: TrendingUp, end: false },
  { href: '/dashboard/certificates', key: 'certificates', Icon: Award, end: false },
  { href: '/dashboard/settings', key: 'settings', Icon: Settings, end: false },
] as const;

export function DashboardSidebar() {
  const t = useTranslations('dashboard.sidebar');
  const tNav = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="p-6">
        <Logo />
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {items.map(({ href, key, Icon, end }) => {
          const active = end ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href as never}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-accent/15 text-accent'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Icon className="size-4" />
              {t(key)}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4 space-y-3">
        <div className="flex items-center gap-3 rounded-xl bg-secondary/40 p-3">
          <Avatar className="size-9">
            <AvatarFallback>{user?.name.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{user?.name ?? 'Student'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-error/60 hover:bg-error/10 hover:text-error"
          >
            <LogOut className="size-3.5" />
            {tNav('logout')}
          </button>
        </div>
      </div>
    </aside>
  );
}
