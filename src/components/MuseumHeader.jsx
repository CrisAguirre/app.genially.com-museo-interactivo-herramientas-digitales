import React, { useState } from 'react';
import { Volume2, VolumeX, Award } from 'lucide-react';
import { sound } from '../utils/audio';
import ShinyText from './reactbits/ShinyText';
import DecryptedText from './reactbits/DecryptedText';

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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090714]/85 border-b border-white/10 px-4 py-3 transition-colors duration-300">
      <div className="container flex items-center justify-between">
        {/* Brand & Museum Title */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            sound.playClick();
            onNavigate('lobby');
          }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#46178F] to-[#00C4CC] flex items-center justify-center font-black text-xl text-white shadow-[0_0_15px_rgba(0,196,204,0.4)] group-hover:scale-105 transition-transform">
            🧠
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase text-white font-display">
                MUSEO INTERACTIVO
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                RED TIC
              </span>
            </div>
            <div className="text-[11px] text-white/60 flex items-center gap-1">
              <ShinyText text="Pensamiento Lógico & Resolución de Problemas" speed={3} />
            </div>
          </div>
        </div>

        {/* Current Room Badge */}
        <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: currentRoom.color }}
          />
          <span className="text-white/60">Ubicación:</span>
          <span className="font-bold text-white flex items-center gap-1">
            {currentRoom.number === '0' ? '🏛️ Lobby' : `Sala ${currentRoom.number}:`}
            <DecryptedText text={currentRoom.title} speed={30} animateOn="hover" />
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Certificate Action */}
          {quizCompleted && (
            <button
              onClick={() => {
                sound.playFanfare();
                onOpenCertificate();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 hover:bg-amber-400/30 transition-all hover:scale-105"
            >
              <Award size={15} />
              <span>Mi Certificado</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}
