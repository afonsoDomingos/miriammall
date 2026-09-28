'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDatabase } from '../../context/DatabaseContext';
import { Building as BuildingType, Banner } from '../../utils/mockData';
import {
  Building2,
  Store,
  Briefcase,
  Layers,
  ShoppingBag,
  Utensils,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Sobre() {
  const { buildings, banners } = useDatabase();

  // Hero banner background image
  const defaultHeroImage =
    'https://res.cloudinary.com/dnvnftvky/image/upload/v1784284817/miriam_mall/ssakfoiyoj4sxvg26ce5.jpg';
  const cleanBanners =
    banners?.filter(
      (b: Banner) =>
        b.image && !b.image.includes('unsplash.com/photo-1519501025264')
    ) ?? [];
  const activeBanners = cleanBanners.filter((b: Banner) => b.isActive);
  const heroBgImage =
    activeBanners.length > 0
      ? activeBanners[0].image
      : cleanBanners.length > 0
      ? cleanBanners[0].image
      : defaultHeroImage;

  const defaultBuildings: BuildingType[] = [
    {
      id: 'building-1',
      name: 'Edifício Principal — Shopping',
      subtitle: 'Centro Comercial',
      description:
        'Edifício principal do complexo destinado a lojas comerciais, restaurantes e serviços. 3 pisos com espaços variados para arrendamento.',
      image:
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
      features: [
        'Lojas comerciais',
        'Restaurante',
        'Áreas administrativas',
        '3 pisos',
      ],
      order: 1,
    },
    {
      id: 'building-2',
      name: 'Edifício de Hospedagem',
      subtitle: 'Serviços, Escritórios & Alojamento',
      description:
        'Edifício multifuncional com espaços comerciais, escritórios, quartos e refeitório. Ideal para serviços e alojamento.',
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      features: [
        'Ferragens e armazéns',
        'Escritórios',
        'Quartos suíte',
        'Refeitório',
      ],
      order: 2,
    },
    {
      id: 'building-3',
      name: 'Bloco de Armazéns',
      subtitle: 'Armazenamento Logístico',
      description:
        'Bloco dedicado ao armazenamento com 4 espaços de diferentes dimensões. Estrutura reforçada para carga e descarga.',
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      features: [
        '4 armazéns',
        'Pé-direito alto',
        'Acesso facilitado',
        'Segurança 24h',
      ],
      order: 3,
    },
  ];

  const getBuilding = (index: number) => {
    if (buildings && buildings[index]) return buildings[index];
    return defaultBuildings[index] || defaultBuildings[0];
  };

  const buildingA = getBuilding(0);
  const buildingB = getBuilding(1);
  const buildingC = getBuilding(2);

  // Remove prefixo "Edifício X –" para deixar apenas o nome da área
  const getCleanName = (name?: string) => {
    if (!name) return '';
    return name.replace(/^edif[ií]cio\s+\d+\s*[–-]\s*/i, '').trim();
  };

  // Converte texto para Sentence case (apenas a primeira letra maiúscula)
  const toSentenceCase = (text: string) => {
    if (!text) return '';
    const trimmed = text.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  const col1Buttons = [
    {
      id: 'btn-building-1',
      title: getCleanName(buildingA.name) || 'Centro comercial',
      icon: Store,
      href: `/edificios/${buildingA.id}`,
    },
    {
      id: 'btn-building-2',
      title: getCleanName(buildingB.name) || 'Área comercial e hospedagem',
      icon: Briefcase,
      href: `/edificios/${buildingB.id}`,
    },
    {
      id: 'btn-building-3',
      title:
        getCleanName(buildingC.name) || 'Área logística e operacional',
      icon: Building2,
      href: `/edificios/${buildingC.id}`,
    },
  ];

  const col2Buttons = [
    {
      id: 'btn-espacos',
      title: 'Espaços comerciais',
      icon: Layers,
      href: '/espacos',
    },
    {
      id: 'btn-lojas',
      title: 'Lojas e serviços',
      icon: ShoppingBag,
      href: '/lojas',
    },
    {
      id: 'btn-restaurantes',
      title: 'Restaurantes e lazer',
      icon: Utensils,
      href: '/restaurantes',
    },
  ];

  const renderButton = (btn: { id: string; title: string; icon: React.ElementType; href: string }, num: number, idx: number) => {
    const Icon = btn.icon;
    return (
      <Link key={btn.id} href={btn.href} className="block w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: idx * 0.05 }}
          className="w-full min-h-[52px] px-5 py-3 rounded-lg border border-white/70 hover:border-white hover:bg-white hover:text-primary text-white text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-start gap-3 text-left group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 bg-white/5 backdrop-blur-sm"
        >
          <span className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-primary/20 flex items-center justify-center text-[10px] font-extrabold shrink-0 leading-none">
            {num}
          </span>
          <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
          <span className="leading-snug">{toSentenceCase(btn.title)}</span>
        </motion.div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary-dark text-white">
      <Navbar />

      <main className="flex-grow pt-16 sm:pt-20 relative bg-gradient-to-b from-primary-dark via-primary to-primary-dark text-white flex flex-col justify-start overflow-hidden min-h-[70vh]">
        {/* Imagem de fundo sutil */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url('${heroBgImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-primary-dark/60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start text-left pt-6 sm:pt-8 pb-8 sm:pb-10">
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 sm:mb-10 w-full max-w-2xl md:max-w-4xl lg:max-w-6xl"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight mb-6 leading-tight">
              Complexo Comercial{' '}
              <span className="text-green-light">e Multifuncional</span>
            </h1>

            {/* Descrição em quadro */}
            <div className="w-full rounded-xl border border-white/70 bg-black/25 backdrop-blur-md p-4 sm:p-5 shadow-md">
              <p className="text-white/90 text-xs sm:text-sm md:text-[15px] leading-relaxed font-normal">
                A{' '}
                <strong className="text-white font-semibold">
                  Miriam Mall – Soc. Unipessoal, Lda.
                </strong>{' '}
                é uma empresa moçambicana de gestão e arrendamento de imóveis
                comerciais em Homoíne, Inhambane. Reúne num único complexo lojas
                de retalho, serviços bancários, espaços gastronómicos e áreas de
                lazer, com segurança 24h e infraestrutura de padrão
                internacional.
              </p>
            </div>
          </motion.div>

          {/* 6 Botões em 2 Colunas — 1,2,3 | 4,5,6 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-2xl md:max-w-4xl lg:max-w-5xl">
            {/* Coluna 1: Edifícios 1, 2, 3 */}
            <div className="flex flex-col gap-3">
              {col1Buttons.map((btn, idx) => renderButton(btn, idx + 1, idx))}
            </div>

            {/* Coluna 2: Serviços & Espaços (4, 5, 6) */}
            <div className="flex flex-col gap-3">
              {col2Buttons.map((btn, idx) => renderButton(btn, idx + 4, idx + 3))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
