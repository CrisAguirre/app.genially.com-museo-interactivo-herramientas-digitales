import React, { useState } from 'react';
import { sound } from '../../utils/audio';

export default function PulseHeart({
  initialLikes = 142,
  onLike = () => {},
  className = ''
}) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleClick = () => {
    sound.playPop();
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 500);

    if (liked) {
      setLiked(false);
      setLikes((l) => l - 1);
    } else {
      setLiked(true);
      setLikes((l) => l + 1);
      onLike();
    }
  };

  return (
    <button
      type="button"
      id="pulse-heart-button"
      onClick={handleClick}
      onMouseEnter={() => sound.playHover()}
      className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 ${
        liked
          ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
          : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20'
      } ${className}`}
    >
      <span
        className={`text-xl transition-transform duration-300 ${
          isPulsing ? 'scale-150 animate-bounce' : 'scale-100'
        }`}
      >
        {liked ? '❤️' : '🤍'}
      </span>
      <span className="font-semibold text-sm font-mono">{likes}</span>
      <span className="text-xs text-white/60">Votos de admiración</span>
    </button>
  );
}
