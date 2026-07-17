'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldAlert, KeyRound, User, ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-primary-dark flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background image with a dark burgundy overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25 scale-105 filter blur-[2px]" 
        style={{ backgroundImage: "url('/MIRIAM_BUILDING.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/95 via-primary-dark/80 to-primary-dark z-0" />
      
      {/* Ambient glow decoration */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-green/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-green/10 blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md backdrop-blur-md bg-primary/80 border border-green/15 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-green-glow"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-green transition-colors mb-6 group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" /> Voltar ao Website Público
          </Link>
          
          <div className="flex justify-center mb-4">
            <div className="relative">
              <img
                src="/MIRIAM LOGO.png"
                alt="Miriam Mall"
                className="h-12 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  // Fallback if logo image fails to load
                  e.currentTarget.style.display = 'none';
                  const textFallback = document.getElementById('brand-text-fallback');
                  if (textFallback) textFallback.style.display = 'block';
                }}
              />
              <span id="brand-text-fallback" className="hidden text-2xl font-serif font-bold text-white tracking-widest">
                MIRIAM <span className="text-green">MALL</span>
              </span>
            </div>
          </div>
          <p className="text-xs text-white/50 uppercase tracking-widest font-semibold mt-2.5">Área Administrativa</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs text-center mb-6"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-bold uppercase text-white/60 mb-2 tracking-widest">
              Nome de Utilizador
            </label>
            <div className="relative">
              <input
                type="text"
                required
                disabled={isLoading}
                placeholder="Introduza o seu e-mail ou 'admin'"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-primary-dark/60 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
              />
              <User className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-white/60 mb-2 tracking-widest">
              Palavra-passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={isLoading}
                placeholder="Introduza a sua palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary-dark/60 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
              />
              <Lock className="w-4 h-4 text-white/30 absolute left-3.5 top-3.5" />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-white/30 hover:text-green transition-colors focus:outline-none"
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
              className="w-full bg-gradient-to-r from-green to-green-dark hover:from-green-light hover:to-green disabled:from-green/50 disabled:to-green-dark/50 disabled:cursor-not-allowed text-primary font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-lg hover:shadow-green/20 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" /> Iniciar Sessão
                </>
              )}
            </button>
          </div>
        </form>

        {/* Development credentials box */}
        <div className="mt-8 text-center bg-primary-dark/30 border border-white/5 rounded-xl p-3.5 text-[10px] text-white/40">
          <div>Credenciais de Acesso Padrão:</div>
          <div className="mt-1 flex flex-wrap justify-center gap-1.5 font-medium">
            <span className="text-white/60">E-mail:</span>
            <span className="text-green font-mono">admin@miriammall.com</span>
            <span className="text-white/30">|</span>
            <span className="text-white/60">Senha:</span>
            <span className="text-green font-mono">@Admin123@</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
