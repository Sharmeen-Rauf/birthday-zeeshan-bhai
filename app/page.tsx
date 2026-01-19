'use client';

import { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import BirthdayCake from '@/components/BirthdayCake';
import Confetti from '@/components/Confetti';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import ImageGallery from '@/components/ImageGallery';
import DecorativeImages from '@/components/DecorativeImages';
import PartyPoppers from '@/components/PartyPoppers';
import FloatingConfetti from '@/components/FloatingConfetti';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // Animation Sequence:
    // 1. Party poppers blast immediately on load (0s)
    // 2. Title fades in after 1.5s
    // 3. Cake enters from bottom after title appears (3.5s total)
    // 4. Content fades in after cake (5.5s total)

    // Step 2: Show title after 1.5 seconds
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 1500);

    // Step 3: Show cake after 3.5 seconds (1.5s + 2s delay)
    const cakeTimer = setTimeout(() => {
      setShowCake(true);
    }, 3500);

    // Step 4: Show content after 5.5 seconds (3.5s + 2s delay)
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 5500);

    // Optional: Play soft pop sound (can be muted)
    // Uncomment the lines below if you want sound
    // try {
    //   audioRef.current = new Audio('/sounds/pop.mp3');
    //   audioRef.current.volume = 0.3; // Soft volume
    //   audioRef.current.play().catch(() => {
    //     // Ignore if audio fails (user interaction required in some browsers)
    //   });
    // } catch (e) {
    //   // Ignore audio errors
    // }

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(cakeTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Step 1: Party Poppers - Blast on page load */}
      <PartyPoppers />

      {/* Floating confetti in background - continuous subtle celebration */}
      <FloatingConfetti />
      
      <DecorativeImages />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-90" />
      
      <div className="relative z-10 max-w-4xl w-full">
        {/* Step 2: Header - Fades in after 1.5 seconds */}
        <div className={`text-center mb-8 transition-all duration-1000 ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 drop-shadow-lg">
            Happy Birthday{' '}
            <span className="text-blue-600">Zeeshan Bhai</span>! 🎂
          </h1>
        </div>

        {/* Step 3: 3D Cake Container - Enters from bottom with bounce after title */}
        <div className={`w-full h-96 mb-8 rounded-lg shadow-2xl bg-white/30 backdrop-blur-sm p-4 ${showCake ? 'cake-entrance' : 'opacity-0 translate-y-32'}`}>
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

        {/* Step 4: Message Card and Content - Fade in after cake */}
        <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-10 mb-8">
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
      </div>

      <style jsx>{`
        /* Cake bounce animation - applied when cake appears */
        @keyframes cakeBounce {
          0% {
            transform: translateY(32px) scale(0.9);
            opacity: 0;
          }
          60% {
            transform: translateY(-10px) scale(1.05);
            opacity: 1;
          }
          80% {
            transform: translateY(5px) scale(0.98);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        /* Apply bounce animation to cake when it appears */
        .cake-entrance {
          animation: cakeBounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
      `}</style>
    </main>
  );
}
