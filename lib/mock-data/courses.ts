import type { Course } from '@/types/course';
import { instructors } from './instructors';

const reviews = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    id: `r${i + 1}`,
    author: ['Ahmed', 'Mariam', 'Yusuf', 'Sarah', 'David'][i % 5],
    rating: 5,
    text: [
      'Honestly the clearest explanation I have ever come across. Came in feeling lost, walked away with a roadmap.',
      'The instructor speaks like a friend, not a lecturer. I finished every lesson eager for the next.',
      'I wish I had this when I first took my shahada. Save someone the years I spent confused.',
      'Practical, warm, never overwhelming. Each module builds on the last in a way that just clicks.',
      'This was the first course I completed in full. The structure kept me coming back.',
    ][i % 5],
    date: '2025-04-12',
  }));

const mod = (id: string, title: string, lessons: string[]) => ({
  id,
  title,
  lessons: lessons.map((t, i) => ({
    id: `${id}-l${i + 1}`,
    title: t,
    duration: 12 + ((i * 5) % 20),
  })),
});

export const courses: Course[] = [
  {
    slug: 'foundations-of-faith',
    title: 'Foundations of Faith (Aqeedah)',
    category: 'foundations',
    level: 'beginner',
    description: 'Build a sound understanding of who Allah is and what we believe as Muslims.',
    longDescription:
      'Everything in Islam rests on belief. In this course you will learn the Six Pillars of Iman, the meaning of Tawheed, and how to live with conviction in your heart.',
    thumbnail: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=1200&h=800&fit=crop',
    durationHours: 8,
    lessonCount: 12,
    featured: true,
    instructor: instructors.yusuf,
    modules: [
      mod('m1', 'Understanding Tawheed', [
        'What is Tawheed?',
        'The Three Categories of Tawheed',
        'Tawheed in Daily Life',
      ]),
      mod('m2', 'The Six Pillars of Iman', [
        'Belief in Allah',
        'Belief in Angels',
        'Belief in Books',
        'Belief in Prophets',
        'Belief in the Day of Judgment',
        'Belief in Divine Decree',
      ]),
      mod('m3', "Allah's Names & Attributes", [
        'How We Know Allah',
        '99 Names: Selected Reflections',
        'Living with Conviction',
      ]),
    ],
    reviews: reviews(5),
  },
  {
    slug: 'five-pillars-of-islam',
    title: 'The Five Pillars of Islam',
    category: 'foundations',
    level: 'beginner',
    description: 'A walk-through of the five acts of worship that hold up the structure of Islam.',
    longDescription:
      'Shahadah, Salah, Zakat, Sawm, Hajj. Each pillar gets its own module with practical guidance on how to perform it correctly and meaningfully.',
    thumbnail: 'https://images.unsplash.com/photo-1591600546748-c5c1d59c0f81?w=1200&h=800&fit=crop',
    durationHours: 10,
    lessonCount: 15,
    featured: true,
    instructor: instructors.abdullah,
    modules: [
      mod('m1', 'Shahadah', ['The Testimony of Faith', 'What It Commits You To']),
      mod('m2', 'Salah', ['When to Pray', 'How to Pray', 'Why We Pray']),
      mod('m3', 'Sawm', ['Fasting in Ramadan', 'Rules & Exceptions']),
      mod('m4', 'Zakat', ['Who Pays', 'How Much', 'Where It Goes']),
      mod('m5', 'Hajj', ['The Pilgrimage Explained', 'When You Will Be Ready']),
    ],
    reviews: reviews(4),
  },
  {
    slug: 'how-to-pray-salah',
    title: 'How to Pray (Salah) Masterclass',
    category: 'worship',
    level: 'beginner',
    description: 'Your first Salah, performed with confidence — step by step, by video.',
    longDescription:
      'From wudu to the final salam. Every position, every word, every common mistake. Designed for people who have never prayed before.',
    thumbnail: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1200&h=800&fit=crop',
    durationHours: 6,
    lessonCount: 10,
    featured: true,
    instructor: instructors.abdullah,
    modules: [
      mod('m1', 'Before You Pray', [
        'Wudu Step by Step',
        'The Adhan',
        'Cleanliness & Dress',
      ]),
      mod('m2', 'The Prayer Itself', [
        'Fard, Sunnah, Nafl',
        'How to Pray Fajr',
        'How to Pray Dhuhr / Asr',
        'How to Pray Maghrib / Isha',
      ]),
      mod('m3', 'Special Situations', [
        'Jumu’ah Prayer',
        'Common Mistakes',
        'What to Do If You Miss a Prayer',
      ]),
    ],
    reviews: reviews(5),
  },
  {
    slug: 'quran-recitation-beginners',
    title: 'Quran Recitation for Beginners',
    category: 'quran',
    level: 'beginner',
    description: 'Open the Quran for the first time — and read it.',
    longDescription:
      'Zero Arabic required. We start with letters, move to sounds, then to your first surah. By the end you will recite Surat Al-Fatiha from memory.',
    thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&h=800&fit=crop',
    durationHours: 14,
    lessonCount: 20,
    featured: true,
    instructor: instructors.aisha,
    modules: [
      mod('m1', 'The Arabic Alphabet', ['Letter Shapes', 'Letter Sounds', 'Connecting Letters']),
      mod('m2', 'Makharij', ['Where Each Letter Comes From', 'Tongue Placement', 'Common Confusions']),
      mod('m3', 'Your First Surahs', [
        'Al-Fatiha',
        'Al-Ikhlas',
        'Al-Falaq',
        'An-Nas',
      ]),
      mod('m4', 'Tajweed Basics', ['Madd', 'Ghunnah', 'Stopping Rules']),
    ],
    reviews: reviews(5),
  },
  {
    slug: 'living-islam-daily',
    title: 'Living Islam Daily',
    category: 'character',
    level: 'beginner',
    description: 'How to be a Muslim, all day, every day — at home, work, and in public.',
    longDescription:
      'The everyday practice of Islam: how you eat, dress, greet, treat your family, and handle the moments that no textbook covers.',
    thumbnail: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=800&fit=crop',
    durationHours: 7,
    lessonCount: 12,
    instructor: instructors.hafsa,
    modules: [
      mod('m1', 'Adab', ['Islamic Manners', 'Greeting Others', 'Visiting Etiquette']),
      mod('m2', 'Body & Clothing', ['Modesty', 'Dress Code', 'Hygiene']),
      mod('m3', 'Family & Society', [
        'Dealing with Non-Muslim Family',
        'Gender Relations',
        'Building Muslim Friendships',
      ]),
    ],
    reviews: reviews(4),
  },
  {
    slug: 'the-prophets-life',
    title: "The Prophet's Life (Seerah)",
    category: 'history',
    level: 'intermediate',
    description: "The life of Muhammad ﷺ — your model for everything.",
    longDescription:
      'From his birth in Makkah to the conquest of the city. Every chapter holds a lesson you can apply this week.',
    thumbnail: 'https://images.unsplash.com/photo-1542652694-40abf526446e?w=1200&h=800&fit=crop',
    durationHours: 16,
    lessonCount: 24,
    instructor: instructors.ibrahim,
    modules: [
      mod('m1', 'Before Islam', ['Makkan Society', 'His Early Life']),
      mod('m2', 'The Makkan Period', ['First Revelation', 'The Early Muslims', 'Persecution']),
      mod('m3', 'The Hijrah', ['Leaving Makkah', 'Arrival in Madinah']),
      mod('m4', 'Building the Ummah', ['The Constitution', 'Battles', 'Final Years']),
    ],
    reviews: reviews(5),
  },
  {
    slug: 'islamic-history',
    title: 'Islamic History',
    category: 'history',
    level: 'intermediate',
    description: '1400 years in 10 hours — without losing the soul of the story.',
    longDescription:
      'The Rightly Guided Caliphs, the Umayyad and Abbasid eras, the Golden Age of science, and how all of it shaped the world we live in.',
    thumbnail: 'https://images.unsplash.com/photo-1539020140153-e479b8c5f0fe?w=1200&h=800&fit=crop',
    durationHours: 10,
    lessonCount: 14,
    instructor: instructors.ibrahim,
    modules: [
      mod('m1', 'The Rightly Guided Caliphs', ['Abu Bakr', 'Umar', 'Uthman', 'Ali']),
      mod('m2', 'Golden Age', ['Science', 'Art & Architecture', 'Trade & Travel']),
      mod('m3', 'Islam Today', ['Modern Muslim World', 'Lessons for Us']),
    ],
    reviews: reviews(3),
  },
  {
    slug: 'protecting-your-faith',
    title: 'Protecting Your Faith',
    category: 'advanced',
    level: 'intermediate',
    description: 'Faith is precious. Here is how you guard it from the things that erode it.',
    longDescription:
      'Major sins, types of shirk, doubts and how to handle them. Practical tools to keep your iman steady through life’s storms.',
    thumbnail: 'https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?w=1200&h=800&fit=crop',
    durationHours: 9,
    lessonCount: 13,
    instructor: instructors.yusuf,
    modules: [
      mod('m1', 'Major Sins', ['What They Are', 'Why They Are Major', 'How to Recover']),
      mod('m2', 'Shirk', ['Hidden Shirk', 'Apparent Shirk', 'Keeping Tawheed Pure']),
      mod('m3', 'Handling Doubts', ['Where Doubts Come From', 'How to Respond', 'Building Conviction']),
    ],
    reviews: reviews(4),
  },
  {
    slug: 'dua-and-azkar',
    title: "Du'a & Remembrance (Azkar)",
    category: 'worship',
    level: 'beginner',
    description: 'The conversation with Allah that never has to stop.',
    longDescription:
      'Morning and evening adhkar, the du’as the Prophet ﷺ made for every situation, and the power of istighfar.',
    thumbnail: 'https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?w=1200&h=800&fit=crop',
    durationHours: 5,
    lessonCount: 9,
    instructor: instructors.hafsa,
    modules: [
      mod('m1', 'Daily Adhkar', ['Morning', 'Evening', 'After Prayer']),
      mod('m2', "Du'a for Life", ['Du’a for Stress', 'Du’a for Family', 'Du’a for Forgiveness']),
      mod('m3', 'Istighfar', ['The Power of Asking', 'When and How']),
    ],
    reviews: reviews(5),
  },
  {
    slug: 'ramadan-and-special-occasions',
    title: 'Ramadan & Special Occasions',
    category: 'worship',
    level: 'beginner',
    description: 'Walk into your first Ramadan ready.',
    longDescription:
      'How to fast, how to pray Taraweeh, how to look for Laylatul Qadr, and how to celebrate Eid — even if you are doing it for the first time, alone.',
    thumbnail: 'https://images.unsplash.com/photo-1591711584194-1b7e8a3d3a4d?w=1200&h=800&fit=crop',
    durationHours: 6,
    lessonCount: 10,
    instructor: instructors.abdullah,
    modules: [
      mod('m1', 'Before Ramadan', ['Preparation', 'Setting Intentions']),
      mod('m2', 'During Ramadan', ['Fasting Rules', 'Taraweeh', 'The Last Ten Nights']),
      mod('m3', 'After Ramadan', ['Eid', 'Keeping the Habits']),
    ],
    reviews: reviews(4),
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const featuredCourses = () => courses.filter((c) => c.featured);
