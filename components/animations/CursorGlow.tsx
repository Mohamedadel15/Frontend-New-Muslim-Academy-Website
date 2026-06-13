'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/useMediaQuery';

export function CursorGlow() {
  const isMobile = useIsMobile();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 80, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 80, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (isMobile) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile, x, y]);

  if (isMobile) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{
        background: `radial-gradient(400px circle at ${springX.get()}px ${springY.get()}px, rgba(212, 160, 23, 0.06), transparent 60%)`,
      }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: springX, top: springY }}
      >
        <div className="h-[400px] w-[400px] rounded-full bg-accent/[0.04] blur-3xl" />
      </motion.div>
    </motion.div>
  );
}
