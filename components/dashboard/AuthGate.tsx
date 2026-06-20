'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/navigation';
import { useAuthStore } from '@/stores/authStore';
import { LoadingScreen } from '@/components/shared/LoadingScreen';

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace('/login');
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return <LoadingScreen label="Opening your dashboard" caption="Restoring your session." />;
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
