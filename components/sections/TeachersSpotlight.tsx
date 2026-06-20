'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Compass, Video } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { Button } from '@/components/ui/button';
import { subjects } from '@/lib/mock-data/subjects';
import { teachers } from '@/lib/mock-data/teachers';
import { TeacherCard } from '@/components/teachers/TeacherCard';

export function TeachersSpotlight() {
  const featured = [...teachers].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <section className="relative section-pad">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-full bg-arabesque-pattern opacity-20"
      />
      <div className="container-pad">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
            <Video className="size-3.5" /> 1-on-1 with verified teachers — free
          </div>
          <h2 className="mt-5 font-display text-display-lg text-balance">
            Pick a subject. <span className="gold-text">Book a session.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Eight subjects, dozens of qualified teachers, private Zoom sessions confirmed within 24
            hours.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {subjects.map((s) => (
            <Link
              key={s.slug}
              href={`/teachers?subject=${s.slug}` as never}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-4 py-2 text-xs font-medium transition-all hover:border-accent/60 hover:text-accent"
            >
              <span
                className="size-1.5 rounded-full"
                style={{ background: s.color }}
              />
              {s.name}
            </Link>
          ))}
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => (
            <TeacherCard key={t.slug} teacher={t} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/teachers">
              <Compass className="size-4" /> Browse all teachers
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </Button>
          <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <BadgeCheck className="size-3.5 text-accent" />
            Every teacher is vetted by the Academy.
          </p>
        </div>
      </div>
    </section>
  );
}
