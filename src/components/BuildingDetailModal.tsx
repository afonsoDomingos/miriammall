'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building } from '../utils/mockData';
import { X, Building2, CheckCircle2, ArrowRight, Shield, Layers, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface BuildingDetailModalProps {
  building: Building | null;
  onClose: () => void;
}

export default function BuildingDetailModal({ building, onClose }: BuildingDetailModalProps) {
  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
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
  }, [building, onClose]);

  if (!building) return null;

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de obter mais informações sobre os espaços disponíveis no ${building.name} do Miriam Mall.`
  );
  const whatsappUrl = `https://wa.me/258865543026?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
          className="relative w-full max-w-3xl bg-white dark:bg-[#120303] rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-slate-200 dark:border-green/20"
        >
          {/* Header Image Container */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-primary-dark">
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

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120303] via-[#120303]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/60 via-transparent to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-green hover:text-primary transition-all duration-300 backdrop-blur-md border border-white/10 z-20 focus:outline-none"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Subtitle Badge */}
            <div className="absolute bottom-6 left-6 right-6 z-10 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-green text-primary mb-3 shadow-md">
                <Building2 className="w-3.5 h-3.5" /> Miriam Mall • Complexo
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                {building.name}
              </h2>
              {building.subtitle && (
                <p className="text-sm sm:text-base text-white/80 font-medium mt-1">
                  {building.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-20rem)] overflow-y-auto">
            {/* Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-green mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-green" /> Sobre este Edifício
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {building.description ||
                  `O ${building.name} foi concebido com os mais elevados padrões arquitetónicos para oferecer um espaço comercial de excelência no Miriam Mall, garantindo visibilidade, comodidade e fluxos otimizados para clientes e comerciantes.`}
              </p>
            </div>

            {/* Features & Floor Structure */}
            {building.features && building.features.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-100 dark:border-green/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-primary dark:text-white mb-4 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-green" /> Distribuição de Pisos e Espaços
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {building.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 shadow-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="p-3 sm:p-4 rounded-xl bg-green/5 dark:bg-green/10 border border-green/15 text-center">
                <Shield className="w-5 h-5 text-green mx-auto mb-1.5" />
                <span className="block text-xs font-bold text-slate-800 dark:text-white">Segurança</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">24/7 CCTV</span>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-green/5 dark:bg-green/10 border border-green/15 text-center">
                <MapPin className="w-5 h-5 text-green mx-auto mb-1.5" />
                <span className="block text-xs font-bold text-slate-800 dark:text-white">Localização</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Homoíne Central</span>
              </div>
              <div className="p-3 sm:p-4 rounded-xl bg-green/5 dark:bg-green/10 border border-green/15 text-center">
                <Sparkles className="w-5 h-5 text-green mx-auto mb-1.5" />
                <span className="block text-xs font-bold text-slate-800 dark:text-white">Acabamentos</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Modernos</span>
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-green/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/espacos"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2"
            >
              Ver Catálogo de Espaços
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green hover:bg-green-light text-primary font-bold text-xs uppercase tracking-wider transition-all duration-300 text-center flex items-center justify-center gap-2 shadow-lg shadow-green/20"
            >
              <MessageSquare className="w-4 h-4" /> Consultar Arrendamento <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
