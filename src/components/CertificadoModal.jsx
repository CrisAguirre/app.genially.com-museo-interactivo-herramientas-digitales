import React, { useState } from 'react';
import { Award, CheckCircle, Printer, X, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export default function CertificadoModal({
  isOpen = false,
  onClose = () => {},
  score = 5,
  badge = null,
  visitorName = 'Explorador del Pensamiento Lógico'
}) {
  const [name, setName] = useState(visitorName);
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-box p-6 sm:p-8"
        style={{
          maxWidth: '720px',
          border: '2px solid rgba(255, 184, 0, 0.4)',
          background: 'linear-gradient(180deg, #120D1E 0%, #08050E 100%)',
          boxShadow: '0 0 60px rgba(255, 184, 0, 0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={16} />
        </button>

        {/* Certificate Border Decor */}
        <div
          style={{
            border: '1px solid rgba(255, 184, 0, 0.3)',
            borderRadius: '18px',
            padding: '1.75rem',
            position: 'relative',
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            textAlign: 'center'
          }}
        >
          {/* Header Decors */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'rgba(255, 184, 0, 0.5)', marginBottom: '1rem' }}>
            <span>✦ PENSAMIENTO LÓGICO & RESOLUCIÓN DE PROBLEMAS ✦</span>
            <span>✦ LIENZO VIRTUAL GENIALLY ✦</span>
          </div>

          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #FFB800 0%, #FF7700 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 1rem',
              boxShadow: '0 0 25px rgba(255, 184, 0, 0.4)'
            }}
          >
            {badge?.icon || '🏆'}
          </div>

          <p style={{ color: '#FFB800', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-mono)' }}>
            MUSEO VIRTUAL INTERACTIVO DE RECURSOS EDUCATIVOS DIGITALES
          </p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px', letterSpacing: '-0.02em' }}>
            CERTIFICADO DE APROBACIÓN & RECONOCIMIENTO
          </h2>
          <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>
            Se otorga la presente constancia de excelencia pedagógica a:
          </p>

          {/* Editable Visitor Name */}
          <div style={{ margin: '1.25rem 0' }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre completo"
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                textAlign: 'center',
                color: '#FFB800',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                borderBottom: '2px solid rgba(255, 184, 0, 0.6)',
                outline: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '420px',
                fontFamily: 'var(--font-display)'
              }}
            />
            <p style={{ fontSize: '10px', color: '#64748B', marginTop: '4px' }}>
              (Haz clic sobre el nombre para personalizarlo antes de guardar o imprimir)
            </p>
          </div>

          <p style={{ fontSize: '0.85rem', color: '#CBD5E1', maxWidth: '520px', margin: '0 auto', lineHeight: 1.55 }}>
            Por haber recorrido los 4 pabellones temáticos (Organizadores Gráficos, Presentaciones y Gamificación, Video Interactivo y Metacognición), explorado los 20 Recursos Educativos Digitales (RED) y superado el Reto Culminante con solvencia:
          </p>

          {/* Score & Badge Highlight */}
          <div
            style={{
              margin: '1.25rem auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.6rem 1.5rem',
              borderRadius: '16px',
              background: 'rgba(255, 184, 0, 0.1)',
              border: '1px solid rgba(255, 184, 0, 0.3)'
            }}
          >
            <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
              {score} / 5
            </span>
            <span style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#FFB800' }}>{badge?.title || 'Explorador Lógico'}</div>
              <div style={{ fontSize: '10px', color: '#94A3B8' }}>{badge?.rank || 'Grados 6.° a 11.°'}</div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '11px',
              color: '#94A3B8'
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#64748B' }}>FECHA DE EMISIÓN</div>
              <div style={{ fontWeight: 600, color: '#FFFFFF' }}>{currentDate}</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#64748B' }}>CÓDIGO DE VALIDACIÓN</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#FFB800' }}>RED-LOGIC-GENIALLY-2026</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
          <button
            onClick={handlePrint}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #FFB800 0%, #FF8800 100%)',
              color: '#000000'
            }}
          >
            <Printer size={16} />
            <span>Imprimir / Guardar PDF</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn-secondary"
          >
            Continuar Explorando
          </button>
        </div>
      </div>
    </div>
  );
}
