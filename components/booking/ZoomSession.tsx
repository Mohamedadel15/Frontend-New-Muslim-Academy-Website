'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Copy,
  ExternalLink,
  Hash,
  Key,
  ShieldCheck,
  Sparkles,
  Video,
} from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Booking } from '@/types/teacher';
import { getSubject } from '@/lib/mock-data/subjects';

interface ZoomSessionProps {
  booking: Booking;
}

export function ZoomSession({ booking }: ZoomSessionProps) {
  const subj = getSubject(booking.subjectSlug);
  const when = new Date(booking.scheduledAt);

  const copy = (text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard?.writeText(text);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(40% 60% at 50% 0%, ${subj?.color ?? '#d4a017'}26, transparent), linear-gradient(180deg, hsl(var(--background)), hsl(var(--background)))`,
        }}
      />
      <div className="absolute inset-0 -z-10 bg-arabesque-pattern opacity-15" />

      <div className="container-pad pt-28 pb-16">
        <Link
          href="/dashboard/sessions"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" /> Back to sessions
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 max-w-2xl"
        >
          <Badge
            className="border-0"
            style={{ background: `${subj?.color}1a`, color: subj?.color }}
          >
            {subj?.name ?? booking.subjectName}
          </Badge>
          <h1 className="mt-4 font-display text-display-md leading-tight">
            Your session with {booking.teacherName}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {when.toLocaleString(undefined, {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}{' '}
            · {booking.durationMin} minutes
          </p>
        </motion.header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card className="overflow-hidden">
            <div className="relative aspect-video overflow-hidden">
              <div className="absolute inset-0 bg-gradient-warm" />
              <div className="absolute inset-0 bg-arabesque-pattern opacity-30" />
              <div className="absolute inset-0 grid place-items-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="grid size-24 place-items-center rounded-full bg-accent/15 backdrop-blur"
                >
                  <Video className="size-12 text-accent" />
                </motion.div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-6">
                <div>
                  <p className="font-display text-2xl text-white">{booking.teacherName}</p>
                  <p className="text-sm text-white/70">{subj?.name ?? booking.subjectName}</p>
                </div>
                {booking.zoomUrl && (
                  <Button asChild size="lg">
                    <a href={booking.zoomUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-4" />
                      Join Zoom
                    </a>
                  </Button>
                )}
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                {booking.zoomUrl && (
                  <Detail
                    icon={<ExternalLink className="size-3.5" />}
                    label="Meeting link"
                    value="zoom.us/j/…"
                    onCopy={() => copy(booking.zoomUrl!)}
                  />
                )}
                {booking.zoomMeetingId && (
                  <Detail
                    icon={<Hash className="size-3.5" />}
                    label="Meeting ID"
                    value={booking.zoomMeetingId}
                    onCopy={() => copy(booking.zoomMeetingId!)}
                  />
                )}
                {booking.zoomPasscode && (
                  <Detail
                    icon={<Key className="size-3.5" />}
                    label="Passcode"
                    value={booking.zoomPasscode}
                    onCopy={() => copy(booking.zoomPasscode!)}
                  />
                )}
              </div>

              {booking.note && (
                <div className="rounded-2xl border border-border/60 bg-secondary/30 p-4">
                  <p className="text-xs text-muted-foreground">Your note to the teacher</p>
                  <p className="mt-1.5 text-sm text-foreground/90">{booking.note}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Before you join
                </p>
                <ul className="space-y-3 text-sm">
                  <Tip>Find a quiet space. Use headphones if you have them.</Tip>
                  <Tip>Open the link 2 minutes early — let Zoom warm up.</Tip>
                  <Tip>Write down one question you want answered today.</Tip>
                  <Tip>If you’re shy, audio-only is welcome. No pressure.</Tip>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Badge variant="success" className="gap-1">
                  <ShieldCheck className="size-3" />
                  Verified teacher
                </Badge>
                <h3 className="mt-3 font-display text-lg">{booking.teacherName}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  This session is confirmed and protected. If anything feels off, close the Zoom and
                  let our help desk know.
                </p>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <Link href="/contact">Get support</Link>
                </Button>
              </CardContent>
            </Card>

            <div className="rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card p-5">
              <Sparkles className="size-5 text-accent" />
              <p className="mt-3 font-display text-lg leading-snug">
                The journey of a thousand miles begins with one step.
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                You showed up. That’s the hard part.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Calendar className="size-3.5 text-accent" />
          Session ID: <span className="font-mono">{booking.id}</span>
        </div>
      </div>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
  onCopy,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onCopy?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-3">
      <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </p>
      <div className="mt-1.5 flex items-center justify-between gap-2">
        <p className="truncate font-mono text-sm">{value}</p>
        {onCopy && (
          <button
            type="button"
            onClick={onCopy}
            aria-label={`Copy ${label}`}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent"
          >
            <Copy className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
      <span className="text-foreground/90">{children}</span>
    </li>
  );
}
