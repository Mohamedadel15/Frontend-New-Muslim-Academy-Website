'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookmarkPlus, CalendarCheck, Clock, Eye, Share2 } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Teacher, TeacherContent } from '@/types/teacher';
import { getSubject } from '@/lib/mock-data/subjects';
import { BookingModal } from '@/components/booking/BookingModal';
import { ContentList } from './ContentList';

interface ContentViewerProps {
  teacher: Teacher;
  content: TeacherContent;
  related: TeacherContent[];
}

export function ContentViewer({ teacher, content, related }: ContentViewerProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const subj = getSubject(content.subjectSlug);

  return (
    <>
      <section className="container-pad pt-28 md:pt-32 pb-12">
        <Link
          href={`/teachers/${teacher.slug}` as never}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          Back to {teacher.name}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]"
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {subj && (
                <Badge className="border-0" style={{ background: `${subj.color}1a`, color: subj.color }}>
                  {subj.name}
                </Badge>
              )}
              <Badge variant="outline" className="capitalize">
                {content.type}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(content.publishedAt).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>

            <h1 className="mt-4 font-display text-display-md leading-tight">{content.title}</h1>
            <p className="mt-3 text-muted-foreground">{content.excerpt}</p>

            <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" /> {content.durationMin} min
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="size-3.5" /> {content.views.toLocaleString()} views
              </span>
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1 transition-colors hover:text-accent"
              >
                <BookmarkPlus className="size-3.5" /> Save
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 transition-colors hover:text-accent"
              >
                <Share2 className="size-3.5" /> Share
              </button>
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-border/60">
              {content.type === 'video' ? (
                <div className="relative aspect-video bg-black">
                  <iframe
                    src={content.videoUrl}
                    title={content.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute inset-0 size-full"
                  />
                </div>
              ) : (
                <div className="bg-card p-8 sm:p-12">
                  <article className="mx-auto max-w-prose">
                    <p className="font-display text-2xl leading-snug text-accent">
                      {content.title}
                    </p>
                    <div className="arabesque-divider my-6" />
                    <p className="whitespace-pre-line text-foreground/90 leading-relaxed">
                      {content.body}
                    </p>
                  </article>
                </div>
              )}
            </div>

            {related.length > 0 && (
              <section className="mt-14">
                <h2 className="font-display text-2xl">More from {teacher.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Keep exploring the lessons in {subj?.name ?? content.subjectSlug}.
                </p>
                <div className="mt-6">
                  <ContentList items={related} />
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="size-12 grid place-items-center rounded-2xl bg-accent/15 font-display text-xl text-accent">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium leading-tight">{teacher.name}</p>
                    <p className="text-xs text-muted-foreground">{teacher.title}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-foreground/90">{teacher.bio}</p>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/60 pt-4 text-center">
                  <div>
                    <p className="font-display text-xl text-accent">
                      {teacher.studentCount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div>
                    <p className="font-display text-xl text-accent">{teacher.rating}</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                </div>

                <Button className="mt-5 w-full" onClick={() => setBookingOpen(true)}>
                  <CalendarCheck className="size-4" />
                  Book a session
                </Button>
                <Button asChild variant="outline" className="mt-2 w-full">
                  <Link href={`/teachers/${teacher.slug}` as never}>View full profile</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Want to go deeper?
                </p>
                <p className="mt-2 text-sm text-foreground/90">
                  Lessons get you started — a private session is where the real learning happens.
                  Both are free.
                </p>
                <Button className="mt-4 w-full" variant="outline" onClick={() => setBookingOpen(true)}>
                  Request {teacher.name.split(' ')[0]}
                </Button>
              </CardContent>
            </Card>
          </aside>
        </motion.div>
      </section>

      <BookingModal
        teacher={teacher}
        defaultSubject={content.subjectSlug}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </>
  );
}
