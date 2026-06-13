export const SITE = {
  name: 'New Muslim Academy',
  shortName: 'NMA',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://newmuslimacademy.org',
  description:
    'Free online Islamic education for new Muslims. Structured courses, live sessions, mentorship, and a supportive community.',
  email: 'HelpDesk@NewMuslimAcademy.org',
  phone: '(917) 775-6299',
  social: {
    twitter: 'https://twitter.com/NewMuslimAcademy',
    facebook: 'https://facebook.com/NewMuslimAcademy',
    youtube: 'https://youtube.com/@NewMuslimAcademy',
    instagram: 'https://instagram.com/aftershahaadah',
  },
} as const;

export const STATS = [
  { key: 'students', value: 50_000, suffix: '+' },
  { key: 'courses', value: 100, suffix: '+' },
  { key: 'countries', value: 25, suffix: '+' },
  { key: 'satisfaction', value: 98, suffix: '%' },
] as const;

export const COURSE_CATEGORIES = [
  'all',
  'foundations',
  'worship',
  'quran',
  'character',
  'history',
  'advanced',
] as const;

export const BLOG_CATEGORIES = [
  'all',
  'character',
  'worship',
  'community',
  'stories',
  'quran',
  'lifestyle',
] as const;

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
