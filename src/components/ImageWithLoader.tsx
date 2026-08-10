'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Loader2, ImageIcon } from 'lucide-react';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  spinnerClassName?: string;
  parallax?: boolean;
  parallaxSpeed?: number;
  fallbackSrc?: string;
}

export default function ImageWithLoader({
  src,
  alt,
  className = '',
  containerClassName = '',
  spinnerClassName = '',
  parallax = false,
  parallaxSpeed = 0.5,
  fallbackSrc,
  ...props
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  useEffect(() => {
    if (!parallax || !containerRef.current) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const diff = elementCenter - viewportCenter;
      // Clamped subtle parallax effect
      const rawRate = -diff * (parallaxSpeed * 0.1);
      const maxOffset = 25;
      const clampedRate = Math.max(-maxOffset, Math.min(maxOffset, rawRate));
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setTranslateY(clampedRate);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax, parallaxSpeed]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full flex items-center justify-center ${containerClassName}`}
    >
      {/* Loading Spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary-dark/20 z-10 transition-opacity duration-300">
          <Loader2 className={`w-8 h-8 animate-spin text-green ${spinnerClassName}`} />
        </div>
      )}

      {/* Image */}
      {currentSrc && !hasError ? (
        <img
          src={currentSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 ${
            parallax ? 'will-change-transform' : ''
          }`}
          style={{
            transform: parallax ? `translateY(${translateY}px)` : undefined,
          }}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          {...props}
        />
      ) : null}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 p-2 text-center text-[10px]">
          <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
          <span className="font-semibold">Imagem indisponível</span>
        </div>
      )}
    </div>
  );
}
