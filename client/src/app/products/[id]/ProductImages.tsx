//ProductImage.tsx
'use client';
import { Product } from '@/types/product';
import { useState } from 'react';
import Image from 'next/image';
import OpenedImage from './OpenedImage';

interface ProductImagesProps {
  mainImage: string;
  galleryImages: string[];
}

export default function ProductImages({ mainImage, galleryImages }: ProductImagesProps) {
  const allImages = [`http://localhost:3000${mainImage}`, ...galleryImages.map(img => `http://localhost:3000${img}`)];

  const [defaultImage, setDefaultImage] = useState(allImages[0]);
  const [backgroundPos, setBackgroundPos] = useState('50% 50%');
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  const openPopup = (index: number) => {
    setPopupIndex(index);
    setIsPopupOpen(true);
  };

  return (
    <div>
      {mainImage && (
        <div
          className="relative w-full h-[400px] rounded-lg overflow-hidden border shadow cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onClick={() => openPopup(allImages.indexOf(defaultImage))} // отваря popup на текущото defaultImage
          style={{
            backgroundImage: `url(${defaultImage})`,
            backgroundSize: isZoomed ? '200%' : 'cover',
            backgroundPosition: backgroundPos,
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Image
            src={defaultImage}
            alt="Основно изображение"
            fill
            sizes="100vw"
            className="object-cover opacity-0"
          />
        </div>
      )}

      {galleryImages.length > 0 && (
        <div className="mt-4 flex gap-3 flex-wrap">
          {/* Основното изображение като thumbnail */}
          <div
            className="relative w-20 h-20 rounded overflow-hidden border hover:scale-105 transition cursor-pointer"
            onClick={() => {
              setDefaultImage(allImages[0]);
              // openPopup(0);
            }}
          >
            <Image
              src={allImages[0]}
              alt="Main thumbnail"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          {/* Галерия */}
          {galleryImages.map((imgPath, i) => (
            <div
              key={i}
              className="relative w-20 h-20 rounded overflow-hidden border hover:scale-105 transition cursor-pointer"
              onClick={() => {
                setDefaultImage(allImages[i + 1]);
                // openPopup(i + 1);
              }}
            >
              <Image
                src={allImages[i + 1]}
                alt={`Галерия ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Popup за голямото изображение */}
      {isPopupOpen && (
        <OpenedImage
          images={allImages}
          initialIndex={popupIndex}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
}