import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, CheckCircle2, XCircle, RotateCcw, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { SALA3_DATA } from '../data/museumData';
import BackgroundParticles from './reactbits/BackgroundParticles';
import ExhibitModal from './ExhibitModal';

export default function Sala3({ onNavigate = () => {} }) {
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  // RED #15 Activity State: Decisiones en video
  const [activePointIdx, setActivePointIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState(null);
  const [answeredPoints, setAnsweredPoints] = useState([null, null, null]);

  const points = SALA3_DATA.videoDecisionPoints;
  const currentPoint = points[activePointIdx];

  const handleSelectDecision = (idx, opt) => {
    sound.playClick();
    setSelectedOptIdx(idx);
    const updated = [...answeredPoints];
    updated[activePointIdx] = opt.isCorrect;
    setAnsweredPoints(updated);

    if (opt.isCorrect) {
      sound.playCorrect();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextPoint = () => {
    sound.playClick();
    setSelectedOptIdx(null);
    if (activePointIdx + 1 < points.length) {
      setActivePointIdx((i) => i + 1);
    }
  };

  const handleResetPoints = () => {
    sound.playClick();
    setActivePointIdx(0);
    setSelectedOptIdx(null);
    setAnsweredPoints([null, null, null]);
  };

  const exhibitIcons = ['📹', '🧩', '❓', '🔢'];

  return (
    <div className="relative min-h-[calc(100vh-70px)] pb-28 pt-8">
      {/* Background Particles with Blue Tint */}
      <BackgroundParticles particleCount={60} particleColor="rgba(46, 134, 222, 0.4)" lineColor="rgba(46, 134, 222, 0.1)" />

      <div className="container relative z-10">
        {/* Top Room Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala2');
            }}
            className="btn-secondary text-xs"
          >
            <ArrowLeft size={14} /> Pabellón 02: Presentaciones & Gamificación
          </button>

          <div className="text-right">
            <span className="text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider block">
              Pabellón 03 • Edpuzzle / H5P / Nearpod
            </span>
            <span className="text-xs text-slate-400">
              Video Educativo & Análisis Crítico
            </span>
          </div>
        </div>

        {/* Room Header & Concept */}
        <div className="max-w-2xl mb-10 text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            VIDEO EDUCATIVO INTERACTIVO
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Evaluación formativa durante el visionado audiovisual: detección de sesgos cognitivos, silogismos aristotélicos y toma de decisiones en momentos clave.
          </p>
        </div>

        {/* 4 Exhibit Pedestals (RED 11 to 14) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-200 uppercase tracking-wider font-mono text-xs">
              Colección de Recursos Educativos Digitales (RED 11 al 14)
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Haz clic en cualquier exhibición para examinar detalles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SALA3_DATA.redItems.slice(0, 4).map((red, idx) => (
              <div
                key={red.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibit(red);
                }}
                className="exhibit-card group"
                style={{ '--card-accent': 'var(--accent-blue)' }}
              >
                <div>
                  <div className="text-2xl mb-3">{exhibitIcons[idx]}</div>
                  <span className="text-[11px] font-mono text-blue-400 block mb-1">
                    RED 0{idx + 11}
                  </span>
                  <h3 className="text-sm font-bold text-white font-display group-hover:text-blue-300 transition-colors leading-snug">
                    {red.title.replace(/^RED #\d+:\s*/, '')}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] truncate max-w-[130px]">{red.formato.split('(')[0]}</span>
                  <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <Eye size={13} /> Ver
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Central Hands-On Station: RED #15 Activity */}
        <div className="gallery-stage mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] mb-6 gap-3">
            <div>
              <div className="meta-pill text-blue-300 border-blue-500/30 text-[11px] mb-1.5">
                RED #15 • ACTIVIDAD INTERACTIVA DEL VISITANTE
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Simulador Edpuzzle: Decisiones Lógicas en Momentos Clave
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                La secuencia audiovisual se detiene en 3 marcas de tiempo. Evalúa el dilema lógico presentado para continuar.
              </p>
            </div>

            <button
              onClick={handleResetPoints}
              className="btn-secondary text-xs self-start sm:self-center"
            >
              <RotateCcw size={13} /> Reiniciar Video
            </button>
          </div>

          {/* Timeline & Active Decision Card */}
          <div className="space-y-4">
            {/* Timeline Progress */}
            <div className="p-4 rounded-xl bg-surface border border-subtle">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>Punto de Decisión {activePointIdx + 1} de 3</span>
                <span className="text-blue-400">{currentPoint.timestamp}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${((activePointIdx + 1) / points.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-300 mt-3 font-medium">
                "{currentPoint.scenario}"
              </p>
            </div>

            {/* Question & Options */}
            <div className="p-5 rounded-2xl bg-surface border border-subtle text-left">
              <h3 className="text-sm sm:text-base font-bold text-white font-display mb-3">
                {currentPoint.question}
              </h3>

              <div className="space-y-2">
                {currentPoint.options.map((opt, idx) => {
                  const isSelected = selectedOptIdx === idx;
                  const isEvaluated = answeredPoints[activePointIdx] !== null;

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isEvaluated}
                      onClick={() => handleSelectDecision(idx, opt)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                        isEvaluated && opt.isCorrect
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                          : isEvaluated && isSelected && !opt.isCorrect
                          ? 'bg-rose-500/15 border-rose-500/40 text-rose-200'
                          : 'bg-white/[0.03] border-white/10 hover:border-blue-400/30 text-slate-200'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isEvaluated && opt.isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                      {isEvaluated && isSelected && !opt.isCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {selectedOptIdx !== null && (
                <div className="mt-4 p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 animate-fadeIn">
                  <span className="font-bold text-blue-300 block mb-1">Fundamentación:</span>
                  <p>{currentPoint.options[selectedOptIdx].feedback}</p>

                  {activePointIdx + 1 < points.length && (
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={handleNextPoint}
                        className="btn-primary text-xs"
                        style={{ background: 'var(--accent-blue)', color: '#FFF' }}
                      >
                        Continuar al siguiente punto ➔
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Room Navigation Footer */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala2');
            }}
            className="btn-secondary"
          >
            <ArrowLeft size={14} /> Pabellón 02: Presentaciones & Gamificación
          </button>

          <button
            onClick={() => {
              sound.playFanfare();
              onNavigate('sala4');
            }}
            className="btn-primary"
            style={{ background: 'var(--accent-emerald)', color: '#000' }}
          >
            <span>Pabellón 04: Blogs & Reto Culminante</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Exhibit Inspection Modal */}
      <ExhibitModal
        exhibit={selectedExhibit}
        onClose={() => setSelectedExhibit(null)}
      />
    </div>
  );
}
