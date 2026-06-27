import type { ChatMessage, ChatUser, Conversation } from '@/types/chat';

// The signed-in learner (in production this comes from auth/session).
export const currentChatUser: ChatUser = { id: 'me', name: 'You', role: 'student' };

const jamil: ChatUser = {
  id: 'jamil-al-rahman',
  name: 'Jamil Al-Rahman',
  role: 'teacher',
  avatar: '/translators/jamil-al-rahman.jpg',
  online: true,
};
const adam: ChatUser = { id: 'student-adam', name: 'Adam', role: 'student', online: true };
const bilal: ChatUser = { id: 'student-bilal', name: 'Bilal', role: 'student', online: false };
const omar: ChatUser = { id: 'student-omar', name: 'Omar', role: 'student', online: true };

const ago = (mins: number) => new Date(Date.now() - mins * 60_000).toISOString();

export const seedMessages: Record<string, ChatMessage[]> = {
  'd-teacher-jamil': [
    {
      id: 'jm1',
      conversationId: 'd-teacher-jamil',
      senderId: 'me',
      senderName: 'You',
      body: 'As-salamu alaykum ustadh. I just enrolled in the Wudu unit — where should I start?',
      sentAt: ago(180),
      status: 'read',
    },
    {
      id: 'jm2',
      conversationId: 'd-teacher-jamil',
      senderId: jamil.id,
      senderName: jamil.name,
      body: 'Wa alaykum as-salam! Start with the intro video, then the first lesson. I’ll check on you tomorrow in shaa Allah.',
      sentAt: ago(176),
      status: 'read',
    },
  ],
  'd-student-adam': [
    {
      id: 'da1',
      conversationId: 'd-student-adam',
      senderId: adam.id,
      senderName: adam.name,
      body: 'Brother, are you joining the live Quran session tonight?',
      sentAt: ago(95),
      status: 'read',
    },
    {
      id: 'da2',
      conversationId: 'd-student-adam',
      senderId: 'me',
      senderName: 'You',
      body: 'In shaa Allah! Saving my questions for it.',
      sentAt: ago(92),
      status: 'read',
    },
  ],
  'g-salah-class': [
    {
      id: 'gs1',
      conversationId: 'g-salah-class',
      senderId: omar.id,
      senderName: omar.name,
      body: 'Jazakum Allahu khayran for today’s lesson on the postures.',
      sentAt: ago(50),
      status: 'read',
    },
    {
      id: 'gs2',
      conversationId: 'g-salah-class',
      senderId: jamil.id,
      senderName: jamil.name,
      body: 'Wa iyyakum. Homework: practise the takbir and ruku before the next session.',
      sentAt: ago(48),
      status: 'read',
    },
    {
      id: 'gs3',
      conversationId: 'g-salah-class',
      senderId: bilal.id,
      senderName: bilal.name,
      body: 'Can someone share the link to the recording?',
      sentAt: ago(20),
      status: 'delivered',
    },
  ],
};

export const seedConversations: Conversation[] = [
  {
    id: 'd-teacher-jamil',
    type: 'direct',
    title: jamil.name,
    participants: [currentChatUser, jamil],
    avatar: jamil.avatar,
    lastMessage: seedMessages['d-teacher-jamil'].at(-1),
    unreadCount: 0,
  },
  {
    id: 'd-student-adam',
    type: 'direct',
    title: adam.name,
    participants: [currentChatUser, adam],
    lastMessage: seedMessages['d-student-adam'].at(-1),
    unreadCount: 0,
  },
  {
    id: 'g-salah-class',
    type: 'group',
    title: 'Salah — The Prayer',
    courseSlug: 'salah-the-prayer',
    participants: [currentChatUser, jamil, adam, bilal, omar],
    lastMessage: seedMessages['g-salah-class'].at(-1),
    unreadCount: 1,
  },
];
