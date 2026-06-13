import type { BlogCategory } from '@/lib/constants';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
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
