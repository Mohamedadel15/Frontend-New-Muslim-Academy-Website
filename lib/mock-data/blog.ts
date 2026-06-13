import type { BlogPost } from '@/types/blog';

const longContent = (title: string) => `
  ${title} is one of those topics every new Muslim ends up asking about — sometimes out loud, more often in silence at 2am.

  ## Why this matters

  In the rush to learn the rituals of Islam — how to pray, how to fast, what to eat — it's easy to skip past the part where you become a different person. But Islam was never just a set of practices. It is a re-shaping.

  The Prophet ﷺ said: "I was only sent to perfect noble character." Notice what he didn't say. He didn't say "I was sent to teach you a list of rules." He said character. The thing that runs underneath everything you do.

  ## What this looks like in practice

  Here is what the early companions did when they became Muslim. They didn't only learn new prayers. They became softer with their families. They paid back debts they had forgotten about. They started smiling more. People around them noticed before they ever said the word "Islam."

  That is the test. Not the certificate, not the book you finished, not even the Arabic you memorised. The test is: are the people closest to you better off because you are Muslim now?

  ## A few things to try this week

  - Pick one relationship that has gone cold. Reach out, with no agenda.
  - Notice your speech for a single day. Count the words that did not need to be said.
  - When something annoys you, wait three seconds before reacting. Make du'a in those seconds.

  None of this is glamorous. Most of it is invisible. But this is the work — and it is the work that lasts.
`;

const author = (name: string) => ({
  name,
  avatar: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80&sig=${name}`,
  bio: `${name} writes about life as a new Muslim — the real, unfiltered version.`,
});

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-character-is-significant-in-islam',
    title: 'Why is Character Significant in Islam?',
    excerpt:
      "It is easy to think Islam is mostly about what you do with your body. The Prophet ﷺ taught us it is mostly about what you do with your soul.",
    content: longContent('Character in Islam'),
    category: 'character',
    author: author('Hafsa Malik'),
    publishedAt: '2025-05-12',
    readMinutes: 7,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&h=900&fit=crop',
    commentCount: 23,
  },
  {
    slug: 'belonging-to-god-before-community',
    title: 'Belonging to God Comes Before Belonging to a Community',
    excerpt:
      'When you are new, every Muslim group can feel like a family. Be careful which one you call yours.',
    content: longContent('Belonging'),
    category: 'community',
    author: author('Abdullah Mansour'),
    publishedAt: '2025-05-04',
    readMinutes: 9,
    coverImage: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=1600&h=900&fit=crop',
    commentCount: 41,
  },
  {
    slug: 'living-islam-through-character',
    title: 'Living Islam Through Character: Practical Tips for Everyday Life',
    excerpt: 'Ten small habits that show up in your life before they show up in your prayer mat.',
    content: longContent('Daily Character'),
    category: 'lifestyle',
    author: author('Hafsa Malik'),
    publishedAt: '2025-04-28',
    readMinutes: 6,
    coverImage: 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=1600&h=900&fit=crop',
    commentCount: 18,
  },
  {
    slug: 'afflictions-of-the-tongue',
    title: 'Afflictions of the Tongue — Guarding Your Speech',
    excerpt:
      "The Prophet ﷺ said a man's tongue can earn him a place in Hell faster than his feet can carry him. Why?",
    content: longContent('Guarding the Tongue'),
    category: 'character',
    author: author('Yusuf Rahman'),
    publishedAt: '2025-04-20',
    readMinutes: 8,
    coverImage: 'https://images.unsplash.com/photo-1525130413817-d45c1d127c42?w=1600&h=900&fit=crop',
    commentCount: 12,
  },
  {
    slug: 'how-to-pray-your-first-salah',
    title: 'How to Pray Your First Salah: A Step-by-Step Guide',
    excerpt:
      'Wudu, qibla, niyyah, takbir. By the end of this article you will have everything you need.',
    content: longContent('Your First Salah'),
    category: 'worship',
    author: author('Abdullah Mansour'),
    publishedAt: '2025-04-12',
    readMinutes: 12,
    coverImage: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1600&h=900&fit=crop',
    commentCount: 67,
  },
  {
    slug: 'dealing-with-family-after-converting',
    title: 'Dealing with Family After Converting to Islam',
    excerpt:
      "The hardest conversations of your life are still ahead. Here is how to enter them without losing yourself or your family.",
    content: longContent('Family After Shahadah'),
    category: 'stories',
    author: author('Aisha Khan'),
    publishedAt: '2025-04-05',
    readMinutes: 10,
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&h=900&fit=crop',
    commentCount: 89,
  },
  {
    slug: 'understanding-the-five-pillars',
    title: 'Understanding the Five Pillars: Your Foundation as a Muslim',
    excerpt: 'Shahadah, Salah, Zakat, Sawm, Hajj — five things that hold up everything else.',
    content: longContent('The Five Pillars'),
    category: 'worship',
    author: author('Abdullah Mansour'),
    publishedAt: '2025-03-28',
    readMinutes: 9,
    coverImage: 'https://images.unsplash.com/photo-1591600546748-c5c1d59c0f81?w=1600&h=900&fit=crop',
    commentCount: 34,
  },
  {
    slug: 'beauty-of-ramadan-new-muslims-guide',
    title: "The Beauty of Ramadan: A New Muslim's Guide",
    excerpt:
      'Your first Ramadan will surprise you. Here is what to expect and how to make the most of it.',
    content: longContent('First Ramadan'),
    category: 'lifestyle',
    author: author('Aisha Khan'),
    publishedAt: '2025-03-20',
    readMinutes: 8,
    coverImage: 'https://images.unsplash.com/photo-1591711584194-1b7e8a3d3a4d?w=1600&h=900&fit=crop',
    commentCount: 52,
  },
  {
    slug: 'questions-new-muslims-are-afraid-to-ask',
    title: "Common Questions New Muslims Are Afraid to Ask",
    excerpt: 'No question is silly. Here are the ones we get the most — answered without judgment.',
    content: longContent('Questions'),
    category: 'community',
    author: author('Yusuf Rahman'),
    publishedAt: '2025-03-12',
    readMinutes: 11,
    coverImage: 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?w=1600&h=900&fit=crop',
    commentCount: 76,
  },
  {
    slug: 'finding-peace-in-the-remembrance-of-allah',
    title: 'Finding Peace in the Remembrance of Allah',
    excerpt: '"Verily in the remembrance of Allah do hearts find rest." Here is how that becomes real for you.',
    content: longContent('Dhikr'),
    category: 'quran',
    author: author('Hafsa Malik'),
    publishedAt: '2025-03-04',
    readMinutes: 7,
    coverImage: 'https://images.unsplash.com/photo-1591429939960-b7d5add10b5c?w=1600&h=900&fit=crop',
    commentCount: 28,
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
