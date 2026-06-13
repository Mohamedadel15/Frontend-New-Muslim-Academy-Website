'use client';

import { Button } from '@/components/ui/button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-[80vh] grid place-items-center px-4">
      <div className="text-center">
        <p className="font-display text-5xl gold-text">Something went wrong</p>
        <p className="mt-3 text-muted-foreground max-w-md">
          The page failed to load. Please try again.
        </p>
        <Button onClick={reset} className="mt-8">
          Try again
        </Button>
      </div>
    </main>
  );
}
