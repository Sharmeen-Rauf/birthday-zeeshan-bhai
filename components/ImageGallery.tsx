'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageInfo {
  src: string;
  alt: string;
}

// Add your image paths here! Just add the filename if it's in public/images/
// Example: 'photo1.jpg' will load from /images/photo1.jpg
const IMAGE_PATHS: ImageInfo[] = [
  { src: '/images/WhatsApp Image 2026-01-19 at 6.21.12 PM.jpeg', alt: 'Beautiful memory with Zeeshan Bhai' },
  { src: '/images/WhatsApp Image 2026-01-19 at 6.21.33 PM.jpeg', alt: 'Wonderful moment with Zeeshan Bhai' },
  { src: '/images/WhatsApp Image 2026-01-19 at 6.22.03 PM.jpeg', alt: 'Special memory with Zeeshan Bhai' },
  { src: '/images/WhatsApp Image 2026-01-19 at 6.22.17 PM.jpeg', alt: 'Cherished memory with Zeeshan Bhai' },
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Use the configured images, or show placeholder if none
  const images = IMAGE_PATHS.length > 0 ? IMAGE_PATHS : [];

  // If no images are detected, show a placeholder message
  if (images.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-10 mb-8 animate-fadeInUp delay-500">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
          Memories 💙
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Add your photos to the <code className="bg-gray-100 px-2 py-1 rounded">public/images/</code> folder
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placeholder for images */}
          <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-sm">Add photos here</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-10 mb-8 animate-fadeInUp delay-500">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Beautiful Memories 💙
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => setSelectedImage(img.src)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
            >
              ×
            </button>
            <Image
              src={selectedImage}
              alt="Full size"
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
