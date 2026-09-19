'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDatabase } from '../../context/DatabaseContext';
import { Building as BuildingType, Banner } from '../../utils/mockData';
import BuildingDetailModal from '../../components/BuildingDetailModal';
import {
  Building2,
  Store,
  Briefcase,
  Layers,
  ShoppingBag,
  Utensils,
  Fuel,
  Landmark,
  Car,
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

  const [selectedBuilding, setSelectedBuilding] =
    useState<BuildingType | null>(null);

  const defaultBuildings: BuildingType[] = [
    {
      id: 'building-1',
      name: 'Edifício 1 – Centro Comercial',
      subtitle: 'Shopping & Lojas de Retalho',
      description:
        'Espaço central do complexo destinado a grandes marcas, supermercado âncora, praça de restauração e serviços essenciais de alto fluxo comercial.',
      image:
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
      features: [
        'Lojas Âncora e Boutiques',
        'Supermercado e Farmácia',
        'Praça de Alimentação Climatizada',
        'Escadas Rolantes e Elevadores Panorâmicos',
      ],
      order: 1,
    },
    {
      id: 'building-2',
      name: 'Edifício 2 – Área Comercial e Hospedagem',
      subtitle: 'Serviços, Escritórios & Hospedagem',
      description:
        'Ambiente executivo e moderno ideal para agências bancárias, telecomunicações, consultórios médicos, escritórios corporativos e unidades de hospedagem.',
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      features: [
        'Escritórios Modulares & Coworking',
        'Agências Bancárias e Seguradoras',
        'Alojamento e Suítes Confortáveis',
        'Acesso Controlado e Portaria Executiva',
      ],
      order: 2,
    },
    {
      id: 'building-3',
      name: 'Edifício 3 – Área Logística e Operacional',
      subtitle: 'Ferragens e Armazéns',
      description:
        'Estrutura reforçada especialmente projetada para carga e descarga, grandes volumes, materiais de construção, ferragens e centros de distribuição regional.',
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      features: [
        'Pé-direito Alto para Armazenamento',
        'Docas de Carga e Descarga',
        'Área Exclusiva para Ferragens',
        'Acesso Facilitado a Camiões',
      ],
      order: 3,
    },
    {
      id: 'building-4',
      name: 'Edifício 4 – Posto de Abastecimento de Combustíveis',
      subtitle: 'Combustíveis, Loja de Conveniência & Serviços',
      description:
        'Posto moderno de abastecimento de combustíveis com serviços rápidos, loja de conveniência 24h e suporte a frotas.',
      image:
        'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80',
      features: [
        'Bombas Multicombustível de Alta Eficiência',
        'Loja de Conveniência 24 Horas',
        'Calibração e Serviços Rápidos',
        'Atendimento Rápido e Seguro',
      ],
      order: 4,
    },
    {
      id: 'building-5',
      name: 'Edifício 5 – Centro Corporativo',
      subtitle: 'Escritórios, Negócios & Serviços',
      description:
        'Espaço empresarial moderno para escritórios corporativos, instituições financeiras, consultorias e salas de reunião.',
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      features: [
        'Salas de Reunião Executivas',
        'Escritórios Modulares & Coworking',
        'Internet Dedicada de Alta Velocidade',
        'Recepção e Segurança 24h',
      ],
      order: 5,
    },
    {
      id: 'building-6',
      name: 'Edifício 6 – Área de Estacionamento',
      subtitle: 'Estacionamento Seguro & Apoio',
      description:
        'Ampla área de estacionamento pavimentada, iluminada e com segurança 24 horas para clientes e visitantes do shopping.',
      image:
        'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80',
      features: [
        'Estacionamento Amplo e Seguro 24h',
        'Vigilância e Câmaras de Segurança',
        'Acesso Facilitado a Todos os Edifícios',
        'Vagas para Cargas e Descargas',
      ],
      order: 6,
    },
  ];

  const getBuilding = (index: number) => {
    if (buildings && buildings[index]) return buildings[index];
    return defaultBuildings[index] || defaultBuildings[0];
  };

  const buildingA = getBuilding(0);
  const buildingB = getBuilding(1);
  const buildingC = getBuilding(2);
  const buildingD = getBuilding(3);
  const buildingE = getBuilding(4);
  const buildingF = getBuilding(5);

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
      onClick: () => setSelectedBuilding(buildingA),
    },
    {
      id: 'btn-building-2',
      title: getCleanName(buildingB.name) || 'Área comercial e hospedagem',
      icon: Briefcase,
      onClick: () => setSelectedBuilding(buildingB),
    },
    {
      id: 'btn-building-3',
      title:
        getCleanName(buildingC.name) || 'Área logística e operacional',
      icon: Building2,
      onClick: () => setSelectedBuilding(buildingC),
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

  const col3Buttons = [
    {
      id: 'btn-building-4',
      title: getCleanName(buildingD.name) || 'Posto de abastecimento de combustíveis',
      icon: Fuel,
      onClick: () => setSelectedBuilding(buildingD),
    },
    {
      id: 'btn-building-5',
      title: getCleanName(buildingE.name) || 'Centro corporativo',
      icon: Landmark,
      onClick: () => setSelectedBuilding(buildingE),
    },
    {
      id: 'btn-building-6',
      title: getCleanName(buildingF.name) || 'Área de estacionamento',
      icon: Car,
      onClick: () => setSelectedBuilding(buildingF),
    },
  ];

  type ButtonDef =
    | {
        id: string;
        title: string;
        icon: React.ElementType;
        onClick: () => void;
        href?: undefined;
      }
    | {
        id: string;
        title: string;
        icon: React.ElementType;
        href: string;
        onClick?: undefined;
      };

  const renderButton = (btn: ButtonDef, num: number, idx: number) => {
    const Icon = btn.icon;
    const inner = (
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
    );

    if (btn.href) {
      return (
        <Link key={btn.id} href={btn.href} className="block w-full">
          {inner}
        </Link>
      );
    }

    return (
      <button
        key={btn.id}
        onClick={btn.onClick}
        type="button"
        className="block w-full text-left"
      >
        {inner}
      </button>
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

          {/* 9 Botões em 3 Colunas — 1,2,3 | 4,5,6 | 7,8,9 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-2xl md:max-w-4xl lg:max-w-6xl">
            {/* Coluna 1: Edifícios 1, 2, 3 */}
            <div className="flex flex-col gap-3">
              {col1Buttons.map((btn, idx) => renderButton(btn, idx + 1, idx))}
            </div>

            {/* Coluna 2: Serviços & Espaços (4, 5, 6) */}
            <div className="flex flex-col gap-3">
              {col2Buttons.map((btn, idx) => renderButton(btn, idx + 4, idx + 3))}
            </div>

            {/* Coluna 3: Edifícios 4, 5, 6 (Numeração 7, 8, 9) */}
            <div className="flex flex-col gap-3">
              {col3Buttons.map((btn, idx) => renderButton(btn, idx + 7, idx + 6))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal de Detalhes do Edifício */}
      {selectedBuilding && (
        <BuildingDetailModal
          building={selectedBuilding}
          onClose={() => setSelectedBuilding(null)}
        />
      )}

      <Footer />
    </div>
  );
}
