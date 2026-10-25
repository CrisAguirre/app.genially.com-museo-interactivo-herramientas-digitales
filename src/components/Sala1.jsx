import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Network, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Layers, MoveUp, MoveDown, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { SALA1_DATA } from '../data/museumData';
import BackgroundGalaxy from './reactbits/BackgroundGalaxy';
import DecryptedText from './reactbits/DecryptedText';
import ShinyText from './reactbits/ShinyText';
import SpotlightCard from './reactbits/SpotlightCard';

export default function Sala1({ onNavigate = () => {} }) {
  // Activity state for RED #5: Clasificar pasos de un algoritmo desordenado
  const [steps, setSteps] = useState(SALA1_DATA.algoritmoStepsDefault);
  const [isAlgorithmVerified, setIsAlgorithmVerified] = useState(false);
  const [isCorrectOrder, setIsCorrectOrder] = useState(false);

  const moveStep = (index, direction) => {
    sound.playClick();
    const newSteps = [...steps];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newSteps.length) return;
    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIndex];
    newSteps[targetIndex] = temp;
    setSteps(newSteps);
    setIsAlgorithmVerified(false);
  };

  const verifyAlgorithm = () => {
    // Check if correct order 0, 1, 2, 3, 4
    const correct = steps.every((s, idx) => s.correctIndex === idx);
    setIsAlgorithmVerified(true);
    setIsCorrectOrder(correct);

    if (correct) {
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

  const resetAlgorithm = () => {
    sound.playClick();
    setSteps(SALA1_DATA.algoritmoStepsDefault);
    setIsAlgorithmVerified(false);
    setIsCorrectOrder(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] pb-32 pt-8">
      {/* Background Galaxy with Cyan Hue */}
      <BackgroundGalaxy speed={0.9} starCount={200} nebulaColor="rgba(0, 196, 204, 0.2)" />

      <div className="container relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('lobby');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={14} /> Volver al Lobby
          </button>

          <div className="badge-pill border-cyan-500/40 bg-cyan-500/10 text-cyan-300">
            Sala 1 • Organización Visual & Algoritmos
          </div>
        </div>

        {/* Room Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
            HERRAMIENTAS: {SALA1_DATA.herramientas}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase">
            ORGANIZADORES{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-300">
              GRÁFICOS
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/80">
            Estructuración visual del pensamiento lógico:{' '}
            <ShinyText text="Deducción, Inducción y Algoritmos Cotidianos" speed={3} className="font-bold text-cyan-300" />
          </p>
        </div>

        {/* Summary Info Banner */}
        <div className="glass-panel p-5 my-8 border-cyan-500/20 bg-cyan-500/5">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xl shrink-0 border border-cyan-500/30">
              📊
            </div>
            <div className="text-left flex-1">
              <span className="font-bold text-white text-sm block">Aporte Tecnopedagógico de los Organizadores Gráficos:</span>
              <p className="text-white/70 mt-0.5 leading-relaxed">
                Herramientas como Canva, MindMeister y Padlet permiten materializar esquemas cognitivos, transformando conceptos lógicos abstractos en mapas visuales comprensibles y algoritmos secuenciales de resolución de problemas.
              </p>
            </div>
          </div>
        </div>

        {/* REDs Grid: RED 1, RED 2, RED 3, RED 4 */}
        <div className="my-10">
          <h2 className="text-2xl font-black text-white font-display mb-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            Recursos Educativos Digitales (RED) de la Sala 1
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SALA1_DATA.redItems.slice(0, 4).map((red) => (
              <SpotlightCard
                key={red.id}
                spotlightColor="rgba(0, 196, 204, 0.3)"
                borderColor="rgba(0, 196, 204, 0.25)"
                className="p-6 bg-gradient-to-br from-[#0d1e24]/90 to-[#071115]/95 flex flex-col justify-between"
              >
                <div>
                  <span className="badge-pill border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-[10px] mb-3">
                    {red.formato}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    {red.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed">
                    {red.descripcion}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-cyan-300/80 font-mono">
                  ✦ {red.aportePedagogico}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* =========================================================================
            RED #5: ACTIVIDAD INTERACTIVA PARA EL VISITANTE
            "Actividad: Clasificar pasos de un algoritmo desordenado"
           ========================================================================= */}
        <div className="my-12">
          <SpotlightCard
            spotlightColor="rgba(0, 196, 204, 0.4)"
            borderColor="rgba(0, 196, 204, 0.5)"
            className="p-6 sm:p-8 bg-gradient-to-b from-[#0e272a]/95 to-[#061517]/98"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 mb-6 gap-2">
              <div>
                <div className="badge-pill border-cyan-400/50 bg-cyan-400/20 text-cyan-200 text-xs font-mono font-bold mb-1">
                  🎮 RED #5 • ACTIVIDAD INTERACTIVA
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                  Clasificador de Pasos: Algoritmo de Verificación Crítica
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  Misión del visitante: Ordena los 5 pasos lógicos para "Detectar una noticia falsa antes de compartirla". Usa los botones ▲ y ▼ para mover cada bloque.
                </p>
              </div>

              <button
                onClick={resetAlgorithm}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors self-start sm:self-center"
              >
                <RefreshCw size={13} /> Reiniciar
              </button>
            </div>

            {/* Draggable/Movable Steps List */}
            <div className="space-y-3">
              {steps.map((st, idx) => (
                <div
                  key={st.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    isAlgorithmVerified
                      ? st.correctIndex === idx
                        ? 'bg-emerald-500/20 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'bg-rose-500/20 border-rose-500/60'
                      : 'bg-white/5 border-white/10 hover:border-cyan-400/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-mono font-black text-sm shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      {st.text}
                    </p>
                  </div>

                  {/* Move Up/Down Controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveStep(idx, -1)}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                      title="Mover arriba"
                    >
                      <MoveUp size={15} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === steps.length - 1}
                      onClick={() => moveStep(idx, 1)}
                      className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                      title="Mover abajo"
                    >
                      <MoveDown size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Verification Button & Status */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <button
                onClick={verifyAlgorithm}
                className="btn-primary text-xs px-6 py-3 rounded-xl font-bold flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-500 text-black shadow-lg shadow-cyan-400/30"
              >
                <Check size={16} />
                <span>Verificar Orden Lógico del Algoritmo</span>
              </button>

              {isAlgorithmVerified && (
                <div
                  className={`text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 animate-fadeIn ${
                    isCorrectOrder
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {isCorrectOrder ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>¡Algoritmo perfecto! Has ordenado los 5 pasos con precisión lógica.</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={16} />
                      <span>Hay pasos fuera de secuencia. Revisa cuál acción debe anteceder a las demás.</span>
                    </>
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
              onNavigate('lobby');
            }}
            className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} /> Volver al Lobby
          </button>

          <button
            id="go-sala-2-btn"
            onClick={() => {
              sound.playFanfare();
              onNavigate('sala2');
            }}
            className="btn-primary text-xs px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-rose-600/30"
            style={{
              background: 'linear-gradient(135deg, #E21B3C 0%, #ff4b67 100%)'
            }}
          >
            <span>Ir a Sala 2: Presentaciones & Gamificación</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
