'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { usePathname } from '@/lib/navigation';

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();

  // Key on locale AND pathname. next-intl's usePathname() is locale-stripped,
  // so switching language kept the same key — AnimatePresence never re-ran the
  // enter animation and the scroll-reveal children (whileInView) stayed stuck
  // at opacity:0. Including the locale forces a clean remount + fade-in.
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${locale}:${pathname}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
