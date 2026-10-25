import React from 'react';
import { X, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

export default function ExhibitModal({ exhibit, onClose }) {
  if (!exhibit) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <span className="meta-pill text-cyan-400 border-cyan-500/30 mb-2">
              {exhibit.formato}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
              {exhibit.title}
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="my-6 space-y-5 text-sm text-white/80 leading-relaxed font-body">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white/50 mb-1.5">
              Descripción del Recurso
            </h4>
            <p className="text-white/90">
              {exhibit.descripcion}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 size={14} />
              Aporte Didáctico al Pensamiento Lógico
            </h4>
            <p className="text-xs sm:text-sm text-white/80">
              {exhibit.aportePedagogico}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="btn-secondary text-xs"
          >
            Cerrar Exhibición
          </button>
        </div>
      </div>
    </div>
  );
}
