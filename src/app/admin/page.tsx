'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldAlert, KeyRound, User, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (sessionStorage.getItem('mirriam_admin_authenticated') === 'true') {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'mirriam2026') {
      sessionStorage.setItem('mirriam_admin_authenticated', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Credenciais incorretas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')" }}></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-green/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-green/10 blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md bg-primary border border-green/20 rounded-xl p-8 shadow-2xl green-glow">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-green transition-colors mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Website Público
          </Link>
          <div className="w-16 h-16 rounded-full bg-green/10 border border-green/30 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8 text-green" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white tracking-wide">Área Administrativa</h2>
          <p className="text-xs text-white/60 mt-1.5">Faça login para gerir o Mirriam Mall</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded text-xs text-center mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-white/70 mb-1.5 tracking-wider">
              Nome de Utilizador
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ex: admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-primary-dark border border-white/10 rounded pl-10 pr-3 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-green transition-all"
              />
              <User className="w-4 h-4 text-white/30 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-white/70 mb-1.5 tracking-wider">
              Palavra-passe
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary-dark border border-white/10 rounded pl-10 pr-3 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-green transition-all"
              />
              <KeyRound className="w-4 h-4 text-white/30 absolute left-3 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-green hover:bg-green-light text-primary text-xs font-bold uppercase tracking-wider py-3.5 rounded transition-all duration-300"
            >
              Iniciar Sessão
            </button>
          </div>
        </form>

        <div className="text-center mt-6 text-[10px] text-white/40 border-t border-white/5 pt-4">
          Credenciais demonstrativas: <strong className="text-green">admin</strong> / <strong className="text-green">mirriam2026</strong>
        </div>
      </div>
    </div>
  );
}
