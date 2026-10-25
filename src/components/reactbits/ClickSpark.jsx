import React, { useRef, useEffect } from 'react';

export default function ClickSpark({
  sparkColor = '#FFD700',
  sparkSize = 10,
  sparkRadius = 25,
  sparkCount = 8,
  duration = 500,
  children
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now();

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = now - spark.startTime;
        if (elapsed > duration) return false;

        const progress = elapsed / duration;
        const currentRadius = sparkRadius * progress;
        const opacity = 1 - progress;

        ctx.save();
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = opacity;

        spark.angles.forEach((angle) => {
          const x = spark.x + Math.cos(angle) * currentRadius;
          const y = spark.y + Math.sin(angle) * currentRadius;

          ctx.beginPath();
          ctx.arc(x, y, sparkSize * (1 - progress * 0.5), 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.restore();
        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [duration, sparkRadius, sparkSize]);

  const handleClick = (e) => {
    const colors = ['#E21B3C', '#1368CE', '#D89E00', '#26890C', '#FFD700'];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    const angles = Array.from(
      { length: sparkCount },
      (_, i) => (i * 2 * Math.PI) / sparkCount + (Math.random() * 0.2 - 0.1)
    );

    sparksRef.current.push({
      x: e.clientX,
      y: e.clientY,
      color: chosenColor,
      angles,
      startTime: performance.now()
    });
  };

  return (
    <div onClick={handleClick} className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
      />
      {children}
    </div>
  );
}
