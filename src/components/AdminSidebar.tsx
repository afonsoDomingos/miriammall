'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building,
  Store,
  FileText,
  UtensilsCrossed,
  Tag,
  Calendar,
  LogOut,
  Globe,
  Sliders
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Banners do Site', href: '/admin/banners', icon: Sliders },
    { name: 'Espaços Comerciais', href: '/admin/espacos', icon: Building },
    { name: 'Lojas', href: '/admin/lojas', icon: Store },
    { name: 'Restaurantes', href: '/admin/restaurantes', icon: UtensilsCrossed },
    { name: 'Promoções', href: '/admin/promocoes', icon: Tag },
    { name: 'Eventos', href: '/admin/eventos', icon: Calendar },
    { name: 'Pedidos de Arrendamento', href: '/admin/pedidos', icon: FileText }
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('miriam_admin_authenticated');
    router.push('/admin');
  };

  return (
    <aside className="w-64 bg-primary text-white flex flex-col justify-between border-r border-green/15 shrink-0 min-h-screen">
      <div>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-green/10 flex items-center justify-between">
          <Link href="/admin/dashboard" className="block">
            <div className="flex items-center gap-2">
              <img
                src="/MIRIAM LOGO.png"
                alt="Miriam Mall"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
              <span className="text-[9px] bg-green/10 text-green px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                Admin
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5 flex-grow">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-green text-primary font-bold'
                    : 'text-white/80 hover:bg-white/5 hover:text-green'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-green/10 space-y-2">
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-green transition-colors"
        >
          <Globe className="w-4 h-4 shrink-0" />
          <span>Ver Site Público</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-colors focus:outline-none"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Sair / Terminar</span>
        </button>
      </div>
    </aside>
  );
}
