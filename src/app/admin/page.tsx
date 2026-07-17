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
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/MIRIAM_BUILDING.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/70" />
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white h-full">
          <img 
            src="/MIRIAM LOGO.png" 
            alt="Miriam Mall" 
            className="h-20 w-auto mb-8 brightness-0 invert"
          />
          <h2 className="text-4xl font-serif font-bold mb-4 text-center">
            Bem-vindo ao Miriam Mall
          </h2>
          <p className="text-white/80 text-center max-w-md leading-relaxed">
            Centro comercial moderno em Homoíne, Inhambane. Gerencie espaços, lojas e eventos do seu shopping com facilidade.
          </p>
          <div className="mt-12 flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green">2</div>
              <div className="text-xs text-white/60 uppercase tracking-wider mt-1">Pisos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green">24/7</div>
              <div className="text-xs text-white/60 uppercase tracking-wider mt-1">Segurança</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green">50+</div>
              <div className="text-xs text-white/60 uppercase tracking-wider mt-1">Espaços</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-white">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img 
              src="/MIRIAM LOGO.png" 
              alt="Miriam Mall" 
              className="h-12 w-auto mx-auto mb-4"
            />
            <h2 className="text-2xl font-serif font-bold text-primary">Miriam Mall</h2>
          </div>

          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-primary/60 hover:text-green transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            Voltar ao Website
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-primary mb-2">
              Painel Administrativo
            </h1>
            <p className="text-primary/60 text-sm">
              Entre com suas credenciais para acessar o painel
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm mb-6 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                E-mail ou Nome de Utilizador
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  disabled={isLoading}
                  placeholder="admin@miriammall.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300"
                />
                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Palavra-passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-12 py-3.5 text-sm text-primary placeholder-slate-400 focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300"
                />
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-green transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green hover:bg-green-dark text-white font-semibold text-sm py-4 rounded-xl shadow-lg shadow-green/20 hover:shadow-green/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    A entrar...
                  </>
                ) : (
                  <>
                    <KeyRound className="w-5 h-5" /> Entrar no Painel
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Credentials Box */}
          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="text-xs font-semibold text-primary/40 uppercase tracking-wider mb-3">
              Credenciais de Desenvolvimento
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-primary/60">E-mail:</span>
                <span className="font-mono text-green font-medium">admin@miriammall.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary/60">Senha:</span>
                <span className="font-mono text-green font-medium">@Admin123@</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-primary/40">
            © 2024 Miriam Mall. Todos os direitos reservados.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
