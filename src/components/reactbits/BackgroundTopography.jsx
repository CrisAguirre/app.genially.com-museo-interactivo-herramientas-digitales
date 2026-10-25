import React, { useEffect, useRef } from 'react';

export default function BackgroundTopography({
  lineColor = 'rgba(216, 158, 0, 0.28)',
  density = 14
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2 };
    let time = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      time += 0.015;
      ctx.fillStyle = '#0f0c05';
      ctx.fillRect(0, 0, width, height);

      // Gold warm glow
      const radial = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        30,
        mouse.x,
        mouse.y,
        width * 0.5
      );
      radial.addColorStop(0, 'rgba(216, 158, 0, 0.12)');
      radial.addColorStop(0.7, 'rgba(120, 85, 0, 0.04)');
      radial.addColorStop(1, 'rgba(15, 12, 5, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Topographic lines
      const step = height / density;
      ctx.lineWidth = 1.4;

      for (let i = 0; i <= density + 4; i++) {
        const baseY = i * step - step * 2;
        ctx.beginPath();

        for (let x = 0; x <= width; x += 15) {
          const dx = (x - mouse.x) / width;
          const dy = (baseY - mouse.y) / height;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Wave equation
          const wave1 = Math.sin(x * 0.005 + time + i * 0.4) * 25;
          const wave2 = Math.cos(x * 0.01 - time * 0.8) * 15;
          const mouseDisplace = Math.exp(-dist * 4) * 45 * Math.sin(time * 2);

          const y = baseY + wave1 + wave2 + mouseDisplace;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = lineColor;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lineColor, density]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
