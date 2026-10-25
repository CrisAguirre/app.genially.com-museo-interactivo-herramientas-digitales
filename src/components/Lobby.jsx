import React, { useState } from 'react';
import { ArrowRight, Compass, FileText, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';
import { FICHA_TECNICA } from '../data/museumData';
import MuseumRotundaMap2D from './ambient/MuseumRotundaMap2D';

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
      subtitle: 'Padlet • Canva • MindMeister',
      concept: 'Estructuración visual del pensamiento deductivo, inductivo y algoritmos cotidianos.',
      activity: 'Clasificador de Pasos Algorítmicos',
      color: '#00E5FF',
      icon: '🧠'
    },
    {
      id: 'sala2',
      num: '02',
      title: 'Presentaciones & Gamificación',
      subtitle: 'Genially • Prezi • SlideShare',
      concept: 'Inmersión en paradojas célebres, árboles de decisión y el método Pólya.',
      activity: 'Escape Room de 3 Candados',
      color: '#FF2A6D',
      icon: '🎲'
    },
    {
      id: 'sala3',
      num: '03',
      title: 'Video Educativo Interactivo',
      subtitle: 'Edpuzzle • H5P • Nearpod',
      concept: 'Análisis crítico audiovisual de sesgos cognitivos, silogismos y secuencias.',
      activity: 'Bifurcación de Decisiones en Video',
      color: '#05D9E8',
      icon: '🎬'
    },
    {
      id: 'sala4',
      num: '04',
      title: 'Blogs & Metacognición',
      subtitle: 'Blogger • WordPress • Wix',
      concept: 'Lógica formal frente a la IA, bitácoras metacognitivas y foro de dilemas éticos.',
      activity: 'El Reto del Visitante + Votación',
      color: '#00F5A0',
      icon: '💡'
    }
  ];

  return (
    <div className="relative min-h-screen pb-28 pt-8">
      <div className="container relative z-10 flex flex-col items-center text-center">
        {/* Curated Pre-title Badge */}
        <div className="meta-pill mb-4">
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-cyan)' }} />
          <span>LIENZO VIRTUAL GENIALLY • POBLACIÓN: GRADOS 6.° A 11.°</span>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: '900px'
          }}
        >
          PENSAMIENTO LÓGICO
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: '#94A3B8',
            fontWeight: 400,
            marginTop: '0.4rem',
            maxWidth: '750px'
          }}
        >
          Y Resolución de Problemas en la Era Digital
        </p>

        {/* Subtitle Description */}
        <p
          style={{
            fontSize: '0.95rem',
            color: '#64748B',
            maxWidth: '650px',
            marginTop: '0.8rem',
            lineHeight: 1.6
          }}
        >
          Una experiencia museística virtual interactiva estructurada en 4 pabellones pedagógicos, 20 Recursos Educativos Digitales y estaciones didácticas donde tú eres el protagonista.
        </p>

        {/* Hero Actions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1.75rem' }}>
          <button
            id="start-tour-btn"
            onClick={() => {
              sound.playFanfare();
              onNavigate('sala1');
            }}
            className="btn-primary"
          >
            <Compass size={17} />
            <span>Comenzar Recorrido (Sala 1)</span>
            <ArrowRight size={15} />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setShowFichaModal(true);
            }}
            className="btn-secondary"
          >
            <FileText size={16} />
            <span>Ficha Técnica & Rúbrica Oficial</span>
          </button>
        </div>

        {/* 2D INTERACTIVE ARCHITECTURAL FLOORPLAN MAP */}
        <MuseumRotundaMap2D
          onNavigate={onNavigate}
          visitedRooms={visitedRooms}
        />

        {/* PAVILION CARDS DIRECT ACCESS */}
        <div style={{ width: '100%', maxWidth: '1000px', textAlign: 'left', marginTop: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF' }}>
                Pabellones de la Exposición
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
                Acceso no lineal a las 4 áreas temáticas del museo
              </p>
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#94A3B8' }}>
              {visitedRooms.size - (visitedRooms.has('lobby') ? 1 : 0)} de 4 salas visitadas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roomThemes.map((room) => {
              const isExplored = visitedRooms.has(room.id);

              return (
                <div
                  key={room.id}
                  onClick={() => {
                    sound.playClick();
                    onNavigate(room.id);
                  }}
                  className="exhibit-pedestal"
                  style={{
                    '--pedestal-accent': room.color,
                    '--pedestal-glow': room.color,
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    {/* Top Tag Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            fontWeight: 800,
                            color: room.color
                          }}
                        >
                          PABELLÓN {room.num}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748B' }}>•</span>
                        <span style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                          {room.subtitle}
                        </span>
                      </div>
                      <span
                        style={{
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: isExplored ? 'rgba(0, 245, 160, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          color: isExplored ? '#00F5A0' : '#94A3B8',
                          border: isExplored ? '1px solid rgba(0, 245, 160, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {isExplored ? '✓ VISITADA' : 'DISPONIBLE'}
                      </span>
                    </div>

                    {/* Room Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '1.4rem' }}>{room.icon}</span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FFFFFF' }}>
                        {room.title}
                      </h3>
                    </div>

                    {/* Concept */}
                    <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {room.concept}
                    </p>
                  </div>

                  {/* Card Bottom Meta */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '12px'
                    }}
                  >
                    <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span>🎮</span> Actividad: <strong style={{ color: '#E2E8F0' }}>{room.activity}</strong>
                    </span>
                    <span style={{ color: room.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <span>Entrar</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FICHA TÉCNICA MODAL */}
      {showFichaModal && (
        <div className="modal-overlay" onClick={() => setShowFichaModal(false)}>
          <div className="modal-content-box p-6" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                  DOCUMENTO INSTITUCIONAL
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', marginTop: '2px' }}>
                  {FICHA_TECNICA.titulo}
                </h3>
              </div>
              <button
                onClick={() => setShowFichaModal(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#94A3B8',
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', color: '#CBD5E1' }}>
              <div>
                <strong style={{ color: '#FFFFFF' }}>Lienzo Virtual Empleado:</strong>
                <p style={{ color: '#94A3B8', marginTop: '2px' }}>{FICHA_TECNICA.lienzo}</p>
              </div>
              <div>
                <strong style={{ color: '#FFFFFF' }}>Población Objetivo:</strong>
                <p style={{ color: '#94A3B8', marginTop: '2px' }}>{FICHA_TECNICA.poblacion}</p>
              </div>
              <div>
                <strong style={{ color: '#FFFFFF' }}>Objetivo Pedagógico Central:</strong>
                <p style={{ color: '#94A3B8', marginTop: '2px' }}>{FICHA_TECNICA.objetivo}</p>
              </div>
              <div>
                <strong style={{ color: '#FFFFFF' }}>Estructura de la Exposición:</strong>
                <p style={{ color: '#94A3B8', marginTop: '2px' }}>{FICHA_TECNICA.estructura}</p>
              </div>
              <div>
                <strong style={{ color: '#FFFFFF' }}>Criterios de Evaluación y Rúbrica:</strong>
                <p style={{ color: '#94A3B8', marginTop: '2px' }}>{FICHA_TECNICA.rubrica}</p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowFichaModal(false)}
                className="btn-primary"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
