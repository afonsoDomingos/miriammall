'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Shield, Users, Clock, Landmark, Compass, Award } from 'lucide-react';
import Link from 'next/link';

export default function Sobre() {
  const features = [
    { icon: MapPinIcon, title: 'Localização Estratégica', text: 'Situado no centro do Distrito de Homoíne, facilitando o acesso para todos.' },
    { icon: Compass, title: 'Fácil Acesso', text: 'Entradas amplas e planeamento de tráfego para uma experiência sem complicações.' },
    { icon: Shield, title: 'Segurança Integrada', text: 'Vigilância física especializada e CCTV em todas as áreas comuns do edifício.' },
    { icon: Users, title: 'Ambiente Familiar', text: 'Corredores largos, fraldário e praça de alimentação projetada para todas as idades.' },
    { icon: Landmark, title: 'Infraestrutura Moderna', text: 'Instalação elétrica de alta tensão com gerador de emergência, redes de dados e saneamento moderno.' },
    { icon: Award, title: 'Espaços Comerciais Premium', text: 'Lojas prontas a funcionar com excelentes acabamentos e condições financeiras flexíveis.' }
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        {/* Banner */}
        <section className="relative bg-primary py-20 text-white text-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80')" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <span className="text-green uppercase tracking-widest text-xs font-semibold block mb-2">Quem Somos</span>
            <h1 className="text-4xl font-serif font-bold mb-4">Sobre o Mirriam Mall</h1>
            <p className="text-white/70 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Conheça a história, a visão e a infraestrutura do mais moderno empreendimento comercial do Distrito de Homoíne.
            </p>
          </div>
        </section>

        {/* History and Vision */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-primary">Impulsionando o Futuro de Homoíne</h2>
              <p className="text-primary/70 text-sm sm:text-base leading-relaxed">
                O **Mirriam Mall** foi projetado para responder à crescente necessidade de espaços comerciais modernos no Distrito de Homoíne, na Província de Inhambane. Como pioneiros na região, acreditamos que a descentralização do retalho de luxo e conveniência é um passo vital para o desenvolvimento económico local.
              </p>
              <p className="text-primary/70 text-sm sm:text-base leading-relaxed">
                A nossa visão é estabelecer o Mirriam Mall como o ponto de encontro favorito da população, gerando empregos, apoiando empreendedores locais e oferecendo produtos e serviços de marcas líderes nacionais e internacionais num só lugar, com o máximo conforto e elegância.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/espacos"
                  className="bg-green hover:bg-green-light text-primary text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded transition-colors"
                >
                  Arrendar Espaço
                </Link>
                <Link
                  href="/contato"
                  className="border border-primary hover:bg-primary hover:text-white text-primary text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded transition-colors"
                >
                  Entrar em Contacto
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden border border-green/10 green-glow">
              <img
                src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80"
                alt="Mirriam Mall Galeria Comercial"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Pillars/Features Grid */}
          <div className="border-t border-primary/5 pt-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">Nossos Diferenciais</h3>
              <p className="text-primary/60 text-sm">
                Uma infraestrutura planeada com foco na melhor experiência de compras e rentabilidade de negócios da região.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="p-6 rounded-lg bg-light-gray border border-primary/5 hover:border-green/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center mb-4 text-green">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-primary mb-2">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-primary/70 leading-relaxed">{feature.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary-dark text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4 text-green">Quer Fazer Parte Deste Sucesso?</h3>
            <p className="text-white/70 text-sm max-w-xl mx-auto mb-8">
              Venha visitar as nossas instalações ou agende uma reunião com a nossa equipa comercial para analisar os espaços de arrendamento disponíveis.
            </p>
            <Link
              href="/espacos"
              className="bg-green hover:bg-green-light text-primary text-xs font-bold uppercase tracking-wider py-3.5 px-8 rounded transition-colors inline-block"
            >
              Consultar Espaços Comerciais
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Simple MapPin Icon replacement for lucide
function MapPinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
