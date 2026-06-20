'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  CalendarCheck,
  GraduationCap,
  Languages,
  PlayCircle,
  Star,
  Users,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Teacher, TeacherContent, SubjectSlug } from '@/types/teacher';
import { getSubject } from '@/lib/mock-data/subjects';
import { ContentList } from './ContentList';
import { BookingModal } from '@/components/booking/BookingModal';

interface TeacherProfileProps {
  teacher: Teacher;
  content: TeacherContent[];
}

export function TeacherProfile({ teacher, content }: TeacherProfileProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeSubject, setActiveSubject] = useState<SubjectSlug | 'all'>('all');

  const filteredContent = useMemo(() => {
    if (activeSubject === 'all') return content;
    return content.filter((c) => c.subjectSlug === activeSubject);
  }, [content, activeSubject]);

  const primary = getSubject(teacher.subjects[0]);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(60% 60% at 30% 0%, ${primary?.color ?? '#d4a017'}26, transparent), linear-gradient(180deg, hsl(var(--background)), hsl(var(--background)))`,
          }}
        />
        <div className="absolute inset-0 -z-10 bg-arabesque-pattern opacity-20" />

        <div className="container-pad pt-28 md:pt-36 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">{teacher.title}</Badge>
                {teacher.verified && (
                  <Badge variant="success" className="gap-1">
                    <BadgeCheck className="size-3" />
                    Verified teacher
                  </Badge>
                )}
                <Badge variant="outline">FREE sessions</Badge>
              </div>
              <h1 className="mt-5 font-display text-display-lg text-balance leading-[1.05]">
                {teacher.name}
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground">{teacher.bio}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Star className="size-4 fill-accent text-accent" />
                  <span className="font-medium text-foreground">{teacher.rating}</span>
                  <span>({teacher.reviewCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-4 text-accent" />
                  {teacher.studentCount.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="size-4 text-accent" />
                  {teacher.yearsTeaching}+ years
                </span>
                <span className="flex items-center gap-1.5">
                  <Languages className="size-4 text-accent" />
                  {teacher.languages.join(' · ')}
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => setBookingOpen(true)}>
                  <CalendarCheck className="size-4" />
                  Request a Zoom session
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#content">
                    <PlayCircle className="size-4" />
                    Watch lessons first
                  </a>
                </Button>
              </div>
            </div>

            <Card className="lg:w-80 backdrop-blur bg-card/70">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 grid place-items-center rounded-2xl bg-accent/15 font-display text-xl text-accent">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Next opening</p>
                    <p className="font-medium">{teacher.availability[0]}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 border-t border-border/60 pt-4 text-center">
                  <div>
                    <p className="font-display text-2xl text-accent">
                      {teacher.sessionsCompleted.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Sessions completed</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl text-accent">{teacher.rating}</p>
                    <p className="text-xs text-muted-foreground">Avg. rating</p>
                  </div>
                </div>
                <Button className="w-full" onClick={() => setBookingOpen(true)}>
                  Book now
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="content" className="container-pad section-pad">
        <Tabs defaultValue="lessons">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <TabsList className="rounded-full bg-secondary p-1">
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="lessons">
            <div className="mb-6 flex flex-wrap gap-2">
              <FilterChip
                active={activeSubject === 'all'}
                onClick={() => setActiveSubject('all')}
                label={`All (${content.length})`}
              />
              {teacher.subjects.map((s) => {
                const meta = getSubject(s);
                const count = content.filter((c) => c.subjectSlug === s).length;
                return (
                  <FilterChip
                    key={s}
                    active={activeSubject === s}
                    color={meta?.color}
                    onClick={() => setActiveSubject(s)}
                    label={`${meta?.name ?? s} (${count})`}
                  />
                );
              })}
            </div>
            <ContentList items={filteredContent} emptyLabel="No lessons in this subject yet." />
          </TabsContent>

          <TabsContent value="about">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardContent className="prose prose-invert max-w-none p-6">
                  <p className="text-foreground/90">{teacher.longBio}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-5">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Subjects
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {teacher.subjects.map((s) => {
                        const meta = getSubject(s);
                        return (
                          <Badge
                            key={s}
                            className="border-0"
                            style={{ background: `${meta?.color}1a`, color: meta?.color }}
                          >
                            {meta?.name ?? s}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Languages
                    </p>
                    <p className="mt-2 text-sm">{teacher.languages.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Availability
                    </p>
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {teacher.availability.map((slot) => (
                        <li key={slot} className="flex items-center gap-2">
                          <CalendarCheck className="size-3.5 text-accent" />
                          {slot}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="grid gap-4 md:grid-cols-2">
              {fakeReviews.map((r) => (
                <Card key={r.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 text-accent">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-accent" />
                      ))}
                    </div>
                    <p className="mt-3 text-sm text-foreground/90">{r.text}</p>
                    <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{r.author}</span>
                      <span>{r.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card p-8 sm:p-10 text-center">
          <Video className="mx-auto size-10 text-accent" />
          <h3 className="mt-4 font-display text-2xl md:text-3xl">
            Ready to learn with {teacher.name.split(' ').slice(-1)[0]}?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Free private Zoom sessions, confirmed within 24 hours.
          </p>
          <Button size="lg" className="mt-6" onClick={() => setBookingOpen(true)}>
            Request a session
          </Button>
        </div>
      </section>

      <BookingModal teacher={teacher} open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-full border border-accent bg-accent/15 px-4 py-1.5 text-xs font-medium text-accent transition-all'
          : 'rounded-full border border-border/60 bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-accent/40 hover:text-foreground'
      }
      style={active && color ? { borderColor: color, color, background: `${color}1a` } : undefined}
    >
      {label}
    </button>
  );
}

const fakeReviews = [
  {
    id: 'r1',
    author: 'Sara A.',
    date: '2 weeks ago',
    text: 'Patient and calm. Walked me through my first complete prayer in Arabic — I cried.',
  },
  {
    id: 'r2',
    author: 'Daniel H.',
    date: '1 month ago',
    text: 'I never thought I’d understand Tafseer. Three sessions in and the Qur’an feels alive.',
  },
  {
    id: 'r3',
    author: 'Yara M.',
    date: '1 month ago',
    text: 'Clear, structured and warm. Best teacher I’ve had online since becoming Muslim.',
  },
  {
    id: 'r4',
    author: 'Khalid F.',
    date: '2 months ago',
    text: 'Free, easy to book, and the Zoom sessions actually run on time. Highly recommend.',
  },
];
