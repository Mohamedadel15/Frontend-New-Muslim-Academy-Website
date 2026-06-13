import type { LiveEvent } from '@/types/event';

const futureDays = (n: number, hour = 18) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

const pastDays = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

export const liveEvents: LiveEvent[] = [
  {
    id: 'e1',
    title: 'New Muslim Circle: Introducing Yourself as a Muslim',
    description:
      'How to tell your friends, family, and colleagues — without losing them or yourself.',
    speaker: {
      name: 'Ustadha Hafsa Malik',
      title: 'Convert Care Specialist',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    },
    startsAt: futureDays(2, 14),
    durationMinutes: 60,
    type: 'class',
    registerUrl: '#',
  },
  {
    id: 'e2',
    title: 'Live Quran Recitation Practice',
    description:
      'Open Quran, microphone, and a gentle ear. Read for the first time in public — safely.',
    speaker: {
      name: 'Ustadha Aisha Khan',
      title: 'Quran Teacher',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    },
    startsAt: futureDays(4, 19),
    durationMinutes: 90,
    type: 'workshop',
    registerUrl: '#',
  },
  {
    id: 'e3',
    title: 'Ask the Scholar: Open Q&A',
    description: 'No filter, no judgement. Bring the question you have not dared ask anyone else.',
    speaker: {
      name: 'Sheikh Yusuf Rahman',
      title: 'Aqeedah & Foundations',
      image: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?w=400&h=400&fit=crop',
    },
    startsAt: futureDays(6, 13),
    durationMinutes: 75,
    type: 'qa',
    registerUrl: '#',
  },
  {
    id: 'e4',
    title: 'Virtual Iftar Gathering',
    description: 'Break your fast with brothers and sisters across 25 countries.',
    speaker: {
      name: 'NMA Community',
      title: 'Hosts',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=400&fit=crop',
    },
    startsAt: futureDays(8, 18),
    durationMinutes: 120,
    type: 'gathering',
    registerUrl: '#',
  },
  {
    id: 'e5',
    title: 'How to Read Quran Without Knowing Arabic',
    description: 'Yes, you can. Here is the method that works.',
    speaker: {
      name: 'Ustadha Aisha Khan',
      title: 'Quran Teacher',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop',
    },
    startsAt: futureDays(11, 17),
    durationMinutes: 60,
    type: 'class',
    registerUrl: '#',
  },
  {
    id: 'p1',
    title: 'Your First 40 Days as a Muslim',
    description: 'A roadmap for the first six weeks after your shahada.',
    speaker: {
      name: 'Imam Abdullah Mansour',
      title: 'Imam & Author',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    startsAt: pastDays(14),
    durationMinutes: 90,
    type: 'class',
    recordingUrl: '#',
  },
  {
    id: 'p2',
    title: 'When Family Reacts Badly',
    description: 'Real stories, real questions, real answers.',
    speaker: {
      name: 'Dr. Hafsa Malik',
      title: 'Convert Care',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    },
    startsAt: pastDays(28),
    durationMinutes: 75,
    type: 'qa',
    recordingUrl: '#',
  },
];

export const upcomingEvents = () =>
  liveEvents.filter((e) => new Date(e.startsAt) >= new Date()).sort((a, b) =>
    a.startsAt.localeCompare(b.startsAt)
  );

export const pastEvents = () =>
  liveEvents.filter((e) => new Date(e.startsAt) < new Date()).sort((a, b) =>
    b.startsAt.localeCompare(a.startsAt)
  );
