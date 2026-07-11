'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '../../components/AdminSidebar';
import { ShieldCheck } from 'lucide-react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isLoginPage = pathname === '/admin';

  useEffect(() => {
    if (isLoginPage) {
      setIsLoading(false);
      return;
    }

    const checkAuth = () => {
      const auth = sessionStorage.getItem('miriam_admin_authenticated');
      if (auth === 'true') {
        setIsAuthenticated(true);
      } else {
        router.push('/admin');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router, isLoginPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-dark flex flex-col items-center justify-center text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green mb-4"></div>
        <p className="text-xs uppercase tracking-wider text-white/60">A carregar segurança...</p>
      </div>
    );
  }

  // If it is the login page, render without sidebar layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If authenticated, render with sidebar layout
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex bg-slate-50 text-slate-800">
        <AdminSidebar />
        <div className="flex-grow flex flex-col max-h-screen overflow-y-auto">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
            <h2 className="font-serif text-lg font-semibold text-primary">Painel de Controlo Administrativo</h2>
            <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded border border-emerald-200">
              <ShieldCheck className="w-4 h-4" /> Sessão de Administrador Ativa
            </div>
          </header>

          {/* Page Contents */}
          <div className="flex-grow p-8 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return null; // Prevents flashing during redirect
}
