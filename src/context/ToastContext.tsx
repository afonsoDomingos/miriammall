'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showSuccess: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((type: ToastType, message: string, title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { id, type, message, title };
    
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  }, [removeToast]);

  const showError = useCallback((message: string, title?: string) => {
    showToast('error', message, title || 'Ocorreu um Erro');
  }, [showToast]);

  const showSuccess = useCallback((message: string, title?: string) => {
    showToast('success', message, title || 'Sucesso');
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, showError, showSuccess }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-[300] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4">
        <AnimatePresence>
          {toasts.map((toast) => {
            const isError = toast.type === 'error';
            const isSuccess = toast.type === 'success';
            const isWarning = toast.type === 'warning';

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`pointer-events-auto relative flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md text-white ${
                  isError
                    ? 'bg-red-600/95 border-red-400/50 shadow-red-900/20'
                    : isSuccess
                    ? 'bg-emerald-600/95 border-emerald-400/50 shadow-emerald-900/20'
                    : isWarning
                    ? 'bg-amber-600/95 border-amber-400/50 shadow-amber-900/20'
                    : 'bg-slate-800/95 border-slate-600/50 shadow-slate-900/20'
                }`}
              >
                {/* Icon */}
                <div className="shrink-0 mt-0.5">
                  {isError && <AlertCircle className="w-5 h-5 text-red-100" />}
                  {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-100" />}
                  {isWarning && <AlertTriangle className="w-5 h-5 text-amber-100" />}
                  {!isError && !isSuccess && !isWarning && <Info className="w-5 h-5 text-slate-100" />}
                </div>

                {/* Body */}
                <div className="flex-grow pr-3">
                  {toast.title && (
                    <h4 className="font-bold text-xs uppercase tracking-wider mb-0.5 opacity-90">
                      {toast.title}
                    </h4>
                  )}
                  <p className="text-xs leading-relaxed font-medium break-words">
                    {toast.message}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 text-white/70 hover:text-white transition-colors p-0.5 rounded-md hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
