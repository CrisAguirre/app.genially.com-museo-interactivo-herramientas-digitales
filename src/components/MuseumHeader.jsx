import React, { useState } from 'react';
import { Volume2, VolumeX, Award } from 'lucide-react';
import { sound } from '../utils/audio';

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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#07090E]/85 border-b border-white/[0.08] px-4 py-3 transition-colors duration-300">
      <div className="container flex items-center justify-between">
        {/* Museum Logo & Identity */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => {
            sound.playClick();
            onNavigate('lobby');
          }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-base text-black shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs tracking-wider uppercase text-white font-display">
                MUSEO VIRTUAL
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-white/5 text-slate-400 border border-white/10">
                GENIALLY RED
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Pensamiento Lógico & Resolución de Problemas
            </div>
          </div>
        </div>

        {/* Current Location Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: currentRoom.color }}
          />
          <span className="text-slate-400">Ubicación:</span>
          <span className="font-semibold text-white">
            {currentRoom.number === '0' ? 'Lobby Principal' : `Pabellón ${currentRoom.number}: ${currentRoom.title}`}
          </span>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {quizCompleted && (
            <button
              onClick={() => {
                sound.playFanfare();
                onOpenCertificate();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-400 text-black hover:bg-amber-300 transition-all shadow-sm"
            >
              <Award size={14} />
              <span>Certificado</span>
            </button>
          )}

          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}
