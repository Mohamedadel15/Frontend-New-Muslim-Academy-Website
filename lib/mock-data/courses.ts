import type { Course } from '@/types/course';
import { instructors } from './instructors';

const INTRO_VIDEO = 'https://www.youtube.com/embed/xCRxjxkLIns';

const reviews = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    id: `r${i + 1}`,
    author: ['Ahmed', 'Bilal', 'Yusuf', 'Omar', 'David'][i % 5],
    authorAr: ['أحمد', 'بلال', 'يوسف', 'عمر', 'داود'][i % 5],
    rating: 5,
    text: [
      'Honestly the clearest explanation I have ever come across. Came in feeling lost, walked away with a roadmap.',
      'The instructor speaks like a friend, not a lecturer. I finished every lesson eager for the next.',
      'I wish I had this when I first took my shahada. Save someone the years I spent confused.',
      'Practical, warm, never overwhelming. Each module builds on the last in a way that just clicks.',
      'This was the first course I completed in full. The structure kept me coming back.',
    ][i % 5],
    textAr: [
      'بصراحة، هذا أوضح شرح صادفته في حياتي. دخلت وأنا تائه، وخرجت بخارطة طريق واضحة.',
      'يتحدث المعلّم وكأنه صديق لا محاضر. أنهيت كل درس وأنا متشوّق للذي يليه.',
      'ليت هذه الدورة كانت بين يديّ حين نطقت بالشهادة لأول مرة. اختصر على غيرك السنوات التي قضيتها في حيرة.',
      'عملية، دافئة، وغير مرهقة أبدًا. كل وحدة تبني على ما قبلها بصورة تترسّخ في الذهن.',
      'هذه أول دورة أكملتها حتى نهايتها. أسلوب التنظيم كان يعيدني إليها مرة بعد مرة.',
    ][i % 5],
    date: '2025-04-12',
  }));

const mod = (
  id: string,
  title: string,
  titleAr: string,
  lessons: [string, string][]
) => ({
  id,
  title,
  titleAr,
  lessons: lessons.map(([t, tAr], i) => ({
    id: `${id}-l${i + 1}`,
    title: t,
    titleAr: tAr,
    duration: 12 + ((i * 5) % 20),
  })),
});

export const courses: Course[] = [
  {
    slug: 'tawhid-oneness-of-allah',
    title: 'Tawhid — The Oneness of Allah (التوحيد)',
    titleAr: 'التوحيد — وحدانية الله',
    category: 'foundations',
    level: 'beginner',
    description: 'The first and greatest message: there is no god but Allah. Start your journey here.',
    descriptionAr: 'الرسالة الأولى والأعظم: لا إله إلا الله. ابدأ رحلتك من هنا.',
    longDescription:
      'Tawhid (التوحيد) is the foundation of Islam — affirming that Allah alone is the Creator, the Sustainer, and the only One worthy of worship. This introductory unit explains the meaning of "La ilaha illa Allah", the categories of Tawhid, and how this single belief reshapes a Muslim’s entire life. Begin with the short intro video, then work through the lessons at your own pace.',
    longDescriptionAr:
      'التوحيد هو أساس الإسلام — وهو إفراد الله وحده بأنه الخالق الرازق، والمستحق وحده للعبادة. تشرح هذه الوحدة التمهيدية معنى "لا إله إلا الله"، وأقسام التوحيد، وكيف تعيد هذه العقيدة الواحدة تشكيل حياة المسلم بأكملها. ابدأ بالفيديو التعريفي القصير، ثم تنقّل بين الدروس على وتيرتك الخاصة.',
    thumbnail: '/islamic/quran-heart.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 3,
    lessonCount: 6,
    featured: true,
    instructor: instructors.mansour,
    modules: [
      mod('m1', 'The Meaning of Tawhid', 'معنى التوحيد', [
        ['What "La ilaha illa Allah" means', 'معنى "لا إله إلا الله"'],
        ['Why Allah alone deserves worship', 'لماذا يستحق الله وحده العبادة'],
        ['The fruits of Tawhid in your life', 'ثمرات التوحيد في حياتك'],
      ]),
      mod('m2', 'The Categories of Tawhid', 'أقسام التوحيد', [
        ['Tawhid of Lordship (Rububiyyah)', 'توحيد الربوبية'],
        ['Tawhid of Worship (Uluhiyyah)', 'توحيد الألوهية'],
        ['Tawhid of Names & Attributes', 'توحيد الأسماء والصفات'],
      ]),
    ],
    reviews: reviews(3),
  },
  {
    slug: 'salah-the-prayer',
    title: 'Salah — The Prayer (الصلاة)',
    titleAr: 'الصلاة',
    category: 'worship',
    level: 'beginner',
    description: 'Learn to pray with confidence — from the intention to the final salam.',
    descriptionAr: 'تعلّم أن تصلّي بثقة — من النية إلى التسليم الأخير.',
    longDescription:
      'Salah (الصلاة) is the second pillar of Islam and the daily connection between a servant and Allah. This unit walks you through the prayer step by step — purification, intention, the postures and what to say in each — so you can pray your first complete Salah. Watch the intro video, then follow the lessons.',
    longDescriptionAr:
      'الصلاة هي الركن الثاني من أركان الإسلام، وهي الصلة اليومية بين العبد وربه. ترشدك هذه الوحدة إلى الصلاة خطوة بخطوة — الطهارة والنية والأركان وما يُقال في كل منها — حتى تؤدي صلاتك الأولى كاملة. شاهد الفيديو التعريفي، ثم تابع الدروس.',
    thumbnail: '/islamic/mosque-dome.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 4,
    lessonCount: 7,
    featured: true,
    instructor: instructors.jamil,
    modules: [
      mod('m1', 'Before You Pray', 'قبل أن تصلّي', [
        ['Purification & Wudu', 'الطهارة والوضوء'],
        ['Covering & facing the Qiblah', 'ستر العورة واستقبال القبلة'],
        ['The intention (Niyyah)', 'النية'],
      ]),
      mod('m2', 'The Prayer Step by Step', 'الصلاة خطوة بخطوة', [
        ['Takbir & standing', 'تكبيرة الإحرام والقيام'],
        ['Ruku and Sujood', 'الركوع والسجود'],
        ['The Tashahhud', 'التشهد'],
        ['The final Salam', 'التسليم'],
      ]),
    ],
    reviews: reviews(3),
  },
  {
    slug: 'wudu-ablution',
    title: 'Wudu — Ablution (الوضوء)',
    titleAr: 'الوضوء',
    category: 'worship',
    level: 'beginner',
    description: 'Purify yourself for prayer — the simple, correct way to make wudu.',
    descriptionAr: 'تطهّر للصلاة — الطريقة الصحيحة والبسيطة لأداء الوضوء.',
    longDescription:
      'Wudu (الوضوء) is the ablution that prepares you for prayer. This short unit shows you exactly how to perform it — nothing skipped and nothing extra — and answers the questions every new Muslim has: what breaks wudu, and when you need to renew it. Start with the intro video.',
    longDescriptionAr:
      'الوضوء هو الطهارة التي تُهيّئك للصلاة. تبيّن لك هذه الوحدة القصيرة كيفية أدائه تمامًا — لا نقص ولا زيادة — وتجيب عن الأسئلة التي تخطر لكل مسلم جديد: ما الذي ينقض الوضوء، ومتى يجب تجديده. ابدأ بالفيديو التعريفي.',
    thumbnail: '/islamic/mosque-dome.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 2,
    lessonCount: 5,
    featured: true,
    instructor: instructors.jamil,
    modules: [
      mod('m1', 'How to Make Wudu', 'كيفية الوضوء', [
        ['Intention & Bismillah', 'النية والتسمية'],
        ['Washing the face & arms', 'غسل الوجه واليدين'],
        ['Wiping the head & washing the feet', 'مسح الرأس وغسل القدمين'],
      ]),
      mod('m2', 'Rulings & Common Questions', 'الأحكام والأسئلة الشائعة', [
        ['What breaks wudu', 'نواقض الوضوء'],
        ['Wiping over socks (khuff)', 'المسح على الخفين'],
      ]),
    ],
    reviews: reviews(3),
  },
  {
    slug: 'foundations-of-faith',
    title: 'Foundations of Faith (Aqeedah)',
    titleAr: 'أسس العقيدة',
    category: 'foundations',
    level: 'beginner',
    description: 'Build a sound understanding of who Allah is and what we believe as Muslims.',
    descriptionAr: 'ابنِ فهمًا سليمًا لمن هو الله وما الذي نؤمن به كمسلمين.',
    longDescription:
      'Everything in Islam rests on belief. In this course you will learn the Six Pillars of Iman, the meaning of Tawheed, and how to live with conviction in your heart.',
    longDescriptionAr:
      'كل شيء في الإسلام قائم على العقيدة. في هذه الدورة ستتعلّم أركان الإيمان الستة، ومعنى التوحيد، وكيف تعيش بيقين راسخ في قلبك.',
    thumbnail: '/islamic/quran-sand.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 8,
    lessonCount: 12,
    featured: true,
    instructor: instructors.mansour,
    modules: [
      mod('m1', 'Understanding Tawheed', 'فهم التوحيد', [
        ['What is Tawheed?', 'ما هو التوحيد؟'],
        ['The Three Categories of Tawheed', 'أقسام التوحيد الثلاثة'],
        ['Tawheed in Daily Life', 'التوحيد في الحياة اليومية'],
      ]),
      mod('m2', 'The Six Pillars of Iman', 'أركان الإيمان الستة', [
        ['Belief in Allah', 'الإيمان بالله'],
        ['Belief in Angels', 'الإيمان بالملائكة'],
        ['Belief in Books', 'الإيمان بالكتب'],
        ['Belief in Prophets', 'الإيمان بالرسل'],
        ['Belief in the Day of Judgment', 'الإيمان باليوم الآخر'],
        ['Belief in Divine Decree', 'الإيمان بالقدر'],
      ]),
      mod('m3', "Allah's Names & Attributes", 'أسماء الله وصفاته', [
        ['How We Know Allah', 'كيف نعرف الله'],
        ['99 Names: Selected Reflections', 'أسماء الله الحسنى: وقفات مختارة'],
        ['Living with Conviction', 'العيش باليقين'],
      ]),
    ],
    reviews: reviews(5),
  },
  {
    slug: 'five-pillars-of-islam',
    title: 'The Five Pillars of Islam',
    titleAr: 'أركان الإسلام الخمسة',
    category: 'foundations',
    level: 'beginner',
    description: 'A walk-through of the five acts of worship that hold up the structure of Islam.',
    descriptionAr: 'جولة في العبادات الخمس التي يقوم عليها بنيان الإسلام.',
    longDescription:
      'Shahadah, Salah, Zakat, Sawm, Hajj. Each pillar gets its own module with practical guidance on how to perform it correctly and meaningfully.',
    longDescriptionAr:
      'الشهادة والصلاة والزكاة والصوم والحج. لكل ركن وحدته الخاصة مع إرشاد عملي حول كيفية أدائه على الوجه الصحيح وبمعنى عميق.',
    thumbnail: '/islamic/mosque-dome.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 10,
    lessonCount: 15,
    featured: true,
    instructor: instructors.jamil,
    modules: [
      mod('m1', 'Shahadah', 'الشهادة', [
        ['The Testimony of Faith', 'شهادة التوحيد'],
        ['What It Commits You To', 'ما تلتزم به بنطقها'],
      ]),
      mod('m2', 'Salah', 'الصلاة', [
        ['When to Pray', 'مواقيت الصلاة'],
        ['How to Pray', 'كيفية الصلاة'],
        ['Why We Pray', 'لماذا نصلّي'],
      ]),
      mod('m3', 'Sawm', 'الصوم', [
        ['Fasting in Ramadan', 'الصيام في رمضان'],
        ['Rules & Exceptions', 'الأحكام والرخص'],
      ]),
      mod('m4', 'Zakat', 'الزكاة', [
        ['Who Pays', 'من تجب عليه الزكاة'],
        ['How Much', 'مقدار الزكاة'],
        ['Where It Goes', 'مصارف الزكاة'],
      ]),
      mod('m5', 'Hajj', 'الحج', [
        ['The Pilgrimage Explained', 'مناسك الحج'],
        ['When You Will Be Ready', 'متى تكون مستعدًا'],
      ]),
    ],
    reviews: reviews(4),
  },
  {
    slug: 'how-to-pray-salah',
    title: 'How to Pray (Salah) Masterclass',
    titleAr: 'دورة متقدّمة في تعلّم الصلاة',
    category: 'worship',
    level: 'beginner',
    description: 'Your first Salah, performed with confidence — step by step, by video.',
    descriptionAr: 'صلاتك الأولى تؤدّيها بثقة — خطوة بخطوة بالفيديو.',
    longDescription:
      'From wudu to the final salam. Every position, every word, every common mistake. Designed for people who have never prayed before.',
    longDescriptionAr:
      'من الوضوء إلى التسليم الأخير. كل وضع، وكل كلمة، وكل خطأ شائع. مصمّمة لمن لم يصلِّ من قبل قط.',
    thumbnail: '/islamic/mosque-dome.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 6,
    lessonCount: 10,
    featured: true,
    instructor: instructors.jamil,
    modules: [
      mod('m1', 'Before You Pray', 'قبل أن تصلّي', [
        ['Wudu Step by Step', 'الوضوء خطوة بخطوة'],
        ['The Adhan', 'الأذان'],
        ['Cleanliness & Dress', 'الطهارة واللباس'],
      ]),
      mod('m2', 'The Prayer Itself', 'الصلاة نفسها', [
        ['Fard, Sunnah, Nafl', 'الفرض والسنة والنفل'],
        ['How to Pray Fajr', 'كيفية صلاة الفجر'],
        ['How to Pray Dhuhr / Asr', 'كيفية صلاة الظهر والعصر'],
        ['How to Pray Maghrib / Isha', 'كيفية صلاة المغرب والعشاء'],
      ]),
      mod('m3', 'Special Situations', 'حالات خاصة', [
        ['Jumu’ah Prayer', 'صلاة الجمعة'],
        ['Common Mistakes', 'الأخطاء الشائعة'],
        ['What to Do If You Miss a Prayer', 'ماذا تفعل إذا فاتتك صلاة'],
      ]),
    ],
    reviews: reviews(5),
  },
  {
    slug: 'quran-recitation-beginners',
    title: 'Quran Recitation for Beginners',
    titleAr: 'تلاوة القرآن للمبتدئين',
    category: 'quran',
    level: 'beginner',
    description: 'Open the Quran for the first time — and read it.',
    descriptionAr: 'افتح المصحف لأول مرة — واقرأه.',
    longDescription:
      'Zero Arabic required. We start with letters, move to sounds, then to your first surah. By the end you will recite Surat Al-Fatiha from memory.',
    longDescriptionAr:
      'لا يُشترط أي معرفة سابقة بالعربية. نبدأ بالحروف، ثم الأصوات، ثم أول سورة لك. وبنهاية الدورة ستتلو سورة الفاتحة من حفظك.',
    thumbnail: '/islamic/quran-book.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 14,
    lessonCount: 20,
    featured: true,
    instructor: instructors.mansour,
    modules: [
      mod('m1', 'The Arabic Alphabet', 'الحروف العربية', [
        ['Letter Shapes', 'أشكال الحروف'],
        ['Letter Sounds', 'أصوات الحروف'],
        ['Connecting Letters', 'وصل الحروف'],
      ]),
      mod('m2', 'Makharij', 'مخارج الحروف', [
        ['Where Each Letter Comes From', 'مخرج كل حرف'],
        ['Tongue Placement', 'مواضع اللسان'],
        ['Common Confusions', 'الحروف المتشابهة'],
      ]),
      mod('m3', 'Your First Surahs', 'أوّل سورك', [
        ['Al-Fatiha', 'سورة الفاتحة'],
        ['Al-Ikhlas', 'سورة الإخلاص'],
        ['Al-Falaq', 'سورة الفلق'],
        ['An-Nas', 'سورة الناس'],
      ]),
      mod('m4', 'Tajweed Basics', 'أساسيات التجويد', [
        ['Madd', 'المدّ'],
        ['Ghunnah', 'الغنّة'],
        ['Stopping Rules', 'أحكام الوقف'],
      ]),
    ],
    reviews: reviews(5),
  },
  {
    slug: 'living-islam-daily',
    title: 'Living Islam Daily',
    titleAr: 'الإسلام في الحياة اليومية',
    category: 'character',
    level: 'beginner',
    description: 'How to be a Muslim, all day, every day — at home, work, and in public.',
    descriptionAr: 'كيف تكون مسلمًا طوال اليوم وكل يوم — في البيت والعمل وبين الناس.',
    longDescription:
      'The everyday practice of Islam: how you eat, dress, greet, treat your family, and handle the moments that no textbook covers.',
    longDescriptionAr:
      'الممارسة اليومية للإسلام: كيف تأكل وتلبس وتُسلّم وتعامل أهلك، وكيف تتصرّف في المواقف التي لا تتناولها الكتب.',
    thumbnail: '/islamic/mosque-dome.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 7,
    lessonCount: 12,
    instructor: instructors.zain,
    modules: [
      mod('m1', 'Adab', 'الآداب', [
        ['Islamic Manners', 'الأخلاق الإسلامية'],
        ['Greeting Others', 'إفشاء السلام'],
        ['Visiting Etiquette', 'آداب الزيارة'],
      ]),
      mod('m2', 'Body & Clothing', 'البدن واللباس', [
        ['Modesty', 'الحياء'],
        ['Dress Code', 'أحكام اللباس'],
        ['Hygiene', 'الطهارة والنظافة'],
      ]),
      mod('m3', 'Family & Society', 'الأسرة والمجتمع', [
        ['Dealing with Non-Muslim Family', 'التعامل مع الأهل غير المسلمين'],
        ['Gender Relations', 'العلاقة بين الجنسين'],
        ['Building Muslim Friendships', 'بناء صداقات مع المسلمين'],
      ]),
    ],
    reviews: reviews(4),
  },
  {
    slug: 'the-prophets-life',
    title: "The Prophet's Life (Seerah)",
    titleAr: 'السيرة النبوية',
    category: 'history',
    level: 'intermediate',
    description: "The life of Muhammad ﷺ — your model for everything.",
    descriptionAr: 'حياة النبي محمد ﷺ — قدوتك في كل شيء.',
    longDescription:
      'From his birth in Makkah to the conquest of the city. Every chapter holds a lesson you can apply this week.',
    longDescriptionAr:
      'من مولده في مكة إلى فتحها. كل فصل يحمل درسًا يمكنك تطبيقه في أسبوعك هذا.',
    thumbnail: '/islamic/mosque-dome.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 16,
    lessonCount: 24,
    instructor: instructors.akhyar,
    modules: [
      mod('m1', 'Before Islam', 'قبل البعثة', [
        ['Makkan Society', 'مجتمع مكة'],
        ['His Early Life', 'نشأته ﷺ'],
      ]),
      mod('m2', 'The Makkan Period', 'العهد المكّي', [
        ['First Revelation', 'بدء الوحي'],
        ['The Early Muslims', 'السابقون الأوّلون'],
        ['Persecution', 'الاضطهاد والأذى'],
      ]),
      mod('m3', 'The Hijrah', 'الهجرة', [
        ['Leaving Makkah', 'الخروج من مكة'],
        ['Arrival in Madinah', 'الوصول إلى المدينة'],
      ]),
      mod('m4', 'Building the Ummah', 'بناء الأمة', [
        ['The Constitution', 'وثيقة المدينة'],
        ['Battles', 'الغزوات'],
        ['Final Years', 'السنوات الأخيرة'],
      ]),
    ],
    reviews: reviews(5),
  },
  {
    slug: 'islamic-history',
    title: 'Islamic History',
    titleAr: 'التاريخ الإسلامي',
    category: 'history',
    level: 'intermediate',
    description: '1400 years in 10 hours — without losing the soul of the story.',
    descriptionAr: '١٤٠٠ عام في عشر ساعات — دون أن نفقد روح القصة.',
    longDescription:
      'The Rightly Guided Caliphs, the Umayyad and Abbasid eras, the Golden Age of science, and how all of it shaped the world we live in.',
    longDescriptionAr:
      'الخلفاء الراشدون، والعصران الأموي والعباسي، والعصر الذهبي للعلوم، وكيف صاغ ذلك كله العالم الذي نعيش فيه.',
    thumbnail: '/islamic/mosque-dome.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 10,
    lessonCount: 14,
    instructor: instructors.akhyar,
    modules: [
      mod('m1', 'The Rightly Guided Caliphs', 'الخلفاء الراشدون', [
        ['Abu Bakr', 'أبو بكر الصديق'],
        ['Umar', 'عمر بن الخطاب'],
        ['Uthman', 'عثمان بن عفان'],
        ['Ali', 'علي بن أبي طالب'],
      ]),
      mod('m2', 'Golden Age', 'العصر الذهبي', [
        ['Science', 'العلوم'],
        ['Art & Architecture', 'الفن والعمارة'],
        ['Trade & Travel', 'التجارة والرحلات'],
      ]),
      mod('m3', 'Islam Today', 'الإسلام اليوم', [
        ['Modern Muslim World', 'العالم الإسلامي المعاصر'],
        ['Lessons for Us', 'دروس لنا'],
      ]),
    ],
    reviews: reviews(3),
  },
  {
    slug: 'protecting-your-faith',
    title: 'Protecting Your Faith',
    titleAr: 'حماية إيمانك',
    category: 'advanced',
    level: 'intermediate',
    description: 'Faith is precious. Here is how you guard it from the things that erode it.',
    descriptionAr: 'الإيمان أمانة ثمينة. وهذه طريقتك في حفظه مما يُضعفه.',
    longDescription:
      'Major sins, types of shirk, doubts and how to handle them. Practical tools to keep your iman steady through life’s storms.',
    longDescriptionAr:
      'الكبائر، وأنواع الشرك، والشبهات وكيفية التعامل معها. أدوات عملية تُبقي إيمانك ثابتًا في وجه عواصف الحياة.',
    thumbnail: '/islamic/mosque-dome.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 9,
    lessonCount: 13,
    instructor: instructors.mohamed,
    modules: [
      mod('m1', 'Major Sins', 'الكبائر', [
        ['What They Are', 'ما هي الكبائر'],
        ['Why They Are Major', 'لماذا عُدّت كبائر'],
        ['How to Recover', 'كيف تعود بالتوبة'],
      ]),
      mod('m2', 'Shirk', 'الشرك', [
        ['Hidden Shirk', 'الشرك الخفي'],
        ['Apparent Shirk', 'الشرك الظاهر'],
        ['Keeping Tawheed Pure', 'صفاء التوحيد'],
      ]),
      mod('m3', 'Handling Doubts', 'التعامل مع الشبهات', [
        ['Where Doubts Come From', 'من أين تأتي الشبهات'],
        ['How to Respond', 'كيف تردّ عليها'],
        ['Building Conviction', 'ترسيخ اليقين'],
      ]),
    ],
    reviews: reviews(4),
  },
  {
    slug: 'dua-and-azkar',
    title: "Du'a & Remembrance (Azkar)",
    titleAr: 'الدعاء والأذكار',
    category: 'worship',
    level: 'beginner',
    description: 'The conversation with Allah that never has to stop.',
    descriptionAr: 'المناجاة مع الله التي لا تتوقف أبدًا.',
    longDescription:
      'Morning and evening adhkar, the du’as the Prophet ﷺ made for every situation, and the power of istighfar.',
    longDescriptionAr:
      'أذكار الصباح والمساء، والأدعية التي كان يدعو بها النبي ﷺ في كل موقف، وقوة الاستغفار.',
    thumbnail: '/islamic/quran-heart.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 5,
    lessonCount: 9,
    instructor: instructors.mansour,
    modules: [
      mod('m1', 'Daily Adhkar', 'الأذكار اليومية', [
        ['Morning', 'أذكار الصباح'],
        ['Evening', 'أذكار المساء'],
        ['After Prayer', 'أذكار بعد الصلاة'],
      ]),
      mod('m2', "Du'a for Life", 'أدعية لكل حال', [
        ['Du’a for Stress', 'دعاء الهمّ والكرب'],
        ['Du’a for Family', 'الدعاء للأهل'],
        ['Du’a for Forgiveness', 'دعاء المغفرة'],
      ]),
      mod('m3', 'Istighfar', 'الاستغفار', [
        ['The Power of Asking', 'قوة الاستغفار'],
        ['When and How', 'متى وكيف تستغفر'],
      ]),
    ],
    reviews: reviews(5),
  },
  {
    slug: 'ramadan-and-special-occasions',
    title: 'Ramadan & Special Occasions',
    titleAr: 'رمضان والمناسبات الخاصة',
    category: 'worship',
    level: 'beginner',
    description: 'Walk into your first Ramadan ready.',
    descriptionAr: 'ادخل رمضانك الأول وأنت على أتمّ استعداد.',
    longDescription:
      'How to fast, how to pray Taraweeh, how to look for Laylatul Qadr, and how to celebrate Eid — even if you are doing it for the first time, alone.',
    longDescriptionAr:
      'كيف تصوم، وكيف تصلّي التراويح، وكيف تتحرّى ليلة القدر، وكيف تحتفل بالعيد — حتى لو كنت تفعل ذلك لأول مرة وبمفردك.',
    thumbnail: '/islamic/quran-sand.jpg',
    introVideoUrl: INTRO_VIDEO,
    durationHours: 6,
    lessonCount: 10,
    instructor: instructors.jamil,
    modules: [
      mod('m1', 'Before Ramadan', 'قبل رمضان', [
        ['Preparation', 'الاستعداد'],
        ['Setting Intentions', 'عقد النية'],
      ]),
      mod('m2', 'During Ramadan', 'في رمضان', [
        ['Fasting Rules', 'أحكام الصيام'],
        ['Taraweeh', 'صلاة التراويح'],
        ['The Last Ten Nights', 'العشر الأواخر'],
      ]),
      mod('m3', 'After Ramadan', 'بعد رمضان', [
        ['Eid', 'العيد'],
        ['Keeping the Habits', 'المداومة على العبادات'],
      ]),
    ],
    reviews: reviews(4),
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const featuredCourses = () => courses.filter((c) => c.featured);
