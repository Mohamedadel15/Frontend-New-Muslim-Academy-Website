'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { submitContactForm } from '@/lib/api';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await submitContactForm({
        name: data.get('name') as string,
        email: data.get('email') as string,
        subject: data.get('subject') as string,
        message: data.get('message') as string,
      });
      if (res.ok) {
        setState('success');
        form.reset();
      } else setState('error');
    } catch {
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t('name')}</Label>
          <Input id="name" name="name" required className="mt-2" />
        </div>
        <div>
          <Label htmlFor="email">{t('email')}</Label>
          <Input type="email" id="email" name="email" required className="mt-2" />
        </div>
      </div>
      <div>
        <Label htmlFor="subject">{t('subject')}</Label>
        <Input id="subject" name="subject" required className="mt-2" />
      </div>
      <div>
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea id="message" name="message" required rows={6} className="mt-2" />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={state === 'submitting' || state === 'success'}
        className="w-full sm:w-auto"
      >
        {state === 'success' ? (
          <>
            <Check className="size-4" /> {t('success')}
          </>
        ) : (
          <>
            {t('submit')} <Send className="size-4" />
          </>
        )}
      </Button>
      {state === 'error' && <p className="text-sm text-error">{t('error')}</p>}
    </form>
  );
}
