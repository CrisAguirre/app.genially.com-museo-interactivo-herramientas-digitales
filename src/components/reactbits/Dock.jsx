import React, { useState } from 'react';
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
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#0B0E17]/90 backdrop-blur-2xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.75)] ${className}`}
    >
      {items.map((item, idx) => {
        const isActive = activeId === item.id;
        const isHovered = hoveredIdx === idx;
        const isNeighbor =
          hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

        let scale = 1;
        if (isHovered) scale = 1.18;
        else if (isNeighbor) scale = 1.08;

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
            className="group relative flex flex-col items-center justify-center transition-transform duration-200 focus:outline-none"
            style={{
              transform: `scale(${scale}) translateY(${isHovered ? '-4px' : '0px'})`,
              transformOrigin: 'bottom center'
            }}
          >
            {/* Tooltip */}
            <div
              className={`pointer-events-none absolute -top-9 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-150 ${
                isHovered
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-1'
              }`}
              style={{
                backgroundColor: '#1E293B',
                color: '#F8FAFC',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)'
              }}
            >
              {item.title}
            </div>

            {/* Icon Container */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border text-xs font-mono font-bold ${
                isActive
                  ? 'border-white/80 bg-white/15 text-white shadow-sm'
                  : 'border-transparent bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              {item.number === '0' ? '🏛️' : `P${item.number}`}
            </div>

            {/* Active Dot */}
            <div
              className={`w-1 h-1 mt-1 rounded-full transition-all duration-200 ${
                isActive ? 'opacity-100 bg-cyan-400' : 'opacity-0'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
