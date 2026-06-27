'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PlayCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';

interface CourseIntroVideoProps {
  thumbnail: string;
  title: string;
  videoUrl?: string;
}

export function CourseIntroVideo({ thumbnail, title, videoUrl }: CourseIntroVideoProps) {
  const t = useTranslations('courses.detail');

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl border border-border/60 shadow-elevated">
      <Image
        src={thumbnail}
        alt={title}
        fill
        sizes="(max-width: 1024px) 100vw, 66vw"
        priority
        className="object-cover"
      />

      {videoUrl ? (
        <Dialog>
          <DialogTrigger asChild>
            <button
              aria-label={t('playIntro')}
              className="absolute inset-0 grid place-items-center bg-primary-900/40 transition-colors hover:bg-primary-900/25"
            >
              <span className="grid size-20 place-items-center rounded-full bg-accent text-primary-foreground shadow-gold-glow transition-transform hover:scale-110">
                <PlayCircle className="size-10" />
              </span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl overflow-hidden p-0">
            <DialogTitle className="sr-only">{title}</DialogTitle>
            <div className="aspect-video bg-primary-900">
              <iframe
                src={videoUrl}
                title={title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="absolute inset-x-0 bottom-0 grid place-items-center bg-gradient-to-t from-primary-900/80 to-transparent p-4">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/80">
            {t('introSoon')}
          </span>
        </div>
      )}
    </div>
  );
}
