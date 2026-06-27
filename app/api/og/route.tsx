import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') ?? "Da'wah & Guidance Society";
  const subtitle = searchParams.get('subtitle') ?? 'Guiding new Muslims in Makkah Al-Mukarramah';
  const emblem = `${req.nextUrl.origin}/brand/society-emblem.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d132c 50%, #1a1a2e 100%)',
          color: 'white',
          padding: '80px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,160,23,0.3), transparent 70%)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={emblem}
            width={64}
            height={64}
            alt=""
            style={{ borderRadius: 9999, background: 'white' }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            Da&apos;wah &amp; Guidance Society · Makkah
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              backgroundImage: 'linear-gradient(to right, #ffffff, #f9d252)',
              backgroundClip: 'text',
              color: 'transparent',
              maxWidth: '90%',
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 32,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '70%',
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
