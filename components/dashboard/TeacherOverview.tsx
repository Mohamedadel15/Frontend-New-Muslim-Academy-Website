'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarCheck,
  Clock4,
  GraduationCap,
  PlayCircle,
  Sparkles,
  Star,
  Users,
  Video,
} from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuthStore } from '@/stores/authStore';
import { useBookingStore } from '@/stores/bookingStore';
import { contentByTeacher, getTeacher } from '@/lib/mock-data/teachers';
import { getSubject } from '@/lib/mock-data/subjects';
import { BookingCard } from '@/components/booking/BookingCard';

export function TeacherOverview() {
  const { user, setRole } = useAuthStore();
  const bookings = useBookingStore((s) => s.bookings);

  const teacherSlug = user?.teacherSlug ?? 'mohamed-thani-ahmed';
  const teacher = getTeacher(teacherSlug);

  const stats = useMemo(() => {
    const mine = bookings.filter((b) => b.teacherSlug === teacherSlug);
    const pending = mine.filter((b) => b.status === 'pending');
    const confirmed = mine.filter((b) => b.status === 'confirmed');
    const completed = mine.filter((b) => b.status === 'completed');
    return { mine, pending, confirmed, completed };
  }, [bookings, teacherSlug]);

  const content = contentByTeacher(teacherSlug);

  if (!teacher) return null;

  return (
    <div className="p-6 lg:p-10 space-y-10">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Sparkles className="size-3.5" /> Teacher dashboard
          </div>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">
            Assalamu alaikum, {teacher.name.split(' ').slice(-1)[0]}.
          </h1>
          <p className="mt-2 text-muted-foreground">
            {stats.pending.length > 0
              ? `${stats.pending.length} new booking request${stats.pending.length === 1 ? '' : 's'} waiting on you.`
              : 'No pending requests. Use the time to upload a new lesson.'}
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/dashboard/teacher/content">
              <PlayCircle className="size-4" />
              Upload lesson
            </Link>
          </Button>
          <Button asChild variant="outline" onClick={() => setRole('learner')}>
            <Link href="/dashboard">Switch to learner</Link>
          </Button>
        </div>
      </motion.header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Clock4 className="size-5" />} label="Pending requests" value={stats.pending.length} accent />
        <StatCard icon={<CalendarCheck className="size-5" />} label="Upcoming sessions" value={stats.confirmed.length} />
        <StatCard icon={<Users className="size-5" />} label="Total students" value={teacher.studentCount} />
        <StatCard icon={<Star className="size-5" />} label="Avg. rating" value={teacher.rating} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-5 flex items-end justify-between">
            <h2 className="font-display text-xl">Booking requests</h2>
            <Link
              href="/dashboard/teacher/requests"
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              View all <ArrowRight className="size-3.5 rtl:rotate-180" />
            </Link>
          </div>
          {stats.pending.slice(0, 3).length === 0 ? (
            <Card>
              <CardContent className="p-10 text-center text-sm text-muted-foreground">
                No pending requests right now. We’ll notify you the moment one comes in.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {stats.pending.slice(0, 3).map((b) => (
                <BookingCard key={b.id} booking={b} perspective="teacher" />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Video className="size-4 text-accent" />
                <h3 className="font-display text-lg">Next session</h3>
              </div>
              {stats.confirmed[0] ? (
                <div className="mt-4 space-y-3">
                  <p className="font-medium">{stats.confirmed[0].learnerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(stats.confirmed[0].scheduledAt).toLocaleString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                  {stats.confirmed[0].zoomUrl && (
                    <Button asChild className="w-full">
                      <a href={stats.confirmed[0].zoomUrl} target="_blank" rel="noreferrer">
                        Join now
                      </a>
                    </Button>
                  )}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Nothing on the calendar yet — approve a pending request to schedule one.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <GraduationCap className="size-4 text-accent" />
                <h3 className="font-display text-lg">My subjects</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {teacher.subjects.map((s) => {
                  const m = getSubject(s);
                  return (
                    <Badge
                      key={s}
                      className="border-0"
                      style={{ background: `${m?.color}1a`, color: m?.color }}
                    >
                      {m?.name ?? s}
                    </Badge>
                  );
                })}
              </div>
              <Button asChild variant="outline" className="mt-5 w-full" size="sm">
                <Link href="/dashboard/teacher/subjects">Manage subjects</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-display text-lg">Content health</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {content.length} lessons across {teacher.subjects.length} subjects.
              </p>
              <Progress value={Math.min(100, content.length * 12)} className="mt-4" />
              <p className="mt-2 text-xs text-muted-foreground">
                Aim for at least 3 lessons per subject — it builds trust with learners before they
                book.
              </p>
              <Button asChild className="mt-5 w-full" size="sm">
                <Link href="/dashboard/teacher/content">Add a lesson</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-accent">{icon}</div>
        <p className="mt-3 font-display text-3xl leading-none">
          {value.toLocaleString()}
        </p>
        <p
          className={
            accent ? 'mt-1 text-xs font-medium text-accent' : 'mt-1 text-xs text-muted-foreground'
          }
        >
          {label}
        </p>
      </CardContent>
    </Card>
  );
}
