import React, { useEffect, useState, useRef } from 'react';

export default function CountUp({
  to = 0,
  from = 0,
  duration = 2,
  separator = ',',
  prefix = '',
  suffix = '',
  className = ''
}) {
  const [count, setCount] = useState(from);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            // easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentVal = Math.floor(from + (to - from) * easeProgress);

            setCount(currentVal);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(to);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [to, from, duration]);

  const formatted = count.toLocaleString('es-ES');

  return (
    <span ref={elementRef} className={`font-mono font-bold ${className}`}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
