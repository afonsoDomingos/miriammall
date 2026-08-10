'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X, Check, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('miriam_mall_cookies_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('miriam_mall_cookies_consent', 'all');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('miriam_mall_cookies_consent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: '-50%', scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: 30, x: '-50%', scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[290px] sm:max-w-sm sm:left-6 sm:translate-x-0 sm:bottom-20 z-[200] bg-primary-dark/95 border border-green/30 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-xl shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 sm:gap-3 text-center sm:text-left">
            <div className="w-7 h-7 rounded-full bg-green/10 flex items-center justify-center shrink-0 border border-green/20">
              <Cookie className="w-4 h-4 text-green animate-pulse" />
            </div>

            <div className="flex-grow space-y-1.5 w-full">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-xs font-bold text-white flex items-center justify-center sm:justify-start gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green" /> Cookies & Privacidade
                </h4>
                <button
                  onClick={handleAcceptEssential}
                  className="text-white/40 hover:text-white transition-colors p-0.5"
                  aria-label="Fechar"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[10px] sm:text-xs text-white/80 leading-relaxed">
                Utilizamos cookies essenciais para garantir o correto funcionamento do site. Saiba mais na{' '}
                <Link href="/politica-de-cookies" className="text-green underline hover:text-green-light font-medium">
                  Política de Cookies
                </Link>.
              </p>

              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                <button
                  onClick={handleAcceptAll}
                  className="bg-green hover:bg-green-light text-primary text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-md transition-all duration-300 shadow-md shadow-emerald-500/10 cursor-pointer flex items-center gap-1"
                >
                  <Check className="w-3 h-3" /> Aceitar Todos
                </button>

                <button
                  onClick={handleAcceptEssential}
                  className="border border-white/20 hover:border-white/50 text-white/80 hover:text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-md transition-all duration-300 cursor-pointer"
                >
                  Essenciais
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
