'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  label?: string;
  caption?: string;
  variant?: 'full' | 'overlay' | 'panel';
  autoFinish?: number;
  onFinish?: () => void;
}

const sentences = [
  'Polishing the lectern',
  'Setting up the majlis',
  'Calling the teachers',
  'Aligning the qiblah',
];

export function LoadingScreen({
  label = 'New Muslim Academy',
  caption,
  variant = 'full',
  autoFinish,
  onFinish,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phrase, setPhrase] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    let stopped = false;
    const start = performance.now();
    const duration = autoFinish ?? 2400;
    const step = (t: number) => {
      if (stopped) return;
      const ratio = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));
      if (ratio < 1) {
        raf = requestAnimationFrame(step);
      } else if (autoFinish) {
        setDone(true);
        onFinish?.();
      }
    };
    raf = requestAnimationFrame(step);
    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
    };
  }, [autoFinish, onFinish]);

  useEffect(() => {
    const id = setInterval(() => setPhrase((p) => (p + 1) % sentences.length), 1400);
    return () => clearInterval(id);
  }, []);

  const containerCn = cn(
    'relative overflow-hidden isolate',
    variant === 'full' && 'fixed inset-0 z-[100] grid place-items-center',
    variant === 'overlay' && 'absolute inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-xl',
    variant === 'panel' && 'relative grid min-h-[420px] place-items-center rounded-3xl border border-border/60'
  );

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className={containerCn}
        >
          {variant !== 'overlay' && (
            <>
              <div
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(212,160,23,0.18), transparent 60%), linear-gradient(180deg, #050509 0%, #10101c 40%, #1a1a2e 100%)',
                }}
              />
              <div className="absolute inset-0 -z-10 bg-arabesque-pattern opacity-30" />
              <FloatingStars />
            </>
          )}

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <IslamicGeometry progress={progress} />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 font-arabic text-3xl text-accent-300/90"
              dir="rtl"
            >
              بسم الله
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-3 font-display text-3xl text-white sm:text-4xl md:text-5xl"
            >
              <span className="bg-gradient-to-r from-amber-200 via-accent-400 to-amber-200 bg-clip-text text-transparent">
                {label}
              </span>
            </motion.h1>

            {caption && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-3 max-w-sm text-sm text-white/60"
              >
                {caption}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="mt-10 w-72 max-w-full"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
                <span>Loading</span>
                <span className="tabular-nums">{progress}%</span>
              </div>
              <div className="relative mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-300 via-accent-500 to-accent-300"
                  style={{ width: `${progress}%` }}
                />
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-white/40 mix-blend-overlay"
                  style={{ width: `${Math.max(progress - 8, 0)}%` }}
                />
              </div>

              <div className="relative mt-5 h-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={phrase}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-xs text-white/60"
                  >
                    {sentences[phrase]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function IslamicGeometry({ progress }: { progress: number }) {
  const ringDash = 565.48;
  return (
    <div className="relative grid size-44 place-items-center sm:size-56">
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,160,23,0.25), transparent 60%)',
          filter: 'blur(24px)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.svg
        viewBox="0 0 220 220"
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <linearGradient id="g-outer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f9d252" />
            <stop offset="50%" stopColor="#d4a017" />
            <stop offset="100%" stopColor="#7c5c0d" />
          </linearGradient>
        </defs>
        <circle
          cx="110"
          cy="110"
          r="90"
          stroke="url(#g-outer)"
          strokeWidth="1.4"
          strokeDasharray="4 6"
          fill="none"
          opacity="0.6"
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 220 220"
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <Star8 cx={110} cy={110} r={70} stroke="#d4a017" opacity={0.85} />
        <Star8 cx={110} cy={110} r={70} stroke="#f9d252" opacity={0.35} rotate={22.5} />
      </motion.svg>

      <svg viewBox="0 0 220 220" className="absolute inset-0 -rotate-90">
        <circle cx="110" cy="110" r="90" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
        <circle
          cx="110"
          cy="110"
          r="90"
          stroke="url(#g-outer)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={ringDash}
          strokeDashoffset={ringDash - (ringDash * progress) / 100}
          style={{ transition: 'stroke-dashoffset 0.2s linear' }}
        />
      </svg>

      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative grid size-20 place-items-center rounded-full border border-accent/40 bg-black/40 backdrop-blur-sm"
      >
        <div
          className="grid size-12 place-items-center rounded-full"
          style={{ background: 'radial-gradient(circle, #f9d252, #d4a017 60%, #7c5c0d)' }}
        >
          <span className="font-display text-xl text-primary-foreground">N</span>
        </div>
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full"
        animate={{ boxShadow: ['0 0 0 0 rgba(212,160,23,0)', '0 0 0 14px rgba(212,160,23,0)'] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          boxShadow: '0 0 0 0 rgba(212,160,23,0.6)',
        }}
      />
    </div>
  );
}

function Star8({
  cx,
  cy,
  r,
  stroke,
  opacity = 1,
  rotate = 0,
}: {
  cx: number;
  cy: number;
  r: number;
  stroke: string;
  opacity?: number;
  rotate?: number;
}) {
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const a = ((i * 45 + rotate) * Math.PI) / 180;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    pts.push(`${x},${y}`);
  }
  const path = pts.map((p, i) => (i === 0 ? `M${p}` : `L${pts[(i * 3) % 8]}`)).join(' ') + 'Z';
  return (
    <path
      d={path}
      fill="none"
      stroke={stroke}
      strokeWidth={1.3}
      opacity={opacity}
      strokeLinejoin="round"
    />
  );
}

function FloatingStars() {
  const stars = Array.from({ length: 24 });
  return (
    <div className="absolute inset-0 -z-10">
      {stars.map((_, i) => {
        const left = (i * 47) % 100;
        const top = (i * 31) % 100;
        const delay = (i % 6) * 0.4;
        const size = (i % 3) + 1;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.1, 0.5] }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, delay }}
            className="absolute rounded-full bg-accent"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              boxShadow: '0 0 8px rgba(212,160,23,0.7)',
            }}
          />
        );
      })}
    </div>
  );
}
