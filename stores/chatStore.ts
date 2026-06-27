import { create } from 'zustand';
import type { ChatMessage, ChatUser, Conversation, ConnectionStatus } from '@/types/chat';
import { type ChatAdapter, MockChatAdapter } from '@/lib/chat/adapter';
import { currentChatUser, seedConversations, seedMessages } from '@/lib/mock-data/chat';

interface ChatState {
  ready: boolean;
  currentUser: ChatUser;
  status: ConnectionStatus;
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  activeId: string | null;
  /** Names currently typing, keyed by conversation id. */
  typing: Record<string, string[]>;
  initialize: () => void;
  setActive: (id: string) => void;
  send: (body: string) => void;
}

// Kept outside the store so it survives re-renders but isn't part of state.
let adapter: ChatAdapter | null = null;

export const useChatStore = create<ChatState>((set, get) => ({
  ready: false,
  currentUser: currentChatUser,
  status: 'connecting',
  conversations: [],
  messages: {},
  activeId: null,
  typing: {},

  initialize: () => {
    if (get().ready) return;

    const conversations = seedConversations.map((c) => ({ ...c }));
    adapter = new MockChatAdapter(conversations, currentChatUser.id);

    adapter.on('connection', (status) => set({ status }));

    adapter.on('message', (msg) =>
      set((s) => {
        const existing = s.messages[msg.conversationId] ?? [];
        const isActive = s.activeId === msg.conversationId;
        return {
          messages: { ...s.messages, [msg.conversationId]: [...existing, msg] },
          conversations: s.conversations.map((c) =>
            c.id === msg.conversationId
              ? { ...c, lastMessage: msg, unreadCount: isActive ? 0 : c.unreadCount + 1 }
              : c
          ),
        };
      })
    );

    adapter.on('typing', ({ conversationId, user, isTyping }) =>
      set((s) => {
        const names = new Set(s.typing[conversationId] ?? []);
        if (isTyping) names.add(user.name);
        else names.delete(user.name);
        return { typing: { ...s.typing, [conversationId]: [...names] } };
      })
    );

    adapter.connect(currentChatUser.id);

    set({
      ready: true,
      conversations,
      messages: structuredClone(seedMessages),
      activeId: conversations[0]?.id ?? null,
    });
  },

  setActive: (id) => {
    adapter?.markRead(id);
    set((s) => ({
      activeId: id,
      conversations: s.conversations.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)),
    }));
  },

  send: (body) => {
    const { activeId, currentUser } = get();
    const text = body.trim();
    if (!activeId || !text) return;

    const message: ChatMessage = {
      id: `m_${Date.now()}`,
      conversationId: activeId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      body: text,
      sentAt: new Date().toISOString(),
      status: 'sent',
    };

    set((s) => ({
      messages: { ...s.messages, [activeId]: [...(s.messages[activeId] ?? []), message] },
      conversations: s.conversations.map((c) =>
        c.id === activeId ? { ...c, lastMessage: message } : c
      ),
    }));

    adapter?.sendMessage({
      conversationId: activeId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      body: text,
    });
  },
}));
