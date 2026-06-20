'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import { useBookingStore } from '@/stores/bookingStore';
import { getSubject } from '@/lib/mock-data/subjects';

export default function TeacherStudentsPage() {
  const teacherSlug = useAuthStore((s) => s.user?.teacherSlug ?? 'sh-yusuf-bilal');
  const bookings = useBookingStore((s) => s.bookings);

  const students = useMemo(() => {
    const byEmail = new Map<string, { name: string; email: string; subjects: Set<string>; sessions: number; last: string }>();
    for (const b of bookings.filter((x) => x.teacherSlug === teacherSlug)) {
      const cur = byEmail.get(b.learnerEmail) ?? {
        name: b.learnerName,
        email: b.learnerEmail,
        subjects: new Set<string>(),
        sessions: 0,
        last: b.scheduledAt,
      };
      cur.subjects.add(b.subjectSlug);
      cur.sessions += 1;
      cur.last = b.scheduledAt > cur.last ? b.scheduledAt : cur.last;
      byEmail.set(b.learnerEmail, cur);
    }
    return Array.from(byEmail.values());
  }, [bookings, teacherSlug]);

  return (
    <div className="p-6 lg:p-10 space-y-10">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <Users className="size-3.5" /> Students
        </div>
        <h1 className="mt-3 font-display text-3xl md:text-4xl">Your students</h1>
        <p className="mt-2 text-muted-foreground">
          People who have booked a session with you — past, present, and pending.
        </p>
      </header>

      {students.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-sm text-muted-foreground">
            No students yet. They’ll show up here when their first session is confirmed.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {students.map((s, i) => (
            <motion.div
              key={s.email}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <Card>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-2xl bg-accent/15 font-display text-lg text-accent">
                      {s.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium leading-tight">{s.name}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="size-3" /> {s.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(s.subjects).map((slug) => {
                      const m = getSubject(slug);
                      return (
                        <Badge
                          key={slug}
                          className="border-0"
                          style={{ background: `${m?.color}1a`, color: m?.color }}
                        >
                          {m?.name ?? slug}
                        </Badge>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      Last:{' '}
                      {new Date(s.last).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="font-medium text-foreground">
                      {s.sessions} session{s.sessions === 1 ? '' : 's'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
