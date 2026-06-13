'use client';

import { useTranslations } from 'next-intl';
import { Award, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/stores/progressStore';

export default function CertificatesPage() {
  const t = useTranslations('dashboard.sidebar');
  const { certificates } = useProgressStore();

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header>
        <h1 className="font-display text-3xl">{t('certificates')}</h1>
        <p className="mt-2 text-muted-foreground">
          Every completion, printable and shareable.
        </p>
      </header>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="size-12 text-accent mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">
              Complete a course to earn your first certificate.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {certificates.map((cert) => (
            <Card key={cert.id}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className="grid size-12 place-items-center rounded-full bg-accent/15 text-accent">
                  <Award className="size-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg">{cert.courseTitle}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Issued {cert.issuedAt}</p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="size-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
