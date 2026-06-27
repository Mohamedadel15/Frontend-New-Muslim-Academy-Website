'use client';

import { useAuthStore } from '@/stores/authStore';
import { CalendarCheck } from 'lucide-react';
import { BookingList } from '@/components/booking/BookingList';

export default function TeacherRequestsPage() {
  const teacherSlug = useAuthStore((s) => s.user?.teacherSlug ?? 'mohamed-thani-ahmed');

  return (
    <div className="p-6 lg:p-10 space-y-10">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <CalendarCheck className="size-3.5" /> Booking requests
        </div>
        <h1 className="mt-3 font-display text-3xl md:text-4xl">Manage your requests</h1>
        <p className="mt-2 text-muted-foreground">
          Approve a request to auto-generate a Zoom link and notify the learner.
        </p>
      </header>
      <BookingList perspective="teacher" filterByTeacherSlug={teacherSlug} />
    </div>
  );
}
