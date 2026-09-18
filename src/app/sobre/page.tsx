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
  ArrowRight,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Sobre() {
  const { buildings, banners } = useDatabase();

  // Hero banner background image
  const defaultHeroImage = 'https://res.cloudinary.com/dnvnftvky/image/upload/v1784284817/miriam_mall/ssakfoiyoj4sxvg26ce5.jpg';
  const cleanBanners = banners?.filter((b: Banner) => b.image && !b.image.includes('unsplash.com/photo-1519501025264')) ?? [];
  const activeBanners = cleanBanners.filter((b: Banner) => b.isActive);
  const heroBgImage = activeBanners.length > 0 ? activeBanners[0].image : (cleanBanners.length > 0 ? cleanBanners[0].image : defaultHeroImage);

  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);

  const defaultBuildings: BuildingType[] = [
    {
      id: 'building-1',
      name: 'Edifício 1 – Centro Comercial',
      subtitle: 'Shopping & Lojas de Retalho',
      description: 'Espaço central do complexo destinado a grandes marcas, supermercado âncora, praça de restauração e serviços essenciais de alto fluxo comercial.',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
      features: ['Lojas Âncora e Boutiques', 'Supermercado e Farmácia', 'Praça de Alimentação Climatizada', 'Escadas Rolantes e Elevadores Panorâmicos'],
      order: 1
    },
    {
      id: 'building-2',
      name: 'Edifício 2 – Área Comercial e Hospedagem',
      subtitle: 'Serviços, Escritórios & Hospedagem',
      description: 'Ambiente executivo e moderno ideal para agências bancárias, telecomunicações, consultórios médicos, escritórios corporativos e unidades de hospedagem.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      features: ['Escritórios Modulares & Coworking', 'Agências Bancárias e Seguradoras', 'Alojamento e Suítes Confortáveis', 'Acesso Controlado e Portaria Executiva'],
      order: 2
    },
    {
      id: 'building-3',
      name: 'Edifício 3 – Área Logística e Operacional',
      subtitle: 'Ferragens e Armazéns',
      description: 'Estrutura reforçada especialmente projetada para carga e descarga, grandes volumes, materiais de construção, ferragens e centros de distribuição regional.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      features: ['Pé-direito Alto para Armazenamento', 'Docas de Carga e Descarga', 'Área Exclusiva para Ferragens', 'Acesso Facilitado a Camiões'],
      order: 3
    }
  ];

  const getBuilding = (index: number) => {
    if (buildings && buildings[index]) {
      return buildings[index];
    }
    return defaultBuildings[index] || defaultBuildings[0];
  };

  const buildingA = getBuilding(0);
  const buildingB = getBuilding(1);
  const buildingC = getBuilding(2);

  // Remove prefixo "Edifício X –" para deixar apenas o nome principal da área
  const getCleanName = (name?: string) => {
    if (!name) return '';
    return name.replace(/^edif[ií]cio\s*[0-9A-Za-z]*\s*[-–—:]*\s*/i, '').trim();
  };

  const actionButtons = [
    {
      id: 'btn-building-1',
      title: getCleanName(buildingA.name) || 'Centro Comercial',
      icon: Store,
      onClick: () => setSelectedBuilding(buildingA)
    },
    {
      id: 'btn-building-2',
      title: getCleanName(buildingB.name) || 'Área Comercial e Hospedagem',
      icon: Briefcase,
      onClick: () => setSelectedBuilding(buildingB)
    },
    {
      id: 'btn-building-3',
      title: getCleanName(buildingC.name) || 'Área Logística e Operacional',
      icon: Building2,
      onClick: () => setSelectedBuilding(buildingC)
    },
    {
      id: 'btn-espacos',
      title: 'Espaços Comerciais',
      icon: Layers,
      href: '/espacos'
    }
  ];


  return (
    <div className="min-h-screen flex flex-col bg-primary-dark text-white transition-colors">
      <Navbar />

      <main className="flex-grow pt-16 sm:pt-20 relative bg-gradient-to-b from-primary-dark via-primary to-primary-dark text-white flex flex-col justify-center py-10 sm:py-16 overflow-hidden">
        {/* Imagem de Fundo Sutil */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: `url('${heroBgImage}')` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-primary-dark/60 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
          {/* Cabeçalho Institucional */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto mb-8 sm:mb-10"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight mb-3 leading-tight">
              Um Complexo Comercial <span className="text-green-light">Moderno e Multifuncional</span>
            </h1>
            
            <div className="max-w-2xl mx-auto rounded-xl border border-white/70 bg-black/25 backdrop-blur-md p-4 sm:p-5 shadow-md">
              <p className="text-white/90 text-xs sm:text-sm md:text-[15px] leading-relaxed font-normal">
                A <strong className="text-white font-semibold">Miriam Mall – Soc. Unipessoal, Lda.</strong> é uma empresa moçambicana de gestão e arrendamento de imóveis comerciais em Homoíne, Inhambane. Reúne num único complexo lojas de retalho, serviços bancários, espaços gastronómicos e áreas de lazer, com segurança 24h e infraestrutura de padrão internacional.
              </p>
            </div>
          </motion.div>

          {/* 4 Botões Uniformizados com o Estilo Apreciar/Arrendar */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-stretch">
            {actionButtons.map((btn, idx) => {
              const Icon = btn.icon;

              const CardContent = (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className="w-full h-full min-h-[52px] sm:min-h-[58px] px-3 sm:px-4 py-2.5 sm:py-3.5 rounded border border-white/80 hover:border-white hover:bg-white hover:text-primary text-white text-[11px] sm:text-xs md:text-[13px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 sm:gap-2.5 text-center group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 bg-white/5 backdrop-blur-sm"
                >
                  <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span className="leading-snug">
                    {btn.title}
                  </span>
                </motion.div>
              );

              if (btn.href) {
                return (
                  <Link key={btn.id} href={btn.href} className="block h-full">
                    {CardContent}
                  </Link>
                );
              }

              return (
                <button
                  key={btn.id}
                  onClick={btn.onClick}
                  type="button"
                  className="block w-full h-full text-left"
                >
                  {CardContent}
                </button>
              );
            })}
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
