'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  stagger?: number;
  delay?: number;
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  delay = 0,
  ...props
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  y = 24,
  ...props
}: HTMLMotionProps<'div'> & { children: ReactNode; y?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
