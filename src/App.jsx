import React, { useState, useEffect } from 'react';
import { MUSEUM_ROOMS, BADGES_SYSTEM } from './data/museumData';
import { sound } from './utils/audio';
import ClickSpark from './components/reactbits/ClickSpark';
import Dock from './components/reactbits/Dock';
import MuseumHeader from './components/MuseumHeader';
import Lobby from './components/Lobby';
import Sala1 from './components/Sala1';
import Sala2 from './components/Sala2';
import Sala3 from './components/Sala3';
import Sala4 from './components/Sala4';
import CertificadoModal from './components/CertificadoModal';

export default function App() {
  const [currentRoom, setCurrentRoom] = useState('lobby');
  const [visitedRooms, setVisitedRooms] = useState(new Set(['lobby']));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(5);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Track room changes & visited set
  const handleNavigate = (roomId) => {
    setCurrentRoom(roomId);
    setVisitedRooms((prev) => new Set([...prev, roomId]));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'm' || e.key === 'M') {
        sound.toggleMute();
      }

      const roomOrder = ['lobby', 'sala1', 'sala2', 'sala3', 'sala4'];
      const currentIndex = roomOrder.indexOf(currentRoom);

      if (e.key === 'ArrowRight' && currentIndex < roomOrder.length - 1) {
        sound.playClick();
        handleNavigate(roomOrder[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        sound.playClick();
        handleNavigate(roomOrder[currentIndex - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRoom]);

  const handleCompleteQuiz = (score) => {
    setQuizCompleted(true);
    setQuizScore(score);
  };

  const currentBadge =
    BADGES_SYSTEM.find((b) => quizScore >= b.minScore) || BADGES_SYSTEM[BADGES_SYSTEM.length - 1];

  return (
    <ClickSpark sparkCount={10} sparkSize={6} duration={450}>
      <div className="relative min-h-screen bg-[#090714] text-white flex flex-col font-body selection:bg-purple-600 selection:text-white">
        {/* Top Sticky Header */}
        <MuseumHeader
          currentRoomId={currentRoom}
          rooms={MUSEUM_ROOMS}
          visitedRooms={visitedRooms}
          onNavigate={handleNavigate}
          onOpenCertificate={() => setIsCertificateOpen(true)}
          quizCompleted={quizCompleted}
          score={quizScore}
        />

        {/* Dynamic Room Content */}
        <main className="flex-1">
          {currentRoom === 'lobby' && (
            <Lobby
              rooms={MUSEUM_ROOMS}
              onNavigate={handleNavigate}
              visitedRooms={visitedRooms}
            />
          )}

          {currentRoom === 'sala1' && (
            <Sala1 onNavigate={handleNavigate} />
          )}

          {currentRoom === 'sala2' && (
            <Sala2 onNavigate={handleNavigate} />
          )}

          {currentRoom === 'sala3' && (
            <Sala3 onNavigate={handleNavigate} />
          )}

          {currentRoom === 'sala4' && (
            <Sala4
              onNavigate={handleNavigate}
              onCompleteQuiz={handleCompleteQuiz}
              onOpenCertificate={() => setIsCertificateOpen(true)}
            />
          )}
        </main>

        {/* ReactBits Dynamic Dock Navigation Bar */}
        <Dock
          items={MUSEUM_ROOMS}
          activeId={currentRoom}
          onSelect={handleNavigate}
        />

        {/* Official Certificate Modal */}
        <CertificadoModal
          isOpen={isCertificateOpen}
          onClose={() => setIsCertificateOpen(false)}
          score={quizScore}
          badge={currentBadge}
        />
      </div>
    </ClickSpark>
  );
}
