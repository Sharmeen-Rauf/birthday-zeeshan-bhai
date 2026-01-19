'use client';

import Image from 'next/image';

// Add decorative image paths here (for background accents, floating elements, etc.)
// These will appear as subtle decorative elements around the page
const DECORATIVE_IMAGES: Array<{
  src: string;
  alt: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size: 'small' | 'medium' | 'large';
  opacity: number;
}> = [
  // Example decorative images:
  // { src: '/images/decorative1.png', alt: '', position: 'top-right', size: 'small', opacity: 0.3 },
  // { src: '/images/decorative2.png', alt: '', position: 'bottom-left', size: 'medium', opacity: 0.2 },
];

export default function DecorativeImages() {
  if (DECORATIVE_IMAGES.length === 0) {
    return null;
  }

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'top-10 left-10';
      case 'top-right':
        return 'top-10 right-10';
      case 'bottom-left':
        return 'bottom-10 left-10';
      case 'bottom-right':
        return 'bottom-10 right-10';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      default:
        return 'top-10 right-10';
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'w-24 h-24 md:w-32 md:h-32';
      case 'medium':
        return 'w-32 h-32 md:w-48 md:h-48';
      case 'large':
        return 'w-48 h-48 md:w-64 md:h-64';
      default:
        return 'w-24 h-24';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {DECORATIVE_IMAGES.map((img, index) => (
        <div
          key={index}
          className={`absolute ${getPositionClasses(img.position)} ${getSizeClasses(img.size)} animate-float`}
          style={{ opacity: img.opacity }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 96px, 128px"
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
