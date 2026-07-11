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

  if (isAdminRoute) return null; // Admin dashboard does not show the public footer

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white border-t border-green/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img
                src="/MIRRIA LOGO.png"
                alt="Miriam Mall"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              O novo centro de compras, negócios, lazer e investimento no Distrito de Homoíne, 
              Província de Inhambane. Um empreendimento moderno focado no desenvolvimento regional.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-green hover:border-green transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-green hover:border-green transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:text-green hover:border-green transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-green font-semibold uppercase tracking-wider text-xs mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="text-white/70 hover:text-green transition-colors">
                  Sobre o Shopping
                </Link>
              </li>
              <li>
                <Link href="/espacos" className="text-white/70 hover:text-green transition-colors">
                  Espaços para Arrendar
                </Link>
              </li>
              <li>
                <Link href="/lojas" className="text-white/70 hover:text-green transition-colors">
                  Diretório de Lojas
                </Link>
              </li>
              <li>
                <Link href="/restaurantes" className="text-white/70 hover:text-green transition-colors">
                  Restauração
                </Link>
              </li>
              <li>
                <Link href="/promocoes" className="text-white/70 hover:text-green transition-colors">
                  Promoções Ativas
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Opportunities */}
          <div>
            <h3 className="text-green font-semibold uppercase tracking-wider text-xs mb-4">Investidores</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/espacos" className="text-white/70 hover:text-green transition-colors">
                  Porquê Investir
                </Link>
              </li>
              <li>
                <Link href="/espacos" className="text-white/70 hover:text-green transition-colors">
                  Plantas dos Espaços
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-white/70 hover:text-green transition-colors">
                  Formulário de Candidatura
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-white/70 hover:text-green transition-colors">
                  Acesso Administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-green font-semibold uppercase tracking-wider text-xs mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-2 items-start">
                <MapPin className="w-5 h-5 text-green shrink-0 mt-0.5" />
                <span>
                  Miriam Mall, Distrito de Homoíne,
                  <br />
                  Província de Inhambane, Moçambique
                </span>
              </li>
              <li className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-green" />
                <a href="tel:+258865543026" className="hover:text-green transition-colors">
                  +258 86 554 3026
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <MessageCircle className="w-4 h-4 text-green" />
                <a
                  href="https://wa.me/258865543026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green transition-colors flex items-center gap-1"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-green" />
                <a href="mailto:info@miriammall.co.mz" className="hover:text-green transition-colors">
                  info@miriammall.co.mz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/50 gap-4">
          <p>
            &copy; {currentYear} Miriam Mall. Todos os direitos reservados. | Powered by{' '}
            <a
              href="https://www.linkedin.com/in/afonso-domingos-6b59361a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green hover:text-green-light hover:underline transition-all font-medium"
            >
              Vibe
            </a>
          </p>
          <div className="flex gap-6">
            <Link href="/politica-de-privacidade" className="hover:text-green transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="hover:text-green transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
