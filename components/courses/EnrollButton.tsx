'use client';

import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { useProgressStore } from '@/stores/progressStore';

export function EnrollButton({ slug }: { slug: string }) {
  const t = useTranslations('courses.detail');
  const { enrollInCourse, isEnrolled } = useProgressStore();
  const enrolled = isEnrolled(slug);

  return (
    <MagneticButton>
      <Button
        size="xl"
        className="shadow-gold-glow"
        onClick={() => enrollInCourse(slug)}
        disabled={enrolled}
      >
        {enrolled ? (
          <>
            <Check className="size-5" /> {t('enrolled')}
          </>
        ) : (
          t('enroll')
        )}
      </Button>
    </MagneticButton>
  );
}
