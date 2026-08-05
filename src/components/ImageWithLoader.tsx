'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  spinnerClassName?: string;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export default function ImageWithLoader({
  src,
  alt,
  className = '',
  containerClassName = '',
  spinnerClassName = '',
  parallax = false,
  parallaxSpeed = 0.5,
  ...props
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    if (!parallax || !containerRef.current) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const rate = scrolled * parallaxSpeed;
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setTranslateY(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallax, parallaxSpeed]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden w-full h-full flex items-center justify-center ${containerClassName}`}
    >
      {/* Loading Spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary-dark/20 z-10 transition-opacity duration-300">
          <Loader2 className={`w-10 h-10 animate-spin text-green ${spinnerClassName}`} />
        </div>
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500 ${
          parallax ? 'will-change-transform' : ''
        }`}
        style={{
          transform: parallax ? `translateY(${translateY}px)` : undefined,
        }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        {...props}
      />

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-2 text-center text-[10px]">
          <span className="font-semibold">Erro ao carregar imagem</span>
        </div>
      )}
    </div>
  );
}
