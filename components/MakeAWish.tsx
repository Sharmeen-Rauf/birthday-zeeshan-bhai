'use client';

import { useState } from 'react';

interface MakeAWishProps {
  onWishMade: () => void;
}

export default function MakeAWish({ onWishMade }: MakeAWishProps) {
  const [isBlowing, setIsBlowing] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const handleBlow = () => {
    if (wishMade) return;
    
    setIsBlowing(true);
    setShowHint(false);
    
    setTimeout(() => {
      setIsBlowing(false);
      setWishMade(true);
      onWishMade();
      
      // Show success message
      setTimeout(() => {
        setWishMade(false);
        setShowHint(true);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="relative">
      {showHint && !wishMade && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce z-50 whitespace-nowrap">
          <span className="text-sm font-semibold">💨 Blow on the candles! (Click to blow)</span>
        </div>
      )}
      
      {wishMade && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          <span className="text-sm font-semibold">✨ Your wish will come true! ✨</span>
        </div>
      )}

      <button
        onClick={handleBlow}
        disabled={wishMade}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 ${
          wishMade
            ? 'bg-green-500 cursor-not-allowed'
            : isBlowing
            ? 'bg-orange-500 scale-110 animate-pulse'
            : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
        }`}
        style={{ display: wishMade ? 'none' : 'block' }}
      >
        {isBlowing ? '💨 Blowing...' : '🎂 Make a Wish!'}
      </button>

      {isBlowing && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${
                    Math.cos((i / 20) * Math.PI * 2) * 50
                  }px, ${Math.sin((i / 20) * Math.PI * 2) * 50}px)`,
                  animation: `windBlow 2s ease-out forwards`,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes windBlow {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) translateY(-100px);
          }
        }
      `}</style>
    </div>
  );
}
