import React, { useEffect, useRef } from "react";

export default function GravityBurstBackground({
  className = "",
  density = 950, // main burst particle count
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const rgba = (h, s, l, a) => `hsla(${h}, ${s}%, ${l}%, ${a})`;

    const getBurstCenter = (w, h) => ({ x: w * 0.7, y: h * 0.35 });

    const resize = () => {
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);

      sizeRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const { w, h } = sizeRef.current;
      const { x: cx, y: cy } = getBurstCenter(w, h);

      const particles = [];

      // Burst particles
      for (let i = 0; i < density; i++) {
        // Biased angle to get a “sweep” (similar to the Antigravity hero)
        const a = (Math.random() * 1.35 + 0.85) * Math.PI; // ~0.85π..2.2π
        const r0 = Math.random() * 40;

        const speed = 0.25 + Math.random() * 1.2;
        const swirl = (Math.random() * 2 - 1) * 0.35;

        const hue = (a / (Math.PI * 2)) * 360 + 40;

        particles.push({
          x: cx + Math.cos(a) * r0,
          y: cy + Math.sin(a) * r0,
          vx: Math.cos(a) * speed + -Math.sin(a) * speed * swirl,
          vy: Math.sin(a) * speed + Math.cos(a) * speed * swirl,
          r: (Math.random() < 0.08 ? 2.2 : 1.2) + Math.random() * 0.9,
          hue,
          life: 0,
          maxLife: 900 + Math.random() * 900,
        });
      }

      // Sparse ambient dots across the hero
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() * 2 - 1) * 0.03,
          vy: (Math.random() * 2 - 1) * 0.03,
          r: 0.8 + Math.random() * 0.9,
          hue: Math.random() * 360,
          life: 0,
          maxLife: 2000 + Math.random() * 2000,
        });
      }

      particlesRef.current = particles;
    };

    const step = () => {
      const { w, h } = sizeRef.current;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Gentle drag
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Fade in then out
        const t = p.life / p.maxLife;
        const a = t < 0.15 ? t / 0.15 : 1 - Math.max(0, (t - 0.55) / 0.45);
        const alpha = clamp(a, 0, 1) * 0.9;

        ctx.beginPath();
        ctx.fillStyle = rgba(p.hue, 90, 55, alpha);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Respawn to keep it alive
        if (p.life >= p.maxLife) {
          const { x: cx, y: cy } = getBurstCenter(w, h);
          const ang = (Math.random() * 1.35 + 0.85) * Math.PI;
          const r0 = Math.random() * 40;
          const speed = 0.25 + Math.random() * 1.2;
          const swirl = (Math.random() * 2 - 1) * 0.35;

          p.x = cx + Math.cos(ang) * r0;
          p.y = cy + Math.sin(ang) * r0;
          p.vx = Math.cos(ang) * speed + -Math.sin(ang) * speed * swirl;
          p.vy = Math.sin(ang) * speed + Math.cos(ang) * speed * swirl;
          p.hue = (ang / (Math.PI * 2)) * 360 + 40;
          p.life = 0;
          p.maxLife = 900 + Math.random() * 900;
          p.r = (Math.random() < 0.08 ? 2.2 : 1.2) + Math.random() * 0.9;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    // Setup
    resize();
    seed();
    rafRef.current = requestAnimationFrame(step);

    const ro = new ResizeObserver(() => {
      resize();
      seed();
    });
    ro.observe(canvas);

    const onClick = () => seed();
    canvas.addEventListener("pointerdown", onClick);

    return () => {
      ro.disconnect();
      canvas.removeEventListener("pointerdown", onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
