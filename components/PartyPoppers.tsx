'use client';

import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  angle: number;
  delay: number;
  duration: number;
  color: string;
}

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#ffffff'];

export default function PartyPoppers({ onComplete }: { onComplete?: () => void }) {
  const [leftSparkles, setLeftSparkles] = useState<Sparkle[]>([]);
  const [rightSparkles, setRightSparkles] = useState<Sparkle[]>([]);
  const [leftConfetti, setLeftConfetti] = useState<ConfettiPiece[]>([]);
  const [rightConfetti, setRightConfetti] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    // Create sparkles for left popper
    const leftS: Sparkle[] = [];
    for (let i = 0; i < 30; i++) {
      leftS.push({
        id: i,
        x: 10 + Math.random() * 20, // Left side of screen
        y: 40 + Math.random() * 20,
        delay: Math.random() * 0.3,
        duration: 0.8 + Math.random() * 0.4,
      });
    }
    setLeftSparkles(leftS);

    // Create sparkles for right popper
    const rightS: Sparkle[] = [];
    for (let i = 0; i < 30; i++) {
      rightS.push({
        id: i,
        x: 70 + Math.random() * 20, // Right side of screen
        y: 40 + Math.random() * 20,
        delay: Math.random() * 0.3,
        duration: 0.8 + Math.random() * 0.4,
      });
    }
    setRightSparkles(rightS);

    // Create confetti for left popper
    const leftC: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      leftC.push({
        id: i,
        x: 10,
        y: 50,
        angle: -45 + Math.random() * 90, // Spread outward from left
        delay: Math.random() * 0.2,
        duration: 1.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setLeftConfetti(leftC);

    // Create confetti for right popper
    const rightC: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      rightC.push({
        id: i,
        x: 90,
        y: 50,
        angle: 135 + Math.random() * 90, // Spread outward from right
        delay: Math.random() * 0.2,
        duration: 1.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setRightConfetti(rightC);

    // Callback after animation completes
    if (onComplete) {
      setTimeout(() => {
        setIsActive(false);
        onComplete();
      }, 2000);
    } else {
      setTimeout(() => setIsActive(false), 2000);
    }
  }, [onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {/* Left Popper Sparkles */}
      {leftSparkles.map((sparkle) => (
        <div
          key={`left-sparkle-${sparkle.id}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            backgroundColor: '#ffd700',
            boxShadow: '0 0 10px #ffd700, 0 0 20px #ffd700',
            animation: `sparkleBurst ${sparkle.duration}s ease-out ${sparkle.delay}s forwards`,
          }}
        />
      ))}

      {/* Right Popper Sparkles */}
      {rightSparkles.map((sparkle) => (
        <div
          key={`right-sparkle-${sparkle.id}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            backgroundColor: '#ffd700',
            boxShadow: '0 0 10px #ffd700, 0 0 20px #ffd700',
            animation: `sparkleBurst ${sparkle.duration}s ease-out ${sparkle.delay}s forwards`,
          }}
        />
      ))}

      {/* Left Popper Confetti */}
      {leftConfetti.map((piece) => {
        const angleRad = (piece.angle * Math.PI) / 180;
        const distance = 200 + Math.random() * 150;
        const xDistance = Math.cos(angleRad) * distance;
        const yDistance = Math.sin(angleRad) * distance;
        return (
          <div
            key={`left-confetti-${piece.id}`}
            className="absolute w-3 h-3"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              backgroundColor: piece.color,
              borderRadius: '50%',
              animation: `confettiBurst ${piece.duration}s ease-out ${piece.delay}s forwards`,
              '--end-x': `${xDistance}px`,
              '--end-y': `${yDistance}px`,
            } as React.CSSProperties & { '--end-x': string; '--end-y': string }}
          />
        );
      })}

      {/* Right Popper Confetti */}
      {rightConfetti.map((piece) => {
        const angleRad = (piece.angle * Math.PI) / 180;
        const distance = 200 + Math.random() * 150;
        const xDistance = Math.cos(angleRad) * distance;
        const yDistance = Math.sin(angleRad) * distance;
        return (
          <div
            key={`right-confetti-${piece.id}`}
            className="absolute w-3 h-3"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              backgroundColor: piece.color,
              borderRadius: '50%',
              animation: `confettiBurst ${piece.duration}s ease-out ${piece.delay}s forwards`,
              '--end-x': `${xDistance}px`,
              '--end-y': `${yDistance}px`,
            } as React.CSSProperties & { '--end-x': string; '--end-y': string }}
          />
        );
      })}

      <style jsx>{`
        @keyframes sparkleBurst {
          0% {
            transform: scale(0) translate(0, 0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1.5) translate(
              ${Math.random() > 0.5 ? '-' : ''}${50 + Math.random() * 100}px,
              ${Math.random() > 0.5 ? '-' : ''}${50 + Math.random() * 100}px
            );
            opacity: 0;
          }
        }

        @keyframes confettiBurst {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--end-x, 200px), var(--end-y, -200px)) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
