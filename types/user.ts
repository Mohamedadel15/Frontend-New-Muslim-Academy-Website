export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedAt: string;
  locale: 'en' | 'ar';
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface Certificate {
  id: string;
  courseSlug: string;
  courseTitle: string;
  issuedAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'courses' | 'technical' | 'community' | 'mentorship';
}
