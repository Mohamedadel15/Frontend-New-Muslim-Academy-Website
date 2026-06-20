'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Hash, Key, MessageSquare, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/stores/bookingStore';
import type { Booking } from '@/types/teacher';
import { getSubject } from '@/lib/mock-data/subjects';
import { cn } from '@/lib/utils';

interface BookingCardProps {
  booking: Booking;
  perspective: 'learner' | 'teacher';
}

const statusVariant: Record<Booking['status'], { label: string; cn: string; dot: string }> = {
  pending: {
    label: 'Pending',
    cn: 'border-warning/40 bg-warning/10 text-warning',
    dot: 'bg-warning',
  },
  confirmed: {
    label: 'Confirmed',
    cn: 'border-success/40 bg-success/10 text-success',
    dot: 'bg-success',
  },
  completed: {
    label: 'Completed',
    cn: 'border-accent/40 bg-accent/10 text-accent',
    dot: 'bg-accent',
  },
  cancelled: {
    label: 'Cancelled',
    cn: 'border-muted-foreground/30 bg-muted/30 text-muted-foreground',
    dot: 'bg-muted-foreground',
  },
  declined: {
    label: 'Declined',
    cn: 'border-error/40 bg-error/10 text-error',
    dot: 'bg-error',
  },
};

export function BookingCard({ booking, perspective }: BookingCardProps) {
  const updateStatus = useBookingStore((s) => s.updateStatus);
  const meta = statusVariant[booking.status];
  const subj = getSubject(booking.subjectSlug);

  const when = new Date(booking.scheduledAt);
  const whenLabel = when.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="overflow-hidden">
        <div
          aria-hidden
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${subj?.color ?? '#d4a017'}, transparent)` }}
        />
        <CardContent className="p-6 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="grid size-12 place-items-center rounded-2xl font-display text-lg"
                style={{ background: `${subj?.color}1a`, color: subj?.color }}
              >
                {perspective === 'teacher'
                  ? booking.learnerName.charAt(0).toUpperCase()
                  : booking.teacherName.charAt(0)}
              </div>
              <div>
                <p className="font-medium">
                  {perspective === 'teacher' ? booking.learnerName : booking.teacherName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {subj?.name ?? booking.subjectName} · {booking.durationMin} min
                </p>
              </div>
            </div>
            <div
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
                meta.cn
              )}
            >
              <span className={cn('size-1.5 rounded-full', meta.dot)} />
              {meta.label}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Row icon={<Calendar className="size-3.5" />} k="Scheduled" v={whenLabel} />
            <Row
              icon={<Clock className="size-3.5" />}
              k="Requested"
              v={new Date(booking.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}
            />
            {booking.note && (
              <div className="sm:col-span-2 rounded-2xl border border-border/60 bg-secondary/30 p-3 text-sm">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MessageSquare className="size-3" />
                  Note from{' '}
                  {perspective === 'teacher' ? booking.learnerName : 'you'}
                </p>
                <p className="mt-1.5 text-foreground/90">{booking.note}</p>
              </div>
            )}
          </div>

          {booking.status === 'confirmed' && booking.zoomUrl && (
            <div className="rounded-2xl border border-success/30 bg-success/5 p-4">
              <p className="flex items-center gap-1.5 text-xs font-medium text-success">
                <Video className="size-3.5" /> Zoom session ready
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <a
                  href={booking.zoomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-success px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
                >
                  <ExternalLink className="size-3.5" /> Join meeting
                </a>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {booking.zoomMeetingId && (
                    <div className="flex items-center gap-1.5 rounded-xl bg-background/50 px-3 py-2">
                      <Hash className="size-3 text-muted-foreground" />
                      <span className="font-mono">{booking.zoomMeetingId}</span>
                    </div>
                  )}
                  {booking.zoomPasscode && (
                    <div className="flex items-center gap-1.5 rounded-xl bg-background/50 px-3 py-2">
                      <Key className="size-3 text-muted-foreground" />
                      <span className="font-mono">{booking.zoomPasscode}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-2">
            {perspective === 'teacher' && booking.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateStatus(booking.id, 'declined')}
                >
                  Decline
                </Button>
                <Button
                  size="sm"
                  onClick={() => updateStatus(booking.id, 'confirmed')}
                >
                  Approve & create Zoom
                </Button>
              </>
            )}
            {perspective === 'teacher' && booking.status === 'confirmed' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatus(booking.id, 'completed')}
              >
                Mark complete
              </Button>
            )}
            {perspective === 'learner' && booking.status === 'pending' && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatus(booking.id, 'cancelled')}
              >
                Cancel request
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Row({ icon, k, v }: { icon: React.ReactNode; k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 px-3 py-2">
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        {icon}
        {k}
      </span>
      <span className="text-sm font-medium">{v}</span>
    </div>
  );
}
