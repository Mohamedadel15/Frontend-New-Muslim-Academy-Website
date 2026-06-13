'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Calendar, Clock, Play, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { LiveEvent } from '@/types/event';
import { formatDate, timeUntil } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function EventCard({ event, past = false }: { event: LiveEvent; past?: boolean }) {
  const t = useTranslations('events.card');
  const locale = useLocale();
  const [countdown, setCountdown] = useState(timeUntil(event.startsAt));

  useEffect(() => {
    if (past) return;
    const id = setInterval(() => setCountdown(timeUntil(event.startsAt)), 1000);
    return () => clearInterval(id);
  }, [event.startsAt, past]);

  const isLive =
    !past && countdown.past === false && countdown.days === 0 && countdown.hours === 0;

  return (
    <Card className="overflow-hidden transition-transform hover:-translate-y-1">
      <div className="grid gap-6 md:grid-cols-[180px_1fr] p-6">
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={event.speaker.image}
            alt={event.speaker.name}
            fill
            sizes="180px"
            className="object-cover"
          />
          <div className="absolute inset-x-2 bottom-2 rounded-xl bg-background/90 backdrop-blur p-2 text-center text-xs">
            <p className="font-display text-lg font-semibold">
              {new Date(event.startsAt).getDate()}
            </p>
            <p className="uppercase text-muted-foreground">
              {new Date(event.startsAt).toLocaleString(locale === 'ar' ? 'ar' : 'en', {
                month: 'short',
              })}
            </p>
          </div>
        </div>

        <CardContent className="p-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge variant={isLive ? 'live' : 'default'}>
                {isLive && (
                  <span className="size-1.5 rounded-full bg-error animate-pulse" />
                )}
                {isLive ? t('live') : event.type}
              </Badge>
              <h3 className="mt-3 font-display text-xl leading-tight">{event.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {event.description}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {formatDate(event.startsAt, locale, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {event.durationMinutes} min
            </span>
            <span>with {event.speaker.name}</span>
          </div>

          {!past && !countdown.past && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
              {t('startsIn')} {countdown.days}d {countdown.hours}h {countdown.minutes}m
            </p>
          )}

          <div className="mt-5 flex items-center gap-3">
            {past ? (
              <Button size="sm" variant="outline">
                <Play className="size-3.5" />
                {t('watchReplay')}
              </Button>
            ) : (
              <>
                <Button size="sm">
                  {t('register')}
                  <ArrowRight className="size-3.5 rtl:rotate-180" />
                </Button>
                <Button size="sm" variant="outline">
                  {t('addCalendar')}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
