export type SubjectSlug =
  | 'quran'
  | 'arabic'
  | 'fiqh'
  | 'aqeedah'
  | 'tafseer'
  | 'seerah'
  | 'hadith'
  | 'tajweed';

export interface Subject {
  slug: SubjectSlug;
  name: string;
  nameAr: string;
  blurb: string;
  blurbAr?: string;
  icon: string;
  gradient: string;
  color: string;
  teacherCount: number;
}

export type ContentType = 'video' | 'text';

export interface TeacherContent {
  id: string;
  teacherSlug: string;
  subjectSlug: SubjectSlug;
  title: string;
  type: ContentType;
  excerpt: string;
  body?: string;
  videoUrl?: string;
  thumbnail?: string;
  durationMin?: number;
  views: number;
  publishedAt: string;
}

export interface Teacher {
  slug: string;
  name: string;
  /** Arabic form of the name, for bilingual display. */
  nameAr?: string;
  title: string;
  /** Expatriate community this da'i serves (e.g. "Ethiopian Community"). */
  community?: string;
  communityAr?: string;
  /** Academic qualification (e.g. "MA in Hadith"). */
  qualification?: string;
  qualificationAr?: string;
  phone?: string;
  email?: string;
  bio: string;
  bioAr?: string;
  longBio: string;
  longBioAr?: string;
  avatar: string;
  cover: string;
  subjects: SubjectSlug[];
  languages: string[];
  rating: number;
  reviewCount: number;
  studentCount: number;
  sessionPriceUsd: number;
  sessionsCompleted: number;
  yearsTeaching: number;
  availability: string[];
  verified: boolean;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'declined';

export interface Booking {
  id: string;
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
  status: BookingStatus;
  zoomUrl?: string;
  zoomMeetingId?: string;
  zoomPasscode?: string;
  createdAt: string;
}
