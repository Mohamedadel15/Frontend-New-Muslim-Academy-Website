'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';

export default function SettingsPage() {
  const t = useTranslations('dashboard.sidebar');
  const { user } = useAuthStore();

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-2xl">
      <header>
        <h1 className="font-display text-3xl">{t('settings')}</h1>
        <p className="mt-2 text-muted-foreground">Manage your account.</p>
      </header>

      <Card>
        <CardContent className="p-6 space-y-5">
          <h2 className="font-display text-xl">Profile</h2>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={user?.name} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user?.email} className="mt-2" />
          </div>
          <Button>Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-5">
          <h2 className="font-display text-xl">Password</h2>
          <div>
            <Label htmlFor="cur">Current password</Label>
            <Input id="cur" type="password" className="mt-2" />
          </div>
          <div>
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" className="mt-2" />
          </div>
          <Button variant="outline">Update password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-5">
          <h2 className="font-display text-xl">Preferences</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Email notifications</p>
              <p className="text-xs text-muted-foreground">Weekly digest + event reminders</p>
            </div>
            <input type="checkbox" defaultChecked className="size-5 accent-accent-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
