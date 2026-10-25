import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RefreshCw, Eye, CheckCircle2, AlertCircle, MoveUp, MoveDown, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { SALA1_DATA } from '../data/museumData';
import ExhibitModal from './ExhibitModal';
import { DioramaSala1 } from './ambient/PavilionDioramas2D';

export default function Sala1({ onNavigate = () => {} }) {
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  // RED #5 Activity State: Clasificar pasos de un algoritmo
  const [steps, setSteps] = useState(SALA1_DATA?.algoritmoStepsDefault || []);
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
    setSteps(SALA1_DATA?.algoritmoStepsDefault || []);
    setIsVerified(false);
    setIsCorrect(false);
  };

  const exhibitIcons = ['🧠', '🔀', '🌿', '💬'];
  const red5 = SALA1_DATA?.redItems?.[4] || {
    title: 'RED #5 (Actividad): Clasificador de Pasos de un Algoritmo Desordenado',
    descripcion: 'Ordena cronológicamente los 5 pasos lógicos para modelar el algoritmo.'
  };

  return (
    <div className="relative min-h-screen pb-32 pt-6">
      <div className="container relative z-10">
        {/* Top Navigation Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('lobby');
            }}
            className="btn-secondary"
            style={{ fontSize: '12px', padding: '0.5rem 1rem' }}
          >
            <ArrowLeft size={14} />
            <span>Volver al Lobby</span>
          </button>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
              Pabellón 01 • Padlet / Canva / MindMeister
            </span>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>
              Organizadores Gráficos y Modelado Algorítmico
            </span>
          </div>
        </div>

        {/* 2D ANIMATED PAVILION BANNER */}
        <div className="pavilion-banner-2d" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
          <div>
            <div className="meta-pill mb-3">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-cyan)' }} />
              <span>SALA TEMÁTICA 01 • LÓGICA ESTRUCTURAL</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15 }}>
              ORGANIZADORES GRÁFICOS
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginTop: '0.75rem', lineHeight: 1.6, maxWidth: '580px' }}>
              Representación visual del pensamiento deductivo, mapas conceptuales jerárquicos y diagramas de flujo para la descomposición sistemática de problemas cotidianos y matemáticos.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(0, 229, 255, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 229, 255, 0.25)', fontFamily: 'var(--font-mono)' }}>
                MindMeister
              </span>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(0, 229, 255, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 229, 255, 0.25)', fontFamily: 'var(--font-mono)' }}>
                Canva Infographics
              </span>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(0, 229, 255, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 229, 255, 0.25)', fontFamily: 'var(--font-mono)' }}>
                Padlet Mural
              </span>
            </div>
          </div>

          {/* 2D Vector Animated Flowchart Diorama */}
          <div>
            <DioramaSala1 />
          </div>
        </div>

        {/* 4 EXHIBIT SHOWCASES (RED 1 to 4) */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                Galería de Recursos Educativos Digitales
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                4 obras conceptuales catalogadas (RED 01 al RED 04)
              </p>
            </div>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              Haz clic en un pedestal para ver ficha completa
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(SALA1_DATA?.redItems?.slice(0, 4) || []).map((red, idx) => (
              <div
                key={red.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibit(red);
                }}
                className="exhibit-pedestal"
                style={{
                  '--pedestal-accent': 'var(--accent-cyan)',
                  '--pedestal-glow': 'rgba(0, 229, 255, 0.2)',
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
                        color: 'var(--accent-cyan)'
                      }}
                    >
                      RED 0{idx + 1}
                    </span>
                  </div>

                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    {red.formato?.split('(')[1]?.replace(')', '') || 'Herramienta TIC'}
                  </span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.35, marginBottom: '6px' }}>
                    {red.title.replace(/^RED #\d+:\s*/, '')}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {red.descripcion || red.description}
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
                    {red.formato?.split('(')[0] || 'Recurso Virtual'}
                  </span>
                  <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Eye size={13} />
                    <span>Inspeccionar</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE ACTIVITY STATION: RED #5 */}
        <div className="activity-stage-box" style={{ borderTop: '3px solid var(--accent-cyan)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: '4px', background: 'rgba(0, 229, 255, 0.15)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  RED #05 • ESTACIÓN PRÁCTICA
                </span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>MindMeister & Canva</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF' }}>
                {red5.title}
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '2px' }}>
                {red5.descripcion}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '0.45rem 0.9rem' }}
            >
              <RefreshCw size={13} />
              <span>Restablecer Orden</span>
            </button>
          </div>

          {/* Reordering Step List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {steps.map((step, idx) => (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: isVerified
                    ? step.correctIndex === idx
                      ? '1px solid rgba(0, 245, 160, 0.5)'
                      : '1px solid rgba(255, 42, 109, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(0, 229, 255, 0.12)',
                      color: 'var(--accent-cyan)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#F1F5F9', fontWeight: 500 }}>
                    {step.text}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <button
                    disabled={idx === 0}
                    onClick={() => moveStep(idx, -1)}
                    style={{
                      padding: '6px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: idx === 0 ? '#475569' : '#FFFFFF',
                      cursor: idx === 0 ? 'not-allowed' : 'pointer'
                    }}
                    title="Subir paso"
                  >
                    <MoveUp size={14} />
                  </button>
                  <button
                    disabled={idx === steps.length - 1}
                    onClick={() => moveStep(idx, 1)}
                    style={{
                      padding: '6px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: idx === steps.length - 1 ? '#475569' : '#FFFFFF',
                      cursor: idx === steps.length - 1 ? 'not-allowed' : 'pointer'
                    }}
                    title="Bajar paso"
                  >
                    <MoveDown size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <button
              onClick={handleVerify}
              className="btn-primary"
            >
              <Check size={16} />
              <span>Verificar Secuencia Lógica</span>
            </button>

            {isVerified && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: isCorrect ? '#00F5A0' : '#FF2A6D'
                }}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>¡Secuencia correcta! Has modelado el algoritmo con éxito.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={18} />
                    <span>Secuencia incorrecta. Ajusta el orden y reintenta.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Room Navigation */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2.5rem' }}>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala2');
            }}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #FF2A6D 0%, #FF6584 100%)',
              boxShadow: '0 4px 20px rgba(255, 42, 109, 0.35)'
            }}
          >
            <span>Avanzar a Sala 2: Presentaciones & Gamificación</span>
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
