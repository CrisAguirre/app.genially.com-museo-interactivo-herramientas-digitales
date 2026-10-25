import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Gamepad2, Key, Lock, Unlock, Sparkles, CheckCircle2, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { SALA2_DATA } from '../data/museumData';
import BackgroundParticles from './reactbits/BackgroundParticles';
import DecryptedText from './reactbits/DecryptedText';
import ShinyText from './reactbits/ShinyText';
import SpotlightCard from './reactbits/SpotlightCard';

export default function Sala2({ onNavigate = () => {} }) {
  // Activity state for RED #10: Escape Room con 3 acertijos lógicos
  const [currentRiddleIdx, setCurrentRiddleIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [unlockedDoors, setUnlockedDoors] = useState([false, false, false]);
  const [feedback, setFeedback] = useState(null);
  const [escapeCompleted, setEscapeCompleted] = useState(false);
  const [showClue, setShowClue] = useState(false);

  const riddles = SALA2_DATA.escapeRoomRiddles;
  const activeRiddle = riddles[currentRiddleIdx];

  const handleAttemptUnlock = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const isMatch =
      userAnswer.trim().toUpperCase() === activeRiddle.answer.trim().toUpperCase();

    if (isMatch) {
      sound.playCorrect();
      const updated = [...unlockedDoors];
      updated[currentRiddleIdx] = true;
      setUnlockedDoors(updated);
      setFeedback({ type: 'success', msg: `¡Candado ${currentRiddleIdx + 1} desbloqueado con éxito!` });
      setUserAnswer('');
      setShowClue(false);

      if (currentRiddleIdx + 1 < riddles.length) {
        setTimeout(() => {
          setCurrentRiddleIdx((i) => i + 1);
          setFeedback(null);
        }, 1200);
      } else {
        // Complete escape room!
        setEscapeCompleted(true);
        sound.playFanfare();
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 }
          });
        } catch (err) {}
      }
    } else {
      sound.playIncorrect();
      setFeedback({ type: 'error', msg: 'Combinación incorrecta. Revisa el razonamiento o usa la pista.' });
    }
  };

  const handleResetEscape = () => {
    sound.playClick();
    setCurrentRiddleIdx(0);
    setUserAnswer('');
    setUnlockedDoors([false, false, false]);
    setFeedback(null);
    setEscapeCompleted(false);
    setShowClue(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] pb-32 pt-8">
      {/* Background Particles with Rose/Purple Ambience */}
      <BackgroundParticles particleCount={85} particleColor="rgba(226, 27, 60, 0.7)" lineColor="rgba(226, 27, 60, 0.15)" />

      <div className="container relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala1');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={14} /> Sala 1: Organizadores Gráficos
          </button>

          <div className="badge-pill border-rose-500/40 bg-rose-500/10 text-rose-300">
            Sala 2 • Gamificación & Dilemas
          </div>
        </div>

        {/* Room Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest mb-1">
            HERRAMIENTAS: {SALA2_DATA.herramientas}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase">
            PRESENTACIONES Y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-400 to-amber-300">
              GAMIFICACIÓN
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/80">
            Narrativas lúdicas, paradojas y metodologías de resolución:{' '}
            <ShinyText text="Método Pólya & Escape Rooms" speed={3} className="font-bold text-rose-300" />
          </p>
        </div>

        {/* Pedagogical Concept Card */}
        <div className="glass-panel p-5 my-8 border-rose-500/20 bg-rose-500/5">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center text-xl shrink-0 border border-rose-500/30">
              🎲
            </div>
            <div className="text-left flex-1">
              <span className="font-bold text-white text-sm block">Aporte de Genially y la Gamificación Educativa:</span>
              <p className="text-white/70 mt-0.5 leading-relaxed">
                Genially permite construir universos inmersivos no lineales donde los enigmas lógicos y las paradojas se presentan como desafíos interactivos, motivando la perseverancia y el ensayo reflexivo.
              </p>
            </div>
          </div>
        </div>

        {/* REDs Grid: RED 6, RED 7, RED 8, RED 9 */}
        <div className="my-10">
          <h2 className="text-2xl font-black text-white font-display mb-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
            Recursos Educativos Digitales (RED) de la Sala 2
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SALA2_DATA.redItems.slice(0, 4).map((red) => (
              <SpotlightCard
                key={red.id}
                spotlightColor="rgba(226, 27, 60, 0.3)"
                borderColor="rgba(226, 27, 60, 0.25)"
                className="p-6 bg-gradient-to-br from-[#240d16]/90 to-[#12050b]/95 flex flex-col justify-between"
              >
                <div>
                  <span className="badge-pill border-rose-500/40 bg-rose-500/10 text-rose-300 text-[10px] mb-3">
                    {red.formato}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    {red.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed">
                    {red.descripcion}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-rose-300/80 font-mono">
                  ✦ {red.aportePedagogico}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* =========================================================================
            RED #10: ACTIVIDAD INTERACTIVA PARA EL VISITANTE
            "Actividad: Escape Room con 3 acertijos lógicos"
           ========================================================================= */}
        <div className="my-12">
          <SpotlightCard
            spotlightColor="rgba(226, 27, 60, 0.45)"
            borderColor="rgba(226, 27, 60, 0.5)"
            className="p-6 sm:p-8 bg-gradient-to-b from-[#2d0e1c]/95 to-[#15060d]/98"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 mb-6 gap-2">
              <div>
                <div className="badge-pill border-rose-400/50 bg-rose-400/20 text-rose-200 text-xs font-mono font-bold mb-1">
                  🎮 RED #10 • ACTIVIDAD INTERACTIVA
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                  Escape Room Digital: Desbloquea los 3 Candados Lógicos
                </h3>
                <p className="text-xs text-white/70 mt-1">
                  Supera los 3 enigmas deductivos para escapar de la sala de paradojas.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {unlockedDoors.map((unlocked, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border ${
                      unlocked
                        ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_10px_#10B981]'
                        : idx === currentRiddleIdx
                        ? 'bg-rose-500/30 text-rose-300 border-rose-400 animate-pulse'
                        : 'bg-white/5 text-white/40 border-white/10'
                    }`}
                  >
                    {unlocked ? <Unlock size={14} /> : <Lock size={14} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Escape Room Riddle Container */}
            {!escapeCompleted ? (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-left">
                  <div className="flex items-center justify-between text-xs text-rose-400 font-mono mb-2">
                    <span className="font-bold uppercase tracking-wider">{activeRiddle.name}</span>
                    <span>Acertijo {currentRiddleIdx + 1} de 3</span>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-white leading-relaxed font-display">
                    {activeRiddle.prompt}
                  </p>

                  {showClue && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs flex items-center gap-2">
                      <HelpCircle size={15} className="shrink-0" />
                      <span>{activeRiddle.clue}</span>
                    </div>
                  )}
                </div>

                <form onSubmit={handleAttemptUnlock} className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Escribe la clave o respuesta..."
                    className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-xs font-mono focus:border-rose-400 focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center gap-2 shadow-lg shadow-rose-600/30"
                  >
                    <Key size={15} />
                    <span>Desbloquear Candado</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setShowClue(!showClue);
                    }}
                    className="px-4 py-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white/80 transition-colors"
                  >
                    {showClue ? 'Ocultar Pista' : '💡 Ver Pista'}
                  </button>
                </form>

                {feedback && (
                  <div
                    className={`text-xs font-bold p-3 rounded-xl flex items-center gap-2 animate-fadeIn ${
                      feedback.type === 'success'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    <span>{feedback.msg}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center animate-fadeIn space-y-3">
                <div className="text-4xl">🎉 🔓</div>
                <h4 className="text-2xl font-black text-emerald-300 font-display">
                  ¡ESCAPE ROOM COMPLETADO CON ÉXITO!
                </h4>
                <p className="text-xs text-white/80 max-w-md mx-auto leading-relaxed">
                  Has resuelto los 3 acertijos lógicos demostrando razonamiento inductivo, análisis de veracidad y dominio del método Pólya.
                </p>
                <button
                  onClick={handleResetEscape}
                  className="mt-2 px-4 py-2 rounded-xl text-xs bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
                >
                  Reiniciar Escape Room
                </button>
              </div>
            )}
          </SpotlightCard>
        </div>

        {/* Room Navigation Footer */}
        <div className="mt-14 flex items-center justify-between pt-6 border-t border-white/10">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala1');
            }}
            className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} /> Sala 1: Organizadores Gráficos
          </button>

          <button
            id="go-sala-3-btn"
            onClick={() => {
              sound.playFanfare();
              onNavigate('sala3');
            }}
            className="btn-primary text-xs px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/30"
            style={{
              background: 'linear-gradient(135deg, #1368CE 0%, #358bf3 100%)'
            }}
          >
            <span>Ir a Sala 3: Video Educativo Interactivo</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
