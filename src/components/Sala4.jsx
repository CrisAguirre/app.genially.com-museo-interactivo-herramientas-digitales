import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight, Trophy, Clock, CheckCircle2, XCircle, RotateCcw, Award, Star, Send, Eye } from 'lucide-react';
import { sound } from '../utils/audio';
import { SALA4_DATA, RETO_VISITANTE_QUESTIONS, BADGES_SYSTEM, SHAPES_ICONS } from '../data/museumData';
import ExhibitModal from './ExhibitModal';
import { DioramaSala4 } from './ambient/PavilionDioramas2D';

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
    { author: 'Mateo R. (Estudiante Grado 10.°)', text: 'El algoritmo utilitarista debe programarse para minimizar el daño global neto en una colisión inevitable.', time: 'Hace 10 min' },
    { author: 'Camila P. (Estudiante Grado 11.°)', text: 'El principio deontológico impide sacrificar deliberadamente a una persona para salvar a otras tres.', time: 'Hace 25 min' }
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
  const currentQ = RETO_VISITANTE_QUESTIONS[currentIdx] || {
    sala: 'Sala 4',
    herramienta: 'TIC',
    question: 'Pregunta de evaluación final.',
    options: []
  };

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
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(15);

    if (currentIdx + 1 < RETO_VISITANTE_QUESTIONS.length) {
      setCurrentIdx((i) => i + 1);
    } else {
      setQuizFinished(true);
      sound.playFanfare();
      onCompleteQuiz(score);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
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
    setQuizStarted(true);
  };

  const handleSendForumArgument = (e) => {
    e.preventDefault();
    if (!forumComment.trim()) return;
    sound.playClick();
    setUserArguments((prev) => [
      { author: 'Visitante (Tú)', text: forumComment.trim(), time: 'Ahora mismo' },
      ...prev
    ]);
    setForumComment('');
  };

  const handleSubmitVote = (e) => {
    e.preventDefault();
    sound.playFanfare();
    setVoteSubmitted(true);
  };

  const badge = BADGES_SYSTEM.find((b) => score >= b.minScore) || BADGES_SYSTEM[BADGES_SYSTEM.length - 1];
  const exhibitIcons = ['🌐', '✍️', '🤖', '📊'];
  const red20 = SALA4_DATA?.redItems?.[4] || {
    title: 'RED #20 (Actividad): Foro de Debate sobre Dilema Ético-Lógico',
    descripcion: 'Espacio de discusión con muro de argumentos y votación en vivo.'
  };
  const dilemma = SALA4_DATA?.forumDilemma || {
    title: 'Dilema Ético-Lógico del Vehículo Autónomo',
    prompt: '¿Cómo debe programarse la regla lógica ante un accidente inevitable?',
    positions: [
      { id: 'utilitarista', label: 'Enfoque Utilitarista (Minimizar víctimas)', votes: 78, pct: '62%' },
      { id: 'deontologico', label: 'Enfoque Deontológico (No actuar para desviar)', votes: 29, pct: '23%' },
      { id: 'contractual', label: 'Enfoque Contractual (Proteger al pasajero)', votes: 19, pct: '15%' }
    ]
  };

  return (
    <div className="relative min-h-screen pb-32 pt-6">
      <div className="container relative z-10">
        {/* Top Navigation Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala3');
            }}
            className="btn-secondary"
            style={{ fontSize: '12px', padding: '0.5rem 1rem' }}
          >
            <ArrowLeft size={14} />
            <span>Volver a Sala 03</span>
          </button>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
              Pabellón 04 • Blogger / WordPress / Wix
            </span>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>
              Blogs, Metacognición & El Reto Culminante
            </span>
          </div>
        </div>

        {/* 2D ANIMATED PAVILION BANNER */}
        <div className="pavilion-banner-2d" style={{ borderLeft: '4px solid var(--accent-emerald)' }}>
          <div>
            <div className="meta-pill mb-3">
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} />
              <span>SALA TEMÁTICA 04 • METACOGNICIÓN & DESAFÍO CULMINANTE</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.15 }}>
              BLOGS & METACOGNICIÓN
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#CBD5E1', marginTop: '0.75rem', lineHeight: 1.6, maxWidth: '580px' }}>
              Documentación reflexiva, bitácoras digitales de resolución de problemas, ética algorítmica en la Inteligencia Artificial y la evaluación cumbre del visitante.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(0, 245, 160, 0.1)', color: 'var(--accent-emerald)', border: '1px solid rgba(0, 245, 160, 0.25)', fontFamily: 'var(--font-mono)' }}>
                Blogger Metacognitivo
              </span>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(0, 245, 160, 0.1)', color: 'var(--accent-emerald)', border: '1px solid rgba(0, 245, 160, 0.25)', fontFamily: 'var(--font-mono)' }}>
                WordPress Case Study
              </span>
              <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(0, 245, 160, 0.1)', color: 'var(--accent-emerald)', border: '1px solid rgba(0, 245, 160, 0.25)', fontFamily: 'var(--font-mono)' }}>
                Wix Digital Portfolio
              </span>
            </div>
          </div>

          {/* 2D Vector Animated Neural Brain Diorama */}
          <div>
            <DioramaSala4 />
          </div>
        </div>

        {/* 4 EXHIBIT SHOWCASES (RED 16 to 19) */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                Galería de Recursos Educativos Digitales
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                4 obras reflexivas catalogadas (RED 16 al RED 19)
              </p>
            </div>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
              Haz clic en un pedestal para ver ficha completa
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(SALA4_DATA?.redItems?.slice(0, 4) || []).map((red, idx) => (
              <div
                key={red.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedExhibit(red);
                }}
                className="exhibit-pedestal"
                style={{
                  '--pedestal-accent': 'var(--accent-emerald)',
                  '--pedestal-glow': 'rgba(0, 245, 160, 0.2)',
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
                        color: 'var(--accent-emerald)'
                      }}
                    >
                      RED {idx + 16}
                    </span>
                  </div>

                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
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
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Eye size={13} />
                    <span>Inspeccionar</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FORO ÉTICO INTERACTIVO: RED #20 */}
        <div className="activity-stage-box" style={{ borderTop: '3px solid var(--accent-emerald)', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', padding: '2px 8px', borderRadius: '4px', background: 'rgba(0, 245, 160, 0.15)', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                  RED #20 • FORO DE DEBATE ÉTICO
                </span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>Wix / WordPress Metacognitive Forum</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF' }}>
                {red20.title}
              </h2>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '2px' }}>
                {dilemma.prompt}
              </p>
            </div>
          </div>

          {/* Voting Options */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {(dilemma.positions || []).map((opt) => {
              const isSelected = selectedForumVote === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedForumVote(opt.id);
                  }}
                  style={{
                    padding: '1.25rem',
                    borderRadius: '14px',
                    backgroundColor: isSelected ? 'rgba(0, 245, 160, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1px solid var(--accent-emerald)' : '1px solid rgba(255, 255, 255, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', fontWeight: 800, color: isSelected ? 'var(--accent-emerald)' : '#94A3B8' }}>
                      POSTURA: {opt.id?.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '12px', color: isSelected ? 'var(--accent-emerald)' : '#64748B', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      {opt.pct || ''} {isSelected ? '✓ Elegido' : ''}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                    {opt.label}
                  </h4>
                  <div style={{ fontSize: '11px', color: '#94A3B8' }}>
                    {opt.votes} votos registrados en la comunidad educativa
                  </div>
                </div>
              );
            })}
          </div>

          {/* Argument Submission Box */}
          <form onSubmit={handleSendForumArgument} style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              value={forumComment}
              onChange={(e) => setForumComment(e.target.value)}
              placeholder="Aporta un argumento ético o contraejemplo lógico al foro..."
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #00F5A0 0%, #0088FF 100%)',
                boxShadow: '0 4px 15px rgba(0, 245, 160, 0.4)'
              }}
            >
              <Send size={15} />
              <span>Publicar</span>
            </button>
          </form>

          {/* Recent Forum Arguments */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {userArguments.map((arg, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                    {arg.author}
                  </span>
                  <span style={{ fontSize: '10px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                    {arg.time}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#E2E8F0', lineHeight: 1.4 }}>
                  {arg.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            EL CUARTO ELEMENTO DEL MUSEO: EL RETO CULMINANTE DEL VISITANTE (QUIZ)
            ========================================================================= */}
        <div
          id="gran-reto-section"
          className="activity-stage-box"
          style={{
            borderTop: '4px solid var(--accent-amber)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 40px rgba(255, 184, 0, 0.15)',
            marginBottom: '3.5rem'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div className="meta-pill mb-2" style={{ color: '#FFB800', borderColor: 'rgba(255, 184, 0, 0.3)' }}>
              <span>🏆 EL CUARTO ELEMENTO • RETO CULMINANTE PARA EL VISITANTE</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2 }}>
              DESAFÍO MAESTRO DE PENSAMIENTO LÓGICO
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              Pon a prueba tus competencias deductivas, reconocimiento de algoritmos y evaluación crítica de TIC a través de 5 preguntas formativas cronometradas.
            </p>
          </div>

          {!quizStarted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '20px',
                  background: 'rgba(255, 184, 0, 0.1)',
                  border: '1px solid rgba(255, 184, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  margin: '0 auto 1.25rem',
                  boxShadow: '0 0 25px rgba(255, 184, 0, 0.2)'
                }}
              >
                🎯
              </div>
              <p style={{ fontSize: '0.95rem', color: '#E2E8F0', maxWidth: '500px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
                Dispones de <strong>15 segundos</strong> por interrogante. Las respuestas veloces y las rachas consecutivas multiplican tu puntuación para desbloquear el <strong>Certificado Oficial de Visitante</strong>.
              </p>
              <button
                id="start-visitor-quiz-btn"
                onClick={() => {
                  sound.playFanfare();
                  setQuizStarted(true);
                }}
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #FFB800 0%, #FF8800 100%)',
                  color: '#000000',
                  padding: '0.9rem 2.2rem',
                  fontSize: '1rem',
                  boxShadow: '0 4px 25px rgba(255, 184, 0, 0.4)'
                }}
              >
                <Trophy size={18} />
                <span>Iniciar Desafío Culminante</span>
              </button>
            </div>
          ) : !quizFinished ? (
            <div>
              {/* Question Top Status */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'var(--accent-amber)',
                      color: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      fontSize: '13px'
                    }}
                  >
                    {currentIdx + 1}/5
                  </span>
                  <span style={{ fontSize: '12px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                    {currentQ.sala} • {currentQ.herramienta}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                  {streak > 1 && (
                    <span style={{ color: '#FFB800', fontWeight: 800 }}>
                      🔥 Racha x{streak}
                    </span>
                  )}
                  <span style={{ color: '#FFFFFF', fontWeight: 700 }}>
                    {totalPoints} pts
                  </span>
                  <span
                    style={{
                      padding: '3px 10px',
                      borderRadius: '999px',
                      fontWeight: 800,
                      backgroundColor: timeLeft <= 5 ? 'rgba(255, 42, 109, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                      color: timeLeft <= 5 ? '#FF2A6D' : '#00E5FF',
                      border: timeLeft <= 5 ? '1px solid rgba(255, 42, 109, 0.5)' : '1px solid rgba(0, 229, 255, 0.3)'
                    }}
                  >
                    ⏱️ {timeLeft}s
                  </span>
                </div>
              </div>

              {/* Question Heading */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', textAlign: 'center', padding: '0.75rem 0 1.5rem', lineHeight: 1.4 }}>
                {currentQ.question}
              </h3>

              {/* 4 Interactive Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {(currentQ.options || []).map((opt) => {
                  const isThisSelected = selectedOption?.id === opt.id;
                  let borderCol = 'rgba(255, 255, 255, 0.12)';
                  let bgCol = 'rgba(255, 255, 255, 0.04)';
                  let textCol = '#F1F5F9';

                  if (isAnswered) {
                    if (opt.isCorrect) {
                      borderCol = 'rgba(0, 245, 160, 0.6)';
                      bgCol = 'rgba(0, 245, 160, 0.15)';
                      textCol = '#00F5A0';
                    } else if (isThisSelected && !opt.isCorrect) {
                      borderCol = 'rgba(255, 42, 109, 0.6)';
                      bgCol = 'rgba(255, 42, 109, 0.15)';
                      textCol = '#FF2A6D';
                    } else {
                      borderCol = 'rgba(255, 255, 255, 0.04)';
                      bgCol = 'rgba(255, 255, 255, 0.01)';
                      textCol = '#475569';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(opt)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: '12px',
                        backgroundColor: bgCol,
                        border: `1px solid ${borderCol}`,
                        color: textCol,
                        textAlign: 'left',
                        cursor: isAnswered ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        transition: 'all 0.2s ease',
                        fontSize: '0.9rem',
                        fontWeight: 500
                      }}
                    >
                      <span style={{ display: 'flex', gap: '0.6rem' }}>
                        <strong style={{ fontFamily: 'var(--font-mono)' }}>{opt.id}.</strong>
                        <span>{opt.text}</span>
                      </span>
                      {isAnswered && (
                        <span>
                          {opt.isCorrect ? <CheckCircle2 size={16} color="#00F5A0" /> : isThisSelected ? <XCircle size={16} color="#FF2A6D" /> : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Next Button */}
              {isAnswered && (
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '12px',
                    backgroundColor: selectedOption?.isCorrect ? 'rgba(0, 245, 160, 0.1)' : 'rgba(255, 42, 109, 0.1)',
                    border: selectedOption?.isCorrect ? '1px solid rgba(0, 245, 160, 0.3)' : '1px solid rgba(255, 42, 109, 0.3)',
                    marginTop: '1.25rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: selectedOption?.isCorrect ? '#00F5A0' : '#FF2A6D', marginBottom: '2px' }}>
                      {selectedOption?.isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>
                      {currentQ.explanation}
                    </div>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="btn-primary"
                    style={{
                      background: 'var(--accent-amber)',
                      color: '#000000',
                      fontWeight: 700
                    }}
                  >
                    <span>{currentIdx + 1 < RETO_VISITANTE_QUESTIONS.length ? 'Siguiente Pregunta' : 'Ver Resultados'}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed View */
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{badge.icon}</div>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                INSIGNIA CONQUISTADA
              </span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                {badge.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#94A3B8', maxWidth: '500px', margin: '0.5rem auto 1.5rem', lineHeight: 1.5 }}>
                {badge.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>ACIERTOS</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#00F5A0' }}>{score} / 5</div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>PUNTOS TOTALES</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFB800' }}>{totalPoints}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                <button
                  onClick={() => {
                    sound.playFanfare();
                    onOpenCertificate();
                  }}
                  className="btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #FFB800 0%, #FF8800 100%)',
                    color: '#000000',
                    fontSize: '0.95rem',
                    padding: '0.9rem 1.8rem'
                  }}
                >
                  <Award size={18} />
                  <span>Generar Certificado Oficial</span>
                </button>

                <button
                  onClick={handleRestartQuiz}
                  className="btn-secondary"
                >
                  <RotateCcw size={16} />
                  <span>Reintentar Desafío</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            ESTACIÓN DE VALORACIÓN RÁPIDA DE LA EXPERIENCIA
            ========================================================================= */}
        <div className="activity-stage-box" style={{ borderTop: '3px solid rgba(255, 255, 255, 0.2)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase' }}>
              RETROALIMENTACIÓN DE LA COMUNIDAD EDUCATIVA
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
              Valoración Rápida de la Exposición
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '2px' }}>
              Evalúa la calidad didáctica, inmersión y pertinencia curricular de los 20 REDs.
            </p>
          </div>

          {!voteSubmitted ? (
            <form onSubmit={handleSubmitVote} style={{ maxWidth: '600px', margin: '0 auto' }}>
              {/* Star Rating */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setStarRating(s);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.8rem',
                      color: s <= starRating ? '#FFB800' : '#475569',
                      transition: 'transform 0.15s ease'
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Sala Favorita */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#94A3B8', marginBottom: '0.4rem' }}>
                  ¿Cuál fue tu pabellón favorito?
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['Sala 1: Organizadores', 'Sala 2: Gamificación', 'Sala 3: Video Interactivo', 'Sala 4: Blogs & IA'].map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setFavoriteRoom(name);
                      }}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        fontSize: '11px',
                        backgroundColor: favoriteRoom === name ? 'rgba(0, 229, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: favoriteRoom === name ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.1)',
                        color: favoriteRoom === name ? '#FFFFFF' : '#94A3B8',
                        cursor: 'pointer'
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback text */}
              <div style={{ marginBottom: '1.25rem' }}>
                <textarea
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  placeholder="Comentario sobre el diseño didáctico del museo o sugerencias de mejora..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  <Send size={15} />
                  <span>Enviar Votación & Calificación</span>
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: '#00F5A0' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>¡Gracias por tu valoración!</h4>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '4px' }}>
                Tu opinión enriquece la bitácora de evaluación continua del museo interactivo.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('sala3');
            }}
            className="btn-secondary"
          >
            <ArrowLeft size={16} />
            <span>Sala 03</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNavigate('lobby');
            }}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #00E5FF 0%, #0088FF 100%)',
              boxShadow: '0 4px 20px rgba(0, 229, 255, 0.35)'
            }}
          >
            <span>Volver al Lobby Central</span>
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
