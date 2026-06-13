import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Certificate } from '@/types/user';

interface ProgressState {
  enrolledCourses: string[];
  courseProgress: Record<string, number>;
  completedLessons: string[];
  certificates: Certificate[];
  enrollInCourse: (slug: string) => void;
  isEnrolled: (slug: string) => boolean;
  updateProgress: (slug: string, percent: number) => void;
  completeLesson: (lessonId: string) => void;
  awardCertificate: (certificate: Certificate) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      enrolledCourses: [],
      courseProgress: {},
      completedLessons: [],
      certificates: [],
      enrollInCourse: (slug) =>
        set((s) => ({
          enrolledCourses: s.enrolledCourses.includes(slug)
            ? s.enrolledCourses
            : [...s.enrolledCourses, slug],
          courseProgress: { ...s.courseProgress, [slug]: s.courseProgress[slug] ?? 0 },
        })),
      isEnrolled: (slug) => get().enrolledCourses.includes(slug),
      updateProgress: (slug, percent) =>
        set((s) => ({
          courseProgress: { ...s.courseProgress, [slug]: Math.min(100, Math.max(0, percent)) },
        })),
      completeLesson: (lessonId) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(lessonId)
            ? s.completedLessons
            : [...s.completedLessons, lessonId],
        })),
      awardCertificate: (certificate) =>
        set((s) => ({
          certificates: s.certificates.find((c) => c.id === certificate.id)
            ? s.certificates
            : [...s.certificates, certificate],
        })),
    }),
    { name: 'nma-progress' }
  )
);
