'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, User as UserIcon, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePathname } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { useAuthStore } from '@/stores/authStore';

const navItems = [
  { href: '/courses', key: 'courses' },
  { href: '/live-events', key: 'liveEvents' },
  { href: '/blog', key: 'blog' },
  { href: '/about', key: 'about' },
  { href: '/faq', key: 'faq' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-subtle'
          : 'bg-transparent'
      )}
    >
      <nav
        className={cn(
          'container-pad flex items-center justify-between transition-all duration-300',
          scrolled ? 'h-16' : 'h-20'
        )}
        aria-label="Primary"
      >
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors hover:text-accent',
                    active ? 'text-accent' : 'text-foreground/80'
                  )}
                >
                  {t(item.key)}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <Avatar className="size-9 ring-2 ring-accent/30">
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <UserIcon className="size-4" />
                    {t('dashboard')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="size-4" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Link href="/login">{t('login')}</Link>
              </Button>
              <Button asChild size="sm" className="hidden md:inline-flex">
                <Link href="/register">{t('joinToday')}</Link>
              </Button>
            </>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t('menu')}
                className="lg:hidden"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-8 space-y-1">
                <AnimatePresence>
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-accent/10 hover:text-accent"
                      >
                        {t(item.key)}
                      </Link>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="mt-6 grid gap-2 px-2">
                {!isAuthenticated && (
                  <>
                    <Button asChild variant="outline" onClick={() => setOpen(false)}>
                      <Link href="/login">{t('login')}</Link>
                    </Button>
                    <Button asChild onClick={() => setOpen(false)}>
                      <Link href="/register">{t('joinToday')}</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
