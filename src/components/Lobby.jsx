import React, { useState } from 'react';
import { Sparkles, ArrowRight, Compass, Network, Gamepad2, Video, Trophy, BookOpen, CheckCircle2, FileText, Users, Target } from 'lucide-react';
import { sound } from '../utils/audio';
import { FICHA_TECNICA } from '../data/museumData';
import BackgroundGalaxy from './reactbits/BackgroundGalaxy';
import DecryptedText from './reactbits/DecryptedText';
import ShinyText from './reactbits/ShinyText';
import SpotlightCard from './reactbits/SpotlightCard';
import PulseHeart from './reactbits/PulseHeart';

export default function Lobby({
  rooms = [],
  onNavigate = () => {},
  visitedRooms = new Set()
}) {
  const [showFichaModal, setShowFichaModal] = useState(false);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Network': return <Network size={22} />;
      case 'Gamepad2': return <Gamepad2 size={22} />;
      case 'Video': return <Video size={22} />;
      case 'Trophy': return <Trophy size={22} />;
      default: return <BookOpen size={22} />;
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] pb-32 pt-8">
      {/* ReactBits Galaxy Background */}
      <BackgroundGalaxy speed={0.8} starCount={220} />

      <div className="container relative z-10 flex flex-col items-center text-center">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <div className="badge-pill border-purple-500/40 bg-purple-500/10 text-purple-300">
            <Sparkles size={14} className="animate-spin text-purple-400" />
            <span>Genially • Lienzo Virtual Unificado</span>
          </div>
          <div className="badge-pill border-blue-500/40 bg-blue-500/10 text-blue-300">
            <span>Población: Grados 6.° a 11.°</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl font-display uppercase leading-tight">
          MUSEO INTERACTIVO:{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-rose-400 to-amber-300">
            PENSAMIENTO LÓGICO
          </span>
          <br />
          <span className="text-2xl sm:text-3xl lg:text-4xl text-white/90 font-bold block mt-1 font-body">
            Y Resolución de Problemas
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
          Exposición didáctica virtual diseñada para potenciar el razonamiento deductivo, la identificación de patrones y los algoritmos mediante{' '}
          <ShinyText text="Recursos Educativos Digitales (RED)" speed={3} className="font-bold text-cyan-300" />.
        </p>

        {/* Action Buttons & Ficha Técnica */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            id="start-tour-btn"
            onClick={() => {
              sound.playFanfare();
              onNavigate('sala1');
            }}
            className="btn-primary text-sm px-7 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-[0_0_35px_rgba(0,196,204,0.4)]"
            style={{
              background: 'linear-gradient(135deg, #00C4CC 0%, #008f95 100%)',
              color: '#000000',
              fontWeight: 800
            }}
          >
            <Compass size={18} className="animate-spin" />
            <span>Iniciar Recorrido: Sala 1</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setShowFichaModal(true);
            }}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-all hover:scale-105"
          >
            <FileText size={16} className="text-cyan-400" />
            <span>Ver Ficha Técnica & Entregables</span>
          </button>

          <PulseHeart initialLikes={324} />
        </div>

        {/* Structure Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 w-full max-w-3xl">
          <div className="glass-panel p-3.5 text-center border-cyan-500/20">
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">4 Salas</div>
            <div className="text-[11px] text-white/60">Navegación No Lineal</div>
          </div>
          <div className="glass-panel p-3.5 text-center border-rose-500/20">
            <div className="text-xl sm:text-2xl font-black text-rose-400 font-mono">20+ RED</div>
            <div className="text-[11px] text-white/60">5 REDs por Sala</div>
          </div>
          <div className="glass-panel p-3.5 text-center border-blue-500/20">
            <div className="text-xl sm:text-2xl font-black text-blue-400 font-mono">4 Actividades</div>
            <div className="text-[11px] text-white/60">Sujeto Activo</div>
          </div>
          <div className="glass-panel p-3.5 text-center border-emerald-500/20">
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">Reto + Voto</div>
            <div className="text-[11px] text-white/60">Certificado Oficial</div>
          </div>
        </div>

        {/* 4 Interactive Room Portal Cards */}
        <div className="mt-14 w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="text-left">
              <h2 className="text-2xl font-extrabold text-white font-display">
                Salas Temáticas de la Exposición
              </h2>
              <p className="text-xs text-white/50">
                Basadas en el programa oficial: cada una articula 1 herramienta TIC, 5 REDs propios y 1 actividad interactiva
              </p>
            </div>
            <div className="text-xs font-mono text-white/50">
              Salas exploradas: {visitedRooms.size - (visitedRooms.has('lobby') ? 1 : 0)} / 4
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            {rooms
              .filter((r) => r.id !== 'lobby')
              .map((room) => {
                const isVisited = visitedRooms.has(room.id);

                return (
                  <SpotlightCard
                    key={room.id}
                    spotlightColor={`${room.color}40`}
                    borderColor="rgba(255, 255, 255, 0.12)"
                    className="p-6 cursor-pointer bg-gradient-to-br from-[#15102a]/80 to-[#0a0717]/90 hover:scale-[1.01] transition-transform"
                  >
                    <div
                      onClick={() => {
                        sound.playClick();
                        onNavigate(room.id);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                            style={{
                              backgroundColor: room.color,
                              boxShadow: `0 0 20px ${room.color}60`
                            }}
                          >
                            {getIcon(room.icon)}
                          </div>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider font-mono opacity-90" style={{ color: room.color }}>
                              Sala {room.number} • {room.subtitle}
                            </span>
                            <h3 className="text-xl font-bold text-white font-display">
                              <DecryptedText text={room.title} speed={25} animateOn="hover" />
                            </h3>
                          </div>
                        </div>

                        {isVisited ? (
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                            <CheckCircle2 size={13} />
                            <span>Explorada</span>
                          </div>
                        ) : (
                          <div className="text-[11px] font-semibold text-white/40 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                            Por Explorar
                          </div>
                        )}
                      </div>

                      <p className="mt-3 text-xs text-white/70 line-clamp-2 leading-relaxed">
                        {room.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                        <span className="text-white/40 font-mono">
                          {room.id === 'sala1' && '🎮 Actividad: Clasificador de Algoritmo'}
                          {room.id === 'sala2' && '🎮 Actividad: Escape Room (3 Acertijos)'}
                          {room.id === 'sala3' && '🎮 Actividad: Decisiones en Vídeo Clave'}
                          {room.id === 'sala4' && '🏆 Reto Quiz 5 Preguntas + Votación'}
                        </span>
                        <span
                          className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                          style={{ color: room.color }}
                        >
                          Entrar a la sala <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
          </div>
        </div>
      </div>

      {/* Ficha Técnica Modal */}
      {showFichaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#120F1D] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-left shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText size={20} className="text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-display">
                  Ficha Técnica & Condiciones del Museo
                </h3>
              </div>
              <button
                onClick={() => setShowFichaModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="font-mono text-cyan-400 font-bold uppercase text-[10px]">TEMA CENTRAL</div>
                <div className="text-sm font-bold text-white mt-0.5">{FICHA_TECNICA.temaCentral}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-mono text-white/50 text-[10px]">POBLACIÓN DESTINATARIA</div>
                  <div className="font-semibold text-white mt-0.5">{FICHA_TECNICA.poblacion}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="font-mono text-white/50 text-[10px]">PLATAFORMA UNIFICADA</div>
                  <div className="font-semibold text-white mt-0.5">{FICHA_TECNICA.plataforma}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                <div className="font-mono text-cyan-300 font-bold uppercase text-[10px]">OBJETIVO Y ENFOQUE PEDAGÓGICO</div>
                <p className="text-white/90 mt-1 leading-relaxed">{FICHA_TECNICA.objetivoPedagogico}</p>
                <p className="text-white/70 mt-1">{FICHA_TECNICA.enfoque}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="font-mono text-amber-400 font-bold uppercase text-[10px] mb-1.5">PRODUCTOS A ENTREGAR (APA v7)</div>
                <ul className="space-y-1 text-white/80 list-disc list-inside">
                  <li>Enlace público del museo interactivo.</li>
                  <li>Ficha descriptiva formal con objetivo pedagógico y población.</li>
                  <li>Informe académico con hoja de presentación, introducción, desglose de REDs, conclusiones y referencias bajo norma APA v7.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowFichaModal(false)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
