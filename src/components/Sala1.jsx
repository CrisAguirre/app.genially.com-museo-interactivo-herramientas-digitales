import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RefreshCw, Eye, CheckCircle2, AlertCircle, MoveUp, MoveDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { SALA1_DATA } from '../data/museumData';
import BackgroundGalaxy from './reactbits/BackgroundGalaxy';
import ExhibitModal from './ExhibitModal';

export default function Sala1({ onNavigate = () => {} }) {
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  // RED #5 Activity State: Clasificar pasos de un algoritmo
  const [steps, setSteps] = useState(SALA1_DATA.algoritmoStepsDefault);
  const [isVerified, setIsVerified] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const moveStep = (index, direction) => {
    sound.playClick();
    const newSteps = [...steps];
    const target = index + direction;
    if (target < 0 || target >= newSteps.length) return;
    const temp = newSteps[index];
    newSteps[index] = newSteps[target];
    newSteps[target] = temp;
    setSteps(newSteps);
    setIsVerified(false);
  };

  const handleVerify = () => {
    const ok = steps.every((s, idx) => s.correctIndex === idx);
    setIsVerified(true);
    setIsCorrect(ok);

    if (ok) {
      sound.playFanfare();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } else {
      sound.playIncorrect();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSteps(SALA1_DATA.algoritmoStepsDefault);
    setIsVerified(false);
    setIsCorrect(false);
  };

  const exhibitIcons = ['🧠', '🔀', '🌿', '💬'];

  return (
    <div className="relative min-h-[calc(100vh-70px)] pb-28 pt-8">
      {/* Subtle Background */}
      <BackgroundGalaxy speed={0.4} starCount={120} nebulaColor="rgba(0, 210, 211, 0.08)" />

      <div className="container relative z-10">
        {/* Top Room Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('lobby');
            }}
            className="btn-secondary text-xs"
          >
            <ArrowLeft size={14} /> Volver al Lobby
          </button>

          <div className="text-right">
            <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              Pabellón 01 • Padlet / Canva / MindMeister
            </span>
            <span className="text-xs text-slate-400">
              Organizadores Gráficos y Algoritmos
            </span>
          </div>
        </div>

        {/* Room Header & Concept */}
        <div className="max-w-2xl mb-10 text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            ORGANIZADORES GRÁFICOS
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Representación visual del pensamiento lógico: razonamiento deductivo, inductivo y modelado algorítmico mediante mapas conceptuales, diagramas de flujo y murales colaborativos.
          </p>
        </div>

        {/* 4 Exhibit Pedestals (RED 1 to 4) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-200 uppercase tracking-wider font-mono text-xs">
              Colección de Recursos Educativos Digitales (RED 1 al 4)
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Haz clic en cualquier exhibición para examinar detalles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SALA1_DATA.redItems.slice(0, 4).map((red, idx) => (
              <div
                key={red.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibit(red);
                }}
                className="exhibit-card group"
                style={{ '--card-accent': 'var(--accent-cyan)' }}
              >
                <div>
                  <div className="text-2xl mb-3">{exhibitIcons[idx]}</div>
                  <span className="text-[11px] font-mono text-cyan-400 block mb-1">
                    RED 0{idx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-white font-display group-hover:text-cyan-300 transition-colors leading-snug">
                    {red.title.replace(/^RED #\d+:\s*/, '')}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] truncate max-w-[130px]">{red.formato.split('(')[0]}</span>
                  <span className="text-cyan-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <Eye size={13} /> Ver
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Central Hands-On Station: RED #5 Activity */}
        <div className="gallery-stage mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] mb-6 gap-3">
            <div>
              <div className="meta-pill text-cyan-300 border-cyan-500/30 text-[11px] mb-1.5">
                RED #5 • ACTIVIDAD INTERACTIVA DEL VISITANTE
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Clasificador Algorítmico: Secuencia Lógica de Verificación
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Ordena los 5 pasos del algoritmo para "Verificar una noticia dudosa antes de compartirla". Utiliza las flechas para reordenar la secuencia.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="btn-secondary text-xs self-start sm:self-center"
            >
              <RefreshCw size={13} /> Reiniciar
            </button>
          </div>

          {/* Clean Step Rows */}
          <div className="space-y-2.5">
            {steps.map((st, idx) => (
              <div
                key={st.id}
                className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  isVerified
                    ? st.correctIndex === idx
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-500/10 border-rose-500/40 text-rose-200'
                    : 'bg-surface border-subtle hover:border-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white/[0.06] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-200">
                    {st.text}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    disabled={idx === 0}
                    onClick={() => moveStep(idx, -1)}
                    className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white flex items-center justify-center transition-colors"
                  >
                    <MoveUp size={13} />
                  </button>
                  <button
                    disabled={idx === steps.length - 1}
                    onClick={() => moveStep(idx, 1)}
                    className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-20 text-white flex items-center justify-center transition-colors"
                  >
                    <MoveDown size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Validation Bar */}
          <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleVerify}
              className="btn-primary text-xs"
            >
              <Check size={15} />
              <span>Validar Secuencia Algorítmica</span>
            </button>

            {isVerified && (
              <div
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-xl flex items-center gap-2 ${
                  isCorrect
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                }`}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 size={15} />
                    <span>¡Secuencia correcta! El algoritmo cumple con la deducción lógica adecuada.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={15} />
                    <span>La secuencia presenta inconsistencias. Analiza qué acción es previa a las demás.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Room Navigation Footer */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('lobby');
            }}
            className="btn-secondary"
          >
            <ArrowLeft size={14} /> Volver al Lobby
          </button>

          <button
            onClick={() => {
              sound.playFanfare();
              onNavigate('sala2');
            }}
            className="btn-primary"
            style={{ background: 'var(--accent-crimson)', color: '#FFF' }}
          >
            <span>Pabellón 02: Presentaciones & Gamificación</span>
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
