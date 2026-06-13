'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
}

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.6 });
  const innerX = useTransform(springX, (v) => v * 0.5);
  const innerY = useTransform(springY, (v) => v * 0.5);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={cn('inline-block cursor-pointer will-change-transform', className)}
    >
      <motion.div style={{ x: innerX, y: innerY }}>{children}</motion.div>
    </motion.div>
  );
}
