import type { CourseCategory } from '@/lib/constants';

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  videoUrl?: string;
}

export interface Module {
  id: string;
  title: string;
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
  rating: number;
  text: string;
  date: string;
}

export interface Course {
  slug: string;
  title: string;
  category: Exclude<CourseCategory, 'all'>;
  level: CourseLevel;
  description: string;
  longDescription: string;
  thumbnail: string;
  durationHours: number;
  lessonCount: number;
  modules: Module[];
  instructor: Instructor;
  reviews: CourseReview[];
  featured?: boolean;
}
