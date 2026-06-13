import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[120px] w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm transition-all',
      'placeholder:text-muted-foreground',
      'focus:border-accent focus:bg-background focus:outline-none focus:ring-2 focus:ring-accent/30',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'resize-y',
      className
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
