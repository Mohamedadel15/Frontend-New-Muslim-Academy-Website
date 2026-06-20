'use client';

import { useParams } from 'next/navigation';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { ZoomSession } from '@/components/booking/ZoomSession';
import { useBookingStore } from '@/stores/bookingStore';

export default function SessionDetailPage() {
  const params = useParams();
  const id = String(params?.id ?? '');
  const booking = useBookingStore((s) => s.bookings.find((b) => b.id === id));

  if (!booking) {
    return (
      <div className="container-pad pt-28 pb-16 text-center">
        <h1 className="font-display text-3xl">Session not found</h1>
        <p className="mt-2 text-muted-foreground">
          This session may have been cancelled or never existed.
        </p>
        <Button asChild className="mt-6">
          <Link href="/dashboard/sessions">Back to sessions</Link>
        </Button>
      </div>
    );
  }

  return <ZoomSession booking={booking} />;
}
