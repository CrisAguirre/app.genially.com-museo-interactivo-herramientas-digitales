import React, { useState } from 'react';
import { sound } from '../../utils/audio';

export default function PeekRating({
  count = 5,
  value = 0,
  onChange = () => {},
  size = 32,
  className = ''
}) {
  const [hoverIdx, setHoverIdx] = useState(null);

  const activeRating = hoverIdx !== null ? hoverIdx + 1 : value;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const isFilled = i < activeRating;
        const isHovered = hoverIdx === i;

        return (
          <button
            key={i}
            type="button"
            id={`peek-star-${i + 1}`}
            onMouseEnter={() => {
              sound.playHover();
              setHoverIdx(i);
            }}
            onMouseLeave={() => setHoverIdx(null)}
            onClick={() => {
              sound.playCorrect();
              onChange(i + 1);
            }}
            className="group relative p-1 transition-transform duration-200 focus:outline-none"
            style={{
              transform: isHovered ? 'scale(1.3) translateY(-4px)' : 'scale(1)',
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill={isFilled ? '#FFD700' : 'none'}
              stroke={isFilled ? '#FFD700' : 'rgba(255,255,255,0.3)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-200 drop-shadow-[0_2px_8px_rgba(255,215,0,0.3)]"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
