import type { BlogCategory } from '@/lib/constants';

export interface BlogPost {
  slug: string;
  title: string;
  titleAr?: string;
  excerpt: string;
  excerptAr?: string;
  content: string;
  contentAr?: string;
  category: Exclude<BlogCategory, 'all'>;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  publishedAt: string;
  readMinutes: number;
  coverImage: string;
  commentCount?: number;
}
