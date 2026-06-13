import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { courses } from '@/lib/mock-data/courses';
import { blogPosts } from '@/lib/mock-data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'ar'] as const;
  const staticRoutes = ['', '/courses', '/live-events', '/blog', '/about', '/faq', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticRoutes) {
      entries.push({
        url: `${SITE.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1.0 : 0.8,
      });
    }
    for (const course of courses) {
      entries.push({
        url: `${SITE.url}/${locale}/courses/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
    for (const post of blogPosts) {
      entries.push({
        url: `${SITE.url}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
