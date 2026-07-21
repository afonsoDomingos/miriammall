'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ImageWithLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  spinnerClassName?: string;
}

export default function ImageWithLoader({
  src,
  alt,
  className = '',
  containerClassName = '',
  spinnerClassName = '',
  ...props
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden w-full h-full flex items-center justify-center ${containerClassName}`}>
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
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
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
