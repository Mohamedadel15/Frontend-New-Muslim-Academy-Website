'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  splitBy?: 'word' | 'char';
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
  as = 'span',
  splitBy = 'word',
}: TextRevealProps) {
  const items = splitBy === 'word' ? text.split(' ') : text.split('');
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {items.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {item}
            {splitBy === 'word' && i < items.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function TextRevealLine({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: '110%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
