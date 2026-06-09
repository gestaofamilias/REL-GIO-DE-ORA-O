'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const COLORS = ['rgba(0,87,255,', 'rgba(77,166,255,', 'rgba(255,106,0,'];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * canvas!.width,
        y: canvas!.height + 20,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(Math.random() * 0.5 + 0.3),
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    }

    for (let i = 0; i < 60; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Base gradient
      const grad = ctx!.createRadialGradient(
        canvas!.width / 2, 0, 0,
        canvas!.width / 2, canvas!.height, canvas!.height
      );
      grad.addColorStop(0, '#001A4E');
      grad.addColorStop(0.4, '#000D2E');
      grad.addColorStop(1, '#000510');
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Radial glow top
      const topGlow = ctx!.createRadialGradient(
        canvas!.width / 2, 0, 0,
        canvas!.width / 2, 0, canvas!.height * 0.6
      );
      topGlow.addColorStop(0, 'rgba(0,87,255,0.12)');
      topGlow.addColorStop(1, 'transparent');
      ctx!.fillStyle = topGlow;
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      // Net lines
      ctx!.strokeStyle = 'rgba(0,87,255,0.04)';
      ctx!.lineWidth = 0.5;
      const step = 80;
      for (let x = 0; x < canvas!.width; x += step) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, canvas!.height);
        ctx!.stroke();
      }
      for (let y = 0; y < canvas!.height; y += step) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(canvas!.width, y);
        ctx!.stroke();
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -20) {
          particles.splice(i, 1);
          particles.push(createParticle());
          continue;
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = `${p.color}${p.alpha})`;
        ctx!.fill();

        // Glow
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx!.fillStyle = `${p.color}${p.alpha * 0.15})`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* SVG wave overlay */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-10"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C360,180 720,20 1080,100 C1260,140 1380,80 1440,100 L1440,200 L0,200 Z"
          fill="url(#waveGrad)"
          className="wave-animation"
        />
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0057FF" />
            <stop offset="100%" stopColor="#003083" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
