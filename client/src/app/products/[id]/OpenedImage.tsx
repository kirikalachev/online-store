'use client';
import { useState } from 'react';
import Image from 'next/image';

interface OpenedImageProps {
  images: string[];       // масив от всички изображения (main + gallery)
  initialIndex: number;   // индекс на текущото изображение, което се показва
  onClose: () => void;    // callback за затваряне на popup
}

export default function OpenedImage({ images, initialIndex, onClose }: OpenedImageProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
  onClick={onClose} 
>
  {/* Контейнер за изображението */}
  <div 
    className="relative w-[90%] max-w-3xl h-[80%] flex items-center justify-center"
    onClick={(e) => e.stopPropagation()} 
  >
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-white text-3xl font-bold z-50"
    >
      &times;
    </button>

    {/* Лява стрелка */}
    <button
      onClick={handlePrev}
      className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-4xl z-50"
    >
      &#8249;
    </button>

    {/* Дясна стрелка */}
    <button
      onClick={handleNext}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-4xl z-50"
    >
      &#8250;
    </button>

    {/* Изображение */}
    <div className="relative w-full h-full rounded overflow-hidden">
      <Image
        src={images[currentIndex]}
        alt={`Изображение ${currentIndex + 1}`}
        fill
        className="object-contain"
      />
    </div>
  </div>
</div>

  );
}
