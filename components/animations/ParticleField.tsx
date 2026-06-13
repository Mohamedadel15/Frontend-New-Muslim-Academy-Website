'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMediaQuery';

function buildArabesquePoints(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const gold = new THREE.Color('#d4a017');
  const white = new THREE.Color('#ffffff');

  for (let i = 0; i < count; i++) {
    const layer = i % 3;
    const t = i / count;
    const angle = t * Math.PI * 16;
    const r =
      layer === 0
        ? radius * (0.4 + 0.4 * Math.sin(t * Math.PI * 8))
        : layer === 1
          ? radius * (0.6 + 0.3 * Math.cos(t * Math.PI * 6))
          : radius * (0.85 + 0.1 * Math.sin(t * Math.PI * 12));

    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    const z = (Math.sin(t * Math.PI * 4) * radius) / 6;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    const c = layer === 0 ? gold : layer === 1 ? gold.clone().lerp(white, 0.4) : white;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  return { positions, colors };
}

function ParticleSystem({ count, mouse }: { count: number; mouse: { x: number; y: number } }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => buildArabesquePoints(count, 3.2), [count]);
  const original = useMemo(() => positions.slice(), [positions]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    pointsRef.current.rotation.z = t * 0.04;
    pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;

    const pos = (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const mx = mouse.x * 3;
    const my = mouse.y * 3;
    for (let i = 0; i < count; i++) {
      const ox = original[i * 3];
      const oy = original[i * 3 + 1];
      const dx = ox - mx;
      const dy = oy - my;
      const d2 = dx * dx + dy * dy;
      const force = d2 < 1 ? (1 - d2) * 0.25 : 0;
      pos[i * 3] = ox + dx * force;
      pos[i * 3 + 1] = oy + dy * force;
    }
    (pointsRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleField() {
  const isMobile = useIsMobile();
  const reduceMotion = usePrefersReducedMotion();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (reduceMotion) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,160,23,0.15),transparent_60%)]"
      />
    );
  }

  const count = isMobile ? 60 : 240;

  return (
    <div aria-hidden className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleSystem count={count} mouse={mouse.current} />
      </Canvas>
    </div>
  );
}
