import { Logo } from '@/components/shared/Logo';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-warm text-white p-12 flex-col justify-between">
        <div
          aria-hidden
          className="absolute inset-0 bg-arabesque-pattern opacity-40"
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/30 blur-[120px]"
        />
        <div
          aria-hidden
          className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-secondary-500/30 blur-[100px]"
        />

        <div className="relative">
          <Logo className="inline-flex" />
        </div>

        <div className="relative space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Day-After-Shahadah</p>
          <p className="font-display text-4xl leading-tight max-w-md">
            Your journey starts here. <span className="gold-text italic">Free.</span> Forever.
          </p>
          <p className="text-sm text-white/60 max-w-md">
            50,000+ new Muslims in over 25 countries learning, praying, and growing together.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-4 max-w-md">
          {['50k+', '100+', '25+'].map((n, i) => (
            <div key={i} className="rounded-2xl bg-white/5 backdrop-blur p-4 border border-white/10">
              <p className="font-display text-2xl gold-text">{n}</p>
              <p className="text-[10px] uppercase tracking-wider text-white/60 mt-1">
                {['Students', 'Courses', 'Countries'][i]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Logo className="lg:hidden inline-flex mb-12" />
          {children}
        </div>
      </div>
    </div>
  );
}
