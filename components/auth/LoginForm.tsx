'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link, useRouter } from '@/lib/navigation';
import { useAuthStore } from '@/stores/authStore';

export function LoginForm() {
  const t = useTranslations('auth.login');
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    try {
      await login(data.get('email') as string, data.get('password') as string);
      router.push('/dashboard');
    } catch (err) {
      setError(String(err));
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">{t('title')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <Label htmlFor="email">{t('email')}</Label>
          <Input id="email" name="email" type="email" required className="mt-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Link href="/forgot-password" className="text-xs text-accent hover:underline">
              {t('forgot')}
            </Link>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-border accent-accent-500"
          />
          {t('remember')}
        </label>

        {error && <p className="text-sm text-error">{error}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? '...' : t('submit')}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {t('noAccount')}{' '}
        <Link href="/register" className="text-accent font-medium hover:underline">
          {t('signup')}
        </Link>
      </p>
    </div>
  );
}
