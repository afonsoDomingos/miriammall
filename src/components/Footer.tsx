'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isSobrePage = pathname === '/sobre';

  if (isAdminRoute) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-primary-dark text-white border-t border-green/15 ${isSobrePage ? 'py-1.5 sm:py-2' : 'py-3 sm:py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 items-start text-center md:text-left">
          {/* 1. Logo & Redes Sociais */}
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <Link href="/" className="inline-block">
              <img
                src="/miriam-logo.png"
                alt="Miriam Mall"
                style={{ maxHeight: '26px' }}
                className="h-6 w-auto object-contain brightness-0 invert"
              />
            </Link>
            {/* Redes Sociais */}
            <div className="flex items-center gap-1.5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-green hover:text-primary flex items-center justify-center transition-all duration-300 text-white/80"
              >
                <FacebookIcon className="w-3 h-3" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-green hover:text-primary flex items-center justify-center transition-all duration-300 text-white/80"
              >
                <InstagramIcon className="w-3 h-3" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-green hover:text-primary flex items-center justify-center transition-all duration-300 text-white/80"
              >
                <LinkedinIcon className="w-3 h-3" />
              </a>
              <a
                href="https://wa.me/258865543026"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-green hover:text-primary flex items-center justify-center transition-all duration-300 text-white/80"
              >
                <MessageCircle className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 2. Informações de Contacto */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <h4 className="text-[11px] uppercase font-bold tracking-widest text-green leading-none mb-0.5">
              Contacto
            </h4>
            <a
              href="tel:+258865543026"
              className="flex items-center gap-1.5 text-[11px] text-white/80 hover:text-green transition-colors"
            >
              <Phone className="w-3 h-3 text-green shrink-0" />
              <span>+258 86 554 3026 / +258 84 000 0000</span>
            </a>
            <a
              href="mailto:info@miriammall.com"
              className="flex items-center gap-1.5 text-[11px] text-white/80 hover:text-green transition-colors"
            >
              <Mail className="w-3 h-3 text-green shrink-0" />
              <span>info@miriammall.com</span>
            </a>
            <a
              href="https://wa.me/258865543026"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-white/80 hover:text-green transition-colors"
            >
              <MessageCircle className="w-3 h-3 text-green shrink-0" />
              <span>Atendimento via WhatsApp</span>
            </a>
          </div>

          {/* 3. Localização */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <h4 className="text-[11px] uppercase font-bold tracking-widest text-green leading-none mb-0.5">
              Localização
            </h4>
            <div className="flex items-start gap-1.5 text-[11px] text-white/80">
              <MapPin className="w-3 h-3 text-green shrink-0 mt-0.5" />
              <p className="leading-snug">
                MOÇAMBIQUE / HOMOÍNE / MUNICÍPIO DA VILA DE HOMOÍNE
              </p>
            </div>
          </div>
        </div>

        {/* Linha separadora */}
        <hr className="border-0 border-t border-white/25 mt-3 mb-0" />

        {/* Linha de Copyright Simples */}
        <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-1.5 text-[10px] text-white/50">
          {/* Coluna 1: Links (alinha com logo) */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            <Link href="/sobre" className="text-green hover:text-green-light transition-colors font-medium">
              Sobre Nós
            </Link>
            <Link href="/espacos" className="text-green hover:text-green-light transition-colors font-medium">
              Espaços
            </Link>
            <Link href="/contato" className="text-green hover:text-green-light transition-colors font-medium">
              Contacto
            </Link>
          </div>
          {/* Coluna 2: vazia */}
          <div />
          {/* Coluna 3: Copyright (alinha com Localização) */}
          <p className="text-center md:text-left">© {currentYear} Shopping Miriam Mall. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
