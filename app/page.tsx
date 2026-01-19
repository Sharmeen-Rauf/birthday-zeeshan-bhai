'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import BirthdayCake from '@/components/BirthdayCake';
import Confetti from '@/components/Confetti';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import ImageGallery from '@/components/ImageGallery';
import DecorativeImages from '@/components/DecorativeImages';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <Confetti />
      <DecorativeImages />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-90" />
      
      <div className="relative z-10 max-w-4xl w-full">
        {/* Header with fade-in animation */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 drop-shadow-lg">
            Happy Birthday{' '}
            <span className="text-blue-600">Zeeshan Bhai</span>! 🎂
          </h1>
        </div>

        {/* 3D Cake Container */}
        <div className="w-full h-96 mb-8 rounded-lg shadow-2xl bg-white/30 backdrop-blur-sm p-4 animate-fadeInUp">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-600">Loading cake...</div>}>
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2.2}
              />
              <BirthdayCake />
            </Canvas>
          </Suspense>
        </div>

        {/* Message Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-10 mb-8 animate-fadeInUp delay-300">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">
              Happy Birthday Zeeshan Bhai,
            </p>
            
            <p className="mb-4 text-base md:text-lg">
              You are truly one of the best souls I have ever met — so soft-hearted, kind, and genuine.
              Because of you, I was able to survive in the office and believe in myself. From taking my interview to always supporting me, you never stopped giving hope when I needed it the most.
            </p>
            
            <p className="mb-4 text-base md:text-lg">
              You always listened to my ideas, guided me with patience, and never judged my mistakes. Instead, you taught me, understood me, and helped me grow. People who give hope and understanding are rare — and you are one of them.
            </p>
            
            <p className="mb-4 text-base md:text-lg">
              I will always be grateful for your support, trust, and positivity.
            </p>
            
            <p className="text-lg md:text-xl font-semibold text-blue-600 text-center mt-8">
              Best, best, best soul — always. 💙
            </p>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery />

        {/* QR Code Section */}
        {mounted && <QRCodeDisplay />}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .delay-300 {
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }
      `}</style>
    </main>
  );
}
