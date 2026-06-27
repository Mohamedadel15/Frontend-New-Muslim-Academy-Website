import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.nameLong,
    short_name: "Da'wah & Guidance",
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0d1b3e',
    theme_color: '#1a1a2e',
    orientation: 'portrait',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
