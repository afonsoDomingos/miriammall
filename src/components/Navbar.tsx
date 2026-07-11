'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Sun, Moon, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDatabase } from '../context/DatabaseContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { stores, restaurants, spaces, events, promotions } = useDatabase();

  // ESC key listener to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter logic
  const query = searchQuery.toLowerCase().trim();
  const matchedStores = query ? stores.filter(s => s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query) || s.description.toLowerCase().includes(query)) : [];
  const matchedRestaurants = query ? restaurants.filter(r => r.name.toLowerCase().includes(query) || r.category.toLowerCase().includes(query)) : [];
  const matchedSpaces = query ? spaces.filter(s => s.number.toLowerCase().includes(query) || s.description.toLowerCase().includes(query)) : [];
  const matchedEvents = query ? events.filter(e => e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query)) : [];
  const matchedPromotions = query ? promotions.filter(p => p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || p.storeName.toLowerCase().includes(query)) : [];
  
  const hasResults = matchedStores.length > 0 || matchedRestaurants.length > 0 || matchedSpaces.length > 0 || matchedEvents.length > 0 || matchedPromotions.length > 0;

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

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
    { name: 'Blog', href: '/blog' },
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
              src="/MIRIAM LOGO.png"
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

          {/* CTA Buttons & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => { setIsSearchOpen(true); setSearchQuery(''); }}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 text-primary hover:text-green hover:border-green hover:bg-white transition-all duration-300 dark:bg-slate-800/20 dark:border-green/10"
              title="Pesquisar no Site"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-50 border border-slate-200/60 text-primary hover:text-green hover:border-green hover:bg-white transition-all duration-300 dark:bg-slate-800/20 dark:border-green/10"
              title={theme === 'light' ? 'Ativar Modo Escuro' : 'Ativar Modo Claro'}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-green" />}
            </button>
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
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => { setIsSearchOpen(true); setSearchQuery(''); }}
              className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/60 text-primary hover:text-green transition-all"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-slate-50 border border-slate-200/60 text-primary hover:text-green transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-green" />}
            </button>
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

      {/* Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary-dark/95 backdrop-blur-md flex flex-col p-6 sm:p-12 overflow-y-auto cursor-default"
          >
            {/* Close Button */}
            <div className="flex justify-between items-center max-w-5xl mx-auto w-full mb-8">
              <span className="text-[10px] text-green font-bold uppercase tracking-widest">
                Pesquisa Global • Miriam Mall
              </span>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-white/60 hover:text-white bg-white/10 w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fechar Pesquisa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input box */}
            <div className="max-w-3xl mx-auto w-full mb-12">
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  placeholder="Pesquise por Lojas, Restaurantes, Promoções, Eventos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-white/20 text-white text-lg sm:text-2xl placeholder-white/30 focus:outline-none focus:border-green py-4 transition-all"
                />
                <Search className="w-6 h-6 text-white/30 absolute right-2 top-5" />
              </div>
              <p className="text-[10px] text-white/40 mt-2">
                Pressione <kbd className="bg-white/10 px-1 rounded text-[9px]">ESC</kbd> para fechar a pesquisa.
              </p>
            </div>

            {/* Results Grid */}
            <div className="max-w-5xl mx-auto w-full flex-grow">
              {searchQuery && !hasResults && (
                <div className="text-center py-12 text-white/40">
                  Nenhum resultado encontrado para &ldquo;<span className="text-white font-semibold">{searchQuery}</span>&rdquo;.
                </div>
              )}

              {searchQuery && hasResults && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12 animate-in fade-in duration-300">
                  {/* Matching Stores */}
                  {matchedStores.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-green text-[10px] uppercase font-bold tracking-widest border-b border-green/20 pb-2">
                        Lojas ({matchedStores.length})
                      </h4>
                      <div className="space-y-2">
                        {matchedStores.map(store => (
                          <Link
                            key={store.id}
                            href="/lojas"
                            onClick={() => setIsSearchOpen(false)}
                            className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-green/20 transition-all group"
                          >
                            <span className="text-xs font-bold text-white group-hover:text-green transition-colors">
                              {store.name}
                            </span>
                            <span className="block text-[9px] text-white/50 mt-1 uppercase">
                              {store.category} • Piso {store.floor}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Restaurants */}
                  {matchedRestaurants.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-green text-[10px] uppercase font-bold tracking-widest border-b border-green/20 pb-2">
                        Restaurantes ({matchedRestaurants.length})
                      </h4>
                      <div className="space-y-2">
                        {matchedRestaurants.map(rest => (
                          <Link
                            key={rest.id}
                            href="/restaurantes"
                            onClick={() => setIsSearchOpen(false)}
                            className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-green/20 transition-all group"
                          >
                            <span className="text-xs font-bold text-white group-hover:text-green transition-colors">
                              {rest.name}
                            </span>
                            <span className="block text-[9px] text-white/50 mt-1 uppercase">
                              {rest.category}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Spaces */}
                  {matchedSpaces.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-green text-[10px] uppercase font-bold tracking-widest border-b border-green/20 pb-2">
                        Espaços Comerciais ({matchedSpaces.length})
                      </h4>
                      <div className="space-y-2">
                        {matchedSpaces.map(space => (
                          <Link
                            key={space.id}
                            href={`/espacos/${space.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-green/20 transition-all group"
                          >
                            <span className="text-xs font-bold text-white group-hover:text-green transition-colors">
                              {space.number}
                            </span>
                            <span className="block text-[9px] text-white/50 mt-1 uppercase">
                              {space.area} m² • Piso {space.floor} • {space.status}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Promotions */}
                  {matchedPromotions.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-green text-[10px] uppercase font-bold tracking-widest border-b border-green/20 pb-2">
                        Promoções ({matchedPromotions.length})
                      </h4>
                      <div className="space-y-2">
                        {matchedPromotions.map(promo => (
                          <Link
                            key={promo.id}
                            href="/promocoes"
                            onClick={() => setIsSearchOpen(false)}
                            className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-green/20 transition-all group"
                          >
                            <span className="text-xs font-bold text-white group-hover:text-green transition-colors">
                              {promo.title}
                            </span>
                            <span className="block text-[9px] text-white/50 mt-1 uppercase">
                              {promo.storeName}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Events */}
                  {matchedEvents.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-green text-[10px] uppercase font-bold tracking-widest border-b border-green/20 pb-2">
                        Eventos ({matchedEvents.length})
                      </h4>
                      <div className="space-y-2">
                        {matchedEvents.map(event => (
                          <Link
                            key={event.id}
                            href="/eventos"
                            onClick={() => setIsSearchOpen(false)}
                            className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-green/20 transition-all group"
                          >
                            <span className="text-xs font-bold text-white group-hover:text-green transition-colors">
                              {event.title}
                            </span>
                            <span className="block text-[9px] text-white/50 mt-1 uppercase">
                              {event.date}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
