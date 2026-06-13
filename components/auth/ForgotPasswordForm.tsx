'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/navigation';

export function ForgotPasswordForm() {
  const t = useTranslations('auth.forgotPassword');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '');
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    setSubmittedEmail(email);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">{t('title')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>

      {submittedEmail ? (
        <div className="rounded-2xl border border-border bg-secondary/40 p-5 text-sm">
          {t('sent', { email: submittedEmail })}
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email">{t('email')}</Label>
            <Input id="email" name="email" type="email" required className="mt-2" />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? '...' : t('submit')}
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-muted-foreground">
        <Link href="/login" className="text-accent font-medium hover:underline">
          {t('backToLogin')}
        </Link>
      </p>
    </div>
  );
}
