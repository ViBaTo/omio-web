'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useIsTouch } from '@/lib/useMediaQuery';

interface Particle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  vx: number;
  vy: number;
  size: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const isOverInteractive = useRef(false);
  const isTouch = useIsTouch();

  const getAccentColor = useCallback((): string => {
    if (typeof window === 'undefined') return '#0A9396';
    return getComputedStyle(document.documentElement)
      .getPropertyValue('--current-accent')
      .trim() || '#0A9396';
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Spawn particle
      if (particlesRef.current.length < 30) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          life: 30,
          maxLife: 30,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }

      // Detect interactive elements
      const target = e.target as HTMLElement;
      isOverInteractive.current = !!(
        target.closest('a, button, [data-cursor="precision"]') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      );
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const color = getAccentColor();

      // Draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.life--;
        p.x += p.vx;
        p.y += p.vy;

        const alpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha * 0.4;
        ctx.fill();

        return p.life > 0;
      });

      ctx.globalAlpha = 1;

      const { x, y } = mouseRef.current;

      if (isOverInteractive.current) {
        // Crosshair cursor
        const size = 12;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - size, y);
        ctx.lineTo(x + size, y);
        ctx.moveTo(x, y - size);
        ctx.lineTo(x, y + size);
        ctx.stroke();

        // Small circle at center
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.stroke();
      } else {
        // Regular dot cursor
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, getAccentColor]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}
