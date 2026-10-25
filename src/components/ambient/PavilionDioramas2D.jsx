import React from 'react';

// ==========================================
// 2D DIORAMA: SALA 1 (ORGANIZADORES GRÁFICOS)
// Algorithmic Flowchart, Decision Diamonds, Mind Map Nodes
// ==========================================
export function DioramaSala1() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '180px', position: 'relative' }}>
      <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <linearGradient id="cyanLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0088FF" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow1" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Blueprint Grid */}
        <line x1="20" y1="30" x2="380" y2="30" stroke="rgba(0, 229, 255, 0.08)" strokeDasharray="4 4" />
        <line x1="20" y1="100" x2="380" y2="100" stroke="rgba(0, 229, 255, 0.08)" strokeDasharray="4 4" />
        <line x1="20" y1="170" x2="380" y2="170" stroke="rgba(0, 229, 255, 0.08)" strokeDasharray="4 4" />

        {/* Connecting Flow Lines */}
        <path d="M 60 100 L 130 100" stroke="url(#cyanLine)" strokeWidth="2.5" />
        <path d="M 210 100 L 260 100" stroke="url(#cyanLine)" strokeWidth="2.5" />
        <path d="M 170 60 L 170 35 L 290 35 L 290 80" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M 170 140 L 170 165 L 290 165 L 290 120" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M 330 100 L 370 100" stroke="url(#cyanLine)" strokeWidth="2.5" />

        {/* Animated Flow Packets */}
        <circle r="3.5" fill="#00E5FF" filter="url(#glow1)">
          <animateMotion path="M 60 100 L 130 100 L 210 100 L 260 100 L 370 100" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="2.5" fill="#00F5A0">
          <animateMotion path="M 170 60 L 170 35 L 290 35 L 290 80" dur="2.5s" repeatCount="indefinite" />
        </circle>

        {/* Node 1: Start Capsule */}
        <rect x="20" y="85" width="45" height="30" rx="15" fill="#0C1A2E" stroke="#00E5FF" strokeWidth="2" />
        <text x="42.5" y="103" textAnchor="middle" fill="#00E5FF" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">INICIO</text>

        {/* Node 2: Decision Diamond */}
        <polygon points="170,60 210,100 170,140 130,100" fill="#0F243E" stroke="#00E5FF" strokeWidth="2" filter="url(#glow1)" />
        <text x="170" y="98" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">¿CONDICIÓN?</text>
        <text x="170" y="109" textAnchor="middle" fill="#00E5FF" fontSize="7" fontFamily="var(--font-mono)">P ∧ Q</text>

        {/* Branch Tags */}
        <text x="175" y="48" fill="#00F5A0" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">V (Si)</text>
        <text x="175" y="158" fill="#FF2A6D" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">F (No)</text>

        {/* Node 3: Process Box */}
        <rect x="260" y="82" width="70" height="36" rx="8" fill="#0C1A2E" stroke="#0088FF" strokeWidth="1.8" />
        <text x="295" y="98" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontFamily="var(--font-display)" fontWeight="700">ALGORITMO</text>
        <text x="295" y="109" textAnchor="middle" fill="#94A3B8" fontSize="7.5" fontFamily="var(--font-mono)">Paso a Paso</text>

        {/* Node 4: End Target */}
        <circle cx="370" cy="100" r="14" fill="#0C1A2E" stroke="#00F5A0" strokeWidth="2" />
        <text x="370" y="104" textAnchor="middle" fill="#00F5A0" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">FIN</text>
      </svg>
    </div>
  );
}

// ==========================================
// 2D DIORAMA: SALA 2 (GAMIFICACIÓN & PARADOJAS)
// Cybernetic Vault, Combination Lock, Monty Hall Doors
// ==========================================
export function DioramaSala2() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '180px', position: 'relative' }}>
      <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Cyber Vault Radar Ring */}
        <circle cx="100" cy="100" r="65" fill="#150E1E" stroke="rgba(255, 42, 109, 0.25)" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="#FF2A6D" strokeWidth="2" strokeDasharray="8 6" filter="url(#glow2)">
          <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="15s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="100" r="32" fill="#240A1A" stroke="rgba(255, 42, 109, 0.5)" strokeWidth="1.5" />
        <text x="100" y="105" textAnchor="middle" fill="#FF2A6D" fontSize="18">🔒</text>
        <text x="100" y="142" textAnchor="middle" fill="#FF2A6D" fontSize="7.5" fontFamily="var(--font-mono)" fontWeight="700">CANDADO #02</text>

        {/* Monty Hall 3 Doors Representation */}
        <g transform="translate(190, 45)">
          {/* Door 1 */}
          <rect x="0" y="0" width="50" height="90" rx="8" fill="#141926" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <circle cx="12" cy="45" r="3" fill="#FF2A6D" />
          <text x="25" y="30" textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="var(--font-mono)" fontWeight="700">01</text>
          <text x="25" y="70" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="var(--font-mono)">1/3</text>

          {/* Door 2 (Selected) */}
          <rect x="65" y="0" width="50" height="90" rx="8" fill="#2A0B1A" stroke="#FF2A6D" strokeWidth="2" filter="url(#glow2)" />
          <circle cx="77" cy="45" r="3" fill="#FF2A6D" />
          <text x="90" y="30" textAnchor="middle" fill="#FF2A6D" fontSize="12" fontFamily="var(--font-mono)" fontWeight="700">02</text>
          <text x="90" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">CAMBIAR</text>
          <text x="90" y="78" textAnchor="middle" fill="#00F5A0" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">2/3</text>

          {/* Door 3 */}
          <rect x="130" y="0" width="50" height="90" rx="8" fill="#141926" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <circle cx="142" cy="45" r="3" fill="#FF2A6D" />
          <text x="155" y="30" textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="var(--font-mono)" fontWeight="700">03</text>
          <text x="155" y="70" textAnchor="middle" fill="#64748B" fontSize="8" fontFamily="var(--font-mono)">1/3</text>

          <text x="90" y="112" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontFamily="var(--font-display)" fontWeight="700">PARADOJA DE MONTY HALL</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 2D DIORAMA: SALA 3 (VIDEO INTERACTIVO)
// Projector Light, Film Reels, Audio Waveforms
// ==========================================
export function DioramaSala3() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '180px', position: 'relative' }}>
      <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#05D9E8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#05D9E8" stopOpacity="0.02" />
          </linearGradient>
          <filter id="glow3" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Film Projector Unit */}
        <g transform="translate(30, 60)">
          {/* Main Projector Body */}
          <rect x="20" y="25" width="60" height="45" rx="6" fill="#0C1E2B" stroke="#05D9E8" strokeWidth="1.5" />
          <polygon points="80,38 105,30 105,65 80,58" fill="#0C1E2B" stroke="#05D9E8" strokeWidth="1.5" />

          {/* Dual Rotating Reels */}
          <circle cx="35" cy="15" r="16" fill="#06121D" stroke="#05D9E8" strokeWidth="1.5" strokeDasharray="5 3">
            <animateTransform attributeName="transform" type="rotate" from="0 35 15" to="360 35 15" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="65" cy="15" r="16" fill="#06121D" stroke="#05D9E8" strokeWidth="1.5" strokeDasharray="5 3">
            <animateTransform attributeName="transform" type="rotate" from="360 65 15" to="0 65 15" dur="4s" repeatCount="indefinite" />
          </circle>

          {/* Light Beam Cone */}
          <polygon points="105,47 280,10 280,100" fill="url(#beamGrad)" />
        </g>

        {/* Projection Screen on Right */}
        <g transform="translate(230, 45)">
          <rect x="0" y="0" width="140" height="90" rx="10" fill="#081420" stroke="#05D9E8" strokeWidth="2" filter="url(#glow3)" />
          
          {/* Video Playhead Timeline */}
          <line x1="15" y1="72" x2="125" y2="72" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
          <line x1="15" y1="72" x2="70" y2="72" stroke="#05D9E8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="72" r="5" fill="#FFFFFF" />

          {/* Decision Node Marker at 02:15 */}
          <polygon points="70,55 77,65 63,65" fill="#FFB800" />
          <text x="70" y="50" textAnchor="middle" fill="#FFB800" fontSize="7" fontFamily="var(--font-mono)" fontWeight="700">DECISIÓN</text>

          {/* Dynamic Audio Waveform Equalizer Bars */}
          {[15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125].map((x, i) => (
            <rect
              key={i}
              x={x - 2}
              y={35 - (i % 3) * 6}
              width="4"
              height={14 + (i % 4) * 5}
              rx="2"
              fill="#05D9E8"
              opacity="0.8"
            >
              <animate
                attributeName="height"
                values="10;25;12;28;10"
                dur={`${1.2 + (i % 3) * 0.3}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}
          <text x="70" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">SESGOS COGNITIVOS (H5P)</text>
        </g>
      </svg>
    </div>
  );
}

// ==========================================
// 2D DIORAMA: SALA 4 (BLOGS, METACOGNICIÓN & RETO)
// Neural Knowledge Brain, Golden Challenge Trophy
// ==========================================
export function DioramaSala4() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '180px', position: 'relative' }}>
      <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <filter id="glow4" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Neural Network Node Matrix */}
        <g stroke="rgba(0, 245, 160, 0.25)" strokeWidth="1.2">
          <line x1="80" y1="60" x2="130" y2="40" />
          <line x1="80" y1="60" x2="100" y2="100" />
          <line x1="130" y1="40" x2="170" y2="70" />
          <line x1="100" y1="100" x2="150" y2="120" />
          <line x1="170" y1="70" x2="150" y2="120" />
          <line x1="170" y1="70" x2="230" y2="100" />
        </g>

        {/* Neural Nodes */}
        {[
          { x: 80, y: 60, label: 'Lógica' },
          { x: 130, y: 40, label: 'IA' },
          { x: 100, y: 100, label: 'Ética' },
          { x: 170, y: 70, label: 'Metacognición' },
          { x: 150, y: 120, label: 'Bitácora' }
        ].map((node, i) => (
          <g key={i}>
            <circle cx={node.x} cy={node.y} r="8" fill="#0C2018" stroke="#00F5A0" strokeWidth="1.8" filter="url(#glow4)">
              <animate attributeName="r" values="7;9;7" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <text x={node.x} y={node.y + 16} textAnchor="middle" fill="#94A3B8" fontSize="7.5" fontFamily="var(--font-mono)">
              {node.label}
            </text>
          </g>
        ))}

        {/* Golden Trophy Challenge Portal on the Right */}
        <g transform="translate(250, 45)">
          <circle cx="65" cy="50" r="48" fill="#1C1808" stroke="#FFB800" strokeWidth="2" strokeDasharray="6 4" filter="url(#glow4)">
            <animateTransform attributeName="transform" type="rotate" from="0 65 50" to="360 65 50" dur="18s" repeatCount="indefinite" />
          </circle>
          <circle cx="65" cy="50" r="34" fill="#2E240A" stroke="#FFB800" strokeWidth="1.5" />
          <text x="65" y="46" textAnchor="middle" fontSize="22">🏆</text>
          <text x="65" y="68" textAnchor="middle" fill="#FFB800" fontSize="8" fontFamily="var(--font-mono)" fontWeight="700">EL RETO</text>
          <text x="65" y="112" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="var(--font-display)" fontWeight="700">EVALUACIÓN & CERTIFICADO</text>
        </g>
      </svg>
    </div>
  );
}
