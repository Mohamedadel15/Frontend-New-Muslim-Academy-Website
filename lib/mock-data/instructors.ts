import type { Instructor } from '@/types/course';

export const instructors: Record<string, Instructor> = {
  yusuf: {
    id: 'yusuf',
    name: 'Sheikh Yusuf Rahman',
    title: 'Aqeedah & Foundations',
    bio: 'Graduate of Al-Azhar University with 18 years of teaching experience. Specialises in helping new Muslims build a sound understanding of Tawheed.',
    image: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?w=400&h=400&fit=crop',
    specializations: ['Aqeedah', 'Tawheed', 'Comparative Religion'],
  },
  aisha: {
    id: 'aisha',
    name: 'Ustadha Aisha Khan',
    title: 'Quran & Tajweed',
    bio: 'Ijazah in Hafs an Asim. Has taught Quran online to converts in over 30 countries for the past 12 years.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    specializations: ['Quran Recitation', 'Tajweed', 'Arabic Phonetics'],
  },
  abdullah: {
    id: 'abdullah',
    name: 'Imam Abdullah Mansour',
    title: 'Worship & Fiqh',
    bio: 'Imam of a community mosque in Chicago for 15 years. Author of "Your First Year as a Muslim".',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    specializations: ['Fiqh of Worship', 'Family Life', 'Convert Care'],
  },
  hafsa: {
    id: 'hafsa',
    name: 'Dr. Hafsa Malik',
    title: 'Islamic Character & Spirituality',
    bio: 'PhD in Islamic Studies. Focuses on the practical application of Prophetic character in daily life.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    specializations: ['Tazkiyah', 'Akhlaq', 'Seerah'],
  },
  ibrahim: {
    id: 'ibrahim',
    name: 'Ustadh Ibrahim Hassan',
    title: 'Seerah & Islamic History',
    bio: 'Historian and storyteller. Makes 1400 years of Islamic civilization feel as relevant as today.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    specializations: ['Seerah', 'Caliphate History', 'Islamic Civilization'],
  },
};
