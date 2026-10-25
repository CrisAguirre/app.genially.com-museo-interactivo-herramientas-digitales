import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Video, Play, Pause, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { SALA3_DATA } from '../data/museumData';
import BackgroundParticles from './reactbits/BackgroundParticles';
import DecryptedText from './reactbits/DecryptedText';
import ShinyText from './reactbits/ShinyText';
import SpotlightCard from './reactbits/SpotlightCard';

export default function Sala3({ onNavigate = () => {} }) {
  // Activity state for RED #15: Decisiones lógicas en momentos clave del vídeo
  const [activePointIdx, setActivePointIdx] = useState(0);
  const [selectedOptIdx, setSelectedOptIdx] = useState(null);
  const [answeredPoints, setAnsweredPoints] = useState([null, null, null]);
  const [isPlayingSim, setIsPlayingSim] = useState(false);

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

  return (
    <div className="relative min-h-[calc(100vh-65px)] pb-32 pt-8">
      {/* Background Particles with Blue Ambience */}
      <BackgroundParticles particleCount={85} particleColor="rgba(19, 104, 206, 0.7)" lineColor="rgba(19, 104, 206, 0.15)" />

      <div className="container relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala2');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={14} /> Sala 2: Presentaciones & Gamificación
          </button>

          <div className="badge-pill border-blue-500/40 bg-blue-500/10 text-blue-300">
            Sala 3 • Video Educativo & Análisis Crítico
          </div>
        </div>

        {/* Room Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-1">
            HERRAMIENTAS: {SALA3_DATA.herramientas}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase">
            VIDEO EDUCATIVO{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
              INTERACTIVO
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/80">
            Evaluación formativa durante el visionado audiovisual:{' '}
            <ShinyText text="Sesgos Cognitivos, Silogismos y Patrones" speed={3} className="font-bold text-blue-300" />
          </p>
        </div>

        {/* Pedagogical Framing Banner */}
        <div className="glass-panel p-5 my-8 border-blue-500/20 bg-blue-500/5">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center text-xl shrink-0 border border-blue-500/30">
              🎬
            </div>
            <div className="text-left flex-1">
              <span className="font-bold text-white text-sm block">Aporte de Edpuzzle y el Video Interactivo:</span>
              <p className="text-white/70 mt-0.5 leading-relaxed">
                Permite convertir la visualización de videos de un acto pasivo a una experiencia metacognitiva, incrustando preguntas de chequeo y retroalimentación inmediata en momentos pedagógicos estratégicos.
              </p>
            </div>
          </div>
        </div>

        {/* REDs Grid: RED 11, RED 12, RED 13, RED 14 */}
        <div className="my-10">
          <h2 className="text-2xl font-black text-white font-display mb-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
            Recursos Educativos Digitales (RED) de la Sala 3
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SALA3_DATA.redItems.slice(0, 4).map((red) => (
              <SpotlightCard
                key={red.id}
                spotlightColor="rgba(19, 104, 206, 0.3)"
                borderColor="rgba(19, 104, 206, 0.25)"
                className="p-6 bg-gradient-to-br from-[#0c182e]/90 to-[#060d19]/95 flex flex-col justify-between"
              >
                <div>
                  <span className="badge-pill border-blue-500/40 bg-blue-500/10 text-blue-300 text-[10px] mb-3">
                    {red.formato}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    {red.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed">
                    {red.descripcion}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-blue-300/80 font-mono">
                  ✦ {red.aportePedagogico}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* =========================================================================
            RED #15: ACTIVIDAD INTERACTIVA PARA EL VISITANTE
            "Actividad: Decisiones lógicas en momentos clave del vídeo"
           ========================================================================= */}
        <div className="my-12">
          <SpotlightCard
            spotlightColor="rgba(19, 104, 206, 0.45)"
            borderColor="rgba(19, 104, 206, 0.5)"
            className="p-6 sm:p-8 bg-gradient-to-b from-[#0e2142]/95 to-[#071124]/98"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 mb-6 gap-2">
              <div>
                <div className="badge-pill border-blue-400/50 bg-blue-400/20 text-blue-200 text-xs font-mono font-bold mb-1">
                  🎮 RED #15 • ACTIVIDAD INTERACTIVA
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                  Simulador Edpuzzle: Decisiones Lógicas en Momentos Clave
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  El reproductor simula un vídeo que se detiene en 3 marcas de tiempo para evaluar tu razonamiento en tiempo real.
                </p>
              </div>

              <button
                onClick={handleResetPoints}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors self-start sm:self-center"
              >
                <RotateCcw size={13} /> Reiniciar Video
              </button>
            </div>

            {/* Simulated Video Player Screen */}
            <div className="rounded-2xl border-2 border-blue-500/40 bg-black/60 p-5 text-left relative overflow-hidden shadow-2xl mb-6">
              {/* Fake Video Screen Content */}
              <div className="h-44 rounded-xl bg-gradient-to-tr from-[#0b162c] to-[#122347] flex flex-col items-center justify-center relative p-4 text-center border border-white/10">
                <span className="text-3xl mb-1">🎬 🧠</span>
                <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest">
                  {currentPoint.timestamp} • {currentPoint.title}
                </span>
                <p className="text-xs text-white/70 mt-1 max-w-md">
                  "{currentPoint.scenario}"
                </p>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/60">
                  <span>Punto Interactivo {activePointIdx + 1} de 3</span>
                  <span className="text-amber-300">⏸️ Video en Pausa de Reflexión</span>
                </div>
              </div>

              {/* Video Timeline Bar with Markers */}
              <div className="mt-4">
                <div className="relative w-full h-2 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${((activePointIdx + 1) / points.length) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-white/50 mt-1">
                  {points.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        sound.playClick();
                        setActivePointIdx(i);
                        setSelectedOptIdx(null);
                      }}
                      className={`hover:text-white transition-colors ${
                        i === activePointIdx ? 'text-blue-400 font-bold' : ''
                      }`}
                    >
                      {p.timestamp} {answeredPoints[i] === true ? '✓' : answeredPoints[i] === false ? '✗' : '•'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Decision Question Box */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-left">
              <h4 className="text-sm sm:text-base font-bold text-white font-display mb-3">
                {currentPoint.question}
              </h4>

              <div className="space-y-2.5">
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
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : isEvaluated && isSelected && !opt.isCorrect
                          ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-blue-400/40 text-white/90'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isEvaluated && opt.isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                      {isEvaluated && isSelected && !opt.isCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback box */}
              {selectedOptIdx !== null && (
                <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/20 text-xs animate-fadeIn">
                  <span className="font-bold text-blue-300 block mb-0.5">Retroalimentación:</span>
                  <p className="text-white/80">{currentPoint.options[selectedOptIdx].feedback}</p>

                  {activePointIdx + 1 < points.length && (
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={handleNextPoint}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-500 hover:bg-blue-400 text-white transition-colors"
                      >
                        Continuar Video al siguiente punto ➔
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </SpotlightCard>
        </div>

        {/* Room Navigation Footer */}
        <div className="mt-14 flex items-center justify-between pt-6 border-t border-white/10">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala2');
            }}
            className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} /> Sala 2: Presentaciones & Gamificación
          </button>

          <button
            id="go-sala-4-btn"
            onClick={() => {
              sound.playFanfare();
              onNavigate('sala4');
            }}
            className="btn-primary text-xs px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/30"
            style={{
              background: 'linear-gradient(135deg, #26890C 0%, #35b811 100%)'
            }}
          >
            <span>Ir a Sala 4: Blogs, Metacognición & Reto Final</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
