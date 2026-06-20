'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, PlayCircle, Plus, Save, Sparkles, Upload, Eye, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import type { ContentType, SubjectSlug, TeacherContent } from '@/types/teacher';
import { getSubject } from '@/lib/mock-data/subjects';
import { contentByTeacher, getTeacher } from '@/lib/mock-data/teachers';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';

export function TeacherContentManager() {
  const teacherSlug = useAuthStore((s) => s.user?.teacherSlug ?? 'sh-yusuf-bilal');
  const teacher = getTeacher(teacherSlug);

  const [localItems, setLocalItems] = useState<TeacherContent[]>(() => contentByTeacher(teacherSlug));
  const [type, setType] = useState<ContentType>('video');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [subjectSlug, setSubjectSlug] = useState<SubjectSlug>(
    (teacher?.subjects[0] as SubjectSlug) ?? 'quran'
  );
  const [submitting, setSubmitting] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<SubjectSlug, TeacherContent[]>();
    for (const c of localItems) {
      const arr = map.get(c.subjectSlug) ?? [];
      arr.push(c);
      map.set(c.subjectSlug, arr);
    }
    return map;
  }, [localItems]);

  if (!teacher) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 350));
    const next: TeacherContent = {
      id: `c_${Date.now()}`,
      teacherSlug,
      subjectSlug,
      title,
      excerpt,
      type,
      videoUrl: type === 'video' ? videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ' : undefined,
      body: type === 'text' ? body : undefined,
      durationMin: type === 'video' ? 12 : 5,
      views: 0,
      publishedAt: new Date().toISOString(),
    };
    setLocalItems((s) => [next, ...s]);
    setTitle('');
    setExcerpt('');
    setBody('');
    setVideoUrl('');
    setSubmitting(false);
  };

  return (
    <div className="p-6 lg:p-10 space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <Upload className="size-3.5" /> Content studio
          </div>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">My content</h1>
          <p className="mt-2 text-muted-foreground">
            Publish a text or video lesson — pick the subject it belongs to.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <Card className="overflow-hidden">
          <div
            aria-hidden
            className="h-1.5 w-full"
            style={{
              background: `linear-gradient(90deg, ${getSubject(subjectSlug)?.color ?? '#d4a017'}, transparent)`,
            }}
          />
          <CardContent className="p-6 space-y-5">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Type</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <TypePick active={type === 'video'} onClick={() => setType('video')} label="Video" icon={<PlayCircle className="size-4" />} />
                <TypePick active={type === 'text'} onClick={() => setType('text')} label="Text" icon={<FileText className="size-4" />} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground" htmlFor="t-title">
                  Title
                </label>
                <Input
                  id="t-title"
                  required
                  className="mt-2"
                  placeholder="e.g. How to start reading the Qur’an"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground" htmlFor="t-excerpt">
                  Short excerpt
                </label>
                <Textarea
                  id="t-excerpt"
                  required
                  className="mt-2 min-h-20"
                  placeholder="One or two lines that hint at what the learner will get."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Subject</label>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {teacher.subjects.map((s) => {
                    const m = getSubject(s);
                    const active = subjectSlug === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSubjectSlug(s)}
                        className={cn(
                          'rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                          active
                            ? 'border-accent bg-accent/15 text-accent'
                            : 'border-border/60 text-muted-foreground hover:border-accent/40'
                        )}
                      >
                        {m?.name ?? s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {type === 'video' ? (
                <div>
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="t-video">
                    Video embed URL (YouTube / Vimeo)
                  </label>
                  <Input
                    id="t-video"
                    type="url"
                    className="mt-2"
                    placeholder="https://www.youtube.com/embed/…"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    Leave blank to use a placeholder while drafting.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-medium text-muted-foreground" htmlFor="t-body">
                    Lesson body
                  </label>
                  <Textarea
                    id="t-body"
                    required
                    className="mt-2 min-h-40 font-mono text-xs"
                    placeholder="Write your lesson in plain text or markdown."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Publishing…' : <><Save className="size-4" /> Publish lesson</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles className="size-4" />
                <p className="text-xs font-medium uppercase tracking-wide">Tip</p>
              </div>
              <p className="mt-2 text-sm">
                Learners decide to book after watching ~2 lessons. Mix short videos (5–10 min) with
                short written notes — they convert best.
              </p>
            </CardContent>
          </Card>

          {[...grouped.entries()].map(([slug, items]) => {
            const m = getSubject(slug);
            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <Badge
                    className="border-0"
                    style={{ background: `${m?.color}1a`, color: m?.color }}
                  >
                    {m?.name ?? slug}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{items.length} lessons</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((c) => (
                    <Card key={c.id}>
                      <CardContent className="p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          {c.type === 'video' ? (
                            <PlayCircle className="size-4 text-accent" />
                          ) : (
                            <FileText className="size-4 text-accent" />
                          )}
                          <p className="font-medium leading-tight">{c.title}</p>
                        </div>
                        <p className="line-clamp-2 text-xs text-muted-foreground">{c.excerpt}</p>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" /> {c.durationMin}m
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="size-3" /> {c.views.toLocaleString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {grouped.size === 0 && (
            <Card>
              <CardContent className="p-10 text-center">
                <Plus className="mx-auto size-8 text-accent" />
                <p className="mt-3 font-display text-lg">No lessons yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Publish your first lesson on the left to see it here.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function TypePick({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-2 rounded-2xl border p-3 text-sm font-medium transition-all',
        active
          ? 'border-accent bg-accent/15 text-accent shadow-gold-glow'
          : 'border-border/60 text-muted-foreground hover:border-accent/40 hover:text-foreground'
      )}
    >
      {icon}
      {label}
    </button>
  );
}
