import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-primary-500 text-white grid place-items-center p-8">
      <div className="text-center">
        <p className="font-display text-8xl gold-text">404</p>
        <h1 className="font-display text-2xl mt-4">Lost on the path?</h1>
        <p className="mt-2 text-white/60">The page you&apos;re looking for has moved or never existed.</p>
        <Link
          href="/"
          className="inline-flex mt-8 items-center rounded-full bg-accent px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-accent-400"
        >
          Take me home
        </Link>
      </div>
    </main>
  );
}
