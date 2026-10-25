import React, { useState, useRef } from 'react';
import { sound } from '../../utils/audio';

export default function HoldButton({
  onConfirm = () => {},
  duration = 800,
  label = 'Mantén presionado para confirmar',
  confirmLabel = '¡Confirmado!',
  color = '#26890C',
  disabled = false,
  className = ''
}) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const startHold = () => {
    if (disabled || confirmed) return;
    setIsHolding(true);
    sound.playClick();
    startTimeRef.current = performance.now();

    const update = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (pct < 100) {
        timerRef.current = requestAnimationFrame(update);
      } else {
        setConfirmed(true);
        setIsHolding(false);
        sound.playFanfare();
        onConfirm();
      }
    };

    timerRef.current = requestAnimationFrame(update);
  };

  const cancelHold = () => {
    if (confirmed) return;
    setIsHolding(false);
    setProgress(0);
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
    }
  };

  return (
    <button
      type="button"
      id="hold-confirm-button"
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      disabled={disabled}
      className={`relative overflow-hidden rounded-xl px-6 py-3 font-semibold text-white transition-all select-none border border-white/20 active:scale-98 ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-white/40'
      } ${className}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      {/* Fluid progress background */}
      <div
        className="absolute inset-0 transition-all pointer-events-none"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
          opacity: 0.85
        }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2 text-sm tracking-wide">
        {confirmed ? confirmLabel : label}
        {isHolding && !confirmed && (
          <span className="font-mono text-xs opacity-80">({Math.round(progress)}%)</span>
        )}
      </span>
    </button>
  );
}
