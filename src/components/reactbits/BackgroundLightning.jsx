import React, { useEffect, useRef } from 'react';

export default function BackgroundLightning({
  intensity = 1,
  color = '#26890C'
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let bolts = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const createLightning = (startX, startY, endX, endY) => {
      const segments = [];
      let currentX = startX;
      let currentY = startY;

      const totalDist = Math.hypot(endX - startX, endY - startY);
      const steps = Math.floor(totalDist / 20);

      for (let i = 0; i < steps; i++) {
        const t = (i + 1) / steps;
        const targetX = startX + (endX - startX) * t;
        const targetY = startY + (endY - startY) * t;

        const jitter = (Math.random() - 0.5) * 28;
        const nextX = targetX + jitter;
        const nextY = targetY + jitter;

        segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });
        currentX = nextX;
        currentY = nextY;
      }
      segments.push({ x1: currentX, y1: currentY, x2: endX, y2: endY });

      return {
        segments,
        alpha: 1,
        color: Math.random() > 0.4 ? '#4ADE80' : '#22C55E'
      };
    };

    let lastStrike = performance.now();

    const render = (time) => {
      ctx.fillStyle = '#051108';
      ctx.fillRect(0, 0, width, height);

      // Deep green ambient pulse
      const rad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        width * 0.6
      );
      rad.addColorStop(0, 'rgba(38, 137, 12, 0.16)');
      rad.addColorStop(0.5, 'rgba(10, 48, 18, 0.08)');
      rad.addColorStop(1, 'rgba(5, 17, 8, 0)');
      ctx.fillStyle = rad;
      ctx.fillRect(0, 0, width, height);

      // Random lightning generator
      if (time - lastStrike > 1800 / intensity) {
        lastStrike = time;
        const sx = Math.random() * width;
        const ex = sx + (Math.random() - 0.5) * 300;
        bolts.push(createLightning(sx, 0, ex, height * (0.6 + Math.random() * 0.4)));
      }

      // Draw active lightning bolts
      bolts = bolts.filter((bolt) => {
        bolt.alpha -= 0.04;
        if (bolt.alpha <= 0) return false;

        ctx.save();
        ctx.strokeStyle = bolt.color;
        ctx.globalAlpha = bolt.alpha;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#4ADE80';
        ctx.shadowBlur = 12;

        bolt.segments.forEach((seg) => {
          ctx.beginPath();
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
          ctx.stroke();
        });

        ctx.restore();
        return true;
      });

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity, color]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
