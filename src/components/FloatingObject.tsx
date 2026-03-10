'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { useIsDesktop } from '@/lib/useMediaQuery';
import type { Mesh } from 'three';
import type { World } from '@/lib/constants';

const WORLD_MATERIALS = {
  artesano: { color: '#C4963A', roughness: 0.8, metalness: 0.1, distort: 0.25 },
  ingeniero: { color: '#3A4F6A', roughness: 0.3, metalness: 0.7, distort: 0.15 },
  fabrica: { color: '#B8956A', roughness: 0.15, metalness: 0.95, distort: 0.1 },
} as const;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function Scene({ world }: { world: World }) {
  const meshRef = useRef<Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const material = WORLD_MATERIALS[world];

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    }
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = lerp(
      meshRef.current.rotation.y,
      mouseRef.current.x * 0.3,
      0.05
    );
    meshRef.current.rotation.x = lerp(
      meshRef.current.rotation.x,
      mouseRef.current.y * 0.2,
      0.05
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
        <MeshDistortMaterial
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
          distort={material.distort}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function FloatingObject() {
  const isDesktop = useIsDesktop();
  const [webGLSupported, setWebGLSupported] = useState(false);
  const [currentWorld, setCurrentWorld] = useState<World>('fabrica');

  const { scrollYProgress } = useScroll();

  // Determine world based on scroll
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v < 0.08) setCurrentWorld('fabrica');
    else if (v < 0.25) setCurrentWorld('artesano');
    else if (v < 0.38) setCurrentWorld('fabrica');
    else if (v < 0.55) setCurrentWorld('artesano');
    else if (v < 0.68) setCurrentWorld('ingeniero');
    else if (v < 0.85) setCurrentWorld('fabrica');
    else setCurrentWorld('artesano');
  });

  useEffect(() => {
    setWebGLSupported(hasWebGL());
  }, []);

  if (!isDesktop || !webGLSupported) return null;

  return (
    <div
      className="fixed top-0 right-0 w-[35vw] h-screen pointer-events-none z-[1]"
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 4], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.3} />
          <Scene world={currentWorld} />
        </Canvas>
      </Suspense>
    </div>
  );
}
