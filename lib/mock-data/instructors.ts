import type { Instructor } from '@/types/course';

// The same du'āt as lib/mock-data/teachers.ts, shaped for course pages and the
// About team grid. Keys are referenced from lib/mock-data/courses.ts.
export const instructors: Record<string, Instructor> = {
  mansour: {
    id: 'mansour-golam',
    name: 'Dr. Mansour Golam',
    title: 'Qur’an & Aqeedah · Burmese Community',
    bio: 'PhD in Qur’an & Sunnah. Teaches the Burmese community of Makkah the foundations of belief and careful Qur’an recitation in their mother tongue.',
    image: '/translators/mansour-golam.jpg',
    specializations: ['Aqeedah', 'Qur’an', 'Tajweed'],
  },
  jamil: {
    id: 'jamil-al-rahman',
    name: 'Jamil Al-Rahman Qari Abdul Hamid',
    title: 'Fiqh of Worship · Urdu-Speaking Community',
    bio: 'Bachelor’s in Shari’ah. Guides the Urdu-speaking community through the practical fiqh of purification, prayer and fasting.',
    image: '/translators/jamil-al-rahman.jpg',
    specializations: ['Fiqh of Worship', 'Purification', 'Prayer'],
  },
  mohamed: {
    id: 'mohamed-thani-ahmed',
    name: 'Mohamed Thani Ahmed',
    title: 'Aqeedah & Hadith · Ethiopian Community',
    bio: 'Master’s in Hadith. Serves the Ethiopian community in Amharic, teaching sound belief and the Sunnah.',
    image: '/translators/mohamed-thani-ahmed.jpg',
    specializations: ['Aqeedah', 'Hadith', 'Convert Care'],
  },
  zain: {
    id: 'zain-al-abidin',
    name: 'Zain Al-Abidin Mohamed Abdul Aziz',
    title: 'Tafseer & Daily Life · Filipino Community',
    bio: 'Master’s in Shari’ah & Law. Helps the Filipino community understand the Qur’an and how Islam shapes everyday life.',
    image: '/translators/zain-al-abidin.jpg',
    specializations: ['Tafseer', 'Fiqh', 'Family Life'],
  },
  akhyar: {
    id: 'akhyar-rashidi',
    name: 'Akhyar Rashidi',
    title: 'Seerah & Islamic History · Indonesian Community',
    bio: 'Bachelor’s in Hadith & Islamic Studies. Brings the life of the Prophet ﷺ to life for the Indonesian community.',
    image: '/translators/akhyar-rashidi.jpg',
    specializations: ['Seerah', 'Hadith', 'Islamic History'],
  },
};
