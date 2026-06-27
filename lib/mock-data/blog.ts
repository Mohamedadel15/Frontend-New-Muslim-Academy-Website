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

const longContentAr = (title: string) => `
  ${title} من المواضيع التي يجد كل مسلم جديد نفسه يسأل عنها — أحيانًا بصوتٍ مسموع، وأكثر من ذلك في صمتٍ عند الثانية فجرًا.

  ## لماذا هذا مهمّ

  في خِضمّ تعلّم شعائر الإسلام — كيف نصلّي، وكيف نصوم، وماذا نأكل — من السهل أن نتجاوز الجزء الذي نصبح فيه أشخاصًا مختلفين. لكنّ الإسلام لم يكن يومًا مجرّد مجموعة من العبادات؛ إنه إعادة تشكيلٍ للإنسان.

  قال النبيّ ﷺ: «إنما بُعثتُ لأتمّم مكارم الأخلاق». تأمّل ما لم يقله؛ فلم يقل: «بُعثتُ لأعلّمكم قائمةً من القواعد»، بل قال: الأخلاق. ذلك الشيء الذي يسري تحت كلّ ما تفعله.

  ## كيف يبدو هذا في الواقع

  هذا ما فعله الصحابة الأوائل حين أسلموا. لم يتعلّموا صلواتٍ جديدة فحسب، بل صاروا ألطف مع أهليهم، وردّوا ديونًا كانوا قد نسوها، وابتسموا أكثر. لاحظ من حولهم التغيير قبل أن ينطقوا بكلمة «الإسلام».

  هذا هو الاختبار؛ ليست الشهادةَ، ولا الكتابَ الذي أنهيته، ولا حتى العربيةَ التي حفظتها. الاختبار هو: هل صار أقرب الناس إليك أحسن حالًا لأنك مسلمٌ الآن؟

  ## أمورٌ تجرّبها هذا الأسبوع

  - اختر علاقةً فترت، وتواصل من جديد دون أيّ مصلحة.
  - راقب كلامك يومًا واحدًا، وأحصِ الكلمات التي لم تكن بحاجةٍ إلى قولها.
  - حين يضايقك أمرٌ، انتظر ثلاث ثوانٍ قبل أن تردّ، وادعُ الله في تلك الثواني.

  لا شيء من هذا برّاق، ومعظمه غير مرئيّ، لكنه العمل الحقيقيّ — وهو العمل الذي يبقى.
`;

const authorPhotos: Record<string, string> = {
  'Mohamed Thani Ahmed': '/translators/mohamed-thani-ahmed.jpg',
  'Dr. Mansour Golam': '/translators/mansour-golam.jpg',
  'Jamil Al-Rahman Qari Abdul Hamid': '/translators/jamil-al-rahman.jpg',
  'Zain Al-Abidin Mohamed Abdul Aziz': '/translators/zain-al-abidin.jpg',
  'Akhyar Rashidi': '/translators/akhyar-rashidi.jpg',
};

const author = (name: string) => ({
  name,
  avatar: authorPhotos[name] ?? '/brand/society-logo.jpg',
  bio: `${name} writes about life as a new Muslim — the real, unfiltered version.`,
});

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-character-is-significant-in-islam',
    title: 'Why is Character Significant in Islam?',
    titleAr: 'لماذا الأخلاق مهمّة في الإسلام؟',
    excerpt:
      "It is easy to think Islam is mostly about what you do with your body. The Prophet ﷺ taught us it is mostly about what you do with your soul.",
    excerptAr:
      'من السهل أن نظنّ أن الإسلام يتعلّق غالبًا بما تفعله بجسدك، لكنّ النبيّ ﷺ علّمنا أنه يتعلّق غالبًا بما تفعله بروحك.',
    content: longContent('Character in Islam'),
    contentAr: longContentAr('الأخلاق في الإسلام'),
    category: 'character',
    author: author('Mohamed Thani Ahmed'),
    publishedAt: '2025-05-12',
    readMinutes: 7,
    coverImage: '/islamic/mosque-dome.jpg',
    commentCount: 23,
  },
  {
    slug: 'belonging-to-god-before-community',
    title: 'Belonging to God Comes Before Belonging to a Community',
    titleAr: 'الانتماء إلى الله قبل الانتماء إلى جماعة',
    excerpt:
      'When you are new, every Muslim group can feel like a family. Be careful which one you call yours.',
    excerptAr:
      'حين تكون مسلمًا جديدًا، قد تبدو لك كلّ جماعةٍ مسلمة كأنها عائلة، فانتبه أيَّها تجعلها عائلتك.',
    content: longContent('Belonging'),
    contentAr: longContentAr('الانتماء'),
    category: 'community',
    author: author('Jamil Al-Rahman Qari Abdul Hamid'),
    publishedAt: '2025-05-04',
    readMinutes: 9,
    coverImage: '/islamic/quran-heart.jpg',
    commentCount: 41,
  },
  {
    slug: 'living-islam-through-character',
    title: 'Living Islam Through Character: Practical Tips for Everyday Life',
    titleAr: 'أن تعيش الإسلام بالأخلاق: نصائح عمليّة للحياة اليوميّة',
    excerpt: 'Ten small habits that show up in your life before they show up in your prayer mat.',
    excerptAr: 'عشر عاداتٍ صغيرة تظهر في حياتك قبل أن تظهر على سجّادة صلاتك.',
    content: longContent('Daily Character'),
    contentAr: longContentAr('الأخلاق اليوميّة'),
    category: 'lifestyle',
    author: author('Mohamed Thani Ahmed'),
    publishedAt: '2025-04-28',
    readMinutes: 6,
    coverImage: '/islamic/quran-book.jpg',
    commentCount: 18,
  },
  {
    slug: 'afflictions-of-the-tongue',
    title: 'Afflictions of the Tongue — Guarding Your Speech',
    titleAr: 'آفات اللسان — حفظ الكلام',
    excerpt:
      "The Prophet ﷺ said a man's tongue can earn him a place in Hell faster than his feet can carry him. Why?",
    excerptAr:
      'قال النبيّ ﷺ إن لسان المرء قد يهوي به في النار أبعد ممّا تبلغه قدماه، فلماذا؟',
    content: longContent('Guarding the Tongue'),
    contentAr: longContentAr('حفظ اللسان'),
    category: 'character',
    author: author('Dr. Mansour Golam'),
    publishedAt: '2025-04-20',
    readMinutes: 8,
    coverImage: '/islamic/quran-sand.jpg',
    commentCount: 12,
  },
  {
    slug: 'how-to-pray-your-first-salah',
    title: 'How to Pray Your First Salah: A Step-by-Step Guide',
    titleAr: 'كيف تؤدّي صلاتك الأولى: دليل خطوة بخطوة',
    excerpt:
      'Wudu, qibla, niyyah, takbir. By the end of this article you will have everything you need.',
    excerptAr:
      'الوضوء، والقبلة، والنيّة، والتكبير؛ بنهاية هذا المقال سيكون لديك كلّ ما تحتاجه.',
    content: longContent('Your First Salah'),
    contentAr: longContentAr('صلاتك الأولى'),
    category: 'worship',
    author: author('Jamil Al-Rahman Qari Abdul Hamid'),
    publishedAt: '2025-04-12',
    readMinutes: 12,
    coverImage: '/islamic/mosque-dome.jpg',
    commentCount: 67,
  },
  {
    slug: 'dealing-with-family-after-converting',
    title: 'Dealing with Family After Converting to Islam',
    titleAr: 'التعامل مع الأسرة بعد اعتناق الإسلام',
    excerpt:
      "The hardest conversations of your life are still ahead. Here is how to enter them without losing yourself or your family.",
    excerptAr:
      'أصعب الأحاديث في حياتك ما زالت أمامك، وإليك كيف تخوضها دون أن تفقد نفسك أو أهلك.',
    content: longContent('Family After Shahadah'),
    contentAr: longContentAr('الأسرة بعد الشهادة'),
    category: 'stories',
    author: author('Akhyar Rashidi'),
    publishedAt: '2025-04-05',
    readMinutes: 10,
    coverImage: '/islamic/quran-heart.jpg',
    commentCount: 89,
  },
  {
    slug: 'understanding-the-five-pillars',
    title: 'Understanding the Five Pillars: Your Foundation as a Muslim',
    titleAr: 'فهم أركان الإسلام الخمسة: أساسك بصفتك مسلمًا',
    excerpt: 'Shahadah, Salah, Zakat, Sawm, Hajj — five things that hold up everything else.',
    excerptAr: 'الشهادة، والصلاة، والزكاة، والصوم، والحجّ — خمسة أمورٍ يقوم عليها كلّ ما سواها.',
    content: longContent('The Five Pillars'),
    contentAr: longContentAr('أركان الإسلام الخمسة'),
    category: 'worship',
    author: author('Jamil Al-Rahman Qari Abdul Hamid'),
    publishedAt: '2025-03-28',
    readMinutes: 9,
    coverImage: '/islamic/quran-book.jpg',
    commentCount: 34,
  },
  {
    slug: 'beauty-of-ramadan-new-muslims-guide',
    title: "The Beauty of Ramadan: A New Muslim's Guide",
    titleAr: 'جمال رمضان: دليل المسلم الجديد',
    excerpt:
      'Your first Ramadan will surprise you. Here is what to expect and how to make the most of it.',
    excerptAr:
      'سيفاجئك رمضانك الأول؛ وإليك ما تتوقّعه وكيف تغتنمه خير اغتنام.',
    content: longContent('First Ramadan'),
    contentAr: longContentAr('رمضان الأول'),
    category: 'lifestyle',
    author: author('Akhyar Rashidi'),
    publishedAt: '2025-03-20',
    readMinutes: 8,
    coverImage: '/islamic/quran-sand.jpg',
    commentCount: 52,
  },
  {
    slug: 'questions-new-muslims-are-afraid-to-ask',
    title: "Common Questions New Muslims Are Afraid to Ask",
    titleAr: 'أسئلة شائعة يخشى المسلمون الجدد طرحها',
    excerpt: 'No question is silly. Here are the ones we get the most — answered without judgment.',
    excerptAr: 'لا يوجد سؤالٌ سخيف؛ إليك أكثر الأسئلة ورودًا — مُجابةً دون أيّ حكمٍ عليك.',
    content: longContent('Questions'),
    contentAr: longContentAr('الأسئلة'),
    category: 'community',
    author: author('Dr. Mansour Golam'),
    publishedAt: '2025-03-12',
    readMinutes: 11,
    coverImage: '/islamic/mosque-dome.jpg',
    commentCount: 76,
  },
  {
    slug: 'finding-peace-in-the-remembrance-of-allah',
    title: 'Finding Peace in the Remembrance of Allah',
    titleAr: 'السكينة في ذكر الله',
    excerpt: '"Verily in the remembrance of Allah do hearts find rest." Here is how that becomes real for you.',
    excerptAr: '«ألا بذكر الله تطمئنّ القلوب»؛ وإليك كيف يصير ذلك حقيقةً في حياتك.',
    content: longContent('Dhikr'),
    contentAr: longContentAr('ذكر الله'),
    category: 'quran',
    author: author('Mohamed Thani Ahmed'),
    publishedAt: '2025-03-04',
    readMinutes: 7,
    coverImage: '/islamic/quran-heart.jpg',
    commentCount: 28,
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
