'use client';

import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
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

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#ffffff', '#ffd700'];

export default function CenterBlast({ trigger }: { trigger: number }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger > 0) {
      setIsActive(true);
      
      // Create sparkles bursting from center
      const newSparkles: Sparkle[] = [];
      for (let i = 0; i < 100; i++) {
        newSparkles.push({
          id: Date.now() + i,
          x: 50, // Center of screen
          y: 50,
          delay: Math.random() * 0.2,
          duration: 1 + Math.random() * 0.5,
          size: 3 + Math.random() * 4,
        });
      }
      setSparkles(newSparkles);

      // Create confetti bursting in all directions
      const newConfetti: ConfettiPiece[] = [];
      for (let i = 0; i < 200; i++) {
        newConfetti.push({
          id: Date.now() + 10000 + i,
          x: 50,
          y: 50,
          angle: Math.random() * 360, // All directions
          delay: Math.random() * 0.2,
          duration: 2 + Math.random() * 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setConfetti(newConfetti);

      // Reset after animation
      setTimeout(() => {
        setIsActive(false);
        setSparkles([]);
        setConfetti([]);
      }, 3000);
    }
  }, [trigger]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {/* Center Sparkles */}
      {sparkles.map((sparkle) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 200;
        const xOffset = Math.cos(angle) * distance;
        const yOffset = Math.sin(angle) * distance;
        
        return (
          <div
            key={`center-sparkle-${sparkle.id}`}
            className="absolute rounded-full"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              backgroundColor: '#ffd700',
              boxShadow: `0 0 ${sparkle.size * 3}px #ffd700, 0 0 ${sparkle.size * 6}px #ffd700`,
              animation: `centerBurst ${sparkle.duration}s ease-out ${sparkle.delay}s forwards`,
              '--x-offset': `${xOffset}px`,
              '--y-offset': `${yOffset}px`,
            } as React.CSSProperties & { '--x-offset': string; '--y-offset': string }}
          />
        );
      })}

      {/* Center Confetti */}
      {confetti.map((piece) => {
        const angleRad = (piece.angle * Math.PI) / 180;
        const distance = 250 + Math.random() * 200;
        const xDistance = Math.cos(angleRad) * distance;
        const yDistance = Math.sin(angleRad) * distance;
        
        return (
          <div
            key={`center-confetti-${piece.id}`}
            className="absolute w-4 h-4"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              backgroundColor: piece.color,
              borderRadius: '50%',
              animation: `centerConfettiBurst ${piece.duration}s ease-out ${piece.delay}s forwards`,
              '--end-x': `${xDistance}px`,
              '--end-y': `${yDistance}px`,
            } as React.CSSProperties & { '--end-x': string; '--end-y': string }}
          />
        );
      })}

      <style jsx>{`
        @keyframes centerBurst {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--x-offset, 200px), var(--y-offset, 200px)) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes centerConfettiBurst {
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
