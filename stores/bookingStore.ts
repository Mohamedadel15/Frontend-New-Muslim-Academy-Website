import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Booking, BookingStatus, SubjectSlug } from '@/types/teacher';

interface CreateBookingInput {
  teacherSlug: string;
  teacherName: string;
  teacherAvatar: string;
  learnerName: string;
  learnerEmail: string;
  subjectSlug: SubjectSlug;
  subjectName: string;
  scheduledAt: string;
  durationMin: number;
  note?: string;
}

interface BookingState {
  bookings: Booking[];
  createBooking: (input: CreateBookingInput) => Booking;
  updateStatus: (id: string, status: BookingStatus) => void;
  attachZoom: (
    id: string,
    payload: { zoomUrl: string; zoomMeetingId: string; zoomPasscode: string }
  ) => void;
  reset: () => void;
}

const seedBookings: Booking[] = [
  {
    id: 'b-seed-1',
    teacherSlug: 'sh-yusuf-bilal',
    teacherName: 'Sh. Yusuf Bilal',
    teacherAvatar: '/teachers/yusuf.jpg',
    learnerName: 'Hana M.',
    learnerEmail: 'hana@example.com',
    subjectSlug: 'quran',
    subjectName: 'Quran Recitation',
    scheduledAt: new Date(Date.now() + 36 * 3_600_000).toISOString(),
    durationMin: 45,
    note: 'I just took shahada last week. Where do I start?',
    status: 'pending',
    createdAt: new Date(Date.now() - 2 * 3_600_000).toISOString(),
  },
  {
    id: 'b-seed-2',
    teacherSlug: 'ust-amina-haq',
    teacherName: 'Ust. Amina Haq',
    teacherAvatar: '/teachers/amina.jpg',
    learnerName: 'You',
    learnerEmail: 'you@example.com',
    subjectSlug: 'arabic',
    subjectName: 'Arabic Language',
    scheduledAt: new Date(Date.now() + 4 * 86_400_000).toISOString(),
    durationMin: 30,
    note: 'Want to understand what I’m saying in salah.',
    status: 'confirmed',
    zoomUrl: 'https://zoom.us/j/849523109',
    zoomMeetingId: '849 523 109',
    zoomPasscode: 'nma2026',
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
  },
];

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      bookings: seedBookings,
      createBooking: (input) => {
        const booking: Booking = {
          id: `b_${Date.now()}`,
          ...input,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ bookings: [booking, ...s.bookings] }));
        return booking;
      },
      updateStatus: (id, status) =>
        set((s) => ({
          bookings: s.bookings.map((b) =>
            b.id === id
              ? {
                  ...b,
                  status,
                  ...(status === 'confirmed' && !b.zoomUrl
                    ? {
                        zoomUrl: `https://zoom.us/j/${Math.floor(100000000 + Math.random() * 900000000)}`,
                        zoomMeetingId: `${Math.floor(100 + Math.random() * 899)} ${Math.floor(
                          100 + Math.random() * 899
                        )} ${Math.floor(100 + Math.random() * 899)}`,
                        zoomPasscode: Math.random().toString(36).slice(2, 8),
                      }
                    : {}),
                }
              : b
          ),
        })),
      attachZoom: (id, payload) =>
        set((s) => ({
          bookings: s.bookings.map((b) => (b.id === id ? { ...b, ...payload } : b)),
        })),
      reset: () => set({ bookings: seedBookings }),
    }),
    { name: 'nma-bookings' }
  )
);
