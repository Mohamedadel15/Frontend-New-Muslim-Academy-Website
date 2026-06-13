import { QueryClient } from '@tanstack/react-query';
import type { Course } from '@/types/course';
import type { BlogPost } from '@/types/blog';
import type { LiveEvent } from '@/types/event';
import type { FAQItem } from '@/types/user';
import { courses, getCourse } from './mock-data/courses';
import { blogPosts, getPost } from './mock-data/blog';
import { liveEvents } from './mock-data/events';
import { faqs } from './mock-data/faqs';

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
  });

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchCourses(): Promise<Course[]> {
  await delay(120);
  return courses;
}

export async function fetchCourseBySlug(slug: string): Promise<Course | undefined> {
  await delay(80);
  return getCourse(slug);
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  await delay(120);
  return blogPosts;
}

export async function fetchBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  await delay(80);
  return getPost(slug);
}

export async function fetchEvents(): Promise<LiveEvent[]> {
  await delay(120);
  return liveEvents;
}

export async function fetchFAQs(): Promise<FAQItem[]> {
  await delay(60);
  return faqs;
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await delay(400);
  return { ok: true, id: `msg_${Date.now()}` };
}
