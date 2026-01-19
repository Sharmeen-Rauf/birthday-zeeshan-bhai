'use client';

import { useEffect, useState } from 'react';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: Array<{
    angle: number;
    distance: number;
    delay: number;
  }>;
}

const fireworkColors = ['#ff6b6b', '#4ecdc4', '#f9ca24', '#eb4d4b', '#6c5ce7', '#ffd700', '#45b7d1'];

export default function Fireworks({ trigger }: { trigger: number }) {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    if (trigger > 0) {
      // Create multiple fireworks
      const newFireworks: Firework[] = [];
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const firework: Firework = {
            id: Date.now() + i * 1000,
            x: 20 + Math.random() * 60, // Random x position
            y: 20 + Math.random() * 40, // Random y position
            color: fireworkColors[Math.floor(Math.random() * fireworkColors.length)],
            particles: [],
          };

          // Create particles for each firework
          for (let j = 0; j < 30; j++) {
            firework.particles.push({
              angle: (j / 30) * Math.PI * 2,
              distance: 100 + Math.random() * 150,
              delay: Math.random() * 0.3,
            });
          }

          setFireworks((prev) => [...prev, firework]);

          // Remove firework after animation
          setTimeout(() => {
            setFireworks((prev) => prev.filter((f) => f.id !== firework.id));
          }, 2000);
        }, i * 300);
      }
    }
  }, [trigger]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {fireworks.map((firework) => (
        <div key={firework.id} className="absolute" style={{ left: `${firework.x}%`, top: `${firework.y}%` }}>
          {/* Center burst */}
          <div
            className="absolute w-4 h-4 rounded-full"
            style={{
              backgroundColor: firework.color,
              boxShadow: `0 0 20px ${firework.color}, 0 0 40px ${firework.color}`,
              transform: 'translate(-50%, -50%)',
              animation: 'fireworkBurst 0.5s ease-out forwards',
            }}
          />
          
          {/* Particles */}
          {firework.particles.map((particle, index) => {
            const x = Math.cos(particle.angle) * particle.distance;
            const y = Math.sin(particle.angle) * particle.distance;
            
            return (
              <div
                key={index}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: firework.color,
                  boxShadow: `0 0 10px ${firework.color}`,
                  transform: 'translate(-50%, -50%)',
                  animation: `fireworkParticle 1.5s ease-out ${particle.delay}s forwards`,
                  '--end-x': `${x}px`,
                  '--end-y': `${y}px`,
                } as React.CSSProperties & { '--end-x': string; '--end-y': string }}
              />
            );
          })}
        </div>
      ))}
      <style jsx>{`
        @keyframes fireworkBurst {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }

        @keyframes fireworkParticle {
          0% {
            transform: translate(-50%, -50%) translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate(var(--end-x, 100px), var(--end-y, 100px));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
