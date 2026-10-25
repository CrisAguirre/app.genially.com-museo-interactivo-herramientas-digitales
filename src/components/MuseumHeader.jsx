import React, { useState } from 'react';
import { Volume2, VolumeX, Award } from 'lucide-react';
import { sound } from '../utils/audio';
import { INSTITUCION } from '../data/museumData';

export default function MuseumHeader({
  currentRoomId = 'lobby',
  rooms = [],
  visitedRooms = new Set(),
  onNavigate = () => {},
  onOpenCertificate = () => {},
  quizCompleted = false,
  score = 0
}) {
  const [isMuted, setIsMuted] = useState(sound.muted);

  const currentRoom = rooms.find((r) => r.id === currentRoomId) || rooms[0];

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.playClick();
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        backgroundColor: 'rgba(5, 7, 11, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0.5rem 1rem'
      }}
    >
      {/* Top row: Logo + Location + Actions */}
      <div className="container flex items-center justify-between">
        {/* Museum Logo & Identity */}
        <div
          onClick={() => {
            sound.playClick();
            onNavigate('lobby');
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #00E5FF 0%, #0077FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.35)'
            }}
          >
            🏛️
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  color: '#FFFFFF'
                }}
              >
                MUSEO INTERACTIVO
              </span>
              <span
                style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: 'var(--accent-cyan)',
                  border: '1px solid rgba(0, 229, 255, 0.3)'
                }}
              >
                GENIALLY RED
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>
              Herramientas Digitales y Didáctica
            </div>
          </div>
        </div>

        {/* Current Location Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '12px'
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: currentRoom.color || 'var(--accent-cyan)',
              boxShadow: `0 0 8px ${currentRoom.color || 'var(--accent-cyan)'}`
            }}
          />
          <span style={{ color: '#94A3B8' }}>Ubicación:</span>
          <span style={{ fontWeight: 600, color: '#FFFFFF' }}>
            {currentRoom.number === '0'
              ? 'Lobby Principal'
              : `Pabellón 0${currentRoom.number}: ${currentRoom.title}`}
          </span>
        </div>

        {/* Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {quizCompleted && (
            <button
              onClick={() => {
                sound.playFanfare();
                onOpenCertificate();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                backgroundColor: 'var(--accent-amber)',
                color: '#000000',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(255, 184, 0, 0.4)'
              }}
            >
              <Award size={14} />
              <span>Certificado</span>
            </button>
          )}

          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: isMuted ? '#64748B' : 'var(--accent-cyan)',
              cursor: 'pointer'
            }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
