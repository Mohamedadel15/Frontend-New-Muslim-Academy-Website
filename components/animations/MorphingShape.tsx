'use client';

import { motion } from 'framer-motion';

export function GeometricStar({
  className,
  size = 360,
  spin = true,
}: {
  className?: string;
  size?: number;
  spin?: boolean;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 80, repeat: Infinity, ease: 'linear' } : undefined}
      aria-hidden
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f9d252" />
          <stop offset="100%" stopColor="#a87d12" />
        </linearGradient>
      </defs>
      <g stroke="url(#goldGrad)" strokeWidth="0.7" fill="none">
        <polygon
          points="100,15 119,75 185,75 130,110 152,170 100,135 48,170 70,110 15,75 81,75"
          opacity="0.7"
        />
        <polygon
          points="100,40 117,80 160,80 125,108 140,150 100,125 60,150 75,108 40,80 83,80"
          opacity="0.5"
        />
        <circle cx="100" cy="100" r="92" opacity="0.3" />
        <circle cx="100" cy="100" r="68" opacity="0.4" />
        <circle cx="100" cy="100" r="45" opacity="0.5" />
        <rect
          x="62"
          y="62"
          width="76"
          height="76"
          transform="rotate(45 100 100)"
          opacity="0.4"
        />
        <rect x="55" y="55" width="90" height="90" opacity="0.3" />
      </g>
    </motion.svg>
  );
}

export function ArabesqueDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      className={className}
      aria-hidden
      preserveAspectRatio="none"
    >
      <motion.path
        d="M0,6 L80,6 M120,6 L200,6"
        stroke="#d4a017"
        strokeWidth="0.5"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ transformOrigin: '100px 6px' }}
      >
        <rect x="94" y="0" width="12" height="12" fill="#d4a017" transform="rotate(45 100 6)" />
        <rect x="98" y="2" width="4" height="8" fill="#1a1a2e" transform="rotate(45 100 6)" />
      </motion.g>
    </svg>
  );
}
