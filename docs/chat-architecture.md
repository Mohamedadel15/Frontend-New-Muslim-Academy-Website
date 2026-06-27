# Real-time Chat — Architecture

The chat subsystem supports three conversation types:

1. **Student ↔ Student** — private 1:1 (`Conversation.type = 'direct'`)
2. **Student ↔ Teacher (Da'i)** — private 1:1 (`'direct'`, one participant has `role: 'teacher'`)
3. **Course group channel** — every student enrolled in a course (`'group'`, carries `courseSlug`)

The frontend is already complete and talks only to a transport-agnostic
`ChatAdapter` (`lib/chat/adapter.ts`). Today it runs on `MockChatAdapter`
(in-memory, auto-replies). Going live means implementing the backend below and
swapping in `SocketIoChatAdapter` — **no UI or store changes required.**

## Frontend seam (already built)

```
components/chat/ChatPanel.tsx     UI (list + thread + composer, RTL-aware)
stores/chatStore.ts               Zustand state; subscribes to adapter events
lib/chat/adapter.ts               ChatAdapter interface + Mock + Socket.io skeleton
types/chat.ts                     ChatUser, ChatMessage, Conversation
```

`ChatAdapter` contract:

| Method | Direction | Purpose |
|---|---|---|
| `connect(userId)` | → server | open socket, authenticate |
| `joinConversation(id)` / `leaveConversation(id)` | → server | room membership |
| `sendMessage({conversationId, senderId, senderName, body})` | → server | send |
| `setTyping(id, isTyping)` | → server | typing indicator |
| `markRead(id)` | → server | read receipts |
| `on('message' \| 'typing' \| 'presence' \| 'connection', cb)` | ← server | inbound events |

## Recommended backend (Node + Socket.io)

```
┌────────────┐   WSS    ┌───────────────────────────┐
│  Next.js   │ ───────▶ │  Socket.io gateway (Node)  │
│  client    │ ◀─────── │  - JWT auth handshake      │
└────────────┘          │  - rooms = conversationId  │
       │ REST (history)  │  - presence + typing       │
       ▼                 └────────────┬──────────────┘
┌────────────┐                        │ pub/sub
│  REST API  │                        ▼
│ /messages  │                ┌──────────────┐   ┌──────────────┐
│ /convos    │ ─────────────▶ │  PostgreSQL  │   │ Redis adapter│
└────────────┘                │ (persistence)│   │ (scale-out)  │
                              └──────────────┘   └──────────────┘
```

### Connection & auth

- Client connects with `io(url, { auth: { token } })` where `token` is the app's
  session JWT.
- Server middleware verifies the JWT, attaches `socket.data.userId`, then
  auto-joins the user's personal room `user:{userId}` and every conversation
  room they belong to (looked up from the DB).

### Rooms model

- One Socket.io **room per conversation** (`room = conversationId`).
- `direct` conversations have a deterministic id, e.g. `dm:{minId}:{maxId}`, so the
  same pair always resolves to one conversation.
- `group` conversations use `course:{courseSlug}`; enrollment service adds/removes
  members as students enroll/unenroll.

### Server events

| Event (client → server) | Payload | Server action |
|---|---|---|
| `chat:join` | `conversationId` | authorize membership, `socket.join(room)` |
| `chat:leave` | `conversationId` | `socket.leave(room)` |
| `chat:message` | `{conversationId, body}` | authorize, persist, broadcast `chat:message` to room |
| `chat:typing` | `{conversationId, isTyping}` | broadcast `chat:typing` to room (except sender) |
| `chat:read` | `conversationId` | update read cursor, broadcast `chat:read` |

| Event (server → client) | Payload |
|---|---|
| `chat:message` | full `ChatMessage` (server-generated `id`, `sentAt`, `status`) |
| `chat:typing` | `{conversationId, user, isTyping}` |
| `presence` | `{userId, online}` |

Authorization rule on every inbound event: the server confirms
`socket.data.userId` is a member of `conversationId` before persisting or
broadcasting. Never trust the client's `senderId`.

### Persistence (PostgreSQL)

```sql
users(id, name, role, avatar_url, last_seen_at)
conversations(id, type, title, course_slug, created_at)
conversation_members(conversation_id, user_id, last_read_message_id, joined_at)
messages(id, conversation_id, sender_id, body, sent_at, status)
```

Indexes: `messages(conversation_id, sent_at)` for history paging;
`conversation_members(user_id)` for the conversation list.

### REST endpoints (history / bootstrap, not realtime)

- `GET /api/conversations` → the user's conversations + last message + unread count
- `GET /api/conversations/:id/messages?before=<cursor>&limit=50` → paged history
- `POST /api/conversations/direct` `{ otherUserId }` → find-or-create a 1:1
- Group channels are created by the enrollment service, not the client.

The store loads history via REST on open, then receives live deltas over the
socket — the mock currently fakes both.

### Scaling

- Run N gateway instances behind a sticky-session load balancer.
- Add `@socket.io/redis-adapter` so room broadcasts fan out across instances.
- Presence: write `online` to Redis with a TTL heartbeat; emit `presence` on
  connect/disconnect.

## Going live — checklist

1. `npm i socket.io-client`
2. Implement the TODOs in `SocketIoChatAdapter` (`lib/chat/adapter.ts`) — the
   event names already match this document.
3. In `stores/chatStore.ts`, construct `SocketIoChatAdapter(url, token)` instead
   of `MockChatAdapter`, and load conversations/history from the REST endpoints.
4. Stand up the Node gateway + Postgres schema above.

Because every component depends only on the `ChatAdapter` interface and the
Zustand store, steps 2–4 are the only changes needed to go from demo to
production.
