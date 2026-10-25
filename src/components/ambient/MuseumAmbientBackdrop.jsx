import React, { useEffect, useRef } from 'react';

export default function MuseumAmbientBackdrop() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Logic symbols and geometric 2D shapes floating in the museum atmosphere
    const symbols = ['∧', '∨', '¬', '→', '⇔', '∀', '∃', 'λ', 'f(x)', '◆', '◈', '✦', '01', '10'];
    const colors = [
      'rgba(0, 229, 255, 0.35)',   // Cyan
      'rgba(255, 42, 109, 0.3)',   // Crimson
      'rgba(5, 217, 232, 0.35)',   // Electric Blue
      'rgba(0, 245, 160, 0.3)',    // Emerald
      'rgba(255, 184, 0, 0.35)'    // Amber
    ];

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 16 + 10,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2, // Drifting gently upwards like illuminated dust
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.6 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.01
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep museum atmospheric background gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2, height * 0.1, 50,
        width / 2, height / 2, Math.max(width, height) * 0.9
      );
      bgGrad.addColorStop(0, '#0A0F1D');
      bgGrad.addColorStop(0.4, '#070A12');
      bgGrad.addColorStop(1, '#040609');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2D Volumetric Museum Spotlights from ceiling
      const spotlight1 = ctx.createRadialGradient(width * 0.25, 0, 10, width * 0.25, height * 0.7, height * 0.8);
      spotlight1.addColorStop(0, 'rgba(0, 229, 255, 0.07)');
      spotlight1.addColorStop(0.6, 'rgba(0, 229, 255, 0.015)');
      spotlight1.addColorStop(1, 'transparent');
      ctx.fillStyle = spotlight1;
      ctx.beginPath();
      ctx.moveTo(width * 0.2, 0);
      ctx.lineTo(width * 0.3, 0);
      ctx.lineTo(width * 0.45, height);
      ctx.lineTo(width * 0.05, height);
      ctx.closePath();
      ctx.fill();

      const spotlight2 = ctx.createRadialGradient(width * 0.75, 0, 10, width * 0.75, height * 0.7, height * 0.8);
      spotlight2.addColorStop(0, 'rgba(255, 42, 109, 0.06)');
      spotlight2.addColorStop(0.6, 'rgba(255, 42, 109, 0.012)');
      spotlight2.addColorStop(1, 'transparent');
      ctx.fillStyle = spotlight2;
      ctx.beginPath();
      ctx.moveTo(width * 0.7, 0);
      ctx.lineTo(width * 0.8, 0);
      ctx.lineTo(width * 0.95, height);
      ctx.lineTo(width * 0.55, height);
      ctx.closePath();
      ctx.fill();

      // Architectural Perspective Floor Grid (Subtle Virtual Museum Floor)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const horizonY = height * 0.75;
      
      // Horizontal perspective lines
      for (let y = horizonY; y < height; y += (y - horizonY) * 0.35 + 18) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vanishing perspective rays from center
      const centerX = width / 2;
      for (let x = -width; x <= width * 2; x += 120) {
        ctx.beginPath();
        ctx.moveTo(centerX, horizonY - 40);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Render Floating 2D Logic Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (0.8 + 0.2 * Math.sin(time + p.x));
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
