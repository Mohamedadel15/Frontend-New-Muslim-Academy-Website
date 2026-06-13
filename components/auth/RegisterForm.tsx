'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link, useRouter } from '@/lib/navigation';
import { useAuthStore } from '@/stores/authStore';

export function RegisterForm() {
  const t = useTranslations('auth.register');
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const password = data.get('password') as string;
    const confirm = data.get('confirmPassword') as string;
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register({
        name: data.get('name') as string,
        email: data.get('email') as string,
        password,
      });
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
          <Label htmlFor="name">{t('name')}</Label>
          <Input id="name" name="name" required className="mt-2" />
        </div>

        <div>
          <Label htmlFor="email">{t('email')}</Label>
          <Input id="email" name="email" type="email" required className="mt-2" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="password">{t('password')}</Label>
            <Input id="password" name="password" type="password" required minLength={8} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              minLength={8}
              className="mt-2"
            />
          </div>
        </div>

        {error && <p className="text-sm text-error">{error}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? '...' : t('submit')}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {t('haveAccount')}{' '}
        <Link href="/login" className="text-accent font-medium hover:underline">
          {t('signin')}
        </Link>
      </p>
    </div>
  );
}
