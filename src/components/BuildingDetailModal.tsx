'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building } from '../utils/mockData';
import { X, Building2, ArrowLeft, ChevronRight } from 'lucide-react';

interface BuildingDetailModalProps {
  building: Building | null;
  onClose: () => void;
}

// Floor image data mapped by building order
const FLOOR_DATA: Record<number, { floor1: string[]; floor2: string[] }> = {
  1: {
    floor1: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80',
    ],
    floor2: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=800&q=80',
    ],
  },
  2: {
    floor1: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80',
    ],
    floor2: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    ],
  },
  3: {
    floor1: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565793979168-49fff08c85ab?auto=format&fit=crop&w=800&q=80',
    ],
    floor2: [
      'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80',
    ],
  },
};

export default function BuildingDetailModal({ building, onClose }: BuildingDetailModalProps) {
  const [selectedFloor, setSelectedFloor] = useState<1 | 2 | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  // Reset floor selection when building changes
  useEffect(() => {
    setSelectedFloor(null);
    setLightboxImg(null);
  }, [building]);

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImg) {
          setLightboxImg(null);
        } else if (selectedFloor !== null) {
          setSelectedFloor(null);
        } else {
          onClose();
        }
      }
    };
    if (building) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [building, onClose, selectedFloor, lightboxImg]);

  if (!building) return null;

  const buildingOrder = building.order ?? 1;
  const floorData = FLOOR_DATA[buildingOrder] ?? FLOOR_DATA[1];
  const floorImages = selectedFloor === 1 ? floorData.floor1 : floorData.floor2;

  const floorLabel = (n: 1 | 2) => (n === 1 ? '1º Piso' : '2º Piso');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (lightboxImg) { setLightboxImg(null); return; }
            if (selectedFloor !== null) { setSelectedFloor(null); return; }
            onClose();
          }}
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0.1 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#120303] rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-slate-200 dark:border-green/20"
        >
          {/* Header Image */}
          <div className="relative h-52 sm:h-64 w-full overflow-hidden bg-primary-dark">
            {building.image ? (
              <img
                src={building.image}
                alt={building.name}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-primary-light">
                <Building2 className="w-20 h-20 text-white/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120303] via-[#120303]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/60 via-transparent to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-green hover:text-primary transition-all duration-300 backdrop-blur-md border border-white/10 z-20 focus:outline-none"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Back button (when floor selected) */}
            {selectedFloor !== null && (
              <button
                onClick={() => setSelectedFloor(null)}
                className="absolute top-4 left-4 p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-green hover:text-primary transition-all duration-300 backdrop-blur-md border border-white/10 z-20 focus:outline-none flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
            )}

            {/* Title */}
            <div className="absolute bottom-5 left-6 right-6 z-10 text-white">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                {building.name}
              </h2>
              {selectedFloor !== null && (
                <span className="inline-block mt-1 text-xs font-bold uppercase tracking-widest text-green">
                  {floorLabel(selectedFloor)}
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {selectedFloor === null ? (
                /* Floor Selection */
                <motion.div
                  key="floor-select"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-4">
                    Selecione o piso para ver as imagens
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {([1, 2] as const).map((floor) => (
                      <button
                        key={floor}
                        onClick={() => setSelectedFloor(floor)}
                        className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 dark:border-green/20 hover:border-green dark:hover:border-green bg-slate-50 dark:bg-slate-900/50 hover:bg-green/5 dark:hover:bg-green/10 transition-all duration-300 p-6 sm:p-8 text-center cursor-pointer"
                      >
                        {/* Floor number badge */}
                        <span className="w-12 h-12 rounded-full bg-primary dark:bg-green/10 group-hover:bg-green border-2 border-primary/20 dark:border-green/30 group-hover:border-green flex items-center justify-center text-white group-hover:text-primary font-extrabold text-lg transition-all duration-300">
                          {floor}
                        </span>

                        <div>
                          <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-white group-hover:text-primary dark:group-hover:text-green transition-colors">
                            {floorLabel(floor)}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {floorData[`floor${floor}` as 'floor1' | 'floor2'].length} imagens
                          </p>
                        </div>

                        <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-green transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Floor Images Gallery */
                <motion.div
                  key={`floor-${selectedFloor}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-400 dark:text-slate-500 mb-4">
                    Galeria — {floorLabel(selectedFloor)}
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {floorImages.map((src, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.07 }}
                        onClick={() => setLightboxImg(src)}
                        className="relative overflow-hidden rounded-xl aspect-video bg-slate-100 dark:bg-slate-800 group focus:outline-none"
                        aria-label={`Ver imagem ${idx + 1}`}
                      >
                        <img
                          src={src}
                          alt={`${building.name} – ${floorLabel(selectedFloor)} – imagem ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold uppercase tracking-wide bg-black/50 rounded-full px-3 py-1">
                            Ver
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
              className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <button
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                onClick={() => setLightboxImg(null)}
                aria-label="Fechar imagem"
              >
                <X className="w-6 h-6" />
              </button>
              <motion.img
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                src={lightboxImg}
                alt="Imagem ampliada"
                className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
