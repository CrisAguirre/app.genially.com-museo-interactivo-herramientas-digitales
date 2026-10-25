import React from 'react';
import { X, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ExhibitModal({ exhibit, onClose }) {
  if (!exhibit) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-box p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div>
            <div className="meta-pill mb-2">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-cyan)' }} />
              <span>{exhibit.formato || 'Recurso Educativo Digital'}</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px', lineHeight: 1.3 }}>
              {exhibit.title}
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h4 style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.08em', marginBottom: '6px' }}>
              Descripción Técnica y Contenido Didáctico
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: 1.6 }}>
              {exhibit.descripcion || exhibit.description}
            </p>
          </div>

          <div
            style={{
              padding: '1.25rem',
              borderRadius: '14px',
              backgroundColor: 'rgba(0, 229, 255, 0.06)',
              border: '1px solid rgba(0, 229, 255, 0.2)'
            }}
          >
            <h4 style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <CheckCircle2 size={14} />
              Aporte al Pensamiento Lógico & Resolución de Problemas
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#E2E8F0', lineHeight: 1.55 }}>
              {exhibit.aportePedagogico || 'Fortalece la capacidad deductiva y la estructuración del razonamiento.'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn-secondary"
            style={{ fontSize: '12px', padding: '0.5rem 1.25rem' }}
          >
            Cerrar Ficha del Recurso
          </button>
        </div>
      </div>
    </div>
  );
}
