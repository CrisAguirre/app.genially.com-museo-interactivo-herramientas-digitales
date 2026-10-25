import React, { useEffect, useRef } from 'react';

export default function BackgroundGalaxy({
  speed = 1,
  starCount = 180,
  starColor = '#FFFFFF',
  nebulaColor = 'rgba(70, 23, 143, 0.22)'
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * 1000 + 1,
      size: Math.random() * 2 + 0.5,
      hue: Math.random() > 0.7 ? (Math.random() > 0.5 ? 280 : 210) : 0
    }));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      // Smooth mouse easing
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const offsetX = (mouseX - width / 2) * 0.2;
      const offsetY = (mouseY - height / 2) * 0.2;

      ctx.fillStyle = '#090714';
      ctx.fillRect(0, 0, width, height);

      // Nebula glow
      const grad = ctx.createRadialGradient(
        width / 2 + offsetX,
        height / 2 + offsetY,
        50,
        width / 2,
        height / 2,
        width * 0.7
      );
      grad.addColorStop(0, nebulaColor);
      grad.addColorStop(0.5, 'rgba(19, 104, 206, 0.08)');
      grad.addColorStop(1, 'rgba(9, 7, 20, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Stars 3D projection
      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= speed * 2;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 400 / star.z;
        const px = (star.x - offsetX) * k + cx;
        const py = (star.y - offsetY) * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthAlpha = Math.min(1, (1000 - star.z) / 800);
          const r = Math.max(0.6, star.size * k);

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);

          if (star.hue > 0) {
            ctx.fillStyle = `hsla(${star.hue}, 80%, 75%, ${depthAlpha})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha})`;
          }
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [speed, starCount, nebulaColor]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
