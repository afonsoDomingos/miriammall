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
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-22 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[200] bg-primary-dark/95 border border-green/30 backdrop-blur-md text-white p-5 rounded-2xl shadow-2xl"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-green/10 flex items-center justify-center shrink-0 mt-0.5 border border-green/20">
              <Cookie className="w-5 h-5 text-green animate-pulse" />
            </div>

            <div className="flex-grow space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-sm font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green" /> Política de Privacidade & Cookies
                </h4>
                <button
                  onClick={handleAcceptEssential}
                  className="text-white/40 hover:text-white transition-colors p-1"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-white/80 leading-relaxed">
                Utilizamos cookies essenciais para garantir o funcionamento seguro e eficiente do site, e cookies analíticos para melhorar a sua experiência. Saiba mais na nossa{' '}
                <Link href="/politica-de-cookies" className="text-green underline hover:text-green-light font-medium">
                  Política de Cookies
                </Link>.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={handleAcceptAll}
                  className="bg-green hover:bg-green-light text-primary text-[11px] font-bold uppercase tracking-wider py-2 px-4 rounded-lg transition-all duration-300 shadow-md shadow-emerald-500/10 cursor-pointer flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Aceitar Todos
                </button>

                <button
                  onClick={handleAcceptEssential}
                  className="border border-white/20 hover:border-white/50 text-white/80 hover:text-white text-[11px] font-bold uppercase tracking-wider py-2 px-4 rounded-lg transition-all duration-300 cursor-pointer"
                >
                  Apenas Essenciais
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
