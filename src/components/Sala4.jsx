import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight, Trophy, Clock, CheckCircle2, XCircle, RotateCcw, Award, Star, Send, MessageSquare, ThumbsUp, Sparkles, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';
import { SALA4_DATA, RETO_VISITANTE_QUESTIONS, BADGES_SYSTEM, SHAPES_ICONS } from '../data/museumData';
import BackgroundLightning from './reactbits/BackgroundLightning';
import DecryptedText from './reactbits/DecryptedText';
import ShinyText from './reactbits/ShinyText';
import SpotlightCard from './reactbits/SpotlightCard';
import SloshGauge from './reactbits/SloshGauge';
import PeekRating from './reactbits/PeekRating';

export default function Sala4({
  onNavigate = () => {},
  onCompleteQuiz = () => {},
  onOpenCertificate = () => {}
}) {
  // Activity state for RED #20: Foro de debate sobre dilema ético-lógico
  const [selectedForumVote, setSelectedForumVote] = useState(null);
  const [forumComment, setForumComment] = useState('');
  const [userArguments, setUserArguments] = useState([
    { author: 'Mateo R.', text: 'El utilitarismo busca el mayor bien para el mayor número, aunque plantee dilemas difíciles.', time: 'Hace 10 min' },
    { author: 'Camila P.', text: 'Las reglas deontológicas evitan que un algoritmo tome decisiones activas de dañar.', time: 'Hace 25 min' }
  ]);

  // Quiz State (Reto del Visitante)
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizFinished, setQuizFinished] = useState(false);

  // Voting State (Evaluación de la Experiencia)
  const [starRating, setStarRating] = useState(5);
  const [selectedEmotion, setSelectedEmotion] = useState('😍');
  const [favoriteRoom, setFavoriteRoom] = useState('Todas');
  const [feedbackComment, setFeedbackComment] = useState('');
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  const timerRef = useRef(null);
  const currentQ = RETO_VISITANTE_QUESTIONS[currentIdx];

  // Timer countdown
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
      handleTimeUp();
    }

    return () => clearTimeout(timerRef.current);
  }, [timeLeft, quizStarted, quizFinished, isAnswered]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    sound.playIncorrect();
    setStreak(0);
  };

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

  return (
    <div className="relative min-h-[calc(100vh-65px)] pb-36 pt-8">
      {/* Background Lightning */}
      <BackgroundLightning intensity={quizFinished ? 0.6 : 1.1} />

      <div className="container relative z-10 max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala3');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={14} /> Sala 3: Video Educativo
          </button>

          <div className="badge-pill border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
            Sala 4 • Metacognición & Reto
          </div>
        </div>

        {/* Room Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">
            HERRAMIENTAS: {SALA4_DATA.herramientas}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white font-display uppercase">
            BLOGS Y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-300">
              METACOGNICIÓN
            </span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/80">
            Reflexión crítica, ética de la Inteligencia Artificial y{' '}
            <ShinyText text="El Reto Final del Visitante" speed={3} className="font-bold text-emerald-300" />
          </p>
        </div>

        {/* Pedagogical Framing Banner */}
        <div className="glass-panel p-5 my-8 border-emerald-500/20 bg-emerald-500/5">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xl shrink-0 border border-emerald-500/30">
              ✍️
            </div>
            <div className="text-left flex-1">
              <span className="font-bold text-white text-sm block">Aporte de los Blogs y la Metacognición:</span>
              <p className="text-white/70 mt-0.5 leading-relaxed">
                Herramientas como Blogger, WordPress y Wix facilitan la publicación de saberes y la reflexión sobre el propio proceso de aprendizaje (aprender a aprender), conectando la lógica formal con dilemas éticos contemporáneos.
              </p>
            </div>
          </div>
        </div>

        {/* REDs Grid: RED 16, RED 17, RED 18, RED 19 */}
        <div className="my-10">
          <h2 className="text-2xl font-black text-white font-display mb-6 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            Recursos Educativos Digitales (RED) de la Sala 4
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SALA4_DATA.redItems.slice(0, 4).map((red) => (
              <SpotlightCard
                key={red.id}
                spotlightColor="rgba(38, 137, 12, 0.3)"
                borderColor="rgba(38, 137, 12, 0.25)"
                className="p-6 bg-gradient-to-br from-[#0c1f13]/90 to-[#06110a]/95 flex flex-col justify-between"
              >
                <div>
                  <span className="badge-pill border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-[10px] mb-3">
                    {red.formato}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display">
                    {red.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed">
                    {red.descripcion}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-emerald-300/80 font-mono">
                  ✦ {red.aportePedagogico}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* =========================================================================
            RED #20: ACTIVIDAD INTERACTIVA
            "Actividad: Foro de debate sobre dilema ético-lógico"
           ========================================================================= */}
        <div className="my-12">
          <SpotlightCard
            spotlightColor="rgba(38, 137, 12, 0.4)"
            borderColor="rgba(38, 137, 12, 0.5)"
            className="p-6 sm:p-8 bg-gradient-to-b from-[#0e2718]/95 to-[#06160d]/98"
          >
            <div className="badge-pill border-emerald-400/50 bg-emerald-400/20 text-emerald-200 text-xs font-mono font-bold mb-2">
              🎮 RED #20 • ACTIVIDAD INTERACTIVA
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              Foro Interactivo: Dilema Ético-Lógico del Vehículo Autónomo
            </h3>
            <p className="text-xs text-white/70 mt-1 mb-6">
              {SALA4_DATA.forumDilemma.prompt}
            </p>

            {/* Voting on Positions */}
            <div className="space-y-3 mb-6">
              <span className="text-xs font-mono font-bold uppercase text-white/60">Elige tu postura lógica:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SALA4_DATA.forumDilemma.positions.map((pos) => (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedForumVote(pos.id);
                    }}
                    className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                      selectedForumVote === pos.id
                        ? 'bg-emerald-500/30 border-emerald-400 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <div className="font-bold mb-1">{pos.label}</div>
                    <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
                      <span>{pos.votes} votos</span>
                      <span className="text-emerald-400 font-bold">{pos.pct}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Argument Input Form */}
            <form onSubmit={handleForumSubmit} className="flex gap-2 mb-6">
              <input
                type="text"
                value={forumComment}
                onChange={(e) => setForumComment(e.target.value)}
                placeholder="Escribe tu argumento ético-lógico..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-xs focus:border-emerald-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Send size={14} /> Opinar
              </button>
            </form>

            {/* Discussion Stream */}
            <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
              {userArguments.map((arg, i) => (
                <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-left">
                  <div className="flex items-center justify-between font-mono text-[10px] text-white/50 mb-0.5">
                    <span className="font-bold text-emerald-400">{arg.author}</span>
                    <span>{arg.time}</span>
                  </div>
                  <p className="text-white/80">{arg.text}</p>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>

        {/* =========================================================================
            🏆 EL RETO DEL VISITANTE (5 PREGUNTAS TIPO QUIZ)
            "Al finalizar el recorrido por el museo, se debe incluir un reto
             para el visitante, por ejemplo 5 preguntas tipo quiz"
           ========================================================================= */}
        <div className="my-16">
          <div className="text-center mb-6">
            <div className="badge-pill border-amber-400/50 bg-amber-400/20 text-amber-300 text-xs font-mono font-bold mb-2">
              🏆 MISIÓN CULMINANTE DEL MUSEO
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-display">
              EL RETO FINAL DEL VISITANTE
            </h2>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto mt-1">
              Evalúa los conocimientos construidos en las 4 salas: organizadores gráficos, gamificación, video interactivo y metacognición.
            </p>
          </div>

          {!quizStarted ? (
            <SpotlightCard
              spotlightColor="rgba(255, 215, 0, 0.3)"
              className="p-8 text-center bg-gradient-to-b from-[#182b1c]/95 to-[#0b170e]/98 border-amber-400/40"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-600 flex items-center justify-center text-4xl mx-auto mb-4 shadow-[0_0_30px_rgba(255,215,0,0.4)] animate-bounce-short">
                🏆
              </div>
              <h3 className="text-2xl font-black text-white font-display">
                ¿Estás listo para el desafío de 5 preguntas?
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto mt-2 leading-relaxed">
                Dispondrás de 15 segundos por reactivo. Cada respuesta correcta acumula puntos, bonificaciones por rapidez y te acercará a la insignia de Gran Maestro.
              </p>

              <div className="mt-6 flex justify-center">
                <button
                  id="start-visitor-quiz-btn"
                  onClick={() => {
                    sound.playFanfare();
                    setQuizStarted(true);
                  }}
                  className="btn-primary text-sm px-8 py-3.5 rounded-2xl font-black flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-xl shadow-amber-400/30 hover:scale-105"
                >
                  <Trophy size={18} />
                  <span>Comenzar el Reto Ahora</span>
                </button>
              </div>
            </SpotlightCard>
          ) : !quizFinished ? (
            <div className="rounded-3xl border-2 border-emerald-500/40 bg-[#0d1c12]/95 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_0_50px_rgba(38,137,12,0.3)]">
              {/* Quiz Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-black text-sm font-mono">
                    {currentIdx + 1}/5
                  </span>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 block">{currentQ.sala} • {currentQ.herramienta}</span>
                    <span className="text-xs text-white/70 font-mono font-bold">Pregunta de Evaluación</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  {streak > 1 && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40 animate-pulse">
                      🔥 Racha x{streak}
                    </span>
                  )}
                  <div className="text-right">
                    <div className="text-[10px] text-white/50">PUNTOS</div>
                    <div className="text-sm font-black text-emerald-400">{totalPoints}</div>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-xs font-bold border ${
                    timeLeft <= 5
                      ? 'bg-rose-500/30 text-rose-300 border-rose-500 animate-bounce'
                      : 'bg-white/10 text-white border-white/20'
                  }`}
                >
                  <Clock size={14} />
                  <span>{timeLeft}s</span>
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-xl sm:text-2xl font-black text-white text-center py-4 font-display leading-snug">
                {currentQ.question}
              </h3>

              {/* 4 Interactive Option Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                {currentQ.options.map((opt) => {
                  const isThisSelected = selectedOption?.id === opt.id;
                  let optionStyle = 'border-transparent hover:scale-[1.01]';

                  if (isAnswered) {
                    if (opt.isCorrect) {
                      optionStyle = 'border-white ring-4 ring-emerald-400 scale-[1.02] shadow-[0_0_20px_#26890C]';
                    } else if (isThisSelected && !opt.isCorrect) {
                      optionStyle = 'border-rose-500 opacity-60';
                    } else {
                      optionStyle = 'opacity-40';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      onMouseEnter={() => !isAnswered && sound.playHover()}
                      className={`relative p-5 rounded-2xl flex items-center gap-4 text-left transition-all duration-200 border-2 select-none active:scale-98 ${optionStyle}`}
                      style={{
                        backgroundColor: opt.color,
                        boxShadow: `0 8px 24px -6px ${opt.color}90`
                      }}
                    >
                      <div className="w-11 h-11 rounded-xl bg-black/30 flex items-center justify-center text-2xl text-white font-mono shrink-0">
                        {SHAPES_ICONS[opt.shape]}
                      </div>

                      <div className="flex-1">
                        <span className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-sm font-display">
                          {opt.text}
                        </span>
                      </div>

                      {isAnswered && opt.isCorrect && (
                        <CheckCircle2 size={24} className="text-white shrink-0" />
                      )}
                      {isAnswered && isThisSelected && !opt.isCorrect && (
                        <XCircle size={24} className="text-white shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Formative Feedback */}
              {isAnswered && (
                <div className="mt-6 p-4 rounded-2xl bg-white/10 border border-white/20 text-left animate-fadeIn">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 font-mono mb-1">
                    <Sparkles size={14} />
                    <span>FUNDAMENTACIÓN DIDÁCTICA:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-body">
                    {currentQ.feedback}
                  </p>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="btn-primary text-xs px-6 py-2.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30"
                    >
                      {currentIdx + 1 < RETO_VISITANTE_QUESTIONS.length
                        ? 'Siguiente Pregunta ➔'
                        : 'Ver Resultados del Reto 🏆'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Podium & Badges */
            <SpotlightCard
              spotlightColor="rgba(38, 137, 12, 0.4)"
              borderColor="rgba(38, 137, 12, 0.5)"
              className="p-8 bg-gradient-to-b from-[#102416]/95 to-[#08140c]/98 text-center mb-10"
            >
              <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
                <SloshGauge
                  value={score * 20}
                  max={100}
                  label="Dominio del Museo"
                  color="#26890C"
                />

                <div className="flex-1">
                  <div className="text-5xl mb-2 animate-bounce-short">{currentBadge.emoji}</div>
                  <div className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                    {currentBadge.rank}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                    {currentBadge.title}
                  </h2>
                  <p className="text-xs text-white/70 max-w-md mx-auto mt-2 leading-relaxed">
                    {currentBadge.description}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 font-mono text-xs">
                    <span>Aciertos: <strong className="text-emerald-400">{score} / 5</strong></span>
                    <span>•</span>
                    <span>Puntaje: <strong className="text-amber-400">{totalPoints} pts</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-white/10">
                <button
                  id="claim-certificate-btn"
                  onClick={() => {
                    sound.playFanfare();
                    onOpenCertificate();
                  }}
                  className="btn-primary text-xs px-6 py-3 rounded-xl flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-600 text-black shadow-lg shadow-amber-400/30 hover:scale-105"
                >
                  <Award size={16} />
                  <span>Emitir y Descargar Mi Certificado</span>
                </button>

                <button
                  onClick={handleRestartQuiz}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors"
                >
                  <RotateCcw size={15} />
                  <span>Repetir el Reto</span>
                </button>
              </div>
            </SpotlightCard>
          )}
        </div>

        {/* =========================================================================
            🗳️ VOTACIÓN RÁPIDA (REQUISITO EXPLÍCITO DE LA INSTRUCCIÓN 4)
            "una votacion rapida (con insignias, emoticones o comentario corto)
             que evalue su experiencia en el museo"
           ========================================================================= */}
        <div className="glass-panel p-6 sm:p-8 border-emerald-500/30 bg-[#0d1810]/90 my-10">
          <div className="flex items-center gap-2.5 mb-2">
            <Star size={20} className="text-amber-400" />
            <h3 className="text-xl font-bold text-white font-display">
              Votación Rápida: Evalúa tu Experiencia en el Museo
            </h3>
          </div>
          <p className="text-xs text-white/60 mb-6">
            Tu opinión permite validar el impacto de los Recursos Educativos Digitales en el aprendizaje del pensamiento lógico.
          </p>

          {!voteSubmitted ? (
            <form onSubmit={handleVoteSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-white/80 mb-2">
                  1. Calificación General de la Exposición (1 a 5 estrellas):
                </label>
                <PeekRating
                  count={5}
                  value={starRating}
                  onChange={setStarRating}
                  size={28}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 mb-2">
                  2. ¿Qué emoticón describe mejor tu experiencia?
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { emoji: '😍', label: '¡Fascinante!' },
                    { emoji: '🚀', label: '¡Innovador!' },
                    { emoji: '💡', label: '¡Muy Didáctico!' },
                    { emoji: '🎮', label: '¡Divertido!' },
                    { emoji: '👏', label: '¡Excelente!' }
                  ].map((item) => (
                    <button
                      key={item.emoji}
                      type="button"
                      onClick={() => {
                        sound.playHover();
                        setSelectedEmotion(item.emoji);
                      }}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                        selectedEmotion === item.emoji
                          ? 'bg-emerald-500/30 text-emerald-200 border-2 border-emerald-400 scale-105 shadow-md shadow-emerald-500/20'
                          : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <span className="text-lg">{item.emoji}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 mb-2">
                  3. ¿Cuál sala del museo aportó más a tu comprensión?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Sala 1 (Organizadores Gráficos)',
                    'Sala 2 (Presentaciones & Escape Room)',
                    'Sala 3 (Video Interactivo & Decisiones)',
                    'Sala 4 (Blogs & Metacognición)',
                    'Todas por igual'
                  ].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setFavoriteRoom(r);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        favoriteRoom === r
                          ? 'bg-emerald-500 text-black font-bold'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 mb-2">
                  4. Comentario corto o reflexión metacognitiva:
                </label>
                <textarea
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  placeholder="Comparte cómo este museo interactivo fortaleció tu pensamiento lógico..."
                  rows={2}
                  maxLength={180}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-xs focus:border-emerald-400 focus:outline-none transition-colors"
                />
                <div className="text-right text-[10px] text-white/40 mt-1">
                  {feedbackComment.length}/180 caracteres
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-primary text-xs px-7 py-3 rounded-xl flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-500/30"
                >
                  <Send size={15} />
                  <span>Enviar Votación y Evaluación</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center animate-fadeIn">
              <div className="text-4xl mb-2">{selectedEmotion}</div>
              <h4 className="text-base font-bold text-emerald-300 font-display">
                ¡Gracias por registrar tu evaluación de la visita!
              </h4>
              <p className="text-xs text-white/70 mt-1 max-w-md mx-auto">
                Tu voto de {starRating} estrellas y tu retroalimentación aportan al perfeccionamiento pedagógico continuo de esta experiencia virtual.
              </p>
            </div>
          )}
        </div>

        {/* Room Navigation Footer */}
        <div className="mt-14 flex items-center justify-between pt-6 border-t border-white/10">
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala3');
            }}
            className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white"
          >
            <ArrowLeft size={16} /> Sala 3: Video Educativo
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('lobby');
            }}
            className="flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300"
          >
            <span>Volver al Lobby Principal</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
