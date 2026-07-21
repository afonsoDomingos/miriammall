'use client';

import React, { useState } from 'react';
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
  Sliders,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Banners', href: '/admin/banners', icon: Sliders },
    { name: 'Espaços', href: '/admin/espacos', icon: Building },
    { name: 'Lojas', href: '/admin/lojas', icon: Store },
    { name: 'Restaurantes', href: '/admin/restaurantes', icon: UtensilsCrossed },
    { name: 'Promoções', href: '/admin/promocoes', icon: Tag },
    { name: 'Eventos', href: '/admin/eventos', icon: Calendar },
    { name: 'Pedidos', href: '/admin/pedidos', icon: FileText },
    { name: 'Blog', href: '/admin/blog', icon: BookOpen }
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('miriam_admin_authenticated');
    router.push('/admin');
  };

  return (
    <aside 
      className={`bg-primary text-white flex flex-col justify-between border-r border-green/15 min-h-screen transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-green/10 flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/admin/dashboard" className="block flex-1">
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
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded hover:bg-white/10 transition-colors text-white/70 hover:text-green"
            aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5 flex-grow">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-green text-primary font-bold'
                    : 'text-white/80 hover:bg-white/5 hover:text-green'
                }`}
                title={isCollapsed ? item.name : ''}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-green/10 space-y-2">
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-white/70 hover:bg-white/5 hover:text-green transition-colors"
          title={isCollapsed ? 'Ver Site Público' : ''}
        >
          <Globe className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Ver Site</span>}
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-colors focus:outline-none"
          title={isCollapsed ? 'Sair' : ''}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
