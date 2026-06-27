export const SITE = {
  name: "Da'wah & Guidance Society",
  nameLong: "Da'wah, Guidance & Expatriate Awareness Society — Makkah",
  nameAr: 'جمعية الدعوة والإرشاد',
  nameArLong: 'جمعية الدعوة والإرشاد وتوعية الجاليات بمكة المكرمة',
  shortName: 'DGS',
  /** National Center for Non-Profit Sector registration number. */
  registration: '3198',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://dm.org.sa',
  description:
    "A da'wah society in Makkah guiding new Muslims and serving expatriate communities — free courses, mentorship, and dedicated du'āt in every language.",
  email: 'info@dm.org.sa',
  phone: '0555545012',
  social: {
    twitter: 'https://twitter.com/dmmakkah',
    facebook: 'https://facebook.com/dmmakkah',
    youtube: 'https://youtube.com/dmmakkah',
    instagram: 'https://instagram.com/dmmakkah',
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
