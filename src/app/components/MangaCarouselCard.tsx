'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const panels = [
  { src: '/panel-1.jpg', alt: 'Manga panel 1' },
  { src: '/panel-2.jpg', alt: 'Manga panel 2' },
  { src: '/panel-3.jpg', alt: 'Manga panel 3' },
  { src: '/panel-4.jpg', alt: 'Manga panel 4' },
  { src: '/panel-5.jpg', alt: 'Manga panel 5' },
  { src: '/panel-6.jpg', alt: 'Manga panel 6' },
  { src: '/panel-7.jpeg', alt: 'Manga panel 7' },
];

export default function MangaCarouselCard() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? panels.length - 1 : c - 1)),
    [],
  );

  const next = useCallback(
    () => setCurrent((c) => (c === panels.length - 1 ? 0 : c + 1)),
    [],
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c === panels.length - 1 ? 0 : c + 1));
    }, 3000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  return (
    <div
      className="relative rounded-2xl shadow-lg border dark:border-zinc-700 overflow-hidden min-h-[200px] transition-all duration-500 group bg-black"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {panels.map((panel, i) => (
        <div
          key={panel.src}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={panel.src}
            alt={panel.alt}
            fill
            className="object-top"
            unoptimized
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-all duration-200 backdrop-blur-sm cursor-pointer"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={next}
        aria-label="Próximo"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-all duration-200 backdrop-blur-sm cursor-pointer"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {panels.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Imagem ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
