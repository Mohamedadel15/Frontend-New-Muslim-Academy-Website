# New Muslim Academy

A premium, bilingual (EN/AR) educational platform for new Muslims — built with Next.js 15 (App Router), TypeScript, Tailwind CSS, next-intl, Framer Motion, Three.js (R3F), Lenis, and Zustand.

## Stack

| Layer | Tool |
| --- | --- |
| Framework | Next.js 15 (App Router, RSC) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 + CSS variables |
| UI primitives | Radix UI + shadcn-style components |
| State | Zustand (auth, UI, course progress) |
| Server state | TanStack React Query v5 |
| i18n | next-intl (sub-path: `/en/...`, `/ar/...`) with full RTL |
| Animations | Framer Motion, GSAP, Lenis smooth scroll |
| 3D / WebGL | Three.js via React Three Fiber |
| Icons | lucide-react |

## Run

```bash
# 1. Install
npm install

# 2. Copy env
cp .env.example .env

# 3. Dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` by middleware.

## Structure

```
app/
  [locale]/
    (main)/              # public site (Navbar + Footer)
      page.tsx           # Homepage (Hero + 5 sections)
      courses/
      live-events/
      blog/
      about/
      contact/
      faq/
    (auth)/              # login / register (no chrome)
    (dashboard)/         # protected student area
  api/og/route.tsx       # dynamic OG image generation
  sitemap.ts             # bilingual sitemap
  robots.ts
  manifest.ts
components/
  ui/                    # shadcn-style primitives
  shared/                # Navbar, Footer, Logo, LanguageSwitcher
  sections/              # Hero, FeatureCards, FreeShowcase, Testimonials, StatsCounter, OneStopResource
  animations/            # ParticleField (Three.js), TextReveal, MagneticButton, TiltCard, AnimatedCounter, CursorGlow, ScrollProgress, ParallaxWrapper, MorphingShape
  courses/ blog/ events/ faq/ contact/ auth/ dashboard/
lib/
  i18n.ts navigation.ts api.ts utils.ts constants.ts
  mock-data/             # courses, blog, events, FAQs, instructors
stores/                  # zustand (auth, ui, progress)
hooks/                   # useInView, useMediaQuery, useLenis, useMousePosition, useScrollProgress, useAuth
messages/                # en.json, ar.json (full translations)
```

## Pages built

- `/` — homepage with cinematic Three.js particle hero, scroll-revealed sections, 3D-tilt feature cards, animated stats, geometric star "free" badge, auto-rotating testimonials carousel
- `/courses` — filterable grid by category
- `/courses/[slug]` — full detail with accordion curriculum, instructor card, reviews, enrollment
- `/live-events` — upcoming + past tabs with countdown
- `/blog` — search + category filters
- `/blog/[slug]` — rich article with author bio and share controls
- `/faq` — searchable accordion with category tabs
- `/about` — mission, team grid, animated stats counter
- `/contact` — form (mocked submit) + contact info
- `/login`, `/register` — split-screen auth
- `/dashboard` — Overview, My Courses, Progress, Certificates, Settings (gated by Zustand)

## i18n

Visit `/en/...` or `/ar/...`. The language switcher in the navbar swaps locales in place. Arabic flips to RTL and uses Amiri serif.

All translatable text lives in `messages/{en,ar}.json`. No hardcoded UI strings in components.

## Auth

Mock auth using a Zustand store persisted to localStorage. `login`/`register` simulate a 600ms request and create a stub user. `(dashboard)` routes are gated client-side by `<AuthGate />` — replace with server-side middleware + JWT when you wire a real backend.

## SEO

- Dynamic per-locale `<title>` / `<meta>` via `generateMetadata`
- `app/sitemap.ts` enumerates all pages × all locales × all courses × all blog posts
- `app/robots.ts` + `app/manifest.ts` (PWA-ready)
- JSON-LD `EducationalOrganization` injected at the locale-layout level
- `app/api/og/route.tsx` generates 1200×630 OG images on the fly from `?title=&subtitle=`

## Performance notes

- `ParticleField` (Three.js) is `next/dynamic` with `ssr: false` and respects `prefers-reduced-motion`
- Cursor glow and 3D tilt disable on mobile via media-query hooks
- Mobile particle count drops from 240 → 60
- Course/blog pages use `generateStaticParams` for SSG
- `optimizePackageImports` enabled for `lucide-react` and `framer-motion`

## What you'd add to ship

- Real backend (replace `lib/api.ts` mocks + `lib/mock-data/*`)
- Persist auth as `httpOnly` JWT and gate `/dashboard` in middleware
- Real videos for course previews (currently `<iframe>` placeholder)
- Newsletter integration for the footer form
- Place real assets in `/public` (icons, OG fallback, fonts if self-hosted)
- Tests (Vitest unit + Playwright E2E) — patterns are in the PDF spec
