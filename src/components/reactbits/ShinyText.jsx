import React from 'react';

export default function ShinyText({
  text = '',
  disabled = false,
  speed = 4,
  className = ''
}) {
  return (
    <span
      className={`inline-block relative overflow-hidden bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: 'linear-gradient(110deg, #b5b5b5 35%, #ffffff 50%, #b5b5b5 65%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animation: disabled ? 'none' : `shine ${speed}s linear infinite`
      }}
    >
      {text}
    </span>
  );
}
