'use client';

import Button from '@/components/base/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const photos = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/gallery/${i + 1}.webp`,
  alt: `Photo ${i + 1}`,
}));

// Skeleton component for loading state
function ImageSkeleton({ aspectRatio = '3/4' }: { aspectRatio?: string }) {
  return (
    <div className={`relative w-full bg-gray-200 rounded animate-pulse overflow-hidden`} style={{ aspectRatio }}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
    </div>
  );
}

export default function GalleryPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [imageDimensions, setImageDimensions] = useState<Map<number, { width: number; height: number }>>(new Map());

  // Pre-load image dimensions
  useEffect(() => {
    photos.forEach((photo, index) => {
      const img = new window.Image();
      img.onload = () => {
        setImageDimensions((prev) =>
          new Map(prev).set(index, {
            width: img.naturalWidth,
            height: img.naturalHeight,
          })
        );
      };
      img.src = photo.src;
    });
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const getAspectRatio = (index: number) => {
    const dimensions = imageDimensions.get(index);
    if (dimensions) {
      return `${dimensions.width} / ${dimensions.height}`;
    }
    // Default aspect ratio until image loads
    return '3/4';
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 font-lucy text-foreground">
      <h1 className="text-5xl font-honeymoon text-primary text-center mb-12">Gallery</h1>

      <div className="columns-2 sm:columns-3 md:columns-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            onClick={() => setSelected(photo.src)}
            className="relative w-full cursor-pointer overflow-hidden rounded hover:scale-105 transition break-inside-avoid mb-4"
            style={{ aspectRatio: getAspectRatio(index) }}
          >
            {/* Skeleton loader */}
            {!loadedImages.has(index) && <ImageSkeleton aspectRatio={getAspectRatio(index)} />}

            {/* Actual image */}
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(min-width: 768px) 25vw, 50vw"
              priority={index < 4} // preload top 4
              onLoad={() => handleImageLoad(index)}
              className={`transition-opacity duration-300 ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
        ))}
      </div>

      <Button className="mt-[10%] mx-auto">
        <Link href="/registry">Continue</Link>
      </Button>

      {/* Fullscreen Lightbox */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div className="relative w-[90vw] h-[90vh]">
            <Image src={selected} alt="Selected" fill style={{ objectFit: 'contain' }} className="rounded shadow-xl" />
          </div>
        </div>
      )}
    </section>
  );
}
