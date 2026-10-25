import React, { useState } from 'react';
import { sound } from '../../utils/audio';
import { Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export default function MuseumRotundaMap2D({
  onNavigate = () => {},
  visitedRooms = new Set()
}) {
  const [hoveredWing, setHoveredWing] = useState(null);

  const wings = [
    {
      id: 'sala1',
      title: 'Pabellón 01',
      name: 'Organizadores Gráficos',
      tools: 'Padlet • Canva • MindMeister',
      color: '#00E5FF',
      glow: 'rgba(0, 229, 255, 0.4)',
      coords: { x: 130, y: 110 },
      cx: 130,
      cy: 110,
      icon: '🧠',
      path: 'M 300 250 L 130 110'
    },
    {
      id: 'sala2',
      title: 'Pabellón 02',
      name: 'Presentaciones & Gamificación',
      tools: 'Genially • Prezi • SlideShare',
      color: '#FF2A6D',
      glow: 'rgba(255, 42, 109, 0.4)',
      coords: { x: 470, y: 110 },
      cx: 470,
      cy: 110,
      icon: '🎲',
      path: 'M 300 250 L 470 110'
    },
    {
      id: 'sala3',
      title: 'Pabellón 03',
      name: 'Video Educativo Interactivo',
      tools: 'Edpuzzle • H5P • Nearpod',
      color: '#05D9E8',
      glow: 'rgba(5, 217, 232, 0.4)',
      coords: { x: 130, y: 390 },
      cx: 130,
      cy: 390,
      icon: '🎬',
      path: 'M 300 250 L 130 390'
    },
    {
      id: 'sala4',
      title: 'Pabellón 04',
      name: 'Blogs & Metacognición',
      tools: 'Blogger • WordPress • Wix',
      color: '#00F5A0',
      glow: 'rgba(0, 245, 160, 0.4)',
      coords: { x: 470, y: 390 },
      cx: 470,
      cy: 390,
      icon: '💡',
      path: 'M 300 250 L 470 390'
    }
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '840px',
        margin: '2rem auto 3rem',
        borderRadius: '24px',
        background: 'linear-gradient(180deg, rgba(14, 19, 30, 0.95) 0%, rgba(7, 10, 16, 0.98) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '1.75rem',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 35px -10px rgba(0, 229, 255, 0.1)',
        position: 'relative'
      }}
    >
      {/* Map Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Compass size={18} color="var(--accent-cyan)" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#F8FAFC',
              textTransform: 'uppercase'
            }}
          >
            Plano Arquitectónico Interactivo del Museo (2D)
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
          Haz clic en cualquier pabellón para ingresar
        </span>
      </div>

      {/* 2D Interactive SVG Floorplan */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <svg
          viewBox="0 0 600 500"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))'
          }}
        >
          <defs>
            {/* Ambient Radial glow */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0, 229, 255, 0.25)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Floorplan Background Grid Lines */}
          <pattern id="archGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <rect width="600" height="500" fill="url(#archGrid)" rx="16" />

          {/* Outer Museum Boundary Walls */}
          <rect
            x="40"
            y="30"
            width="520"
            height="440"
            rx="24"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
          />

          {/* Central Connecting Corridor Paths */}
          {wings.map((w) => {
            const isHov = hoveredWing === w.id;
            return (
              <g key={`path-${w.id}`}>
                <path
                  d={w.path}
                  stroke={w.color}
                  strokeWidth={isHov ? 3 : 1.5}
                  strokeOpacity={isHov ? 0.9 : 0.3}
                  strokeDasharray={isHov ? 'none' : '4 4'}
                  filter={isHov ? 'url(#neonGlow)' : 'none'}
                  style={{ transition: 'all 0.3s ease' }}
                />
                {/* Animated pulsing energy packet along corridor */}
                <circle r={isHov ? 4 : 2.5} fill={w.color}>
                  <animateMotion
                    path={w.path}
                    dur={isHov ? '1.5s' : '3s'}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}

          {/* CENTRAL ROTUNDA (LOBBY HUB) */}
          <g>
            {/* Concentric Decorative Rings */}
            <circle cx="300" cy="250" r="85" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <circle cx="300" cy="250" r="65" fill="url(#centerGlow)" />
            <circle
              cx="300"
              cy="250"
              r="60"
              fill="none"
              stroke="rgba(0, 229, 255, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 300 250"
                to="360 300 250"
                dur="20s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Inner Hub Core */}
            <circle
              cx="300"
              cy="250"
              r="40"
              fill="#0F172A"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="2"
            />
            <text
              x="300"
              y="245"
              textAnchor="middle"
              fontSize="20"
              dominantBaseline="middle"
            >
              🏛️
            </text>
            <text
              x="300"
              y="266"
              textAnchor="middle"
              fill="#94A3B8"
              fontSize="9"
              fontFamily="var(--font-mono)"
              fontWeight="700"
              letterSpacing="1"
            >
              LOBBY
            </text>
          </g>

          {/* 4 GRAND PAVILION WINGS */}
          {wings.map((w) => {
            const isHov = hoveredWing === w.id;
            const isVisited = visitedRooms.has(w.id);

            return (
              <g
                key={w.id}
                onClick={() => {
                  sound.playFanfare();
                  onNavigate(w.id);
                }}
                onMouseEnter={() => {
                  sound.playHover();
                  setHoveredWing(w.id);
                }}
                onMouseLeave={() => setHoveredWing(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer Glow Halo on Hover */}
                {isHov && (
                  <rect
                    x={w.cx - 95}
                    y={w.cy - 55}
                    width="190"
                    height="110"
                    rx="18"
                    fill={w.glow}
                    filter="url(#neonGlow)"
                    opacity="0.5"
                  />
                )}

                {/* Pavilion Box */}
                <rect
                  x={w.cx - 90}
                  y={w.cy - 50}
                  width="180"
                  height="100"
                  rx="16"
                  fill={isHov ? '#162032' : '#0F1522'}
                  stroke={isHov ? w.color : 'rgba(255,255,255,0.12)'}
                  strokeWidth={isHov ? 2 : 1}
                  style={{ transition: 'all 0.25s ease' }}
                />

                {/* Top Colored Accent Stripe */}
                <rect
                  x={w.cx - 90}
                  y={w.cy - 50}
                  width="180"
                  height="3"
                  rx="1.5"
                  fill={w.color}
                />

                {/* Pavilion Icon & Number */}
                <text
                  x={w.cx - 70}
                  y={w.cy - 24}
                  fontSize="18"
                  dominantBaseline="middle"
                >
                  {w.icon}
                </text>
                <text
                  x={w.cx - 45}
                  y={w.cy - 25}
                  fill={w.color}
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fontWeight="800"
                  letterSpacing="1"
                >
                  {w.title}
                </text>

                {/* Pavilion Name */}
                <text
                  x={w.cx}
                  y={w.cy + 2}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="11.5"
                  fontWeight="700"
                  fontFamily="var(--font-display)"
                >
                  {w.name}
                </text>

                {/* Subtitle / Tools */}
                <text
                  x={w.cx}
                  y={w.cy + 20}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="8.5"
                  fontFamily="var(--font-mono)"
                >
                  {w.tools}
                </text>

                {/* Status Badge */}
                <rect
                  x={w.cx - 45}
                  y={w.cy + 30}
                  width="90"
                  height="14"
                  rx="7"
                  fill={isVisited ? 'rgba(0, 245, 160, 0.15)' : 'rgba(255, 255, 255, 0.06)'}
                  stroke={isVisited ? 'rgba(0, 245, 160, 0.4)' : 'rgba(255, 255, 255, 0.1)'}
                  strokeWidth="0.8"
                />
                <text
                  x={w.cx}
                  y={w.cy + 38}
                  textAnchor="middle"
                  fill={isVisited ? '#00F5A0' : '#CBD5E1'}
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                  fontWeight="700"
                >
                  {isVisited ? '✓ VISITADA' : 'INGRESAR →'}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Map Footer Info */}
      <div
        style={{
          marginTop: '1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#94A3B8'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)' }} />
            4 Pabellones Temáticos
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-amber)' }} />
            20 Recursos Digitales (RED)
          </span>
        </div>
        <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
          Exploradas: {Math.min(visitedRooms.size, 4)} / 4 Salas
        </span>
      </div>
    </div>
  );
}
