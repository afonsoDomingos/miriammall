'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { KeyRound, User, ArrowLeft, Eye, EyeOff, Lock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (sessionStorage.getItem('miriam_admin_authenticated') === 'true') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (data.success) {
        sessionStorage.setItem('miriam_admin_authenticated', 'true');
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Credenciais incorretas. Tente novamente.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Erro de ligação ao servidor. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-primary-dark">
      {/* Background architectural image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 scale-105 filter blur-[3px]"
        style={{ backgroundImage: "url('/MIRIAM_BUILDING.jpg')" }}
      />
      {/* Premium Burgundy to Dark Wine gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary-dark/85 to-primary-dark/98 z-0" />
      
      {/* Glowing background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-green/10 blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        className="relative z-10 w-full max-w-md backdrop-blur-xl bg-primary-dark/65 border border-green/20 rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(16,185,129,0.12)] border-t-white/10"
      >
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-green transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> 
            Voltar ao Website
          </Link>
          
          <div className="flex justify-center mb-2">
            <h1 className="text-3xl font-serif font-bold text-white tracking-widest flex flex-col items-center">
              <span className="flex items-center gap-1.5 font-sans text-green text-[10px] tracking-[0.25em] font-semibold uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} /> Área Administrativa
              </span>
              MIRIAM
              <span className="text-green text-xs font-sans tracking-[0.3em] font-light mt-1">
                MALL SHOPPING
              </span>
            </h1>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs text-center mb-6 overflow-hidden"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase text-white/50 mb-2 tracking-widest">
              Nome de Utilizador
            </label>
            <div className="relative group">
              <input
                type="text"
                required
                disabled={isLoading}
                placeholder="Introduza o e-mail ou 'admin'"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-primary-dark/80 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300"
              />
              <User className="w-4 h-4 text-white/30 absolute left-3.5 top-4 transition-colors group-focus-within:text-green" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-white/50 mb-2 tracking-widest">
              Palavra-passe
            </label>
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLoading}
                placeholder="Introduza a palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary-dark/80 border border-white/10 rounded-xl pl-11 pr-11 py-3.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300"
              />
              <Lock className="w-4 h-4 text-white/30 absolute left-3.5 top-4 transition-colors group-focus-within:text-green" />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-4 text-white/30 hover:text-green transition-colors focus:outline-none"
                aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green to-green-dark hover:from-green-light hover:to-green disabled:from-green/50 disabled:to-green-dark/50 disabled:cursor-not-allowed text-primary font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.35)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" /> Entrar no Painel
                </>
              )}
            </button>
          </div>
        </form>

        {/* Development credentials box */}
        <div className="mt-8 text-center bg-primary-dark/40 border border-white/5 rounded-2xl p-4 text-[10px] text-white/40">
          <div className="font-semibold tracking-wider text-[9px] uppercase text-white/30">Credenciais Padrão:</div>
          <div className="mt-2 flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2">
            <div>
              <span className="text-white/50 font-medium">E-mail:</span>{' '}
              <span className="text-green font-mono">admin@miriammall.com</span>
            </div>
            <span className="hidden sm:inline text-white/20">|</span>
            <div>
              <span className="text-white/50 font-medium">Senha:</span>{' '}
              <span className="text-green font-mono">@Admin123@</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
