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
      name: 'Mohamed Thani Ahmed',
      title: 'Da’i — Ethiopian Community',
      image: '/translators/mohamed-thani-ahmed.jpg',
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
      name: 'Dr. Mansour Golam',
      title: 'Da’i — Burmese Community',
      image: '/translators/mansour-golam.jpg',
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
      name: 'Zain Al-Abidin Mohamed Abdul Aziz',
      title: 'Da’i — Filipino Community',
      image: '/translators/zain-al-abidin.jpg',
    },
    startsAt: futureDays(6, 13),
    durationMinutes: 75,
    type: 'qa',
    registerUrl: '#',
  },
  {
    id: 'e4',
    title: 'Virtual Iftar Gathering',
    description: 'Break your fast with brothers across the communities we serve.',
    speaker: {
      name: 'Society Community',
      title: 'Hosts',
      image: '/brand/society-logo.jpg',
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
      name: 'Akhyar Rashidi',
      title: 'Da’i — Indonesian Community',
      image: '/translators/akhyar-rashidi.jpg',
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
      name: 'Jamil Al-Rahman Qari Abdul Hamid',
      title: 'Da’i — Urdu-Speaking Community',
      image: '/translators/jamil-al-rahman.jpg',
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
      name: 'Mohamed Thani Ahmed',
      title: 'Da’i — Ethiopian Community',
      image: '/translators/mohamed-thani-ahmed.jpg',
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
