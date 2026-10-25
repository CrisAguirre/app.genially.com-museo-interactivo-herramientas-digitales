import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight, Trophy, Clock, CheckCircle2, XCircle, RotateCcw, Award, Star, Send, Eye } from 'lucide-react';
import { sound } from '../utils/audio';
import { SALA4_DATA, RETO_VISITANTE_QUESTIONS, BADGES_SYSTEM, SHAPES_ICONS } from '../data/museumData';
import BackgroundLightning from './reactbits/BackgroundLightning';
import ExhibitModal from './ExhibitModal';
import PeekRating from './reactbits/PeekRating';

export default function Sala4({
  onNavigate = () => {},
  onCompleteQuiz = () => {},
  onOpenCertificate = () => {}
}) {
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  // RED #20 Activity State: Foro ético
  const [selectedForumVote, setSelectedForumVote] = useState(null);
  const [forumComment, setForumComment] = useState('');
  const [userArguments, setUserArguments] = useState([
    { author: 'Mateo R.', text: 'El enfoque utilitarista busca minimizar el daño global objetivo.', time: 'Hace 10 min' },
    { author: 'Camila P.', text: 'Las reglas deontológicas previenen que una máquina decida dañar activamente.', time: 'Hace 25 min' }
  ]);

  // Quiz State (Reto Final)
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizFinished, setQuizFinished] = useState(false);

  // Voting State
  const [starRating, setStarRating] = useState(5);
  const [selectedEmotion, setSelectedEmotion] = useState('😍');
  const [favoriteRoom, setFavoriteRoom] = useState('Todas');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const timerRef = useRef(null);
  const currentQ = RETO_VISITANTE_QUESTIONS[currentIdx];

  useEffect(() => {
    if (!quizStarted || quizFinished || isAnswered) return;

    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((t) => {
          if (t <= 5 && t > 1) sound.playTick();
          return t - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsAnswered(true);
      sound.playIncorrect();
      setStreak(0);
    }

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, quizStarted, quizFinished, isAnswered]);

  const handleSelectOption = (opt) => {
    if (isAnswered) return;
    clearTimeout(timerRef.current);
    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt.isCorrect) {
      sound.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore((s) => s + 1);

      const earned = 1000 + timeLeft * 50 + newStreak * 100;
      setTotalPoints((p) => p + earned);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } else {
      sound.playIncorrect();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIdx + 1 < RETO_VISITANTE_QUESTIONS.length) {
      setCurrentIdx((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      setQuizFinished(true);
      sound.playFanfare();
      onCompleteQuiz(score + (selectedOption?.isCorrect ? 0 : 0));
      try {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 }
        });
      } catch (e) {}
    }
  };

  const handleRestartQuiz = () => {
    sound.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTotalPoints(0);
    setStreak(0);
    setTimeLeft(15);
    setQuizFinished(false);
  };

  const handleForumSubmit = (e) => {
    e.preventDefault();
    if (!forumComment.trim()) return;
    sound.playPop();
    setUserArguments([
      { author: 'Tú (Visitante)', text: forumComment.trim(), time: 'Justo ahora' },
      ...userArguments
    ]);
    setForumComment('');
  };

  const handleVoteSubmit = (e) => {
    e.preventDefault();
    sound.playFanfare();
    setVoteSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.8 }
      });
    } catch (e) {}
  };

  const currentBadge =
    BADGES_SYSTEM.find((b) => score >= b.minScore) || BADGES_SYSTEM[BADGES_SYSTEM.length - 1];

  const exhibitIcons = ['📰', '📓', '💡', '🐱'];

  return (
    <div className="relative min-h-[calc(100vh-70px)] pb-28 pt-8">
      {/* Background Lightning with Emerald Glow */}
      <BackgroundLightning intensity={quizFinished ? 0.3 : 0.8} />

      <div className="container relative z-10 max-w-4xl mx-auto">
        {/* Top Room Navigation Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala3');
            }}
            className="btn-secondary text-xs"
          >
            <ArrowLeft size={14} /> Pabellón 03: Video Educativo
          </button>

          <div className="text-right">
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
              Pabellón 04 • Blogger / WordPress / Wix
            </span>
            <span className="text-xs text-slate-400">
              Blogs & Metacognición
            </span>
          </div>
        </div>

        {/* Room Header & Concept */}
        <div className="max-w-2xl mb-10 text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            BLOGS Y METACOGNICIÓN
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Reflexión epistemológica y ética digital: la lógica formal en la era de la inteligencia artificial, bitácoras de pensamiento computacional y deliberación colectiva.
          </p>
        </div>

        {/* 4 Exhibit Pedestals (RED 16 to 19) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-200 uppercase tracking-wider font-mono text-xs">
              Colección de Recursos Educativos Digitales (RED 16 al 19)
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Haz clic en cualquier exhibición para examinar detalles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SALA4_DATA.redItems.slice(0, 4).map((red, idx) => (
              <div
                key={red.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibit(red);
                }}
                className="exhibit-card group"
                style={{ '--card-accent': 'var(--accent-emerald)' }}
              >
                <div>
                  <div className="text-2xl mb-3">{exhibitIcons[idx]}</div>
                  <span className="text-[11px] font-mono text-emerald-400 block mb-1">
                    RED 0{idx + 16}
                  </span>
                  <h3 className="text-sm font-bold text-white font-display group-hover:text-emerald-300 transition-colors leading-snug">
                    {red.title.replace(/^RED #\d+:\s*/, '')}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] truncate max-w-[130px]">{red.formato.split('(')[0]}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <Eye size={13} /> Ver
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Central Hands-On Station: RED #20 Activity */}
        <div className="gallery-stage mb-12">
          <div className="meta-pill text-emerald-300 border-emerald-500/30 text-[11px] mb-2">
            RED #20 • ACTIVIDAD INTERACTIVA DEL VISITANTE
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
            Foro de Deliberación: Dilema Ético-Lógico del Vehículo Autónomo
          </h2>
          <p className="text-xs text-slate-400 mt-1 mb-5">
            {SALA4_DATA.forumDilemma.prompt}
          </p>

          {/* Voting Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {SALA4_DATA.forumDilemma.positions.map((pos) => (
              <button
                key={pos.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setSelectedForumVote(pos.id);
                }}
                className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                  selectedForumVote === pos.id
                    ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-lg'
                    : 'bg-surface border-subtle hover:border-medium text-slate-300'
                }`}
              >
                <div className="font-semibold mb-1">{pos.label}</div>
                <div className="text-[11px] font-mono text-emerald-400 font-bold">{pos.pct} de apoyo</div>
              </button>
            ))}
          </div>

          {/* Comment Form */}
          <form onSubmit={handleForumSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={forumComment}
              onChange={(e) => setForumComment(e.target.value)}
              placeholder="Aporta tu razonamiento ético-lógico..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-subtle text-white placeholder-slate-500 text-xs focus:border-emerald-400 focus:outline-none"
            />
            <button type="submit" className="btn-primary text-xs" style={{ background: 'var(--accent-emerald)', color: '#000' }}>
              <Send size={13} /> Opinar
            </button>
          </form>

          {/* Arguments */}
          <div className="space-y-2">
            {userArguments.map((arg, i) => (
              <div key={i} className="p-3 rounded-xl bg-surface border border-subtle text-xs text-left">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-0.5">
                  <span className="font-bold text-emerald-400">{arg.author}</span>
                  <span>{arg.time}</span>
                </div>
                <p className="text-slate-300">{arg.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            🏆 EL RETO CULMINANTE DEL VISITANTE (QUIZ DE 5 PREGUNTAS)
           ========================================================================= */}
        <div className="gallery-stage mt-14" style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}>
          <div className="text-center mb-6">
            <div className="meta-pill text-amber-300 border-amber-500/30 text-[11px] mb-2">
              🏆 MISIÓN CULMINANTE DEL MUSEO
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              EL RETO DEL VISITANTE
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              5 preguntas de alta demanda cognitiva sobre pensamiento lógico, algoritmos y herramientas TIC.
            </p>
          </div>

          {!quizStarted ? (
            <div className="text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center text-3xl mx-auto">
                🎯
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Dispones de 15 segundos por pregunta. Las respuestas correctas otorgan puntos y bonificaciones por velocidad para alcanzar la insignia de Gran Maestro.
              </p>
              <button
                id="start-visitor-quiz-btn"
                onClick={() => {
                  sound.playFanfare();
                  setQuizStarted(true);
                }}
                className="btn-primary text-xs"
                style={{ background: 'var(--accent-gold)', color: '#000' }}
              >
                <Trophy size={16} />
                <span>Iniciar Desafío</span>
              </button>
            </div>
          ) : !quizFinished ? (
            <div className="space-y-5">
              {/* Quiz Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-amber-400 text-black flex items-center justify-center font-mono font-bold text-xs">
                    {currentIdx + 1}/5
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {currentQ.sala} • {currentQ.herramienta}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  {streak > 1 && (
                    <span className="text-amber-400 font-bold">
                      🔥 x{streak}
                    </span>
                  )}
                  <span className="text-slate-300 font-bold">{totalPoints} pts</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-bold border ${timeLeft <= 5 ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse' : 'bg-white/5 text-slate-300 border-white/10'}`}>
                    ⏱️ {timeLeft}s
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-white text-center py-2 font-display">
                {currentQ.question}
              </h3>

              {/* 4 Clean Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((opt) => {
                  const isThisSelected = selectedOption?.id === opt.id;
                  let style = 'bg-surface border-subtle hover:border-medium';

                  if (isAnswered) {
                    if (opt.isCorrect) {
                      style = 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200';
                    } else if (isThisSelected && !opt.isCorrect) {
                      style = 'bg-rose-500/15 border-rose-500/50 text-rose-200';
                    } else {
                      style = 'opacity-30 border-subtle';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center gap-3 ${style}`}
                    >
                      <span className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-sm font-mono shrink-0">
                        {SHAPES_ICONS[opt.shape]}
                      </span>
                      <span className="flex-1 leading-snug">{opt.text}</span>
                      {isAnswered && opt.isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                      {isAnswered && isThisSelected && !opt.isCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Formative Rationale */}
              {isAnswered && (
                <div className="mt-4 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-left animate-fadeIn">
                  <span className="font-bold text-amber-300 block mb-1">Fundamentación Didáctica:</span>
                  <p className="text-slate-300">{currentQ.feedback}</p>

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="btn-primary text-xs"
                      style={{ background: 'var(--accent-gold)', color: '#000' }}
                    >
                      {currentIdx + 1 < RETO_VISITANTE_QUESTIONS.length ? 'Siguiente Pregunta ➔' : 'Ver Resultados 🏆'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Podium & Certificate Trigger */
            <div className="text-center p-6 space-y-4 animate-fadeIn">
              <div className="text-4xl">{currentBadge.emoji}</div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400 block">
                {currentBadge.rank}
              </span>
              <h3 className="text-2xl font-bold text-white font-display">
                {currentBadge.title}
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                {currentBadge.description}
              </p>

              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 font-mono text-xs text-slate-300">
                <span>Aciertos: <strong className="text-emerald-400">{score} / 5</strong></span>
                <span>•</span>
                <span>Puntos: <strong className="text-amber-400">{totalPoints}</strong></span>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  id="claim-certificate-btn"
                  onClick={() => {
                    sound.playFanfare();
                    onOpenCertificate();
                  }}
                  className="btn-primary text-xs"
                  style={{ background: 'var(--accent-gold)', color: '#000' }}
                >
                  <Award size={15} />
                  <span>Emitir y Descargar Certificado</span>
                </button>

                <button
                  onClick={handleRestartQuiz}
                  className="btn-secondary text-xs"
                >
                  <RotateCcw size={13} />
                  <span>Repetir Reto</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            🗳️ VOTACIÓN RÁPIDA DE LA EXPERIENCIA
           ========================================================================= */}
        <div className="gallery-stage mt-10">
          <div className="flex items-center gap-2 mb-2">
            <Star size={18} className="text-amber-400" />
            <h3 className="text-lg font-bold text-white font-display">
              Votación Rápida: Evalúa tu Visita al Museo
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-6">
            Tu valoración permite optimizar la calidad didáctica de los Recursos Educativos Digitales.
          </p>

          {!voteSubmitted ? (
            <form onSubmit={handleVoteSubmit} className="space-y-5 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  1. Calificación General de la Exposición:
                </label>
                <PeekRating
                  count={5}
                  value={starRating}
                  onChange={setStarRating}
                  size={24}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  2. ¿Qué emoticón resume tu experiencia?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { emoji: '😍', label: 'Fascinante' },
                    { emoji: '🚀', label: 'Innovador' },
                    { emoji: '💡', label: 'Didáctico' },
                    { emoji: '🎮', label: 'Divertido' },
                    { emoji: '👏', label: 'Excelente' }
                  ].map((item) => (
                    <button
                      key={item.emoji}
                      type="button"
                      onClick={() => {
                        sound.playHover();
                        setSelectedEmotion(item.emoji);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                        selectedEmotion === item.emoji
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                          : 'bg-surface border-subtle text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{item.emoji}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  3. Comentario corto o sugerencia:
                </label>
                <textarea
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  placeholder="Comparte tu opinión sobre los REDs explorados..."
                  rows={2}
                  maxLength={180}
                  className="w-full px-4 py-2 rounded-xl bg-surface border border-subtle text-white placeholder-slate-500 text-xs focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary text-xs"
                style={{ background: 'var(--accent-emerald)', color: '#000' }}
              >
                <Send size={13} />
                <span>Enviar Evaluación</span>
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
              <span className="text-2xl">{selectedEmotion}</span>
              <p className="text-xs font-semibold text-emerald-300 mt-1">
                ¡Gracias por registrar tu evaluación de {starRating} estrellas!
              </p>
            </div>
          )}
        </div>

        {/* Room Navigation Footer */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala3');
            }}
            className="btn-secondary"
          >
            <ArrowLeft size={14} /> Pabellón 03: Video Educativo
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('lobby');
            }}
            className="btn-secondary"
          >
            <span>Volver al Lobby Principal</span>
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
