'use client';

import React, { useState } from 'react';
import { MessageCircle, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide on admin routes
  const isAdminRoute = pathname?.startsWith('/admin');
  if (isAdminRoute) return null;

  const contacts = [
    {
      title: 'Comercial & Arrendamento',
      desc: 'Fale com a equipa de vendas sobre lojas disponíveis.',
      link: 'https://wa.me/258865543026?text=Ola!%20Gostaria%20de%20saber%20mais%20sobre%20o%20arrendamento%20de%20espacos%20no%20Miriam%20Mall.',
    },
    {
      title: 'Apoio Geral e Dúvidas',
      desc: 'Informações sobre eventos, horários e lojas.',
      link: 'https://wa.me/258865543026?text=Ola!%20Preciso%20de%20suporte/informacoes%20sobre%20o%20Miriam%20Mall.',
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-72 sm:w-80 rounded-2xl glass shadow-2xl overflow-hidden border border-green/20"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-white flex items-center justify-between border-b border-green/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-green/10 flex items-center justify-center relative">
                  <MessageCircle className="w-5 h-5 text-green" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-primary animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">Atendimento Miriam Mall</h4>
                  <p className="text-[10px] text-green font-medium">Online • Resposta Rápida</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 bg-white/95 dark:bg-slate-900/95">
              <p className="text-primary/80 dark:text-white/80 text-[11px] leading-relaxed">
                Olá! Seja bem-vindo à nossa central de contactos. Como podemos ajudar hoje?
              </p>
              
              <div className="space-y-2">
                {contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg border border-slate-100 dark:border-green/10 bg-slate-50/50 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:border-green/30 transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-bold text-xs text-primary dark:text-white group-hover:text-green transition-colors">
                        {contact.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                      {contact.desc}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 rounded-full bg-[#25D366] hover:bg-[#20ba56] text-white shadow-lg flex items-center justify-center cursor-pointer group shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 focus:outline-none"
        aria-label="Abrir contactos WhatsApp"
        type="button"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <MessageCircle className="w-5.5 h-5.5 text-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
