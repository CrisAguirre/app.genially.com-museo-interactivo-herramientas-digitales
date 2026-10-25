import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Lock, Unlock, Key, HelpCircle, CheckCircle2, AlertCircle, Eye, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { SALA2_DATA } from '../data/museumData';
import BackgroundParticles from './reactbits/BackgroundParticles';
import ExhibitModal from './ExhibitModal';

export default function Sala2({ onNavigate = () => {} }) {
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  // RED #10 Activity State: Escape Room
  const [currentRiddleIdx, setCurrentRiddleIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [unlockedDoors, setUnlockedDoors] = useState([false, false, false]);
  const [feedback, setFeedback] = useState(null);
  const [escapeCompleted, setEscapeCompleted] = useState(false);
  const [showClue, setShowClue] = useState(false);

  const riddles = SALA2_DATA.escapeRoomRiddles;
  const activeRiddle = riddles[currentRiddleIdx];

  const handleUnlock = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const isMatch =
      userAnswer.trim().toUpperCase() === activeRiddle.answer.trim().toUpperCase();

    if (isMatch) {
      sound.playCorrect();
      const updated = [...unlockedDoors];
      updated[currentRiddleIdx] = true;
      setUnlockedDoors(updated);
      setFeedback({ type: 'success', msg: `¡Candado 0${currentRiddleIdx + 1} desbloqueado!` });
      setUserAnswer('');
      setShowClue(false);

      if (currentRiddleIdx + 1 < riddles.length) {
        setTimeout(() => {
          setCurrentRiddleIdx((i) => i + 1);
          setFeedback(null);
        }, 1200);
      } else {
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
      setFeedback({ type: 'error', msg: 'Combinación incorrecta. Revisa el enunciado o consulta la pista.' });
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

  const exhibitIcons = ['🌀', '🌳', '👁️', '📐'];

  return (
    <div className="relative min-h-[calc(100vh-70px)] pb-28 pt-8">
      {/* Background Particles with Crimson Tint */}
      <BackgroundParticles particleCount={60} particleColor="rgba(255, 51, 102, 0.4)" lineColor="rgba(255, 51, 102, 0.1)" />

      <div className="container relative z-10">
        {/* Top Room Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala1');
            }}
            className="btn-secondary text-xs"
          >
            <ArrowLeft size={14} /> Pabellón 01: Organizadores Gráficos
          </button>

          <div className="text-right">
            <span className="text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider block">
              Pabellón 02 • Genially / Prezi / SlideShare
            </span>
            <span className="text-xs text-slate-400">
              Presentaciones & Gamificación
            </span>
          </div>
        </div>

        {/* Room Header & Concept */}
        <div className="max-w-2xl mb-10 text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            PRESENTACIONES Y GAMIFICACIÓN
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Inmersión lúdica y narrativa para conceptos lógicos complejos: paradojas de la verdad, árboles de decisión, el método Pólya y resolución cooperativa de acertijos.
          </p>
        </div>

        {/* 4 Exhibit Pedestals (RED 6 to 9) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-200 uppercase tracking-wider font-mono text-xs">
              Colección de Recursos Educativos Digitales (RED 6 al 9)
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Haz clic en cualquier exhibición para examinar detalles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SALA2_DATA.redItems.slice(0, 4).map((red, idx) => (
              <div
                key={red.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibit(red);
                }}
                className="exhibit-card group"
                style={{ '--card-accent': 'var(--accent-crimson)' }}
              >
                <div>
                  <div className="text-2xl mb-3">{exhibitIcons[idx]}</div>
                  <span className="text-[11px] font-mono text-rose-400 block mb-1">
                    RED 0{idx + 6}
                  </span>
                  <h3 className="text-sm font-bold text-white font-display group-hover:text-rose-300 transition-colors leading-snug">
                    {red.title.replace(/^RED #\d+:\s*/, '')}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] truncate max-w-[130px]">{red.formato.split('(')[0]}</span>
                  <span className="text-rose-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <Eye size={13} /> Ver
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Central Hands-On Station: RED #10 Activity */}
        <div className="gallery-stage mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] mb-6 gap-3">
            <div>
              <div className="meta-pill text-rose-300 border-rose-500/30 text-[11px] mb-1.5">
                RED #10 • ACTIVIDAD INTERACTIVA DEL VISITANTE
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Terminal de Escape Room: Desbloqueo de Candados Lógicos
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Aplica la deducción rigurosa para descifrar las claves de los 3 candados de seguridad.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {unlockedDoors.map((unlocked, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs border transition-all ${
                    unlocked
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : idx === currentRiddleIdx
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                      : 'bg-white/[0.04] text-slate-500 border-white/10'
                  }`}
                >
                  {unlocked ? <Unlock size={14} /> : <Lock size={14} />}
                </div>
              ))}
            </div>
          </div>

          {!escapeCompleted ? (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-surface border border-subtle">
                <div className="flex items-center justify-between text-xs font-mono text-rose-400 mb-2">
                  <span className="font-bold">{activeRiddle.name}</span>
                  <span className="text-slate-500">Enigma {currentRiddleIdx + 1} de 3</span>
                </div>

                <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                  {activeRiddle.prompt}
                </p>

                {showClue && (
                  <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs flex items-center gap-2">
                    <HelpCircle size={15} className="shrink-0" />
                    <span>{activeRiddle.clue}</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleUnlock} className="flex flex-wrap items-center gap-2.5">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Introduce la combinación o código..."
                  className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-slate-500 text-xs font-mono focus:border-rose-400 focus:outline-none"
                />

                <button
                  type="submit"
                  className="btn-primary text-xs"
                  style={{ background: 'var(--accent-crimson)', color: '#FFF' }}
                >
                  <Key size={14} />
                  <span>Desbloquear</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setShowClue(!showClue);
                  }}
                  className="btn-secondary text-xs"
                >
                  {showClue ? 'Ocultar Pista' : '💡 Pista'}
                </button>
              </form>

              {feedback && (
                <div
                  className={`text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-2 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {feedback.type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                  <span>{feedback.msg}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <div className="text-3xl">🔓 ✨</div>
              <h3 className="text-lg font-bold text-emerald-300 font-display">
                ¡Escape Room Superado!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Los 3 candados lógicos han sido resueltos mediante deducción matemática, verificación condicional y el método Pólya.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleResetEscape}
                  className="btn-secondary text-xs"
                >
                  <RefreshCw size={12} /> Reiniciar Desafío
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Room Navigation Footer */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala1');
            }}
            className="btn-secondary"
          >
            <ArrowLeft size={14} /> Pabellón 01: Organizadores Gráficos
          </button>

          <button
            onClick={() => {
              sound.playFanfare();
              onNavigate('sala3');
            }}
            className="btn-primary"
            style={{ background: 'var(--accent-blue)', color: '#FFF' }}
          >
            <span>Pabellón 03: Video Educativo Interactivo</span>
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
