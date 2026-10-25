import React, { useState } from 'react';
import { ArrowRight, Compass, FileText, CheckCircle2, Layers } from 'lucide-react';
import { sound } from '../utils/audio';
import { FICHA_TECNICA } from '../data/museumData';
import BackgroundGalaxy from './reactbits/BackgroundGalaxy';

export default function Lobby({
  rooms = [],
  onNavigate = () => {},
  visitedRooms = new Set()
}) {
  const [showFichaModal, setShowFichaModal] = useState(false);

  const roomThemes = [
    {
      id: 'sala1',
      num: '01',
      title: 'Organizadores Gráficos',
      subtitle: 'Padlet / Canva / MindMeister',
      concept: 'Estructuración visual del pensamiento deductivo, inductivo y algoritmos de flujo cotidianos.',
      activity: 'Clasificador de Pasos Algorítmicos',
      color: 'var(--accent-cyan)'
    },
    {
      id: 'sala2',
      num: '02',
      title: 'Presentaciones & Gamificación',
      subtitle: 'Genially / Prezi / SlideShare',
      concept: 'Inmersión lúdica en paradojas célebres, árboles de decisión y el método Pólya.',
      activity: 'Escape Room de 3 Candados',
      color: 'var(--accent-crimson)'
    },
    {
      id: 'sala3',
      num: '03',
      title: 'Video Educativo Interactivo',
      subtitle: 'Edpuzzle / H5P / Nearpod',
      concept: 'Análisis crítico audiovisual de sesgos cognitivos, silogismos y secuencias numéricas.',
      activity: 'Bifurcación de Decisiones en Video',
      color: 'var(--accent-blue)'
    },
    {
      id: 'sala4',
      num: '04',
      title: 'Blogs & Metacognición',
      subtitle: 'Blogger / WordPress / Wix',
      concept: 'Lógica formal frente a la IA, bitácoras metacognitivas y foro de dilemas éticos.',
      activity: 'El Reto del Visitante + Votación',
      color: 'var(--accent-emerald)'
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-70px)] pb-24 pt-12">
      {/* Background Subtle Galaxy */}
      <BackgroundGalaxy speed={0.5} starCount={140} nebulaColor="rgba(46, 134, 222, 0.12)" />

      <div className="container relative z-10 flex flex-col items-center text-center">
        {/* Curated Pre-title */}
        <div className="meta-pill mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>LIENZO VIRTUAL GENIALLY • GRADOS 6.° A 11.°</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white max-w-3xl leading-tight font-display tracking-tight">
          PENSAMIENTO LÓGICO
        </h1>
        <p className="text-xl sm:text-2xl text-slate-300 font-light mt-1 max-w-2xl font-body">
          Y Resolución de Problemas en la Era Digital
        </p>

        {/* Subtitle Description */}
        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
          Una exposición virtual interactiva compuesta por 4 pabellones temáticos, 20 Recursos Educativos Digitales y retos didácticos donde el visitante es el protagonista.
        </p>

        {/* Clean Call-to-Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            id="start-tour-btn"
            onClick={() => {
              sound.playFanfare();
              onNavigate('sala1');
            }}
            className="btn-primary"
          >
            <Compass size={17} />
            <span>Comenzar Recorrido</span>
            <ArrowRight size={15} />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setShowFichaModal(true);
            }}
            className="btn-secondary"
          >
            <FileText size={16} className="text-slate-400" />
            <span>Ficha Técnica & Rúbrica</span>
          </button>
        </div>

        {/* 4 Architectural Exhibition Halls */}
        <div className="mt-16 w-full text-left">
          <div className="flex items-end justify-between mb-6 pb-3 border-b border-white/[0.08]">
            <div>
              <h2 className="text-xl font-bold text-white font-display">
                Pabellones de la Exposición
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Acceso no lineal a los 4 entornos pedagógicos del museo
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              {visitedRooms.size - (visitedRooms.has('lobby') ? 1 : 0)} de 4 salas exploradas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roomThemes.map((room) => {
              const isExplored = visitedRooms.has(room.id);

              return (
                <div
                  key={room.id}
                  onClick={() => {
                    sound.playClick();
                    onNavigate(room.id);
                  }}
                  className="exhibit-card"
                  style={{ '--card-accent': room.color }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          {room.num}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {room.subtitle}
                        </span>
                      </div>
                      {isExplored ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <CheckCircle2 size={12} /> Explorada
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono">
                          Disponible
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                      {room.title}
                    </h3>

                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {room.concept}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      🎮 {room.activity}
                    </span>
                    <span className="font-semibold text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Entrar <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ficha Técnica Modal */}
      {showFichaModal && (
        <div className="modal-backdrop" onClick={() => setShowFichaModal(false)}>
          <div
            className="modal-content p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-cyan-400" />
                <h3 className="text-lg font-bold text-white font-display">
                  Ficha Técnica & Condiciones del Museo
                </h3>
              </div>
              <button
                onClick={() => setShowFichaModal(false)}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4 text-xs font-body text-slate-300">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="font-mono text-cyan-400 font-bold uppercase text-[10px]">TEMA CENTRAL</div>
                <div className="text-sm font-bold text-white mt-0.5">{FICHA_TECNICA.temaCentral}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="font-mono text-slate-400 text-[10px]">POBLACIÓN</div>
                  <div className="font-semibold text-white mt-0.5">{FICHA_TECNICA.poblacion}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="font-mono text-slate-400 text-[10px]">LIENZO VIRTUAL</div>
                  <div className="font-semibold text-white mt-0.5">{FICHA_TECNICA.plataforma}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/20">
                <div className="font-mono text-cyan-300 font-bold uppercase text-[10px]">OBJETIVO PEDAGÓGICO</div>
                <p className="text-slate-200 mt-1 leading-relaxed">{FICHA_TECNICA.objetivoPedagogico}</p>
                <p className="text-slate-400 mt-1">{FICHA_TECNICA.enfoque}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="font-mono text-amber-400 font-bold uppercase text-[10px] mb-1">ENTREGABLES (NORMA APA v7)</div>
                <p className="text-slate-300 leading-relaxed">
                  Enlace público del museo, ficha descriptiva formal con objetivo y población, e informe académico con hoja de presentación, introducción, desarrollo de los 20 REDs, conclusiones y referencias bajo APA 7.ª edición.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowFichaModal(false)}
                className="btn-primary text-xs"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
