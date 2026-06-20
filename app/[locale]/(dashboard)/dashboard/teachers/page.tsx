import { setRequestLocale } from 'next-intl/server';
import { Compass } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { SubjectGallery } from '@/components/teachers/SubjectGallery';
import { TeacherCard } from '@/components/teachers/TeacherCard';
import { teachers } from '@/lib/mock-data/teachers';

export default async function FindTeacherPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const featured = [...teachers].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div className="p-6 lg:p-10 space-y-12">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          <Compass className="size-3.5" /> Find a teacher
        </div>
        <h1 className="mt-3 font-display text-3xl md:text-4xl">
          Pick the subject you want to learn today.
        </h1>
        <p className="mt-2 text-muted-foreground">
          Then we’ll show you the teachers ready to take your next session.
        </p>
      </header>

      <section>
        <SubjectGallery />
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-xl">Top-rated this month</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/teachers">View all</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => (
            <TeacherCard key={t.slug} teacher={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
