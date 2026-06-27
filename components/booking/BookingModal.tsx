'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, Check, Clock, Mail, MessageSquare, User, Video } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useBookingStore } from '@/stores/bookingStore';
import { useAuthStore } from '@/stores/authStore';
import { getSubject } from '@/lib/mock-data/subjects';
import { cn } from '@/lib/utils';
import type { SubjectSlug, Teacher } from '@/types/teacher';

interface BookingModalProps {
  teacher: Teacher;
  defaultSubject?: SubjectSlug;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DURATIONS = [30, 45, 60];

export function BookingModal({ teacher, defaultSubject, open, onOpenChange }: BookingModalProps) {
  const { user } = useAuthStore();
  const createBooking = useBookingStore((s) => s.createBooking);
  const t = useTranslations('teachers.booking');
  const isAr = useLocale() === 'ar';
  const displayName = isAr && teacher.nameAr ? teacher.nameAr : teacher.name;
  const firstName = displayName.split(' ')[0];
  const subjName = (s: SubjectSlug) => {
    const meta = getSubject(s);
    return isAr && meta?.nameAr ? meta.nameAr : meta?.name ?? s;
  };

  const [subject, setSubject] = useState<SubjectSlug>(
    defaultSubject ?? (teacher.subjects[0] as SubjectSlug)
  );
  const [slot, setSlot] = useState<string>(teacher.availability[0] ?? '');
  const [duration, setDuration] = useState<number>(45);
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 450));
    createBooking({
      teacherSlug: teacher.slug,
      teacherName: teacher.name,
      teacherAvatar: teacher.avatar,
      learnerName: name || 'Guest',
      learnerEmail: email,
      subjectSlug: subject,
      subjectName: getSubject(subject)?.name ?? subject,
      scheduledAt: new Date(Date.now() + 2 * 86_400_000).toISOString(),
      durationMin: duration,
      note: `${slot ? `Preferred: ${slot}. ` : ''}${note}`.trim(),
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => setSubmitted(false), 250);
    }
  };

  const subj = getSubject(subject);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl overflow-hidden p-0">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-32 opacity-60"
          style={{
            background: `radial-gradient(at 30% 0%, ${subj?.color ?? '#d4a017'}33, transparent 60%)`,
          }}
        />

        {!submitted ? (
          <form onSubmit={handleSubmit} className="relative p-6 sm:p-8">
            <DialogHeader>
              <Badge className="w-fit border-0" style={{ background: `${subj?.color}1a`, color: subj?.color }}>
                {t('badge')}
              </Badge>
              <DialogTitle className="mt-3">{displayName}</DialogTitle>
              <DialogDescription>{t('desc', { name: firstName })}</DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-xs font-medium text-muted-foreground">{t('subject')}</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {teacher.subjects.map((s) => {
                    const meta = getSubject(s);
                    const active = subject === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSubject(s)}
                        className={cn(
                          'rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                          active
                            ? 'border-accent bg-accent/15 text-accent shadow-gold-glow'
                            : 'border-border/60 bg-card hover:border-accent/60 hover:text-accent'
                        )}
                      >
                        {isAr && meta?.nameAr ? meta.nameAr : meta?.name ?? s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">{t('slot')}</label>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {teacher.availability.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={cn(
                        'flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all',
                        slot === s
                          ? 'border-accent bg-accent/10 text-foreground'
                          : 'border-border/60 bg-card text-muted-foreground hover:border-accent/40'
                      )}
                    >
                      <Calendar className="size-3.5" />
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">{t('duration')}</label>
                <div className="mt-2 flex gap-2">
                  {DURATIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={cn(
                        'flex-1 rounded-xl border px-3 py-2.5 text-sm transition-all',
                        duration === d
                          ? 'border-accent bg-accent/10 font-medium'
                          : 'border-border/60 bg-card text-muted-foreground hover:border-accent/40'
                      )}
                    >
                      {t('min', { count: d })}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="bk-name">
                    {t('yourName')}
                  </label>
                  <div className="relative mt-2">
                    <User className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="bk-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('namePlaceholder')}
                      required
                      className="pl-9 rtl:pl-3 rtl:pr-9"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="bk-email">
                    {t('email')}
                  </label>
                  <div className="relative mt-2">
                    <Mail className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="bk-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="pl-9 rtl:pl-3 rtl:pr-9"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground" htmlFor="bk-note">
                  {t('note')}
                </label>
                <div className="relative mt-2">
                  <MessageSquare className="absolute start-3 top-3 size-4 text-muted-foreground" />
                  <Textarea
                    id="bk-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t('notePlaceholder')}
                    className="pl-9 rtl:pl-3 rtl:pr-9 min-h-24"
                  />
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between rounded-2xl border border-border/60 bg-secondary/40 px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Video className="size-3.5 text-accent" />
                {t('zoomNote', { name: firstName })}
              </div>
              <Button type="submit" disabled={submitting}>
                {submitting ? t('submitting') : t('submit')}
              </Button>
            </div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-8 text-center"
          >
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-success/15 text-success">
              <Check className="size-7" />
            </div>
            <h3 className="mt-5 font-display text-2xl">{t('sentTitle')}</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              {t('sentBody', { name: displayName })}
            </p>
            <div className="mx-auto mt-6 grid max-w-sm gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 text-start text-sm">
              <Row icon={<User className="size-3.5 text-accent" />} k={t('teacher')} v={displayName} />
              <Row icon={<Calendar className="size-3.5 text-accent" />} k={t('slotLabel')} v={slot} />
              <Row icon={<Clock className="size-3.5 text-accent" />} k={t('durationLabel')} v={t('min', { count: duration })} />
              <Row
                icon={<Mail className="size-3.5 text-accent" />}
                k={t('subjectLabel')}
                v={subjName(subject)}
              />
            </div>
            <Button className="mt-6" onClick={() => handleClose(false)}>
              {t('done')}
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Row({ icon, k, v }: { icon: React.ReactNode; k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {k}
      </span>
      <span className="text-right text-sm font-medium">{v}</span>
    </div>
  );
}
