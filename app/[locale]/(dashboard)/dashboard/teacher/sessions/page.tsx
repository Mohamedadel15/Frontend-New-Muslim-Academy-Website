'use client';

import { Video } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { BookingList } from '@/components/booking/BookingList';

export default function TeacherSessionsPage() {
  const teacherSlug = useAuthStore((s) => s.user?.teacherSlug ?? 'sh-yusuf-bilal');

  return (
    <div className="p-6 lg:p-10 space-y-10">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <Video className="size-3.5" /> Live sessions
        </div>
        <h1 className="mt-3 font-display text-3xl md:text-4xl">My sessions</h1>
        <p className="mt-2 text-muted-foreground">
          All confirmed Zoom sessions, plus your history.
        </p>
      </header>
      <BookingList perspective="teacher" filterByTeacherSlug={teacherSlug} />
    </div>
  );
}
