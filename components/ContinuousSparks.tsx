'use client';

import { useEffect, useState } from 'react';

interface Spark {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

const sparkColors = ['#ffd700', '#ff6b35', '#4ecdc4', '#f9ca24', '#ffffff', '#ffb347'];

export default function ContinuousSparks() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    // Create initial sparks
    const createSparks = () => {
      const newSparks: Spark[] = [];
      for (let i = 0; i < 50; i++) {
        newSparks.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 2 + Math.random() * 3,
          size: 2 + Math.random() * 4,
          color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
        });
      }
      setSparks((prev) => [...prev, ...newSparks]);
    };

    // Create initial batch
    createSparks();

    // Continuously add new sparks every 3 seconds
    const interval = setInterval(() => {
      createSparks();
      // Remove old sparks after they've animated (keep only last 200)
      setSparks((prev) => prev.slice(-150));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute rounded-full"
          style={{
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: spark.color,
            boxShadow: `0 0 ${spark.size * 2}px ${spark.color}, 0 0 ${spark.size * 4}px ${spark.color}`,
            animation: `sparkleFloat ${spark.duration}s ease-out ${spark.delay}s forwards`,
            opacity: 0,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes sparkleFloat {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 1;
            transform: translate(
              ${Math.random() > 0.5 ? '-' : ''}${30 + Math.random() * 50}px,
              ${Math.random() > 0.5 ? '-' : ''}${30 + Math.random() * 50}px
            ) scale(1);
          }
          100% {
            transform: translate(
              ${Math.random() > 0.5 ? '-' : ''}${60 + Math.random() * 80}px,
              ${Math.random() > 0.5 ? '-' : ''}${60 + Math.random() * 80}px
            ) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
