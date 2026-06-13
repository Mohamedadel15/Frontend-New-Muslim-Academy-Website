import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import { PlayCircle, Clock, BookOpen, Star, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { PageHero } from '@/components/shared/PageHero';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseCard } from '@/components/courses/CourseCard';
import { EnrollButton } from '@/components/courses/EnrollButton';
import { FadeIn } from '@/components/animations/FadeIn';
import { courses, getCourse } from '@/lib/mock-data/courses';

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
      images: [course.thumbnail],
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const course = getCourse(slug);
  if (!course) notFound();

  const t = await getTranslations('courses.detail');
  const tHero = await getTranslations('courses.hero');
  const tCard = await getTranslations('courses.card');

  const related = courses
    .filter((c) => c.slug !== course.slug && c.category === course.category)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={tHero('breadcrumb')}
        title={course.title}
        subtitle={course.description}
        breadcrumb={[
          { href: '/courses', label: tHero('breadcrumb') },
          { href: `/courses/${course.slug}`, label: course.title },
        ]}
      />

      <section className="container-pad pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="space-y-12">
            <FadeIn>
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-border/60 shadow-elevated">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-primary-900/40">
                  <button
                    aria-label="Play preview"
                    className="grid size-20 place-items-center rounded-full bg-accent text-primary-foreground shadow-gold-glow transition-transform hover:scale-110"
                  >
                    <PlayCircle className="size-10" />
                  </button>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h2 className="font-display text-3xl mb-4">{t('overview')}</h2>
              <p className="text-muted-foreground leading-relaxed">{course.longDescription}</p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-display text-3xl mb-6">{t('curriculum')}</h2>
              <Card>
                <CardContent className="p-2">
                  <Accordion type="single" collapsible defaultValue={course.modules[0]?.id}>
                    {course.modules.map((module, i) => (
                      <AccordionItem key={module.id} value={module.id}>
                        <AccordionTrigger className="px-4">
                          <div className="flex items-center gap-4">
                            <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-xs font-medium text-accent">
                              {i + 1}
                            </span>
                            <span>{module.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4">
                          <ul className="space-y-3">
                            {module.lessons.map((lesson) => (
                              <li
                                key={lesson.id}
                                className="flex items-center justify-between rounded-xl bg-secondary/40 p-3 text-sm"
                              >
                                <span className="flex items-center gap-3">
                                  <PlayCircle className="size-4 text-accent" />
                                  {lesson.title}
                                </span>
                                <span className="text-muted-foreground text-xs">
                                  {lesson.duration} min
                                </span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h2 className="font-display text-3xl mb-6">{t('instructor')}</h2>
              <Card>
                <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
                  <Avatar className="size-24">
                    <AvatarImage src={course.instructor.image} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-display text-xl">{course.instructor.name}</h3>
                    <p className="text-sm text-accent">{course.instructor.title}</p>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {course.instructor.bio}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {course.instructor.specializations.map((s) => (
                        <Badge key={s} variant="outline">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.25}>
              <h2 className="font-display text-3xl mb-6">{t('reviews')}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {course.reviews.slice(0, 4).map((r) => (
                  <Card key={r.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-0.5 text-accent">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="size-4 fill-current" />
                        ))}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed">{r.text}</p>
                      <p className="mt-4 text-xs text-muted-foreground">— {r.author}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>

          <aside className="lg:sticky lg:top-28 self-start">
            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="success">{tCard('free')}</Badge>
                  <Badge variant="outline">
                    {tCard(`level${course.level.charAt(0).toUpperCase()}${course.level.slice(1)}` as any)}
                  </Badge>
                </div>
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-4 text-accent" />
                    {tCard('duration', { hours: course.durationHours })}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BookOpen className="size-4 text-accent" />
                    {tCard('lessons', { count: course.lessonCount })}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <PlayCircle className="size-4 text-accent" />
                    {course.modules.length} {t('modules')}
                  </div>
                </div>
                <EnrollButton slug={course.slug} />
                <p className="text-center text-xs text-muted-foreground">
                  No credit card. Forever free.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>

        {related.length > 0 && (
          <FadeIn className="mt-24" delay={0.1}>
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-3xl">{t('related')}</h2>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
              >
                All courses
                <ArrowRight className="size-4 rtl:rotate-180" />
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </FadeIn>
        )}
      </section>
    </>
  );
}
