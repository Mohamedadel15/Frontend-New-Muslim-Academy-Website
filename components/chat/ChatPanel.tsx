'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  ArrowLeft,
  GraduationCap,
  MessageCircle,
  Search,
  Send,
  Users,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useChatStore } from '@/stores/chatStore';
import type { Conversation } from '@/types/chat';

const time = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

export function ChatPanel() {
  const t = useTranslations('chat');
  const {
    ready,
    status,
    currentUser,
    conversations,
    messages,
    activeId,
    typing,
    initialize,
    setActive,
    send,
  } = useChatStore();

  const [query, setQuery] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'thread'>('list');
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const active = conversations.find((c) => c.id === activeId) ?? null;
  const thread = activeId ? messages[activeId] ?? [] : [];
  const typingNames = (activeId && typing[activeId]) || [];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [thread.length, typingNames.length, activeId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c) => c.title.toLowerCase().includes(q));
  }, [conversations, query]);

  const openConversation = (id: string) => {
    setActive(id);
    setMobileView('thread');
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    send(draft);
    setDraft('');
  };

  return (
    <div className="flex h-[100dvh] flex-col p-4 lg:p-6">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl">{t('title')}</h1>
          <p className="text-xs text-muted-foreground">
            {status === 'connected' ? t('connected') : t('connecting')}
          </p>
        </div>
        <span
          className={cn(
            'size-2.5 rounded-full',
            status === 'connected' ? 'bg-success' : 'animate-pulse bg-warning'
          )}
          aria-hidden
        />
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden rounded-3xl border border-border/60 bg-card md:grid-cols-[20rem_1fr]">
        {/* Conversation list */}
        <aside
          className={cn(
            'flex min-h-0 flex-col border-border/60 md:border-e',
            mobileView === 'thread' && 'hidden md:flex'
          )}
        >
          <div className="border-b border-border/60 p-3">
            <div className="relative">
              <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="ps-9"
              />
            </div>
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto p-2">
            {filtered.map((c) => (
              <li key={c.id}>
                <ConversationRow
                  conversation={c}
                  active={c.id === activeId}
                  groupLabel={t('groupLabel')}
                  teacherLabel={t('teacherLabel')}
                  onClick={() => openConversation(c.id)}
                />
              </li>
            ))}
          </ul>
        </aside>

        {/* Thread */}
        <section
          className={cn(
            'flex min-h-0 flex-col',
            mobileView === 'list' && 'hidden md:flex'
          )}
        >
          {!active ? (
            <div className="grid flex-1 place-items-center p-8 text-center text-muted-foreground">
              <div>
                <MessageCircle className="mx-auto mb-3 size-10 text-accent/60" />
                <p>{ready ? t('empty') : t('connecting')}</p>
              </div>
            </div>
          ) : (
            <>
              <header className="flex items-center gap-3 border-b border-border/60 p-3">
                <button
                  type="button"
                  onClick={() => setMobileView('list')}
                  className="grid size-9 place-items-center rounded-full hover:bg-secondary md:hidden"
                  aria-label="Back"
                >
                  <ArrowLeft className="size-4 rtl:rotate-180" />
                </button>
                <ConversationAvatar conversation={active} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{active.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {typingNames.length > 0
                      ? `${typingNames.join(', ')} ${t('typing')}`
                      : active.type === 'group'
                        ? t('participants', { count: active.participants.length })
                        : active.participants.find((p) => p.id !== currentUser.id)?.online
                          ? t('online')
                          : t('offline')}
                  </p>
                </div>
              </header>

              <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
                {thread.length === 0 && (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    {t('emptyMessages')}
                  </p>
                )}
                {thread.map((m) => {
                  const mine = m.senderId === currentUser.id;
                  return (
                    <div
                      key={m.id}
                      className={cn('flex flex-col', mine ? 'items-end' : 'items-start')}
                    >
                      {active.type === 'group' && !mine && (
                        <span className="mb-0.5 px-1 text-[11px] font-medium text-accent">
                          {m.senderName}
                        </span>
                      )}
                      <div
                        className={cn(
                          'max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
                          mine
                            ? 'rounded-ee-sm bg-accent text-primary-foreground'
                            : 'rounded-es-sm bg-secondary text-foreground'
                        )}
                      >
                        {m.body}
                      </div>
                      <span className="mt-1 px-1 text-[10px] text-muted-foreground">
                        {time(m.sentAt)}
                      </span>
                    </div>
                  );
                })}
                {typingNames.length > 0 && (
                  <div className="flex items-center gap-1 px-1 text-muted-foreground">
                    <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-current" />
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <form onSubmit={submit} className="flex items-center gap-2 border-t border-border/60 p-3">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={t('composerPlaceholder')}
                  aria-label={t('composerPlaceholder')}
                />
                <Button type="submit" size="icon" disabled={!draft.trim()} aria-label={t('send')}>
                  <Send className="size-4 rtl:rotate-180" />
                </Button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function ConversationAvatar({ conversation }: { conversation: Conversation }) {
  if (conversation.type === 'group') {
    return (
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
        <Users className="size-5" />
      </span>
    );
  }
  if (conversation.avatar) {
    return (
      <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-accent/30">
        <Image src={conversation.avatar} alt={conversation.title} fill className="object-cover" />
      </span>
    );
  }
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary font-display text-accent">
      {conversation.title.charAt(0)}
    </span>
  );
}

function ConversationRow({
  conversation,
  active,
  groupLabel,
  teacherLabel,
  onClick,
}: {
  conversation: Conversation;
  active: boolean;
  groupLabel: string;
  teacherLabel: string;
  onClick: () => void;
}) {
  const isTeacherDM =
    conversation.type === 'direct' &&
    conversation.participants.some((p) => p.role === 'teacher');

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl p-2.5 text-start transition-colors',
        active ? 'bg-accent/15' : 'hover:bg-secondary'
      )}
    >
      <ConversationAvatar conversation={conversation} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-medium">{conversation.title}</p>
          {conversation.type === 'group' && (
            <span className="shrink-0 rounded-full bg-accent/10 px-1.5 text-[10px] text-accent">
              {groupLabel}
            </span>
          )}
          {isTeacherDM && (
            <GraduationCap className="size-3 shrink-0 text-accent" aria-label={teacherLabel} />
          )}
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {conversation.lastMessage?.body ?? ''}
        </p>
      </div>
      {conversation.unreadCount > 0 && (
        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[10px] font-medium text-primary-foreground">
          {conversation.unreadCount}
        </span>
      )}
    </button>
  );
}
