'use client';

import { useEffect, useState } from 'react';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  opacity: number;
}

const emojis = ['💙', '✨', '⭐', '🎉', '🎂', '💫', '🌟', '🎊', '💖'];

export default function MouseTrail() {
  const [particles, setParticles] = useState<TrailParticle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Create trail particles occasionally (not every move for performance)
      if (Math.random() > 0.7) {
        const newParticle: TrailParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          size: 20 + Math.random() * 15,
          opacity: 1,
        };
        
        setParticles((prev) => [...prev, newParticle]);
        
        // Remove particle after animation
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            fontSize: `${particle.size}px`,
            transform: 'translate(-50%, -50%)',
            animation: 'trailFade 1s ease-out forwards',
            opacity: particle.opacity,
          }}
        >
          {particle.emoji}
        </div>
      ))}
      <style jsx>{`
        @keyframes trailFade {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
