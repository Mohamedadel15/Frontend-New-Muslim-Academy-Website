import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'New Muslim Academy',
    short_name: 'NMA',
    description: 'Free online Islamic education for new Muslims',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1a2e',
    theme_color: '#1a1a2e',
    orientation: 'portrait',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/icon-maskable.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}
