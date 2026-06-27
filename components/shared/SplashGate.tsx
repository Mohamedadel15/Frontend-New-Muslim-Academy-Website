'use client';

import { useEffect, useState } from 'react';
import { LoadingScreen } from './LoadingScreen';

const KEY = 'nma-splash-seen';

export function SplashGate() {
  const [show, show_] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    if (sessionStorage.getItem(KEY)) return;
    show_(true);
    sessionStorage.setItem(KEY, '1');
  }, []);

  if (!show) return null;

  return (
    <LoadingScreen
      label="Da'wah & Guidance Society"
      caption="Welcome — your free Islamic learning home."
      autoFinish={2400}
      onFinish={() => show_(false)}
    />
  );
}
