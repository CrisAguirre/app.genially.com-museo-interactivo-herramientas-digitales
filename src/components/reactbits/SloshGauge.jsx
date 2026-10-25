import React from 'react';

export default function SloshGauge({
  value = 0, // 0 - 100
  max = 100,
  label = 'Nivel',
  color = '#26890C',
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Tank Container */}
      <div className="relative w-24 h-40 rounded-3xl p-1.5 border-2 border-white/20 bg-black/40 backdrop-blur-md shadow-inner overflow-hidden">
        {/* Fill level */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-2xl transition-all duration-700 ease-out"
          style={{
            height: `${percentage}%`,
            backgroundColor: color,
            boxShadow: `0 0 24px ${color}`
          }}
        >
          {/* Surface wave */}
          <div
            className="absolute -top-2 left-0 right-0 h-4 opacity-75"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.7), transparent 70%)`
            }}
          />
        </div>

        {/* Level Measurement Lines */}
        <div className="absolute inset-y-2 right-2 flex flex-col justify-between pointer-events-none opacity-40 text-[9px] font-mono text-white">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
          <span>0</span>
        </div>

        {/* Gloss overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
      </div>

      <div className="mt-2 text-center">
        <div className="text-xs font-semibold text-white/70 uppercase tracking-wider">{label}</div>
        <div className="text-sm font-bold font-mono text-white">{Math.round(percentage)}%</div>
      </div>
    </div>
  );
}
