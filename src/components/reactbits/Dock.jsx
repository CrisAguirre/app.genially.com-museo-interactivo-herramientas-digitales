import React, { useRef, useState } from 'react';
import { sound } from '../../utils/audio';

export default function Dock({
  items = [],
  activeId = '',
  onSelect = () => {},
  className = ''
}) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <nav
      aria-label="Navegación de Salas del Museo"
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#120F1D]/85 backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${className}`}
    >
      {items.map((item, idx) => {
        const isActive = activeId === item.id;
        const isHovered = hoveredIdx === idx;
        const isNeighbor =
          hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

        let scale = 1;
        if (isHovered) scale = 1.35;
        else if (isNeighbor) scale = 1.15;

        return (
          <button
            key={item.id}
            id={`dock-nav-${item.id}`}
            onClick={() => {
              sound.playClick();
              onSelect(item.id);
            }}
            onMouseEnter={() => {
              sound.playHover();
              setHoveredIdx(idx);
            }}
            onMouseLeave={() => setHoveredIdx(null)}
            className="group relative flex flex-col items-center justify-center transition-all duration-200 focus:outline-none"
            style={{
              transform: `scale(${scale}) translateY(${isHovered ? '-8px' : '0px'})`,
              transformOrigin: 'bottom center'
            }}
          >
            {/* Tooltip */}
            <div
              className={`pointer-events-none absolute -top-10 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-150 ${
                isHovered
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-2'
              }`}
              style={{
                backgroundColor: item.color || '#46178F',
                color: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)'
              }}
            >
              {item.title}
            </div>

            {/* Icon Container */}
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-200 border ${
                isActive
                  ? 'border-white ring-2 ring-white/50 shadow-lg'
                  : 'border-white/10 hover:border-white/30'
              }`}
              style={{
                backgroundColor: isActive ? item.color : 'rgba(255,255,255,0.06)',
                color: '#FFFFFF'
              }}
            >
              <span className="text-base font-bold">{item.number === '0' ? '🏛️' : `S${item.number}`}</span>
            </div>

            {/* Active Dot */}
            <div
              className={`w-1.5 h-1.5 mt-1 rounded-full transition-all duration-200 ${
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{ backgroundColor: item.color }}
            />
          </button>
        );
      })}
    </nav>
  );
}
