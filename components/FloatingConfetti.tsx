'use client';

import { useEffect, useState } from 'react';

interface FloatingPiece {
  id: number;
  left: number;
  top: number;
  animationDuration: number;
  delay: number;
  color: string;
  size: number;
  horizontalDrift: number;
}

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe'];

export default function FloatingConfetti() {
  const [pieces, setPieces] = useState<FloatingPiece[]>([]);

  useEffect(() => {
    // Create subtle floating confetti pieces
    const floatingPieces: FloatingPiece[] = [];
    for (let i = 0; i < 30; i++) {
      floatingPieces.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDuration: 8 + Math.random() * 4, // Slow, gentle movement
        delay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 4, // Smaller, more subtle
        horizontalDrift: (Math.random() - 0.5) * 50, // Gentle horizontal movement
      });
    }
    setPieces(floatingPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute rounded-full opacity-30"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animation: `floatGently ${piece.animationDuration}s ease-in-out ${piece.delay}s infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes floatGently {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(${Math.random() * 20 - 10}px, -10px) rotate(90deg);
          }
          50% {
            transform: translate(${Math.random() * 20 - 10}px, -20px) rotate(180deg);
          }
          75% {
            transform: translate(${Math.random() * 20 - 10}px, -10px) rotate(270deg);
          }
        }
      `}</style>
    </div>
  );
}
