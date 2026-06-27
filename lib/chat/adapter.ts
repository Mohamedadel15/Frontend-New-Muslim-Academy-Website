import type {
  ChatMessage,
  ChatUser,
  Conversation,
  ConnectionStatus,
} from '@/types/chat';

/**
 * Transport-agnostic chat layer.
 *
 * The UI and the Zustand store only ever talk to a `ChatAdapter`. Today that's
 * `MockChatAdapter` (in-memory, auto-replies). When the backend is ready, swap
 * in `SocketIoChatAdapter` — no component or store changes required.
 */

export interface ChatEventMap {
  message: ChatMessage;
  typing: { conversationId: string; user: ChatUser; isTyping: boolean };
  presence: { userId: string; online: boolean };
  connection: ConnectionStatus;
}
export type ChatEvent = keyof ChatEventMap;
type Handler<E extends ChatEvent> = (payload: ChatEventMap[E]) => void;

export interface SendInput {
  conversationId: string;
  senderId: string;
  senderName: string;
  body: string;
}

export interface ChatAdapter {
  connect(userId: string): void;
  disconnect(): void;
  joinConversation(conversationId: string): void;
  leaveConversation(conversationId: string): void;
  sendMessage(input: SendInput): void;
  setTyping(conversationId: string, isTyping: boolean): void;
  markRead(conversationId: string): void;
  /** Subscribe to a server event. Returns an unsubscribe function. */
  on<E extends ChatEvent>(event: E, handler: Handler<E>): () => void;
}

class Emitter {
  private handlers: Record<string, Set<(payload: unknown) => void>> = {};

  on<E extends ChatEvent>(event: E, handler: Handler<E>): () => void {
    (this.handlers[event] ||= new Set()).add(handler as (p: unknown) => void);
    return () => {
      this.handlers[event]?.delete(handler as (p: unknown) => void);
    };
  }

  protected emit<E extends ChatEvent>(event: E, payload: ChatEventMap[E]): void {
    this.handlers[event]?.forEach((h) => h(payload));
  }
}

const CANNED_REPLIES = [
  'Wa alaykum as-salam wa rahmatullah 🌙',
  'That’s a great question — let’s walk through it together.',
  'Baarak Allahu feek. I’ll share a short video that explains it.',
  'Take your time. We’ll cover this step by step in the next session.',
  'Ameen! May Allah make the path easy for you.',
];

/**
 * In-memory adapter for local development and demos. Echoes a contextual reply
 * from another participant so the UI feels alive without a server.
 */
export class MockChatAdapter extends Emitter implements ChatAdapter {
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor(
    private readonly conversations: Conversation[],
    private readonly currentUserId: string
  ) {
    super();
  }

  connect(): void {
    this.timers.push(setTimeout(() => this.emit('connection', 'connected'), 350));
  }

  disconnect(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.emit('connection', 'disconnected');
  }

  joinConversation(): void {}
  leaveConversation(): void {}
  setTyping(): void {}
  markRead(): void {}

  sendMessage(input: SendInput): void {
    const convo = this.conversations.find((c) => c.id === input.conversationId);
    const responder = convo && this.pickResponder(convo);
    if (!convo || !responder) return;

    this.timers.push(
      setTimeout(
        () => this.emit('typing', { conversationId: convo.id, user: responder, isTyping: true }),
        700
      )
    );
    this.timers.push(
      setTimeout(() => {
        this.emit('typing', { conversationId: convo.id, user: responder, isTyping: false });
        this.emit('message', {
          id: `m_${Date.now()}_${Math.floor(Math.random() * 1e4)}`,
          conversationId: convo.id,
          senderId: responder.id,
          senderName: responder.name,
          body: CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)],
          sentAt: new Date().toISOString(),
          status: 'delivered',
        });
      }, 1900)
    );
  }

  private pickResponder(convo: Conversation): ChatUser | undefined {
    const others = convo.participants.filter((p) => p.id !== this.currentUserId);
    if (convo.type === 'group') return others.find((p) => p.role === 'teacher') ?? others[0];
    return others[0];
  }
}

/**
 * Production adapter skeleton. Install `socket.io-client`, then fill in the
 * TODOs below — the event names map 1:1 onto the backend described in
 * docs/chat-architecture.md. The rest of the app stays untouched.
 */
export class SocketIoChatAdapter extends Emitter implements ChatAdapter {
  // private socket: import('socket.io-client').Socket | null = null;

  constructor(
    private readonly url: string,
    private readonly token: string
  ) {
    super();
  }

  connect(_userId: string): void {
    // this.socket = io(this.url, { auth: { token: this.token } });
    // this.socket.on('connect', () => this.emit('connection', 'connected'));
    // this.socket.on('disconnect', () => this.emit('connection', 'disconnected'));
    // this.socket.on('chat:message', (m: ChatMessage) => this.emit('message', m));
    // this.socket.on('chat:typing', (t) => this.emit('typing', t));
    // this.socket.on('presence', (p) => this.emit('presence', p));
    void this.url;
    void this.token;
    throw new Error('SocketIoChatAdapter is a skeleton — see docs/chat-architecture.md');
  }

  disconnect(): void {
    // this.socket?.disconnect();
  }

  joinConversation(_conversationId: string): void {
    // this.socket?.emit('chat:join', _conversationId);
  }

  leaveConversation(_conversationId: string): void {
    // this.socket?.emit('chat:leave', _conversationId);
  }

  sendMessage(_input: SendInput): void {
    // this.socket?.emit('chat:message', _input);
  }

  setTyping(_conversationId: string, _isTyping: boolean): void {
    // this.socket?.emit('chat:typing', { conversationId: _conversationId, isTyping: _isTyping });
  }

  markRead(_conversationId: string): void {
    // this.socket?.emit('chat:read', _conversationId);
  }
}
