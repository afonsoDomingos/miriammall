'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user was already welcomed in this session
    const wasWelcomed = sessionStorage.getItem('miriam_mall_welcomed');
    const isAdmin = pathname?.startsWith('/admin');

    if (!wasWelcomed && !isAdmin) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // 1.5 seconds delay

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('miriam_mall_welcomed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-primary-dark/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full max-w-md overflow-hidden bg-white dark:bg-[#120303] border border-green/20 rounded-2xl shadow-2xl p-6 sm:p-8"
          >
            {/* Elegant Header Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green via-emerald-500 to-green-light" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-primary/40 dark:text-white/40 hover:text-green hover:bg-slate-50 dark:hover:bg-slate-800/50 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
              aria-label="Fechar Boas-vindas"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon decoration */}
            <div className="mx-auto w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-green animate-pulse" />
            </div>

            {/* Content */}
            <div className="text-center space-y-3">
              <span className="text-[10px] text-green font-bold uppercase tracking-widest block">
                Homoíne • Inhambane
              </span>
              <h3 className="font-serif text-2xl font-bold text-primary dark:text-white">
                Bem-vindo ao Miriam Mall! 🌟
              </h3>
              <p className="text-primary/75 dark:text-white/70 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                O novo destino de compras, lazer e investimento da província de Inhambane. Explore as nossas marcas, restaurantes e oportunidades de arrendamento comercial de alto nível.
              </p>
              
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-primary/50 dark:text-white/50 pt-1">
                <MapPin className="w-3.5 h-3.5 text-green" />
                <span>Homoíne, Moçambique</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-green/10">
              <button
                onClick={handleClose}
                className="w-full bg-green hover:bg-green-light text-primary text-xs font-bold uppercase tracking-widest py-3 rounded-lg transition-all duration-300 shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                Começar a Explorar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
