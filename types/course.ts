import type { CourseCategory } from '@/lib/constants';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
  id: string;
  title: string;
  titleAr?: string;
  duration: number;
  videoUrl?: string;
}

export interface Module {
  id: string;
  title: string;
  titleAr?: string;
  lessons: Lesson[];
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  specializations: string[];
}

export interface CourseReview {
  id: string;
  author: string;
  authorAr?: string;
  rating: number;
  text: string;
  textAr?: string;
  date: string;
}

export interface Course {
  slug: string;
  title: string;
  titleAr?: string;
  category: Exclude<CourseCategory, 'all'>;
  level: CourseLevel;
  description: string;
  descriptionAr?: string;
  longDescription: string;
  longDescriptionAr?: string;
  thumbnail: string;
  /** Optional intro/preview video (e.g. a YouTube embed URL). */
  introVideoUrl?: string;
  durationHours: number;
  lessonCount: number;
  modules: Module[];
  instructor: Instructor;
  reviews: CourseReview[];
  featured?: boolean;
}
