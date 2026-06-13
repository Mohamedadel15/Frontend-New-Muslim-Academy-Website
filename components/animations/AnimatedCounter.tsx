'use client';

import { animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';

interface AnimatedCounterProps {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  to,
  duration = 2,
  suffix = '',
  className,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
