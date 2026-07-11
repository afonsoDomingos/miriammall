'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Espaços', href: '/espacos' },
    { name: 'Lojas', href: '/lojas' },
    { name: 'Restaurantes', href: '/restaurantes' },
    { name: 'Promoções', href: '/promocoes' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Galeria', href: '/galeria' },
    { name: 'Contacto', href: '/contato' },
  ];

  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) return null; // Admin has its own sidebar

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm ${
        isScrolled ? 'py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src="/MIRRIA LOGO.png"
              alt="Miriam Mall"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide font-medium transition-colors hover:text-green relative py-1 ${
                    isActive ? 'text-green' : 'text-primary/80'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-green"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/espacos"
              className="text-xs uppercase tracking-wider text-green border border-green hover:bg-green hover:text-primary transition-all duration-300 font-semibold px-4 py-2 rounded"
            >
              Arrendar Espaço
            </Link>
            <Link
              href="/admin"
              className="text-xs uppercase tracking-wider bg-green hover:bg-green-light text-primary font-semibold px-4 py-2 rounded transition-all duration-300 flex items-center gap-1"
            >
              Painel Admin <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-green focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b border-slate-200"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 sm:px-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded text-base font-medium transition-colors hover:bg-slate-50 hover:text-green ${
                      isActive ? 'text-green bg-slate-50' : 'text-primary/90'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 flex flex-col gap-3 px-3">
                <Link
                  href="/espacos"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center tracking-wider text-green border border-green hover:bg-green hover:text-primary transition-all duration-300 font-semibold py-2.5 rounded text-sm uppercase"
                >
                  Arrendar Espaço
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center tracking-wider bg-green hover:bg-green-light text-primary font-semibold py-2.5 rounded transition-all duration-300 text-sm uppercase flex items-center justify-center gap-1"
                >
                  Painel Admin <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
