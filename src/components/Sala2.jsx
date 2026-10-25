import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Lock, Unlock, Key, HelpCircle, CheckCircle2, AlertCircle, Eye, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { SALA2_DATA } from '../data/museumData';
import ExhibitModal from './ExhibitModal';
import { DioramaSala2 } from './ambient/PavilionDioramas2D';

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

  const exhibitIcons = ['🐢', '🌳', '🔍', '💡'];

  return (
    <div className="relative min-h-screen pb-32 pt-6">
      <div className="container relative z-10">
        {/* Top Navigation Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala1');
            }}
            className="btn-secondary"
            style={{ fontSize: '12px', padding: '0.5rem 1rem' }}
          >
            <ArrowLeft size={14} />
            <span>Volver a Sala 01</span>
          </button>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-crimson)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
              Pabellón 02 • Genially / Prezi / SlideShare
            </span>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>
              Presentaciones Dinámicas, Gamificación & Paradojas
            </span>
          </div>
        </div>

        {/* 2D ANIMATED PAVILION BANNER */}
        <div className="pavilion-banner-2d" style={{ borderLeft: '4px solid var(--accent-crimson)' }}>
          <div>
            <div className="meta-pill mb-3">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-crimson)' }} />
              <span>SALA TEMÁTICA 02 • GAMIFICACIÓN & PARADOJAS</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15 }}>
              PRESENTACIONES & GAMIFICACIÓN
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginTop: '0.75rem', lineHeight: 1.6, maxWidth: '580px' }}>
              Descubre cómo la narrativa lúdica, las paradojas clásicas de Zenón y Monty Hall, y el método heurístico de George Pólya potencian el razonamiento crítico no lineal.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255, 42, 109, 0.1)', color: 'var(--accent-crimson)', border: '1px solid rgba(255, 42, 109, 0.25)', fontFamily: 'var(--font-mono)' }}>
                Genially Gamified
              </span>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255, 42, 109, 0.1)', color: 'var(--accent-crimson)', border: '1px solid rgba(255, 42, 109, 0.25)', fontFamily: 'var(--font-mono)' }}>
                Prezi Non-Linear
              </span>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255, 42, 109, 0.1)', color: 'var(--accent-crimson)', border: '1px solid rgba(255, 42, 109, 0.25)', fontFamily: 'var(--font-mono)' }}>
                SlideShare Case Studies
              </span>
            </div>
          </div>

          {/* 2D Vector Animated Cyber Vault Diorama */}
          <div>
            <DioramaSala2 />
          </div>
        </div>

        {/* 4 EXHIBIT SHOWCASES (RED 6 to 9) */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                Galería de Recursos Educativos Digitales
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                4 obras gamificadas catalogadas (RED 06 al RED 09)
              </p>
            </div>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              Haz clic en un pedestal para ver ficha completa
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
                className="exhibit-pedestal"
                style={{
                  '--pedestal-accent': 'var(--accent-crimson)',
                  '--pedestal-glow': 'rgba(255, 42, 109, 0.2)',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div className="pedestal-artwork-2d">
                    <span style={{ fontSize: '2.5rem' }}>{exhibitIcons[idx]}</span>
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '6px',
                        right: '8px',
                        fontSize: '9px',
                        fontFamily: 'var(--font-mono)',
                        padding: '2px 5px',
                        borderRadius: '4px',
                        background: 'rgba(0,0,0,0.6)',
                        color: 'var(--accent-crimson)'
                      }}
                    >
                      RED 0{idx + 6}
                    </span>
                  </div>

                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-crimson)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    {red.herramienta}
                  </span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.35, marginBottom: '6px' }}>
                    {red.title.replace(/^RED #\d+:\s*/, '')}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {red.description}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '1rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '11px'
                  }}
                >
                  <span style={{ color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                    {red.formato.split('(')[0]}
                  </span>
                  <span style={{ color: 'var(--accent-crimson)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Eye size={13} />
                    <span>Inspeccionar</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE ESCAPE ROOM STATION: RED #10 */}
        <div className="activity-stage-box" style={{ borderTop: '3px solid var(--accent-crimson)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255, 42, 109, 0.15)', color: 'var(--accent-crimson)', fontWeight: 700 }}>
                  RED #10 • ACTIVIDAD GAMIFICADA
                </span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>Genially Gamification Engine</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF' }}>
                {SALA2_DATA.red10.title}
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '2px' }}>
                {SALA2_DATA.red10.instruction}
              </p>
            </div>

            <button
              onClick={handleResetEscape}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '0.45rem 0.9rem' }}
            >
              <RefreshCw size={13} />
              <span>Reiniciar Bóveda</span>
            </button>
          </div>

          {/* 3 Digital Padlocks Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {riddles.map((r, i) => {
              const isUnlocked = unlockedDoors[i];
              const isCurrent = currentRiddleIdx === i && !escapeCompleted;

              return (
                <div
                  key={r.id}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '12px',
                    textAlign: 'center',
                    backgroundColor: isUnlocked
                      ? 'rgba(0, 245, 160, 0.1)'
                      : isCurrent
                      ? 'rgba(255, 42, 109, 0.15)'
                      : 'rgba(255, 255, 255, 0.04)',
                    border: isUnlocked
                      ? '1px solid rgba(0, 245, 160, 0.4)'
                      : isCurrent
                      ? '1px solid var(--accent-crimson)'
                      : '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>
                    {isUnlocked ? '🔓' : '🔒'}
                  </div>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: isUnlocked ? '#00F5A0' : isCurrent ? 'var(--accent-crimson)' : '#94A3B8' }}>
                    CANDADO 0{i + 1}
                  </span>
                  <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>
                    {isUnlocked ? 'DESBLOQUEADO' : isCurrent ? 'ACTIVO' : 'BLOQUEADO'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Riddle Terminal */}
          {!escapeCompleted ? (
            <div
              style={{
                padding: '1.25rem',
                borderRadius: '16px',
                backgroundColor: 'rgba(10, 14, 22, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-crimson)', fontWeight: 700 }}>
                  DESAFÍO {currentRiddleIdx + 1} DE {riddles.length}
                </span>
                <button
                  type="button"
                  onClick={() => setShowClue(!showClue)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    color: '#94A3B8',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <HelpCircle size={14} />
                  <span>{showClue ? 'Ocultar pista' : 'Ver pista'}</span>
                </button>
              </div>

              <p style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.5, marginBottom: '0.75rem' }}>
                {activeRiddle.question}
              </p>

              {showClue && (
                <div style={{ padding: '0.6rem 0.9rem', borderRadius: '8px', backgroundColor: 'rgba(255, 184, 0, 0.1)', border: '1px solid rgba(255, 184, 0, 0.25)', color: '#FFB800', fontSize: '12px', marginBottom: '1rem' }}>
                  💡 <strong>Pista heurística:</strong> {activeRiddle.clue}
                </div>
              )}

              <form onSubmit={handleUnlock} style={{ display: 'flex', gap: '0.6rem' }}>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Escribe la clave o respuesta..."
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-mono)',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #FF2A6D 0%, #FF6584 100%)',
                    boxShadow: '0 4px 15px rgba(255, 42, 109, 0.4)'
                  }}
                >
                  <Key size={15} />
                  <span>Desbloquear</span>
                </button>
              </form>

              {feedback && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: feedback.type === 'success' ? '#00F5A0' : '#FF2A6D',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {feedback.type === 'success' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                  <span>{feedback.msg}</span>
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                padding: '2rem',
                borderRadius: '16px',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 245, 160, 0.1)',
                border: '1px solid rgba(0, 245, 160, 0.4)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#00F5A0' }}>
                ¡Bóveda Digital Superada!
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginTop: '0.5rem', maxWidth: '500px', margin: '0.5rem auto 1.5rem' }}>
                Has aplicado con éxito el método de Pólya y resuelto los acertijos lógicos con solvencia.
              </p>
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('sala3');
                }}
                className="btn-primary"
              >
                <span>Avanzar al Pabellón 03: Video Educativo</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Room Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala1');
            }}
            className="btn-secondary"
          >
            <ArrowLeft size={16} />
            <span>Sala 01</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala3');
            }}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #05D9E8 0%, #0088FF 100%)',
              boxShadow: '0 4px 20px rgba(5, 217, 232, 0.35)'
            }}
          >
            <span>Avanzar a Sala 3: Video Interactivo</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Exhibit Detail Modal */}
      {selectedExhibit && (
        <ExhibitModal
          exhibit={selectedExhibit}
          onClose={() => setSelectedExhibit(null)}
        />
      )}
    </div>
  );
}
