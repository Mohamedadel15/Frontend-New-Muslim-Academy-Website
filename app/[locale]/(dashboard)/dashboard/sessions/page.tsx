import { setRequestLocale } from 'next-intl/server';
import { Video } from 'lucide-react';
import { BookingList } from '@/components/booking/BookingList';

export default async function LearnerSessionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="p-6 lg:p-10 space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Video className="size-3.5" /> Your private sessions
          </div>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">My Sessions</h1>
          <p className="mt-2 text-muted-foreground">
            Track your requests, join your confirmed Zoom sessions, and review past ones.
          </p>
        </div>
      </header>
      <BookingList perspective="learner" />
    </div>
  );
}
