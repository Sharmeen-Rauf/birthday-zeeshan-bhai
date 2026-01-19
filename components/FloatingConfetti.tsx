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
  shape: 'circle' | 'square' | 'star';
  rotation: number;
}

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#ffd700', '#ffb347'];

export default function FloatingConfetti() {
  const [pieces, setPieces] = useState<FloatingPiece[]>([]);

  useEffect(() => {
    // Create more varied floating confetti pieces
    const floatingPieces: FloatingPiece[] = [];
    for (let i = 0; i < 80; i++) {
      floatingPieces.push({
        id: i,
        left: Math.random() * 100,
        top: -10 + Math.random() * 10, // Start slightly above viewport
        animationDuration: 10 + Math.random() * 8, // Varied speeds
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 6,
        shape: ['circle', 'square', 'star'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'star',
        rotation: Math.random() * 360,
      });
    }
    setPieces(floatingPieces);
  }, []);

  const getShapeStyle = (shape: string) => {
    switch (shape) {
      case 'square':
        return { borderRadius: '2px' };
      case 'star':
        return {
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        };
      default:
        return { borderRadius: '50%' };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute opacity-40"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animation: `floatDown ${piece.animationDuration}s linear ${piece.delay}s infinite`,
            ...getShapeStyle(piece.shape),
          }}
        />
      ))}
      <style jsx>{`
        @keyframes floatDown {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.4;
          }
          10% {
            opacity: 0.6;
            transform: translate(${Math.random() * 30 - 15}px, 10vh) rotate(90deg);
          }
          50% {
            opacity: 0.5;
            transform: translate(${Math.random() * 40 - 20}px, 50vh) rotate(180deg);
          }
          90% {
            opacity: 0.3;
            transform: translate(${Math.random() * 30 - 15}px, 90vh) rotate(270deg);
          }
          100% {
            transform: translate(${Math.random() * 20 - 10}px, 110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
