import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, CheckCircle2, XCircle, RotateCcw, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { SALA3_DATA } from '../data/museumData';
import ExhibitModal from './ExhibitModal';
import { DioramaSala3 } from './ambient/PavilionDioramas2D';

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
    <div className="relative min-h-screen pb-32 pt-6">
      <div className="container relative z-10">
        {/* Top Navigation Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala2');
            }}
            className="btn-secondary"
            style={{ fontSize: '12px', padding: '0.5rem 1rem' }}
          >
            <ArrowLeft size={14} />
            <span>Volver a Sala 02</span>
          </button>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
              Pabellón 03 • Edpuzzle / H5P / Nearpod
            </span>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>
              Video Educativo Interactivo & Pensamiento Crítico
            </span>
          </div>
        </div>

        {/* 2D ANIMATED PAVILION BANNER */}
        <div className="pavilion-banner-2d" style={{ borderLeft: '4px solid var(--accent-blue)' }}>
          <div>
            <div className="meta-pill mb-3">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-blue)' }} />
              <span>SALA TEMÁTICA 03 • ANÁLISIS AUDIOVISUAL CRÍTICO</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15 }}>
              VIDEO EDUCATIVO INTERACTIVO
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginTop: '0.75rem', lineHeight: 1.6, maxWidth: '580px' }}>
              Superando la pasividad del espectador tradicional: pausas deliberadas, bifurcaciones de toma de decisión y detección de sesgos cognitivos en tiempo real.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(5, 217, 232, 0.1)', color: 'var(--accent-blue)', border: '1px solid rgba(5, 217, 232, 0.25)', fontFamily: 'var(--font-mono)' }}>
                Edpuzzle Video Quiz
              </span>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(5, 217, 232, 0.1)', color: 'var(--accent-blue)', border: '1px solid rgba(5, 217, 232, 0.25)', fontFamily: 'var(--font-mono)' }}>
                H5P Interactive Video
              </span>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(5, 217, 232, 0.1)', color: 'var(--accent-blue)', border: '1px solid rgba(5, 217, 232, 0.25)', fontFamily: 'var(--font-mono)' }}>
                Nearpod Live Checkpoints
              </span>
            </div>
          </div>

          {/* 2D Vector Animated Cinema Diorama */}
          <div>
            <DioramaSala3 />
          </div>
        </div>

        {/* 4 EXHIBIT SHOWCASES (RED 11 to 14) */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                Galería de Recursos Educativos Digitales
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                4 obras audiovisuales catalogadas (RED 11 al RED 14)
              </p>
            </div>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              Haz clic en un pedestal para ver ficha completa
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
                className="exhibit-pedestal"
                style={{
                  '--pedestal-accent': 'var(--accent-blue)',
                  '--pedestal-glow': 'rgba(5, 217, 232, 0.2)',
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
                        color: 'var(--accent-blue)'
                      }}
                    >
                      RED {idx + 11}
                    </span>
                  </div>

                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
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
                  <span style={{ color: 'var(--accent-blue)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Eye size={13} />
                    <span>Inspeccionar</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE ACTIVITY STATION: RED #15 */}
        <div className="activity-stage-box" style={{ borderTop: '3px solid var(--accent-blue)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: '4px', background: 'rgba(5, 217, 232, 0.15)', color: 'var(--accent-blue)', fontWeight: 700 }}>
                  RED #15 • ESTACIÓN PRÁCTICA
                </span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>H5P Interactive Video Engine</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF' }}>
                {SALA3_DATA.red15.title}
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '2px' }}>
                {SALA3_DATA.red15.instruction}
              </p>
            </div>

            <button
              onClick={handleResetPoints}
              className="btn-secondary"
              style={{ fontSize: '12px', padding: '0.45rem 0.9rem' }}
            >
              <RotateCcw size={13} />
              <span>Reiniciar Video</span>
            </button>
          </div>

          {/* Video Timeline Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {points.map((pt, i) => {
              const answered = answeredPoints[i];
              const isSelected = activePointIdx === i;

              return (
                <button
                  key={pt.id}
                  onClick={() => {
                    sound.playClick();
                    setActivePointIdx(i);
                    setSelectedOptIdx(null);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.6rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: isSelected
                      ? 'rgba(5, 217, 232, 0.2)'
                      : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected
                      ? '1px solid var(--accent-blue)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isSelected ? '#FFFFFF' : '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  <Play size={12} fill={isSelected ? 'var(--accent-blue)' : 'none'} color={isSelected ? 'var(--accent-blue)' : '#94A3B8'} />
                  <span>Punto 0{i + 1} ({pt.timestamp})</span>
                  {answered !== null && (
                    <span style={{ color: answered ? '#00F5A0' : '#FF2A6D', fontSize: '12px' }}>
                      {answered ? '✓' : '✗'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Timestamp Dilemma */}
          <div
            style={{
              padding: '1.5rem',
              borderRadius: '16px',
              backgroundColor: 'rgba(10, 14, 22, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255, 184, 0, 0.15)', color: '#FFB800', fontWeight: 700 }}>
                PAUSA DE CONTROL EN {currentPoint.timestamp}
              </span>
            </div>

            <p style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: 600, lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {currentPoint.question}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {currentPoint.options.map((opt, idx) => {
                const isPicked = selectedOptIdx === idx;
                const showValidation = selectedOptIdx !== null;

                let borderCol = 'rgba(255, 255, 255, 0.1)';
                let bgCol = 'rgba(255, 255, 255, 0.04)';

                if (showValidation) {
                  if (opt.isCorrect) {
                    borderCol = 'rgba(0, 245, 160, 0.6)';
                    bgCol = 'rgba(0, 245, 160, 0.12)';
                  } else if (isPicked) {
                    borderCol = 'rgba(255, 42, 109, 0.6)';
                    bgCol = 'rgba(255, 42, 109, 0.12)';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showValidation}
                    onClick={() => handleSelectDecision(idx, opt)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      padding: '0.9rem 1.25rem',
                      borderRadius: '12px',
                      backgroundColor: bgCol,
                      border: `1px solid ${borderCol}`,
                      color: '#F1F5F9',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      cursor: showValidation ? 'default' : 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>{opt.text}</span>
                    {showValidation && (
                      <span style={{ marginLeft: '1rem', shrink: 0 }}>
                        {opt.isCorrect ? <CheckCircle2 size={16} color="#00F5A0" /> : isPicked ? <XCircle size={16} color="#FF2A6D" /> : null}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {selectedOptIdx !== null && (
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                  {answeredPoints[activePointIdx]
                    ? '✓ ¡Excelente razonamiento crítico!'
                    : '✗ Opción con sesgo cognitivo. Revisa el planteamiento.'}
                </span>

                {activePointIdx + 1 < points.length && (
                  <button
                    onClick={handleNextPoint}
                    className="btn-primary"
                    style={{ fontSize: '12px', padding: '0.5rem 1rem' }}
                  >
                    <span>Continuar Video al Punto 0{activePointIdx + 2}</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Room Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala2');
            }}
            className="btn-secondary"
          >
            <ArrowLeft size={16} />
            <span>Sala 02</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala4');
            }}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #00F5A0 0%, #0088FF 100%)',
              boxShadow: '0 4px 20px rgba(0, 245, 160, 0.35)'
            }}
          >
            <span>Avanzar a Sala 4: Blogs & Reto Final</span>
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
