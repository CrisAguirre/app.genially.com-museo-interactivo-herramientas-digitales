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
      className={`museum-dock-nav ${className}`}
    >
      {items.map((item, idx) => {
        const isActive = activeId === item.id;
        const isHovered = hoveredIdx === idx;

        let scale = 1;
        if (isHovered) scale = 1.15;

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
            className="dock-item-btn"
            style={{
              transform: `scale(${scale}) translateY(${isHovered ? '-3px' : '0px'})`,
              transformOrigin: 'bottom center'
            }}
          >
            {/* Tooltip */}
            <div className="dock-tooltip">
              {item.title}
            </div>

            {/* Icon Box */}
            <div className={`dock-icon-box ${isActive ? 'active' : ''}`}>
              {item.number === '0' ? '🏛️' : `S${item.number}`}
            </div>

            {/* Active Dot Indicator */}
            <div
              style={{
                width: '4px',
                height: '4px',
                marginTop: '4px',
                borderRadius: '50%',
                backgroundColor: item.color || 'var(--accent-cyan)',
                opacity: isActive ? 1 : 0,
                boxShadow: isActive ? `0 0 8px ${item.color || 'var(--accent-cyan)'}` : 'none',
                transition: 'all 0.2s ease'
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
