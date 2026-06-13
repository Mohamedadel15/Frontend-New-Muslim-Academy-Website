import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') ?? 'New Muslim Academy';
  const subtitle = searchParams.get('subtitle') ?? 'Free online Islamic education';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, #f9d252, #a87d12)',
              clipPath:
                'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            New Muslim Academy
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
