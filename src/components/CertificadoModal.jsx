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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#18112d] to-[#0d091a] border-2 border-amber-400/50 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(255,215,0,0.25)] text-center my-8">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <X size={18} />
        </button>

        {/* Certificate Border Decor */}
        <div className="border border-amber-400/30 rounded-2xl p-6 relative overflow-hidden bg-black/35">
          {/* Corner Decors */}
          <div className="absolute top-2 left-2 text-amber-400/40 text-[10px] font-mono">✦ PENSAMIENTO LÓGICO ✦</div>
          <div className="absolute top-2 right-2 text-amber-400/40 text-[10px] font-mono">✦ GENIALLY RED ✦</div>
          <div className="absolute bottom-2 left-2 text-amber-400/40 text-[10px] font-mono">✦ GRADOS 6.° A 11.° ✦</div>
          <div className="absolute bottom-2 right-2 text-amber-400/40 text-[10px] font-mono">✦ NORMA APA v7 ✦</div>

          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(255,215,0,0.5)]">
              {badge?.emoji || '🏆'}
            </div>
          </div>

          <p className="text-amber-400 text-xs font-bold uppercase tracking-widest font-mono">
            MUSEO INTERACTIVO DE TECNOLOGÍA EDUCATIVA
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
            CERTIFICADO DE APROBACIÓN & RECONOCIMIENTO
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Se otorga la presente constancia de excelencia a:
          </p>

          {/* Editable Visitor Name */}
          <div className="my-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre completo"
              className="text-xl sm:text-2xl font-black text-center text-amber-300 bg-white/5 border-b-2 border-amber-400/60 focus:border-amber-400 outline-none px-4 py-1.5 rounded-lg w-full max-w-md font-display transition-colors"
            />
            <p className="text-[11px] text-white/40 mt-1">
              (Haz clic sobre el nombre para personalizarlo antes de imprimir)
            </p>
          </div>

          <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
            Por haber culminado con distinción las 4 salas de la exposición virtual (Organizadores Gráficos, Presentaciones y Gamificación, Video Interactivo y Metacognición), explorado los más de 20 Recursos Educativos Digitales (RED) y superado el Reto Culminante con un puntaje de:
          </p>

          {/* Score & Badge Highlight */}
          <div className="my-4 inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-gradient-to-r from-amber-400/10 via-purple-500/15 to-emerald-400/10 border border-amber-400/40">
            <span className="text-2xl font-black text-white font-mono">{score} / 5</span>
            <span className="w-px h-6 bg-white/20" />
            <div className="text-left">
              <div className="text-xs font-bold text-amber-300">{badge?.title}</div>
              <div className="text-[10px] text-white/60">{badge?.rank}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/10 text-xs text-white/70">
            <div>
              <div className="font-mono text-[10px] text-white/40">FECHA DE EMISIÓN</div>
              <div className="font-semibold text-white">{currentDate}</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-white/40">CÓDIGO DE VALIDACIÓN</div>
              <div className="font-mono font-bold text-amber-400">RED-LOGIC-2026-APA</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-400 text-black hover:bg-amber-300 transition-all hover:scale-105 shadow-lg shadow-amber-400/20"
          >
            <Printer size={16} />
            <span>Imprimir / Guardar en PDF</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            Continuar Explorando
          </button>
        </div>
      </div>
    </div>
  );
}
