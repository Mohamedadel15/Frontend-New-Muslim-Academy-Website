'use client';

import { useTranslations } from 'next-intl';
import {
  LayoutGrid,
  BookOpen,
  TrendingUp,
  Award,
  Settings,
  LogOut,
  CalendarCheck,
  Video,
  Users,
  Upload,
  Compass,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { Link, usePathname, useRouter } from '@/lib/navigation';
import { Logo } from '@/components/shared/Logo';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

type Item = { href: string; label: string; Icon: LucideIcon; end: boolean };

const learnerItems: Item[] = [
  { href: '/dashboard', label: 'Overview', Icon: LayoutGrid, end: true },
  { href: '/dashboard/teachers', label: 'Find a teacher', Icon: Compass, end: false },
  { href: '/dashboard/my-courses', label: 'My Courses', Icon: BookOpen, end: false },
  { href: '/dashboard/sessions', label: 'My Sessions', Icon: Video, end: false },
  { href: '/dashboard/progress', label: 'Progress', Icon: TrendingUp, end: false },
  { href: '/dashboard/certificates', label: 'Certificates', Icon: Award, end: false },
  { href: '/dashboard/settings', label: 'Settings', Icon: Settings, end: false },
];

const teacherItems: Item[] = [
  { href: '/dashboard/teacher', label: 'Teacher overview', Icon: LayoutGrid, end: true },
  { href: '/dashboard/teacher/requests', label: 'Booking requests', Icon: CalendarCheck, end: false },
  { href: '/dashboard/teacher/sessions', label: 'My sessions', Icon: Video, end: false },
  { href: '/dashboard/teacher/content', label: 'My content', Icon: Upload, end: false },
  { href: '/dashboard/teacher/subjects', label: 'Subjects I teach', Icon: GraduationCap, end: false },
  { href: '/dashboard/teacher/students', label: 'Students', Icon: Users, end: false },
  { href: '/dashboard/settings', label: 'Settings', Icon: Settings, end: false },
];

export function DashboardSidebar() {
  const tNav = useTranslations('nav');
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, setRole } = useAuthStore();

  const isTeacher = user?.role === 'teacher';
  const items = isTeacher ? teacherItems : learnerItems;

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-card">
      <div className="p-6">
        <Logo />
      </div>

      <div className="mx-4 mb-4 rounded-2xl border border-border/60 bg-secondary/40 p-1 text-xs">
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => setRole('learner')}
            className={cn(
              'rounded-xl px-3 py-2 font-medium transition-all',
              !isTeacher ? 'bg-accent text-primary-foreground shadow-gold-glow' : 'text-muted-foreground'
            )}
          >
            Learner
          </button>
          <button
            type="button"
            onClick={() => setRole('teacher')}
            className={cn(
              'rounded-xl px-3 py-2 font-medium transition-all',
              isTeacher ? 'bg-accent text-primary-foreground shadow-gold-glow' : 'text-muted-foreground'
            )}
          >
            Teacher
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-1 pb-4">
        {items.map(({ href, label, Icon, end }) => {
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
              {label}
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
            <p className="text-xs text-muted-foreground truncate">
              {isTeacher ? 'Teacher' : 'Learner'}
            </p>
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
