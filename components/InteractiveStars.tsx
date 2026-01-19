'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function InteractiveStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create stars on click
      const newStars: Star[] = [];
      for (let i = 0; i < 8; i++) {
        newStars.push({
          id: Date.now() + i,
          x: e.clientX + (Math.random() - 0.5) * 100,
          y: e.clientY + (Math.random() - 0.5) * 100,
          size: 15 + Math.random() * 20,
          delay: i * 0.1,
          duration: 1.5 + Math.random() * 0.5,
        });
      }
      
      setStars((prev) => [...prev, ...newStars]);
      
      // Remove stars after animation
      setTimeout(() => {
        setStars((prev) => prev.filter((s) => !newStars.some((ns) => ns.id === s.id)));
      }, 2000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            transform: 'translate(-50%, -50%)',
            animation: `starBurst ${star.duration}s ease-out ${star.delay}s forwards`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="#ffd700" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
      ))}
      <style jsx>{`
        @keyframes starBurst {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
