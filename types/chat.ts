export type ChatRole = 'student' | 'teacher';

/** Direct = 1:1 (student↔student or student↔teacher). Group = course channel. */
export type ConversationType = 'direct' | 'group';

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface ChatUser {
  id: string;
  name: string;
  role: ChatRole;
  avatar?: string;
  online?: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  body: string;
  /** ISO timestamp. */
  sentAt: string;
  status?: MessageStatus;
}

export interface Conversation {
  id: string;
  type: ConversationType;
  title: string;
  /** Set for group channels tied to a specific course. */
  courseSlug?: string;
  participants: ChatUser[];
  avatar?: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
}
