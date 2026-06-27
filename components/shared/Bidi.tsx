import { cn } from '@/lib/utils';

type BidiProps = {
  children: React.ReactNode;
  /**
   * Force the embedded run's direction. Use 'ltr' for emails, phone numbers,
   * URLs, and latin brand names so they render correctly inside Arabic prose.
   */
  dir?: 'ltr' | 'rtl' | 'auto';
  className?: string;
};

/**
 * Isolates a run of opposite-direction text from its surrounding bidi context.
 * Renders a <bdi> element (which defaults to `unicode-bidi: isolate`) so a
 * latin/number run embedded in Arabic (or vice-versa) cannot reorder the
 * sentence around it.
 */
export function Bidi({ children, dir = 'auto', className }: BidiProps) {
  return (
    <bdi dir={dir} className={cn('bidi-isolate', className)}>
      {children}
    </bdi>
  );
}
